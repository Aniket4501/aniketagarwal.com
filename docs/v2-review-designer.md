# V2 Review — Senior Product Designer

Reviewed: `docs/screenshots/iteration-v2-1/`. Every claim below cites a file and, where useful, a
measured pixel value. Measurements are CSS pixels derived from the 2× screenshots.

**Headline verdict: V2 is a large, real improvement and it is not yet premium.** The QA-marker
failure is fixed. The mono-everywhere failure is fixed. The evidence problem is half fixed. But
three of V1's named defects survive structurally intact — the 60% empty horizontal band, the
essay-shaped `/approach`, and the section rhythm — and V2 has added four new craft defects that are
worse than anything in V1, including a duplicated CTA block, a bar chart that draws +15% as zero,
and four pages of content that are published twice.

Clean bill on the one non-negotiable: **no `NEEDS:` or `not stated` markers appear in any
screenshot**, and `grep -rI "NEEDS:\|not stated"` over the repo returns nothing. That bar is met.

---

## 1. Does this look premium?

**No — it looks competent.** It is roughly one notch below the bar. The distance is not taste, it is
finish.

What is genuinely working:

- **The type is good.** `home-1440.png` — the grotesque at ~92px/1.0 with tight tracking on
  "I find the reason a product isn't being used — then I go fix it." is the best thing on the site.
  It has weight and no styling tics.
- **The palette is disciplined at the base layer.** Warm off-white `#FAF9F7` page, `#F2F1ED`
  alternating band, near-black ink. No gradient, no glass, no blob, no dark mode, no custom cursor.
  Every banned decoration is genuinely absent.
- **`about-1440.png` is the one page that reads premium end to end.** Editorial left column, an
  "AT A GLANCE" card that earns its border because it holds discrete facts, tool chips at the right
  scale. Nothing is guessed.
- **`lab-grounded-1440.png` has the only real artifact on the site** — a working evaluator with a
  source panel and a scored verdict. This is the single strongest asset here.

What breaks premium, specifically:

**a. Two identical CTA blocks stacked on top of each other.** `home-1440-full.png` (see crop
`home_08`, CSS y≈7380–8250). The section "Have a product problem worth solving?" — headline,
paragraph, black email button, "Copy" — is followed ~400px later by a footer containing "Have a
product problem worth solving?", a near-identical paragraph, the same black email button, and the
same "Copy". Stripe does not ship a page that says the same thing twice in a row. This reads as a
build error and it is the last thing every reader sees.

**b. A bar chart that lies.** `work-ai-health-report-1440.png`, the hero panel: "Baseline" bar is
**673px long**; the "+15%" bar is **671px long**. A 15% lift rendered as a 0.3% difference. Measured
directly off the PNG. Contrast `work-steps-premier-league-1440.png`, where 3.5 min = 307px and
7.8 min = 685px (ratio 0.448 vs the true 0.449) — that one is correct. So the system can draw a
proportional bar; the AI case study, the one the owner calls his strongest AI evidence, ships a
decorative one. A hiring manager who looks twice sees a chart that does not encode its own numbers.

**c. The same datum, two colours, two pages.** The "15s before" bar is `rgb(164,52,44)` — red — on
the home card (`home-1440-full.png`, CSS y≈1984) and `rgb(148,143,132)` — warm grey — on
`work-step-syncing-1440.png` (y≈201). The home version also carries a third "Benchmark 2s" row the
case page drops. One chart, two datasets, two palettes. Premium sites do not let the same object
render differently in two places.

**d. Four content blocks published twice.** `/work` (`work-1440-full.png`, crop `wk_01`) reproduces
the three homepage case cards verbatim — same numerals, same badges, same PROBLEM / WHAT I CHANGED
copy, same charts. `/lab` (`lab-320.png`, `lab-1440-full.png`) reproduces the homepage Lab section
with the same H1 "What I build when nobody hands me a roadmap." and the same Grounded card. `/about`
(crop `ab_02`) reproduces the homepage experience timeline row for row. Plus the CTA/footer above.
Clicking "View my work" from the hero lands the reader on content they scrolled past ninety seconds
ago. That is an IA failure that reads as a craft failure.

**e. An empty grey rectangle rendered in production.** `home-1440-full.png` crop `home_07`, the Lab
card: below the "FULL RUN 2.62ms / SERVER CALLS 0" tiles sits a flat `#EFEEEA` block roughly
505×190px containing nothing at all. It is not whitespace — it is a filled panel with no content.

**f. Smart-quote inconsistency on the site's signature line.** `home-1440.png` renders "isn't" with
a straight apostrophe; `about-1440.png` renders the same sentence "isn’t" with a typographic one.
Same sentence, two pages, two glyphs.

**g. A raw OS `<select>` on the flagship demo.** `lab-grounded-1440.png` and `-320.png`: the sample
picker shows "n-01 · In range — All values in range, plain reporti" — clipped mid-word, with the
default macOS chevron. On the one interactive surface on the site.

Against Linear/Stripe/Vercel: those sites are not better because they are prettier. They are better
because nothing on them is unresolved. Here, six things are unresolved on the homepage alone.

---

## 2. Does the visual hierarchy work?

Mostly yes at 1440 on the homepage. It fails on four screens.

**`home-1440.png` — correct.** Eye order: (1) the 92px H1, (2) "1M+" in the bordered panel, (3) the
supporting paragraph, (4) the black "View my work" button. That is exactly the right order and it is
the biggest single win over V1. Ten seconds gets you: PM, consumer health, 1M+ users, +20%
engagement, AI product, and a way in.

**`home-1024.png` — wrong, and it is a layout break.** The CTA row wraps 2 + 1: "View my work" and
"Résumé" hold the line, and **"LinkedIn ↗" drops to its own line, orphaned at the bottom-left with a
large gap above it**. At 1440 and 1920 all three are inline. So at the most common laptop width the
third element the eye lands on is a stranded tertiary link. Separately, the proof panel is
vertically centred against a much taller left column and its top edge (y≈525) aligns with nothing —
it floats.

**`approach-1440.png` — wrong.** Eye order: (1) H1 "How I make product decisions.", (2) **a 419px
empty column on the left**, (3) serif prose. The second thing the reader's eye finds is absence. The
H1 starts at x=222 and every body block starts at x=419 — two different left margins with nothing
between them. At `approach-1024.png` it is worse: H1 at x=95, body at x=440, a 345px indent. The
indent is not a constant, so it does not read as a designed offset; it reads like a container that
lost its sibling.

**`work-1440.png` — wrong for the job the page has.** Eye order: (1) "Three problems, three shapes."
at ~78px, (2) a ~120px void, (3) the first card at y=715. The largest element on the page is a
literary title that says nothing about the candidate, and it sits above content the reader has
already seen on the homepage.

**`home-1440-full.png` card 03 — wrong.** Crop `home_03`: "AI Smart Health Report" — the applied-AI
story, the differentiator for an AI PM search — is the only one of the three cards with **no visual
at all**. Cards 01 and 02 get a chart and a display metric; 03 gets "15%" floating in a half-empty
grey panel with ~130px of nothing above it and ~110px below. The strongest positioning story gets
the weakest treatment.

---

## 3. Does it feel too empty?

Yes, in five specific places. V1's "60% unused horizontal band" is not fixed; it is relocated.

Measured ink extents on `home-1440-full.png`, content band = x 160→1280 (1120px):

| Section | Ink span | Band used |
|---|---|---|
| Hero | 160–1258 | 98% |
| Metric grid | 160–1279 | 100% |
| Case card 01 | 194–1205 | 90% |
| **Experience — Circle Health row** | 161–872 | **63%** |
| **Experience — Infynte row** | 161–678 | **46%** |
| **Experience — IIT row** | 161–540 | **34%** |
| **CTA section** | 160–**797** | **57%** |

- **`/approach` is the worst offender on the site.** `approach-1440.png` / crops `ap_02`, `ap_04`:
  content occupies x 419–975 of a 1400-wide render — **60% of the page width is empty, for
  5,730px of scroll.** This is V1's headline defect, unchanged, on the page V1 named by name
  ("1,195 words of unbroken argument with no visual anchor at all"). There is still no visual
  anchor: I checked all six slices of `approach-1440-full.png` and there is not one chart, table,
  diagram, or pull-out on the entire page.
- **The CTA band.** Crop `home_08`: text stops at x=797; roughly **480×290px of the primary
  conversion moment is empty.**
- **The experience tail.** Crop `home_05`: five rows carrying one sentence each, then a ~125px pad,
  and the final row ("Indian Institute of Technology Kharagpur / Dual degree") uses 34% of the band
  — two words in 1,120px.
- **Case card right panels.** Crop `home_02`: card 01's visual panel has ~105px empty above the
  chart and ~115px below the metrics. Card 02's left panel (crop `wk_01`) holds 220px of content in
  a 470px box.
- **The Lab card grey void** (see 1e above).

Nothing on the site is *cramped* at 1440 except one thing, and it is the wrong thing:

- **The decision matrix.** `work-step-syncing-1440-full.png` crop `ss_03`: the four-column table —
  described in V1's own teardown as "the strongest artifact on the site" — is squeezed into the
  570px prose measure. "Ship the engagement roadmap as written" wraps to four lines; the header
  "HOW YOU'D LEARN YOU WERE WRONG" wraps to three. Meanwhile 550px sits empty on each side of it.

---

## 4. Does it feel generic?

**In parts, badly.** Ranked by how replaceable the screen is:

1. **`approach-1440.png` is indistinguishable from any thoughtful person's Substack.** Centred serif
   column, no visual, 5,730px. Swap the name and it is anyone's.
2. **The 2×2 principle cards, crop `home_06`.** Four bordered rounded boxes, each: green numeral,
   bold heading, two-sentence claim, hairline, example, green "See it in the work →". This is the
   single most templated pattern in the PM-portfolio genre. Four boxes with the same internal
   skeleton is what a Framer template outputs.
3. **The tool chips.** `about-1440.png` and crop `home_07`: SQL · Python · Mixpanel · Amplitude ·
   CleverTap · Tableau · Figma · JIRA · Confluence · Notion, in ten identical pill outlines. Every
   PM portfolio on the internet has this exact row. It is the least differentiating content on the
   site rendered as a design element.
4. **`work-1440.png`'s "Three problems, three shapes."** — a clever line where a specific one should
   be. The page could belong to any PM with three case studies.

Where it is genuinely *not* generic, and should be protected and pushed harder:

- The **I OWNED / WE SHIPPED / I DID NOT OWN** triptych (`work-step-syncing-1440-full.png` crop
  `ss_00`, `work-steps-premier-league-1440.png`). No template produces this. It is the most
  distinctive thing on the site and it appears below the fold on three pages and nowhere on the
  homepage.
- **Grounded** (`lab-grounded-1440.png`). A live evaluator is not a portfolio cliché.
- The **decision matrix with a reversibility column** (crop `ss_03`).

The pattern is unmissable: **every distinctive element is buried, and every generic element is
promoted.** The homepage leads with a KPI grid and a card matrix; the ownership triptych, the
matrix, and the live demo are all two clicks deep.

---

## 5. Typography

**The scale works.** ~92 / 78 / 40 / 34 / 21 / 18 / 12 across H1 → eyebrow is a clean ratio with no
collisions. Nothing competes at 1440. The eyebrows (12px, caps, ~0.1em tracking, grey) are correctly
subordinate — a real improvement on V1, where they were mono.

**Monospace: fixed, with one exception.** I found no mono in nav, eyebrows, metrics, timeline,
footer, or CTAs anywhere. The only remaining mono is `lab-grounded-1440.png` — the case selector,
source panel, and the score readout ("grounding 100 / 100"). That is legitimate: it is a data
readout and mono is the right voice for it. But it is the *entire right half* of the flagship
surface, so the page still reads as a terminal. Two fixes would settle it: set the verdict ("pass")
in the sans display face as a status badge rather than 16px mono right-aligned, and set the rubric
dimension labels in sans, keeping mono only for the values.

**The sans/serif split does work — but the ratio betrays it.** The rule is legible: sans for
product/UI/evidence, serif for sustained argument. Correct in principle. The problem is volume. The
serif carries the whole of `/approach` (5,730px) and the body of all three case studies (~4,000px
each). By scroll length this is still a serif essay site wearing a sans homepage. That is precisely
the V1 diagnosis, and the fix was supposed to be shortening the argument, not re-typesetting it.

Two smaller faults:

- **The serif switch is unsignalled.** `work-step-syncing-1440-full.png` crop `ss_01`: the sans
  ownership cards end and, 180px later, serif prose starts, with no rule, no band change, no width
  change to mark the gear change. The reader experiences it as an inconsistency, not a mode.
- **Hanging numerals misalign at small widths.** `approach-320.png`: "01" sits at x=50, its heading
  at x=118, and the body returns to x=50. At 1440 the 34px hang reads as intentional; at 320 the
  heading simply looks indented by accident.

---

## 6. Colour

**Green is not restrained. It is doing six jobs and has stopped meaning any of them.**

A pixel scan of `home-1440-full.png` returns **21 discrete green bands** down the page, plus three
green-tinted fills. Inventory of jobs green currently holds:

1. Brand accent — the hero panel status dot, the "AI" chip.
2. Link colour — "Read the case study →" ×3, "See it in the work →" ×4, in-body links.
3. Positive-outcome colour — the "under 2s" bar, "At least 7.5× faster", the "+15%" bar.
4. Status colour — "Current" dot in the timeline, "LIVE" badge on Lab.
5. Ordinal colour — the 01/02/03/04 numerals on the principle cards and on `/approach`.
6. Bullet colour — the HCL achievement bullets and the "I OWNED" bullets.
7. Decorative rule colour — the four underlines in the hero panel.

Jobs 5, 6 and 7 earn nothing. **Job 7 is actively harmful.** In `home-1440.png` the green rule under
"1M+ / Registered users" is **149px long** and the one under "+20% / App engagement" is **85px**.
Two metrics with no common unit, drawn as bars of different length, in the same row, in the accent
colour. They imply a proportion that does not exist. The owner banned fake screenshots; this is the
same sin in 3px of height. Delete them or make them encode something.

Green also collides with itself semantically: on the timeline, green means "current employer"; two
sections down, green means "link"; on Grounded, green means "live"; on the charts, green means
"good outcome". A reader cannot learn the rule because there isn't one.

**Recommended reduction:** green becomes link + one outcome state, full stop. Ordinals go to
`--ink-40`. Bullets go to `--ink-30`. Status dots go to a neutral with a text label. The hero rules
are deleted. That takes green from ~21 appearances per page to about six, and each of those six
means the same thing.

**Red/grey is inconsistent** — see 1c. Pick one: either "before" is always the correction red or it
is always neutral grey. It cannot be both on the same chart on two pages.

---

## 7. Spacing rhythm

**Vertical section rhythm is close to consistent, and slightly too large.** Measured blank bands
between sections on `home-1440-full.png`:

```
189, 186, 181, 218, 181, 182, 186, 174
```

Median 183px, range 174–218 — a **25% outlier** at the foot of the Experience section (y≈4895). That
one is visible: crop `home_05` shows the timeline ending, then a conspicuously deeper pad than any
other section boundary. Tighten to a single token.

The larger point: V1 was criticised for a 192px desktop section rhythm as "nearly double the 60–80px
a dense product site wants." V2 ships **~183px**. That is a 5% change on a defect that was called
out by name. Two of the eight sections carry enough content to justify it; six do not.

**Horizontal rhythm is where it actually breaks.** `work-step-syncing-1440-full.png` uses **three
different left edges on one page**, none aligned to each other:

- Ownership cards and the sceptical-reading panel: **x = 157**
- The green callout "THE PART THAT MAKES THIS WORTH A CASE STUDY": **x = 233**
- Body prose, all H2s, and the decision table: **x = 419**

Three measures, three left rags, no optical relationship. This is the single most amateur signal on
the site, because a reader registers it without being able to name it — the page never settles.
A premium page uses at most two measures and they share a left edge (or are deliberately, obviously
centred against each other).

**Page lengths regressed.** V1 was slated for a 4,987px homepage carrying 62 words. V2's homepage is
**8,250px desktop and 12,773px mobile** (`home-390-full.png` = 780×25,546 at 2×). V1's mobile home
was 6,512px. The mobile homepage is now **nearly double** what was called excessive. `/approach` is
8,407px on mobile; `/work/step-syncing` is 10,826px. Yes there is more content now — but four of
those blocks are published twice elsewhere, so a meaningful share of that scroll is duplication.

---

## 8. The hero panel

**It reads as a stats box with a border, not a product surface.** This is the most important new
element on the site and it is the one that most needs another pass.

What it is, in `home-1440.png`: a 690×640px rounded rectangle with a 1px border, containing a header
row ("PRODUCT IMPACT" / green dot / "Consumer health · 1M+ users"), a 2×2 grid of
number-label-caption with a hairline cross, four decorative green rules, and a green-tinted footer
strip ("AI Smart Health Report / Personalised insights · taken 0→1").

Every element in it is a typographic tile. There is no product in it:

- No screen, frame, device edge, or UI chrome.
- No chart. (The card 220px below it *does* have a chart — so the page's second-most-important
  element is more visual than its most-important one.)
- No flow, no funnel, no architecture, no before/after.
- The only mark that looks like data — the four green rules — encodes nothing (see §6).

It is a well-set KPI table, and a well-set KPI table is what a resume website has. Against the
Linear/Stripe bar: those hero panels always show *the thing*, even abstracted — a board, a
dashboard, a diff, a ledger row. The reader has to see the product's shape, not its scoreboard.

The fastest fix that keeps every fact: **make the top-left quadrant a real product surface** — a
small, honestly-drawn frame of the AI Smart Health Report (a value, its reference range, one
plain-language line) or a two-bar 15s→2s launch chart — and let the remaining three metrics run as a
tight column beside it. That converts the panel from "here are my numbers" to "here is the thing,
and here is what it did," which is the whole difference between a resume site and a portfolio.

Two smaller notes on it:

- The 2×2 grid means the four metrics are read as four equal peers. They are not. "1M+ registered
  users" is the scale claim and should dominate; "15% incremental revenue" is a supporting figure.
  A 1-large + 3-small arrangement would carry the hierarchy the copy already implies.
- At `home-390.png` the panel header ("PRODUCT IMPACT") first appears at **y≈769** — below the fold
  on every common phone viewport. The most important new element on the site is not visible on
  mobile without scrolling past a six-line H1 and a nine-line paragraph.

---

## 9. Cards

**The page is assembled from boxes, and about half of them have not earned it.** Count on
`home-1440-full.png`: 1 hero panel + 3 case cards + 4 principle cards + 1 lab card = **9 bordered,
rounded containers** on one page, plus three tinted sub-panels. On `work-step-syncing-1440-full.png`:
hero panel + 3 ownership cards + callout panel + table + sceptical-reading panel = 7 more.

Where the card earns it:

- **The ownership triptych** (crop `ss_00`). Three parallel, comparable, discrete claims. Boxes are
  exactly right, and the single tinted "I OWNED" card carrying the emphasis is a good call.
- **The "AT A GLANCE" card** on `about-1440.png`. Discrete facts, sidebar role, correct.
- **The case cards** (crops `home_02`, `home_03`). Split text/visual, alternating sides — this is
  the one place V2 changes gear, and it works. Keep.

Where it does not:

- **The four principle cards** (crop `home_06`). Nothing in them is a discrete object — each is a
  heading, a claim, an example, and a link. They are editorial paragraphs wearing borders. As a 2×2
  grid on the page background with hairline separators and no radius, the same content would read
  twice as confident and remove four of the nine boxes at a stroke.
- **The Lab card** (crop `home_07`). A card whose right half is an empty grey rectangle is a
  container looking for content.

**Radius is inconsistent**, which undermines the system: every card on the site is ~10–12px, but the
Grounded panel on `lab-grounded-1440.png` is effectively square (~2px). One of those two is wrong.

---

## 10. The five highest-impact craft fixes, ranked

### 1. Delete the duplicated CTA, and de-duplicate the four repeated blocks
**Shows in:** `home-1440-full.png` (crop `home_08`), `work-1440-full.png` (crop `wk_01`),
`lab-1440-full.png`, `about-1440-full.png` (crop `ab_02`).
**Change:** Remove the standalone CTA section (CSS y≈7380–7690) and keep only the footer instance —
saves ~310px and removes the site's most obvious error. Then: `/work` keeps the three cards and the
homepage section drops to three compact rows (title, one-line result, link) at ~140px each instead
of ~440px; `/lab` becomes the Grounded page itself (delete the index — it is one card and 1,783px);
`/about` keeps the timeline and the homepage drops it to the three roles with dates only. Net: the
homepage loses roughly 1,800px and gains a reason for every internal link to exist.

### 2. Fix the AI Health Report bar chart, and unify the chart palette
**Shows in:** `work-ai-health-report-1440.png` (baseline 673px vs "+15%" 671px),
`work-ai-health-report-320.png`, `work-step-syncing-1440.png` vs `home-1440-full.png` y≈1984.
**Change:** Baseline bar = 100 units, "+15%" bar = 115 units, drawn to the same scale as
`work-steps-premier-league-1440.png` already does correctly. Then fix the token: define
`--chart-before` once and use it in both places — currently `rgb(164,52,44)` on home and
`rgb(148,143,132)` on the case page for the same "15s" datum. Recommend the neutral `#948F84` as
the single "before" and reserve red for corrections only. Also restore the dropped "Benchmark 2s"
row on the case page so the two renderings show the same three series.

### 3. Rebuild `/approach` around its own evidence, and kill the 419px empty column
**Shows in:** `approach-1440.png`, `approach-1024.png`, crops `ap_02`, `ap_04`.
**Change:** Two moves. (a) Set the page on a **two-column grid — a 200px sticky left rail carrying
the four principle numbers as an index, and a 640px measure to its right** — so the left band holds
navigation instead of nothing, and the H1 (x=222) and body (x=419) finally share a system. (b) Pull
one artifact into each of the four principles: principle 01 gets the 15s→2s bar, 03 gets the
decision matrix, 04 gets the 3.5→7.8 chart. They already exist elsewhere on the site. That converts
5,730px of unbroken serif into an argument with evidence in it, and it is the fastest way to stop
the page reading as a blog post.

### 4. Give the hero panel one product surface and one hierarchy, and lift it above the mobile fold
**Shows in:** `home-1440.png`, `home-1024.png`, `home-390.png` (panel header at y≈769).
**Change:** Replace the 2×2 equal grid with **1 large + 3 small**: "1M+ registered users" at ~72px
occupying the full panel width, and the other three as a 3-up row beneath at ~34px. Put a small,
honestly-drawn product frame — the health-report card, or the 15s→2s bar already built for the case
card — in the top-right of the panel. **Delete the four green underlines** (149px and 85px for
incommensurable metrics — they encode nothing). On mobile, move the panel above the body paragraph
so it lands within the first 700px; the paragraph can follow the panel without loss.

### 5. Collapse to two content measures per page, and take green down to two jobs
**Shows in:** `work-step-syncing-1440-full.png` (three left edges: x=157, x=233, x=419; crops `ss_01`
and `ss_03`), `home-1440-full.png` (21 green bands).
**Change (a):** Define exactly two measures — `--measure-wide: 1120px` (panels, cards, tables,
charts) and `--measure-read: 640px` (serif prose) — and give them **the same left edge** at x=160,
rather than centring the narrow one independently. Immediate win: the decision matrix in crop `ss_03`
moves from 570px to 1120px and stops wrapping "Ship the engagement roadmap as written" to four
lines. **Change (b):** green = links + one positive outcome state, nothing else. Ordinals →
`--ink-40`; bullets → `--ink-30`; the "Current" and "LIVE" dots → neutral with a text label. Takes
green from ~21 appearances per page to ~6.

---

## Also worth fixing (below the top five)

- **`home-1024.png`:** the CTA row wraps 2+1 and orphans "LinkedIn ↗" on its own line. Set the row
  to `flex-wrap: nowrap` with the tertiary link allowed to shrink, or drop it below the two buttons
  deliberately at a defined breakpoint rather than by accident at 1024.
- **`home-1440-full.png` crop `home_07`:** remove or fill the ~505×190px empty grey block in the Lab
  card.
- **`lab-grounded-1440.png` / `-320.png`:** the native `<select>` clips to "…plain reporti" and shows
  OS chrome. Style it (or truncate the option label to the case id and name only), and give the
  "pass" verdict a status badge rather than 16px mono.
- **Smart quotes:** `home-1440.png` "isn't" vs `about-1440.png` "isn’t" — same sentence, two glyphs.
  Run one pass over all content.
- **Section pad outlier:** the 218px gap at CSS y≈4895 on `home-1440-full.png` against a 183px
  median. One token.
- **Metric redundancy:** the hero panel shows 1M+, +20%, +35%, 15%; the very next section
  (crop `home_01`) shows 1M+, +20%, 15s→2s, +35%, 2, 5+. Three of six repeat within one scroll.
  Either the panel drops to two numbers or the grid drops the three it duplicates.
- **`work-1440.png` and both case heroes:** ~120–180px of dead space between the subhead and the
  next element while the right-hand panel runs 150px lower. Bottom-align the two columns or reduce
  the left column's bottom pad.

---

## What must not be lost in the next pass

1. The H1 typography and the warm neutral palette.
2. The alternating split case cards — the only place the layout changes gear.
3. The I OWNED / WE SHIPPED / I DID NOT OWN triptych. Promote it, do not touch it.
4. `about-1440.png`'s composition. It is the page the rest of the site should be measured against.
5. Grounded. It is the best evidence on the site.
6. Zero QA markers. That bar is met — keep it met.
