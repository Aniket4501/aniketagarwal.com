# Decisions

Orchestrator's reconciliation log. One entry per phase gate: what each agent recommended, where
they disagreed, what I decided, and why. A technical hiring manager may read this file.

---

# Phase 1 — Discovery & strategy

**Agents run:** 1 (Product Strategy Reviewer → `01-narrative.md`), 1b (adversarial truth auditor →
`01b-truth-audit.md`), 2a/2b/2c (research → `02-research.md`).

## The finding that reorganised the build

Both discovery agents, working independently, reached the same conclusion:

> **The site specified by `portfolio-strategy-aniket-agarwal.md` cannot be built truthfully.**

The truth audit catalogues **over 60 factual claims** in the strategy document that appear in
neither the resume nor the LinkedIn export, including five inside fenced code blocks that a builder
copies wholesale. The most consequential:

| Strategy asserts | Source actually says |
|---|---|
| Cold start `1.9s` — in **10 places**, including the recommended `<title>` and the OG image spec | `"delivered <2s launch time"` — an inequality. The string `1.9` appears nowhere. |
| `P75, low-end Android` | No percentile, no device population anywhere. Strategy also contradicts itself: `mid-tier (2–4GB RAM)` in one place, `low-end` in three others. |
| `Team: 4 engineers, 1 designer, no dedicated QA` | Zero headcount data. Strategy gives **three different numbers** in four places (3, 4, 4, four). |
| `Timeline: 8 weeks, Q1 2025` | A duration only, no date. And "Q1 2025" contradicts the strategy's own "my first eight weeks" (= Oct–Nov 2024). |
| Session time denominator `enrolled cohort, post-launch` | Population, timeframe and method are all absent — and "enrolled cohort" is the most self-serving reading available. |
| `+20% DAU` beside Steps Premier League | The resume attributes +20% DAU to the **engagement suite**, a different initiative in a different bullet. |
| The seven-stage AI Health Reports architecture, and *"the model writes the prose; deterministic rules decide the medicine"* | Nothing about safety, evaluation, escalation or clinical sign-off exists in the record. |
| Four user quotes, presented in quote marks | No user quote exists in any source. |
| Alt text example `"drop from 62% to 31%"` | Two invented retention figures, in the place a builder least fact-checks and a screen-reader user most trusts. |
| `Six products taken 0→1 across five companies` | Two are labelled 0→1 in the resume. One ("Revamped QuickSell") contradicts the label. The six span **four** companies, not five. Three predate the HCL start, so "in two years I've taken six 0→1" is false on its own terms. |

**D1-01 — The truth audit is binding.** Its §8 "build-failure conditions" list is enforced. Where the
strategy document and the audit conflict, the audit wins, without exception. The strategy is a
proposal; the resume and LinkedIn are the record.

## Positioning

**D1-02 — The recommended hero is rejected.** *"Health apps are the hardest retention problem in
consumer software. I've spent two years solving it for a million people."* fails three ways:

1. **"the hardest"** is a superlative comparative across all consumer software, made by someone whose
   record covers one consumer category. The supporting benchmark is uncited. The strategy's own safer
   form — *"one of the hardest"* — exists in the same document and is ignored in the headline.
2. **"two years"** is 22 months, and it inflates past Aniket's own resume header ("1.5+ Years"), in
   the inflating direction, on the one document a recruiter holds beside the site.
3. **"solving it"** — and this is the finding that matters most — **there is no retention metric
   anywhere in the record.** Every HCL outcome is session time, DAU, latency, bundle size or revenue.
   "Retention" appears exactly twice, both times as a *problem statement*, never as a measured
   outcome. A Head of Product who reads "retention is what I do" and finds only session time and DAU
   does not conclude the numbers are missing. They conclude the candidate does not distinguish
   engagement from retention — a literacy question, not a documentation gap.

**D1-03 — The positioning noun is ENGAGEMENT, not retention.** The word "retention" appears on the
site only where it appears in the record: as the problem being addressed, never as an outcome Aniket
moved. No "I own retention", no `/approach` belief built on the word.

**D1-04 — The hero is the reframe.** Adopted, exact words:

> **The roadmap was engagement. The app took fifteen seconds to open.**
> **I spent eight weeks there instead. We shipped it under two.**

Trace: "the roadmap was engagement" ← b1 *"defined product roadmap… prioritized engagement features"*
(he owned the roadmap, so choosing to spend eight weeks elsewhere is his own prioritisation, not an
overridden mandate — this is why "instead" is admissible where the strategy's *"I was asked to"* is
not). "fifteen seconds" ← b2 *"15s launch time"*. "eight weeks" ← b2 *"in 8 weeks"* — **without
"first"**, which invents a sequence. "under two" ← b2 *"<2s"*. Nineteen words, two lines, no
superlative, no tenure claim, no retention claim, no invented decimal.

Note this makes the site's central hook a *judgment signal delivered as a headline*, and it is
seniority-independent: the physics of a fifteen-second cold start does not care that the candidate
has 22 months of experience. That directly addresses the register/record mismatch identified as the
single most likely reason a Head of Product closes the tab.

**D1-05 — No total-years figure appears anywhere.** The site states `October 2024 – present` and lets
the reader do the arithmetic. Revisit from October 2026, when "two years" becomes literally true.

## Case studies

**D1-06 — Order confirmed: Two Seconds · Steps Premier League · AI Health Reports.** Both agents
independently confirm the strategy's ordering, with higher confidence in #1 than the strategy has.
Two Seconds is built on the only two metrics in the entire record that are already publishable:
`25MB → 6MB` (the only one with a complete baseline, unit and timeframe — and the only delta on the
site that computes to an exact percentage, 76%) and `15s → under 2s`.

**D1-07 — Case study 3 is rebuilt as a monetisation case study, not an AI safety case study.**
Its subject becomes **who pays**: the beneficiary reads the report, the employer buys the programme,
and the report is what makes the programme legible at renewal. The AI is mechanism, not subject.
Every safety, eval, grounding-rate, refusal-layer and clinician-review element specified by the
strategy is cut — none of it is in the record, and it would be presented to the audience best
equipped to detect fabrication, in the round where it is tested hardest.

**D1-08 — The safety question is named, not answered, and it bridges to Grounded.** The case study
states plainly that the first question an AI-PM interviewer asks is how a generated health report
avoids giving medical advice, and that the answer is not in Aniket's published record. It then links
to `/lab/grounded` — a tool built to answer that question properly, and labelled as built for this
portfolio, not at work. This is honest, and it is the only construction that makes Grounded's
existence make sense on the page.

**D1-09 — The "six 0→1" count is dropped.** The site claims only what the resume labels: two 0→1
launches at HCL (Steps Premier League, AI Health Reports), plus a four-feature engagement suite.

**D1-10 — CSAT +50% is cut entirely**, not placeholdered. No scale, no baseline, no post-value, no N,
no period. One number nobody believes contaminates the numbers they would have believed. The Circle
Health short case is carried by the journey work, not the metric.

## The proof strip

**D1-11 — Three lines, not four.** The strategy's own gate ("do not ship until every number has a
denominator") is violated by its own strip: four fabricated components, one fabricated precision, three
absent methods, two absent baselines and one misattribution. The fourth slot was never a metric.

**D1-12 — `+122%` is never rendered adjacent to `3.5 → 7.8 min`.** `(7.8−3.5)/3.5 = +122.86%`, which
rounds to **+123%**, not 122. The resume is internally inconsistent by one point. Dividing 7.8 by 3.5
takes a sceptic four seconds, and finding a self-inconsistent number on a site whose thesis is
"I state numbers carefully" discounts every other number on the page. The site shows `3.5 → 7.8 min`
and lets the reader do the arithmetic — which is the strategy's own stated preference elsewhere.

**D1-13 — `−87%` is not rendered as a clean delta.** The source states an inequality (`<2s`), so the
true reduction is a *lower bound* of 86.7%, not a value. The site shows `15s → under 2s` and, where a
delta helps, **"at least 7.5× faster"** — which is true, defensible, and more striking than a
percentage that pretends to three significant figures.

## Visuals — the largest structural change

**D1-14 — Six of the nine mandated visuals require data that does not exist and are cut or replaced.**
A diagram is a claim. Drawing a latency waterfall requires per-phase timings; drawing a bundle
treemap requires composition; drawing a device-tier matrix requires a full grid of values; drawing a
cohort curve requires retention figures; drawing a decision matrix requires scores. **None of those
exist in any source.** Ninety percent of the area of each of those diagrams would be invented.

| Mandated visual | Decision |
|---|---|
| Latency waterfall, annotated | **Replaced** by a to-scale comparison of the three real numbers: 15s, the 2s benchmark, and the shipped result. Invents nothing; the scale gap is the point. |
| Bundle treemap (25MB composition) | **Replaced** by a to-scale area comparison of 25MB vs 6MB. Both totals are in the record; the composition is not. |
| Device-tier matrix | **Cut.** Every cell would be invented. |
| Cohort retention curve, annotated at week 2 | **Cut.** No retention figure exists. Replaced by the argument in prose. |
| Decision matrix, three options × scored dimensions | **Replaced** by the three real option names (content, incentives, gamification) and the real choice, with the scoring criteria shown as an open question rather than invented scores. |
| Habit loop diagram | **Replaced** by an argument diagram about why a social cost is felt daily and a health benefit annually — an argument, not a claim about what shipped. |
| Safety-boundary architecture | **Cut.** The pipeline is not in the record. A missing diagram costs less than a fabricated one. |
| Eval scorecard | **Kept — and it is real.** Generated from `public/grounded-baseline.json`, which is produced by actually running the harness. |
| MetricDelta, ~20 instances | **Kept**, with corrected values and no invented denominators. |

**D1-15 — No product screenshots.** None exist. None will be generated. The "What shipped" section of
each case study carries diagrams and prose, or it is omitted.

**D1-16 — No artifact drawer claims to contain a real or redacted document.** None exists. Drawers
carry reasoning and method — the arguments behind a decision — which is honest, is genuinely useful,
and is what the strategy actually wanted from them.

## Agent conflict, arbitrated

**Agent 1 §5 item 10** says no `[NEEDS: …]` token should ship, because "an empty slot advertises a gap
that would otherwise have been invisible." **The build brief §0.1** mandates visible `[NEEDS: …]`
tokens for anything that cannot be derived or cut.

**D1-17 — Visible tokens ship, and the count is minimised by cutting first.** Reasoning:

- The brief requires them, and requires them to be visible on the rendered page.
- The site genuinely is not shareable until thirteen answers arrive. Saying so is accurate.
- Aniket needs to see the holes to fill them. A gap logged only in a markdown file does not get closed.
- Rendered as a deliberate part of the design system — amber `--flag`, mono, phrased as a specific
  answerable question — a token reads as a working document awaiting six answers, which is what this
  is. It does not read as a broken template.

Agent 1's concern is nonetheless honoured in the strongest available way: **where a cut is cleaner
than a placeholder, the claim is cut** (§0.1 option 3). That is why CSAT is gone, the fourth proof
strip line is gone, "six 0→1" is gone, six diagrams are gone, and the testimonial block is omitted
entirely rather than stubbed.

The final report will state plainly that the site is not shareable until the blocking answers land.

**D1-18 — Where the narrative agent and the truth audit disagree, the audit wins.** Two instances:
the narrative's recommended hero sub-line contains "Six products taken 0→1" (audit E1: unsupportable)
and "reached through employer health plans" (audit A4: the distribution channel is an unconfirmed
assumption). Both are removed from the hero.

**D1-19 — One narrative recommendation is rejected outright.** Agent 1 proposes a ready-written
postmortem for Steps Premier League: *"I never got a clean week-2-to-week-4 retention read."* That is
a factual claim about what Aniket measured, and absence from a resume is not evidence of absence in
the work. **The site will not put words in his mouth about his own judgment.** What ships instead is
the defensible version: the resume names session time as the declared North Star (b3, verbatim), and
the site states that plainly and then argues the case for and against that choice in a health app.
True, sourced, and it demonstrates the same metric literacy without ventriloquism. The mandatory
"What I got wrong" section remains a visible `[NEEDS: …]` in every case study.

## Other bindings

- **D1-20** — `jobTitle` in JSON-LD is `"Product Analyst"`. The literal title appears verbatim at
  least once on a page a recruiter reaches. Absent from the site but present on LinkedIn reads as
  concealment, which costs more than the title does.
- **D1-21** — Every timeline row prints its real title. Rendering four internships as "Product" is
  title inflation in the most recruiter-scanned block on the page, and it breaks the instant LinkedIn
  is opened.
- **D1-22** — No industry descriptors that are not in the record: no "Insurance claims", no "Auto
  marketplace", no "Fintech onboarding".
- **D1-23** — No degree discipline is named anywhere until conflict C2 is resolved. Three different
  degree names exist across two documents.
- **D1-24** — No uncited third-party benchmark. The ABDM market note ships only with live citations,
  or not at all.
- **D1-25** — Total readable text target lowered from the brief's 6,000 words to **~4,000**. Volume of
  prose is itself an implicit claim about how much there is to say.
