設計メモを作成しました。

[セッショントークン更新 設計メモ](<workspace/docs/session-token-refresh-design.md>)

主な命名は以下です。

- 中心語：`RefreshGate`（更新ゲート）
- 条件：`RefreshDue`、`RefreshRequestAllowed`
- 状態：`Idle`、`RequestInFlight`
- イベント：`TokenRefreshRequested`、`TokenRefreshReceived`
- 監査記録型：`TokenRefreshAuditRecord`

10分ちょうどを更新対象に含め、同時実行時の原子的な排他制御、通信結果不明時の再送禁止、監査保存とトークン置換のトランザクション、暗号化保存、応答再配送の冪等性まで定義しています。文書の必須名称・書式も検証済みです。