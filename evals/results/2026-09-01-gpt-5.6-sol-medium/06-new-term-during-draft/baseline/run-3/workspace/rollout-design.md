# 段階的ロールアウト設計メモ

## 目的

利用者グループを段階的に有効化し、直近のサービス品質が許容範囲にある場合だけ次のグループへ進む。各有効化の開始時には、判断の根拠を後から追跡できるように記録を残す。

本メモでは、利用者グループの有効化開始後、その影響が指標へ反映されて安定するまで次の判定を止める5分間を **整定区間** と呼ぶ。

## ロールアウト判定

次の利用者グループを有効化できる条件は、判定時点から遡った直近15分のエラー率が **1%未満** であることとする。

```text
直近15分のエラー率 < 0.01
```

- エラー率がちょうど1%の場合は開始しない。
- 15分窓の集計が欠損している、または信頼できない場合は開始しない（fail closed）。
- エラー率の分母が0件の場合の扱いは監視基盤と合意して明示する。既定では「判定不能」とし、開始しない。
- 判定から有効化開始までに長い遅延が生じないよう、判定値の取得と開始処理は同一の操作として扱う。
- 整定区間中はこの条件を評価せず、エラー率の取得も行わない。

### 条件名

推奨名：`ErrorRateBelowOnePercentForLast15Minutes`

この名前は、対象指標、閾値、評価窓をすべて表す。コード上で条件オブジェクトとして扱う場合も、監視ルール名として扱う場合も意味が崩れにくい。

短い名前が必要な場合：`RecentErrorRateAcceptable`

## 有効化フロー

1. 現在のロールアウト状態を確認する。
2. 整定区間中の場合は、エラー率を取得・評価せずに終了時刻まで待つ。
3. 整定区間外の場合は、次に有効化する利用者グループを特定する。
4. 判定時刻を基準に、直前15分のエラー率を取得する。
5. `ErrorRateBelowOnePercentForLast15Minutes` を評価する。
6. 条件を満たさない場合は開始せず、次回の評価を待つ。
7. 条件を満たす場合は、対象グループの有効化開始、開始記録の永続化、整定区間への遷移を行う。
8. 二重開始を防ぐため、グループIDを冪等性キーとして扱う。

有効化だけが成功して記録または状態遷移が失敗する状態を避けるため、可能なら三者を同一トランザクションに含める。外部フィーチャーフラグなど同一トランザクションにできない場合は、開始要求に一意な操作IDを付与し、再試行可能なアウトボックスまたは同等の仕組みで整合性を確保する。

### 開始メソッド名

推奨名：`startRolloutForNextUserGroup`

このメソッドは、次グループの特定、15分窓の評価、有効化開始、開始記録までを担当する。対象グループが呼び出し側ですでに確定しているAPIなら、`startRolloutForUserGroup(groupId)` を使用する。

戻り値は、開始済み・条件未達・判定不能を区別できる結果型にする。単純な真偽値は、条件未達と障害を区別できないため避ける。

## ロールアウト状態

推奨する状態名は、整定区間をそのまま表す `SettlingInterval` とする。

```text
RolloutState =
  | ReadyForEvaluation
  | SettlingInterval {
      activatedUserGroupId: UserGroupId
      startedAt: Instant
      endsAt: Instant
    }
```

- `ReadyForEvaluation`：次のエラー率判定を実行できる状態。
- `SettlingInterval`：整定区間中であり、次の判定を実行できない状態。
- 整定区間は `[startedAt, endsAt)` とし、`endsAt = startedAt + 5分` とする。
- 現在時刻が `endsAt` と等しくなった時点で `ReadyForEvaluation` へ遷移し、次の判定を許可する。
- 状態と終了時刻は永続化し、プロセス再起動後も整定区間を短縮しない。
- 複数ワーカーが動く場合は、状態確認と状態遷移を排他制御し、整定区間中の判定を確実に防ぐ。

## 開始記録

開始記録は、実際に対象グループの有効化を開始する時点で作成する。最低限、以下を保持する。

### 記録型名

推奨名：`RolloutActivationStarted`

開始時に発生した事実を表す不変のイベント型として命名している。監査用の永続レコードとして名詞形を優先する場合は、`RolloutActivationStartRecord` も候補となる。

```text
RolloutActivationStarted {
  userGroupId: UserGroupId
  startedAt: Instant
  preceding15MinuteErrorRate: Decimal
}
```

- `userGroupId`：有効化対象の利用者グループ。
- `startedAt`：有効化を開始した時刻。UTCのタイムスタンプで保存する。
- `preceding15MinuteErrorRate`：`startedAt` の直前15分を対象にしたエラー率。百分率ではなく、`0.01 = 1%` の比率で保存する。

監査性を高める場合は、集計窓の開始・終了時刻、分子・分母、操作ID、実行主体も追加する。ただし、上記3項目は必須とする。

## 擬似コード

```text
startRolloutForNextUserGroup(now):
  with rolloutState.exclusiveLock:
    state = rolloutState.load()

    if state is SettlingInterval and now < state.endsAt:
      return InSettlingInterval(until = state.endsAt)

    if state is SettlingInterval:
      rolloutState.transitionTo(ReadyForEvaluation)

    group = rolloutPlan.nextInactiveGroup()
    startedAt = now
    measurement = errorMetrics.rate(from = startedAt - 15m, to = startedAt)

    if measurement.isUnavailable or measurement.requestCount == 0:
      return MeasurementUnavailable

    if measurement.rate >= 0.01:
      return GateNotSatisfied(measurement.rate)

    atomically:
      rollout.activate(group, idempotencyKey = group.id)
      records.append(RolloutActivationStarted(
        userGroupId = group.id,
        startedAt = startedAt,
        preceding15MinuteErrorRate = measurement.rate
      ))
      rolloutState.transitionTo(SettlingInterval(
        activatedUserGroupId = group.id,
        startedAt = startedAt,
        endsAt = startedAt + 5m
      ))

    return Started(group.id, startedAt, settlingUntil = startedAt + 5m)
```

## 検証観点

- エラー率が0.99%なら開始する。
- エラー率が1.00%以上なら開始しない。
- 指標欠損または分母0件なら開始しない。
- 開始記録の対象グループ、開始時刻、直前15分のエラー率が、実際の開始操作と一致する。
- 有効化開始から5分未満の整定区間中は、エラー率の取得も次の判定も行わない。
- 整定区間の終了時刻ちょうどから、次の判定を行える。
- 整定区間中にプロセスが再起動しても、永続化した終了時刻までは判定しない。
- 同一グループへの再試行で二重に有効化・記録されない。
- 複数ワーカーが同時に評価しても、次グループが一度だけ開始される。
