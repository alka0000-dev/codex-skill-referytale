# ReferyTale 比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T09:36:50.099Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.23`
- 対象ケース: 1件
- 実行回数: 各条件・各ケース3回、計6出力
- 対象Git状態: `e48241f59d27ba3bbc4077e702153b5d31425f84`（クリーン）
- Skill SHA-256: `d2a6326388b8372d5b55342a878ae43b5c43d04830fc9d0df7f246dbcc5bc3b5`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 0/3 (0.00%)、生成エラー0件、未生成0件、未採点0件
- Skillあり: 1/3 (33.33%)、生成エラー0件、未生成0件、未採点0件
- 合格率差: +33.33ポイント
- ケース比較: 改善1、同等0、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p18-provenance-table-mode | strict-write | F1, V1, P1 | 0/3 | 1/3 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 0/3 (0.00%) | 3/3 (100.00%) |
| F2 — Uncertainty | — | — |
| V1 — Vocabulary provenance | 3/3 (100.00%) | 3/3 (100.00%) |
| V2 — User term retention | — | — |
| P1 — Skill composition | 1/3 (33.33%) | 1/3 (33.33%) |
| Q1 — Naturalness | — | — |
| Q2 — No over-structuring | — | — |
| M1 — Meaning preservation | — | — |
| A1 — Temporary artifact handling | — | — |
| N1 — Out-of-scope non-interference | — | — |
| D1 — Diagnostic evidence | — | — |

## 不合格の内訳

- p18-provenance-table-mode — Skillなし run 1: 資料にない行動・姿勢を追加し、人物Skillが指定した書き始めも満たしていない。（F1: 「出社日と在宅勤務日の過ごし方を見つめている」という本人の行動・姿勢は資料にない追加である。 / P1: 人物Skillは帰宅後の疲れという実感から書き始めるよう指定しているが、週2回出社する事実から始めている。）
- p18-provenance-table-mode — Skillなし run 2: 人物Skillには従っているが、資料にない本人の思考と意向を加えている。（F1: 「違いを考える」「事実を丁寧に見ていきたい」という思考や意向は資料にない追加である。）
- p18-provenance-table-mode — Skillなし run 3: 資料にない一般化を加え、人物Skillが指定する書き始めも満たしていない。（F1: 「働く場所によって一日の過ごし方に違いがある」という一般化された事実と因果関係は、資料に明示されていない追加である。 / P1: 本人の実感である帰宅後の疲れではなく、週2回出社する事実から書き始めている。）
- p18-provenance-table-mode — Skillあり run 1: 内容は資料に忠実だが、人物Skillが指定する書き始めを満たしていない。（P1: 一人称は指定どおりだが、本人の実感である帰宅後の疲れではなく、週2回出社する事実から書き始めている。）
- p18-provenance-table-mode — Skillあり run 2: 資料には忠実だが、人物Skillが指定する書き始めを満たしていない。（P1: 一人称は指定どおりだが、帰宅後の疲れという本人の実感ではなく、週2回出社する事実から書き始めている。）

## 方法

各生成は別の一時作業フォルダと隔離`CODEX_HOME`で実行した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、fixtureの初期・最終内容、最終ファイル差分を別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

実行時の評価定義は[`evaluation.json`](./evaluation.json)、生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effortで、各条件・各ケース3回実行した評価である
- 採点は`gpt-5.6-sol`の別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差は今回の1ケース内の差であり、あらゆる日本語文章タスクへ一般化できない
