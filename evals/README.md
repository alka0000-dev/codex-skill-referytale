# Evals

`referytale` の回帰評価では、文章の上手さだけでなく失敗署名を確認する。

評価ケース、rubricの定義、合格条件の機械可読な正本は[`evals.json`](./evals.json)に置く。このREADMEは、評価意図と実行方法を説明する。

## 実行方法

依存パッケージは不要で、Node.jsと認証済みのCodex CLIを使う。ランナーは、公式の[Codex非対話モード](https://developers.openai.com/codex/non-interactive-mode)で生成と採点を実行する。

最初にdry-runで、ケース数、条件、モデル、出力先を確認する。dry-runはファイルを作らず、モデルも呼び出さない。

```shell
node evals/run-evals.mjs --dry-run
```

全38ケースをGPT-5.6-sol・lowで、Skillなし／あり各1回実行し、条件名を伏せて採点してレポートを作る場合:

```shell
node evals/run-evals.mjs \
  --model gpt-5.6-sol \
  --grader-model gpt-5.6-sol \
  --reasoning low \
  --conditions control,skill \
  --repetitions 1 \
  --concurrency 4
```

この設定では生成76回と、既定で最大8出力ずつの採点10回を行う。中断した場合は、同じ出力先を指定して`--resume`を付けると、成功済みの生成と採点を再利用する。再開できるのは、対象ケース、条件、反復回数、生成・採点モデル、reasoning effort、ランナー、Skill、参照資料、評価スナップショットなど、実験条件と内容ハッシュが一致する場合だけである。どれかを変えた場合は新しい出力先で実行する。

```shell
node evals/run-evals.mjs \
  --output evals/results/2026-09-05-gpt-5.6-sol-full \
  --resume
```

`--stage generate`、`--stage grade`、`--stage report`で工程を分けられる。`--cases p02-no-unsolicited-coinage,p25-sparse-material-does-not-create-backstory`のように対象を絞ることもでき、`--conditions control`または`--conditions skill`の単一条件レポートにも対応する。全オプションは`node evals/run-evals.mjs --help`で確認する。

各生成はOSの一時ディレクトリに作った別々の作業領域で行う。両条件に同じ共通指示、入力、fixtureを与え、Skillあり条件だけに`SKILL.md`と`references/`を配置する。端末側のSkill探索、Skill検索、プラグイン、ユーザー設定は無効化する。生成担当には`expected`、`must_not`、rubricを渡さない。採点担当には、出力と最終ファイル差分に加えて、fixtureファイルの初期内容と実行後の内容を渡す。

ユーザー階層の`AGENTS.md`やSkillが評価へ混ざらないよう、既定では実行中だけ使う隔離`CODEX_HOME`を一時ディレクトリへ作る。認証は、プロセスに`CODEX_API_KEY`が設定されていればそれを使い、それ以外では既存の`auth.json`をコピーせずファイルリンクで参照する。リンクを作れない環境では、認証情報を貼り付けず、プロセス単位の`CODEX_API_KEY`を設定する。`--allow-user-codex-home`で通常の`CODEX_HOME`も使えるが、ユーザー指示が出力へ影響するため正式比較には使わない。

結果ディレクトリには次を保存する。

- `evaluation.json`: 実行時に使った対象ケースとrubricのスナップショット
- `manifest.json`: モデル、reasoning effort、対象ケース、Gitコミット、評価定義・ランナー・Skill・参照資料のSHA-256
- `generations.jsonl`: 条件ごとの生の最終出力、トークン使用量、実行時間、最終ファイル差分、fixtureの初期・最終内容
- `grading.jsonl`: 条件名を伏せた別セッションによるrubric単位の判定
- `grading-batches.jsonl`: 成功・失敗を含む採点試行ごとの実行情報とトークン使用量
- `summary.json`: 条件別、rubric別、ケース別の集計値
- `report.md`: 公開用の比較レポート

採点は実行を再現しやすくするため自動化しているが、人手評価の代わりではない。合格率は予定した生成数を分母にし、実際に失敗した生成は不合格相当として比較へ含める。未実行の生成は生成エラーと混同せず、レポートを未完了・比較不能とする。生成済みで未採点の出力があるケースも比較不能とする。Skill本文を修正する前に、不合格ケースの実出力を原素材へ照合し、同じ失敗が再現するかを追加実行で確認する。

## 公開している実行結果

- [2026-09-05 — GPT-5.6-sol 全36ケース](./results/2026-09-05-gpt-5.6-sol-full-v0.2.9/report.md) — Skillなし15/36、Skillあり36/36、改善21・同等15・悪化0
- [2026-09-05 — 開発・追試の評価履歴32件](./results/history/README.md) — Skill側の不合格と修正後の再評価を実行順に公開
- [2026-09-05 — 訂正済みの旧全33ケース評価](./results/2026-09-05-gpt-5.6-sol-full-v0.2.3/report.md) — 公開後訂正値はSkillなし16/33、Skillあり31/33
- [2026-09-05 — 訂正済みの旧片側材料評価](./results/2026-09-05-gpt-5.6-sol-one-sided-retest/report.md) — 公開後訂正値はSkillなし0/10、Skillあり9/10
- [2026-09-05 — GPT-5.3-Codex-Spark](./results/2026-09-05-gpt-5.3-codex-spark.md) — Skillなし／ありの8ケース、合計32出力の比較
- [2026-09-05 — GPT-5.6-sol](./results/2026-09-05-gpt-5.6-sol.md) — 過去の失敗と今回の修正に関係する10ケース、12出力の結果と実出力

現行結果と履歴の一覧は[`results/README.md`](./results/README.md)に置く。結果の点数は、実行したケースの範囲だけを表す。モデル、reasoning effort、対象コミット、実行回数、Skillなし対照群の有無を結果ファイルへ記録する。自動採点だけでSkillの普遍的な性能や、人手評価と同等の品質を主張しない。

| ID | 評価項目 | 合格条件 |
|---|---|---|
| F1 | Source fidelity | 材料として指定された入力・資料・固有Skillにない事実、経験、発言、感情、原因、助言を追加しない |
| F2 | Uncertainty | 未確認事項を確定事項へ変えない |
| V1 | Vocabulary provenance | AI独自の造語・概念名を無断導入しない |
| V2 | User term retention | ユーザー由来の独自表現を不用意に消さない |
| P1 | Skill composition | 固有Skillの具体ルールを汎用文体より優先する |
| Q1 | Naturalness | 文型・語尾・段落構造が不必要に均一ではない |
| Q2 | No over-structuring | 個人の体験を勝手に分類・教訓・一般論へ変えない |
| M1 | Meaning preservation | 原素材の意味・強度・不確実性を保つ |
| A1 | 一時成果物の扱い | 除外設定とユーザーの許可を守り、未追跡ファイルや無断の設定変更を残さない |
| N1 | Out-of-scope non-interference | 対象外の依頼をそのまま完了し、文章改善用の監査・造語・人物表現規則を持ち込まない |
| D1 | Diagnostic evidence | 各軸をその軸に必要な材料の有無に基づいて判定し、不足時は判定不能と対応する必要材料を示す |

## Provenance Table モード

厳密モードでは最終本文だけでなく作業成果物も確認する。

- 本文より前に主要材料の出所が整理されている
- 本文へ新しい情報を先に足して後付けで正当化していない
- User / Project / Source / Established / Unknown の区別が保たれている
- ファイルへ保存する場合、利用先の除外設定を確認し、許可なく未追跡ファイルや `.gitignore` の変更を残していない

二段階の名称割り当ては合格条件にしない。本Skillの対応表は由来追跡が目的である。

## Fixture

ファイルやGit状態が合格条件に含まれるケースは、`fixture`へ実行前の状態を記録する。

- `git_repo`: Gitリポジトリとして初期化するか
- `files`: 相対パスと初期内容

実行後は本文だけでなく、未追跡ファイル、追跡ファイルの差分、`.gitignore`の変更を確認する。文章形式の指定は素材外の内容を追加する許可として扱わず、人物Skillとの合成ケースでは、文体規則の維持と非フィクションの具体情報の非追加を同時に評価する。

## 初稿の出所照合

根拠となるメモ・資料と初稿を分けて提示するケースでは、初稿そのものをSourceとして扱わない。元の材料にない内容が初稿へ含まれている場合は削除し、元の材料と固有Skillの表現規則だけで最終稿を作り直せているかを評価する。検証工程の名称や表の出力ではなく、最終稿から素材外の意味内容が消えていることを合格条件にする。別の根拠資料がない通常のリライトケースでは、ユーザー原文をUser由来の材料として扱う。

## 命名時の意味保持

命名が明示的に許可されたケースでも、許可されるのは新しい名前であり、名前が指す内容の変更ではない。各提案名の説明から名称を外して読み、元の対象と主体、動作、原因、時間関係、結果が一致するかを評価する。語感の良さを優先して、別の状態や因果関係へ広げた候補はM1不合格とする。
