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
import { caseStudySchema, shortCaseSchema, labProjectSchema } from '../lib/content/schema'

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
  const schema =
    collection === 'work'
      ? caseStudySchema
      : collection === 'short'
        ? shortCaseSchema
        : collection === 'lab'
          ? labProjectSchema
          : null

  if (!schema) {
    errors.push(`${rel}: file sits in an unrecognised collection "${collection}"`)
  } else {
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

  // Visible placeholder tokens are allowed but must be surfaced loudly.
  const needs = content.match(/\[NEEDS:[^\]]*\]/g) ?? []
  for (const n of needs) warnings.push(`${rel}: visible placeholder ${n}`)
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
