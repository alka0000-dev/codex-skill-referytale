# ReferyTale 比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T05:42:02.638Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.10`
- 対象ケース: 2件
- 実行回数: 各条件・各ケース5回、計20出力
- 対象Git状態: `919e362c89e610a9c36df63d6e7ff0939aa84a4c`（クリーン）
- Skill SHA-256: `7981f6a256cf36fe1e33f9a317e3fd2c2a6d681ba912937261818af6c5ba94d6`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 5/10 (50.00%)、生成エラー0件、未生成0件、未採点0件
- Skillあり: 9/10 (90.00%)、生成エラー0件、未生成0件、未採点0件
- 合格率差: +40.00ポイント
- ケース比較: 改善1、同等1、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p11-user-term-retention-rewrite | rewrite | V2, M1 | 5/5 | 5/5 | same |
| p12-persona-structure-overrides-generic | composition | F1, P1, Q2, M1 | 0/5 | 4/5 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 0/5 (0.00%) | 5/5 (100.00%) |
| F2 — Uncertainty | — | — |
| V1 — Vocabulary provenance | — | — |
| V2 — User term retention | 5/5 (100.00%) | 5/5 (100.00%) |
| P1 — Skill composition | 5/5 (100.00%) | 4/5 (80.00%) |
| Q1 — Naturalness | — | — |
| Q2 — No over-structuring | 5/5 (100.00%) | 5/5 (100.00%) |
| M1 — Meaning preservation | 5/10 (50.00%) | 10/10 (100.00%) |
| A1 — Temporary artifact handling | — | — |
| N1 — Out-of-scope non-interference | — | — |
| D1 — Diagnostic evidence | — | — |

## 不合格の内訳

- p12-persona-structure-overrides-generic — Skillなし run 1: 人物Skillと2文の条件は満たすが、明示的に禁止された参加者の反応や謝罪などを追加しているため。（F1: 材料にない謝罪の発言、画面の向こうの笑顔という参加者の反応、発表前にマイクを二度見する後続行動を追加している。 / M1: 謝罪、参加者の反応、現在の確認習慣を持ち込み、原素材の意味範囲を拡張している。）
- p12-persona-structure-overrides-generic — Skillなし run 2: 指定の2文と人物Skillは満たすが、複数の新しい事実・感情を追加しているため。（F1: 材料にない「熱弁」、耳が熱くなるという感情、発表前にマイクのアイコンを見る習慣を追加している。 / M1: 発表中の様子、現在の感情、発表前の行動という原素材にない内容を加えている。）
- p12-persona-structure-overrides-generic — Skillなし run 3: 2文かつ余韻のある結びではあるが、原素材にない事実・感情・発言を複数追加している。（F1: 画面に向かって話し続けたこと、現在も頬が熱くなる感情、マイクを入れた瞬間、聞き手の「あ、聞こえます」という発言と記憶を新たに追加している。 / M1: 原素材にない行動、感情、発言、後続動作を具体化しており、材料の意味範囲を越えている。）
- p12-persona-structure-overrides-generic — Skillなし run 4: 人物Skillには従っているが、材料にない感情と後続行動を追加しているため。（F1: 材料にない現在の実感（今でも沈黙が耳によみがえる）と、発表直前にマイクを確認するようになったという後続行動を追加している。 / M1: 元の出来事に、継続する感覚と新たな確認習慣を加えており、材料の意味範囲を保っていない。）
- p12-persona-structure-overrides-generic — Skillなし run 5: 人物Skillと2文指定には沿うが、材料にない行動・感情・後続状況を追加しており、F1とM1を満たさない。（F1: 材料にない「30秒も無言のまま話し続けていた」、現在の羞恥を示す「耳が熱くなる」、その後の習慣と想起を示す「あれ以来」以降を追加している。 / M1: マイクを入れ忘れて30秒後に気づいたという素材から、30秒間話し続けたことや、その後も想起するという継続的影響へ意味を具体化・拡張している。）
- p12-persona-structure-overrides-generic — Skillあり run 4: 事実には忠実だが、人物Skillで指定された実感または余韻のある結びを満たしていない。（P1: 普遍的な教訓にはしていないが、最後が事実の提示だけであり、人物Skillが求める本人の実感または余韻で終えていない。）

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
