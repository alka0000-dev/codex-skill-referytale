設計メモを更新しました。

- 期間名: 「整定区間」
- 状態名: `SETTLING_INTERVAL`
- 範囲: `[startedAt, startedAt + 5分)`
- 区間中はエラー率の算出・次の条件判定を実行しない
- 5分後の時刻ちょうどから次の判定を許可

[更新した設計メモ](<workspace/staged-rollout-design.md>)

ReferyTaleの[対応表](<workspace/.codex/referent-tables/referent-table-staged-rollout.md>)では、「5分間の時間範囲」と「判定を行わない状態」を別の役割として追加済みです。意味検証とMarkdown形式検査も完了しています。