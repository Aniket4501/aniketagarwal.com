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

---

## Phase 1 continued — research reconciliation

Agent 2a's findings are source-verified with URLs and an explicit evidence-quality tag per claim
(`[V]` fetched and read · `[V-snip]` search summary only · `[INF]` inference · `[LOW-SRC]` vendor
content marketing). It also warns, correctly, that this entire field is dominated by recruiting firms
and PM training vendors with a commercial interest in the answer. Findings weighted accordingly.

**D1-26 — `--flag` moves off the terracotta axis: `#B4551F` → `#A32F35`.**
The brief forbids "cream background + high-contrast serif + terracotta accent" as templated look #1,
then specifies a warm off-white ground, a serif reading face, and `#B4551F`. Measured, `#B4551F` is
**hue 22 — more orange than the terracotta reference `#D97757` at hue 15.** Two of the three markers
of the banned look were in the brief's own palette. `#A32F35` is hue 357: the register a lab report
uses to flag an out-of-range value. It also gains headroom (4.52 → 6.39 on paper) and clears AA on
its own tint at 6.33, which the amber could not (4.43) — so the mistake callout can now have a
ground colour rather than only a border.

**D1-27 — The failure requirement drops from four confessions to one.**
The brief mandates "What I got wrong" in all three case studies plus a postmortem on `/approach`.
The record contains zero failures. Four slots against zero material produces either fabrication or
four trivial admissions, and *four trivial admissions read worse than one real one, because the
pattern becomes visible as a format rather than as honesty.*

The evidence bar is also lower than the brief assumes. A reviewer who has run hundreds of portfolio
reviews names what sustains reading as *"A number. A decision. A trade-off you'd make differently"* —
and the test is whether there is **visible friction anywhere on the site**, not whether every case
study has a confession section. What ships:

- Each case study ends with a section carrying genuine analytical content about what the work
  traded away and what instrument would have been better — writable honestly, because it is
  argument about the work rather than biography.
- **One** visible `[NEEDS: …]` postmortem, on `/approach`.

**This means the brief's Section 15 checkbox "every case study contains one specific, owned mistake
with a consequence" ships UNMET, and the final report says so plainly with the question that unblocks
it.** It cannot be met without inventing Aniket's judgment about his own work.

**D1-28 — `mistake` is deliberately NOT a required schema field.** `notOwned` stays required. A
required confession field guarantees the format-compliance reading, which is the failure mode above.

**D1-29 — Grounded gets a first-class entry point above the attention cliff.**
Two documented facts collide: general reviewer attention is exhausted around case study three, while
AI-PM reviewers *"open the live URL first, search for the eval suite next, and read the reflection
section last."* The brief puts Grounded at homepage section 5 of 6 and simultaneously calls it the
load-bearing item for AI-PM credibility. Fix: a one-line pointer in the hero block linking straight
to `/lab/grounded`, plus `Lab` in the primary nav. The homepage section stays where it is as the
fuller treatment.

**D1-30 — The case-study order stands, but case 3 is written for a reader arriving from Grounded**,
not from the top of the homepage — because position three is where reading demonstrably stops. Two
Seconds must stay first: it is the only case built on metrics that are already publishable.

**D1-31 — The proof strip ships three cells, and the enterprise line leaves it.**
A qualitative claim ("USP in 5+ closes") has no before, no after and no denominator, and does not
belong in a grid whose stated purpose is qualified deltas. It moves to the case-study card.

**D1-32 — The word-count constraint is replaced.** The brief caps the whole site at 6,000 words,
which caps *available* depth as well as *required* depth — while the documented behaviour of a
converted reader is nearly an hour on a single portfolio. New rule: **required reading path ≤ ~1,200
words** (hero + proof + one case study's load-bearing sentences); optional depth uncapped, subject
only to being load-bearing and honest. The failure mode to guard against is padding, not length.

**D1-33 — The drawer is not called an artifact drawer in the UI.**
A drawer labelled "Artifacts" that opens onto self-authored diagrams converts a neutral absence into
a discovered overclaim — worse than having no drawer. It is labelled for what it contains:
**"How I worked this out."** The word *artifact* is reserved for the day a real redacted document
exists, and the component is already built to receive one.

**D1-34 — Testimonials become LinkedIn recommendations with a public link.**
A quote hosted on the candidate's own site is unverifiable by construction, and this audience
discounts unverifiable claims — which is the entire premise of the brief. Same words, verifiable
source, one click for the sceptic. Added to CONTENT_GAPS as N2.

**D1-35 — No published Lighthouse badge in the footer.** The brief suggests it as an earned flex. It
is checkable forever, decays silently on every deploy, and reads as a flex to precisely the reader
who dislikes flexes. Keep the score; drop the badge.

**D1-36 — The prose style is itself a hiring risk, and it is a build gate.**
49% of 1,500 hiring managers now treat heavily AI-generated application material as a red flag —
second only to job-hopping — and detection is tonal, not tool-based: *"generic phrasing, templated
structure, tone mismatches."* A separate finding: 49% report candidates cannot defend AI-assisted
claims under questioning. Two gates follow:

- **The defensibility test.** Every sentence that ships must be one Aniket can expand on for ninety
  seconds under hostile questioning. If he cannot, it is deleted regardless of how good it sounds.
- **Anti-LLM-prose rules**, enforced in the content pass: no triads in consecutive sentences; no
  "not just X, but Y"; no em-dash-per-paragraph rhythm; no abstract-noun section headers; no
  uniform paragraph length; no perfectly balanced pro/con framing with no position taken. One
  voice, one end-to-end rewrite pass, or the site reads as assembled.

**D1-37 — Additions to the rejected list, adopted in full:** no "ask my portfolio anything" chatbot
(a thin unevaluated API wrapper is the worst possible AI artifact for a candidate whose AI
credibility rests on eval rigour) · no count-up numbers in the hero · no loading, splash, skeleton or
route-transition animation (catastrophic for the candidate whose lead case study is a cold-start
fix — the first paint *is* case study one's live demo) · no employer logo strip · no reading-time
estimates · no `/now` page or personality furniture · no agency-voice CTA.

**D1-38 — Rejected from the research: none.** One finding is noted but not acted on: Agent 2a
suggests the case-study card layout risk of a three-up grid. The brief already specifies stacked
full-width rows, and both agree — no change needed.

---

# Phase 2 — Build decisions taken by the orchestrator

**D2-01 — There is no API route.** The brief specifies
`app/api/grounded/evaluate/route.ts` as "the ONLY dynamic route", rate-limited, with an optional
API key. It was cut. All four Grounded dimensions — grounding, scope, escalation, readability —
are decidable by deterministic rules, and rules run in the browser. The consequences are all good:
the demo works offline, costs nothing, needs no key, cannot be rate-limited into uselessness, and
has no server to fail. **Every route on the site is now static.**

The evaluator is loaded with a dynamic `import()` only when a visitor edits the text, so the rules
engine is not in the initial payload of `/lab/grounded`.

**D2-02 — The reading serif is scoped to the routes that set prose.** Newsreader costs 56.8 KB and
the homepage sets no serif at all. Applying its font variable in a nested layout rather than the
root keeps it off the homepage's critical path entirely.

**D2-03 — Nav and Drawer ship zero client JavaScript.** The brief lists both as Client Components.
Neither needs to be: the mobile panel and the disclosure are both native `<details>`, which are
keyboard operable, correctly announced, and functional before hydration — none of which a
`useState` toggle can claim. The only client components on the site are `CopyEmail` and
`GroundedDemo`.

**D2-04 — The measured framework floor is 134.2 KB gzipped**, on a page containing one heading and
no client components. The brief's "homepage JS under 90KB gzipped" is below the Next.js 16 +
React 19 App Router baseline and is not reachable on this stack at any level of discipline.
Enforcing it would ship a gate that can only fail. The budget script therefore separates the
framework floor from application code and enforces both — total ≤ 145 KB, application ≤ 20 KB per
route — and the final report states the 90 KB criterion as **unmet, with the measurement**.

**D2-05 — Diagrams are React components with CSS where text legibility matters, hand-authored SVG
where drawing matters.** The two scale comparisons and the option spread use real text so they stay
selectable and legible at 320px without a viewBox fighting the type scale. Only the feedback-cadence
argument diagram is SVG, because it is actually a drawing.

---

# Phase 8 — Review reconciliation

Six independent reviews ran against real screenshots at eight widths: two visual QA passes (mobile,
desktop) and four hiring-manager passes in character with real time budgets.

## Verdicts

| Reviewer | Verdict |
|---|---|
| **Startup CEO**, 90s, mobile | **YES**, same day. Remembered the hero verbatim. |
| **VP Product**, `/approach` first | **YES**, unhesitating for a first screen. Belief 03 — attacking his own best number — is what buys it. |
| **Head of Product**, 5–10 min, desktop | **Yes to the 30 minutes.** Would hire at APM / PM I, on the reasoning rather than the outcomes. |
| **Recruiter**, 20s, mobile | **FAIL** — two of eight facts unreachable. The only outright failure, now fixed. |

## What the reviews changed

**D8-01 — The recruiter gate was failing on the two facts that matter most to that reader.** The
resume was behind a "Menu" tap at 390px and absent from the hero link row entirely; location first
appeared at 81% of page height. Both are now on the first screen, and the resume is in the mobile
nav bar as well, because the hero row only exists on the homepage.

**D8-02 — The hero's amber chip was the highest-leverage single fix on the site.** The CEO
identified why, and he is right: everywhere else a chip says *"I refuse to invent a number"*; in the
hero it said *"I have not written my own headline yet."* Identical treatment, opposite signal, in
the two seconds where a reader decides whether the site is finished. Nothing needs a denominator for
what is on your desk this month. Written as a sentence.

**D8-03 — Three numbers were rendering as six tiles.** Hero, proof strip, and case cards each
repeated the same figures. *"Repeating a stat is what people do when they only have one."* Each
number now appears once on the homepage.

**D8-04 — MetricDelta was re-encoded, and the earlier design was wrong.** The single-track version
had three meanings for one widget — fill = after on `25MB → 6MB`, fill = before on `3.5 → 7.8 min`,
fill = nothing where there was no baseline — separated only by hue. On a site whose whole argument
is that figures are checkable, the signature element was the one thing a numerate reviewer would
have called wrong. It is now two bars from a shared origin at a shared scale, each labelled at its
own end.

**D8-05 — `Stat` was added because the schema was pushing an author toward invention.** Requiring
at least one *delta* per case study, against a record that gives outcomes without baselines,
produced `unstated base ▸ +15%` — a bar with no left endpoint, on the same page that said the base
was undefined — and `before: "0"` for enterprise closes, which invents a starting point. The schema
now requires at least one *qualified figure*, delta or otherwise.

**D8-06 — The decision table was clipped mid-word at 1440 with 570px of empty page beside it**, on
both case studies. The prose *column* had been constrained to the text *measure*. It is now a
content/wide grid: text keeps its 68-character measure, tables and diagrams take the column.

**D8-07 — Two of three case studies rendered TEAM and TIMELINE as red questions and nothing else.**
A three-column header block whose only populated column is ROLE reads as a broken form, not as
honesty. Empty fields are dropped; the unknowns collapse into one sentence and one chip.

**D8-08 — The `[NEEDS:]` chip was a spell-check squiggle.** Red text with a dotted underline is
pixel-for-pixel the browser's own error affordance. It now has a tinted ground and a literal
`NEEDS:` prefix, which gives a sighted reader the cue the `sr-only` span already gave a screen-reader
user.

## What was NOT fixed, and why

- **"The right column is empty for 95% of every long page."** Real, and left as is. Filling it means
  either moving load-bearing content out of the reading column — which breaks the single-pass read
  the case studies are written for — or manufacturing marginalia. An empty margin beside a long
  argument is a normal editorial choice; the alternative is furniture.
- **"Every case is Aniket versus a dataset; not one sentence about persuading a person."** The
  sharpest observation in the whole review, and it cannot be fixed by code. It is
  `CONTENT_GAPS.md` Group 1 and the postmortem — one decision where a named person disagreed. Logged,
  not invented.
- **"Case studies run 900 words over budget once drawers are counted."** Reported rather than
  closed. Closing it means deleting argument that is load-bearing and honest, and the *required*
  reading path measures 736 words against a 1,200 budget.

---

## Expansion round 2 — 2026-08-19

### D39 — `/thinking` gets top-level nav, and the rejected roadmap does not go in it

Nav ceiling is five. Current four plus `/thinking` is exactly five, so this spends the last slot and
the question is whether the teardown and the thesis earn it.

They do, for one reason: the profile's structural weakness is that every piece of evidence on the
site comes from **one product surface at one employer**. A Head of Product reading three HCL case
studies cannot tell whether the judgement transfers. The teardown and the thesis are the only two
artifacts on the site that demonstrate product thinking applied to something Aniket was not handed,
and burying them under `/approach` — which is about *how he works*, a different question — would
make them findable only by someone already convinced.

The rejected roadmap goes on `/approach` instead, because it is not a piece of thinking about the
outside world; it is evidence for a claim about his own decision-making, which is what `/approach`
is. It also gives the résumé's otherwise-inert "prioritised using MoSCoW" line something to point at.

Result: nav is Work · Thinking · Approach · Lab · About. Five, at the ceiling, and no room for more
without removing something.

### D40 — the teardown subject is Strava, and the piece says what it could not reach

Chosen over the Indian health apps (HealthifyMe, Cult.fit) despite those being closer to the domain,
because the ABDM thesis already occupies the Indian-health-market ground and two pieces on the same
market is range in name only.

Strava earns it on a different axis: Aniket shipped a competitive mechanic built on passively
collected activity data, and Strava is the largest existing version of that idea. A teardown of its
free tier by someone who has shipped the same primitive is a transferability argument that a
generic teardown cannot make.

**What the piece is built on, and what it is not.** Every factual claim traces to a public source
read on 19 Aug 2026: the App Store listing, the subscribe page, and Strava's own help-centre article
enumerating subscription features. The piece does **not** describe the signed-in onboarding, because
reaching it requires creating an account, which this build does not do. The piece says so in its own
text rather than implying a walkthrough that did not happen.

### D41 — Grounded gets the regression diff (Option A), and no second Lab tool is invented

The brief offered a second tool as Option B "only if it emerges naturally from Aniket's real work."
Nothing does. Inventing one to fill a grid is the exact failure mode this round was warned about.

The regression view is also the more valuable half: Grounded currently scores one output against a
rubric, which makes it a scorer. An eval harness is a thing you run *again* — its job is to tell you
what a change broke. Adding the diff turns the demo into the argument it was already making.

### D42 — `Thinking` becomes `Analysis`, and `Approach` stays

Two nav items both parsed as "this person's opinions", which meant a recruiter opening one and
finding the wrong thing would not open the other. Three options were on the table.

**Fold Thinking under Work.** Rejected. `/work` is the shipped-and-accountable surface and the whole
point of the teardown and the thesis is that they are *not* that. Putting unshipped analysis inside
Work is the exact confusion the collection's labelling exists to prevent, and it would trade a
navigation problem for a credibility one.

**`Principles` + `Teardowns`.** Rejected. "Teardowns" is accurate for the Strava piece and wrong for
the ABDM thesis, which is a market argument rather than a product critique. A label that fits one of
two items is not a label.

**`Approach` + `Analysis`.** Chosen. The pair states content type rather than category: *Approach* is
how he decides — the four principles and the cut-list, all drawn from his own shipped work.
*Analysis* is judgement applied to things nobody handed him. A reader who wants "how does he think
about his own work" and a reader who wants "can he think about mine" now have different doors, and
neither has to open both to find out.

Nav stays at five. `/thinking/*` keeps its URLs and gains permanent redirects from `/analysis/*` so
the shorter path also resolves — renaming the paths would break the links already shared from the
last round for no gain, since the visible label is what was ambiguous, not the slug.
