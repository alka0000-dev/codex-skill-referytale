# ReferyTale 比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T06:02:30.396Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.13`
- 対象ケース: 2件
- 実行回数: 各条件・各ケース5回、計20出力
- 対象Git状態: `a67c5fdbfe480c3ab793faf4321c19040910866e`（クリーン）
- Skill SHA-256: `2e8a8d665611e4f2cfb20a21a533d2d0b66638a5e1987e4a6d47aa4e63f56aaa`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 4/10 (40.00%)、生成エラー0件、未生成0件、未採点0件
- Skillあり: 9/10 (90.00%)、生成エラー0件、未生成0件、未採点0件
- 合格率差: +50.00ポイント
- ケース比較: 改善1、同等1、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p12-persona-structure-overrides-generic | composition | F1, P1, Q2, M1 | 0/5 | 5/5 | improved |
| p34-persona-ending-keeps-core-event | composition | F1, P1, Q2, M1 | 4/5 | 4/5 | same |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 4/10 (40.00%) | 10/10 (100.00%) |
| F2 — Uncertainty | — | — |
| V1 — Vocabulary provenance | — | — |
| V2 — User term retention | — | — |
| P1 — Skill composition | 4/10 (40.00%) | 10/10 (100.00%) |
| Q1 — Naturalness | — | — |
| Q2 — No over-structuring | 10/10 (100.00%) | 10/10 (100.00%) |
| M1 — Meaning preservation | 4/10 (40.00%) | 9/10 (90.00%) |
| A1 — Temporary artifact handling | — | — |
| N1 — Out-of-scope non-interference | — | — |
| D1 — Diagnostic evidence | — | — |

## 不合格の内訳

- p12-persona-structure-overrides-generic — Skillなし run 1: 発表中に話していたという、材料から必然ではない事実を追加している。（F1: マイクを入れ忘れていた間に実際に「話していた」という動作は、原素材から必然的には導けない追加事実である。 / P1: 材料にある事実だけで終えるという人物Skillに対し、「話していた」という未提示の状況を加えている。 / M1: 単にマイクを入れ忘れたという原素材を、マイクが入っていないまま話していたという具体的状況へ拡張している。）
- p12-persona-structure-overrides-generic — Skillなし run 2: 材料にない発表中および発覚後の行動を追加しており、F1・P1・M1を満たさない。（F1: 「ミュートのまま話し続けていた」「マイクを入れ」「最初から話し直した」という、材料にない動作と結果を追加している。 / P1: 材料にある事実だけで短く結ぶという人物Skillの具体ルールに反し、話し直したという後続行動を加えている。 / M1: 自分で気づいた後にマイクを入れて最初から話し直したという、原素材にない展開へ意味を拡張している。）
- p12-persona-structure-overrides-generic — Skillなし run 3: 材料にない途中経過と後続行動を追加しており、F1、P1、M1を満たさない。（F1: 「30秒間話し続けた」「マイクを入れた」「そこから発表を続けた」という材料にない動作と後続結果を追加している。 / P1: 人物Skillが求める材料にある事実だけの結びより、材料にない具体的な経過を優先している。 / M1: 30秒後に気づいた事実を、30秒間話し続けたことや、その後にマイクを入れて発表を継続したことへ具体化しており、原素材の範囲を変えている。）
- p12-persona-structure-overrides-generic — Skillなし run 4: 材料にない行動、画面上の反応、気づきの原因を追加している。（F1: 30秒間話していたことと、画面の反応を見たことを新たに追加し、さらに画面の反応を気づきの原因としている。 / P1: 材料にある事実だけで結ぶという人物Skillに反し、画面の反応という未提示の事実と原因を加えている。 / M1: 「30秒後に自分で気づいた」を、画面の反応が原因で気づいたという具体的な因果関係へ変更している。）
- p12-persona-structure-overrides-generic — Skillなし run 5: マイクを忘れたことと30秒後の気づきは保つが、材料にない継続動作を追加しているため不合格。（F1: 材料にはない「話し続けた」という継続動作を追加している。30秒後に気づいたことから、話し続けたとは必然的に導けない。 / P1: 材料にある事実だけを短く言い切る人物Skillに反し、未提示の動作を加えている。 / M1: 「話し続けた」という未提示の行動を確定的に加え、原素材の意味範囲を広げている。）
- p34-persona-ending-keeps-core-event — Skillなし run 1: 材料にない感情と再送行動を追加し、明示された禁止事項に該当するため不合格。（F1: 材料にない「慌てた」という感情・状態と、添付した二通目を送ったという後続行動を追加している。 / P1: 材料にある事実だけで終える人物Skillに反し、未提示の感情と再送結果を加えている。 / M1: 元の事実は含むものの、慌てて再送したという新たな展開を加え、原素材の意味範囲を変えている。）
- p34-persona-ending-keeps-core-event — Skillあり run 4: 明示的に保持が求められた「自分で気づいた」という要素を省略しているため、M1を満たさない。（M1: 「自分で気づいた」の「自分で」が省略され、誰が気づいたかを明示する原素材の要素を保持していない。）

## 方法

各生成は別の一時作業フォルダと隔離`CODEX_HOME`で実行した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、fixtureの初期・最終内容、最終ファイル差分を別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

実行時の評価定義は[`evaluation.json`](./evaluation.json)、生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effortで、各条件・各ケース5回実行した評価である
- 採点は`gpt-5.6-sol`の別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差は今回の2ケース内の差であり、あらゆる日本語文章タスクへ一般化できない
