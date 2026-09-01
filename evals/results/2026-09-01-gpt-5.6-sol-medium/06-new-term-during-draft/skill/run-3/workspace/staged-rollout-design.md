# 段階的ロールアウト設計メモ

## 目的

直前15分間のエラー率を根拠に、次の利用者グループの有効化を開始するか判断する。有効化を開始した場合は、対象と開始時点と判断に使った値を後から追跡できるようにする。また、有効化の開始後5分間は次の判定を行わない。

## 判定と開始の順序

1. 判断時点から直前15分間のエラー率を取得する。
2. 条件 `isLast15MinuteErrorRateBelowOnePercent` を `preceding15MinuteErrorRate < 0.01` で判定する。1%ちょうどは条件を満たさない。
3. 条件を満たさない場合、次の利用者グループの有効化は開始しない。
4. 条件を満たす場合、対象グループと、手順1で取得して条件判定に使った同じエラー率を渡して `startUserGroupEnablement` を呼び出す。
5. `startUserGroupEnablement` は、有効化を開始した時刻を取得し、その開始時点で `UserGroupEnablementStartRecord` を作成して記録する。
6. 有効化を開始した時点から整定区間に入り、状態を `SETTLING_INTERVAL` とする。
7. 整定区間では5分間待ち、手順1と手順2から成る次の判定を開始しない。エラーの計測自体は停止しない。
8. `startedAt` から5分が経過した時点で `SETTLING_INTERVAL` を終える。その後、手順1から次の判定を行える。

## 提案する名称

| 種類 | 名称 | 指すもの |
|---|---|---|
| 条件 | `isLast15MinuteErrorRateBelowOnePercent` | 判断時点から直前15分間のエラー率が1%未満であること |
| 開始メソッド | `startUserGroupEnablement` | 指定された次の利用者グループの有効化を開始する操作 |
| 記録型 | `UserGroupEnablementStartRecord` | 有効化を開始した時点の対象グループ、開始時刻、直前15分のエラー率をまとめた記録 |
| 状態 | `SETTLING_INTERVAL` | 有効化開始から5分が経過するまで、次のエラー率判定を行わない状態 |

開始メソッドは、少なくとも `targetGroup` と `preceding15MinuteErrorRate` を受け取る。戻り値は要件にないため、このメモでは定めない。

## 記録する項目

```text
UserGroupEnablementStartRecord
  targetGroup
  startedAt
  preceding15MinuteErrorRate
```

- `targetGroup`: 有効化を開始する利用者グループを識別する値。
- `startedAt`: その利用者グループの有効化を開始した時刻。
- `preceding15MinuteErrorRate`: 有効化開始の直前15分間について観測され、条件判定に使われたエラー率。同じ値を再計算せず記録する。

## 整定区間

整定区間とは、`startedAt` から5分後までの時間範囲を指す。システムはこの時間範囲にある間だけ `SETTLING_INTERVAL` 状態となり、次の利用者グループを有効化するためのエラー率判定を行わない。

整定区間が終わる前に判定の実行要求を受けた場合も判定は行わない。5分経過後は `SETTLING_INTERVAL` を終え、次の判定を実行できる。

## 未決定事項

記録先、記録に失敗した場合に有効化を中止するか、各項目の具体的なデータ型は、提示された要件だけでは決まらないため別途決定する。
