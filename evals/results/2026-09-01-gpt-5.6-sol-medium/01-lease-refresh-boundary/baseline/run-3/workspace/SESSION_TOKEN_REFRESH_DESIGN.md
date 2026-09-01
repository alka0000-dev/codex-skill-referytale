# セッショントークン更新 設計メモ

## 目的

セッションごとにトークンの残り有効時間を監視し、残り時間が10分以下になった時点で更新を開始する。更新要求の送信後は、新しいトークンを受信するまで同一セッションから追加の更新要求を送らない。受信したトークンと受信時刻は監査記録として保存する。

## 中心語

**`LeaseRefresh`（リース更新）**を中心語とする。

有効期限付きのセッショントークンを「一定期間だけ有効な利用権（Lease）」として捉えることで、期限による更新判定、更新中の排他状態、新しい利用権の受領、監査記録を一つの語彙で表せる。

## 用語と名前

| 種別 | 名前 | 意味 |
| --- | --- | --- |
| 定数 | `LEASE_REFRESH_THRESHOLD` | 更新境界。値は10分 |
| 条件 | `LeaseRefreshDue` | 残り有効時間が10分以下で、更新要求が進行中でない |
| 状態型 | `LeaseRefreshState` | セッション単位の更新状態 |
| 状態 | `Idle` | 更新要求を送信していない |
| 状態 | `AwaitingToken` | 更新要求を送信済みで、新しいトークンを待っている |
| イベント | `LeaseRefreshRequested` | 更新要求の送信が確定した |
| イベント | `LeaseRefreshTokenReceived` | 新しいトークンを受信した |
| 監査型 | `LeaseRefreshAuditRecord` | 受信した新しいトークンと受信時刻の監査記録 |

`LeaseRefreshDue` は次の条件として定義する。

```text
remainingLifetime <= LEASE_REFRESH_THRESHOLD
AND leaseRefreshState == Idle
```

境界値を含むため、残り有効時間がちょうど10分の場合も真になる。残り有効時間は、トークンの有効期限と判定時刻を同一の時刻基準で比較して算出する。

## 状態遷移

```text
Idle
  └─ LeaseRefreshDue / 更新要求を送信
       └─ LeaseRefreshRequested
            └─ AwaitingToken
                 └─ LeaseRefreshTokenReceived
                      ├─ LeaseRefreshAuditRecord を保存
                      ├─ セッションの現行トークンを置換
                      └─ Idle
```

更新要求の送信可否は、セッションごとの `LeaseRefreshState` によって制御する。`AwaitingToken` の間は残り有効時間にかかわらず `LeaseRefreshDue` が偽になるため、同一セッションから追加要求は送信されない。別セッションの更新状態とは独立している。

## 処理規則

1. セッションの現行トークンについて残り有効時間を計算する。
2. `LeaseRefreshDue` が真なら、更新要求の送信と `AwaitingToken` への遷移を、同一セッションに対して不可分に確定する。
3. `AwaitingToken` 中の同一セッションでは、タイマーや並行処理が再度起動しても更新要求を送信しない。
4. 新しいトークンの受信時刻を受信処理の入口で一度だけ取得する。
5. `LeaseRefreshAuditRecord` の永続化に成功してから、現行トークンを置換し、状態を `Idle` に戻す。

手順2の排他制御は、単一プロセスならセッション単位のロックまたは compare-and-set、複数プロセスなら共有ストア上の条件付き更新で実装する。単なる事前チェックだけでは、並行実行時に二重送信を防げない。

## 監査記録

```text
type LeaseRefreshAuditRecord = {
  sessionId: SessionId
  token: EncryptedSessionToken
  receivedAt: Instant
}
```

- `token` は受信した新しいトークンそのものを保存するが、保管時暗号化し、ログには出力しない。
- `receivedAt` はサーバー側で取得した受信時刻とし、UTCの絶対時刻で保存する。
- 監査ストアへの書き込みは追記専用とし、参照権限と保存期間を制限する。
- トークンと受信時刻が別々に保存されないよう、1件のレコードとして原子的に永続化する。

## 不変条件

- 1セッションにつき、同時に進行できる更新要求は最大1件である。
- `AwaitingToken` から `Idle` に戻れるのは、新しいトークンを受信し、その監査記録の保存に成功した場合だけである。
- `LeaseRefreshTokenReceived` 1回につき、対応する `LeaseRefreshAuditRecord` は1件だけ作成される。
- 残り有効時間が10分を超える場合、更新要求は送信されない。

## 未規定事項

更新要求のタイムアウト、通信失敗、無効な応答を受けた場合の回復方法は、与えられた要件には含まれていない。これらを理由に自動で `Idle` へ戻して再送すると、「新しいトークンを受け取るまで追加要求を送らない」という規則に反する可能性がある。そのため本設計では `AwaitingToken` を維持し、再送、解除、運用介入の方針は別途決定する。
