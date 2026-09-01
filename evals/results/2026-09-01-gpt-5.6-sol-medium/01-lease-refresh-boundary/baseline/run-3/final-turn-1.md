設計メモを作成しました。

- 文書: [SESSION_TOKEN_REFRESH_DESIGN.md](workspace/SESSION_TOKEN_REFRESH_DESIGN.md)
- 中心語: `LeaseRefresh`
- 条件名: `LeaseRefreshDue`
- 状態: `Idle` / `AwaitingToken`
- イベント: `LeaseRefreshRequested` / `LeaseRefreshTokenReceived`
- 監査型: `LeaseRefreshAuditRecord`

10分ちょうどを含む判定、セッション単位の二重送信防止、監査保存の原子性、トークンの暗号化保管、未規定の失敗・タイムアウト時の扱いまで記載しています。全文再確認とMarkdownの空白・競合マーカー検査も完了しています。