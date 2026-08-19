# Content gaps — what Aniket must supply

Every item is a specific, answerable question. Nothing here is a request for "more detail."
Status legend: **BLOCKING** = the site is measurably weaker without it, and a `[NEEDS: …]` token is visible on the live page. **NON-BLOCKING** = handled with an honest hedge that costs little.

Last updated: Phase 10 (2026-08-19), after the site shipped.

**Live:** https://aniketagarwal-com.vercel.app · **Repo:** https://github.com/Aniket4501/aniketagarwal.com

**26 visible `[NEEDS:]` markers remain on the site.** They are grouped below by the answer that
clears them, so one reply from you can close several at once. The site is honest as it stands and
every gate passes, but **it should not be sent to anyone until at least the first four groups are
answered** — a reviewer who counts twenty-six open questions reads a working draft, however good
the reasoning around them is.

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

**Thirteen questions. The site renders a visible `[NEEDS: …]` token for each one until it is answered.
Answering all thirteen is roughly two hours of Aniket's time and it is worth more than the entire
design and engineering effort combined.**

Derived from the adversarial truth audit (`docs/01b-truth-audit.md` §7) and the narrative review
(`docs/01-narrative.md` §4). Each is phrased as a question that can be answered in one or two
sentences.

### B1 — One real failure with a consequence, per case study, plus one for `/approach`
The record contains **zero failures across sixteen work bullets**. It cannot be sourced and it will
not be invented. The "What I got wrong" section is mandatory in every case study and currently renders
as a token.
**Question:** name one decision at HCL, Circle Health or Infinyte that did not work. What did you
decide, what happened, what did it cost, and what would you do differently? "I would have communicated
more" is not an answer.

### B2 — Cold start: the measurement, not the number
The site says `15s → under 2s · 8 weeks`, which is fully sourced. Everything about *how it was
measured* is missing, and the strategy document's answer (`P75, low-end Android`) is invented.
**Question:** which percentile — P50, P75, P90, or a mean? Which device population? Cold start to
which event — first frame, first meaningful paint, or interactive? Measured by a synthetic device
lab, production telemetry, or a staged-rollout pre/post comparison?

### B3 — Session time 3.5 → 7.8 min: population and window
**Question:** measured on league enrollees only, or on all daily actives? Over what window, against
which baseline period? Was session time defined as a median or a mean?

### B4 — DAU +20%: baseline and denominator
The resume attributes this to the **engagement suite**, not to Steps Premier League. The site keeps
that attribution.
**Question:** +20% relative to what baseline DAU? DAU as a share of what — the registered base, the
enrolled base, or MAU? Which twelve weeks?

### B5 — 15% incremental revenue: what line, what period
The weakest metric in the record — the only one missing all four required fields. The resume
attributes it to the **cross-sell hooks**, not to the reports as a whole.
**Question:** 15% of what revenue line, over what period, attributed how? **If this cannot be
answered, case study 3 loses its only quantified outcome and is demoted to a 300-word short case.**

### B6 — Signup completion +100% (Infinyte)
**Question:** completion of which step, baseline rate, post rate, N?

### B7 — Team shape and decision rights, per case study
The `OwnershipBlock` requires `owned`, `shipped` and `notOwned`. The record contains only
"cross-functional collaboration with VP-Product and stakeholders". **No headcount will be invented** —
the strategy document supplies three different engineer counts in four places, which is proof its
number is illustrative.
**Question, per case study:** how many engineers? Was there a designer? A QA function? What could you
decide alone, and what needed sign-off?

### B8 — The distribution channel
The entire B2B2C framing rests on this, and it is currently an unconfirmed assumption (A1).
**Question:** how do users arrive — employer health plans, insurers, hospitals, or direct consumer
signup? And who is the paying customer?

### B9 — What the AI Health Reports actually consume
Not stated anywhere. This also determines whether Grounded is genuinely an extension of the job.
**Question:** lab results, self-reported data, wearable data, or claims data?

### B10 — How the report avoided giving medical advice
**The single highest-value answer on this list.** The strategy proposes a seven-stage architecture and
the sentence *"the model writes the prose; deterministic rules decide the medicine."* None of it is in
the record, so all of it is cut.
**Question:** was the boundary enforced at the prompt, by deterministic rules, by fixed templates, by
human review, or not at all? **If you built any of it, case study 3 becomes the strongest piece on the
site and moves to position 2.**

### B11 — The 0→1 list
The resume explicitly labels two (Steps Premier League, AI Health Reports). "Revamped QuickSell"
contradicts the 0→1 label. The site currently claims only the two.
**Question:** list the products you took 0→1 and confirm each was net-new rather than a revamp.

### B12 — What you are shipping now
Renders on the homepage as `Currently: [NEEDS: …]`.
**Question:** one clause. What is on your desk this month?

### B13 — The golden set for Grounded
The harness ships with a **16-case synthetic starter set, explicitly marked unlabelled**. The labels
are the part that demonstrates domain judgment and they must come from you, not from a model.
**Question:** will you review and hand-label the set? Until you do, the page says the set is synthetic,
which is honest but weaker than it needs to be.

---

### Secondary — visible but lower cost

| # | Question | Kills |
|---|---|---|
| B14 | Does "Product Analyst" match your offer letter? Which Infinyte and Circle Health titles are correct? | C3, C6 |
| B15 | What is the exact degree name on the certificate? Until answered, **no discipline is named anywhere on the site**. | C2 |
| B16 | Confirm `github.com/Aniket4501` is your public handle. | Omitted from JSON-LD until confirmed |
| B17 | Was the engagement roadmap your assigned brief when you joined, or one you defined? | The hero currently assumes you defined it, which is the conservative reading |
| B18 | What did you actually run on Steps Premier League — staged rollout, A/B, pre/post, or nothing? | The experiments section |
| B19 | What criteria did you score content / incentives / gamification on? | The decision matrix's scores |
| B20 | What actually went into Won't-Have, and who objected? **Never claim Trackers or Live Events were cut — the resume says they shipped.** | The MoSCoW rewrite |
| B21 | Were 25MB and 6MB download size, install size, or APK/AAB? | The bundle metric's method |
| B22 | Is publishing the internal product name "Steps Premier League" acceptable to HCL? | A disclosure question this build cannot resolve |
| B23 | Can the app be named? | The site says "a consumer health app" throughout |

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


---

## Where every remaining marker is, grouped by the answer that clears it

Answer these in order. Group 1 alone removes seven markers.

### Group 1 — Team shape and duration (7 markers)
`content/work/two-seconds.mdx:8` · `steps-premier-league.mdx:8,9` · `ai-health-reports.mdx:8,9`

**One answer covers all five case-study header fields:** for each of the three pieces of work, how
many engineers, was there a designer, was there a QA function, and how long did it take from first
analysis to launch? Two Seconds already has its eight weeks; the other two have nothing.

### Group 2 — What the two headline numbers were measured on (4 markers)
`home.mdx:59,67` · `two-seconds.mdx:28` · `steps-premier-league.mdx:27`

- **Cold start:** which percentile, on which device population, read from what — a device lab,
  production telemetry, or a staged pre/post comparison?
- **Session time:** measured on league entrants or on everyone active, over what window, and is
  3.5 → 7.8 a median or a mean?

These two answers turn the proof strip from qualified-with-questions into simply qualified.

### Group 3 — The postmortem (1 marker, and the highest-value one)
`content/approach.mdx:47`

One decision that did not work: what you decided, what happened, what it cost, and what you would
put in its place. Not "I would have communicated more." Every reviewer who read `/approach` said the
open slot is well-constructed but that an answer beats a well-constructed absence.

### Group 4 — The AI Health Reports case study (6 markers)
`ai-health-reports.mdx:24,30,63,99,146,222`

This case study is the weakest of the three and all six markers are in it:
- 15% of which revenue line, and over what period were the 5+ closes?
- Who pays, and how do readers arrive — employer health plans, insurers, hospitals, or direct?
- What data do the reports consume — lab results, self-reported data, wearables, or claims?
- Where did the cross-sell hooks sit relative to the clinical content, and what did you rule out?
- **How did the report avoid giving medical advice — prompt, rules, templates, review, or not at
  all?** A real answer here moves this case study to the front of the site.

### Group 5 — Method and guardrails (5 markers)
`two-seconds.mdx:114,241` · `steps-premier-league.mdx:140,170,202`

- Was the cold-start rollout staged by device tier, and was the comparison pre/post within tier?
- Was any guardrail put in place afterwards to stop the win regressing?
- What did you actually score content, incentives and gamification on?
- Was Steps Premier League a holdback, a staged rollout, or a straight pre/post?
- Were notification opt-outs and uninstalls watched at launch?

### Group 6 — Everything else (3 markers)
- `two-seconds.mdx:36` — were 25MB and 6MB download size, install size, or APK/AAB?
- `steps-premier-league.mdx:43` — did the week-2 finding drive this league, the engagement suite, or
  both? (The record puts them in different bullets, so the site keeps them apart.)
- `kyc-wall.mdx:23,56` — baseline signup completion rate and N, and what share completed KYC after
  the nudges.
- `lab/grounded.mdx:65` — who with clinical training can review and correct the sixteen labels?

---

## What the site will NOT do, whatever is missing

- It will not invent a denominator, a team size, a date, a percentile, a device population, an
  experiment design, a user quote, or a failure.
- It will not claim "two years" until October 2026.
- It will not name a degree discipline until C2 is resolved.
- It will not describe the golden set as hand-labelled until it is.
- `scripts/check-truth.ts` enforces 21 of these mechanically, over source and built HTML, and fails
  the build on a hit.
