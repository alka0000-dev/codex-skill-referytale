# ReferyTale 全件比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T04:39:36.805Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.6`
- 対象ケース: 34件
- 実行回数: 各条件・各ケース1回、計68出力
- 対象Gitコミット: `dd38620599ffc1241ca7778ca4252be69c004d5c`
- Skill SHA-256: `7b21821a09b1c6bb366db919c1d15dc13195c49df832a876fbb0c6a9bb606bab`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 15/34 (44.12%)、生成エラー0件、未採点0件
- Skillあり: 33/34 (97.06%)、生成エラー0件、未採点0件
- 合格率差: +52.94ポイント
- ケース比較: 改善18、同等16、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p01-user-term-is-not-model-coinage | rewrite | V2, V1 | 1/1 | 1/1 | same |
| p02-no-unsolicited-coinage | write | F1, V1, M1 | 0/1 | 1/1 | improved |
| p03-no-invented-scene | write | F1, M1 | 0/1 | 1/1 | improved |
| p04-keep-uncertainty | rewrite | F2, M1 | 1/1 | 1/1 | same |
| p05-persona-overrides-generic-style | composition | P1 | 1/1 | 1/1 | same |
| p06-established-term-is-allowed | write | V1 | 0/1 | 1/1 | improved |
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
| p14-break-repetitive-template | rewrite | Q1, F1, M1 | 0/1 | 0/1 | same |
| p15-preserve-claim-strength | rewrite | M1 | 1/1 | 1/1 | same |
| p16-no-invented-emotion | write | F1 | 0/1 | 1/1 | improved |
| p17-creative-task-can-invent | write | V1 | 1/1 | 1/1 | same |
| p18-provenance-table-mode | strict-write | F1, V1, P1 | 0/1 | 1/1 | improved |
| p19-verified-secondary-source-is-allowed | write | F1, M1 | 1/1 | 1/1 | same |
| p20-do-not-strengthen-mild-opinion | rewrite | M1 | 1/1 | 1/1 | same |
| p21-provenance-table-does-not-create-untracked-file | strict-write | F1, P1, A1 | 1/1 | 1/1 | same |
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

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 5/17 (29.41%) | 17/17 (100.00%) |
| F2 — Uncertainty | 2/3 (66.67%) | 3/3 (100.00%) |
| V1 — Vocabulary provenance | 10/11 (90.91%) | 11/11 (100.00%) |
| V2 — User term retention | 2/2 (100.00%) | 2/2 (100.00%) |
| P1 — Skill composition | 5/6 (83.33%) | 6/6 (100.00%) |
| Q1 — Naturalness | 2/2 (100.00%) | 2/2 (100.00%) |
| Q2 — No over-structuring | 7/10 (70.00%) | 10/10 (100.00%) |
| M1 — Meaning preservation | 11/25 (44.00%) | 24/25 (96.00%) |
| A1 — Temporary artifact handling | 1/1 (100.00%) | 1/1 (100.00%) |
| N1 — Out-of-scope non-interference | 3/3 (100.00%) | 3/3 (100.00%) |
| D1 — Diagnostic evidence | 0/1 (0.00%) | 1/1 (100.00%) |

## 不合格の内訳

- p02-no-unsolicited-coinage — Skillなし run 1: 新しい概念名はないが、素材にない期待、後続行動、結果、助言を大幅に追加している。（F1: 「仕事が楽になる」という事前の期待、回答後の確認、仕事の効率化、時間を空けておく技術の必要性など、素材にない事実・一般論・助言を追加している。 / M1: 提示された因果関係を越えて、回答後の行動や効率化という結果、一般的な教訓まで付加し、原素材の意味の範囲を変えている。）
- p03-no-invented-scene — Skillなし run 1: 素材にない一般論や助言を追加し、個人の経験の範囲を超えている。（F1: 依頼されていないタイトルを加えたほか、「社会人に向いていない」という思い、失敗への対処法、周囲に助けを求める助言、自己価値との区別など、メモにない主張・感情・助言を多数追加している。 / M1: 個人の限定的な経験を、「一度の失敗で人生は決まらない」「少しずつ覚えればよい」といった一般命題へ広げ、元の不確実性と対象範囲を変えている。）
- p06-established-term-is-allowed — Skillなし run 1: 造語禁止には従っているが、求められた一般的な専門用語「認知負荷」を使用していない。（V1: 独自造語はしていないものの、expectedで指定された確立済みの専門用語「認知負荷」を導入せず、「ワーキングメモリへの負荷」という別表現に置き換えている。）
- p08-explicit-naming-request — Skillなし run 1: 名称提案は許容されるが、3案すべてが元の時間関係と結果を単独で保持してはいない。（M1: 第2案は空き時間が消える結果を説明しておらず、第3案はAIの思考中という時間関係が明示されないうえ、「効率化のつもり」「休息や思考の余白」という未提示の意味を加えている。）
- p09-do-not-universalize-personal-story — Skillなし run 1: ユーザーの仮説的な観察を越えて、未提示の経験や理由、教訓を大幅に追加している。（F2: 素材では未確認の「かなり楽しんでいる」「夢中で読む」「最後まで読みたいと思っていた」などを確定した本人の経験として追加している。 / Q2: 元の観察を、途中でやめた時間を失敗にしなくてよいという教訓や、本人の「ものの好きになり方」という別の判断軸へ広げている。 / M1: 終わらせたくない可能性、作品から何かを受け取る過程、熱が後年戻ること、自己受容など、素材にない経験・解釈・結論を多数加えている。）
- p12-persona-structure-overrides-generic — Skillなし run 1: 結びの方針は守っているが、材料にない反応、感情、後続行動を大幅に追加している。（F1: 反応が薄いこと、笑い声、顔が熱くなった感情・身体反応、発表前にマイク表示を二度見する後続行動を新たに追加している。 / M1: 自分で気づいた経緯を「反応が薄い」と具体化し、参加者の笑い声やその後の習慣まで加えたため、元の材料の意味範囲を保っていない。）
- p13-no-over-structuring-personal-essay — Skillなし run 1: 順序は保っているが、原文にない因果の強調と評価を加えている。（M1: 「当然」により宿題を諦めたことと補習の因果・必然性を強め、「懲りずに」により原文にない話者の評価を追加している。）
- p14-break-repetitive-template — Skillなし run 1: 自然さは改善されているが、出社自体のつらさを省略して原素材の意味を完全には保っていない。（M1: 原文では「朝がつらい」「出社がつらい」「準備がつらい」が別々に示されているが、出力は「朝」と「出社の準備」だけにまとめ、出社自体がつらいという内容を落としている。）
- p14-break-repetitive-template — Skillあり run 1: 自然さは改善されているが、元の『出社がつらい』という独立した内容が保持されていない。（M1: 別々に述べられていた『出社がつらい』と『準備がつらい』を『出社の準備がつらい』へ統合し、出社自体のつらさを落としている。）
- p16-no-invented-emotion — Skillなし run 1: 提示事実の範囲を超える内容が導入に追加されている。（F1: 「短い挑戦」「何を学び」「別々の道を選んだ」といった、メモにない経験・結果・主体的選択を追加している。）
- p18-provenance-table-mode — Skillなし run 1: 資料外の行動を追加し、人物Skillの指定した導入順も守っていない。（F1: 「出社日と在宅勤務日の過ごし方を見つめています」という継続的な行動・姿勢は資料にない追加事実である。 / P1: 人物Skillは本人の実感から書き始めるよう指定しているが、冒頭は「週2回出社しています」という勤務頻度の説明から始まっている。）
- p22-persona-style-without-invented-scene — Skillなし run 1: 人物Skillの文体には沿う一方、メモにない複数の出来事や状態を創作している。（F1: メモにない地図の確認、見覚えのない交差点、スマホと建物を見比べる動作、息切れ、顔の様子を新しい事実として追加している。 / M1: 道に迷ったことと到着時刻は保持しているが、材料にない具体的な場所・動作・身体状態を加え、元の出来事の内容を膨らませている。）
- p23-draft-is-not-a-source — Skillなし run 1: 人物Skillの文体には従っているが、素材外の周囲の反応を追加したためF1とM1を満たさない。（F1: メモにない『誰も何も言わなかった』という周囲の反応を新たな事実として追加している。 / M1: 3ページ目を飛ばして終了後に気づいたという核は保つが、誰も指摘しなかったという未提示の状況を加えて意味を拡張している。）
- p24-naming-preserves-sequence — Skillなし run 1: 3案それぞれについて、元の時間関係と変更蓄積の結果を単独で示せていない。（M1: 名称だけで説明がなく、第1案は変更が積み上がる結果、第2案は返答待ちの間に次の修正を始める時間関係をそれぞれ単独では保持していない。第3案も「次の修正を始める」ことが明確でない。）
- p25-sparse-material-does-not-create-backstory — Skillなし run 1: 中心の流れは残るが、事前の期待を補い、時間超過の強度も変えている。（F1: 「復習だけするつもり」「ほんの少しの予定」という、材料にない具体的な事前の意図や期待を追加している。 / M1: 「予定より長く」を「大きく延びていた」と強めたうえ、短時間で終える予定だったという意味を追加している。）
- p27-negated-trait-needs-source — Skillなし run 1: 人物の感情や状況について、材料から必然的に導けない内容を追加している。（F1: 「ようやく」、安堵と達成感、画面を見つめる動作、締め切りに追われた時間、それを意味あるものと思う心情を新たに追加している。 / M1: 資料を前日に完成させたという出来事に、苦労して遅く完成した含意や具体的な感情・解釈を付加し、原素材の意味と強度を変えている。）
- p28-reader-scope-needs-source — Skillなし run 1: 個人の経験に素材外の原因を足し、一般的な成長の教訓へ変えている。（F1: 素材にない「勇気を出して」という原因・感情と、「行動することが成長につながる」という一般命題を追加している。 / M1: 本人が翌週に提案したという出来事へ、勇気や成長という原素材にない意味づけを加えている。 / Q2: 二つの会議における個人の経験を、「行動することが成長につながる」という一般的な教訓へ広げている。）
- p29-unspecified-plan-stays-unspecified — Skillなし run 1: 材料にない疲労と喜びを追加しており、F1とM1を満たさない。（F1: 素材にない疲労と、部屋が整うことへの喜びという感情・状況を追加している。 / M1: 元の出来事に未提示の感情を付加し、短い日記の内容を素材の範囲から拡張している。）
- p30-one-sided-material-stays-one-sided — Skillなし run 1: 材料にない利点・評価・助言を加え、片側の体験を一般論へ展開している。（F1: 材料にない「部屋は片づいたように見える」という利点、収納についての評価、持ち物を減らして置き場所を決めるという助言を追加している。 / Q2: 個別のメモを「見つけやすさが大切」という一般的な教訓と、行動を促す助言へ変えている。）
- p31-diagnostic-needs-material — Skillなし run 1: 診断材料不足に対するD1所定の応答を満たしていない。（D1: 診断対象の文章がないことには触れているが、Source FidelityとVoice Fidelityを判定不能と明示せず、根拠資料・固有Skill・文体サンプルなど不足している診断材料も示していない。さらに依頼された4軸とは異なる軸を独自に提示している。）

## 方法

各生成は別の一時作業フォルダと隔離`CODEX_HOME`で実行した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、fixtureの初期・最終内容、最終ファイル差分を別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

実行時の評価定義は[`evaluation.json`](./evaluation.json)、生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effortで、各条件・各ケース1回実行した評価である
- 採点は`gpt-5.6-sol`の別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差は今回の34ケース内の差であり、あらゆる日本語文章タスクへ一般化できない
