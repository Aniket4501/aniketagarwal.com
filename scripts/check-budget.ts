/**
 * Hard bundle-size gate.
 *
 * This mirrors the CI performance gate described in case study 1: a win that
 * is not enforced decays in the next three sprints. It fails the build rather
 * than printing a warning, for the same reason.
 *
 * Run after `next build`, which writes .next/app-build-manifest.json.
 */
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

/** Gzipped first-load JS ceiling per route, in KB. */
const BUDGET_KB = 90

const NEXT_DIR = path.join(process.cwd(), '.next')
const manifestPath = path.join(NEXT_DIR, 'app-build-manifest.json')

if (!fs.existsSync(manifestPath)) {
  console.error('No .next/app-build-manifest.json — run `next build` first.')
  process.exit(1)
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as {
  pages: Record<string, string[]>
}

const gzipCache = new Map<string, number>()
function gzipBytes(file: string): number {
  const cached = gzipCache.get(file)
  if (cached !== undefined) return cached
  const abs = path.join(NEXT_DIR, file)
  if (!fs.existsSync(abs)) return 0
  const size = zlib.gzipSync(fs.readFileSync(abs)).length
  gzipCache.set(file, size)
  return size
}

const rows: Array<{ route: string; kb: number }> = []
for (const [route, files] of Object.entries(manifest.pages)) {
  const total = files.filter((f) => f.endsWith('.js')).reduce((sum, f) => sum + gzipBytes(f), 0)
  rows.push({ route, kb: total / 1024 })
}

rows.sort((a, b) => b.kb - a.kb)

console.log(`\nFirst-load JS, gzipped (budget: ${BUDGET_KB} KB)\n`)
let failed = false
for (const { route, kb } of rows) {
  const over = kb > BUDGET_KB
  if (over) failed = true
  console.log(`  ${over ? 'FAIL' : ' ok '}  ${kb.toFixed(1).padStart(7)} KB   ${route}`)
}
console.log('')

if (failed) {
  console.error(`Bundle budget exceeded. Ceiling is ${BUDGET_KB} KB gzipped per route.`)
  process.exit(1)
}
console.log(`All routes within the ${BUDGET_KB} KB budget.`)
