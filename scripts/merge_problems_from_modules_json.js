/**
 * Merge `practice` problems from one or more `modules_json/.../module.json`
 * files into a target `content/.../*.problems.json`, deduping by `uniqueId`
 * and optionally capping list length.
 *
 * Usage (PowerShell examples):
 *   node scripts/merge_problems_from_modules_json.js ^
 *     --target content/2_Intermediate/Modular_Arithmetic.problems.json ^
 *     --sources modules_json/Number_Theory/Modular_Arithmetic/module.json ^
 *     --max 25
 *
 *   node scripts/merge_problems_from_modules_json.js ^
 *     --target content/2_Intermediate/Chinese_Remainder_Theorem.problems.json ^
 *     --sources modules_json/Number_Theory/Modular_Arithmetic/Chinese_remainder_theorem/module.json ^
 *     --max 25
 */

const fs = require('fs');
const path = require('path');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeJsonPretty(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

function parseArgs(argv) {
  const args = { sources: [] };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--target') args.target = argv[++i];
    else if (a === '--sources') {
      // allow multiple --sources blocks
      while (i + 1 < argv.length && !argv[i + 1].startsWith('--')) {
        args.sources.push(argv[++i]);
      }
    } else if (a === '--max') args.max = Number(argv[++i]);
    else if (a === '--dry-run') args.dryRun = true;
    else throw new Error(`Unknown arg: ${a}`);
  }
  if (!args.target) throw new Error('Missing --target');
  if (!args.sources.length) throw new Error('Missing --sources');
  if (!Number.isFinite(args.max) || args.max <= 0) args.max = 25;
  return args;
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

  for (const pRaw of incomingProblems) {
    const p = normalizeProblem(pRaw);
    if (!p) continue;
    if (seen.has(p.uniqueId)) continue;
    targetObj.practice.push(p);
    seen.add(p.uniqueId);
    if (targetObj.practice.length >= max) break;
  }

  return targetObj;
}

function main() {
  const args = parseArgs(process.argv);
  const repoRoot = process.cwd();

  const targetPath = path.resolve(repoRoot, args.target);
  const targetObj = readJson(targetPath);

  // Preserve target MODULE_ID; do not overwrite.
  if (!targetObj.MODULE_ID) {
    throw new Error(`Target missing MODULE_ID: ${args.target}`);
  }

  const combinedIncoming = [];
  for (const srcRel of args.sources) {
    const srcPath = path.resolve(repoRoot, srcRel);
    const srcObj = readJson(srcPath);
    if (!Array.isArray(srcObj.practice)) continue;
    combinedIncoming.push(...srcObj.practice);
  }

  const before = Array.isArray(targetObj.practice) ? targetObj.practice.length : 0;
  const merged = mergePractice({
    targetObj,
    incomingProblems: combinedIncoming,
    max: args.max,
  });
  const after = merged.practice.length;

  if (args.dryRun) {
    console.log(
      JSON.stringify(
        { target: args.target, before, after, added: after - before, max: args.max },
        null,
        2
      )
    );
    return;
  }

  writeJsonPretty(targetPath, merged);
  console.log(
    JSON.stringify(
      { target: args.target, before, after, added: after - before, max: args.max },
      null,
      2
    )
  );
}

main();

