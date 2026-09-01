段階的ロールアウトの設計メモを作成しました。

[rollout-design.md](workspace/rollout-design.md)

推奨名：

- 条件名：`ErrorRateBelowOnePercentForLast15Minutes`
- 開始メソッド名：`startRolloutForNextUserGroup`
- 記録型名：`RolloutActivationStarted`

1%ちょうどは開始不可、指標欠損・分母0件は判定不能として停止する設計です。冪等性、記録との整合性、境界値を含む検証観点も記載しました。Markdownの空白・競合マーカー検査は問題ありません。コード変更ではないため、ビルドやリントは対象外です。