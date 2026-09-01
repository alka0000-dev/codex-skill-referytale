提案名は次のとおりです。

| 種別 | 名前 | 指すもの |
|---|---|---|
| 型名 | `RetryLog` | `status`、`retryAt`、`requestId`を持つ応答履歴の1件 |
| boolean名 | `canScheduleRetry` | `retryAt`が未来、かつ同じ請求の再試行がキューにない |
| メソッド名 | `scheduleRetry` | `retryAt`を指定して再試行をスケジューラへ登録する |
| 状態名 | `scheduled` | 登録済みで、スケジューラの実行開始を待っている |

設計では、429を受けたら最初に`retryAt`を読み、条件成立の有無にかかわらず`RetryLog`を保存します。その後に`canScheduleRetry`を評価し、真の場合だけ`scheduleRetry`を呼びます。登録完了後は`scheduled`となり、スケジューラが実行を開始した時点でこの状態を終えます。

指示対象と命名の対応表は[referent-table-billing-retry.md](workspace/.codex/referent-tables/referent-table-billing-retry.md)に保存しました。