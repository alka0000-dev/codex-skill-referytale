# 段階的ロールアウト設計メモ

## 目的

サービスの健全性を確認しながら、利用者グループを一つずつ有効化する。次のグループへ進む条件と、有効化開始時に残す監査記録を明確にする。

## 用語と命名案

| 対象 | 推奨名 | 意味 |
| --- | --- | --- |
| 条件 | `RecentErrorRateUnderThreshold` | 直近の評価窓におけるエラー率が閾値未満であること |
| 開始メソッド | `startGroupActivation` | 指定した利用者グループの有効化を開始すること |
| 記録型 | `GroupActivationStarted` | グループの有効化を開始した時点の監査イベント |
| 整定区間の状態 | `SettlingInterval` | グループの有効化後、次の判定を抑止する5分間の状態 |

条件名には判定窓や閾値を埋め込まず、`window = 15 minutes` と `threshold = 1%` は設定値として扱う。これにより、値の変更で名前と実装が食い違うことを防ぐ。

## 有効化条件

判定時刻を `T` とし、期間 `[T - 15分, T)` に含まれる対象リクエストを集計する。

```text
errorRate = errorCount / requestCount
RecentErrorRateUnderThreshold := errorRate < 0.01
```

- `1%未満` は厳密な不等号とし、`1.00%` は条件を満たさない。
- エラーの定義と集計対象のリクエストは、監視指標側で固定し、ロールアウト中に変更しない。
- `requestCount = 0`、指標取得失敗、または集計データが不完全な場合は条件不成立として扱い、有効化しない（fail closed）。
- すでに別グループの有効化が進行中の場合は、次の有効化を開始しない。
- ロールアウト状態が `SettlingInterval` の場合は、エラー率を取得せず、次の有効化条件も評価しない。

## 開始処理

`startGroupActivation(targetGroup)` は、次の順序で処理する。

1. 現在有効なグループとロールアウト状態から、`targetGroup` が正しい「次のグループ」であることを確認する。
2. 判定時刻 `T` に直前15分のエラー率を取得し、`RecentErrorRateUnderThreshold` を評価する。
3. 条件を満たさない場合は状態を変更せず終了する。
4. 条件を満たす場合は、有効化の開始と同じ原子的な処理内で `GroupActivationStarted` を永続化する。
5. 対象グループの有効化を開始する。
6. 有効化が成功し、対象グループが利用可能になった時刻を起点として、状態を `SettlingInterval` に遷移させる。

同じグループへの重複呼び出しに備え、ロールアウトIDと対象グループの組み合わせを冪等性キーとする。開始記録を保存できない場合は、有効化も開始しない。

## 整定区間

整定区間とは、ある利用者グループの有効化が成功した後、その影響が監視指標へ現れるのを待つ5分間を指す。この間は次のグループに対するエラー率の取得および有効化可否の判定を行わない。

ロールアウト状態は次の順に遷移する。

```text
ReadyForEvaluation
  -> ActivatingGroup
  -> SettlingInterval
  -> ReadyForEvaluation
```

有効化が成功して対象グループが利用可能になった時刻を `settlingStartedAt` とし、整定区間を `[settlingStartedAt, settlingStartedAt + 5分)` と定義する。`settlingEndsAt = settlingStartedAt + 5分` を状態とともに永続化する。

- 現在時刻が `settlingEndsAt` より前であれば、スケジューラーから呼び出されても判定処理を直ちに終了する。
- 現在時刻が `settlingEndsAt` 以上になった最初の実行で、状態を `ReadyForEvaluation` に戻して次の判定を許可する。
- 有効化が失敗した場合は `SettlingInterval` へ遷移しない。失敗時の再試行方針は有効化処理側で扱う。
- プロセス再起動後も抑止を維持できるよう、待機をインメモリータイマーだけに依存させない。

## 開始記録

最小構成は次のとおりとする。

```text
GroupActivationStarted {
  targetGroup: GroupId
  startedAt: Instant
  preceding15MinuteErrorRate: Rate
}
```

- `targetGroup`: 有効化対象の利用者グループ。
- `startedAt`: 有効化開始を確定した時刻。UTCの ISO 8601 形式で保持する。
- `preceding15MinuteErrorRate`: `startedAt` の直前15分を対象に、開始判定で実際に使用したエラー率。割合値（例: `0.0087`）として保持する。

運用上は、原因追跡と再計算を容易にするため、次の項目も追加することを推奨する。

```text
rolloutId
windowStartedAt
windowEndedAt
errorCount
requestCount
threshold
metricDefinitionVersion
```

## 受け入れ基準

- 直前15分のエラー率が `0.99%` なら、次のグループの有効化を開始できる。
- エラー率が `1.00%` 以上なら、開始しない。
- 指標が取得不能、分母がゼロ、またはデータが不完全なら、開始しない。
- 開始した場合、対象グループ、開始時刻、判定に使った直前15分のエラー率が必ず一件だけ記録される。
- 同一グループへの再試行で、二重の開始や開始記録の重複が発生しない。
- 有効化成功後は状態が `SettlingInterval` となり、5分間は指標取得も次の判定も行われない。
- `settlingEndsAt` の直前には判定せず、同時刻以降の最初の実行で次の判定を行える。
- プロセスを再起動しても、永続化された `settlingEndsAt` まで整定区間が継続する。
