# Codex 5.6 regression eval

このevalは、`referytale` なしのbaselineと、skillを適用したrunを同じ入力で比較します。特定の名称を生成できたかではなく、名称より先に指示対象を分離できたかを評価します。

## 比較条件

- 同じCodex 5.6系モデル、同じreasoning effort、同じプロジェクト指示を使う。
- 記録には「Codex 5.6」だけでなく、実際に選択した完全なモデルIDを残す。
- 各runは新しいタスクと空の一時作業領域で開始する。前のrunの会話、対応表、生成文書を引き継がない。
- baselineでは `referytale` と `referent-before-label` Ruleを読み込ませない。
- skill runではskillを配置し、fixtureの入力の前に `$referytale` を明示して確実に適用する。Ruleの自動発火だけを測る場合は別系列として記録する。
- モデルのばらつきを見る場合は各fixtureを各条件3回以上実行する。1回だけの成功を回帰防止の根拠にしない。
- fixtureからモデルへ渡すのは `## Input` 内だけとする。目的、失敗傾向、合格条件は渡さない。

## 実行手順

1. 空の一時作業領域を用意する。Gitリポジトリとして試す場合は、両条件で同じ初期状態にする。
2. モデルID、reasoning effort、実行日時、skillのリビジョンを [results-template.md](results-template.md) に記録する。
3. baseline環境でfixtureの `## Input` だけを送る。複数turn fixtureは番号順に送る。
4. 応答、作成ファイル、対応表、ファイル作成順序が分かる実行履歴を保存する。
5. 新しい一時作業領域でskill runを行う。`$referytale` を明示し、それ以外の入力と設定は変えない。
6. fixture固有の合格条件と共通rubricで採点する。
7. 同じfixtureのbaselineとskill runを比較し、失敗署名が減ったかを確認する。

## 共通rubric

各項目を `1 = 合格 / 0 = 不合格` で記録する。

| ID | 評価項目 | 合格条件 |
|---|---|---|
| G1 | Preflight order | 対象本文より前に、独立ファイルのPhase 1保存が実行履歴から確認できる |
| G2 | Phase separation | Phase 1初回保存に `ID/出典/目的/具体対象/役割/前後関係` だけがあり、候補語を含まない。Phase 2はその後に追加される |
| G3 | One row, one role | 条件、状態、事象、値、記録、目的、手段を必要に応じて別行にしている |
| G4 | One name, one mapping | 一つの候補語が異なる指示対象・役割を兼ねない |
| G5 | Source fidelity | 元入力の順序、因果関係、未確定性を保持している |
| G6 | Vocabulary traceability | 本文の独自語・プロジェクト固有語がユーザー語、既存語、確立語、Phase 2のいずれかへ遡れる |
| G7 | Semantic validation | referent、role、name uniqueness、sequence、unknown、purpose–meansの検査結果が成果物に反映されている |

G1またはG2が0なら、総点に関係なくskill runは不合格とする。表が最終文書内にあるだけではG1を満たさない。最終状態のファイルだけでは生成順序を判定できないため、実行履歴も確認する。

## fixture固有条件

各 `fixture.md` の `## Pass conditions` を共通rubricへ加える。名称の文字列一致は要求しない。重要なのは、名称がどの具体対象と役割を指すかが一意であること。

## 比較の見方

- fixtureごとに、共通rubricと固有条件をすべて満たしたrunの割合を算出する。
- skill runは全fixtureでG1とG2を満たす必要がある。
- baselineとの差は総点だけでなく、`条件と事象の混同`、`目的と手段の混同`、`未確定性の消失`、`順序の圧縮`、`未登録語の先行使用` の失敗署名ごとに確認する。
- skill runが表形式だけ満たし本文で再び語を混同した場合は不合格とする。

## Rule自動発火の追加評価

Ruleの発火精度も測る場合は、第三の条件として `rule-auto` を追加する。この条件ではRuleとskillを配置するが、プロンプトに `$referytale` を書かない。`skill` と `rule-auto` を混ぜて集計しない。
