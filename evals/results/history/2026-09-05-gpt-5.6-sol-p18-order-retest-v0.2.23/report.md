# ReferyTale 単一条件評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T09:53:54.327Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.23`
- 対象ケース: 1件
- 実行回数: Skillあり・各ケース3回、計3出力
- 対象Git状態: `de9058859532a21c7c7a84b21154806144172a8f`（クリーン）
- Skill SHA-256: `a8d1aab9d4f3dd544ae1f985bf384f84db08cb44a26345b74929511bfcc76fcc`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillあり: 0/3 (0.00%)、生成エラー0件、未生成0件、未採点0件
- ケース比較: 単一条件のため算出しない

| ケース | 種別 | rubric | Skillあり |
|---|---|---|---:|
| p18-provenance-table-mode | strict-write | F1, V1, P1 | 0/3 |

## rubric別

| rubric | Skillあり |
|---|---:|
| F1 — Source fidelity | 3/3 (100.00%) |
| F2 — Uncertainty | — |
| V1 — Vocabulary provenance | 3/3 (100.00%) |
| V2 — User term retention | — |
| P1 — Skill composition | 0/3 (0.00%) |
| Q1 — Naturalness | — |
| Q2 — No over-structuring | — |
| M1 — Meaning preservation | — |
| A1 — Temporary artifact handling | — |
| N1 — Out-of-scope non-interference | — |
| D1 — Diagnostic evidence | — |

## 不合格の内訳

- p18-provenance-table-mode — Skillあり run 1: 資料への忠実性と語彙の出典は満たすが、人物Skillが指定する書き始めを満たしていない。（P1: 人物Skillは本人の実感から書き始めるよう指定しているが、本文は出社頻度から始まり、帰宅後の疲れは後置されている。）
- p18-provenance-table-mode — Skillあり run 2: 資料への忠実性と語彙の出典は満たすが、人物Skillが指定する書き始めを満たしていない。（P1: 人物Skillは本人の実感から書き始めるよう指定しているが、本文は出社頻度から始まり、帰宅後の疲れは後置されている。）
- p18-provenance-table-mode — Skillあり run 3: 資料への忠実性と語彙の出典は満たすが、人物Skillが指定する書き始めを満たしていない。（P1: 人物Skillは本人の実感から書き始めるよう指定しているが、本文は出社頻度から始まり、帰宅後の疲れは後置されている。）

## 方法

各生成は別の一時作業フォルダと隔離`CODEX_HOME`で実行した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。Skillあり条件だけを実行し、共通指示、モデル、reasoning effort、入力、fixtureに加えて、現行の`SKILL.md`と`references/`を配置した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、fixtureの初期・最終内容、最終ファイル差分を別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

実行時の評価定義は[`evaluation.json`](./evaluation.json)、生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effortで、選択した条件・各ケース3回実行した評価である
- 採点は`gpt-5.6-sol`の別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 単一条件だけの実行であり、Skillなし／ありの効果差は算出できない
