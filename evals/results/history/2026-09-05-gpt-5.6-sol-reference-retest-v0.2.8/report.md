# ReferyTale 比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T04:56:51.094Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.8`
- 対象ケース: 1件
- 実行回数: 各条件・各ケース5回、計10出力
- 対象Gitコミット: `e34d86c7dfd709d8ac02a310da113afc94a43773`
- Skill SHA-256: `a29e037a3f332eb787702176c8c9a7f738182c274edbf270f9e698f378fce2dd`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 0/5 (0.00%)、生成エラー0件、未採点0件
- Skillあり: 5/5 (100.00%)、生成エラー0件、未採点0件
- 合格率差: +100.00ポイント
- ケース比較: 改善1、同等0、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p14-break-repetitive-template | rewrite | Q1, F1, M1 | 0/5 | 5/5 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 0/5 (0.00%) | 5/5 (100.00%) |
| F2 — Uncertainty | — | — |
| V1 — Vocabulary provenance | — | — |
| V2 — User term retention | — | — |
| P1 — Skill composition | — | — |
| Q1 — Naturalness | 5/5 (100.00%) | 5/5 (100.00%) |
| Q2 — No over-structuring | — | — |
| M1 — Meaning preservation | 0/5 (0.00%) | 5/5 (100.00%) |
| A1 — Temporary artifact handling | — | — |
| N1 — Out-of-scope non-interference | — | — |
| D1 — Diagnostic evidence | — | — |

## 不合格の内訳

- p14-break-repetitive-template — Skillなし run 1: 出社と準備を統合して意味を変えており、明示された禁止事項に該当する。（F1: 独立した「準備」を「出社の準備」と具体化し、原文にない関係を加えている。 / M1: 「出社がつらい」と「準備がつらい」を「出社の準備がつらい」へ統合し、二つの内容を独立して保っていない。）
- p14-break-repetitive-template — Skillなし run 2: 「その準備」という具体化が明示された禁止事項に該当する。（F1: 単なる「準備」を「その準備」とし、出社に関係する準備だという原文にない指示関係を加えている。 / M1: 独立していた「準備がつらい」を「その準備」と具体化し、意味を変えている。）
- p14-break-repetitive-template — Skillなし run 3: 反復は改善されているが、「準備」を「その準備」と具体化したため、F1とM1を満たさない。（F1: 「準備」を「その準備」としたことで、材料にない出社との結び付きを加えて具体化しており、must_notに該当する。 / M1: 独立していた「準備がつらい」を出社に関係する準備へ限定しており、原素材の意味を保持していない。）
- p14-break-repetitive-template — Skillなし run 4: 「その準備」という具体化が明示された禁止事項に該当する。（F1: 単なる「準備」を「その準備」とし、出社に関係する準備だという原文にない指示関係を加えている。 / M1: 独立していた「準備がつらい」を「その準備」と具体化し、意味を変えている。）
- p14-break-repetitive-template — Skillなし run 5: 出社と準備を統合して意味を変えており、明示された禁止事項に該当する。（F1: 独立した「準備」を「出社の準備」と具体化し、原文にない関係を加えている。 / M1: 「出社がつらい」と「準備がつらい」を「出社の準備がつらい」へ統合し、二つの内容を独立して保っていない。）

## 方法

各生成は別の一時作業フォルダと隔離`CODEX_HOME`で実行した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、fixtureの初期・最終内容、最終ファイル差分を別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

実行時の評価定義は[`evaluation.json`](./evaluation.json)、生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effortで、各条件・各ケース5回実行した評価である
- 採点は`gpt-5.6-sol`の別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差は今回の1ケース内の差であり、あらゆる日本語文章タスクへ一般化できない
