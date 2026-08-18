# 02 — Research (canonical Phase 1 artifact)

**Agent 3, research synthesizer.** Merges `docs/01-narrative.md`, `docs/01b-truth-audit.md`,
`docs/02a-hiring-research.md`, `docs/02b-design-research.md`, audited against
`docs/00-source-facts.md`, `CONTENT_GAPS.md` and `portfolio-strategy-aniket-agarwal.md`.

**Date:** 2026-08-19. HCL tenure Oct 2024 → today = **22 months**.

**Status of this file.** This is the file the design, content and architecture agents read next.
It is written to be **decided, not surveyed**. Where the four upstream artifacts disagree, I pick
one and say why. Where the strategy document is wrong, §6 says so without softening.

**Precedence, binding on every later phase:**

```
Aniket_s_PM_Resume.pdf  >  Profile.pdf  >  docs/00-source-facts.md
   >  CONTENT_GAPS.md  >  docs/01b-truth-audit.md  >  this file
   >  portfolio-strategy-aniket-agarwal.md   ← lowest. It is a proposal, not a source.
```

`docs/01b-truth-audit.md` §8 is the build-failure list. **Nothing in this file overrides it.**
Where this file gives a design or editorial instruction that would require an unsourced fact, the
fact does not ship — the instruction is executed with a visible `[NEEDS: …]` token, or the element
is cut.

**Terminology used throughout:**
`[V]` a claim I traced to a fetched source in 02a/02b · `[INF]` my inference ·
`[MEASURED]` measured locally by Agent 2b on 2026-08-19 · `[SOURCE-RECORD]` traceable to R or L.

---

# 1. Ten principles for a credible product portfolio in 2026

Each is a **rule**, followed by the **acceptance test** that makes it checkable at Stage 6. These
are the Phase 8 review criteria. A build that fails any acceptance test is not shippable.

---

## P1 — The denominator law: a number without its four fields is not a number, it is a claim

**Rule.** Every quantity rendered anywhere on the site — hero, proof strip, case-study header,
results block, OG image, alt text, page title, JSON-LD — carries four fields in the same visual
unit: **before → after · population · timeframe · measurement method.** If any field is unknown,
the quantity does not ship as a quantity. It ships as a visible `[NEEDS: …]` token, or it is cut.
The denominator renders at ≥12px in the reading flow — never in a tooltip, never on hover, never
smaller than the label it qualifies.

*Why this and not "add context to metrics":* experienced reviewers discount unfalsifiable numbers
to **zero**, which means an unqualified number is worse than no number — it converts the reader
from evaluating to auditing `[V — 02a R9, R50]`. Of the twelve usable metrics in the record,
**exactly one (25MB → 6MB) currently has all four fields** `[SOURCE-RECORD, 01-narrative §4.1(c)]`.
This principle is therefore not polish; it is the entire evidence base.

**Acceptance test.**
1. Enumerate every numeral on the rendered site. For each, the population, timeframe and method
   string must be present within the same bordered/ruled unit, at ≥12px, in the DOM (not a
   `title=` attribute, not `::after` content).
2. `MetricDelta`'s Zod schema has `denominator` as a **required, non-nullable** field. Build fails
   without it.
3. `grep` the build output for a bare `%` not preceded within 80 characters by a population noun.
   Every hit is a defect.

---

## P2 — The register law: the writing may never claim more than the record supports

**Rule.** The site's tone must sit at or below the weight of the evidence. Concretely, four bans:
**no superlative about a category** ("the hardest X in Y"), **no total-tenure figure**, **no
invented specificity** (percentile, device tier, headcount, date, cohort name, demographic), and
**no fact the candidate cannot expand on for 90 seconds under hostile questioning.**

*Why:* the most likely reason a strong Head of Product closes the tab is not a weak metric — it is
**feeling sold to**, and the moment it happens is when the register of the prose collides with the
timeline strip `[INF — 01-narrative §6]`. A reader who catches one inflation begins auditing all of
them, at which point the genuinely unfalsifiable material gets discounted alongside the rest. In
2026 this has a second edge: **49% of 1,500 hiring managers name heavily AI-generated application
material as a red flag, and 49% report candidates who cannot defend AI-assisted claims**
`[V — 02a §6.4]`. Confident prose over a thin record is now indistinguishable from generated prose.

**Acceptance test.**
1. Run the **defensibility test** on every sentence: can Aniket talk about it for 90 seconds under
   adversarial questioning? If not, delete it regardless of how good it reads.
2. `grep -rn` the full build-failure string list in `01b-truth-audit.md` §8 across `app/`,
   `content/`, `public/` and all metadata. **Zero hits required.** Not "reviewed" — zero.
3. The site contains no comparative claim about a market or category that is not attached to a
   live, dated, linked citation. Currently that means: none ship.

---

## P3 — Ownership is bounded in both directions, and "I owned" is as specific as "I did not"

**Rule.** Every case study states what was decided by the candidate and what was decided by someone
else, at equal specificity. Both lines name **decisions**, not responsibilities. Ambiguity is not
neutral: *"If I can't tell whether you ran the usability test, synthesized it, or just sat in on it,
I have to assume the least"* `[V — 02a R10]`. A vague "I owned" line therefore inherits the
least-generous reading of everything above it — the "I did not own" device only buys credibility if
the positive claim is equally concrete.

Corollary: the real job title appears **exactly once**, flatly, in the timeline or About, with the
scope immediately beside it. Absent from the site and present on LinkedIn reads as concealment,
which costs more than the title does `[V/INF — 02a R43, 01-narrative Defence 3]`.

**Acceptance test.**
1. `notOwned` is a required schema field that accepts and renders a `[NEEDS: …]` sentinel — it must
   never be satisfiable by invention `[01b X49]`.
2. Read the `owned` line alone. It must name a decision with a downside, not a duty. "Owned the
   engagement roadmap" fails. "Decided what shipped on the engagement roadmap and in what order"
   passes.
3. The literal string `Product Analyst` appears on at least one indexed page, and `jobTitle` in
   JSON-LD is exactly `Product Analyst` `[01b I3]`.

---

## P4 — Build for a bimodal reader: a ten-second gate, then an unbounded deep read

**Rule.** There is no seven-minute reader. The clock is **~10 seconds for a homepage verdict**,
then either zero or a genuinely unbounded read (one documented case: a Series C VP read one
portfolio for *"nearly an hour"*) `[V — 02a §4.1]`. Design the gate ruthlessly — one line saying
what this person does, two-to-four fully qualified numbers, three doors — and then make depth
actually available. Every case study leads with the **result in the first paragraph**, then the
story `[V — 02a R2]`. Nothing load-bearing sits below a fold that requires a scroll commitment.

Second reading order, documented and different: AI-PM reviewers **open the live URL first**, look
for the eval suite second, and read the reflection last `[V — 02a R25, §5.1]`. The site must
satisfy both orders.

**Acceptance test.**
1. Screenshot the homepage at 390×844 (iPhone viewport) with no scroll. It must answer: what does
   this person do, at what scale, with what proof. If any of the three requires a scroll, cut
   until it doesn't.
2. The working demo is reachable in **one click from the primary nav on every page**, not only from
   homepage section 5.
3. First paragraph of each case study, read alone, states the outcome.

---

## P5 — Every section header is a claim, and the bolded sentences alone must carry the argument

**Rule.** No abstract-noun headers: `Impact`, `Learnings`, `Overview`, `Reflection`, `Process`,
`Solution`, `Results` are banned. Each header asserts something falsifiable. Within each section,
exactly one load-bearing sentence is set at weight 600. **A reader who reads only headers and bold
lines gets the complete argument.**

*Why this is structural, not stylistic:* scanning is F-shaped — two horizontal sweeps then a
vertical scan down the left edge; users read at most ~28% of the words on a page
`[V — 02a R26, NN/g]`. The left edge of the prose column is therefore the only text guaranteed to
be seen. Abstract-noun headers are also a named generator signature (`Discover / Design / Deliver`)
`[V — 02b §3.6]`, so this rule pays twice.

**Acceptance test.**
1. Extract the `<h2>`/`<h3>` list and the `<strong>` list from each case study. Read them as a
   standalone document. If it is not a coherent argument, the case study fails.
2. The load-bearing word of every heading is in the **first three words**, not after a subordinate
   clause.
3. No two case studies share a header phrasing pattern.

---

## P6 — Name the trade-off, the cut, and the objector — this is the single clearest seniority tell

**Rule.** Every case study names: the option that was rejected, what choosing cost, and who was
unhappy about it. Framework names without the cut they produced are worth nothing.

*Why this one is decisive here:* across every source, **junior answers lack named trade-offs, not
scope** `[V/INF — 02a R61]`. A 22-month candidate who names the cut, the cost and the objector reads
more senior than a five-year candidate who doesn't. This is **the only seniority lever on this site
that is not constrained by tenure**, which makes it the highest-leverage editorial rule in this
document. Junior/senior separators corroborate from the interview side: a senior kill-criterion
names *"a metric, a date, and a financial trigger"*; a mid-level one names *"a feeling"*
`[V — 02a R6]`.

**Acceptance test.**
1. Each case study contains a sentence of the form "I chose X over Y, which cost us Z."
2. No framework name appears without the decision it produced in the same paragraph.
3. Where the objector is not in the record, a visible `[NEEDS: who objected?]` token renders. **Do
   not invent an objector** — `01b X15` records that the strategy's own example inverts the resume.

---

## P7 — One real friction, not four — and counter-metrics everywhere

**Rule.** **One** substantive, owned, consequential failure, placed in the highest-traffic case
study, next to the work it damaged. The other case studies carry *"what I'd do differently now,
with more context"* — a different and honestly available claim. **Do not build a schema field that
forces a confession into every case study.**

Separately and non-negotiably: every case study that reports a movement also reports what could
have gone the other way. Citing *"DAU as their only success metric"* and being unable to name
*"two or three counter-metrics"* is a **scored red flag**, not a missed opportunity
`[V — 02a R7]`.

*Why one and not four:* the test a reviewer applies is *"is there visible friction anywhere"* —
*"a portfolio with zero visible friction doesn't read as accomplished, it reads as edited"*
`[V — 02a R12]`. Four confessions against a record containing **zero documented failures across 16
work bullets** `[SOURCE-RECORD, 01b §4.7]` produces either fabrication or four trivial admissions,
and four trivial admissions read *worse* than one real one because the pattern becomes visible as a
format `[INF — 02a §7.6]`. The evidence bar is also lower than the strategy assumes: *"a trade-off
you'd make differently"* is explicitly listed as sufficient `[V — 02a R13]`.

**Acceptance test.**
1. Exactly one case study contains a consequential owned failure. The others contain a "differently
   now" paragraph. No case study contains a `mistake` slot rendering boilerplate.
2. Every case study reporting a movement names at least one guardrail number.
3. The failure is not "I would have communicated more." It has a consequence.

---

## P8 — Ship one thing a reviewer can *use*, and put it above the attention cliff

**Rule.** The portfolio must contain at least one artifact the reader can operate rather than read,
reachable without setup, and it must be reachable **before** attention is exhausted. Reviewer
attention demonstrably runs out at case study three `[V — 02a R18]`; the strategy places the built
artifact at homepage section 5 of 6 while simultaneously calling it the load-bearing item for AI-PM
credibility.

Two constraints on how it is framed. First: **position it as a supplement to shipped production
work, never as a substitute.** A recruiting firm reporting hundreds of hiring-manager conversations
lists *side projects* among the **overrated** signals, valuing production experience instead
`[V — 02a R35]`. The first sentence on the tool's page ties it to the production problem it came
from. Second: it must survive the AI-PM technical bar — golden set of 20–50 hand-curated cases with
its composition published, judge agreement reported **against the stated 90% deployment bar**, one
failure mode per judge, deterministic checks pushed as far as they go before an LLM judge, and the
offline/online boundary named explicitly `[V — 02a R28–R34]`.

**Acceptance test.**
1. A `Lab ↗` nav item on every page goes **straight to the working demo**, not to an index page.
2. A cold visitor gets a result with zero setup and zero API key in under ten seconds.
3. The page states what the tool does **not** do (offline-only; what the online half would be) —
   the same bounding move as P3.
4. Every count on the page (case count, agreement rate) is **injected from the shipped JSON at
   build time**, never typed `[01b H1, H4]`.

---

## P9 — Cap the required path, not the available depth — and never hide anything load-bearing

**Rule.** The **required reading path** — hero, proof, one case study's load-bearing sentences —
is **≤1,200 words**. **Optional depth is uncapped**, subject only to being honest and genuinely
supporting. Depth is delivered by server-rendered `<details>` labelled with a **claim**, never
"Read more". Collapsed content is *supplementary by definition*: the decision, the trade-off, the
mistake and the numbers stay visible; what collapses is the derivation, the method note, the full
options analysis. Anything under ~60 words is not a disclosure, it is a parenthesis — inline it.

*Why not a site-wide word cap:* a cap on total words caps *available* depth as well as *required*
depth, and the documented behaviour of a converted reader is an hour on one portfolio
`[V — 02a §7.3]`. The existence of collapsed depth signals rigour even to readers who never open it.

**Acceptance test.**
1. Word-count the required path. ≤1,200.
2. Every collapsed panel is present in `view-source` and findable with Cmd-F with the panel shut.
3. No `<details>` contains a number, a decision, a trade-off or the failure.
4. No disclosure label is a verb phrase like "Read more" or "Learn more"; each is a claim.

---

## P10 — Restraint is part of the evidence: budget the bytes, the motion, and the voice

**Rule.** The medium is being read as a claim about the author. Four hard budgets:

- **Performance.** Homepage JS ≤90 KB gzipped; fonts on the homepage critical path ≤32 KB; LCP
  <1.2s; CLS <0.02. A performance-PM candidate whose own site is slow has refuted his lead case
  study with the page it is printed on.
- **Motion.** Three duration tokens, two easings, six interactions total, **one** arrival moment,
  and **zero scroll-triggered animation on text**. NN/g field research finds scroll-fade on body
  text causes content to be **missed** by fast scanners, and scopes scroll animation explicitly to
  leisure reading, *not* to high-stakes task-focused reading — which is exactly this reader
  `[V — 02b §5.1]`.
- **Voice.** One writer's voice end to end. If multiple agents draft sections, **one pass rewrites
  the entire site**; tone mismatch is a named AI-detection cue `[V — 02a R46]`.
- **Structure.** The page must not be structurally templated. Run the **200px silhouette test**
  (§7.1) at Stage 4 and again at Stage 6.

*Why bundled into one principle:* they share a mechanism. Each is a place where doing less is
readable as judgment, and where doing more is readable as either a template or a generator.

**Acceptance test.**
1. `size-limit` or `@next/bundle-analyzer` in CI with a **hard failing budget**, not a warning.
2. Lighthouse mobile 100/100/100/100. Zero console errors. Passes at 320px and at 200% zoom.
3. `grep -rn "whileInView\|translateY(20px)\|y: 20\|box-shadow\|linear-gradient"` → zero hits
   outside the one documented table-fade mask.
4. Silhouette test passed and recorded.

---

### The one-line version, for the content and design agents

> **P1** qualify every number · **P2** never outrun the record · **P3** bound ownership both ways ·
> **P4** ten-second gate, unbounded depth · **P5** headers are claims · **P6** name the cut and the
> cost · **P7** one real failure, guardrails everywhere · **P8** one usable thing, high in the page ·
> **P9** cap the required path, not the depth · **P10** restraint is the evidence.

---

# 2. What makes a portfolio read junior vs senior

Concrete tells only. Left column is what a reviewer sees; right column is what replaces it. Quoted
items are sourced in `02a §8`; unquoted rows are synthesis across 01/01b/02a.

| Reads **JUNIOR** | Reads **SENIOR** |
|---|---|
| Jumps *"to solutions before scoping the problem"*; the case study opens with a feature | Opens with the reframe: what the brief said vs what the evidence said the problem was |
| **No trade-off named anywhere.** *This is the single clearest tell in every source.* | Names the rejected option, what choosing cost, and who objected |
| Names *"a feeling"* as the reason a bet would be killed | Names *"a metric, a date, and a financial trigger"* |
| A percentage with no baseline, denominator, timeframe or method | `before → after · population · window · method`, and an explicit "I attribute this directionally, not causally" where a holdback did not exist |
| A bigger number, unqualified | A smaller number, fully qualified. *"The shape of the answer matters more than the number cited"* |
| Ownership left ambiguous — reviewer *"has to assume the least"* | Bounded in both directions, at equal specificity: what was decided, and what was decided above or beside you |
| "We" everywhere; team achievements presented as personal ones | First person singular for decisions, plural for delivery: *"I decided X. We shipped in eight weeks."* |
| Framework names as credentials ("prioritised using MoSCoW") | The cut the framework produced, and the cost of the cut |
| Only wins. **Zero visible friction — which "reads as edited," not accomplished** | One real failure with a consequence, placed next to the work it damaged; "what I'd do differently now" elsewhere |
| One success metric, usually DAU; cannot name counter-metrics | Guardrails published alongside the win: what could have broken, and whether it did |
| Ends at launch | Ends at the measured outcome, then at what was learned after |
| Process volume as evidence — how many interviews, how many rounds, how many sprints | Reasoning behind each decision; process appears only where it changed an outcome |
| A metric quoted | A metric **definition defended** — "we used 7-day active, not 28-day, because…" |
| Maximises the scope claim | **Bounds** the scope claim, and volunteers the limit before the reader finds it |
| Twelve hi-fi screens, personas, empathy maps, a style-guide section | Three to four annotated diagrams that each carry a finding |
| *"Accurate textbook definitions using the right buzzwords"* | Domain-specific, non-transferable detail that could only come from having been there — the sync bug, the approval that blocked, the thing nobody outside the team would know |
| A perfect, symmetric, evenly-paced site with uniform section lengths | Uneven emphasis: one thing treated at length because it deserves it, others compressed to 300 words |
| Ten projects | Three, and the ability to say why the others were cut |
| College achievements, CGPA, positions of responsibility given weight | Credentials as one footnote line |
| Defensive constructions around a title ("Analyst *with PM ownership*") | The title stated once, flatly, with the scope beside it, and never argued with |
| Reading-time estimates, "6 min read", a blog with two 2023 posts | Nothing that signals content-marketing furniture |
| **AI-specific:** leads with the model and the prompt | **AI-specific:** *"leads with the eval set, the failure modes, and the rollback plan"* |
| **AI-specific:** *"we monitor for hallucinations"* | **AI-specific:** the model, the surface, the failure mode, the rollback, the postmortem fix, **and the eval test added afterward** |
| **AI-specific:** a certificate stack, a Notion framework with no shipped work, or a thin API wrapper with no measurement | A working artifact with a published rubric, a golden set with its composition stated, and the judge's agreement rate reported against the bar |

**The two rules that fall out of this table, and they are the ones to enforce:**

1. **Junior answers lack named trade-offs, not scope.** Tenure is fixed; trade-off density is not.
2. **Precision about the limits of a claim is read as seniority.** Attribution limits, measurement
   basis, what was not owned, what the tool does not do. Every hedge of this type in the spec must
   **survive the polish pass** — the temptation to smooth them out in copy editing is the single
   most likely way this site loses its seniority signal late.

---

# 3. Typography decision

**This is a decision, not a menu.** Alternatives were evaluated in `02b §1.2/§1.7` and are not
re-litigated here.

## 3.1 The stack

| Role | Family | Weights shipped | Source | Where it renders |
|---|---|---|---|---|
| **Interface / display / all headings** | **Geist** | variable, clamped **400–700** (used at 400, 500, 600) | self-hosted, pre-subset `woff2`, `next/font/local` | Every page. Root layout. |
| **Long-form prose** | **Newsreader** | variable roman **400–700**, plus **italic 400** | self-hosted, pre-subset `woff2`, `next/font/local` | **`/work/[slug]` and `/approach` only.** |
| **All numerals, labels, eyebrows, tables, code** | **Geist Mono** | variable, clamped **400–500** | self-hosted, pre-subset `woff2`, `next/font/local` | Every page. Root layout. |

**Three decisions inside that table that the design agent must not quietly reverse:**

**(a) The homepage sets no serif.** Homepage belief text, card headlines and timeline all set in
Geist. The strategy specifies serif for the four beliefs at 19px (§11 §4); **that is overridden.**
Three reasons: it removes ~34 KB from the homepage critical path; it makes the register shift
*mean* something — the serif's first appearance is the signal "this is an argument to be read", and
a register shift that has already happened on the homepage is no longer a shift; and it keeps the
10-second gate (P4) typographically uniform and fast to scan.

**(b) Self-subset, not `next/font/google`.** `next/font/google` for this stack measures **171.0 KB**
latin (or 108.0 KB without serif italic). The pre-subset path measures **63.6 KB** — a 62.8%
reduction `[MEASURED — 02b §1.6]`. On the one site whose lead case study is a cold-start fix, 171 KB
of preloaded font is indefensible. It also recovers two OpenType features Google strips: **`ss01`
does not exist in Google's Geist build**, so the strategy's `font-feature-settings: "ss01"` is a
**no-op** on that path, and **`case`** — which lifts parentheses, hyphens and arrows to cap height
inside all-caps runs, i.e. exactly what every eyebrow label on this site needs — is also absent
`[MEASURED — 02b §1.4]`.

**(c) Geist is kept, with eyes open.** Geist is named in 2026 generator-output audits as a headline
default, and this is a Vercel-hosted Next.js site — the exact starter-template silhouette
`[V — 02b §3.2, §3.7]`. It is kept because the **combination** is the fingerprint, not the single
font, and because Geist and Geist Mono share an x-height and cap-height **exactly** (0.530 / 0.710
em) `[MEASURED — 02b §1.8]`, which is rare and directly load-bearing for `MetricDelta`: mono
numerals set inline in sans labels need **no optical size correction**, and the usual
`font-size: 0.95em` hack — which always looks slightly off — is not needed. **Escape hatch, decided
in advance:** if a Phase 8 visual review finds the site reading as generator output, the drop-in
replacement is **Public Sans** (26.0 KB Google latin, full numeric feature set including `tnum`).
Do not substitute Inter Tight (the single most-identified 2026 slop tell), Libre Franklin or IBM
Plex Sans (**no `tnum` in Google's builds — disqualifying**, since every number on this site needs
tabular figures).

## 3.2 Subsetting and byte budget

Unicode range = Google's `latin` range **plus** `U+2190–2193` (arrows), `U+2197` (↗, the
`Resume ↗` button), `U+2212` (true minus, for deltas), `U+2215`.

| Face | Axis clamp | Layout features kept | KB | Preloaded on |
|---|---|---|---:|---|
| Geist | `wght 400:700` | `ccmp,liga,locl,tnum,pnum,frac,case,ss01` | **16.3** | every route |
| Geist Mono | `wght 400:500` | `ccmp,locl,case,ss01` | **13.0** | every route |
| Newsreader roman | `wght 400:700` | `liga,tnum,pnum,ccmp,locl,rvrn` | **21.6** | `/work/[slug]`, `/approach` |
| Newsreader italic | `wght 400` (single) | `liga,tnum,pnum,ccmp,locl,rvrn` | **12.6** | `/work/[slug]`, `/approach` |

**Homepage font payload: 29.3 KB (two files).**
**Case-study route font payload: 63.6 KB (four files).**
**Total committed to the repo: 63.6 KB + `OFL.txt`.**

All four faces are SIL OFL 1.1. OFL permits subsetting (a modification) and redistribution as part
of a work **provided the licence travels with the font** — commit `OFL.txt` beside the `.woff2`
files in `app/fonts/`. Reproduction commands are in `02b` Appendix; run once, commit the output.

**Two byte-level facts that will otherwise waste effort:** specifying a weight *range* in
`next/font/google` (`wght@400..600` vs `wght@100..900`) returns the **byte-identical file** — it is
documentation, not compression `[MEASURED]`. And **never pass `axes: ['opsz']` for the body serif**:
it costs 2.3× the bytes (56.8 → 128.8 KB) *and* yields a worse cut, because the wght-only file is
already instanced at `opsz = 18`, which is Newsreader's Text optical size and exactly right for
19–21px body copy `[MEASURED — 02b §1.5]`.

## 3.3 Loading strategy

```ts
// app/fonts.ts — Path B. All three self-hosted, pre-subset, OFL committed alongside.
import localFont from 'next/font/local'

export const sans = localFont({
  src: './fonts/Geist-latin-400-700.woff2',
  variable: '--font-sans', weight: '400 700', style: 'normal',
  display: 'swap', preload: true,
  fallback: ['ui-sans-serif','system-ui','Segoe UI','Helvetica Neue','Arial'],
  adjustFontFallback: 'Arial',
})

export const mono = localFont({
  src: './fonts/GeistMono-latin-400-500.woff2',
  variable: '--font-mono', weight: '400 500',
  display: 'swap', preload: true,
  fallback: ['ui-monospace','SFMono-Regular','Menlo','monospace'],
  adjustFontFallback: 'Arial',
})

// Imported ONLY by app/work/[slug]/layout.tsx and app/approach/layout.tsx.
// next/font preloads per-route based on where the loader is called, so calling it
// in the segment preloads it there and nowhere else. Apply serif.variable to the
// segment wrapper element, not to <body>.
export const serif = localFont({
  src: [
    { path: './fonts/Newsreader-latin-400-700.woff2', weight: '400 700', style: 'normal' },
    { path: './fonts/Newsreader-latin-italic-400.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif', display: 'swap', preload: true,
  fallback: ['Iowan Old Style','Charter','Georgia','Times New Roman','serif'],
  adjustFontFallback: 'Times New Roman',
})
```

Rules the builder must not deviate from:

- **`display: 'swap'` on all three. Never `'optional'`** — `optional` silently renders system fonts
  on a slow first load, and on a site whose argument is typographic that is a worse failure than a
  100 ms swap.
- **`next/font/local` does not subset or convert.** It serves the file byte-for-byte. Never point it
  at the raw npm `geist` `Geist-Variable.woff2` (69.6 KB, 975 glyphs, most unused).
- **`adjustFontFallback: 'Times New Roman'` on the serif**, not the `'Arial'` default — Newsreader's
  low x-height makes the Arial-derived overrides a poor match. Verify **CLS < 0.02** on a throttled
  3G profile with fonts forced to `swap`.
- Do not use `@next/font` (renamed pre-13.2; requires no install).

## 3.4 Type scale — two scales, not one

The strategy's single nine-step 1.25 ladder (`12/14/16/19/24/30/38/48/60`) is rejected for two
reasons: it forces UI and prose to share steps, and **a mathematically perfect ratio across every
step is itself a named generator tell** — "seven type sizes all 1.25× apart with nothing
distinctive at either end" `[V — 02b §3.2]`.

```css
/* UI / Geist — ratio ≈1.20, more steps where labels actually live */
--ui-2xs:  0.6875rem;  /* 11px  MetricDelta eyebrow (the ONLY all-caps role on the site) */
--ui-xs:   0.75rem;    /* 12px  denominators, metadata, rail notes, captions */
--ui-sm:   0.875rem;   /* 14px  nav, table cells, timeline */
--ui-base: 1rem;       /* 16px  UI default, card subheads */
--ui-lg:   1.1875rem;  /* 19px  belief statements, card headlines, homepage body */
--ui-xl:   1.5rem;     /* 24px  H3 */
--ui-2xl:  1.875rem;   /* 30px  H2 */
--ui-3xl:  2.375rem;   /* 38px  page H1 */
--ui-4xl:  clamp(2.25rem, 1.1rem + 4.6vw, 3.5rem);  /* 36→56px hero */

/* Prose / Newsreader — three steps, because only three are needed */
--prose-sm:   1.0625rem;  /* 17px  aside prose, pull-quote attribution */
--prose-base: 1.3125rem;  /* 21px  case-study body */
--prose-lead: 1.5rem;     /* 24px  the one lede paragraph per case study */
```

Twelve steps total. The hero `clamp()` gives 36px at 320px and caps at 56px — the strategy's flat
60px is fine at 1440px but breaks the 320px requirement.

**Weight ceiling: 600.** Never 700/800/900 for headings — heavy weights read as marketing.

## 3.5 Measure, size and line-height

**The strategy's `max-width: 68ch` is wrong by ~38% and must not ship.** `1ch` is the advance width
of `0`, and in Newsreader `0` is ~34% wider than an average English character: **68ch renders ≈91
characters per line**, breaching both the WCAG 2.1 SC 1.4.8 (AAA) 80-character ceiling and the
50–75 comfortable band `[MEASURED — 02b §1.9]`. Corroborated against five live premium editorial
sites, whose shipped content columns cluster at **600–675px**.

**Set the measure in rem, never in `ch`.**

| | Size | Line-height | Computed | Measure |
|---|---|---|---|---|
| **Prose body, desktop** | **21px** (`--prose-base`) | **1.60** | 33.6px | **`max-width: 36rem` (576px) ≈ 65 CPL** |
| Prose body, <640px | 18px | 1.65 | 29.7px | full width − 32px |
| Prose lede | 24px | 1.45 | 34.8px | same 36rem |
| Sans UI | 16px | 1.50 | 24px | — |
| Sans UI small | 14px | 1.45 | 20px | — |
| Mono eyebrow | 11–12px | 1.40 | 15–17px | — |
| H2 | 30px | 1.20 | 36px | — |
| H1 / hero | 36–56px | 1.05–1.10 | — | max 20 words, two lines |
| Paragraph spacing | — | `margin-block: 1.5em` | 31.5px | satisfies the AAA ≥1.5× leading clause |

**Hard ceiling on any prose column: 640px (= 80 CPL, the AAA limit).** If a later reviewer wants a
wider column, the correct move is to **increase the type size, not the width** — CPL is the
invariant.

**Body serif at 21px, not the strategy's 19px.** Newsreader's x-height (0.426 em) is 20% shorter
than Geist's (0.530 em), so Newsreader at 19px renders an x-height of 8.09px against Geist 16px's
8.48px — it would read *smaller* than the UI text it is supposed to outrank. 21px gives 8.95px:
one comfortable step larger `[MEASURED — 02b §1.10]`.

**Tracking:**

```css
--track-display: -0.022em;  /* 36–56px hero */
--track-h2:      -0.014em;  /* 24–38px */
--track-ui:      -0.006em;  /* 14–19px sans */
--track-body:     0em;      /* serif prose — NEVER track a text serif */
--track-eyebrow:  0.06em;   /* all-caps mono labels, 11–12px — the only positive tracking */
```

## 3.6 Numerals — the rules that make the signature element work

`MetricDelta` renders ~20 times and is the design carrying the positioning. Its typography is not
negotiable:

- **Figures in Geist Mono, weight 500, `letter-spacing: 0`.** Monospace is tabular by construction.
- **`font-variant-numeric: tabular-nums` set once on `:root` for the sans and inherited.** This is
  load-bearing and easy to forget: Geist Sans is proportional by default, and the timeline years
  (`2024 — now`, `2023`, `2022`) and every denominator are set in the sans. Without it those columns
  do not align.
- **`font-feature-settings: "case" 1` on the eyebrow and the figure line** — lifts `( ) − →` to cap
  height inside all-caps runs. Works only on the self-subset path.
- **U+2212 MINUS SIGN (`−`), never hyphen-minus (`-`), in deltas.** The true minus is figure-width,
  so a column of deltas aligns; the hyphen is not.
- **U+2192 (`→`) for the delta arrow — not an SVG, not an icon font.** One glyph, in the subset,
  and **copy-pasteable**: a recruiter forwarding a metric line into Slack must get working text.
- **`MetricDelta` is not a card.** No border, no background. The reader's eye must descend
  claim → figure → denominator in one movement; a box breaks the vertical read.

## 3.7 Why this stack satisfies the brief

**Against "dense technical editorial":** the page has to hold three registers at once — scanned
interface text, linearly-read argument prose, and evidence. Most PM portfolios set all three in one
grotesk and read as documentation. **The register shift only works if the two families are far
apart**, which is why a proper text serif with visible stroke modulation (Newsreader) is correct and
a low-contrast slab would read as an accident. Newsreader is additionally the only candidate whose
*cheap* file is also the *correct* file (opsz-18 Text cut by default), and it is the cheapest serif
of the three evaluated when subset (21.6 KB vs Source Serif 4's 25.1 and Literata's 25.4).

**Against the <90 KB homepage JS budget:** fonts are not JS, but they sit on the LCP critical path
via `<link rel=preload>`, and the homepage is where the 10-second gate is won or lost. This stack
puts **29.3 KB** there instead of 171.0 KB. **A flag for the architecture agent, stated honestly:**
the Next.js App Router framework floor (React runtime + router) is the dominant term in the 90 KB
budget, not the site's own code. **Measure the floor on an empty static route before treating 90 KB
as achievable**, and if the floor is close to it, the budget must be restated as *"zero application
JS on `/` beyond the framework floor"* and the CI gate set accordingly. Do not quietly relax the
number; restate it with the measurement attached — which is the same denominator discipline the site
is arguing for (P1).

---

# 4. Long-form technical writeups: how the case studies actually work

## 4.1 The binding constraint the design agent must absorb first

`00-source-facts.md` §6: **there are no product screenshots, PRDs, analytics exports, cohort tables,
experiment briefs, decision matrices, user quotes or testimonials in the working directory.**
`01b-truth-audit.md` §3.5 rules out, by name: the latency waterfall, the bundle treemap, the
device-tier matrix, the cohort retention curve with values, the decision matrix with scores, the
eval scorecard, and every product screenshot.

**Therefore the available dataviz vocabulary today is exactly two things:**

1. **Two-value comparisons** where both values are in the record — `15s → under 2s`,
   `25MB → 6MB`, `3.5 → 7.8 min`. These are the only quantities that can be drawn to scale.
2. **Structural diagrams** — a loop, a flow, a boundary, a decision *structure* with the options
   named but **unscored**. These encode reasoning, not measurements, and are honest to draw because
   the reasoning is the candidate's own.

Anything requiring a distribution, a breakdown, a per-phase timing, a matrix cell, or a curve with
axis values **is fabrication**, regardless of how carefully it is captioned. A treemap of the 25 MB
is 90% invented area. A waterfall of the 15 seconds requires per-phase timings that do not exist.

**The design agent's job is therefore to make two-value comparisons and structural diagrams carry a
whole case study.** That is achievable — and it is *more* honest-looking than a chart nobody can
audit — but it must be designed for deliberately, not discovered at Stage 7.

If Aniket answers `CONTENT_GAPS.md` B2/B3/B10, the vocabulary expands. Build the figure components
so they can receive real data later; do not build the data.

## 4.2 Inline data visualisation

**Governing principle: a figure is a sentence in the argument, not an illustration of it.** Every
figure is called out in the running text, and the text **interprets** rather than repeats it. If
the prose says "cold start fell" and the figure shows cold start falling, the figure is decoration
— cut it.

**(a) Three figure widths, not one.** The rhythm narrow-narrow-wide-narrow is what makes a long page
read as a document rather than a scroll, and it is the cheapest single way to look unlike a
template, because templates use one content width throughout.

| Class | Use | ≥1280px | 1024–1279px | ≤1023px |
|---|---|---|---|---|
| **Column** | read *with* the sentence: a two-value bar, a two-row table | 576px | 520px | full |
| **Wide** | anything with a horizontal axis; breaks right over the rail | 860px | 720px | full |
| **Full-bleed** | **max one per case study**, the single hero diagram | 1200px | 960px | full |

**(b) Direct-label every series. Never ship a legend.** Removes the gaze-switch and the
colour-identification task — an accessibility win and a comprehension one. On a site with exactly
two accent colours you do not have enough colours to build a legend with anyway. Series name at the
end of the line, in the line's colour, mono 11–12px.

**(c) The caption carries the finding, in three sentences: identity → provenance → finding.**
The provenance sentence is **mandatory on every reconstruction** (`CONTENT_GAPS.md` D-R5) and it is
a credibility asset, not an apology:

> **Fig. 2 — Bundle size before and after.** `25MB → 6MB`, both values as reported at the time;
> `[NEEDS: measured as download size, install size, or APK/AAB?]`. The 76% reduction is exact — it
> is the only delta on this site that needs no rounding.

**(d) Alt text carries the finding, never the shape.** "Retention chart" fails. And alt text is
indexed and trusted by screen-reader users, which makes it the **place a builder is least likely to
fact-check** — `01b X33` catches the strategy shipping two fabricated retention percentages inside
an *example* alt string. Alt text is subject to P1 and P2 exactly like body copy.

**(e) Word-sized graphics inside sentences.** A 60×14px sparkline on the text baseline, one `<path>`,
`stroke: currentColor`, `vertical-align: -0.15em`, no frame, no ticks, no axis. Genuinely uncommon
in a PM portfolio and nearly free. **Cap: three per case study** — beyond that it is a mannerism.
Note the same truth constraint applies: a sparkline whose shape is not in the record is a drawn
claim.

**(f) Every figure has an intrinsic size and never moves.** `<svg viewBox>` with explicit
`width`/`height`, or an `aspect-ratio` wrapper. A figure that reflows on font-load is a CLS event on
the page that argues its author cares about CLS.

## 4.3 Progressive disclosure

- **Use native `<details>`/`<summary>`.** Server-rendered, keyboard-operable, screen-reader
  announced, zero client JS, indexed, and Cmd-F-findable while collapsed (Chrome auto-expands
  `<details>` on find). **Do not build a custom disclosure component.**
- **Label with a claim, never "Read more".** `▸ How I defined "session time" and why I nearly used a
  different metric` does work even for the reader who never opens it: it advertises that the
  argument happened.
- **Never collapse anything load-bearing.** Decisions, trade-offs, the failure and the numbers stay
  visible. What collapses: derivations, method notes, the full options analysis, the metric
  definition.
- **Floor at ~60 words.** Below that it is a parenthesis, not a disclosure — inline it.
- **Maximum four per case study.**
- **Rename the component.** It cannot ship labelled "Artifacts" or "real (redacted) artifacts"
  while it contains only self-authored diagrams — that converts a neutral absence into a discovered
  overclaim for the reader who opens it expecting a document. Ship it as **"Reasoning,
  reconstructed"** or **"How I worked this out"**, and reserve the word *artifact* for the day a
  real one exists. The component is then already in place to receive it.

## 4.4 Section navigation

| Finding | Consequence |
|---|---|
| A rail TOC **should** be sticky; an in-body TOC should not | Sticky **left** rail is correct |
| **Right-rail blindness** — readers pattern-match right columns to advertising and ignore them | **Navigation left, evidence right.** Never move nav into the right rail |
| Highlight the current section on scroll — it gives progress feedback *and* makes the TOC discoverable, because the movement attracts the eye | The active marker is functional, not decorative. Build it |
| In-page links are ignored on first exploration and used when the reader has a specific need | **Design the rail for the second pass** — the Senior PM re-reading adversarially, the Head of Product jumping to "What happened" |
| Sticky in-body elements compete with global nav | The rail must be visually **quieter** than the shrunken nav: mono 11px, `--muted`, no background, no border, no box |

**Implementation.** `IntersectionObserver` with `rootMargin: '-20% 0px -70% 0px'` — this avoids the
classic bug where a short final section never activates. `scroll-margin-top: calc(var(--nav-h-shrunk)
+ 24px)` on every `<h2>` so anchor jumps do not land under the nav. Sticky rail gets
`top: calc(var(--nav-h-shrunk) + 24px)` and `max-height: calc(100vh - var(--nav-h-shrunk) - 48px);
overflow-y: auto`. Under `prefers-reduced-motion`, `scroll-behavior` stays `auto`.

**Mobile (<1024px).** Rail becomes a 2px top progress bar — **plus** a collapsed `<details>`
"Sections" disclosure directly under the case-study header block. Server-rendered, free, and gives
the phone reader the same overview the desktop reader gets. This is the documented mobile
recommendation for rail TOCs.

## 4.5 The argument → evidence transition

This is the hardest thing on the page. Most technical writeups fail it in one of two directions:
they bury the claim in the data, or they state the claim and never show the data.

**The mechanism is a register shift, signalled typographically.** The reader should be able to tell,
without reading a word, whether they are looking at a claim or at its support. Four shifts, in
increasing strength:

| # | Shift | Signal | Carries |
|---|---|---|---|
| 1 | **Weight** | Newsreader 400 → 600, same size, same column | The load-bearing sentence in a paragraph (P5) |
| 2 | **Family** | serif prose → Geist Mono | **Any number.** This is the core move: *prose is what I claim, mono is what I measured* |
| 3 | **Column** | prose → right rail | Provenance, denominators, method notes, attribution limits |
| 4 | **Block** | rule + figure + caption, wide or full-bleed | The finding that *is* the argument |

**Three sequencing patterns, in priority order:**

**(a) Claim → colon → evidence, as one visual unit.** Claim in serif; the delta immediately beneath
in mono on a hairline; the denominator beneath that in 12px sans. The eye descends
claim → measurement → conditions in one movement. This is what `MetricDelta` renders, and it is why
it must not be a card (§3.6).

**(b) Name the objection *before* the evidence, in the prose voice.** The copy rule "name the
objection before the reader does" is also a **layout instruction**: the objection sentence belongs in
the serif column, immediately above the figure that answers it. A sceptical reader who has just
formed a doubt and then reads their own doubt in the author's voice reads the next figure
**generously rather than adversarially**. This is the highest-leverage sequencing decision on the
page, and it is the mechanism by which P7's guardrails and P2's volunteered limits actually convert.

**(c) Attribution limits go in the rail, not the prose.** *"This shipped alongside the engagement
suite, so I attribute directionally, not causally"* is evidence-about-evidence. In the rail at 12px
sans, adjacent to the figure, it is **visibly a footnote and visibly not hidden**. Buried in prose
it reads as hedging; deleted, it makes the whole page less credible.

**The anti-pattern to refuse: an "Impact" or "Results" section at the end that dumps every number at
once.** It severs each number from the claim it supports and front-loads all of the sceptic's
ammunition into one screen. **Distribute evidence to the claim it serves.**

## 4.6 Right-rail contents and collapse behaviour

Rank-ordered by how much it earns its place: (1) the `MetricDelta` for the section being read,
(2) denominators and method notes — **the rail's highest-value job, because it lets the prose stay
readable while the evidence stays visible**, (3) the attribution-limit sentence, (4) the disclosure
trigger for that section, (5) at most **one** pull-quote per case study.

**Never in the right rail:** navigation; anything load-bearing with no equivalent in the prose
column; anything a mobile reader would lose.

**The two failure modes that must be designed out:**

- **Collision.** Anchor rail items to `<section>`, never to a paragraph — one per section, maximum
  two. This makes collision structurally impossible with zero JavaScript. Do not build a general
  sidenote system.
- **Disappearance on mobile — the worst failure, because the evidence is the point.** Never
  `display: none` a rail item. Below 1024px each item **re-flows inline immediately after the
  paragraph it supports**, at full prose width, visually demoted: 12px sans, `--muted`, hairline
  rule above, 16px vertical margins. Put each rail item in the DOM immediately after the section it
  annotates; grid handles desktop placement, and then mobile stack order and screen-reader order are
  both correct for free. **Verify with the accessibility tree, not by eye.**

**Geometry.** Right rail hard floor is **220px** — below that a compact `MetricDelta` wraps at 12px
mono and a wrapped delta looks broken. That is why there is **no rail at all between 768–1023px**,
where a 3-column rail would be ~180px. **Do not centre the prose column**: prose sits left of
centre, rail right; the composition is balanced by the rail's presence, not by geometric centring.
A page that is asymmetric at desktop and centred at tablet reads as two different designs.

| Range | Container | Prose | Left rail | Right rail | Figures |
|---|---|---|---|---|---|
| ≥1280 | 1200px | 576px | sticky 150px | 258px | 576 / 860 / 1200 |
| 1024–1279 | 960px | 520px | sticky 120px | 210px | 520 / 720 / 960 |
| 768–1023 | 720px | 600px, left-aligned | 2px top bar | inline | 600 / 720 / 720 |
| 640–767 | 100% − 48px | full | 2px top bar | inline | full |
| 320–639 | 100% − 32px | full, 18px/1.65 | 2px top bar | inline | full, simplified diagram variants |

---

# 5. The rejected list

Merged from `02a §9` and `02b §6`, deduplicated, each with a reason **specific to this site and this
audience**. Every line is a build-time or review-time check. Grouped by why it is rejected.

## 5.1 Claims and content

| # | Rejected | Why, here |
|---|---|---|
| 1 | Any superlative claim about a category in the hero | Fact-checkable in ten seconds by exactly the reader who matters, and the retention-benchmark literature always contains a contradicting number |
| 2 | Any published D30/D90 retention benchmark | Sources disagree by an order of magnitude (3–4%, 6–8%, 8–12%, 27.2% all seen for health/fitness D30); citing one invites the reader to find the other |
| 3 | Any number without population, timeframe and method — **including in the proof strip and the OG image** | The site's only differentiation is measurement honesty; ship fewer cells instead |
| 4 | A registered-user count used as the denominator of an activity metric | `1M+` is registered beneficiaries, not actives; using it under a DAU delta is the exact unfalsifiable-metric error the site exists to avoid |
| 5 | A total-years-of-experience figure | 22 months, and the resume says "1.5+" — an inflation that contradicts his own document, found in four minutes |
| 6 | A confession section in every case study | Four admissions read as a template; one reads as honesty |
| 7 | The strategy document's unverified anecdotes (the weekend Notion page, the 23-experiment growth PM, the redacted-PRD B2B PM, the philosophy-page Senior PM, "a job description with better typography") | None could be traced; repeating them as precedent, in copy or in interview, is a fabrication about third parties |
| 8 | Speculative "redesign a famous app" work, and any speculative piece in the same visual container as real work | Speculative work is what candidates build when they have nothing real; including one signals the opposite of the truth here |
| 9 | "Product Analyst with PM Ownership", or any defensive construction around the title | It announces the anxiety it is trying to cover. State the title once, flatly, with scope beside it |
| 10 | Any AI safety / eval / grounding-rate / refusal-layer / clinician-review content in the AI Health Reports case study | None of it is in the record, and it would be presented in the round where it is tested hardest by the audience best equipped to detect it |
| 11 | Any user quote | No quotes exist in the working directory. All four in the strategy are fabricated, one containing an invented clinical value |
| 12 | Any team, engineer, designer or QA headcount | Zero headcount data in any source; the strategy supplies three different numbers in four places, which proves its own is illustrative |
| 13 | Any percentile, device tier, RAM figure, or date attached to an HCL initiative | Measurement-method and sequencing claims with no source; a percentile is a claim about *how* you measured |
| 14 | Reading-time estimates ("6 min read") | Content-marketing furniture; signals blog post, not evidence |
| 15 | A drawer labelled "Artifacts" containing no artifact | Converts a neutral absence into a discovered overclaim for the reader who opens it |
| 16 | Testimonials with no verifiable public source | Unverifiable by construction on a site whose whole premise is that unverifiable claims get discounted. Ask for LinkedIn recommendations and link to them |
| 17 | A placeholder of any kind — testimonial slot, "coming soon" case study, greyed-out third card, empty `/notes` | An empty slot advertises a gap that would otherwise have been invisible. Ship a smaller site |
| 18 | A published Lighthouse-score badge in the footer | Checkable forever, decays silently, and reads as a flex to precisely the reader who dislikes flexes |

## 5.2 Structure and information architecture

| # | Rejected | Why, here |
|---|---|---|
| 19 | A three-up `grid-cols-3` card row for the case studies | Attention is exhausted at card three; a grid invites parallel skimming of all three and deep reading of none. Stacked full-width rows force sequence |
| 20 | Icon-on-top feature cards; **any decorative icon set** (Lucide, Heroicons, Phosphor) | The generator silhouette. The only permitted glyphs are `→ ↗ ↓ −` from the type, plus data marks inside figures |
| 21 | A coloured badge or pill directly above the H1 (`[ Available for work ]`) | Named 2026 tell. The `Currently:` line goes **below** the sub-line, mono 12px, no pill, no dot, no border |
| 22 | Numbered "1 / 2 / 3" process steps; numbered beliefs | Named tell, and it turns a point of view into a framework |
| 23 | Bento grids | 2026 template shorthand |
| 24 | Logo marquees, infinite tickers, auto-scrolling anything | The animated cousin of the banned tool-logo wall |
| 25 | An employer logo strip (HCL / Droom / YourStory marks) | Borrowed credibility, third-party trademarks used without permission, and it makes the page look like a vendor site |
| 26 | A contact form | Nobody uses one, and it puts a form between a founder and an email address |
| 27 | A skills grid, tool logo wall, or proficiency bar chart | Pure junior signal; tools are one line in About |
| 28 | A separate `/experience` page, a resume *page*, an `/experiments` page, or a segregated `/ai` section | Each is a resume in disguise or implies AI is a hobby rather than how he works |
| 29 | A visitor counter, "now playing" widget, bookshelf, `/now` page, emoji in headings | Personality furniture that costs scanning attention at the 10-second gate |
| 30 | A blog or `/notes` with fewer than three simultaneous pieces | A stale writing section is worse than none |
| 31 | A hero portrait, or any photograph above the fold | Instantly junior, and it displaces the proof strip |
| 32 | Twelve hi-fi screens; personas, empathy maps, journey canvases, mood boards, Crazy-8s | UX-case-study cosplay — the specific trap this candidate is most at risk of, because the market's templates are design templates |
| 33 | A "Design system" or "Style guide" page | He is not the designer |
| 34 | A theme toggle / dark mode | Nothing to say, another client component, another thing to break at 320px |
| 35 | An "ask my portfolio anything" AI chatbot | The highest-frequency 2026 gimmick, and **specifically disqualifying here**: a thin API wrapper with no measurement is a named rejected AI-PM artifact type. For a candidate whose AI credibility rests on eval rigour, an unevaluated chatbot about himself is the worst possible AI artifact |

## 5.3 Interaction and motion

| # | Rejected | Why, here |
|---|---|---|
| 36 | Scroll-triggered fade-ins on any text block | Field research finds this causes content to be **missed** by fast scanners, and scopes scroll animation explicitly away from task-focused reading. This reader is task-focused |
| 37 | `initial={{ opacity: 0, y: 20 }}` / `whileInView` / any `translateY(20px)` reveal | The single most recognisable motion signature of 2026 |
| 38 | Framer Motion, or any animation library | ~40 KB for six interactions the spec already scopes to CSS |
| 39 | Count-up numbers in the hero | SaaS-marketing trope that delays reading of the most load-bearing content on the page by design |
| 40 | Any animation that re-triggers on scroll-past or on back-navigation | Persistence beats repetition; re-triggering is strictly worse for comprehension |
| 41 | Scroll-jacking, parallax, pinned-section scrollytelling | This reader arrived to evaluate a claim, not to be taken on a journey |
| 42 | A custom cursor | 2021 portfolio signalling; costs nothing to omit |
| 43 | Any loading screen, splash, skeleton or route-transition animation | **Catastrophic for the candidate whose lead case study is a cold-start fix.** The first paint is case study one's live demo |
| 44 | Auto-playing video, or a large hero GIF of the app | Same reason, plus bandwidth on the phones recruiters actually use |
| 45 | A 4px card lift plus shadow upgrade on hover; any `transform` on hover | Named generator pattern. Hover is border colour + metric colour only |
| 46 | `scroll-behavior: smooth` without a `prefers-reduced-motion` guard | Fails the accessibility criterion the build is committed to |
| 47 | A right-rail table of contents; a sticky in-body TOC | Right-rail blindness; and a sticky in-body TOC competes with the global nav |
| 48 | Disclosure widgets that collapse under ~60 words | That is a parenthesis, not a disclosure |
| 49 | Client-side-only disclosure content | Not indexed, not Cmd-F-able. `<details>` with server-rendered content |
| 50 | A cookie banner | Follows from choosing Plausible/Vercel Analytics over GA; a cookie banner on a portfolio is a bad first impression |

## 5.4 Visual and typographic

| # | Rejected | Why, here |
|---|---|---|
| 51 | Tailwind `blue-500`/`blue-600`/`indigo`/`violet`/`purple` anywhere in the tree | Reported at ~78% of indexed marketing sites by 2026 |
| 52 | Any `linear-gradient` / `radial-gradient` outside the one documented table-edge fade mask | Gradient meshes and blue→purple ramps are the top-line generator signature. Document the one exception in a code comment |
| 53 | Any `box-shadow`, including "subtle" `shadow-sm` | Flat cards on hairline borders are the differentiator; shadows are the single most common thing to creep back in during polish |
| 54 | **Coloured left borders on cards and callouts — including the `mistake` variant** | Described as "almost as reliable a sign of AI-generated design as em-dashes in text". Use an amber all-caps mono eyebrow + amber rule **above** the block + `--paper` background: same scannability, different fingerprint |
| 55 | `rounded-xl` / `rounded-2xl` (12–16px radius) | 4px everywhere, no exceptions |
| 56 | Pure `#000` or `#fff` for text or background | Real designers use off-blacks. A single stray `color: #000` is a giveaway |
| 57 | All-caps labels on every section | Restrict all-caps to **exactly one role**: the `MetricDelta` eyebrow. Scarcity is what turns it into a signal instead of a texture |
| 58 | A single italic serif word inside a sans hero headline | Named 2026 tell. The hero is one family, one style |
| 59 | Font weights 700/800/900 for headings | Heavy weights read as marketing. 600 is the ceiling |
| 60 | `max-width` on prose expressed in `ch`; any prose measure above 640px | `68ch` in Newsreader renders 91 CPL — over the AAA 80-char ceiling |
| 61 | Negative letter-spacing on serif body copy | Text serifs are already fitted for continuous reading; tightening destroys the fit |
| 62 | Numerals in the sans without `font-variant-numeric: tabular-nums` | The timeline years and every denominator will not align |
| 63 | Hyphen-minus in a delta; an SVG or icon-font arrow in a delta | Use U+2212 and U+2192 — figure-width, aligned, and copy-pasteable into a recruiter's Slack |
| 64 | `text-align: justify` | Fails SC 1.4.8 and produces rivers at a 576px measure |
| 65 | More than three families, or `axes: ['opsz']` on the body serif, or `display: 'optional'`, or `next/font/local` pointed at an unsubset upstream file | Each costs bytes or fidelity on the one site that cannot afford either |
| 66 | `font-feature-settings: "ss01"` while sourcing Geist from `next/font/google` | The feature does not exist in that build. It is a silent no-op |
| 67 | A chart legend | Direct-label every series; with two accent colours there aren't enough to build a legend from |
| 68 | A bare, unannotated screenshot; Mermaid default-theme diagrams; whiteboard photographs | A bare screenshot is decoration; an annotated one is evidence. (Moot until screenshots exist — see §4.1) |
| 69 | Any diagram requiring pinch-to-zoom on mobile | Responsive SVG or a distinct simplified mobile variant |
| 70 | AI-generated or stock imagery of any kind, including "abstract" hero art | On this site it would be the loudest possible admission |
| 71 | A centred hero: centred headline, centred sub-line, two centred buttons | The generator hero. Left-aligned on the 12-column grid, columns 1–7 |
| 72 | A horizontal stat banner without denominators | This is the live risk to the **proof strip**. Generator stat bars never carry populations or timeframes — **the denominators are what make it not a stat banner** |

## 5.5 Process

| # | Rejected | Why, here |
|---|---|---|
| 73 | Publishing before the numbers have denominators | The site's differentiation *is* measurement honesty; shipping the resume's unfalsifiable numbers with better typography destroys the only advantage the medium has |
| 74 | Shipping AI-drafted prose without a full human voice pass | 49% of hiring managers flag heavily AI-generated material, and detection is tonal, not tool-based |
| 75 | A `.vercel.app` domain | Combined with Geist and a stat strip it is a three-signal starter-template stack. Treat the custom domain as a **design requirement**, not a deployment nicety |
| 76 | Gating content behind "coming soon" | Ship two case studies rather than promising three |
| 77 | Treating the portfolio's existence as the differentiator | ~40% of PMs in Asia have one and Indian JDs frequently request one. It is table stakes; differentiation is artifact tier and writing quality |

---

# 6. Where research contradicts the strategy document

Not softened. `CONF` = my confidence that the recommendation is right.

## 6.1 Truth and claims — these are build-failure conditions, not preferences

| # | STRATEGY SAYS | RESEARCH SAYS | RECOMMENDATION | CONF |
|---|---|---|---|---|
| 1 | Hero: *"Health apps are the hardest retention problem in consumer software. I've spent two years solving it for a million people."* | Fails on three independent counts: a superlative comparative from an N-of-1 category record; "two years" is 22 months and **inflates past his own resume's "1.5+"**; and **there is no retention metric anywhere in the record** — retention appears twice, both times as the problem, never as an outcome. The strategy's own supporting benchmark is uncited and, traced, does not support the claim | **Replace with the reframe hero.** Open with the tension, not a thesis. No superlative, no years figure, and **the word "retention" appears only where the record uses it — as the problem** | **HIGH** |
| 2 | `1.9s` cold start — in ten places including the `<title>`, the OG image spec and the `MetricDelta` reference implementation | The string "1.9" appears in **no source**. R says `<2s`, an inequality | **`15s → under 2s`, everywhere.** If a delta is needed: `at least 7.5× faster` or `≈87% faster` — never `−87%` next to an invented value | **HIGH** |
| 3 | Proof strip: `COLD START 15.0s → 1.9s · P75, low-end Android, 8 weeks` | Four fabricated components in one line: the tenths precision, the value, the percentile, the device population. The strategy contradicts itself on the device tier (mid-tier at §474, low-end at §882/979/1061) | `COLD START · 15s → under 2s · 8 weeks · [NEEDS: percentile, device population, measurement method]` | **HIGH** |
| 4 | Case-study header template: `Team: 4 engineers, 1 designer, no dedicated QA` · `Timeline: 8 weeks, Q1 2025` | **Zero headcount data in any source.** The strategy supplies three different engineer counts in four places, which proves the number is illustrative. `Q1 2025` also contradicts the strategy's own "my first eight weeks" (= Oct–Nov 2024) | Omit both rows, or render `[NEEDS: …]`. **This block is the highest-risk item in the whole spec** because it is fenced code that every case study is built from | **HIGH** |
| 5 | Steps Premier League north star = *"week-2 → week-4 retention (not session time)"* | R:HCL-b3 **explicitly names session time as the North Star Metric**. Substituting one is not a reframing, it is a misstatement — and it is unrecoverable if he is asked "what was your north star?" in interview | Write what the record says, then own it: *"We used session time as the north star. I'd argue for week-2→week-4 retention now, and here's why."* **This is a stronger sentence than the substitution** | **HIGH** |
| 6 | Proof strip places `+20% DAU` beside session time, undifferentiated; homepage card 2 is SPL | R attributes +20% DAU to the **engagement suite**, not to Steps Premier League. Placement creates an attribution smear | Label it `Engagement suite → DAU +20% · 12 weeks · [NEEDS: baseline and denominator]`. **Two bullets, two initiatives, two numbers** | **HIGH** |
| 7 | *"Six products taken 0→1"* in the hero sub-line, repeated in eight places | R explicitly labels **two**. One of the six ("Revamped QuickSell") **contradicts** the 0→1 label, one was *proposed* not shipped, and three predate the Oct-2024 start — so "in two years I've taken six 0→1" is false on its own terms. The strategy also says "across five companies"; the enumeration spans **four** | Claim **two explicit 0→1 launches plus a four-feature engagement suite**, or render `[NEEDS: confirm the full 0→1 list — each net-new, not a revamp]` | **HIGH** |
| 8 | AI Health Reports written around a safety-boundary diagram, a refusal/escalation layer, grounding rate, out-of-scope-advice rate, clinician-review pass rate, prompt regression against a golden set, and *"the model writes the prose; deterministic rules decide the medicine"* | **Every one of those is absent from the source.** R:HCL-b4 says nothing about safety, evaluation, hallucination, escalation, refusal or clinical sign-off. This is the largest fabrication risk in the strategy **and it sits in the case study aimed at the audience best equipped to detect fabrication** | **Cut all of it.** Rebuild the case study as **"Who pays"** — the three-party model, with AI as mechanism not subject. If Aniket answers `CG B10` and he *did* build a boundary, add it then and it becomes the strongest piece on the site | **HIGH** |
| 9 | Case study 3 ships regardless | Its only quantified outcome (`15% incremental revenue`) is the weakest metric in the record — missing all four required fields — and R attributes it to the **cross-sell hooks**, not to the product | **Cut condition:** if `CG B5` goes unanswered, demote to a 300-word short case and **ship two full case studies plus the built tool.** The strategy's own rule ("reviewers judge on the weakest study they read") requires this and the strategy then does not apply it | **HIGH** |
| 10 | Rewrite copy: *"Trackers and Live Events went to Won't-Have for the quarter. The Live Events team was not happy."* | **R says the engagement suite (Challenges, Streaks, Live Events, Trackers) *shipped*.** This copy claims the opposite of the resume a reviewer is holding, and invents a "Live Events team" | Never claim they were cut. `[NEEDS: name one thing you actually put in Won't-Have, and who objected]` | **HIGH** |
| 11 | Homepage timeline renders every role as `Product · Company` | Four of the five were **internships**. This is title inflation in the single most recruiter-scanned block on the page, and it breaks the instant LinkedIn is opened | Print the real title on every row, using the conservative variant where R and L conflict | **HIGH** |
| 12 | Alt-text example: *"Cohort retention curve showing a drop from 62% to 31% between week 1 and week 2"* | Two fabricated retention numbers, in the place a builder is least likely to fact-check and a screen-reader user is most likely to trust — and alt text is indexed | Alt text is subject to P1/P2 identically to body copy. Caption reconstructions per `CG D-R5` | **HIGH** |
| 13 | Display `+122%` beside `3.5 → 7.8 min` | `(7.8−3.5)/3.5 = +122.86%`, which **rounds to +123%**. The resume is self-inconsistent by one point, and dividing 7.8 by 3.5 takes a sceptical Senior PM four seconds | Show `3.5 → 7.8 min` and let the reader do the arithmetic. If a delta is required, `2.2×` marked `[DERIVED]`. **Never `+122%` adjacent to the pair** | **HIGH** |
| 14 | Artifact drawer contains "2–4 real (redacted) artifacts" | No PRDs, exports, briefs, matrices or screenshots exist. A drawer promising documents that opens onto self-authored diagrams is worse than no drawer | Rename to **"Reasoning, reconstructed"**; every reconstruction carries the D-R5 provenance caption; reserve *artifact* for the day a real one exists | **HIGH** |
| 15 | Four separate 300-word visual specs: latency waterfall, bundle treemap, device-tier matrix, cohort curve, decision matrix with scores | Each requires per-phase timings, composition breakdowns, matrix cells or curve values **that do not exist**. Drawing them is fabricating data, not visualising it | Two-value comparisons and structural diagrams only (§4.1). Build the components to receive real data later; do not build the data | **HIGH** |

## 6.2 Positioning, structure and hiring strategy

| # | STRATEGY SAYS | RESEARCH SAYS | RECOMMENDATION | CONF |
|---|---|---|---|---|
| 16 | Three different positioning claims — Option 1 for the site, Option 5 for LinkedIn, a third formulation in §14.1 | *"If your portfolio homepage headline, resume summary, and LinkedIn headline don't say the same thing, the reviewer won't trust any of them."* The strategy demands the *facts* reconcile in Part 0, then recommends the *positioning* diverge | **One claim across site hero, LinkedIn headline, resume summary and the three-sentence pitch.** Vary the length; never vary the claim | **HIGH** |
| 17 | *"What I got wrong"* mandatory in every case study, plus a postmortem on `/approach` — four confessions | The record contains **zero failures across 16 work bullets**, so four slots produce fabrication or triviality, and four trivial admissions read as a format. The evidence bar is lower than assumed: *"a trade-off you'd make differently"* is explicitly sufficient | **One real failure, in the highest-traffic case study.** Others carry "differently now". **Do not make `mistake` a required schema field** — `notOwned` as required is good discipline; `mistake` as required guarantees invention | **HIGH** |
| 18 | Site-wide cap: under 6,000 readable words | The reasoning is sound; the constraint is wrong. It caps *available* depth as well as *required* depth, and a converted reader spends an unbounded amount of time | **Required path ≤1,200 words; optional depth uncapped.** Guard against padding, not length | **HIGH** |
| 19 | The built tool sits at homepage section **5 of 6**, while §14.4 calls it "the load-bearing item for AI-PM credibility" | AI-PM reviewers **open the live URL first**; general attention is exhausted at case study three. Section 5 is past both | `Lab ↗` in the primary nav going **straight to the demo**, plus a one-line pointer in the hero block. The homepage section stays where it is as the fuller treatment | **HIGH** |
| 20 | The AI case study is third | Third is the slot where reading demonstrably stops | Decide deliberately: promote it to second, **or** accept that its function is served by the built tool and write it for the reader arriving *from* the tool. Do not leave it to card order | **MEDIUM** |
| 21 | Testimonials hosted on the site | A quote on the candidate's own site is unverifiable by construction, on a site whose entire premise is that unverifiable claims get discounted | Ask for **LinkedIn recommendations**, quote them on the site **with a link to the public recommendation.** Same words, verifiable source, one click for the sceptic. Costs the referee nothing extra | **HIGH** |
| 22 | Healthcare depth "caps your market and reads as domain hire" | **40% of candidates are at risk of rejection at screening without domain experience**, and hiring managers explicitly value having solved problems in similar domains including healthcare | Keep "proving ground, not identity" as the framing, but **do not shrink the health signal** — for the healthtech segment it *is* the screening criterion. Make it legible as transferable problem-shapes instead | **MEDIUM** |
| 23 | Having a portfolio is itself the differentiation | **~40% of PMs in Asia have one; Indian JDs frequently request one.** In regions where they are common, having a good one is *"virtually a must"* | Table stakes. Differentiation is (a) qualified numbers, (b) a usable artifact, (c) operator prose. Everything else is parity | **HIGH** |
| 24 | Stage 7 distribution gets ~8 hours of a ~150-hour plan | Referrals dominate Indian PM hiring; referred candidates are reported 3–5× more likely to land interviews | The site's highest-ROI use is **the thing attached to a warm intro**, not a thing that gets found. Build the OG image and three-sentence pitch to be pasteable into a DM, and weight distribution accordingly | **MEDIUM** |
| 25 | Cold start and bundle size are *"physical and unfalsifiable"* — a sceptic *"cannot discount them"* | Both are entirely method-dependent: cold start on device/network/cold-vs-warm/percentile/build variant; bundle size on compressed-vs-uncompressed and APK/AAB/install size. Accepting the strategy's claim would license publishing them **under**-qualified | These two numbers need method statements **exactly as much as DAU does.** They are the *best* numbers on the site, which is why under-qualifying them costs the most | **HIGH** |

## 6.3 Design, typography and implementation

| # | STRATEGY SAYS | RESEARCH SAYS | RECOMMENDATION | CONF |
|---|---|---|---|---|
| 26 | `max-width: 68ch` for case-study prose | `1ch` is the width of `0`, not an average character. **68ch in Newsreader = ≈91 CPL** — past the WCAG AAA 80-char ceiling and far past the ~66 optimum. Five live premium editorial sites cluster at 600–675px | **`max-width: 36rem` (576px) at 21px ≈ 65 CPL.** Hard ceiling 640px. Never express prose measure in `ch` | **HIGH** `[MEASURED]` |
| 27 | Case-study body at 19px | Newsreader's x-height is 20% shorter than Geist's; at 19px it renders **optically smaller than Geist at 16px** | **21px / 1.60.** Mobile 18px / 1.65 | **HIGH** `[MEASURED]` |
| 28 | `font-feature-settings: "ss01"` on Geist | **`ss01` does not exist in Google's Geist build** (`ccmp,dnom,frac,liga,locl,numr,pnum,tnum` only). The declaration is a silent no-op. `case` — which the all-caps eyebrows genuinely need — is also absent | Self-subset from the Vercel build (`ss01–ss11`, `case`, `dlig`). This is one of two reasons Path B is mandatory | **HIGH** `[MEASURED]` |
| 29 | Fonts via `next/font` (Google), "two families + one mono, subset to Latin" | `next/font/google` for this stack = **171.0 KB** latin. Self-subsetting = **63.6 KB**, a 62.8% reduction, on the one site whose lead case study is a cold-start fix | **`next/font/local` over committed pre-subset `woff2`.** Homepage payload 29.3 KB. Commit `OFL.txt` | **HIGH** `[MEASURED]` |
| 30 | Geist is the safe interface choice | Geist is **named in 2026 generator-output audits as a headline default**, on a Vercel-hosted Next.js site — the exact starter silhouette | Keep Geist (the *combination* is the fingerprint, and the Geist/Geist Mono x-height match is genuinely load-bearing for `MetricDelta`). **Pre-declare Public Sans as the drop-in swap** if Phase 8 review finds generator resemblance | **MEDIUM** |
| 31 | `--muted #6B7278` | Measures **4.48:1** on `--paper` — **fails WCAG AA for normal text**, and `--muted` is specified for captions, metadata and denominators, all normal-size text. This will block Lighthouse Accessibility 100 | **`#5A6167` (5.77:1)** | **HIGH** `[MEASURED]` |
| 32 | `--flag #B4551F` burnt amber for "what I got wrong" | Two problems. It measures **4.52:1** — passing AA by 0.02, which any anti-aliasing or `opacity` shift breaks. And **`#B4551F` reads as terracotta**, which §10.2 of the same document bans as generator look #1 | **`#9A4517` (5.95:1)**, and ensure the **first screen contains none of it** so the initial palette read is paper/ink/green | **HIGH** `[MEASURED]` |
| 33 | `Callout` with a `mistake` variant "visually distinct enough to be identifiable while scrolling" | The obvious implementation — a 4px coloured left border — is described as *"almost as reliable a sign of AI-generated design as em-dashes in text"* | Amber **all-caps mono eyebrow** (`WHAT I GOT WRONG`) + amber rule **above** the block + `--paper` background. Same scannability, different fingerprint | **HIGH** |
| 34 | Homepage beliefs set in serif at 19px | Puts ~34 KB of serif on the homepage critical path and spends the register shift before the long-form arrives | **The homepage sets no serif.** Serif is exclusive to `/work/[slug]` and `/approach`, where its first appearance *is* the signal | **MEDIUM** `[INF]` |
| 35 | Single nine-step 1.25 type scale | A mathematically perfect ratio with nothing distinctive at either end is itself a named generator tell, and it forces UI and prose to share steps | Two scales: nine UI steps at ≈1.20 plus a hero `clamp()`, three prose steps. Twelve total | **MEDIUM** |
| 36 | Hero sequence over ~700ms with numbers counting on the final 200ms | The count-up is a SaaS-marketing trope that delays reading of the most load-bearing content by design. 700ms also exceeds the 500ms threshold at which users scroll past mid-animation | **520ms rule draw, delta figures fading over the final 160ms, stagger ≤60ms, total ≤700ms. No count-up.** Final state is the CSS default; the animation runs *from* an offset state so the strip is readable if JS never fires, and it never replays | **HIGH** |
| 37 | Consider publishing the Lighthouse score in the footer as "an earned flex" | Checkable forever, decays silently on every deploy, and reads as a flex to exactly the reader who dislikes flexes — and a stale `100/100` in the footer of a performance PM's site is the worst possible place to be caught | Keep the 100. **Drop the badge.** If it must appear, one line of text linked to a dated PageSpeed run | **MEDIUM** |
| 38 | Homepage total JS < 90 KB gzipped, as a hard acceptance criterion | The App Router framework floor is the dominant term, not the site's own code | Keep the criterion, but **measure the floor on an empty static route first.** If the floor is near 90 KB, restate the budget as "zero application JS on `/` beyond the framework floor" with the measurement attached — and set the CI gate to that number. Do not quietly relax it | **MEDIUM** |
| 39 | `notOwned` and `team`/`timeline` as required schema fields | Good discipline for `notOwned`; but with no source data behind `team` and `timeline`, a required field **forces invention** — and the strategy's own header template supplies the number a builder would fill it with | Every required field must **accept and render a `[NEEDS: …]` sentinel.** A required field that cannot be left visibly empty is a fabrication generator | **HIGH** |

---

# 7. The AI-generated-site tell list

**The meta-finding that governs everything below:** *"The conditional probability stacks. A single
element is noise; the combination of ten defaults creates a high generator-likelihood signal."*
No single item here is disqualifying. **Audit the site as a set.**

This section is written as a checklist a visual reviewer can run **against screenshots**, plus a
short grep block for the things a screenshot cannot see. Score each row PASS / FAIL. **Target: zero
FAILs. Escalate at three or more, regardless of which three.**

## 7.1 The silhouette test — run this first, it is the fastest and the most diagnostic

1. Screenshot the homepage at 1440×2400 and at 390×2400.
2. Reduce each to a **200px-wide black-on-white silhouette** — blocks for sections, lines for text,
   no colour, no type.
3. Place beside three template PM portfolio silhouettes.
4. **If you cannot tell which is ours, the page is structurally templated regardless of how
   carefully the colours were chosen.**

Run at Stage 4 (design) and again at Stage 6 (polish). Record both.

## 7.2 Layout and structure — visible in a screenshot

| # | Tell | PASS condition |
|---|---|---|
| L1 | `hero → three feature cards → testimonials → CTA → footer` | Section order is Identity → Proof → Work → Beliefs → Built → Track record |
| L2 | **Three-up card grid** for the case studies | Stacked full-width rows. **No `grid-cols-3` anywhere on the homepage** |
| L3 | Icon-on-top cards; any decorative icon | Zero icons. Only `→ ↗ ↓ −` from the type, plus data marks in figures |
| L4 | A coloured badge/pill directly above the H1 | `Currently:` sits **below** the sub-line, mono 12px, no pill, no dot, no border, no background |
| L5 | Centred hero — centred headline, centred sub-line, two centred buttons | Left-aligned, columns 1–7, first metric delta anchoring 8–12 |
| L6 | Numbered "1 / 2 / 3" process steps | Beliefs unnumbered. Section numbers appear only in the progress rail, where they are navigation |
| L7 | Bento grid | Zero |
| L8 | Logo marquee / infinite ticker / auto-scroll | Zero |
| L9 | A horizontal stat banner | The proof strip carries a **denominator under every figure**, no icons, no cards, no border around the group, hairline rules between. *The denominators are the differentiator* |
| L10 | Uniform padding and uniform radius on every surface | Block spacing varies **between section types** while staying on the 8px scale. Radius is 4px everywhere |
| L11 | Emoji anywhere in nav, headings or labels | Zero |
| L12 | One content width throughout | Three figure widths in use (column / wide / full-bleed) |
| L13 | Prose column centred with a rail floating beside it | Prose left of centre; the composition is balanced by the rail, not by geometric centring |

## 7.3 Typography — visible in a screenshot

| # | Tell | PASS condition |
|---|---|---|
| T1 | Inter as body text | Not present anywhere |
| T2 | The generator trio (Inter + Space Grotesk + Instrument Serif; Cal Sans) | Not present. **Geist is never paired with Space Grotesk or Instrument Serif** |
| T3 | A single italic serif word inside a sans hero | Hero is one family, one style. Zero italic in the hero |
| T4 | All-caps micro-labels on every section | All-caps appears in **exactly one role**: the `MetricDelta` eyebrow |
| T5 | Pure `#000` / `#fff` text or background | Off-black `--ink`, warm off-white `--paper`. No stray `#000`/`#fff` |
| T6 | Seven sizes all 1.25× apart, nothing distinctive at either end | Two scales (§3.4) plus a hero `clamp()` |
| T7 | Heading weights 700+ | Ceiling is 600 |
| T8 | Prose lines visibly running to ~90+ characters | Count characters on three body lines. Must be 50–75; hard fail above 80 |
| T9 | Numerals in the sans not aligning in a column (timeline years, denominators) | Columns align — `tabular-nums` inherited from `:root` |
| T10 | Hyphen used as a minus; an SVG arrow in a delta | `−` is U+2212, `→` is U+2192, both selectable and copy-pasteable in the browser |
| T11 | Serif prose that reads *smaller* than the UI text | Serif body is optically one step larger than 16px UI text |

## 7.4 Colour and surface — visible in a screenshot

| # | Tell | PASS condition |
|---|---|---|
| C1 | Tailwind blue/indigo/violet/purple | Absent. Palette is paper / ink / rule / muted / signal green / flag amber, nothing else |
| C2 | Blue→purple or purple→pink gradient; any gradient mesh | Zero gradients, except the documented table-edge fade mask |
| C3 | "VibeCode purple" lavender in an OG image, a diagram or an illustration | Diagrams use only `--ink`, `--muted`, `--rule`, `--signal`, `--flag` |
| C4 | Coloured glows; any `box-shadow` | Flat cards: `--paper-raised` on `--paper`, 1px `--rule`, 4px radius, **no shadow** |
| C5 | **A coloured left border on a card or callout** | The `mistake` callout uses an amber eyebrow + rule **above** + `--paper` background. **No coloured left borders anywhere** |
| C6 | 12–16px corner radius | 4px everywhere |
| C7 | Terracotta-and-cream first impression | The **first screen** contains no amber; the opening palette read is paper / ink / green |
| C8 | Mid-grey body text failing AA | `--muted` is `#5A6167` (5.77:1). Every text/background pair verified |
| C9 | Permanent dark mode or a theme toggle | Light-first, no toggle |
| C10 | AI-generated or stock imagery, "abstract" hero art | Zero imagery that is not a diagram, an annotated screenshot, or the tool's own UI |

## 7.5 Motion — check by interacting, and record a screen capture

| # | Tell | PASS condition |
|---|---|---|
| M1 | `opacity 0 → 1` + `translateY(20px)` on scroll | **Zero scroll-triggered animation on any text block** |
| M2 | Everything animating at the same duration and easing | Three durations (120 / 180 / 520ms), two easings. Exactly three |
| M3 | A 20-token motion system on a five-page portfolio | Three tokens |
| M4 | Card lift + shadow upgrade on hover | Hover is border colour + metric colour only. **No `transform` on hover anywhere** |
| M5 | Count-up numbers | None. Rule draw only |
| M6 | Animation replaying on scroll-back or back-navigation | The hero sequence fires once per page load and never again |
| M7 | A loading skeleton, spinner, splash or route transition | None. This is a statically generated site whose lead case study is a cold-start fix |
| M8 | No `prefers-reduced-motion` handling | Present, **and the hero checks the query in its own CSS** so the final state is applied directly rather than animated in 0.01ms. The blanket override is a safety net, not the implementation |
| M9 | Content invisible before its animation runs | Screenshot with JS disabled: the fully-formed proof strip is on screen and readable |

## 7.6 Copy — read the rendered text, not the source

| # | Tell | PASS condition |
|---|---|---|
| CP1 | Em-dash density (measured at 4–6× higher in AI-built copy) | **≤1 em-dash per 150 words** across the site. Prefer a full stop |
| CP2 | Rule-of-three everywhere — "fast, simple, and reliable" | List lengths vary deliberately: two, four and five-item lists appear |
| CP3 | Uniform paragraph length | There is a two-word paragraph somewhere. Real writing has one |
| CP4 | "Not just X, but Y" / "It's not about A — it's about B" | Zero instances |
| CP5 | "In today's landscape", "As the industry evolves", "Here's the thing" | Zero instances |
| CP6 | Section headers as abstract nouns — Impact / Learnings / Reflection / Overview | Every header is a claim (P5). No two case studies share a header phrasing pattern |
| CP7 | Symmetric parallel headers — "Discover / Design / Deliver" | Absent |
| CP8 | Perfectly balanced pro/con framing with no position taken | Every options section ends in a defended choice with a named cost |
| CP9 | Hedged verbs — "may help", "can potentially", "designed to" | Absent. *"I attribute this directionally, not causally"* is **not** hedging — it names a limit rather than softening a claim, and it stays |
| CP10 | Vague aspirational headlines — "Build the future of X" | Every headline is specific and falsifiable |
| CP11 | Tone shifting between sections | One voice. If multiple agents drafted, one pass rewrote the whole site end to end |
| CP12 | Banned vocabulary: passionate · data-driven · leverage (v.) · synergy · robust · seamless · game-changing · cutting-edge · end-to-end · cross-functional (standalone) · "I'm excited to" · "utilise" · any sentence opening "As a product manager, I…" | Zero instances |

## 7.7 Grep block — the things a screenshot cannot see

```bash
# Generator colour and surface defaults
grep -rn "3b82f6\|2563eb\|blue-500\|blue-600\|indigo-\|violet-\|purple-" app/ components/   # → 0
grep -rn "box-shadow\|shadow-sm\|shadow-md\|drop-shadow"                app/ components/   # → 0
grep -rn "linear-gradient\|radial-gradient\|bg-gradient"                app/ components/   # → 1 (documented table-fade mask only)
grep -rn "rounded-xl\|rounded-2xl\|rounded-3xl\|border-radius: *\(8\|12\|16\)px" app/ components/  # → 0
grep -rn "#000\b\|#fff\b\|#ffffff\|#000000"                             app/ components/   # → 0

# Generator motion defaults
grep -rn "whileInView\|translateY(20px)\|translate3d(0, *20px\|y: *20\|framer-motion" app/ components/  # → 0

# Typography traps
grep -rn "max-width: *[0-9]*ch\|maxWidth.*ch"                           app/ components/   # → 0
grep -rn "ss01"                                                          app/             # → only on the self-subset path
grep -rn "display: *'optional'\|axes: *\['opsz'\]"                       app/             # → 0

# Truth gates (docs/01b-truth-audit.md §8 — the authoritative list)
grep -rn "1\.9s\|15\.0s\|P75\|P90\|low-end Android\|mid-tier Android\|2–4GB\|Q1 2025" app/ content/ public/  # → 0
grep -rn "engineers\|designer\|no dedicated QA"                         app/ content/     # → 0
grep -rn "enrolled cohort\|1M+ user base\|six 0→1\|six products\|hand-labelled" app/ content/  # → 0
grep -rn "+122%\|62%\|31%\|3\.1 → 4\.2\|12\.4"                          app/ content/     # → 0
grep -rn "jobTitle"                                                      app/             # → "Product Analyst" only
```

## 7.8 Two tells specific to this site's risk profile

1. **A Vercel-hosted, Next.js, Geist-typeset site is the exact starter-template silhouette.**
   Everything above matters more here than it would elsewhere. **The four things that pull it out are
   the serif, the warm light paper, the flat 4px cards, and the total absence of gradients. Do not
   let any of the four erode during polish** — polish is when they erode.
2. **`.vercel.app` + Geist + a stat strip is a three-signal stack.** The custom domain is a **design
   requirement**, not a deployment nicety.

---

## Handoff

**Design agent:** §3 is decided — implement it, do not re-evaluate families. §4.6 is the layout
spec. §7 is your review checklist; run §7.1 at the end of your stage. Your two hardest constraints
are §4.1 (the available dataviz vocabulary is two-value comparisons and structural diagrams, nothing
else) and §6.3 items 31–33 (the palette needs three token changes before anything is built).

**Content agent:** §1 is your acceptance criteria and §2 is your rewrite target. §6.1 is
non-negotiable — every row there is a build-failure condition, not a style note. §4.5 tells you where
each sentence type goes. Your gate is P2's defensibility test, applied sentence by sentence.

**Architecture agent:** §3.3 is the font loader. §6.3 item 38 is the first thing to measure. §6.3
item 39 is the schema rule that prevents the whole build from generating fabrications: **every
required field must accept and render a `[NEEDS: …]` sentinel.**

**Unresolved and owned by Aniket, not by any agent:** the thirteen blocking questions in
`CONTENT_GAPS.md` and the twenty-five-item register in `01b-truth-audit.md` §7. Roughly two hours of
his time converts about two-thirds of the current `[NEEDS:]` tokens into publishable facts, and it is
worth more than the entire design and engineering effort combined.
