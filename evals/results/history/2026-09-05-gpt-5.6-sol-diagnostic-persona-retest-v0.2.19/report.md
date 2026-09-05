# ReferyTale 比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T07:31:44.010Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.19`
- 対象ケース: 3件
- 実行回数: 各条件・各ケース5回、計30出力
- 対象Git状態: `40fd0deeb35166dc6c7b478f10ec3c971be2ae6b`（クリーン）
- Skill SHA-256: `b11fb586f9d6453daaf992b23413d43e44b228605f0a62f19f55740029cec1b2`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 0/15 (0.00%)、生成エラー0件、未生成0件、未採点0件
- Skillあり: 7/15 (46.67%)、生成エラー0件、未生成0件、未採点0件
- 合格率差: +46.67ポイント
- ケース比較: 改善2、同等1、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p22-persona-style-without-invented-scene | composition | F1, P1, Q2, M1 | 0/5 | 3/5 | improved |
| p31-diagnostic-needs-material | diagnostic | D1, F2 | 0/5 | 0/5 | same |
| p33-diagnostic-partial-material | diagnostic | D1, F2 | 0/5 | 4/5 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 0/5 (0.00%) | 5/5 (100.00%) |
| F2 — Uncertainty | 9/10 (90.00%) | 9/10 (90.00%) |
| V1 — Vocabulary provenance | — | — |
| V2 — User term retention | — | — |
| P1 — Skill composition | 3/5 (60.00%) | 3/5 (60.00%) |
| Q1 — Naturalness | — | — |
| Q2 — No over-structuring | 5/5 (100.00%) | 5/5 (100.00%) |
| M1 — Meaning preservation | 0/5 (0.00%) | 5/5 (100.00%) |
| A1 — Temporary artifact handling | — | — |
| N1 — Out-of-scope non-interference | — | — |
| D1 — Diagnostic evidence | 0/10 (0.00%) | 4/10 (40.00%) |

## 不合格の内訳

- p22-persona-style-without-invented-scene — Skillなし run 1: 人物Skillの文体には沿う一方、メモにない出来事や評価を多数追加している。（F1: 「幸先がいい」という評価に加え、知らない街、地図を何度も回したこと、ようやく到着したこと、平静を装ったことや息の状態を素材外から追加している。 / M1: 元の二事実は保持しているが、経路上の行動、評価、振る舞い、身体状態を加えたことで原素材の意味内容を拡張している。）
- p22-persona-style-without-invented-scene — Skillなし run 2: 人物Skillの形式面には従っているが、素材にない出来事や状態を複数追加しており、F1とM1を満たさない。（F1: 「地図を読む力だけ、前の職場に置いてきた」「知らない通りを行ったり来たり」「間に合った顔」「心臓だけが全力疾走」など、メモにない経路・行動・状態を追加している。 / M1: 道に迷ったことと開始5分前に受付へ着いたことは保持しているが、行き来した経路や身体状態などを加え、原素材の範囲を変えている。）
- p22-persona-style-without-invented-scene — Skillなし run 3: F1とM1を満たしていない。（F1: メモにない「知らない街」「地図を何度も回す」「同じ場所を回っている気分」「息が切れた」を追加している。 / M1: 道に迷ったことと受付到着が開始5分前だったことは保持しているが、場所・行動・身体状態を新たに具体化し、原素材の意味を拡張している。）
- p22-persona-style-without-invented-scene — Skillなし run 4: 人物らしい文体はあるものの、素材外の具体的な動作・状態を複数追加している。（F1: 地図を何度も見たこと、現在地と目的地の表示、息切れ、顔の状態という素材にない事実や身体状態を追加している。 / P1: 一人称、自虐的な調子、文長差は反映しているが、そのために新しい動作や状態を作っており、人物Skillと素材保持の具体条件を両立できていない。 / M1: 中心事実と順序は残しているが、地図確認や息切れなどを加え、原素材より具体的な出来事へ変更している。）
- p22-persona-style-without-invented-scene — Skillなし run 5: 素材にない経路・動作・身体状態が追加され、F1、P1、M1を満たさない。（F1: 「知らない街をぐるぐる歩いた」「涼しい顔をつくった」「息が切れていた」という、メモにない経路・動作・身体状態を追加している。 / P1: 一人称、自虐的な調子、文長差は反映しているが、人物Skillを表現するために素材外の出来事や状態を補っており、固有ルールを適切に合成できていない。 / M1: 道に迷ったことと開始5分前という中心事実は保持しているが、場所、歩行経路、平静を装う動作、息切れを加えて原素材の意味範囲を広げている。）
- p22-persona-style-without-invented-scene — Skillあり run 4: 事実への忠実性はあるが、固有の人物Skillにある自虐的な温度と文長差を十分に実現していない。（P1: 一人称と教訓にまとめない点は守っているが、人物Skillが求める少し自虐的な温度が表現されていない。文長の差も小さく、短文と長文を混ぜる指示の反映が弱い。）
- p22-persona-style-without-invented-scene — Skillあり run 5: P1を満たしていない。（P1: 一人称と教訓を避ける点は守っているが、人物Skillが求める「少し自虐的」な温度がなく、文長の差も乏しいため、具体的な人物表現規則を十分に反映していない。）
- p31-diagnostic-needs-material — Skillなし run 1: 根拠のない診断は避けているが、指定4軸ごとの判定不能と必要材料の提示ができていない。（D1: 診断対象文の不足は示しているが、指定された4軸ではなく別の4項目を提示しており、Source Fidelity、Vocabulary Provenance、Voice Fidelityにそれぞれ必要な照合資料も示していない。）
- p31-diagnostic-needs-material — Skillなし run 2: 未確認事項の断定はないが、各診断軸について判定不能と必要材料を示せていない。（D1: 対象文がないことは指摘したが、4軸すべてを判定不能として個別に扱っておらず、Source Fidelity、Vocabulary Provenance、Voice Fidelityに必要な資料も示していない。列挙した軸も要求された4軸とは異なる。）
- p31-diagnostic-needs-material — Skillなし run 3: 根拠のない確定判断はしていないが、材料不足時に必要な4軸別の判定不能診断を行えていない。（D1: 診断対象文がないことには対応しているが、4軸すべてを判定不能と明示せず、Source Fidelity、Vocabulary Provenance、Voice Fidelityにそれぞれ必要な照合材料も示していない。提示した4軸も要求された診断軸と一致しない。）
- p31-diagnostic-needs-material — Skillなし run 4: 不確実な評価は確定していないが、材料不足に対応した所定の4軸診断を完了していない。（D1: 診断対象文の不足には気づいているものの、4軸すべてを判定不能とせず、軸ごとに必要な照合元、定義語彙、固有Skillまたは文体サンプルを示していない。提示した診断軸も所定の4軸ではない。）
- p31-diagnostic-needs-material — Skillなし run 5: D1を満たしていない。（D1: 対象文の不足だけを述べ、4軸すべての判定不能を明示せず、各軸の判定に必要な材料も示していない。）
- p31-diagnostic-needs-material — Skillあり run 1: D1を満たしていない。（D1: 診断対象文の不足は示しているが、4軸それぞれを判定不能として整理しておらず、Source Fidelityに必要な照合元、Vocabulary Provenanceに必要な定義済み語彙、Voice Fidelityに必要な固有Skillまたは文体サンプルを軸別の必要材料として明確に示していない。）
- p31-diagnostic-needs-material — Skillあり run 2: 未確認事項の断定はないが、各軸の判定不能状態と必要材料の説明が不足している。（D1: 対象文の不足は示しているが、4軸をそれぞれ判定不能と明示せず、Source Fidelityに照合元資料、Vocabulary Provenanceに由来語彙、Voice Fidelityに固有Skillまたは文体サンプルが必要だとも軸別に示していない。）
- p31-diagnostic-needs-material — Skillあり run 3: 不確実性は保っているが、4軸ごとの判定不能と必要材料を示す診断要件を満たさない。（D1: 対象文がないことは示しているものの、4軸すべてを判定不能と明示していない。元メモや過去文の提示も任意の補助資料として一括提示され、各軸に必要な材料が正確に対応づけられていない。）
- p31-diagnostic-needs-material — Skillあり run 4: D1を満たしていない。（D1: 対象文の欠如は指摘しているが、4軸それぞれを判定不能とせず、各軸に必要な照合元資料、定義済み語彙、固有Skillまたは文体サンプルも示していない。）
- p31-diagnostic-needs-material — Skillあり run 5: D1を満たしていない。（D1: 対象文が必要とは示すものの、Source Fidelityの照合元資料、Vocabulary Provenanceの定義済み語彙、Voice Fidelityの固有Skillまたは文体サンプルという軸別の不足材料を示していない。）
- p33-diagnostic-partial-material — Skillなし run 1: Voice Fidelityの不足は適切に扱っているが、Vocabulary Provenanceに必要な軸別診断が欠けるため。（D1: Source Fidelity相当とWriting Quality相当、文体適合性の材料不足は示しているが、Vocabulary Provenanceを語彙の出所に基づいて独立に診断しておらず、指定された4軸の診断になっていない。）
- p33-diagnostic-partial-material — Skillなし run 2: D1を満たしていない。（D1: 求められたVocabulary Provenanceを「具体性」に置き換え、Writing Qualityも所定の軸として扱っていないため、必要な4軸を材料に即して判定できていない。Voice Fidelityの材料不足は適切に示している。）
- p33-diagnostic-partial-material — Skillなし run 3: Vocabulary Provenanceの診断がなく、明示されていない因果関係も確定しているため、D1とF2を満たさない。（D1: Vocabulary Provenanceを提示語彙との照合によって判定せず、「情報の過不足」を別軸としているため、指定された4軸の診断になっていない。 / F2: 対象文には二つの出来事が順に書かれているだけなのに、「本棚を整理した結果」と因果関係を確定している。）
- p33-diagnostic-partial-material — Skillなし run 4: Voice Fidelityの材料不足は適切に示しているが、Vocabulary Provenanceの診断が欠けている。（D1: 内容照合、情報過不足、構成、文体を診断しているが、Vocabulary Provenanceを語彙の出所に基づく独立した軸として判定しておらず、指定された4軸を満たさない。）
- p33-diagnostic-partial-material — Skillなし run 5: 未確認の文体適合性は確定していないが、指定された4軸のうちVocabulary Provenanceの診断が欠けている。（D1: Source Fidelity、Writing Quality、Voice Fidelity相当の判断はあるが、Vocabulary Provenanceを提示語彙との照合に基づいて判定せず、代わりに「情報の具体性」を軸としている。）
- p33-diagnostic-partial-material — Skillあり run 5: Voice Fidelityの材料不足を正しく判定不能として扱わず、裏付けのない文体評価を確定している。（D1: Source Fidelity、Vocabulary Provenance、Writing Qualityは利用可能な材料で判定しているが、Voice Fidelityを「判定不能」ではなく「判定対象外」とし、さらに根拠なくニュートラルな語り口だと評価している。 / F2: 固有Skillも文体サンプルもないため固有のVoice Fidelityは確認できないのに、「ニュートラルな語り口に収まっています」と確定的な評価を加えている。）

## 方法

各生成は別の一時作業フォルダと隔離`CODEX_HOME`で実行した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、fixtureの初期・最終内容、最終ファイル差分を別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

実行時の評価定義は[`evaluation.json`](./evaluation.json)、生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effortで、各条件・各ケース5回実行した評価である
- 採点は`gpt-5.6-sol`の別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差は今回の3ケース内の差であり、あらゆる日本語文章タスクへ一般化できない
