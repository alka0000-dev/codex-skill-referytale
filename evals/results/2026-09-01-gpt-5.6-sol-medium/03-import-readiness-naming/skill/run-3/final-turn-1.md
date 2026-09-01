英語識別子、`camelCase` / `PascalCase` を想定した第一候補です。

| 種類 | 命名案 | 指すもの |
|---|---|---|
| boolean | `allChunksVerified` | 全予定チャンクが保存済みで、全チェックサム照合が完了し、すべて一致した場合のみ `true` |
| 照合結果型 | `ChecksumResult` | 1チャンクのチェックサムが「一致」または「不一致」である結果 |
| 要求送信メソッド | `sendImportRequest()` | インポート要求を一度送信する |
| 送信後の状態 | `AwaitingImportCompletion` | 要求送信済みで、完了通知をまだ受けていない状態 |

設計要約：

1. 各チャンクの照合完了時に `ChecksumResult` を記録する。未照合は結果型の値にせず、「結果がまだ存在しない」ことで表す。
2. 全予定チャンクが保存済み、全チャンクに照合結果が存在、全結果が一致、の3条件から `allChunksVerified` を求める。
3. `allChunksVerified` が `true` で、まだ `AwaitingImportCompletion` でない場合だけ `sendImportRequest()` を呼ぶ。
4. 送信成功後は `AwaitingImportCompletion` へ遷移させ、この状態を永続化する。
5. `AwaitingImportCompletion` の間は要求を再送しない。完了通知を受けた時点でこの状態を終了する。完了後の状態名は、提示要件にないため未指定とする。

指示対象と名称の対応表は [referent-table-import-request.md](workspace/.codex/referent-tables/referent-table-import-request.md) に保存しました。