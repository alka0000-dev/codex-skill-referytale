段階的ロールアウトの設計メモを作成しました。

- 条件名: `isLast15MinuteErrorRateBelowOnePercent`
- 開始メソッド名: `startUserGroupEnablement`
- 記録型名: `UserGroupEnablementStartRecord`

条件判定に使ったエラー率と記録する値を同一にし、1%ちょうどは対象外と明記しています。記録先や記録失敗時の扱いなど、要件にない事項は未決定として残しました。

- [設計メモ](workspace/staged-rollout-design.md)
- [ReferyTale対応表](workspace/.codex/referent-tables/referent-table-staged-rollout.md)

文書のみの変更のため、ビルドやテストは対象外です。原要件との再照合とReferyTaleの意味検証は完了しています。