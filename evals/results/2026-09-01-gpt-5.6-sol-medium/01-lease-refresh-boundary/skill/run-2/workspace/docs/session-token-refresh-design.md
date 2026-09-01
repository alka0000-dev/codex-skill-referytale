# セッション更新境界 — 設計メモ

## 目的と中心語

**セッション更新境界**（`SessionRefreshBoundary`）とは、セッションで使用中のトークンについて、残り有効時間を判定し、必要な更新要求を一回だけ送り、応答待ち中の追加要求を抑止し、受信した新しいトークンと受信時刻を保存する仕組みを指す。

中心語には「セッション更新境界」を採用する。「10分以下」という開始条件だけでなく、要求の一回送信、受信までの抑止、受信後の監査保存までを一つの設計範囲として示すためである。

## 名称

| 区分 | 名称 | 指すもの |
|---|---|---|
| 中心語 | セッション更新境界（`SessionRefreshBoundary`） | 残り有効時間の判定から監査保存までを順に行う仕組み |
| 条件名 | `isRefreshDue` | 現在時刻と使用中のトークンの有効期限との差が10分以下であること |
| 状態名 | `AwaitingRefreshedToken` | 同一セッションから更新要求を送信済みであり、その応答の新しいトークンをまだ受け取っていない状態 |
| 送信イベント名 | `TokenRefreshRequested` | 同一セッションから更新要求を送ったという事象 |
| 受信イベント名 | `RefreshedTokenReceived` | 送信済みの更新要求に対応する新しいトークンを受け取ったという事象 |
| 監査記録の型名 | `TokenRefreshAuditRecord` | 受け取った新しいトークンと、その受信時刻を保持する一件の記録 |

## 判定と状態遷移

1. 使用中のトークンの残り有効時間を評価する。残り有効時間がちょうど10分の場合を含め、10分以下なら `isRefreshDue` が成立する。
2. `isRefreshDue` が成立しても、同じセッションが `AwaitingRefreshedToken` なら更新要求を送らない。
3. `isRefreshDue` が成立し、同じセッションが `AwaitingRefreshedToken` でなければ、更新要求を一度だけ送る。送信によって `TokenRefreshRequested` が発生し、同じセッションは直ちに `AwaitingRefreshedToken` になる。
4. 同じ要求に対応する新しいトークンを受け取ると `RefreshedTokenReceived` が発生する。その瞬間の時刻を取得し、同じセッションの `AwaitingRefreshedToken` を終了する。
5. 受け取った新しいトークンを `refreshedToken`、取得した受信時刻を `receivedAt` として、`TokenRefreshAuditRecord` を保存する。

同一セッションで判定が同時に実行されても二つの要求が送られないように、手順2と手順3の判定・送信・状態変更は、セッション単位で他の実行が割り込めない一続きの操作として扱う。これにより、最初の送信後から `RefreshedTokenReceived` まで、後続の判定は必ず `AwaitingRefreshedToken` を観測する。

## 監査記録

```text
TokenRefreshAuditRecord = {
  refreshedToken: string,
  receivedAt: Instant
}
```

- `refreshedToken` は、更新要求への応答として受け取った新しいトークンの値である。
- `receivedAt` は、その新しいトークンを受け取った瞬間を示す時刻である。保存時には UTC の時点として扱う。
- トークン自体は認証情報なので、保存先では暗号化とアクセス制限を適用し、通常のアプリケーションログへ出力しない。

## 確認例

| 状況 | 期待結果 |
|---|---|
| 残り有効時間が10分を超える | `isRefreshDue` は成立せず、要求を送らない |
| 残り有効時間が10分以下で、受信待ちではない | 要求を一度送り、`TokenRefreshRequested` の後に `AwaitingRefreshedToken` になる |
| `AwaitingRefreshedToken` の間に同じセッションで再判定する | 追加の要求を送らない |
| 新しいトークンを受信する | `RefreshedTokenReceived` が発生し、受信待ちを終え、値と受信時刻を `TokenRefreshAuditRecord` として保存する |

## 未決定事項

要求送信の失敗、応答が返らない場合のタイムアウト、監査保存の失敗に対する再試行方針は、提示された要件では未決定である。これらは追加要件として別途決める必要がある。
