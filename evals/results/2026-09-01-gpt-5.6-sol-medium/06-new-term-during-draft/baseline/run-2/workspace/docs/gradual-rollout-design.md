# 段階的ロールアウト設計メモ

## 目的

ロールアウト済みの範囲における直近15分のエラー率が1%未満の場合に限り、次の利用者グループの有効化を開始する。有効化開始時の判断根拠を、後から監査できる形で記録する。有効化が適用された後は5分間待ち、その間は次の判定を行わない。

## 用語と提案名

| 種別 | 提案名 | 意味 |
| --- | --- | --- |
| 条件名 | `ErrorRateBelowThresholdForLast15Minutes` | 直近15分のエラー率が規定値を厳密に下回ること |
| 開始メソッド名 | `startNextGroupActivation` | 条件を評価し、次のグループの有効化を開始する操作 |
| 記録型名 | `GroupActivationStartRecord` | 有効化開始時点の対象と判断根拠を表す不変の記録 |
| 状態名 | `Settling` | 有効化の適用後、次の判定を止めて影響の安定を待っている状態 |

設定可能な一般化を重視する場合、条件名は `ErrorRateBelowThreshold` とし、観測窓と閾値を設定値として渡してもよい。本メモでは15分・1%という業務ルールが名前から分かる具体名を採用する。

## 整定区間

対象グループへの有効化が適用された時刻から、システムがその影響の安定を待つ5分間を「整定区間」と呼ぶ。ロールアウト状態は有効化の適用成功時に `Settling` へ遷移し、適用時刻を `activatedAt`、整定区間の終了時刻を `settlingUntil = activatedAt + 5分` として永続化する。

整定区間は `[activatedAt, settlingUntil)` とする。この区間ではスケジューラーが起動しても次のエラー率判定を行わず、メトリクスも取得しない。`now >= settlingUntil` になった最初の実行で判定可能な状態へ遷移し、その実行から通常の15分判定を再開する。再開時の観測区間も判定時刻の直前15分であり、整定区間の5分間を含む。状態と終了時刻は永続化し、プロセス再起動後も待機を継続できるようにする。

## 判定ルール

- 評価時刻を `evaluatedAt` とし、観測区間を `(evaluatedAt - 15分, evaluatedAt]` とする。
- エラー率は `errorCount / eligibleRequestCount` で算出する。
- `eligibleRequestCount` はロールアウトの健全性判定対象となる全リクエスト数、`errorCount` はそのうちエラーと分類された件数とする。対象エンドポイントとエラー分類は運用開始前に固定し、メトリクス定義を変更する場合は版を分ける。
- 有効化可能な条件は `errorRate < 0.01`。`1.00%` ちょうどは条件不成立とする。
- 分母が0件、メトリクス取得失敗、または15分窓が完全に集計できていない場合は条件不成立とする（fail closed）。
- 次のグループが存在しない場合は何も開始しない。

リクエスト数が極端に少ない環境では、偶然による誤判定を避けるため `minimumEligibleRequestCount` の導入を推奨する。具体値はトラフィック実績に基づいて別途決定する。

## 開始処理

`startNextGroupActivation` は次の順序で処理する。

1. ロールアウト単位の排他制御を取得し、二重開始を防ぐ。
2. 状態が `Settling` で `now < settlingUntil` の場合は、メトリクスを取得せず終了する。
3. `now >= settlingUntil` の場合は整定区間を終了し、判定可能な状態へ遷移する。
4. 次に有効化する利用者グループを確定する。
5. 同一の `evaluatedAt` を基準に直近15分の集計値を取得し、条件を評価する。
6. 条件成立時、`GroupActivationStartRecord` を永続化する。
7. 記録の永続化成功後、対象グループの有効化処理を開始する。
8. 開始要求に失敗した場合は記録を削除せず、結果状態と失敗理由を追記して監査可能にする。

開始記録の保存と有効化要求の間の障害に備え、有効化要求には `activationId` を冪等性キーとして渡す。可能なら、開始記録と送信予定イベントを同一トランザクションで保存する outbox 方式を用いる。ここでいう「開始時刻」は、外部処理の完了時刻ではなく、システムが有効化開始を決定して記録を確定した時刻とする。

有効化の適用成功を受け取った処理は、同じ排他制御の下で状態を `Settling` にし、`activatedAt` と `settlingUntil` を保存する。有効化開始から適用成功までの時間は整定区間に含めない。

## 記録型

```text
GroupActivationStartRecord {
  activationId: UUID
  targetGroupId: GroupId
  startedAt: Instant
  observationWindowStart: Instant
  observationWindowEnd: Instant
  errorRate: Decimal
  errorCount: Integer
  eligibleRequestCount: Integer
  threshold: Decimal       // 0.01
  metricDefinitionVersion: String
}
```

必須要件である対象グループ、開始時刻、直前15分のエラー率は、それぞれ `targetGroupId`、`startedAt`、`errorRate` に保存する。加えて、再計算と監査のために観測区間、件数、閾値、メトリクス定義版も保存する。率は浮動小数点ではなく `Decimal`、または比率の分子・分母で扱う。

## 擬似コード

```text
startNextGroupActivation(rolloutId, now):
  with rolloutLock(rolloutId):
    rollout = loadRollout(rolloutId)
    if rollout.state == Settling and now < rollout.settlingUntil:
      return SettlingPeriodActive(rollout.settlingUntil)

    if rollout.state == Settling:
      transitionToReadyForEvaluation(rolloutId)

    target = findNextInactiveGroup(rolloutId)
    if target is None:
      return NoNextGroup

    window = (now - 15 minutes, now]
    metrics = loadErrorMetrics(rolloutId, window)

    if metrics is unavailable
       or metrics.windowIncomplete
       or metrics.eligibleRequestCount == 0:
      return ConditionNotMet

    errorRate = metrics.errorCount / metrics.eligibleRequestCount
    if not ErrorRateBelowThresholdForLast15Minutes(errorRate, 0.01):
      return ConditionNotMet

    record = GroupActivationStartRecord(
      activationId = newUuid(),
      targetGroupId = target.id,
      startedAt = now,
      observationWindowStart = window.start,
      observationWindowEnd = window.end,
      errorRate = errorRate,
      errorCount = metrics.errorCount,
      eligibleRequestCount = metrics.eligibleRequestCount,
      threshold = 0.01,
      metricDefinitionVersion = metrics.definitionVersion
    )

    persistRecordAndOutboxEvent(record)
    return ActivationStarted(record.activationId)

onGroupActivationApplied(rolloutId, activationId, activatedAt):
  with rolloutLock(rolloutId):
    transitionToSettling(
      rolloutId = rolloutId,
      activationId = activationId,
      activatedAt = activatedAt,
      settlingUntil = activatedAt + 5 minutes
    )
```

## 受け入れ基準

- 直前15分のエラー率が `0.99%` なら次のグループの有効化を開始する。
- エラー率が `1.00%` 以上なら開始しない。
- 分母0件、集計未完了、メトリクス取得失敗のいずれでも開始しない。
- 開始記録には対象グループ、開始時刻、同じ時刻を終端とする直前15分のエラー率が残る。
- 並行実行や再試行があっても、同じグループを重複して有効化しない。
- 開始要求が失敗しても、判断時の開始記録と失敗結果を追跡できる。
- 有効化の適用成功時に状態が `Settling` となり、`activatedAt` と5分後の `settlingUntil` が保存される。
- `now < settlingUntil` の間は次の判定も、そのためのメトリクス取得も行わない。
- `now == settlingUntil` では整定区間を終了し、その実行から次の判定を再開できる。
- 整定区間中にプロセスが再起動しても、保存済みの状態と終了時刻に従って残り時間の判定停止を継続する。
