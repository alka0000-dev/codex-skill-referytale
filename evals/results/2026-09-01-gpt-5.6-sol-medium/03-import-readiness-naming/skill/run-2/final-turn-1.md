推奨する命名は次の組み合わせです。

| 対象 | 名前 | 指す内容 |
|---|---|---|
| boolean | `isImportReady` | 全チャンク保存済み・全件照合済み・不一致0件 |
| 照合結果型 | `ChecksumResult` | 1チャンクのチェックサム照合結果 |
| 送信メソッド | `requestImport()` | 条件成立時にインポート要求を送信 |
| 送信後の状態 | `AwaitingImportCompletion` | 送信後、完了通知を待ち、再送しない状態 |

設計要約：

1. 予定された全チャンクが保存済みか確認する。
2. 各チャンクの照合完了時に `ChecksumResult` を作る。結果がないチャンクは未照合として扱う。
3. 全予定チャンクに結果があり、すべて一致した場合だけ `isImportReady` を真にする。この値は保存せず、現在の保存状況と照合結果から算出する。
4. `requestImport()` は `isImportReady` が真で、まだ `AwaitingImportCompletion` でない場合だけ要求を送る。
5. 送信成功後は `AwaitingImportCompletion` に入り、完了通知を受けるまで再送しない。
6. 完了通知を受けたら同状態を終了する。遷移先の状態名は今回の要件では未定です。

`isImportReady` はデータ側の準備完了だけを表し、送信済みかどうかは `AwaitingImportCompletion` で管理するため、役割が混ざりません。

ReferyTaleによる指示対象と命名の対応表は[こちら](workspace/.codex/referent-tables/referent-table-import-readiness.md)です。