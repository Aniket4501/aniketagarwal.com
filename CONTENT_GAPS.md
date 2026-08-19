# Content gaps — what Aniket needs to supply

**None of this appears on the public site.** V1 rendered these as visible red markers in
production, which read as a form with validation errors rather than as rigour. V2 removed all of
them: the schema now rejects an internal marker in any field, and both build gates fail on one.

The site ships only what is verified. This file is the private record of what is still thin, so the
copy can be sharpened rather than padded.

Live: https://aniketagarwal-com.vercel.app · Repo: https://github.com/Aniket4501/aniketagarwal.com
Last updated: V2, 2026-08-19.

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

## What the site will not do

- Invent a denominator, team size, date, percentile, device population, experiment design, user
  quote, testimonial, screenshot or failure.
- Claim "two years" until October 2026.
- Name a degree discipline until C2 is resolved.
- Describe the Grounded set as hand-labelled until it is.
- Render an internal QA marker. `scripts/check-truth.ts` and `scripts/validate-content.ts` both fail
  the build on one.
