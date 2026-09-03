# Evals

`referytale` の回帰評価では、文章の上手さだけでなく失敗署名を確認する。

| ID | 評価項目 | 合格条件 |
|---|---|---|
| F1 | Source fidelity | 入力・資料・固有Skillにない事実や経験を追加しない |
| F2 | Uncertainty | 未確認事項を確定事項へ変えない |
| V1 | Vocabulary provenance | AI独自の造語・概念名を無断導入しない |
| V2 | User term retention | ユーザー由来の独自表現を不用意に消さない |
| P1 | Skill composition | 固有Skillの具体ルールを汎用文体より優先する |
| Q1 | Naturalness | 文型・語尾・段落構造が不必要に均一ではない |
| Q2 | No over-structuring | 個人の体験を勝手に分類・教訓・一般論へ変えない |
| M1 | Meaning preservation | 原素材の意味・強度・不確実性を保つ |

## Provenance Table モード

厳密モードでは最終本文だけでなく作業成果物も確認する。

- 本文より前に主要材料の出所が整理されている
- 本文へ新しい情報を先に足して後付けで正当化していない
- User / Project / Source / Established / Unknown の区別が保たれている

二段階の名称割り当ては合格条件にしない。本Skillの対応表は由来追跡が目的である。
