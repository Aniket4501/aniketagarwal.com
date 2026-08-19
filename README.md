# aniketagarwal.com

A product portfolio for Aniket Agarwal. Next.js App Router, statically generated, no database, no
CMS, no backend.

The site makes one argument — that its author states numbers the way someone who has been
challenged on numbers states them — so the interesting part of this repository is not the rendering.
It is that **the build refuses to ship a claim the source material does not support.**

```bash
npm install
npm run dev          # http://localhost:3000
npm run verify       # typecheck → truth gate → content gate → build → bundle budget
```

---

## The two gates that make this repo worth opening

### 1. The content schema enforces credibility, not just shape

`lib/content/schema.ts` makes two fields non-optional:

```ts
notOwned: z.array(z.string()).min(1,
  'A case study that cannot state what it did not own does not ship.')

metric: { before, after, denominator, timeframe, method }   // all required
```

A case study that cannot say what its author did **not** own fails the build. A number without a
population, a window and a measurement method fails the build. Both were chosen because candidates
maximise ownership claims and quote unfalsifiable percentages, and a schema is a more reliable
editor than good intentions.

`scripts/validate-content.ts` adds two rules a schema cannot express: no banned marketing language,
and no unqualified percentage anywhere in readable copy.

### 2. The truth gate

`scripts/check-truth.ts` holds 21 patterns, each one a specific claim that appears in the project
brief but in **neither the resume nor the LinkedIn export**. A hit fails the build.

It exists because an adversarial audit of the brief (`docs/01b-truth-audit.md`) found more than
sixty such claims, five of them inside fenced code blocks that a builder copies wholesale. The most
expensive was a cold-start figure of `1.9s`, repeated ten times including in the recommended page
title and the Open Graph image spec. The resume says `<2s`. The string `1.9` appears in no source
document.

The gate runs over source **and** over the built HTML, because a banned string can be assembled at
render time. It caught two violations in code written for this repo — three unsourced industry
descriptors and an unverified GitHub URL — after they had already been committed.

### Internal QA never ships

V1 rendered its own content gaps on the public site — twenty-six amber `[NEEDS: …]` markers, in
red, in production. The intent was "this person knows what a denominator is." The effect was a form
with validation errors, and it trained the reader to scan every page for what was missing.

V2 inverted the rule. The schema **rejects** an internal marker in any field, and both gates fail
the build on one:

```ts
const clean = (label: string) =>
  z.string().refine((v) => !/\[NEEDS:/i.test(v), {
    message: `${label} contains an internal marker. Those belong in CONTENT_GAPS.md, never on the site.`,
  })
```

Open questions live in [`CONTENT_GAPS.md`](./CONTENT_GAPS.md) and nowhere else. The site shows only
what is verified; where a fact is missing, the sentence is written so it does not need it.

---

## Adding a case study

One file. `content/work/<slug>.mdx`:

```mdx
---
slug: step-syncing
title: Step Syncing
category: Performance & adoption
outcome: A fifteen-second launch cut to under two seconds, and step-sync completion up 35%.
problem: The step count people opened the app for sat behind a fifteen-second wait.
change: I reclassified launch time from an engineering backlog item into a product requirement.
order: 1
role: Product Analyst, HCL Healthcare
timeline: 8 weeks
team: Cross-functional initiative with the engineering team
scope: Diagnosis · prioritisation · scope arbitration · launch gate
owned: ['Diagnosing launch time as the adoption blocker']
shipped: ['Launch time from 15s to under 2s']
notOwned: ['The engineering. I did not choose the technical approach or write any of the code.']
headline:
  label: App launch time
  before: 15s
  after: under 2s
  delta: At least 7.5× faster
metrics: []
figures:
  - value: +35%
    label: Step-sync completion
    context: More people reached the number they opened the app for.
drawers: []
description: A fifteen-second app launch was the real adoption blocker on a health app with 1M+ users.
ogHeadline: The roadmap said engagement. The app took fifteen seconds to open.
ogMetric: 15s → under 2s
---

## Section headings are claims, not labels

Body copy. Available in MDX: `<Callout>`, `<Drawer>`, `<DecisionTable>`, `<Figure>`, `<Flow>`,
`<BeforeAfterFlow>`, `<DurationBars>`, `<Funnel>`, `<LoopDiagram>`, and the per-case artifacts.
```

Then `npm run verify`. The route, the sitemap entry, the section index and a per-case Open Graph
image with its own metric are all generated. Available in MDX: `<MetricDelta>`, `<Callout>`,
`<Drawer>`, `<DecisionTable>`, `<Figure>`, and the five diagram components. `[NEEDS: …]` written
inline in prose renders as a chip with no import.

---

## Grounded

`/lab/grounded` is a working evaluation harness for LLM-generated health summaries. It scores text
on four dimensions — grounding, scope, escalation, readability — against a visible rubric.

**It runs in the browser.** All four dimensions are decidable by deterministic rules, so there is no
model call, no API key, no rate limit and no server. Sample results are pre-computed at build time
into `public/grounded-baseline.json`, so selecting a case is a render rather than a request; the
rules engine is dynamically imported only when a visitor edits the text.

```bash
npx tsx scripts/run-golden-set.ts    # re-runs the set, rewrites the baseline
```

The first run of that script scored 11/16 and found four bugs in the harness — the dosage rule was
matching `88 mg/dL`, a lab *result*, as if it were a dose — and two labels that were wrong. That
history is kept in `lib/grounded/run-history.ts`, because the failed run is the argument for having
a golden set at all.

The set is 16 synthetic cases and **none of them is hand-labelled**. The page says so. Agreement is
currently 16/16, which measures internal consistency between rules and labels written by the same
author, not correctness.

---

## Performance

`scripts/check-budget.ts` measures what the browser actually downloads — every `<script src>` in the
prerendered HTML, gzipped — and fails the build over budget. It excludes `noModule` polyfills, which
no browser that can run this site fetches.

| | |
|---|---|
| Framework floor | **136.3 KB gzipped**, measured on a page with one heading and no client components |
| Total per route | ≤ 145 KB gzipped, enforced |
| Application code per route | ≤ 20 KB gzipped, enforced |

The original brief set a 90 KB homepage ceiling. That is below the Next.js 16 + React 19 App Router
baseline and is not reachable on this stack at any level of discipline, so it is reported as unmet
with the measurement rather than enforced as a gate that can only fail.

Client JavaScript exists in three places: `Nav` (for its active state), `CopyEmail`, and
`GroundedDemo`. The mobile menu and every disclosure drawer are native `<details>` with no
JavaScript at all. Application code measures **0 KB on every route except `/lab/grounded`**, which
carries the 6.5 KB demo.

---

## Environment variables

**There are no required environment variables.** `.env.example` documents the two optional ones
(`NEXT_PUBLIC_SITE_URL`, `ANALYZE`). The site builds, deploys and runs every route with an empty
environment.

---

## Structure

```
app/          routes, tokens (globals.css), fonts, OG images, sitemap, robots
components/   layout · content · diagrams · work · lab · ui
content/      MDX. The site's text lives here and nowhere else.
lib/          content pipeline + Zod schema · Grounded evaluator · site constants
scripts/      the four build gates
docs/         the reasoning behind the build — see below
public/       resume PDF, pre-computed Grounded baseline
```

## Docs

These are deliverables, not notes. A technical hiring manager may read them.

| File | What it is |
|---|---|
| [`CONTENT_GAPS.md`](./CONTENT_GAPS.md) | Thirteen blocking questions, eleven source conflicts between the resume and LinkedIn, and every redaction decision |
| [`docs/DECISIONS.md`](./docs/DECISIONS.md) | Every arbitration, including where agents disagreed and why one won |
| [`docs/00-source-facts.md`](./docs/00-source-facts.md) | The verbatim record. Nothing on the site may exceed it. |
| [`docs/01b-truth-audit.md`](./docs/01b-truth-audit.md) | The adversarial audit. Section 8 is the list `check:truth` enforces. |
| [`docs/06-architecture.md`](./docs/06-architecture.md) | Stack, routes, schema, budget, and every departure from the brief |
| [`docs/current-site-critique.md`](./docs/current-site-critique.md) | The V1 teardown that produced this redesign |

## Deployment

`main` auto-deploys to production on Vercel; every pull request gets a preview URL. Run
`npm run verify` before pushing — it is the same sequence CI should run.
