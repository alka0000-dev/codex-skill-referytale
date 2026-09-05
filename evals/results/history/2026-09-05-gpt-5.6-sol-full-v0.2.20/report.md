# ReferyTale 全件比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T07:43:53.943Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.20`
- 対象ケース: 38件
- 実行回数: 各条件・各ケース1回、計76出力
- 対象Git状態: `2b272351f94895689945ecd993c9d04ca5ca6a4d`（クリーン）
- Skill SHA-256: `b4a2ead71bc2de34b39905db73cfa34912087b232a4815a6369f1e9df06e38c9`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 18/38 (47.37%)、生成エラー0件、未生成0件、未採点0件
- Skillあり: 37/38 (97.37%)、生成エラー0件、未生成0件、未採点0件
- 合格率差: +50.00ポイント
- ケース比較: 改善19、同等19、悪化0、比較不能0

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
| p12-persona-structure-overrides-generic | composition | F1, P1, Q2, M1 | 1/1 | 1/1 | same |
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
| p26-negated-expectation-needs-source | write | F1, M1, Q2 | 1/1 | 1/1 | same |
| p27-negated-trait-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p28-reader-scope-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p29-unspecified-plan-stays-unspecified | write | F1, M1 | 1/1 | 1/1 | same |
| p30-one-sided-material-stays-one-sided | write | F1, V1, M1, Q2 | 0/1 | 1/1 | improved |
| p31-diagnostic-needs-material | diagnostic | D1, F2 | 0/1 | 1/1 | improved |
| p32-preserve-distinct-repeated-items | rewrite | Q1, F1, M1 | 1/1 | 1/1 | same |
| p33-diagnostic-partial-material | diagnostic | D1, F2 | 0/1 | 1/1 | improved |
| p34-persona-ending-keeps-core-event | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |
| p35-persona-temperature-without-unsupported-evaluation | composition | F1, P1, Q2, M1 | 0/1 | 0/1 | same |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 6/20 (30.00%) | 20/20 (100.00%) |
| F2 — Uncertainty | 4/4 (100.00%) | 4/4 (100.00%) |
| V1 — Vocabulary provenance | 11/11 (100.00%) | 11/11 (100.00%) |
| V2 — User term retention | 2/2 (100.00%) | 2/2 (100.00%) |
| P1 — Skill composition | 5/8 (62.50%) | 8/8 (100.00%) |
| Q1 — Naturalness | 3/3 (100.00%) | 3/3 (100.00%) |
| Q2 — No over-structuring | 7/12 (58.33%) | 11/12 (91.67%) |
| M1 — Meaning preservation | 12/28 (42.86%) | 28/28 (100.00%) |
| A1 — Temporary artifact handling | 1/1 (100.00%) | 1/1 (100.00%) |
| N1 — Out-of-scope non-interference | 3/3 (100.00%) | 3/3 (100.00%) |
| D1 — Diagnostic evidence | 0/2 (0.00%) | 2/2 (100.00%) |

## 不合格の内訳

- p02-no-unsolicited-coinage — Skillなし run 1: 素材にない期待・具体的行動・事実・助言が追加されている。（F1: メール返信・資料修正・別の指示という具体的作業、AIが作業時間を短くしたという事実、時間を守るという助言を素材外から追加している。 / M1: 元の因果関係は含むが、「仕事が楽になるどころか」という事前期待や具体的行動、効率化への助言を加え、原素材の意味範囲を拡張している。）
- p03-no-invented-scene — Skillなし run 1: 材料外の内容を大幅に追加し、個人の経験を一般論へ広げている。（F1: 評価を取り戻せないという懸念、落ち込み、仕事への不適性の疑い、質問・メモ等の助言など、材料にない事実・感情・助言・一般論を多数追加している。 / M1: 個人の限定的な経験と「かもしれない」という材料を、「社会人人生は終わらない」「一度の失敗ですべてが決まらない」などの一般命題へ拡張し、依頼されていないタイトルも付けている。）
- p08-explicit-naming-request — Skillなし run 1: 新語の提案自体は適切だが、3案すべてについて元の時間関係と空き時間が消える原因を保持する要件を満たしていない。（M1: 第2案は「AIが生んだ隙間」としてAIの思考中という時間関係を曖昧にし、第3案は別の仕事を入れる主体的な動作を示していないため、各案が単独で元の具体内容を十分に保持していない。）
- p09-do-not-universalize-personal-story — Skillなし run 1: 中心仮説の不確実性とユーザー由来の表現は保つ一方、素材にない個人的事実、原因分析、判断軸、助言的な結論を大量に追加している。（Q2: 元の本人観察を、未知への関心、完走以外の作品価値、熱がある間に続ける工夫など、素材にない複数の判断軸や教訓へ展開している。 / M1: 飽きていない、作品をかなり楽しんでいる、数日離れた、過去に自分を責めていた、途中の作品から一節や街・音楽が残ったなど、多数の未提示の経験・感情・原因を加え、原素材の範囲を大きく変えている。）
- p13-no-over-structuring-personal-essay — Skillなし run 1: 流れは維持しているものの、材料にない評価や態度を付加して意味の範囲を変えている。（M1: 三つの出来事の順序は保っているが、「当然」「それでも」「懲りずに」「立派な」によって、原文にない因果的評価や語り手の態度を加えている。）
- p14-break-repetitive-template — Skillなし run 1: 自然さは改善されているが、四つの内容のうち「出社がつらい」を独立して保持せず、「準備」の意味も具体化している。（F1: 独立していた「準備」を「出社の準備」と具体化しており、素材にない関係を追加している。 / M1: 「出社がつらい」と「準備がつらい」を「出社の準備がつらい」へ統合し、二つの独立した内容を保持していない。）
- p16-no-invented-emotion — Skillなし run 1: 提示事実の範囲を越える内容があり、F1を満たしていない。（F1: 材料にない、方向性の違いが「次第に明確になった」という経過、「それぞれの道を歩む」という描写、経験から「学び」を得たという主張を追加している。）
- p18-provenance-table-mode — Skillなし run 1: 資料にない行動を本文へ追加しているためF1を満たさない。（F1: 「違いを手がかりに、それぞれの日の過ごし方を見つめています」という、資料にない本人の継続的な行動を追加している。）
- p19-verified-secondary-source-is-allowed — Skillなし run 1: 数値は維持されているものの、資料への帰属と母集団の表現が保持されていない。（F1: 確認済み報告書の記載として帰属させずに直接的な調査結果として述べ、さらに「回答者」を「利用者」全体へ広げている。 / M1: 数値自体は保っているが、二次資料への帰属が失われ、「回答者の62％」を「半数を超える利用者」と言い換えて対象範囲を広げている。）
- p22-persona-style-without-invented-scene — Skillなし run 1: 人物Skillの一部は反映されているが、素材にない出来事や評価を多数追加している。（F1: 「知らない街の交差点」「何度も見直し」「地図アプリまで疑った」「受付が見えた」など、メモにない場所、行動、経過を追加している。 / P1: 一人称や自虐的な調子は反映しているが、「幸先がいい」という評価文や素材外の長い経過描写を足しており、指定された構成要件を満たしていない。 / M1: 元の二事実は残っているものの、具体的な経路や地図アプリへの疑念、受付を見つけた経過、間に合ったかという評価を加えて意味の範囲を変えている。）
- p23-draft-is-not-a-source — Skillなし run 1: 核となる出来事は保持しているが、乾いたユーモアのために素材外の事実や評価を追加している。（F1: 「誰も騒がなかった」「私も華麗に対処していない」「一枚だけ出番を失ったスライドが残った」という、メモで確認できない事実や評価を追加している。 / P1: 乾いたユーモアを、素材外の否定命題や「出番を失った」という評価の追加によって実現しており、素材外の意味を足さないという適用条件を満たしていない。 / M1: 3ページ目を飛ばして終了後に気づいた流れは保つ一方、材料にない周囲の反応、対応の評価、スライドの状態を加えている。）
- p24-naming-preserves-sequence — Skillなし run 1: 3案すべての説明が、指定された時間関係と変更の積み上がりを単独で保持してはいない。（M1: 「先行修正スタック」は返答を待つ間という関係が不明確で、「未読差分連鎖」は次の修正を始めるという動作と時間関係を単独では保持していない。）
- p25-sparse-material-does-not-create-backstory — Skillなし run 1: 素材にない事前の予定と程度の強調を追加し、元の意味と強度を変えている。（F1: 「復習だけをするつもり」「ほんの少しの予定」という具体的な事前期待と、「大きく」という程度評価を素材外から追加している。 / M1: 単に予定より長く使ったという内容を、「ほんの少し」の予定から「大きく」延びたという、より具体的で強い内容へ変えている。）
- p27-negated-trait-needs-source — Skillなし run 1: 原素材にない状況、感情、経緯、意味づけを複数追加している。（F1: 「夜」「ようやく」「最後の一行」「安堵と達成感」「試行錯誤」など、メモにない時刻・進行状況・感情・経緯を追加している。 / M1: 資料を前日に完成させたという事実だけでなく、未提示の感情や試行錯誤の意味まで内容として加えている。 / Q2: 出来事を「試行錯誤にも大切な意味があった」という未提示の振り返り・教訓へ展開している。）
- p28-reader-scope-needs-source — Skillなし run 1: 素材外の感情・因果・一般的教訓を追加している。（F1: 「少し悔しかった」という感情、悔しさを理由に次回提案したという因果、自信につながるという結果を追加している。 / M1: 単に翌週一つ提案したという経験を、悔しさに基づく行動と自信への効果として具体化しており、元の意味範囲を保っていない。 / Q2: 本人の二つの出来事を「小さな一歩でも、行動すれば自信につながる」という一般的な教訓へ変えている。）
- p30-one-sided-material-stays-one-sided — Skillなし run 1: F1、M1、Q2を満たしていない。（F1: 材料にない「部屋はすっきりする」という利点を追加し、さらに中身と置き場所の見直しを助言している。 / M1: 確認する箱が増えるという元の因果は残しているが、材料にない利点との対比や整理方法の教訓・助言へ主旨を変えている。 / Q2: 与えられた内容を「収納は多さより所在の分かりやすさが大切」という一般的教訓に変え、行動助言まで追加している。）
- p31-diagnostic-needs-material — Skillなし run 1: 材料不足には気づいているが、指定された4軸ごとの判定不能と必要材料の提示を行っていない。（D1: 必要な4軸をそれぞれ判定不能として必要材料を示さず、別の評価軸を新設して将来の採点と改善案を案内している。）
- p33-diagnostic-partial-material — Skillなし run 1: 材料不足の扱いは適切だが、要求された4軸のうちVocabulary Provenanceの診断が欠けている。（D1: Source Fidelity相当とVoice Fidelity相当は扱っているが、指定されたVocabulary Provenanceを対象文と提示語彙の照合によって判定しておらず、代わりに「構成・流れ」「明瞭性」を独立軸としている。）
- p34-persona-ending-keeps-core-event — Skillなし run 1: 材料にない再送を追加したため、事実限定の人物Skillと意味保持の要件を満たさない。（F1: 材料にない「ファイルを添えてもう一度メールを送った」という後続行動を追加している。 / P1: 人物Skillが求める「材料にある事実だけで終える」という具体ルールに反し、再送という結果を作っている。 / M1: 添付忘れと送信後の自己認識は保っているが、原素材にない再送まで事実として加え、内容を変えている。）
- p35-persona-temperature-without-unsupported-evaluation — Skillなし run 1: 人物Skillの一部は守るものの、禁止された素材外の状況・評価・感情を大量に追加している。（F1: 会議5分前の待機、誰も来ない状況、URLを疑ったこと、カメラを切ったこと、腹立ちなど、材料にない行動・状況・感情を多数追加している。 / Q2: 出来事を述べた後に「時間感覚のほうだった」「早起きした優等生みたい」と素材にない評価や解釈を重ねている。 / M1: 開始時刻を1時間早く勘違いし予定表で気づいたという核は残るが、待機状況やURLの誤認、感情などを加えて失敗談の意味と範囲を変更している。）
- p35-persona-temperature-without-unsupported-evaluation — Skillあり run 1: 素材の意味は保っているが、出来事を述べた後に同じ内容を強調して反復している。（Q2: 二つの出来事を述べ終えた後、「開始前、しかも1時間前」と同じ出来事を強調して言い直しており、明示された禁止事項に該当する。）

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
