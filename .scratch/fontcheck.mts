import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
await p.goto('http://localhost:3000/work/two-seconds', { waitUntil: 'networkidle' })
const r = await p.evaluate(() => {
  const el = document.querySelector('.prose p')!
  const cs = getComputedStyle(el)
  const root = getComputedStyle(document.documentElement)
  const wrap = document.querySelector('.prose')!.closest('[class*="__variable"]') as HTMLElement | null
  return {
    proseFont: cs.fontFamily,
    proseSize: cs.fontSize,
    varSerif: cs.getPropertyValue('--font-serif'),
    varReading: cs.getPropertyValue('--font-reading') || '(unset)',
    rootReading: root.getPropertyValue('--font-reading') || '(unset)',
    wrapperClass: wrap?.className ?? '(none found)',
  }
})
console.log(JSON.stringify(r, null, 2))
await b.close()
