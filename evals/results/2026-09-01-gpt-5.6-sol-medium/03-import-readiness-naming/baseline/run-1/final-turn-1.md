推奨命名は次のとおりです。

- boolean: `isImportReady`
- 照合結果型: `ChunkVerificationResult`
- 要求送信メソッド: `requestImport()`
- 送信後の状態: `IMPORT_REQUESTED`

設計要約:

`isImportReady` は、次の条件をすべて満たす場合だけ `true` にします。

```text
予定チャンクがすべて保存済み
かつ 全チャンクの照合が完了
かつ 不一致がゼロ
かつ 状態が IMPORT_REQUESTED / COMPLETED ではない
```

準備完了時は、対象アップロードの状態を排他的に `IMPORT_REQUESTED` へ変更してから要求を送信します。同時実行対策にはDBの条件付き更新やロックを使用します。要求には冪等性キーを付与し、通信と状態保存の間で障害が起きても重複インポートを防ぎます。

状態遷移例:

```text
UPLOADING → VERIFYING → READY → IMPORT_REQUESTED → COMPLETED
```

`IMPORT_REQUESTED` の間に同じ処理が再度呼ばれても何も送信せず、完了通知を受信したときだけ `COMPLETED` に進めます。