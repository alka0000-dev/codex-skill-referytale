# セッショントークン更新 設計メモ

## 中心語

提案する中心語は **`TokenRefreshGate`（更新ゲート）** とする。

`TokenRefreshGate`とは、セッショントークンの残り有効時間を判定し、同じセッションから応答待ちの更新要求を重ねず、新しいトークンの受信後にその値と受信時刻を保存する一連の仕組みを指す。

## 命名

| 種類 | 名称 | 指すもの |
|---|---|---|
| 条件 | `canSendTokenRefreshRequest` | 残り有効時間が10分以下で、同じセッションに応答待ちの更新要求が存在しないこと |
| 状態 | `NO_REFRESH_IN_FLIGHT` | 同じセッションに、送信済みで新しいトークンをまだ受け取っていない更新要求が存在しない状態 |
| 状態 | `REFRESH_IN_FLIGHT` | 同じセッションから更新要求を送信済みで、新しいトークンをまだ受け取っていない状態 |
| イベント | `TOKEN_REFRESH_REQUEST_SENT` | 条件を満たした同じセッションから更新要求を一度送信した事象 |
| イベント | `NEW_SESSION_TOKEN_RECEIVED` | 送信した更新要求に対する新しいセッショントークンを受け取った事象 |
| 監査記録型 | `TokenRefreshAuditRecord` | 受け取った新しいセッショントークンと、その受信時刻を一組で保持する記録 |

## 判定と状態遷移

状態はセッションごとに保持し、初期値を `NO_REFRESH_IN_FLIGHT` とする。

| 現在の状態・条件 | 動作 | イベント | 次の状態 |
|---|---|---|---|
| 残り有効時間が10分を超える | 送信しない | なし | 変更なし |
| `NO_REFRESH_IN_FLIGHT` かつ残り有効時間が10分以下 | 更新要求を一度送信する | `TOKEN_REFRESH_REQUEST_SENT` | `REFRESH_IN_FLIGHT` |
| `REFRESH_IN_FLIGHT` | 残り有効時間にかかわらず追加送信しない | なし | `REFRESH_IN_FLIGHT` |
| `REFRESH_IN_FLIGHT` で新しいトークンを受信 | 受信値と受信時刻を保存する | `NEW_SESSION_TOKEN_RECEIVED` | `NO_REFRESH_IN_FLIGHT` |

同じセッションについて、`canSendTokenRefreshRequest`の評価から要求送信の完了および `REFRESH_IN_FLIGHT` への変更までは、別の実行が途中へ割り込めない一続きの操作として扱う。これにより、並行した複数の評価がいずれも送信可能と判断して重複送信することを防ぐ。

新しいトークンの受信処理では、受信した時点の時刻を直ちに取得する。その値を `receivedAt`、受信したトークンを `receivedToken` として `TokenRefreshAuditRecord` に保存した後、状態を `NO_REFRESH_IN_FLIGHT` に戻す。

## 監査記録

```text
TokenRefreshAuditRecord {
  receivedToken: string
  receivedAt: timestamp
}
```

`receivedAt` は応答側が申告した時刻ではなく、このシステムが新しいトークンを受け取った時点の時刻とする。

トークンそのものは認証情報である。要件どおり値を保存する場合、保存先のアクセスを監査担当の必要最小限に制限し、保存時の暗号化を適用し、通常のアプリケーションログへ平文で出力しない。

## 守るべき性質

- 同じセッションで `REFRESH_IN_FLIGHT` となる更新要求は最大1件である。
- `canSendTokenRefreshRequest` が偽なら、更新要求を送信しない。
- `NEW_SESSION_TOKEN_RECEIVED` の処理では、`receivedToken` と `receivedAt` を同じ `TokenRefreshAuditRecord` に保存する。

## 未決定事項

更新要求の送信失敗、無応答、または期限切れに対する再送条件は、提示された要件にはない。現要件をそのまま適用すると、新しいトークンを受け取るまで `REFRESH_IN_FLIGHT` を維持し、追加要求を送信しない。運用上再送が必要なら、解除条件、再送回数、待機時間を別要件として決める必要がある。
