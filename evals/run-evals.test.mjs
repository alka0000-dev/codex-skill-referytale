import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildMarkdownReport,
  buildEvaluationSnapshot,
  buildGenerationPlan,
  compareSnapshots,
  parseArguments,
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

  const errors = validateEvaluation(invalid);

  assert.ok(errors.some((error) => error.includes('Duplicate case ID')));
  assert.ok(errors.some((error) => error.includes('unknown rubric missing')));
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

test('buildMarkdownReport describes subset scope and actual repetitions', () => {
  const manifest = {
    created_at: '2026-09-05T00:00:00.000Z',
    eval_version: 'test',
    model: 'model',
    grader_model: 'grader',
    reasoning_effort: 'low',
    conditions: ['control', 'skill'],
    repetitions: 2,
    case_ids: ['case-1'],
    planned_generations: 4,
    skill_sha256: 'hash',
  };
  const expandedEvaluation = {
    ...evaluation,
    cases: [...evaluation.cases, { ...evaluation.cases[0], id: 'case-2' }],
  };
  const summary = {
    condition_summary: {
      control: { graded: 2, pass: 0, generation_errors: 0 },
      skill: { graded: 2, pass: 2, generation_errors: 0 },
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
  assert.doesNotMatch(report, /28ケース/);
});
