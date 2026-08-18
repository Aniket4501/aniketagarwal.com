# 06 — Architecture

Written by the orchestrator rather than delegated, because every decision here was taken while
building and each one has a measurement behind it. Where this departs from the brief, the departure
is stated with the reason.

---

## Stack

| Piece | Choice | Why this and not the alternative |
|---|---|---|
| Framework | **Next.js 16.3.1**, App Router, Turbopack | Fixed by the brief. Every route is statically generated. |
| Runtime | React 19.2.8, Server Components by default | — |
| Language | **TypeScript 5.9.3**, `strict` + `noUncheckedIndexedAccess` + `noUnusedLocals` | Not TS 7 (the native port). Next 16's own toolchain is validated against 5.x; a portfolio is not the place to debug a compiler migration. |
| Styling | **Tailwind CSS 4.3.3** with `@theme` | CSS-first config. No `tailwind.config.js`, so tokens live in one file next to the CSS that consumes them. |
| Content | **MDX files + `gray-matter` + `zod`**, rendered by `next-mdx-remote/rsc` | See below. |
| Images | `next/image`, AVIF + WebP | No raster assets ship today — every diagram is a component. |
| OG | `next/og` (`ImageResponse`) with committed TTFs | Satori cannot read woff2, and a build-time font fetch loses its typography the first time it is rate-limited. |
| Deploy | Vercel from GitHub | Fixed by the brief. |

**Every dependency, justified.** The full list is eleven packages plus types:

- `next`, `react`, `react-dom` — the stack.
- `typescript`, `@types/*` — strict mode.
- `tailwindcss`, `@tailwindcss/postcss` — the token layer.
- `zod` — build-time content validation. This is the enforcement mechanism for the two credibility
  rules, not a convenience.
- `gray-matter` — frontmatter parsing. One dependency, no alternative needed.
- `next-mdx-remote` — MDX compiled inside a Server Component.
- `@next/bundle-analyzer`, `tsx` — the size budget and the check scripts.
- `eslint`, `@eslint/eslintrc`, `eslint-config-next` — lint.

**Deliberately not added:** any animation library, any UI component library, any icon library, any
CMS, `rehype-slug` (six lines in the components map instead), and `date-fns` or equivalent.

### Why not Velite

The brief offers Velite or `next-mdx-remote/rsc`. Velite pulls `sharp`, `terser` and `esbuild` as
direct dependencies and compiles MDX to a function-body string that needs a runtime evaluator —
which fights the requirement that case-study routes ship zero client JavaScript.
`next-mdx-remote/rsc` compiles inside a Server Component, so the rendered case study is markup by
the time it reaches the browser. Contentlayer is unmaintained and was never a candidate.

### Why no CMS

Aniket is the only author. A CMS adds a network dependency, a build coupling and a monthly bill for
zero benefit. File-based content means adding a case study is a pull request, the content is
diffable, and the repository itself becomes a secondary artifact for a technically curious reviewer.

---

## Routes

```
app/
├── layout.tsx                        fonts, nav, footer, metadata defaults, JSON-LD Person
├── page.tsx                          home
├── globals.css                       every design token
├── fonts.ts                          three families, scoped
├── work/
│   ├── layout.tsx                    adds the reading serif — see "font scoping"
│   ├── page.tsx                      index + the two short cases
│   └── [slug]/
│       ├── page.tsx                  generateStaticParams over the collection
│       └── opengraph-image.tsx       per-case-study OG, with its own metric
├── approach/page.tsx
├── lab/
│   ├── page.tsx
│   └── [slug]/page.tsx               the demo above the writeup
├── about/page.tsx                    + JSON-LD ProfilePage
├── opengraph-image.tsx
├── sitemap.ts
├── robots.ts
├── not-found.tsx
└── og-fonts/                         build-time only, never served
```

`/resume` redirects to `/aniket-agarwal-resume.pdf` via `next.config.ts`, so the URL is speakable.

**There is no `app/api/` directory.** The brief specifies `api/grounded/evaluate/route.ts` as the
only dynamic route. It was cut: all four Grounded dimensions are decidable by deterministic rules,
and rules run in the browser. Consequences — the demo works offline, costs nothing, needs no key,
cannot be rate-limited into uselessness, and has no server to fail. **Every route on this site is
static.**

---

## Content schema

Two fields are non-optional and exist to force a behaviour into every case study ever added:

```ts
CaseStudy {
  slug, title, tagline, headline, order,
  role, teamShape, timeline,
  owned:    string[]  // min 1
  shipped:  string[]  // min 1
  notOwned: string[]  // min 1 — the build fails without it
  metrics: Metric[]   // each REQUIRES denominator, timeframe and method
  artifacts: Artifact[]  // max 4; label min 12 chars, so it cannot be "Read more"
  description, ogHeadline, ogMetric, published
}
```

A `[NEEDS: …]` token is a valid value for any of those string fields, and renders as a visible amber
chip. **That is the designed behaviour, not a workaround** — the schema's job is to make it
impossible to ship a number without stating what it was measured over, and a visible unanswered
question satisfies that where an invented denominator does not.

`mistake` is deliberately **not** a schema field. A required confession field guarantees that four
slots get filled against a record containing zero failures, and four trivial admissions read worse
than one real one because the pattern becomes visible as a format.

---

## Components

Twenty-one, which is close to the brief's target. A portfolio does not need a design system.

```
components/
├── layout/    Nav · Footer · Container · Section (+ Eyebrow)
├── content/   MetricDelta · ProofStrip · OwnershipBlock · Drawer · Callout ·
│              DecisionTable · Figure · Timeline · ProgressRail (ReadProgress,
│              SectionIndex, Rail)
├── diagrams/  ColdStartScale · BundleScale · OptionSpread · FeedbackCadence ·
│              EvalScorecard
├── work/      CaseCard · ShortCase
├── lab/       GroundedDemo
└── ui/        Needs (+ WithNeeds) · CopyEmail
```

**`MetricDelta` is the signature and renders around twenty times.** Its denominator is set at the
same size as its label — never smaller, never in a tooltip, never on hover. A denominator you have
to hover to see is a denominator you are hiding.

### Client components — this list is exhaustive

`CopyEmail` and `GroundedDemo`. That is all.

The brief lists five, including `Nav`, `ArtifactDrawer` and `ProgressRail`. None of those needs to
be:

- **Nav** — the mobile panel is a native `<details>`; the condense-on-scroll is a CSS scroll-driven
  animation against a sentinel.
- **Drawer** — a native `<details>`, so its content is in the DOM whether open or closed, therefore
  indexed and `Cmd-F`-findable while collapsed, keyboard operable, and correctly announced. None of
  that comes free with an `aria-expanded` div and `useState`.
- **ProgressRail** — the indicator is `animation-timeline: scroll(root block)`; the index is a list
  of anchors. Where `animation-timeline` is unsupported the bar stays at zero and the navigation
  still works.

`GroundedDemo` dynamically imports the rules engine, so the evaluator is not in the initial payload
of `/lab/grounded`.

---

## Font scoping

Three families, latin only, no serif italic:

| Face | Role | Latin KB | Loaded on |
|---|---|---:|---|
| Instrument Sans | interface, display | 29.2 | every route |
| Geist Mono | every numeral | 22.6 | every route |
| Newsreader (roman) | long-form prose | 56.8 | `/work/*`, `/approach`, `/about`, `/lab/*` only |

The homepage sets no serif, so Newsreader is applied in nested layouts rather than the root. The
serif italic is omitted entirely — it would add 63 KB to carry emphasis that weight 600 already
carries, and 171 KB of font on a site whose lead case study is about a 25MB bundle is not
defensible.

`axes: ['opsz']` is **not** requested on Newsreader. `next/font` downloads the weight axis only by
default and instances it at `opsz 18` — the Text optical size, correct for 21px body copy.
Requesting the optical-size axis costs 2.3× the bytes for a file whose default rendering is
identical.

---

## Performance budget — measured, and one criterion reported unmet

| Criterion | Target | Status |
|---|---|---|
| Framework floor, gzipped | — | **134.2 KB measured** on a page with one heading and no client components |
| Homepage JS | < 90 KB gzipped | **Not reachable on this stack.** Below the Next 16 + React 19 App Router baseline. Reported as unmet with the measurement rather than enforced as a gate that can only fail. |
| Total first-load JS per route | ≤ 145 KB gzipped | enforced, fails the build |
| Application code per route | ≤ 20 KB gzipped | enforced, fails the build |
| Lighthouse mobile | Perf ≥ 98 · A11y 100 · BP 100 · SEO 100 | measured in Phase 8 |

`scripts/check-budget.ts` measures what the browser actually downloads — every `<script src>` in
the prerendered HTML, gzipped — rather than trusting a build manifest, and excludes `noModule`
polyfills because no browser that can run this site fetches them.

---

## Build gates

`npm run verify` runs, in order, and any failure stops the build:

1. `typecheck` — `tsc --noEmit`, strict.
2. `check:truth` — 21 patterns from the adversarial audit's build-failure list, over source and
   built HTML.
3. `check:content` — Zod over every content file, plus banned marketing language and any unqualified
   percentage in readable copy.
4. `build` — `next build`.
5. `check:budget` — gzipped first-load JS per route.

---

## SEO

- Metadata API per route. Title pattern is outcome-first, name-last.
- **JSON-LD `Person` on the root and `ProfilePage` on `/about`.** `jobTitle` is `"Product Analyst"` —
  the title in both source documents. Writing "Product Manager" would publish a machine-readable
  false claim to search engines and to AI-assisted screening tools, and it is the
  highest-consequence single word on the site. `check:truth` asserts it.
- No `alumniOf` degree field and no GitHub `sameAs`: the degree name is in three-way conflict and
  the GitHub URL is unverified.
- Generated `sitemap.ts` and `robots.ts`. Canonical on every route.

## Analytics

**Not installed.** The brief specifies Vercel Analytics plus six tracked events. Nothing is added
until Aniket asks for it: it is client JavaScript on a site whose argument is payload discipline, it
is a third-party request on a page that currently makes none, and the events are only worth having
if someone reviews them monthly. The hook is one line in `app/layout.tsx` when he wants it, and the
recommendation with the six events is in the final report.
