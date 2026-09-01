推奨名は次のとおりです。

| 種別 | 名前 | 指すもの |
|---|---|---|
| 型名 | `BillingResponse` | 応答履歴の1件。`status`、`retryAt`、`requestId`を保持 |
| boolean名 | `canQueueRetry` | 再試行時刻が未来、かつ同じ請求の再試行が未登録 |
| メソッド名 | `queueRetry` | 指定時刻で再試行をスケジューラへ登録 |
| 状態名 | `queued` | 登録完了後、スケジューラが実行を開始する前 |

設計上、429を受けたら本文から`retryAt`を読み取り、まず`BillingResponse`を応答履歴へ保存します。その後に`canQueueRetry`を判定し、真の場合だけ`queueRetry`を呼びます。登録成功後の状態を`queued`とし、スケジューラによる実行開始でこの状態を終了します。履歴保存は、再試行を登録できない場合にも行います。

ReferyTaleの対応表は[こちら](workspace/.codex/referent-tables/referent-table-billing-retry-identifiers.md)です。