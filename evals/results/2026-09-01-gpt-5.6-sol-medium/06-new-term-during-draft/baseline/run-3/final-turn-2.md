設計メモを更新しました。

[rollout-design.md](workspace/rollout-design.md)

追加内容：

- 「整定区間」を有効化開始後の5分間として定義
- 推奨状態名：`SettlingInterval`
- 区間を `[startedAt, startedAt + 5分)` と定義
- 整定区間中はエラー率の取得・判定を行わない
- 終了時刻ちょうどから次の判定を許可
- 再起動に備えた状態の永続化と、並行判定を防ぐ排他制御を追加
- 擬似コードと検証観点を更新

Markdownの差分・末尾空白・競合マーカー検査も問題ありません。