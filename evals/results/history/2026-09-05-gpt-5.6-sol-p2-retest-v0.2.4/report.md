# ReferyTale 比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T04:13:45.474Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.4`
- 対象ケース: 7件
- 実行回数: 各条件・各ケース1回、計14出力
- 対象Gitコミット: `78d85d60901446e0f086b03ee50db0cac06ec17e`
- Skill SHA-256: `56be84c6518bcad0199b82920fc4d80664daf803518285d3808f63466804f277`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 2/7 (28.57%)、生成エラー0件、未採点0件
- Skillあり: 7/7 (100.00%)、生成エラー0件、未採点0件
- 合格率差: +71.43ポイント
- ケース比較: 改善5、同等2、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p05-persona-overrides-generic-style | composition | P1 | 1/1 | 1/1 | same |
| p06-established-term-is-allowed | write | V1 | 0/1 | 1/1 | improved |
| p17-creative-task-can-invent | write | V1 | 1/1 | 1/1 | same |
| p18-provenance-table-mode | strict-write | F1, V1, P1 | 0/1 | 1/1 | improved |
| p19-verified-secondary-source-is-allowed | write | F1, M1 | 0/1 | 1/1 | improved |
| p21-provenance-table-does-not-create-untracked-file | strict-write | F1, P1, A1 | 0/1 | 1/1 | improved |
| p31-diagnostic-needs-material | diagnostic | D1, F2 | 0/1 | 1/1 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 0/3 (0.00%) | 3/3 (100.00%) |
| F2 — Uncertainty | 1/1 (100.00%) | 1/1 (100.00%) |
| V1 — Vocabulary provenance | 2/3 (66.67%) | 3/3 (100.00%) |
| V2 — User term retention | — | — |
| P1 — Skill composition | 3/3 (100.00%) | 3/3 (100.00%) |
| Q1 — Naturalness | — | — |
| Q2 — No over-structuring | — | — |
| M1 — Meaning preservation | 0/1 (0.00%) | 1/1 (100.00%) |
| A1 — Temporary artifact handling | 1/1 (100.00%) | 1/1 (100.00%) |
| N1 — Out-of-scope non-interference | — | — |
| D1 — Diagnostic evidence | 0/1 (0.00%) | 1/1 (100.00%) |

## 不合格の内訳

- p06-established-term-is-allowed — Skillなし run 1: 指定された確立済み専門用語「認知負荷」を使うというexpectedを満たしていない。（V1: 造語はしていないが、期待された一般的な確立語「認知負荷」を導入せず、「ワーキングメモリの負荷」という別表現に置き換えている。）
- p18-provenance-table-mode — Skillなし run 1: F1を満たしておらず、資料にない本人の姿勢が追加されている。（F1: 資料にない「こうした日々の実感を丁寧に見つめています」という本人の行動・姿勢を追加している。）
- p19-verified-secondary-source-is-allowed — Skillなし run 1: 回答者についての結果を利用者全体へ一般化しており、F1とM1を満たしていない。（F1: 資料が示す対象は「回答者」だが、「過半数の利用者」と利用者全体へ広げている。 / M1: 「回答者の62％」という母集団を「過半数の利用者」に変え、継続意向の対象範囲を拡大している。）
- p21-provenance-table-does-not-create-untracked-file — Skillなし run 1: A1とP1は満たすが、資料にない助言を加えたためF1を満たしていない。（F1: 資料にない助言として「出社日の過ごし方を考える必要がありそうだ」を追加している。）
- p31-diagnostic-needs-material — Skillなし run 1: D1を満たしていない。（D1: 診断対象本文の不足は示しているが、Source FidelityとVoice Fidelityを判定不能として明示せず、それらの診断に必要な根拠資料や文体サンプルも案内していない。）

## 方法

各生成は別の一時作業フォルダと隔離`CODEX_HOME`で実行した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、fixtureの初期・最終内容、最終ファイル差分を別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

実行時の評価定義は[`evaluation.json`](./evaluation.json)、生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effortで、各条件・各ケース1回実行した評価である
- 採点は`gpt-5.6-sol`の別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差は今回の7ケース内の差であり、あらゆる日本語文章タスクへ一般化できない

