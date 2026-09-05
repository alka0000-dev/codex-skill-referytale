# ReferyTale 全件比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T07:14:11.252Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.18`
- 対象ケース: 38件
- 実行回数: 各条件・各ケース1回、計76出力
- 対象Git状態: `fe0f2635d91cb7acbcb7abf7f1f32ced0e2e37ed`（クリーン）
- Skill SHA-256: `09615c27086e7eff810df32f0a271b68af3cc3b85d62274410711fc83348e3a5`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 15/38 (39.47%)、生成エラー0件、未生成0件、未採点0件
- Skillあり: 35/38 (92.11%)、生成エラー0件、未生成0件、未採点0件
- 合格率差: +52.63ポイント
- ケース比較: 改善20、同等18、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p01-user-term-is-not-model-coinage | rewrite | V2, V1 | 1/1 | 1/1 | same |
| p02-no-unsolicited-coinage | write | F1, V1, M1 | 0/1 | 1/1 | improved |
| p03-no-invented-scene | write | F1, M1 | 0/1 | 1/1 | improved |
| p04-keep-uncertainty | rewrite | F2, M1 | 0/1 | 1/1 | improved |
| p05-persona-overrides-generic-style | composition | P1 | 1/1 | 1/1 | same |
| p06-established-term-is-allowed | write | V1 | 1/1 | 1/1 | same |
| p07-source-term-with-attribution | write | V1, M1 | 1/1 | 1/1 | same |
| p08-explicit-naming-request | naming | V1, M1 | 0/1 | 1/1 | improved |
| p09-do-not-universalize-personal-story | rewrite | F2, V1, Q2, M1 | 0/1 | 1/1 | improved |
| p10-naturalness-without-template | rewrite | Q1, F1, M1 | 1/1 | 1/1 | same |
| n01-translation-only | negative-trigger | N1, M1 | 1/1 | 1/1 | same |
| n02-formatting-only | negative-trigger | N1, M1 | 1/1 | 1/1 | same |
| n03-code-only | negative-trigger | N1 | 1/1 | 1/1 | same |
| p11-user-term-retention-rewrite | rewrite | V2, M1 | 1/1 | 1/1 | same |
| p12-persona-structure-overrides-generic | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |
| p13-no-over-structuring-personal-essay | rewrite | Q2, M1 | 0/1 | 1/1 | improved |
| p14-break-repetitive-template | rewrite | Q1, F1, M1 | 1/1 | 1/1 | same |
| p15-preserve-claim-strength | rewrite | M1 | 1/1 | 1/1 | same |
| p16-no-invented-emotion | write | F1 | 0/1 | 1/1 | improved |
| p17-creative-task-can-invent | write | V1 | 1/1 | 1/1 | same |
| p18-provenance-table-mode | strict-write | F1, V1, P1 | 0/1 | 1/1 | improved |
| p19-verified-secondary-source-is-allowed | write | F1, M1 | 0/1 | 1/1 | improved |
| p20-do-not-strengthen-mild-opinion | rewrite | M1 | 1/1 | 1/1 | same |
| p21-provenance-table-does-not-create-untracked-file | strict-write | F1, P1, A1 | 1/1 | 1/1 | same |
| p22-persona-style-without-invented-scene | composition | F1, P1, Q2, M1 | 0/1 | 0/1 | same |
| p23-draft-is-not-a-source | rewrite | F1, P1, Q2, M1, V1 | 0/1 | 1/1 | improved |
| p24-naming-preserves-sequence | naming | V1, M1 | 0/1 | 1/1 | improved |
| p25-sparse-material-does-not-create-backstory | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p26-negated-expectation-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p27-negated-trait-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p28-reader-scope-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p29-unspecified-plan-stays-unspecified | write | F1, M1 | 0/1 | 1/1 | improved |
| p30-one-sided-material-stays-one-sided | write | F1, V1, M1, Q2 | 0/1 | 1/1 | improved |
| p31-diagnostic-needs-material | diagnostic | D1, F2 | 0/1 | 0/1 | same |
| p32-preserve-distinct-repeated-items | rewrite | Q1, F1, M1 | 1/1 | 1/1 | same |
| p33-diagnostic-partial-material | diagnostic | D1, F2 | 0/1 | 0/1 | same |
| p34-persona-ending-keeps-core-event | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |
| p35-persona-temperature-without-unsupported-evaluation | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 4/20 (20.00%) | 20/20 (100.00%) |
| F2 — Uncertainty | 3/4 (75.00%) | 3/4 (75.00%) |
| V1 — Vocabulary provenance | 11/11 (100.00%) | 11/11 (100.00%) |
| V2 — User term retention | 2/2 (100.00%) | 2/2 (100.00%) |
| P1 — Skill composition | 6/8 (75.00%) | 7/8 (87.50%) |
| Q1 — Naturalness | 3/3 (100.00%) | 3/3 (100.00%) |
| Q2 — No over-structuring | 7/12 (58.33%) | 12/12 (100.00%) |
| M1 — Meaning preservation | 10/28 (35.71%) | 28/28 (100.00%) |
| A1 — Temporary artifact handling | 1/1 (100.00%) | 1/1 (100.00%) |
| N1 — Out-of-scope non-interference | 3/3 (100.00%) | 3/3 (100.00%) |
| D1 — Diagnostic evidence | 0/2 (0.00%) | 0/2 (0.00%) |

## 不合格の内訳

- p02-no-unsolicited-coinage — Skillなし run 1: 素材にない期待・行動・状況・助言が追加され、F1とM1を満たさない。（F1: 「仕事は楽になると思っていた」という事前の期待、返答後に元の作業へ戻って再依頼する反復、以前は考えたり休んだりしていたという状況、余白を残すべきだという助言を追加している。 / M1: 元の因果関係は含むものの、事前の期待、反復的な後続行動、過去との比較、助言まで加え、素材の意味範囲を拡張している。）
- p03-no-invented-scene — Skillなし run 1: 素材にない経験・感情・助言を加え、限定的なメモを一般的で断定的な主張へ拡張している。（F1: 材料にない「信用を失った」「会社ではやっていけない」という感情、失敗を振り返って工夫した経験、確認・謝罪などの助言を追加している。 / M1: 個人の経験と「かもしれない」という範囲を越え、「一度の失敗ですべてが決まるわけではない」「社会人人生の終わりではない」などの一般命題へ広げている。）
- p04-keep-uncertainty — Skillなし run 1: 不確実性は保っているが、M1を満たしていない。（M1: 元の「切り替え」を「作業の切り替え」と限定し、何の切り替えか未指定だった内容を具体化している。）
- p08-explicit-naming-request — Skillなし run 1: 新語の提案自体は適切だが、各案で元の時間関係と結果を完全には保てていない。（M1: 1案目は「空き時間が消える」を「休めなくなる」に置き換え、2案目と3案目も空き時間が消える結果を単独の説明として明確に保持していない。）
- p09-do-not-universalize-personal-story — Skillなし run 1: 本人の限定的な観察を、素材にない心理説明や評価、出来事へ大幅に拡張している。（F2: 「飽きたわけではない」「かなり楽しんでいる」「すでに満足している」など、未確認の状態を確定的に追加している。 / Q2: 体験を「終わりが見えると熱が役目を終える」「作品の終点と体験の終点が一致しない」などの分類・解釈や教訓へ広げている。 / M1: 元の観察と推測を超え、動機、満足、記憶、再開行動、自己評価など多数の意味を追加している。）
- p12-persona-structure-overrides-generic — Skillなし run 1: 常識的に予測できるにとどまる後続行動を追加しており、指定rubricをすべて満たさない。（F1: 気づいた後にマイクを入れたという後続行動は材料に明記されていない。 / P1: 人物Skillは材料にある事実だけで終えるよう求めているが、材料にないマイクを入れる行動を追加している。 / M1: マイクを入れ忘れて30秒後に本人が気づいた流れには沿うが、その後マイクを入れたという未提示の結果まで確定している。）
- p13-no-over-structuring-personal-essay — Skillなし run 1: 出来事の順序は保つ一方、原文にない評価的な意味を複数追加している。（M1: 「ついに」「当然」「待っていた」「懲りずに」「立派な」など、原文にない評価や態度を加えて意味の強度を変えている。）
- p16-no-invented-emotion — Skillなし run 1: 提示事実を超えて、記事内容と学びの存在を作り足している。（F1: 立ち上げから解散までの経緯を記事で扱うことや「そこから得た学び」が存在することを、メモにない事実として追加している。）
- p18-provenance-table-mode — Skillなし run 1: 資料にない意向が追加されており、F1を満たさない。（F1: 「違いを…丁寧に見つめていきたい」という書き手の意向を資料にない内容として追加している。）
- p19-verified-secondary-source-is-allowed — Skillなし run 1: 確認済み数値は使用しているが、回答者についての結果を利用者全体へ拡張している。（F1: 資料が示す対象は「回答者」だが、後半で「半数を超える利用者」と母集団を広げており、資料にない一般化を加えている。 / M1: 回答者の62％という限定を利用者全体の継続意向へ言い換え、対象範囲を変えている。）
- p22-persona-style-without-invented-scene — Skillなし run 1: 人物Skillの形式面は反映しているが、新しい事情や状態を作ったためF1とM1を満たさない。（F1: 「期待どおり」「地図が急に読めなくなる」「息と平静は間に合っていなかった」という、素材にない期待、具体的事情、状態を追加している。 / M1: 道に迷ったことと受付到着が開始5分前だったことは保持しているが、素材にない期待や心身の状態を付加して意味を拡張している。）
- p22-persona-style-without-invented-scene — Skillあり run 1: 人物Skillの自虐的な温度を満たしていない。（P1: 一人称は「わたし」で短長の差もあるが、人物Skillが指定する少し自虐的な温度が表現されていない。）
- p23-draft-is-not-a-source — Skillなし run 1: 初稿から削除すべき素材外の内容を否定形で再導入し、さらに未提示の状況を追加している。（F1: 「華麗なリカバリーも上司からの称賛もない」「誰にも開かれなかった」と、メモにない否定命題や状況を追加している。 / P1: 乾いたユーモアを出すために素材外の評価や状況を足しており、表せない場合はその要素を弱めるという要件を満たしていない。 / M1: 資料を飛ばして終了後に気づいたという核は保つが、リカバリー、称賛、閲覧状況について新しい意味を加えている。）
- p24-naming-preserves-sequence — Skillなし run 1: 3案の名称は提示したが、各案について元の状態の時間関係と結果を明示する説明が欠け、意味保持の要件を満たさない。（M1: 名称だけで各案の説明がなく、「レビューの返答を待つ間に次の修正を始める」という時間関係と「レビュー前の変更が積み上がる」という結果を各案単独では保持できていない。特に「承認前」はレビュー前と同義とは限らない。）
- p25-sparse-material-does-not-create-backstory — Skillなし run 1: 材料にない事前期待と一般論が追加され、指定rubricをすべて満たしていない。（F1: 「ほんの少しのつもり」という事前の期待と、「便利な道具ほど私たちの時間を…」という一般論を材料にない内容として追加している。 / M1: 単に予定より長く使ったというメモを、短時間で終える意図があったかのように具体化している。 / Q2: 個別の出来事を「便利な道具」全般についての教訓的な一般論へ広げている。）
- p26-negated-expectation-needs-source — Skillなし run 1: 短い導入ではあるが、素材にない反期待と偶発性の含意を加えたためF1とM1を満たさない。（F1: 「読んでいたはずが」による反期待の含意と、「ふと」による無意識・偶発的な確認というニュアンスを素材に追加している。 / M1: 中心となる出来事は保持しているが、元メモにない反期待や偶発性を加え、意味の強度と含意を変えている。）
- p27-negated-trait-needs-source — Skillなし run 1: 材料にない経緯、評価、感情を大幅に追加しており、F1とM1を満たさない。（F1: 先延ばしではないこと、何度も読み返したこと、言葉や図を整えたこと、伝わると思ったこと、安心や満足など、多数の事実・認識・感情を追加している。 / M1: 「ようやく」や先延ばしの否定を含め、完成までの経緯と本人の感情を材料にない形で具体化している。）
- p28-reader-scope-needs-source — Skillなし run 1: 素材にない原因と一般論を加え、本人の経験の範囲を越えている。（F1: 素材にない「勇気を出して」という原因・心情と、「次の成長につながります」という一般命題を追加している。 / M1: 翌週に提案した事実へ「勇気を出した」という意味を加え、個人の出来事を成長の物語へ変えている。 / Q2: 本人の二つの経験にとどめず、「小さな一歩でも、次の成長につながります」と一般的な教訓へ広げている。）
- p29-unspecified-plan-stays-unspecified — Skillなし run 1: 核となる出来事に、明示的に禁止された素材外の感情を追加している。（F1: 素材にない疲労と喜びを「少し疲れた」「うれしい」と追加している。 / M1: 予定より長引き夕方に棚を組み立て終えた事実は保つが、未提示の感情と部屋が整うという状況を付加している。）
- p30-one-sided-material-stays-one-sided — Skillなし run 1: 新語はないが、材料にない利点・一般論・助言が追加されている。（F1: 「部屋は片づいたように見える」という利点や、中身を減らして置き場所を決めるという助言を追加している。 / M1: 元の因果関係は残しているが、収納では所在把握が大切だという一般論と改善策を加え、素材の意味の範囲を越えている。 / Q2: 片側の体験的内容を、収納の原則と行動上の教訓へ変えている。）
- p31-diagnostic-needs-material — Skillなし run 1: 未確認事項の断定はないが、必要な4軸について材料不足を根拠に判定不能とする診断要件を満たしていない。（D1: 4軸すべてを材料不足による判定不能と明示せず、指定された各軸とも異なる軸を提示している。また、Source Fidelityの照合元、Vocabulary Provenanceの定義語彙、Voice Fidelityの固有Skillまたは文体サンプルなど、各判定に必要な材料を示していない。）
- p31-diagnostic-needs-material — Skillあり run 1: 不足材料に応じた4軸の判定不能と必要材料の提示が不十分で、D1を満たさない。（D1: 診断対象の不足は示しているが、4軸すべてを明示的に判定不能としておらず、Vocabulary Provenanceに必要なユーザー・プロジェクト・参照資料の定義語彙や、Voice Fidelityに必要な固有Skillまたは文体サンプルも必要材料として十分に示していない。）
- p33-diagnostic-partial-material — Skillなし run 1: 不確実性の扱いは適切だが、指定された4軸に沿った診断になっておらずD1を満たさない。（D1: Source Fidelityは元メモとの照合、Writing Qualityは対象文から判定し、文体適合性の材料不足も示しているが、必要な独立軸であるVocabulary Provenanceの診断がなく、代わりに「情報の過不足」「構成・流れ」を設けている。）
- p33-diagnostic-partial-material — Skillあり run 1: 材料不足のVoice Fidelityを判定不能にせず、問題なしと確定したため。（D1: Voice Fidelityの判断材料がないのに「ニュートラルな文体として妥当」と評価し、判定不能として必要な固有Skillまたは文体サンプルを明示していない。さらに総合診断で四軸すべて問題なしとしている。 / F2: 文体適合性を確認できる材料がないにもかかわらず、Voice Fidelityを妥当かつ問題なしと確定している。）
- p34-persona-ending-keeps-core-event — Skillなし run 1: 中心的な意味と構成条件は保っているが、材料にないUI上の具体情報を補っている。（F1: 材料にはない「送信ボタン」や「添付欄が空だった」という具体的な画面・状態を追加している。）
- p35-persona-temperature-without-unsupported-evaluation — Skillなし run 1: F1、Q2、M1を満たしていない。（F1: 会議に入室したこと、誰もいなかったこと、十分待ったこと、不安、退出、入退室ログなど、材料にない行動・状況・感情を多数追加している。 / Q2: 二つの出来事を述べた後に「ただ、時刻を間違えただけの人だった」と評価的に言い直し、素材外の失敗像へ構成している。 / M1: 開始時刻を一時間早く勘違いし予定表で気づくという核は残るが、入室、待機、不安、退出という新たな経過を加えて元の出来事の範囲を大きく変えている。）

## 方法

各生成は別の一時作業フォルダと隔離`CODEX_HOME`で実行した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、fixtureの初期・最終内容、最終ファイル差分を別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

実行時の評価定義は[`evaluation.json`](./evaluation.json)、生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effortで、各条件・各ケース1回実行した評価である
- 採点は`gpt-5.6-sol`の別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差は今回の38ケース内の差であり、あらゆる日本語文章タスクへ一般化できない
