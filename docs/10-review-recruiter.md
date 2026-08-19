# 10 — Review, Pass D: the product recruiter

**Agent 10, Pass D.** 20 seconds. Phone. 390×844. Screenshots read: `home-390.png` (first screen)
and `home-390-full.png` (scroll reach only).

I am a filter, not an evaluator. I need eight facts and one line I can paste into Slack. Everything
below is what I could and could not get in twenty seconds.

**Measurement note.** `home-390-full.png` is 780 × 14838 device px at DPR 2, i.e. **7419 CSS px of
page**. All CSS-px positions below are device px ÷ 2. A 20-second thumb scroll on a phone covers
roughly 2,000–3,000 CSS px — about the first 40% of this page. Anything past ~3,000 CSS px did not
exist for me.

---

## 1. The eight facts

| # | Fact | Verdict | Evidence |
|---|---|---|---|
| 1 | Current role | **FOUND** | `home-390.png`, identity paragraph: *"Product Analyst at HCL Healthcare since October 2024"* |
| 2 | Years of experience | **NOT FOUND as a number** | `home-390.png` gives a start date only — *"since October 2024"*. No years figure anywhere in the first screen. I have to subtract |
| 3 | Domain | **FOUND** | `home-390.png`: *"on a consumer health app"* |
| 4 | Product scope | **FOUND** | `home-390.png`: *"the roadmap, the PRDs, and what ships in what order, on a consumer health app with 1M+ registered users. Two of those launches were 0→1: a step-based league, and an AI-generated health report."* Best line on the page |
| 5 | Location | **NOT FOUND** | Not on the first screen. `Noida` first appears at device y ≈ 12030 (CSS ≈ 6015) in the TRACK RECORD row *"Product Analyst · HCL Healthcare · Noida"*, and again in the footer at device y ≈ 14440 (CSS ≈ 7220). Both are past 80% of a 7419-px page. Unreachable in 20 seconds |
| 6 | Target role | **FOUND** | `home-390.png`: *"Open to PM and APM roles in consumer product, health and applied AI."* |
| 7 | Resume link | **NOT FOUND** | Not in the nav: at 390 the bar in `home-390.png` is `Aniket Agarwal` on the left and the word `Menu` on the right — the `Resume ↗` button is collapsed inside the panel and invisible until I tap. Not in the hero link row either: that row is `Read the work ↓` / `aniketagarwalmhq24@gmail.com [copy]` / `LinkedIn ↗` and contains **no resume affordance**. The only visible `Resume ↗` on the whole page is at device y ≈ 14270 (CSS ≈ 7135), in the contact block at the very bottom |
| 8 | LinkedIn link | **FOUND** | `home-390.png`: `LinkedIn ↗`, last item of the hero link row |

### Verdict on the gate: **FAILURE.**

Five of eight clean. One (fact 2) requires arithmetic. **Two — location and resume — I could not
find at all** in twenty seconds, and the resume is the single fact this reader is actually here for.

**Where I looked for the two I missed:**

- **Location:** the nav bar, the identity paragraph, the `Currently:` line, and the link row — the
  four places on the first screen where any identity string lives. Then a fast scroll: the Grounded
  pointer, the proof strip, and the first two case-study rows. Nothing. It is in the timeline row and
  the footer, at 81% and 97% of page height respectively.
- **Resume:** the top-right of the nav first (that is where it always is), then the hero link row,
  then a scroll. Nothing until the foot of the page. IA §3.1 step 1 says the resume is *"fact 7
  acquired in under a second… this is why Resume is a button and not a nav link."* At 390 that button
  is behind `Menu`, so the design's own fastest fact is the one that costs a tap.

### The cause of the resume miss is visible and fixable

IA §3.1 specifies the link row as `Resume (PDF) · LinkedIn · aniketagarwalmhq24@gmail.com`. What
ships is `Read the work ↓` / email / `LinkedIn ↗`. The resume was dropped from the row and the row
gained a navigation link that is not a fact. Put `Resume (PDF)` back in the row and fact 7 is
acquired at 390 without a tap.

---

## 2. The 30-second test checklist (§4 of `04-ia.md`), T1–T24

Run against S1 = `home-390.png` and S2 = the 720–1564 CSS band of `home-390-full.png`
(device 1440–3128). Rows requiring S3–S6 are marked UNDETERMINED with the reason.

### 4.1 — the eight facts

| # | Check | Result | Note |
|---|---|---|---|
| T1 | S1 contains `Product Analyst` | **PASS** | First words of the identity paragraph |
| T2 | S1 contains `October 2024` **and** `present` | **FAIL** | `October 2024` is there. The literal string `present` is **not on the page**. The rendered copy is *"at HCL Healthcare since October 2024 — the roadmap, the PRDs…"*; the em dash starts the next clause, it is not a date range. The sense survives via "since"; the literal check does not |
| T3 | S1 contains `HCL Healthcare` | **PASS** | — |
| T4 | S1 contains `1M+ registered` | **PASS** | *"1M+ registered users."* Note the timeline at device y ≈ 12100 says *"1M+ registered beneficiaries"*. Two nouns for one number on one page — pick one |
| T5 | S1 contains `Noida` | **FAIL** | Absent from the first screen entirely. See fact 5 above |
| T6 | S1 contains a line naming the roles he is open to | **PASS** | *"Open to PM and APM roles in consumer product, health and applied AI."* |
| T7 | Resume affordance in the nav **and** in the hero link row | **FAIL — both halves** | Nav at 390 is wordmark + `Menu`, no resume button. Hero link row has no resume. Zero of two |
| T8 | S1 shows a LinkedIn link | **PASS** | `LinkedIn ↗` |

### 4.2 — the gate

| # | Check | Result | Note |
|---|---|---|---|
| T9 | H1 reads exactly *"The roadmap was engagement. The app took fifteen seconds to open. / I spent eight weeks there instead. We shipped it under two."* | **PASS** | Character-exact, both sentences, `home-390.png`. Rendered as two type sizes (large H1 + smaller second line) rather than two lines of one block — legible and defensible, but it is not literally what the spec drew |
| T10 | Hero link row fully visible in S1, not clipped, not below the fold | **FAIL** | It is *rendered* in `home-390.png` and not clipped — but the email row sits at CSS y ≈ 751 and `LinkedIn ↗` at CSS y ≈ 794. IA §3.1 states the usable height at 390×844 after browser chrome is **~730px**. Both links are below that line. On a real phone the reader scrolls to reach the two live links. §3.1 gives the remedy verbatim: *"If the link row falls below the fold at 390×844, the hero is over budget"* — and the over-budget block is identified in T15 below |
| T11 | A pointer to Grounded exists in the hero block, visible in S1 or S2 | **PASS** | Not in S1. In S2 at device y ≈ 1980–2360: *"If you assess AI PMs by opening the demo first: Grounded scores generated health text against four rules, in your browser, with the whole rule set readable. Run it →"* |
| T12 | The proof strip is visible in S2, three cells | **FAIL, twice over** | (a) S2 (CSS 720–1564) contains only the `BUNDLE SIZE` cell (device 1950–2250) and the top of `COLD START` (device 2600–2960). `SESSION TIME` starts at device y ≈ 3700, i.e. CSS 1850 — nearly 300 CSS px past the bottom of S2. Two cells, not three. (b) **The strip is not three cells. `BUNDLE SIZE 25MB → 6MB · 76% smaller` renders twice** — once at device y ≈ 2010 with the qualifier *"Two stated totals; the basis is the open question below"*, and again at device y ≈ 3140 with the qualifier *"download, install, or APK/AAB size?"*. Same label, same number, same bar, ~565 CSS px apart. Order shipped is BUNDLE · COLD START · BUNDLE · SESSION TIME, which also breaks §5.2's *"cold start first because the H1 primed it"* |
| T13 | Every proof cell shows a qualifier line under the number, same size as the label, not a tooltip | **PASS** | All four cells carry a visible mono qualifier line. Nothing is on hover. This is the one thing the strip gets unambiguously right |
| T14 | S3 (1440) shows case-study rows stacked full-width | **UNDETERMINED** | Requires `home-1440.png`, outside my assigned read set. Mobile is single-column by necessity and says nothing about the desktop grid |
| T15 | Chips on S1+S2 combined: at most 3, **zero in the hero block** | **FAIL** | The count is fine — 2 in the S1+S2 band. The hero condition fails outright: `home-390.png` shows `Currently: one clause — what is on your desk this month?` at CSS y ≈ 545–660, inside the hero, above the link row. §5.7 rules this line onto `/about` *specifically* so it is not the first chip a ten-second reader sees, and calls the failure mode by name: *"a `Currently:` followed by a question mark reads as an unfinished template."* It does. It is also ~110 CSS px tall and is what pushes the link row past 730 in T10 — one deletion fixes two rows. Two further breaches of the same section: the page carries **~9 visible chips** against the 3 budgeted in §5.8 (hero 1, proof strip 4, case rows ≥4), and `SESSION TIME` carries **two chips under one number** — *"league entrants, or everyone active?"* and *"which window, against which baseline?"* — which §5.0 rule 6 forbids in the exact words *"reads as a broken template"* |
| T16 | S6 (320px) — no horizontal scrollbar, no clipped text | **UNDETERMINED** | Requires `home-320.png`, outside my assigned read set |
| T17 | Nav bar height shrinks on scroll at 1440, wordmark type size unchanged | **UNDETERMINED** | Requires two scroll states at 1440; I have one mobile above-the-fold frame |
| T18 | Mobile `Menu` control is the word "Menu" | **PASS** | `home-390.png`, top right, the literal word. No hamburger glyph |

### 4.3 — case study and approach

| # | Check | Result | Note |
|---|---|---|---|
| T19 | S4 header block: Role, Team, Timeline, `I did not` line | **UNDETERMINED** | Requires `work-two-seconds-1440.png` |
| T20 | S4 shows a bolded load-bearing sentence | **UNDETERMINED** | Same |
| T21 | S4 headings are claims, not labels | **UNDETERMINED** | Same. Weak positive signal from the homepage: the case-study rows are headed by claims (`01 · TWO SECONDS` → *"The roadmap was engagement. The app took fifteen seconds to open."*; `02 · STEPS PREMIER LEAGUE` → *"Content, incentives, competition. Two of the three you have to keep paying for."*), never `Problem` / `Solution` |
| T22 | S5 shows exactly three beliefs | **UNDETERMINED** | Requires `approach-1440.png` |
| T23 | S5 shows the postmortem block, amber, phrased as a question | **UNDETERMINED** | Same |
| T24 | Every page in S1–S5 ends with exactly one next-step link | **FAIL for S1** (rest UNDETERMINED) | The homepage ends with **two stacked contact blocks**, each with the same email and the same `copy` button: *"If you want to argue with a number on this page, that is the conversation I want."* at device y ≈ 13590, then *"If any of this is a problem you have right now, I'd like to hear about it."* at device y ≈ 14010 — ~210 CSS px apart. The second is followed by a three-link row `LinkedIn ↗ · Resume ↗`. That is one duplicated ask and a link menu, not one next step. §6 says `/` should end pointing at `/work/two-seconds`; no such link exists at the foot of the page |

**Rows run: 24. PASS 8 · FAIL 7 · UNDETERMINED 9.** Of the seven failures, five (T5, T7, T10, T12b,
T15) are on the recruiter's own path and four of them share two root causes: the `Currently:` chip
sitting in the hero, and the resume being dropped from the link row.

---

## 3. Does the amber-chip strategy work on this screen?

The strategy is right and the render is wrong. Three specific problems, all visual, none about
whether the questions should exist.

1. **They are not amber.** `03-design-system.md` §9.2 specifies mono, `--color-flag` on
   `--color-flag-tint`, a filled tinted box with 2px radius. What ships (`home-390-full.png` device
   y ≈ 2820–2960, magnified) is **crimson-red mono text with a fine dotted underline and no
   background tint at all**. On a first read that is the visual grammar of a spell-checker error or a
   dead link, not of an annotation. Red next to a number says *this number is wrong*. Amber-on-tint
   says *this number's method is unpublished*. The whole rhetorical payload is in that difference and
   the render loses it.
2. **Nothing labels them as questions the author asked himself.** There is no `NEEDS:`, no
   "unanswered", no bracket — the `sr-only` "Unanswered:" prefix is invisible to me. A sighted
   twenty-second reader gets a red fragment mid-caption: *"which percentile, on which device
   population? · 8 weeks · Launch time against a 2s benchmark"*. Nothing tells them a human chose to
   leave that visible.
3. **Density kills the reading.** One chip per number reads as rigour. Nine chips down one page, two
   of them under a single number, and one of them in the hero before any number has been shown, reads
   as a template with fields left blank. §5.8 budgeted three for exactly this reason.

Fix the colour, add a one-word label, cut the homepage back to three, and this becomes the most
distinctive thing on the page. As shipped it is the most distinctive thing on the page in the wrong
direction.

---

## 4. The Slack line

What I can actually paste, using only what I could extract in twenty seconds:

> **Aniket Agarwal** — Product Analyst at HCL Healthcare since Oct 2024. Owns the roadmap, PRDs and
> release order on a consumer health app with 1M+ registered users; two 0→1 launches (a step-based
> step league, an AI-generated health report) and took cold start from 15s to under 2s. Open to
> PM/APM in consumer product, health and applied AI. Portfolio: [url] · LinkedIn: [link]

**What I could not put in it, and would have to chase him for:** his location and his resume PDF —
the two things a recruiter is asked for first in the reply to that message. Both exist on the site;
neither is reachable in twenty seconds on a phone.
