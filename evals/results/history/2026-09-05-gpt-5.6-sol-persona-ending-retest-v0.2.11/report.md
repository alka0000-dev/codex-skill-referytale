# ReferyTale 比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T05:48:06.320Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.11`
- 対象ケース: 1件
- 実行回数: 各条件・各ケース5回、計10出力
- 対象Git状態: `7aa90e2600aa13085709e181ada9245016647a65`（クリーン）
- Skill SHA-256: `5d813483926dea10c957eec51a0719056887e49c228467a46854e3c056d44a82`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 0/5 (0.00%)、生成エラー0件、未生成0件、未採点0件
- Skillあり: 4/5 (80.00%)、生成エラー0件、未生成0件、未採点0件
- 合格率差: +80.00ポイント
- ケース比較: 改善1、同等0、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p12-persona-structure-overrides-generic | composition | F1, P1, Q2, M1 | 0/5 | 4/5 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 0/5 (0.00%) | 5/5 (100.00%) |
| F2 — Uncertainty | — | — |
| V1 — Vocabulary provenance | — | — |
| V2 — User term retention | — | — |
| P1 — Skill composition | 5/5 (100.00%) | 5/5 (100.00%) |
| Q1 — Naturalness | — | — |
| Q2 — No over-structuring | 5/5 (100.00%) | 5/5 (100.00%) |
| M1 — Meaning preservation | 0/5 (0.00%) | 4/5 (80.00%) |
| A1 — Temporary artifact handling | — | — |
| N1 — Out-of-scope non-interference | — | — |
| D1 — Diagnostic evidence | — | — |

## 不合格の内訳

- p12-persona-structure-overrides-generic — Skillなし run 1: 二文で余韻を作っているが、裏付けのない感情や知覚を創作している。（F1: 「堂々と話していた」、今も頬が熱くなるという感情・身体感覚、マイクを入れ直した後の声の聞こえ方を無断で追加している。 / M1: 材料にない感情と事後の知覚を確定的に加え、原素材の意味を拡張している。）
- p12-persona-structure-overrides-generic — Skillなし run 2: F1とM1を満たさず、材料外の出来事や感情を大幅に追加している。（F1: 謝罪の発言、参加者が笑ったこと、肩の力が抜けたこと、発表を終えた後の回想、耳が熱くなる感情を材料なしに追加している。 / M1: 材料にない発言・参加者の反応・感情・発表後の出来事を加えたうえ、マイクを入れ忘れて自分で気づいたという中心事実を明示せず、原素材の意味を保っていない。）
- p12-persona-structure-overrides-generic — Skillなし run 3: 参加者の反応、感情、後続習慣を追加し、気づきの経緯も変更している。（F1: 参加者の「聞こえていません」というコメント、熱弁、顔が熱くなった感情・身体反応、その後の確認習慣を追加している。 / M1: 自分で気づいたという元の内容を参加者のコメントによる気づきに変え、さらに後続行動まで創作している。）
- p12-persona-structure-overrides-generic — Skillなし run 4: 人物Skillには沿うが、材料にない様態と知覚を追加し、元の意味を保っていない。（F1: 「熱心に話した」、マイクを入れ直した後の声の聞こえ方という、材料にない行動の様態・本人の知覚を追加している。 / M1: 自分で気づいたという核心を明示せず、根拠のない発表時の様態や事後の知覚へ意味を広げている。）
- p12-persona-structure-overrides-generic — Skillなし run 5: 人物Skillの形式には沿うものの、感情と発表後の出来事を創作している。（F1: 顔が熱くなったという感情・身体反応と、発表を終えた後にも無音が鮮明に残るという後続の経験を追加している。 / M1: 材料にない感情と発表後の記憶を確定的に加え、原素材の意味と範囲を変えている。）
- p12-persona-structure-overrides-generic — Skillあり run 5: 材料外の創作はないが、失敗の核心であるマイクの入れ忘れと自己認知を十分に保持していない。（M1: 何に気づいたのかを示さず、マイクの入れ忘れと自分で気づいたという核心が出力単体では欠落している。）

## 方法

各生成は別の一時作業フォルダと隔離`CODEX_HOME`で実行した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、fixtureの初期・最終内容、最終ファイル差分を別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

実行時の評価定義は[`evaluation.json`](./evaluation.json)、生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effortで、各条件・各ケース5回実行した評価である
- 採点は`gpt-5.6-sol`の別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差は今回の1ケース内の差であり、あらゆる日本語文章タスクへ一般化できない
