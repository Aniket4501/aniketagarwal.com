/**
 * The truth gate.
 *
 * Every pattern below is a specific claim that appears in the strategy
 * document but in neither the resume nor the LinkedIn export. Several sit
 * inside fenced code blocks that a builder copies wholesale, which is exactly
 * how an invented decimal ends up rendered twenty times on a finished site.
 *
 * Sourced from docs/01b-truth-audit.md section 8 and docs/04-ia.md section 4.4.
 * Any hit fails the build. Run over source AND over the built HTML, because a
 * string can be assembled at render time.
 */
import fs from 'node:fs'
import path from 'node:path'

type Rule = {
  id: string
  pattern: RegExp
  why: string
  /** Files matching this are exempt — docs record the bans, so they contain them. */
  allow?: RegExp
  /** If set, the rule applies only to files matching it. */
  only?: RegExp
}

const RULES: Rule[] = [
  {
    id: 'T00',
    pattern: /\[NEEDS:/i,
    why: 'internal content QA never ships. Unanswered questions live in CONTENT_GAPS.md and nowhere else',
    // The schema and the gate exist in order to ban this string, so they are
    // the two files allowed to contain it.
    allow: /^(scripts\/|lib\/content\/schema\.ts)/,
  },
  {
    id: 'T01',
    pattern: /(?<=[A-Za-z])'(?=[A-Za-z])/,
    why: 'straight apostrophe in content. The MDX pipeline curls prose, but not YAML frontmatter or component props, so those are normalised at source and held here',
    // Only content is typeset. Source files are code and keep ASCII quotes.
    only: /^content\//,
  },
  { id: 'T25', pattern: /\b1\.9\s?s\b/i, why: 'the record says "<2s"; 1.9 appears in no source' },
  { id: 'T26', pattern: /\b15\.0\s?s\b/i, why: 'fabricated precision; the record says "15s"' },
  { id: 'T27', pattern: /\bP(50|75|90|95|99)\b/, why: 'no percentile exists for the cold-start figure' },
  { id: 'T28', pattern: /(low-end|mid-tier)\s+Android|2[-–]4\s?GB/i, why: 'no device population is in the record' },
  { id: 'T29', pattern: /\b\d+\s+engineers?\b|\b\d+\s+designers?\b|no dedicated QA/i, why: 'no headcount exists in any source' },
  { id: 'T30', pattern: /\bQ[1-4]\s?20\d\d\b/, why: 'no date is attached to any HCL initiative; only durations exist' },
  { id: 'T31', pattern: /enrolled cohort/i, why: 'fabricated denominator for session time' },
  { id: 'T32', pattern: /1M\+?\s*user base/i, why: 'a registered-user count is not a DAU denominator' },
  { id: 'T33', pattern: /six (0[-–]?1|products|features|things)|five companies/i, why: 'the record labels two 0-1 launches, across four companies' },
  { id: 'T34', pattern: /\+\s?122\s?%/, why: '7.8/3.5 rounds to +123%; the resume is inconsistent and a sceptic checks in four seconds' },
  { id: 'T35', pattern: /[−-]\s?87\s?%/, why: 'the source is an inequality, so the reduction is a lower bound, not a value' },
  { id: 'T36', pattern: /\b3\.1\s*(→|->)\s*4\.2\b|haemoglobin is 12\.4|hemoglobin is 12\.4/i, why: 'invented CSAT and clinical values' },
  { id: 'T37', pattern: /refusal layer|escalation router|grounding rate|safety boundar|clinician review|clinical scaffolding/i, why: 'the AI Health Reports architecture is in no source' },
  { id: 'T38', pattern: /won'?t[- ]have/i, why: 'the record says Trackers and Live Events SHIPPED; never claim they were cut' },
  { id: 'T39', pattern: /\bCSAT\b/i, why: 'no scale, no baseline, no N, no period — cut entirely' },
  { id: 'T40', pattern: /first eight weeks/i, why: 'the sequence is not in the record' },
  { id: 'T41', pattern: /(?<!nearly )(?<!almost )\btwo years\b/i, why: '22 months, and the resume itself says "1.5+"' },
  { id: 'T42', pattern: /the hardest retention/i, why: 'a superlative across all consumer software from an N of 1' },
  {
    id: 'T43',
    pattern: /(a|the|our|its)\s+hand[- ]labell?ed|hand[- ]labell?ed\s+(golden\s+)?set/i,
    why: 'the golden set is synthetic; the page says so rather than claiming otherwise',
  },
  { id: 'T48', pattern: /Applied Geology|Learning Sciences|Geological\/Geophysical/i, why: 'the degree name is in three-way conflict; name no discipline until B15' },
  { id: 'T49', pattern: /github\.com\//i, why: 'the GitHub URL is unverified; see CONTENT_GAPS B16' },
]

/** Directories that are checked. */
const ROOTS = ['app', 'components', 'lib', 'content', 'scripts', 'public']
/** Docs deliberately quote the banned strings in order to ban them. */
const EXEMPT = /^(docs|node_modules|\.next|\.git)\//

/**
 * Comments are stripped before scanning. This file and the docs record the
 * banned strings in order to ban them, and a gate that fires on its own
 * rationale is a gate people switch off. Only shipped text is checked.
 */
function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .split('\n')
    .map((l) => (/^\s*(\/\/|\*)/.test(l) ? '' : l))
    .join('\n')
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).flatMap((entry) => {
    const p = path.join(dir, entry)
    if (fs.statSync(p).isDirectory()) return walk(p)
    return /\.(tsx?|mdx?|json|css|html)$/.test(p) ? [p] : []
  })
}

const files = [
  ...ROOTS.flatMap(walk),
  ...(fs.existsSync('.next/server/app') ? walk('.next/server/app').filter((f) => f.endsWith('.html')) : []),
]

type Hit = { rule: Rule; file: string; line: number; text: string }
const hits: Hit[] = []

for (const file of files) {
  const rel = path.relative(process.cwd(), file)
  if (EXEMPT.test(rel)) continue
  // This file necessarily contains every banned pattern.
  if (rel === 'scripts/check-truth.ts') continue

  const lines = stripComments(fs.readFileSync(file, 'utf8')).split('\n')
  lines.forEach((line, i) => {
    for (const rule of RULES) {
      if (rule.allow?.test(rel)) continue
      if (rule.only && !rule.only.test(rel)) continue
      if (rule.pattern.test(line)) {
        hits.push({ rule, file: rel, line: i + 1, text: line.trim().slice(0, 120) })
      }
    }
  })
}

// jobTitle must exist exactly once and must be the literal title.
const jobTitleHits = files
  .filter((f) => !EXEMPT.test(path.relative(process.cwd(), f)))
  .flatMap((f) => {
    const src = fs.readFileSync(f, 'utf8')
    return [...src.matchAll(/jobTitle:\s*'([^']*)'/g)].map((m) => ({
      file: path.relative(process.cwd(), f),
      value: m[1] ?? '',
    }))
  })

const wrongTitle = jobTitleHits.filter((h) => h.value !== 'Product Analyst')

if (hits.length === 0 && wrongTitle.length === 0) {
  console.log(`truth gate OK — ${RULES.length} patterns checked across ${files.length} files`)
  process.exit(0)
}

console.error(`\n${hits.length + wrongTitle.length} truth violation(s):\n`)
for (const h of hits) {
  console.error(`  ${h.rule.id}  ${h.file}:${h.line}`)
  console.error(`        ${h.text}`)
  console.error(`        ${h.rule.why}\n`)
}
for (const w of wrongTitle) {
  console.error(`  T44  ${w.file} — jobTitle is "${w.value}", must be "Product Analyst"\n`)
}
process.exit(1)
