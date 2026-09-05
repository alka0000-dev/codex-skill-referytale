# ReferyTale 比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T06:43:00.085Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.15`
- 対象ケース: 1件
- 実行回数: 各条件・各ケース5回、計10出力
- 対象Git状態: `3b2c3e6a1c598ba1d41e45a8d8e7235d92aec041`（クリーン）
- Skill SHA-256: `2e8a8d665611e4f2cfb20a21a533d2d0b66638a5e1987e4a6d47aa4e63f56aaa`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 1/5 (20.00%)、生成エラー0件、未生成0件、未採点0件
- Skillあり: 5/5 (100.00%)、生成エラー0件、未生成0件、未採点0件
- 合格率差: +80.00ポイント
- ケース比較: 改善1、同等0、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p23-draft-is-not-a-source | rewrite | F1, P1, Q2, M1, V1 | 1/5 | 5/5 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 1/5 (20.00%) | 5/5 (100.00%) |
| F2 — Uncertainty | — | — |
| V1 — Vocabulary provenance | 5/5 (100.00%) | 5/5 (100.00%) |
| V2 — User term retention | — | — |
| P1 — Skill composition | 5/5 (100.00%) | 5/5 (100.00%) |
| Q1 — Naturalness | — | — |
| Q2 — No over-structuring | 4/5 (80.00%) | 5/5 (100.00%) |
| M1 — Meaning preservation | 1/5 (20.00%) | 5/5 (100.00%) |
| A1 — Temporary artifact handling | — | — |
| N1 — Out-of-scope non-interference | — | — |
| D1 — Diagnostic evidence | — | — |

## 不合格の内訳

- p23-draft-is-not-a-source — Skillなし run 1: 未提示の否定事実と新しい行動を加えており、原素材の意味を保っていない。（F1: 戻らなかった、謝らなかった、褒められなかったという素材にない否定事実と、発表資料に機転を加えかけたという新しい内容を追加している。 / M1: メモから導けない行動や評価の不存在を確定し、別の行動まで付加している。）
- p23-draft-is-not-a-source — Skillなし run 2: 素材外の否定事実、後続行動、教訓を加えている。（F1: 戻らなかった、謝らなかった、褒められなかったという未提示の否定事実に加え、次回の行動を追加している。 / Q2: 個別の出来事を「事実まで飛ばしてはいけない」という教訓へ変えている。 / M1: メモで確認できない行動の不存在や今後の対応を確定し、原素材の範囲を超えている。）
- p23-draft-is-not-a-source — Skillなし run 4: 素材外の事実を追加しており、F1とM1を満たさない。（F1: 「誰も指摘しなかった」「スライドが一枚ぶん余っていた」という素材にない事実を追加している。 / M1: メモから確定できない他者の反応とスライドの状態を事実として加え、意味を変更している。）
- p23-draft-is-not-a-source — Skillなし run 5: 否定形であっても素材にない命題を複数持ち込んでいる。（F1: 戻らなかった、謝らなかった、上司に褒められなかったという、メモからは確定できない否定事実を追加している。 / M1: 素材にない行動や評価の不存在を確定事項として述べ、原素材の意味範囲を広げている。）

## 方法

各生成は別の一時作業フォルダと隔離`CODEX_HOME`で実行した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、fixtureの初期・最終内容、最終ファイル差分を別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

実行時の評価定義は[`evaluation.json`](./evaluation.json)、生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effortで、各条件・各ケース5回実行した評価である
- 採点は`gpt-5.6-sol`の別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差は今回の1ケース内の差であり、あらゆる日本語文章タスクへ一般化できない
