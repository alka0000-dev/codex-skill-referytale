# 保守モード開始機能 設計書

## 1. 目的

変更承認、利用者セッション数、予定開始時刻を判定し、すべての開始条件が成立した場合に限って管理サービスへ保守モード開始要求を1回送信する。送信と応答の証跡を永続化し、応答待ちを含む状態を越えて同一要求が重複送信されないようにする。

## 2. 要求・名称・設計箇所の対応表

正式名称の基準は先に確定した [保守モード開始機能 参照名称対応表](../.codex/referent-tables/maintenance-mode-start.md) とする。次の表は、同対応表の名称を元要求、設計箇所、検証観点へ割り当てた要求トレーサビリティ表である。

| ID | 元要求 | 正式名称 | 設計箇所・検証観点 |
|---|---|---|---|
| R-01 | 変更承認記録が承認済みである | 変更承認済み条件 | 5.1、T-01/T-04 |
| R-02 | アクティブな利用者セッションが0件である | セッション不在条件 | 5.1、T-02/T-04 |
| R-03 | 予定開始時刻に達している | 予定開始時刻到達条件 | 5.1、T-03/T-04 |
| R-04 | 三つの条件をすべて満たした場合だけ要求を送る | 保守モード開始可能条件 | 5.1、5.2、T-04/T-05 |
| R-05 | 開始済み応答を受けるまでは同じ要求を再送しない | 同一開始要求の重複送信防止 | 5.2、5.3、T-06/T-07/T-08 |
| R-06 | 要求IDを保存する | 保守モード開始要求ID | 6、T-09 |
| R-07 | 送信時刻を保存する | 保守モード開始要求送信時刻 | 6、T-09 |
| R-08 | 管理サービスの応答結果を保存する | 管理サービス開始応答結果 | 5.2、6、T-09/T-10 |

## 3. 用語

| 名称 | 定義 |
|---|---|
| 保守モード開始対象 | 一つの変更承認記録に対応して開始可否を判定する単位 |
| 変更承認済み条件 | 対象の変更承認記録の状態が `APPROVED` であること |
| セッション不在条件 | 判定時点のアクティブな利用者セッション数が `0` であること |
| 予定開始時刻到達条件 | DBの現在時刻が予定開始時刻以上であること |
| 保守モード開始可能条件 | 上記三条件の論理積（AND） |
| 保守モード開始要求ID | 一回の開始試行を一意に識別するUUID。送信前に生成し、以後変更しない |
| 管理サービス開始済み応答 | 管理サービスが対象を開始済みと確定した応答 |
| 開始要求監査記録 | 要求ID、送信時刻、応答結果および判定根拠を保持する永続レコード |

### 3.1 元草稿からの名称置換

元草稿：

> 保守移行点を満たしたら開始処理へ進む。保守移行点の間は再送せず、結果を記録する。

| 草稿の曖昧な表現 | 置き換える名称 | 理由 |
|---|---|---|
| 保守移行点を満たす | 保守モード開始可能条件が成立する | 三条件のANDであることを明示するため |
| 開始処理 | 保守モード開始要求送信 | 実行する外部操作を特定するため |
| 保守移行点の間 | 開始要求ID設定後から開始済み確定まで | `AWAITING_START_RESPONSE` と `REVIEW_REQUIRED` を含む永続状態で再送抑止を定義するため |
| 同じ要求 | 同一の保守モード開始要求IDを持つ要求 | 同一性の判定キーを明示するため |
| 結果 | 管理サービス開始応答結果 | 保存対象を特定するため |

## 4. 対象範囲

### 4.1 対象

- 三条件の取得と開始可否判定
- 管理サービスへの開始要求送信
- 同一開始対象に対する重複送信防止
- 要求と応答の監査記録
- タイムアウト、通信失敗、開始済み以外の応答の安全な記録

### 4.2 対象外

- 変更承認そのもののワークフロー
- 利用者セッションを終了させる処理
- 管理サービス内部の保守モード開始処理
- 失敗後に新しい要求IDで再試行する運用（別途承認された回復手順で定義する）

## 5. 機能設計

### 5.1 開始可能条件

判定式は次の一式だけを使用する。

```text
maintenance_start_eligible =
    approval_status == APPROVED
    AND active_session_count == 0
    AND database_current_time >= scheduled_start_at
```

- 条件は同一の判定トランザクション内で読み取る。
- 時刻比較にはアプリケーションノードの時計ではなくDBの現在時刻を使う。
- 値が欠落している、取得に失敗した、または状態が不明な場合は条件不成立として送信しない。
- 三条件それぞれの判定値と判定時刻を監査記録へ保存する。

### 5.2 処理フロー

1. 開始対象をキーに開始制御レコードをロックする。
2. 三条件を取得し、`保守モード開始可能条件` を評価する。
3. 一つでも不成立なら状態を `WAITING_CONDITIONS` とし、要求を生成・送信しない。
4. すべて成立していても、既存の要求IDがある場合は新規要求を生成・送信しない。
5. 既存要求がない場合だけUUIDを生成する。
6. 外部送信の直前に、要求ID、送信時刻、条件のスナップショット、応答結果 `PENDING`、状態 `AWAITING_START_RESPONSE` を同一トランザクションで保存してコミットする。
7. コミット成功後、保存した要求IDを指定して管理サービスへ開始要求を1回送信する。HTTPクライアント、プロキシ、ジョブ基盤の自動再試行は無効にする。
8. `開始済み` 応答を受けた場合、応答結果と応答時刻を保存し、状態を `STARTED` にする。
9. `開始済み` 以外の応答を受けた場合、応答結果を保存し、状態を `REVIEW_REQUIRED` にする。同一要求は自動再送しない。
10. タイムアウトまたは通信結果が不明な場合、結果を `DELIVERY_UNKNOWN` として保存し、状態を `REVIEW_REQUIRED` にする。同一要求は自動再送しない。

更新は開始対象単位の行ロック、または `version` を使ったcompare-and-setで直列化する。要求生成条件に `request_id IS NULL` を含め、同時実行された複数ワーカーのうち一つだけが手順5以降へ進める。

再送禁止の不変条件は `request_id IS NOT NULL` である。同じ開始対象に要求IDが一度設定された後は、`AWAITING_START_RESPONSE`、`REVIEW_REQUIRED`、`STARTED` のいずれでも自動送信経路へ戻さない。

### 5.3 状態遷移

| 現在状態 | 条件／事象 | 次状態 | 外部送信 |
|---|---|---|---|
| `WAITING_CONDITIONS` | 三条件のいずれかが不成立 | `WAITING_CONDITIONS` | なし |
| `WAITING_CONDITIONS` | 三条件がすべて成立し、要求IDがない | `AWAITING_START_RESPONSE` | 1回 |
| `AWAITING_START_RESPONSE` | 再評価・重複ジョブ起動 | 同状態 | なし |
| `AWAITING_START_RESPONSE` | `開始済み` 応答 | `STARTED` | なし |
| `AWAITING_START_RESPONSE` | 非開始応答、タイムアウト、通信結果不明 | `REVIEW_REQUIRED` | なし |
| `REVIEW_REQUIRED` | 自動再評価 | 同状態 | なし |
| `STARTED` | 任意の再評価 | 同状態 | なし |

`AWAITING_START_RESPONSE` は送信前に永続化する。これによりプロセス停止やジョブ重複時にも同一要求を再送しない。一方、永続化直後かつ実送信前にプロセスが停止すると、送達有無を自動判定できない。この場合は再送せず `REVIEW_REQUIRED` とし、管理サービスに要求ID照会APIがある場合のみ、そのAPIで状態を照合する。

## 6. データ設計

テーブル名：`maintenance_start_audit`

| 列 | 型の例 | 必須 | 内容 |
|---|---|---:|---|
| `target_id` | UUID | Yes | 保守モード開始対象ID。主キー |
| `request_id` | UUID | No | 保守モード開始要求ID。設定後は不変 |
| `state` | VARCHAR | Yes | 5.3の状態 |
| `evaluated_at` | TIMESTAMP WITH TIME ZONE | Yes | 条件判定時刻 |
| `approval_status` | VARCHAR | Yes | 判定時の承認状態 |
| `active_session_count` | BIGINT | Yes | 判定時のアクティブセッション数 |
| `scheduled_start_at` | TIMESTAMP WITH TIME ZONE | Yes | 判定に使った予定開始時刻 |
| `sent_at` | TIMESTAMP WITH TIME ZONE | No | 送信処理を呼び出す直前にDBで採取・保存した時刻 |
| `response_received_at` | TIMESTAMP WITH TIME ZONE | No | 応答受信時刻 |
| `response_result` | VARCHAR | No | `PENDING`、`STARTED`、`NOT_STARTED`、`DELIVERY_UNKNOWN` |
| `response_code` | VARCHAR | No | 管理サービスの応答コードまたはHTTP状態 |
| `response_detail` | JSON/JSONB | No | 機密情報を除去した応答詳細 |
| `version` | BIGINT | Yes | 排他更新用バージョン |

制約：

- `request_id` に一意制約を設定する。
- `state IN ('AWAITING_START_RESPONSE', 'STARTED', 'REVIEW_REQUIRED')` の場合、`request_id` と `sent_at` を必須にする。
- `state = 'STARTED'` の場合、`response_result = 'STARTED'` と `response_received_at IS NOT NULL` を必須にする。
- 監査列は追記または状態遷移に必要な更新だけを許可し、要求ID・送信時刻の上書きを禁止する。
- 保存期間、閲覧権限、応答詳細のマスキングは組織の監査・個人情報ポリシーに従う。

## 7. 管理サービス連携

要求の論理例：

```json
{
  "requestId": "<maintenance_start_audit.request_id>",
  "targetId": "<maintenance_start_audit.target_id>",
  "scheduledStartAt": "<ISO 8601 timestamp>"
}
```

- `requestId` は監査記録と外部要求で同じ値を使う。
- 接続・読み取りタイムアウトを設定するが、タイムアウト時に自動再送しない。
- 応答本文を保存する際は、認証情報、トークン、不要な個人情報を除去する。
- 管理サービスが要求IDによる冪等性を保証していても、本要件では自動再送しない。将来、再送を許可する場合は要件変更として扱う。

## 8. 擬似コード

```text
evaluateAndStart(targetId):
  begin transaction
    control = lock maintenance_start_audit by targetId
    facts = read approval, active session count, scheduled start time, DB current time
    save evaluation facts

    if not allThreeConditions(facts):
      set state = WAITING_CONDITIONS
      commit
      return NOT_ELIGIBLE

    if control.request_id is not null:
      commit
      return ALREADY_REQUESTED

    requestId = UUID()
    set request_id = requestId
    set sent_at = DB current time
    set response_result = PENDING
    set state = AWAITING_START_RESPONSE
  commit

  response = managementService.start(requestId, targetId)  // retries disabled

  begin transaction
    if response confirms STARTED:
      save response and set state = STARTED
    else:
      save response and set state = REVIEW_REQUIRED
  commit
```

通信例外は監査記録へ `DELIVERY_UNKNOWN` として保存する。例外処理から送信処理を再呼び出してはならない。

## 9. 受け入れテスト

| ID | シナリオ | 期待結果 |
|---|---|---|
| T-01 | 承認状態が `APPROVED` でない | 送信0回 |
| T-02 | アクティブセッション数が1以上 | 送信0回 |
| T-03 | DB現在時刻が予定開始時刻より前 | 送信0回 |
| T-04 | 三条件のうち任意の一条件だけが不成立 | 各組合せで送信0回 |
| T-05 | 三条件がすべて成立 | 要求IDを生成し、送信1回 |
| T-06 | `AWAITING_START_RESPONSE` 中に判定処理を複数回起動 | 同一要求・新規要求とも送信0回 |
| T-07 | 二つのワーカーが同時に三条件成立を判定 | 合計送信1回、要求IDは1件 |
| T-08 | タイムアウトまたは通信結果不明後に再評価 | `REVIEW_REQUIRED` のまま送信0回 |
| T-09 | 要求を送信 | 要求ID、送信時刻、判定根拠、`PENDING` が送信前に保存済み |
| T-10 | `開始済み` 応答を受信 | 応答結果・応答時刻を保存し `STARTED` へ遷移 |
| T-11 | `開始済み` 以外の応答を受信 | 応答内容を保存し `REVIEW_REQUIRED` へ遷移、再送0回 |
| T-12 | 条件値の取得失敗または欠落 | 安全側に倒して送信0回、エラーを記録 |

## 10. 作り直した本文（要約）

変更承認済み条件、セッション不在条件、予定開始時刻到達条件の三条件を同一判定で評価し、すべてが成立した場合に限り、管理サービスへ保守モード開始要求を送信する。送信前に保守モード開始要求IDと送信時刻を監査記録へ永続化し、開始要求状態を `AWAITING_START_RESPONSE` に遷移させる。この状態以降は、管理サービスから開始済み応答を受けるまで同一要求を再送しない。受信した応答結果は要求IDに対応付けて保存し、開始済みなら `STARTED`、それ以外または送達結果が不明なら `REVIEW_REQUIRED` とする。`REVIEW_REQUIRED` からの自動再送は行わない。

## 11. 要確認事項

- 管理サービスに要求IDを指定した状態照会APIがあるか。ある場合、送達結果不明時の照合に使用できる。
- `開始済み` を表す正式な応答コードと応答スキーマ。
- 監査記録の保存期間および閲覧権限。

これらは連携仕様と運用仕様の確定事項であり、未確定でも「三条件成立時だけ送信する」「同一要求を自動再送しない」という安全側の挙動は変えない。
