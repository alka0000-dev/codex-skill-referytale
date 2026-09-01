# 段階的ロールアウト設計メモ

## 要件と順序

1. 状態が `SETTLING_INTERVAL` であり、有効化開始から5分が経過していない場合は、直前15分間のエラー率を算出せず、開始条件も評価しない。
2. `SETTLING_INTERVAL` でなければ、次の利用者グループを有効化する直前に、直前15分間のエラー率を一度だけ算出する。
3. 算出した値が厳密に `1%` 未満かを評価する。`1%` ちょうどの場合は条件を満たさない。
4. 条件を満たす場合だけ、次の利用者グループの有効化を開始する。
5. 有効化を開始した時点で、対象グループ、開始時刻、手順2で算出して手順3で評価したエラー率を一つの記録として保存する。同時に状態を `SETTLING_INTERVAL` にする。
6. 有効化開始から5分が経過した時点で `SETTLING_INTERVAL` を終え、それ以降に次の判定を行えるようにする。

条件評価後にエラー率を再計算しない。同じ値を記録することで、開始判断と保存された根拠を一致させる。

## 提案する名称

| 種類 | 名称 | 指すもの |
|---|---|---|
| 条件 | `isPrevious15MinuteErrorRateBelowOnePercent` | 直前15分間のエラー率が厳密に1%より小さいこと |
| 開始メソッド | `startNextUserGroupActivation` | 次の利用者グループの有効化を開始し、開始時点の記録を作成する操作 |
| 記録型 | `UserGroupActivationStartRecord` | 対象グループ、開始時刻、条件評価に使った直前15分間のエラー率を保持する記録 |
| 状態 | `SETTLING_INTERVAL` | 有効化開始から5分が経過するまで、次のエラー率算出および開始条件の評価を行わない状態 |

条件名を広い意味の「開始可能」にしないのは、グループ順序や運用承認など、まだ指定されていない条件まで含むように読めることを避けるためである。

## 型とメソッドの形

以下は言語に依存しない型の例である。

```text
type UserGroupActivationStartRecord = {
    targetGroup: UserGroup
    startedAt: Instant
    errorRateForPrevious15Minutes: Decimal
}

isPrevious15MinuteErrorRateBelowOnePercent(
    errorRateForPrevious15Minutes: Decimal
): Boolean

startNextUserGroupActivation(
    targetGroup: UserGroup,
    errorRateForPrevious15Minutes: Decimal
): UserGroupActivationStartRecord
```

`startNextUserGroupActivation` は、条件を満たした場合にだけ呼び出す。メソッド内で有効化を開始する時点の `startedAt` を取得し、引数の `targetGroup` および `errorRateForPrevious15Minutes` とともに `UserGroupActivationStartRecord` を保存する。記録するのは有効化の完了時刻ではない。

## 整定区間と状態

本メモでは、利用者グループの有効化を開始した `startedAt` から5分後までを「整定区間」と呼ぶ。境界は `[startedAt, startedAt + 5分)` とし、開始時刻を含み、5分後の時刻を含まない。

整定区間中の状態名は `SETTLING_INTERVAL` とする。この状態では、直前15分間のエラー率の算出と `isPrevious15MinuteErrorRateBelowOnePercent` の評価をどちらも行わない。`startedAt` から5分後の時刻ちょうどで整定区間を終え、その時刻以降に次の判定を許可する。

「有効化した後」の起点には、既存の開始記録と一致する `startedAt` を使用する。有効化が非同期で、開始時刻とは別に完了時刻を扱う必要がある場合は、どちらを5分間の起点とするかを再決定する必要がある。

## 未決事項

実装前に次を決める必要がある。

- エラー率の分母、集計対象、およびデータ欠損時の扱い
- 「次の利用者グループ」を決める順序と、同時実行時の重複開始防止
- `startedAt` の時刻基準と精度（通常はUTCを推奨）
- 有効化開始後に記録保存が失敗した場合の再試行方法
- プロセス再起動後も整定区間を維持するための状態保存方法
