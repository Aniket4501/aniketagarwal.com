/**
 * Lighthouse over every route, mobile and desktop, against a PRODUCTION build.
 *
 * Usage: npx tsx scripts/lighthouse.mts [baseUrl]
 * Writes docs/lighthouse/<route>-<formFactor>.json and prints a table.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const BASE = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '')
const OUT = path.join(process.cwd(), 'docs', 'lighthouse')

const ROUTES = [
  '/',
  '/work',
  '/work/two-seconds',
  '/work/steps-premier-league',
  '/work/ai-health-reports',
  '/approach',
  '/lab',
  '/lab/grounded',
  '/about',
]

fs.mkdirSync(OUT, { recursive: true })

type Row = {
  route: string
  form: string
  perf: number
  a11y: number
  bp: number
  seo: number
  lcp: string
  cls: string
  tbt: string
}
const rows: Row[] = []

function slug(r: string) {
  return r === '/' ? 'home' : r.replace(/^\//, '').replace(/\//g, '-')
}

for (const route of ROUTES) {
  for (const form of ['mobile', 'desktop'] as const) {
    const file = path.join(OUT, `${slug(route)}-${form}.json`)
    const args = [
      `${BASE}${route}`,
      '--quiet',
      '--output=json',
      `--output-path=${file}`,
      '--chrome-flags=--headless=new --no-sandbox',
      '--only-categories=performance,accessibility,best-practices,seo',
    ]
    if (form === 'desktop') args.push('--preset=desktop')
    else args.push('--form-factor=mobile', '--screenEmulation.mobile')

    try {
      execFileSync('npx', ['lighthouse', ...args], { stdio: 'pipe', timeout: 180000 })
    } catch {
      console.error(`  lighthouse failed for ${route} (${form})`)
      continue
    }

    const r = JSON.parse(fs.readFileSync(file, 'utf8'))
    const c = r.categories
    const a = r.audits
    rows.push({
      route,
      form,
      perf: Math.round((c.performance?.score ?? 0) * 100),
      a11y: Math.round((c.accessibility?.score ?? 0) * 100),
      bp: Math.round((c['best-practices']?.score ?? 0) * 100),
      seo: Math.round((c.seo?.score ?? 0) * 100),
      lcp: a['largest-contentful-paint']?.displayValue ?? '—',
      cls: a['cumulative-layout-shift']?.displayValue ?? '—',
      tbt: a['total-blocking-time']?.displayValue ?? '—',
    })
    process.stdout.write(`  ${route} (${form}) done\n`)
  }
}

console.log(
  `\n${'route'.padEnd(30)} ${'form'.padEnd(8)} perf a11y  bp seo  ${'LCP'.padEnd(9)} ${'CLS'.padEnd(6)} TBT`,
)
for (const r of rows) {
  console.log(
    `${r.route.padEnd(30)} ${r.form.padEnd(8)} ${String(r.perf).padStart(4)} ${String(r.a11y).padStart(4)} ${String(r.bp).padStart(3)} ${String(r.seo).padStart(3)}  ${r.lcp.padEnd(9)} ${r.cls.padEnd(6)} ${r.tbt}`,
  )
}
fs.writeFileSync(path.join(OUT, 'summary.json'), JSON.stringify(rows, null, 2))
console.log(`\nwrote ${path.relative(process.cwd(), path.join(OUT, 'summary.json'))}`)
