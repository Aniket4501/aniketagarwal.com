# 01 — Narrative review

**Reviewer role:** Agent 1, Product Strategy Reviewer. Stance: VP of Product deciding what story this raw material actually supports.
**Reviewed against:** `docs/00-source-facts.md`, `Aniket_s_PM_Resume.pdf`, `Profile.pdf`, `CONTENT_GAPS.md`. The strategy document (`portfolio-strategy-aniket-agarwal.md`) is treated as a proposal to be audited, not as evidence.
**Date:** 2026-08-19. HCL tenure Oct 2024 → today = **22 months**.

**Standing rule applied throughout:** a claim is admissible only if it traces to a verbatim line in the resume or LinkedIn, or is an inference explicitly marked `[DERIVED]`. Where the strategy document asserts something the sources do not contain, I say so and name the line.

---

## Summary of verdicts

| # | Question | Verdict |
|---|---|---|
| 1 | Recommended positioning | **Fails on three independent counts.** Replacement supplied below in exact words. |
| 2 | Case-study ranking | **#1 confirmed and strengthened. #2 and #3 confirmed in order but both need substantial content changes; #3 is conditional and may need to be cut to a short case.** |
| 3 | The sentence that must land | Three sentences written below, each traced to source. |
| 4 | Weakest points | Four of the strategy's six are real; two are overstated. **Six more found, one of which is more dangerous than anything the strategy names.** |
| 5 | Must not appear | Strategy's list endorsed, plus **eleven additions — three of which the strategy document itself would have shipped.** |
| 6 | Biggest risk | Register/record mismatch. Named and bounded below. |

---

# 1. Does the evidence support the recommended positioning?

**Proposed line (strategy §4.2 Option 1, §11 Section 1, §14.1):**

> **Health apps are the hardest retention problem in consumer software. I've spent two years solving it for a million people.**

**Verdict: No. It fails on three independent counts, any one of which is enough to reject it.** The strategy's own confidence ("Why it wins… it's defensible") is not supported by anything in the working directory.

### Failure 1 — "the hardest retention problem in consumer software" is a comparative claim made from an N of 1

This is a superlative about the entire consumer software category. The strategy defends it with "published health-app benchmarks put median D30 retention around 15–25% and D90 down at 6–10%" — a figure that **appears nowhere in the source material** and is sourced only to the strategy author's own reading list (§Sources: "productgrowth.in").

Two problems. First, the benchmark, even if true, establishes that health apps retain *poorly*, not that health is *the hardest*. News, dating, and utility categories sit in comparable bands. "Hardest" is unfalsifiable in the direction that gets you attacked. Second and worse: **Aniket has worked in exactly one consumer category.** Nothing in the record gives him standing to rank health against consumer software generally. Media (YourStory), auto marketplace (Droom), fintech onboarding (Infinyte) and insurance claims (Circle Health) are 3–5 month internships, none of them retention work.

A Head of Product's response to that sentence is *"compared to what, and how would you know?"* — asked within thirty seconds, of a candidate with 22 months of experience. The sentence is written in the cadence of someone with a decade of category exposure. It is the single most coached-sounding line in the strategy document.

### Failure 2 — "two years" is 22 months, and it inflates past the candidate's own resume

`CONTENT_GAPS.md` C1 already flags this and resolves it correctly ("nearly two years… because 22 months is not two years"). The strategy overrides that in §4.2, §11, §14.1 and §4.3 without acknowledging it.

The aggravating fact: **the resume header says "1.5+ Years in Product Management."** Publishing "two years" on the site while the candidate's own resume says 1.5+ creates a discrepancy in the *inflating* direction, on the one document a recruiter will hold beside the site. Part 0 of the strategy spends 29 lines warning about exactly this failure mode and then commits it.

**Rule for the build: the site states no total-years figure. It states `October 2024 – present` and lets the reader do the arithmetic.** From October 2026 the two-year claim becomes literally true and can be revisited.

### Failure 3 — "solving it for a million people" is the serious one: there is no retention metric anywhere in the record

This is the finding that matters most in this entire review, and the strategy document does not contain it.

The positioning's load-bearing noun is **retention**. Here is every outcome metric in the HCL record, verbatim:

- b3: `"+122% session time (North Star Metric: 3.5 → 7.8 mins)"` — **session time**
- b5: `"→ +20% DAU within 12 weeks"` — **DAU**
- b2: `"delivered <2s launch time and reduced bundle size from 25MB to 6MB"` — **latency and bundle size**
- b4: `"15% incremental revenue"`, `"closing 5+ enterprise clients"` — **revenue**

Retention appears exactly twice in the entire source corpus, and both times as a **problem statement, never as a measured outcome**: b3's `"evaluated 3 retention strategies"` and b5's `"to address Week-2 retention drop-off"`.

**There is not one retention rate, one cohort curve value, one D-n figure, or one week-over-week return number in the resume, on LinkedIn, or in the working directory.** `CONTENT_GAPS.md` B2 lists six metrics needing denominators; not one of the six is a retention metric, because there isn't one to denominate.

Session time and DAU are engagement metrics. A Head of Product who reads "retention is what I do," scrolls, and finds only session time and DAU will not conclude the numbers are missing. They will conclude the candidate **does not distinguish engagement from retention** — which is a PM literacy question, not a documentation gap. That read is far more damaging than a missing denominator.

Two smaller problems in the same clause: "for a million people" — `CONTENT_GAPS.md` A3 establishes that 1M+ means *registered beneficiaries*, not actives. You cannot simultaneously describe a population as registered-not-active and claim to have solved retention *for* them; the sentence refutes itself for anyone who thinks about it for four seconds. And "solving it" is present-perfect-complete: it claims the problem is solved. Nothing in the record supports "solved."

### The strongest positioning the source material actually supports

The record's most valuable, most differentiated, most unfalsifiable fact is the reframe in b2. It requires no superlative, no comparative category claim, no tenure claim, and no retention number. It is the strategy's own Option 2, and it should be promoted to the hero.

**Recommended hero, exact words:**

> **The brief was engagement. The app took fifteen seconds to open.**
> **I spent eight weeks on that instead, and shipped it at under two.**
>
> Product at HCL Healthcare since October 2024 — engagement on a consumer health app with 1M+ registered beneficiaries, reached through employer health plans. Six products taken 0→1.

Trace of every clause:
- "The brief was engagement" — b1 `"prioritized engagement features"` + b1 `"defined product roadmap"`. `[DERIVED]`, conservative.
- "fifteen seconds to open" — b2 verbatim `"15s launch time"`.
- "eight weeks" — b2 verbatim `"in 8 weeks"`. **Note: "first eight weeks" is NOT supported — see §5, item 5.**
- "under two" — b2 verbatim `"<2s"`. **Never "1.9s"** (C7).
- "since October 2024" — L verbatim; no years claim.
- "1M+ registered beneficiaries, reached through employer health plans" — b1 `"1M+ users"` + A1/A3, stated as a limit rather than an achievement.
- "Six products taken 0→1" — b2/b3/b4/b5 + Infinyte + YourStory. `[DERIVED]` count; defensible, but if any one of the six is contested, drop to "0→1 launches" with no number.

**Why this is stronger than the original, not just safer:** it opens with a tension rather than a thesis, which is what actually drives scroll (strategy §2.2 Q3 says exactly this and then recommends a thesis anyway). It is a judgment signal delivered as a headline. And it makes seniority irrelevant — the physics of a 15-second cold start does not care how long you have been a PM.

### What would be needed to make the original work

If Aniket wants the category-difficulty frame, four things must arrive:

1. **One real retention number.** Week-2 → week-4 or D30 return rate for the Steps Premier League cohort, with `before → after · population · window · method`. Without this the word "retention" cannot appear in the positioning at all.
2. **A named, citable benchmark**, and a rewrite from superlative to specific: *"Health apps sit in the bottom quartile of consumer retention benchmarks — median D30 around 15–25% [source]"* — plus the honest caveat that he has worked one category.
3. **An active-user figure** (MAU or DAU absolute) to justify "for a million people," or the phrase changes to "for a million registered beneficiaries."
4. **October 2026** for the two-year claim, or drop it permanently.

Items 1 and 3 are questions for Aniket, not build tasks. Until they land, the recommended hero above ships.

---

# 2. Ranking the three case studies by hiring impact

**Strategy's order:** 1. Two Seconds · 2. Steps Premier League · 3. AI Health Reports.
**My order: the same — but the reasoning is different, my confidence in #1 is much higher than the strategy's, and #3 carries a cut condition the strategy does not contemplate.**

### #1 — Two Seconds. Confirmed, by a wider margin than the strategy claims.

This is the only case study in the record that survives contact with every one of the four evaluating personas simultaneously, and it is the only one whose numbers a sceptic cannot discount.

- **Head of Product** (most likely to spot inflated metrics, per §2.1): 15s → <2s and 25MB → 6MB are physical quantities. There is no attribution question, no denominator question, no "relative to what" question. Of the twelve usable metrics in `00-source-facts.md` §4, **M2 (bundle size) is the only one with a complete baseline, unit and timeframe.** M1 (launch time) is second-best. Every other metric in the record is missing two to four of the four required fields. This case study is built on the only two numbers that are already publishable.
- **VP/SVP** (reading for judgment under ambiguity): b2 is the record's only documented *reframe* — `"Diagnosed app performance as critical adoption blocker"` against a brief that was about engagement features. Strategy §2.3 ranks reframe as signal #1 at ★★★★★. It is correct about that.
- **Startup CEO** (can this person operate without me?): a PM who reprioritised away from their own mandate on evidence, without being told to, is exactly the answer.
- **Senior PM** (adversarial): this is the case study most likely to *survive* adversarial reading, because the attack surface is measurement method — and "P75 not mean, staged rollout not A/B, because you cannot randomise device capability" is a good answer that costs nothing to give honestly.

It also defends the two structural weaknesses simultaneously — the Applied Geology degree and the Analyst title — which no other piece of the record does.

**One correction to the strategy:** §P1 asserts the target population was "mid-tier Android devices (2–4GB RAM)". `CONTENT_GAPS.md` A2 correctly flags this as **not in the resume**. Do not assert a device population until Aniket confirms it. The case study works without it; it just says "on low-end devices" only if that is confirmed, and otherwise says nothing about device tier.

### #2 — Steps Premier League. Confirmed in position, but the strategy's version of it misrepresents the record.

**The asset is real and it is the option evaluation, not the outcome.** b3 verbatim: `"evaluated 3 retention strategies (content, incentives, gamification); led 0-to-1 Steps Premier League launch, prioritizing competitive mechanics"`. Three options, one choice, stated in the candidate's own source document. Strategy §2.3 ranks "an option you rejected and why" as signal #3 at ★★★★★. This is the only case study where that structure is documented rather than reconstructed.

**But the strategy quietly rewrites the metric, and that is a problem.** Strategy §P2 instructs: *"North star: week-2 → week-4 retention of the enrolled cohort (**not** session time)."*

The resume says the opposite. b3 verbatim: `"+122% session time (North Star Metric: 3.5 → 7.8 mins)"`. **Session time was the declared North Star.** Substituting a retention North Star on the site is not a reframing, it is a misstatement of what was actually measured — and it is unrecoverable if Aniket is asked in interview "what was your North Star?" and answers honestly.

There is a much better move available, and it solves a second problem for free. See §4, Defence 2.

**Why #2 and not #3:** three of the four evaluating personas (HoP, VP, Senior PM) rank option-evaluation above revenue attribution, because option-evaluation is a *judgment* signal and revenue attribution at this level is almost always a *participation* signal. Only the startup CEO reverses it.

**Condition on #2:** the population and window for `3.5 → 7.8 mins` must arrive (B2). If they cannot, the number does not go in the header block; it goes in the body with an explicit "I can't publish the base" sentence, and the case study is carried by the decision, not the outcome. That is still a good case study.

### #3 — AI Health Reports. Confirmed in position, but it must be rebuilt as a monetisation case study, not an AI case study — and it may need to be cut.

**I am challenging the strategy's content here more than its ranking.**

The strategy's §P3 specifies: a safety-boundary diagram as "the hero image and the most differentiated visual on your whole site"; a refusal/escalation layer; factual grounding rate; out-of-scope-advice rate; clinician-review pass rate; an eval scorecard with sample sizes; prompt regression testing against a golden set; and the architecture line *"the model writes the prose; deterministic rules decide the medicine."*

**Every one of those is absent from the source material.** b4 in full: `"Built 0-to-1 AI-powered Health Reports; designed product requirements, UX flow, & personalization logic; created cross-sell hooks driving 15% incremental revenue and serving as key USP in closing 5+ enterprise clients."` Not one word about safety, evaluation, hallucination, escalation, refusal, or clinical sign-off. LinkedIn carries no HCL bullets at all.

The strategy hedges once — *"Do not overstate the eval work you did"* — and then supplies four screens, a metrics list, an architecture diagram and a hero image built on material that does not exist. **This is the largest fabrication risk in the entire strategy document, and it sits in the case study aimed at the audience best equipped to detect fabrication.** The strategy scores it "Interview discussion potential: 10/10." As currently specified its interview discussion potential is *negative*: it invites a conversation the candidate cannot survive.

**What is actually here, and it is genuinely rare:** a consumer feature that became an enterprise sales asset. `"key USP in closing 5+ enterprise clients"` plus `"15% incremental revenue"` plus, at Circle Health, `"boosted renewals by 15% through YOY claims data analysis for 20+ enterprise clients"`. Two roles, two instances of product work landing in a commercial conversation. That is a real B2B2C thread and most consumer PM candidates cannot tell that story at all.

**Rebuild it as: "Who pays."** Title it around the three-party model — the beneficiary reads it, the employer buys it, the clinical stakeholder has to sign it off. Keep the AI as mechanism, not as subject. If Aniket confirms he *did* build refusal rules or a review path, add it then and it becomes the strongest case study on the site. Not before.

**Cut condition:** `"15% incremental revenue"` has no baseline, no unit, no period and no attribution method (M4 — the weakest metric in the HCL set; the only one missing all four fields). If Aniket cannot supply "15% of what line, over what period," this case study loses its only quantified outcome. **In that event, demote it to a 300-word short case and ship two full case studies plus Grounded.** Two strong studies beat three where one is hollow — the strategy says this itself in §6.2 ("Reviewers judge on the weakest study they read") and then does not apply it.

---

# 3. The single sentence that must land

One sentence per case study. Each is written to be the thing a reader retains if they retain nothing else. Each traces to source; trace notes follow each.

### Two Seconds

> **The roadmap I owned was an engagement roadmap. I spent eight weeks on a fifteen-second launch time instead, because every engagement feature I shipped onto that foundation would have been measured against users who had already left.**

*Trace:* "roadmap I owned" ← b1 `"defined product roadmap"`. "engagement" ← b1 `"prioritized engagement features"`. "eight weeks" ← b2 `"in 8 weeks"`. "fifteen-second launch time" ← b2 `"15s launch time"`. "users who had already left" ← b2 `"critical adoption blocker"`, `[DERIVED]` and defensible — an adoption blocker is by definition people not arriving.
*Why this one:* it contains the reframe, the cost he accepted, and the reasoning, in one breath — and it is the only sentence on the site that makes a reader think *"that is a decision I would have struggled to make."*

### Steps Premier League

> **I evaluated three ways to fix the drop-off — content, incentives, and competition — and shipped competition, because content and incentives buy attention you have to keep paying for, and competition manufactures a reason to open the app on the day your own motivation is gone.**

*Trace:* "three ways… content, incentives, and competition" ← b3 verbatim `"evaluated 3 retention strategies (content, incentives, gamification)"` (use "competition" for the chosen one, per b3 `"prioritizing competitive mechanics"`). "shipped competition" ← b3 `"led 0-to-1 Steps Premier League launch"`. The rationale clause is argument, not fact — permitted, and it is the part that shows judgment.
*Caution:* do **not** write "cohort analysis showed the drop-off was at week two." b3 names cohort analysis; b5 names Week-2 drop-off. Joining them across two bullets is a `[DERIVED]` inference about which analysis found which finding, and it is not needed — the sentence above works without it.
*Why this one:* the shape reviewers hunt for (options → choice → defended rationale), delivered in one sentence, with the trade-off legible.

### AI Health Reports

> **The beneficiary reads the report, the employer buys the programme, and the report is the thing that makes the programme legible at renewal — which is how a consumer feature ended up inside five enterprise closes.**

*Trace:* "five enterprise closes" ← b4 `"closing 5+ enterprise clients"` and `"serving as key USP"`. "the employer buys the programme" ← assumption A1, already logged and volunteered as a limit elsewhere on the site. "legible at renewal" is argument.
*Why this one:* strategy §2.2 Q8 is right that knowing *who pays* is rare and valuable in B2B2C, and this is the only sentence in the record that demonstrates it. It also deliberately says nothing about AI, which is what keeps it true.

---

# 4. The three weakest points the site must defend against

## 4.1 Verification of the strategy's six candidates

| Claim | Verdict |
|---|---|
| **(a) Title is "Product Analyst," not "Product Manager"** | **Real.** R: `"Product Analyst (Product Management)"`. L: `"Product Analyst"`. Both agree — no conservative reading available. The resume header `"Product Analyst with PM Ownership"` is itself the tell; it announces the anxiety it is trying to cover. Severity: **high** on recruiter/ATS filtering, **medium** on human read once scope is legible. |
| **(b) Single surface, inherited enterprise distribution** | **Half real, half overstated.** The *distribution* half is real and important — but note that "users arrive through employer health plans" is assumption **A1**, `[DERIVED]` from `"1M+ users"` + `"enterprise clients"`, not a source fact. Volunteering a derived limitation is safe (you can only harm yourself with it), so the site may state it. The *single surface* half is overstated: within HCL the record shows four distinct problem types — latency/bundle, gamification mechanics, generative AI, and an engagement suite. The real version of this weakness is different; see 4.2 (M4). |
| **(c) Metrics without denominators** | **Real, and the most severe on the list.** Audited against `00-source-facts.md` §4: of the twelve usable metrics (M1–M12), exactly **one** (M2) has a complete set of baseline / population / timeframe / method. M1 has baseline and timeframe only. **Nine of twelve are missing three or four of the four fields.** This is not a polish problem, it is the entire evidence base. |
| **(d) Unbroken record, no visible failure** | **Real.** Zero failures across seventeen resume bullets. `CONTENT_GAPS.md` B1 confirms it cannot be sourced and cannot be invented. Severity: **medium-high**, but the fix is one paragraph from Aniket, not a site defence — and Defence 2 below produces a genuine one at no cost. |
| **(e) Single-company exposure since Oct 2024** | **Overstated. I would drop this.** A 22-month tenure at a first product job is normal and expected. Nobody penalises it. The strategy is worried about the wrong shape; see M4 below for the version that is actually real. |
| **(f) Unearned AI claims** | **Real, and the strategy *understates* it** — because the strategy's own proposed remedy (§P3, rewriting AI Health Reports around safety boundaries and evals) *is itself the fabrication.* The claim is unearned in two directions: the resume skills line (`"LLM API Integration, Prompt Engineering, AI-driven Personalization"` with no artifact), and the case study the strategy proposes to write about it. Severity: **high**, and binary — ship Grounded, or delete the AI claim. |

## 4.2 Weaknesses the strategy missed

**M1 — There is no retention metric in the record, and the entire site is built on the word "retention."**
Detailed in §1, Failure 3. This is more dangerous than any item on the strategy's list, because it is not a missing number — it reads as a category error. **This is the most important finding in this document.**

**M2 — The declared North Star does not match the stated problem.**
b3 names session time as the North Star Metric; b5 names Week-2 retention drop-off as the problem. Session time is a poor North Star for a health app — a health app that works well may *reduce* session time (log your steps, leave). The strategy notices the objection (§P2: *"longer sessions can indicate friction rather than value"*) but resolves it by substituting a different North Star rather than by owning the original choice. An adversarial Senior PM finds this in ninety seconds.

**M3 — Repeated round numbers read as estimation, not measurement.**
`15% incremental revenue` (HCL), `boosted renewals by 15%` (Circle Health), `Boosted 15% user engagement` (YourStory). Three separate 15%s across three companies. Nothing dishonest — but on a single page a sceptic pattern-matches this to "estimated" rather than "measured." Two of the three are already Tier-C cuts, which resolves it; do not reintroduce them.

**M4 — The real tenure weakness is fragmentation before HCL, not single-company exposure at HCL.**
LinkedIn shows, in sequence: YourStory 5mo → Tap Invest 2mo → FundsTiger 2mo → Infinyte 4mo → Droom 3mo → Circle Health 3mo → HCL 22mo. A reviewer opening LinkedIn sees six stints of ≤5 months before the current job. The resume omits three of them, which means the resume and LinkedIn tell different stories about how the career was assembled (C9). The site cannot fix LinkedIn. Compress hard on the site: one timeline line per role, no bullets, as the strategy already specifies.

**M5 — "1.9s" is already an invented number in circulation, and it nearly shipped.**
C7. It appears in the strategy in five places including the recommended page title (§14.4), the SEO title pattern (§13.5), the signature `MetricDelta` example (§10.3), and the OG image spec (§13.9). It is in neither source document. **This is a live demonstration that the truth rules are load-bearing rather than ceremonial** — a plausible decimal entered a spec and would have been rendered ~20 times on the finished site.

**M6 — "my first eight weeks" invents a sequence.**
The record says the performance work took eight weeks (b2). It never says it came first. The strategy asserts "first eight weeks" in §4.2 Option 2, §11 Section 4, and §4.1. Drop "first" until Aniket confirms.

## 4.3 The three to defend against, and the exact defensive move

I am selecting on *what closes the tab*, not on *what is most embarrassing*. Notably I am **not** selecting (d) no-failure or (f) AI claims: (d) is solved for free by Defence 2, and (f) is a binary build decision (ship Grounded or delete the claim), not something copy can defend.

---

### Defence 1 — Metrics without denominators *(strategy's (c))*
**Why this one:** it is the multiplier. Every other asset on the site is expressed as a number. If numbers are discountable, the case studies, the proof strip and the hero all degrade to zero simultaneously.

**The exact defensive move is structural, not copy.** Make `denominator` a **required, non-nullable field on the `MetricDelta` Zod schema, and let the build fail without it** (strategy §13.4 already makes `notOwned` required; do the same here). Render the denominator at the same type size as the label — never smaller, never in a tooltip, never on hover. A denominator you have to hover to see is a denominator you are hiding.

And ship this exact copy wherever a base cannot be disclosed:

> *"I can't publish the absolute base. The relative movement was +122%, measured on the enrolled cohort over [window]. I attribute it directionally, not causally — this shipped alongside the engagement suite."*

That sentence makes every other number on the page more believable, not less.

---

### Defence 2 — The engagement/retention gap *(my M1 + M2, and the highest-leverage move available)*
**Why this one:** it is the only weakness that reads as a competence question rather than a documentation question.

**The move has two parts.**

**Part one — placement/copy:** the site's positioning noun becomes **engagement**, which the record supports. **The word "retention" appears on the site only where it appears in the record: as the problem, never as the outcome.** No "retention is the only lever," no "I own retention," no "/approach" belief built on the word.

**Part two — turn the hole into the missing postmortem.** Put this in the "What I got wrong" section of Steps Premier League, in the amber `--flag` callout:

> **What I got wrong: I let session time be the North Star.**
> *The problem I was solving was a week-2 drop-off. The number I reported was session time — 3.5 → 7.8 minutes. Those are not the same thing, and in a health app a longer session can just as easily mean the user couldn't find their step count. I never got a clean week-2-to-week-4 retention read on the enrolled cohort, which means I can tell you engagement moved and I cannot tell you retention did. I'd instrument the cohort first now, and pick the North Star second.*

This is the single most valuable paragraph available for this site. It is **true**, it costs nothing to write, it demonstrates metric literacy at exactly the point where the record looks illiterate, and it supplies the mandatory failure section (B1) that the source material otherwise cannot fill. It converts the biggest hole in the evidence into the strongest credibility purchase on the page.

---

### Defence 3 — The "Product Analyst" title *(strategy's (a))*
**Why this one:** it is the only weakness that operates *before* anything else is read. A recruiter filters on it; a Head of Product level-maps on it.

**The move is placement.** Keep it out of the hero — the strategy is right about that. But do **not** omit it: it is one click away on LinkedIn, and a title that is absent from the site and present on LinkedIn reads as concealment, which is worse than the title. **State it exactly once, flatly, inside the case-study header block, with the scope immediately beside it:**

> `Role       Product Analyst, HCL Healthcare`
> `I owned    What shipped on the engagement roadmap, and in what order`
> `I did not  The implementation, or the quarterly scope — that was approved above me`

No "with PM ownership." No paragraph explaining it. No defence. The `I did not` line does the work: bounding your own claim is the behaviour that makes the unbounded claims above it believable, and it is the fastest available substitute for the testimonials that do not yet exist (N2).

---

# 5. What must NOT appear on the site

I endorse the strategy's §3.5 exclusions without modification (CGPA, Open IIT medals, POR/campus roles, AIESEC/Communiqué/Team KART/SurgiNatal/FundsTiger/Tap Invest, "passionate," "data-driven," skills cloud, tool logo wall, hero portrait, IIT as lead credential, contact form). Below are eleven additions. **Items 1, 2 and 11 are things the strategy document itself specifies and would have shipped.**

| # | Must not appear | Why it costs more than it gains |
|---|---|---|
| 1 | **`1.9s`** — anywhere. Use `under 2s`. | Not in any source (C7). One fabricated decimal, rendered ~20 times by the signature component, invalidates every other number on the page. Highest-cost item here precisely because it is already in the spec. |
| 2 | **`"4 engineers, 1 designer, no dedicated QA"`** and any team-size or headcount figure. | Strategy §9.2 supplies this as example header copy and §12.5 supplies `"I worked with 4 engineers and a designer"` as a recommended rewrite. `00-source-facts.md` §8 lists team sizes as never-invent. A builder following the spec ships fabricated team shape on all three case studies. B3 must be answered by Aniket or the field is omitted. |
| 3 | **"Two years"** as a stated duration. | 22 months, and the candidate's own resume says "1.5+". An inflation that contradicts his own document, found in under four minutes, on the one page where credibility is the product. |
| 4 | **"Health apps are the hardest retention problem in consumer software"** as a bare assertion. | A superlative comparative claim from someone with one consumer category on their record and no citation in the working directory. Invites *"compared to what, and how would you know?"* from exactly the reader you need. |
| 5 | **"My first eight weeks"** — the word *first*. | The sequence is not in the record (M6). Small, but it is invented, and it is the kind of detail an interviewer confirms casually. |
| 6 | **The word "retention" in the positioning line, the hero, or any /approach belief.** | See Defence 2. It is the one word the evidence cannot support, and using it invites the one question that has no good answer. |
| 7 | **Any AI safety / eval / grounding-rate / refusal-layer / clinician-review content in AI Health Reports**, including the line *"the model writes the prose; deterministic rules decide the medicine."* | None of it is in b4. It would be presented in the round where it is tested hardest by the audience most able to detect it. If Aniket confirms he built it, add it then. |
| 8 | **"CSAT scores by 50%"** — even inside the 300-word Circle Health short case. | M8 has no scale, no baseline, no post-value, no N, no period. "50%" of a satisfaction score is ambiguous in a way that invites suspicion. One number nobody believes contaminates the numbers they would have believed. Supply the scale movement or describe the outcome qualitatively. |
| 9 | **"1M+ users"** unqualified, in any position. | Always `1M+ registered beneficiaries, reached through employer health plans`. The unqualified form is the single most inflatable fact in the record, and the qualified form is the strategy's own best line (§12.5). |
| 10 | **Any placeholder** — a testimonial slot, a "coming soon" case study, an empty /notes, a `[NEEDS: …]` token in a shipped hero. | The strategy applies this rule to the blog only. Extend it to everything: an empty slot advertises a gap that would otherwise have been invisible. Ship a smaller site. |
| 11 | **The ABDM/ABHA retention claim as fact** — strategy §P5's *"substantially higher 90-day retention for ABDM-synced cohorts versus manual-logging cohorts."* | No citation exists in the working directory. If the market note ships at all it ships as clearly-labelled opinion with the counterargument section intact, and this specific claim carries a source or is cut. |

---

# 6. The honest risk section

## The single most likely reason a strong Head of Product closes this tab

**Not the metrics. Not the title. It is the mismatch between the register of the writing and the weight of the record — and the moment it becomes visible is the timeline.**

Here is the sequence as it will actually happen. They read *"Health apps are the hardest retention problem in consumer software. I've spent two years solving it for a million people"* — a sentence with the cadence and authority of someone with a decade of category exposure and a portfolio of retention curves. They scroll. They reach the track-record strip in homepage Section 6 and see `2024 — now · HCL Healthcare`, preceded by four roles of three to five months each. They open LinkedIn in the next tab and find six stints under five months and an About section that reads *"strong interest in Product Management and Analytics… Looking forward to new opportunities"* (C10).

The problem is not that 22 months is too little — 22 months of owned engagement work on a 1M+ user product is a perfectly legitimate PM hire, and at several companies a strong one. **The problem is that they will now believe they were being sold to.** And a Head of Product who feels sold to does not raise the objection; they close the tab. They never tell you. That is why this risk is worth more attention than the ones that produce visible questions.

Every inflation in the current plan compounds this specific failure: "two years," the superlative, the invented team shape, the 1.9s, the retrospective eval framing on AI Health Reports. Individually each is small. Collectively they establish a pattern, and a reader who catches one begins auditing all of them — at which point the genuinely excellent, genuinely unfalsifiable material (15s → under 2s, 25MB → 6MB) gets discounted alongside everything else. **The record is strong enough that overclaiming is the only thing that can lose it.**

## What the site can do about it

- **Match the register to the record.** Write with precision instead of authority. At 22 months, *"here is the one decision I got to make, here is what it cost, and here is what I could not measure"* reads as excellent. *"Health apps are the hardest problem in consumer software"* reads as coached. Precision is a seniority signal that does not require tenure.
- **Volunteer every limit before the reader finds it.** The inherited distribution. The acquisition he has never owned. The retention read he never got (Defence 2). The Analyst title (Defence 3). Each one, stated first by him, converts a discovery into evidence of self-awareness. This is the highest-conversion move available and it costs four sentences.
- **Lead with the artifact that is seniority-independent.** The cold-start reframe. Physics does not care how long you have been a PM, and 25MB → 6MB cannot be discounted by a sceptic.
- **Be shorter than the strategy allows.** §12.1 budgets 6,000 words. For this record I would set 4,000, and I would ship two case studies rather than three if the third is hollow. Volume of prose is itself an implicit claim about how much there is to say.

## What the site cannot do about it

- **It cannot manufacture tenure, and every attempt makes the record look thinner rather than thicker.** This is the load-bearing constraint on the whole build.
- **It cannot produce five things that only Aniket can produce:** one real failure (B1), denominators for six metrics (B2), team shape (B3), one user quote (N1), and two testimonials (N2). Those are perhaps four hours of his time and they are worth more than the entire design and engineering effort combined. Testimonials in particular have the longest lead time and should be requested today.
- **It cannot fix LinkedIn (C10, C11, C9), and LinkedIn undoes it.** A site claiming owned engagement work beside a LinkedIn About written by a 2023 fresher is a contradiction the site amplifies rather than resolves. This is the highest-severity item in this review and it is the one item that is not on the build's critical path — which is exactly why it will get skipped. **It should be done before the site ships, not after.**

## What would change my assessment

If Aniket supplies a real week-2→week-4 retention movement for the Steps Premier League cohort with a population and a window, the original category-difficulty positioning becomes writable and this document's §1 should be revisited. If he supplies a real safety or review mechanism for AI Health Reports, case study 3 moves to position 2 and becomes the most differentiated conversation on the site. Absent both, the recommendations above stand.

---

*Prepared by Agent 1 — Product Strategy Review. Every claim in this document is traceable to `docs/00-source-facts.md`, the resume PDF, or the LinkedIn export. Where I have inferred, I have marked it `[DERIVED]`. Where the strategy document asserts something unsupported, I have named the section.*
