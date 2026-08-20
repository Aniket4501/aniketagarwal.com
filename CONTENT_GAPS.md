# Content gaps — what Aniket needs to supply

**None of this appears on the public site.** V1 rendered these as visible red markers in
production, which read as a form with validation errors rather than as rigour. V2 removed all of
them: the schema now rejects an internal marker in any field, and both build gates fail on one.

The site ships only what is verified. This file is the private record of what is still thin, so the
copy can be sharpened rather than padded.

Live: https://aniketagarwal-com.vercel.app · Repo: https://github.com/Aniket4501/aniketagarwal.com
Last updated: expansion round 2, 2026-08-19.

---

## BLOCKING — eight things, in priority order

Each is phrased as a question you can answer in one sitting. Everything below this section is
secondary to these.

### B0. What share of the deferred-verification signups ever finished verification?
`[NEEDS: verification completion rate for the Infinyte deferred-verification cohort]`

`/work` says signup completion doubled after verification moved out of the signup funnel. That is
most of what moving the failing steps was always going to do, and the page now says so. The number
that decides whether the change actually worked — how many of those signups came back and verified —
is the one missing, and it is the number the whole trade-off turns on.

### B1. One user quote, with its method and sample size.
`[NEEDS: one anonymised user verbatim per case study, plus method and N — e.g. "8 moderated sessions, mid-tier Android, March 2025"]`

**The site's headline is "I find the reason a product isn't being used." It contains no evidence of
ever having asked one.** Across three case studies, two short cases, a teardown and a thesis there
is not one user quote, not one interview count, not one usability session. Every reason on this site
is inferred from behavioural data at a distance.

**What the record does say**, and why this is a gap rather than an absence: the résumé states the
engagement suite was shipped *"based on user research"*, Droom's OBV page was rebuilt *"based on
user research"*, Circle Health used *"user journey mapping"*, and YourStory *"surveyed 5,000+
users"*. So the research happened. What does not exist anywhere is a method, a sample size, a date,
or a single sentence somebody actually said.

One quote and one method line in two case studies would close the largest remaining hole on the
site. `/approach` now names the gap in one line rather than pretending it is not there.

### B2. Team size and composition, per case study.
`[NEEDS: engineers, designer, QA, analyst — for Step Syncing, Steps Premier League and AI Smart Health Report]`

The case-study headers currently say *"Cross-functional initiative with the engineering team"* and
*"Cross-functional, with engineering and design"*. **A Head of Product cannot level a candidate from
that.** Four engineers or fourteen is the difference between two seniority bands, and the record
contains no headcount anywhere — the only team signal in any source is *"cross-functional
collaboration with VP-Product and stakeholders"*.

`4 engineers · 1 designer · no dedicated QA` is worth more than three sentences of description, and
it is a two-minute answer that materially changes how a hiring manager reads every number on the
site.

### B3. Name one person who disagreed with you, and what happened.
`[NEEDS: one decision where a named colleague pushed back, on what grounds, and how it resolved]`

**Two independent reviewers found the same hole, and it is now the site's largest.** There is not one
named counterparty anywhere on eleven pages. Every disagreement published here is between you and
your past self: what a number does not prove, where a record stops, what you would do differently.
That register is rare and it is genuinely good — and it is structurally incapable of showing that
you have survived a disagreement with a living, funded, unreasonable person, which is most of the
job. The Strava teardown even *invents* its opposition ("Growth will like it", "Marketing objects").

The question the site cannot currently survive: *tell me about a time you were wrong at the time, a
specific person told you so, and you changed your mind.* Two sentences would close it. More writing
in the current register will not.

### B4. What is the population and window behind "+20% daily actives"?
`[NEEDS: denominator, window and method for +20% DAU]`

The site now dissects a 4.3-minute session-time delta in several places and says nothing about the
20% DAU lift, which has no case study, no caveat and no attribution boundary. A reviewer noticed the
asymmetry immediately and said it is where they would attack. Either qualify it or cut it.

### B5. What was the week-2 → week-4 return rate for people who joined a Steps Premier League season?
`[NEEDS: week-2 → week-4 return rate for people who joined a league, against the same weeks for
people who did not, with N for each group]`

**Why this is first.** Steps Premier League was built to fix a drop-off. A drop-off is a retention
problem, and the case study currently headlines *session time* — which the résumé does record as the
declared north star, and which is the wrong instrument for the question. The case study now says so
in its own results section rather than hiding it. That is the honest version of not having the
number; it is not as good as having it.

**Note on what the record does and does not contain.** The résumé attaches "Week-2 retention
drop-off" to a *different* bullet — the engagement suite (Challenges, Streaks, Live Events,
Trackers), whose stated outcome is `+20% DAU within 12 weeks`. That is DAU, not retention, and it
belongs to different work. The site does not borrow it for the league, and will not.

### B6. One redacted page of a real document.
`[NEEDS: one redacted PRD page, experiment brief, or cohort export — any single one]`

The highest-value asset still missing from the site, and it has been the highest-value missing asset
since V1. All six artifact drawers currently contain reasoning. Reasoning is good; four of the six
earn their place without a document (see `docs/11-evidence-audit.md` §C). Two do not, and the cohort
chart behind *"cohort analysis put a drop-off on the table"* is the single most load-bearing
unbacked claim on the site — the résumé confirms the analysis happened and says nothing about what
it found.

### B7. Denominators for the three percentages on the homepage proof panel.
`[NEEDS: population + window + method for +35% step-sync completion, +20% DAU, 15% incremental revenue]`

`+35% step-sync completion` sits on the hero panel carrying three of the four qualifiers the site's
own rule requires, all missing. See `docs/11-evidence-audit.md` §B for the full table. This cannot
be fixed by writing.

### B8. Two LinkedIn recommendations, requested today.

**Third-party attestation of ownership is the fastest available way to neutralise a "Product
Analyst" title. Two sentences from a manager outweigh anything else on this list** — it is ranked
eighth only because it is the one item whose timeline you do not control, so it should be *asked
for* first and will *land* last.
`[NEEDS: public LinkedIn recommendations from the VP-Product at HCL Healthcare and the Circle Health manager]`

**Ask for LinkedIn recommendations, not site testimonials.** A quote hosted on your own site is
unverifiable by construction and reads as decoration; a LinkedIn recommendation is attributable and
survives a click. Two or three sentences from each would do more to neutralise the Product Analyst
title than anything else available — a manager saying you owned the surface outweighs the title
field on the org chart.

Both names are in your own LinkedIn history: your Circle Health farewell post names your manager
there, and the résumé names the VP-Product collaboration at HCL. They are deliberately not written
into this file, because this repository is public and a third party's name does not belong in
someone else's job-hunt notes.

**This has the longest lead time of anything in this document. Ask today.**

---

## Source conflicts — fix these before the site is shared

These come first because they are credibility issues, not content gaps. A recruiter opens the resume
and LinkedIn side by side; this is what they find. **The site uses the more conservative version of
each and never resolves one silently.**

| # | Resume says | LinkedIn says | Action |
|---|---|---|---|
| C1 | Header: `1.5+ Years in Product Management` | `HCL Healthcare · Oct 2024 – Present` | Oct 2024 → now is 22 months. The resume undersells by five months. The site claims no total-years figure at all and states `since October 2024`. **Update the resume header.** |
| C2 | `Dual Degree in Applied Geology, CGPA 8.13` | Two entries: `UG, Learning Sciences` **and** `MS, Geological/Geophysical Engineering` | Three degree names across two documents. **The most dangerous of these.** The site names no discipline at all. Make all three surfaces match the certificate. |
| C3 | Infinyte Club — `Product Intern` | Infinyte Club — `Product Operations` | Site uses `Product Operations` (claims less). Confirm the offer letter. |
| C4 | Infinyte — `Feb–Apr '23` | Infinyte — `Feb–May '23` | Site uses the shorter span. |
| C5 | YourStory — `Jun–Sep '22` | YourStory — `Jun–Oct '22` | Site uses the shorter span. |
| C6 | Circle Health — `Product Intern` | Circle Health — `Product Management Intern` | Site uses `Product Intern`. |
| C7 | — | About: *"strong interest in Product Management… Looking forward to new opportunities"* | **This undoes the site.** A fresher's summary next to a portfolio claiming owned work. Rewrite it in an operator's voice. |
| C8 | — | Top Skills: `Product Analysis, Wireframing, Google Analytics` | First thing a recruiter's eye lands on, and all three are 2019 signals. Reorder. |
| C9 | Omits Tap Invest, FundsTiger, SurgiNatal | All listed | Not dishonest, but LinkedIn shows a scatter of sub-3-month stints the resume does not. Consider removing the non-product ones. |

---

## Metrics that need a denominator

All of these are **on the site** with the context Aniket supplied. None is invented. They would each
be stronger with a population and a window, and an interviewer will ask.

| Metric | Where it appears | What is missing |
|---|---|---|
| `+35% step-sync completion` | hero, homepage, case 01 | Of which population, over what window, measured how? Source is Aniket's V2 brief rather than the resume. |
| `+20% app engagement` | hero, homepage | Resume says "+20% DAU within 12 weeks". +20% relative to what baseline DAU, and as a share of what denominator? |
| `15% incremental revenue` | hero, homepage, case 03 | 15% of which revenue line, over what period? The resume attributes it to the cross-sell hooks rather than the report as a whole, and the site keeps that boundary. |
| `3.5 → 7.8 min session time` | homepage, case 02 | Measured on league entrants or on everyone active? Over what window? Median or mean? |
| `15s → under 2s` | everywhere | Which percentile, on which device population, read from what instrument? |
| `25MB → 6MB` | case 01 | Download size, install size, or APK/AAB? The 76% is exact either way. |
| `5+ enterprise closes` | homepage, case 03 | Over what period? |
| `2× signup completion` | short case | Baseline rate and N. |
| `+15% assessment completion`, `30% manual effort reduction` | **not currently on the site** | Supplied in the V2 brief but held back — without a denominator or a case study behind them they would be two more unqualified percentages. Add them once there is a story to attach. |

---

## Facts that would materially improve the site

Ranked by how much each would change a hiring decision.

### 1. One decision that did not work
Every reviewer of V1 raised this. The record contains zero failures across sixteen resume bullets,
so it cannot be sourced and will not be invented. `/approach` currently carries a "What I would do
differently" section built from real analytical positions in the case studies — which is honest, and
weaker than a real postmortem.

**What is needed:** one decision, what happened, what it cost, what you would put in its place.
*"I would have communicated more"* is not an answer.

### 2. One disagreement with a named person
The sharpest thing a V1 reviewer said: *"every case is Aniket versus a dataset; not one sentence
about persuading a person."* Two sentences — who pushed back, on what grounds, how it resolved —
converts "essayist" into "operator" and is the single highest-leverage addition available.

### 3. Team shape and duration
Case studies 02 and 03 have no team or timeline field, because none is in the record. How many
engineers, was there a designer, was there QA, and how long from first analysis to launch?

### 4. How the AI report avoided giving medical advice
Prompt, deterministic rules, fixed templates, human review, or nothing? The case study currently
names this as the question it cannot answer from the published record and bridges to Grounded.
**A real answer moves this case study to the front of the site.**

### 5. One real artifact
A redacted PRD section list, a cohort export, a prioritisation matrix, one anonymised screen. The
Drawer component is already built to receive it. One real artifact is worth three paragraphs.

### 6. Two LinkedIn recommendations
Not site testimonials — a quote hosted on your own site is unverifiable by construction. Ask your
VP-Product at HCL and your Circle Health manager for public LinkedIn recommendations, then quote
them with a link. Longest lead time of anything on this list; ask today.

### 7. Hand-label the Grounded golden set
Sixteen synthetic cases, currently labelled by the harness author. The page says so. Labels from
someone with clinical training would make the agreement number mean something.

### 8. Smaller confirmations
- Confirm `github.com/Aniket4501` is the public handle (the site does not link it yet).
- Is publishing the internal product names "Steps Premier League" and "AI Smart Health Report"
  acceptable to HCL? Both are in the resume, so they are truthful, but that is a disclosure question
  this build cannot answer.
- Can the app itself be named? The site says "a consumer health app" throughout.

---

## Redaction decisions

| # | Decision | Why |
|---|---|---|
| D1 | The resume PDF ships unmodified, phone number included. | It is his own resume and the number is contact information he deliberately included. One-file reversal: drop a redacted PDF at `public/aniket-agarwal-resume.pdf`. |
| D2 | The strategy document and the LinkedIn export are never published, and are gitignored. | Both contain frank third-party assessments and full employment history. |
| D3 | No client, colleague or employer-customer is named. | "5+ enterprise clients" stays unnamed; naming them would be invention. |
| D4 | Every reconstructed diagram is labelled as one. | The KYC funnel says "reconstructed shape"; the report pipeline says "illustrative product flow — the journey I designed, not a system architecture". |

## Visual assets — what exists, what was rejected, what is needed

### The photograph in the repo — found, and not shipped
`Image (2) copy.png` is a headshot of Aniket. It is **not on the site**, for two independent
reasons, either of which alone would be enough:

1. **It carries an AI-generation sparkle badge in the lower-right corner**, and the rendering has the
   signature of an AI headshot generator. On a site whose entire argument is *nothing here is
   fabricated*, the one photograph being synthetic is the cheapest possible way to lose that
   argument. A reviewer who spots it stops trusting the numbers too.
2. **It is a blazer-and-glass-office corporate headshot**, which is precisely the register the brief
   rules out.

`[NEEDS: one real photograph — natural light, plain background, no blazer, phone camera is fine]`
Roughly 200px on `/about` only. Not the hero, not the homepage. One small human photo does real work
with founders and the site currently has none.

### Product screenshots — none exist in the repo
Searched: no image assets of the product anywhere in the source folder.

- `[NEEDS: Steps Premier League standings screen, anonymised]` — the case study argues that a
  standings table is a daily notice to whoever is last. Showing the table would make that argument
  visible instead of assertable.
- `[NEEDS: one page of a generated AI Smart Health Report, anonymised]` — the case claims people
  could finally read it. This is the weakest-backed headline claim on the site (`docs/11-evidence-audit.md` §A).
- `[NEEDS: splash/launch screen before and after]` — lower value than the two above; the to-scale
  duration chart already carries that argument well.

**What shipped instead:** clearly-labelled reconstructions built in the site's own tokens, captioned
`Reconstructed · layout and hierarchy accurate, all data synthetic`. No screenshot was fabricated and
no image model was used to produce one.

### Redactions applied to every reconstruction
Synthetic names, synthetic values, no employee names, no internal URLs, no account identifiers, no
unreleased roadmap items, no client names. The app is never named beyond "a consumer health app".

---

## What the site will not do

- Invent a denominator, team size, date, percentile, device population, experiment design, user
  quote, testimonial, screenshot or failure.
- Claim "two years" until October 2026.
- Name a degree discipline until C2 is resolved.
- Describe the Grounded set as hand-labelled until it is.
- Render an internal QA marker. `scripts/check-truth.ts` and `scripts/validate-content.ts` both fail
  the build on one.
