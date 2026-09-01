# セッショントークン更新 設計メモ

## 1. 目的

セッショントークンの失効前に更新要求を送信し、同一セッションでの更新要求の重複を防ぐ。更新で受信したトークンと受信時刻は、追跡可能な監査記録として保存する。

## 2. 中心語

**更新ゲート（`RefreshGate`）**

更新可否の判定と、更新要求を一つだけ通す排他境界を表す。ゲートはセッションごとに一つ持つ。

## 3. 用語と名前

| 区分 | 名前 | 意味 |
| --- | --- | --- |
| 条件 | `RefreshDue` | トークンの残り有効時間が10分以下である |
| 条件 | `RefreshRequestAllowed` | `RefreshDue` かつゲートが `Idle` である |
| 状態型 | `RefreshGateState` | セッション単位の更新ゲート状態 |
| 状態 | `Idle` | 更新要求を送信できる |
| 状態 | `RequestInFlight` | 更新要求を送信済みで、新しいトークンを未受信である |
| イベント | `TokenRefreshRequested` | 更新要求の送信を開始した |
| イベント | `TokenRefreshReceived` | 新しいトークンを受信した |
| 監査記録型 | `TokenRefreshAuditRecord` | 受信した新しいトークンと受信時刻の記録 |

## 4. 更新条件

判定時刻を `now`、現在のトークンの失効時刻を `expiresAt` とする。

```text
RefreshDue = (expiresAt - now) <= 10 minutes
RefreshRequestAllowed = RefreshDue AND (RefreshGateState == Idle)
```

境界値を含むため、残り時間がちょうど10分でも更新対象となる。時刻は UTC のサーバー時刻を用い、比較中は同じ `now` を使う。すでに失効しているトークンも `RefreshDue` には該当するが、更新APIが失効後の更新を許さない場合は、別の再認証フローへ振り分ける。

## 5. 状態遷移

```text
Idle
  └─ RefreshRequestAllowed / TokenRefreshRequested
       → RequestInFlight

RequestInFlight
  └─ TokenRefreshReceived
       → 監査保存 → 現在トークンの置換 → Idle
```

`RefreshRequestAllowed` の確認と `Idle` から `RequestInFlight` への変更は、セッションIDをキーにした単一の原子的操作で行う。状態変更に成功した処理だけが更新要求を送信できる。プロセス内ロックだけに依存せず、複数プロセスから同じセッションを処理する場合は、共有データストアの compare-and-set、行ロック、または一意制約を使用する。

送信APIを呼ぶ前のローカルエラーで、要求が外部へ送られていないことを確実に証明できる場合に限り `Idle` へ戻せる。送信結果が不明なタイムアウトや通信断では、先行要求が到達している可能性があるため `RequestInFlight` を維持し、自動で追加要求を送らない。

## 6. 受信処理と監査記録

受信処理は更新要求に付与した `requestId` でセッションと照合する。`TokenRefreshReceived` を処理する同一トランザクション内で、次の順序を保証する。

1. `TokenRefreshAuditRecord` を永続化する。
2. セッションの現在トークンを新しいトークンへ置換する。
3. `RefreshGateState` を `Idle` に戻す。

```text
TokenRefreshAuditRecord {
  sessionId: SessionId
  requestId: RefreshRequestId
  tokenCiphertext: EncryptedToken
  receivedAt: Instant
}
```

`receivedAt` は受信処理を開始したサーバー側の UTC 時刻とする。トークンは機密情報であるため、監査ストアでは暗号化して保存し、通常のアプリケーションログ、イベント本文、メトリクスには平文を出さない。閲覧権限、保存期間、鍵のローテーションは監査ポリシーに従う。

`requestId` には一意制約を設け、同じ応答が再配送されても監査記録とトークン置換が重複しないよう冪等に処理する。監査保存に失敗した場合はトークン置換と `Idle` への遷移も行わず、トランザクションを再試行する。

## 7. 擬似コード

```text
tryRequestRefresh(session, now):
  if session.token.expiresAt - now > 10 minutes:
    return NotDue

  requestId = newRefreshRequestId()
  changed = atomicCompareAndSet(
    key = session.id,
    expected = Idle,
    next = RequestInFlight(requestId)
  )
  if not changed:
    return AlreadyInFlight

  sendRefreshRequest(session.id, requestId)
  return Requested(requestId)

onTokenRefreshReceived(sessionId, requestId, newToken, now):
  transaction:
    assert gate(sessionId) == RequestInFlight
    insertAuditIfAbsent(
      TokenRefreshAuditRecord(
        sessionId,
        requestId,
        encrypt(newToken),
        receivedAt = now
      )
    )
    replaceCurrentToken(sessionId, newToken)
    setGate(sessionId, Idle)
```

実装では、`requestId` を `RequestInFlight` 状態と同時に保存してから送信し、受信した応答が現在待機中の要求と一致することを検証する。

## 8. 受け入れ基準

- 残り有効時間が10分を超える場合、更新要求を送信しない。
- 残り有効時間が10分以下で、状態が `Idle` の場合、更新要求を一度だけ送信する。
- `RequestInFlight` の間は、同一セッションから追加の更新要求を送信しない。
- 新しいトークンの受信後にだけ、通常の更新判定を再び許可する。
- 新しいトークンとサーバー側の受信時刻を `TokenRefreshAuditRecord` として保存する。
- 並行実行および応答の再配送でも、要求、監査記録、トークン置換が重複しない。

## 9. 未決事項

- 応答が恒久的に届かないセッションを解除する運用手順。要件上、単純なタイムアウト再送は重複要求になり得るため、自動解除は行わない。
- 監査記録の保存期間、閲覧権限、暗号鍵管理。
- 失効後の更新を更新APIで扱うか、再認証へ振り分けるか。
