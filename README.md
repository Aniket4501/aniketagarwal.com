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

### `[NEEDS: …]`

Where a fact could not be derived and cutting the claim would leave a hole, the content carries a
visible token:

```
denominator: "[NEEDS: which device population was measured?]"
```

It renders as an amber chip in the same colour the site uses for *this is where I was wrong* — a
claim that cannot yet be substantiated and a decision that went wrong are the same kind of honesty,
so a reader can scan for either without reading a word. Every token maps to an answerable question
in [`CONTENT_GAPS.md`](./CONTENT_GAPS.md).

**The site is not ready to share until those questions are answered.** That is the honest state of
it, and the tokens are how it says so.

---

## Adding a case study

One file. `content/work/<slug>.mdx`:

```mdx
---
slug: two-seconds
title: Two Seconds
tagline: Cutting cold start from 15s to under 2s
headline: The roadmap was engagement. The app took fifteen seconds to open.
order: 1
role: Product Analyst, HCL Healthcare
teamShape: "4 engineers, one designer, no dedicated QA"
timeline: 8 weeks
owned: ['Problem diagnosis', 'Scope arbitration', 'The launch gate']
shipped: ['A cold start under two seconds', 'A 6MB bundle']
notOwned: ['The implementation. Engineering owned the technical approach.']
metrics:
  - label: COLD START
    before: 15s
    after: under 2s
    denominator: 'production telemetry'
    timeframe: '8 weeks'
    method: 'staged rollout, pre/post within device tier'
    direction: down-is-good
artifacts: []
description: A launch-time problem that was actually an adoption problem.
ogHeadline: I spent eight weeks on launch time instead.
ogMetric: 15s → under 2s
---

## The app took fifteen seconds to open

Section headers are claims, not labels...
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
| Framework floor | **134.2 KB gzipped**, measured on a page with one heading and no client components |
| Total per route | ≤ 145 KB gzipped, enforced |
| Application code per route | ≤ 20 KB gzipped, enforced |

The original brief set a 90 KB homepage ceiling. That is below the Next.js 16 + React 19 App Router
baseline and is not reachable on this stack at any level of discipline, so it is reported as unmet
with the measurement rather than enforced as a gate that can only fail.

Client JavaScript exists in exactly two places: `CopyEmail` and `GroundedDemo`. The navigation, the
mobile menu, the disclosure drawers and the reading-progress indicator are all native `<details>`
and CSS scroll-driven animations.

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

## Deployment

`main` auto-deploys to production on Vercel; every pull request gets a preview URL. Run
`npm run verify` before pushing — it is the same sequence CI should run.
