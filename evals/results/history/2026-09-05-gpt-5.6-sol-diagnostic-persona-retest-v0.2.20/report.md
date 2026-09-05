# ReferyTale 比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T07:38:08.900Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.20`
- 対象ケース: 3件
- 実行回数: 各条件・各ケース5回、計30出力
- 対象Git状態: `797d3b6847649f9e0884286480237eb7696d9cf5`（クリーン）
- Skill SHA-256: `b4a2ead71bc2de34b39905db73cfa34912087b232a4815a6369f1e9df06e38c9`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 0/15 (0.00%)、生成エラー0件、未生成0件、未採点0件
- Skillあり: 15/15 (100.00%)、生成エラー0件、未生成0件、未採点0件
- 合格率差: +100.00ポイント
- ケース比較: 改善3、同等0、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p22-persona-style-without-invented-scene | composition | F1, P1, Q2, M1 | 0/5 | 5/5 | improved |
| p31-diagnostic-needs-material | diagnostic | D1, F2 | 0/5 | 5/5 | improved |
| p33-diagnostic-partial-material | diagnostic | D1, F2 | 0/5 | 5/5 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 0/5 (0.00%) | 5/5 (100.00%) |
| F2 — Uncertainty | 10/10 (100.00%) | 10/10 (100.00%) |
| V1 — Vocabulary provenance | — | — |
| V2 — User term retention | — | — |
| P1 — Skill composition | 3/5 (60.00%) | 5/5 (100.00%) |
| Q1 — Naturalness | — | — |
| Q2 — No over-structuring | 5/5 (100.00%) | 5/5 (100.00%) |
| M1 — Meaning preservation | 0/5 (0.00%) | 5/5 (100.00%) |
| A1 — Temporary artifact handling | — | — |
| N1 — Out-of-scope non-interference | — | — |
| D1 — Diagnostic evidence | 0/10 (0.00%) | 10/10 (100.00%) |

## 不合格の内訳

- p22-persona-style-without-invented-scene — Skillなし run 1: 人物Skillには沿うものの、素材外の行動と評価を追加しているためF1とM1を満たさない。（F1: 似たビル、地図を回す動作、自分まで回りそうになる描写など、メモにない場所・経路・行動を追加している。 / M1: 核となる二事実は残しているが、具体的な迷走行動と「間に合ったと言えるか怪しい」という素材外の評価で意味を拡張している。）
- p22-persona-style-without-invented-scene — Skillなし run 2: 素材にない経路と評価を追加しており、F1とM1を満たさない。（F1: 「知らない街をぐるぐる歩き」「遅刻し損ねたという感じ」など、メモにない場所・経路・評価を追加している。 / M1: 道に迷ったことと開始5分前という核は保持するが、未知の街を歩き回った経路や「遅刻し損ねた」という解釈を加え、原素材の意味を拡張している。）
- p22-persona-style-without-invented-scene — Skillなし run 3: F1とM1を満たしていない。（F1: 地図を見たこと、現在地が分からなかったこと、同じ角を二度曲がった可能性、精いっぱいだったという状態を素材外から追加している。 / M1: 元の二事実は保持しているが、経路上の行動や本人の状態を加え、原素材を超える意味にしている。）
- p22-persona-style-without-invented-scene — Skillなし run 4: 素材にない出来事や状態を多数追加しており、F1、P1、M1を満たさない。（F1: 「知らない道を二度曲がった」「同じコンビニを三度見た」「間に合った顔をした」「心臓だけは全力疾走」など、メモにない経路、行動、感情的状態を追加している。 / P1: 人物Skillの表面的な文体要件には沿うが、指定例が求める素材外の評価や第三文以降を足さない構成より創作的な補足を優先している。 / M1: 元の二つの事実自体は残しているが、具体的な経路、反復回数、振る舞い、身体反応を加えて体験の内容と強度を変えている。）
- p22-persona-style-without-invented-scene — Skillなし run 5: F1、P1、M1を満たしていない。（F1: 地図を読む才能がないという自己評価、途中の交差点、初日らしい余裕や爽やかさを失ったという素材外の内容を追加している。 / P1: 人物Skillの自虐性を反映してはいるが、素材外の評価を述べる文を追加しており、この課題で求められた具体的な構成規則を満たしていない。 / M1: 元の出来事は残しているものの、能力評価や経路、心理的な余裕に関する意味を付加している。）
- p31-diagnostic-needs-material — Skillなし run 1: D1を満たしていない。（D1: 4軸すべてを判定不能として個別に扱わず、所定の各軸に必要な材料も示していない。さらに別の4軸へ置き換えている。）
- p31-diagnostic-needs-material — Skillなし run 2: 材料不足への対応と軸別の必要材料の提示が不十分で、D1を満たさない。（D1: 文章不足を指摘しているが、4軸すべてを判定不能とせず、Source Fidelity・Vocabulary Provenance・Voice Fidelityごとに不足する照合資料も示していない。また、要求された軸とは異なる独自の4軸を提示している。）
- p31-diagnostic-needs-material — Skillなし run 3: F2には反しないが、D1が要求する軸別の判定不能と必要材料の説明がない。（D1: 文章の提示を求めるだけで所定の4軸すべてを判定不能と明示せず、各軸に必要な照合資料、定義済み語彙、固有Skillまたは文体サンプルも示していない。提示した軸も所定の軸とは異なる。）
- p31-diagnostic-needs-material — Skillなし run 4: 不確実な内容の断定はないが、D1で求められる軸別の材料不足診断を行っていない。（D1: 診断対象がないことへの対応として、所定の4軸をすべて判定不能とせず、軸ごとの必要材料も示していない。代わりに自然さ、個性、具体性、AIらしさという別の軸を予告している。）
- p31-diagnostic-needs-material — Skillなし run 5: 未確認事項の断定はないが、材料不足時に必要なD1の診断形式と必要材料の提示を満たさない。（D1: 診断対象の欠如は指摘しているが、所定の4軸をすべて判定不能とせず、各軸に必要な照合元、定義済み語彙、固有Skillまたは文体サンプルを示していない。さらに別の4軸へ置き換えている。）
- p33-diagnostic-partial-material — Skillなし run 1: 指定された4軸に必要なVocabulary Provenanceの診断がないため、D1を満たさない。（D1: Source FidelityとVoice Fidelity相当は扱っているが、Vocabulary Provenanceを判定せず、構成・論理と表現・可読性に置き換えている。）
- p33-diagnostic-partial-material — Skillなし run 2: 4軸のうち必要な語彙由来の診断が欠けているため、D1を満たさない。（D1: 内容の忠実性と文体の材料不足は適切に扱う一方、必須のVocabulary Provenanceを診断せず、代わりに明瞭性と文章のつながりを軸にしている。）
- p33-diagnostic-partial-material — Skillなし run 3: Vocabulary Provenance軸に必要な診断が欠けているため、D1を満たさない。（D1: Source Fidelity、Writing Quality、Voice Fidelity相当の判定はあるが、Vocabulary Provenanceを対象文と提示語彙の出所に基づいて判定しておらず、代わりに「情報の過不足」を重複して評価している。）
- p33-diagnostic-partial-material — Skillなし run 4: Voice Fidelityの不確実性は適切だが、所定のVocabulary Provenance診断が欠けるためD1を満たさない。（D1: Source Fidelity、Writing Quality、Voice Fidelity相当は扱っているが、Vocabulary Provenanceを対象文と提示語彙の照合として独立に判定していない。「事実・素材の管理」は語彙由来の診断を代替しない。）
- p33-diagnostic-partial-material — Skillなし run 5: F2は満たすが、必要な4軸に基づく診断になっておらずD1を満たさない。（D1: 指定された4軸のうちVocabulary Provenanceを対象文と提示語彙の照合として判定せず、代わりに「具体性・情報量」「構成・つながり」を評価しているため。Voice Fidelity相当の材料不足は示している。）

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
