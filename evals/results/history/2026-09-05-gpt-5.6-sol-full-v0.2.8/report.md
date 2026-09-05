# ReferyTale 全件比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T04:59:51.264Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.8`
- 対象ケース: 35件
- 実行回数: 各条件・各ケース1回、計70出力
- 対象Gitコミット: `4743a116fda816f957cadfef78f6eb465f4f7c84`
- Skill SHA-256: `a29e037a3f332eb787702176c8c9a7f738182c274edbf270f9e698f378fce2dd`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 16/35 (45.71%)、生成エラー0件、未採点0件
- Skillあり: 34/35 (97.14%)、生成エラー0件、未採点0件
- 合格率差: +51.43ポイント
- ケース比較: 改善18、同等17、悪化0、比較不能0

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
| p19-verified-secondary-source-is-allowed | write | F1, M1 | 1/1 | 1/1 | same |
| p20-do-not-strengthen-mild-opinion | rewrite | M1 | 1/1 | 1/1 | same |
| p21-provenance-table-does-not-create-untracked-file | strict-write | F1, P1, A1 | 1/1 | 1/1 | same |
| p22-persona-style-without-invented-scene | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |
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

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 5/18 (27.78%) | 18/18 (100.00%) |
| F2 — Uncertainty | 2/3 (66.67%) | 3/3 (100.00%) |
| V1 — Vocabulary provenance | 11/11 (100.00%) | 11/11 (100.00%) |
| V2 — User term retention | 2/2 (100.00%) | 2/2 (100.00%) |
| P1 — Skill composition | 6/6 (100.00%) | 6/6 (100.00%) |
| Q1 — Naturalness | 3/3 (100.00%) | 3/3 (100.00%) |
| Q2 — No over-structuring | 6/10 (60.00%) | 10/10 (100.00%) |
| M1 — Meaning preservation | 9/26 (34.62%) | 26/26 (100.00%) |
| A1 — Temporary artifact handling | 1/1 (100.00%) | 1/1 (100.00%) |
| N1 — Out-of-scope non-interference | 3/3 (100.00%) | 3/3 (100.00%) |
| D1 — Diagnostic evidence | 0/1 (0.00%) | 0/1 (0.00%) |

## 不合格の内訳

- p02-no-unsolicited-coinage — Skillなし run 1: 素材にない事実や助言を大幅に追加している。（F1: 「仕事が楽になるはずだった」という事前の期待、メールや資料修正などの具体的行動、処理量や心の状態、助言を追加している。 / M1: 元の因果関係を超えて、事前期待、具体例、一般化、助言まで意味を拡張している。）
- p03-no-invented-scene — Skillなし run 1: 素材にない内容を大幅に補い、個人の経験を一般的な助言へ変えている。（F1: 注意された際のショック、恥、周囲の評価、失敗後の振り返り、確認やメモなど、メモにない感情・原因・助言を多数追加している。 / M1: 個人の限定的な経験を、「一度の失敗で将来は決まらない」「少しずつ進めば大丈夫」などの一般命題へ広げ、依頼されていないタイトルも追加している。）
- p07-source-term-with-attribution — Skillなし run 1: 表現の出所は保っているが、未提示のユーザーの考えを創作している。（M1: ユーザー自身の考えが提示されていないのに、判断や即答に関する具体的な見解を本人の考えとして補っている。）
- p08-explicit-naming-request — Skillなし run 1: 名称の提案自体は許容されるが、各案と元の具体内容との対応が示されておらず、意味保持の要件を満たさない。（M1: 名称だけで各案の説明がなく、「思考待ち過密」や「余白蒸発シンドローム」が、AIが考えている間に別の仕事を入れるという時間関係と、その結果として空き時間が消える状態の両方を保つか単独では確認できない。）
- p09-do-not-universalize-personal-story — Skillなし run 1: 本人の観察を大幅に創作・解釈し、素材にない事実や教訓へ展開している。（F2: 素材にない過去の自己認識、作品終盤での感覚、棚やゲーム機の状態などを、本人についての確定的な事実として多数追加している。 / Q2: 限定的な体験から、完走と作品から何かを受け取ることの区別や、未完了は失敗ではないという教訓的な整理を新たに加えている。 / M1: ゲームと本を途中で止めるという観察を超え、理由、感情、過去の考え、他者との対比、将来の再開可能性まで補い、原素材の範囲を大きく変えている。）
- p12-persona-structure-overrides-generic — Skillなし run 1: 人物Skillには沿っているが、材料にない感情や後続の習慣を追加しており、F1とM1を満たさない。（F1: 「頬が熱くなる」という感情・身体反応や、「以来」マイク表示を見る習慣、無音の冒頭がよみがえるという経験を材料外から追加している。 / M1: マイクを入れ忘れて30秒後に気づいた事実から、継続的な記憶や感情、発表前の行動へ意味を拡張している。）
- p13-no-over-structuring-personal-essay — Skillなし run 1: 出来事の順序は保つものの、素材にない評価的なニュアンスを追加している。（M1: 「当然」「懲りずに」「立派な」により、原文にない評価や人物の態度を加えている。）
- p14-break-repetitive-template — Skillなし run 1: 自然ではあるが、出社と準備を統合して原文の意味を変えている。（F1: 独立していた「出社」と「準備」を「出社の準備」と結び付け、入力にない限定関係を導入している。 / M1: 「出社がつらい」と「準備がつらい」を「出社の準備がしんどい」へ統合し、二つの内容を独立して保持していない。）
- p16-no-invented-emotion — Skillなし run 1: 提示事実の範囲を越えて、学びが得られたことを付加している。（F1: 素材にない「そこから得た学び」と、それを振り返るという記事内容を追加している。）
- p22-persona-style-without-invented-scene — Skillなし run 1: 人物Skillの文体は満たすが、明示的に禁止された場所・経路や新しい出来事を補っているため、F1とM1を満たさない。（F1: 「知らない街の似たようなビルを何度も見上げた」「息が切れすぎていた」という、場所・経路や身体状態に関する材料外の出来事を追加している。 / M1: 道に迷い開始5分前に受付へ着いたという素材に、街やビルを巡った様子と息切れを加え、出来事を具体化している。）
- p23-draft-is-not-a-source — Skillなし run 1: 人物Skillには沿っているが、メモにない進行状況と評価を加えている。（F1: メモにない「発表中は滞りなく進行した」という事実と、3ページ目を「重要な一枚」とする評価を追加している。 / M1: 3ページ目を飛ばして終了後に気づいた点は保つが、発表が滞りなく進行したとの素材外の意味を加えている。）
- p24-naming-preserves-sequence — Skillなし run 1: 三案の命名自体は適切だが、必要な意味関係を示す個別説明が欠けている。（M1: 名称だけで各案の説明がなく、レビュー待ちの間に次の修正を始める時間関係と、レビュー前の変更が積み上がる結果を各案単独では保持できていない。）
- p25-sparse-material-does-not-create-backstory — Skillなし run 1: 事前の意図を創作し、個別の体験を学習ツール一般の性質へ拡張している。（F1: 素材にない「少しだけのつもり」という事前の意図と、学習ツールの一般的な作用を追加している。 / M1: 「ずっと長く」と程度を強めたうえ、素材にない事前意図や一般的因果へ意味を拡張している。 / Q2: 個人の出来事を、学習ツールが意欲や時間感覚に及ぼす一般論へ広げている。）
- p26-negated-expectation-needs-source — Skillなし run 1: 短い導入にはなっているが、素材にない「物語への没入」を持ち込んでいるため、F1とM1を満たさない。（F1: メモの「読書が止まった」を「物語への没入が途切れた」と具体化し、物語を読んでいたことと没入状態を追加している。 / M1: 単に読書が止まったという事実を、物語への没入が途切れたという別の具体的な心理状態へ変えている。）
- p27-negated-trait-needs-source — Skillなし run 1: F1とM1を満たしていない。（F1: 「夜」「張りつめていた気持ち」「小さな勝利」など、メモにない時刻、感情、評価を追加している。 / M1: 「ようやく」や「余裕のある完成とは言えない」により、単に期限前日に完成したという素材へ遅延・苦労の含意を加えている。）
- p28-reader-scope-needs-source — Skillなし run 1: 素材にない原因・感情的結果を加え、体験を教訓化している。（F1: 素材にない「勇気を出して」という原因と、自信につながったという心理的結果を追加している。 / M1: 単に提案した出来事を、勇気による行動と自信の獲得という意味に変えている。 / Q2: 二つの会議での個人的な出来事を「小さな一歩」という成長の教訓的な枠組みに変えている。）
- p29-unspecified-plan-stays-unspecified — Skillなし run 1: 明示されていない疲労と爽快感を追加している。（F1: 素材にない疲労と、部屋を見て気分がすっきりしたという感情を追加している。 / M1: 原素材にない感情や心理的結果を加え、意味の範囲を広げている。）
- p30-one-sided-material-stays-one-sided — Skillなし run 1: 素材の因果関係を超え、利点、一般論、助言を追加している。（F1: 部屋が片づいて見えるという利点、中身を減らす・置き場所を決めるという助言、暮らしへの効果を追加している。 / M1: 元の片側の体験に、利点との対比や改善策を加えて内容を拡張している。 / Q2: 個別のメモを「大切だ」「決めよう」という一般的な教訓と助言へ変えている。）
- p31-diagnostic-needs-material — Skillなし run 1: 診断材料がない場合に求められる判定不能の明示と必要材料の案内が不足している。（D1: 診断対象がない状態での判定不能を明示せず、Source Fidelity・Voice Fidelityを含む指定4軸や、不足している根拠資料・固有Skill・文体サンプルも示していない。）
- p31-diagnostic-needs-material — Skillあり run 1: D1を満たしていない。（D1: 診断対象がないことと必要な原文・根拠資料・文体サンプルは示しているが、Vocabulary Provenanceを含む4軸の診断に必要となる固有Skillの不足を示していない。）

## 方法

各生成は別の一時作業フォルダと隔離`CODEX_HOME`で実行した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、fixtureの初期・最終内容、最終ファイル差分を別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

実行時の評価定義は[`evaluation.json`](./evaluation.json)、生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effortで、各条件・各ケース1回実行した評価である
- 採点は`gpt-5.6-sol`の別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差は今回の35ケース内の差であり、あらゆる日本語文章タスクへ一般化できない
