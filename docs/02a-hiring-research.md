# 02a — Hiring-side portfolio research

**Agent 2a.** Researched 2026-08-19. Audience for this document: the builder agents (design, content, architecture) and a human auditor.

**How to read this file.** Every finding is written as a **RULE** a builder can apply. Each rule carries an evidence tag:

| Tag | Meaning |
|---|---|
| `[V]` | **Verified.** I fetched the source page and read the claim. URL given. |
| `[V-snip]` | Claim came from a search-result summary only; I did not fetch the full page. Treat as weaker. |
| `[INF]` | **My inference.** Reasoned from the evidence above it or from the specific facts of this project. Not a sourced claim. |
| `[LOW-SRC]` | Verified that the source says it, but the source is commercial content marketing with no primary citation. Directionally useful, not quotable. |

**Source-quality warning that applies to this whole field.** There is almost no peer-reviewed or employer-published data on PM portfolio evaluation. The literature is dominated by recruiting firms, PM training vendors and SEO content farms who all have a commercial interest in telling you portfolios matter. I have flagged this per-source in §10. Where I found a first-person account by someone who actually sat in the reviewer's chair, I have weighted it heavily and said so.

---

## 1. Executive summary — the eight findings that should change the build

1. **The strategy document's recommended site headline is factually contestable and its own cited evidence contradicts it.** "Health apps are the hardest retention problem in consumer software" does not survive a benchmark check. See §7.1. **This is the single highest-priority correction in this document.**
2. **In India — Aniket's primary market — a PM portfolio is table stakes, not differentiation.** ~40% of PMs in Asia have one vs ~10% in the Americas, and Indian JDs frequently request one. The site cannot win by existing; it wins only on artifact tier and writing quality. See §6.1.
3. **The reviewer clock is not "5–10 minutes." It is bimodal:** a ~10-second homepage verdict gate, then either zero or an unbounded deep read (one documented case: a Series C VP spent "nearly an hour"). Design for the gate and for the deep reader; the middle does not exist. See §4.
4. **The strategy recommends three different headlines across site, LinkedIn and resume.** Sourced hiring-side guidance says divergent headlines destroy trust in all three. See §7.2.
5. **The strategy's own homepage proof-strip example commits the unfalsifiable-metric error it bans** ("DAU +20% · 12 weeks, 1M+ user base" — a registered-user count is not the denominator of a DAU delta). See §7.4.
6. **The "eval suite" claim in the strategy is accurate and, if anything, understated** — but the strategy buries the artifact that proves it in homepage section 5 of 6, while the documented AI-PM reading order opens the live URL *first*. See §5 and §7.5.
7. **49% of hiring managers now treat heavily AI-generated application material as a red flag** (n=1,500, Aug 2026). This site is being built by AI agents. The prose style is now a hiring risk in its own right, and the strategy does not address it at all. See §6.4.
8. **The strategy mandates four separate confessions of failure** (one per case study plus a postmortem) against a source record that contains zero documented failures. That forces either fabrication or triviality. Reduce to one substantive owned failure. See §7.6.

---

## 2. What makes a PM portfolio succeed — the hiring side

### 2.1 The three things reviewers are actually buying

**R1.** Build every page against three signals, in this order: **outcomes, judgment, visible artifacts.** `[V-snip — craftuplearn/underdog cluster]` A 2026 survey-based framing puts the same trio as "product sense under ambiguity, execution and measurement honesty, strategic judgment when the data is thin, and cross-functional pull." `[V — https://www.kore1.com/product-manager-interview-questions-2026/]`

**R2.** Lead each case study with the **result in the first paragraph**, then tell the story of how you got there. Reviewers should not scroll past context to find what happened. `[V-snip — designcase.app]` This is a direct instruction to invert the classic Problem → Research → Solution → Impact order.

**R3.** The portfolio's job is to *confirm you can do the job*, not to impress. A hiring manager quoted after hiring a mentee: *"The portfolio really helped. It gave me confirmation you can do the job."* `[V — https://www.news.aakashg.com/p/product-manager-portfolio]` Write to the standard of **confirmation of competence**, not demonstration of brilliance. Brilliance-seeking is what produces over-design.

**R4.** Interviews are described by senior operators as low-signal — one Affirm product leader: *"Interviews are terribly low signal. You're going to get some right, you're going to get some wrong."* `[V — same]` **[INF]** This is why artifacts convert: the portfolio is the only part of the loop the reviewer trusts because it is not performed under time pressure. Every design decision that makes the site feel *performed* (animation, marketing copy, a pitch tone) works against the one advantage the medium has.

### 2.2 Metrics — the exact form that survives a sceptical reader

**R5.** Use the achievement form **"Achieved [Y] by [Z]"**, never "responsible for [X]." Worked example from the source: not *"Launched an AI chatbot to improve support"* but *"Built an AI support agent that cut ticket volume 22% and reduced time-to-value 40%."* `[V-snip — craftuplearn]`

**R6.** A senior answer names **"a metric, a date, and a financial trigger"**; a mid-level answer names **"a feeling."** *"Both answers can be honest, but only one belongs in the senior seat."* `[V — https://www.kore1.com/product-manager-interview-questions-2026/]` Apply this to written copy: any sentence describing a decision should be able to name the metric, the date, and the trigger.

**R7.** Show **counter-metrics**, not just success metrics. Explicit red flag: candidates who cite *"DAU as their only success metric"* or cannot *"name two or three counter-metrics."* Strong answers track *"what might break, not just what should move"* — the example given is *"Retention up, support tickets up, NPS down."* `[V — same]` The strategy already calls these guardrails; this source confirms their absence is a *scored* red flag, not just a missed opportunity. **Guardrails are mandatory in every case study, not a bonus.**

**R8.** *"The shape of the answer matters more than the number cited."* `[V — same]` **[INF]** This is the release valve for this specific project. Aniket cannot disclose most absolute values (see `CONTENT_GAPS.md` B2). A named metric, a named counter-metric, a named measurement window and a stated attribution limit will read as more senior than a bigger number with none of those. **Do not treat the disclosure constraint as a weakness to be hidden; the shape is what is being graded.**

**R9.** Hiring managers penalise *"vague or generic descriptions of previous job responsibilities"* — 42% of 1,500 US hiring managers name it as a negative. `[V — https://www.cpapracticeadvisor.com/2026/08/13/ai-written-applications-are-now-the-2-red-flag-in-hiring/188492/, reporting Resume Genius 2026 Hiring Trends Report, n=1,500]`

### 2.3 Ownership

**R10.** **Ambiguity about ownership defaults to the least generous reading.** A senior product designer and former technical recruiter who has reviewed hundreds of portfolios: *"If I can't tell whether you ran the usability test, synthesized it, or just sat in on it, I have to assume the least."* `[V — https://emilybackes.design/post/what-i-actually-look-at-in-a-portfolio-review]`

This sharpens the strategy's "I did not own" device. The device is good, but the **"I owned"** line must be at least as specific as the "I did not" line, or the reviewer applies the least-generous default to everything you left vague. `[INF]`

**R11.** *"A common mistake is to focus too much on what 'the team' achieved. The hiring manager is more interested in what **you** contributed."* `[V — https://aatir.substack.com/p/how-to-create-a-product-manager-portfolio]` Corroborated independently. `[V-snip — designfolio]`

### 2.4 Friction, failure and the "edited" tell

**R12.** *"A portfolio with zero visible friction anywhere doesn't read as accomplished. It reads as edited."* `[V — emilybackes.design]` This is the best available formulation of the failure requirement and it should be the internal test: **is there visible friction anywhere on this site?** Not "is there a postmortem section."

**R13.** What earns continued reading is *"A number. A decision. A trade-off you'd make differently."* `[V — same]` Note the third item: **a trade-off you'd make differently** is a lower evidentiary bar than a failure, and it is explicitly listed as sufficient. See §7.6 for why this matters enormously for this project.

**R14.** Portfolios that *"end at launch without addressing outcomes suggest a designer who disengages after shipping."* `[V-snip — uxfol.io]` Every case study must extend past ship to measured outcome **and** to what was learned after.

### 2.5 The philosophy / "how I work" page

**R15.** Build it, keep it to **300–500 words**, and make each belief a proof-point that a case study then evidences. The claim is that hiring managers reread the philosophy section before deciding to call back, because it is the part hardest to fake. `[V-snip — prodfolio.io]` `[LOW-SRC]` — this is a portfolio-tool vendor and I could not fetch the full article; treat the "hardest to fake" claim as a plausible assertion, not a finding.

**[INF]** The strategy rates this section very highly (§5.1: "the single most under-built and highest-leverage section in the category"). I could not find independent hiring-side confirmation of that ranking. I would rate it **high-value but second to the artifact**, because it is unfalsifiable prose and this audience discounts unfalsifiable prose. Build it, but do not let it absorb effort that belongs to Grounded or to the case-study decision sections.

---

## 3. What makes a PM portfolio fail

**R16.** *"The fastest way to lose me is still a homepage that makes me guess what you do."* `[V — emilybackes.design]` The homepage must answer "what does this person do" in the first line of text, above any claim about the world.

**R17.** Process without outcome kills. *"I don't care how many rounds of testing you ran if you can't tell me what changed because of them."* `[V — same]` And: *"a portfolio full of screens and process steps tells you the designer was present, while a portfolio that shows the reasoning behind each key decision tells you the designer can think."* `[V-snip — uxfol.io]`

**R18.** **Reviewer attrition is real and it hits case study three.** *"By the time I got to case study three, I wasn't reading anymore."* `[V — emilybackes.design]` See §7.5 — this has a direct consequence for where Grounded and the AI case study sit.

**R19.** Two symmetric failure modes: *"revealing too little (generic descriptions of features)"* and *"trying too hard (elaborate case studies about insignificant projects)."* `[V-snip — productmanagerjobboard]` The second is the live risk for the Infinyte and Circle Health material — the strategy correctly caps them at 300 words. Hold that cap.

**R20.** Generic positioning loses. Being positioned *"too broadly"* rather than specifying a focus area is a named rejection cause. `[V-snip — designfolio]` Corroborated from the hiring side: *"40% of candidates are at risk of rejection at screening stage without domain experience"* and hiring managers value candidates who have *"solved problems in similar domains (e.g., Fintech, Healthcare)."* `[V — https://www.mindtheproduct.com/uk-hiring-managers-reveal-the-realities-of-hiring-product-managers/]`

**R21.** Content quality beats presentation, consistently and in every source I read. *"A clean Notion page with strong content beats a beautiful website with weak content"* `[V-snip — productmanagerjobboard]`; *"demonstrating clear thinking and measurable results is far more important than design prowess"* `[V — https://underdog.io/blog/product-manager-portfolio-examples]`. **The design budget is capped by this. If the content is not finished, do not spend another hour on design.**

**R22. The market evidence for the strategy's "Tier 1/2" claim is real and I verified it independently.** A 2026 roundup of 26 real, named PM portfolio sites describes every single one in purely visual-design terms — "bold gradients," "playful illustration," "pastel-toned," "smooth Webflow transitions," "soft visuals." **Not one is described as leading with metrics or outcomes.** `[V — https://www.sitebuilderreport.com/inspiration/product-manager-portfolios]` **[INF]** This is the strongest available evidence that an evidence-led, metric-led PM site is genuinely differentiated in the aesthetic-portfolio market. It is *not* evidence that it is differentiated among serious candidates for serious roles — that population is not in this sample.

---

## 4. How much time reviewers spend, and in what order they read

### 4.1 The clock

There is no single number. There are three regimes. Anyone quoting one number is quoting one regime.

| Stage | Time | Source |
|---|---|---|
| CV / recruiter screen | *"a handful of seconds"* | `[V — mindtheproduct]` |
| Homepage verdict | **~10 seconds** — *"Ten seconds on the homepage."* | `[V — emilybackes.design]` |
| Any web page, general | <15s average; page mostly viewed 10s or less; users read at most ~28% of words, 20% more likely | `[V-snip — NN/G research summary; see https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/]` |
| Grasping one project's impact | *"in 30 seconds"* | `[V — underdog.io]` |
| One case study, if earned | **2–3 minutes** — *"Two or three minutes per case study if it earned them."* | `[V — emilybackes.design]` |
| Attention exhausted | **at case study three** | `[V — emilybackes.design]` |
| A strong case study, engaged reader | ~8 minutes | `[V-snip — aiandproduct.com]` `[LOW-SRC]` |
| Deep read, converted reader | **"nearly an hour"** — a Series C VP read one candidate's portfolio for nearly an hour before the interview, then *"flipped the interview to a sales call"* and hired her | `[V — https://www.news.aakashg.com/p/product-manager-portfolio]` |

**R23.** **Design for a bimodal reader, not an average one.** There is a 10-second gate and, past it, an unbounded deep read. Optimise the gate ruthlessly (one line, four numbers, three doors) and then make depth genuinely available. There is no reader who spends exactly seven minutes. `[INF from the table above]`

**R24.** Budget the **required** reading path, not the total site content. The required path — hero, proof, one case study — should be under ~1,200 words. Optional depth should be as deep as the material honestly supports. See §7.3 for why this contradicts the strategy's site-wide word cap.

### 4.2 The order they read in

Synthesised from the sources; each step tagged.

1. **Homepage headline** — "what do you do." Failure here ends the session. `[V — emilybackes.design]`
2. **Outcomes / numbers.** Impact must be graspable in 30 seconds. `[V — underdog.io]`
3. **One case study** — result first, then story. `[V-snip — designcase.app]`
4. **Ownership check** — "was this you or the team." `[V — emilybackes.design, aatir]`
5. **Consistency check** — is there a point of view across projects, is it the same person each time. Backes lists "consistent point of view across projects" and "clear designer type identification" as sequential checks. `[V — emilybackes.design]`
6. **Philosophy** — reread before the call-back decision. `[V-snip — prodfolio]` `[LOW-SRC]`

**For AI PM roles the order is different and it is documented explicitly:** *they "open the live URL first," "search for the eval suite next," and "read the reflection section last."* `[V — https://shipset.app/blog/ai-pm-portfolio-projects]`

**R25.** **The site must satisfy two different reading orders.** A generalist PM reader starts at the headline and works down. An AI-PM reader starts by looking for something to click and run. If Grounded is only reachable at homepage section 5, the AI-PM reader has already failed their first search. See §7.5.

**R26.** Scanning is F-shaped: two horizontal sweeps then a vertical scan down the left edge. `[V-snip — NN/G]` Consequences: (a) the load-bearing word of every heading goes **first**, not after a subordinate clause; (b) the left edge of the case-study column must carry the argument on its own — this is exactly what the strategy's "bold the load-bearing sentence" rule achieves, and it should be enforced as a content-gate, not a style preference.

---

## 5. 2026 AI-PM hiring criteria, and a verdict on the "eval suite" claim

### 5.1 Verdict: the strategy's claim is ACCURATE, and traceable

The strategy (§3.2, §7 Project 3, §7 Project 4) claims that in 2026, AI-PM hiring managers screen for **a shipped AI product, a written case study with real numbers, and a demonstrable eval suite**, and are **openly sceptical of LinkedIn-only AI PMs**.

I found the near-verbatim source:

> *"one shipped product (even a side project), one written case study with real numbers, and one demonstrable eval suite"* — without these, candidates *"do not get the loop."*
> *"Hiring managers in 2026 are skeptical of LinkedIn-only AI PMs."*
> `[V — https://www.institutepm.com/knowledge-hub/how-to-become-an-ai-product-manager-2026]`

**Caveat:** that source is a PM training/certification vendor and has a commercial interest in the claim. `[LOW-SRC]` **However, it is independently corroborated on the substantive point by a recruiting firm writing to employers**, which has a different commercial interest:

> Eval set design is *"the single biggest separator and the one most JDs skip entirely."* Interviewers probe whether candidates understand *"what a golden set is,"* have built one, and can discuss *"LLM-as-judge versus human raters versus structured rubrics, and can talk about when each one breaks."*
> Real AI PMs *"lead with the eval set, the failure modes, and the rollback plan. The model and the prompt come up after the user story is clear."*
> Red flags: no concrete eval-set example; answering production issues with *"we monitor for hallucinations"*; never having *"been on call for a model."*
> `[V — https://www.kore1.com/how-to-hire-ai-product-manager-2026/]`

And by a third, on the filter mechanic:

> *"If you can walk through golden dataset design, LLM-as-judge tradeoffs, and regression suite maintenance in a panel interview without being coached, you're in the top quartile of candidates."*
> *"Asking candidates to describe the eval set behind the AI product they're proudest of shipping is a key filter — strong AI PMs answer it crisply, while PMs who happen to work near AI struggle to give a real answer."*
> `[V-snip — KORE1 AI PM interview questions 2026 cluster]`

**R27.** The strategy's eval-suite claim stands. **Build Grounded.** The three-artifact requirement is real enough, and consistent enough across sources with opposing commercial incentives, to be treated as a hard gate for AI-PM applications.

### 5.2 What the eval work must actually contain — sharpen Grounded against this

These are technical specifics from 2026 eval practice that Grounded should visibly satisfy. All verified.

**R28. Golden set: 20–50 hand-curated real failures is enough for a first useful signal.** *"Twenty to fifty real failures from manual testing, bug reports, and early user feedback are enough to produce a useful first signal."* Quality over quantity; cases must be *"unambiguous enough that independent reviewers reach the same verdict."* `[V — https://amplitude.com/blog/ai-evals-for-product-managers]` — The strategy's 40 hand-labelled cases sits correctly inside this range. **Do not inflate it.**

**R29. Composition matters and there is a published shape:** ~10 happy-path, ~6 edge cases, ~4 adversarial, for a 20-row suite. `[V — shipset.app]` **[INF]** Scaled to 40, publish the composition explicitly on the page — the *composition table* is a stronger judgment signal than the case count.

**R30. Validate the judge and publish the agreement rate.** Requirement: *"A judge should agree with your manual ratings before you trust it to replace them,"* with a **minimum 90% agreement** before deployment, and the warning that *"generic judge templates agreed with human experts only 52–58% of the time."* `[V — https://www.lovelaice.com/resources/ai-evals-for-product-managers-complete-guide-2026]` — The strategy's instruction to report judge agreement honestly ("if it's 84%, say 84%") is exactly right and now has a benchmark to be reported against. **Report the number *and* the 90% bar it is being measured against.**

**R31. One failure mode per judge.** *"one failure per judge"* is a stated discipline. `[V — same]` Grounded's four dimensions (grounding / scope / escalation / readability) should therefore be **four separate judges or checks, not one composite prompt**. Say so on the page — it is a two-sentence detail that signals real practice.

**R32. Name the offline/online distinction.** Offline evals gate releases against the golden set; online evals monitor live traffic and feed new failures back into the golden set. *"production failures inform golden dataset expansion."* `[V — same]` Grounded is an offline harness. **Say that it is offline-only and say what the online half would be.** Naming the boundary of your own tool is the same senior move as the "I did not own" line.

**R33. Push deterministic checks as far as they go before reaching for a judge.** Code-based checks are *"objective, rule-based validation — format compliance, schema validation, exact matches — with zero cost and instant execution."* `[V — same]` This directly validates the strategy's "deterministic rules vs LLM-judge" comparison as *the* interesting experiment in the project. Keep it, and publish cost and latency alongside catch-rate.

**R34. Frame evals as a PM-owned artifact, not an engineering one.** *"the PM doesn't approve the eval, the PM owns it"*; *"AI quality is a product problem wearing an engineering costume."* `[V — same]` One sentence on the Grounded page claiming ownership in these terms is worth more than any feature.

### 5.3 The wider AI-PM market context

- *"30% of open PM jobs in 2026 are AI PM roles. Less than 5% of senior PMs in the market have shipped a working AI agent."* The author frames a ~12-month arbitrage window before saturation. `[V — https://substack.com/@aakashgupta/note/c-251919242]` `[LOW-SRC]` — no methodology given for either figure. Treat as a directional market read from a well-connected practitioner, not data.
- *"20% of PM job posts mention AI, up from 2% in 2023"*; AI fluency demand grew *"nearly sevenfold between 2024 and 2026."* `[V — https://blog.productmanagementsociety.com/how-to-get-hired-as-a-product-manager-in-2026/]` `[LOW-SRC]` — uncited.
- AI PM roles reportedly pay a **15–40%** premium over comparable classic PM roles. `[V — institutepm]` `[LOW-SRC]`
- **Counterweight.** A tech recruiting firm reporting *"hundreds of conversations with hiring managers and recruiters"* argues the opposite emphasis: what matters is *"lived experience"* — having *"shipped AI-powered products in production environments, not just demos or experiments"* — and explicitly lists **side projects** among the overrated signals, alongside certifications and buzzword knowledge. `[V — https://www.mbassett.com/blog/ai-product-managers-2026/]`

**R35. Reconcile the counterweight rather than ignoring it: position Grounded as a *supplement to*, never a *substitute for*, the shipped production AI work.** Aniket has shipped generative AI in production in a regulated domain (AI Health Reports). That is the rarer asset. Grounded's job is to make the *eval* claim concrete, not to be the AI credential itself. **[INF]** Concretely: on `/lab/grounded`, the first sentence should tie the tool to the production problem it came from, not present it as a standalone build. A reader who reads Grounded as "candidate did a weekend AI project" has read it exactly wrong, and that reading is the one the sceptical recruiter above is primed for.

**R36.** Rejected AI-PM portfolio archetypes, named explicitly: *certificate stacks* ("I took an AI course"), *Notion frameworks without shipped work* ("I have ideas"), and **thin API wrappers without measurement** ("I built a chatbot"). `[V — shipset.app]` The third is why an "ask my portfolio anything" chatbot is disqualifying on this specific site — see §9.

**R37.** The canonical AI-PM case prompt is a failure-management scenario: *"Your customer support agent is hallucinating 4% of the time. What do you do?"* Strong answers cover **failure taxonomy → fallback flows → eval infrastructure → prioritisation.** `[V-snip — KORE1 cluster]` **[INF]** The AI Health Reports case study should be written so that it *is* the answer to this question in the health domain. If a reader finishes it and cannot restate Aniket's failure taxonomy and escalation path, the case study has failed at its only job.

---

## 6. Market context specific to this candidate

### 6.1 India: the portfolio is table stakes, not a differentiator

Survey of 325 PMs plus conversations with 15 hiring managers (5 per geography):

- Portfolio adoption: **Americas ~10%, Europe/Australia ~20%, Asia & Middle East ~40%.** Globally 16% have one, 61% know of them but don't, 23% have never heard of one.
- *"In India, many PM job postings even ask for a portfolio."*
- The explicit conclusion: in regions where portfolios are uncommon they provide differentiation; **in regions where they're common they are "virtually a must to have a good one."**
`[V — https://substack.com/@aakashgupta/note/c-57985088 and https://www.news.aakashg.com/p/product-manager-portfolio]`

**R38.** **Do not build on the assumption that having a portfolio is the differentiator.** Against Indian competition roughly 40% of whom have one, the site's differentiation must come from (a) real numbers with denominators, (b) a genuinely usable artifact, (c) writing that reads like an operator. Everything else is parity. `[INF from the above]`

**R39.** **Referrals still dominate distribution in India** — *"Most Indian startups don't rely entirely on job portals; referrals, community groups, and LinkedIn outreach matter far more."* `[V-snip — productleadership]`; referred candidates are *"3–5x more likely to land interviews"* `[V — productmanagementsociety]` `[LOW-SRC]`. **[INF]** The strategy's Stage 7 distribution plan is therefore under-weighted relative to its 150-hour build. The single highest-ROI use of the finished site is as the *thing you attach to a warm intro*, not as a thing that gets found. Build the OG image and the three-sentence pitch to be pasteable into a DM, because that is the actual delivery vehicle.

### 6.2 Domain

**R40.** Healthcare domain depth is an **asset in this market, not a cap**, contrary to the strategy's framing that it "reads as domain hire." *"40% of candidates are at risk of rejection at screening stage without domain experience"*; hiring managers explicitly value having *"solved problems in similar domains (e.g., Fintech, Healthcare)."* `[V — mindtheproduct]` **[INF]** The correct handling is not to de-emphasise healthcare but to make it **legible as transferable problem-shapes** (retention, habit formation, regulated generative AI, B2B2C monetisation) so a non-health reader can map it. The strategy's "proving ground, not identity" formulation achieves this; keep it, but do not shrink the health signal, because for the healthtech segment of the target audience it is the screening criterion.

**R41.** A named Head of Product on what she wants to hear: *"Tell me what metrics are driving business value."* `[V — mindtheproduct, Hannah Simpson, Head of Product, Waggel]` The bridge from product metric to business metric must be explicit on the page, not left as an inference.

### 6.3 Title

**R42.** For **ATS-parsed surfaces (resume, LinkedIn)**, exact title match matters mechanically. `[V-snip — airesume.guru]` For the **site**, which is not ATS-parsed, lead with scope. But: *"Keep your LinkedIn and resume aligned, and ensure your bullet points genuinely support any title adjustments you make"*, and the honesty test is *"Can I confidently describe this work in an interview?"* `[V-snip — same]`

**R43. Placement rule.** The literal title "Product Analyst" must appear **exactly once** on the site, in the timeline or About, stated flatly. It must not appear in the hero and it must not be argued with. A reviewer who cross-checks LinkedIn and finds the site never uses the real title reads it as concealment — which costs more than the title does. `[INF, built on R42 and on the sourced consistency rule in R44]`

### 6.4 The AI-generated-content risk — the strategy does not address this at all

- **49% of 1,500 US hiring managers now treat heavily AI-generated application material as a red flag** — ranking second only to job-hopping (65%), despite 58% of the same managers using AI to screen. `[V — https://www.cpapracticeadvisor.com/2026/08/13/ai-written-applications-are-now-the-2-red-flag-in-hiring/188492/, reporting Resume Genius 2026 Hiring Trends Report, n=1,500]`
- **49% report candidates frequently cannot defend AI-assisted claims in interviews.** `[V-snip — same cluster]`
- Detection is not tool-based. Managers *"spot generic phrasing, templated structure, and tone mismatches."* *"What gets applications rejected is generic impersonal content, not whether AI was used or not."* `[V-snip — phrasly/susit cluster]`
- Corroborated on the PM side: a hiring manager rejected a candidate who was *"evidently reading out from ChatGPT, with all responses being accurate textbook definitions using the right buzzwords."* `[V-snip — careerfoundry]`

**R44. THE DEFENSIBILITY TEST — apply to every sentence that ships.** Every sentence on this site must be one Aniket can expand on for 90 seconds under hostile questioning. If he cannot, it is deleted, regardless of how good it sounds. This is a build gate, not a guideline. `[INF, directly from the 49%-cannot-defend finding]`

**R45. Anti-LLM-prose rules for the content agent.** These are tone signatures that now read as machine-written to a 2026 reviewer, independent of whether they are true:
- Triads. Three-item parallel lists in consecutive sentences.
- "Not just X, but Y." "It's not about A — it's about B."
- Em-dash-heavy rhythm used for emphasis in every paragraph.
- Openings like "In today's landscape," "As the industry evolves," "Here's the thing."
- Uniform paragraph length. Real writing has a two-word paragraph in it somewhere.
- Section headers as abstract nouns ("Impact," "Learnings," "Reflection"). The strategy's "every header is a claim" rule already fixes this — enforce it.
- Perfectly balanced pro/con framing with no actual position taken.
`[INF, from the detection-signal sources above]`

**R46.** Consistency of voice across the site is itself now a screened signal — tone mismatch is a named detection cue. **One writer's voice, or it reads as assembled.** If multiple agents draft sections, one pass must rewrite the whole site end to end. `[INF]`

---

## 7. Where I disagree with the strategy document

I am not ignoring any of these; each is stated with what I think should change and why.

### 7.1 The recommended site headline is not defensible — and the strategy's own evidence argues against it

**Strategy §4.2, Option 1 (recommended as *the* site headline) and §14.1:**
> "Health apps are the hardest retention problem in consumer software."
> Justification given: *"it's defensible — published health-app benchmarks put median D30 retention around 15–25% and D90 down at 6–10%, so the claim survives fact-checking."*

**Three problems.**

1. **The cited numbers do not support the claim; they weaken it.** A D30 of 15–25% is a *good* retention number for a consumer app. In an aggregated benchmark table, 15–25% D30 is the *Finance/Fintech* band, and Health & Fitness sits at **6–8%** D30 — mid-table, and materially *better* than Mobile Gaming at 3–5%. `[V — https://apsteq.com/blog/app-retention-benchmarks/, citing Adjust 2023 / Sensor Tower 2024 / AppsFlyer 2023]` So on one reading the strategy's own figures overstate health-app retention, and on the other the category is not the worst.
2. **I traced the strategy's figures to a single uncited source.** The 15–25% D30 / 6–10% D90 pairing appears verbatim on `productgrowth.in`, an Indian healthtech content-marketing site that provides **no external citation for any number in the article** and **never claims health apps are the hardest retention category.** `[V — https://productgrowth.in/insights/healthtech/health-app-retention-guide/]`
3. **Benchmark sources disagree violently with each other** — I saw D30 for health/fitness quoted as 3–4%, 6–8%, 8–12% and 27.2% across sources in a single search. `[V-snip — businessofapps/lovable/snoopr/retentioncheck cluster]` **[INF]** Any superlative built on this literature is indefensible by construction, because the counter-source always exists.

**Why this matters more than it looks.** The strategy's whole rationale for Option 1 is that *"it opens with a claim about the world, not about you, which is how senior people talk."* A claim about the world is exactly the kind of thing a Head of Product will spend ten seconds checking — and the strategy explicitly invites the check. **A headline that loses a fact-check in the first ten seconds poisons every number below it.** This is the same failure mode the strategy spends Part 0 warning about, relocated from the resume to the hero.

**R47. Replace the superlative with a falsifiable first-person claim.** The claim should be about what Aniket did, not about the category ranking. Options that keep the framing benefit without the exposure:
- Strategy Option 2 (the reframe frame) — *"I was hired to make a health app more engaging. I spent the first eight weeks making it faster..."* This is already in the document, is unfalsifiable-by-third-parties because it is his own history, and carries the #1 judgment signal in the headline slot. **[INF] I would promote Option 2 to the site headline and demote Option 1 entirely.**
- If the category-difficulty frame is retained for its hook value, it must be reduced to a first-person, non-superlative statement of the mechanism — e.g. a claim that health apps have to earn a return visit against a benefit the user feels annually, which is a *mechanism* claim rather than a *ranking* claim, and cannot be refuted by a benchmark table. **[INF]**
- **Do not publish any D30/D90 benchmark number on the site.** If a benchmark must be cited, cite the specific source, its year, and its measurement basis inline — and expect that a reader who checks will find a different number.

### 7.2 Three different headlines across three surfaces contradicts the trust rule

**Strategy §4.2** recommends Option 1 for the site, Option 5 for LinkedIn; **§14.1** then gives a *third* LinkedIn headline formulation.

**Sourced rule:** *"If your portfolio homepage headline, resume summary, and LinkedIn headline don't say the same thing, the reviewer won't trust any of them."* `[V-snip — designfolio]` This is the same mechanism as Part 0 of the strategy, applied one layer up: the strategy correctly demands the *facts* reconcile, then recommends the *positioning* diverge.

**R48.** **One positioning claim, used across site hero, LinkedIn headline, resume summary and the three-sentence pitch.** Vary the length and the phrasing; never vary the claim. If the LinkedIn audience genuinely needs the commercial framing, then the commercial framing is the positioning — pick it once and use it everywhere. `[INF from the above]`

### 7.3 The 6,000-word site-wide cap is the wrong constraint

**Strategy §12.1:** *"Total readable text across the entire site: under 6,000 words."*

The reasoning (reviewers consume 1,250–2,500 words) is sound. The constraint derived from it is not: it caps *available* depth as well as *required* depth. The documented behaviour of a converted reader is *"nearly an hour"* on one portfolio `[V — news.aakashg.com]`, and *"their existence signals rigour even to readers who never open them"* is the strategy's own correct argument for collapsed depth (§12.2).

**R49.** Replace the cap: **required reading path ≤ ~1,200 words** (hero + proof + one case study's load-bearing sentences); **optional depth uncapped**, subject only to being genuinely load-bearing and honest. The failure mode to guard against is padding, not length. `[INF]`

### 7.4 The homepage proof strip, as specified, breaks the strategy's own denominator rule

**Strategy §11, Section 2:**
```
DAU                        +20%        12 weeks, 1M+ user base
```
A 1M+ **registered** user count is not the denominator of a DAU movement, and `00-source-facts.md` A3 already records that "1M+" means registered beneficiaries, not actives. Presenting it in the denominator slot is precisely the unfalsifiable-metric error the strategy bans in §1.3 and §3.4.3 — and it is in the one section the strategy says *"Do not ship this section until every number has a denominator."*

Same section: `SESSION TIME 3.5 → 7.8 min · enrolled cohort, post-launch` has no baseline window and no comparison population; `ENTERPRISE AI Health Reports → USP in 5+ closes` is not a metric at all and sits in a metric grid.

**R50.** Every proof-strip cell must carry **population, timeframe, and measurement basis** — and where the population is unknown (per `CONTENT_GAPS.md` B2, all six are currently unknown), the cell does not ship. **[INF]** Practical consequence for the build: **the proof strip may launch with two cells, not four.** Two qualified numbers beat four where two are hollow — and the empty space is itself a signal to this audience. The strongest candidate for a fully qualified cell is bundle size (25MB → 6MB), because it is physical and needs no population at all.

**R51.** Do not put a non-metric in a metric grid. The enterprise line belongs in prose or on the case-study card, not in the proof strip. `[INF]`

### 7.5 Grounded is buried, given the documented AI-PM reading order

**Strategy §11** places "Built (Grounded)" at homepage **section 5 of 6**, after the four beliefs. **Strategy §14.4** simultaneously calls it *"the load-bearing item for AI-PM credibility."*

Against: AI-PM reviewers *"open the live URL first"* `[V — shipset.app]`, and general reviewer attention is exhausted around case study three `[V — emilybackes.design]`. Section 5 is past both.

**R52.** Give Grounded a **first-class entry point above the attention cliff**: a `Lab ↗` item in the primary nav that goes straight to the working demo (not a lab index page), plus a one-line pointer inside the hero block. The homepage section can stay where it is as the fuller treatment. `[INF]` This costs nothing and fixes the ordering mismatch without restructuring the page.

**R53.** Related ordering consequence: **the AI case study is currently third**, which is the slot where reading demonstrably stops. If AI PM roles are a target, either promote it to second, or accept that its function is served by Grounded and write it for the reader who arrives from Grounded rather than from the top of the homepage. **Decide this deliberately; do not leave it to card order.** `[INF]`

### 7.6 Four mandated failure confessions, against a record containing zero

**Strategy §9.2** makes "What I got wrong" a *mandatory, no-exceptions* section in every case study; **§5.1 and §11** additionally require a postmortem on `/approach`. That is four confessions.

`CONTENT_GAPS.md` B1 records that the source material contains **zero failures across seventeen resume bullets**, and that nothing can be invented. So the four slots will be filled either by fabrication (a build failure under the truth rules) or by four trivial admissions — and four trivial admissions read *worse* than one real one, because the pattern becomes visible as a format rather than as honesty.

The evidence bar is also lower than the strategy assumes. What sustains a reviewer is *"A number. A decision. **A trade-off you'd make differently.**"* `[V — emilybackes.design]` — and the test is whether there is *visible friction anywhere*, not whether each case study has a confession section.

**R54.** **One real, owned, consequential failure, placed in the highest-traffic case study.** The other case studies carry *"what I'd do differently now, with more context"* — a different and honestly available claim that the strategy itself lists as a senior signal (§2.2 #6). Keep the `/approach` postmortem only if the one real failure is substantial enough to carry a longer treatment; otherwise the case-study placement is stronger, because it sits next to the work it damaged. `[INF]`

**R55.** Do not build a schema field or a template slot that *forces* a confession into every case study. A required field guarantees the format-compliance reading. `[INF]` (This modifies the strategy's §13.4 discipline argument — `notOwned` as a required field is good and should stay; a required `mistake` field is not.)

### 7.7 The visual direction contains an internal contradiction

**Strategy §10.2** bans, as look #1: *"Warm cream background + high-contrast serif display + terracotta accent."*
**Strategy §10.3** then specifies: `--paper #F6F5F2` (warm-neutral off-white), a **text serif for all long-form case-study prose**, and `--flag #B4551F` **burnt amber**.

`#B4551F` is, to a reader's first impression, terracotta. The mitigations in the strategy are real — the serif is body not display, and the amber is restricted to error callouts — but **first impressions are formed from palette and type at a glance, before usage rules are legible.** `[INF — this is my judgment, not a sourced finding.]`

**R56.** Either (a) shift `--flag` off the terracotta axis entirely — a desaturated red-brown or a slate-blue "correction" colour reads as instrument annotation rather than as the 2026 template accent — or (b) keep the amber but ensure the *first screen* a reviewer sees contains none of it, so the initial palette read is paper/ink/green only. **[INF]** I lean (a): the amber's whole job is to be identifiable while scrolling, which means it will be visible early, which is exactly the collision.

**R57.** No source I found supports design investment beyond legibility and speed, and several explicitly rank content over presentation (R21). **Cap design iteration.** The one place design earns its keep on this site is the metric-delta component, because it renders the positioning; everything else should be finished, not perfected. `[INF]`

### 7.8 Unverifiable anecdotes are doing load-bearing work in the strategy

Strategy §1.1 and §1.2 cite: a weekend-built Notion page that produced offers; a B2B PM who published a redacted PRD and reported the messy trade-offs were more convincing; a growth PM who published 23 experiments (five wins, three surprises, fifteen failures); a Senior PM whose "Product Philosophy" page was the reason hiring managers reached out; and hiring managers describing Tier 2 sites as *"a job description with better typography."*

**I could not verify any of these.** They may be real; I found no trace of them, and the quoted phrase returns nothing.

**R58.** None of these anecdotes may be repeated as fact anywhere in the build, in copy, or in an interview. `[INF]` The underlying *principles* (publish artifacts, publish failures, write a philosophy) are independently supported by the sources in §2 and should be followed on that basis instead.

### 7.9 The artifact drawer, as specified, cannot honestly ship

**Strategy §9.2:** *"the artifact drawer. A collapsed panel ... containing 2–4 **real (redacted) artifacts**: a PRD excerpt, the experiment brief, the cohort export, the decision matrix."*
**`00-source-facts.md` §6 / `CONTENT_GAPS.md` B5:** there are no PRDs, exports, briefs, matrices or screenshots in the working directory, and none will be fabricated.

A drawer labelled "Artifacts" that contains only self-authored diagrams is a promise of evidence that opens onto reasoning. For a sceptical reader who opens it expecting a document, that is a worse outcome than no drawer — it converts a neutral absence into a discovered overclaim.

**R59.** Until a real redacted artifact exists, label the component for what it contains — **"Reasoning, reconstructed"** or **"How I worked this out"** — and keep `D-R5`'s caption on every reconstruction. Reserve the word *artifact* for the day a real one is added. `[INF]` This also preserves the upside: R5's business rule (one real artifact beats three paragraphs of claim) still applies the moment Aniket can export one, and the component is already there to receive it.

### 7.10 Testimonials: right instinct, wrong container

**Strategy §5.1** rates testimonials very highly for neutralising the "Analyst" title. The instinct is right — third-party attestation is the fastest fix for a title problem — but a quote hosted on the candidate's own site is unverifiable by construction, and this audience discounts unverifiable claims (that is the entire premise of §1.3 of the strategy).

**R60.** Ask for **LinkedIn recommendations**, not site testimonials, and then quote them on the site **with a link to the public recommendation**. Same words, verifiable source, one click for the sceptic. `[INF]` This costs the referee no extra effort and converts the weakest content type on the site into one of the strongest.

---

## 8. Junior vs senior — the concrete tells

Reference table. Left column is what a reviewer sees; right column is what they conclude. Quotable items are in italics with sources.

| Reads JUNIOR | Reads SENIOR |
|---|---|
| Jumps *"to solutions before scoping the problem"*; lists features immediately `[V — kore1 PM questions]` | Reframes the problem before solving it; states what the brief said vs what the evidence said |
| Names *"a feeling"* as the reason a bet would be killed `[V — same]` | Names *"a metric, a date, and a financial trigger"* `[V — same]` |
| Calls roadmap execution *"strategy"* `[V — same]` | Distinguishes the two and shows the multi-quarter shape |
| Cites *"DAU as their only success metric"*; cannot name *"two or three counter-metrics"* `[V — same]` | Publishes guardrails: *"Retention up, support tickets up, NPS down"* `[V — same]` |
| Ownership unclear — reviewer *"has to assume the least"* `[V — emilybackes]` | Bounds ownership explicitly in both directions: what was decided, and by whom else |
| Process volume as evidence — *"how many rounds of testing you ran"* with no outcome `[V — same]` | Reasoning behind each key decision; screens as evidence not as content |
| No visible friction anywhere — *"reads as edited"* `[V — same]` | One real failure with a consequence; *"a trade-off you'd make differently"* `[V — same]` |
| Framework names as credentials | The cut the framework produced, and who objected |
| Ends at launch `[V-snip — uxfol.io]` | Ends at measured outcome, then at what was learned after |
| *"accurate textbook definitions using the right buzzwords"* `[V-snip — careerfoundry]` | Domain-specific, non-transferable detail that could only come from having been there |
| Depends on *"detailed step-by-step recipes for inherently ambiguous situations"* `[V-snip — Shreyas Doshi]` | Invents an approach fitted to the specific situation |
| Scope = individual initiatives; works inside the product team `[V — amycmitchell.substack.com]` | Drives to a decision *"even when there isn't enough information"*; sought out for advice `[V — same]` |
| Asks zero clarifying questions before proposing — *closes at roughly half the rate* of those who ask two or more `[V — kore1 PM questions]` | Names the objection before the reader raises it |
| College achievements, CGPA, positions of responsibility given weight | Credentials as a footnote |
| **AI-specific:** leads with the model and the prompt `[V — kore1 AI hire]` | **AI-specific:** *"lead with the eval set, the failure modes, and the rollback plan"* `[V — same]` |
| **AI-specific:** *"we monitor for hallucinations"* `[V — same]` | **AI-specific:** *"the model, the surface, the failure mode, the rollback, the postmortem fix, and the eval test they added afterward"* `[V — same]` |

**R61.** The single clearest tell, across every source: **junior answers lack named trade-offs, not scope.** A 22-month candidate who names the cut, the cost and the objector reads more senior than a five-year candidate who doesn't. This is the one lever on this site that is not constrained by Aniket's tenure. `[INF, from the convergence above]`

**R62.** Second clearest, and specific to this build: **precision about the limits of a claim is read as seniority.** Attribution limits, measurement basis, what was not owned, what the tool does not do. Every hedge of this type that the strategy already specifies should be *kept*, and the temptation to smooth them out in the design/copy polish pass must be resisted. `[INF]`

---

## 9. REJECTED LIST

Patterns that are common in the portfolio market and would **weaken this specific site** for **senior product people reading fast and sceptically.** Ordered by how likely they are to actually get built here.

**Content and claims**

1. **Any superlative claim about the world in the hero.** Fact-checkable in ten seconds, and the benchmark literature always contains a contradicting number. (§7.1)
2. **Any published D30/D90 retention benchmark.** Sources disagree by an order of magnitude; citing one invites the reader to find the other. `[V — §7.1]`
3. **A metric without population, timeframe and measurement basis — including in the proof strip and including in the OG image.** Ship fewer cells.
4. **A registered-user count used as a denominator for an activity metric.** (§7.4)
5. **A confession section in every case study.** Four admissions read as a template; one reads as honesty. (§7.6)
6. **Repeating the strategy document's unverified anecdotes** as precedent, in copy or in interview. (§7.8)
7. **Speculative "redesign a famous app" work,** and any speculative piece presented in the same visual container as real work. Already banned by the strategy; re-affirmed because it is the most common thing in the market.
8. **"Product Analyst with PM Ownership"** or any defensive construction around the title. State the title once, flatly, in the timeline.
9. **Reading-time estimates** ("6 min read"). Content-marketing furniture; signals the piece is a blog post, not evidence.
10. **A drawer labelled "Artifacts" containing no artifact.** (§7.9)
11. **Testimonials with no verifiable public source.** (§7.10)

**Interaction and structure**

12. **An "ask my portfolio anything" AI chatbot.** This is the highest-frequency 2026 portfolio gimmick and it is *specifically* disqualifying here: a thin API wrapper without measurement is a named rejected AI-PM artifact type. `[V — shipset.app]` For a candidate whose AI credibility rests on eval rigour, shipping an unevaluated chatbot about himself is the worst possible AI artifact.
13. **Counting-up numbers in the hero.** The strategy's rule-draw animation is defensible; the count-up is a SaaS-marketing trope and it delays the reading of the most load-bearing content on the page by design.
14. **Any loading screen, splash, skeleton or route-transition animation.** Catastrophic for the candidate whose lead case study is a cold-start fix. The first paint is case study one's live demo.
15. **Auto-playing video or a large hero GIF of the app.** Same reason, plus bandwidth on the mobile devices recruiters actually use.
16. **A theme toggle.** Nothing to say, another client component, another thing to get wrong at 320px.
17. **A three-up grid of case-study cards.** With attention exhausted at card three `[V — emilybackes]`, a grid invites parallel skimming of all three and deep reading of none. Stacked rows force sequence, which is what the strategy already specifies — hold it.
18. **A contact form, a skills grid, a tool logo wall, a hero portrait.** Re-affirmed; all four are junior signals and all four are in the templates the build will be tempted to borrow from.
19. **Employer logo strip (HCL / Droom / YourStory marks).** Borrowed credibility, third-party trademarks used without permission, and it makes the page look like a vendor site.
20. **A visitor counter, a "now playing" widget, a bookshelf, a `/now` page, emoji in headings.** Personality furniture; costs scanning attention at the 10-second gate.
21. **"Let's build something great together"** or any CTA written in agency voice. The CTA is an email address.
22. **A published Lighthouse-score badge in the footer.** The strategy suggests it as an earned flex. It is checkable forever, decays silently, and reads as a flex to exactly the reader who dislikes flexes. Keep the 100; drop the badge. If it must appear, link it to a dated PageSpeed run.
23. **A blog or `/notes` with fewer than three simultaneous pieces.** Re-affirmed.

**Process**

24. **Publishing before the numbers have denominators.** The site's differentiation is measurement honesty; shipping it with the same unfalsifiable numbers as the resume destroys the only advantage it has.
25. **Shipping AI-drafted prose without a full human voice pass.** 49% of hiring managers flag heavily AI-generated material; detection is tonal, not tool-based. (§6.4)

---

## 10. Sources, with quality assessment

Everything I fetched and read. `[F]` = fetched and read; `[S]` = search-result summary only.

**Strongest — first-person reviewer accounts and named hiring managers**

| Source | What it gives | Caveat |
|---|---|---|
| `[F]` https://emilybackes.design/post/what-i-actually-look-at-in-a-portfolio-review | The 10s / 2–3min / case-study-three clock; "assume the least"; "reads as edited" | Design hiring, not PM. Reading *mechanics* transfer; PM-specific criteria do not. Author: senior product designer + former technical recruiter, "hundreds of portfolios." |
| `[F]` https://www.mindtheproduct.com/uk-hiring-managers-reveal-the-realities-of-hiring-product-managers/ | Named UK Heads of Product; domain-experience screening; "handful of seconds" on CVs | UK market; small qualitative sample. |
| `[F]` https://www.news.aakashg.com/p/product-manager-portfolio + https://substack.com/@aakashgupta/note/c-57985088 | Survey n=325 PMs + 15 hiring managers; regional adoption; the "nearly an hour" VP account | Author sells a PM job-search course. Partly paywalled. |
| `[F]` https://www.lennysnewsletter.com/p/how-to-interview-product-managers | Loop structure, six skills, the project as highest-signal component, 23-candidates-per-hire (Ashby) | Paywalled beyond the excerpt; describes interviews, not portfolios. |

**Strong on AI-PM criteria — note the opposing commercial incentives, which is why the agreement matters**

| Source | What it gives | Caveat |
|---|---|---|
| `[F]` https://www.kore1.com/how-to-hire-ai-product-manager-2026/ | Eval-set design as "the single biggest separator"; golden set / LLM-as-judge probing; red flags | Recruiting firm writing to employers; no methodology. |
| `[F]` https://www.kore1.com/product-manager-interview-questions-2026/ | Senior-vs-mid tells; four hiring signals; counter-metrics; clarifying-question close-rate | Same. The close-rate statistic is uncited. |
| `[F]` https://www.institutepm.com/knowledge-hub/how-to-become-an-ai-product-manager-2026 | The exact three-artifact requirement; "skeptical of LinkedIn-only AI PMs"; comp bands | **Training/certification vendor — direct commercial interest in the claim.** `[LOW-SRC]` |
| `[F]` https://www.lovelaice.com/resources/ai-evals-for-product-managers-complete-guide-2026 | 90% judge-agreement bar; 52–58% generic-template agreement; one-failure-per-judge; offline/online | Vendor, but technically specific and internally consistent. |
| `[F]` https://amplitude.com/blog/ai-evals-for-product-managers | 20–50-case golden set; PM ownership of eval definition | Vendor (Amplitude). |
| `[F]` https://shipset.app/blog/ai-pm-portfolio-projects | **The AI-PM reading order (live URL → eval suite → reflection)**; 10/6/4 eval composition; rejected artifact types | Vendor; no methodology or quotes. `[LOW-SRC]` |
| `[F]` https://www.mbassett.com/blog/ai-product-managers-2026/ | The counterweight: lived production experience over side projects | Recruiting firm; "hundreds of conversations," no data. |
| `[F]` https://substack.com/@aakashgupta/note/c-251919242 | 30% of PM roles are AI PM; <5% of senior PMs have shipped an agent; 12-month window | **No methodology for either figure.** `[LOW-SRC]` |

**Useful, weaker**

| Source | What it gives | Caveat |
|---|---|---|
| `[F]` https://www.cpapracticeadvisor.com/2026/08/13/ai-written-applications-are-now-the-2-red-flag-in-hiring/188492/ | Resume Genius 2026 report, n=1,500 US hiring managers: 49% AI-material red flag, 42% vague descriptions | Secondary reporting of a resume-vendor survey; US-only; not PM-specific. |
| `[F]` https://www.sitebuilderreport.com/inspiration/product-manager-portfolios | 26 named real PM portfolios, all described in visual-design terms only | A site-builder affiliate roundup; selection is design-biased by construction. Still the best available market snapshot. |
| `[F]` https://apsteq.com/blog/app-retention-benchmarks/ | Retention-by-category table (Adjust 2023 / Sensor Tower 2024 / AppsFlyer 2023) | Aggregator; ranges are wide; cited sources not linked. |
| `[F]` https://productgrowth.in/insights/healthtech/health-app-retention-guide/ | **Traced source of the strategy's D30/D90 figures and the ABDM 45% claim** | **Zero citations for any number in the article.** `[LOW-SRC]` — do not publish anything sourced only from here. |
| `[F]` https://underdog.io/blog/product-manager-portfolio-examples | "impact in 30 seconds"; content-over-design | Mostly a platform roundup. |
| `[F]` https://aatir.substack.com/p/how-to-create-a-product-manager-portfolio | "team vs you"; scannability; managers scan resumes in seconds | Practitioner product leader; deck-oriented advice. |
| `[F]` https://www.aakashg.com/product-manager-portfolio-examples/ + /product-manager-requirements/ | 2–3 case studies; technical-fluency and SQL statistics | Statistics are uncited or attributed loosely ("LinkedIn 2026 data"). `[LOW-SRC]` |
| `[F]` https://blog.productmanagementsociety.com/how-to-get-hired-as-a-product-manager-in-2026/ | 2–4 case studies; 20% of posts mention AI; artifact types | All statistics uncited. `[LOW-SRC]` |
| `[F]` https://www.productleadership.com/blog/product-hiring-market-trends/ | India comp bands; skills-first hiring share; referral dominance | Uncited; a training provider. `[LOW-SRC]` |
| `[F]` https://amycmitchell.substack.com/p/what-does-it-look-like-to-be-a-senior | Mid vs senior+ scope and ambiguity behaviours | Practitioner opinion. |
| `[F]` https://designcase.app/blog/what-hiring-managers-look-for-ux-case-studies/ | Result-first ordering; vague-vs-specific example | Design-side; author is a Product Design Lead; no named-manager quotes. |
| `[S]` designfolio.substack.com; uxfol.io blog; careerfoundry; Shreyas Doshi LinkedIn posts; NN/G F-pattern and reading-volume research; craftuplearn; productmanagerjobboard; airesume.guru; wp-rocket page-speed statistics | Individual rules as cited inline | **Search-summary only — I did not fetch these pages.** Every claim drawn from them is tagged `[V-snip]` inline. |

**Fetch failures, noted for the auditor:** `aakashgupta.medium.com` (two articles, HTTP 403), `businessofapps.com` health & fitness benchmarks (HTTP 403), `prodfolio.io` philosophy article (returned a stub page), `onehour.digital` portfolio-time statistics (returned a stub page). The two Medium articles were partially recovered via their Substack equivalents; the businessofapps benchmarks were substituted with the apsteq aggregation and are therefore weaker than I would like for §7.1 — though the direction of the finding (health/fitness is not the worst-retaining category) held across every source I did see.

---

## 11. Rule index

Fast lookup for the builder agents.

| # | Rule | Owner |
|---|---|---|
| R1–R4 | Outcomes/judgment/artifacts; result-first; write to confirm not impress; avoid "performed" tone | Content |
| R5–R9 | Metric form; metric+date+trigger; mandatory counter-metrics; shape over magnitude; no vague responsibilities | Content |
| R10–R11 | Ownership specificity in both directions; I not we | Content |
| R12–R14 | Visible friction; "trade-off I'd make differently" is sufficient; extend past ship | Content |
| R15 | Philosophy page, 300–500 words, evidenced by case studies | Content |
| R16–R22 | Failure modes: guessing homepage, process-without-outcome, case-study-three cliff, over/under-elaboration, generic positioning, content>design, market is design-led | Content + Design |
| R23–R26 | Bimodal reader; cap required path not total depth; two reading orders; F-pattern and left-edge argument | IA + Design |
| R27–R37 | AI-PM: build Grounded; golden-set size and composition; publish judge agreement vs 90% bar; one failure per judge; offline/online boundary; deterministic-first; PM ownership language; supplement-not-substitute framing; rejected archetypes; hallucination-case framing | Lab + Content |
| R38–R41 | India = table stakes; referral distribution; domain as asset; product metric → business metric | Strategy + Distribution |
| R42–R43 | Title: ATS surfaces vs site; state it exactly once | Content |
| R44–R46 | Defensibility test; anti-LLM-prose rules; one voice | Content (gate) |
| R47–R60 | The fourteen disagreements with the strategy document | All |
| R61–R62 | Trade-offs not scope; precision as seniority | Content |
