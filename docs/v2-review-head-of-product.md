# V2 Review — Head of Product

**Reviewer role:** Head of Product. 5–10 minutes, desktop (1440). Deciding whether to spend 30 minutes with this person, and at what level.
**Artifacts read:** `home-1440.png`, `home-1440-full.png`, `work-1440.png`, `work-step-syncing-1440-full.png`, `work-steps-premier-league-1440-full.png`, `work-ai-health-report-1440-full.png`, `approach-1440-full.png`, plus `content/work/*.mdx`, `content/approach.mdx`, `content/home.mdx`, `content/about.mdx`.

---

## 1. Would I interview this person?

**Yes. 30-minute screen, and I'd take it myself rather than delegate it.**

`home-1440.png` clears the ten-second bar. Above the fold I get name, "PRODUCT MANAGER · CONSUMER · HEALTH · APPLIED AI", a one-paragraph intro that states employer, tenure, surface owned and scale, and a proof panel carrying 1M+ registered users / +20% app engagement / +35% step-sync completion / 15% incremental revenue / an AI report taken 0→1. That is who, what, domain, scale and headline evidence, without scrolling. V1 could not do that.

The yes is for the reasoning, which is unusually good for the level. It is not yet a yes to the outcomes. See §9.

---

## 2. Can I understand their product judgment?

Yes — and it is the strongest thing on the site by a distance. Four pieces of evidence, quoted.

**a. The reclassification insight** (`work-step-syncing-1440-full.png`, "Latency sat in the engineering column"):

> "What a problem is filed under decides what it gets compared against, and a latency number owned by product competes against features."

That is a genuine PM insight about org mechanics, not a platitude. It is also the thesis of his entire case, and he states it in one sentence.

**b. The instrumentation blind spot** (same page, the "The part that makes this worth a case study" callout):

> "The churn happened before the first analytics event fired. A funnel begins at the first event the app emits, and the app cannot emit one until it has finished launching — so everyone who abandoned during those fifteen seconds was never in the denominator. They did not show up as a drop-off. They showed up as nothing at all."

This is the sentence that got him the interview. Most candidates at this level cannot reason about what their instrument structurally cannot see.

**c. The decision table** (`work-step-syncing-1440-full.png`, "Three ways to spend eight weeks"). Three real options, each with cost, reversibility, and a falsification condition. His chosen row is marked and annotated "What I chose. It scored worst on reversibility," with a caption that says reversibility is in the table *because* it is the dimension he lost on. Volunteering the axis you scored worst on is a senior habit.

**d. The line I would put in front of an AI PM panel** (`work-ai-health-report-1440-full.png`, "Where I drew the line"):

> "The ask can follow the interpretation. It cannot *be* the interpretation. A concerning value routes to a person, never to a product."

A testable design constraint about commercial pressure inside a clinical artifact, stated as policy rather than sentiment.

Supporting: the Premier League strategy frame — "Content and incentives buy attention you have to keep paying for… Competition manufactures the reason to come back out of other users, which makes it the only one of the three whose cost is the mechanic rather than the fuel." That is a clean run-rate-vs-one-time argument.

**Verdict:** judgment is legible, specific and above the stated title.

---

## 3. Can I see ownership? Is the boundary credible?

**The device works.** Every case study carries a three-panel `I OWNED / WE SHIPPED / I DID NOT OWN` block (`work-step-syncing-1440-full.png` at ~y1400; same on the other two). It is the most credible thing on the site. Sample boundaries:

- "The engineering. I did not choose the technical approach, profile the startup path, or write any of the code — the tech team did."
- "The sale. The report was cited as a key USP in enterprise closes; I built the artifact, I did not close the deals."
- "The analytics. I did not build the instrument that produced 3.5 → 7.8, and its limits bound what I can claim from it."

Not inflated. This is the correct shape.

**But it is hedged past the point of usefulness in two ways, and asymmetrically.**

First, the hedging is monotone. Three case studies each end in a "what it does not prove" and a "what I would do differently," the Approach page repeats all three, and the experience section is headlined **"Four years of product work, one of them owning a surface."** He has done my level-setting for me before I asked. In `work-step-syncing-1440-full.png` he writes "The bundle is the number I trust most in this case study" — which is an instruction to discount the other two, and I took it.

Second, and more important: **the hedging is applied everywhere except to decision authority.** He is scrupulous about engineering he did not do and sales he did not close. He is not scrupulous about the one thing that determines his level. Step Syncing opens "I had defined the product roadmap" and the card summary reads "held my own roadmap for eight weeks." Nowhere on the site does anyone disagree with him, escalate, refuse, or take the decision off him. There is no stakeholder, no manager, no EM who said no, no scope he lost. Eight weeks of engineering time reallocated against a defined roadmap is a decision with a political cost, and the site records none of it.

The result reads as a very sharp analyst who was right, rather than a PM who carried a room. That distinction is exactly what a level decision turns on.

---

## 4. Case by case

### Step Syncing (`work-step-syncing-1440-full.png`)

- **Strongest sentence:** "What a problem is filed under decides what it gets compared against, and a latency number owned by product competes against features." Followed closely by the pre-first-event funnel callout.
- **Weakest sentence:** "I reclassified launch time from an engineering backlog item into a product requirement, and held my own roadmap for eight weeks." *Held my own roadmap* is carrying the entire level claim on the word "own," and it is the one claim never bounded. Runner-up: "This shipped as part of a period with other work in it" — an admission that +35% is uninterpretable, which does not stop +35% appearing in the hero proof panel, the by-the-numbers grid, the work card, and the case study's own results strip.
- **What I would probe:** (i) Who else had to agree to the eight-week hold, what did they want instead, and what did you give up to get it? (ii) Fifteen seconds measured how — which device tier, cold or warm start, what percentile, how many samples, and who took the measurement? (iii) "Under 2s" is a bound, not a number. What was the actual p50 and p90 at ship?

### Steps Premier League (`work-steps-premier-league-1440-full.png`)

- **Strongest sentence:** "It is also a contestable north star in a health app, and I would rather argue about it here than quietly swap it for something safer." Arguing against your own headline metric, in public, on the page where you're selling it, is a senior move and I noted it.
- **Weakest sentence:** the outcome line — "A competitive step league built from nothing, moving session time from 3.5 to 7.8 minutes." He spends a section explaining that session time is the wrong metric for a health product and then leads with it on the card, in the hero results strip and in the timeline bullet. Also: this case has **no timeline field at all** (compare Step Syncing's "TIMELINE · 8 weeks" in its meta row). I cannot tell whether this was six weeks or nine months.
- **What I would probe:** season two. A competitive mechanic's entire risk is novelty decay, and the site has nothing past launch. What were D7/D30 for league joiners vs non-joiners, what share of season-one entrants entered season two, and what happened to notification opt-outs? He names these as counter-metrics he *would* have built. I want to know whether he ever saw them.

### AI Smart Health Report (`work-ai-health-report-1440-full.png`)

- **Strongest sentence:** "The ask can follow the interpretation. It cannot *be* the interpretation. A concerning value routes to a person, never to a product." Second: the three-audience frame — "The beneficiary reads the report. The employer buys the programme. And someone internal has to be willing to put their name on what it says." That is a real B2B2C insight and most consumer PMs at this level do not have it.
- **Weakest sentence:** "the report itself was cited as a key USP in five or more enterprise closes." *Cited as* is hearsay, *key USP* is a salesperson's word, and *five or more* is a fuzzy floor with no denominator — five of how many attempts? It is also the claim the homepage leads with. Close second, and worse for the role he wants: "I designed the product surface and not the enforcement layer underneath it." For an AI PM job, the enforcement layer *is* the job.
- **What I would probe:** show me the actual routing rule for an out-of-range value — the literal condition, not the principle. Then: what proportion of generated reports tripped it, who reviewed the output before launch, and has a report ever said something you had to retract? Also: 15% incremental revenue against what baseline, over what window, and who computed it?

---

## 5. Level, and what I would let him own

**Offer level: APM, or PM I at a company with a real PM bench and a manager who reads his PRDs.** He does not go in unmanaged.

**Would let him own:** a defined engagement or activation surface inside an existing consumer product — retention mechanics, onboarding/activation funnels, an insights-or-report surface — where instrumentation already exists, an EM partner is assigned, and someone above him arbitrates roadmap conflicts. He would be good at this quickly. The diagnostic instinct in §2 is real and it is the expensive thing to teach.

**Would not yet let him own:** a P&L line; a 0→1 into an unproven market; a roadmap spanning more than one squad; anything where he has to win a resourcing argument against a peer without air cover; and specifically not the safety/eval layer of an LLM health feature — he says himself he has not built one.

**The lever:** if the eight-week roadmap hold survives §6 — if he genuinely argued an organisation out of a quarter's worth of engagement work and won the argument himself — that is PM, not APM. One answer is worth a level here.

---

## 6. The claim I would probe hardest, and whether it survives

**"I had defined the product roadmap" / "held my own roadmap for eight weeks."** (Step Syncing, opening section and card summary.)

This is the hinge of the whole site. It is what converts *analyst who found a latency problem* into *PM who made a prioritisation call*, and everything else — the decision table, the reversibility framing, the Approach page's first principle — inherits its credibility from it.

**Do I expect it to survive? Partially, and not in the form written.** My prior, from a Product Analyst thirteen months into his first full-time role, is that the true version is: he built the case, he was right, he pushed hard, and a senior person made the call. That is still good work — it is the right work — but it is APM work, and the phrasing quietly upgrades it. What makes me suspicious is precisely the asymmetry in §3: a person this disciplined about bounding engineering and sales claims, who does not bound the authority claim, has probably noticed which one is load-bearing.

If he answers with a specific name, a specific objection and a specific concession, the claim survives and he goes up a level. If he answers in the same voice the site uses, it does not.

---

## 7. Numbers I would discount to zero

**Discounted to zero: "+20% App engagement."** It is in the hero proof panel of `home-1440.png`, and the site cannot agree on what it means. The panel says "App engagement / Within twelve weeks." The by-the-numbers grid says "An engagement suite spanning challenges, streaks, live events and trackers, shipped over twelve weeks." The experience timeline says "lifting daily actives 20% within twelve weeks." Three labels for one figure. Four features shipped simultaneously, twelve weeks, no counterfactual, no case study behind it, no definition of the denominator. Zero.

**Also discounted to zero: "cut 30% of the manual effort in the reporting loop."** It appears exactly once, in a timeline bullet in `home-1440-full.png`, with no case study, no method and no definition of "manual effort."

**Heavily discounted, not zero:** "+35% step-sync completion" — he tells me himself it shipped inside a period containing other work; and "5+ enterprise closes" — hearsay attribution with a fuzzy floor.

**Taken at face value:** 15s → under 2s, and 25MB → 6MB. Two stated totals, one exact percentage, no population to argue about. He is right that these are the ones to trust, and the fact that he identified that unprompted is itself a data point in his favour.

---

## 8. What is missing that would change my level answer — ranked

1. **Any evidence the product exists.** This is the single biggest gap and it is V1's gap, unfixed. Every visual on this site is a diagram he drew, and three of them are explicitly captioned "Illustrative mechanic — not a product screen" and "Illustrative product flow — the journey I designed, not a system architecture." I have now read three case studies about an app with a million registered users and I have never seen the app. One real screenshot — the league standings, the report page, even redacted or blurred — is worth more than another thousand words of argument. Right now, everything on this site is testimony.
2. **Anything past the launch window.** Every figure is a launch delta. Nothing on the site tells me what any of it looked like in month three. He names this himself — "A performance win is not a state, it is a position you hold" — and then does not supply the position. I hire for durable outcomes; he has none on the page.
3. **Evidence of working with other people.** No stakeholder disagreement, no negotiation, no scope lost, no engineer persuaded, no decision taken away from him. Product is a contact sport and this site is played solo. This is what currently caps him at APM more than the numbers do.
4. **One written artifact.** He states he owns "the roadmap, the PRDs, and what ships in what order," and shows me neither a roadmap nor a PRD. A redacted one-pager or prioritisation memo would substantiate the authority claim in §6 directly.
5. **Timelines on cases 2 and 3.** Step Syncing says eight weeks. The other two say nothing, so I cannot read his velocity or judge how much of thirteen months each consumed.

Fixing 1 and 2 is the difference between "yes to the reasoning" and "yes to the operator."

---

## 9. Has V2 moved the needle on the V1 verdict?

The prior Head of Product said *yes to the reasoning, not the outcomes*, and called APM / PM I.

**Plainly: V2 moved presentation an enormous distance and evidence-of-shipping essentially not at all. The verdict is unchanged — APM / PM I.**

What genuinely changed, and it is not cosmetic:
- The internal QA markers are gone. Verified: no `NEEDS:` or `not stated` string renders anywhere in the screenshot set, and `lib/content/schema.ts:21` now hard-fails any field containing `[NEEDS:` at build time. Constraint met.
- Bundle size is no longer the lead metric; it is now correctly demoted to supporting evidence inside one case study.
- The hero proof panel answers who/what/domain/scale in roughly four seconds (`home-1440.png`). V1 needed 4,987px to deliver 62 words.
- Case studies are ~700 words and now carry real artifacts: the ownership triptych, the decision table, the before/after launch bars in `work-1440.png`, the strategy spread and league loop in `work-steps-premier-league-1440-full.png`, the three-audience panel in `work-ai-health-report-1440-full.png`.
- The defensive writing has been converted into something structurally better: bounded claims. "I built the artifact. I did not own the sale" is not defensiveness, it is precision.

What did not change: **the evidence set is identical.** Same three projects, same six numbers, same absence of a single product screenshot, same absence of anything after week twelve, same absence of any other human being. V2 made the reasoning far easier to see and added zero outcomes for it to reason about.

So: the redesign bought him the interview faster and made the 30 minutes more productive. It did not buy him a level. He will now get in the room sooner and be asked the same questions.

---

## Defects to fix before this goes out

**1. The homepage renders the CTA twice.** In `home-1440-full.png`, bottom ~1,600px: "Have a product problem worth solving?" appears as a full standalone section with body copy, an email button and a "Copy" control — and then again, immediately below, inside the footer, with the same headline, near-identical body copy, the same email button and the same "Copy" control. Two identical calls to action stacked on top of each other on the highest-traffic page. It reads as a build error and it is the first thing on the site that feels unfinished. Kill one — the footer should carry the links and the email, not the pitch.

**2. That CTA section's right half is empty.** Same screenshot: headline, body and button occupy the left column of a full-bleed section; the right ~50% is blank canvas. This is the "huge empty whitespace" the brief explicitly bans, and it is the last impression the page leaves.

**3. The Approach page is V1 relapsing into a single route.** `approach-1440-full.png` is 11,460px tall at 1440 and contains not one visual. Serif body copy in a ~575px measure, with a dead ~270px left gutter and a ~430px void down the right. It is the best sustained writing on the site and the least likely to be read. At minimum, pull the four principles into a scannable structure and put the two artifacts that already exist elsewhere on the site (the decision table, the strategy spread) into it as illustrations of the principles they came from.

**4. The decision table is cramped at desktop.** `work-step-syncing-1440-full.png`: four columns squeezed into the ~700px reading measure, producing cells that wrap to five and six lines while the page has ~800px of unused horizontal space either side. This is the best artifact on the site; let it break out of the measure at ≥1024.

**5. Two of three case studies have no timeline.** `steps-premier-league.mdx` and `ai-health-report.mdx` omit the `timeline` field, so their meta rows render ROLE / TEAM / SCOPE where Step Syncing renders ROLE / TIMELINE / TEAM / SCOPE. Add it or the reader cannot judge velocity.

**Constraints checked and met:** no gradients, no glassmorphism, no blobs, no custom cursor, no stock photography, no fake screenshots, no fake testimonials, no dark-mode tech aesthetic, no excessive monospace, no excessive rules. Green is confined to a single accent role (links, badges, chosen-row tint) and is not excessive. Corner radii are small and used sparingly. It does not read as Framer, Webflow, agency, or developer portfolio. Closest genre risk is "premium long-read essay," which the case-study artifacts mostly hold at bay — except on Approach, where it wins outright.
