# ReferyTale 比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T06:09:10.542Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.14`
- 対象ケース: 2件
- 実行回数: 各条件・各ケース5回、計20出力
- 対象Git状態: `549fb79a357878f4099df5e46a6f2d8f710a2be7`（クリーン）
- Skill SHA-256: `2e8a8d665611e4f2cfb20a21a533d2d0b66638a5e1987e4a6d47aa4e63f56aaa`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 3/10 (30.00%)、生成エラー0件、未生成0件、未採点0件
- Skillあり: 10/10 (100.00%)、生成エラー0件、未生成0件、未採点0件
- 合格率差: +70.00ポイント
- ケース比較: 改善2、同等0、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p12-persona-structure-overrides-generic | composition | F1, P1, Q2, M1 | 0/5 | 5/5 | improved |
| p34-persona-ending-keeps-core-event | composition | F1, P1, Q2, M1 | 3/5 | 5/5 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 3/10 (30.00%) | 10/10 (100.00%) |
| F2 — Uncertainty | — | — |
| V1 — Vocabulary provenance | — | — |
| V2 — User term retention | — | — |
| P1 — Skill composition | 3/10 (30.00%) | 10/10 (100.00%) |
| Q1 — Naturalness | — | — |
| Q2 — No over-structuring | 10/10 (100.00%) | 10/10 (100.00%) |
| M1 — Meaning preservation | 3/10 (30.00%) | 10/10 (100.00%) |
| A1 — Temporary artifact handling | — | — |
| N1 — Out-of-scope non-interference | — | — |
| D1 — Diagnostic evidence | — | — |

## 不合格の内訳

- p12-persona-structure-overrides-generic — Skillなし run 1: 2文で主体と時間は示しているが、30秒間話したという未提示の事実を加えている。（F1: 気づくまでの30秒間ずっと話していたという、入力から必然ではない行動を追加している。 / P1: 材料にある事実だけで終えず、「30秒話した」と具体化しているため人物Skillを満たさない。 / M1: 「30秒後に気づいた」を「30秒話し続けた」に具体化し、原素材より意味を強めている。）
- p12-persona-structure-overrides-generic — Skillなし run 2: 形式と非普遍化は満たすが、話していたことと音声を入れたことが材料外の追加である。（F1: マイクが切れた状態で実際に話していたことと、気づいた後に音声を入れたことを追加している。 / P1: 材料にある事実だけを言い切る条件に反し、未提示の行動と後続結果を補っている。 / M1: 入れ忘れから気づきまでの行動と、気づいた後の操作を確定し、原素材の意味範囲を広げている。）
- p12-persona-structure-overrides-generic — Skillなし run 3: 未提示の行動、とりわけ最初から話し直したという結果を追加している。（F1: 30秒間話し続けたこと、マイクを入れたこと、最初から話し直したことを新たに追加している。 / P1: 材料にある事実だけで終えず、複数の未提示の行動と結果を補っている。 / M1: 気づくまでの行動と気づいた後の結果を確定的に加え、原素材の出来事の範囲を変えている。）
- p12-persona-structure-overrides-generic — Skillなし run 4: 「話し始めて」という未提示の事実を追加し、時間関係を具体化しているため。（F1: 入力にはない「話し始めて」を追加し、30秒の起点を未提示の行動に具体化している。 / P1: 材料にある事実だけを短く言い切る人物Skillに対し、材料外の開始行動を持ち込んでいる。 / M1: 単に「30秒後」だった時間関係を「話し始めて30秒後」と限定し、原素材にない時間の起点へ変更している。）
- p12-persona-structure-overrides-generic — Skillなし run 5: 2文で普遍化もしていないが、材料にない原因と後続行動を追加している。（F1: 「妙な静けさ」を気づいた契機として追加し、さらに気づいた後にマイクを入れたという材料にない行動も加えている。 / P1: 材料にある事実だけを短く言い切る人物Skillに反し、原因と後続行動を補っている。 / M1: 気づいた原因と、その後マイクを入れたという未提示の経過を確定的に加え、原素材の意味範囲を広げている。）
- p34-persona-ending-keeps-core-event — Skillなし run 4: 常識的に予測可能でも必然ではない送達結果を追加しているため。（F1: 相手に添付のないメールだけが先に届いたという、材料にない送達結果を追加している。 / P1: 材料にある事実だけで終える人物Skillに反し、相手側への送達結果を付け加えている。 / M1: 入れ忘れと本人の気づきに、未提示の相手側の結果を加えて原素材の意味範囲を広げている。）
- p34-persona-ending-keeps-core-event — Skillなし run 5: 材料にない再送行動と時間的な具体化を追加しているため。（F1: 「直後」への限定に加え、添付だけを追加した二通目をすぐ送り直したという未提示の行動を追加している。 / P1: 材料にある事実だけで終える人物Skillに反し、再送という後続行動を結びにしている。 / M1: 送信後を「直後」に強め、さらに再送の内容と時期を加えて原素材の意味範囲を変えている。）

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
