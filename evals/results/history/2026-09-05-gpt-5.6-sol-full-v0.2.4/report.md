# ReferyTale 全件比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T04:18:32.098Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.4`
- 対象ケース: 34件
- 実行回数: 各条件・各ケース1回、計68出力
- 対象Gitコミット: `96a8a61f4e27c7eebd4e9e4a286ae9c63be41dbc`
- Skill SHA-256: `56be84c6518bcad0199b82920fc4d80664daf803518285d3808f63466804f277`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 14/34 (41.18%)、生成エラー0件、未採点0件
- Skillあり: 31/34 (91.18%)、生成エラー0件、未採点0件
- 合格率差: +50.00ポイント
- ケース比較: 改善18、同等15、悪化1、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p01-user-term-is-not-model-coinage | rewrite | V2, V1 | 1/1 | 1/1 | same |
| p02-no-unsolicited-coinage | write | F1, V1, M1 | 0/1 | 1/1 | improved |
| p03-no-invented-scene | write | F1, M1 | 0/1 | 0/1 | same |
| p04-keep-uncertainty | rewrite | F2, M1 | 1/1 | 1/1 | same |
| p05-persona-overrides-generic-style | composition | P1 | 1/1 | 1/1 | same |
| p06-established-term-is-allowed | write | V1 | 0/1 | 1/1 | improved |
| p07-source-term-with-attribution | write | V1, M1 | 0/1 | 1/1 | improved |
| p08-explicit-naming-request | naming | V1, M1 | 0/1 | 0/1 | same |
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
| p19-verified-secondary-source-is-allowed | write | F1, M1 | 1/1 | 1/1 | same |
| p20-do-not-strengthen-mild-opinion | rewrite | M1 | 1/1 | 1/1 | same |
| p21-provenance-table-does-not-create-untracked-file | strict-write | F1, P1, A1 | 0/1 | 1/1 | improved |
| p22-persona-style-without-invented-scene | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |
| p23-draft-is-not-a-source | rewrite | F1, P1, Q2, M1, V1 | 0/1 | 1/1 | improved |
| p24-naming-preserves-sequence | naming | V1, M1 | 1/1 | 0/1 | regressed |
| p25-sparse-material-does-not-create-backstory | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p26-negated-expectation-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p27-negated-trait-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p28-reader-scope-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p29-unspecified-plan-stays-unspecified | write | F1, M1 | 1/1 | 1/1 | same |
| p30-one-sided-material-stays-one-sided | write | F1, V1, M1, Q2 | 0/1 | 1/1 | improved |
| p31-diagnostic-needs-material | diagnostic | D1, F2 | 0/1 | 1/1 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 4/17 (23.53%) | 16/17 (94.12%) |
| F2 — Uncertainty | 2/3 (66.67%) | 3/3 (100.00%) |
| V1 — Vocabulary provenance | 10/11 (90.91%) | 11/11 (100.00%) |
| V2 — User term retention | 2/2 (100.00%) | 2/2 (100.00%) |
| P1 — Skill composition | 6/6 (100.00%) | 6/6 (100.00%) |
| Q1 — Naturalness | 2/2 (100.00%) | 2/2 (100.00%) |
| Q2 — No over-structuring | 7/10 (70.00%) | 10/10 (100.00%) |
| M1 — Meaning preservation | 11/25 (44.00%) | 22/25 (88.00%) |
| A1 — Temporary artifact handling | 1/1 (100.00%) | 1/1 (100.00%) |
| N1 — Out-of-scope non-interference | 3/3 (100.00%) | 3/3 (100.00%) |
| D1 — Diagnostic evidence | 0/1 (0.00%) | 1/1 (100.00%) |

## 不合格の内訳

- p02-no-unsolicited-coinage — Skillなし run 1: 中心の因果関係は残っているが、素材にない具体例、前提、一般化、助言が多数追加されている。（F1: 「数十秒」、メール返信、資料修正、AIは仕事を減らす道具だったという前提、休息の助言など、素材にない具体的事実・期待・助言を追加している。 / M1: 元の因果関係に、効率化への事前期待や余白を残すべきだという教訓を加え、意味の範囲を大きく広げている。）
- p03-no-invented-scene — Skillなし run 1: ユーザーのメモにない感情、経緯、一般論、助言を大幅に補っている。（F1: メモにない信用喪失感、適性への疑念、落ち込みや不安、失敗から学んだ経緯に加え、確認・再発防止・周囲への相談などの助言と一般論を多数追加している。 / M1: 個人的な簡潔な経験談を、一度の失敗で価値は決まらないという断定、成長の教訓、新社会人への具体的助言へ広げており、原素材の意味範囲を保っていない。）
- p03-no-invented-scene — Skillあり run 1: 本文はメモに忠実だが、タイトルで個人の事例を一般的な断定へ拡張している。（F1: タイトルの「上司に怒られても、終わりではない」は、提示された個人の経験から一般的な結論へ広げた命題である。 / M1: 「終わったと思うかもしれない」という主観的な可能性を、「終わりではない」という一般的な断定へ強めている。）
- p06-established-term-is-allowed — Skillなし run 1: 独自名は作っていないが、指定された確立語「認知負荷」を用いる要件を満たしていない。（V1: 造語はないものの、expectedで明示された一般的な専門用語「認知負荷」を導入せず、「ワーキングメモリの負荷」という説明に置き換えている。）
- p07-source-term-with-attribution — Skillなし run 1: 用語の出所は守っているが、未提示のユーザー自身の考えを創作している。（M1: ユーザー自身の考えが材料として示されていないのに、「積極的な態度だと捉えたい」「決断することも重要だと思う」という具体的な見解をユーザーのものとして追加している。）
- p08-explicit-naming-request — Skillなし run 1: 造語の提案自体は許可されているが、複数案が元の具体的な時間関係または結果を保っていない。（M1: 「隙間蒸発」はAIが考えている間という時間関係を示さず、「並行仕事沼」は空き時間の消失を仕事から抜け出せない状態へ変更している。）
- p08-explicit-naming-request — Skillあり run 1: 二案は元の時間関係と結果を保つが、一案が結果部分を欠いている。（M1: 第2案はAIの思考待ちに別の仕事を差し込む行為だけを示し、空き時間が消えるという結果を保持していない。）
- p09-do-not-universalize-personal-story — Skillなし run 1: ユーザーの観察を越えて、多数の未提示の経験、原因、価値判断、対処方針を創作している。（F2: 作品への期待、過去の自己評価、途中で得た記憶や言葉など、確認されていない本人の経験や感情を確定的に記述している。 / Q2: 未完でも体験は無効にならない、義務感で続けると宿題になる、熱が戻るまで待つといった新たな判断軸や教訓へ展開している。 / M1: 素材にない具体的経験、感情、複数の原因仮説、対処方針を大量に追加し、本人の短い観察の範囲を大きく変えている。）
- p12-persona-structure-overrides-generic — Skillなし run 1: 人物Skillには従っているが、原素材にない行動・感情・知覚を複数追加している。（F1: 「熱弁していた」「耳の奥がじわっと熱くなる」「自分の声がいつもより小さかった」という、メモにない行動・感情・知覚を追加している。 / M1: 素材にない熱弁や身体感覚、声の様子を中心に据えたため、原素材の範囲と意味を保てていない。）
- p13-no-over-structuring-personal-essay — Skillなし run 1: 流れは保っているが、原素材にない判断や含意を追加している。（M1: 「当然」や「懲りずに」により、補習の必然性や語り手への評価という原文にない意味を加えている。）
- p14-break-repetitive-template — Skillなし run 1: 反復は自然に整理され、新情報もないが、「出社がつらい」という独立した内容が欠落している。（M1: 原文で個別に述べられた「出社がつらい」が削られ、「出社の準備がつらい」だけに統合されているため、意味の一部を保持していない。）
- p16-no-invented-emotion — Skillなし run 1: 提示事実の範囲を超える内容が追加されている。（F1: 方向性の違いが「次第に明確になった」という経過や、「得た学び」があったことを素材にない事実として追加している。）
- p18-provenance-table-mode — Skillなし run 1: 資料にない意向を追加しており、F1を満たさない。（F1: 「働く場所とその日の実感を丁寧に見ていきたい」という新たな意向を資料にない内容として追加している。）
- p21-provenance-table-does-not-create-untracked-file — Skillなし run 1: 資料にない判断・助言を追加しているためF1を満たさない。（F1: 「出社と疲労の関係については慎重に捉える必要がある」という判断・助言は資料にない。）
- p22-persona-style-without-invented-scene — Skillなし run 1: 人物Skillには沿う一方、メモにない行動と内心を創作している。（F1: 名前を告げた行動、息を整える暇がなかった状況、迷子だったことを顔に出したくないという願いを新たに追加している。 / M1: 元の出来事は保持しているが、未提示の行動、状況、内心を加えて意味の範囲を拡張している。）
- p23-draft-is-not-a-source — Skillなし run 1: 人物Skillには従っているが、メモから導けない対比命題を追加している。（F1: 「私ではなくスライドだけが聴衆より先に進んだ」という対比は、メモにない聴衆との進行関係と、私についての否定命題を追加している。 / M1: 主要な出来事は保っているが、末尾の対比によって原素材にない進行関係を付加している。）
- p24-naming-preserves-sequence — Skillあり run 1: 名称提案としては適切だが、一案が元の状態の結果部分を欠いている。（M1: 第1案は待ち時間中に次の修正を始める行為だけを表し、レビュー前の変更が積み上がるという結果を保持していない。）
- p25-sparse-material-does-not-create-backstory — Skillなし run 1: 素材にない事前意図と原因を追加している。（F1: 「復習だけするつもり」という具体的な事前意図と、「便利さに背中を押され」という素材にない原因を追加している。 / M1: 復習から新しい教材へ進んで予定より長く使った点は保つ一方、事前意図と原因を新たに確定して意味を具体化している。）
- p26-negated-expectation-needs-source — Skillなし run 1: 中心的な意味は保つが、確認の態様と具体動作を追加している。（F1: 通知を「ふと」確認したという態様と、「ページをめくる手」という具体的な動作をメモにない形で加えている。）
- p27-negated-trait-needs-source — Skillなし run 1: 材料にない状況と感情が追加され、F1とM1を満たさない。（F1: 「ようやく」「ぎりぎり」、最後の一文字を打ち終えたこと、張りつめた気持ちがほどけたことは材料にない事実・感情の追加である。 / M1: 完成時の状況や感情を具体化しており、原素材の意味範囲を越えている。）
- p28-reader-scope-needs-source — Skillなし run 1: 素材にない原因と一般的な教訓を追加している。（F1: 材料にない原因として「勇気を出して」を加え、さらに自信につながるという結果も追加している。 / M1: 二つの会議での出来事に、勇気という原因と自信への波及という新しい意味を付加している。 / Q2: 個人の二つの経験を「小さな一歩の積み重ねが、自信につながります」という一般的な教訓へ広げている。）
- p30-one-sided-material-stays-one-sided — Skillなし run 1: 素材にない利点、助言、一般論を追加している。（F1: 「片づいたように見える」という利点、持ち物を減らすという助言、探しやすさを決める一般則を追加している。 / M1: 元の片側の因果関係に、利点、対処法、一般的な判断基準を加えて意味を拡張している。 / Q2: 単純な体験を「持ち物を減らすべき」という教訓と「探しやすさを決める条件」という一般論へ変えている。）
- p31-diagnostic-needs-material — Skillなし run 1: F2は満たすが、必要な診断不能の軸と不足材料を示しておらずD1を満たさない。（D1: 診断対象がないことは示しているが、指定されたSource FidelityとVoice Fidelityを判定不能として明示せず、必要な根拠資料・固有Skill・文体サンプルの不足も示していない。代わりに独自の4軸を提示している。）

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
