提案する短い識別子は次のとおりです。

| 種類 | 名前 | 指すもの |
|---|---|---|
| TypeScript型 | `BillingAttempt` | 1回の請求API応答を保存する履歴項目 |
| boolean | `canScheduleRetry` | 再試行可能時刻が未来で、同じ請求が未登録 |
| メソッド | `scheduleRetry` | 再試行をスケジューラへ登録する |
| 状態 | `retryQueued` | 登録完了後、スケジューラが実行を始める前 |
| 履歴フィールド | `status` / `retryAt` / `requestId` | ステータスコード、再試行可能時刻、リクエストID |

設計は、429応答から `retryAt` を読み、まず `BillingAttempt` を応答履歴へ保存します。その後、`retryAt` が現在より後で、同じ請求の再試行がキューにない場合のみ `canScheduleRetry` を `true` とし、`scheduleRetry` を呼びます。登録成功後は状態を `retryQueued` にし、スケジューラによる実行開始まで維持します。

`canRetry` は「429が再試行可能か」だけを表すようにも読めるため、少し長くても判断条件が明確な `canScheduleRetry` を推奨します。

意味対応表は [referent-table-billing-retry-identifiers.md](workspace/.codex/referent-tables/referent-table-billing-retry-identifiers.md) に保存しました。