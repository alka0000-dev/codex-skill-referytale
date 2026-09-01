設計メモへ次を追加します。

### 整定区間

次の利用者グループの有効化を開始した直後から5分間を「整定区間」と呼びます。コード上の状態名は `SETTLING_INTERVAL` とします。

整定区間中は、直近15分のエラー率の算出および `isLast15MinuteErrorRateBelowOnePercent` の評価を実行しません。

処理順序は次のとおりです。

1. 条件成立後、`startGroupActivation` で利用者グループの有効化を開始する。
2. `GroupActivationStartRecord.startedAt` を記録する。
3. 状態を `SETTLING_INTERVAL` にする。
4. `startedAt` から5分が経過するまでは、次の判定要求を処理せず終了する。
5. 5分経過後に整定区間を終え、その後の評価周期から次の判定を許可する。

```text
有効化開始
    ↓
SETTLING_INTERVAL
    ↓ 5分経過
次のエラー率判定を許可
```

ここでは5分間の起点を、有効化の完了時刻ではなく、既存の `startedAt` が示す有効化開始時刻としています。

`referytale` の対応表も、状態と期間を他の役割から分離したうえで[更新しました](workspace/.codex/referent-tables/referent-table-staged-rollout-activation.md)。