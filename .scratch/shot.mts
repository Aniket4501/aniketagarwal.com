import { chromium } from 'playwright'
const out = process.argv[2] ?? 'shot'
const url = process.argv[3] ?? 'http://localhost:3000/'
const width = Number(process.argv[4] ?? 1440)
const full = process.argv[5] === 'full'
const b = await chromium.launch()
const p = await b.newPage({
  viewport: { width, height: width > 600 ? 900 : 844 },
  deviceScaleFactor: 2,
})
await p.goto(url, { waitUntil: 'networkidle' })
await p.screenshot({ path: `${process.env.SP}/${out}.png`, fullPage: full })
const o = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }))
console.log(out, 'scrollWidth', o.sw, 'inner', o.iw, o.sw > o.iw + 1 ? 'OVERFLOW' : 'ok')
await b.close()
