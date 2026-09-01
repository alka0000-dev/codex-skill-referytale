# セッショントークン更新 設計メモ

## 1. 目的

セッショントークンの残り有効時間が **10分以下** になった時点で更新を開始し、新しいトークンを受信するまで同一セッションから別の更新要求を送らない。受信した新トークンと受信時刻は監査記録として保存する。

## 2. 中心語

**更新リース（Refresh Lease）**

更新要求の送信開始から新トークンの受信完了まで、同一セッションに一つだけ存在する排他的な更新権を表す。時間で自然失効するロックではなく、新トークンの受信によって終了する。

## 3. 用語と名前

### 条件名

| 名前 | 定義 |
|---|---|
| `RefreshDue`（更新期限到来） | `expiresAt - now <= 10分` |
| `RefreshLeaseAvailable`（更新リース取得可能） | 状態が `IDLE` である |
| `RefreshMayStart`（更新開始可能） | `RefreshDue && RefreshLeaseAvailable` |

境界値を含むため、残り時間がちょうど10分の場合も `RefreshDue` は真とする。有効期限を過ぎている場合も真だが、期限切れトークンを更新できない認証基盤では、別途セッション失効処理へ分岐する。

### 状態名

| 名前 | 意味 |
|---|---|
| `IDLE`（待機中） | 更新要求は進行しておらず、条件を満たせば開始できる |
| `REFRESH_IN_FLIGHT`（更新中） | 更新要求を開始済みで、新トークンの受信を待っている |

### イベント名

| 名前 | 意味 |
|---|---|
| `RefreshCheckTriggered` | タイマーまたは認証処理が更新要否の評価を要求した |
| `RefreshRequestDispatched` | 更新リースを取得し、更新要求を送信した |
| `RefreshedTokenReceived` | 対応する更新要求の新トークンを受信した |
| `RefreshAttemptFailed` | 更新処理で失敗またはタイムアウトを検知した |

### 監査記録の型名

`TokenRefreshAuditRecord`

```text
TokenRefreshAuditRecord {
  auditId: UUID
  sessionId: SessionId
  refreshRequestId: UUID
  receivedToken: Encrypted<Token>
  receivedAt: Instant
}
```

- `receivedToken` は受信した新トークンそのものを暗号化して保存する。
- `receivedAt` は受信処理の入口でサーバーが採時した UTC の時刻とする。
- `refreshRequestId` には一意制約を設け、同じ応答の重複記録を防ぐ。

## 4. セッションが保持するデータ

```text
SessionRefreshState {
  sessionId: SessionId
  state: IDLE | REFRESH_IN_FLIGHT
  currentToken: Token
  expiresAt: Instant
  activeRefreshRequestId: UUID?
  refreshStartedAt: Instant?
  version: Integer
}
```

`state` と `activeRefreshRequestId` は永続化する。プロセス内メモリだけで管理すると、再起動や複数インスタンスで多重送信を防げない。

## 5. 状態遷移

| 現在状態 | イベント／条件 | 処理 | 次状態 |
|---|---|---|---|
| `IDLE` | `RefreshCheckTriggered` かつ `RefreshMayStart` | 更新リースを原子的に取得し、要求を送信する | `REFRESH_IN_FLIGHT` |
| `IDLE` | `RefreshCheckTriggered` かつ `!RefreshDue` | 何もしない | `IDLE` |
| `IDLE` | `RefreshedTokenReceived` | 処理済みの重複または不整合として無視する | `IDLE` |
| `REFRESH_IN_FLIGHT` | `RefreshCheckTriggered` | 追加要求を送らない | `REFRESH_IN_FLIGHT` |
| `REFRESH_IN_FLIGHT` | 対応する `RefreshedTokenReceived` | 監査保存、現行トークン更新、リース解放 | `IDLE` |
| `REFRESH_IN_FLIGHT` | 対応しない／重複した `RefreshedTokenReceived` | 現行状態を変更せず、重複または不整合として扱う | `REFRESH_IN_FLIGHT` |
| `REFRESH_IN_FLIGHT` | `RefreshAttemptFailed` | 自動で新規要求を作らず、障害状態を通知する | `REFRESH_IN_FLIGHT` |

概略は次のとおり。

```text
IDLE --[RefreshDue / リース取得・要求送信]--> REFRESH_IN_FLIGHT
  ^                                                   |
  |--[新トークン監査保存・現行トークン更新]-----------|
```

## 6. 処理手順

1. `RefreshCheckTriggered` でサーバー時刻 `now` を取得し、`RefreshDue` を評価する。
2. 真の場合、データストア上で `state = IDLE` を条件に、`REFRESH_IN_FLIGHT`、新しい `activeRefreshRequestId`、`refreshStartedAt` へ比較更新する。
3. 比較更新に成功した処理だけが `RefreshRequestDispatched` を実行する。失敗した処理は、別処理が更新リースを保持しているため送信しない。
4. `RefreshedTokenReceived` では、応答の `refreshRequestId` が `activeRefreshRequestId` と一致することを確認する。
5. 一つのデータベーストランザクションで次を行う。
   - `TokenRefreshAuditRecord` を保存する。
   - `currentToken` と `expiresAt` を新しい値へ更新する。
   - 状態を `IDLE` に戻し、更新リース関連フィールドを消去する。
6. トランザクション成功後にのみ、新トークンを利用可能として扱う。

監査保存に失敗した場合はトランザクション全体をロールバックし、状態を `REFRESH_IN_FLIGHT` に保つ。これにより、監査記録なしで新トークンだけが有効になる状態を防ぐ。

## 7. 同時実行と配送保証

- 更新リースの取得は、行ロック、比較更新、または `version` を使った楽観ロックで原子的に行う。
- DB 更新とメッセージ送信の間のクラッシュに備える場合は、トランザクショナル Outbox を使う。
- 一つの `refreshRequestId` は一つの**論理更新要求**を表す。配送再試行が必要な場合も同じ ID を使い、更新先APIに冪等性を要求する。
- 更新先APIが冪等性を保証しない場合、送信結果が不明な要求を自動再送してはならない。運用確認またはセッション再認証へ送る。

分散システムでは、応答喪失時に「物理的な送信が厳密に一回」と「必ず完了」を同時に保証できない。この設計が禁止するのは、更新中に別の `refreshRequestId` を発行すること、および冪等性なしで再送することである。

## 8. 時刻とスケジューリング

- `expiresAt` と `receivedAt` は UTC の `Instant` として保存する。
- 判定にはクライアント時刻ではなく、認証基盤と同期されたサーバー時刻を使う。
- 定期確認の間隔による遅延を見込み、少なくとも10分境界を取りこぼさない周期で確認する。認証要求の処理時にも同じ判定を行ってよい。
- 時計の巻き戻り対策として、プロセス内の経過時間計測には単調増加時計を使えるが、永続化する監査時刻は実時刻とする。

## 9. 監査データの保護

トークン本体は認証情報であり、監査保存により漏えい時の影響が増える。そのため以下を必須とする。

- 保存時暗号化と鍵の分離
- 監査データへの最小権限アクセス
- アプリケーションログ、メトリクス、例外文へのトークン出力禁止
- 保持期間と削除手続きの定義
- 読み出し操作自体の監査

要件上トークン本体の復元が不要なら、将来的には本体ではなく不可逆ハッシュやトークン識別子を保存する方が安全である。ただし本メモでは、指定どおり新トークン本体を暗号化して保存する。

## 10. 受け入れ基準

1. 残り有効時間が `10分00秒` の場合、更新要求を一回開始する。
2. 残り有効時間が `10分00秒` を超える場合、更新要求を開始しない。
3. 同一セッションへの同時チェックが複数あっても、新しい `refreshRequestId` は一つだけ発行される。
4. `REFRESH_IN_FLIGHT` 中の追加チェックでは、新規の更新要求を送信しない。
5. 新トークン受信時に、暗号化されたトークンと UTC の受信時刻が `TokenRefreshAuditRecord` に保存される。
6. 監査保存に失敗した場合、現行トークンと状態は切り替わらない。
7. 応答の重複受信でも監査記録は重複せず、状態遷移も一度だけ行われる。
8. プロセス再起動や複数インスタンス環境でも更新中状態が保持され、多重送信されない。

## 11. 未決事項

- 更新要求が失敗または無応答になった場合に、手動復旧、再認証、または同一 `refreshRequestId` の冪等再送のどれを採るか。
- 監査記録の保持期間と閲覧権限。
- 更新先APIが `refreshRequestId` による冪等性を保証するか。
- 期限切れ後も更新可能か、再認証が必要か。
