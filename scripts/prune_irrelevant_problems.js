const fs = require('fs');
const path = require('path');

const REPO_ROOT = process.cwd();

const STOPWORDS = new Set([
  'intro', 'introduction', 'advanced', 'intermediate', 'foundations', 'basics',
  'theorem', 'writeup', 'problem', 'problems', 'and', 'of', 'for', 'to'
]);

const TOKEN_ALIASES = {
  trig: ['sin', 'cos', 'tan', 'trig', 'trigonometric', 'arcsin', 'arccos', 'arctan'],
  complex: ['complex', 'imaginary', 'arg', 'argument', 'modulus', 'polar', 'roots of unity', 'gaussian'],
  inequality: ['inequality', 'am-gm', 'amgm', 'cauchy', 'jensen', 'muirhead', 'majorization', 'holder'],
  geometry: ['geometry', 'triangle', 'circle', 'angle', 'chord', 'tangent', 'polygon', 'centroid', 'orthocenter', 'euclidean'],
  sphere: ['sphere', 'spherical', 'great circle', 'geodesic', 'curvature', 'non-euclidean'],
  coordinate: ['coordinate', 'cartesian', 'vector', 'analytic', 'shoelace'],
  counting: ['count', 'counting', 'combinatorics', 'combination', 'permutation', 'bijection', 'invariant', 'pigeonhole', 'generating'],
  probability: ['probability', 'expected value', 'random', 'dice', 'coin', 'distribution'],
  number: ['number theory', 'mod', 'modular', 'congruence', 'divisibility', 'prime', 'totient', 'diophantine', 'residue'],
  polynomial: ['polynomial', 'vieta', 'symmetric', 'newton sums', 'root', 'factorization', 'irreducible'],
  sequence: ['sequence', 'series', 'recurrence', 'sum', 'telescoping'],
  functional: ['functional equation', 'f(x)', 'injective', 'surjective'],
  graph: ['graph', 'vertex', 'edge', 'tree', 'path', 'cycle', 'matching'],
  proof: ['proof', 'prove', 'show that', 'contradiction', 'induction', 'lemma', 'claim', 'invariant', 'extremal'],
  strategy: ['strategy', 'idea', 'invariant', 'extremal', 'construct', 'casework', 'induction']
};

const SPECIAL_RULES = [
  { match: /sphere-geometry/, wants: ['sphere'] },
  { match: /proof-writing-basics/, wants: ['proof'] },
  { match: /strategy-writeup/, wants: ['strategy'] },
  { match: /graph-theory/, wants: ['graph'] },
  { match: /functional-equations|_fe|fe\b/, wants: ['functional'] },
  { match: /olympiad-number-theory|number-theory-advanced|orders-number-theory|totient|modular|chick/, wants: ['number'] },
  { match: /inequal/, wants: ['inequality'] },
  { match: /complex/, wants: ['complex'] },
  { match: /trig|law-of-sines|law-of-cosines/, wants: ['trig'] },
  { match: /shoelace|coordinate/, wants: ['coordinate'] },
  { match: /count|probab|expected/, wants: ['counting', 'probability'] },
  { match: /vieta|symmetric|newton|polynomial|roots-of-unity|factorization|sophie/, wants: ['polynomial'] },
  { match: /sequences|series|telescoping|sum-formulas/, wants: ['sequence'] },
  { match: /geometry|triangle|circle|polygon|power-of-a-point|descartes/, wants: ['geometry'] }
];

function parseArgs(argv) {
  const args = { files: [] };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--files') {
      while (i + 1 < argv.length && !argv[i + 1].startsWith('--')) args.files.push(argv[++i]);
    } else if (a === '--dry-run') {
      args.dryRun = true;
    } else if (a === '--min-keep') {
      args.minKeep = Number(argv[++i]);
    } else {
      throw new Error(`Unknown arg: ${a}`);
    }
  }
  if (!Number.isFinite(args.minKeep) || args.minKeep < 0) args.minKeep = 6;
  return args;
}

function normalize(s) {
  return String(s || '').toLowerCase();
}

function tokenizeSimple(s) {
  return normalize(s)
    .split(/[^a-z0-9]+/g)
    .filter(Boolean)
    .filter(t => !STOPWORDS.has(t));
}

function getWants(moduleId, filePath) {
  const k = `${moduleId} ${filePath}`.toLowerCase();
  const wants = new Set();
  for (const r of SPECIAL_RULES) {
    if (r.match.test(k)) for (const w of r.wants) wants.add(w);
  }
  if (!wants.size) {
    for (const t of tokenizeSimple(k)) wants.add(t);
  }
  return Array.from(wants);
}

function relevanceScore(problem, wants) {
  const text = normalize([
    problem.name,
    problem.source,
    (problem.tags || []).join(' '),
    problem.statement,
    problem.solutionReveal && problem.solutionReveal.markdown
  ].join(' '));

  const srcPrefix = normalize(String(problem.uniqueId || '').split('-auto-')[0]);

  let score = 0;
  for (const w of wants) {
    const aliases = TOKEN_ALIASES[w] || [w];
    let matched = false;
    for (const a of aliases) {
      if (text.includes(a) || srcPrefix.includes(a.replace(/\s+/g, '-'))) {
        matched = true;
        break;
      }
    }
    if (matched) score += 1;
  }
  return score;
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

function main() {
  const args = parseArgs(process.argv);
  const files = args.files.map(f => path.resolve(REPO_ROOT, f));

  const summary = [];

  for (const abs of files) {
    if (!fs.existsSync(abs)) continue;
    const obj = readJson(abs);
    if (!Array.isArray(obj.practice)) continue;

    const rel = path.relative(REPO_ROOT, abs).replace(/\\/g, '/');
    const moduleId = normalize(obj.MODULE_ID || '');
    const wants = getWants(moduleId, rel);

    const scored = obj.practice.map(p => ({ p, s: relevanceScore(p, wants) }));
    const kept = scored.filter(x => x.s > 0);

    let final = kept;
    if (final.length < args.minKeep) {
      final = [...scored].sort((a, b) => b.s - a.s).slice(0, Math.min(args.minKeep, scored.length));
    }

    const dedup = [];
    const seen = new Set();
    for (const x of final) {
      const id = x.p && x.p.uniqueId;
      if (!id || seen.has(id)) continue;
      seen.add(id);
      dedup.push(x.p);
    }

    const before = obj.practice.length;
    const after = dedup.length;

    if (!args.dryRun) {
      obj.practice = dedup;
      writeJson(abs, obj);
    }

    summary.push({ file: rel, before, after, removed: before - after, wants });
  }

  summary.sort((a, b) => b.removed - a.removed);
  for (const s of summary) {
    console.log(`${s.before}\t${s.after}\t${s.removed}\t${s.file}`);
  }
  const totalBefore = summary.reduce((n, x) => n + x.before, 0);
  const totalAfter = summary.reduce((n, x) => n + x.after, 0);
  console.log(`TOTAL\t${totalBefore}\t${totalAfter}\t${totalBefore - totalAfter}`);
}

main();
