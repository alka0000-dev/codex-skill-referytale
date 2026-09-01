推奨する命名は次のとおりです。

| 対象 | 推奨名 | 意味 |
|---|---|---|
| boolean | `isReadyToImport` | 全チャンクが保存済みで、全チェックサムが一致している |
| 照合結果型 | `ChecksumResult` | `MATCHED` / `MISMATCHED` |
| 要求送信メソッド | `requestImport()` | 条件を確認してインポート要求を送る |
| 送信後の状態 | `IMPORT_REQUESTED` | 要求送信済みで、完了通知を待っている |

設計要約：

```text
isReadyToImport =
    予定チャンク数 > 0
    AND 予定された全チャンクが保存済み
    AND 全チャンクに ChecksumResult がある
    AND 全結果が MATCHED
```

`requestImport()` は `isReadyToImport` が真で、状態がまだ `IMPORT_REQUESTED` でない場合だけ実行します。送信成功後は状態を `IMPORT_REQUESTED` として永続化し、完了通知を受けるまで再実行を拒否します。

想定する状態遷移は以下です。

```text
UPLOADING → VERIFYING → READY_TO_IMPORT
                            ↓ requestImport()
                     IMPORT_REQUESTED
                            ↓ 完了通知
                         COMPLETED
```

並行実行による二重送信を防ぐため、`READY_TO_IMPORT` から `IMPORT_REQUESTED` への更新はロックまたは条件付き更新で排他的に扱うのが安全です。