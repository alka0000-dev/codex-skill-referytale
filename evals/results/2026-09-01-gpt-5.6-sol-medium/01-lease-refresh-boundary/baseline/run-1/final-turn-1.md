設計メモを作成しました。

[セッショントークン更新 設計メモ](workspace/docs/session-token-refresh-design.md)

主な命名は以下です。

- 中心語: **更新リース（Refresh Lease）**
- 条件: `RefreshDue`、`RefreshLeaseAvailable`、`RefreshMayStart`
- 状態: `IDLE`、`REFRESH_IN_FLIGHT`
- 受信イベント: `RefreshedTokenReceived`
- 監査型: `TokenRefreshAuditRecord`

原子的なリース取得、多重送信防止、監査保存とトークン切替のトランザクション化、重複応答、障害時の扱い、受け入れ基準まで記載しています。文書のみの変更なので、ビルド・リント対象はありません。