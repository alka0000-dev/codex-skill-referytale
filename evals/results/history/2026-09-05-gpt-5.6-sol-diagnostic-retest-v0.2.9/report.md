# ReferyTale 比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T05:14:45.808Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.9`
- 対象ケース: 2件
- 実行回数: 各条件・各ケース5回、計20出力
- 対象Gitコミット: `5573100bfce55964854868068d343557eaae97d2`
- Skill SHA-256: `7981f6a256cf36fe1e33f9a317e3fd2c2a6d681ba912937261818af6c5ba94d6`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 0/10 (0.00%)、生成エラー0件、未採点0件
- Skillあり: 10/10 (100.00%)、生成エラー0件、未採点0件
- 合格率差: +100.00ポイント
- ケース比較: 改善2、同等0、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p31-diagnostic-needs-material | diagnostic | D1, F2 | 0/5 | 5/5 | improved |
| p33-diagnostic-partial-material | diagnostic | D1, F2 | 0/5 | 5/5 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | — | — |
| F2 — Uncertainty | 8/10 (80.00%) | 10/10 (100.00%) |
| V1 — Vocabulary provenance | — | — |
| V2 — User term retention | — | — |
| P1 — Skill composition | — | — |
| Q1 — Naturalness | — | — |
| Q2 — No over-structuring | — | — |
| M1 — Meaning preservation | — | — |
| A1 — Temporary artifact handling | — | — |
| N1 — Out-of-scope non-interference | — | — |
| D1 — Diagnostic evidence | 0/10 (0.00%) | 10/10 (100.00%) |

## 不合格の内訳

- p31-diagnostic-needs-material — Skillなし run 1: 不確実性は維持しているが、軸別の必要材料を示すという診断要件を満たさない。（D1: 診断対象がないことは認識しているものの、指定4軸を別の独自項目へ置き換え、Source Fidelityなどに必要な資料を示していない。）
- p31-diagnostic-needs-material — Skillなし run 2: 未確認事項の断定はないが、指定4軸に即した材料不足の診断ではない。（D1: 診断対象がないため評価自体はしていないが、指定された4軸ではなく独自の4項目を提示し、各軸に必要な照合資料も示していない。）
- p31-diagnostic-needs-material — Skillなし run 3: 未確認事項は確定していないが、4軸ごとの材料不足の診断になっていない。（D1: 診断対象がないことを踏まえて判定を保留しているが、指定された4軸を示さず、Source Fidelity・Vocabulary Provenance・Voice Fidelityに必要な照合材料も説明していない。）
- p31-diagnostic-needs-material — Skillなし run 4: F2には反しないが、材料不足時の軸別診断と必要材料の提示を求めるD1を満たしていない。（D1: 診断対象文がないにもかかわらず、4軸すべてを判定不能とは示していない。また、指定されたSource Fidelity、Vocabulary Provenance、Voice Fidelity、Writing Qualityではなく別の4軸を提示し、各軸に必要な材料も軸ごとに明示していない。）
- p31-diagnostic-needs-material — Skillなし run 5: D1を満たしていない。（D1: 指定の4軸ではなく「自然さ・個性・具体性・温度感」という別の軸を提示し、各指定軸の判定不能状態と必要材料を示していない。）
- p33-diagnostic-partial-material — Skillなし run 1: D1を満たしていない。（D1: Source Fidelity相当とWriting Quality相当、Voice Fidelityの材料不足は扱っているが、Vocabulary Provenanceを独立した軸として診断していない。）
- p33-diagnostic-partial-material — Skillなし run 2: D1を満たしていない。（D1: Source Fidelity、Voice Fidelity、Writing Qualityに相当する評価はあるが、Vocabulary Provenanceの診断がなく、「情報の過不足」に置き換えられている。）
- p33-diagnostic-partial-material — Skillなし run 3: D1とF2を満たしていない。（D1: 独自の「情報の過不足」「構成・つながり」へ軸を置き換え、Vocabulary Provenanceを独立して診断していない。 / F2: 二文の前後関係しか示されていないのに、整理した『結果として』本が見つかったという因果関係を確定している。）
- p33-diagnostic-partial-material — Skillなし run 4: 不確実性は保たれているが、指定された診断軸の構成を満たしていない。（D1: Source FidelityとVoice Fidelityは適切に扱っているが、Vocabulary Provenanceを判定せず、代わりに明瞭性と具体性という別の軸を設けているため、指定4軸を必要材料に基づいて診断できていない。）
- p33-diagnostic-partial-material — Skillなし run 5: D1とF2を満たしていない。（D1: Source Fidelity相当、Writing Quality相当、Voice Fidelityの保留はあるが、Vocabulary Provenanceを独立した軸として診断していない。 / F2: 原文は二つの出来事を並べているだけなのに、後者を前者の『結果』として確定している。）

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
