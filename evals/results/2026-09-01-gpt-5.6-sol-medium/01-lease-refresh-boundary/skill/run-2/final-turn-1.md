設計メモを作成しました。

- 中心語：セッション更新境界（`SessionRefreshBoundary`）
- 条件名：`isRefreshDue`
- 状態名：`AwaitingRefreshedToken`
- イベント名：`TokenRefreshRequested` / `RefreshedTokenReceived`
- 監査記録型：`TokenRefreshAuditRecord`

[設計メモ](<workspace/docs/session-token-refresh-design.md>)

ReferyTale に従い、名称より先に指示対象と役割を分離した[対応表](<workspace/.codex/referent-tables/referent-table-session-token-refresh.md>)も保存しています。

10分ちょうどを含む境界判定、同一セッションの並行実行でも重複送信しない排他、受信時点の時刻取得、監査保存までを記載しました。送信失敗、応答タイムアウト、監査保存失敗時の再試行方針は、未決定事項として明示しています。