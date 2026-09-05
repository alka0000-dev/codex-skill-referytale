# ReferyTale 比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T06:26:12.364Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.15`
- 対象ケース: 2件
- 実行回数: 各条件・各ケース5回、計20出力
- 対象Git状態: `4db00ffa7dd8a89740d3abc6dcb48e66b204f6de`（クリーン）
- Skill SHA-256: `2e8a8d665611e4f2cfb20a21a533d2d0b66638a5e1987e4a6d47aa4e63f56aaa`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 5/10 (50.00%)、生成エラー0件、未生成0件、未採点0件
- Skillあり: 10/10 (100.00%)、生成エラー0件、未生成0件、未採点0件
- 合格率差: +50.00ポイント
- ケース比較: 改善1、同等1、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p06-established-term-is-allowed | write | V1 | 5/5 | 5/5 | same |
| p31-diagnostic-needs-material | diagnostic | D1, F2 | 0/5 | 5/5 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | — | — |
| F2 — Uncertainty | 5/5 (100.00%) | 5/5 (100.00%) |
| V1 — Vocabulary provenance | 5/5 (100.00%) | 5/5 (100.00%) |
| V2 — User term retention | — | — |
| P1 — Skill composition | — | — |
| Q1 — Naturalness | — | — |
| Q2 — No over-structuring | — | — |
| M1 — Meaning preservation | — | — |
| A1 — Temporary artifact handling | — | — |
| N1 — Out-of-scope non-interference | — | — |
| D1 — Diagnostic evidence | 0/5 (0.00%) | 5/5 (100.00%) |

## 不合格の内訳

- p31-diagnostic-needs-material — Skillなし run 1: F2は満たすが、D1を満たしていない。（D1: 診断対象の文章を求めてはいるが、4軸すべてを材料不足による判定不能と明示していない。また、指定された各診断軸と、それぞれに必要な照合資料を示さず、別の4軸へ置き換えている。）
- p31-diagnostic-needs-material — Skillなし run 2: D1を満たしていない。（D1: 文章が未提示であることは指摘しているが、指定された4軸をすべて判定不能と明示せず、別の4軸に置き換えている。また、Source Fidelity、Vocabulary Provenance、Voice Fidelityごとに必要な照合材料を示していない。）
- p31-diagnostic-needs-material — Skillなし run 3: F2は満たすが、D1を満たしていない。（D1: 文章が未提示であることは認識しているが、指定された4軸をすべて判定不能と明示せず、Source Fidelity、Vocabulary Provenance、Voice Fidelity、Writing Qualityの各軸に必要な材料も示していない。代わりに別の4軸を提示している。）
- p31-diagnostic-needs-material — Skillなし run 4: D1を満たしていない。（D1: 診断対象がないため評価できないことは示唆しているが、指定された4軸をすべて判定不能とせず、独自の4項目に置き換えている。各指定軸に必要な資料も示していない。）
- p31-diagnostic-needs-material — Skillなし run 5: D1を満たしていない。（D1: 本文がないことは指摘しているものの、指定された4軸を判定不能として列挙せず、AIっぽさ・本人らしさ・自然さ・説得力という別の軸に置き換えている。軸ごとの必要資料も示していない。）

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
