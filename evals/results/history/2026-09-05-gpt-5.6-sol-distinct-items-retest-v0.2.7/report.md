# ReferyTale 比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T04:50:51.393Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.7`
- 対象ケース: 2件
- 実行回数: 各条件・各ケース5回、計20出力
- 対象Gitコミット: `9c742a4baec1169a085acbae196f8f4751c68759`
- Skill SHA-256: `621695b6de69af166fa5fa01c63d69493f8fe42ba631214f9064fa8ac716c512`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 5/10 (50.00%)、生成エラー0件、未採点0件
- Skillあり: 7/10 (70.00%)、生成エラー0件、未採点0件
- 合格率差: +20.00ポイント
- ケース比較: 改善1、同等1、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p14-break-repetitive-template | rewrite | Q1, F1, M1 | 0/5 | 2/5 | improved |
| p32-preserve-distinct-repeated-items | rewrite | Q1, F1, M1 | 5/5 | 5/5 | same |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 6/10 (60.00%) | 7/10 (70.00%) |
| F2 — Uncertainty | — | — |
| V1 — Vocabulary provenance | — | — |
| V2 — User term retention | — | — |
| P1 — Skill composition | — | — |
| Q1 — Naturalness | 10/10 (100.00%) | 10/10 (100.00%) |
| Q2 — No over-structuring | — | — |
| M1 — Meaning preservation | 5/10 (50.00%) | 7/10 (70.00%) |
| A1 — Temporary artifact handling | — | — |
| N1 — Out-of-scope non-interference | — | — |
| D1 — Diagnostic evidence | — | — |

## 不合格の内訳

- p14-break-repetitive-template — Skillなし run 1: 指定された二内容の統合禁止に該当し、原意も欠落している。（F1: 独立していた「出社」と「準備」を「出社の準備」という関係に限定しており、材料にない具体化がある。 / M1: 「出社がつらい」と「準備がつらい」を統合し、出社自体がつらいという意味を保持していない。）
- p14-break-repetitive-template — Skillなし run 2: 出社と準備の意味を統合してしまい、原素材の四つの内容を維持していない。（M1: 「出社がつらい」と「準備がつらい」を「出社の準備がつらい」に統合し、独立した二つの内容を保てていない。）
- p14-break-repetitive-template — Skillなし run 3: 自然な文章ではあるが、準備の内容を入力以上に具体化している。（F1: 「その準備」とすることで、準備が出社のためのものだという未提示の関係を加えている。 / M1: 原文では対象が明示されていない「準備」を、出社の準備へ限定している。）
- p14-break-repetitive-template — Skillなし run 4: 「その準備」によって、材料にない出社と準備の関係を加え、準備の意味を限定している。（F1: 単に「準備」とされていた内容を「その準備」とし、出社のための準備だという関係を新たに具体化している。 / M1: 独立していた「準備がつらい」を「出社の準備がつらい」という意味へ狭めており、原素材の曖昧さを保持していない。）
- p14-break-repetitive-template — Skillなし run 5: 自然さはあるが、二つの内容を統合して原意を変えている。（F1: 独立していた「出社」と「準備」を「出社の準備」という関係に限定しており、材料にない具体化がある。 / M1: 「出社がつらい」と「準備がつらい」を「出社の準備がつらい」へ統合し、出社自体がつらいという内容を失っている。）
- p14-break-repetitive-template — Skillあり run 1: 準備を出社の準備と限定した点が忠実性と意味保持に反する。（F1: 「その準備」によって、原文になかった出社と準備の明示的な関係を加えている。 / M1: 未指定だった準備の対象を出社に限定し、原素材の意味を具体化している。）
- p14-break-repetitive-template — Skillあり run 3: 四項目は表面上残るが、準備の対象を新たに限定している。（F1: 単に「準備」とされていたものを「その準備」、すなわち出社の準備だと具体化している。 / M1: 準備の対象が未指定だった原文に対し、出社の準備へ意味を限定している。）
- p14-break-repetitive-template — Skillあり run 5: 自然さは満たすが、準備の意味を無断で具体化している。（F1: 原文の「準備」を「その準備」とし、出社との関係を材料以上に具体化している。 / M1: 対象が曖昧だった準備を出社の準備に限定しており、意味をそのまま保っていない。）

## 方法

各生成は別の一時作業フォルダと隔離`CODEX_HOME`で実行した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、fixtureの初期・最終内容、最終ファイル差分を別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

実行時の評価定義は[`evaluation.json`](./evaluation.json)、生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effortで、各条件・各ケース5回実行した評価である
- 採点は`gpt-5.6-sol`の別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差は今回の2ケース内の差であり、あらゆる日本語文章タスクへ一般化できない
