#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { spawn, spawnSync } from 'node:child_process';
import {
  access,
  appendFile,
  cp,
  link,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { isDeepStrictEqual } from 'node:util';

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const EVALS_DIRECTORY = path.dirname(SCRIPT_PATH);
const REPOSITORY_ROOT = path.dirname(EVALS_DIRECTORY);
const DEFAULT_MODEL = 'gpt-5.6-sol';
const CONDITIONS = new Set(['control', 'skill']);
const STAGES = new Set(['generate', 'grade', 'report', 'all']);
const REASONING_EFFORTS = new Set(['low', 'medium', 'high', 'xhigh']);
const HARNESS_VERSION = '6';
const FORCE_KILL_GRACE_MS = 1000;

const COMMON_AGENTS = `# Isolated evaluation workspace

- Follow the user request using only the instructions and files in this directory.
- Do not inspect parent directories, user-level skills, plugins, memories, or unrelated configuration.
- Do not search for an unavailable skill. Complete the request with the instructions that are present.
- Return only the finished content that can be shown directly to the user. Do not mention this harness, hidden analysis, or internal work notes.
`;

const GRADER_AGENTS = `# Isolated evaluation grader

- Judge only the supplied inputs, outputs, observable file changes, and rubric definitions.
- Do not inspect parent directories, user-level skills, plugins, memories, or unrelated configuration.
- Do not use external sources.
- Return only the JSON required by the supplied schema.
`;

function showHelp() {
  console.log(`Usage:
  node evals/run-evals.mjs [options]

Options:
  --stage <all|generate|grade|report>  Stage to run (default: all)
  --model <name>                       Generation model (default: ${DEFAULT_MODEL})
  --grader-model <name>                Grading model (default: generation model)
  --reasoning <effort>                 low, medium, high, or xhigh (default: low)
  --conditions <list>                  control,skill (default: both)
  --repetitions <n>                    Runs per case and condition (default: 1)
  --concurrency <n>                    Concurrent generation calls (default: 2, max: 8)
  --grader-batch-size <n>              Outputs per blind grading call (default: 8)
  --grader-retries <n>                 Retries after an invalid grading response (default: 1)
  --timeout-seconds <n>                Timeout for each Codex call (default: 600)
  --cases <id,id,...>                  Run only selected case IDs
  --output <directory>                 Result directory
  --resume                             Continue an existing result directory
  --keep-workspaces                    Keep isolated temporary workspaces
  --allow-user-codex-home              Use the normal CODEX_HOME; results may inherit user instructions
  --dry-run                            Validate and print the run plan without writing or calling Codex
  --help                               Show this help
`);
}

function parsePositiveInteger(value, optionName, maximum = Number.MAX_SAFE_INTEGER) {
  if (typeof value === 'string' && !/^[1-9]\d*$/u.test(value)) {
    throw new Error(`${optionName} must be an integer from 1 to ${maximum}.`);
  }

  const parsed = Number(value);

  if (!Number.isSafeInteger(parsed) || parsed < 1 || parsed > maximum) {
    throw new Error(`${optionName} must be an integer from 1 to ${maximum}.`);
  }

  return parsed;
}

function parseNonNegativeInteger(value, optionName, maximum = Number.MAX_SAFE_INTEGER) {
  if (typeof value === 'string' && !/^(?:0|[1-9]\d*)$/u.test(value)) {
    throw new Error(`${optionName} must be an integer from 0 to ${maximum}.`);
  }

  const parsed = Number(value);

  if (!Number.isSafeInteger(parsed) || parsed < 0 || parsed > maximum) {
    throw new Error(`${optionName} must be an integer from 0 to ${maximum}.`);
  }

  return parsed;
}

export function parseArguments(argv) {
  const today = new Date().toISOString().slice(0, 10);
  const options = {
    stage: 'all',
    model: DEFAULT_MODEL,
    graderModel: undefined,
    reasoning: 'low',
    conditions: ['control', 'skill'],
    repetitions: 1,
    concurrency: 2,
    graderBatchSize: 8,
    graderRetries: 1,
    timeoutSeconds: 600,
    cases: undefined,
    output: undefined,
    resume: false,
    keepWorkspaces: false,
    isolateCodexHome: true,
    dryRun: false,
    help: false,
    today,
  };

  const valueOptions = new Map([
    ['--stage', 'stage'],
    ['--model', 'model'],
    ['--grader-model', 'graderModel'],
    ['--reasoning', 'reasoning'],
    ['--conditions', 'conditions'],
    ['--repetitions', 'repetitions'],
    ['--concurrency', 'concurrency'],
    ['--grader-batch-size', 'graderBatchSize'],
    ['--grader-retries', 'graderRetries'],
    ['--timeout-seconds', 'timeoutSeconds'],
    ['--cases', 'cases'],
    ['--output', 'output'],
  ]);

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === '--resume') {
      options.resume = true;
      continue;
    }

    if (argument === '--keep-workspaces') {
      options.keepWorkspaces = true;
      continue;
    }

    if (argument === '--allow-user-codex-home') {
      options.isolateCodexHome = false;
      continue;
    }

    if (argument === '--dry-run') {
      options.dryRun = true;
      continue;
    }

    if (argument === '--help' || argument === '-h') {
      options.help = true;
      continue;
    }

    const optionKey = valueOptions.get(argument);
    if (!optionKey) {
      throw new Error(`Unknown option: ${argument}`);
    }

    const value = argv[index + 1];
    if (value === undefined || value.startsWith('--')) {
      throw new Error(`Missing value for ${argument}.`);
    }

    options[optionKey] = value;
    index += 1;
  }

  if (!STAGES.has(options.stage)) {
    throw new Error(`Unknown stage: ${options.stage}`);
  }

  if (!REASONING_EFFORTS.has(options.reasoning)) {
    throw new Error(`Unknown reasoning effort: ${options.reasoning}`);
  }

  options.conditions = Array.isArray(options.conditions)
    ? options.conditions
    : options.conditions.split(',').map((value) => value.trim()).filter(Boolean);

  if (options.conditions.length === 0 || options.conditions.some((value) => !CONDITIONS.has(value))) {
    throw new Error('--conditions must contain control, skill, or both.');
  }

  options.conditions = [...new Set(options.conditions)];
  options.repetitions = parsePositiveInteger(options.repetitions, '--repetitions', 20);
  options.concurrency = parsePositiveInteger(options.concurrency, '--concurrency', 8);
  options.graderBatchSize = parsePositiveInteger(options.graderBatchSize, '--grader-batch-size', 20);
  options.graderRetries = parseNonNegativeInteger(options.graderRetries, '--grader-retries', 5);
  options.timeoutSeconds = parsePositiveInteger(options.timeoutSeconds, '--timeout-seconds', 3600);
  options.cases = options.cases
    ? [...new Set(options.cases.split(',').map((value) => value.trim()).filter(Boolean))]
    : undefined;
  options.graderModel ??= options.model;
  options.output ??= path.join(
    EVALS_DIRECTORY,
    'results',
    `${today}-${sanitizePathSegment(options.model)}-full`,
  );
  options.output = path.resolve(options.output);

  return options;
}

export function validateEvaluation(evaluation) {
  const errors = [];

  if (!evaluation || typeof evaluation !== 'object') {
    return ['The evaluation file must contain a JSON object.'];
  }

  if (typeof evaluation.version !== 'string' || evaluation.version.length === 0) {
    errors.push('version must be a non-empty string.');
  }

  if (!evaluation.rubrics || typeof evaluation.rubrics !== 'object' || Array.isArray(evaluation.rubrics)) {
    errors.push('rubrics must be an object keyed by rubric ID.');
  }

  if (!Array.isArray(evaluation.cases) || evaluation.cases.length === 0) {
    errors.push('cases must be a non-empty array.');
    return errors;
  }

  const caseIds = new Set();
  const rubricIds = new Set(Object.keys(evaluation.rubrics ?? {}));

  for (const [index, evaluationCase] of evaluation.cases.entries()) {
    const label = evaluationCase?.id ?? `cases[${index}]`;

    if (!evaluationCase || typeof evaluationCase !== 'object') {
      errors.push(`cases[${index}] must be an object.`);
      continue;
    }

    if (typeof evaluationCase.id !== 'string' || evaluationCase.id.length === 0) {
      errors.push(`cases[${index}].id must be a non-empty string.`);
    } else if (caseIds.has(evaluationCase.id)) {
      errors.push(`Duplicate case ID: ${evaluationCase.id}`);
    } else {
      caseIds.add(evaluationCase.id);
    }

    if (typeof evaluationCase.input !== 'string' || evaluationCase.input.length === 0) {
      errors.push(`${label}.input must be a non-empty string.`);
    }

    if (!Array.isArray(evaluationCase.expected) || evaluationCase.expected.length === 0) {
      errors.push(`${label}.expected must be a non-empty array.`);
    }

    if (!Array.isArray(evaluationCase.rubric) || evaluationCase.rubric.length === 0) {
      errors.push(`${label}.rubric must contain at least one rubric ID.`);
    } else {
      for (const rubricId of evaluationCase.rubric) {
        if (!rubricIds.has(rubricId)) {
          errors.push(`${label} references unknown rubric ${rubricId}.`);
        }
      }
    }

    for (const fixtureFile of evaluationCase.fixture?.files ?? []) {
      if (!isSafeRelativePath(fixtureFile.path)) {
        errors.push(`${label} has an unsafe fixture path: ${fixtureFile.path}`);
      }
      if (typeof fixtureFile.content !== 'string') {
        errors.push(`${label} fixture content must be a string: ${fixtureFile.path}`);
      }
    }
  }

  return errors;
}

export function buildGenerationPlan(evaluation, options) {
  const selectedCases = options.cases
    ? evaluation.cases.filter((evaluationCase) => options.cases.includes(evaluationCase.id))
    : evaluation.cases;

  if (options.cases) {
    const selectedIds = new Set(selectedCases.map((evaluationCase) => evaluationCase.id));
    const missingIds = options.cases.filter((caseId) => !selectedIds.has(caseId));
    if (missingIds.length > 0) {
      throw new Error(`Unknown case IDs: ${missingIds.join(', ')}`);
    }
  }

  const plan = [];
  for (const evaluationCase of selectedCases) {
    for (const condition of options.conditions) {
      for (let repetition = 1; repetition <= options.repetitions; repetition += 1) {
        plan.push({
          key: `${evaluationCase.id}|${condition}|${repetition}`,
          caseId: evaluationCase.id,
          condition,
          repetition,
          evaluationCase,
        });
      }
    }
  }

  return plan;
}

function sanitizePathSegment(value) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '') || 'value';
}

function isSafeRelativePath(relativePath) {
  if (typeof relativePath !== 'string' || relativePath.length === 0 || path.isAbsolute(relativePath)) {
    return false;
  }

  const normalized = path.normalize(relativePath);
  return normalized !== '..' && !normalized.startsWith(`..${path.sep}`);
}

function resolveInside(root, relativePath) {
  if (!isSafeRelativePath(relativePath)) {
    throw new Error(`Unsafe relative path: ${relativePath}`);
  }

  const resolvedRoot = path.resolve(root);
  const resolvedPath = path.resolve(root, relativePath);
  const rootPrefix = `${resolvedRoot}${path.sep}`;

  if (resolvedPath !== resolvedRoot && !resolvedPath.startsWith(rootPrefix)) {
    throw new Error(`Path leaves the workspace: ${relativePath}`);
  }

  return resolvedPath;
}

function sha256(content) {
  return createHash('sha256').update(content).digest('hex');
}

async function fileExists(filePath) {
  try {
    await access(filePath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

export async function readJsonLines(filePath) {
  if (!(await fileExists(filePath))) {
    return [];
  }

  const content = await readFile(filePath, 'utf8');
  const lines = content.split(/\r?\n/u);
  const hasTerminatingLineBreak = content.endsWith('\n');
  const records = [];

  for (const [index, line] of lines.entries()) {
    if (line.trim().length === 0) {
      if (index === lines.length - 1 && !hasTerminatingLineBreak) {
        const lastLineBreak = content.lastIndexOf('\n');
        await writeFile(filePath, lastLineBreak >= 0 ? content.slice(0, lastLineBreak + 1) : '', 'utf8');
      }
      continue;
    }

    try {
      records.push(JSON.parse(line));
    } catch (error) {
      const isUnterminatedFinalRecord = index === lines.length - 1 && !hasTerminatingLineBreak;
      if (!isUnterminatedFinalRecord) {
        throw new Error(`Invalid JSONL at ${filePath}:${index + 1}: ${error.message}`);
      }

      const lastLineBreak = content.lastIndexOf('\n');
      await writeFile(filePath, lastLineBreak >= 0 ? content.slice(0, lastLineBreak + 1) : '', 'utf8');
    }
  }

  return records;
}

async function appendJsonLine(filePath, value) {
  await appendFile(filePath, `${JSON.stringify(value)}\n`, 'utf8');
}

async function prepareCodexEnvironment(temporaryRoot, options) {
  if (!options.isolateCodexHome) {
    return { environment: {}, authMode: 'user-codex-home' };
  }

  const isolatedHome = path.join(temporaryRoot, 'codex-home');
  await mkdir(isolatedHome, { recursive: true });

  if (process.env.CODEX_API_KEY) {
    return {
      environment: { CODEX_HOME: isolatedHome },
      authMode: 'process-api-key',
    };
  }

  const sourceHome = process.env.CODEX_HOME || path.join(homedir(), '.codex');
  const sourceAuth = path.join(sourceHome, 'auth.json');
  const targetAuth = path.join(isolatedHome, 'auth.json');
  if (!(await fileExists(sourceAuth))) {
    throw new Error(
      'An isolated CODEX_HOME requires process-scoped CODEX_API_KEY or an existing CODEX_HOME/auth.json.',
    );
  }

  try {
    await symlink(sourceAuth, targetAuth, 'file');
  } catch (symlinkError) {
    try {
      await link(sourceAuth, targetAuth);
    } catch (linkError) {
      throw new Error(
        `Could not link authentication into the isolated CODEX_HOME: ${symlinkError.message}; ${linkError.message}`,
      );
    }
  }

  return {
    environment: { CODEX_HOME: isolatedHome },
    authMode: 'linked-existing-auth',
  };
}

function terminateProcessTree(child, force) {
  if (!child.pid) {
    return;
  }

  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], {
      stdio: 'ignore',
      timeout: 5000,
      windowsHide: true,
    });
    child.kill('SIGKILL');
    return;
  }

  try {
    process.kill(-child.pid, force ? 'SIGKILL' : 'SIGTERM');
  } catch {
    child.kill(force ? 'SIGKILL' : 'SIGTERM');
  }
}

export function runProcess(command, args, { cwd, input, timeoutMs, environment = {} } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: { ...process.env, NO_COLOR: '1', ...environment },
      detached: process.platform !== 'win32',
      shell: false,
      windowsHide: true,
    });
    const stdoutChunks = [];
    const stderrChunks = [];
    let timedOut = false;
    let stdinError;
    let forceKillTimeout;

    const timeout = setTimeout(() => {
      timedOut = true;
      if (process.platform === 'win32') {
        terminateProcessTree(child, true);
        return;
      }

      terminateProcessTree(child, false);
      forceKillTimeout = setTimeout(
        () => terminateProcessTree(child, true),
        FORCE_KILL_GRACE_MS,
      );
    }, timeoutMs);

    child.stdout.on('data', (chunk) => stdoutChunks.push(chunk));
    child.stderr.on('data', (chunk) => stderrChunks.push(chunk));
    child.stdin.on('error', (error) => {
      stdinError ??= error;
    });
    child.on('error', (error) => {
      clearTimeout(timeout);
      clearTimeout(forceKillTimeout);
      reject(error);
    });
    child.on('close', (code, signal) => {
      clearTimeout(timeout);
      clearTimeout(forceKillTimeout);
      resolve({
        code,
        signal,
        timedOut,
        stdin_error: stdinError?.message,
        stdout: Buffer.concat(stdoutChunks).toString('utf8'),
        stderr: Buffer.concat(stderrChunks).toString('utf8'),
      });
    });

    try {
      if (input !== undefined) {
        child.stdin.write(input);
      }
      child.stdin.end();
    } catch (error) {
      stdinError ??= error;
      child.stdin.destroy();
    }
  });
}

function runLocalProcess(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    shell: false,
    windowsHide: true,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed: ${(result.stderr || result.stdout).trim()}`);
  }

  return result.stdout.trim();
}

function codexInvocation() {
  const configuredCommand = process.env.CODEX_BIN;

  if (process.platform !== 'win32') {
    return { command: configuredCommand || 'codex', prefixArguments: [] };
  }

  if (configuredCommand?.toLowerCase().endsWith('.exe')) {
    return { command: configuredCommand, prefixArguments: [] };
  }

  if (configuredCommand) {
    return {
      command: 'powershell.exe',
      prefixArguments: [
        '-NoProfile',
        '-NonInteractive',
        '-ExecutionPolicy',
        'Bypass',
        '-Command',
        '& { $commandPath = $args[0]; $remaining = @($args | Select-Object -Skip 1); & $commandPath @remaining; exit $LASTEXITCODE }',
        configuredCommand,
      ],
    };
  }

  return {
    command: 'powershell.exe',
    prefixArguments: [
      '-NoProfile',
      '-NonInteractive',
      '-ExecutionPolicy',
      'Bypass',
      '-Command',
      '& { $commandPath = (Get-Command codex -ErrorAction Stop).Source; & $commandPath @args; exit $LASTEXITCODE }',
    ],
  };
}

function baseCodexArguments({ model, reasoning, cwd, sandbox = 'workspace-write', outputSchema }) {
  const args = [
    'exec',
    '-C',
    cwd,
    '-m',
    model,
    '-c',
    `model_reasoning_effort="${reasoning}"`,
    '--enable',
    'skip_host_skill_discovery',
    '--disable',
    'skill_search',
    '--disable',
    'plugins',
    '--ephemeral',
    '--ignore-user-config',
    '--skip-git-repo-check',
    '--color',
    'never',
    '--json',
  ];

  if (sandbox === 'workspace-write') {
    args.push('--approve-for-me');
  } else {
    args.push('--sandbox', sandbox);
  }

  if (outputSchema) {
    args.push('--output-schema', outputSchema);
  }

  args.push('-');
  return args;
}

function parseCodexEvents(stdout) {
  let finalMessage;
  let usage;
  const errors = [];

  for (const line of stdout.split(/\r?\n/u)) {
    if (line.trim().length === 0) {
      continue;
    }

    let event;
    try {
      event = JSON.parse(line);
    } catch {
      errors.push(`Non-JSON stdout line: ${line.slice(0, 200)}`);
      continue;
    }

    if (event.type === 'item.completed' && event.item?.type === 'agent_message') {
      finalMessage = event.item.text;
    }

    if (event.type === 'turn.completed') {
      usage = event.usage;
    }

    if (event.type === 'turn.failed' || event.type === 'error') {
      errors.push(JSON.stringify(event));
    }
  }

  return { finalMessage, usage, errors };
}

async function listFilesRecursively(root, current = root) {
  const entries = await readdir(current, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === '.git') {
      continue;
    }

    const fullPath = path.join(current, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFilesRecursively(root, fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

async function snapshotWorkspace(root) {
  const snapshot = {};

  for (const filePath of await listFilesRecursively(root)) {
    const relativePath = path.relative(root, filePath).split(path.sep).join('/');
    const content = await readFile(filePath);
    snapshot[relativePath] = sha256(content);
  }

  return snapshot;
}

export function compareSnapshots(before, after) {
  const beforePaths = new Set(Object.keys(before));
  const afterPaths = new Set(Object.keys(after));
  const added = [...afterPaths].filter((filePath) => !beforePaths.has(filePath)).sort();
  const removed = [...beforePaths].filter((filePath) => !afterPaths.has(filePath)).sort();
  const modified = [...beforePaths]
    .filter((filePath) => afterPaths.has(filePath) && before[filePath] !== after[filePath])
    .sort();

  return { added, modified, removed };
}

export function buildEvaluationSnapshot(evaluation, caseIds) {
  const selectedIds = new Set(caseIds);
  const cases = evaluation.cases.filter((evaluationCase) => selectedIds.has(evaluationCase.id));
  const rubricIds = new Set(cases.flatMap((evaluationCase) => evaluationCase.rubric));
  const rubrics = Object.fromEntries(
    Object.entries(evaluation.rubrics).filter(([rubricId]) => rubricIds.has(rubricId)),
  );

  return {
    version: evaluation.version,
    rubrics,
    cases,
  };
}

async function prepareWorkspace(root, task, skillContent) {
  await mkdir(root, { recursive: true });

  const agentsContent = task.condition === 'skill'
    ? `${COMMON_AGENTS}\n# ReferyTale instructions\n\n${skillContent}`
    : COMMON_AGENTS;
  await writeFile(path.join(root, 'AGENTS.md'), agentsContent, 'utf8');

  if (task.condition === 'skill') {
    await cp(path.join(REPOSITORY_ROOT, 'references'), path.join(root, 'references'), { recursive: true });
  }

  for (const fixtureFile of task.evaluationCase.fixture?.files ?? []) {
    const targetPath = resolveInside(root, fixtureFile.path);
    await mkdir(path.dirname(targetPath), { recursive: true });
    await writeFile(targetPath, fixtureFile.content, 'utf8');
  }

  if (task.evaluationCase.fixture?.git_repo) {
    runLocalProcess('git', ['init', '--quiet'], root);
    runLocalProcess('git', ['config', 'user.name', 'ReferyTale Eval'], root);
    runLocalProcess('git', ['config', 'user.email', 'eval@example.invalid'], root);
    runLocalProcess('git', ['add', '--all'], root);
    runLocalProcess('git', ['commit', '--quiet', '-m', 'evaluation fixture'], root);
  }
}

async function captureFixtureFiles(root, evaluationCase) {
  return Promise.all((evaluationCase.fixture?.files ?? []).map(async (fixtureFile) => {
    const filePath = resolveInside(root, fixtureFile.path);
    let finalContent = null;

    try {
      finalContent = await readFile(filePath, 'utf8');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    return {
      path: fixtureFile.path,
      initial_content: fixtureFile.content,
      final_content: finalContent,
    };
  }));
}

function buildGenerationPrompt(evaluationCase) {
  const context = evaluationCase.context
    ? `\n## 補足コンテキスト\n\n${evaluationCase.context}\n`
    : '';

  return `${context}\n## ユーザーの依頼\n\n${evaluationCase.input}\n`;
}

function redactWorkspace(text, workspace) {
  if (!text) {
    return undefined;
  }

  const escapedWorkspace = workspace.replaceAll('\\', '\\\\');
  return text
    .replaceAll(workspace, '<workspace>')
    .replaceAll(escapedWorkspace, '<workspace>')
    .slice(-4000);
}

async function executeGeneration(task, options, temporaryRoot, skillContent, codexEnvironment) {
  const startedAt = new Date();
  const workspace = path.join(
    temporaryRoot,
    `${sanitizePathSegment(task.caseId)}-${task.condition}-${task.repetition}`,
  );

  await prepareWorkspace(workspace, task, skillContent);
  const before = await snapshotWorkspace(workspace);
  const prompt = buildGenerationPrompt(task.evaluationCase);
  const invocation = codexInvocation();
  const result = await runProcess(
    invocation.command,
    [...invocation.prefixArguments, ...baseCodexArguments({
      model: options.model,
      reasoning: options.reasoning,
      cwd: workspace,
    })],
    {
      cwd: workspace,
      input: prompt,
      timeoutMs: options.timeoutSeconds * 1000,
      environment: codexEnvironment,
    },
  );
  const parsed = parseCodexEvents(result.stdout);
  const after = await snapshotWorkspace(workspace);
  const changes = compareSnapshots(before, after);
  const fixtureFiles = await captureFixtureFiles(workspace, task.evaluationCase);
  const gitStatus = task.evaluationCase.fixture?.git_repo
    ? runLocalProcess('git', ['status', '--porcelain=v1', '--untracked-files=all'], workspace)
    : undefined;
  const finishedAt = new Date();
  const succeeded = result.code === 0
    && !result.timedOut
    && !result.stdin_error
    && typeof parsed.finalMessage === 'string';

  return {
    schema_version: 1,
    key: task.key,
    case_id: task.caseId,
    type: task.evaluationCase.type,
    condition: task.condition,
    repetition: task.repetition,
    status: succeeded ? 'success' : 'error',
    output: parsed.finalMessage,
    usage: parsed.usage,
    workspace_changes: changes,
    fixture_files: fixtureFiles,
    git_status: gitStatus,
    started_at: startedAt.toISOString(),
    finished_at: finishedAt.toISOString(),
    duration_ms: finishedAt.getTime() - startedAt.getTime(),
    error: succeeded
      ? undefined
      : {
          exit_code: result.code,
          signal: result.signal,
          timed_out: result.timedOut,
          stdin_error: result.stdin_error,
          events: parsed.errors,
          stderr_tail: redactWorkspace(result.stderr, workspace),
        },
  };
}

async function runPool(tasks, concurrency, worker, onResult) {
  let nextIndex = 0;

  async function runWorker() {
    while (true) {
      const currentIndex = nextIndex;
      nextIndex += 1;

      if (currentIndex >= tasks.length) {
        return;
      }

      const value = await worker(tasks[currentIndex], currentIndex);
      await onResult(value, currentIndex);
    }
  }

  const results = await Promise.allSettled(
    Array.from({ length: Math.min(concurrency, tasks.length) }, () => runWorker()),
  );
  const failedWorker = results.find((result) => result.status === 'rejected');
  if (failedWorker) {
    throw failedWorker.reason;
  }
}

function latestRecordsByKey(records, keyName = 'key') {
  const latest = new Map();
  for (const record of records) {
    latest.set(record[keyName], record);
  }
  return latest;
}

async function createManifest(evaluation, options, plan) {
  const skillContent = await readFile(path.join(REPOSITORY_ROOT, 'SKILL.md'));
  const referenceFiles = await listFilesRecursively(path.join(REPOSITORY_ROOT, 'references'));
  const referenceHashes = {};

  for (const referencePath of referenceFiles.sort()) {
    const relativePath = path.relative(REPOSITORY_ROOT, referencePath).split(path.sep).join('/');
    referenceHashes[relativePath] = sha256(await readFile(referencePath));
  }

  const caseIds = [...new Set(plan.map((task) => task.caseId))];
  const evaluationSnapshot = buildEvaluationSnapshot(evaluation, caseIds);
  const evaluationSnapshotContent = `${JSON.stringify(evaluationSnapshot, null, 2)}\n`;

  let gitCommit;
  let gitDirty;
  try {
    gitCommit = runLocalProcess(
      'git',
      ['-c', `safe.directory=${REPOSITORY_ROOT.split(path.sep).join('/')}`, 'rev-parse', 'HEAD'],
      REPOSITORY_ROOT,
    );
    gitDirty = runLocalProcess(
      'git',
      ['-c', `safe.directory=${REPOSITORY_ROOT.split(path.sep).join('/')}`, 'status', '--porcelain=v1', '--untracked-files=all'],
      REPOSITORY_ROOT,
    ).length > 0;
  } catch {
    gitCommit = undefined;
    gitDirty = undefined;
  }

  let cliVersion;
  try {
    const invocation = codexInvocation();
    cliVersion = runLocalProcess(
      invocation.command,
      [...invocation.prefixArguments, '--version'],
      REPOSITORY_ROOT,
    );
  } catch {
    cliVersion = undefined;
  }

  return {
    schema_version: 1,
    run_id: sha256(`${new Date().toISOString()}|${options.model}|${plan.length}`).slice(0, 16),
    created_at: new Date().toISOString(),
    harness_version: HARNESS_VERSION,
    eval_version: evaluation.version,
    eval_file: 'evals/evals.json',
    case_ids: caseIds,
    model: options.model,
    grader_model: options.graderModel,
    reasoning_effort: options.reasoning,
    conditions: options.conditions,
    repetitions: options.repetitions,
    planned_generations: plan.length,
    concurrency: options.concurrency,
    grader_batch_size: options.graderBatchSize,
    grader_retries: options.graderRetries,
    timeout_seconds: options.timeoutSeconds,
    codex_home_isolated: options.isolateCodexHome,
    codex_cli_version: cliVersion,
    git_commit: gitCommit,
    git_dirty_at_start: gitDirty,
    runner_sha256: sha256(await readFile(SCRIPT_PATH, 'utf8')),
    skill_sha256: sha256(skillContent),
    reference_sha256: referenceHashes,
    evaluation_snapshot_file: 'evaluation.json',
    evaluation_snapshot_sha256: sha256(evaluationSnapshotContent),
  };
}

async function runGenerationStage(evaluation, options, plan, outputDirectory, manifest) {
  const generationPath = path.join(outputDirectory, 'generations.jsonl');
  const previousRecords = await readJsonLines(generationPath);
  const previousByKey = latestRecordsByKey(previousRecords);
  const remainingTasks = plan.filter((task) => previousByKey.get(task.key)?.status !== 'success');
  let completed = plan.length - remainingTasks.length;

  if (remainingTasks.length === 0) {
    console.log('Generation stage already complete.');
  } else {
    const skillContent = await readFile(path.join(REPOSITORY_ROOT, 'SKILL.md'), 'utf8');
    const temporaryRoot = await mkdtemp(path.join(tmpdir(), 'referytale-eval-'));
    const codexRuntime = await prepareCodexEnvironment(temporaryRoot, options);
    manifest.authentication_mode = codexRuntime.authMode;
    console.log(`Generating ${remainingTasks.length} outputs (${completed}/${plan.length} already complete).`);

    try {
      await runPool(
        remainingTasks,
        options.concurrency,
        (task) => executeGeneration(
          task,
          options,
          temporaryRoot,
          skillContent,
          codexRuntime.environment,
        ),
        async (record) => {
          await appendJsonLine(generationPath, record);
          completed += 1;
          const seconds = (record.duration_ms / 1000).toFixed(1);
          console.log(
            `[${completed}/${plan.length}] ${record.status.toUpperCase()} ${record.condition} ${record.case_id} #${record.repetition} (${seconds}s)`,
          );
        },
      );
    } finally {
      if (options.keepWorkspaces) {
        console.log(`Workspaces kept at ${temporaryRoot}`);
      } else {
        const resolvedTemporaryRoot = path.resolve(temporaryRoot);
        const resolvedSystemTemp = path.resolve(tmpdir());
        if (resolvedTemporaryRoot.startsWith(`${resolvedSystemTemp}${path.sep}`)) {
          await rm(resolvedTemporaryRoot, {
            recursive: true,
            force: true,
            maxRetries: 5,
            retryDelay: 100,
          });
        }
      }
    }
  }

  const finalRecords = latestRecordsByKey(await readJsonLines(generationPath));
  manifest.generation_completed_at = new Date().toISOString();
  manifest.generation_successes = [...finalRecords.values()].filter((record) => record.status === 'success').length;
  manifest.generation_errors = [...finalRecords.values()].filter((record) => record.status !== 'success').length;
  await writeFile(path.join(outputDirectory, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

function graderSchema() {
  return {
    type: 'object',
    properties: {
      results: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            sample_id: { type: 'string' },
            rubric_results: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  pass: { type: 'boolean' },
                  reason: { type: 'string' },
                },
                required: ['id', 'pass', 'reason'],
                additionalProperties: false,
              },
            },
            overall: { type: 'string', enum: ['pass', 'fail'] },
            reason: { type: 'string' },
          },
          required: ['sample_id', 'rubric_results', 'overall', 'reason'],
          additionalProperties: false,
        },
      },
    },
    required: ['results'],
    additionalProperties: false,
  };
}

function blindId(runId, key) {
  return `sample-${sha256(`${runId}|${key}`).slice(0, 12)}`;
}

export function buildGraderPrompt(evaluation, samples) {
  const payload = {
    rubrics: evaluation.rubrics,
    samples: samples.map((sample) => ({
      sample_id: sample.blindId,
      type: sample.evaluationCase.type,
      context: sample.evaluationCase.context,
      input: sample.evaluationCase.input,
      expected: sample.evaluationCase.expected,
      must_not: sample.evaluationCase.must_not ?? [],
      rubric_ids: sample.evaluationCase.rubric,
      output: sample.generation.output,
      workspace_changes: sample.generation.workspace_changes,
      fixture_files: sample.generation.fixture_files ?? [],
      git_status: sample.generation.git_status,
    })),
  };

  return `あなたは日本語文章Skillの実行結果を判定する独立採点者です。条件名は伏せられています。各sampleを互いに独立して判定してください。

判定規則:
- 指定されたrubric_idsだけを判定し、各rubricを一度ずつ返す。
- expectedを満たし、must_notに意味上該当せず、指定rubricをすべて満たす場合だけoverallをpassにする。
- 入力から必然的に導ける普通の言い換えは許可する。
- 常識的に予測できる後続行動や結果は、入力から必然的に導ける言い換えには含めない。
- 否定文は否定される内容を、対比文は対比の両側と判断軸を個別に判定する。否定形や「AではなくB」でも、材料にない命題を持ち込めばF1またはM1を不合格にする。
- 個人の事例を一般法則へ広げる、曖昧な内容を具体化する、新しい事実・感情・原因・助言・発言を足す場合は、該当するF1またはM1を不合格にする。
- 明示的な命名依頼と明示的なフィクションでは新語を許可する。ただし依頼元の主体、動作、原因、順序、結果を変えてはならない。
- N1では対象外の依頼そのものを完了できたか、文章改善用Skillの内部手順や余計な説明を持ち込んでいないかを見る。
- A1ではworkspace_changesとgit_statusを使い、最終状態の副作用を判定する。
- 内部工程は出力から推測しない。観察できない工程名だけを理由に不合格にしない。
- 文体上の好みは、指定rubricに反しない限り不合格理由にしない。
- 結果は指定されたJSON Schemaだけで返す。

評価対象:
${JSON.stringify(payload)}
`;
}

function validateGraderResponse(parsedResponse, samples) {
  if (!parsedResponse || !Array.isArray(parsedResponse.results)) {
    throw new Error('Grader response does not contain a results array.');
  }

  const expectedSamples = new Map(samples.map((sample) => [sample.blindId, sample]));
  const seenSamples = new Set();

  for (const result of parsedResponse.results) {
    const sample = expectedSamples.get(result.sample_id);
    if (!sample) {
      throw new Error(`Grader returned an unknown sample ID: ${result.sample_id}`);
    }
    if (seenSamples.has(result.sample_id)) {
      throw new Error(`Grader returned duplicate sample ID: ${result.sample_id}`);
    }
    seenSamples.add(result.sample_id);

    const expectedRubrics = [...sample.evaluationCase.rubric].sort();
    const actualRubrics = result.rubric_results.map((rubric) => rubric.id).sort();
    if (JSON.stringify(expectedRubrics) !== JSON.stringify(actualRubrics)) {
      throw new Error(`Rubric mismatch for ${result.sample_id}.`);
    }

    const expectedOverall = result.rubric_results.every((rubric) => rubric.pass) ? 'pass' : 'fail';
    if (result.overall !== expectedOverall) {
      throw new Error(`Overall result is inconsistent for ${result.sample_id}.`);
    }
  }

  if (seenSamples.size !== samples.length) {
    throw new Error(`Grader returned ${seenSamples.size} of ${samples.length} samples.`);
  }
}

export async function executeGraderBatch(
  evaluation,
  samples,
  options,
  temporaryRoot,
  batchIndex,
  codexEnvironment,
  services = {},
) {
  const batchDirectory = path.join(temporaryRoot, `batch-${batchIndex + 1}`);
  await mkdir(batchDirectory, { recursive: true });
  await writeFile(path.join(batchDirectory, 'AGENTS.md'), GRADER_AGENTS, 'utf8');
  const schemaPath = path.join(batchDirectory, 'schema.json');
  await writeFile(schemaPath, `${JSON.stringify(graderSchema(), null, 2)}\n`, 'utf8');
  const prompt = buildGraderPrompt(evaluation, samples);
  let lastError;
  const executeProcess = services.runProcess ?? runProcess;
  const onAttempt = services.onAttempt ?? (async () => {});

  for (let attempt = 1; attempt <= options.graderRetries + 1; attempt += 1) {
    const startedAt = new Date();
    const batchId = services.allocateBatchId?.() ?? `batch-${batchIndex + 1}-attempt-${attempt}`;
    let parsedEvents;
    let parsedResponse;
    let attemptRecord;

    try {
      const invocation = codexInvocation();
      const result = await executeProcess(
        invocation.command,
        [...invocation.prefixArguments, ...baseCodexArguments({
          model: options.graderModel,
          reasoning: options.reasoning,
          cwd: batchDirectory,
          sandbox: 'read-only',
          outputSchema: schemaPath,
        })],
        {
          cwd: batchDirectory,
          input: prompt,
          timeoutMs: options.timeoutSeconds * 1000,
          environment: codexEnvironment,
        },
      );
      parsedEvents = parseCodexEvents(result.stdout);
      if (result.code !== 0 || result.timedOut || result.stdin_error || !parsedEvents.finalMessage) {
        throw new Error(
          `Codex grading call failed with exit ${result.code}, timeout=${result.timedOut}, stdin=${result.stdin_error ?? 'ok'}: ${result.stderr.slice(-1000)}`,
        );
      }

      parsedResponse = JSON.parse(parsedEvents.finalMessage);
      validateGraderResponse(parsedResponse, samples);
      const finishedAt = new Date();
      attemptRecord = {
        batch_id: batchId,
        attempt,
        status: 'success',
        started_at: startedAt.toISOString(),
        finished_at: finishedAt.toISOString(),
        duration_ms: finishedAt.getTime() - startedAt.getTime(),
        usage: parsedEvents.usage,
      };
    } catch (error) {
      lastError = error;
      const finishedAt = new Date();
      await onAttempt({
        batch_id: batchId,
        attempt,
        status: 'error',
        started_at: startedAt.toISOString(),
        finished_at: finishedAt.toISOString(),
        duration_ms: finishedAt.getTime() - startedAt.getTime(),
        usage: parsedEvents?.usage,
        error: error instanceof Error ? error.message : String(error),
      });
      continue;
    }

    await onAttempt(attemptRecord);
    return { ...attemptRecord, response: parsedResponse };
  }

  throw new Error(`Grader batch ${batchIndex + 1} failed: ${lastError?.message}`);
}

export function nextGradingBatchNumber(records) {
  const maximum = records.reduce((currentMaximum, record) => {
    const match = /^batch-(\d+)$/u.exec(record.batch_id ?? '');
    return match ? Math.max(currentMaximum, Number(match[1])) : currentMaximum;
  }, 0);
  return maximum + 1;
}

function chunk(values, size) {
  const chunks = [];
  for (let index = 0; index < values.length; index += size) {
    chunks.push(values.slice(index, index + size));
  }
  return chunks;
}

export async function runGradingStage(evaluation, options, outputDirectory, manifest) {
  const generationPath = path.join(outputDirectory, 'generations.jsonl');
  const gradingPath = path.join(outputDirectory, 'grading.jsonl');
  const gradingBatchPath = path.join(outputDirectory, 'grading-batches.jsonl');
  const generationByKey = latestRecordsByKey(await readJsonLines(generationPath));
  const previousGrades = latestRecordsByKey(await readJsonLines(gradingPath), 'key');
  const previousBatchRecords = await readJsonLines(gradingBatchPath);
  const caseById = new Map(evaluation.cases.map((evaluationCase) => [evaluationCase.id, evaluationCase]));
  const samples = [...generationByKey.values()]
    .filter((generation) => generation.status === 'success' && !previousGrades.has(generation.key))
    .map((generation) => ({
      key: generation.key,
      blindId: blindId(manifest.run_id, generation.key),
      generation,
      evaluationCase: caseById.get(generation.case_id),
    }))
    .sort((left, right) => left.blindId.localeCompare(right.blindId));

  if (samples.length === 0) {
    console.log('Grading stage already complete.');
    const finalGrades = latestRecordsByKey(await readJsonLines(gradingPath));
    manifest.grading_completed_at = new Date().toISOString();
    manifest.graded_outputs = finalGrades.size;
    await writeFile(path.join(outputDirectory, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
    return;
  }

  const batches = chunk(samples, options.graderBatchSize);
  const temporaryRoot = await mkdtemp(path.join(tmpdir(), 'referytale-grader-'));
  const codexRuntime = await prepareCodexEnvironment(temporaryRoot, options);
  manifest.grader_authentication_mode = codexRuntime.authMode;
  console.log(`Grading ${samples.length} outputs in ${batches.length} blind batches.`);
  let nextBatchNumber = nextGradingBatchNumber(previousBatchRecords);

  try {
    for (const [batchIndex, batch] of batches.entries()) {
      const batchResult = await executeGraderBatch(
        evaluation,
        batch,
        options,
        temporaryRoot,
        batchIndex,
        codexRuntime.environment,
        {
          allocateBatchId: () => `batch-${nextBatchNumber++}`,
          onAttempt: async (attemptRecord) => appendJsonLine(gradingBatchPath, {
            schema_version: 1,
            ...attemptRecord,
            sample_ids: batch.map((sample) => sample.blindId),
          }),
        },
      );

      const resultByBlindId = new Map(
        batchResult.response.results.map((result) => [result.sample_id, result]),
      );
      for (const sample of batch) {
        const judgment = resultByBlindId.get(sample.blindId);
        await appendJsonLine(gradingPath, {
          schema_version: 1,
          key: sample.key,
          blind_id: sample.blindId,
          case_id: sample.generation.case_id,
          condition: sample.generation.condition,
          repetition: sample.generation.repetition,
          rubric_results: judgment.rubric_results,
          overall: judgment.overall,
          reason: judgment.reason,
          grader_batch_id: batchResult.batch_id,
        });
      }
      console.log(`[${batchIndex + 1}/${batches.length}] GRADED ${batch.length} outputs`);
    }
  } finally {
    if (options.keepWorkspaces) {
      console.log(`Grader workspaces kept at ${temporaryRoot}`);
    } else {
      const resolvedTemporaryRoot = path.resolve(temporaryRoot);
      const resolvedSystemTemp = path.resolve(tmpdir());
      if (resolvedTemporaryRoot.startsWith(`${resolvedSystemTemp}${path.sep}`)) {
        await rm(resolvedTemporaryRoot, {
          recursive: true,
          force: true,
          maxRetries: 5,
          retryDelay: 100,
        });
      }
    }
  }

  const finalGrades = latestRecordsByKey(await readJsonLines(gradingPath));
  manifest.grading_completed_at = new Date().toISOString();
  manifest.graded_outputs = finalGrades.size;
  await writeFile(path.join(outputDirectory, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

function percentage(numerator, denominator) {
  return denominator === 0 ? 0 : (numerator / denominator) * 100;
}

function formatRate(pass, total) {
  return `${pass}/${total} (${percentage(pass, total).toFixed(2)}%)`;
}

function statusFor(generation, grade) {
  if (!generation) {
    return 'missing';
  }
  if (generation.status !== 'success') {
    return 'error';
  }
  return grade?.overall ?? 'ungraded';
}

export function summarizeResults(evaluation, manifest, generationRecords, gradeRecords) {
  const generationByKey = latestRecordsByKey(generationRecords);
  const gradeByKey = latestRecordsByKey(gradeRecords);
  const conditionSummary = {};
  const rubricSummary = {};

  for (const condition of manifest.conditions) {
    const generations = [...generationByKey.values()].filter((record) => record.condition === condition);
    const grades = [...gradeByKey.values()].filter((record) => record.condition === condition);
    const planned = manifest.case_ids.length * manifest.repetitions;
    const attempted = generations.length;
    const generated = generations.filter((record) => record.status === 'success').length;
    const generationErrors = generations.filter((record) => record.status !== 'success').length;
    const pass = grades.filter((record) => record.overall === 'pass').length;
    const fail = grades.filter((record) => record.overall === 'fail').length;
    conditionSummary[condition] = {
      planned,
      attempted,
      generated,
      generation_errors: generationErrors,
      missing_generations: Math.max(0, planned - attempted),
      graded: pass + fail,
      ungraded: Math.max(0, generated - pass - fail),
      pass,
      fail,
    };
    rubricSummary[condition] = {};

    for (const rubricId of Object.keys(evaluation.rubrics)) {
      const rubricResults = grades.flatMap((record) => record.rubric_results)
        .filter((result) => result.id === rubricId);
      if (rubricResults.length > 0) {
        rubricSummary[condition][rubricId] = {
          pass: rubricResults.filter((result) => result.pass).length,
          total: rubricResults.length,
        };
      }
    }
  }

  const cases = [];
  for (const caseId of manifest.case_ids) {
    const evaluationCase = evaluation.cases.find((candidate) => candidate.id === caseId);
    const conditions = {};
    for (const condition of manifest.conditions) {
      let pass = 0;
      let fail = 0;
      let error = 0;
      let missing = 0;
      let ungraded = 0;
      for (let repetition = 1; repetition <= manifest.repetitions; repetition += 1) {
        const key = `${caseId}|${condition}|${repetition}`;
        const status = statusFor(generationByKey.get(key), gradeByKey.get(key));
        if (status === 'pass') pass += 1;
        else if (status === 'fail') fail += 1;
        else if (status === 'error') error += 1;
        else if (status === 'missing') missing += 1;
        else ungraded += 1;
      }
      conditions[condition] = { pass, fail, error, missing, ungraded };
    }

    let comparison = 'not-comparable';
    if (conditions.control && conditions.skill) {
      const controlAttempts = conditions.control.pass + conditions.control.fail + conditions.control.error;
      const skillAttempts = conditions.skill.pass + conditions.skill.fail + conditions.skill.error;
      if (
        controlAttempts > 0
        && skillAttempts > 0
        && conditions.control.missing === 0
        && conditions.skill.missing === 0
        && conditions.control.ungraded === 0
        && conditions.skill.ungraded === 0
      ) {
        const controlRate = conditions.control.pass / controlAttempts;
        const skillRate = conditions.skill.pass / skillAttempts;
        comparison = skillRate > controlRate
          ? 'improved'
          : skillRate < controlRate
            ? 'regressed'
            : 'same';
      }
    }

    cases.push({
      case_id: caseId,
      type: evaluationCase.type,
      rubrics: evaluationCase.rubric,
      conditions,
      comparison,
    });
  }

  const comparisonSummary = {
    improved: cases.filter((item) => item.comparison === 'improved').length,
    same: cases.filter((item) => item.comparison === 'same').length,
    regressed: cases.filter((item) => item.comparison === 'regressed').length,
    not_comparable: cases.filter((item) => item.comparison === 'not-comparable').length,
  };

  return {
    schema_version: 1,
    eval_version: manifest.eval_version,
    model: manifest.model,
    grader_model: manifest.grader_model,
    reasoning_effort: manifest.reasoning_effort,
    condition_summary: conditionSummary,
    rubric_summary: rubricSummary,
    comparison_summary: comparisonSummary,
    cases,
  };
}

function conditionLabel(condition) {
  return condition === 'skill' ? 'Skillあり' : 'Skillなし';
}

function formatCaseCondition(value) {
  const error = value.error ?? 0;
  const missing = value.missing ?? 0;
  const ungraded = value.ungraded ?? 0;
  const suffix = [];
  if (error > 0) suffix.push(`error ${error}`);
  if (missing > 0) suffix.push(`missing ${missing}`);
  if (ungraded > 0) suffix.push(`ungraded ${ungraded}`);
  const main = `${value.pass}/${value.pass + value.fail + error + missing + ungraded}`;
  return suffix.length > 0 ? `${main}; ${suffix.join(', ')}` : main;
}

function generationMethodDescription(manifest) {
  const environment = manifest.codex_home_isolated
    ? '各生成は別の一時作業フォルダと隔離`CODEX_HOME`で実行した。端末にインストール済みのSkill探索、Skill検索、プラグイン、ユーザー設定は無効化した。'
    : '各生成は別の一時作業フォルダで実行したが、通常の`CODEX_HOME`を継承した。ユーザー設定やユーザー指示が結果へ影響した可能性がある。';
  const hasControl = manifest.conditions.includes('control');
  const hasSkill = manifest.conditions.includes('skill');
  let conditions;

  if (hasControl && hasSkill) {
    conditions = '両条件へ同じ共通指示、モデル、reasoning effort、入力、fixtureを与え、Skillあり条件だけに現行の`SKILL.md`と`references/`を追加した。';
  } else if (hasSkill) {
    conditions = 'Skillあり条件だけを実行し、共通指示、モデル、reasoning effort、入力、fixtureに加えて、現行の`SKILL.md`と`references/`を配置した。';
  } else {
    conditions = 'Skillなし条件だけを実行し、共通指示、モデル、reasoning effort、入力、fixtureを与え、`SKILL.md`と`references/`は配置しなかった。';
  }

  return `${environment}${conditions}`;
}

export function buildMarkdownReport(evaluation, manifest, summary, gradeRecords) {
  const control = summary.condition_summary.control;
  const skill = summary.condition_summary.skill;
  const isPaired = Boolean(control && skill);
  const effect = isPaired
    && (control.missing_generations ?? 0) === 0
    && (skill.missing_generations ?? 0) === 0
    && control.ungraded === 0
    && skill.ungraded === 0
    ? percentage(skill.pass, skill.planned) - percentage(control.pass, control.planned)
    : undefined;
  const isFullEvaluation = manifest.case_ids.length === evaluation.cases.length;
  const reportScope = `${isFullEvaluation ? '全件' : ''}${isPaired ? '比較評価' : '単一条件評価'}`;
  const missingGenerationCount = Object.values(summary.condition_summary)
    .reduce((total, condition) => total + (condition.missing_generations ?? 0), 0);
  const gitState = manifest.git_commit === undefined
    || typeof manifest.git_dirty_at_start !== 'boolean'
    ? '`取得不能`（状態不明）'
    : `\`${manifest.git_commit}\`（${manifest.git_dirty_at_start ? '未コミット変更あり' : 'クリーン'}）`;
  const lines = [
    `# ReferyTale ${reportScope} — ${manifest.model}`,
    '',
    `- 実施日時: ${manifest.created_at}`,
    `- 生成モデル: \`${manifest.model}\``,
    `- 採点モデル: \`${manifest.grader_model}\`（条件名を伏せた別セッション）`,
    `- reasoning effort: \`${manifest.reasoning_effort}\``,
    `- eval定義: \`evals.json\` version \`${manifest.eval_version}\``,
    `- 対象ケース: ${manifest.case_ids.length}件`,
    `- 実行回数: ${isPaired ? '各条件' : conditionLabel(manifest.conditions[0])}・各ケース${manifest.repetitions}回、計${manifest.planned_generations}出力`,
    `- 対象Git状態: ${gitState}`,
    `- Skill SHA-256: \`${manifest.skill_sha256}\``,
    `- Codex CLI: \`${manifest.codex_cli_version ?? '取得不能'}\``,
    '',
    '## 結果',
    '',
  ];

  if (missingGenerationCount > 0) {
    lines.push(`- 実行状態: 未完了（未生成${missingGenerationCount}件）`);
  }

  if (control) {
    lines.push(`- Skillなし: ${formatRate(control.pass, control.planned)}、生成エラー${control.generation_errors}件、未生成${control.missing_generations ?? 0}件、未採点${control.ungraded}件`);
  }
  if (skill) {
    lines.push(`- Skillあり: ${formatRate(skill.pass, skill.planned)}、生成エラー${skill.generation_errors}件、未生成${skill.missing_generations ?? 0}件、未採点${skill.ungraded}件`);
  }
  if (effect !== undefined) {
    const sign = effect > 0 ? '+' : '';
    lines.push(`- 合格率差: ${sign}${effect.toFixed(2)}ポイント`);
  }

  if (isPaired) {
    lines.push(`- ケース比較: 改善${summary.comparison_summary.improved}、同等${summary.comparison_summary.same}、悪化${summary.comparison_summary.regressed}、比較不能${summary.comparison_summary.not_comparable}`);
  } else {
    lines.push('- ケース比較: 単一条件のため算出しない');
  }

  const conditionHeaders = manifest.conditions.map(conditionLabel);
  lines.push(
    '',
    `| ケース | 種別 | rubric | ${conditionHeaders.join(' | ')}${isPaired ? ' | 比較' : ''} |`,
    `|---|---|---|${manifest.conditions.map(() => '---:|').join('')}${isPaired ? '---|' : ''}`,
  );

  for (const item of summary.cases) {
    const conditionCells = manifest.conditions.map((condition) => formatCaseCondition(item.conditions[condition]));
    lines.push(
      `| ${item.case_id} | ${item.type} | ${item.rubrics.join(', ')} | ${conditionCells.join(' | ')}${isPaired ? ` | ${item.comparison}` : ''} |`,
    );
  }

  lines.push('', '## rubric別', '');
  const rubricHeader = `| rubric | ${manifest.conditions.map(conditionLabel).join(' | ')} |`;
  const rubricSeparator = `|---|${manifest.conditions.map(() => '---:').join('|')}|`;
  lines.push(rubricHeader, rubricSeparator);
  for (const [rubricId, rubric] of Object.entries(evaluation.rubrics)) {
    const cells = manifest.conditions.map((condition) => {
      const value = summary.rubric_summary[condition]?.[rubricId];
      return value ? formatRate(value.pass, value.total) : '—';
    });
    lines.push(`| ${rubricId} — ${rubric.name} | ${cells.join(' | ')} |`);
  }

  const failures = gradeRecords
    .filter((record) => record.overall === 'fail')
    .sort((left, right) => left.key.localeCompare(right.key));
  lines.push('', '## 不合格の内訳', '');
  if (failures.length === 0) {
    lines.push('不合格はなかった。');
  } else {
    for (const failure of failures) {
      const failedRubrics = failure.rubric_results
        .filter((result) => !result.pass)
        .map((result) => `${result.id}: ${result.reason}`)
        .join(' / ');
      lines.push(`- ${failure.case_id} — ${conditionLabel(failure.condition)} run ${failure.repetition}: ${failure.reason}${failedRubrics ? `（${failedRubrics}）` : ''}`);
    }
  }

  lines.push(
    '',
    '## 方法',
    '',
    generationMethodDescription(manifest),
    '',
    '生成担当には`expected`、`must_not`、rubric、過去出力を渡していない。採点時は条件名を伏せ、入力、補足、期待内容、禁止事項、指定rubric、実出力、fixtureの初期・最終内容、最終ファイル差分を別セッションへ渡した。採点結果の集計とレポート生成はランナーが機械的に行った。',
    '',
    '実行時の評価定義は[`evaluation.json`](./evaluation.json)、生の生成結果は[`generations.jsonl`](./generations.jsonl)、採点結果は[`grading.jsonl`](./grading.jsonl)、集計値は[`summary.json`](./summary.json)、実行条件と内容ハッシュは[`manifest.json`](./manifest.json)に保存している。',
    '',
    '## 制約',
    '',
    `- 単一の生成モデル、単一のreasoning effortで、${isPaired ? '各条件' : '選択した条件'}・各ケース${manifest.repetitions}回実行した評価である`,
    `- 採点は\`${manifest.grader_model}\`の別セッションで行っており、独立した人手評価ではない`,
    '- 条件名は伏せているが、出力の特徴からSkill条件を推測できる可能性は残る',
    '- 内部でProvenance Tableを作ったかなど、最終出力から観察できない工程は点数へ含めていない',
    isPaired
      ? `- 合格率差は今回の${manifest.case_ids.length}ケース内の差であり、あらゆる日本語文章タスクへ一般化できない`
      : '- 単一条件だけの実行であり、Skillなし／ありの効果差は算出できない',
    '',
  );

  return lines.join('\n');
}

async function runReportStage(evaluation, outputDirectory, manifest) {
  const generationRecords = await readJsonLines(path.join(outputDirectory, 'generations.jsonl'));
  const gradeRecords = [...latestRecordsByKey(
    await readJsonLines(path.join(outputDirectory, 'grading.jsonl')),
  ).values()];
  const summary = summarizeResults(evaluation, manifest, generationRecords, gradeRecords);
  await writeFile(path.join(outputDirectory, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
  await writeFile(
    path.join(outputDirectory, 'report.md'),
    buildMarkdownReport(evaluation, manifest, summary, gradeRecords),
    'utf8',
  );
  manifest.report_completed_at = new Date().toISOString();
  await writeFile(path.join(outputDirectory, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`Report written to ${path.join(outputDirectory, 'report.md')}`);
}

const RESUME_MANIFEST_FIELDS = [
  'schema_version',
  'harness_version',
  'eval_version',
  'eval_file',
  'case_ids',
  'model',
  'grader_model',
  'reasoning_effort',
  'conditions',
  'repetitions',
  'planned_generations',
  'grader_batch_size',
  'grader_retries',
  'timeout_seconds',
  'codex_home_isolated',
  'codex_cli_version',
  'runner_sha256',
  'skill_sha256',
  'reference_sha256',
  'evaluation_snapshot_file',
  'evaluation_snapshot_sha256',
];

export function assertResumeManifestMatches(existingManifest, currentManifest) {
  const mismatchedFields = RESUME_MANIFEST_FIELDS.filter(
    (field) => !isDeepStrictEqual(existingManifest[field], currentManifest[field]),
  );

  if (mismatchedFields.length > 0) {
    throw new Error(`Resume manifest mismatch: ${mismatchedFields.join(', ')}`);
  }
}

async function loadOrCreateManifest(options, currentManifest) {
  const manifestPath = path.join(options.output, 'manifest.json');
  if (await fileExists(manifestPath)) {
    const manifest = await readJson(manifestPath);
    if (!options.resume && (options.stage === 'all' || options.stage === 'generate')) {
      throw new Error(`Output already exists. Use --resume to continue: ${options.output}`);
    }
    assertResumeManifestMatches(manifest, currentManifest);
    return manifest;
  }

  if (options.stage === 'grade' || options.stage === 'report') {
    throw new Error(`manifest.json does not exist in ${options.output}`);
  }

  return currentManifest;
}

async function persistEvaluationSnapshot(evaluation, outputDirectory, manifest) {
  const snapshot = buildEvaluationSnapshot(evaluation, manifest.case_ids);
  const content = `${JSON.stringify(snapshot, null, 2)}\n`;
  const snapshotHash = sha256(content);

  if (
    manifest.evaluation_snapshot_sha256
    && manifest.evaluation_snapshot_sha256 !== snapshotHash
  ) {
    throw new Error('Evaluation snapshot does not match the existing manifest.');
  }

  manifest.evaluation_snapshot_file = 'evaluation.json';
  manifest.evaluation_snapshot_sha256 = snapshotHash;
  await writeFile(path.join(outputDirectory, 'evaluation.json'), content, 'utf8');
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    showHelp();
    return;
  }

  const evaluation = await readJson(path.join(EVALS_DIRECTORY, 'evals.json'));
  const validationErrors = validateEvaluation(evaluation);
  if (validationErrors.length > 0) {
    throw new Error(`Evaluation validation failed:\n- ${validationErrors.join('\n- ')}`);
  }

  const plan = buildGenerationPlan(evaluation, options);
  const dryRunSummary = {
    eval_version: evaluation.version,
    cases: [...new Set(plan.map((task) => task.caseId))].length,
    conditions: options.conditions,
    repetitions: options.repetitions,
    generations: plan.length,
    estimated_grader_batches: Math.ceil(plan.length / options.graderBatchSize),
    model: options.model,
    grader_model: options.graderModel,
    reasoning_effort: options.reasoning,
    output: options.output,
    codex_home_isolated: options.isolateCodexHome,
  };

  if (options.dryRun) {
    console.log(JSON.stringify(dryRunSummary, null, 2));
    return;
  }

  await mkdir(options.output, { recursive: true });
  const currentManifest = await createManifest(evaluation, options, plan);
  const manifest = await loadOrCreateManifest(options, currentManifest);
  const manifestPath = path.join(options.output, 'manifest.json');
  await persistEvaluationSnapshot(evaluation, options.output, manifest);
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  if (options.stage === 'all' || options.stage === 'generate') {
    await runGenerationStage(evaluation, options, plan, options.output, manifest);
  }
  if (options.stage === 'all' || options.stage === 'grade') {
    await runGradingStage(evaluation, options, options.output, manifest);
  }
  if (options.stage === 'all' || options.stage === 'report') {
    await runReportStage(evaluation, options.output, manifest);
  }
}

const isDirectExecution = process.argv[1]
  && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isDirectExecution) {
  main().catch((error) => {
    console.error(error.stack ?? error.message);
    process.exitCode = 1;
  });
}
