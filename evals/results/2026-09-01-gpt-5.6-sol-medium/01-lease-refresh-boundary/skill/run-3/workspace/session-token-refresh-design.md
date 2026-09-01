# `SessionRefresh` 設計メモ

## 中心語

`SessionRefresh`

同じセッションについて、残り有効時間に基づく更新要求の送信、送信後から新しいトークン受信までの追加送信の抑止、および受信したトークンと受信時刻の監査保存を順に行う仕組みを表す。

## 名称

| 種類 | 名称 | 指すもの |
|---|---|---|
| 条件 | `shouldRequestSessionRefresh` | 現在のトークンの残り有効時間が10分以下であり、かつ、同じセッションが先行する更新要求に対する新しいトークンを待っていないこと |
| 状態 | `AwaitingRefreshedToken` | 更新要求を送った後、その要求に対する新しいトークンをまだ受け取っておらず、同じセッションから追加の更新要求を送ってはならない状態 |
| 送信イベント | `SessionRefreshRequestSent` | 条件を満たした同じセッションから更新要求を送ったこと |
| 受信イベント | `RefreshedTokenReceived` | 先に更新要求を送った同じセッションが、その要求に対する新しいトークンを受け取ったこと |
| 監査記録型 | `RefreshedTokenReceiptAuditRecord` | 受け取った新しいトークンと、その受信時刻を組にした一件の監査記録 |

## 判定規則

`shouldRequestSessionRefresh` は、次の両方を満たす場合にだけ真とする。

1. 現在のトークンの残り有効時間が10分以下である。10分ちょうどを含む。
2. 同じセッションが `AwaitingRefreshedToken` ではない。

判定と更新要求の送信開始はセッション単位で直列化し、同時に複数の呼び出しが条件を満たしても、送信される更新要求は一件だけにする。

## 状態とイベントの順序

| 順序 | 入力または判定 | 結果 |
|---|---|---|
| 1 | `shouldRequestSessionRefresh` が真 | 更新要求を一件送る |
| 2 | `SessionRefreshRequestSent` | 同じセッションを `AwaitingRefreshedToken` にする |
| 3 | `AwaitingRefreshedToken` の間に再判定 | 追加の更新要求を送らない |
| 4 | `RefreshedTokenReceived` | `AwaitingRefreshedToken` を終了し、受信した値と受信時刻を保存する |

守るべき不変条件は、同じセッションについて `SessionRefreshRequestSent` の後から `RefreshedTokenReceived` までに、次の `SessionRefreshRequestSent` が発生しないことである。

## 監査記録

```text
RefreshedTokenReceiptAuditRecord {
  refreshedToken: 受け取った新しいトークン
  receivedAt:      そのトークンを受け取った時刻
}
```

`receivedAt` は `RefreshedTokenReceived` を処理した時点で取得し、`refreshedToken` と同じ記録として保存する。トークンは機密値であるため、保存時の暗号化、読み取り権限、保持期間、および通常ログへ出力しないことを別途定める必要がある。

## 未確定事項

更新要求の失敗、タイムアウト、応答喪失、およびプロセス再起動後の復旧方法は要件に含まれていない。現要件だけを適用する限り、新しいトークンを受信していない状態で自動的に追加要求を送ることはできないため、再試行を導入する場合は、追加送信を許可する条件と監査方法を別途決める必要がある。
