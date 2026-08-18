import { chromium } from 'playwright'
const [out, url, w, y] = [process.argv[2], process.argv[3], Number(process.argv[4]), Number(process.argv[5])]
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: w, height: w > 600 ? 900 : 844 }, deviceScaleFactor: 2 })
await p.goto(url, { waitUntil: 'networkidle' })
await p.evaluate((yy) => window.scrollTo(0, yy), y)
await p.waitForTimeout(400)
await p.screenshot({ path: `${process.env.SP}/${out}.png` })
await b.close()
