保守モード開始機能の設計文書を作り直しました。

- [正式名称の参照対応表](workspace/.codex/referent-tables/maintenance-mode-start.md:1)
- [保守モード開始機能 設計書](workspace/docs/maintenance-mode-start-design.md:1)
- [継続記録](workspace/.agent/CONTINUITY.md:1)

主な整理内容：

- 「保守移行点」を廃止し、三条件のANDを「保守モード開始可能条件」と命名
- 要求ID設定後は自動送信経路へ戻さない不変条件を定義
- 同時実行、タイムアウト、送達結果不明時にも再送しない設計
- 要求8項目と設計箇所・受け入れテストの対応を明示
- 状態遷移、監査テーブル、擬似コード、12件の受け入れテストを記載
- 照会API、正式な応答コード、監査保存期間を要確認事項として分離

全要求ID、名称参照ID、テストID、Markdownの基本整合性を検証し、PASSしています。