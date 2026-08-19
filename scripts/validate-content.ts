/**
 * Build-time content gate.
 *
 * Runs the Zod schemas over every content file and adds the editorial rules a
 * schema cannot express:
 *
 *   1. No internal QA marker reaches the public site. V1 rendered twenty-six
 *      of them in production, in red, which read as a form with validation
 *      errors rather than as rigour. Unanswered questions live in
 *      CONTENT_GAPS.md and nowhere else.
 *   2. No banned marketing language.
 *   3. No unqualified percentage in readable copy.
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
  'synergize',
  'synergise',
  'spearhead',
  'robust',
  'game-changing',
  'cutting-edge',
  "i'm excited to",
  'utilise',
  'utilize',
  'as a product manager, i',
  "in today's",
  'best-in-class',
  'world-class',
  'innovative solution',
  'delve',
  'tapestry',
  'testament to',
  'unlock the power',
  'empower',
  'revolutionize',
  'revolutionise',
]

const BANNED_PATTERNS: Array<[RegExp, string]> = [
  [/\bleverag(e|ed|ing)\b/i, '"leverage" as a verb'],
  [/cross-functional collaboration/i, '"cross-functional collaboration" as a standalone claim'],
]

const errors: string[] = []

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).flatMap((entry) => {
    const p = path.join(dir, entry)
    return fs.statSync(p).isDirectory() ? walk(p) : p.endsWith('.mdx') ? [p] : []
  })
}

const files = walk(CONTENT_DIR)
if (files.length === 0) {
  console.error('No content files found under content/.')
  process.exit(1)
}

for (const file of files) {
  const rel = path.relative(process.cwd(), file)
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)

  const collection = path.basename(path.dirname(file))
  const name = path.basename(file, '.mdx')
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
    errors.push(`${rel}: unrecognised collection "${collection}"`)
  } else if (schema) {
    const result = schema.safeParse(data)
    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push(`${rel}: frontmatter.${issue.path.join('.')} — ${issue.message}`)
      }
    }
  }

  // Strip fenced code and component props; neither is read as prose.
  const prose = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[A-Z][\s\S]*?\/>/g, '')
    .replace(/<[A-Z][^>]*>/g, '')

  for (const marker of raw.match(/\[NEEDS:[^\]]*\]/g) ?? []) {
    errors.push(`${rel}: ${marker} — internal QA never ships. Put it in CONTENT_GAPS.md.`)
  }

  const lower = prose.toLowerCase()
  for (const word of BANNED) {
    if (lower.includes(word)) errors.push(`${rel}: banned phrase "${word}"`)
  }
  for (const [re, label] of BANNED_PATTERNS) {
    if (re.test(prose)) errors.push(`${rel}: banned usage — ${label}`)
  }

  // A percentage with no denominator nearby.
  for (const pct of prose.match(/[+−-]?\d+(\.\d+)?%/g) ?? []) {
    const idx = prose.indexOf(pct)
    const window = prose.slice(Math.max(0, idx - 280), idx + 280).toLowerCase()
    const qualified =
      /\b(of|across|among|out of|cohort|users|beneficiaries|completion|revenue|n\s*=|sample|over|weeks?|months?|days?|measured|baseline|median|relative to|against|smaller|faster|reduction)\b/.test(
        window,
      )
    if (!qualified) {
      errors.push(`${rel}: unqualified percentage "${pct}" — every number needs its context`)
    }
  }
}

if (errors.length > 0) {
  console.error(`\n${errors.length} content violation(s):\n`)
  for (const e of errors) console.error(`  error  ${e}`)
  console.error('')
  process.exit(1)
}

console.log(`content OK — ${files.length} file(s) validated, 0 internal markers`)
