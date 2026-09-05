# ReferyTale 全件比較評価 — gpt-5.6-sol

- 実施日時: 2026-09-05T02:58:19.500Z
- 生成モデル: `gpt-5.6-sol`
- 採点モデル: `gpt-5.6-sol`（条件名を伏せた別セッション）
- reasoning effort: `low`
- eval定義: `evals.json` version `0.2.2`
- 対象ケース: 32件
- 実行回数: 各条件・各ケース1回、計64出力
- 対象Gitコミット: `66500049aa5a4f7a0cf51d0508b1d11089179d0f`
- Skill SHA-256: `7a4b2a289088892ca267c7b66beb92399fb71a54ec187957313f916c149b0950`
- Codex CLI: `codex-cli 0.153.1`

## 結果

- Skillなし: 18/32 (56.25%)、生成エラー0件
- Skillあり: 29/32 (90.63%)、生成エラー0件
- 合格率差: +34.38ポイント
- ケース比較: 改善11、同等21、悪化0、比較不能0

| ケース | 種別 | rubric | Skillなし | Skillあり | 比較 |
|---|---|---|---:|---:|---|
| p01-user-term-is-not-model-coinage | rewrite | V2, V1 | 1/1 | 1/1 | same |
| p02-no-unsolicited-coinage | write | F1, V1, M1 | 0/1 | 0/1 | same |
| p03-no-invented-scene | write | F1, M1 | 0/1 | 1/1 | improved |
| p04-keep-uncertainty | rewrite | F2, M1 | 1/1 | 1/1 | same |
| p05-persona-overrides-generic-style | composition | P1 | 1/1 | 1/1 | same |
| p06-established-term-is-allowed | write | V1 | 1/1 | 1/1 | same |
| p07-source-term-with-attribution | write | V1, M1 | 1/1 | 1/1 | same |
| p08-explicit-naming-request | naming | V1, M1 | 1/1 | 1/1 | same |
| p09-do-not-universalize-personal-story | rewrite | F2, V1, Q2, M1 | 0/1 | 0/1 | same |
| p10-naturalness-without-template | rewrite | Q1, F1, M1 | 1/1 | 1/1 | same |
| n01-translation-only | negative-trigger | N1, M1 | 1/1 | 1/1 | same |
| n02-formatting-only | negative-trigger | N1, M1 | 1/1 | 1/1 | same |
| n03-code-only | negative-trigger | N1 | 1/1 | 1/1 | same |
| p11-user-term-retention-rewrite | rewrite | V2, M1 | 1/1 | 1/1 | same |
| p12-persona-structure-overrides-generic | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |
| p13-no-over-structuring-personal-essay | rewrite | Q2, M1 | 0/1 | 1/1 | improved |
| p14-break-repetitive-template | rewrite | Q1, F1, M1 | 1/1 | 1/1 | same |
| p15-preserve-claim-strength | rewrite | M1 | 1/1 | 1/1 | same |
| p16-no-invented-emotion | write | F1 | 0/1 | 1/1 | improved |
| p17-creative-task-can-invent | write | V1 | 1/1 | 1/1 | same |
| p18-provenance-table-mode | strict-write | F1, V1, P1 | 1/1 | 1/1 | same |
| p19-verified-secondary-source-is-allowed | write | F1, M1 | 0/1 | 0/1 | same |
| p20-do-not-strengthen-mild-opinion | rewrite | M1 | 1/1 | 1/1 | same |
| p21-provenance-table-does-not-create-untracked-file | strict-write | F1, P1, A1 | 0/1 | 1/1 | improved |
| p22-persona-style-without-invented-scene | composition | F1, P1, Q2, M1 | 0/1 | 1/1 | improved |
| p23-draft-is-not-a-source | rewrite | F1, P1, Q2, M1, V1 | 1/1 | 1/1 | same |
| p24-naming-preserves-sequence | naming | V1, M1 | 0/1 | 1/1 | improved |
| p25-sparse-material-does-not-create-backstory | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p26-negated-expectation-needs-source | write | F1, M1, Q2 | 1/1 | 1/1 | same |
| p27-negated-trait-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p28-reader-scope-needs-source | write | F1, M1, Q2 | 0/1 | 1/1 | improved |
| p29-unspecified-plan-stays-unspecified | write | F1, M1 | 0/1 | 1/1 | improved |

## rubric別

| rubric | Skillなし | Skillあり |
|---|---:|---:|
| F1 — Source fidelity | 7/16 (43.75%) | 15/16 (93.75%) |
| F2 — Uncertainty | 2/2 (100.00%) | 2/2 (100.00%) |
| V1 — Vocabulary provenance | 10/10 (100.00%) | 10/10 (100.00%) |
| V2 — User term retention | 2/2 (100.00%) | 2/2 (100.00%) |
| P1 — Skill composition | 5/6 (83.33%) | 6/6 (100.00%) |
| Q1 — Naturalness | 2/2 (100.00%) | 2/2 (100.00%) |
| Q2 — No over-structuring | 6/9 (66.67%) | 9/9 (100.00%) |
| M1 — Meaning preservation | 13/24 (54.17%) | 21/24 (87.50%) |
| A1 — Temporary artifact handling | 1/1 (100.00%) | 1/1 (100.00%) |
| N1 — Out-of-scope non-interference | 3/3 (100.00%) | 3/3 (100.00%) |

## 不合格の内訳

- p02-no-unsolicited-coinage — Skillなし run 1: 素材にない事実・期待・助言を追加しており、F1とM1を満たさない。（F1: 「仕事は楽になると思っていた」という事前の期待、メール返信や資料修正、以前の過ごし方、時間を空白のまま残すべきだという助言を素材にないまま追加している。 / M1: 元の因果関係は含むものの、素材にない事前期待や具体的行動、一般化された結論と助言を加え、内容の範囲を変えている。）
- p02-no-unsolicited-coinage — Skillあり run 1: 明示的に禁止された事前の期待を追加している。（F1: 「AIを使えば仕事は楽になると思っていた」という素材にない事前の期待を追加している。 / M1: 元の因果関係は残しているが、素材にない事前認識を加えたため、原素材の意味の範囲を保てていない。）
- p03-no-invented-scene — Skillなし run 1: メモにない経験、感情、助言を大幅に補っている。（F1: 素材にない「評価を取り戻せない」という考え、失敗のたびに落ち込んだ経験、仕事への適性を疑った経験、経験を少しずつ重ねた経緯、具体的な対処法や休む助言などを追加している。 / M1: 元の経験にない感情や経過を一人称の実体験として具体化し、さらに「一度の失敗」「今日怒られた」といった限定や状況も加えており、原素材の範囲と意味を保っていない。）
- p09-do-not-universalize-personal-story — Skillなし run 1: 不確実性と入力由来の表現は保つが、本人の観察を素材にない体験、価値判断、教訓へ大幅に広げている。（Q2: 元の短い観察を、作品との時間の価値、失敗の捉え直し、熱があるうちに使うという教訓へ拡張している。 / M1: 夜更かし、記憶に残る一文、惜しむ気持ち、今後の行動方針など、素材にない経験・感情・判断を多数追加して意味を拡張している。）
- p09-do-not-universalize-personal-story — Skillあり run 1: 末尾で原素材にない推測を加えており、意味保存を満たさない。（M1: 「終わりに近づいても期限が延びるわけではない」という、素材にない期限変化の判断軸と推測を追加している。）
- p12-persona-structure-overrides-generic — Skillなし run 1: 人物Skillの結び方には従っているが、材料にない参加者の反応や本人の感情、後続行動を追加している。（F1: 参加者の「大丈夫ですよ」という発言、顔が熱くなった感情・身体反応、後日の確認行動を追加している。 / M1: マイクの入れ忘れと30秒後の気づきは残るが、未提示の発言・感情・後続行動によって原素材の意味を大幅に拡張している。）
- p13-no-over-structuring-personal-essay — Skillなし run 1: 流れは維持されているものの、原素材にない評価的な意味が追加されている。（M1: 出来事の順序は保っているが、「当然」「懲りずに」「立派な」という評価を加え、原文にない因果の必然性や語り手の態度を持ち込んでいる。）
- p16-no-invented-emotion — Skillなし run 1: 冒頭の事実は保つが、素材にない後続内容を予告している。（F1: 今後の記事が立ち上げから解散までを振り返り、得た学びを整理するという、メモにない記事内容や学びを追加している。）
- p19-verified-secondary-source-is-allowed — Skillなし run 1: 数値自体は保たれているが、資料への帰属が失われている。（M1: 確認済みの報告書に基づく情報であるという帰属を示さず、資料記載の内容を直接の事実として提示している。）
- p19-verified-secondary-source-is-allowed — Skillあり run 1: 確認済み数値は正確だが、期待された資料への帰属が保たれていない。（M1: 数値自体は保持しているが、調査報告書に記載された情報であるという資料への帰属を省略し、結果を直接の事実として提示している。）
- p21-provenance-table-does-not-create-untracked-file — Skillなし run 1: 副作用や資料外追加はないが、指定された2資料の利用を完了していない。（P1: 複数資料を使う指定に対してsource-a.mdの内容しか示しておらず、2資料を用いるという具体要件を満たしていない。）
- p22-persona-style-without-invented-scene — Skillなし run 1: 人物Skillには沿うが、素材にない行動や意図を追加しておりF1を満たさない。（F1: 地図を見ていたこと、現在地が曖昧だったこと、余裕のある人間を演じる計画など、メモにない具体的事実や意図を追加している。）
- p24-naming-preserves-sequence — Skillなし run 1: 造語の提案自体は許可されるが、複数案が元の状態の重要な意味を欠いている。（M1: 「未承認先行開発」や「レビュー渋滞ドリフト」は、返答待ちの間に次の修正を始め、レビュー前の変更が積み上がるという時間関係と結果を十分に保持していない。）
- p25-sparse-material-does-not-create-backstory — Skillなし run 1: 素材外の期待、意味の強化、一般的な提言が追加されている。（F1: 「少しだけのつもり」という具体的な事前の期待と、やめどきの設計が必要だという素材にない提言を追加している。 / M1: 「予定より長く」を「予定よりずっと長く」と強め、さらに素材外の事前期待と提言を加えている。 / Q2: 個人の出来事を、学習ツールではやめどきの設計が必要だという一般的な教訓へ広げている。）
- p27-negated-trait-needs-source — Skillなし run 1: 一般化はしていないが、素材にない作業経緯と感情を創作している。（F1: 素材にない「ようやく」、ぎりぎりまで推敲した経緯、最後の一文、安堵の感情を追加している。 / M1: 完成時期の事実だけだった素材に、作業過程、遅延の含意、感情を付加して意味を変えている。）
- p28-reader-scope-needs-source — Skillなし run 1: 素材にない勇気という原因と、読者一般にも読める成長の教訓を追加している。（F1: 素材にない原因である「勇気を出して」と、一般的な成長についての主張を追加している。 / M1: 翌週に提案した事実へ「勇気」が原因だったという意味を加え、個人の出来事を成長の教訓へ変えている。 / Q2: 本人の二つの会議での経験を「小さな一歩でも、次の成長につながる」という一般的な教訓へ広げている。）
- p29-unspecified-plan-stays-unspecified — Skillなし run 1: 材料にない部屋の変化を追加しているため。（F1: 「部屋が少しずつ新しい表情になっていく」という、材料にない部屋の変化を追加している。 / M1: 予定より長引き夕方に棚を組み立て終えた点は保っているが、原素材にない結末を加えて意味の範囲を広げている。）

## 方法

各生成は別の一時作業フォルダで実行した。両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。

生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、最終ファイル差分だけを別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。

生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。

## 制約

- 単一の生成モデル、単一のreasoning effortで、各条件・各ケース1回実行した評価である
- 採点は生成と同じモデルの別セッションで行っており、独立した人手評価ではない
- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る
- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない
- 合格率差は今回の32ケース内の差であり、あらゆる日本語文章タスクへ一般化できない
