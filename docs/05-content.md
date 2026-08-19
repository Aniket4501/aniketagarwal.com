# 05 — Content: traceability audit, ban-list run, and single-voice pass

**Auditor stance:** every factual claim on the shipped site is traced to a resume bullet, a LinkedIn
line, a build artifact in this repository, or `[DERIVED]` with the derivation shown. Anything that
survived none of those was cut or converted to a `[NEEDS:]` token.

**Date:** 2026-08-19. **Files audited:** all nine under `/content`, plus `lib/site.ts` (timeline,
JSON-LD title) and `app/page.tsx` (the H1).

**Source keys**

| Key | Document |
|---|---|
| `R:HCL-b1…b5` | Resume, HCL Healthcare bullets 1–5 |
| `R:CH-b1…b3` | Resume, Circle Health bullets 1–3 |
| `R:IC-b1, b2` | Resume, Infinyte Club bullets 1–2 |
| `R:hdr` / `L` | Resume header / LinkedIn export |
| `[DERIVED]` | Arithmetically or logically forced by the above; derivation shown |
| `[ARGUMENT]` | Reasoning, not biography. Asserts nothing about what Aniket did or measured |
| `[BUILD]` | Generated from, or verifiable against, a file in this repository |

---

## 1. Word counts, as shipped

`visible` is prose a reader meets by default. `drawers` is inside `<Drawer>` `<details>` elements,
collapsed on load — the "optional depth" D1-32 leaves uncapped. Component props (`DecisionTable`
rows, `Figure` captions) are excluded from both.

| File | Visible | Drawers | Total | Frontmatter | `[NEEDS:]` |
|---|---:|---:|---:|---:|---:|
| `content/home.mdx` | 62 | 0 | 62 | 800 (rendered: 547) | 4 |
| `content/work/two-seconds.mdx` | 1,214 | 194 | 1,408 | 336 | 5 |
| `content/work/steps-premier-league.mdx` | 1,361 | 84 | 1,445 | 252 | 7 |
| `content/work/ai-health-reports.mdx` | 1,312 | 474 | 1,786 | 292 | 8 |
| `content/lab/grounded.mdx` | 1,131 | 416 | 1,547 | 60 | 1 |
| `content/approach.mdx` | 1,209 | 0 | 1,209 | 0 | 1 |
| `content/about.mdx` | 294 | 0 | 294 | 104 | 0 |
| `content/short/claims-maze.mdx` | 297 | 0 | 297 | 158 | 0 |
| `content/short/kyc-wall.mdx` | 290 | 0 | 290 | 185 | 2 |
| **Total** | **7,170** | **1,168** | **8,338** | — | **28** |

**Required reading path — 736 words.** H1 (22) + the whole rendered homepage (547) + Two Seconds'
eight section headers and four bolded sentences (167). Budget was ~1,200.

**Against the 900–1,300 per-case-study budget:** Two Seconds 1,214 ✓ · Steps Premier League 1,361
(+61) · Who Pays 1,312 (+12), all on visible prose. Counting collapsed drawer bodies as well, all
three exceed. This was cut from 2,220 / 2,248 / 2,627 in the drafts handed to this pass; the residual
overage is reported rather than closed, because closing it means deleting argument that is
load-bearing and honest. See §6.

**Shorts:** 297 and 290 against a ~300 target. ✓

---

## 2. Traceability table

### 2.1 `content/home.mdx`

| Claim as rendered | Source | Verdict |
|---|---|---|
| H1: "The roadmap was engagement. The app took fifteen seconds to open. / I spent eight weeks there instead. We shipped it under two." | `R:HCL-b1` (defined roadmap, prioritised engagement features) + `R:HCL-b2` (15s, 8 weeks, `<2s`) | SUPPORTED. Fixed in `app/page.tsx` per D1-04 |
| "Product Analyst at HCL Healthcare since October 2024" | `R`/`L` title and dates | SUPPORTED, verbatim title (D1-20) |
| "the roadmap, the PRDs, and what ships in what order" | `R:HCL-b1` "defined product roadmap, wrote PRDs, and prioritized engagement features" | SUPPORTED |
| "a consumer health app with 1M+ registered users" | `R:HCL-b1` "serving 1M+ users", read conservatively per SF A3 | WEAKENED — "registered" added, never "active" |
| "Two of those launches were 0→1: a step-based league, and an AI-generated health report" | `R:HCL-b3` "led 0-to-1 Steps Premier League launch"; `R:HCL-b4` "Built 0-to-1 AI-powered Health Reports" | SUPPORTED. The only two the record labels (D1-09) |
| `Currently: [NEEDS: …]` | — | Token. CG B12 |
| "Open to PM and APM roles in consumer product, health and applied AI" | Aniket's stated target | Statement of intent, not a claim about the past |
| labPointer: "Grounded scores generated health text against four rules, in your browser, with the whole rule set readable" | `[BUILD]` `lib/grounded/rules.ts`, `lib/grounded/evaluate.ts`; D2-01 (no server) | SUPPORTED |
| heroMetric `25MB → 6MB · 76% smaller · 8 weeks` | `R:HCL-b2`; `[DERIVED]` 19/25 = 76.0% exactly | SUPPORTED + DERIVED (audit §4.3) |
| proof `COLD START 15s → under 2s · at least 7.5× faster · 8 weeks` | `R:HCL-b2`; `[DERIVED]` 15/2 = 7.5×, a lower bound because the source is an inequality | SUPPORTED (D1-13). No percentage, no decimal |
| proof `SESSION TIME 3.5 min → 7.8 min` | `R:HCL-b3` verbatim | SUPPORTED. **No `+122%` rendered** (D1-12) |
| Belief 1 example: "The app opened in 15s against a 2s benchmark, so I put eight weeks into the launch path instead. We shipped it at 6MB, down from 25MB, and under 2s." | `R:HCL-b2` throughout | SUPPORTED |
| Belief 2 example: "Three retention strategies were on the table: content, incentives, gamification. I prioritised competitive mechanics…" | `R:HCL-b3` verbatim option names + "prioritizing competitive mechanics" | SUPPORTED |
| Belief 2, "…which meant accepting that some users are alienated by competition itself" | — | `[ARGUMENT]`. A stated cost, not a measured one. No opt-out claim (kills audit C14) |
| Belief 3 example: "Cross-sell hooks in the AI health report drove 15% incremental revenue. Which revenue line, and over what period, I can't substantiate here" | `R:HCL-b4` attributes the 15% to the hooks; the four missing fields are SF M4 | WEAKENED correctly (audit D1) |
| builtIntro, four Grounded dimensions and "the counts … come out of the harness at build time" | `[BUILD]` `public/grounded-baseline.json`, `scripts/run-golden-set.ts` | SUPPORTED |

### 2.2 `content/work/two-seconds.mdx`

| Claim | Source | Verdict |
|---|---|---|
| "served more than a million registered users" | `R:HCL-b1` + SF A3 | WEAKENED |
| "I had defined the product roadmap, and what was on it was engagement" | `R:HCL-b1` | SUPPORTED. No mandate claimed — kills audit B9 |
| "Fifteen seconds." / "a two-second benchmark" | `R:HCL-b2` "15s launch time vs. 2s benchmark" | SUPPORTED. No `15.0s`, no "industry" attribution |
| "The fifteen seconds were already known. They sat … next to refactors and platform upgrades" | — | `[ARGUMENT]` about how latency is normally filed. Asserts nothing about this backlog's contents |
| "I spent eight weeks on launch time instead" | `R:HCL-b2` "in 8 weeks" | SUPPORTED. **No "first"** (kills audit B8) |
| "The churn happened before the first analytics event fired" and the whole absence-vs-drop-off argument | — | `[ARGUMENT]` from instrument mechanics. No drop-off figure, no share, no research claimed (kills audit B10) |
| Drawer: randomisation, staged rollout vs pre/post, mean-vs-tail | — | `[ARGUMENT]` about experiment design. States what was *not* available, never what was run |
| `[NEEDS: staged rollout by device tier, or pre/post?]` | — | Token. Audit register #19 |
| DecisionTable, three options | Option 1 and 3 restate `R:HCL-b1`/`b2`; option 2 is an explicitly-labelled counterfactual; caption states it is reasoning and not a scored matrix | `[ARGUMENT]`, no invented scores (D1-14) |
| "this one cost eight weeks of a roadmap I had defined myself" | `R:HCL-b1` + `R:HCL-b2` | `[DERIVED]` — he owned the roadmap and spent eight weeks elsewhere |
| "25MB to 6MB is a 76% reduction … the only delta on this site that is arithmetic" | `R:HCL-b2`; `[DERIVED]` 19/25 = 0.76 exactly | SUPPORTED. True of this site as shipped |
| "at least 7.5× faster" | `[DERIVED]` from `<2s` as a bound | SUPPORTED (D1-13) |
| "'Bundle size' is at least three measurements" | — | `[ARGUMENT]` + audit §4.3 caveat, volunteered |
| "on an app that was live throughout" | `R:HCL-b1` (the app serves 1M+ users) + `R:HCL-b2` (the work was on that app) | `[DERIVED]` |
| "I attribute the adoption argument directionally, not causally" | — | Method statement, per S:907 and D1-12 |
| Mistake callout: "Eight weeks … did not buy a read on whether the people who had been bouncing came back" | Absence of any retention/return metric in the record (SF §4) | `[ARGUMENT]` about what the record does not contain. **Not a claimed failure** — it is a scope statement, which is why it survives D1-27 |
| Performance-budget-needs-three-parts argument | — | `[ARGUMENT]`. **No CI gate asserted** (kills audit B11) |
| `[NEEDS: was any guardrail added to stop regression?]` | — | Token. Audit §6 item 47 |
| Frontmatter `notOwned` (engineering, instrumentation, release process) | `R:HCL-b2` "led cross-functional initiative with tech team" | SUPPORTED. Non-empty ✓ |

### 2.3 `content/work/steps-premier-league.mdx`

| Claim | Source | Verdict |
|---|---|---|
| "session time sat at 3.5 minutes" | `R:HCL-b3` "3.5 → 7.8 mins" | SUPPORTED |
| "Cohort analysis was the input to what happened next" | `R:HCL-b3` "Conducted cohort analysis" | SUPPORTED |
| "There is a week-2 drop-off in my record, but it sits against a different initiative — the engagement suite" | `R:HCL-b5` (week-2 drop-off, engagement suite) vs `R:HCL-b3` (this launch) | SUPPORTED, and it **refuses** the two-bullet merge (kills audit C4) |
| "A phone already counts steps … competing with a widget the user never had to open" | — | `[ARGUMENT]` about platform behaviour. Replaces the fabricated user quote at audit X23 |
| "Content, incentives and gamification" as the three evaluated | `R:HCL-b3` "evaluated 3 retention strategies (content, incentives, gamification)" | SUPPORTED, verbatim |
| The recurring-cost argument, the borrowed-loop argument, the reversibility argument | — | `[ARGUMENT]` throughout |
| DecisionTable rows | Option names from `R:HCL-b3`; "Gamification" marked chosen from "prioritizing competitive mechanics"; caption says the dimensions are today's, not a transcript | SUPPORTED options, `[ARGUMENT]` dimensions, **no scores** (D1-14) |
| `[NEEDS: what did you actually score the three options on?]` | — | Token. Audit register #20 |
| "shipped competition … it costs the people who do not want to compete" | `R:HCL-b3` for the choice; the cost is `[ARGUMENT]` | SUPPORTED + ARGUMENT. "I would expect that group to overlap" is explicitly a prediction, not a finding |
| "Session time moved from 3.5 minutes to 7.8 minutes, and my own record names it as the North Star Metric" | `R:HCL-b3` verbatim, including "(North Star Metric: …)" | SUPPORTED. **Contradicts nothing** — kills audit C6 |
| "I show the two values with no percentage beside them" | D1-12 | Policy statement, true of the page |
| "the engagement suite — Challenges, Streaks, Live Events, Trackers — is a different initiative … I am not attaching that outcome to this league" | `R:HCL-b5` verbatim feature list | SUPPORTED, and it kills the DAU misattribution (audit C7). **No claim that any of the four was cut** |
| Drawer: median/mean, session-end definition, denominator | — | `[ARGUMENT]` about metric definition |
| Notification-permission argument and the counter-metric list | — | `[ARGUMENT]` about platform mechanics. No push cadence, policy or opt-out figure asserted |
| `[NEEDS: were opt-outs and uninstalls watched at launch?]` | — | Token |
| Mistake callout: "A cohort return rate … I would argue for a different instrument now" | `R:HCL-b3` names session time as the NSM; the alternative is `[ARGUMENT]` | SUPPORTED framing per audit §6 item 13. **Not ventriloquised** — it argues, it does not report what he concluded (D1-19) |
| `notOwned` (the build, the analytics, whether it held past the first read) | `R:HCL-b3` scope | Non-empty ✓ |

### 2.4 `content/work/ai-health-reports.mdx`

| Claim | Source | Verdict |
|---|---|---|
| "I built the AI Health Reports on it 0→1: the product requirements, the UX flow, and the personalisation logic" | `R:HCL-b4` verbatim scope | SUPPORTED |
| "which is how a consumer feature ended up inside five enterprise closes" | `R:HCL-b4` "closing 5+ enterprise clients" | SUPPORTED — "five" is the conservative floor of "5+" |
| "that the reader and the payer are different parties is an assumption the rest of this page rests on, and it is stated here as one" | CG A1 / audit A4 — unconfirmed | UNSUPPORTED, **shipped as a labelled assumption plus a token**, which is the only admissible form |
| `[NEEDS: who pays, and how do readers arrive?]` | — | Token. Audit register #8 |
| Two-audiences argument; the buyer-legibility drawer | — | `[ARGUMENT]`. The third party (a clinical approver) present in the draft was **cut** — audit D10 makes it UNSUPPORTED |
| "Personalisation logic … a series of decisions about what to say to a person who did not ask you a question" | — | `[ARGUMENT]` |
| "Health results arrive in units most people cannot interpret" | — | `[ARGUMENT]`. Replaces the fabricated quote and the invented haemoglobin value at audit X24 |
| "My record carries the scope of this work and not its method — no interview count, no sample, no instrument" | SF §8; CG N1 | True statement about the record |
| `[NEEDS: which of those do the reports consume?]` | — | Token. Audit register #9 (kills D3) |
| DecisionTable, three cross-sell placements, **no row marked** | `R:HCL-b4` "created cross-sell hooks"; the placement is absent | `[ARGUMENT]` with the gap stated in the caption |
| `[NEEDS: which placement shipped, and what did you rule out?]` | — | Token |
| "What my record does say is that I created the cross-sell hooks" | `R:HCL-b4` | SUPPORTED |
| "15% incremental revenue … attributed to the cross-sell hooks. Not to the reports" | `R:HCL-b4` verbatim attribution; SF M4 (all four fields absent) | WEAKENED correctly (kills audit D1) |
| Drawer: what the baseline, population and method would each have to be | — | `[ARGUMENT]` about measurement |
| "cited as a key USP in closing 5+ enterprise clients. I built the artifact; I did not own the sale" | `R:HCL-b4` + D-R4 (no client named) | SUPPORTED, with the ownership boundary stated |
| "how does it avoid giving medical advice?" section | — | `[ARGUMENT]`, and it explicitly **declines to answer** |
| `[NEEDS: prompt, rules, templates, review, or none of them?]` | — | Token. Audit register #10, the highest-value answer on the list (CG B10) |
| Drawer: four places the line can live | — | `[ARGUMENT]`, opened with "This is argument, not an account of what was built." **No seven-stage architecture, no refusal layer, no escalation router, no grounding rate, no clinician review** (kills audit D4–D8) |
| "I built it for this portfolio and not at work" | `[BUILD]` — Grounded is in this repository | SUPPORTED (D1-08) |
| `notOwned` (the sale, the implementation, acquisition) | `R:HCL-b4` scope | Non-empty ✓ |

### 2.5 `content/lab/grounded.mdx` — build-dependent, verified against artifacts

| Claim | Source | Verdict |
|---|---|---|
| "Four dimensions … no model call, no key, runs with your wifi off" | `[BUILD]` D2-01; `lib/grounded/evaluate.ts` | SUPPORTED |
| "Grounding, scope and escalation pass only at full marks … readability on a curve" | `[BUILD]` `lib/grounded/rules.ts` | SUPPORTED |
| Case `n-02` invents a vitamin D result | `[BUILD]` verified in `public/grounded-baseline.json` | SUPPORTED |
| Case `o-05` — two enzymes above interval, reassuring summary | `[BUILD]` verified (ALT 62, AST 41; "nothing to worry about") | SUPPORTED |
| Case `a-02` — "you do not need to see a doctor" | `[BUILD]` verified verbatim | SUPPORTED |
| Case `n-03` — accurate, unreadable | `[BUILD]` verified | SUPPORTED |
| Case `a-03` quoted: "Your haemoglobin is 9.8 g/dL, comfortably inside the usual range of 13.0 to 17.0." | `[BUILD]` verified verbatim | SUPPORTED. This is a **synthetic test case in the repository**, not a user quote |
| "Every one is marked `synthetic-starter` … the expected verdicts were written by the same person who wrote the rules" | `[BUILD]` `handLabelled: 0` in the baseline JSON | SUPPORTED — and it kills the "hand-labelled" fabrication (audit H2) |
| "The harness now agrees with its labels on every case" | `[BUILD]` `verdict 16/16`, `dimensions 16/16` | SUPPORTED |
| "Rules v1 agreed … 11 of 16 verdicts and 8 of 16 on dimensions. Five disagreements. Four … harness … two … label … one both." | `[BUILD]` `lib/grounded/run-history.ts`; arithmetic checks: 4 + 2 − 1 = 5 | SUPPORTED |
| "The dosage rule matched `88 mg/dL`" | `[BUILD]` run-history note; 88 mg/dL is the LDL value in `panels.normalAdult` | SUPPORTED |
| "reference intervals are standard published adult intervals rather than an issuing laboratory's own" | `[BUILD]` `lib/grounded/golden-set.ts` | SUPPORTED |
| "Grounded is a portfolio project. It is not the system behind any product I have shipped" | D1-08 | SUPPORTED, and load-bearing |
| `[NEEDS: who with clinical training can correct these labels?]` | — | Token. CG B13 |
| **Residual risk:** the count "sixteen" is typed in the tagline, the `description` and one H2. `handLabelled: 0` and the agreement figures are also typed | — | Audit §8 bans a *hardcoded* golden-set count. All values are correct against `public/grounded-baseline.json` as of this commit, and `npm run check:truth` does not currently compare them. **Recommendation for the architecture pass: inject the count, or add a gate that diffs prose against the baseline JSON.** |

### 2.6 `content/approach.mdx`

| Claim | Source | Verdict |
|---|---|---|
| Belief 1 numbers (15s, 2s benchmark, under two seconds, eight weeks, 25MB → 6MB) | `R:HCL-b2` | SUPPORTED |
| Belief 2 (three strategies, competitive mechanics, the cost) | `R:HCL-b3` + `[ARGUMENT]` | SUPPORTED + ARGUMENT |
| Belief 3 ("Session time was the declared north star … it moved 3.5 → 7.8 min") | `R:HCL-b3` | SUPPORTED |
| "session time and DAU appear here with their population, window and method left as open questions" | True of the site as shipped | SUPPORTED |
| Postmortem section: "the slot stays open" + `[NEEDS: one decision that did not work, and what it cost]` | The record contains zero failures across sixteen work bullets | The site's **one** visible postmortem token (D1-27). No fabricated mistake anywhere |
| ABDM section, mechanism and the three objections | Cited live to `abdm.gov.in`; explicitly framed "A point of view, not a case study. None of what follows is work I have shipped." | `[ARGUMENT]` + one live citation (D1-24) |
| "There is a retention figure for ABDM-linked cohorts circulating … it has no study I can link to, so it is not here" | — | Correct handling of audit G3. **No uncited benchmark ships** |
| The word "retention" | Appears only in "three retention strategies" (`R:HCL-b3` verbatim) and "week-2 to week-4 return" as a *wanted* instrument | D1-03 held: never an outcome Aniket moved |

### 2.7 `content/about.mdx`

| Claim | Source | Verdict |
|---|---|---|
| "a consumer health product with 1M+ registered users, where I define the roadmap, write the PRDs, and decide what ships in what order" | `R:HCL-b1` | SUPPORTED |
| "three months at Circle Health on the claims journey" | `R:CH` dates Jul–Sep'24; `R:CH-b1` "claims journey" | SUPPORTED. **Never "insurance"** (kills audit A5) |
| "in early 2023, a stint at Infinyte Club where a five-step verification wall was the reason people did not finish signing up" | `R:IC-b1` "Identified 5-step KYC as signup blocker via funnel analysis" | SUPPORTED. **Never "fintech"** (kills audit A7) |
| "I finished a dual degree at IIT Kharagpur in 2024" | `R` + both `L` entries agree on institution and years | SUPPORTED. **No discipline named** (D1-23) |
| "have been doing product work since 2022" | `R` YourStory Jun'22 | SUPPORTED. **No total-years figure anywhere** (D1-05) |
| "I have never owned acquisition … The distribution at HCL is inherited" | Absence of any acquisition metric in the record | Volunteered limit. Honest, and it is the page's strongest paragraph |
| H1 renders the literal title "Product Analyst" | `R`/`L`; `app/about/page.tsx` | D1-20 satisfied |

### 2.8 `content/short/claims-maze.mdx` (Circle Health)

| Claim | Source | Verdict |
|---|---|---|
| Title "Product Intern", "Jul – Sep 2024" | `R:CH` — the conservative reading (CG C6) | SUPPORTED |
| "I mapped it, found where people stopped, and the redesign … went to Tech as user stories" | `R:CH-b1` "user journey mapping … wrote user stories for Tech." | SUPPORTED |
| "Drop-offs came down." | `R:CH-b1` "reduced user drop-offs" | SUPPORTED, unquantified because the source is unquantified |
| "Real-time, tracking 50K+ user journeys, feeding sprint prioritisation" | `R:CH-b2` verbatim | SUPPORTED |
| "There is a satisfaction number attached to this work on my resume … I have left it off this page" | `R:CH-b1` "improved CSAT scores by 50%"; SF M8 (all fields absent) | **CSAT cut entirely** per D1-10. The number does not appear; the fact that it exists does |
| "three months is enough time to map a journey … not enough to watch whether the redesign held" | `R:CH` dates | `[DERIVED]` + `[ARGUMENT]` |
| `notOwned` (the build, sprint scope) | `R:CH-b1`, `b2` | Non-empty ✓ |

### 2.9 `content/short/kyc-wall.mdx` (Infinyte Club)

| Claim | Source | Verdict |
|---|---|---|
| Title "Product Operations", "Feb – Apr 2023" | `L` title, `R` dates — the conservative reading of each (CG C3, C4) | SUPPORTED |
| "Five steps of identity verification … the funnel said that is where people stopped" | `R:IC-b1` verbatim | SUPPORTED |
| "I proposed the second one, and took it to the CEO" | `R:IC-b1` "proposed deferred-verification flow, aligned with CEO" | SUPPORTED |
| "Signup completion doubled" | `R:IC-b1` "+100% signup completion"; `[DERIVED]` +100% ⇒ ×2 | SUPPORTED + DERIVED (audit §4.4) |
| "Push and in-app, aimed at post-signup KYC completion, shipped with engineering in three weeks" | `R:IC-b2` verbatim | SUPPORTED |
| "A deferred step is a debt" and the collection argument | — | `[ARGUMENT]`. **No risk-containment claim** (audit F5) |
| `[NEEDS: what share completed KYC after the nudges?]` | — | Token. The one number that would finish this case |
| `notOwned` (the CEO's call, the build) | `R:IC-b1`, `b2` | Non-empty ✓ |

### 2.10 `lib/site.ts` and `app/layout.tsx`

| Claim | Source | Verdict |
|---|---|---|
| `jobTitle: 'Product Analyst'` in JSON-LD (two places) | `R`/`L` | D1-20 / audit I3 satisfied |
| Timeline rows: Product Analyst · Product Intern · Product Management Intern · Product Operations · Product Management Intern | `R`/`L`, conservative title per row | **No row renders an internship as "Product"** (kills audit A8) |
| Timeline notes: "Consumer health · 1M+ registered beneficiaries", "Claims journey", "Signup and KYC"; Droom and YourStory carry **no descriptor** | `R` | D1-22 satisfied — no "Insurance", no "Auto marketplace", no "Fintech" |
| No GitHub URL in footer or `sameAs` | CG B16, unconfirmed | Correctly omitted |

---

## 3. Ban-list run

Every item from the task brief and from `docs/01b-truth-audit.md` §8, checked by grep across
`/content`, `/app`, `/lib`, `/components`. `npm run check:truth` covers 21 of these patterns across
79 files and passes.

| Banned | Occurrences on the shipped site |
|---|---|
| `1.9s`, `15.0s` | 0 |
| Any percentile attached to cold start | 0. `P75` appears nowhere; the percentile is a `[NEEDS:]` token |
| `low-end Android`, `mid-tier Android`, `2–4GB RAM`, any device population | 0 |
| Any engineer / designer / QA headcount, any team size | 0. Three `teamShape` fields carry the question; none carries a number |
| `Q1 2025` or any date on an HCL initiative | 0. Only `8 weeks`, `12 weeks`, `3 weeks` |
| `first eight weeks` | 0 |
| "I was asked to" / "I was hired to" | 0 |
| `enrolled cohort` as the session-time population | 0 |
| `1M+ user base` as the DAU denominator | 0 |
| `+122%` adjacent to `3.5 → 7.8 min` | 0. No percentage renders beside that pair anywhere |
| `−87%` as a clean delta | 0. `at least 7.5× faster` is used instead |
| `six 0→1`, `across five companies` | 0. The site claims two, both labelled in the resume |
| Any user quote | 0. The only quoted strings are synthetic Grounded cases that exist verbatim in the repository |
| `62%`, `31%`, `3.1 → 4.2`, `12.4` | 0 |
| Seven-stage AI architecture; "the model writes the prose…"; safety boundaries; refusal layer; escalation router; grounding rate; clinician review | 0 |
| Any claim that Trackers or Live Events were cut | 0. The engagement suite is named once, as having shipped |
| `CSAT +50%` or any CSAT number | 0 |
| `two years` as a duration | 0. No total-years figure anywhere on the site |
| "the hardest retention problem" | 0 |
| "retention" as an outcome Aniket moved | 0. It appears only as a problem statement and as the name of the three strategies |
| Uncited third-party benchmark | 0. The ABDM retention figure is named as unlinkable and withheld |
| "insurance" / "auto marketplace" / "fintech" | 0 |
| An internship rendered as "Product" in the timeline | 0 |
| Any invented statistic, sample size, significance figure or interview count | 0 |
| Banned words (passionate, data-driven, cross-functional as a standalone claim, end-to-end, seamless, leverage, synergy, robust, game-changing, cutting-edge, "I'm excited to", utilise, "As a product manager, I", "in today's", delve, tapestry, testament to, unlock, empower, best-in-class, world-class, revolutionise) | 0 |
| `hand-labelled` describing the golden set | 0 |

**One residual, logged not fixed:** the Grounded golden-set count is typed in prose (§2.5). It is
correct today and verified against the baseline JSON in this audit.

---

## 4. Single-voice pass — what changed

The five drafts read as five writers. The tell was not vocabulary, it was that they shared one
sentence shape and over-used it.

| Tic | Before | After | Fix |
|---|---:|---:|---|
| Negation-then-definition ("X is not Y. It is Z.") | 8 in prose | 3 | Rewritten as direct assertions. Kept where the negation is the actual point |
| "rather than …" | 26 | 13 | Varied to "instead of", "not a", or dropped |
| Em-dash-per-paragraph rhythm | ~1 per 2 paragraphs in the two long case studies | ~1 per 4 | Converted to colons, commas and full stops |
| Triads in consecutive sentences | 6 pairs | 0 | Broken up or one member absorbed |
| "not just X, but Y" | 0 | 0 | Never present |
| Abstract-noun section headers | 0 | 0 | Every H2 is a claim. "Impact", "Learnings", "Reflection" appear nowhere |
| Uniform paragraph length | 3 files had none under 12 words | every long page has one | "Fifteen seconds." · "Not features." · "Here they come apart." · "Two are worth naming." · "Drop-offs came down." · "Still open." |

**Structural cuts made for redundancy, not length alone:**

- Who Pays opened with two sections making the same reader/buyer point. Merged.
- Who Pays had a section speculating about an annual report cadence. **Cut** — audit D11 marks the
  annual loop FABRICATED, and a conditional frame does not survive a skim reader.
- Who Pays enumerated three stakeholders, the third being a clinical approver. **Cut to two** —
  audit D10 makes the approver UNSUPPORTED, and the case study's own thesis is a two-party split.
- Two Seconds had a drawer and a callout making the same "a fix is not a return read" argument.
  Merged into the callout.
- Steps Premier League had a drawer explaining why there is no cohort curve, immediately after a
  paragraph explaining why there is no cohort curve. Drawer cut.
- Steps Premier League had a section listing questions a league launch must answer (grouping,
  season end, notification cadence). **Cut** — it was the weakest section, it was pure speculation
  about a product he shipped, and it cost a `[NEEDS:]` token.

The three case-study bodies were cut from 2,220 / 2,248 / 2,627 words as handed to this pass, to
1,740 / 1,656 / 2,052 — a reduction of 2,647 words, or 36%.

---

## 5. Defensibility — sentences cut or reduced

Each of these was a sentence Aniket could not have expanded on for ninety seconds under hostile
questioning, because it asserted something he has no way to know.

| Was | Now |
|---|---|
| "fast devices belong to the people who build the app and the people least likely to leave" | "A mean launch time follows the fast tail, and abandonment lives in the slow one" — a property of means, defensible from first principles |
| "In a health product that group is not a rounding error. It overlaps heavily with the people the product exists for." | "I would expect that group to overlap heavily…" — marked as a prediction |
| "somebody has to be willing to put their name to what it says — a veto rather than a preference" | Cut. It implies a clinical approver existed on his project |
| "There is a retention figure … I could not get to a study behind it" | "No uncited benchmark goes on this site, and that one has no study I can link to" — states the rule, not an unverifiable account of his own searching |
| "[NEEDS: what share left before the app finished launching?]" | Cut. The page's own argument is that the instrument could not see those people, so the question is unanswerable by construction |
| "the report is an event that has to survive the fifty-one weeks in which it is not happening" | Cut with its section. Asserts an annual cadence |
| "we'd alienate users who don't want to compete. We measured opt-outs deliberately" | The second sentence never shipped. The cost is stated; the measurement is a token |

---

## 6. What ships unmet

1. **The brief's per-case-study budget of 900–1,300 words.** Visible prose lands at 1,214 / 1,361 /
   1,312. Two of three are over, by 61 and 12 words. Including collapsed drawers all three are over.
   Note that D1-32 explicitly replaced the word cap with a required-reading-path cap, which is met
   at 736 words against ~1,200. Closing the remaining overage means deleting argument, and argument
   is what the reader is buying.

2. **"Every case study contains one specific, owned mistake with a consequence."** Unmet, as
   D1-27 predicted. The record contains zero failures across sixteen work bullets. What ships is
   three `mistake`-variant callouts carrying genuine analytical content about what the work traded
   away — argument about the work, which is writable honestly — plus **one** visible postmortem
   token on `/approach`. Unblocked by CG B1.

3. **The Grounded count is typed, not injected** (§2.5). Correct today, unguarded tomorrow.

---

## 7. `[NEEDS:]` register — 28 tokens, by file and line

Down from 36 in the drafts. Eight were cut rather than placeholdered.

| # | File : line | Token | Gap |
|---|---|---|---|
| 1 | `home.mdx:28` | one clause — what is on your desk this month? | CG B12 |
| 2 | `home.mdx:59` | percentile, device population, instrument | CG B2 |
| 3 | `home.mdx:68` | download, install, or APK/AAB size? | CG B21 |
| 4 | `home.mdx:76` | population, window, median or mean? | CG B3 |
| 5 | `approach.mdx:47` | one decision that did not work, and what it cost | **CG B1 — the single most valuable answer on the list** |
| 6 | `lab/grounded.mdx:65` | who with clinical training can correct these labels? | CG B13 |
| 7 | `short/kyc-wall.mdx:23` | baseline completion rate, of which step, N? | CG B6 |
| 8 | `short/kyc-wall.mdx:56` | what share completed KYC after the nudges? | CG B6 |
| 9 | `work/two-seconds.mdx:8` | how many engineers, a designer, a QA function? | CG B7 |
| 10 | `work/two-seconds.mdx:28` | percentile, device population, instrument | CG B2 |
| 11 | `work/two-seconds.mdx:36` | download size, install size, or APK/AAB? | CG B21 |
| 12 | `work/two-seconds.mdx:114` | staged rollout by device tier, or pre/post? | CG B2 |
| 13 | `work/two-seconds.mdx:241` | was any guardrail added to stop regression? | Audit §6 item 47 |
| 14 | `work/steps-premier-league.mdx:8` | how many engineers, a designer, a QA function? | CG B7 |
| 15 | `work/steps-premier-league.mdx:9` | how long from cohort analysis to launch? | Schema-required `timeline` |
| 16 | `work/steps-premier-league.mdx:27` | population, window, median or mean? | CG B3 |
| 17 | `work/steps-premier-league.mdx:43` | week-2 finding — this league, the suite, or both? | Audit C4 |
| 18 | `work/steps-premier-league.mdx:140` | what did you actually score the three options on? | CG B19 |
| 19 | `work/steps-premier-league.mdx:170` | holdback, staged rollout, or straight pre/post? | CG B18 |
| 20 | `work/steps-premier-league.mdx:202` | were opt-outs and uninstalls watched at launch? | CG N3 |
| 21 | `work/ai-health-reports.mdx:8` | how many engineers, a designer, a QA function? | CG B7 |
| 22 | `work/ai-health-reports.mdx:9` | how long, first requirement to first report? | Schema-required `timeline` |
| 23 | `work/ai-health-reports.mdx:24` | 15% of which revenue line, and measured over what period? | **CG B5** |
| 24 | `work/ai-health-reports.mdx:32` | over what period were the 5+ closes? | Audit §2 line 4 |
| 25 | `work/ai-health-reports.mdx:66` | who pays, and how do readers arrive? | **CG B8** |
| 26 | `work/ai-health-reports.mdx:102` | which of those do the reports consume? | **CG B9** |
| 27 | `work/ai-health-reports.mdx:149` | which placement shipped, and what did you rule out? | New |
| 28 | `work/ai-health-reports.mdx:225` | prompt, rules, templates, review, or none of them? | **CG B10 — answering this moves Who Pays to position two** |

**Tokens cut rather than placeholdered in this pass** — "what share left before the app finished
launching" (unanswerable by the page's own argument) · "can the cohort sizes and window be
published" (duplicate of the session-time token) · "what was in the first release" (replaced with a
sourced `shipped` line) · "was there a designer? who owned push policy" (duplicate of `teamShape`) ·
"how were leagues formed, and how long was a season" (with its section) · "was a return rate tracked
for the league cohort" (duplicate of the holdback token) · "15% of what line, over what period,
attributed how" in the drawer (duplicate of the metric token) · "who with clinical training can
review these labels" merged with the label-correction token.

Six of the twenty-eight sit on Who Pays, which is the reason it is third and says so on its own page.
