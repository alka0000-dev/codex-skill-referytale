# ReferyTale 全件比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T02:24:06.386Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.0`
- 対象ケース: 28件
- 実行回数: 各条件・各ケース1回、計56出力
- 対象Gitコミット: `66500049aa5a4f7a0cf51d0508b1d11089179d0f`
- Skill SHA-256: `102ab9174c6c5cfaecdb52b429732b10d9bc85fa7db3aa4cbf656a71904a81b8`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 12/28 (42.86%)、生成エラー0件
- Skillあり: 25/28 (89.29%)、生成エラー0件
- 合格率差: +46.43ポイント
- ケース比較: 改善13、同等15、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p01-user-term-is-not-model-coinage | rewrite | V2, V1 | 1/1 | 1/1 | same |
| p02-no-unsolicited-coinage | write | F1, V1, M1 | 0/1 | 0/1 | same |
| p03-no-invented-scene | write | F1, M1 | 0/1 | 0/1 | same |
| p04-keep-uncertainty | rewrite | F2, M1 | 0/1 | 1/1 | improved |
| p05-persona-overrides-generic-style | composition | P1 | 1/1 | 1/1 | same |
| p06-established-term-is-allowed | write | V1 | 1/1 | 1/1 | same |
| p07-source-term-with-attribution | write | V1, M1 | 1/1 | 1/1 | same |
| p08-explicit-naming-request | naming | V1, M1 | 0/1 | 1/1 | improved |
| p09-do-not-universalize-personal-story | rewrite | F2, V1, Q2, M1 | 0/1 | 0/1 | same |
| p10-naturalness-without-template | rewrite | Q1, F1, M1 | 1/1 | 1/1 | same |
| n01-translation-only | negative-trigger | N1, M1 | 1/1 | 1/1 | same |
| n02-formatting-only | negative-trigger | N1, M1 | 1/1 | 1/1 | same |
| n03-code-only | negative-trigger | N1 | 1/1 | 1/1 | same |
| p11-user-term-retention-rewrite | rewrite | V2, M1 | 0/1 | 1/1 | improved |
| p12-persona-structure-overrides-generic | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |
| p13-no-over-structuring-personal-essay | rewrite | Q2, M1 | 0/1 | 1/1 | improved |
| p14-break-repetitive-template | rewrite | Q1, F1, M1 | 0/1 | 1/1 | improved |
| p15-preserve-claim-strength | rewrite | M1 | 1/1 | 1/1 | same |
| p16-no-invented-emotion | write | F1 | 0/1 | 1/1 | improved |
| p17-creative-task-can-invent | write | V1 | 1/1 | 1/1 | same |
| p18-provenance-table-mode | strict-write | F1, V1, P1 | 0/1 | 1/1 | improved |
| p19-verified-secondary-source-is-allowed | write | F1, M1 | 0/1 | 1/1 | improved |
| p20-do-not-strengthen-mild-opinion | rewrite | M1 | 1/1 | 1/1 | same |
| p21-provenance-table-does-not-create-untracked-file | strict-write | F1, P1, A1 | 1/1 | 1/1 | same |
| p22-persona-style-without-invented-scene | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |
| p23-draft-is-not-a-source | rewrite | F1, P1, Q2, M1, V1 | 0/1 | 1/1 | improved |
| p24-naming-preserves-sequence | naming | V1, M1 | 0/1 | 1/1 | improved |
| p25-sparse-material-does-not-create-backstory | write | F1, M1, Q2 | 0/1 | 1/1 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 3/12 (25.00%) | 10/12 (83.33%) |
| F2 — Uncertainty | 1/2 (50.00%) | 2/2 (100.00%) |
| V1 — Vocabulary provenance | 10/10 (100.00%) | 10/10 (100.00%) |
| V2 — User term retention | 2/2 (100.00%) | 2/2 (100.00%) |
| P1 — Skill composition | 6/6 (100.00%) | 6/6 (100.00%) |
| Q1 — Naturalness | 2/2 (100.00%) | 2/2 (100.00%) |
| Q2 — No over-structuring | 4/6 (66.67%) | 6/6 (100.00%) |
| M1 — Meaning preservation | 6/20 (30.00%) | 17/20 (85.00%) |
| A1 — Temporary artifact handling | 1/1 (100.00%) | 1/1 (100.00%) |
| N1 — Out-of-scope non-interference | 3/3 (100.00%) | 3/3 (100.00%) |

## 不合格の内訳

- p02-no-unsolicited-coinage — Skillなし run 1: 中心の因果関係は残るが、素材にない期待、出来事、助言を大幅に追加している。（F1: AIで仕事が楽になるという事前の期待、以前の休憩習慣、資料作成や調査の高速化、メール返信、コーヒーなど、素材にない事実や行動を追加している。 / M1: 元の因果関係を超えて具体的な過去の習慣や助言、一般的結論を加え、内容の範囲を変えている。）
- p02-no-unsolicited-coinage — Skillあり run 1: 中心の因果関係は含むが、明示的に禁止された後続行動を含む複数の新情報を追加している。（F1: 「仕事は早く進む」「回答が返ってきたら確認して、また次の指示を出す」「仕事が減らない」など、素材にない評価や後続行動を追加している。 / M1: 提供された因果関係に、回答後の確認と再指示などの反復過程や、仕事が減らないという未提示の状況を付加している。）
- p03-no-invented-scene — Skillなし run 1: メモにない経験、感情、助言、一般論が大量に追加されている。（F1: 信用喪失や適性への懸念、落ち込み、未熟さの痛感、仕事を覚えた経過、チェックリストなど、メモにない感情・事実・助言を多数追加している。 / M1: 限定的な個人メモを、失敗への対処法や成長に関する一般論へ大幅に拡張している。）
- p03-no-invented-scene — Skillあり run 1: 素材にない一般法則を追加し、個人の経験を一般化している。（F1: メモにない「一度の失敗ですべてが終わるわけではない」「その先は続いていく」という一般化された断定を追加している。 / M1: 個人の経験を、新人一般に当てはまる結論へ広げており、原素材の意味と強度を保っていない。）
- p04-keep-uncertainty — Skillなし run 1: 仮説性は保持しているが、曖昧だった対象を無断で具体化している。（M1: 原文の曖昧な「切り替え」を「作業の切り替え」と具体化しており、入力にない限定を加えている。）
- p08-explicit-naming-request — Skillなし run 1: 命名自体は許容されるが、1案で元の意味と結果が保たれていない。（M1: 「待機時間の二毛作」で、空き時間が消える結果を「一つの時間から二つの成果を得ようとする働き方」へ変更し、素材にない目的と成果を加えている。）
- p09-do-not-universalize-personal-story — Skillなし run 1: 本人の事例としては書かれているが、原文にない経験や原因を大幅に補い、不確実性も一部失っている。（F2: 冒頭の「消費期限があるのかもしれない」という仮説を、終盤で「たしかに消費期限がある」と確定的に述べている。 / Q2: 短い本人の観察を、熱の種類、義務感、終わりの回避、作品から受け取れる範囲などの多数の分類や教訓へ展開している。 / M1: 未提示の経験、感情、行動、原因を大量に加えたうえ、仮説だった「消費期限」を確定的な自己認識へ変えている。）
- p09-do-not-universalize-personal-story — Skillあり run 1: 個人的で不確かな観察としての枠組みは保つ一方、完遂能力について資料にない断定を足している。（M1: 「最後まで行けないわけではない」は、原文にない能力についての断定を追加している。）
- p11-user-term-retention-rewrite — Skillなし run 1: 比喩は保持したものの、文章を自然に整えるという依頼への成果物になっていない。（M1: 自然に整えた文章を提示せず、作業方針の説明と文章の貼り付け依頼に置き換えているため、依頼された書き換えを完了していない。）
- p12-persona-structure-overrides-generic — Skillなし run 1: 人物Skillの結び方には従っているが、素材にない感情やその後の習慣を創作している。（F1: 「耳の奥がじわっと熱くなる」という現在の感情・身体感覚や、発表前にマイクのアイコンを確認するようになったこと、記憶がよみがえることを新たに追加している。 / M1: マイクを入れ忘れて30秒後に気づいたという素材に、入力にない継続的な感情、習慣、回想を加えて意味を膨らませている。）
- p13-no-over-structuring-personal-essay — Skillなし run 1: 出来事の順序は保たれているが、原文にない評価的なニュアンスが加わっている。（M1: 「当然」「懲りずに」「立派な」により、原文にない評価や本人の態度を追加している。）
- p14-break-repetitive-template — Skillなし run 1: 自然さは改善されているが、原文にある「出社がつらい」という意味を削っている。（M1: 「出社がつらい」という独立した内容を「出社の準備がつらい」にまとめたため、出社そのもののつらさが失われている。）
- p16-no-invented-emotion — Skillなし run 1: 提示事実の範囲を超えて、得た学びがあることを補っている。（F1: 「そこで得た学びを紹介する」と、素材に示されていない学びの存在と記事内容を追加している。）
- p18-provenance-table-mode — Skillなし run 1: 人物Skillには従っているが、末尾に資料で裏付けられない本人の思考を加えている。（F1: 「自分に合った働き方について考えています」という、資料にない本人の思考を追加している。）
- p19-verified-secondary-source-is-allowed — Skillなし run 1: 確認済み数値は使っているものの、母集団と資料への帰属を正確に保っていない。（F1: 「回答者の62％」を「過半数の利用者」と言い換え、回答者以外を含み得る範囲へ事実を広げている。 / M1: 数値自体は保持しているが、母集団を回答者から利用者一般へ拡張し、報告書に基づく情報であるという帰属も明示していない。）
- p22-persona-style-without-invented-scene — Skillなし run 1: 人物Skillの文体には従っているが、メモにない具体的な行動を複数追加している。（F1: 地図を何度も見直したこと、同じ角を二度曲がったこと、間に合った顔をしたことを新たに作っている。 / M1: 道に迷い、受付到着が開始5分前だったという事実は保持しているが、そこへ未提示の具体的な経路上の行動を加えて体験内容を変えている。）
- p23-draft-is-not-a-source — Skillなし run 1: 人物表現は概ね守られているが、素材外の次回行動を追加している。（F1: メモにない「次回はページ番号を確認する」という新しい行動・助言を追加している。 / M1: 3ページ目を飛ばして終了後に気づいた流れは保つが、素材にない次回の対応を加えている。）
- p24-naming-preserves-sequence — Skillなし run 1: 命名自体は適切だが、提案の一つに元の状態説明にはない依存関係が加えられている。（M1: 「未レビューチェーン」の説明で、後続の修正が前の変更に依存するという原文にない関係を追加している。）
- p25-sparse-material-does-not-create-backstory — Skillなし run 1: 素材にない事前の期待と原因を加え、個人の体験を一般論へ拡張している。（F1: 「復習だけをするつもり」「ほんの数分の予定」「学びを促す仕組み」など、メモにない期待や原因を追加している。 / M1: 単に予定より長く使ったという内容を、数分で終える予定だったことやアプリの仕組みに導かれたことへ具体化している。 / Q2: 個人の出来事を、便利なアプリが「私たちの時間の使い方」に影響するという一般論へ広げている。）

## 方法

各生成は別の一時作業フォルダで実行した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、最終ファイル差分だけを別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effort、各条件1回を基本とする評価である
- 採点は生成と同じモデルの別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差はこの28ケース内の差であり、あらゆる日本語文章タスクへ一般化できない
