設計メモを作成しました。

- 中心語: `TokenRefreshGate`（更新ゲート）
- 条件名: `canSendTokenRefreshRequest`
- 状態名: `NO_REFRESH_IN_FLIGHT` / `REFRESH_IN_FLIGHT`
- イベント名: `TOKEN_REFRESH_REQUEST_SENT` / `NEW_SESSION_TOKEN_RECEIVED`
- 監査記録型: `TokenRefreshAuditRecord`

成果物:

- [設計メモ](workspace/session-token-refresh-design.md)
- [ReferyTale対応表](workspace/.codex/referent-tables/referent-table-session-token-refresh.md)

同一セッションの並行判定による重複送信を防ぐため、条件判定から送信完了・状態変更までを割り込み不可としています。失敗・無応答時の再送条件は要件にないため、未決定事項として明記しました。

文書と対応表を再照合済みです。文書のみの変更のため、ビルド・リント対象はありません。