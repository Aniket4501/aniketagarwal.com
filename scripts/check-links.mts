/**
 * External link check.
 *
 * Runs over the built HTML for every route and resolves every off-site href.
 * A portfolio built around rigour cannot ship a dead link, and the one link
 * that matters most — LinkedIn — is also the one that cannot be checked the
 * ordinary way: LinkedIn answers every non-browser request with HTTP 999
 * regardless of whether the profile exists. A checker that treats 999 as a
 * pass would give a false green on the single most important link on the site,
 * so 999 is reported as UNVERIFIABLE and listed for a human to click.
 *
 * Usage: npx tsx scripts/check-links.mts [baseUrl]
 */
const BASE = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '')

const ROUTES = [
  '/',
  '/work',
  '/work/step-syncing',
  '/work/steps-premier-league',
  '/work/ai-health-report',
  '/approach',
  '/lab/grounded',
  '/about',
]

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

/** Hosts that answer bots with a bot-block status rather than the truth. */
const BOT_HOSTILE = new Set(['www.linkedin.com', 'linkedin.com'])

type Result = { url: string; status: number | string; from: string[] }

async function collect() {
  const found = new Map<string, Set<string>>()
  for (const route of ROUTES) {
    const res = await fetch(`${BASE}${route}`)
    if (!res.ok) throw new Error(`${route} returned ${res.status} — is the server running?`)
    const html = await res.text()
    for (const m of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
      const url = m[1]!.replace(/&amp;/g, '&')
      // Self-references are covered by the route sweep itself.
      if (url.startsWith(BASE)) continue
      if (!found.has(url)) found.set(url, new Set())
      found.get(url)!.add(route)
    }
  }
  return found
}

async function probe(url: string): Promise<number | string> {
  for (const method of ['HEAD', 'GET'] as const) {
    try {
      const res = await fetch(url, {
        method,
        redirect: 'follow',
        headers: { 'user-agent': UA, accept: '*/*' },
        signal: AbortSignal.timeout(20_000),
      })
      // Some hosts refuse HEAD but serve GET. Only retry on that signal.
      if (method === 'HEAD' && (res.status === 403 || res.status === 405)) continue
      return res.status
    } catch (err) {
      if (method === 'GET') return err instanceof Error ? err.name : 'FETCH_FAILED'
    }
  }
  return 'FETCH_FAILED'
}

async function main() {
  const links = await collect()
  const results: Result[] = []
  for (const [url, from] of links) {
    results.push({ url, status: await probe(url), from: [...from] })
  }
  results.sort((a, b) => a.url.localeCompare(b.url))

  const broken: Result[] = []
  const unverifiable: Result[] = []

  console.log()
  for (const r of results) {
    const host = (() => {
      try {
        return new URL(r.url).host
      } catch {
        return ''
      }
    })()
    const botBlocked = BOT_HOSTILE.has(host) && r.status === 999
    const ok = typeof r.status === 'number' && r.status >= 200 && r.status < 400

    if (botBlocked) unverifiable.push(r)
    else if (!ok) broken.push(r)

    const tag = botBlocked ? 'MANUAL' : ok ? '    ok' : '  FAIL'
    console.log(`${tag}  ${String(r.status).padStart(3)}  ${r.url}`)
    console.log(`               on ${r.from.join(', ')}`)
  }

  if (unverifiable.length) {
    console.log(`\n${unverifiable.length} link(s) cannot be checked from a script:`)
    for (const r of unverifiable) {
      console.log(`  ${r.url}`)
      console.log(`    ${new URL(r.url).host} answers every non-browser request with 999.`)
      console.log(`    Open it in a browser once and confirm it resolves to the right profile.`)
    }
  }

  if (broken.length) {
    console.error(`\n${broken.length} broken external link(s). This fails the build.`)
    process.exit(1)
  }

  console.log(
    `\nlink check OK — ${results.length} external link(s) across ${ROUTES.length} routes, ` +
      `${broken.length} broken, ${unverifiable.length} needing a manual click.`,
  )
}

await main()
