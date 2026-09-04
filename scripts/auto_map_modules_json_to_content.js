/**
 * Auto-map `modules_json/.../module.json` problem banks into existing
 * `content/.../*.problems.json` files by string similarity on module IDs + paths.
 *
 * Goals:
 * - Fill most content modules to ~25 problems
 * - Never exceed --max per content module
 * - Deduplicate by uniqueId
 * - Produce a mapping report so we can review edge cases
 *
 * Usage:
 *   node scripts/auto_map_modules_json_to_content.js --max 25
 *
 * Output:
 *   - writes updated content problem lists
 *   - writes docs/auto_mapping_report.json
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = process.cwd();
const CONTENT_DIR = path.join(REPO_ROOT, 'content');
const MODULES_JSON_DIR = path.join(REPO_ROOT, 'modules_json');
const REPORT_PATH = path.join(REPO_ROOT, 'docs', 'auto_mapping_report.json');

function getSectionFromContentProblemsRel(rel) {
  // rel like: content/2_Intermediate/Foo.problems.json
  const norm = rel.replace(/\\/g, '/');
  const parts = norm.split('/');
  const dir = parts[1] || '';
  if (dir === '1_Foundations') return 'foundations';
  if (dir === '2_Intermediate') return 'intermediate';
  if (dir === '3_Advanced') return 'advanced';
  if (dir === '4_USAMO') return 'usamo';
  return 'unknown';
}

function allowedInSection(section, difficulty) {
  // Be conservative: Foundations should not be auto-filled from modules_json banks
  // (they appear to be overwhelmingly "Hard").
  if (section === 'foundations') return false;
  // Intermediate/Advanced/USAMO: allow all labeled difficulties.
  return true;
}

function walkFiles(rootDir, pred) {
  const out = [];
  const stack = [rootDir];
  while (stack.length) {
    const dir = stack.pop();
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) stack.push(p);
      else if (e.isFile() && pred(p)) out.push(p);
    }
  }
  return out;
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeJsonPretty(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

function tokenize(s) {
  return String(s)
    .toLowerCase()
    .replace(/['"]/g, '')
    .split(/[^a-z0-9]+/g)
    .filter(Boolean)
    .filter(t => t.length >= 2);
}

function tokenSet(s) {
  return new Set(tokenize(s));
}

function jaccard(a, b) {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

function pickMax(arr, scoreFn) {
  let best = null;
  let bestScore = -Infinity;
  for (const x of arr) {
    const s = scoreFn(x);
    if (s > bestScore) {
      bestScore = s;
      best = x;
    }
  }
  return { best, bestScore };
}

function normalizeProblem(p) {
  if (!p || typeof p !== 'object') return null;
  if (!p.uniqueId || typeof p.uniqueId !== 'string') return null;
  if (!p.statement || typeof p.statement !== 'string' || !p.statement.trim())
    return null;
  return p;
}

function mergePractice({ targetObj, incomingProblems, max }) {
  if (!Array.isArray(targetObj.practice)) targetObj.practice = [];

  const seen = new Set();
  for (const p of targetObj.practice) {
    if (p && typeof p.uniqueId === 'string') seen.add(p.uniqueId);
  }

  let added = 0;
  for (const pRaw of incomingProblems) {
    const p = normalizeProblem(pRaw);
    if (!p) continue;
    if (seen.has(p.uniqueId)) continue;
    if (targetObj.practice.length >= max) break;
    targetObj.practice.push(p);
    seen.add(p.uniqueId);
    added++;
  }
  return { targetObj, added };
}

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--max') args.max = Number(argv[++i]);
    else if (a === '--min-score') args.minScore = Number(argv[++i]);
    else if (a === '--dry-run') args.dryRun = true;
    else throw new Error(`Unknown arg: ${a}`);
  }
  if (!Number.isFinite(args.max) || args.max <= 0) args.max = 25;
  if (!Number.isFinite(args.minScore) || args.minScore <= 0) args.minScore = 0.18;
  return args;
}

function main() {
  const args = parseArgs(process.argv);

  const contentProblemFiles = walkFiles(CONTENT_DIR, p => p.endsWith('.problems.json'));
  const modulesJsonFiles = walkFiles(MODULES_JSON_DIR, p => p.endsWith('module.json'));

  const contentTargets = contentProblemFiles.map(p => {
    const obj = readJson(p);
    const moduleId = obj.MODULE_ID;
    const rel = path.relative(REPO_ROOT, p).replace(/\\/g, '/');
    return {
      path: p,
      rel,
      moduleId,
      section: getSectionFromContentProblemsRel(rel),
      tokens: tokenSet(`${moduleId} ${rel}`),
    };
  });

  const moduleBanks = modulesJsonFiles.map(p => {
    const obj = readJson(p);
    const moduleId = obj.MODULE_ID;
    const rel = path.relative(REPO_ROOT, p).replace(/\\/g, '/');
    return {
      path: p,
      rel,
      moduleId,
      practice: Array.isArray(obj.practice) ? obj.practice : [],
      tokens: tokenSet(`${moduleId} ${rel}`),
    };
  });

  // Prioritize mapping by trying exact-ish hits first.
  const report = {
    params: { max: args.max, minScore: args.minScore },
    totals: {
      contentTargets: contentTargets.length,
      moduleBanks: moduleBanks.length,
    },
    mappings: [],
    unmapped: [],
    skippedTargetsFull: [],
  };

  // Keep track of current sizes so we don't repeatedly read/write.
  const targetCache = new Map(); // path -> {obj, size}
  for (const t of contentTargets) {
    const obj = readJson(t.path);
    const size = Array.isArray(obj.practice) ? obj.practice.length : 0;
    targetCache.set(t.path, { obj, size });
  }

  function getTargetState(t) {
    const s = targetCache.get(t.path);
    if (!s) throw new Error('missing cache');
    return s;
  }

  // Map each module bank to best target, then merge into it.
  for (const bank of moduleBanks) {
    const { best: target, bestScore } = pickMax(contentTargets, t =>
      jaccard(bank.tokens, t.tokens)
    );

    if (!target || bestScore < args.minScore) {
      report.unmapped.push({
        bankRel: bank.rel,
        bankModuleId: bank.moduleId,
        bestScore,
        bestTargetRel: target?.rel ?? null,
        bestTargetModuleId: target?.moduleId ?? null,
      });
      continue;
    }

    const state = getTargetState(target);
    if (state.size >= args.max) {
      report.skippedTargetsFull.push({
        bankRel: bank.rel,
        bankModuleId: bank.moduleId,
        targetRel: target.rel,
        targetModuleId: target.moduleId,
        score: bestScore,
      });
      continue;
    }

    const before = state.size;
    const filteredIncoming = bank.practice.filter(p => {
      const d = p && typeof p.difficulty === 'string' ? p.difficulty : '';
      return allowedInSection(target.section, d);
    });

    const { targetObj, added } = mergePractice({
      targetObj: state.obj,
      incomingProblems: filteredIncoming,
      max: args.max,
    });
    const after = Array.isArray(targetObj.practice) ? targetObj.practice.length : before;
    state.obj = targetObj;
    state.size = after;

    report.mappings.push({
      bankRel: bank.rel,
      bankModuleId: bank.moduleId,
      targetRel: target.rel,
      targetModuleId: target.moduleId,
      targetSection: target.section,
      score: bestScore,
      before,
      after,
      added,
      incoming: bank.practice.length,
      incomingAfterFilter: filteredIncoming.length,
    });
  }

  // Write files
  if (!args.dryRun) {
    for (const t of contentTargets) {
      const state = getTargetState(t);
      writeJsonPretty(t.path, state.obj);
    }
  }

  writeJsonPretty(REPORT_PATH, report);
  console.log(
    JSON.stringify(
      {
        wrote: args.dryRun ? 'dry-run' : 'content problems json + report',
        report: path.relative(REPO_ROOT, REPORT_PATH).replace(/\\/g, '/'),
        mappings: report.mappings.length,
        unmapped: report.unmapped.length,
        skippedTargetsFull: report.skippedTargetsFull.length,
      },
      null,
      2
    )
  );
}

main();

