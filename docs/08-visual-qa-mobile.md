# 08 — Visual QA, MOBILE

**Agent 8.** Read: every `*-320.png`, `*-375.png`, `*-390.png`, `*-430.png` in
`docs/screenshots/iteration-2/`, plus `home-390-full.png` and `work-two-seconds-390-full.png`
(and, for cross-checking, the `-full` captures of `/work`, `/approach`, `/about`,
`/lab/grounded`, `/work/steps-premier-league`).

Screenshots are 2× DPR. All measurements below are converted to CSS px and stated as CSS px.
Viewport height in every above-fold capture is **844**.

**Verdict up front.** The *typography* is designed for mobile and it is good. The *components* are
not — five of them ship their desktop rendering into a 390px column, and three of those are
clipped or illegible. On top of that the homepage renders a **duplicated proof-strip row** and a
**duplicated contact block**, and the hero carries an amber chip that two binding rulings
(`04-ia.md` §5.7, T15) forbid by name. A Head of Product on a phone reaches the fold, sees a red
dotted-underlined question where the "Currently:" line should be, no Resume link anywhere on
screen, and 25MB → 6MB twice. That is a closed tab before the writing gets a chance.

---

## 1. Is the mobile experience genuinely designed, or a squeezed desktop layout?

**Designed at the type layer. Squeezed at the component layer.** Both halves are evidenced.

### Evidence that it is genuinely designed

| Where | What I see |
|---|---|
| `work-two-seconds-390-full.png` (slice at ~CSS y3800–4750) | Case-study prose is Newsreader at ~19px/1.6 in a 342px column ≈ **44 CPL**. That is the `03-design-system.md` §4.1 mobile step (18px/1.65), deliberately taken *down* from the 21px desktop prose. It reads. This is the single best thing on the mobile site. |
| `work-two-seconds-390-full.png`, ColdStartScale figure | The three-bar scale comparison reflows to full width with real HTML text (`BEFORE 15s` / `BENCHMARK 2s` / `AFTER under 2s`), right-aligned values, bars to scale. Legible, selectable, correct. D2-05's "CSS where text legibility matters" decision paid off here. |
| `home-320.png` vs `home-430.png` | The hero H1 reflows 6 → 4 lines and the sub-line 3 → 2 across the band without a single orphan or a hyphen. `text-wrap: balance` on two block spans is doing real work. |
| `work-two-seconds-390.png` | The right rail has genuinely dissolved into the prose flow — the "Bar drawn to the bound…" method note sits inline under the metric in mono `--muted`, not `display:none`. §3.3's rail rule is honoured. |

### Evidence that it is a squeezed desktop layout

| Where | What I see |
|---|---|
| `lab-grounded-390-full.png` (CSS y≈4200–4600) | The **EvalScorecard ships the full desktop 16×4 matrix at 390px**. `SCOPE` is the last column that renders; `ESCALATION` and `READABILITY` are entirely off-screen. `03-design-system.md` §3.6 says "≥640px: EvalScorecard switches to the full 16×4 matrix" and §8.5 specifies a mobile variant at `viewBox="0 0 288 230"` that "keeps the finding and drops the matrix". **The mobile variant was not built.** |
| `work-steps-premier-league-390-full.png` (CSS y≈5100–5600) | The **DecisionTable is hard-clipped mid-word** at the container edge: the header reads `REVER`, and the body cells read `High — i`, `quietly. `, `publishi`, `nobody`, `day it er`. No fade, no scroll cue, no ellipsis. Meanwhile `COST AFTER LAUNCH` wraps to three lines and the first body cell wraps to **eight** (`Recurring. / Every / week / needs new / material / and the / bill never / stops.`) inside a ~90px column. §9.3 of the design system describes this exact failure as unacceptable — for `[NEEDS:]` cells. It shipped for ordinary ones. |
| `work-steps-premier-league-390-full.png` (CSS y≈4270–4420), FeedbackCadence SVG | The desktop `viewBox` is scaled to fit 342px. The caption *"One felt signal, arriving far too late to change what you do this evening."* renders across 188 CSS px — **~2.6 px per character, i.e. a ~6px type size.** §8.4 specifies a mobile variant at `viewBox="0 0 288 210"` with a deliberately changed encoding. Not built. |
| `home-390-full.png` (CSS y≈5990–6560), Timeline | `place` is rendered at 390px. §5.4 says *"`place` (Noida, Bangalore) is omitted at 375px and appended at ≥768."* The result is **four orphan wraps in five rows**: `… · Noida` then `Consumer health · 1M+ registered beneficiaries`; `Droom ·` / `Gurugram`; `Infinyte Club ·` / `Bangalore` / `Signup and KYC`; `Product Management Intern ·` / `YourStory Media · Bangalore`. Row heights go 2, 2, 2, 3, 2 lines. |
| `work-320.png`, `about-320.png`, `lab-320.png`, `approach-320.png` | **Every page uses the hero clamp for its H1.** `--text-hero` is `clamp(2.25rem, …)` so the floor is 36px at every width below ~440px. §3.2 explicitly specifies the `/work` h1 at 30px (`--text-2xl`) on mobile. Consequence at 320: `/work` opens with a **six-line, ~233px title** and `/about` with five. The index page's title is therefore set *larger* than the case-study title it links to (`work-two-seconds-320.png`, "Two Seconds", ~38px on one line) — the type ladder is inverted. |
| `lab-320.png` (CSS y≈745–844) | The LabCard's 2×2 scorecard grid **loses its column alignment at 320**: `CASES`/`HAND-LABELLED` start at x≈50/155, `LABEL AGREEMENT`/`FULL RUN` at x≈50/300. It is a wrapping flex row, not a grid. At 390 (`home-390-full.png`) the same block aligns — so this is a 320-only break nobody looked at. |

---

## 2. At 320px: everything clipped, cramped, illegible or touching an edge

Named exhaustively.

1. **`lab-grounded-320.png` — the `<select>` is clipped mid-glyph.** `n-01 · In range — A` then a
   half-drawn character jammed against the chevron. At 375 it truncates to `In range — All val`
   with no ellipsis. The control has no `text-overflow` and no shortened mobile option label.
2. **`work-steps-premier-league-320.png` — a seven-line red field in the header block.** `TEAM`'s
   entire value is a chip (2 lines), `TIMELINE`'s entire value is a chip (2 lines), and the
   `SESSION TIME` qualifier is two more chips (3 lines). Four chips, seven consecutive red lines,
   in one 500px band, above the fold. Not clipped — but this is the most cramped, most alarming
   screen on the site.
3. **`work-ai-health-reports-320.png` — same pattern.** `TEAM` and `TIMELINE` are both wholly
   chips; the `CROSS-SELL REVENUE` qualifier adds a third. Two of the three header fields are
   questions.
4. **`work-two-seconds-320.png` — the `COLD START` qualifier is five red lines of six.** The chip
   text `which percentile, on which device population?` + `device lab, production telemetry, or
   staged pre/post?` wraps to 5 lines at 320. Two chips inside one `MetricDelta`, which §5.0 rule 6
   forbids ("At most one amber `[NEEDS:]` per `MetricDelta`").
5. **`lab-320.png` — LabCard 2×2 grid columns do not align** (measured above).
6. **`work-320.png` — H1 consumes the whole fold.** Six lines, ~233px, ending `from / one product /
   surface.` Nothing but a title and a lede is above 844.
7. **`this-route-does-not-exist-320.png` — the `copy` button drops onto its own line** below the
   email, leaving a 30px-tall control floating under a full-width link. Same wrap at
   `home-375.png`; it sits inline again at 390 and 430. An affordance that changes line position
   three times across the phone band.
8. **Right-edge tightness (not a clip, but close).** `this-route-does-not-exist-320.png`: the
   mono email string `aniketagarwalmhq24@gmail.com` ends at x≈290 against a 24px right inset —
   **6px of air.** Any longer address, or any user at 100% text zoom, overflows.
9. **`home-320.png` — the eight recruiter facts do not fit.** `Noida` is absent above the fold;
   there is no Resume affordance in the nav or the hero; the link row (email / LinkedIn) sits
   below 844. §4.1 T5, T7, T10 fail at 320.

I found **no horizontal scrollbar** at 320 on any route. T16's first clause passes; its second
clause ("no clipped text") fails on items 1 and — at 390 — on the DecisionTable and EvalScorecard.

---

## 3. Where the spacing rhythm is broken

Measured forensically off `home-390-full.png` by scanning every pixel row for one that contains no
ink, then collapsing runs. All figures CSS px.

### 3.1 Section-to-section gaps are bimodal, and the break is in the wrong place

| Boundary | Measured gap |
|---|---|
| Grounded pointer → first proof row | **70** |
| Proof strip → `SELECTED WORK` | **60** |
| Work section → `HOW I WORK` | **117** |
| Beliefs → `BUILT` | **122.5** |
| Built → `TRACK RECORD` | **116** |

Three boundaries agree at 116–122.5. Two do not — and they are the two that bracket the **proof
strip**, which is spaced at roughly half the section rhythm. The consequence is not abstract: the
proof strip does not read as a section. It reads as a continuation of the hero paragraph.

### 3.2 The proof strip has no eyebrow — the only homepage section without one

`SELECTED WORK`, `HOW I WORK`, `BUILT` and `TRACK RECORD` all carry a mono-caps eyebrow. The proof
strip carries none (`home-390-full.png`, the crop at CSS y850–1675). Combined with 3.1, the most
important block after the H1 has neither a label nor a boundary.

### 3.3 Intra-component rhythm break inside the strip

The **first** metric row has **69.5px** of trailing space before its hairline. Every subsequent
row has **36**. Visible as a hole under the first number.

### 3.4 Two separator rhythms for one visual object

Full-width `--rule` separators between stacked case-study rows measure **42.5 / 44** above and
below. The identical-looking separators between belief blocks measure **35.5 / 37**. Same object,
two rhythms, 20% apart, ~2000px from each other.

### 3.5 An empty ruled band — present on two routes

`home-390-full.png` at CSS y≈3320–3400 and `about-390-full.png` at CSS y≈1030–1100: after
`Dual degree, IIT Kharagpur` there is a hairline, then **~65px of nothing**, then another
hairline, then the next block. An empty timeline row is being rendered. This is the clearest
single "unfinished build" artefact on the mobile site and it appears twice.

### 3.6 The DecisionTable has no top margin

`work-steps-premier-league-390-full.png`, and `lab-grounded-390-full.png` at the scorecard: the
table's `CASE` header row sits ~20px under the closing line of the paragraph above, where every
other block on the page gets 40–120. The table collides with the prose.

---

## 4. Where typographic hierarchy is unclear

1. **The homepage H1 and the case-card headline are the same sentence.**
   `home-390.png` sets *"The roadmap was engagement. The app took fifteen seconds to open."* at
   ~36px. `home-390-full.png` (CSS y≈2280) sets **the identical sentence** at ~19px bold sans as
   case-card 01's headline. Repetition was budgeted (§3.2 of `04-ia.md`: three encodings, three
   *visual registers*), but this is the same words in the same family and weight, twice. It reads
   as a duplicated component, not as a motif.

2. **Case-card headlines and `/approach` belief claims are typographically identical.**
   Compare `home-390-full.png` CSS y≈2280 (`The roadmap was engagement…`) with CSS y≈4030
   (`A feature shipped onto a broken foundation…`). Both: sans, weight 600, ~19px, three ragged
   lines, `--ink`, preceded by nothing. A reader cannot tell "this is a project" from "this is an
   opinion" without reading.

3. **The LabCard buries its own name under two other things.**
   `home-390-full.png` CSS y≈5310 and `lab-320.png`: the order rendered is
   **`[LIVE]` pill → `demo · deterministic · synthetic data` (mono, ~19px) → `Grounded` (bold sans,
   ~19px)**. The mono tag line and the title are at the same optical weight, and the title is
   third. `03-design-system.md` §5.5 specifies title-first with the status *inline after* it. On
   `lab-grounded-320.png` this is worse: the pill is the first element on the entire page, above
   the `Grounded` H1.

4. **`/approach` belief: sans h2 immediately over a bold-serif paragraph.**
   `approach-320.png`: `Fix the floor before you build the ceiling` (~28px sans 600) is followed
   directly by a five-line **bold Newsreader** paragraph. Two heavy blocks stacked with nothing
   between them. §3.4 specifies h2 at 24px and the argument at regular serif 18px.

5. **`/work` index title outranks the case-study titles it links to.** Measured in §1 above.

6. **`pass`/`fail` in the eval table re-purposes the two accents.** `lab-grounded-390-full.png`
   CSS y≈4230+: `pass` in `--signal`, `fail` in `--flag`. §1.1 assigns `--signal` = "a number
   moved" and `--flag` = "where I was wrong or cannot substantiate". Here they mean green/red
   status. A reader who has learned the pair in ten seconds — which the design system explicitly
   claims as a feature — is now mis-taught by a 16-row table.

---

## 5. Do the diagrams read at 375px?

| Diagram | Route | Reads at 375? |
|---|---|---|
| `ColdStartScale` (BEFORE / BENCHMARK / AFTER bars) | `/work/two-seconds` | **Yes.** Real HTML text, right-aligned values, bars to scale. The best component on mobile. |
| `BundleScale` (25MB vs 6MB) | `/work/two-seconds` | **Yes.** Same construction, same result. |
| `MetricDelta` (before → rule → after) | everywhere | **Yes as a form** — but see §7 for two instances where the bar carries no data. |
| **`FeedbackCadence`** (SVG) | `/work/steps-premier-league` | **NO.** Desktop `viewBox` scaled to a 342px column. Captions measure ~2.6 CSS px per character, i.e. a ~6px type size. Unreadable. §8.4's mobile variant was not built. |
| **`DecisionTable`** (three options × cost / reversibility) | `/work/steps-premier-league` | **NO.** Hard-clipped mid-word at the container edge (`REVER`, `publishi`, `day it er`), header wraps to 3 lines, first cell wraps to 8. No scroll cue of any kind. |
| **`EvalScorecard`** (16×4 matrix) | `/lab/grounded` | **NO.** Ships the desktop matrix. Two of the four dimensions are off-screen. There is a fade mask on the right edge, but no arrow, no "scroll →" label, and the row hairlines fade with it so the whole thing reads as clipping rather than as scrollable. §8.5's mobile variant was not built. |
| `EvalScorecard` summary tiles (CASES / HAND-LABELLED / LABEL AGREEMENT / FULL RUN) | `/`, `/lab` | **Yes at 390. NO at 320** — columns lose alignment (§2 item 5). |

Three of six named diagram components fail on a phone. `OptionSpread` (spec §8.3) does not appear
at all — the three-option content shipped as the clipped `DecisionTable` instead.

---

## 6. How much amber is on screen at once — and does it read as rigour?

### The count

**`home-390.png` (above the fold): 1 chip.** *"one clause — what is on your desk this month?"*,
inside the `Currently:` line.

**`home-390-full.png`: 10 chips.**

| # | Location | Chip |
|---|---|---|
| 1 | **Hero**, `Currently:` line | one clause — what is on your desk this month? |
| 2 | Proof · COLD START | which percentile, on which device population? |
| 3 | Proof · BUNDLE SIZE (2nd instance) | download, install, or APK/AAB size? |
| 4 | Proof · SESSION TIME | league entrants, or everyone active? |
| 5 | Proof · SESSION TIME | which window, against which baseline? |
| 6 | Case card 01 · COLD START | which percentile, on which device population? |
| 7 | Case card 01 · COLD START | device lab, production telemetry, or staged pre/post? |
| 8 | Case card 02 · SESSION TIME | league entrants, or everyone active? |
| 9 | Case card 02 · SESSION TIME | which window, against which baseline period? |
| 10 | Case card 03 · CROSS-SELL REVENUE | 15% of which revenue line, and measured over what period? |

`04-ia.md` §5.8 budgets `/` at **3**, all inside the proof strip. `04-ia.md` §4.2 T15 requires
**at most 3 across S1+S2 and zero in the hero block**. Built: **10, one of them in the hero.**
Three chips are near-duplicates of another chip on the same page (2≈6, 4≈8, 5≈9) — the same
question asked twice about the same metric, ~1,000px apart.

Worse on the case studies: `work-steps-premier-league-320.png` puts **four chips and seven red
lines above the fold**, and `work-ai-health-reports-320.png` renders **two of three header fields
as nothing but a chip**.

### Does it read as rigour or as a broken form?

**As a broken form, and the reason is a rendering defect rather than an editorial one.**

Zoom of `home-390.png` at CSS y550–615 shows what actually ships: **`--flag` red text with a
dotted underline, on the page ground, with no tint, no bracket, no label.** The spec in
§9.2 is explicit and different:

> `color: var(--color-flag); background: var(--color-flag-tint); border-radius: 2px;
> padding-inline: 0.4em; box-decoration-break: clone;`

None of the ground, the padding or the radius is present. What a cold reader sees is red text with
a dotted underline — which is, pixel for pixel, a **browser spell-check squiggle**. There is no
`[NEEDS:]` bracket and no visible "Unanswered:" cue (the `sr-only` prefix is invisible by
definition), so nothing on screen tells a sighted reader that this is deliberate.

The single worst instance is chip #1. A recruiter's first fold reads:

> `Currently:` *one clause — what is on your desk this month?*

That is not a question about a number already on screen. It is an **editorial note to the author
that shipped**. `04-ia.md` §5.7 anticipated this precisely and ruled the `Currently:` token to
`/about` for exactly this reason — *"a `Currently:` followed by a question mark reads as an
unfinished template, and it would be the first amber chip a ten-second reader sees."* It was
built into the hero anyway. And on `/about` (`about-390-full.png`) the `Currently:` line does not
appear at all, so the ruling was inverted in both directions.

The design's own thesis is defensible. The *rendering* converts it into an error state.

---

## 7. Forbidden list

Checked against every mobile capture. **Nothing on the forbidden list ships.**

| Item | Present? |
|---|---|
| Dark default theme | No. `--paper #F6F5F2` at every width. |
| Gradient meshes · glassmorphism · animated blobs · particle backgrounds · 3D | No. |
| Heavy drop shadows | No. I found no shadow of any kind; the `grep -rn "box-shadow"` gate appears to be holding. |
| Custom cursors · parallax · typewriter | Nothing in the stills suggests any; no cursor applies on touch. |
| Marquee rows · testimonial carousels | No. |
| Stock photography · hero headshot | No image of any kind on any mobile capture. |
| Skill-logo walls · tool-icon grids | No. `about-390-full.png` renders tools as **one mono text line** (`SQL · Python · Mixpanel · …`). Correct per §3.7. |
| Progress-bar skill ratings | Not as skill ratings. **But two `MetricDelta` bars carry no data and read as decorative progress bars**: `work-ai-health-reports-320.png` renders `CROSS-SELL REVENUE · unstated base ————▸ +15%` and `ENTERPRISE CLOSES · 0 ————▸ 5+`, both with an *empty* track. D1-31 ruled the enterprise line out of the metric grid entirely; it is in a metric component. Flagging as the nearest approach to the banned pattern. |
| Contact form | No — plain selectable email plus a `copy` control. Correct. |

One adjacent defect worth recording: `home-390-full.png` and `approach-390-full.png` both end with
a six-line mono footer paragraph containing **"Built with Next.js."** `04-ia.md` §2.5 specifies
*"One row, mono, small: email · LinkedIn · Resume · GitHub. Nothing else… no 'built with'."*

---

## 8. Drift toward the three templated 2026 looks

**(a) Cream + high-contrast serif display + terracotta — partial drift, ~2 of 3 legs.**
The ground is cream (`#F6F5F2`), the reading face is a high-contrast serif (Newsreader), and the
accent is red at hue 357. D1-26 moved `--flag` off the terracotta axis specifically to break this,
and on that measure it worked — the red is a lab-report correction red, not a terracotta. The
display face is a grotesque, not a serif, which breaks the third leg cleanly. **But the defence
assumed a sparse accent.** At 10 chips on the homepage and 7 red lines above the fold on
`work-steps-premier-league-320.png`, the red stops reading as an out-of-range marker and starts
reading as the accent colour of the design. Fix the chip density and the count, and this leg
closes.

**(b) Near-black + one acid accent — no drift.** Not close.

**(c) Broadsheet with hairline rules and zero radius — substantial drift, and it is worse on
mobile than on desktop.**
I counted **31 near-full-width horizontal rules on `home-390-full.png` alone.** Every homepage
section uses the identical construction: mono-caps eyebrow → full-width hairline → stacked text →
full-width hairline. The proof strip, the case cards, the beliefs, the timeline and the contact
block are all that shape. Maximum radius is 4px, which is optically zero.

The reason this bites specifically on mobile is structural: `03-design-system.md` §4.2's figure
rhythm — *"narrow, narrow, wide, narrow… what makes a long page read as a document rather than a
scroll"* — collapses to a single `full` column below 768px, by the spec's own table. So the
mobile site loses the one device that was supposed to distinguish it, and what remains is
hairlines and mono eyebrows. **The anti-template argument in the design system is a
desktop-only argument.** Mobile needs its own, and it does not have one.

---

## 9. The five highest-impact mobile fixes, ranked

### 1 — Delete the duplicated proof-strip row and the duplicated contact block

**Shows in:** `home-390-full.png`. Crop `slices/proofstrip.png` (CSS y850–1675) shows
`BUNDLE SIZE · 25MB ▸ 6MB · 76% smaller` rendered **twice**, once before `COLD START` and once
after, with *different* qualifier lines (`Two stated totals; the basis is the open question below`
vs the amber `download, install, or APK/AAB size?`). Four rows ship where `homeSchema.proof` is
`min(2).max(3)`. Separately, at CSS y≈6690–6960 the **email + `copy` + heading block renders
twice back to back** ("If you want to argue with a number on this page…" then "If any of this is
a problem you have right now…"), each with the identical address and control.

**Change:** in the homepage composition, the proof strip must render `proof` exactly once —
`{home.proof.map(...)}` is being called on a list that already contains the hero metric, or the
hero metric block is being emitted above the strip without being excluded from it. Order the three
survivors `COLD START · BUNDLE · SESSION TIME` per D1-11 (cold start first, because the H1 primed
it). Render one contact block, at the foot, and delete the other. Add a build assertion:
`proof.length <= 3 && new Set(proof.map(p => p.label)).size === proof.length`.

**Why first:** a duplicated number is the one defect that discredits every other number, on a site
whose entire thesis is "I state numbers carefully."

---

### 2 — Put a Resume affordance in the mobile nav bar, and rebuild the hero link row

**Shows in:** `home-320.png`, `home-375.png`, `home-390.png`, `home-430.png` — the nav is
`Aniket Agarwal … Menu` at every mobile width, with **no `Resume ↗`**. The hero link row is three
stacked lines (`Read the work ↓`, email + `copy`, `LinkedIn ↗`) and contains **no resume link**.
The string `Resume ↗` appears for the first time at CSS y≈7080 of a 7,419px page
(`home-390-full.png`). `Noida` never appears above the fold at any mobile width.

**Change:** `04-ia.md` §2.1 and §3.1 both require it. In `Nav.tsx`, render the outlined
`Resume ↗` **outside** the `<details>` panel so it is a sibling of `Menu`, targeting `/resume`
with `target="_blank" rel="noopener"` (§2.4c). In the hero, collapse the three stacked lines to
one wrapping mono row — `Resume (PDF) · LinkedIn · aniketagarwalmhq24@gmail.com` — and add
`Noida, India` to the identity paragraph. That recovers ~90px of fold and satisfies T5, T7, T8 and
T10 in one edit.

---

### 3 — Move the `Currently:` chip off the hero, and give the chip its specified ground

**Shows in:** `home-320/375/390/430.png` — the first amber thing a phone reader sees is
`Currently: one clause — what is on your desk this month?` The zoom
(`slices/chip_zoom.png`) shows red text with a **dotted underline and no background**.

**Change, two parts.**
(a) Move the token to `/about`, per `04-ia.md` §5.7 — it is currently on neither the hero's
allowed list nor `/about` at all (`about-390-full.png` has no `Currently:` line). Hero chip count
must be **zero**.
(b) Implement §9.2 as written on `[data-needs]`: `background: var(--color-flag-tint);
border-radius: 2px; padding-inline: 0.4em; box-decoration-break: clone;` and **remove the dotted
`text-decoration`** — it is the thing that makes the chip read as a spell-check error. Prefix the
visible text with a literal `NEEDS:` so a sighted reader gets the same cue the `sr-only` span
gives a screen-reader user.
(c) Enforce §5.0 rule 6 in the content schema: `MetricDelta` accepts **one** `[NEEDS:]` across
`population | window | method`; a second must collapse into the first or become the muted literal
`not stated`. That alone takes the homepage from 10 chips to 5, and
`work-steps-premier-league-320.png` from four chips above the fold to two.

---

### 4 — Build the three missing mobile diagram variants (they are already specified)

**Shows in:** `lab-grounded-390-full.png` (EvalScorecard, two of four dimensions off-screen),
`work-steps-premier-league-390-full.png` (DecisionTable clipped mid-word at `REVER` / `publishi` /
`day it er`; FeedbackCadence captions at ~6px).

**Change:** the pattern is already in the tree —
`<span className="sm:hidden"><MobileVariant/></span>` (design system §8, line ~1137). Apply it to
all three.
- `EvalScorecard` → the §8.5 mobile variant (`viewBox="0 0 288 230"`): drop the 16-row matrix,
  keep the finding (*scope fails most often; five cases pass all four*) as four labelled
  count bars. The full matrix returns at ≥640.
- `FeedbackCadence` → the §8.4 mobile variant (`viewBox="0 0 288 210"`), which the spec already
  authorises to change encoding provided the finding is identical.
- `DecisionTable` → below 640 render **not a table**: one `<section>` per option, option name as a
  bolded line, then `Cost after launch` and `Reversibility` as two labelled paragraphs beneath it.
  A three-column table cannot be made to work in 342px and §9.3 already says so. If a scroll
  container is kept anywhere, it needs a visible mono `scroll →` affordance, not a fade.

---

### 5 — Give mobile its own type ladder and fix the two structural spacing defects

**Shows in:** `work-320.png` (six-line H1), `about-320.png` (five-line H1), `lab-320.png`,
`approach-320.png`; the 60/70 vs 116/117/122.5 section-gap split measured in §3.1; the empty ruled
band in `home-390-full.png` (CSS y≈3320–3400) and `about-390-full.png` (CSS y≈1030–1100).

**Change, three edits.**
(a) **Stop using `--text-hero` for non-hero H1s.** Only `/` gets the clamp. `/work`, `/approach`,
`/about`, `/lab` use `--text-2xl` (30px) below 768 and `--text-3xl` (38px) above, per §3.2. This
alone recovers ~100px of fold on four routes at 320 and un-inverts the index-vs-case-study ladder.
(b) **One section-gap token.** Set `Section`'s mobile `padding-block` to a single value and let
every homepage section use it — including the proof strip, which currently gets 70 above and 60
below where its neighbours get ~118. Give the proof strip the eyebrow it is missing (`RESULTS` or
equivalent) so it stops reading as part of the hero paragraph. Remove the 69.5px trailing pad on
the first metric row so all four rows share `padding-block: 24px` (§5.3).
(c) **Kill the empty timeline row.** Filter falsy entries before mapping, and drop `place` below
768 per §5.4 — that also removes the four orphan wraps in `home-390-full.png` at CSS y≈5990–6560.

---

## Appendix — pass/fail against `04-ia.md` §4, mobile rows only

| # | Check | Result |
|---|---|---|
| T1 | `Product Analyst` visible without scrolling at 390 | **Pass** |
| T2 | `October 2024` and `present` | **Partial** — reads `since October 2024`; "present" is implied, not stated |
| T3 | `HCL Healthcare` | **Pass** |
| T4 | `1M+ registered` | **Pass** |
| T5 | `Noida` | **Fail** — absent from the hero at 320/375/390/430; appears only in the timeline and footer |
| T6 | Roles he is open to | **Pass** — `Open to PM and APM roles in consumer product, health and applied AI` |
| T7 | Resume affordance in nav **and** hero link row | **Fail** — in neither, at any mobile width |
| T8 | LinkedIn link | **Pass** at 390/430; **Fail** at 320 (below the fold) |
| T10 | Hero link row fully visible | **Fail at 320**; pass at 375+ |
| T11 | Grounded pointer in hero block | **Pass** — visible at 430 above the fold, at 390 on first scroll |
| T12 | Proof strip visible with three cells | **Fail** — four rows render, two of them the same metric |
| T13 | Every proof cell shows a qualifier at label size, not hover | **Pass** |
| T15 | ≤3 chips on S1+S2, zero in the hero | **Fail on both clauses** — 10 on the page, 1 in the hero |
| T16 | 320px: no horizontal scrollbar, no clipped text | **Partial** — no scrollbar; clipped text in the `lab-grounded` `<select>` |
| T18 | Mobile control is the word `Menu` | **Pass** — no hamburger glyph at any width |
| T19 | Case-study header shows Role, Team, Timeline **and** an `I did not` line, all above the fold | **Fail** — `work-two-seconds-390.png` shows Role / Team / Timeline only; no `I did not` line above 844 |
| T22 | `/approach` shows exactly three beliefs | **Fail** — `approach-390-full.png`'s own `SECTIONS` index lists 01–06 |
| T24 | Every page ends with exactly one next-step link | **Fail** — `this-route-does-not-exist-320.png` offers three (`Home`, `The work`, `Grounded`) plus a contact block; `/approach` ends with a six-item `SECTIONS` list *after* its next-step link |

**Not testable from these captures:** the open state of the mobile `<details>` panel (no capture
exists), the nav condense animation (T17 is a desktop scroll test), and the sticky 2px progress
bar on case studies (zero-width at scroll 0). Request an open-panel capture at 320 and 390 for the
next iteration — it is the one interactive surface on mobile that has never been looked at.
