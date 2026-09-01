段階的ロールアウトの設計メモを作成しました。

[設計メモを開く](<workspace/docs/gradual-rollout-design.md>)

提案名は以下です。

- 条件名: `ErrorRateBelowThresholdForLast15Minutes`
- 開始メソッド名: `startNextGroupActivation`
- 記録型名: `GroupActivationStartRecord`

`1.00%` は不成立とする境界条件、データ欠損時の安全側動作、監査用フィールド、二重開始防止、擬似コード、受け入れ基準まで含めています。必須項目と書式も確認済みです。