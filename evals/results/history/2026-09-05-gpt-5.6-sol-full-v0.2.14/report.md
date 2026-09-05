# ReferyTale 全件比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T06:14:47.553Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.14`
- 対象ケース: 37件
- 実行回数: 各条件・各ケース1回、計74出力
- 対象Git状態: `8328fabd1f4c1b90487aea0a7e8a92d753472b91`（クリーン）
- Skill SHA-256: `2e8a8d665611e4f2cfb20a21a533d2d0b66638a5e1987e4a6d47aa4e63f56aaa`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 14/37 (37.84%)、生成エラー0件、未生成0件、未採点0件
- Skillあり: 35/37 (94.59%)、生成エラー0件、未生成0件、未採点0件
- 合格率差: +56.76ポイント
- ケース比較: 改善21、同等16、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p01-user-term-is-not-model-coinage | rewrite | V2, V1 | 1/1 | 1/1 | same |
| p02-no-unsolicited-coinage | write | F1, V1, M1 | 0/1 | 1/1 | improved |
| p03-no-invented-scene | write | F1, M1 | 0/1 | 1/1 | improved |
| p04-keep-uncertainty | rewrite | F2, M1 | 1/1 | 1/1 | same |
| p05-persona-overrides-generic-style | composition | P1 | 1/1 | 1/1 | same |
| p06-established-term-is-allowed | write | V1 | 0/1 | 0/1 | same |
| p07-source-term-with-attribution | write | V1, M1 | 0/1 | 1/1 | improved |
| p08-explicit-naming-request | naming | V1, M1 | 0/1 | 1/1 | improved |
| p09-do-not-universalize-personal-story | rewrite | F2, V1, Q2, M1 | 0/1 | 1/1 | improved |
| p10-naturalness-without-template | rewrite | Q1, F1, M1 | 0/1 | 1/1 | improved |
| n01-translation-only | negative-trigger | N1, M1 | 1/1 | 1/1 | same |
| n02-formatting-only | negative-trigger | N1, M1 | 1/1 | 1/1 | same |
| n03-code-only | negative-trigger | N1 | 1/1 | 1/1 | same |
| p11-user-term-retention-rewrite | rewrite | V2, M1 | 1/1 | 1/1 | same |
| p12-persona-structure-overrides-generic | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |
| p13-no-over-structuring-personal-essay | rewrite | Q2, M1 | 0/1 | 1/1 | improved |
| p14-break-repetitive-template | rewrite | Q1, F1, M1 | 0/1 | 1/1 | improved |
| p15-preserve-claim-strength | rewrite | M1 | 1/1 | 1/1 | same |
| p16-no-invented-emotion | write | F1 | 0/1 | 1/1 | improved |
| p17-creative-task-can-invent | write | V1 | 1/1 | 1/1 | same |
| p18-provenance-table-mode | strict-write | F1, V1, P1 | 0/1 | 1/1 | improved |
| p19-verified-secondary-source-is-allowed | write | F1, M1 | 0/1 | 1/1 | improved |
| p20-do-not-strengthen-mild-opinion | rewrite | M1 | 1/1 | 1/1 | same |
| p21-provenance-table-does-not-create-untracked-file | strict-write | F1, P1, A1 | 0/1 | 1/1 | improved |
| p22-persona-style-without-invented-scene | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |
| p23-draft-is-not-a-source | rewrite | F1, P1, Q2, M1, V1 | 1/1 | 1/1 | same |
| p24-naming-preserves-sequence | naming | V1, M1 | 0/1 | 1/1 | improved |
| p25-sparse-material-does-not-create-backstory | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p26-negated-expectation-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p27-negated-trait-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p28-reader-scope-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p29-unspecified-plan-stays-unspecified | write | F1, M1 | 1/1 | 1/1 | same |
| p30-one-sided-material-stays-one-sided | write | F1, V1, M1, Q2 | 0/1 | 1/1 | improved |
| p31-diagnostic-needs-material | diagnostic | D1, F2 | 0/1 | 0/1 | same |
| p32-preserve-distinct-repeated-items | rewrite | Q1, F1, M1 | 1/1 | 1/1 | same |
| p33-diagnostic-partial-material | diagnostic | D1, F2 | 0/1 | 1/1 | improved |
| p34-persona-ending-keeps-core-event | composition | F1, P1, Q2, M1 | 1/1 | 1/1 | same |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 4/19 (21.05%) | 19/19 (100.00%) |
| F2 — Uncertainty | 3/4 (75.00%) | 4/4 (100.00%) |
| V1 — Vocabulary provenance | 10/11 (90.91%) | 10/11 (90.91%) |
| V2 — User term retention | 2/2 (100.00%) | 2/2 (100.00%) |
| P1 — Skill composition | 6/7 (85.71%) | 7/7 (100.00%) |
| Q1 — Naturalness | 3/3 (100.00%) | 3/3 (100.00%) |
| Q2 — No over-structuring | 7/11 (63.64%) | 11/11 (100.00%) |
| M1 — Meaning preservation | 10/27 (37.04%) | 27/27 (100.00%) |
| A1 — Temporary artifact handling | 1/1 (100.00%) | 1/1 (100.00%) |
| N1 — Out-of-scope non-interference | 3/3 (100.00%) | 3/3 (100.00%) |
| D1 — Diagnostic evidence | 0/2 (0.00%) | 1/2 (50.00%) |

## 不合格の内訳

- p02-no-unsolicited-coinage — Skillなし run 1: 素材にない期待、出来事、一般化、助言を大幅に追加しており、F1とM1を満たさない。（F1: 「仕事は楽になると思っていた」という事前の期待、メール返信や資料操作、AIの出力確認後に元の作業へ戻る行動、以前の休憩の過ごし方、効率向上、改善助言など、素材にない多数の事実・行動・助言を追加している。 / M1: 素材の因果関係を超えて事前の期待、具体的な反復行動、後続行動、過去との比較、改善策を加え、元の内容の範囲を変えている。）
- p03-no-invented-scene — Skillなし run 1: 素材外の内容を大量に加え、個人の経験と不確実性を一般論・助言へ変えている。（F1: 信用喪失への不安、落ち込み、失敗から学んだ経緯、新人への助言、謝罪・報告・原因分析など、メモにない事実・感情・助言を大量に追加している。 / M1: 「終わったと思うかもしれない」という個人範囲の不確実な記述を、「社会人生活は終わらない」などの一般的な断定や教訓へ拡張している。依頼されていないタイトルも追加している。）
- p06-established-term-is-allowed — Skillなし run 1: 指定された確立済みの専門用語「認知負荷」を使用していない。（V1: 造語はしていないが、期待された一般的な専門用語「認知負荷」を導入せず、「ワーキングメモリの負荷」という説明に置き換えている。）
- p06-established-term-is-allowed — Skillあり run 1: 指定された確立済みの専門用語「認知負荷」を使用していない。（V1: 造語はしていないが、期待された一般的な専門用語「認知負荷」を導入せず、「ワーキングメモリへの負荷」という説明に置き換えている。）
- p07-source-term-with-attribution — Skillなし run 1: 表現の出典区分は適切だが、未提示の資料内容とユーザーの考えを具体的に作り足している。（M1: 資料の実際の説明もユーザー自身の考えも提示されていないのに、問いや迷いを抱える姿勢という定義や、積極的態度・判断への効果といった見解を創作している。）
- p08-explicit-naming-request — Skillなし run 1: 造語の提案自体は依頼どおりだが、三案目が元の状態と時間関係を正確に保持していない。（M1: 三案目は「AIで生まれたはずの余白」と説明しており、元の「AIが考えている間」という待ち時間を、AIが生み出したと想定される余白へ置き換えている。さらに、別の仕事を入れるという時間関係も説明から欠けている。）
- p09-do-not-universalize-personal-story — Skillなし run 1: 本人の仮説を具体的な仕組みや教訓へ拡張し、素材にない内容を多数加えている。（F2: 「消費期限があるのかもしれない」という仮説を、一定量の熱が生まれて少しずつ失われ、期限が来れば切れるという具体的な仕組みとして断定的に展開している。 / Q2: 個人の短い観察に、未完でも体験は偽物ではないという教訓や、間を空けないなどの対処法を追加している。 / M1: 難しさ・忙しさ・嫌悪・結末への恐怖を否定し、罪悪感、具体的な遊び方、読書時の行動、改善策など素材にない判断・感情・行動を多数追加している。）
- p10-naturalness-without-template — Skillなし run 1: 文章は自然になっているが、材料にない「現代社会」という限定を加えている。（F1: 原文にない「現代社会において」という評価の範囲を追加している。 / M1: 単に「AIは重要」という主張を「現代社会において重要」へ限定・具体化し、原文の意味範囲を変えている。）
- p12-persona-structure-overrides-generic — Skillなし run 1: 2文で本人の失敗として結んでいるものの、材料にない経過と結果を複数追加している。（F1: 「30秒ほど話し続けた」「画面の反応がおかしい」「ミュートを解除した」という、メモにない動作・状況・結果を追加している。 / P1: 普遍的な教訓にはしていないが、人物Skillが求める「材料にある事実」だけで終えず、材料外の具体的描写を加えている。 / M1: 元メモはマイクを入れ忘れて30秒後に本人が気づいたことまでだが、出力は話し続けたこと、気づいた契機、解除までを確定しており、出来事の内容と範囲を変えている。）
- p13-no-over-structuring-personal-essay — Skillなし run 1: 流れは読みやすく保たれているが、元文にない因果の強調と評価を持ち込んでいる。（M1: 出来事の順序は保っているが、「当然」によって補習が宿題を諦めた必然的結果だと強め、「懲りずに」によって書き手への評価を追加している。）
- p14-break-repetitive-template — Skillなし run 1: 反復は自然になったが、「準備」を出社の準備だと限定して原文の意味を変えている。（F1: 独立していた「準備」を「その準備」とし、出社の準備だという材料にない関係を追加している。 / M1: 「出社がつらい」と「準備がつらい」を「出社も、その準備もつらい」と結び付け、準備の意味を出社準備へ具体化している。）
- p16-no-invented-emotion — Skillなし run 1: 第1文は提示事実を保つが、第2文が材料にない記事の展開を確定的に加えている。（F1: 第2文で、記事が立ち上げから解散までの経緯を振り返るという未提示の記事内容・方針を追加している。）
- p18-provenance-table-mode — Skillなし run 1: 資料にない一般化と本人の認識を本文へ追加しており、F1を満たさない。（F1: 資料にない「働く場所によって日々の過ごし方が異なる」という一般化と、それを「見つめている」という本人の行動・認識を追加している。）
- p19-verified-secondary-source-is-allowed — Skillなし run 1: 確認済みの数値自体は使用しているが、回答者から利用者全体への一般化がある。（F1: 「回答者の62％」を「過半数の利用者」と言い換え、回答者以外を含む利用者全体へ範囲を広げている。 / M1: 資料が示す母集団は回答者だが、出力では利用者全体についての結論に変わっており、数値の帰属範囲が保たれていない。）
- p21-provenance-table-does-not-create-untracked-file — Skillなし run 1: 素材にない本人の意向を追加しており、F1を満たさない。（F1: 「日々の働き方を見つめていきたい」という本人の意向を、資料にない内容として追加している。）
- p22-persona-style-without-invented-scene — Skillなし run 1: 人物Skillの文体条件には沿う一方、メモにない具体的な出来事や状態を追加している。（F1: メモにない「知らない街」「ぐるぐる歩き」「ようやくたどり着いた」「息だけが誰よりも先に働き始めていた」という場所、経路、行動・状態を追加している。 / M1: 道に迷ったことと受付到着が開始5分前だったことは保持しているが、素材にない場所、経路、身体状態を具体化して原素材の範囲を変えている。）
- p24-naming-preserves-sequence — Skillなし run 1: 複数案の説明が、元の時間関係と結果をそれぞれ単独では保持していない。（M1: 第2案はレビュー返答を待つ間に次の修正を始める時間関係を示さず、第3案は「待つ間」を「レビューを待たずに」へ変え、変更をコミットへ具体化している。）
- p25-sparse-material-does-not-create-backstory — Skillなし run 1: 素材にない期待、評価、原因を加え、個人の出来事を一般的な考察へ広げている。（F1: 「少しだけのつもり」という未提示の事前期待に加え、「学びの楽しさ」「時間管理の難しさ」という評価と原因を追加している。 / M1: 元の出来事にない事前意図や原因解釈を加え、素材の意味と情報密度を変えている。 / Q2: 個別の出来事を、学びの楽しさと時間管理の難しさに関する一般的な考察へ変えている。）
- p26-negated-expectation-needs-source — Skillなし run 1: 通知確認という流れは保つが、材料にない物語と集中を持ち込み、読書停止の意味も変えている。（F1: メモにない「物語」や「集中」という具体的な対象・状態を追加している。 / M1: 「読書が止まった」を「物語への集中が途切れた」に置き換えており、行動の停止から集中状態の変化へ意味を変えている。）
- p27-negated-trait-needs-source — Skillなし run 1: 中心となる出来事は残っているが、材料にない具体的描写と感情・後悔を追加している。（F1: 「夜」「最後の一文」「肩の力が抜ける」「もっと早く始めていればという後悔」など、材料にない状況、感情、意図を追加している。 / M1: 資料を期限前日に完成させた事実に、未提示の安堵や後悔を付加し、原素材の意味の範囲を広げている。）
- p28-reader-scope-needs-source — Skillなし run 1: 素材にない原因・結果と教訓を追加しており、指定rubricをすべては満たさない。（F1: 素材にない「勇気を出して」という原因と、「次の自信につながる」という結果を追加している。 / M1: 二つの会議での出来事自体は保っているが、翌週の提案を素材にない勇気の結果として具体化し、さらに将来の自信への因果を付加している。 / Q2: 本人の二つの経験を「小さな一歩が、次の自信につながる」という一般的な教訓へ変えている。）
- p30-one-sided-material-stays-one-sided — Skillなし run 1: 原素材にない利点、一般論、助言を追加している。（F1: 「部屋はすっきりする」という利点、中身の分類やラベル付けを見直すという助言を材料なしに追加している。 / M1: 箱が増えると確認対象が増えて探し物に時間がかかるという核は残るが、資料にない利点と改善策を加え、片側だけだった原素材の意味範囲を変えている。 / Q2: 個別の内容を「収納では見つけやすさも大切」という一般的教訓へ変え、さらに改善行動へまとめている。）
- p31-diagnostic-needs-material — Skillなし run 1: 未確認事項の断定はないが、要求された4軸ごとの判定不能と必要材料の提示を満たしていない。（D1: 診断対象がないことは示しているが、4軸すべてを材料不足による判定不能として提示していない。また、Source Fidelity、Vocabulary Provenance、Voice Fidelity、Writing Qualityの各軸に必要な照合資料を個別に示さず、別の4軸へ置き換えている。）
- p31-diagnostic-needs-material — Skillあり run 1: 不確実性は適切に扱っているが、Voice Fidelityの判定に必要な材料の案内が不足している。（D1: 4軸すべてを材料不足としている点は適切だが、Voice Fidelityに必要な材料として固有Skillを示さず、文体サンプルだけを挙げているため、軸ごとの必要材料の提示が不完全である。）
- p33-diagnostic-partial-material — Skillなし run 1: 不確実性の扱いは適切だが、要求された診断軸ごとの判定になっていない。（D1: 指定されたSource Fidelity、Vocabulary Provenance、Voice Fidelity、Writing Qualityの4軸ではなく、「内容の忠実性・明瞭性・具体性・文体・自然さ」という別の4軸で表を構成している。Voice Fidelityの材料不足は末尾で示すものの、Vocabulary Provenanceを独立に判定していない。）

## 方法

各生成は別の一時作業フォルダと隔離`CODEX_HOME`で実行した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、fixtureの初期・最終内容、最終ファイル差分を別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

実行時の評価定義は[`evaluation.json`](./evaluation.json)、生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effortで、各条件・各ケース1回実行した評価である
- 採点は`gpt-5.6-sol`の別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差は今回の37ケース内の差であり、あらゆる日本語文章タスクへ一般化できない
