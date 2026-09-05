# ReferyTale 全件比較評価 — gpt-5.6-sol

> **公開後訂正:** 内容の再確認により、Skillありのp18をP1不合格へ訂正した。訂正後はSkillなし16/38、Skillあり37/38である。元の自動採点データは監査用に保持し、訂正内容は[`review-correction.json`](./review-correction.json)を正本とする。

- 実施日時: 2026-09-05T08:14:14.459Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.22`
- 対象ケース: 38件
- 実行回数: 各条件・各ケース1回、計76出力
- 対象Git状態: `a29bafa1ce4bd72b257947eb7407709c71e11c86`（クリーン）
- Skill SHA-256: `d2a6326388b8372d5b55342a878ae43b5c43d04830fc9d0df7f246dbcc5bc3b5`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 16/38 (42.11%)、生成エラー0件、未生成0件、未採点0件
- Skillあり: 37/38 (97.37%)、生成エラー0件、未生成0件、未採点0件
- 合格率差: +55.26ポイント
- ケース比較: 改善22、同等15、悪化1、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p01-user-term-is-not-model-coinage | rewrite | V2, V1 | 1/1 | 1/1 | same |
| p02-no-unsolicited-coinage | write | F1, V1, M1 | 0/1 | 1/1 | improved |
| p03-no-invented-scene | write | F1, M1 | 0/1 | 1/1 | improved |
| p04-keep-uncertainty | rewrite | F2, M1 | 0/1 | 1/1 | improved |
| p05-persona-overrides-generic-style | composition | P1 | 1/1 | 1/1 | same |
| p06-established-term-is-allowed | write | V1 | 1/1 | 1/1 | same |
| p07-source-term-with-attribution | write | V1, M1 | 0/1 | 1/1 | improved |
| p08-explicit-naming-request | naming | V1, M1 | 0/1 | 1/1 | improved |
| p09-do-not-universalize-personal-story | rewrite | F2, V1, Q2, M1 | 0/1 | 1/1 | improved |
| p10-naturalness-without-template | rewrite | Q1, F1, M1 | 1/1 | 1/1 | same |
| n01-translation-only | negative-trigger | N1, M1 | 1/1 | 1/1 | same |
| n02-formatting-only | negative-trigger | N1, M1 | 1/1 | 1/1 | same |
| n03-code-only | negative-trigger | N1 | 1/1 | 1/1 | same |
| p11-user-term-retention-rewrite | rewrite | V2, M1 | 1/1 | 1/1 | same |
| p12-persona-structure-overrides-generic | composition | F1, P1, Q2, M1 | 1/1 | 1/1 | same |
| p13-no-over-structuring-personal-essay | rewrite | Q2, M1 | 0/1 | 1/1 | improved |
| p14-break-repetitive-template | rewrite | Q1, F1, M1 | 0/1 | 1/1 | improved |
| p15-preserve-claim-strength | rewrite | M1 | 1/1 | 1/1 | same |
| p16-no-invented-emotion | write | F1 | 0/1 | 1/1 | improved |
| p17-creative-task-can-invent | write | V1 | 1/1 | 1/1 | same |
| p18-provenance-table-mode | strict-write | F1, V1, P1 | 1/1 | 0/1 | regressed |
| p19-verified-secondary-source-is-allowed | write | F1, M1 | 0/1 | 1/1 | improved |
| p20-do-not-strengthen-mild-opinion | rewrite | M1 | 1/1 | 1/1 | same |
| p21-provenance-table-does-not-create-untracked-file | strict-write | F1, P1, A1 | 0/1 | 1/1 | improved |
| p22-persona-style-without-invented-scene | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |
| p23-draft-is-not-a-source | rewrite | F1, P1, Q2, M1, V1 | 0/1 | 1/1 | improved |
| p24-naming-preserves-sequence | naming | V1, M1 | 0/1 | 1/1 | improved |
| p25-sparse-material-does-not-create-backstory | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p26-negated-expectation-needs-source | write | F1, M1, Q2 | 1/1 | 1/1 | same |
| p27-negated-trait-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p28-reader-scope-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p29-unspecified-plan-stays-unspecified | write | F1, M1 | 0/1 | 1/1 | improved |
| p30-one-sided-material-stays-one-sided | write | F1, V1, M1, Q2 | 0/1 | 1/1 | improved |
| p31-diagnostic-needs-material | diagnostic | D1, F2 | 0/1 | 1/1 | improved |
| p32-preserve-distinct-repeated-items | rewrite | Q1, F1, M1 | 1/1 | 1/1 | same |
| p33-diagnostic-partial-material | diagnostic | D1, F2 | 0/1 | 1/1 | improved |
| p34-persona-ending-keeps-core-event | composition | F1, P1, Q2, M1 | 1/1 | 1/1 | same |
| p35-persona-temperature-without-unsupported-evaluation | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 6/20 (30.00%) | 20/20 (100.00%) |
| F2 — Uncertainty | 3/4 (75.00%) | 4/4 (100.00%) |
| V1 — Vocabulary provenance | 11/11 (100.00%) | 11/11 (100.00%) |
| V2 — User term retention | 2/2 (100.00%) | 2/2 (100.00%) |
| P1 — Skill composition | 5/8 (62.50%) | 7/8 (87.50%) |
| Q1 — Naturalness | 3/3 (100.00%) | 3/3 (100.00%) |
| Q2 — No over-structuring | 5/12 (41.67%) | 12/12 (100.00%) |
| M1 — Meaning preservation | 10/28 (35.71%) | 28/28 (100.00%) |
| A1 — Temporary artifact handling | 1/1 (100.00%) | 1/1 (100.00%) |
| N1 — Out-of-scope non-interference | 3/3 (100.00%) | 3/3 (100.00%) |
| D1 — Diagnostic evidence | 0/2 (0.00%) | 2/2 (100.00%) |

## 不合格の内訳

- p18-provenance-table-mode — Skillあり run 1（公開後訂正）: 人物Skillは本人の実感から書き始めるよう求めているが、出力は出社頻度から始まり、疲労の実感を後置しているためP1不合格へ訂正した。詳細は[`review-correction.json`](./review-correction.json)を参照する。
- p02-no-unsolicited-coinage — Skillなし run 1: 素材外の事実・期待・後続行動・助言が多数追加されているため。（F1: 「仕事が楽になるはず」という事前の期待、メール返信・資料修正・次の指示、回答後の確認と修正、効率向上、休むことへの助言を素材外から追加している。 / M1: 元の因果関係を含む一方、素材にない期待、具体的行動、後続結果、助言まで加えて意味の範囲を変えている。）
- p03-no-invented-scene — Skillなし run 1: 素材外の経験や助言を多数追加し、個人の不確実なメモを一般命題へ変えている。（F1: 材料にない「注意された」「信用されない」「落ち込んだ」「反省した」「仕事を覚えた」などの経験・感情・経過に加え、確認、メモ、見直しといった助言を追加している。 / M1: 「終わったと思うかもしれない」という個人の不確実な内容を、「社会人人生は終わらない」「大丈夫」などの一般的・断定的な主張へ広げている。依頼されていないタイトルも追加している。）
- p04-keep-uncertainty — Skillなし run 1: 原因の不確実性は保っているが、切り替えの対象を素材外の内容で具体化している。（M1: 原文の曖昧な「切り替え」を「作業の切り替え」と具体化し、素材にない限定を加えている。）
- p07-source-term-with-attribution — Skillなし run 1: 用語の出所は適切だが、提示されていない解釈と本人の考えを補っている。（M1: 材料に示されていない「保留する力」の具体的な意味や、異なる意見の理解・思い込みの見直しに重要だというユーザー自身の考えを創作している。）
- p08-explicit-naming-request — Skillなし run 1: 各案が単独で元の時間関係と結果を保つというM1の条件を満たさない。（M1: 2案目の説明はAIの待ち時間に別の仕事を入れる行動しか示さず、その結果として空き時間が消えることを単独では保持していない。3案目も空き時間を「AIによって生まれるはず」としており、元の状態を余分に具体化している。）
- p09-do-not-universalize-personal-story — Skillなし run 1: F2、Q2、M1を満たさず、元の本人観察を確定的な仕組みや教訓へ拡張している。（F2: 「一定量の熱が生まれる」「熱が切れたあとも作業として続けられる」など、入力では仮説だった熱量の仕組みを確定的に具体化している。 / Q2: 個人の短い観察から、未完了を失敗と呼ばないという教訓や「最後まで」を評価軸にしない見方へ大幅に展開している。 / M1: 装備やセーブデータ、寂しさ、宿題化、別れの先延ばし、記憶に残る景色や一文など、素材にない事実・感情・原因候補・判断軸を多数追加している。）
- p13-no-over-structuring-personal-essay — Skillなし run 1: 出来事の順序は保っていますが、原素材にない評価的な意味を追加しています。（M1: 元文にない「案の定」「待っていた」「懲りもせず」「立派な」という評価や心情的な含みを加え、語り手の姿勢を具体化しています。）
- p14-break-repetitive-template — Skillなし run 1: 自然さはあるが、出社と準備を統合して原素材の意味を変えている。（F1: 独立していた「出社がつらい」と「準備がつらい」を、材料にない「出社の準備がつらい」という関係へ具体化している。 / M1: 「出社がつらい」という内容を独立して保持せず、「準備」と統合しており、四つの内容が保たれていない。）
- p16-no-invented-emotion — Skillなし run 1: 記事で扱う経緯や学びを原素材に基づかず追加している。（F1: 「立ち上げから解散に至るまでの経緯を振り返る」「そこから得た学びを紹介する」という記事内容を、材料にない事実として追加している。）
- p19-verified-secondary-source-is-allowed — Skillなし run 1: 回答者についての結果を利用者全体へ一般化している。（F1: 資料が示すのは回答者の62％だが、後半で「過半数の利用者」に継続意向があると母集団全体へ広げている。 / M1: 確認済みの数値自体は保持しているものの、「回答者」を「利用者」一般へ置き換え、調査結果の適用範囲を変えている。）
- p21-provenance-table-does-not-create-untracked-file — Skillなし run 1: ファイル上の副作用はないが、資料外の助言を追加し、資料固有の文章規則にも反している。（F1: 「本人の実感を踏まえながら働き方を考える必要がある」という、資料にない助言・必要性を追加している。 / P1: 本人の実感から書き始めてはいるが、人物向け文章規則の「結論を急がず」に反して、働き方を考える必要があるという結論を追加している。）
- p22-persona-style-without-invented-scene — Skillなし run 1: 素材外の出来事や状態を追加しており、F1・P1・M1を満たさない。（F1: 地図を何度も見直したこと、平静を装ったこと、息が切れていたことを素材にない出来事・行動・状態として追加している。 / P1: 人物Skillより優先すべき素材制約に反し、新しい出来事を作ったうえ、評価付きの独立文「幸先がいい」も加えている。 / M1: 道に迷ったことと到着時刻は保持しているが、複数の未提示の行動や状態を付加し、原素材の範囲を変えている。）
- p23-draft-is-not-a-source — Skillなし run 1: 素材にない否定命題と教訓的・メタ的な結びを追加しており、F1、Q2、M1を満たさない。（F1: 「その場では誰も曇らず、私は謝らず、上司にも褒められていない」という、メモから導けない否定命題を追加している。 / Q2: 個別の失敗談を「失敗は成長の種かもしれない」「事実ではない部分を刈った」という教訓的・編集論的なまとめへ展開している。 / M1: メモの二つの事実は保持しているが、素材外の出来事を否定形で確定し、末尾にメタ的な意味を加えたため、原素材の意味範囲を保っていない。）
- p24-naming-preserves-sequence — Skillなし run 1: 3名称は提示したが、必須とされた各案の説明を欠いているため。（M1: 名称だけで各案の説明がなく、それぞれ単独で「返答を待つ間に次の修正を始める」という時間関係と「レビュー前の変更が積み上がる」という結果を保持しているか示せていない。）
- p25-sparse-material-does-not-create-backstory — Skillなし run 1: 素材にない事前意図と原因を加え、単発の出来事を反復的な経験へ広げているため、指定rubricをすべては満たさない。（F1: 「復習だけをするつもり」という限定的な事前意図と、「便利さに背中を押され」という素材にない原因を追加している。 / M1: 一度の出来事を「使ってしまうことがある」と反復し得る経験へ変え、素材にない意図や原因も加えているため、意味の範囲を保っていない。 / Q2: 単発の個人的体験を「ことがある」という一般化された経験表現へ広げている。）
- p27-negated-trait-needs-source — Skillなし run 1: 素材にない感情、具体的状況、後続行動、教訓を追加しているため。（F1: 保存表示、張りつめていた気持ち、安心、資料を眺める行動、締め切りから何かを教わったという内容を素材外から追加している。 / M1: 期限前日に資料を完成させた事実は含むが、「ようやく」による含意や未提示の感情・行動・後続展開を加えて意味を拡張している。 / Q2: 個別の出来事を「締め切りに追われる時間が教えてくれたこと」という教訓的な方向へ勝手に展開している。）
- p28-reader-scope-needs-source — Skillなし run 1: 素材にない感情や因果関係を加え、個人の経験を一般的な教訓へ広げています。（F1: 素材にない「悔しい思い」「勇気を出して」「自信につながる」という感情、原因、結果を追加しています。 / M1: 単に翌週一つ提案したという出来事を、悔しさを契機に勇気を出した成長過程へ変更しています。 / Q2: 個人の二つの会議での経験から、「行動することで自信につながる」という一般的な教訓へ広げています。）
- p29-unspecified-plan-stays-unspecified — Skillなし run 1: 出来事の核心は保持しているが、明示的に禁止された素材外の感情を追加しているため。（F1: 「少し疲れた」「ほっとした」という素材にない感情と、「部屋が整い始めた」という状態を追加している。 / M1: 予定より長引き夕方に棚を組み立て終えた事実は保つが、未提示の感情や部屋の状態を付加している。）
- p30-one-sided-material-stays-one-sided — Skillなし run 1: 元の観察を超えて、利点、一般論、助言を追加している。（F1: 「部屋は片づいたように見える」という利点、中身を減らして置き場所を決めるという助言など、材料にない内容を追加している。 / M1: 元の因果関係は含むものの、片づいて見えるという対比や整理方法の提案を加え、原素材の範囲と意味を変えている。 / Q2: 個別のメモを「収納は探す場所も増やすものだ」という一般論や、整理上の教訓・助言へ展開している。）
- p31-diagnostic-needs-material — Skillなし run 1: 材料不足への対応と軸別の必要材料の提示が不十分で、D1を満たさない。（D1: 診断対象がないことは指摘しているが、指定された4軸すべてを判定不能とは明示せず、各軸に必要な照合資料も示していない。さらに提示した4軸は期待されるSource Fidelity、Vocabulary Provenance、Voice Fidelity、Writing Qualityと対応していない。）
- p33-diagnostic-partial-material — Skillなし run 1: 不確実性の扱いは適切ですが、要求された4軸のうち一部を別の軸に置き換えています。（D1: 内容の忠実性と文体・個性は必要な材料に基づいて判定していますが、指定されたVocabulary ProvenanceとWriting Qualityの軸を明示的に診断せず、代わりに明瞭性と構成・つながりを判定しています。）
- p35-persona-temperature-without-unsupported-evaluation — Skillなし run 1: 素材外の場面・発言・感情を多数追加し、人物表現と文末単位に関する具体ルールにも反している。（F1: パソコンの前で待機した、誰も来なかった、他者を時間にルーズだと思った、ひとりで気まずくうなずいた、残り五十八分だったなど、材料にない行動・状況・感情・発言を追加している。 / P1: 一人称「ぼく」と教訓で結ばない点は守る一方、人物Skillを適用するために多数の文と意味単位を増やし、指定された二つ以下の文末単位にも収めていない。 / Q2: 元の二つの出来事に、素材外の自己評価や他者との比較、気まずさを伴う場面を重ね、個人の体験を過剰に脚色している。 / M1: 開始時刻を早く勘違いし予定表で気づいたという核は含むが、待機状況や他者への評価などを追加し、出来事の意味と範囲を大きく変えている。）

## 方法

各生成は別の一時作業フォルダと隔離`CODEX_HOME`で実行した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、fixtureの初期・最終内容、最終ファイル差分を別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

実行時の評価定義は[`evaluation.json`](./evaluation.json)、生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。Skillあり38出力を評価定義へ改めて照合した内容監査は[`manual-audit.md`](./manual-audit.md)に記録した。

## 制約

- 単一の生成モデル、単一のreasoning effortで、各条件・各ケース1回実行した評価である
- 採点は`gpt-5.6-sol`の別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差は今回の38ケース内の差であり、あらゆる日本語文章タスクへ一般化できない
