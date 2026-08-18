# 01b — Truth audit (adversarial)

**Auditor stance:** hostile reviewer whose only job is to find the places where the strategy
document would cause a builder to publish something false.
**Audit date:** 2026-08-19.
**Sources of truth, in precedence order:**

1. `Aniket_s_PM_Resume.pdf` — cited **R** (bullet refs: `R:HCL-b2` = HCL bullet 2)
2. `Profile.pdf` (LinkedIn export) — cited **L**
3. `docs/00-source-facts.md` — cited **SF**
4. `CONTENT_GAPS.md` — cited **CG**

`portfolio-strategy-aniket-agarwal.md` — cited **S** with line numbers — **is not a source.**
It is the document under audit. Nothing in S is evidence for anything in S.

---

## 0. How to use this file

Every later phase is checked against this file. Three rules:

1. **A claim with verdict `FABRICATED` or `CONTRADICTS SOURCE` may not be written to any file
   that ends up in `/app`, `/content`, `/public`, or a meta tag.** No exceptions, no "we'll
   confirm later," no lorem-ipsum-with-a-number.
2. **A claim with verdict `UNSUPPORTED` ships only as a visible `[NEEDS: …]` token**, or is cut.
   The token must be visible on the rendered page, not a code comment.
3. **Example copy in S is contaminated.** Sections 3 and 6 of this file list every sentence in S
   that a builder would plausibly copy verbatim and that contains an invented fact. Treat S's
   sample sentences as *shape* only. Never as *content*.

### Verdict legend

| Verdict | Meaning | Permitted on the site? |
|---|---|---|
| **SUPPORTED** | Present verbatim, or a trivially faithful paraphrase, in R or L | Yes |
| **DERIVED** | Arithmetically or logically forced by R/L; nothing added | Yes, marked `[DERIVED]` in content files |
| **WEAKENED** | Source supports only a weaker form; S overstates | Yes, in the weaker form only |
| **UNSUPPORTED** | Not in any source. Plausible, but unverified | Only as `[NEEDS: …]`, or cut |
| **FABRICATED** | Asserts a specific fact (number, count, date, headcount, quote, architecture) that appears in no source | **No.** Build failure. |
| **CONTRADICTS SOURCE** | Actively conflicts with R or L | **No.** Build failure. |
| **BUILD-DEPENDENT** | True only if a future artifact ships exactly as described | Only generated from the shipped artifact, never hardcoded |
| **THIRD-PARTY** | A claim about the world, not about Aniket | Only with a live citation, or cut |

---

## 1. Master claim table

Every factual assertion S makes about Aniket, his work, or his numbers.

### 1.1 Identity, tenure, scale

| # | CLAIM | WHERE S SAYS IT | SUPPORTED BY SOURCE? | VERDICT |
|---|---|---|---|---|
| A1 | "I've spent **two years** solving it for a million people" | S:337, S:1042, S:1364 (site headline, three places) | R/L: HCL Oct 2024 → 19 Aug 2026 = **22 completed months**. S itself says "~22 months" at S:194. | **WEAKENED.** Use "nearly two years" per CG C1. S contradicts itself: S:194 says 22 months, S:337 says two years. |
| A2 | "solving it **for a million people**" | S:337, S:1042, S:1364 | R:HCL-b1 says the app *serves* 1M+ users. It does not say Aniket's retention work reached, was measured on, or benefited 1M people. | **UNSUPPORTED.** Conflates app scale with personal scope. Rewrite: "on a product with 1M+ registered users". |
| A3 | "1M+ users" / "1M+ user health super-app" | S:194, 327, 344, 356, 362, 460, 1044, 1082, 1146, 1166, 1366, 1369 (12 places) | R:HCL-b1 verbatim: "healthcare super-app serving 1M+ users". No activity qualifier. | **WEAKENED.** Per SF A3 and S's own rewrite rule at S:1218, the site must say **"1M+ registered users/beneficiaries"** and never "1M active". S:1146 and S:1166 both drop the qualifier — fix. |
| A4 | Users "arrive through corporate benefits and the buyer is an employer"; "reached through employer health plans" | S:194, 272, 500, 567, 641, 1218 | **Nowhere in R or L.** Inferred from "healthcare super-app" + "5+ enterprise clients". Logged as assumption CG A1. | **UNSUPPORTED.** The entire B2B2C positioning rests on this. `[NEEDS: confirm the distribution channel — are users enrolled via employer health plans, insurers, hospitals, or direct consumer signup?]` |
| A5 | "Two years of healthcare context across two sides of the industry: wellness/engagement (HCL) and **insurance** claims (Circle Health)" | S:197 | R:CH-b1/b3 say "claims journey", "claims flow", "YOY claims data analysis". **R and L never say "insurance".** | **UNSUPPORTED** on "insurance". Use "claims" alone. Same issue at S:1147 ("Insurance claims" in the homepage timeline). |
| A6 | Droom = "Auto marketplace" | S:1148 (homepage timeline) | R names "QuickSell listing" and "OBV page". Neither R nor L states an industry. | **UNSUPPORTED.** Use no descriptor, or `[NEEDS: one-word industry for Droom]`. |
| A7 | Infinyte Club = "Fintech onboarding" | S:1149 (homepage timeline) | R names a 5-step KYC and a deferred-verification flow. Neither R nor L states an industry. | **UNSUPPORTED.** KYC ≠ fintech. Use "onboarding" alone or `[NEEDS: …]`. |
| A8 | Timeline renders all five roles as "**Product** · Company" | S:1146–1150 | Actual titles: HCL "Product Analyst"; Circle Health "Product Intern" (R) / "Product Management Intern" (L); Droom "Product Management Intern"; Infinyte "Product Intern" (R) / "Product Operations" (L); YourStory "Product Management Intern". | **CONTRADICTS SOURCE by omission.** Four of five were internships. Rendering them all as "Product" is title inflation in the single most recruiter-scanned block on the page, and it breaks the instant a recruiter opens LinkedIn. **Print the real title on every timeline row.** |
| A9 | "Product at HCL Healthcare" as the hero role line | S:338, 344, 1044, 1366 | R/L title is **"Product Analyst"**. | **WEAKENED.** Acceptable as a hero *compression* only if the literal title "Product Analyst" appears verbatim at least once on a page a recruiter reaches (timeline and/or /about). If it appears nowhere, the omission reads as concealment. S:269 agrees ("own it in one sentence") but no S section actually places it. |
| A10 | "IIT Kharagpur, 2019–2024" | S:1151 | R and both L entries agree on the institution and years. Discipline is in three-way conflict (CG C2). | **SUPPORTED** exactly as written, with **no discipline named**. Do not add "Applied Geology", "Learning Sciences", or "Geological/Geophysical Engineering" until CG C2 is resolved. |
| A11 | Advice: "Fix [resume header] to '2 years'" | S:19 | 22 months. | **WEAKENED.** Advising a resume header of "2 years" on 2026-08-19 is advising a two-month overstatement. Correct advice: "Oct 2024 – present" and let the reader compute. |

### 1.2 The performance initiative (Case study 1)

| # | CLAIM | WHERE S SAYS IT | SUPPORTED BY SOURCE? | VERDICT |
|---|---|---|---|---|
| B1 | Cold start **"1.9s"** | S:338, 510, 877, 882, 981, 1061, 1082, 1303, 1390, 1406 — **ten places**, including the recommended `<title>` and the OG image spec | R:HCL-b2 says **"delivered <2s launch time"** — an inequality. **The string "1.9" appears nowhere in R or L.** | **FABRICATED.** Already logged as CG C7 but the count is worse than logged: ten occurrences, not five, and two of them (S:1303 page title, S:1338 OG image) would bake it into every indexed page and every shared link preview. **Use "15s → under 2s" everywhere.** |
| B2 | "**15.0s**" (one decimal place) | S:981, 1061 | R says "15s". | **FABRICATED precision.** A tenths-place figure asserts measurement resolution the source does not have. Write "15s". |
| B3 | "cold start **P75**, low-end Android" | S:495, 497, 882, 979, 1061 — including the homepage proof strip and the case-study header | **No percentile anywhere in R or L.** CG B2 flags this as an open question ("the site claims P75 — *is that true?*"). | **FABRICATED.** A percentile is a measurement-method claim. Stating P75 when you do not know the percentile is the exact failure mode S:80 warns about, committed by S itself. `[NEEDS: which percentile, and cold-start-to-what event?]` |
| B4 | "**low-end Android**" as the measured device population | S:882, 979, 1061 | Not in R or L. CG A2 logs it as an unconfirmed assumption. | **UNSUPPORTED.** Note S contradicts itself: S:474 says "**mid-tier** Android devices (2–4GB RAM)", S:882/979/1061 say "**low-end**". Two different populations in one document. |
| B5 | Target users are on "**2–4GB RAM**" devices "on variable networks" | S:474 | Not in R or L. | **FABRICATED.** No device spec exists in any source. |
| B6 | "Team: **4 engineers, 1 designer, no dedicated QA**" | S:880 (the case-study header block template) | **Zero headcount data in R or L.** R:HCL-b1/b2 say only "cross-functional collaboration with VP-Product and stakeholders" and "led cross-functional initiative with tech team". SF §8 lists team sizes as must-never-invent. | **FABRICATED — highest-risk item in the document.** It sits in a code-fenced template that a builder copies wholesale. **S contradicts itself:** S:846 says "3 engineers, 1 designer, no dedicated QA", S:880 and S:1214 say "4 engineers", S:1478 says "four engineers". Three different headcounts prove the number is illustrative. |
| B7 | "Timeline: 8 weeks, **Q1 2025**" | S:881 | R gives a duration ("in 8 weeks") and **no date**. SF §8 explicitly bans "dates of any HCL initiative beyond '8 weeks' / '12 weeks' durations". | **FABRICATED.** And internally contradicted: S:343 and S:1104 say the work happened in "**my first eight weeks**" — Aniket started Oct 2024, so "first eight weeks" = Oct–Nov 2024, which is **not** Q1 2025. |
| B8 | The work happened in "the **first** eight weeks" | S:343, 1104, 1478 | R states a duration only. Nothing in R or L places the initiative in the tenure. | **FABRICATED sequencing.** Drop "first". Write "an eight-week initiative". |
| B9 | "the engagement roadmap **I was hired for**" / "I **was asked** to make the app more engaging" | S:343, 1081, 1104, 1478 | R:HCL-b1 says he "prioritized engagement features". It does **not** say engagement was the assigned brief he overrode. | **UNSUPPORTED.** This is the site's central hook (homepage card 1). It is a claim about a mandate, not about work. `[NEEDS: was the engagement roadmap your assigned brief when you joined? One sentence.]` If unconfirmed, reframe to what R supports: "I diagnosed launch time as the adoption blocker before building engagement features." |
| B10 | "a **meaningful share of users never got past the splash screen**" | S:460 | R says performance was a "critical adoption blocker". No drop-off figure or share exists. | **UNSUPPORTED.** Do not quantify or semi-quantify. |
| B11 | A "**performance budget adopted as a product requirement**… enforced in **CI**, with a named owner and a shipping gate" | S:471, 491, 522 ("durability thinking (the CI gate)"), 842, 1318 | Not in R or L. | **FABRICATED.** "Enforced in CI" is a specific engineering artifact. A Senior PM interviewer will ask to see the config. S:842 and S:1318 both treat it as an established fact of the case study. |
| B12 | Workstreams: instrumentation of the pre-first-event window · bundle audit · deferred/lazy loading · device- and network-tiered targets · a public "what's new" moment | S:486–492 | Not in R or L. | **FABRICATED.** R names the outcome, never the levers. |
| B13 | Technical levers: code splitting, lazy module loading, WebP/AVIF compression, font subsetting, dependency pruning, startup trace profiling, CI size budgets | S:516 | Not in R or L. | **FABRICATED.** S's own caveat ("You do not need to have written this code") does not license asserting *which* levers were used. |
| B14 | Bundle target of "**below 8MB**" in the product hypothesis | S:481 | R states an achieved value (6MB). No target exists. | **FABRICATED.** |
| B15 | Measurement design: "staged rollout by device tier, pre/post cohort comparison · holdback of the old build · **synthetic device-lab measurement**" | S:504–506, 503 | Not in R or L. CG B2 lists the measurement method as an open question. | **FABRICATED.** |
| B16 | "led an 8-week performance **rebuild**" | S:330 | R: "led cross-functional initiative with tech team". | **WEAKENED.** "Rebuild" implies rewriting the app. Use "initiative". |
| B17 | "the numbers are **physical and unfalsifiable**… a sceptical reviewer **cannot discount them**" | S:244(c), S:466 | — | **REASONING ERROR, not a fact claim — but it is load-bearing and wrong.** Cold start is entirely method-dependent (device, network, cold vs. warm, percentile, build variant). Bundle size is method-dependent too (compressed vs. uncompressed, APK vs. AAB vs. install size, universal vs. split). Accepting S's claim would license the site to publish M1/M2 *under*-qualified. **Both numbers need method statements exactly as much as DAU does.** |
| B18 | "~**2-second industry benchmark**" | S:460 | R:HCL-b2 says "15s launch time vs. 2s benchmark". | **SUPPORTED** as "a 2s benchmark". "Industry" is an added, unsourced attribution — say "the 2s benchmark we measured against" or cite the benchmark. |
| B19 | Case-study title "**Two Seconds**" and route `/work/two-seconds` | S:402, 455, 876 | R: "<2s". | **SUPPORTED / DERIVED.** Fine. But note it is inconsistent with S's own "1.9s": 1.9 is not "two seconds". Removing 1.9s resolves this. |

### 1.3 Steps Premier League (Case study 2)

| # | CLAIM | WHERE S SAYS IT | SUPPORTED BY SOURCE? | VERDICT |
|---|---|---|---|---|
| C1 | "Session time **3.5 → 7.8 min**" | S:338, 1062, 1084 | R:HCL-b3 verbatim: "+122% session time (North Star Metric: 3.5 → 7.8 mins)". | **SUPPORTED** as before→after. Denominator, timeframe and method all **[ABSENT]** — see §2. |
| C2 | Session-time denominator: "**enrolled cohort, post-launch**" | S:1062 (homepage proof strip) | **Not in R or L.** SF M3: population [ABSENT], timeframe [ABSENT], method [ABSENT]. | **FABRICATED.** It is the *only* denominator S supplies for this metric and it is invented. It is also the denominator most favourable to Aniket (league enrollees, not all DAU) — which is exactly the shape a hostile reviewer probes. Replace with `[NEEDS: population and window for the 3.5 → 7.8 min movement]`. |
| C3 | "more than **doubled** session length" | S:327 | 7.8 / 3.5 = 2.23×. | **DERIVED — true.** Safe. |
| C4 | Week-2 churn was the trigger for Steps Premier League | S:534, 537, 1084 | R:HCL-b3 says "cohort analysis; evaluated 3 retention strategies… led 0-to-1 Steps Premier League launch". "Week-2 retention drop-off" appears in a **different bullet** (R:HCL-b5, the engagement suite). | **WEAKENED / merge risk.** Two bullets have been fused. Defensible only if Aniket confirms the same week-2 finding drove both. `[NEEDS: did the week-2 drop-off finding drive Steps Premier League, the engagement suite, or both?]` |
| C5 | "there was budget and appetite for **roughly one**" | S:537 | Not in R or L. | **FABRICATED.** Invents a resourcing constraint. |
| C6 | The North Star for this case study is "**week-2 → week-4 retention of the enrolled cohort (not session time)**" | S:561 | **R:HCL-b3 explicitly names session time as the "North Star Metric".** | **CONTRADICTS SOURCE.** If the case study says the north star was retention, it contradicts the resume a reviewer is holding. Write what R says (session time was the NSM) and, if Aniket now thinks that was the wrong NSM, say *that* — which is a stronger, honest sentence: "We used session time as the north star. I'd argue for week-2→week-4 retention now, and here's why." |
| C7 | "+20% DAU" belongs to Steps Premier League | S:1063 (proof strip, undifferentiated) | R:HCL-b5 attributes +20% DAU to the **engagement suite** (Challenges, Streaks, Live Events, Trackers) over 12 weeks — **not** to Steps Premier League. | **CONTRADICTS SOURCE if attributed to SPL.** The proof strip places DAU next to session time with no attribution; homepage card 2 is SPL. Attribution smear. Label the DAU line "engagement suite". |
| C8 | Target users "aged **~25–45**, already walking, already casually tracking" | S:546 | No demographic data in R or L. | **FABRICATED.** |
| C9 | "the **already-motivated but unengaged** population, which is a **deliberate targeting choice** you should state explicitly" | S:546 | Not in R or L. | **FABRICATED.** Invents a segmentation decision. |
| C10 | Feature set: "streak protection · notification policy · end-of-season resolution and re-entry · fairness/**anti-cheat** handling · league formation and cohorting" | S:558 | R names only "Steps Premier League" and "competitive mechanics". "Streaks" exists in R but as part of the **engagement suite**, a different bullet. | **FABRICATED.** |
| C11 | "re-entry rate into **season 2**" | S:563 | Not in R or L. | **FABRICATED.** Asserts a second season shipped. |
| C12 | Technical: "step-data ingestion from **HealthKit/Google Fit**", "leaderboard computation and caching", "**push infrastructure**"; and "**the sync-integrity problem** is the most interesting technical detail in this case study" | S:583–584 | Not in R or L. | **FABRICATED.** S:584 instructs the builder not to skip a problem that no source says existed. |
| C13 | Experiments: "staged rollout with a **holdback cohort**", "**cohort size test**", "**notification frequency and timing test**" | S:570–572 | Not in R or L. CG N3 confirms no experiment data exists. | **FABRICATED.** |
| C14 | "We measured **opt-outs deliberately**, and I'll tell you what we found." | S:1107 (homepage belief #2 example copy) | No opt-out measurement in any source. | **FABRICATED.** Homepage copy asserting a measurement that does not exist, and promising a finding that does not exist. |
| C15 | "sessions concentrated around **standings checks and step syncs**, not around navigation or search" | S:562 | Not in R or L. | **FABRICATED behavioural finding.** Offered as example copy for the hardest objection in the case study. |
| C16 | Push notification example: "You're **4th** in your league, **800 steps** behind 3rd" | S:555 | Not in R or L. | **FABRICATED.** If rendered as a diagram or mock notification it becomes a fabricated product artifact. |
| C17 | "0→1 competitive-fitness product" / "led 0-to-1 Steps Premier League launch" | S:246, 439 | R:HCL-b3 verbatim "led 0-to-1 Steps Premier League launch". | **SUPPORTED.** One of only two explicitly labelled 0→1 items in the entire record. |

### 1.4 AI Health Reports (Case study 3)

| # | CLAIM | WHERE S SAYS IT | SUPPORTED BY SOURCE? | VERDICT |
|---|---|---|---|---|
| D1 | "**15% incremental revenue**" | S:198, 362, 844, 1086 (homepage card 3) | R:HCL-b4: "created cross-sell hooks driving 15% incremental revenue". | **WEAKENED.** R attributes the 15% to **the cross-sell hooks**, not to AI Health Reports as a whole. S:1086 reads "AI Health Reports — personalisation, safety boundaries, and 15% incremental revenue", widening the attribution. Also: baseline, population, timeframe, method all [ABSENT] (SF M4). |
| D2 | "USP in **5+ closes**" / "a closing asset in **five** enterprise deals" | S:198, 327, 362, 1064 | R:HCL-b4: "serving as key USP in closing 5+ enterprise clients". | **SUPPORTED** as "5+". S:327's "five" is the conservative floor and is fine; prefer "5+" or "at least five". No timeframe in source. |
| D3 | "Users completed **health check-ups** and received **raw clinical data**" / "**lab panel**" / "**your labs**" / "my **haemoglobin is 12.4**" | S:604, 616, 622, 1217 | R:HCL-b4 says only "AI-powered Health Reports… product requirements, UX flow, & personalization logic". **The input data type is never stated in R or L.** | **FABRICATED.** The entire lab-values framing — which also determines what Grounded is for — rests on nothing. `[NEEDS: what data do the AI Health Reports consume — lab results, self-reported data, wearable data, claims data?]` |
| D4 | The architecture: `normalisation → rule-based clinical scaffolding → LLM language generation ONLY → validation layer (grounding check, scope check) → escalation router → rendered report` | S:655–665 | Not in R or L. | **FABRICATED — highest technical-risk item in the document.** Seven named system components, none in any source. S:666 hedges ("If that is what you did… If it isn't what you did, say what you did") but the diagram is drawn, fenced, and ready to paste. |
| D5 | "**Let the model write; let the rules decide.** … The boundary belongs in the architecture, not the prompt." | S:1109–1110 (homepage belief #3, **unhedged**) | Same as D4. | **FABRICATED.** S:666's hedge is not carried into the homepage copy. This is the most quotable sentence in the document and it asserts an architecture that no source describes. |
| D6 | "a **refusal/escalation layer** (out-of-range values route to 'see a doctor')", "a **clinician review path** for edge cases", "export/share" | S:632 | Not in R or L. | **FABRICATED.** |
| D7 | Quality metrics: "**factual grounding rate**", "**out-of-scope-advice rate (target: zero)**", "reading-level score", "**clinician-review pass rate on a sampled set**" | S:636 | Not in R or L. | **FABRICATED.** |
| D8 | "Prompt/version **regression testing against a golden set** — even a manual version. Describe it." | S:646 | Not in R or L. | **FABRICATED.** Instructs the builder to describe an eval practice that no source says existed. |
| D9 | Experiments: "report format A/B (narrative vs. structured)", "cross-sell placement test — and **the honest finding about where placement felt exploitative**" | S:644–645 | Not in R or L. | **FABRICATED**, including a pre-written "honest finding". |
| D10 | A **clinical stakeholder / internal approver** existed | S:618–619 | Not in R or L. SF §8 bans named colleagues; this is an unnamed but asserted role. | **UNSUPPORTED.** `[NEEDS: was there a clinical sign-off on the reports, and who owned it?]` |
| D11 | "The loop is **annual**" (reports regenerate yearly) | S:629 | Not in R or L. | **FABRICATED cadence.** |
| D12 | "Built 0-to-1 AI-powered Health Reports" | R:HCL-b4 verbatim | — | **SUPPORTED.** The second and last explicitly labelled 0→1 item. |
| D13 | Visual: "**the eval scorecard** — dimensions, sample size, pass thresholds" as a case-study image | S:651 | No eval work in any source. | **FABRICATED artifact.** Drawing it would be manufacturing evidence. |

### 1.5 The "six 0→1 launches" claim — counted

This is the second-most-repeated claim on the proposed site and it does not survive counting.

**S's own enumeration** (S:195): Steps Premier League · AI Health Reports · the engagement suite ·
See/Read/Listen at YourStory · deferred-verification KYC at Infinyte · QuickSell fraud detection at Droom.

| Item | What R actually says | 0→1? |
|---|---|---|
| Steps Premier League | "led **0-to-1** Steps Premier League launch" | **YES — explicit** |
| AI Health Reports | "Built **0-to-1** AI-powered Health Reports" | **YES — explicit** |
| Engagement suite | "**Shipped** engagement suite (Challenges, Streaks, Live Events, Trackers)" | **Inferred.** Never labelled 0→1. Also: is it one launch or four? Counting it as one is arbitrary; counting the four features gives nine total. |
| See/Read/Listen (YourStory) | "**Launched** 'See, Read and Listen' feature after evaluating 5+ third-party audio platforms" | **Inferred.** And **Tier C — S:259 cuts it from the site.** |
| Deferred-verification KYC (Infinyte) | "**proposed** deferred-verification flow, aligned with CEO"; separately "Implemented nudge system… shipped with engineering in 3 weeks" | **Weak.** R says *proposed* the flow. The thing shipped was the nudge system. |
| QuickSell fraud detection (Droom) | "**Revamped** QuickSell listing with fraud detection via A/B testing" | **NO — contradicts.** A revamp is by definition not 0→1. And **Tier C — S:258 cuts it from the site.** |

**Findings:**

| # | CLAIM | WHERE S SAYS IT | SUPPORTED? | VERDICT |
|---|---|---|---|---|
| E1 | "**Six** products taken 0→1" / "Six things taken 0→1" / "six of them" | S:195, 229, 338, 355, 370, 845, 1044, 1366 — **including the recommended hero sub-line (S:1044, S:1366)** | R explicitly labels **two**. Two more are inferable. One is *proposed*, not shipped. One (**QuickSell, "Revamped"**) **contradicts** the 0→1 label. | **UNSUPPORTED, trending FABRICATED.** Defensible ceiling without new input from Aniket: **"Two 0→1 launches, plus an engagement suite"** — or `[NEEDS: list the products you took 0→1 and confirm each was net-new, not a revamp]`. |
| E2 | "across **five companies**" | S:195 | The six items span **four** companies: HCL, YourStory, Infinyte, Droom. | **ARITHMETIC ERROR in S.** Not five. |
| E3 | "**In two years** I've taken six features 0→1" | S:370 (the three-sentence recruiter pitch) | Of the six, YourStory (2022), Droom (2023) and Infinyte (2023) all predate the Oct-2024 HCL start. **At most three fall inside "two years".** | **CONTRADICTS SOURCE.** The sentence is false on its own terms regardless of whether "six" is granted. |
| E4 | Hero sub-line juxtaposition: "Product at HCL Healthcare — engagement and retention on a 1M+ user health super-app. **Six products taken 0→1.**" | S:1044, S:1366 | Reading in sequence implies all six were at HCL. R supports at most three HCL items, two of them explicitly. | **UNSUPPORTED framing** even if the count were granted. |
| E5 | "Fitness **leagues**" (plural) | S:356 | One league in the record. | **WEAKENED.** Singular. |

### 1.6 Other roles

| # | CLAIM | WHERE S SAYS IT | SUPPORTED? | VERDICT |
|---|---|---|---|---|
| F1 | "Circle Health renewals up **15%** off claims analysis" | S:198, 844 | R:CH-b3: "boosted renewals by 15% through YOY claims data analysis for 20+ enterprise clients". | **SUPPORTED** as wording. Baseline [ABSENT]. |
| F2 | "**CSAT +50%**" | S:253, 275, 793–794, 1216 | R:CH-b1: "improved CSAT scores by 50%". | **SUPPORTED** as wording, but S:275 and S:794 correctly call it unfalsifiable. Scale, baseline, N, period all [ABSENT] (SF M8). **S's own instruction is to fix or drop it — follow that.** |
| F3 | Example replacement: "**3.1 → 4.2** on a 5-point post-claim survey, N=X" | S:794 | Explicitly flagged in S as an example ("e.g."). | **FABRICATED if copied.** The "e.g." disappears the moment a builder lifts the sentence. 3.1 and 4.2 appear in no source. |
| F4 | "Signup completion **doubled**" (Infinyte) | S:790 | R:IC-b1 "+100% signup completion". +100% = ×2. | **DERIVED — true.** Baseline [ABSENT]. |
| F5 | "you accepted a population of **unverified users** and had to design the **recovery mechanism**… state **the risk you took on and how it was contained**" | S:791 | R supports the deferred flow and the nudge system. It does **not** describe a risk assessment or containment. | **PARTLY SUPPORTED / invitation to invent.** The nudge system is real; "how it was contained" is not. |
| F6 | "aligned the CEO" | S:790 | R:IC-b1 "aligned with CEO". | **SUPPORTED.** |
| F7 | Droom and YourStory are Tier C and cut | S:258–259 | — | **Internally inconsistent with E1**, which counts both toward "six 0→1". You cannot cut the evidence and keep the count. |
| F8 | "the fraud number (85%) will not survive scrutiny" | S:258 | R:Droom "eliminated 85% fake inventory". | **AGREE — cut.** Consistent with SF M13. |
| F9 | "Ten resume bullets, ten wins" / "zero failures across ten bullets" | S:286, S:848 | Actual count: HCL 5 + Circle Health 3 + Droom 3 + Infinyte 2 + YourStory 3 = **16 work bullets** (20 including competitions and positions of responsibility). CG says "seventeen". | **BOTH WRONG.** Neither S (10) nor CG (17) counted. The correct figure is **16 work-experience bullets**. The substantive point — zero failures anywhere — stands. |

### 1.7 Claims about the world (not about Aniket)

| # | CLAIM | WHERE S SAYS IT | VERDICT |
|---|---|---|---|
| G1 | "**Health apps are the hardest** retention problem in consumer software" | S:337, 1041, 1364 (the site headline) | **THIRD-PARTY, unsupported superlative.** S itself uses the safer form at S:236: "**one of the hardest** retention problems". Use the S:236 form. A headline superlative is the first thing a sceptical VP tests. |
| G2 | "published health-app benchmarks put median D30 retention around **15–25%** and D90 down at **6–10%**" | S:340 | **THIRD-PARTY, uncited.** S's source list names no specific study. Do not publish without a live, linked citation. |
| G3 | "Reported effect for chronic-care platforms: substantially higher 90-day retention for **ABDM-synced cohorts** versus manual-logging cohorts" | S:760 | **THIRD-PARTY, vaguely cited** ("productgrowth.in"). If the ABDM note ships, every stat in it needs a link. |
| G4 | "a growth PM who published **23 experiments — five wins, three surprises, fifteen failures**" | S:47 | **THIRD-PARTY anecdote about someone else.** Must never appear on Aniket's site. (Arithmetic checks: 5+3+15 = 23.) |

### 1.8 Grounded (`/lab`) — build-dependent claims

| # | CLAIM | WHERE S SAYS IT | VERDICT |
|---|---|---|---|
| H1 | "a hand-labelled golden set of **40 cases**" | S:1130 (**homepage copy**), S:714 ("~40"), S:1451 ("40 hand-labelled cases") | **BUILD-DEPENDENT.** Note S:714 says "~40" and S:1130/1451 say "40" — the homepage hardens an approximation. **The count must be generated from the shipped JSON at build time, never typed.** If 31 cases ship, the homepage must say 31. |
| H2 | "**hand-labelled** by you" | S:714, 1130, 1451 | **BUILD-DEPENDENT and currently false.** CG B7 records that Aniket has not committed to labelling. Until he does, the page must say the set is **synthetic and unlabelled** (CG B7's own wording). Shipping "hand-labelled" before he labels it is a fabrication. |
| H3 | "covering normal, borderline, out-of-range, and **adversarial** cases" | S:714 | **BUILD-DEPENDENT.** Only if those strata actually exist in the shipped set. |
| H4 | "Judge agreement with your hand labels — **if it's 84%, say 84%**" | S:721 | **BUILD-DEPENDENT example number.** 84% is illustrative. Must be computed, never typed. |
| H5 | "Four scored dimensions: grounding, scope, escalation, readability (target ~Grade 8)" | S:715 | **BUILD-DEPENDENT.** Fine — it is a design spec for a thing not yet built, not a claim about the past. |
| H6 | "Time to first result (<10s)" / "under five minutes" | S:711, 723 | **BUILD-DEPENDENT performance targets.** Verify before publishing either number. |
| H7 | Grounded is "a **direct extension of your real job**… you are open-sourcing the problem you actually face at work" | S:693 | **UNSUPPORTED** while D3/D4 are unconfirmed. If the AI Health Reports do not consume lab values, Grounded is not an extension of the job — it is an adjacent project, and saying otherwise is a claim about Aniket's work. |

### 1.9 Machine-readable and meta claims

| # | CLAIM | WHERE S SAYS IT | VERDICT |
|---|---|---|---|
| I1 | Page title `Two Seconds — cutting cold start 15s → **1.9s** \| Aniket Agarwal` | S:1303 | **FABRICATED** (B1). This is the single most indexed string on the site. |
| I2 | OG image renders "**the metric delta** in the signature treatment" | S:1338 | **FABRICATED if the delta is `15.0s → 1.9s / −87%`.** Bakes the invented number into every LinkedIn/Slack preview, where it is cached aggressively and cannot be un-shared. |
| I3 | JSON-LD `Person` with `jobTitle` | S:1304 | **BUILD RISK.** `jobTitle` must be **"Product Analyst"** — the actual title in R and L. A builder writing `jobTitle: "Product Manager"` publishes a machine-readable false claim to search engines and AI screening tools. Highest-consequence one-word error on the site. |
| I4 | JSON-LD `sameAs` GitHub URL | S:1304 | **UNSUPPORTED.** CG B6: the GitHub URL is not recoverable from R's PDF text layer. `gh` is authenticated as `Aniket4501` but that is a local credential, not Aniket's stated public handle. `[NEEDS: confirm github.com/Aniket4501]` — do not guess. |
| I5 | JSON-LD `alumniOf` | S:1304 | **SUPPORTED** for "Indian Institute of Technology Kharagpur". Do **not** populate a degree field until CG C2 is resolved. |
| I6 | "consider mentioning your own **Lighthouse score** in the footer" | S:1027 | **BUILD-DEPENDENT.** Only after a real run, and it must be re-verified on every deploy or removed. A stale "100/100" in the footer of a performance PM's site is the worst possible place to be caught. |
| I7 | "`Currently: shipping [X]`" | S:1046 | **PLACEHOLDER.** CG B4. Must render as a visible `[NEEDS: …]`, never be filled with a guess. |
| I8 | "`[your fourth belief]`" | S:1113 | **PLACEHOLDER.** Must not be auto-filled. Ship three beliefs rather than invent a fourth. |

---

## 2. Homepage proof strip — per-number denominator audit

S:1056–1072 proposes four lines. S:1066 says: *"Do not ship this section until every number has a
denominator."* **S then ships three lines with fabricated or missing denominators and one line that
is not a number at all.** The section as specified violates its own gate.

### Line 1 — `COLD START  15.0s → 1.9s   P75, low-end Android, 8 weeks`

| Component | Status | Required action |
|---|---|---|
| `15.0s` | Precision fabricated (R says "15s") | Render `15s` |
| `1.9s` | **FABRICATED** — R says `<2s` | Render `under 2s` |
| `P75` | **FABRICATED** — no percentile in any source | `[NEEDS: which percentile — P50, P75, P90 — and cold start to which event (first frame / first meaningful paint / interactive)?]` |
| `low-end Android` | **UNSUPPORTED** — CG A2; S contradicts itself (S:474 says mid-tier) | `[NEEDS: which device population was measured?]` |
| `8 weeks` | **SUPPORTED** — R:HCL-b2 | Keep |
| Measurement method | **[ABSENT]** entirely | `[NEEDS: measured by synthetic device lab, RUM/production telemetry, or staged-rollout pre/post?]` |
| **Shippable form today** | | `COLD START · 15s → under 2s · 8 weeks · [NEEDS: percentile, device population, measurement method]` |

### Line 2 — `SESSION TIME  3.5 → 7.8 min   enrolled cohort, post-launch`

| Component | Status | Required action |
|---|---|---|
| `3.5 → 7.8 min` | **SUPPORTED** — R:HCL-b3 verbatim | Keep |
| `enrolled cohort` | **FABRICATED** — the population is [ABSENT] in R and L (SF M3). This is also the most self-serving possible denominator. | `[NEEDS: measured on league enrollees only, or on all DAU?]` |
| `post-launch` | **FABRICATED as a window** — no timeframe in R or L | `[NEEDS: measured over which window, against which baseline period?]` |
| Method | **[ABSENT]** | `[NEEDS: which analytics tool, and was session time defined as median or mean?]` — note SF §8 bans naming the analytics tool used at HCL unless Aniket supplies it |
| Attribution | **[ABSENT]** | Add S's own line: *"I attribute this directionally, not causally"* (S:907, S:1421) unless a holdback existed |
| **Shippable form today** | | `SESSION TIME · 3.5 → 7.8 min · [NEEDS: population, window, baseline period, definition]` |

### Line 3 — `DAU  +20%   12 weeks, 1M+ user base`

| Component | Status | Required action |
|---|---|---|
| `+20%` with **no before → after** | **Violates S's own rules** at S:1066, S:80 and S:1203 ("Numbers before adjectives. Never 'significantly improved.' Always '3.5 → 7.8 minutes'"). A bare percentage is precisely the unfalsifiable metric S:80 says reviewers discount to zero. | `[NEEDS: DAU before → DAU after, or a relative-only statement with the base withheld and said so]` |
| `1M+ user base` as the denominator | **FABRICATED.** R's 1M+ is the app's registered user count. Nothing states the DAU measurement population was the full 1M+. Registered ≠ the DAU denominator. | `[NEEDS: DAU as a share of what — registered base, enrolled base, or MAU?]` |
| `12 weeks` | **SUPPORTED** — R:HCL-b5 | Keep |
| **Attribution** | **Misattributed by placement.** R:HCL-b5 ties +20% DAU to the **engagement suite**, not to Steps Premier League or to the app overall. | Label the line `ENGAGEMENT SUITE → DAU` |
| **Shippable form today** | | `DAU (engagement suite) · +20% · 12 weeks · [NEEDS: baseline DAU and denominator]` |

### Line 4 — `ENTERPRISE  AI Health Reports → USP in 5+ closes`

| Component | Status | Required action |
|---|---|---|
| Category error | This is a qualitative claim occupying a slot in a strip whose stated purpose (S:1059) is "four deltas… each with its denominator". It has no before, no after, and no denominator. | Either move it out of the strip, or replace it with the revenue metric properly qualified |
| `5+ closes` | **SUPPORTED** — R:HCL-b4 | Keep, but add a period |
| Timeframe | **[ABSENT]** | `[NEEDS: over what period were the 5+ closes?]` |
| Ownership boundary | Sales outcomes Aniket did not own | State it: *"I built the artifact; sales owned the closes"* |
| The `15%` revenue figure (S:1086, homepage card 3) | **[ABSENT]** baseline, population, timeframe, method (SF M4); and R attributes it to **cross-sell hooks**, not to the product | `[NEEDS: 15% of what revenue line, over what period, attributed how?]` |
| **Shippable form today** | | `ENTERPRISE · AI Health Reports cited as a key USP in 5+ enterprise closes · [NEEDS: period] · I built the artifact; I did not own the sale` |

### Proof-strip verdict

**As specified in S:1060–1065, the strip contains 4 fabricated components, 1 fabricated-precision
component, 3 absent methods, 2 absent baselines, and 1 misattribution. It cannot ship as written.**

Two of the four lines can be made honest today with only a truncation (cold start, session time).
One needs a real baseline from Aniket (DAU). One is not a metric (enterprise). **A three-line strip
of fully qualified numbers beats a four-line strip with one invented denominator** — and the fourth
slot is exactly the one S:1066 warns "poisons the entire page for exactly the reader you're trying to
convince."

---

## 3. Example-copy contamination register

S gives sample sentences throughout Parts 7, 9, 10, 11, 12 and 13. **Builders copy example copy
verbatim.** Every item below is a sentence or fenced block in S that contains a fact absent from
every source. Ordered by risk = (visibility on the finished site) × (specificity of the invention).

### 3.1 CRITICAL — fenced code blocks, which get copied wholesale

| # | S line | The block | Invented facts inside it |
|---|---|---|---|
| X1 | **S:875–885** | The case-study header block template | `1.9s` (title line) · `4 engineers, 1 designer, no dedicated QA` · `Q1 2025` · `15s → 1.9s` · `P75, low-end Android`. **Five inventions in a ten-line block that every case study is built from.** The only true lines are `8 weeks`, `25MB → 6MB` and the "I did not" structure. |
| X2 | **S:978–983** | The signature `MetricDelta` element | `COLD START (P75, low-end Android)` · `15.0s ─▶ 1.9s` · `−87%`. S:1276 calls `MetricDelta` "the most important component on the site… appears ~20 times". **The invention is in the component's own reference implementation and would propagate ~20×.** |
| X3 | **S:1060–1065** | The proof strip | See §2. Four lines, four problems. |
| X4 | **S:1145–1152** | The homepage timeline | Every role rendered as "Product ·" (A8) · `Insurance claims` (A5) · `Auto marketplace` (A6) · `Fintech onboarding` (A7) · `1M+ users` without the "registered" qualifier (A3). |
| X5 | **S:655–665** | The AI Health Reports architecture diagram | Seven named system components, none in any source (D4). Fenced, drawn, paste-ready. |
| X6 | **S:1283–1295** | The Zod `CaseStudy` schema | Not itself false, but `team` and `timeline` are required fields with no source data behind them (CG B3). **The schema will force a builder to fill `team` — and X1 supplies the number they will fill it with.** Make `team` and `timeline` accept an explicit `NEEDS` sentinel and render it. |

### 3.2 CRITICAL — homepage prose, maximum visibility

| # | S line | Example copy | Problem |
|---|---|---|---|
| X7 | S:1104 | "I spent my **first eight weeks** on cold-start latency instead of **the engagement roadmap I was hired for**, because features shipped onto a 15-second launch are measured against a population that already left." | Two inventions: the sequencing (B8) and the mandate (B9). The final clause is a fair paraphrase of R's "critical adoption blocker" and can be kept. |
| X8 | S:1107 | "Choosing competition over incentives meant accepting that we'd alienate users who don't want to compete. **We measured opt-outs deliberately, and I'll tell you what we found.**" | Asserts a measurement that does not exist and promises a finding that does not exist (C14). The first sentence is defensible; the second is not. |
| X9 | S:1109–1110 | "**Let the model write; let the rules decide.** In health, generated language is fine and generated medicine is not. **The boundary belongs in the architecture, not the prompt.**" | Asserts the D4 architecture, unhedged, in the most memorable sentence on the site (D5). S:666's caveat is not carried over. |
| X10 | S:1081 | "**I was asked to make the app more engaging.** I made it faster instead." | The mandate is unsourced (B9). This is homepage card 1 — the site's central hook. |
| X11 | S:1084 | "Three ways to fix week-2 churn. **I picked the one people would argue about.**" | "Three ways" is supported (R:HCL-b3). "Week-2" is a two-bullet merge (C4). "People would argue about" asserts a social fact — that someone objected — that appears nowhere. |
| X12 | S:1082 | "Cold start 15s → **1.9s** on a 1M+ user health app." | B1. |
| X13 | S:1086 | "AI Health Reports — personalisation, **safety boundaries**, and 15% incremental revenue." | "Safety boundaries" asserts D4/D6. Revenue attribution widened past R's "cross-sell hooks" (D1). |
| X14 | S:1130 | "Scores generated health text… against a **hand-labelled golden set of 40 cases**." | H1 + H2. Both build-dependent; both currently false. |

### 3.3 CRITICAL — the rewrite table at S:1208–1220

This table is titled *"Copy that must be rewritten from the resume."* A builder reads the right-hand
column as approved replacement copy. **Three of the seven replacements introduce facts that are not
in the resume, and one directly contradicts it.**

| # | S line | Proposed replacement copy | Verdict |
|---|---|---|---|
| X15 | **S:1215** | "**Trackers and Live Events went to Won't-Have for the quarter. The Live Events team was not happy; here's why I held.**" | **CONTRADICTS SOURCE — the single most dangerous line in the document.** R:HCL-b5 says the engagement suite **"(Challenges, Streaks, Live Events, Trackers)"** *shipped*. This copy says two of those four were cut. It also invents a "Live Events team". If published, a reviewer holding the resume sees the site claim the opposite of the resume. |
| X16 | S:1214 | "I worked with **4 engineers and a designer**; my **VP-Product approved quarterly scope**, and I made the **within-quarter calls**." | B6 (headcount) plus an invented decision-rights structure. Nothing in R or L describes approval boundaries. |
| X17 | S:1213 | "I owned the engagement roadmap: what shipped, in what order, and **what I cut**." | R:HCL-b1 says "defined product roadmap… through cross-functional collaboration with VP-Product". "I owned" is an ownership upgrade over R's own hedged phrasing, and "what I cut" asserts cuts that are not recorded. |
| X18 | S:1217 | "I built a report generator that will explain **your labs** and will not diagnose you — and **the architecture is what enforces that, not the prompt**." | D3 (lab values) + D4 (architecture). |
| X19 | S:1218 | "1M+ **registered** beneficiaries, **reached through employer health plans** — distribution I inherited, retention I owned." | "Registered" is the correct conservative fix (SF A3) — **keep it**. "Reached through employer health plans" is A4, unconfirmed. Keep the first half, gate the second on A4. |
| X20 | S:1216 | "improved CSAT scores by 50%" → "Actual scale movement with N, or a qualitative outcome." | **Correct advice, no invented content.** Follow it. |
| X21 | S:1212 | "Product Analyst with PM Ownership" → "Delete. Lead with the work." | **Correct advice.** But see A9 — deleting the phrase must not mean the literal title "Product Analyst" disappears from the site entirely. |

### 3.4 HIGH — case-study body copy in Part 7

| # | S line | Example copy | Verdict |
|---|---|---|---|
| X22 | S:478 | *"I open the app, stare at a splash screen, assume it's broken, and close it."* | **FABRICATED USER QUOTE.** SF §8 bans user quotes outright. Presented as a "user pain point" in quote marks. |
| X23 | S:549 | *"I know my step count. My phone already tells me. Why would I open your app to see it again?"* | **FABRICATED USER QUOTE.** |
| X24 | S:622 | *"My haemoglobin is 12.4. Is that bad? Should I do something? My doctor has six minutes."* | **FABRICATED USER QUOTE + a fabricated clinical value + a fabricated consultation length.** Worst of the four. |
| X25 | S:703 | *"We shipped a generated summary. We think it's fine. We have no idea how we'd know if it stopped being fine after a model update."* | **FABRICATED QUOTE**, attributed to Grounded's target user. Lower risk (it is about a hypothetical team, not Aniket's users) but must never be rendered as a real quote. |
| X26 | S:555 | *"Push at 8pm: 'You're 4th in your league, 800 steps behind 3rd'"* | C16. Would become a fabricated product artifact if diagrammed. |
| X27 | S:562 | "sessions concentrated around standings checks and step syncs, not around navigation or search" | C15. Offered as the answer to the case study's hardest objection. |
| X28 | S:500 | "beneficiary activation rate is what the employer sees at renewal" | Invented commercial mechanic, downstream of A4. |
| X29 | S:567 | "Engagement is the contractual deliverable in employer wellness programmes; beneficiary activity is what gets reported to the client." | Invented contract mechanics, downstream of A4. |
| X30 | S:641 | "the user consumes the report; the *employer* buys the programme; the report is the artifact that makes the programme legible at renewal" | Downstream of A4. |
| X31 | S:794 | "3.1 → 4.2 on a 5-point post-claim survey, N=X" | F3. The "e.g." does not survive a copy-paste. |
| X32 | S:898 | "include **reversibility** as one dimension, because almost nobody does" | Invents which dimensions the decision matrix actually used. Only the three *option names* (content, incentives, gamification) are in R. |

### 3.5 HIGH — visual and accessibility copy

| # | S line | Example copy | Verdict |
|---|---|---|---|
| X33 | **S:1326** | Alt-text example: *"Cohort retention curve showing a drop from **62% to 31%** between week 1 and week 2"* | **FABRICATED.** Two retention numbers that appear in no source, in *example alt text* — the place a builder is least likely to fact-check and a screen-reader user is most likely to trust. Also note: alt text is indexed. |
| X34 | S:510 | Hero image: "annotated **15s cold-start timeline** vs. the 1.9s one" | The *composition* of the 15 seconds is unknown. A waterfall diagram requires per-phase timings that do not exist. **Drawing it is fabricating data.** |
| X35 | S:511 | "A **device-tier matrix** — cold start by RAM/network band, before and after" | Requires a full matrix of values that do not exist. **Fabrication.** |
| X36 | S:512 | "The **bundle treemap** — 25MB broken into what it was made of, and the same at 6MB" | The 25MB and 6MB totals are real; **the breakdown is not**. A treemap is 90% invented area. |
| X37 | S:513 | "One **real before/after screen recording** (GIF) of the splash on a low-end device" | SF §6: no screenshots, recordings or product assets exist. Cannot be produced without fabricating. |
| X38 | S:577 | "Cohort retention curve — before/after, annotated at week 2" | No cohort data in any source. |
| X39 | S:578 | "The decision matrix — three strategies scored against effort, expected retention lift, and reversibility" | Option names are real; **the scores are not**. |
| X40 | S:579 | "Standings screen (**real product screenshot**, anonymised)" | No screenshots exist (SF §6). |
| X41 | S:651 | "The eval scorecard — dimensions, sample size, pass thresholds" | D13. |
| X42 | S:1002–1003 | "Product screenshots — **anonymised, real**, device-framed… Always annotated." | Presupposes screenshots exist. They do not. |
| X43 | S:912 | "The artifact drawer… containing 2–4 **real (redacted) artifacts**: a PRD excerpt, the experiment brief, the cohort export, the decision matrix" | SF §6 and CG B5: **no artifacts exist.** A drawer labelled "real (redacted) artifacts" containing hand-drawn reconstructions is a lie about provenance. Per SF §6, drawers ship as captioned reconstructions or are omitted. |

### 3.6 MEDIUM — instructions that invite invention

These do not themselves contain a false fact, but they instruct the writer to produce one.

| # | S line | The instruction | Why it is a trap |
|---|---|---|---|
| X44 | S:584 | "**The sync-integrity problem is the most interesting technical detail in this case study. Do not skip it.**" | Instructs the builder not to skip a problem no source says occurred. |
| X45 | S:573 | "**Include at least one loser.** If a variant failed, publish it." | CG N3: no experiment data exists. The conditional ("if") will be lost. |
| X46 | S:646 | "Prompt/version regression testing against a golden set — even a manual version. **Describe it.**" | Instructs description of an eval practice with no source. |
| X47 | S:836 | "P2 and P3 should each carry **one real (anonymised) user quote**" | CG N1: no quotes exist. The instruction creates demand; X22–X25 supply the template. |
| X48 | S:846 | "Add one line per case study naming team size and shape — '3 engineers, 1 designer, no dedicated QA'" | Supplies the fabricated headcount *as the example*, one section before X1 supplies a different one. |
| X49 | S:1298 | "Making `notOwned` a **required schema field**" | Good discipline — but with no source data (CG B3), a required field forces invention. Must accept and render `[NEEDS: …]`. |
| X50 | S:269 | "Here is the roadmap I owned, the PRDs I wrote, and **the three decisions I made** that a PM would make" | "Three" is arbitrary. R records no count of decisions. |
| X51 | S:1104–1114 | Four beliefs, one of which is `[your fourth belief]` | Ship three. Do not auto-fill. |

---

## 4. Arithmetic verification

### 4.1 `15s → under 2s` = "−87%"? — S:982, S:1406

```
If after = 1.9s (S's figure):   (15 − 1.9) / 15 = 13.1 / 15 = 0.873333… = 87.3%  → rounds to 87%
If after = 2.0s (the bound):    (15 − 2.0) / 15 = 13.0 / 15 = 0.866666… = 86.7%  → rounds to 87%
```

**Verdict: the −87% figure survives, but only by coincidence, and it may not be presented as exact.**

- The source states an **inequality** (`<2s`), so the true reduction is `> 86.67%`. It is a **lower
  bound**, not a value. It could be 87%, or 93% if the real figure were 1.0s.
- Both 1.9s and 2.0s round to 87%, so `−87%` is not *wrong* — but writing `15.0s ─▶ 1.9s / −87%`
  presents a bounded estimate as a three-significant-figure measurement.
- **Ruling:** the site may render `15s → under 2s` with **no percentage**, or with `≈87% faster`
  or `at least 87% faster`. It may **not** render `−87%` as a clean derived delta next to `1.9s`,
  because that pairing asserts both an invented value and an exact derivation from it.
- Also note `15s / 2s = 7.5×` — "at least 7.5× faster" is a true, defensible, and more striking
  framing that requires no invented precision.

### 4.2 `3.5 → 7.8 min` = "+122%"? — R:HCL-b3

```
(7.8 − 3.5) / 3.5 = 4.3 / 3.5 = 1.228571… = +122.857%   → rounds to +123%, truncates to +122%
Ratio: 7.8 / 3.5 = 2.2286×
Reverse check: the value that yields exactly +122% is 3.5 × 2.22 = 7.77 min, not 7.8
```

**Verdict: DOES NOT CHECK OUT AS STATED — the resume is internally inconsistent by 1 percentage point.**

- `+122%` is a truncation, not a rounding. Correct rounding is `+123%`.
- **This matters more than one point suggests.** S's target reader is a Senior PM described at S:115
  as "the most technically probing reader," reading "adversarially." Dividing 7.8 by 3.5 takes four
  seconds. A reviewer who finds a self-inconsistent number on a site whose entire thesis is
  *"I state numbers the way someone who's been challenged on numbers states them"* (S:1072) will
  discount every other number on the page.
- **Ruling:** display **`3.5 → 7.8 min`** and let the reader do the arithmetic — which is S's own
  stated preference at S:1203 ("Numbers before adjectives… Always '3.5 → 7.8 minutes'"). If a delta
  must be shown, show `2.2×` (exact to one decimal) or `+123%` marked `[DERIVED]`.
  **Never render "+122%" adjacent to "3.5 → 7.8".** The resume header should also be corrected.

### 4.3 `25MB → 6MB` = 76%? — R:HCL-b2

```
(25 − 6) / 25 = 19 / 25 = 0.76 exactly = 76.0%
Ratio: 25 / 6 = 4.1667×
```

**Verdict: CHECKS OUT EXACTLY.** 76% is precise, not rounded. Both inputs are stated in R.
This is the **only** metric on the proposed site whose delta can be displayed as a clean derived
percentage without a caveat. It should therefore carry the signature `MetricDelta` treatment,
and the cold-start line should not.

Caveat that still applies (B17): "bundle size" is ambiguous between compressed/uncompressed and
APK/AAB/install size. The **percentage** is exact; the **measurement basis** is still
`[NEEDS: 25MB and 6MB measured as what — download size, install size, or APK/AAB?]`.

### 4.4 `+100% signup completion` = "doubled"? — R:IC-b1, S:790

```
+100% ⇒ after = before × 2
```
**Verdict: CHECKS OUT.** "Doubled" is exact. Baseline still [ABSENT] (SF M11).

### 4.5 Tenure — Oct 2024 → 2026-08-19

```
Oct 2024 → Oct 2025 = 12 months
Oct 2025 → Aug 2026 = 10 months
Total completed        = 22 months = 1.83 years
LinkedIn's "1 yr 11 mo" = 23 months = LinkedIn's inclusive calendar-month count (Oct'24…Aug'26)
```
**Verdict: 22 completed months. "Two years" overstates by ~2 months.** CG C1's ruling ("nearly two
years") is correct and S:337/1042/1364 must be changed. S:194's own "~22 months" is the accurate figure.

Secondary: "two years of healthcare context" (S:197) = HCL 22mo + Circle Health 3mo = **25 months**
of healthcare-sector work. That claim is fine; the "insurance" descriptor (A5) is not.

### 4.6 "Six 0→1 launches across five companies" — S:195

```
Enumerated companies: HCL · YourStory · Infinyte · Droom = 4
```
**Verdict: ARITHMETIC ERROR. Four companies, not five.** (See also E1: the count of six is itself
unsupportable — two are explicit, one is contradicted by "Revamped".)

### 4.7 Resume bullet count — S:286, S:848 vs CG B1

```
HCL 5 + Circle Health 3 + Droom 3 + Infinyte 2 + YourStory 3 = 16 work bullets
+ Competition 2 + Positions of Responsibility 2              = 20 total
```
**Verdict: S says "ten", CG says "seventeen". Both are wrong; the figure is 16 work bullets / 20 total.**
The substantive finding (zero failures anywhere in the record) is unaffected and stands.

### 4.8 Third-party arithmetic — S:47

```
5 wins + 3 surprises + 15 failures = 23 experiments ✓
```
Internally consistent, but a story about a different person (G4). Never on this site.

---

## 5. Internal contradictions inside S itself

Listed because each one is *proof* that the surrounding number is illustrative rather than reported.
A builder who notices these will correctly conclude the block is a placeholder.

| # | S contradicts itself | Locations | What it proves |
|---|---|---|---|
| P1 | Engineer headcount: **3** vs **4** vs **four** | S:846 / S:880, S:1214 / S:1478 | The headcount is invented. No source has it. |
| P2 | Device population: **mid-tier (2–4GB RAM)** vs **low-end** | S:474 / S:882, 979, 1061 | The device tier is invented. |
| P3 | Timing: **Q1 2025** vs **"my first eight weeks"** (= Oct–Nov 2024) | S:881 / S:343, 1104 | The date is invented, and the two inventions are mutually exclusive. |
| P4 | Tenure: **"~22 months"** vs **"two years"** | S:194 / S:337, 1042, 1364 | S knows the true figure and rounds it up in the headline. |
| P5 | Category claim: **"one of the hardest"** vs **"the hardest"** | S:236 / S:337, 1041, 1364 | S knows the defensible form and hardens it for the headline. |
| P6 | Golden set: **"~40"** vs **"40"** | S:714 / S:1130, 1451 | An approximation hardened into homepage copy. |
| P7 | Droom and YourStory are **"cut from the portfolio"** yet **counted toward "six 0→1"** | S:258–259 / S:195, 1044 | The count cannot be evidenced by anything the site shows. |
| P8 | Steps Premier League's north star is **"not session time"** vs R's explicit **"North Star Metric: 3.5 → 7.8 mins"** | S:561 / R:HCL-b3 | S is redesigning history, not reporting it. |
| P9 | **"Do not ship this section until every number has a denominator"** vs a proof strip containing `+20%` with no before→after and three invented denominators | S:1066 / S:1060–1065 | The strip is a mock-up, not a spec. |
| P10 | **"Numbers before adjectives… Always '3.5 → 7.8 minutes'"** vs `DAU +20%` | S:1203 / S:1063 | Same. |
| P11 | Trackers and Live Events **shipped** (R) vs **"went to Won't-Have"** (S) | R:HCL-b5 / S:1215 | S invented an illustrative trade-off that inverts the record. |
| P12 | **"Do not overstate the eval work you did"** vs an eval-scorecard hero image, four named quality metrics, and a regression-testing instruction | S:674 / S:636, 646, 651 | S warns against the exact thing its own spec asks for. |

---

## 6. Sentences that must never appear on this site — and the true sentence to use instead

The left column is either literal S example copy or the direct output of following S's spec.
The right column is the strongest sentence that survives the source record.

| # | NEVER WRITE THIS | WRITE THIS INSTEAD |
|---|---|---|
| 1 | Cold start 15.0s → **1.9s** | Cold start **15s → under 2s**, in 8 weeks |
| 2 | `15.0s ──▶ 1.9s / −87%` | `15s ──▶ under 2s` — and if a delta is needed, **`at least 7.5× faster`** or `≈87% faster` |
| 3 | Two Seconds — cutting cold start 15s → **1.9s** \| Aniket Agarwal *(page title)* | **Two Seconds — cutting cold start from 15s to under 2s \| Aniket Agarwal** |
| 4 | 15s → under 2s **(P75, low-end Android)** | 15s → under 2s · 8 weeks · **[NEEDS: percentile, device population, measurement method]** |
| 5 | Team: **4 engineers, 1 designer, no dedicated QA** | **[NEEDS: how many engineers? was there a designer? a QA function?]** — rendered visibly, or the Team row is omitted entirely |
| 6 | Timeline: 8 weeks, **Q1 2025** | Timeline: **8 weeks** (the only duration in the record) |
| 7 | I spent **my first eight weeks** on cold-start latency instead of **the engagement roadmap I was hired for** | **I diagnosed launch time as the adoption blocker before building engagement features. That took eight weeks.** |
| 8 | **I was asked to make the app more engaging. I made it faster instead.** | **The engagement work was queued. The app took fifteen seconds to open. I did the second thing first.** *(true to R:HCL-b2's "critical adoption blocker"; asserts no mandate)* |
| 9 | Session time 3.5 → 7.8 min · **enrolled cohort, post-launch** | Session time **3.5 → 7.8 min** · **[NEEDS: population, window, baseline period]** |
| 10 | Session time **+122%** *(next to 3.5 → 7.8)* | **3.5 → 7.8 min** — no percentage. Or **2.2×**, marked `[DERIVED]`. |
| 11 | **DAU +20%** · 12 weeks, 1M+ user base | **Engagement suite → DAU +20% over 12 weeks** · **[NEEDS: baseline DAU and denominator]** |
| 12 | Steps Premier League drove **+20% DAU** | **Steps Premier League moved session time. The engagement suite moved DAU.** *(two bullets, two initiatives, two numbers)* |
| 13 | Our north star was **week-2 → week-4 retention** | **We used session time as the north star** — R's own words. Then, if true: *"I'd argue for week-2→week-4 retention now, and here's why."* |
| 14 | **Six products taken 0→1** | **Two launches labelled 0→1 in my own record — Steps Premier League and AI Health Reports — plus a four-feature engagement suite.** Or `[NEEDS: confirm the full 0→1 list; each must be net-new, not a revamp]` |
| 15 | In two years I've taken **six features 0→1** | **At HCL I've taken two products 0→1 and shipped a four-feature engagement suite.** *(three of S's six predate Oct 2024)* |
| 16 | I've spent **two years** solving it for a **million people** | I've spent **nearly two years** on retention for a product with **1M+ registered users** |
| 17 | **Health apps are the hardest** retention problem in consumer software | **Health apps are one of the hardest retention problems in consumer software** *(S's own safer form, S:236)* |
| 18 | 2024 — now · **Product** · HCL Healthcare | 2024 — now · **Product Analyst** · HCL Healthcare · **[NEEDS: does "Product Analyst" match your offer letter?]** |
| 19 | 2023 · **Product** · Droom / Infinyte Club | 2023 · **Product Management Intern** · Droom · 2023 · **Product Operations** · Infinyte Club *(the conservative title per CG C3)* |
| 20 | Circle Health — **Insurance** claims | Circle Health — **claims journey** *("insurance" appears in no source)* |
| 21 | Infinyte Club — **Fintech** onboarding | Infinyte Club — **signup and KYC** |
| 22 | Droom — **Auto marketplace** | Droom — **[NEEDS: one-word category]**, or no descriptor |
| 23 | **Let the model write; let the rules decide.** The boundary belongs in the architecture, not the prompt. | **[NEEDS: describe how the report avoided giving medical advice — was it prompt-level, rule-level, template-level, or human review?]** Until answered, this belief is cut. |
| 24 | I built a report generator that will explain **your labs** and will not diagnose you — **the architecture is what enforces that** | **I built a personalised health report: requirements, UX flow, and the personalisation logic.** *(R:HCL-b4, verbatim scope)* |
| 25 | *Lab data → normalisation → clinical scaffolding → LLM → validation → escalation router → report* | **[NEEDS: the actual pipeline]** — no diagram until Aniket supplies it. A missing diagram costs less than a fabricated one. |
| 26 | **We measured opt-outs deliberately, and I'll tell you what we found.** | **Choosing competition meant accepting we'd alienate users who don't want to compete.** *(stop there — the cost is defensible; the measurement is not)* |
| 27 | **Trackers and Live Events went to Won't-Have for the quarter.** The Live Events team was not happy. | **[NEEDS: name one thing you actually put in Won't-Have, and who objected.]** R says Trackers and Live Events **shipped** — never claim they were cut. |
| 28 | I worked with **4 engineers and a designer**; my VP-Product **approved quarterly scope**, and I made the **within-quarter calls**. | **[NEEDS: team shape and decision rights]** |
| 29 | *"I open the app, stare at a splash screen, assume it's broken, and close it."* | **A 15-second splash screen on a mid-range phone is indistinguishable from a broken app.** *(an argument, not a quote)* |
| 30 | *"I know my step count. My phone already tells me. Why would I open your app to see it again?"* | **A step counter competes with the one already on the phone. It needs a reason to be opened that the OS widget doesn't have.** |
| 31 | *"My haemoglobin is **12.4**. Is that bad?"* | **Clinical results are delivered in units most people can't interpret.** *(no invented value, no invented quote)* |
| 32 | Alt: *"Cohort retention curve showing a drop from **62% to 31%** between week 1 and week 2"* | Alt: **"Reconstructed cohort retention curve; absolute values withheld. The shape shows the drop concentrated at week 2."** *(matches CG D-R5)* |
| 33 | The artifact drawer contains **2–4 real (redacted) artifacts** | **Reconstruction — drawn from memory of internal analytics. Shape and direction accurate, absolute values withheld.** *(CG D-R5)* — or the drawer is omitted |
| 34 | A **bundle treemap** of what the 25MB was made of | **25MB → 6MB.** Show the two totals. The composition is not in the record. |
| 35 | A **latency waterfall** breaking down the 15 seconds | **15s → under 2s.** Show the two totals. The phase breakdown is not in the record. |
| 36 | A **device-tier matrix** of cold start by RAM/network band | Cut. Every cell would be invented. |
| 37 | A **decision matrix** scoring content / incentives / gamification on effort, lift and reversibility | **Three strategies were on the table: content, incentives, gamification. I chose gamification.** *(R:HCL-b3)* Plus `[NEEDS: what criteria did you actually score them on?]` |
| 38 | Scores generated health text against a **hand-labelled golden set of 40 cases** | **Ships with a synthetic starter set of `{count}` cases, currently unlabelled** — count injected from the built JSON. Upgrade the sentence only after Aniket labels the set. |
| 39 | `jobTitle: "Product Manager"` *(JSON-LD)* | `jobTitle: "Product Analyst"` — the title in both R and L |
| 40 | `sameAs: ["https://github.com/Aniket4501"]` | Omit the GitHub entry until confirmed *(CG B6)* |
| 41 | Corporate health beneficiaries **aged ~25–45** | **[NEEDS: who are the users?]** — no demographic exists in any source |
| 42 | 1M+ users **reached through employer health plans** — distribution I inherited | **1M+ registered users.** *(keep "registered"; gate the channel claim on CG A4)* |
| 43 | **Median D30 retention is 15–25% and D90 is 6–10%** for health apps | Cite it with a live link, or cut it. No unsourced third-party benchmark on this site. |
| 44 | AI Health Reports **→ 15% incremental revenue** | **Cross-sell hooks in the report drove 15% incremental revenue** · `[NEEDS: 15% of what line, over what period, attributed how]` *(R attributes it to the hooks, not the product)* |
| 45 | The report **became a closing asset in five enterprise deals** | **Cited as a key USP in closing 5+ enterprise clients. I built the artifact; I did not own the sale.** |
| 46 | **CSAT improved 50%** | `[NEEDS: what scale, baseline → post, N, period]` — or drop the number and describe the outcome. **Never publish "3.1 → 4.2" as a stand-in.** |
| 47 | A **CI performance gate** stopped the win from decaying | `[NEEDS: was any guardrail put in place to stop the regression?]` — do not assert a CI gate |
| 48 | A **staged rollout with a holdback cohort**, a cohort-size test, a notification-timing test | `[NEEDS: what did you actually run — staged rollout, A/B, pre/post, or nothing?]` |
| 49 | Lighthouse **100/100/100/100** *(footer)* | Only after a real run, regenerated on every deploy — or omitted |
| 50 | `Currently: shipping [X]` | `Currently: [NEEDS: one clause — what is on your desk this month?]` — visible on the page |

---

## 7. Consolidated `[NEEDS:]` register

Every token this audit requires the site to render, deduplicated. If Aniket answers these, roughly
two-thirds of the fabrications above become publishable facts.

**Blocking — the site is visibly incomplete without them**

1. `[NEEDS: cold start — which percentile, which device population, measured by what method, to which event?]` *(kills B3, B4, B5, B15 and fixes proof-strip line 1)*
2. `[NEEDS: session time 3.5 → 7.8 min — measured on which population, over what window, against which baseline period?]` *(kills C2)*
3. `[NEEDS: DAU +20% — baseline DAU, denominator, and which 12 weeks?]` *(fixes proof-strip line 3)*
4. `[NEEDS: 15% incremental revenue — 15% of what line, over what period, attributed how?]` *(fixes D1)*
5. `[NEEDS: CSAT +50% — what scale, baseline → post, N, over what period?]` *(fixes F2)*
6. `[NEEDS: signup completion +100% — completion of what step, baseline rate, post rate, N?]` *(fixes F4)*
7. `[NEEDS: team shape per case study — how many engineers, was there a designer, was there QA, who approved scope?]` *(kills B6, X16)*
8. `[NEEDS: confirm the distribution channel — employer health plans, insurers, hospitals, or direct?]` *(kills A4 and everything downstream: X28, X29, X30, item 42)*
9. `[NEEDS: what data do the AI Health Reports consume?]` *(kills D3, and determines whether Grounded is genuinely an extension of the job — H7)*
10. `[NEEDS: how did the report avoid giving medical advice — prompt, rules, templates, or human review?]` *(kills D4, D5, D6, X9, X18, X25)*
11. `[NEEDS: one real failure with a consequence, per case study, plus one for /approach]` *(CG B1 — unchanged, still unmet)*
12. `[NEEDS: confirm the full 0→1 list — each must be net-new, not a revamp]` *(kills E1, E3, E4)*
13. `[NEEDS: one clause — what are you shipping this month?]` *(CG B4)*

**Non-blocking but must be visible or cut**

14. `[NEEDS: does "Product Analyst" match your offer letter, and which Infinyte/Circle Health title is correct?]` *(CG C3, C6)*
15. `[NEEDS: the exact degree name on the certificate]` *(CG C2 — until then, no discipline is named anywhere)*
16. `[NEEDS: confirm github.com/Aniket4501]` *(CG B6)*
17. `[NEEDS: one-word industry descriptors for Droom, Infinyte Club, Circle Health]` *(A5, A6, A7)*
18. `[NEEDS: was the engagement roadmap your assigned brief when you joined?]` *(B9, X7, X10)*
19. `[NEEDS: what did you actually run as an experiment on Steps Premier League?]` *(C13, X45)*
20. `[NEEDS: what criteria did you score content / incentives / gamification on?]` *(X32, X39)*
21. `[NEEDS: what actually went into Won't-Have, and who objected?]` *(X15 — and never claim Trackers or Live Events were cut)*
22. `[NEEDS: 25MB and 6MB measured as what — download size, install size, or APK/AAB?]` *(§4.3)*
23. `[NEEDS: interview counts and one anonymised verbatim quote for SPL and AI Health Reports]` *(CG N1 — until then, zero quotes on the site)*
24. `[NEEDS: can the app be named?]` *(CG N5)*
25. `[NEEDS: is publishing the internal product name "Steps Premier League" acceptable to HCL?]` — **new.** R names it, so it is truthful, but naming an internal, unlaunched-publicly product is a disclosure question this audit cannot resolve.

---

## 8. Summary of build-failure conditions

The build **fails** if any of the following appears in a shipped file:

- The string `1.9s` or `1.9 s`, anywhere — including titles, OG images, alt text, and JSON-LD
- `15.0s` (fabricated precision)
- `P75` or any percentile attached to the cold-start number
- `low-end Android` or `mid-tier Android` or `2–4GB RAM` as a stated measured population
- Any engineer, designer, or QA headcount
- `Q1 2025`, or any date attached to an HCL initiative
- `enrolled cohort` as the session-time population
- `1M+ user base` as the DAU denominator
- `six 0→1` / `six products taken 0→1` / `six features 0→1`
- Any of the four fabricated user quotes (X22–X25), or any user quote at all
- `62%` or `31%` in retention alt text; `3.1 → 4.2` for CSAT; `12.4` for haemoglobin
- The seven-stage AI Health Reports architecture, or the sentence "the architecture is what enforces that"
- Any claim that Trackers or Live Events were cut to Won't-Have
- `hand-labelled` describing Grounded's golden set, before it is labelled
- A hardcoded golden-set count
- `jobTitle` set to anything other than `Product Analyst`
- A latency waterfall, bundle treemap, device-tier matrix, cohort curve with values, or decision matrix with scores
- Any artifact drawer described as containing a "real" or "redacted" document
- `+122%` rendered adjacent to `3.5 → 7.8 min`
- `two years` in the headline (use `nearly two years`)
- `the hardest retention problem` (use `one of the hardest`)
- A timeline row rendering an internship as `Product`
- Any uncited third-party retention benchmark
