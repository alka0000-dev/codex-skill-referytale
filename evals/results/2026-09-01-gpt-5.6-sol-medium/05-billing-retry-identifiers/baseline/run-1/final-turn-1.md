推奨する識別子は次のとおりです。

```ts
type RetryRec = {
  status: number;
  retryAt: Date;
  reqId: string;
};

const retryQueued: boolean;

function queueRetry(billId: string, retryAt: Date): Promise<void>;

type BillState =
  | "READY"
  | "RETRY_WAIT"
  | "RUNNING";
```

設計としては、429受信時にまず `RetryRec` を応答履歴へ保存します。その後、`retryAt > now` かつ `!retryQueued` の場合だけ `queueRetry()` を呼びます。登録成功後は `RETRY_WAIT` とし、スケジューラが実行を開始した時点で `RUNNING` へ遷移します。

重複登録の競合を防ぐため、`billId` をキーにした一意制約またはアトミックな登録処理をスケジューラ側に持たせるのが安全です。