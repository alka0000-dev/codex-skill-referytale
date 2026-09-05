# ReferyTale 全件比較評価 — gpt-5.6-sol

> **公開後訂正:** 内容の再確認により、Skillなしのp26を不合格へ訂正した。訂正後はSkillなし14/36、Skillあり36/36である。元の自動採点データは監査用に保持し、訂正内容は[`review-correction.json`](./review-correction.json)を正本とする。

- 実施日時: 2026-09-05T05:19:42.813Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.9`
- 対象ケース: 36件
- 実行回数: 各条件・各ケース1回、計72出力
- 対象Gitコミット: `a9855d76ff0cbd93d216cd7833e9bd4d6c0c5535`
- Skill SHA-256: `7981f6a256cf36fe1e33f9a317e3fd2c2a6d681ba912937261818af6c5ba94d6`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 14/36 (38.89%)、生成エラー0件、未採点0件
- Skillあり: 36/36 (100.00%)、生成エラー0件、未採点0件
- 合格率差: +61.11ポイント
- ケース比較: 改善22、同等14、悪化0、比較不能0

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
| p21-provenance-table-does-not-create-untracked-file | strict-write | F1, P1, A1 | 1/1 | 1/1 | same |
| p22-persona-style-without-invented-scene | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |
| p23-draft-is-not-a-source | rewrite | F1, P1, Q2, M1, V1 | 0/1 | 1/1 | improved |
| p24-naming-preserves-sequence | naming | V1, M1 | 0/1 | 1/1 | improved |
| p25-sparse-material-does-not-create-backstory | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p26-negated-expectation-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p27-negated-trait-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p28-reader-scope-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p29-unspecified-plan-stays-unspecified | write | F1, M1 | 1/1 | 1/1 | same |
| p30-one-sided-material-stays-one-sided | write | F1, V1, M1, Q2 | 0/1 | 1/1 | improved |
| p31-diagnostic-needs-material | diagnostic | D1, F2 | 0/1 | 1/1 | improved |
| p32-preserve-distinct-repeated-items | rewrite | Q1, F1, M1 | 1/1 | 1/1 | same |
| p33-diagnostic-partial-material | diagnostic | D1, F2 | 0/1 | 1/1 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 3/18 (16.67%) | 18/18 (100.00%) |
| F2 — Uncertainty | 2/4 (50.00%) | 4/4 (100.00%) |
| V1 — Vocabulary provenance | 9/11 (81.82%) | 11/11 (100.00%) |
| V2 — User term retention | 2/2 (100.00%) | 2/2 (100.00%) |
| P1 — Skill composition | 6/6 (100.00%) | 6/6 (100.00%) |
| Q1 — Naturalness | 3/3 (100.00%) | 3/3 (100.00%) |
| Q2 — No over-structuring | 6/10 (60.00%) | 10/10 (100.00%) |
| M1 — Meaning preservation | 9/26 (34.62%) | 26/26 (100.00%) |
| A1 — Temporary artifact handling | 1/1 (100.00%) | 1/1 (100.00%) |
| N1 — Out-of-scope non-interference | 3/3 (100.00%) | 3/3 (100.00%) |
| D1 — Diagnostic evidence | 0/2 (0.00%) | 2/2 (100.00%) |

## 不合格の内訳

- p26-negated-expectation-needs-source — Skillなし run 1（公開後訂正）: 電子書籍の読書について、素材にない「ふと」という自発性と「ページをめくる手」という具体的な動作を追加しているため、F1とM1を不合格へ訂正した。詳細は[`review-correction.json`](./review-correction.json)を参照する。
- p02-no-unsolicited-coinage — Skillなし run 1: 中心の因果関係は残っているものの、素材にない期待・行動・一般化・助言と新しい概念名が追加されている。（F1: 「仕事が楽になると思っていた」という事前の期待、メール返信や資料を開く行動、かつての待ち時間の過ごし方、待ち時間には何もしないという助言を素材外から追加している。 / V1: 記事名として求められていない「待ち時間の罠」という新しい概念的な呼称を導入している。 / M1: 元の因果関係は含むが、素材にない過去との対比、事前の期待、具体的行動、助言を加え、原素材の意味範囲を広げている。）
- p03-no-invented-scene — Skillなし run 1: 依頼されていないタイトルを加え、個人のメモを一般論や助言へ大幅に拡張している。（F1: 社会人に向いていないという感情、落ち込みや自信喪失、助言、価値と失敗の区別など、メモにない事実・感情・一般論・助言を多数追加している。 / M1: 「終わったと思うかもしれない」という限定的な内容を、タイトルや本文で「社会人人生は終わらない」などの一般命題へ広げ、原素材の範囲と強度を変えている。）
- p06-established-term-is-allowed — Skillなし run 1: 指定された確立語「認知負荷」を導入するというexpectedを満たしていない。（V1: 独自の造語は導入していないが、expectedで指定された一般的な確立語「認知負荷」を用いず、「ワーキングメモリ（作業記憶）の負荷」に置き換えている。）
- p08-explicit-naming-request — Skillなし run 1: M1を満たしていない。（M1: 名称だけで説明がなく、各案が「AIの思考中に別の仕事を入れる」という時間関係と「空き時間が消える」という結果の両方にどう対応するかを保てていると確認できない。）
- p09-do-not-universalize-personal-story — Skillなし run 1: 本人の限定的な観察を超え、多数の未提示の経験や原因、評価、教訓を確定的に追加している。（F2: 素材では示されていない、楽しんでいること、別の本を読み始めること、意志の弱さについて考えていたことなどを本人の確定した経験としている。 / Q2: 短い本人の観察を、熱中の仕組み、自己評価、作品との付き合い方、最終的な教訓へ大幅に展開している。 / M1: 素材にない感情、原因、反復行動、自己認識、判断軸を多数追加し、元の観察の範囲を変えている。）
- p10-naturalness-without-template — Skillなし run 1: 文章は自然になっているが、結論を原文以上に強めている。（F1: 元の「重要」を「今や欠かせない存在」へ強め、「今や」という時点に関する含意も追加している。 / M1: 「重要だと言える」から「欠かせない存在」へ主張の強度を上げており、原文の意味の強さを保っていない。）
- p12-persona-structure-overrides-generic — Skillなし run 1: 人物Skillの結び方には沿うものの、明示的に禁止された参加者の反応や謝罪などを創作している。（F1: 材料にない本人の発言、謝罪、参加者の笑い声、発表後も記憶が残っているという実感を追加している。 / M1: 30秒間マイクが無音だったという中心事実は残るが、謝罪や参加者の反応などを付加して出来事の内容を変えている。）
- p13-no-over-structuring-personal-essay — Skillなし run 1: Q2は満たすが、原文にない評価的な意味を加えているためM1を満たさない。（M1: 出来事の順序自体は保っているが、「当然」「懲りもせず」「立派な」により、原文にない評価や態度を加えて意味合いを変えている。）
- p14-break-repetitive-template — Skillなし run 1: 反復は改善したが、明示的に禁止された「その準備」という具体化により意味を変更している。（F1: 「準備」を「その準備」とし、出社の準備であると原文以上に具体化している。 / M1: 独立していた「出社がつらい」と「準備がつらい」を「出社も、その準備も」と結び付け、準備の意味を出社準備へ限定している。）
- p16-no-invented-emotion — Skillなし run 1: 提示事実の範囲を超える内容を導入している。（F1: 「立ち上げから解散に至るまでの経緯」と「そこから得た学び」を記事で振り返るという、メモにない記事内容や学びを追加している。）
- p18-provenance-table-mode — Skillなし run 1: 資料にない日々の実感を追加しており、F1を満たさない。（F1: 「働く場所によって一日の過ごし方が異なることを、日々実感しています」という実感と一般化を資料にない形で追加している。）
- p19-verified-secondary-source-is-allowed — Skillなし run 1: 回答者についての調査結果を利用者全体についての結果として言い換えている。（F1: 「回答者の62％」を「過半数の利用者」へ広げており、回答していない利用者も含む集団へ一般化している。 / M1: 確認済みの数値自体は保持しているが、対象を回答者から利用者全体へ変えているため、資料の意味を正確に保っていない。）
- p22-persona-style-without-invented-scene — Skillなし run 1: 人物Skillには従っているが、禁止された場所や経路を創作している。（F1: 材料にない「知らない街」「似たような角を何度か曲がった」という場所と経路を追加している。 / M1: 道に迷い開始5分前に着いたという事実は保持する一方、未提示の場所と具体的経路を加えて出来事を具体化しすぎている。）
- p23-draft-is-not-a-source — Skillなし run 1: 人物Skillの文体には沿うが、否定文を含めて素材外の命題、感情、後続行動を多数追加している。（F1: 否定形でも素材にない同僚の表情、ページを戻す行動、謝罪、上司の評価を持ち込み、さらに願望と次回の行動を追加している。 / Q2: 元の出来事にない「次回からページ番号を確認する」という教訓的な対応へ展開している。 / M1: 「誰にも気づかれなかった可能性」や本人の願望、今後の確認行動を加え、原素材の意味範囲を変えている。）
- p24-naming-preserves-sequence — Skillなし run 1: 命名自体は依頼どおりだが、三案すべての説明が単独で元の時間関係と動作を完全には保っていない。（M1: 第1案は待機中の積み上がりを保つが、第2案は返答を待つ間という時間関係を明示せず、第3案も「レビュー工程を追い越す」と抽象化しており、各案単独では元の主体・動作・時間関係を十分に保持していない。）
- p25-sparse-material-does-not-create-backstory — Skillなし run 1: 素材にない「ほんの少しの予定」を追加したため、情報の範囲と意味を保てていない。（F1: 「ほんの少しの予定だった」と、素材にない具体的な事前の期待を追加している。 / M1: 予定より長く使ったという曖昧な比較を、短時間で終える予定だったという意味に具体化している。）
- p27-negated-trait-needs-source — Skillなし run 1: 提出前日に完成したという範囲を越え、感情や疲労などの新しい情報を追加している。（F1: 材料にない安堵、疲れ、画面を閉じた動作を追加し、「ようやく」で遅延や苦労も含意している。 / M1: 資料完成という事実に、未提示の感情や身体感覚を結び付けて原素材の意味範囲を広げている。）
- p28-reader-scope-needs-source — Skillなし run 1: 指定されたすべてのrubricに違反している。（F1: メモにない原因として「勇気を出して」を加え、さらに「小さな一歩」「前に進んでいる」という評価も追加している。 / M1: 翌週に提案した事実を、勇気による行動および前進であると具体化し、原素材にない意味を付加している。 / Q2: 二つの会議での個人的な出来事を「小さな一歩でも、前に進んでいる」という教訓的な枠組みに変えている。）
- p30-one-sided-material-stays-one-sided — Skillなし run 1: 造語はないが、材料外の利点と助言を追加し、元の因果関係を変えて一般的な教訓へ広げている。（F1: 「部屋はすっきりする」という利点、持ち物を減らして置き場所を決めるという助言、整理の効果など、材料にない内容を追加している。 / M1: 箱が増えるほど確認対象が増えるという元の直接的な因果を、「どこに何を入れたか分からなければ」という別条件に置き換え、助言中心の内容へ変えている。 / Q2: 片側の短い体験的内容を「収納で大切なのは」と一般的な教訓に広げ、依頼されていない改善策へ展開している。）
- p31-diagnostic-needs-material — Skillなし run 1: 未確認事項の断定はないが、材料不足時に求められる4軸別の判定不能診断を完了していない。（D1: 対象文章がないことを踏まえて4軸すべてを判定不能とせず、指定された各軸に必要な照合材料も個別に示していない。さらに、診断軸を自然さ・個性・具体性・一貫性へ独自に置き換えている。）
- p33-diagnostic-partial-material — Skillなし run 1: Voice Fidelityの材料不足を示さず、問題なしと確定したためです。（D1: 固有Skillや文体サンプルがないためVoice Fidelityだけを判定不能とすべきところ、対象文の常体だけを根拠に「文体の一貫性：良好」と判定しており、軸に必要な材料不足を扱えていません。 / F2: 確認材料のないVoice Fidelity相当の評価を「良好」と確定しており、未確認事項を確定事項に変えています。）

## 方法

各生成は別の一時作業フォルダと隔離`CODEX_HOME`で実行した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、fixtureの初期・最終内容、最終ファイル差分を別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

実行時の評価定義は[`evaluation.json`](./evaluation.json)、生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effortで、各条件・各ケース1回実行した評価である
- 採点は`gpt-5.6-sol`の別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差は今回の36ケース内の差であり、あらゆる日本語文章タスクへ一般化できない
