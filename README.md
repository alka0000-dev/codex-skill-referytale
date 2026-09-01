# ReferyTale

名称より先に指示対象を外部化し、独自用語の乱立、役割の混同、未確定事項の隠蔽、推論順序の欠落を防ぐCodex skillです。

> Before the name, there is a tale.

- 表示名: `ReferyTale`
- skill名: `referytale`
- 推奨GitHubリポジトリ名: `codex-skill-referytale`

## 構成

```text
referytale/
├── .gitignore
├── LICENSE
├── SKILL.md
├── README.md
├── rules/
│   └── referent-before-label.md
├── integration/
│   └── gitignore-entry.txt
└── evals/
    ├── README.md
    ├── results-template.md
    └── fixtures/
        └── <case-id>/fixture.md
```

`SKILL.md` が詳細手順の正本です。Ruleは発火条件と絶対禁止事項だけを持ちます。失敗を誘発する事例はskill本体へ埋め込まず、`evals/fixtures/` に分離しています。

## 導入

1. `referytale/` をCodexが検出するskillsディレクトリへ配置する。
2. [rules/referent-before-label.md](rules/referent-before-label.md) の内容を、使用環境でCodexへ常時渡すRuleまたはプロジェクト指示へ追加する。配置場所はRuleローダーの仕様に従う。
3. 対象プロジェクトの `.gitignore` へ [integration/gitignore-entry.txt](integration/gitignore-entry.txt) の除外行を追加する。

`.codex/referent-tables/` は通常、一時的なsemantic preflight成果物としてGit管理しません。設計判断として残す必要がある対応表だけ、人が明示的に `docs/` などの通常の文書領域へ移します。

このディレクトリは、そのままGitHubリポジトリのルートとして利用できます。

## 期待される実行結果

適用対象の作業では、対象本文より先に次が作られます。

```text
<work-root>/.codex/referent-tables/referent-table-<slug>.md
```

対応表は、名前より先に指示対象を確定するため、次の二段階で作成します。

1. **Phase 1 — 指示対象の確定**: 名前を考えず、`ID / 出典 / 目的 / 具体対象 / 役割 / 前後関係` だけを表に記録して一度保存します。
2. **Phase 2 — 名称の割り当て**: 保存済みのPhase 1を読み直し、各IDへ対応する `候補語 / 種別 / 初出定義` の表を同じファイルに追加します。

対象本文はPhase 2まで完了してから作成します。本文の作成中に対応表へ登録していない新語が必要になった場合は、その語を本文へ先に書かず、Phase 1へ戻って指示対象から追加します。

## 検証

frontmatterとskill構造は、Codex同梱のskill validatorで確認します。

```text
quick_validate.py <path-to-referytale>
```

行動面の回帰確認は [evals/README.md](evals/README.md) に従います。構造検査だけでは、指示対象の分離、役割の一意性、順序保持、未確定性の保持までは証明できないため、fixtureごとにbaselineとskill適用時を比較します。

## sha256の位置づけ

監査要件がある場合だけ、Phase 1保存直後の内容を識別する記録としてsha256を使います。sha256はモデルの内部思考順序や推論過程を証明しません。

## License

ReferyTale is licensed under the [MIT License](LICENSE).

Copyright (c) 2026 Shirafuji Anna
