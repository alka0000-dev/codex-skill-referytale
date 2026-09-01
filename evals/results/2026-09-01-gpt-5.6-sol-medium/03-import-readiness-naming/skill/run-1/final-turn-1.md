推奨する命名は次のとおりです。

- boolean: `isImportReady`
- 照合結果型: `ChunkChecksumResult`
- 送信メソッド: `sendImportRequest()`
- 送信後の状態: `AwaitingImportCompletion`

設計要約:

1. 全チャンクの保存を確認する。
2. 全チャンクのチェックサム照合完了を確認する。
3. 不一致がなければ `isImportReady = true` とする。
4. `sendImportRequest()` を実行し、直ちに `AwaitingImportCompletion` へ遷移する。
5. この状態では送信メソッドを再実行しない。完了通知を受けた時点で状態を終了する。

準備状況を表す boolean と再送を防ぐ状態を分離しているため、それぞれの意味が明確です。命名の対応根拠は[referent table](workspace/.codex/referent-tables/referent-table-import-readiness-naming.md)に保存しました。