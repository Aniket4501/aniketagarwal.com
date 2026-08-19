/**
 * Build-time content gate.
 *
 * Runs the Zod schemas over every content file and additionally enforces the
 * two site-wide editorial rules that a schema cannot express:
 *
 *   1. No banned word appears in any readable copy.
 *   2. No unqualified percentage appears in any readable copy.
 *
 * Exits non-zero on any violation. Wired into `npm run verify`.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import {
  caseStudySchema,
  shortCaseSchema,
  labProjectSchema,
  homeSchema,
} from '../lib/content/schema'

const CONTENT_DIR = path.join(process.cwd(), 'content')

const BANNED = [
  'passionate',
  'data-driven',
  'end-to-end',
  'seamless',
  'synergy',
  'robust',
  'game-changing',
  'game changing',
  'cutting-edge',
  'cutting edge',
  "i'm excited to",
  'utilise',
  'utilize',
  'as a product manager, i',
  'in today',
  'best-in-class',
  'world-class',
  'delve',
  'tapestry',
  'testament to',
  'navigate the complexities',
  'unlock',
  'empower',
  'revolutionize',
  'revolutionise',
]

/** "leverage" and "cross-functional" are only banned in specific shapes. */
const BANNED_PATTERNS: Array<[RegExp, string]> = [
  [/\bleverag(e|ed|ing)\b/i, '"leverage" as a verb'],
  [/cross-functional collaboration/i, '"cross-functional collaboration" as a standalone claim'],
]

const errors: string[] = []
const warnings: string[] = []

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).flatMap((entry) => {
    const p = path.join(dir, entry)
    return fs.statSync(p).isDirectory() ? walk(p) : p.endsWith('.mdx') ? [p] : []
  })
}

const files = walk(CONTENT_DIR)
if (files.length === 0) {
  console.error('No content files found under content/. Nothing to validate.')
  process.exit(1)
}

for (const file of files) {
  const rel = path.relative(process.cwd(), file)
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)

  // --- schema ---
  const collection = path.basename(path.dirname(file))
  const name = path.basename(file, '.mdx')
  // `about` and `approach` are single pages whose body is the content and
  // whose frontmatter carries nothing the site reads, so they have no schema.
  const unschemad = collection === 'content' && (name === 'about' || name === 'approach')
  const schema =
    collection === 'work'
      ? caseStudySchema
      : collection === 'short'
        ? shortCaseSchema
        : collection === 'lab'
          ? labProjectSchema
          : collection === 'content' && name === 'home'
            ? homeSchema
            : null

  if (!schema && !unschemad) {
    errors.push(`${rel}: file sits in an unrecognised collection "${collection}"`)
  } else if (schema) {
    const result = schema.safeParse(data)
    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push(`${rel}: frontmatter.${issue.path.join('.')} — ${issue.message}`)
      }
    }
  }

  // --- readable copy rules ---
  // Strip fenced code and JSX component props; those are not read as prose.
  const prose = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[A-Z][\s\S]*?\/>/g, '')
    .replace(/<[A-Z][^>]*>/g, '')

  const lower = prose.toLowerCase()
  for (const word of BANNED) {
    if (lower.includes(word)) errors.push(`${rel}: banned phrase "${word}"`)
  }
  for (const [re, name] of BANNED_PATTERNS) {
    if (re.test(prose)) errors.push(`${rel}: banned usage — ${name}`)
  }

  // Unqualified percentages: a % figure with no denominator nearby.
  // MetricDelta components carry their own denominator prop and are excluded
  // above, so anything left in prose must be qualified inline.
  const pctMatches = prose.match(/[+−-]?\d+(\.\d+)?%/g) ?? []
  for (const pct of pctMatches) {
    const idx = prose.indexOf(pct)
    const window = prose.slice(Math.max(0, idx - 260), idx + 260).toLowerCase()
    const qualified =
      /\b(of|across|among|out of|cohort|users|beneficiaries|n\s*=|sample|over|weeks?|months?|days?|measured|baseline|p75|p90|median|relative to|against)\b/.test(
        window,
      )
    if (!qualified) {
      errors.push(`${rel}: unqualified percentage "${pct}" — every number needs a denominator`)
    }
  }

  // Visible placeholder tokens are allowed, but they are MARKERS, not briefs.
  // A five-line question rendered inline turns an honest gap into a page that
  // looks broken, so the long form lives in CONTENT_GAPS.md and the chip stays
  // short enough to read as a deliberate annotation.
  const needs = content.match(/\[NEEDS:[^\]]*\]/g) ?? []
  for (const n of needs) {
    const inner = n.slice(7, -1).trim()
    if (inner.length > 52) {
      errors.push(
        `${rel}: [NEEDS:] token is ${inner.length} chars, max 52 — "${inner.slice(0, 46)}…". ` +
          `Shorten the chip and put the full question in CONTENT_GAPS.md.`,
      )
    }
    warnings.push(`${rel}: visible placeholder ${n}`)
  }

  // At most ONE token per metric, checked against the PARSED frontmatter
  // rather than by pattern-matching the YAML — an earlier regex version
  // silently matched nothing and let a two-chip metric ship. Three unqualified
  // fields rendering as three red chips under one number reads as a broken
  // template; one chip naming what is missing reads as someone who knows their
  // own number.
  const metrics = (data as { metrics?: unknown }).metrics
  if (Array.isArray(metrics)) {
    for (const m of metrics as Array<Record<string, unknown>>) {
      const fields = ['denominator', 'timeframe', 'method']
      const withToken = fields.filter((f) => /\[NEEDS:/.test(String(m[f] ?? '')))
      if (withToken.length > 1) {
        errors.push(
          `${rel}: metric "${String(m.label)}" has ${withToken.length} [NEEDS:] tokens ` +
            `(${withToken.join(', ')}), max 1. Collapse them into \`method\` and set the ` +
            `others to the literal "not stated".`,
        )
      }
    }
  }
  const heroMetric = (data as { heroMetric?: Record<string, unknown> }).heroMetric
  if (heroMetric) {
    const anyToken = ['denominator', 'timeframe', 'method'].some((f) =>
      /\[NEEDS:/.test(String(heroMetric[f] ?? '')),
    )
    if (anyToken) {
      errors.push(
        `${rel}: heroMetric carries a [NEEDS:] token. The hero must show one complete number — ` +
          `a reader in the first ten seconds should not meet a question.`,
      )
    }
  }
}

for (const w of warnings) console.warn(`  warn  ${w}`)

if (errors.length > 0) {
  console.error(`\n${errors.length} content violation(s):\n`)
  for (const e of errors) console.error(`  error  ${e}`)
  console.error('')
  process.exit(1)
}

console.log(
  `content OK — ${files.length} file(s) validated, ${warnings.length} visible placeholder(s)`,
)
