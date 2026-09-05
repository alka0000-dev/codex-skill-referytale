# ReferyTale 全件比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T03:17:24.197Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.3`
- 対象ケース: 33件
- 実行回数: 各条件・各ケース1回、計66出力
- 対象Gitコミット: `66500049aa5a4f7a0cf51d0508b1d11089179d0f`
- Skill SHA-256: `9bc6eb4f85d2698c30fa988cba994e87ed2f716f10df61d76d6f4ee9ba92a8f3`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 16/33 (48.48%)、生成エラー0件
- Skillあり: 33/33 (100.00%)、生成エラー0件
- 合格率差: +51.52ポイント
- ケース比較: 改善17、同等16、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p01-user-term-is-not-model-coinage | rewrite | V2, V1 | 1/1 | 1/1 | same |
| p02-no-unsolicited-coinage | write | F1, V1, M1 | 0/1 | 1/1 | improved |
| p03-no-invented-scene | write | F1, M1 | 0/1 | 1/1 | improved |
| p04-keep-uncertainty | rewrite | F2, M1 | 1/1 | 1/1 | same |
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
| p12-persona-structure-overrides-generic | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |
| p13-no-over-structuring-personal-essay | rewrite | Q2, M1 | 0/1 | 1/1 | improved |
| p14-break-repetitive-template | rewrite | Q1, F1, M1 | 0/1 | 1/1 | improved |
| p15-preserve-claim-strength | rewrite | M1 | 1/1 | 1/1 | same |
| p16-no-invented-emotion | write | F1 | 0/1 | 1/1 | improved |
| p17-creative-task-can-invent | write | V1 | 1/1 | 1/1 | same |
| p18-provenance-table-mode | strict-write | F1, V1, P1 | 1/1 | 1/1 | same |
| p19-verified-secondary-source-is-allowed | write | F1, M1 | 0/1 | 1/1 | improved |
| p20-do-not-strengthen-mild-opinion | rewrite | M1 | 1/1 | 1/1 | same |
| p21-provenance-table-does-not-create-untracked-file | strict-write | F1, P1, A1 | 1/1 | 1/1 | same |
| p22-persona-style-without-invented-scene | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |
| p23-draft-is-not-a-source | rewrite | F1, P1, Q2, M1, V1 | 0/1 | 1/1 | improved |
| p24-naming-preserves-sequence | naming | V1, M1 | 1/1 | 1/1 | same |
| p25-sparse-material-does-not-create-backstory | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p26-negated-expectation-needs-source | write | F1, M1, Q2 | 1/1 | 1/1 | same |
| p27-negated-trait-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p28-reader-scope-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p29-unspecified-plan-stays-unspecified | write | F1, M1 | 0/1 | 1/1 | improved |
| p30-one-sided-material-stays-one-sided | write | F1, V1, M1, Q2 | 0/1 | 1/1 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 5/17 (29.41%) | 17/17 (100.00%) |
| F2 — Uncertainty | 1/2 (50.00%) | 2/2 (100.00%) |
| V1 — Vocabulary provenance | 11/11 (100.00%) | 11/11 (100.00%) |
| V2 — User term retention | 2/2 (100.00%) | 2/2 (100.00%) |
| P1 — Skill composition | 6/6 (100.00%) | 6/6 (100.00%) |
| Q1 — Naturalness | 2/2 (100.00%) | 2/2 (100.00%) |
| Q2 — No over-structuring | 6/10 (60.00%) | 10/10 (100.00%) |
| M1 — Meaning preservation | 9/25 (36.00%) | 25/25 (100.00%) |
| A1 — Temporary artifact handling | 1/1 (100.00%) | 1/1 (100.00%) |
| N1 — Out-of-scope non-interference | 3/3 (100.00%) | 3/3 (100.00%) |

## 不合格の内訳

- p02-no-unsolicited-coinage — Skillなし run 1: 素材にない期待、行動、評価、助言が多数追加されている。（F1: AIで仕事が楽になるという事前の期待、メール返信や資料修正などの具体的行動、効率向上、助言を新たに追加している。 / M1: 提供された因果関係を越えて、事前の期待、具体例、一般化、対策まで内容を拡張している。）
- p03-no-invented-scene — Skillなし run 1: メモにある経験だけを使う条件に反し、新しい感情、助言、一般論を追加している。（F1: 「評価を取り戻せない」「自分自身もすべて否定されたように感じる」といった素材にない具体的感情や、確認・改善に関する助言、失敗後の一般論を多数追加している。 / M1: 元の経験談を保持してはいるが、素材にない助言や「一度の失敗ですべてが決まるわけではない」などの一般的結論へ大幅に拡張している。）
- p07-source-term-with-attribution — Skillなし run 1: V1は満たすが、資料に示されていない概念の定義や考えを追加しているためM1を満たさない。（M1: 入力では意味内容が示されていない「保留する力」について、曖昧さを抱えて考え続ける姿勢という定義を著者に帰属させ、さらに決断との関係や意義まで具体化しており、原素材を超えている。）
- p08-explicit-naming-request — Skillなし run 1: 造語の提案自体は適切だが、1案で入力にない「効率化で生まれた時間」という意味を持ち込んでいる。（M1: 「余白蒸発」の説明で、空き時間を「効率化で生まれたはず」とし、入力にない空き時間の由来を追加している。）
- p09-do-not-universalize-personal-story — Skillなし run 1: 本人の観察という範囲を越え、多数の未提示事実、原因候補、助言的方針、教訓を追加している。（F2: 「途中で飽きたわけではない」「かなり楽しんでいる」「結局戻らない」など、入力で確認されていない状態や経過を確定的に追加している。 / Q2: 個人の短い観察から、完走と体験価値に関する教訓や、作品との付き合い方・自己受容の方針へ大きく展開している。 / M1: 素材にない理由の候補、過去の自己評価、寄り道や中断、今後の行動方針、価値判断を追加し、元の観察以上の具体的な体験と結論へ変えている。）
- p12-persona-structure-overrides-generic — Skillなし run 1: F1とM1を満たしていない。（F1: 参加者が首をかしげる様子、ミュートの赤い印、それを現在も思い出すという反応を材料にない事実・実感として追加している。 / M1: 自分で気づいたという元の内容を、参加者の表情を見て気づいたという具体的な因果へ変更し、現在まで残る感覚も追加している。）
- p13-no-over-structuring-personal-essay — Skillなし run 1: 出来事の順序は保つが、原文にない評価と強調を追加している。（M1: 「当然」「懲りもせず」「立派な」によって、補習の必然性や話者への評価を原文より強く加えている。）
- p14-break-repetitive-template — Skillなし run 1: 自然さは改善されているが、原素材にある三つのつらさのうち「出社がつらい」が保持されていない。（M1: 「出社がつらい」と「準備がつらい」という別々の内容を「出社の準備がつらい」に統合し、出社そのものがつらいという意味を落としている。）
- p16-no-invented-emotion — Skillなし run 1: 提示事実自体は保っているが、未提示の記事内容を予告している。（F1: 「本記事では、設立から解散に至るまでの経緯を振り返る」と、材料にない記事全体の内容と進行を追加している。）
- p19-verified-secondary-source-is-allowed — Skillなし run 1: 回答者と利用者全体を同一視しており、指定rubricを満たしていない。（F1: 資料が示す対象は「回答者」だが、後半で「過半数の利用者」に継続意向があると母集団を広げている。 / M1: 回答者の62％という調査結果を利用者全体の過半数へ一般化し、数値が示す範囲を変えている。）
- p22-persona-style-without-invented-scene — Skillなし run 1: 人物Skillには従っているが、そのために材料にない経路上の出来事と身体状態を追加している。（F1: 地図を何度も見直したこと、同じ角を二度曲がったこと、息が切れていたことを新しく作っている。 / M1: 道に迷って開始5分前に受付へ着いたという核心は残す一方、未提示の経路上の行動や身体状態を加えて素材の意味範囲を広げている。）
- p23-draft-is-not-a-source — Skillなし run 1: 人物Skillの文体には沿うが、メモにない「誰も指摘しなかった」という事実を追加している。（F1: 「誰も指摘しなかった」という周囲の行動・結果を新たに追加している。 / M1: 中心となる二つの事実は保っているが、誰からも指摘されなかったという未提示の結果を加えて原素材の意味範囲を広げている。）
- p25-sparse-material-does-not-create-backstory — Skillなし run 1: 材料にない事前の予定と一般的な評価を追加している。（F1: 「復習だけをするつもり」「ほんの数分の予定」という未提示の事前意図を加え、さらに仕組みの魅力や時間管理の難しさという評価も追加している。 / M1: 予定より長く使ったという曖昧な内容を「ほんの数分の予定」へ具体化し、素材の意味と情報密度を変えている。 / Q2: 個別の出来事を、学習を促す仕組みの魅力と時間管理の難しさという一般的な論評へまとめている。）
- p27-negated-trait-needs-source — Skillなし run 1: 原素材にない行動と感情を大幅に補っている。（F1: 最後の一文を見届けたこと、保存ボタンを押したこと、緊張や安堵、道のりを振り返ったことを新たに作っている。 / M1: 「ようやく」や追加された行動・感情により、単に期限前日に完成したという素材へ未提示の切迫感や経緯を付加している。）
- p28-reader-scope-needs-source — Skillなし run 1: 素材にない心理、原因、結果を加え、個人の経験を教訓化している。（F1: 素材にない「勇気を出して」という原因・心理と、「自信につながりました」という結果・感情を追加している。 / M1: 翌週に提案したという事実を、勇気による行動と自信につながる一歩として具体化し、原素材以上の意味を持たせている。 / Q2: 二つの会議での個人的な出来事を「小さな一歩が、自信につながる」という教訓的な枠組みに変えている。）
- p29-unspecified-plan-stays-unspecified — Skillなし run 1: 材料にない疲労と喜びが追加されている。（F1: 材料にない疲労と、部屋が整うことへの喜びを追加している。 / M1: 予定より長引いて夕方に棚を組み立て終えたという素材に、未提示の感情と状況を付加し、意味の範囲を広げている。）
- p30-one-sided-material-stays-one-sided — Skillなし run 1: 材料にない利点と助言を加え、体験を一般的な収納論へ展開している。（F1: 部屋がすっきり見えるという未提示の利点と、持ち物を減らして置き場所を絞るという助言を追加している。 / M1: 収納箱の増加で確認対象が増えるという素材に、利点や改善策を足して片側の体験から意味を広げている。 / Q2: 個別の観察を「本当に使いやすい収納」のための一般的な教訓へ変えている。）

## 方法

各生成は別の一時作業フォルダで実行した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、最終ファイル差分だけを別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

実行時の評価定義は[`evaluation.json`](./evaluation.json)、生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effortで、各条件・各ケース1回実行した評価である
- 採点は生成と同じモデルの別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差は今回の33ケース内の差であり、あらゆる日本語文章タスクへ一般化できない
