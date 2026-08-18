/**
 * Runs the deterministic evaluator over the golden set and reports agreement
 * with the labels. Writes public/grounded-baseline.json, which the /lab page
 * loads as static data so the demo runs instantly, offline, at zero cost.
 *
 * The agreement number this prints is reported on the page as-is, including
 * when it is bad. A harness that only publishes its wins is the thing it was
 * built to argue against.
 */
import fs from 'node:fs'
import path from 'node:path'
import { evaluate } from '../lib/grounded/evaluate'
import { goldenSet, goldenSetStats } from '../lib/grounded/golden-set'
import type { Dimension } from '../lib/grounded/types'

const results = goldenSet.map((c) => {
  const result = evaluate(c.summary, c.labs)
  const actualFailing = result.dimensions.filter((d) => !d.passed).map((d) => d.dimension).sort()
  const expectedFailing = [...c.expected.failingDimensions].sort()

  const verdictAgrees = result.passed === c.expected.passed
  const dimensionsAgree =
    actualFailing.length === expectedFailing.length &&
    actualFailing.every((d, i) => d === expectedFailing[i])

  return {
    id: c.id,
    category: c.category,
    title: c.title,
    note: c.note,
    labelledBy: c.labelledBy,
    labs: c.labs,
    summary: c.summary,
    expected: c.expected,
    actual: { passed: result.passed, failingDimensions: actualFailing as Dimension[] },
    dimensions: result.dimensions,
    verdictAgrees,
    dimensionsAgree,
    elapsedMs: result.elapsedMs,
  }
})

const verdictAgreement = results.filter((r) => r.verdictAgrees).length
const dimensionAgreement = results.filter((r) => r.dimensionsAgree).length

const report = {
  generatedFrom: 'lib/grounded/golden-set.ts',
  stats: goldenSetStats,
  agreement: {
    verdict: { matched: verdictAgreement, total: results.length },
    dimensions: { matched: dimensionAgreement, total: results.length },
  },
  totalElapsedMs: Math.round(results.reduce((s, r) => s + r.elapsedMs, 0) * 100) / 100,
  cases: results,
}

const out = path.join(process.cwd(), 'public', 'grounded-baseline.json')
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, JSON.stringify(report, null, 2))

console.log(`\nGolden set: ${results.length} cases (${goldenSetStats.handLabelled} hand-labelled)\n`)
for (const r of results) {
  const mark = r.dimensionsAgree ? ' ok ' : r.verdictAgrees ? 'DIM?' : 'MISS'
  const exp = r.expected.failingDimensions.join(',') || 'pass'
  const act = r.actual.failingDimensions.join(',') || 'pass'
  console.log(
    `  ${mark}  ${r.id}  ${r.category.padEnd(13)} expected[${exp}]`.padEnd(62) + ` actual[${act}]`,
  )
}
console.log(
  `\n  verdict agreement    ${verdictAgreement}/${results.length}  (${Math.round((verdictAgreement / results.length) * 100)}%)`,
)
console.log(
  `  dimension agreement  ${dimensionAgreement}/${results.length}  (${Math.round((dimensionAgreement / results.length) * 100)}%)`,
)
console.log(`  total evaluator time ${report.totalElapsedMs} ms\n`)
console.log(`  wrote ${path.relative(process.cwd(), out)}`)
