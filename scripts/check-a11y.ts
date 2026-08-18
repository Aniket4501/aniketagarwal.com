/**
 * Accessibility pass with axe-core, plus the manual checks axe cannot make.
 *
 * Usage: npx tsx scripts/check-a11y.ts [baseUrl]
 */
import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'

const BASE = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '')

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

const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 390, height: 844 } })
const page = await context.newPage()

let violations = 0
const structural: string[] = []

for (const route of ROUTES) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' })

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
    .analyze()

  if (results.violations.length) {
    violations += results.violations.length
    console.error(`\n${route}`)
    for (const v of results.violations) {
      console.error(`  [${v.impact}] ${v.id} — ${v.help}`)
      for (const node of v.nodes.slice(0, 3)) {
        console.error(`      ${node.target.join(' ')}`)
      }
    }
  }

  // Structural checks axe does not make.
  const shape = await page.evaluate(() => {
    const h1s = document.querySelectorAll('h1').length
    const levels = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) =>
      Number(h.tagName[1]),
    )
    let skipped: string | null = null
    for (let i = 1; i < levels.length; i++) {
      const prev = levels[i - 1] ?? 0
      const cur = levels[i] ?? 0
      if (cur > prev + 1) skipped = `h${prev} → h${cur}`
    }
    const outlineNone = [...document.querySelectorAll('a,button,summary,input,select,textarea')]
      .filter((el) => getComputedStyle(el).outlineStyle === 'none')
      .length
    const imagesNoAlt = [...document.querySelectorAll('img')].filter(
      (i) => !i.hasAttribute('alt'),
    ).length
    const skipLink = !!document.querySelector('a[href="#main"]')
    const main = !!document.querySelector('main')
    return { h1s, skipped, outlineNone, imagesNoAlt, skipLink, main }
  })

  if (shape.h1s !== 1) structural.push(`${route}: ${shape.h1s} h1 elements, expected exactly 1`)
  if (shape.skipped) structural.push(`${route}: skipped heading level ${shape.skipped}`)
  if (shape.imagesNoAlt) structural.push(`${route}: ${shape.imagesNoAlt} image(s) with no alt`)
  if (!shape.skipLink) structural.push(`${route}: no skip-to-content link`)
  if (!shape.main) structural.push(`${route}: no <main> landmark`)
}

await browser.close()

if (structural.length) {
  console.error('\nStructural:')
  for (const s of structural) console.error(`  ${s}`)
}

const total = violations + structural.length
console.log(
  total === 0
    ? `\naxe + structural checks clean across ${ROUTES.length} routes`
    : `\n${total} accessibility issue(s)`,
)
process.exitCode = total === 0 ? 0 : 1
