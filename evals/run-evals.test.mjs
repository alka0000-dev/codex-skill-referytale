import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  assertResumeManifestMatches,
  buildGraderPrompt,
  buildMarkdownReport,
  buildEvaluationSnapshot,
  buildGenerationPlan,
  compareSnapshots,
  parseArguments,
  readJsonLines,
  summarizeResults,
  validateEvaluation,
} from './run-evals.mjs';

const evaluation = {
  version: 'test',
  rubrics: {
    F1: { name: 'Source fidelity', pass_condition: 'No additions' },
  },
  cases: [
    {
      id: 'case-1',
      type: 'write',
      input: 'Write.',
      expected: ['Writes'],
      rubric: ['F1'],
    },
  ],
};

test('parseArguments builds the paired one-run default', () => {
  const options = parseArguments(['--dry-run']);

  assert.deepEqual(options.conditions, ['control', 'skill']);
  assert.equal(options.repetitions, 1);
  assert.equal(options.model, 'gpt-5.6-sol');
  assert.equal(options.dryRun, true);
});

test('validateEvaluation rejects unknown rubrics and duplicate cases', () => {
  const invalid = structuredClone(evaluation);
  invalid.cases.push({ ...invalid.cases[0], rubric: ['missing'] });
  invalid.cases[0].fixture = { files: [{ path: 'memo.txt', content: 1 }] };

  const errors = validateEvaluation(invalid);

  assert.ok(errors.some((error) => error.includes('Duplicate case ID')));
  assert.ok(errors.some((error) => error.includes('unknown rubric missing')));
  assert.ok(errors.some((error) => error.includes('fixture content must be a string')));
});

test('buildGenerationPlan creates every case-condition-repetition combination', () => {
  const options = {
    cases: undefined,
    conditions: ['control', 'skill'],
    repetitions: 2,
  };

  const plan = buildGenerationPlan(evaluation, options);

  assert.equal(plan.length, 4);
  assert.deepEqual(
    plan.map((task) => task.key),
    ['case-1|control|1', 'case-1|control|2', 'case-1|skill|1', 'case-1|skill|2'],
  );
});

test('compareSnapshots reports final added, modified, and removed files', () => {
  const changes = compareSnapshots(
    { 'kept.txt': 'a', 'changed.txt': 'a', 'removed.txt': 'a' },
    { 'kept.txt': 'a', 'changed.txt': 'b', 'added.txt': 'c' },
  );

  assert.deepEqual(changes, {
    added: ['added.txt'],
    modified: ['changed.txt'],
    removed: ['removed.txt'],
  });
});

test('buildEvaluationSnapshot keeps selected cases and their rubrics', () => {
  const expandedEvaluation = {
    version: 'test',
    rubrics: {
      F1: { name: 'Source fidelity', pass_condition: 'No additions' },
      M1: { name: 'Meaning', pass_condition: 'Preserve meaning' },
    },
    cases: [
      evaluation.cases[0],
      { ...evaluation.cases[0], id: 'case-2', rubric: ['M1'] },
    ],
  };

  const snapshot = buildEvaluationSnapshot(expandedEvaluation, ['case-2']);

  assert.deepEqual(snapshot.cases.map((item) => item.id), ['case-2']);
  assert.deepEqual(Object.keys(snapshot.rubrics), ['M1']);
});

test('assertResumeManifestMatches rejects changed experimental inputs', () => {
  const manifest = {
    schema_version: 2,
    harness_version: '4',
    eval_version: 'test',
    eval_file: 'evals/evals.json',
    case_ids: ['case-1'],
    model: 'model',
    grader_model: 'grader',
    reasoning_effort: 'low',
    conditions: ['control', 'skill'],
    repetitions: 1,
    planned_generations: 2,
    grader_batch_size: 4,
    grader_retries: 2,
    timeout_seconds: 120,
    codex_home_isolated: true,
    codex_cli_version: 'codex 1.0.0',
    runner_sha256: 'runner-hash',
    skill_sha256: 'skill-hash',
    reference_sha256: { 'references/policy.md': 'reference-hash' },
    evaluation_snapshot_file: 'evaluation.json',
    evaluation_snapshot_sha256: 'evaluation-hash',
  };

  assert.doesNotThrow(() => assertResumeManifestMatches(manifest, structuredClone(manifest)));

  const changed = structuredClone(manifest);
  changed.case_ids.push('case-2');
  changed.grader_model = 'another-grader';
  changed.skill_sha256 = 'another-skill-hash';

  assert.throws(
    () => assertResumeManifestMatches(manifest, changed),
    /case_ids, grader_model, skill_sha256/,
  );
});

test('buildGraderPrompt includes fixture contents before and after generation', () => {
  const prompt = buildGraderPrompt(evaluation, [{
    blindId: 'sample-1',
    evaluationCase: evaluation.cases[0],
    generation: {
      output: 'Done.',
      workspace_changes: { added: [], modified: ['memo.txt'], removed: [] },
      fixture_files: [{
        path: 'memo.txt',
        initial_content: 'before fixture text',
        final_content: 'after fixture text',
      }],
      git_status: ' M memo.txt',
    },
  }]);

  assert.match(prompt, /before fixture text/);
  assert.match(prompt, /after fixture text/);
});

test('readJsonLines repairs an unterminated trailing record', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'referytale-jsonl-test-'));
  const filePath = path.join(directory, 'records.jsonl');

  try {
    await writeFile(filePath, '{"id":1}\n{"id":', 'utf8');

    const records = await readJsonLines(filePath);

    assert.deepEqual(records, [{ id: 1 }]);
    assert.equal(await readFile(filePath, 'utf8'), '{"id":1}\n');
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('readJsonLines rejects a malformed completed record', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'referytale-jsonl-test-'));
  const filePath = path.join(directory, 'records.jsonl');

  try {
    await writeFile(filePath, '{"id":1}\n{"id":}\n', 'utf8');

    await assert.rejects(() => readJsonLines(filePath), /Invalid JSONL/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('summarizeResults compares paired pass rates', () => {
  const manifest = {
    eval_version: 'test',
    model: 'model',
    grader_model: 'grader',
    reasoning_effort: 'low',
    conditions: ['control', 'skill'],
    repetitions: 1,
    case_ids: ['case-1'],
  };
  const generations = [
    { key: 'case-1|control|1', case_id: 'case-1', condition: 'control', status: 'success' },
    { key: 'case-1|skill|1', case_id: 'case-1', condition: 'skill', status: 'success' },
  ];
  const grades = [
    {
      key: 'case-1|control|1',
      condition: 'control',
      overall: 'fail',
      rubric_results: [{ id: 'F1', pass: false }],
    },
    {
      key: 'case-1|skill|1',
      condition: 'skill',
      overall: 'pass',
      rubric_results: [{ id: 'F1', pass: true }],
    },
  ];

  const summary = summarizeResults(evaluation, manifest, generations, grades);

  assert.equal(summary.condition_summary.control.pass, 0);
  assert.equal(summary.condition_summary.skill.pass, 1);
  assert.equal(summary.comparison_summary.improved, 1);
});

test('summarizeResults counts generation errors in comparisons', () => {
  const manifest = {
    eval_version: 'test',
    model: 'model',
    grader_model: 'grader',
    reasoning_effort: 'low',
    conditions: ['control', 'skill'],
    repetitions: 2,
    case_ids: ['case-1'],
  };
  const generations = [
    { key: 'case-1|control|1', case_id: 'case-1', condition: 'control', status: 'success' },
    { key: 'case-1|control|2', case_id: 'case-1', condition: 'control', status: 'error' },
    { key: 'case-1|skill|1', case_id: 'case-1', condition: 'skill', status: 'success' },
    { key: 'case-1|skill|2', case_id: 'case-1', condition: 'skill', status: 'success' },
  ];
  const grades = [
    {
      key: 'case-1|control|1',
      condition: 'control',
      overall: 'pass',
      rubric_results: [{ id: 'F1', pass: true }],
    },
    {
      key: 'case-1|skill|1',
      condition: 'skill',
      overall: 'pass',
      rubric_results: [{ id: 'F1', pass: true }],
    },
    {
      key: 'case-1|skill|2',
      condition: 'skill',
      overall: 'pass',
      rubric_results: [{ id: 'F1', pass: true }],
    },
  ];

  const summary = summarizeResults(evaluation, manifest, generations, grades);

  assert.equal(summary.condition_summary.control.generation_errors, 1);
  assert.equal(summary.cases[0].conditions.control.error, 1);
  assert.equal(summary.cases[0].comparison, 'improved');
});

test('summarizeResults does not compare when a generated output is ungraded', () => {
  const manifest = {
    eval_version: 'test',
    model: 'model',
    grader_model: 'grader',
    reasoning_effort: 'low',
    conditions: ['control', 'skill'],
    repetitions: 1,
    case_ids: ['case-1'],
  };
  const generations = [
    { key: 'case-1|control|1', case_id: 'case-1', condition: 'control', status: 'success' },
    { key: 'case-1|skill|1', case_id: 'case-1', condition: 'skill', status: 'success' },
  ];
  const grades = [{
    key: 'case-1|control|1',
    condition: 'control',
    overall: 'pass',
    rubric_results: [{ id: 'F1', pass: true }],
  }];

  const summary = summarizeResults(evaluation, manifest, generations, grades);

  assert.equal(summary.condition_summary.skill.ungraded, 1);
  assert.equal(summary.cases[0].comparison, 'not-comparable');
});

test('buildMarkdownReport describes subset scope and actual repetitions', () => {
  const manifest = {
    created_at: '2026-09-05T00:00:00.000Z',
    eval_version: 'test',
    model: 'model',
    grader_model: 'actual-grader',
    reasoning_effort: 'low',
    conditions: ['control', 'skill'],
    repetitions: 2,
    case_ids: ['case-1'],
    planned_generations: 4,
    codex_home_isolated: true,
    skill_sha256: 'hash',
  };
  const expandedEvaluation = {
    ...evaluation,
    cases: [...evaluation.cases, { ...evaluation.cases[0], id: 'case-2' }],
  };
  const summary = {
    condition_summary: {
      control: { planned: 2, graded: 2, ungraded: 0, pass: 0, generation_errors: 0 },
      skill: { planned: 2, graded: 2, ungraded: 0, pass: 2, generation_errors: 0 },
    },
    comparison_summary: { improved: 1, same: 0, regressed: 0, not_comparable: 0 },
    rubric_summary: {
      control: { F1: { pass: 0, total: 2 } },
      skill: { F1: { pass: 2, total: 2 } },
    },
    cases: [{
      case_id: 'case-1',
      type: 'write',
      rubrics: ['F1'],
      conditions: {
        control: { pass: 0, fail: 2, error: 0, ungraded: 0 },
        skill: { pass: 2, fail: 0, error: 0, ungraded: 0 },
      },
      comparison: 'improved',
    }],
  };

  const report = buildMarkdownReport(expandedEvaluation, manifest, summary, []);

  assert.match(report, /^# ReferyTale 比較評価 — model/m);
  assert.match(report, /各条件・各ケース2回実行した評価/);
  assert.match(report, /今回の1ケース内の差/);
  assert.match(report, /隔離`CODEX_HOME`/);
  assert.match(report, /採点は`actual-grader`の別セッション/);
  assert.doesNotMatch(report, /28ケース/);
  assert.match(report, /一般化できない\n$/);
  assert.doesNotMatch(report, /\n\n$/);
});

test('buildMarkdownReport discloses a non-isolated CODEX_HOME', () => {
  const manifest = {
    created_at: '2026-09-05T00:00:00.000Z',
    eval_version: 'test',
    model: 'model',
    grader_model: 'grader',
    reasoning_effort: 'low',
    conditions: ['control', 'skill'],
    repetitions: 1,
    case_ids: ['case-1'],
    planned_generations: 2,
    codex_home_isolated: false,
    skill_sha256: 'hash',
  };
  const summary = {
    condition_summary: {
      control: { planned: 1, graded: 1, ungraded: 0, pass: 1, generation_errors: 0 },
      skill: { planned: 1, graded: 1, ungraded: 0, pass: 1, generation_errors: 0 },
    },
    comparison_summary: { improved: 0, same: 1, regressed: 0, not_comparable: 0 },
    rubric_summary: {
      control: { F1: { pass: 1, total: 1 } },
      skill: { F1: { pass: 1, total: 1 } },
    },
    cases: [{
      case_id: 'case-1',
      type: 'write',
      rubrics: ['F1'],
      conditions: {
        control: { pass: 1, fail: 0, error: 0, ungraded: 0 },
        skill: { pass: 1, fail: 0, error: 0, ungraded: 0 },
      },
      comparison: 'same',
    }],
  };

  const report = buildMarkdownReport(evaluation, manifest, summary, []);

  assert.match(report, /通常の`CODEX_HOME`を継承/);
  assert.match(report, /ユーザー設定やユーザー指示が結果へ影響した可能性/);
});
