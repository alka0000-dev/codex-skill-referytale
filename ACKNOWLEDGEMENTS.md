# Acknowledgements

現在版ReferyTaleは、文章生成時の忠実性を次の4軸として設計しています。

- Source Fidelity
- Vocabulary Provenance
- Voice Fidelity
- Writing Quality

## natural-japanese

Repository: https://github.com/coji/natural-japanese  
License: MIT

参考にした主な考え方:

- 文章を生成して終わりにせず、執筆前後に品質確認を置く
- AI特有の反復、過剰な均一化、翻訳調などを文章品質として扱う
- 機械的な検出と文脈上の判断を分ける
- 人間文・AI文のコーパスやevalでルールを検証する

ReferyTaleでは、natural-japaneseの工程名、12箇条、検出スクリプト、文章そのものを複製していません。

## ReferyTaleの命名原則

ReferyTaleでは、文章中の新しい名称や概念語について、次の原則を採用しています。

- 名前より先に、その語が指す具体的な内容を確認する
- ユーザー語・プロジェクト既存語・確立語をAI独自語より優先する
- 新しい語や説明を元の材料へ追跡可能にする
- 未確定事項を、もっともらしい名称で確定事項に見せない
- 後付けで意味や根拠を正当化しない

日常の文章制作では、この考え方を事実・経験・意見・語彙の出所管理へ広げています。
