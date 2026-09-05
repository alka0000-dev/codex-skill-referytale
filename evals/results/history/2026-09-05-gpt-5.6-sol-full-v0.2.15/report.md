# ReferyTale 全件比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T06:30:54.335Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.15`
- 対象ケース: 37件
- 実行回数: 各条件・各ケース1回、計74出力
- 対象Git状態: `eb3a0bdcd3203f02e40918b1dd363d9aa080c7c4`（クリーン）
- Skill SHA-256: `2e8a8d665611e4f2cfb20a21a533d2d0b66638a5e1987e4a6d47aa4e63f56aaa`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 16/37 (43.24%)、生成エラー0件、未生成0件、未採点0件
- Skillあり: 36/37 (97.30%)、生成エラー0件、未生成0件、未採点0件
- 合格率差: +54.05ポイント
- ケース比較: 改善20、同等17、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p01-user-term-is-not-model-coinage | rewrite | V2, V1 | 1/1 | 1/1 | same |
| p02-no-unsolicited-coinage | write | F1, V1, M1 | 0/1 | 1/1 | improved |
| p03-no-invented-scene | write | F1, M1 | 0/1 | 1/1 | improved |
| p04-keep-uncertainty | rewrite | F2, M1 | 1/1 | 1/1 | same |
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
| p14-break-repetitive-template | rewrite | Q1, F1, M1 | 0/1 | 1/1 | improved |
| p15-preserve-claim-strength | rewrite | M1 | 1/1 | 1/1 | same |
| p16-no-invented-emotion | write | F1 | 0/1 | 1/1 | improved |
| p17-creative-task-can-invent | write | V1 | 1/1 | 1/1 | same |
| p18-provenance-table-mode | strict-write | F1, V1, P1 | 0/1 | 1/1 | improved |
| p19-verified-secondary-source-is-allowed | write | F1, M1 | 0/1 | 1/1 | improved |
| p20-do-not-strengthen-mild-opinion | rewrite | M1 | 1/1 | 1/1 | same |
| p21-provenance-table-does-not-create-untracked-file | strict-write | F1, P1, A1 | 0/1 | 1/1 | improved |
| p22-persona-style-without-invented-scene | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |
| p23-draft-is-not-a-source | rewrite | F1, P1, Q2, M1, V1 | 0/1 | 0/1 | same |
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

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 4/19 (21.05%) | 18/19 (94.74%) |
| F2 — Uncertainty | 3/4 (75.00%) | 4/4 (100.00%) |
| V1 — Vocabulary provenance | 11/11 (100.00%) | 11/11 (100.00%) |
| V2 — User term retention | 2/2 (100.00%) | 2/2 (100.00%) |
| P1 — Skill composition | 7/7 (100.00%) | 7/7 (100.00%) |
| Q1 — Naturalness | 3/3 (100.00%) | 3/3 (100.00%) |
| Q2 — No over-structuring | 7/11 (63.64%) | 11/11 (100.00%) |
| M1 — Meaning preservation | 11/27 (40.74%) | 26/27 (96.30%) |
| A1 — Temporary artifact handling | 1/1 (100.00%) | 1/1 (100.00%) |
| N1 — Out-of-scope non-interference | 3/3 (100.00%) | 3/3 (100.00%) |
| D1 — Diagnostic evidence | 0/2 (0.00%) | 2/2 (100.00%) |

## 不合格の内訳

- p02-no-unsolicited-coinage — Skillなし run 1: 提供された因果関係を越えて、素材にない期待、具体例、一般論、助言を追加している。（F1: 仕事が楽になるという事前の期待、数十秒という時間、メール返信や資料修正という具体的行動、成果の増加、休みなく動くこと、改善策など、素材にない事実や助言を多数追加している。 / M1: 元の因果関係は含むものの、事前の期待や具体的行動、一般論、改善策を付加して内容の範囲と意味を大きく広げている。）
- p03-no-invented-scene — Skillなし run 1: 材料にない内容を追加し、元の範囲と不確実性を保っていない。（F1: 「信用を失った」「社会人に向いていない」という思考、落ち込みや未熟さの自覚、振り返り方や今後の行動など、メモにない感情・主張・助言を多数追加している。 / M1: 個人の限定的な経験と「終わったと思うかもしれない」という不確実な内容を、「終わりではない」などの一般命題や教訓へ拡張している。）
- p08-explicit-naming-request — Skillなし run 1: 命名自体は許容範囲だが、3案すべてが元の具体的な時間関係と結果を忠実に維持してはいない。（M1: 第1案は「空き時間が消える」を「休めなくなる」に変え、第3案はAIが考えている間を「AIで生まれるはずだった余白」と捉え直しているため、各案単独で元の時間関係と結果を保てていない。）
- p09-do-not-universalize-personal-story — Skillなし run 1: ユーザー由来の表現は保持しているが、未確認事項の確定と、素材にない原因・事実・教訓の追加がある。（F2: 素材では未確認の「途中で飽きたわけではない」「かなり楽しんでいる」「作品がつまらなくなったわけでもない」などを確定している。 / Q2: 体験から、終わりを避ける心理や作品を大切にする方法、途中まで楽しんだ時間の価値といった新しい判断軸・教訓へ展開している。 / M1: ラスボス直前や読書8割で止めるという観察に、具体的な行動、感情、原因、再開経験、読みかけの本やセーブデータの状態など多数の未提示内容を加え、意味の範囲を変えている。）
- p12-persona-structure-overrides-generic — Skillなし run 1: 形式と人物Skillには従っているが、材料にない「話し続けた」という出来事を追加した。（F1: 素材はマイクを入れ忘れて30秒後に気づいたことだけだが、「30秒間話し続けた」という動作を追加している。 / M1: マイクを入れ忘れた状態で30秒間話し続けたと具体化し、原素材にない経過を意味へ加えている。）
- p13-no-over-structuring-personal-essay — Skillなし run 1: 三つの出来事の順序は保っているが、予期や評価を表す語を加えたため、意味を厳密には保持していない。（M1: 「案の定」は補習を予期していたことを、「懲りずに」「立派な」は本人への評価や計画の性質を新たに含ませており、原素材にない意味を追加している。）
- p14-break-repetitive-template — Skillなし run 1: 反復は解消しているが、出社と準備を統合して意味を変えている。（F1: 独立していた「出社」と「準備」を「出社の準備」と結び付け、準備の対象を新たに具体化している。 / M1: 「出社がつらい」と「準備がつらい」を統合したため、原文の四つの内容を個別に保持していない。）
- p16-no-invented-emotion — Skillなし run 1: 提示事実の範囲を超える記事内容を付け加えている。（F1: 「立ち上げから解散に至るまでの経緯を振り返る」「そこで得た学びを紹介する」という記事内容と学びの存在を、材料にないまま追加している。）
- p18-provenance-table-mode — Skillなし run 1: 資料にない今後の執筆意図を追加しており、F1を満たさない。（F1: 「働き方と疲れの関係を考えていきたい」という本人の意図を資料にない事実として追加している。）
- p19-verified-secondary-source-is-allowed — Skillなし run 1: 回答者と利用者を同一視し、資料が裏づける範囲を超えている。（F1: 資料が示す母集団は「回答者」だが、出力では「過半数の利用者」と言い換えて対象範囲を広げている。 / M1: 62％という数値は保っているものの、回答者についての結果を利用者全体についての結果として表現しており、数値の帰属範囲を変えている。）
- p21-provenance-table-does-not-create-untracked-file — Skillなし run 1: 副作用とSkill適用には問題がないが、資料にない判断を追加している。（F1: 「働き方を考える必要がありそうだ」という新たな判断・助言を資料にない内容として追加している。）
- p22-persona-style-without-invented-scene — Skillなし run 1: 人物Skillの表現規則には従っているが、素材にない場所、行動、内面を複数追加している。（F1: 「知らない街」「うろうろ」「地図を見るたびに現在地がずれる」「心の中ではもう一日ぶん働いた気がした」など、メモにない場所・経過・内面を追加している。 / M1: 道に迷い開始5分前に受付へ着いたという核は保持しているが、経路や内面を具体化して原素材以上の意味を加えている。）
- p23-draft-is-not-a-source — Skillなし run 1: 人物Skillへの適合と素材外部分の多くの削除はできているが、否定形で新しい事実を追加している。（F1: 「対応力は出番がないまま褒められもしなかった」という、褒められなかった事実を新たに追加している。否定形でも素材外の命題に当たる。 / M1: 3ページ目を飛ばして終了後に気づいた核心は保っているが、褒められなかったという未提示の結果を加えて意味を変更している。）
- p23-draft-is-not-a-source — Skillあり run 1: 人物Skillには沿っているが、素材にない「静かな失敗」という評価を追加しているため、Source fidelityとMeaning preservationを満たさない。（F1: 「ずいぶん静かな失敗だった」は、失敗が静かなものだったという素材にない評価・状況を追加している。 / M1: メモの主要事実は保持しているが、「静かな失敗」という新たな性質を付加し、原素材の意味の範囲を広げている。）
- p24-naming-preserves-sequence — Skillなし run 1: 第3案は概ね対応するが、第1案と第2案の説明だけでは元の動作・時間関係を完全に追えない。（M1: 第1案は待機中に次の修正を始める動作がなく、第2案はレビュー返答を待つ時間関係がないため、3案それぞれが単独で元の時間関係と結果を保つという要件を満たさない。）
- p25-sparse-material-does-not-create-backstory — Skillなし run 1: 素材にない事前意図と評価を加え、個別の体験を一般論へ変えている。（F1: 「復習だけするつもり」という事前の意図や、「便利な学びの道具」という評価、一般化された作用を材料外から追加している。 / M1: 個人の一回の出来事を「私たち」に一般化し、予定より長く使ったという事実を抽象的な表現へ変えている。 / Q2: 個人の体験を、学びの道具が予定を延ばすという一般論へ展開している。）
- p27-negated-trait-needs-source — Skillなし run 1: 核となる出来事は保っているが、材料にない経緯と感情を追加している。（F1: 材料にない「ようやく」、張りつめていた気持ち、深い安堵という経緯や感情を追加している。 / M1: 資料を期限前日に完成させたという事実に、苦労の末の完成や強い安堵という未提示の意味合いを加えている。）
- p28-reader-scope-needs-source — Skillなし run 1: 素材にない決意、感情、因果を追加し、本人の出来事を教訓的な成長物語へ広げている。（F1: 次の会議で提案すると決めたこと、勇気を出したこと、自信につながったことを新たに追加している。 / M1: 翌週に一つ提案したという事実を、事前の決意や勇気、自信という素材にない原因・結果を伴う成長物語へ変えている。 / Q2: 二つの会議での個別の出来事を「小さな一歩が自信につながる」という教訓的な枠組みにまとめている。）
- p29-unspecified-plan-stays-unspecified — Skillなし run 1: 中心事実は維持しているが、明示的に禁止された素材外の感情を追加している。（F1: 素材にない疲労と、部屋が整うことへの喜びを追加している。 / M1: 模様替えが予定より長引き夕方に棚を組み立て終えた点は保つ一方、未提示の感情と状況を加えて原素材の意味範囲を広げている。）
- p30-one-sided-material-stays-one-sided — Skillなし run 1: 素材にない利点、評価、助言を加え、元の因果関係を一般論へ展開している。（F1: 「部屋は片づいたように見える」という利点、「仕組みが大切」という評価、中身を減らして置き場所を決める助言を追加している。 / M1: 探し物に時間がかかるという結果を明示せず、片づいて見えるという素材にない対比や改善策へ意味を広げている。 / Q2: 個別の体験を収納の一般原則と行動助言へ変えている。）
- p31-diagnostic-needs-material — Skillなし run 1: 未確認事項の断定は避けているが、指定された4軸ごとの判定不能と必要材料の提示ができていない。（D1: 対象文がないことは指摘しているが、指定の4軸を判定不能として個別に示さず、Source Fidelity、Vocabulary Provenance、Voice Fidelityに必要な照合資料も説明していない。さらに別の4軸へ置き換えている。）
- p33-diagnostic-partial-material — Skillなし run 1: 未確認の文体再現性は適切に留保したが、指定された四軸のうち語彙来歴の診断が欠けている。（D1: 内容・構成・表現・文体という独自の区分で診断しており、指定されたVocabulary Provenanceの照合判定を明示していない。Voice Fidelityの材料不足は適切に示している。）

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
