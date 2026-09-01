推奨する命名セットです。

```ts
type RetryInfo = {
  status: 429;
  retryAt: Date;
  requestId: string;
};

const shouldSchedule =
  retryAt > now && !hasRetry;

scheduleRetry(billId, retryAt);

type RetryState =
  | "scheduled"
  | "running"
  | "done"
  | "failed";
```

- 型名: `RetryInfo`
- boolean名: `shouldSchedule`
- メソッド名: `scheduleRetry`
- 登録後の状態名: `scheduled`

429を受けたら、まず`RetryInfo`を応答履歴へ保存します。その後、`shouldSchedule`が真の場合だけ`retryAt`を指定して再試行を登録します。`scheduled`は「スケジューラへの登録済み、実行開始前」を表します。

重複登録を確実に防ぐには、同一`billId`の未実行再試行に一意制約を設け、存在確認と登録を原子的に処理するのが安全です。`shouldRetry`は「今すぐ再試行する」と誤読されやすいため避けます。