設計メモを更新しました。

- 期間名: 「整定区間」
- 状態名: `SETTLING_INTERVAL`
- 起点: `startedAt`
- 期間: 有効化開始から5分間
- 期間中: 次の判定手順を開始しない。ただし、エラー計測自体は継続
- 5分経過後: 状態を終了し、次の判定を許可

ReferyTaleに従い、「整定区間」は時間範囲、`SETTLING_INTERVAL` はその時間範囲内のシステム状態として分離しています。

- [更新した設計メモ](workspace/staged-rollout-design.md)
- [更新した対応表](workspace/.codex/referent-tables/referent-table-staged-rollout.md)

原要件との再照合と意味検証を完了しています。文書変更のみのため、ビルド・テストは対象外です。