# 10 — Review, Pass C: VP Product

**Agent 10.** Entry point `/approach`, cold, no homepage. Execution is assumed at this altitude.
What I am testing: is there a point of view that is his, and is there evidence he can see himself.

Screenshots read: `approach-1440.png`, `approach-1440-full.png`, `home-1440.png`,
`work-two-seconds-1440-full.png`. Source read: `content/approach.mdx`.

**Verdict: YES — 30 minutes.** Belief 03 and the ABDM note clear the bar on their own. The
postmortem section is the weakest thing on a strong page, and it is weak for a fixable reason:
the failure it says it cannot write is already written, three clicks away, on `/work/two-seconds`.

---

## 1. The three beliefs — judged separately

The three headings are all aphorisms, and two of the three are borrowed. The bodies are not. On
this page the headings are the weakest layer and the argument underneath is the strongest — which
is the opposite of the usual failure, and worth saying plainly before the criticism.

### 01 — "Fix the floor before you build the ceiling" → GENUINE, badly titled

The heading is the single most common platitude in product writing. Tech debt before features.
Every PM says it; nobody is differentiated by it.

The body is not that argument at all:

> "an engagement feature shipped onto a fifteen-second launch is only ever measured on the people
> who waited. Those people are a smaller and far more patient group than the one the feature was
> designed for. Whatever numbers come back, they are not really about the feature."

That is a **selection-bias argument about measurement validity**, not a quality argument. It says
the floor does not slow your metrics, it invalidates them. That is a real and non-obvious claim,
and I have interviewed senior PMs who could not construct it.

He then does the thing that separates a belief from a slogan — names the failure mode on his own
side and narrows the rule until it is falsifiable:

> "a team spends a quarter on foundations, ships nothing anyone outside the building can see, and
> calls it maturity. So the test is narrower than 'is the tech debt bad'. It is whether the floor is
> corrupting the measurement, so that the next feature's result would be unreadable even if you
> shipped it."

That is a decision rule with a trigger condition. It is his.

**The fix is one line.** The heading is throwing away the belief. Make the heading the claim —
something on the axis of *a broken floor does not slow your numbers, it invalidates them* — and a
VP scanning the section rail in `approach-1440.png` sees an argument instead of a proverb. Right
now item 01 in that rail is the least interesting line in a six-item list.

### 02 — "A decision with no cost was not a decision" → GENUINE, and structurally incomplete

Heading again generic (trade-offs exist). Body again real, and the economics are the good part:

> "Content and incentives buy attention you have to keep paying for. Another article, another
> voucher, next week, forever. Competition manufactures the reason to come back out of other users,
> which is the only engine of the three with no recurring invoice attached to it."

Three options reduced to one axis — recurring marginal cost of a retention loop — and the winner
chosen on that axis. That is how the choice should have been made and it is not the way most
candidates narrate it.

And the closing pair is the best writing on the site:

> "A trade-off named at the time is a decision. The same trade-off named afterwards is a defence."

**The hole, and it is a real one.** He names the cost precisely — "a competition sorts a user base
into people who like being ranked and people who feel worse for it, and in a health product the
second group is not a rounding error" — and then does nothing with it. There is no sentence about
what he built to pay that cost. Did he cap league size? Tier by baseline activity? Hide rank below
the median? Bracket by cohort? Cap the visible downside?

That absence matters more than any missing metric on this page. His own standard is that a
trade-off is only a decision if it is named **at the time**. Naming it and shipping no mitigation
is naming it afterwards, in prose, on a portfolio. Either there was a mitigation and it is missing
from the page — a large omission — or there wasn't, and the belief is one step less earned than it
reads. One sentence closes this. It is the cheapest high-value edit on the page.

### 03 — "A metric you cannot defend is a metric you do not own" → GENUINE, and this is the one that buys the interview

He takes his own headline number — session time 3.5 → 7.8 min, the most flattering figure he owns —
and attacks it:

> "A health product that works can shorten sessions: open it, log the thing, leave. Time in app is a
> reasonable metric for a competitive feature whose loop is checking where you stand, and a poor one
> for a product whose job is to get you outdoors. Both are true at once, which is why the number
> needs an argument beside it and not a bigger typeface."

Candidates defend their best number. They do not volunteer the reading under which it is evidence
of product failure. Holding both readings simultaneously without collapsing to either is the actual
skill, and "not a bigger typeface" tells me he knows what portfolio inflation looks like.

Then he specifies the replacement instrument, correctly:

> "week-2 to week-4 return, measured on the people who joined a league against the same weeks for
> people who did not."

Treatment, comparison, window. That is a quasi-experimental design stated in one sentence, and it is
the strongest single line of evidence on this site that he can think about causality.

**The evasion.** "Session time **was the declared** north star for that launch." Declared by whom?
Passive voice, and it is load-bearing. Three different candidates are hiding in that clause:

- he chose it — then it is a mistake he owns, and the section is a postmortem;
- he inherited it and argued to change it and lost — then it is an org story, and interesting;
- he inherited it and never argued — then this entire belief is retrospective, and belief 02's own
  standard convicts it: *the same trade-off named afterwards is a defence.*

The page argues brilliantly about the metric and never says which of the three happened. That is not
a missing denominator; that is a missing sentence about his own agency, and it is not flagged as a
gap anywhere. **This is the first thing I would ask about.**

---

## 2. Self-awareness and the postmortem — the central judgement

### What is on the page

`approach-1440-full.png`, section 04, and the crop of it: heading, four short paragraphs, a
crimson gap callout labelled `NOT ANSWERED YET` reading `one decision that did not work, and what it
cost`, then the line "Still open."

The setup is good and I want to credit it before I take it apart. He pre-empts exactly the reading
I was forming as I scrolled:

> "Everything above is a belief that worked, which is a suspicious set. **A page of beliefs with
> nothing broken attached to it is either very early or heavily edited.**"

And he identifies the genre he is refusing:

> "There is a version of this section I could write in ten minutes: something small, safely
> historical, with a lesson bolted on the end. Those are easy to spot, because they cost the writer
> nothing. A postmortem is worth reading only if the decision had a consequence, and 'I would have
> communicated more' is not a consequence."

Knowing what a worthless postmortem looks like is genuine evidence of taste. That paragraph is not
the problem.

### Why it does not work anyway

**It is a confession of having no confession.** 130 words explaining why he is not writing the
section — more words than the answer would have taken. The length is the tell. Restraint that
explains itself at length stops being restraint and becomes a performance of restraint.

**"Cannot" is the wrong verb, and it is in the H1.** "The one section I cannot write yet." Nothing
external prevents him. He can write it; he is choosing not to publish one. *Cannot* imports an
excuse into the most prominent sentence on the page. *Have not chosen to write* or *have not
published* is honest and costs nothing. One word decides whether this reads as rigour or as cover,
and right now it is the wrong word — and it is the word in the H1 that a VP reads first
(`approach-1440.png`).

**It fails its own page's standard.** Belief 02: *"A trade-off named at the time is a decision. The
same trade-off named afterwards is a defence."* Section 04 takes the largest trade-off on the page —
what his own judgment has cost — and defers it indefinitely. He wrote the sentence that convicts
his own postmortem section. A VP who reads the page in order will land on that, and it is the kind
of contradiction that is worse for being self-inflicted by good writing.

**Triple-signalled.** Between "So the slot stays open" and "Still open" there are three consecutive
statements of the same fact — the sentence, the `NOT ANSWERED YET` label, and the trailing "Still
open." — inside about 200px of vertical space (see the crop). Protesting a gap three times draws
more attention to the absence than the absence warrants. Delete "Still open." The callout says it.

**The chip is a to-do, not a question.** `one decision that did not work, and what it cost` is a
noun phrase — a Jira ticket. `DECISIONS.md` D1-17 requires these be "phrased as a specific
answerable question," and `/work/two-seconds` gets this exactly right: `was any guardrail added to
stop regression?` followed by *"That is the question I would ask a candidate who told me this story,
so it belongs on the page."* That construction works — it converts a gap into evidence of judgment.
The `/approach` chip does not, because it is the only one on the site not phrased as a question.
**Match the two-seconds construction and section 04 improves without new material.**

**The self-description does not match the render.** "So the slot stays open, in the same type size
as the beliefs above." In the crop, the slot's content is small monospace at roughly half the
optical weight of the bold serif lede sentences carrying each belief. It is the *lightest* content
block on the page, not the same size. On a site whose entire premise is that every claim carries its
method, a claim about its own typography that the screenshot falsifies is an unforced error. Fix the
render or delete the clause.

### The finding that changes this section

**The failure he says he cannot write is already written.** `work-two-seconds-1440-full.png`, final
section, in the pink `mistake` callout:

> "Run this again and I would define it up front and accept a slower start in exchange for an
> answer. Not because the fix was the wrong call. Because a fix and the evidence that it worked are
> two deliverables, and I shipped one of them."

That is a specific decision, owned in the first person, with a named consequence — he cannot prove
the eight weeks worked — and a stated counterfactual. It is a better postmortem than most of what
gets written under that heading, and it costs the writer something, which is his own test.

So `/approach` tells a VP entering cold *"I have no broken thing to show you"* while the site's
strongest self-awareness signal sits one link away in the case study `/approach` itself tells him to
read. The page is not short of self-awareness. **It is actively denying its own best evidence.**

**Recommendation, and it is the highest-leverage change on the site.** Rewrite section 04 from
"I cannot write this yet" to "here is the one I have, and here is the larger one I still owe you."
Lift the two-seconds sentence in verbatim, cite it, keep the gap chip underneath for the bigger
failure, phrase the chip as a question. The section stops being an apology and becomes a
demonstration with a stated ceiling. Nothing is invented, no new source material is required, and
the H1 loses "cannot."

**Answering the brief's question directly:** as built, the construction reads as *neither* rigour
nor excuse — it reads as **avoidable**. Not dishonest; the writing is too careful for that. But a
page that argues its way around an empty slot, at length, while a full slot sits unlinked on another
route, is a sequencing failure, and at my altitude sequencing failures are the ones I notice.

---

## 3. The ABDM note with no benchmark — STRENGTHENS, decisively

> "There is a retention figure for ABDM-linked cohorts circulating in Indian healthtech writing. No
> uncited benchmark goes on this site, and that one has no study I can link to, so it is not here."

This is the second-best paragraph on the page and the answer is not close. Anyone can omit a number.
Naming the omission and the rule that produced it is the only way an absence becomes visible as a
standard rather than as ignorance. It also retroactively raises the credibility of every number that
*is* on the site, because it demonstrates the filter is real and has been applied at least once
against his own interest.

What makes it land rather than preen is what follows:

> "What would settle it is a funnel, not a benchmark: what share of people who begin the linking flow
> finish it, what share of them have anything worth pulling, and what those people do in the
> fortnight afterwards. Until someone publishes that, everyone arguing this — me included — is
> arguing from mechanism."

He specifies the study that would falsify him, and then classifies the epistemic status of his own
argument. *Arguing from mechanism* is the correct term and the correct admission. I do not often see
a candidate label their own reasoning as unvalidated while still committing to it.

The surrounding objections are the densest product thinking on the site:

- **Consent as a funnel with an inverted timing problem:** "the pull is most valuable exactly when
  the app has least earned it." That is a real sequencing trap and most people arguing for ABDM
  integration miss it entirely.
- **Coverage dependency:** "an app that promises a complete history and returns two documents is
  worse off than one that promised nothing." Expectation-relative failure, correctly framed.
- **Identifier ≠ user:** "a number created at a hospital registration desk and a person who knows
  they have one are different populations, so any adoption figure has to be read for which it
  counts." This is the one that made me revise my estimate of him upward. It is population
  discipline applied to a headline market statistic, and it is the same instinct that produced the
  selection-bias argument in belief 01. That consistency across two unrelated sections is what tells
  me it is a habit and not a good line.

**Two criticisms.**

**(a) The gesture is having it both ways.** "There is a retention figure ... circulating" collects
credit for restraint *and* the halo of an unnamed favourable number. A reader takes away "there's
supporting data he was too careful to cite." Cleanest fix: delete that sentence and open at "What
would settle it is a funnel, not a benchmark." The discipline is then structural rather than
announced, and the paragraph gets shorter and harder.

**(b) The three objections are buried in one 180-word block.** In `approach-1440-full.png` the best
paragraph on the page renders as an undifferentiated wall, in a page that gives every belief a bold
lede sentence. The peak of the argument is the only part with no typographic entry point. Break it
into three, each with its claim in bold. Costs nothing, and it is what a skimming VP would actually
stop on.

**(c) Ordering, at my altitude.** The market note is section 05 of 06, roughly 9,000px down an
11,576px page. Beliefs 01–03 prove he can reason about work he has already done. The ABDM note
proves he can reason about work nobody has done — which for anyone hiring above APM is the rarer and
more predictive signal. It is filed behind three retrospectives. Partial mitigation: the section rail
in `approach-1440.png` surfaces the title above the fold at 1440, so a VP can jump. That rail is
doing real work and should not be removed.

---

## 4. Would I spend 30 minutes with this person?

**YES.** Unhesitating for a first screen.

What buys it, in order:

1. Belief 03 — attacking his own best number and specifying the treatment/comparison/window design
   he would rather have had.
2. The ABDM identifier-vs-user distinction, and labelling his own argument as mechanism-only.
3. Belief 01's selection-bias reframe of a latency problem, which is the same instinct as (2) in a
   different domain — the repetition is what makes it credible.
4. The two-seconds callout: "a fix and the evidence that it worked are two deliverables, and I
   shipped one of them."

What I would be testing for in the 30 minutes: whether the writing quality is downstream of the
thinking or upstream of it. The prose here is better than the prose of almost every PM I have hired,
which is itself a small flag — a page this well-argued can conceal how much of the judgment was
formed at the time versus assembled afterwards. The single hardest thing to fake live is a decision
he made under time pressure that cost something. That is exactly what the page does not have.

**Non-blockers I am explicitly not counting against him:** absent denominators, absent team size,
absent experiment design. The gap chips are the correct call. Where they are phrased as questions
they read as rigour. Where they are phrased as noun phrases (`/approach` section 04) they read as
backlog, which is a rendering problem, not a character problem.

---

## 5. What I would ask first

**The question:**

> "You wrote that a trade-off named at the time is a decision, and the same trade-off named
> afterwards is a defence. Your postmortem is named afterwards — indefinitely. So take the one you
> almost wrote: session time was 'the declared north star.' Declared by whom? Did you pick it, did
> you inherit it and argue to change it, or did you inherit it and not argue?"

It uses his own standard, targets the one passive construction he leans on, and has no safe answer.
"I picked it" makes belief 03 a real postmortem and I would respect it more. "I argued and lost" is
an org story I want to hear. "I never argued" means the whole section is retrospective and I learn
that in ninety seconds.

**Follow-ups, in order:**

2. "Belief 02 — you say the person coming last is not a rounding error in a health product. What did
   you ship to protect that person?" Tests whether the cost was named at the time or in the writing.
3. "Fill in the open slot right now, out loud. One decision, what it cost, who paid." If nothing
   comes back, the follow-up is not *did you fail* but *was any decision you owned ever large enough
   to fail* — which is the real 22-months-of-scope question underneath.
4. "The two-seconds page says a fix and the evidence it worked are two deliverables. Why did you not
   ship the second one — was the instrumentation absent, or did you not ask for it?"

---

## 6. Fix list, ranked by leverage

| # | Change | Where | Why |
|---|---|---|---|
| 1 | Rewrite §04: lift the two-seconds failure in verbatim, keep the chip beneath it for the larger one | `content/approach.mdx` §04 | The site's best self-awareness evidence exists and this page denies it |
| 2 | Kill "cannot" in the H1 and in §04 | H1 + `approach.mdx:37` | One verb decides rigour vs. excuse |
| 3 | Phrase the §04 chip as a question, matching `two-seconds` | `approach.mdx:47` | D1-17 requires it; the only non-question chip on the site sits on the VP's page |
| 4 | Add the mitigation sentence to belief 02 — what protected the person coming last | `approach.mdx` §02 | Names the cost and then does not pay it |
| 5 | Say who declared session time as north star | `approach.mdx:29` | The largest unflagged evasion on the page |
| 6 | Break the ABDM objections into three bolded claims | `approach.mdx:61` | Best paragraph on the page has no typographic entry point |
| 7 | Delete "Still open." and the "circulating figure" sentence | `approach.mdx:51`, `:63` | Both over-perform a restraint the structure already demonstrates |
| 8 | Fix or delete "in the same type size as the beliefs above" | `approach.mdx:43` | The screenshot falsifies the claim |
| 9 | Date the open slot | §04 | An undated gap cannot be told from an abandoned one |

## 7. Notes for other passes (out of my lane, seen in passing)

- `home-1440.png`: the first coloured element in the hero is a crimson gap chip reading
  `one clause — what is on your desk this month?`. `04-ia.md` T15 requires **zero** `[NEEDS:]` chips
  in the hero block. Beyond the checklist: of all the slots to leave open, "what I am working on
  right now" is the worst one, because it is the only question no external source is needed to
  answer. It reads as abandonment, not as rigour. Pass A/B should treat this as blocking.
- `04-ia.md` T23 specifies the postmortem block is **amber**. It renders crimson `#A32F35`, which is
  correct per `DECISIONS.md` D1-26. The checklist is stale, not the build. Same for the review
  brief's "amber chips" language. T23's *"phrased as a question"* clause, however, is a genuine
  **FAIL** — see fix #3.
- T22 (exactly three beliefs) **PASS**. T21 (headings are claims, not labels) **PASS** on
  `two-seconds` — no `Problem` / `Solution` / `Impact` / `Learnings` heading anywhere in
  `work-two-seconds-1440-full.png`. T24 **PASS** on `/approach`: one closing link, to Two Seconds.
- The `HOW YOU WOULD LEARN YOU WERE WRONG` column in the two-seconds options table is the best
  single artifact on the site. Nothing on `/approach` points at it. Consider a pointer from
  belief 02.
