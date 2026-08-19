# 08 — Visual QA, desktop and tablet

**Agent 8.** Evidence base: every `*-768`, `*-1024`, `*-1440`, `*-1920` screenshot in
`docs/screenshots/iteration-2/`, plus `home-1440-full`, `work-two-seconds-1440-full`,
`approach-1440-full`, `lab-grounded-1440-full`, `work-steps-premier-league-1440-full`.
Crops referenced below were cut from those PNGs and are reproducible with the coordinates given.

Judged against `docs/DECISIONS.md`, `docs/04-ia.md` §4, `docs/03-design-system.md`.

---

## 0. The verdict, stated first

**A strong Head of Product would take the call — but the site is currently arguing against itself.**

The writing is the best thing here and it is well above the bar for the record it is drawn from.
`work-two-seconds-1440.png` and `approach-1440.png` contain sentences no template produces:
*"A fifteen-second launch is an adoption problem, and feature analytics cannot see it."*
*"I chose the least reversible option, and I would rather have that written down in advance than
discovered in week nine."* `lab-grounded-1440.png` shows a real, working, deterministic artifact
with its own scorecard. That is the 30-minute conversation.

What undercuts it is not taste. It is that **four of the five load-bearing objects on the desktop
build are either broken, mis-encoded, or ship in the exact form their own spec forbade**:

| Object | Spec | What shipped |
|---|---|---|
| `DecisionTable` | the decision artifact | **column 4 clipped mid-word at 1440px**, cells at 1–2 words per line |
| `MetricDelta` | one scale, ~20 instances | **three different encodings on one page**, distinguished by hue alone |
| `ProofStrip` | "three rows, at every width" (§5.3) | **three-across grid with dividers** — the banned stat banner |
| `/approach` | "no rail on this page… inventing one would be the documentation-template look" (§3.4) | **a numbered right rail**, plus six sections instead of three beliefs |
| Right rail (case studies) | 240–258px of denominators + pull quote (Part 4) | **empty for ~17,000px of page height** |

None of this is expensive to fix. All five are structural, not cosmetic, and all five are visible
inside the first two screens on a 1440 display.

---

## 1. Professional, or a resume poured into a template?

**Professional — with three specific tells pulling the other way.**

### Evidence it was made, not generated

- **`home-1440.png`** — no hero image, no gradient, no card grid, no icons, no pills, no filled CTA
  button. The strongest call to action on the page is a selectable email address in mono. That is a
  decision very few templates make and no generator makes.
- **`work-two-seconds-1440.png`** — the `OwnershipBlock` reads `I OWNED / WE SHIPPED / I DID NOT
  OWN`, and the third column is populated with real self-limitation: *"The engineering. I did not
  pick the levers, profile the startup path, or write a line of the code — the tech team did."*
  A template has no column for what you did not do.
- **`lab-grounded-1440.png`** — a two-pane live evaluator: sample-case selector, source panel with
  reference ranges, editable generated summary, per-dimension verdict with the rule stated in prose
  (*"No diagnostic assertion, dosage or treatment instruction found."*). This is the single most
  credible object on the site and it plainly could not have been poured in from a resume.
- **`home-1440-full.png`**, timeline block — five rows, real titles (`Product Operations`,
  `Product Management Intern`), no logos, no dots, no spine. Compression, not decoration.

### The three tells pulling the other way

1. **`home-1440.png`, hero, y≈868** — `Currently: one clause — what is on your desk this month?`
   An amber chip **inside the hero block**. IA §5.7 explicitly ruled this off the homepage
   (*"a `Currently:` followed by a question mark reads as an unfinished template, and it would be
   the first amber chip a ten-second reader sees"*), and T15 requires **zero** in the hero. It is
   the fourth line a reader's eye lands on and it is literally an authoring instruction rendered in
   red. This one chip does more damage than the other seven on the page combined.

2. **`work-steps-premier-league-768.png` and `work-ai-health-reports-1024.png`, header meta grid** —
   `ROLE: Product Analyst, HCL Healthcare` · `TEAM: [how many engineers, a designer, a QA function?]`
   · `TIMELINE: [how long from cohort analysis to launch?]`. **Two of the three ownership fields
   contain nothing but a question.** Rigour is a stated fact plus a bounded caveat. A field whose
   entire value is a red question is a blank field with makeup on, and it is the block IA §3.3 puts
   at minute 1:00 of the Head of Product's read.

3. **Amber density on `/`.** Counting `home-1440-full.png`: 1 in the hero, 4 in the proof strip
   (cold start carries **two**, violating §5.0 rule 6 — "at most one per `MetricDelta`"), 3 across
   the case rows. **Eight visible chips against a budget of three** (IA §5.8, T15). Three columns of
   red questions side by side is the dominant visual of screen two. At three the chips read as
   rigour; at eight they read as a form nobody finished. The fix is not to remove honesty — it is to
   collapse per-metric to one chip and move the rest into the drawers.

---

## 2. Sections that would work on any PM's site

Named by file, in descending order of genericness.

| # | Section | File | Why it is generic |
|---|---|---|---|
| 1 | **Beliefs / "HOW I WORK"** | `home-1440-full.png`, y≈1044–1250 | Three rows of near-identical length in a rigid claim-left / argument-right two-column table. §3.1 says beliefs stay **single-column at every width**; §3.4 says *"if all three run to the same length the page reads as generated."* Both violated. The two-column lock-step is the strongest "generated" signature on the homepage. |
| 2 | **`/lab` index** | `lab-1440.png` | Card stretched to the full 1200px container with ~400px of dead white space inside it to the right of its own content. Spec 5.5 caps it at 640px for exactly this reason. As shipped it reads as a slot waiting for two more cards — the thing rejected-list #55 forbids. |
| 3 | **`/about` opening** | `about-1440.png`, `about-768.png` | A left-aligned serif column with nothing else on the page. Correct and honest, but there is not one element here that identifies whose site it is until you read the words. No timeline above the fold, no anchor. |
| 4 | **Case-card rows** | `work-1440.png`, `home-1440-full.png` | Eyebrow → bold claim → sub → `Read →` → metric. The *content* is specific; the *shape* is the default portfolio row. What would fix it costs nothing: the bold claim is currently set to a **narrower measure than the sub-line beneath it** (see §5), which is both generic and wrong. |
| 5 | **Footer + contact** | `home-1440-full.png`, y≈1800–1980 | Two near-identical email + `copy` blocks stacked ~100px apart ("If you want to argue with a number on this page…" then "If any of this is a problem you have right now…"). IA §2.5 specifies **one row, mono, small, nothing else**. Two contact blocks in 200px is a template seam. |

Not generic, and worth protecting: `lab-grounded-1440.png` (the demo), the `OwnershipBlock` on all
three case studies, the `I did not own` column, and the proof-strip qualifier lines.

---

## 3. The tablet band, 768–1023px

The design doc called this the real risk. It is right, and the risk landed — but in a different
place than predicted. The pure-prose pages are **fine**; the composite components are not.

### What holds

- `approach-768.png`, `about-768.png` — the right rail correctly disappears, prose runs to the
  container at 21px Newsreader, ~62–64 CPL. These are the best-set screens in the entire capture.
- `work-768.png` — the case rows stack cleanly; the `MetricDelta` goes full width.
- `home-768.png` — hero collapses to one column, no overflow, no clipping.

### What breaks

**(a) `OwnershipBlock` is still shredded at 768.** `work-two-seconds-768.png`, `work-steps-premier-league-768.png`.
D-10 moved the three-across from `sm:` (640) to `md:` (768) to fix exactly this. It did not fix it.
At 768 the three columns are ~215px each carrying 16px sans, producing **3–4 words per line**:

> `The cohort analysis that / put a drop-off on the / table instead of a / feature request`
> `The analytics. I did not / build the instrument / that produced 3.5 → / 7.8, and its limits bound / what I can claim from it`

This is the highest-value block above the fold on a case study (IA §3.3 step 4) and it is a column
of confetti for the entire tablet band. **Fix: gate the three-across on the column, not the
viewport — `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`, which keeps 1-up at 768
and goes 3-up at ~900px where the columns can actually hold a sentence.**

**(b) The header meta grid wastes a third of its width.** `work-two-seconds-768.png`: `ROLE` wraps
to two lines in a 215px column, `TEAM` runs an amber chip over three lines, and `TIMELINE` holds the
two words `8 weeks` with ~180px of empty space beside it. Same `minmax` fix applies.

**(c) The Grounded demo decouples cause from effect.** `lab-grounded-768.png` — the input pane
(selector + source panel + summary textarea) alone runs past the fold; the verdict pane stacks
**below** it and starts ~1,900px down. A reader on a tablet cannot see the text and its score at the
same time, which is the entire point of the tool. §3.6 anticipated this exact failure and specified
the remedy: at this width, **scorecard first, demo second**, or make the source panel collapsible so
the summary and the verdict are adjacent.

**(d) The whole first screen at 768 is hero.** `home-768.png` — nav + H1 + sub + identity +
`Currently` + link row + rule + Grounded pointer consumes the full 900px viewport; the words
`BUNDLE SIZE` appear at the very bottom edge and nothing else does. The proof strip is entirely
below the fold at tablet. Acceptable, but it means the tablet reader's 10-second gate is carried by
the H1 alone.

### Is the case-study rail sensible at 768?

Yes, because it does not exist there — and that is the correct behaviour. What is not sensible is
what it does *above* 1023: see §4.

---

## 4. At 1920px — does the layout hold?

**No. It reads as a 570px design floating inside a 1200px container floating inside a 1920px
window.** This is the weakest desktop width on the site.

`home-1920.png`: content spans x≈400→1517 (a 1117px composition) with ~400px of empty paper on each
side. The hero type does not grow — `--text-hero` clamps at 3.5rem and is already maxed by ~834px
viewport — so 1920 buys the reader **nothing except margin**. Compare `home-1440.png` and
`home-1920.png` side by side: they are the same picture with more white.

That alone would be ordinary. The real failure is column two:

- `home-1920.png` / `home-1440.png` — the hero's right column holds one `BUNDLE SIZE`
  `MetricDelta` and then ~600px of nothing to the bottom of the fold. And that metric is a
  **duplicate**: `BUNDLE SIZE` appears again 400px lower in the proof strip
  (`home-1440-full.png`, y≈1900–2560). IA §3.2 is explicit that repetition is the scarce resource
  and it is spent **entirely on `15s → under 2s`**. The hero repeats the wrong number.
- `approach-1440-full.png` — the `SECTIONS` list occupies the top ~400px of the right column of an
  **11,576px page**. The remaining ~11,100px of that column is empty.
- `work-steps-premier-league-1440-full.png` — same, on an **18,792px** page.
- `work-two-seconds-1440-full.png` — same, on a **19,860px** page.
- `about-1440.png`, `lab-1440.png` — right half empty from the nav down.

Part 4 of the design system specifies a right rail of 240–258px carrying compact `MetricDelta`s,
denominator notes, attribution limits and one `PullQuote`, plus a **sticky left `ProgressRail`**
with an active marker. **Neither is built.** What shipped is a static top-right list of section
titles and then void. So the asymmetric grid — the single largest design investment in the docs —
reads on screen as an unfinished two-column layout, and 1920 doubles the evidence.

Two ways out, either acceptable:

1. **Build the rail as specified** — move the denominator lines, the method notes and the
   attribution limits out of the prose and into `rail-r`, and make the section list a sticky left
   `ProgressRail`. That fills the column with the thing the site is actually about.
2. **Delete the rail and own the single column** — cap the page at ~760px, centre it, and let the
   figures and tables break out to 1000px. A confident narrow column is a design; a wide grid with
   an empty half is an accident.

Do not ship the current middle position. And at ≥1600px, let the container grow to ~1360 or the
page will keep reading as a screenshot of a smaller browser.

---

## 5. Spacing rhythm and typographic hierarchy

### What is right

- Section rhythm measures ~210 CSS px between section boundaries on `home-1440-full.png` —
  consistent, and consistent with the intended 96px `Section` padding. **D-01 appears fixed.**
- `tabular-nums` is holding: timeline years and the `13/16`-style counts align.
- Prose measure on case studies and `/approach` is ~570px at 1440 → ~68 CPL at 21px Newsreader.
  Exactly the spec, and it reads beautifully (`approach-1440.png`).
- The mono/serif/sans division of labour is legible: mono = metadata and numbers, serif = argument,
  sans = claims. A reader learns it in one screen.

### Four defects

**(a) The H1's two sentences are not separate blocks — the site's central hook has broken line
breaks at every desktop width.** `home-1440.png`:

> The roadmap was
> engagement. The
> app took fifteen
> seconds to open.

§3.1 mandates two `<span style="display:block">` so `text-wrap: balance` balances each sentence
independently. It clearly does not: the second sentence begins mid-line-2 and strands the word
`The` at the end of a line. Identical failure at 768, 1024, 1440 and 1920. This is nineteen words
that the entire positioning rests on, and they are ragging like an unstyled paragraph.
**Fix: two block spans, `text-wrap: balance` on each.**

**(b) Headings are set to a narrower measure than the body they head.** `work-two-seconds-1440-full.png`
(crop y 3400–5400):

> **Latency sat in the engineering**
> **column. Adoption sat on my roadmap.**
> The fifteen seconds were already known. They sat where slow…

The h2 breaks at ~330px; the paragraph under it runs to ~590px. Same on
`work-steps-premier-league-1440-full.png` (*"A step counter competes with / the one already on the
phone"*), same on the case-card headlines in `work-1440.png` and `work-768.png` (*"The roadmap was /
engagement. The app took / fifteen seconds to open."* at 280px while the sub-line beneath it runs
770px). **Heading measure narrower than body measure inverts the normal relationship, forces a
two-line heading where one would fit, and makes every heading look weaker than the text it
introduces.** Fix: remove the `max-w` from headings, or set it wider than `--measure`, never narrower.

**(c) Hierarchy inversion at the belief blocks.** `approach-1440.png`: the h2 *"Fix the floor before
you build the ceiling"* is 24px sans w600 and occupies one line; immediately beneath it sits a
**four-line block of bold 21px serif**. The bold paragraph has roughly four times the ink of its own
heading and wins the page. Either drop the load-bearing sentence to regular weight with the bold
confined to its first clause, or take the h2 up to `--text-2xl` (30px).

**(d) `/approach` is not a three-minute page.** `approach-1440-full.png` shows **six numbered
sections**, not three beliefs: `01 Fix the floor` · `02 A decision with no cost` · `03 A metric you
cannot defend` · `04 The postmortem` · `05 Manual logging is the ceiling on health-app engagement in
India` · `06 If you read one case study`. Item 05 is a fourth belief in everything but name and is
the longest block on the page (~10 paragraphs). T22 (*"exactly three beliefs"*) **fails**, and the
page runs ~1,900 words against IA §3.4's 500–700. The VP's three-minute entry point is now a
nine-minute read with a numbered contents list — which is the documentation-template look §3.4
named and banned.

---

## 6. The signature element — `MetricDelta`. Is the encoding legible?

**No. And it is worse than illegible: the same widget encodes three different things on the same
page, and the only cue distinguishing them is hue.**

### What is actually on screen

`home-1440-full.png` proof-strip crop (y 1900–2560), three cells side by side:

| Cell | Rendering | Filled fraction | What the fill is |
|---|---|---|---|
| `COLD START` | `15s ▬(green ~13%)▬▬▬▬▬(grey)▶ under 2s` | 2/15 | the **after** value |
| `BUNDLE SIZE` | `25MB ▬(green ~24%)▬▬▬▬(grey)▶ 6MB` | 6/25 | the **after** value |
| `SESSION TIME` | `3.5 min ▬(grey ~45%)▬▬▬(grey)▶ 7.8 min` | 3.5/7.8 | the **before** value |

And on `work-ai-health-reports-1024.png`, two more:

| Cell | Rendering | Filled fraction |
|---|---|---|
| `CROSS-SELL REVENUE` | `unstated base ▬▬▬▬▬▬▬▬(empty)▶ +15%` | **nothing at all** |
| `ENTERPRISE CLOSES` | `0 ▬▬▬▬▬▬▬▬(empty)▶ 5+` | **nothing at all** |

So a reader who scans one page meets a bar that means "the after value", a bar that means "the
before value", and a bar that means nothing — all in the same typographic frame, all at different
absolute track lengths (the track is `flex-1`, so it re-scales with its container: ~360px in the
hero, ~350px on the case study, ~570px at `/work` 768). §7.1's claim that *"every quantity on the
site is drawn to scale, in the same horizontal track, at the same pixels-per-unit"* is not
delivered anywhere in the capture.

### Would a reader understand the green segment is the "after" value?

No, for four compounding reasons:

1. **It is anchored to the wrong label.** The fill starts immediately after `25MB` and ends 24% of
   the way along. Proximity says the segment belongs to `25MB`. The after-value sits at the far
   right end of the *grey* portion, spatially attached to nothing.
2. **The arrowhead contradicts the bar.** The grey `▶` sits at the right end of the full track — the
   position that, under the bar's own scale, represents the **before** value (15s, 25MB). So the
   arrow says "→ the after value" while pointing at the coordinate of the before value.
3. **The default reading is "progress".** A short coloured fill at the left of a long grey track is
   the most over-learned UI idiom on the web. Every reader arrives with "24% complete" pre-loaded.
   On a bundle that shrank 76%, that is exactly backwards.
4. **The honesty mechanic is not visible.** §7.3 requires the `under 2s` bar to terminate in a
   **1.5px dashed `--signal` rule** at the 2s position, because the source is an inequality. In the
   proof-strip crop the green segment ends in a flat cap; there is no dashed terminator I can
   resolve at 2× DPR. The caption line that justifies it (*"Bar drawn to the bound…"*) is present on
   the cold-start cell only, so on every other instance the bar has no explanation at all.

### How to fix it — exactly

**Preferred: make `MetricDelta` a two-row micro-chart, i.e. `ColdStartScale` at 40px tall.**

```
COLD START
Before   ████████████████████████████████████████  15s
Shipped  █████┊                                    under 2s
         0                                    15s
```

- Two bars, **one shared left origin**, one shared px-per-unit, stacked.
- `before` fill `--ink`, `after` fill `--signal`. Longer bar = bigger number, always, for increases
  and decreases alike. `3.5 → 7.8 min` then renders with the second bar *longer*, which is the
  truth and which the current widget cannot express.
- **Direct-label each bar at its own end**, in that bar's colour. The label and the length are then
  co-located and the encoding explains itself with zero prose.
- Keep the open-bound terminator, but at **2px, dashed `3 2`, full bar height** so it survives
  downsampling.
- Add the single tick row (`0 … max`) that §8.1 already specifies. It is 14px of height and it is
  what makes "to scale" checkable rather than asserted.
- **Delete the `▶`.** A track that encodes magnitude does not also need a direction glyph, and this
  one is placed at the wrong value.

**If the one-line inline form must be kept for the compact/rail instances**, the minimum viable fix
is: put the **after** label at the end of the filled segment and the **before** label at the end of
the full track, drop the arrow, and give the empty-baseline cases (`unstated base → +15%`,
`0 → 5+`) **no track at all** — a bare `unstated base → +15%` in mono with the qualifier beneath it.
Rendering an empty scale bar for a metric with no baseline is a claim about proportion the record
cannot support, which is the one thing this site exists not to do.

**Never encode which value the fill represents by hue alone.** That is the failure at
`SESSION TIME`, and it also fails for a red-green-deficient reader, which is ~8% of male reviewers.

This repeats ~20 times. It is the highest-leverage single fix on the site.

---

## 7. The forbidden list and the templated-2026 looks

Audited against `03-design-system.md` §6.1 (closed micro-interaction list + "explicitly out"),
Part 2 defects, and `DECISIONS.md` D1-26 / D1-37.

### Clean — verified absent across all desktop/tablet captures

| Banned | Status |
|---|---|
| Gradient, mesh, glow, glass/blur panel | none anywhere |
| `backdrop-filter` on the sticky nav (D-15) | nav is solid `--paper` with a hairline. **Fixed** |
| Coloured **left** border on callouts (D-03) | none; the postmortem block on `approach-1440-full.png` uses a top rule + tint |
| Box-shadow, elevation, card lift on hover | none |
| Three-up **case-card** grid | `home-1440-full.png` and `work-1440.png` are stacked full-width rows. **T14 passes** |
| Icons, emoji, decorative glyphs, logo strip | none |
| Testimonial block, count-up numbers, reading-time estimates | none |
| Hamburger glyph | nav uses text items at ≥768; `Menu` word on mobile |
| Terracotta accent (templated look #1, D1-26) | `--flag` is `#A32F35`, a lab-report red, not orange. **Correctly avoided** — and the cream-ground + serif pairing is redeemed by it |
| Radii above 4px, pill-shaped anything | none observed |

### Violations found

| # | Banned item | File | Evidence |
|---|---|---|---|
| V1 | **Stat banner — "a row of big numbers"; §5.3 mandates three *rows* at every width** | `home-1440-full.png` y 1900–2560 | Three **columns** with vertical dividers. This is the named generator pattern, at the top of screen two. |
| V2 | **Status badge above a heading** — §5.5: *"never a pill above it… no background, no border, no dot. A coloured badge above a heading is a named tell."* | `lab-1440.png`, `lab-grounded-1440.png`, `home-1440-full.png` (Built) | `LIVE` in a green-bordered box, above and before the title, three separate places. |
| V3 | **Second button style** — §5.8: *"There is no primary button on this site."* | `lab-1440.png` | `Run it →` is a green-bordered button. The nav `Resume` was meant to be the only bordered link. |
| V4 | **Invented rail on `/approach`** — §3.4: *"No rail on this page… inventing one would be the documentation-template look."* | `approach-1440.png`, `approach-1440-full.png` | A numbered `SECTIONS` list, 01–06, top-right. §5.6 also confines numbering to the case-study `ProgressRail`. |
| V5 | **Four beliefs where three were mandated** (D1-37: *"do not auto-fill a fourth"*) | `approach-1440-full.png` | Section 05, *"Manual logging is the ceiling on health-app engagement in India"*, is a fourth belief. `beliefSchema` was supposed to make this impossible. |
| V6 | **All-caps outside 11–12px mono** (§1.2, the settled all-caps rule) | `lab-grounded-1440.png` | `LIVE` renders at ~14px caps inside a box. |

No instance of `translateY(20px)` reveal, scroll-fade, route transition, skeleton or parallax is
detectable in these static captures — but they cannot be ruled out from screenshots. Agent 9 should
grep for them per §6.1.

---

## 8. The five highest-impact desktop fixes, ranked

### 1 — Unclip and unshred `DecisionTable`. It is the artifact they came for.

**Files:** `work-two-seconds-1440-full.png` (crop y 8900–11300),
`work-steps-premier-league-1440-full.png` (crop y 8100–10800).
**What I see:** on **both** case studies, at **1440px**, the last column is cut off mid-word behind a
fade — `HOW YOU WOULD LEARN YOU WERE WRONG` renders as `taken on…` / `who got…` / `point of…` /
`adoption…`, and on Steps, `WHAT NEEDS TO BE TRUE` renders as `That people open a health… in ord…
read someth…`. Column 1 breaks to 1–2 words per line for ten consecutive lines
(`Ship the / engagement / roadmap as / written / The default. / It needed / no / argument / from /
anyone.`). All of this happens with **570px of empty page sitting immediately to the right of the
table.**
**Change:** give `DecisionTable` the `Wide` figure span (`prose-start / rail-r-end`: 876px at
≥1280, 792 at 1024) or `Full` (1058px) — Part 4.2 already defines both. Set
`table-layout: fixed` with explicit column widths (≈18 / 22 / 26 / 34%), `min-width: 0` on cells,
and disable the `overflow-x` scroll container above 1024px so nothing can be hidden at desktop. Drop
the header to 11px mono so `HOW YOU WOULD LEARN YOU WERE WRONG` fits in two lines.
**Why first:** a clipped decision matrix on the page whose thesis is *"I state things precisely"* is
the most expensive possible defect, and it fails on the two pages a Head of Product actually opens.

### 2 — Re-encode `MetricDelta` as two bars from one origin.

**Files:** `home-1440.png`, `work-two-seconds-1440.png`, `home-1440-full.png` (proof crop),
`work-ai-health-reports-1024.png`.
**What I see:** three semantics for one widget — fill = after (`25MB → 6MB`), fill = before
(`3.5 → 7.8 min`), fill = nothing (`unstated base → +15%`, `0 → 5+`) — separated only by hue, with a
`▶` sitting at the before-value's coordinate and no axis, no tick, no dashed open bound.
**Change:** exactly as specified in §6 above — two stacked bars, shared left origin, shared scale,
`--ink` / `--signal`, direct labels at each bar's own end, one tick row, 2px dashed terminator for
the inequality, no arrowhead, and **no track at all** where there is no numeric baseline.
**Why second:** it repeats ~20 times, it is the site's declared signature, and right now it is the
one element a numerate reviewer would call wrong.

### 3 — Fill the right column, or delete it.

**Files:** `approach-1440-full.png` (11,576px page), `work-two-seconds-1440-full.png` (19,860px),
`work-steps-premier-league-1440-full.png` (18,792px), `home-1920.png`, `about-1440.png`.
**What I see:** a ~555px right column that holds a static section list for its first ~400px and is
then empty for the remaining ~95% of every long page. At 1920 this sits inside another ~800px of
outer margin.
**Change (pick one, do not ship the middle):**
(a) *Build it.* Move the denominator lines, method notes and attribution limits out of the prose
into `rail-r`, anchored one-per-`<section>` per Part 4.4; make the section list a **sticky left**
`ProgressRail` with the active marker. The column then carries the exact material the site is about.
(b) *Delete it.* Single column capped ~760px, centred, with figures and tables breaking out to
1000px. Also raise the container to ~1360 above 1600px so 1920 stops reading as a smaller browser.
**And on `/approach` specifically, (b) is not optional — §3.4 forbids a rail there outright.**

### 4 — Fix the homepage hero: remove the amber chip, swap the duplicated metric, break the H1.

**File:** `home-1440.png` (and identically at 768 / 1024 / 1920).
**What I see:** three things in one block.
- `Currently: one clause — what is on your desk this month?` — an amber chip in the hero, banned by
  IA §5.7 and T15. **Move it to `/about` as ruled, or drop the `Currently:` line until CG B12 lands.**
- The hero's right column shows `BUNDLE SIZE`, which then repeats verbatim 400px lower in the proof
  strip, while `15s → under 2s` — the number the H1 just promised and the one thing IA §3.2 says the
  reader must leave with — appears in the hero only as words. **Swap the hero metric to `COLD START`.**
- The H1 wraps as `The roadmap was / engagement. The / app took fifteen / seconds to open.` **Two
  block spans, `text-wrap: balance` on each**, so sentence two starts on its own line.
Also missing from the hero at every desktop width: **`Noida`** (T5) and a **resume link in the hero
link row** (T7 requires it in the nav *and* the hero row; the row currently reads
`Read the work ↓ · email · copy · LinkedIn ↗`).

### 5 — Fix the two tablet-band components, then thin the amber.

**Files:** `work-two-seconds-768.png`, `work-steps-premier-league-768.png`, `lab-grounded-768.png`,
`home-1440-full.png`.
- **`OwnershipBlock` and the `ROLE/TEAM/TIMELINE` grid:** replace `md:grid-cols-3` with
  `repeat(auto-fit, minmax(260px, 1fr))`. At 768 that stays 1-up (readable); at ~900px it becomes
  3-up (still readable). Current 768 output is 3–4 words per line for the site's most important
  ownership block.
- **`/lab/grounded` at 768:** the verdict pane starts ~1,900px below the source panel. Put the
  scorecard first at this width, or collapse the source panel by default, so text and score are
  visible together.
- **Amber:** get `/` from eight chips to three (one per proof cell, none in the hero); enforce
  §5.0 rule 6 (one chip per `MetricDelta` — `COLD START` currently carries two); and give
  `TEAM` / `TIMELINE` on Steps and Who Pays a **stated value plus a bounded caveat** rather than a
  bare question, so no ownership field is 100% red.

---

## 9. Checklist rows this pass can adjudicate (IA §4)

| Ref | Result | Evidence |
|---|---|---|
| T5 `Noida` visible without scrolling | **FAIL** | absent from the hero at 768 / 1024 / 1440 / 1920 |
| T7 resume affordance in nav **and** hero link row | **FAIL** (nav only) | `home-1440.png` link row |
| T12 proof strip, three cells | **PASS on count, FAIL on form** | three-across, not three rows (§5.3) |
| T13 qualifier under every figure, same size, not hover | **PASS** | `home-1440-full.png` proof crop |
| T14 case rows stacked full-width, not `grid-cols-3` | **PASS** | `home-1440-full.png`, `work-1440.png` |
| T15 ≤3 amber chips on `/`, zero in hero | **FAIL** | 8 chips, 1 in the hero |
| T19 Role · Team · Timeline · `I did not`, all above the fold | **PASS structurally** | `work-two-seconds-1440.png` — but Team/Timeline are questions on cases 2 and 3 |
| T20 bolded load-bearing sentence | **PASS** | `work-two-seconds-1440-full.png`, `approach-1440.png` |
| T21 headings are claims, not labels | **PASS** | *"Latency sat in the engineering column."*, *"The churn happened before the first analytics event fired"* |
| T22 exactly three beliefs on `/approach` | **FAIL** | six numbered sections; 05 is a fourth belief |
| T23 postmortem present, amber, phrased as a question | **PASS** | `approach-1440-full.png` |
| T24 exactly one next-step link per page | **PASS on `/approach`, `/work/*`**; `/` carries three mid-page links | `home-1440-full.png` |

T1–T4, T6, T8–T11, T16–T18 are mobile-viewport rows and belong to the 390/320 pass.
