# 10 — Review, Pass B: Head of Product

**Agent 10, Pass B.** Desktop, 1440px, 5–10 minutes. Reading for scope and level. I am the reader
most likely to find an inflated number, so I looked for one first.

Screenshots read: `home-1440.png`, `home-1440-full.png`, `work-1440.png`,
`work-two-seconds-1440.png`, `work-two-seconds-1440-full.png`,
`work-steps-premier-league-1440.png`, `work-steps-premier-league-1440-full.png`.
Source read: `content/work/two-seconds.mdx`, `content/work/steps-premier-league.mdx`.

**Headline verdict: yes, I take the 30 minutes.** Not because of the outcomes — I discount most of
them below — but because the writing demonstrates a *specific, uncommon* competence: this person
knows what his instruments could and could not see, and says so before I ask. That is the rarest
thing in a PM portfolio and it is worth a call. What the call is *for* is different from what the
site thinks it is for, and section 7 says so.

---

## 1. Product judgment

**Found, and it is the strongest thing here.**

`work-two-seconds-1440-full.png`, section 02:

> "What a problem is filed under decides what it gets compared against, and a latency number owned
> by product competes against features — the only comparison in which its real value is visible."

That is a genuine organisational insight, not a portfolio sentence. He did not fix the app; he moved
the item into a column where it could win. Same page, section 03:

> "A funnel begins at the first event the app emits, and the app cannot emit one until it has
> finished launching. Everyone who abandoned during those fifteen seconds is missing from the
> denominator. They are an absence rather than a drop-off."

Analytics-blindspot reasoning. Most PMs with five years cannot articulate that.

`work-steps-premier-league-1440-full.png`:

> "**Content and incentives are subscriptions the company pays, not the user.**"
> "The question that settles this is which of the three still works in a quarter when nobody is
> funding it."

That reframes three feature options as three cost structures. It is the correct frame and it is
his.

**The limit, and it is structural.** Every one of these is judgment about a *class of problem*.
There is not one sentence anywhere on the site about persuading a person. No named objection, no
stakeholder who disagreed, no negotiation, no "the VP wanted X". Every case study is Aniket versus a
dataset. `work-two-seconds-1440.png` says `TEAM — Tech team; VP-Product and stakeholders on scope`,
and that is the only human in the record. A Head of Product hires for judgment *exercised on other
people*, and I cannot see any.

---

## 2. Scope — what size of decision was he allowed to make?

**Found, and it is smaller than the hero implies.**

The claim, `home-1440.png` identity block:

> "Product Analyst at HCL Healthcare since October 2024 — the roadmap, the PRDs, and what ships in
> what order, on a consumer health app with 1M+ registered users."

And `work-two-seconds-1440-full.png`, section 01: *"I had defined the product roadmap."*
And `work-two-seconds-1440.png`, `I OWNED`: *"The call to hold that roadmap for eight weeks."*

So the stated scope is: sequencing authority over one product surface, one app, one company.

**What is verifiably absent from every screen I read:** headcount, budget, hiring, an OKR he owned,
a cross-team dependency he negotiated, a pricing or packaging decision, a launch he ran. Team size
is *unknown on two of the three case studies* — `work-steps-premier-league-1440.png` renders
`TEAM` as nothing but the red question `how many engineers, a designer, a QA function?` and
`TIMELINE` as nothing but `how long from cohort analysis to launch?`. On case study 02, `ROLE` is
the only header field with an answer in it.

I therefore cannot distinguish "roadmap owner on a 4-person squad" from "roadmap owner on a 40-person
platform", and those are two different levels. See section 10.

**One thing the site gets right that I want to name:** `1M+ registered users`, everywhere,
consistently `registered` and never `active`. `home-1440.png`, `work-1440.png`, and the timeline row
`Consumer health · 1M+ registered beneficiaries` all hold the same qualifier. That is the single
cheapest place to inflate on a portfolio and he did not take it. It bought him credibility for the
rest of the page.

---

## 3. Ownership boundaries

**Found. Best-in-class, and the reason I keep reading.**

`work-two-seconds-1440.png`, the `I DID NOT OWN` column, visible above the fold:

> "The engineering. I did not pick the levers, profile the startup path, or write a line of the
> code — the tech team did."

`content/work/two-seconds.mdx`, same block:

> "The instrumentation. Whatever measurement existed was not built by me, and its limits are the
> limits of what I can claim here."

`work-steps-premier-league-1440.png`, same column:

> "The analytics. I did not build the instrument that produced 3.5 → 7.8, and its limits bound what
> I can claim from it."
> "Whether the mechanic held past the first read. My record stops at the session-time figure."

Putting `I OWNED / WE SHIPPED / I DID NOT OWN` in a three-up block above the fold on every case
study is the correct structural decision, and it is what makes the unbounded claims believable. It
is also the fastest substitute for the references this site does not have.

**But read the three columns together and the residue is thin.** Subtract engineering, subtract
instrumentation, subtract the build, subtract the release process, subtract "whatever was or was not
put in place afterwards" — what is left that he owned is *diagnosis, prioritisation, and the
argument*. That is real work. It is also analyst-shaped ownership, not PM-shaped ownership. He
claims PRDs in the hero and then no case study contains a single requirement, scoping cut, edge case
or acceptance criterion. The one place the site could have shown PM craft rather than analytical
craft, it does not.

---

## 4. Technical depth

**Found — but it is measurement depth, not systems depth, and the difference matters.**

What is genuinely there, `content/work/two-seconds.mdx`, drawer 1:

> "A mean launch time follows the fast tail, and abandonment lives in the slow one, so a mean that
> improves while the slow tail sits still will look exactly like a win."

Same file, section 06:

> "an inequality does not license a percentage — 1.5 and 1.99 imply meaningfully different reductions
> from fifteen and my record does not say which."

> "'Bundle size' is at least three measurements — what a person downloads, what the install occupies,
> what the build artifact weighs — and I have not stated which one those totals are."

And drawer 1 on why device capability defeats randomisation: *"You can randomise which build a
device receives. You cannot randomise the device."* That is a correct and non-obvious experimental
point.

**What I could not find, anywhere, on any screen:** a single statement about *what made the app
slow*. Not one. No blocking startup call, no SDK count, no splash-screen behaviour, no asset
weight, no auth round-trip, no code-splitting or dynamic-delivery decision, no sequencing of fixes.
The page pre-empts the question by disowning it — *"I did not pick the levers, profile the startup
path"* — which is honest, and which also means that in an interview the question "what were the top
three causes and why were they fixed in that order?" has no answer on this site. I would ask it in
minute four.

**A specific gap a Head of Product will spot in ten seconds.** `home-1440-full.png` presents
`COLD START 15s → under 2s` and `BUNDLE SIZE 25MB → 6MB` as two adjacent, independent proof cells,
and `work-two-seconds-1440.png` repeats the pairing in the header block. A 76% bundle reduction is,
in most Android cold-start work, *a principal cause of* the launch-time win — not a separate result.
The site never says whether the two numbers are one intervention or two. As displayed, the page
looks like it is counting the same eight weeks of engineering twice. One sentence fixes it:
either "the bundle cut was the main lever on launch time" or "these were separate workstreams".
Until that sentence exists, a sceptic silently marks the proof strip down from three findings to
two, and the candidate never learns why.

---

## 5. Trade-off reasoning

**Found. The best material on the site, and also the most carefully qualified.**

`work-steps-premier-league-1440-full.png`:

> "Reversibility is what it costs to switch off in front of the people who were using it, and on
> that reading a league is the worst of the three."
> "**I chose the least reversible option, and I would rather have that written down in advance than
> discovered in week nine.**"

> "What that buys is a mechanic that funds itself. What it costs is a population."
> "To someone who is unwell, or deconditioned, or simply slower than the people they were placed
> beside, a standings table is a daily notice that they are losing at something they never entered
> to win — and I would expect that group to overlap heavily with the people a health product exists
> for."

That last passage is the single best paragraph on the site. He shipped a mechanic and then named
the population it hurts, and identified that the harmed population is the target population. I have
interviewed Group PMs who cannot do that about their own launch.

Also, same page:

> "notification permission is not renewable — one revocation per user, permanent. A league that
> lifts session time this quarter by pushing four times a day has sold a durable asset to buy a
> temporary number, and the cost does not appear on the same dashboard or in the same quarter as
> the win."

That is counter-metric literacy, and it is the correct counter-metric.

**The qualification that decides the level question.** The site is scrupulous — correctly — that
this reasoning is *present-tense*:

- `work-two-seconds-1440-full.png`, DecisionTable caption: *"This is the reasoning laid out, not a
  scored matrix run at the time."*
- `work-steps-premier-league-1440-full.png`: *"Those dimensions are the ones I would argue for
  today, not a transcript of a scoring exercise."* followed by the red
  `what did you actually score the three options on?`
- The `Callout` on each page is framed as *"the instrument I would argue for instead"*, not as what
  he argued for then.

So what is demonstrated is that **Aniket can reason about these trade-offs today, at his desk, with
hindsight and a blank page.** There is no evidence on this site that any of this reasoning existed
at the moment of the decision. The honesty is admirable and the consequence is unavoidable: I am
reading an essayist's account of a decision, not a record of a decision-maker. That is the crux of
section 7.

**A defect that damages exactly this section.** The `DecisionTable` — the one artifact whose entire
job is to show trade-off reasoning — **is visually broken at 1440px.** In
`work-two-seconds-1440-full.png` (table at approximately y=8800–11000 of the full-page capture) the
table is constrained to the ~615px prose column while roughly 700px of viewport sits empty to its
right. The fourth column is clipped mid-glyph at the container edge: the header reads
`HOW / YOU / WOULD` (D cut) `/ LEARN` (N cut) `/ YOU / WERE / WRONG` (G cut), and body cells read
`taken on` (cut), `who got` (cut), `Directly.` (cut). First-column cells wrap to one or two words
per line — "Ship the / engagement / roadmap as / written". The same failure recurs in
`work-steps-premier-league-1440-full.png`, where the header renders `WHAT / NEED / TO B / TRUE`.

This is the worst defect on the site *for this reader specifically*. My whole calibration for
trade-off reasoning runs through that table, and on a 1440px desktop it requires horizontal scrolling
inside a narrow column with half the screen unused. Fix: let the DecisionTable break out of the
prose measure to the full content width on ≥1024px. It is a layout change, not a content change,
and it upgrades the strongest argument on the site from "unreadable" to "the reason I called him".

---

## 6. Outcomes

**Found, all four, all qualified, none of them the kind I hire on.**

| Metric | Where | My read |
|---|---|---|
| `15s → under 2s`, `at least 7.5× faster` | `home-1440-full.png` proof strip; `work-1440.png`; `work-two-seconds-1440.png` | Believable. An engineering physical quantity, not a user or business outcome. Lower bound correctly stated rather than a fake percentage. |
| `25MB → 6MB`, `76% smaller` | same | **The one number I fully accept.** Two stated endpoints, a physical unit, exact arithmetic — (25−6)/25 = 76.0%. |
| `3.5 min → 7.8 min` session time | `home-1440-full.png`; `work-steps-premier-league-1440.png` | See section 9. Discounted. |
| `unstated base → +15%` cross-sell revenue | `home-1440-full.png`, case row 03 | See section 9. Discounted to zero. |

**The arithmetic is clean everywhere I checked, and I checked.** No percentage is rendered beside
`3.5 → 7.8` (7.8/3.5 = 2.229, and the resume's `+122%` would have been wrong by a point). `at least
7.5× faster` is a correct lower bound from an inequality. `76%` is exact. On a portfolio whose whole
premise is numeric care, the numbers survive division. That is not nothing — it is the first thing
I test and most candidates fail it.

**But note what is not here.** Not one outcome on this site is a retention, activation, conversion,
funnel or revenue figure with a base. Two of the four are engineering quantities. One is a duration
the site itself argues is the wrong instrument. One is a revenue percentage the site itself declines
to substantiate — `home-1440-full.png`: *"Which revenue line, and over what period, I can't
substantiate here — so the page says that rather than implying otherwise."* A Head of Product's
scorecard has zero rows filled after ten minutes on this site. That is a *documentation* failure
rather than a *work* failure, most likely, but I cannot act on the difference.

---

## 7. Level, and what I would let him own

**Hire at APM / PM I. Not PM II. Not "PM" unqualified.**

The gap between the *quality of the reasoning* and the *evidence of operating* is the whole
decision. The writing on `work-steps-premier-league-1440-full.png` is stronger than most PM IIs
produce. The record behind it is: 22 months, one company, one surface, one title (`Product
Analyst`), no headcount, no persuasion, no post-launch iteration, no outcome with a denominator.
Hiring on the writing is hiring on an artifact he produced with unlimited time and no adversary.

**What I would let him own on day one:**

- One feature area or one funnel stage of an existing consumer product — bounded surface, strong
  engineering partner, a PM II or Group PM above him.
- **Metric definition and instrumentation specs across the team.** This is his genuine edge and it
  is underrated. The drawer *"How I would define session time before quoting it again"*
  (`work-steps-premier-league-1440-full.png`) — median vs mean, what ends a session, who is in the
  denominator — is a better metric-definition doc than most teams have. I would give him that job
  explicitly and let it be the thing he is known for.
- One 0→1 mechanic on a bounded surface, where he has to ship, watch it for eight weeks, and report
  what happened. That is the missing evidence and it is also the fastest way to generate it.

**What I would not let him own for 12–18 months:**

- A roadmap for a product line, or anything requiring him to win capacity from a platform team. Zero
  evidence of persuasion under resistance.
- Pricing, packaging or monetisation. The one commercial case on the site rests on an unsubstantiated
  15% and an assumption about who buys.
- An AI-safety-adjacent surface. `content/work/ai-health-reports` names the safety question and
  routes it to a portfolio side project rather than to anything he built at work. That is the right
  move honestly, and it is also a clear "not yet".

**Promotion trigger to PM II:** one shipped decision where a named person disagreed, plus one
post-launch metric read with a stated denominator. Both are achievable in two quarters.

---

## 8. The claim I would probe hardest

**"I had defined the product roadmap"** (`work-two-seconds-1440-full.png` §01), and its homepage
form: **"the roadmap, the PRDs, and what ships in what order"** (`home-1440.png`).

Why this one: it is the load-bearing claim under the entire hero. *"I spent eight weeks there
instead"* only means anything if he had the authority to spend them. An eight-week roadmap hold on a
1M-user app is a decision most organisations do not hand to a 22-month Product Analyst. And the
site's own header block undercuts it in the same viewport — `work-two-seconds-1440.png`:
`TEAM — Tech team; VP-Product and stakeholders on scope`. If VP-Product set scope, then somebody
above him owned the roadmap and he drafted it.

**What I would ask, in order:**
1. Name the last three things you took *off* the roadmap. Who objected, and what did you tell them?
2. Who signed the eight-week hold, and what did you have to show to get it signed?
3. What was the review cadence, and who else was in the room?
4. Show me one PRD section you wrote and one requirement you cut from it.

**Do I expect it to survive?** *Partially, and that is not the same as no.* I expect
"I maintained, sequenced and argued a roadmap that VP-Product approved" to survive comfortably and
to be genuinely impressive at 22 months. I expect "I defined the roadmap" in the sense a Head of
Product hears it — owning the bet, defending it upward, saying no to the business — to come back
softer. The site's own hedge is the tell, and the fact that the hedge is *there* is why I would ask
the question in good faith rather than as a trap.

**Second probe, unprompted:** "you say a mean launch time hides the slow tail — was the 15s figure a
mean?" The page raises the objection and never applies it to its own headline number.

---

## 9. Numbers I would discount to zero

**`+15%` cross-sell revenue — zero, and I would cut it from the site.**
`home-1440-full.png`, case row 03 renders a delta bar reading **`unstated base ▸ +15%`**, with
`15% of which revenue line, and measured over what period? · no window in the record · attributed to
the hooks, not to the reports`. A bar chart drawn from a literal "unstated base" is a bar with no
left endpoint — the page *draws* a delta it has, in the same breath, told me is undefined. The
honesty of the caption does not rescue the graphic; the graphic is the thing that gets screenshotted.
By the site's own D1-10 logic (CSAT was cut entirely for exactly this deficiency: no scale, no
baseline, no N, no period), 15% should have been cut too. Keeping it is inconsistent with the rule
the site is otherwise enforcing on itself, and inconsistency is the only thing that costs more than
a weak number.

**`3.5 → 7.8 min` session time — zero as an outcome, though not as an artifact.**
Not because the number is wrong. Because the site itself dismantles it, correctly, twice:
*"In a health app, a product working well can reduce session time"* and, from the drawer, *"Who is
in the denominator. Everyone who opened the app, or everyone who joined a league — and that one
matters most, because league joiners are self-selected toward engagement, so measuring the mechanic
on them is the most flattering reading available."* If the denominator is league entrants, the
metric is close to tautological — people who joined a leaderboard spent longer looking at a
leaderboard. He says this himself. I credit the paragraph and I score the number zero.

**What I do not discount:** `25MB → 6MB`. Two stated endpoints, a unit, exact arithmetic, and a
qualifier line that correctly says the denominator is a build artifact and not a user population.
That number is worth more to him than the other three combined and the site is right to give it the
signature treatment on `home-1440.png`.

---

## 10. What is missing that would change my answer to (7)

Ranked by how much each would move the level.

1. **One decision where a named person disagreed, and what happened next.** Currently zero. This is
   the single highest-leverage addition on the site. It does not need a metric. Two sentences —
   who pushed back, on what grounds, and how the disagreement resolved — converts "essayist" into
   "operator" and is the difference between APM and PM.

2. **One artifact written at the time, dated.** A PRD section, a prioritisation memo, a metric
   definition doc. The whole level question in section 5 is "did this reasoning exist then, or only
   now". One dated page settles it. `DECISIONS.md` D1-16 correctly rules that no drawer may *claim*
   to hold a real document — that ruling is about not faking one, not about not producing one.

3. **Team shape.** `work-steps-premier-league-1440.png` renders `TEAM` as a red question and
   `TIMELINE` as a red question, with `ROLE` the only populated field in the header block. I cannot
   map a person to a level without knowing whether the squad was four people or forty. This is one
   sentence of recall, not research, and it is currently blocking the answer to the exact question
   the case study exists to answer.

4. **Anything at all after launch.** All three case studies stop at the first read —
   *"My record stops at the session-time figure."* A PM is hired for weeks 4 through 20. Even
   "the league ran three seasons and I killed it in season four" would be worth more than a second
   launch metric.

5. **One outcome with a denominator.** Any funnel, activation, or return-rate figure for anything,
   at any point in his career. One would do.

---

## Appendix — three presentation defects that cost him with this reader

**A. The `DecisionTable` clip at 1440px.** Detailed in section 5. Highest priority. The artifact
that carries the site's best argument is unreadable at the width its target reader uses.

**B. The `Currently:` chip sits in the homepage hero.** `home-1440.png`, directly beneath the
identity paragraph and directly above the link row:
`Currently: one clause — what is on your desk this month?`

`04-ia.md` §5.7 rules explicitly that this token *lives on `/about`, not in the homepage hero*, on
the grounds that "a `Currently:` followed by a question mark reads as an unfinished template, and it
would be the first amber chip a ten-second reader sees." §4.2 T15 requires **zero** `[NEEDS:]` chips
in the hero block. The built page ships it in the hero anyway. The IA doc was right: this is the one
chip on the site that is a question *to himself* rather than a question *about a number already on
screen*, and it is the only one that reads as a stub. Every other chip on the site reads as rigour.
Move it or answer it.

**C. Chip density in two places crosses from rigour into template.** The chips work — genuinely —
when they hang off a number: `which percentile, on which device population?` under `15s → under 2s`
is exactly the question I was about to ask, asked first, which is disarming. Two places break it:

- `work-1440.png`, case row 01: the `COLD START` qualifier line carries **two** chips
  (`which percentile, on which device population?` *and* `device lab, production telemetry, or
  staged pre/post?`) in one qualifier block, making that line more red than black.
  `04-ia.md` §5.0 rule 6 caps this at **one chip per `MetricDelta`**, precisely because "three
  unqualified fields rendering as three separate amber chips under one number reads as a broken
  template". The `SESSION TIME` cell on `home-1440-full.png` has the same problem
  (`league entrants, or everyone active?` + `which window, against which baseline?`).
- `work-steps-premier-league-1440.png`, header block: `TEAM` and `TIMELINE` are *entirely* red
  question, with no black text at all. A header block where two of three fields are questions reads
  as a stub, not as candour. Render `not stated` in muted grey and collapse the question into one
  place, per the site's own rule.

**Minor, noted not pressed:** the `MetricDelta` fill encodes min/max, so on a down-is-good bar
(`15s → under 2s`) the dark segment marks the *result*, while on an up-is-good bar
(`3.5 → 7.8 min`) the same dark segment marks the *baseline*. Identical visual, inverted referent.
On a site whose thesis is "I encode numbers carefully", worth one look.

---

## Bottom line

I would take the call. I would open it by asking who signed off on the eight weeks. I would hire at
APM/PM I with a metric-definition remit, and I would tell him that the thing standing between him
and the next level is not a better number — it is one page showing him changing another person's
mind.
