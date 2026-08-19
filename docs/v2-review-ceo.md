# V2 Review 3 — Startup CEO (Seed to Series B), 90 seconds, mobile only

**Read:** `home-390.png`, then `home-390-full.png`. Nothing else.
**Context I bring:** no product org. First PM hire. I need someone who finds the problem, decides, ships, and tells me the truth afterwards.

---

## 0. The one thing you need to know before the rest

**The homepage is 25,546px tall at 390px wide.** That is roughly **30 phone screens**. V1 was torn down at 4,987px. V2 is **five times longer**.

I gave this 90 seconds. In 90 seconds of mobile thumb-scrolling I got about a third of the way down — through the hero, the proof panel, "By the numbers," and into the second case card. Everything below `y≈9,000` did not happen for me. That includes the entire Experience timeline, all four "How I work" cards, the Lab, and both contact CTAs.

Half of what this site is proudest of is unreachable inside a real first visit.

---

## 1. Would I remember this person tomorrow?

**Yes — but not as a person. As a fact.**

I would remember **"the fifteen-second guy."** `home-390.png`: *"cut a fifteen-second app launch to under two seconds."* That is concrete, physical, and rare — most PM portfolios give me "drove alignment." This one gives me a number I can feel in my hand. `home-390-full.png` at `y≈7,200` backs it with the only honest visual on the page: a Before / Benchmark / Shipped bar chart with `15s`, `2s`, `under 2s`, labelled *"Drawn to scale in seconds."* A named benchmark is a PM instinct, not a designer one. Good.

I would also remember one sentence, at `y≈4,900`:
> *"The AI health report cited as a key USP. I built the artifact; I did not own the sale."*

That is the single most hireable line on the site. It is someone volunteering the limit of their own claim. That is the truth-telling I said I need, and it is buried at screen 6.

**What I would NOT remember: his name.**

This is not a nitpick. Scan `home-390.png`: the only identity marker above the fold is a black square reading **"AA."** Scroll the entire 25,546px of `home-390-full.png`. His name appears exactly once — in the footer legal line at `y≈25,400`: *"Aniket Agarwal · Noida, India · Built with Next.js."*

So the honest answer to "would I remember this person" is: **I would remember the artifact, and I would have to search my history to find the human.** Tomorrow I say to my co-founder "there was a guy who cut a launch from fifteen seconds to two" and I cannot finish the sentence. That is a memorability failure at the most basic level, and it is a five-minute fix.

Is it "a nice-looking portfolio"? No — it clears that bar. There is a real point of view here. But it is a well-argued document about a person whose name it forgot to mention.

---

## 2. Would I reply?

**Yes. Slower than I should, and not from this page.**

What earns the reply: the 15s→2s number, the "I did not own the sale" disclaimer, and the reclassification line at `y≈6,600` — *"I reclassified launch time from an engineering backlog item into a product requirement, and held my own roadmap for eight weeks."* That is the job. He found a problem nobody assigned him, killed his own quarter to fix it, and it worked. For a seed-stage company that is the entire hiring thesis in one sentence.

What slows the reply down, in order of damage:

**a) There is no way to contact him for 24,000 pixels.** The hero (`home-390.png`) offers "View my work," "Résumé," "LinkedIn." No email. No "open to roles." The email button does not appear until `y≈23,700`. On mobile, that is ~28 screens of scrolling to find out he is even looking. Any reader who decides at screen 2 that they like him has nowhere to go and leaves.

**b) He is not a Product Manager.** The eyebrow at the very top of `home-390.png` reads **"PRODUCT MANAGER · CONSUMER · HEALTH · APPLIED AI."** The Experience block at `y≈11,800` reads **"HCL Healthcare — Product Analyst — Oct 2024 — Present."** The hero body splits the difference with the hedge *"Product at HCL Healthcare."*

Three different framings of the same fact, and the most prominent one is the one that is not true. This is the exact opposite of the "tells you the truth afterwards" quality I am screening for, and it undercuts the "I did not own the sale" line I liked — because now I do not know which of his claims are load-bearing and which are positioning. Say **Product Analyst**. Then say what he owns. Owning the engagement roadmap and PRDs on a 1M-user app *as an Analyst* is a stronger story than a soft title claim, because it says the scope outran the title.

**c) One CTA section renders twice.** At `y≈23,100` and again at `y≈24,200` in `home-390-full.png`, the headline **"Have a product problem worth solving?"** appears verbatim, twice, back to back, each with its own black `aniketagarwalmhq24@gmail.com` button and its own "Copy" link. Different body copy, same headline, one screen apart. It reads as a build bug — a CTA section plus the footer's own CTA, both shipped. I am hiring someone to catch exactly this class of thing before it reaches production.

**No internal QA markers found.** I scanned all 25,546px for "NEEDS:" / "not stated" strings. Clean. V1's worst defect is genuinely gone.

---

## 3. First screen only — what I learn, in what order, and what is missing

`home-390.png`, top to bottom:

1. **"AA"** — a monogram. I do not know whose.
2. **Category:** Product Manager · Consumer · Health · Applied AI. (Claimed title; see 2b.)
3. **Thesis:** *"I find the reason a product isn't being used — then I go fix it."* Six lines of very large type. This is good — it is a diagnosis-first identity and it is not generic. It is also the correct thesis for a seed-stage hire.
4. **Employer, tenure, scale:** HCL Healthcare, Oct 2024, 1M+ registered users.
5. **Three proof claims chained into one run-on sentence:** two 0→1 products, 15s→2s launch, AI report as USP in five enterprise deals.
6. **CTAs:** View my work / Résumé / LinkedIn.
7. The top edge of a "PRODUCT IMPACT" panel: `1M+` and `+20%`.

**The order is right. Thesis, then employer, then evidence. That is the correct hierarchy and V1 did not have it.**

Two structural problems in that first screen:

- **The paragraph is eight lines long on a 390px viewport** and packs four separate claims into one sentence chain. The owner's own constraints forbid giant paragraphs. This is one. Break it. Three claims want to be three lines, or one line and a stat row.
- **The sage-green bars under `1M+` and `+20%`** in the PRODUCT IMPACT panel (visible at the bottom of `home-390.png`, full at `y≈1,800`) are decorative. They have different lengths and no axis, no scale, no denominator. A bar that encodes nothing is a chart-shaped decoration, and on a page whose whole argument is "my numbers are real," a fake-looking bar is expensive. Delete them or make them mean something.

**Missing from the first screen:**

- **His name.** Stated above, worth repeating.
- **Availability.** Is he looking? Now? Notice period? Nothing until `y≈23,500`.
- **How the million users arrived.** See section 5.
- **Team shape.** Did he have engineers? How many? Was he one of forty PMs or the only one on that surface? "Own engagement on a consumer health super-app" is at `y≈12,100` and even there it does not tell me whether he was steering a team or filing tickets into someone else's. For a first-PM hire this is the question I care most about and the page never answers it.
- **Speed.** How long from joining to first shipped thing. He has the raw material — Oct 2024 start, eight-week initiative, twelve-week engagement suite — but never assembles it into "I shipped X in my first N weeks."

---

## 4. Strongest and weakest single element

**Strongest: the Step Syncing case card** (`home-390-full.png`, `y≈6,000–7,500`).

It is the only block on the page where a claim, a decision and a picture sit in the same frame. Problem in one sentence (*"The step count people opened the app for sat behind a fifteen-second wait"*). Decision in one sentence (the reclassification line). Then a **to-scale** bar chart with an explicitly labelled *Benchmark: 2s — "What we measured against."* Naming your benchmark before showing your result is the difference between a PM and a person quoting numbers. Build the rest of the page out of this card.

**Weakest: the tool chip cloud** (`y≈22,300–22,900`) — SQL, Python, Mixpanel, Amplitude, CleverTap, Tableau, Figma, JIRA, Confluence, Notion.

Ten outlined pills in a wrapping grid. This is the single most generic artifact in the portfolio genre; it appears identically on every resume-website on the internet and tells me nothing — every candidate for this role has used Jira and Mixpanel. It actively contradicts the site's own thesis, which is *"I find the reason."* Nobody finds a reason with Confluence. Delete the block. If tooling must appear, it belongs inside a case study as evidence ("cohort analysis in Mixpanel across three retention strategies"), where it is a fact rather than a badge.

**Runner-up weakest: the Grounded lab stat block** (`y≈20,800–21,300`): `CASES IN THE SET 16` / `SCORED DIMENSIONS 4` / `FULL RUN 2.62ms` / `SERVER CALLS 0`.

`2.62ms` and `0 server calls` are engineering vanity metrics. This is precisely the V1 sin — bundle size as the lead metric — reintroduced in a new room. I do not care how fast the harness runs. I care what it *found*: how many of the 16 summaries failed the rubric, and what the worst failure was. One line of "11 of 16 passed; the five that failed all invented a normal range" would make Grounded the second-strongest thing on the site. As shipped it is a demo bragging about its latency.

---

## 5. The million users and the channel he did not build

**Does the page get there before I work it out myself? No.**

Every surface presents `1M+` as flat, unqualified scale:
- Hero: *"a consumer health app with 1M+ registered users"*
- PRODUCT IMPACT panel: `1M+ / Registered users / Consumer health super-app`
- By the numbers, `y≈3,200`: `1M+ / Registered users / "A consumer health super-app where I own the engagement surface"`
- Experience, `y≈12,100`: *"Own engagement on a consumer health super-app with 1M+ registered users"*

Four statements of the number. Zero statements of where it came from.

I worked it out myself, at roughly second 40, from two clues on the page: "HCL Healthcare" and "5+ enterprise closes." That is corporate health benefits. The million did not opt in — they arrived bundled with their employers' contracts.

**The moment I work that out, the number deflates.** Not because it is dishonest, but because I now suspect the page hoped I would not notice. And that suspicion contaminates the line I most liked ("I did not own the sale") — because if he is willing to be precise about the enterprise deal, why is he vague about the enterprise users?

**Should it get there first? Absolutely, and it is the biggest upside on the page.**

Owned distribution is not a weakness. It is a *harder and more interesting problem*, and it is the exact problem a seed-stage company has:

> "The million users arrived through employer contracts, not through me. They were registered and indifferent. My job was to find out why a captive audience still would not open the app — and the answer was fifteen seconds of load time, not a missing feature."

That version does three things the current page does not. It disarms the scale question before I can ask it. It explains *why* the diagnosis matters — a captive audience that won't engage is a purer signal about the product than a churning acquired one. And it converts a claim I would have discounted into evidence of judgment. Two sentences in the hero. It makes the whole page more credible, not less.

Right now the omission costs him. Say it out loud, early, and it becomes the best thing about the story.

---

## 6. What would make me reply faster

Ranked. The top three are the difference between a reply and a close.

1. **Put his name in the hero.** Next to the AA monogram or under the eyebrow. Currently it exists only in the footer copyright line. I cannot recommend a person to my co-founder whose name I never read.
2. **Cut the page to a third — 8,000px, not 25,546px.** Hero → proof panel → three case cards → contact. Move "How I work" (four cards, ~4,700px of unillustrated prose, `y≈15,300–20,000`) to /approach where it already lives. The Experience timeline (`y≈11,000–15,300`) is a resume block on a page that should not be a resume; one line and a Résumé link does the same job. Nothing below screen 8 is currently being read by anyone like me.
3. **Move contact into the first screen.** The email button at `y≈23,700` should also sit in the hero, with one line of availability: what he is looking for and when he can start. Right now the page assumes I will scroll 28 screens to discover he is open to being hired.
4. **Fix the title.** "Product Analyst at HCL Healthcare, owning the engagement roadmap on a 1M-user app." The scope outrunning the title is the story. The soft "Product Manager" eyebrow is the only thing on the page that made me doubt him.
5. **Name the channel in the hero.** Section 5. Two sentences, large payoff.
6. **Answer "did he have a team."** One clause: how many engineers, what he could and could not direct. This is the top question for a first-PM hire and the page is silent on it across all 25,546px.
7. **Delete the duplicated CTA section** at `y≈23,100` / `y≈24,200`. It reads as a shipped bug.
8. **Delete the tool chip cloud** and the decorative sage bars under the hero stats.
9. **Give Grounded a finding.** Replace `2.62ms` / `0 server calls` with what the harness caught.
10. **Front-load one visual.** The first real product visual is the Step Syncing bar chart at `y≈7,000` — screen 9 on mobile. Something to look at needs to arrive by screen 2.

---

## Verdict

There is a real product mind in here. The thesis is right, the 15s→2s story is genuinely memorable, the benchmark labelling shows instinct, and "I built the artifact; I did not own the sale" is the kind of sentence that gets someone hired.

All of it is packed into a 30-screen mobile document that never says his name, does not offer a way to reach him until screen 28, claims a title he does not hold, and ships a duplicated section. On mobile, in the 90 seconds this actually gets, the page loses to its own length.

**Reply: yes, eventually. Reply within the hour: not from this page.**
