設計メモを作成しました。

- 中心語: `SessionRefresh`
- 条件名: `shouldRequestSessionRefresh`
- 状態名: `AwaitingRefreshedToken`
- イベント名: `SessionRefreshRequestSent` / `RefreshedTokenReceived`
- 監査記録型: `RefreshedTokenReceiptAuditRecord`

[設計メモ](<workspace/session-token-refresh-design.md>)

[ReferyTale対応表](<workspace/.codex/referent-tables/referent-table-session-token-refresh.md>)

10分ちょうどを更新対象に含め、同一セッションでの並行判定も一件だけ送信される設計です。未指定のタイムアウト・失敗時の再試行は、追加要求禁止と衝突するため未確定事項として明示しました。文書のみの変更なので、ビルド・リント対象はありません。