import { chromium } from 'playwright'
const b = await chromium.launch()
for (const w of [390, 1440]) {
  const p = await b.newPage({ viewport: { width: w, height: w > 600 ? 900 : 844 } })
  await p.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
  const m = await p.evaluate(() => {
    const h1 = document.querySelector('h1')!
    const cs = getComputedStyle(h1)
    const proof = document.querySelector('#proof') as HTMLElement
    const hero = document.querySelector('header') as HTMLElement
    const nav = document.querySelector('header.site-nav') as HTMLElement
    return {
      h1FontSize: cs.fontSize,
      h1LineHeight: cs.lineHeight,
      h1Height: Math.round(h1.getBoundingClientRect().height),
      heroHeight: Math.round(hero?.getBoundingClientRect().height ?? 0),
      proofTop: Math.round(proof?.getBoundingClientRect().top ?? -1),
      navHeight: Math.round(nav?.getBoundingClientRect().height ?? 0),
      rootHeroVar: getComputedStyle(document.documentElement).getPropertyValue('--text-hero'),
      viewport: window.innerHeight,
    }
  })
  console.log(w, JSON.stringify(m, null, 0))
  await p.close()
}
await b.close()
