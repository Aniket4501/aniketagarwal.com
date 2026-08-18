# Content gaps — what Aniket must supply

Every item is a specific, answerable question. Nothing here is a request for "more detail."
Status legend: **BLOCKING** = the site is measurably weaker without it, and a `[NEEDS: …]` token is visible on the live page. **NON-BLOCKING** = handled with an honest hedge that costs little.

Last updated: Phase 0 (2026-08-19). Updated at every phase gate.

---

## Source conflicts

These come first because they are credibility issues, not content gaps. A recruiter opens the resume and LinkedIn side by side; these are what they find. **The site uses the more conservative version in every case and does not silently resolve any of them.**

### C1 — Stated years of product experience
- **Resume:** header reads `"1.5+ Years in Product Management"`
- **LinkedIn:** `HCL Healthcare · October 2024 - Present (1 year 11 months)`
- **Arithmetic:** Oct 2024 → 19 Aug 2026 is **22 months** at HCL alone.
- **Site uses:** no total-years claim at all. The site states `Oct 2024 – present` and lets the reader compute. The homepage headline says **"nearly two years"**, not "two years", because 22 months is not two years.
- **Question for Aniket:** do you want the site to claim "two years" (defensible from Oct 2026 onward) or keep "nearly two years"? And will you update the resume header, which currently undersells you by five months?

### C2 — Degree and programme name *(most dangerous conflict)*
- **Resume:** `"Dual Degree in Applied Geology, CGPA 8.13, 2019–2024"`
- **LinkedIn:** two separate entries — `"UG, Learning Sciences (2019–2024)"` **and** `"Master of Science - MS, Geological/Geophysical Engineering (2019–2024)"`
- **Why it matters:** three different degree names across two documents reads as carelessness at best.
- **Site uses:** the single most conservative and least specific true statement — `"Dual degree, IIT Kharagpur (2019–2024)"` with no discipline named, pending resolution. CGPA excluded per strategy.
- **Question for Aniket:** what is the exact name on the degree certificate? Make the resume, LinkedIn and site identical to it.

### C3 — Infinyte Club: job title
- **Resume:** `"Product Intern"` · **LinkedIn:** `"Product Operations"`
- **Site uses:** `"Product Operations"` — the more conservative of the two, because it claims less product ownership.
- **Question:** which was the actual title on the offer letter?

### C4 — Infinyte Club: duration
- **Resume:** `Feb'23 – Apr'23` (3 months) · **LinkedIn:** `February 2023 - May 2023` (4 months)
- **Site uses:** `Feb – Apr 2023` (the shorter claim).

### C5 — YourStory Media: duration
- **Resume:** `Jun'22 – Sep'22` (4 months) · **LinkedIn:** `June 2022 - October 2022` (5 months)
- **Site uses:** `Jun – Sep 2022` (the shorter claim).

### C6 — Circle Health: job title
- **Resume:** `"Product Intern"` · **LinkedIn:** `"Product Management Intern"`
- **Site uses:** `"Product Intern"` (claims less).

### C7 — The "1.9s" cold-start figure
- **Resume says:** `"delivered <2s launch time"` — an inequality, not a value.
- **Strategy document says:** `1.9s` in five separate places, including the recommended page title.
- **Neither the resume nor LinkedIn contains the number 1.9.** It appears to be the strategy author's illustrative rendering of "<2s".
- **Site uses:** `15s → under 2s` everywhere, and **never `1.9s`**, because 1.9 is not in the source record. This changes the recommended page title from the strategy's `"cutting cold start 15s → 1.9s"` to `"cutting cold start 15s → under 2s"`.
- **Question for Aniket — BLOCKING for precision:** what was the actual measured P75 figure at the end of the eight weeks? If it was 1.9s, say so and the site will use it.

### C8 — Campus roles (excluded from the site, logged for completeness)
CDC Departmental Representative: resume `Oct'21–Apr'22` vs LinkedIn `Sep 2021–Jun 2022`. Rajendra Prasad Hall GS: resume `Aug'21–Jul'22` vs LinkedIn `Aug 2021–Apr 2022`. Neither appears on the site, but both are visible on LinkedIn next to the resume.

### C9 — Roles on LinkedIn, absent from the resume
Tap Invest (2 mo), FundsTiger (2 mo), SurgiNatal (2 mo), Team KART, AIESEC, Communiqué. Not dishonest, but a reviewer sees a scatter of short stints on LinkedIn that the resume does not show. **Question:** are you willing to remove the sub-3-month non-product roles from LinkedIn?

### C10 — LinkedIn "About" contradicts the resume
LinkedIn summary reads `"strong interest in Product Management and Analytics… Looking forward to new opportunities"` — a fresher's summary. The resume claims roadmap ownership, PRDs and 0→1 launches. **Not a site issue, but it undoes the site.** Rewrite required.

### C11 — LinkedIn Top Skills
Currently `Product Analysis, Wireframing, Google Analytics`. These are the first thing a recruiter's eye lands on and they are 2019 signals. Reorder.

---

## Blocking gaps

*(Populated in full at Phase 3. Seeded at Phase 0 with what is already certain from the source inventory.)*

### B1 — One real, specific, owned failure with a consequence
**Required by:** `/approach` postmortem (mandatory), and the "What I got wrong" section of all three case studies (mandatory, Section 8 of the build spec).
**Status:** the source material contains **zero failures across seventeen resume bullets**. There is nothing to draw on and it cannot be invented.
**Question:** name one decision you made at HCL, Circle Health or Infinyte that did not work. What did you decide, what happened, what did it cost, and what do you do differently now? "I would have communicated more" is not an answer. One specific thing, with a consequence, per case study, plus one longer one for `/approach`.

### B2 — Denominators for every displayed metric
**Required by:** Section 0.4. No unqualified number ships.
Per metric, the missing fields are:
- **Cold start 15s → under 2s:** which percentile (the site claims P75 — **is that true?**), which device population, measured how (synthetic device lab? RUM? staged rollout pre/post?)
- **Session time 3.5 → 7.8 min:** measured over which population (enrolled league users only, or all DAU?), over what window, and against what baseline period
- **DAU +20%:** +20% relative to what baseline, on what denominator (of 1M+ registered, how many were DAU?), measured over which 12 weeks
- **Incremental revenue 15%:** 15% of what line, over what period, attributed how
- **CSAT +50%:** what scale (5-point? 10-point? NPS?), what baseline value, what post value, N of respondents, over what period
- **Signup completion +100%:** completion of what step, baseline rate, post rate, N
**Question:** for each of the six, give `before → after · population · timeframe · measurement method`. Where you cannot disclose absolute values, say so — "I can't share the base; the relative movement was X on a 28-day rolling cohort" is a strong sentence and the site will use it verbatim.

### B3 — Team shape and ownership boundary, per case study
**Required by:** the `OwnershipBlock` schema — `owned`, `shipped` and `notOwned` are all required fields and the build fails without them.
**Status:** the source material says only `"cross-functional collaboration with VP-Product and stakeholders"` and `"led cross-functional initiative with tech team"`. No headcount, no roles, no reporting line.
**Question, per case study:** how many engineers? Was there a designer? A QA function? Who approved scope? What decision could you make alone, and what needed sign-off?

### B4 — What you are shipping right now
**Required by:** the homepage status line, which currently reads `Currently: [NEEDS: …]`.
**Question:** one clause. What is on your desk this month?

### B5 — Real artifacts for the artifact drawers
**Status:** the working directory contains no PRDs, exports, briefs, matrices or screenshots. **The site therefore ships with hand-authored diagrams that reconstruct reasoning, each captioned as a reconstruction, and with no drawer that claims to contain a real document.** Nothing has been fabricated.
**Question:** can you export — redacted — any one of: a PRD section header list, an experiment brief, a cohort table, a prioritisation matrix, one anonymised product screenshot? One real artifact is worth three paragraphs of claim and it is the single largest upgrade available to this site.

### B6 — The GitHub URL
The resume links the word "GitHub" but the URL is not recoverable from the PDF text layer. `gh` is authenticated as `Aniket4501`.
**Question:** confirm `github.com/Aniket4501` is the right handle for the site footer and JSON-LD.

### B7 — Grounded: the hand-labelled golden set
The labels are the part that demonstrates domain judgment and they must come from Aniket, not from a model.
**Question:** will you hand-label the synthetic starter set the build ships with? Until you do, the page states the set is synthetic and unlabelled, which is honest but weaker.

---

## Non-blocking gaps

### N1 — A real user quote
"Based on user research" appears four times across the resume with no method, no N and no quote. The site states method and N where known and omits quotes entirely rather than inventing one. **Question:** how many users did you actually interview for Steps Premier League and for AI Health Reports, and can you supply one anonymised verbatim sentence?

### N2 — Testimonials
Two or three sentences from the VP-Product at HCL and the Circle Health manager would neutralise the "Analyst" title faster than any design decision. **The homepage omits the testimonial block entirely rather than showing a placeholder.** Ask both today — it has the longest lead time of anything on this list.

### N3 — A published losing experiment
Steps Premier League is the natural home. **Question:** did any variant lose? Cohort size, notification timing, anything.

### N4 — Custom domain
A `.vercel.app` URL materially reduces perceived seriousness. See the final report for exact DNS steps.

### N5 — The app's name
The site says "a health super-app" throughout because the product name is not in the source material. **Question:** can it be named?

---

## Redaction decisions

| # | Decision | Rationale |
|---|---|---|
| D-R1 | **The resume PDF is published unmodified, phone number included.** | Reversed from the initial instinct to redact. Reasoning: it is Aniket's own resume, the phone number is contact information he deliberately included so a recruiter can call him, and a resume that a recruiter cannot act on fails its only job. Unilaterally deleting content from his resume is also not my call. **This is a one-file reversal** — drop a redacted PDF at `public/aniket-agarwal-resume.pdf` and redeploy. Flagged in the final report. |
| D-R1a | The phone number appears **only** inside the PDF. It is not in any HTML, JSON-LD, metadata, or OG image. | Limits scraping exposure to the PDF itself rather than the indexed page body. |
| D-R2 | The strategy document is never published and never quoted. | It contains frank third-party assessments of Aniket's weaknesses. |
| D-R3 | The LinkedIn export PDF is never published. | Full employment history including roles deliberately excluded from the site. |
| D-R4 | No client, colleague, or employer-customer is named anywhere. | "5+ enterprise clients" and "20+ enterprise clients" stay unnamed — the source names none, and naming them would be invention. |
| D-R5 | Every reconstructed chart carries a visible caption: *"Reconstructed from internal analytics — shape and direction accurate, absolute values withheld."* | Costs nothing, buys credibility, and is true. |

---

## Assumptions made

| # | Assumption | Basis | How it is marked on the site |
|---|---|---|---|
| A1 | The HCL app's users arrive through employer health plans; the buyer is the employer, not the user. | Strategy §3.4.2, consistent with "healthcare super-app" + "enterprise clients" in the resume. | Stated plainly in copy as an inherited distribution channel — it is volunteered as a limit, not claimed as an achievement. |
| A2 | Cold-start work targeted low-end Android devices. | Strategy §P1 target users. **Not in the resume.** | Flagged in B2 — the site does not assert a device population until confirmed. |
| A3 | "1M+ users" means registered beneficiaries, not monthly actives. | The resume says "serving 1M+ users"; no activity qualifier. Conservative reading. | Site says "1M+ registered beneficiaries" and never "1M active users". |
| A4 | The 22-month HCL tenure is continuous and current. | LinkedIn "Present". | Site says "Oct 2024 – present". |
