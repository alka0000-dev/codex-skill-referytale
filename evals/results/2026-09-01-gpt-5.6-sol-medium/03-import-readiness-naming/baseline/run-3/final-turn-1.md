推奨する命名は次の組み合わせです。

| 対象 | 推奨名 | 意味 |
|---|---|---|
| boolean | `canRequestImport` | 現在インポート要求を送信できる |
| 照合結果型 | `ChecksumVerificationResult` | 全チャンクのチェックサム照合結果 |
| 送信メソッド | `requestImport()` | インポート開始を要求する |
| 送信後の状態 | `ImportRequested` | 要求済みで完了通知待ち |

判定条件は以下です。

```text
canRequestImport =
  予定された全チャンクが保存済み
  AND 全チャンクの照合が完了
  AND 不一致が0件
  AND 現在の状態が ImportRequested でも Completed でもない
```

状態遷移はシンプルに保てます。

```text
Uploading
  → Verifying
  → Ready
  → ImportRequested
  → Completed
```

不一致があれば `VerificationFailed` に遷移させ、`Ready` には進めません。

`requestImport()` 内で送信可否を再確認し、`Ready → ImportRequested` の遷移と要求の登録を同一トランザクションで処理するのが安全です。`ImportRequested` 中の呼び出しは送信せず、完了通知を受けたときだけ `Completed` に遷移させます。

さらに堅牢にするなら、アップロード単位の `importRequestId` を冪等性キーとして付与し、同じアップロードに対する要求が一意になる制約を設けます。