設計メモを更新しました。

- 整定区間の状態名: `SettlingInterval`
- 有効化成功時から5分間継続
- 整定区間中はエラー率の取得・次の判定を行わない
- `settlingEndsAt` を永続化し、再起動後も待機を維持
- 状態遷移と境界条件の受け入れ基準を追加

[更新した設計メモ](<workspace/docs/progressive-rollout.md>)

全文の再確認と差分チェックも完了しています。