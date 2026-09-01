段階的ロールアウトの設計メモを作成しました。

- 条件名: `isPrevious15MinuteErrorRateBelowOnePercent`
- 開始メソッド名: `startNextUserGroupActivation`
- 記録型名: `UserGroupActivationStartRecord`

[設計メモ](<workspace/staged-rollout-design.md>)

条件評価に使ったエラー率を再計算せず、その値自体を開始記録へ保存する設計です。エラー率の定義や欠損時の扱いなど、未決事項も明記しました。

ReferyTaleの対応表も[こちら](<workspace/.codex/referent-tables/referent-table-staged-rollout.md>)に保存し、名称・役割・処理順序を照合済みです。