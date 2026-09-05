# ReferyTale 比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T07:24:22.234Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.18`
- 対象ケース: 3件
- 実行回数: 各条件・各ケース5回、計30出力
- 対象Git状態: `1588901c89cece75916cfecff395f8b11bdc5b43`（クリーン）
- Skill SHA-256: `09615c27086e7eff810df32f0a271b68af3cc3b85d62274410711fc83348e3a5`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 0/15 (0.00%)、生成エラー0件、未生成0件、未採点0件
- Skillあり: 0/15 (0.00%)、生成エラー0件、未生成0件、未採点0件
- 合格率差: 0.00ポイント
- ケース比較: 改善0、同等3、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p22-persona-style-without-invented-scene | composition | F1, P1, Q2, M1 | 0/5 | 0/5 | same |
| p31-diagnostic-needs-material | diagnostic | D1, F2 | 0/5 | 0/5 | same |
| p33-diagnostic-partial-material | diagnostic | D1, F2 | 0/5 | 0/5 | same |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 0/5 (0.00%) | 5/5 (100.00%) |
| F2 — Uncertainty | 10/10 (100.00%) | 5/10 (50.00%) |
| V1 — Vocabulary provenance | — | — |
| V2 — User term retention | — | — |
| P1 — Skill composition | 5/5 (100.00%) | 0/5 (0.00%) |
| Q1 — Naturalness | — | — |
| Q2 — No over-structuring | 5/5 (100.00%) | 5/5 (100.00%) |
| M1 — Meaning preservation | 0/5 (0.00%) | 5/5 (100.00%) |
| A1 — Temporary artifact handling | — | — |
| N1 — Out-of-scope non-interference | — | — |
| D1 — Diagnostic evidence | 0/10 (0.00%) | 0/10 (0.00%) |

## 不合格の内訳

- p22-persona-style-without-invented-scene — Skillなし run 1: 人物Skillには沿っているが、メモにない行動と身体状態を追加している。（F1: 「地図を何度見ても」、地図の現在地表示に関する描写、到着時に息が切れていたことをメモにない事実として追加している。 / M1: 道に迷ったことと開始5分前の到着は保持しているが、地図を繰り返し見たことや息切れを加え、原素材を超えて出来事を具体化している。）
- p22-persona-style-without-invented-scene — Skillなし run 2: F1とM1を満たさないため。（F1: メモにない「知らない道を何度か往復」「一日分くらい疲れていた」という行動と感覚を追加している。 / M1: 主要事実は保持しているが、往復した経路上の行動や強い疲労感を加え、原素材の内容を変えている。）
- p22-persona-style-without-invented-scene — Skillなし run 3: 人物Skillには沿っているが、材料にない出来事や状況の追加によりF1とM1を満たさない。（F1: メモにない「知らない街をぐるぐる歩く」「名前を告げる」「息が正直だった」という場所・行動・身体状況を追加している。 / M1: 元の二つの事実は保持しているものの、迷った場所、到着後の行動、身体状況を具体化し、原素材の意味範囲を変更している。）
- p22-persona-style-without-invented-scene — Skillなし run 4: 人物Skillには適合しているが、メモにない行動と状況を追加しており、F1とM1を満たさない。（F1: メモにない「地図を何度も見直した」「同じ角をたぶん二度曲がった」「間に合った顔」を追加している。 / M1: 道に迷って開始5分前に受付へ着いたという核は保持しているが、経路上の行動や到着時の振る舞いを新たな出来事として具体化しており、原素材の意味範囲を保っていない。）
- p22-persona-style-without-invented-scene — Skillなし run 5: F1とM1を満たさないため。（F1: メモにない「知らない街をぐるぐる歩き」や、顔に状態が表れていたという描写を追加している。 / M1: 道に迷ったことと開始5分前の到着は保持しているが、場所・行動・外見の描写を補って原素材の意味範囲を広げている。）
- p22-persona-style-without-invented-scene — Skillあり run 1: 材料への忠実性と意味保持には問題ないが、人物Skillで指定された自虐的な温度と文の長短の混在が欠けている。（P1: 一人称は守っているが、自虐的な温度がなく、二文とも同程度に短いため、人物Skillの「少し自虐的」「短い文と長い文を混ぜる」を満たしていない。）
- p22-persona-style-without-invented-scene — Skillあり run 2: 材料への忠実性と意味保持には問題ないが、人物Skillで指定された自虐的な温度と文の長短の混在が欠けている。（P1: 一人称は守っているが、自虐的な温度がなく、二文とも同程度に短いため、人物Skillの「少し自虐的」「短い文と長い文を混ぜる」を満たしていない。）
- p22-persona-style-without-invented-scene — Skillあり run 3: 事実は忠実に保持しているが、人物Skill指定の自虐性と文の長短の混在が欠けている。（P1: 一人称「わたし」は使っているが、自虐的な温度がなく、二文の長さと型もほぼ均一で、人物Skillの主要な具体ルールを十分に反映していない。）
- p22-persona-style-without-invented-scene — Skillあり run 4: 材料への忠実性と意味保持には問題ないが、人物Skillで指定された自虐的な温度と文の長短の混在が欠けている。（P1: 一人称は守っているが、自虐的な温度がなく、二文とも同程度に短いため、人物Skillの「少し自虐的」「短い文と長い文を混ぜる」を満たしていない。）
- p22-persona-style-without-invented-scene — Skillあり run 5: 内容は忠実で一般化もないが、自虐的な調子と文の長短という人物Skillの要件を満たしていない。（P1: 一人称「わたし」は使っているが、自虐的な温度がなく、二文の長さと構造も近いため、短い文と長い文を混ぜるという人物Skillを十分反映していない。）
- p31-diagnostic-needs-material — Skillなし run 1: 未確認事項は確定していないが、指定された4軸ごとの材料不足の診断になっていない。（D1: 指定された4軸ではなく「自然さ・個性・具体性・AIらしさ」に置き換えており、各軸を判定不能ともしていない。Source Fidelityの照合資料、Vocabulary Provenanceの定義語彙、Voice Fidelityの固有Skillまたは文体サンプルなど、必要材料も軸別に示していない。）
- p31-diagnostic-needs-material — Skillなし run 2: D1を満たさないため。（D1: 診断対象がない状況で4軸すべてを判定不能と明示せず、各軸に必要な材料も示していない。列挙した軸も指定された4軸とは異なる。）
- p31-diagnostic-needs-material — Skillなし run 3: 未確認の診断はしていないが、指定軸ごとの判定不能と必要材料の提示がない。（D1: 指定のSource Fidelity、Vocabulary Provenance、Voice Fidelity、Writing Qualityではなく別の4軸を提示している。全軸を判定不能ともせず、各軸に必要な照合資料、定義語彙、固有Skillまたは文体サンプルも示していない。）
- p31-diagnostic-needs-material — Skillなし run 4: D1を満たさないため。（D1: 4軸すべてを判定不能とせず、軸ごとの必要材料も示していない。提示した4軸も指定された診断軸に対応していない。）
- p31-diagnostic-needs-material — Skillなし run 5: D1を満たさないため。（D1: 4軸すべてを材料不足による判定不能と明示せず、各軸に必要な診断対象文・照合資料・定義済み語彙・固有Skillまたは文体サンプルも示していない。）
- p31-diagnostic-needs-material — Skillあり run 1: 未確認事項の断定はないが、各軸の判定不能状態と必要材料の提示が不足している。（D1: 診断対象がないことは示しているが、4軸をそれぞれ判定不能と明示しておらず、Source Fidelityに必要な照合元資料、Vocabulary Provenanceに必要な定義済み語彙、Voice Fidelityに必要な固有Skillまたは文体サンプルも具体的に要求していない。）
- p31-diagnostic-needs-material — Skillあり run 2: 不足を認識しているものの、指定された各軸の判定不能と対応する必要材料を十分に示していない。（D1: 対象文がないことは示しているが、4軸すべてを明示的に判定不能としていない。また、Source Fidelityの照合元資料、Vocabulary Provenanceの定義語彙、Voice Fidelityの固有Skillまたは文体サンプルが必要だと軸別に示していない。）
- p31-diagnostic-needs-material — Skillあり run 3: 未確認事項の断定は避けているが、軸ごとの判定不能と必要材料の説明が不足している。（D1: 診断対象がないことは示しているが、4軸をそれぞれ判定不能と明示せず、Source Fidelityの照合元資料、Vocabulary Provenanceの定義済み語彙、Voice Fidelityの固有Skillまたは文体サンプルが必要であることも示していない。）
- p31-diagnostic-needs-material — Skillあり run 4: 材料不足自体は認識しているが、各軸の判定不能状態と対応する必要材料を十分に示していない。（D1: 診断対象がないことは示しているが、4軸すべてを判定不能と明示せず、Source Fidelityの照合元資料、Vocabulary Provenanceの定義済み語彙、Voice Fidelityの固有Skillまたは文体サンプルという必要材料も提示していない。）
- p31-diagnostic-needs-material — Skillあり run 5: 根拠なく確定評価はしていないが、各軸の判定不能状態と必要材料の提示が不十分でD1を満たさない。（D1: 対象文がないことは指摘しているが、4軸すべてを明示的に判定不能とせず、Source Fidelityに照合元資料、Vocabulary Provenanceにユーザー等が定義した語彙、Voice Fidelityに固有Skillまたは文体サンプルが必要であることを軸別に十分示していない。）
- p33-diagnostic-partial-material — Skillなし run 1: D1を満たさないため。（D1: Source Fidelity、Voice Fidelity、Writing Qualityに相当する評価はあるが、Vocabulary Provenanceを独立した軸として判定していない。）
- p33-diagnostic-partial-material — Skillなし run 2: D1を満たさないため。（D1: 素材保持、Voice Fidelity、Writing Qualityは扱っているが、Vocabulary Provenanceを提示された語彙に基づく独立軸として判定していない。）
- p33-diagnostic-partial-material — Skillなし run 3: Voice Fidelityの不確実性は適切に扱ったが、Vocabulary Provenanceを欠き、要求された4軸の診断になっていない。（D1: 内容の忠実度と文体の適合度は適切に扱っているが、指定された4軸のVocabulary Provenanceを診断せず、代わりに「明確さ」「文の流れ」を独立軸としているため、必要な軸別診断を満たしていない。）
- p33-diagnostic-partial-material — Skillなし run 4: 不確実性の扱いは適切だが、必要な4軸のうちVocabulary Provenanceを診断していないためD1を満たさない。（D1: Source Fidelity相当とWriting Quality相当は評価し、文体適合も材料不足と示しているが、指定されたVocabulary Provenanceを評価せず、代わりに構成・論理や明瞭性・具体性を軸としている。）
- p33-diagnostic-partial-material — Skillなし run 5: D1を満たさないため。（D1: Source Fidelity、Voice Fidelity、Writing Qualityに相当する判定はあるが、Vocabulary Provenanceを提示語彙に基づいて独立に判定していない。）
- p33-diagnostic-partial-material — Skillあり run 1: 材料不足であるVoice Fidelityを判定不能として扱わず、問題なしと確定している。（D1: Voice Fidelityに必要な固有Skillまたは文体サンプルがないのに判定不能とせず、最終的に「4軸すべてで問題は見当たりません」と結論づけている。 / F2: 照合材料がなく確認できないVoice Fidelityを、問題がないとの確定的な総合評価へ変えている。）
- p33-diagnostic-partial-material — Skillあり run 2: Voice Fidelityの材料不足を明示的な判定不能として扱っていない。（D1: Voice Fidelityについて照合できる固有の語り口がないと認識しながら、判定不能とはせず、元メモの中立的文体を保っているとして評価し、総合でも4軸すべて問題なしとしている。 / F2: 固有Skillや文体サンプルがないため確認できないVoice Fidelityを、実質的に問題なしと確定している。）
- p33-diagnostic-partial-material — Skillあり run 3: Voice Fidelityの材料不足を判定不能として扱っていない。（D1: Voice Fidelityは固有Skillや文体サンプルがなく判定不能であるべきところ、「ニュートラルな文体として適切」と判定し、総合でも4軸すべて問題なしとしている。 / F2: 照合材料のないVoice Fidelityを適切と確定している。）
- p33-diagnostic-partial-material — Skillあり run 4: Voice Fidelityの材料不足を判定不能として扱わず、根拠のない確定評価を行っている。（D1: Source Fidelity、Vocabulary Provenance、Writing Qualityは利用可能な材料から判定しているが、固有Skillも文体サンプルもないVoice Fidelityを判定不能とせず、「ニュートラルな文体として適切」と評価している。 / F2: 書き手の声を評価する材料がないにもかかわらず、Voice Fidelityを適切とし、総合でも4軸すべて問題なしと確定している。）
- p33-diagnostic-partial-material — Skillあり run 5: Voice Fidelityのみ判定不能とすべき要件を満たしていない。（D1: Voice Fidelityに必要な固有Skillまたは文体サンプルがないのに、「ニュートラルな文体として適切」と評価し、4軸すべて問題なしとしている。 / F2: 確認材料のないVoice Fidelityを適切と確定している。）

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
