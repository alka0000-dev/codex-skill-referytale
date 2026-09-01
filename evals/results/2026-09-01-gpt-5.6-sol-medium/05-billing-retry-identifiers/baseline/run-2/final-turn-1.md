推奨名は次のとおりです。

```ts
type RetryInfo = {
  status: 429;
  retryAt: string; // ISO 8601
  reqId: string;
};

const shouldQueue: boolean;
const queueRetry = (): Promise<void> => {};

type RetryState = "queued" | "running";
```

状態名は `queued` が適切です。スケジューラへの登録が完了し、実行開始を待っていることを簡潔に表せます。

設計としては、429を受けたら最初に `RetryInfo` を応答履歴へ保存します。その後、`retryAt` が未来であり、請求IDをキーとした再試行が未登録の場合だけ `shouldQueue` を真にし、`queueRetry` を呼びます。登録成功後は `queued`、スケジューラが実行を開始した時点で `running` へ遷移させます。重複防止は請求IDによる一意制約で担保すると安全です。