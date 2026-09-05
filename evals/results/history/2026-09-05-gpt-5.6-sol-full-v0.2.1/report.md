# ReferyTale 全件比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T02:45:20.056Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.1`
- 対象ケース: 30件
- 実行回数: 各条件・各ケース1回、計60出力
- 対象Gitコミット: `66500049aa5a4f7a0cf51d0508b1d11089179d0f`
- Skill SHA-256: `de1e126dac1a3aea9001ba7de9e78f0b8ef14b768f0a67297b30816157a3ffa1`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 16/30 (53.33%)、生成エラー0件
- Skillあり: 26/30 (86.67%)、生成エラー0件
- 合格率差: +33.33ポイント
- ケース比較: 改善10、同等20、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p01-user-term-is-not-model-coinage | rewrite | V2, V1 | 1/1 | 1/1 | same |
| p02-no-unsolicited-coinage | write | F1, V1, M1 | 0/1 | 0/1 | same |
| p03-no-invented-scene | write | F1, M1 | 0/1 | 0/1 | same |
| p04-keep-uncertainty | rewrite | F2, M1 | 1/1 | 1/1 | same |
| p05-persona-overrides-generic-style | composition | P1 | 1/1 | 1/1 | same |
| p06-established-term-is-allowed | write | V1 | 1/1 | 1/1 | same |
| p07-source-term-with-attribution | write | V1, M1 | 0/1 | 1/1 | improved |
| p08-explicit-naming-request | naming | V1, M1 | 1/1 | 1/1 | same |
| p09-do-not-universalize-personal-story | rewrite | F2, V1, Q2, M1 | 0/1 | 1/1 | improved |
| p10-naturalness-without-template | rewrite | Q1, F1, M1 | 0/1 | 1/1 | improved |
| n01-translation-only | negative-trigger | N1, M1 | 1/1 | 1/1 | same |
| n02-formatting-only | negative-trigger | N1, M1 | 1/1 | 1/1 | same |
| n03-code-only | negative-trigger | N1 | 1/1 | 1/1 | same |
| p11-user-term-retention-rewrite | rewrite | V2, M1 | 1/1 | 1/1 | same |
| p12-persona-structure-overrides-generic | composition | F1, P1, Q2, M1 | 0/1 | 0/1 | same |
| p13-no-over-structuring-personal-essay | rewrite | Q2, M1 | 1/1 | 1/1 | same |
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
| p24-naming-preserves-sequence | naming | V1, M1 | 1/1 | 1/1 | same |
| p25-sparse-material-does-not-create-backstory | write | F1, M1, Q2 | 0/1 | 0/1 | same |
| p26-negated-expectation-needs-source | write | F1, M1, Q2 | 1/1 | 1/1 | same |
| p27-negated-trait-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 3/14 (21.43%) | 11/14 (78.57%) |
| F2 — Uncertainty | 1/2 (50.00%) | 2/2 (100.00%) |
| V1 — Vocabulary provenance | 10/10 (100.00%) | 10/10 (100.00%) |
| V2 — User term retention | 2/2 (100.00%) | 2/2 (100.00%) |
| P1 — Skill composition | 5/6 (83.33%) | 6/6 (100.00%) |
| Q1 — Naturalness | 2/2 (100.00%) | 2/2 (100.00%) |
| Q2 — No over-structuring | 7/8 (87.50%) | 8/8 (100.00%) |
| M1 — Meaning preservation | 12/22 (54.55%) | 19/22 (86.36%) |
| A1 — Temporary artifact handling | 1/1 (100.00%) | 1/1 (100.00%) |
| N1 — Out-of-scope non-interference | 3/3 (100.00%) | 3/3 (100.00%) |

## 不合格の内訳

- p02-no-unsolicited-coinage — Skillなし run 1: 新しい概念名はないが、素材にない行動、一般論、効果、助言を大幅に追加している。（F1: メールを返す、資料を開く、回答後に二つの仕事を行き来する、画面から目を離すといった、素材にない具体的行動・後続行動・助言を追加している。さらに「効率は上がる」「長く働くため」といった未提示の効果や目的も加えている。 / M1: 元の因果関係は含むものの、個人の内容を「私たち」や「AI時代」へ一般化し、未提示の後続行動や助言まで展開しているため、原素材の範囲と意味を保っていない。）
- p02-no-unsolicited-coinage — Skillあり run 1: 明示的に禁止された後続行動を含め、素材外の内容を追加している。（F1: 「仕事は早く進む」という新しい評価と、返答後に元の仕事へ戻るという素材にない後続行動を追加している。 / M1: 素材の因果関係に、仕事が早く進むという効果と返答後の行動を付け足している。）
- p03-no-invented-scene — Skillなし run 1: メモの範囲を超える一般論、感情、助言を加えている。（F1: 落ち込んだ経験、新人にはできないことがあって当然という一般論、確認や相談、休息など、メモにない事実・助言を多数追加している。 / M1: 個人の限定的な経験を、新社会人一般への断定や失敗後の行動指針へ広げている。）
- p03-no-invented-scene — Skillあり run 1: 素材の経験は保っているが、そこから一般的な結論と新たな執筆意図を追加している。（F1: 「怒られたことや失敗したことだけで、すべてが終わるわけではない」という一般化された主張と、読者へ伝えたいという意図を素材外から追加している。）
- p07-source-term-with-attribution — Skillなし run 1: 用語の出典は保っているが、未提示の個人的見解を補っており、元の内容を忠実に維持していない。（M1: ユーザー自身の考えが提示されていないのに、「私はこの言葉を…と捉えた」以降の具体的な解釈や意見を創作して本人の考えとして書いている。）
- p09-do-not-universalize-personal-story — Skillなし run 1: ユーザー由来の中心表現は残しているが、未提示の体験・感情・原因・教訓・助言を大幅に追加している。（F2: 「何十時間も遊んだ」「夢中でページをめくった」「続きも気になる」など、未提示の状況や感情を確定的に追加している。 / Q2: 体験を、完走と好意の関係や未完了の価値についての教訓へ広げ、さらに行動上の工夫や助言へ展開している。 / M1: 素材にない感情、原因候補、価値判断、対処法を多数加え、本人の簡潔な観察を別の主張を含む記事へ変えている。）
- p10-naturalness-without-template — Skillなし run 1: 自然さは改善されているが、素材にない具体化と時間的含意が加わっている。（F1: 曖昧な「AIは速い」を「処理も速い」と具体化し、さらに素材にない時間的含意の「今や」を追加している。 / M1: 「速い」の意味を処理速度に限定し、「今や」によって原文にない時間的な含意を加えている。）
- p12-persona-structure-overrides-generic — Skillなし run 1: 結びの方針には沿うが、メモにない習慣、記憶、感情を創作している。（F1: 発表後にマイク表示を確認する習慣、無音で話す口元の記憶、頬が熱くなる感情・身体反応を追加している。 / M1: 元の出来事から必然ではない後続行動や感情を加え、材料の範囲を超えている。）
- p12-persona-structure-overrides-generic — Skillあり run 1: 人物Skillには沿っているが、マイクを入れ忘れたという中心的事実が結びだけでは判別できない。（M1: 「気づいた」対象が明示されず、重要な事実であるマイクの入れ忘れを省いたため、原素材の意味が十分に保持されていない。）
- p14-break-repetitive-template — Skillなし run 1: 自然化と内容非追加は満たすが、原文の意味を一部削除している。（M1: 「出社がつらい」という独立した内容が削られ、出社準備のつらさだけにまとめられている。）
- p16-no-invented-emotion — Skillなし run 1: 感情は追加していないが、人数と記事の展開について新しい事実を持ち込んでいる。（F1: 共同創業者が二人だったと限定する「二人の道」を追加し、さらに記事が創業から解散までの経緯を振り返るものだと、素材にない後続内容を確定している。）
- p18-provenance-table-mode — Skillなし run 1: 人物Skillには従っているが、資料にない在宅勤務日の仕事後の実感との差を追加している。（F1: 在宅勤務日の仕事後の実感は資料にないのに、「働く場所によって、仕事を終えたあとの実感に違いがある」と比較を確定している。）
- p21-provenance-table-does-not-create-untracked-file — Skillなし run 1: 副作用はないが、資料外の助言を本文に追加しており、事実限定の要件を満たさない。（F1: 「出社日の過ごし方や疲れ方を丁寧に見ていく必要がある」という、資料にあると確認できない助言を追加している。 / P1: 2資料の事実と文章規則だけで本文を書くという要件よりも、独自の調査・対応方針を優先して持ち込んでいる。）
- p22-persona-style-without-invented-scene — Skillなし run 1: 人物Skillには沿っているが、素材にない事実を複数追加している。（F1: メモにない「地図を見ていた」「目的地から遠ざかった」「息が切れていた」という事実を追加している。 / M1: 道に迷ったことと開始5分前に着いたことは保持しているが、素材にない行動や状態を具体化して意味を膨らませている。）
- p23-draft-is-not-a-source — Skillなし run 1: 人物表現には沿っているが、メモにない「誰も指摘しなかった」という事実を加えている。（F1: メモからは導けない「誰も指摘しなかった」という新しい事実を追加している。）
- p25-sparse-material-does-not-create-backstory — Skillなし run 1: 簡潔な導入ではあるが、明示されていない具体的な事前予定を加えている。（F1: 「復習だけをするつもり」「ほんの少しの予定だった」という具体的な事前の期待を素材外から追加している。 / M1: 単に予定より長く使ったという内容を、短時間かつ復習だけで終える予定だったという、より具体的な意味へ変更している。）
- p25-sparse-material-does-not-create-backstory — Skillあり run 1: 素材にない事前の期待を明示的に付け加えている。（F1: 「復習だけのつもりだった」という、素材にない具体的な事前の期待を追加している。 / M1: 予定より長く使ったという事実を、復習だけで終える意図があったという未提示の意味に具体化している。）
- p27-negated-trait-needs-source — Skillなし run 1: 材料にない具体的描写と感情を大幅に追加し、原素材の意味と強度を変えている。（F1: 「ようやく」、保存表示、張りつめていた気持ち、安堵、達成感など、メモにない状況や感情を追加している。 / M1: 単に期限前日に完成した出来事へ、遅れて完成した含意や強い感情的意味を付加している。）

## 方法

各生成は別の一時作業フォルダで実行した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、最終ファイル差分だけを別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effortで、各条件・各ケース1回実行した評価である
- 採点は生成と同じモデルの別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差は今回の30ケース内の差であり、あらゆる日本語文章タスクへ一般化できない
