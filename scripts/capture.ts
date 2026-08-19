/**
 * Screenshot capture for the visual QA and hiring-manager review passes.
 *
 * Usage:  npx tsx scripts/capture.ts <iteration> [baseUrl]
 * Writes: docs/screenshots/iteration-<n>/<route>-<width>.png
 *
 * Captures above-the-fold at every width and a full-page shot at 390 and 1440,
 * which are the two viewports the reviews actually read from.
 */
import fs from 'node:fs'
import path from 'node:path'
import { chromium, type Browser } from 'playwright'

const ITERATION = process.argv[2] ?? '1'
const BASE = (process.argv[3] ?? 'http://localhost:3000').replace(/\/$/, '')

const WIDTHS = [320, 375, 390, 430, 768, 1024, 1440, 1920]
const FULL_PAGE_WIDTHS = new Set([390, 1440])

const ROUTES = [
  '/',
  '/work',
  '/work/step-syncing',
  '/work/steps-premier-league',
  '/work/ai-health-report',
  '/approach',
  '/lab/grounded',
  '/about',
  '/this-route-does-not-exist',
]

const OUT = path.join(process.cwd(), 'docs', 'screenshots', `iteration-${ITERATION}`)

function slug(route: string) {
  return route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-')
}

async function capture(browser: Browser) {
  fs.mkdirSync(OUT, { recursive: true })
  const problems: string[] = []

  for (const route of ROUTES) {
    for (const width of WIDTHS) {
      const context = await browser.newContext({
        viewport: { width, height: Math.round(width * 2.16) > 1200 ? 900 : 844 },
        deviceScaleFactor: 2,
        reducedMotion: 'no-preference',
      })
      const page = await context.newPage()

      const consoleErrors: string[] = []
      page.on('console', (m) => {
        if (m.type() === 'error') consoleErrors.push(m.text())
      })
      page.on('pageerror', (e) => consoleErrors.push(String(e)))

      const res = await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' })
      const status = res?.status() ?? 0
      const expected = route.includes('does-not-exist') ? 404 : 200
      if (status !== expected) problems.push(`${route} @${width}: HTTP ${status}, expected ${expected}`)

      // Horizontal overflow is a hard failure at every width.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      )
      if (overflow) {
        const w = await page.evaluate(() => document.documentElement.scrollWidth)
        problems.push(`${route} @${width}: horizontal scroll (content ${w}px)`)
      }

      // The deliberate 404 route logs a 404 by design; that is the test.
      if (!route.includes('does-not-exist')) {
        for (const err of consoleErrors) problems.push(`${route} @${width}: console — ${err}`)
      }

      await page.screenshot({ path: path.join(OUT, `${slug(route)}-${width}.png`) })
      if (FULL_PAGE_WIDTHS.has(width)) {
        await page.screenshot({
          path: path.join(OUT, `${slug(route)}-${width}-full.png`),
          fullPage: true,
        })
      }
      await context.close()
    }
    process.stdout.write(`  captured ${route}\n`)
  }
  return problems
}

async function main() {
  const browser = await chromium.launch()
  try {
    const problems = await capture(browser)
    console.log(`\nScreenshots → ${path.relative(process.cwd(), OUT)}`)
    if (problems.length) {
      console.error(`\n${problems.length} problem(s):`)
      for (const p of problems) console.error(`  ${p}`)
      process.exitCode = 1
    } else {
      console.log('No HTTP errors, no console errors, no horizontal scroll at any width.')
    }
  } finally {
    await browser.close()
  }
}

void main()
