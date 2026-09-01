設計文書を作り直しました。

- [保守モード開始機能 設計](<workspace/maintenance-mode-start-design.md>)
- [ReferyTale対応表](<workspace/.codex/referent-tables/referent-table-maintenance-mode-start.md>)

「保守移行点」は指示対象が一意でないため不採用とし、以下を別々に命名しました。

- 三つの開始条件
- 三条件の論理積
- 要求送信事象
- 開始済み応答を待つ状態
- 応答受信事象
- 監査用の値と記録

Phase 1の独立保存後にPhase 2を追加し、元要求との意味・役割・順序・未確定事項の照合も完了しています。文書変更のみのため、ビルドやリントの対象はありません。