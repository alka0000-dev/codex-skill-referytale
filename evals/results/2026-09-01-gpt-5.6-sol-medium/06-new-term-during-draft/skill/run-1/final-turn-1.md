## 段階的ロールアウト設計メモ

次の利用者グループを有効化する直前に、直近15分のエラー率を算出します。値が厳密に1%未満の場合だけ有効化を開始します。1%ちょうどの場合は開始しません。

```text
last15MinuteErrorRate < 0.01
```

有効化の開始時に、次の3項目を同じ記録として保存します。

```text
GroupActivationStartRecord
├── targetGroup
├── startedAt
└── last15MinuteErrorRate
```

推奨名称は次のとおりです。

| 種類 | 名称 |
|---|---|
| 条件名 | `isLast15MinuteErrorRateBelowOnePercent` |
| 開始メソッド名 | `startGroupActivation` |
| 記録型名 | `GroupActivationStartRecord` |

処理順序は以下です。

1. 直近15分のエラー率を算出する。
2. `isLast15MinuteErrorRateBelowOnePercent` を評価する。
3. 不成立なら何も有効化せず、開始記録も作らない。
4. 成立したら次の利用者グループを特定する。
5. `startGroupActivation` に対象グループと、判定に使ったエラー率を渡す。
6. メソッド内で開始時刻を取得し、有効化を開始すると同時に `GroupActivationStartRecord` を保存する。

型の概略は次のようになります。

```ts
type GroupActivationStartRecord = {
  targetGroup: string;
  startedAt: Instant;
  last15MinuteErrorRate: number;
};
```

判定に使用したエラー率と記録するエラー率は、同じ値を使います。再計算すると、開始判断の根拠と記録値が食い違う可能性があるためです。

なお、次の事項は要件として未確定です。

- エラー率の分子と分母
- 利用者グループの順序と特定方法
- 条件を評価する周期
- 記録保存に失敗した場合に有効化を中止するか

`referytale` に従い、条件・開始事象・記録・操作を分離してから命名しました。対応表は[こちら](workspace/.codex/referent-tables/referent-table-staged-rollout-activation.md)です。