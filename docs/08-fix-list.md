# 08 — Fix list

**Arbiter pass.** Synthesis of six independent reviews of the iteration-2 build:
`08-visual-qa-mobile.md`, `08-visual-qa-desktop.md`, `10-review-ceo.md`,
`10-review-head-of-product.md`, `10-review-vp.md`, `10-review-recruiter.md`.

Verdict across the six: **CEO — yes, same-day reply. Head of Product — yes, hire at APM/PM I.
VP — yes, unhesitating. Recruiter — GATE FAILED (2 of 8 facts unreachable in 20s).** The writing
clears the bar everywhere. What fails is finishing: five components ship broken, mis-encoded, or in
the exact shape their own spec forbade.

---

## 0. READ THIS FIRST — findings already closed after the screenshots were taken

`docs/screenshots/iteration-2/` was captured at 05:49. Commits `aa945ba` (05:55) and `7faef21`
(06:00) landed after. **The following are already fixed in the working tree. Do not re-implement
them, and do not re-open them from the reviews.**

| Finding | Raised by | Status in tree |
|---|---|---|
| `Currently: [NEEDS: one clause…]` amber chip in the hero (T15) | CEO ①, HoP App-B, VP §7, recruiter T15, both QA passes | **CLOSED.** `content/home.mdx:27` status is now `Based in Noida. Open to PM and APM roles…` |
| `Noida` absent from S1 (T5) | recruiter fact 5, both QA passes | **CLOSED.** Same line. |
| No resume affordance in the hero link row (T7, half) | recruiter fact 7, both QA passes | **CLOSED.** `app/page.tsx:51–57`, first item in the row. |
| `BUNDLE SIZE` rendered twice in the proof strip | CEO ③, recruiter T12b, mobile QA ①, desktop QA §4 | **CLOSED.** Removed from `home.mdx` `proof:`; it is the hero metric only. |
| Three numbers rendering as six tiles (case cards repeating the strip) | CEO ③, mobile QA ①, HoP §4 | **CLOSED.** `CaseCard` takes `showFigure={false}` on `/`. |
| Two stacked contact blocks at the foot of `/` | CEO ④, desktop QA §2.5, recruiter T24, mobile QA ① | **CLOSED.** `CopyEmail` removed from the homepage closing; `Footer` keeps the single one. |
| `unstated base ▸ +15%` and `0 ▸ 5+` drawn as empty scale bars | HoP §9, desktop QA §6, mobile QA §7 | **CLOSED.** New `components/content/Stat.tsx`, no bar, no arrow. |

**Regression introduced by that fix, and it is now a checklist failure:** removing `BUNDLE SIZE`
from `proof:` leaves the proof strip with **two cells**. `04-ia.md` T12 requires three. See fix #7.

---

## 1. Defects — every NO, every failed checklist row

These are not opinions. Rows adjudicated against the current tree, not the screenshots.

### 1.1 `04-ia.md` §4 checklist — FAIL

| Ref | Check | Result | Evidence |
|---|---|---|---|
| **T2** | S1 contains `October 2024` **and** `present` | **FAIL** | The literal string `present` is not on the page. `home-390.png` / `home-1440.png` read `since October 2024`. Sense survives, literal check does not. (recruiter, mobile QA) |
| **T7** | Resume affordance in the nav **and** the hero link row | **FAIL, nav half only** | Hero half is closed. At <768 the nav is `Aniket Agarwal … Menu`; `Resume ↗` is inside the `<details>` panel (`Nav.tsx:82–89`). `home-320/375/390/430.png`. (recruiter, mobile QA) |
| **T10** | Hero link row fully visible in S1 | **FAIL at 320** | `home-320.png` — the row sits below 844. Now shorter post-fix but unverified; re-capture. (mobile QA) |
| **T12** | Proof strip, three cells | **FAIL** | Two cells in the tree. Was four (one duplicated) in `home-390-full.png`. (recruiter, mobile QA, desktop QA) |
| **T15** | ≤3 chips on S1+S2, zero in hero | **PASS now** (was 8–10) | Homepage is at 2. Do not regress it. |
| **T16** | 320px, no clipped text | **FAIL** | `lab-grounded-320.png` — the `<select>` is clipped mid-glyph: `n-01 · In range — A` + a half-drawn character against the chevron. At 375, `In range — All val` with no ellipsis. (mobile QA §2.1) |
| **T19** | Role · Team · Timeline · `I did not`, all above the fold | **FAIL on mobile** | `work-two-seconds-390.png` shows Role/Team/Timeline only; no `I did not` line above 844. Structurally passes at 1440. (mobile QA, desktop QA) |
| **T22** | Exactly three beliefs on `/approach` | **PASS on beliefs, FAIL on presentation** | `content/approach.mdx` has three belief `##`s + postmortem + market note + pointer. The `SectionIndex` numbers all six `01–06`, so `approach-1440.png` reads as six beliefs. Reviewers split; arbitrated in §3-B. |
| **T23** | Postmortem present, amber, phrased as a **question** | **FAIL on the question clause** | The chip reads `one decision that did not work, and what it cost` — a noun phrase, a Jira ticket. D1-17 requires an answerable question. It is the only non-question chip on the site. (VP ③) |
| **T24** | Exactly one next-step link per page | **FAIL on `/404` and `/approach`** | `this-route-does-not-exist-320.png` offers `Home`, `The work`, `Grounded` plus a contact block. `/approach` ends with its next-step link and then a six-item `SECTIONS` list. (mobile QA) |
| **T43** | `hand-labelled` — 0 hits until CG B13 is answered | **FAIL, 3 hits** | `app/page.tsx:190`, `app/lab/page.tsx:68`, `components/diagrams/EvalScorecard.tsx:70`. Worse than a grep failure: `lab-1440.png` renders `HAND-LABELLED 0` directly beside `LABEL AGREEMENT 16/16`. A scorecard that advertises zero hand-labelled cases and then claims 16/16 agreement is self-refuting on the one page that exists to prove rigour. (arbiter) |

### 1.2 "Does it read at this width" — NO

| Component | Width | Result | Evidence |
|---|---|---|---|
| `DecisionTable` | **1440 and 390** | **NO** | `min-w-[36rem]` (576px) inside a 570px prose column, under an unconditional `mask-image` fade (`globals.css:216–226`). At 1440 the fourth column is cut mid-word — `HOW YOU WOULD LEARN YOU WERE WRONG` → `taken on…` / `who got…`; Steps → `WHAT / NEED / TO B / TRUE`. Column 1 breaks to 1–2 words for ten lines. **570px of empty page sits to its right.** At 390 it is hard-clipped: `REVER`, `publishi`, `day it er`; first cell wraps to eight lines. (desktop QA ①, HoP App-A "worst defect on the site for this reader", mobile QA §5) |
| `EvalScorecard` | **390** | **NO** | Ships the desktop 16×4 matrix. `ESCALATION` and `READABILITY` are entirely off-screen. `03-design-system.md` §8.5 specifies a `viewBox="0 0 288 230"` mobile variant. Not built. (mobile QA §5) |
| `FeedbackCadence` | **390** | **NO** | Desktop viewBox scaled into 342px. Captions at ~2.6 CSS px per character ≈ a 6px type size. §8.4 mobile variant not built. (mobile QA §5) |
| `OwnershipBlock` | **768–899** | **NO** | `md:grid-cols-3` gives three ~215px columns of 16px sans → 3–4 words per line, for the site's highest-value above-fold block. D-10 moved it from `sm:` to `md:` and did not fix it. (desktop QA §3a) |
| Case-study meta `<dl>` | **640–899** | **NO** | `sm:grid-cols-3` — `TIMELINE` holds `8 weeks` beside 180px of air while `TEAM` runs a chip over three lines. (desktop QA §3b) |
| `GroundedDemo` | **768** | **NO** | Verdict pane starts ~1,900px below the source panel. A reader cannot see the text and its score together, which is the whole tool. §3.6 specified the remedy and it was not applied. (desktop QA §3c) |
| `MetricDelta` | **all** | **NO** | See fix #2. |

### 1.3 Forbidden-list violations — shipped

| # | Banned by | Built | File |
|---|---|---|---|
| V1 | §5.3 — proof strip is "three **rows**, at every width"; a row of big numbers with dividers is the named stat-banner generator pattern | Three-across grid with vertical dividers at `lg` | `components/content/ProofStrip.tsx:16` |
| V2 | §5.5 — *"never a pill above it… A coloured badge above a heading is a named tell"* | `LIVE` in a green-bordered box, above and before the title, in three places | `app/page.tsx:164–166`, `app/lab/page.tsx`, `app/lab/[slug]/page.tsx` |
| V3 | §5.8 — *"There is no primary button on this site"* | `Run it →` is a green-bordered button | `app/page.tsx:178–184`, `app/lab/page.tsx` |
| V4 | §3.4 — *"No rail on this page… inventing one would be the documentation-template look"* | Numbered `SECTIONS` 01–06 rail on `/approach` | `app/approach/page.tsx:37–41` — **contested, see §3-A** |
| V6 | §1.2 — all-caps only at 11–12px mono | `LIVE` at ~14px caps in a box | same as V2 |
| — | `04-ia.md` §2.5 — *"One row, mono, small… no 'built with'"* | Six-line mono footer containing **"Built with Next.js."** | `components/layout/Footer.tsx:39` |
| — | §3.1 — beliefs stay **single-column at every width**; §3.4 — *"if all three run to the same length the page reads as generated"* | Rigid claim-left / argument-right two-column table, three rows of near-identical length | `app/page.tsx:132` |

### 1.4 The `[NEEDS:]` chip — the render defeats the rhetoric

Unanimous across all four hiring reviewers and both QA passes. `components/ui/Needs.tsx:19` ships
`--color-flag` text with a **dotted underline and no background**. `03-design-system.md` §9.2
specifies `background: var(--color-flag-tint); border-radius: 2px; padding-inline: 0.4em;
box-decoration-break: clone`. `--color-flag-tint` **exists in `globals.css:34` and is unused.**
There is no visible `NEEDS:` bracket — the `sr-only` "Unanswered question:" is invisible by
definition.

Pixel for pixel, what ships is a browser spell-check squiggle beside a number. Red beside a figure
says *this number is wrong*; tint says *this number's method is unpublished*. The entire rhetorical
payload is in that difference and the render loses it.

---

## 2. THE RANKED FIX LIST

Ranked by hiring impact. **[N reviewers]** marks independently-raised findings; those are the top
of the list.

---

### 1. Unclip `DecisionTable` — it is the artifact they came for **[3 reviewers: desktop QA ①, Head of Product App-A, mobile QA ④]**

The Head of Product's entire calibration for trade-off reasoning runs through this table, and on
his own screen width it is unreadable with half the viewport empty beside it.

**Files:** `components/content/DecisionTable.tsx`, `app/globals.css` (`.scroll-x`, line 216),
`components/content/Figure.tsx`.

- Give the table the `Wide` figure span (`prose-start / rail-r-end` — 876px at ≥1280, 792 at 1024),
  already defined in design-system Part 4.2. It must break out of `--measure` (37rem).
- `table-layout: fixed` with explicit column widths ≈ 18 / 22 / 26 / 34%; `min-width: 0` on cells.
- Drop `min-w-[36rem]`; disable the `overflow-x` container and the mask above 1024 so nothing can
  be hidden at desktop. The `mask-image` fade currently applies unconditionally — that is what turns
  a clip into an invisible clip.
- Header to 11px mono so `HOW YOU WOULD LEARN YOU WERE WRONG` fits in two lines.
- **Below 640, do not render a table.** One `<section>` per option: option name bold, then
  `Cost after launch` / `Reversibility` as labelled paragraphs. A three-column table cannot work in
  342px and §9.3 already says so. If any scroll container survives anywhere, it needs a visible mono
  `scroll →` affordance, not a fade.

---

### 2. Re-encode `MetricDelta` as two bars from one origin **[3 reviewers: desktop QA ②, Head of Product App-minor, mobile QA §7]**

**File:** `components/content/MetricDelta.tsx:88–111`.

The fill is `min(before, after)` and its *colour* alone says which value that is
(`smallerIsAfter ? --signal : --rule-strong`, line 95). So on one page a reader meets a bar meaning
"the after value" (`25MB → 6MB`), a bar meaning "the before value" (`3.5 → 7.8 min`), in the same
frame. The `▶` sits at the right end of the track — under the bar's own scale, the coordinate of the
*before* value — while pointing at the after label. And a short coloured fill at the left of a long
grey track is the most over-learned "24% complete" idiom on the web; on a bundle that shrank 76% that
is exactly backwards. Encoding by hue alone also fails ~8% of male reviewers.

Replace with:

```
COLD START
Before   ████████████████████████████████████████  15s
Shipped  █████┊                                    under 2s
         0                                    15s
```

- Two stacked bars, **one shared left origin, one shared px-per-unit**. Longer bar = bigger number,
  always. `3.5 → 7.8 min` then draws the second bar longer, which is the truth and which the current
  widget cannot express.
- `before` fill `--ink`, `after` fill `--signal`. **Direct-label each bar at its own end, in that
  bar's colour** — label and length co-located, encoding self-explaining.
- Keep the open-bound terminator but at 2px, `dashed 3 2`, full bar height, so it survives
  downsampling. It is currently unresolvable at 2× DPR.
- One tick row (`0 … max`), per §8.1. 14px of height, and it is what makes "to scale" checkable
  rather than asserted.
- **Delete the `▶`** (lines 109–111).

This repeats ~20 times and it is the site's declared signature. It is the one element a numerate
reviewer would call wrong.

---

### 3. Give the `[NEEDS:]` chip its specified ground and a visible label **[4 reviewers: recruiter §3.1, CEO ②, mobile QA ③b, desktop QA §1]**

**File:** `components/ui/Needs.tsx:16–26`.

- Implement §9.2 as written: `background: var(--color-flag-tint)` (already defined and unused,
  `globals.css:34`), `border-radius: 2px`, `padding-inline: 0.4em`, `box-decoration-break: clone`.
- **Remove `underline decoration-dotted`.** That is the single property making it read as a
  spell-check error.
- Prefix the visible text with a literal `NEEDS:` so a sighted reader gets the cue the `sr-only`
  span gives a screen-reader user.

Cheapest high-impact edit on the list. One file, one component, ~20 instances upgraded at once.

---

### 4. No ownership field may be 100% red **[4 reviewers: Head of Product §2 + App-C, desktop QA §1-tell-2, mobile QA §2.2–2.3, VP §4 by implication]**

**Files:** `content/work/steps-premier-league.mdx`, `content/work/ai-health-reports.mdx`
(`teamShape`, `timeline` frontmatter), rendered by `app/work/[slug]/page.tsx:66–79`.

`work-steps-premier-league-390.png` shows `TEAM` and `TIMELINE` as nothing but red questions, with
`ROLE` the only populated field. Seven consecutive red lines above the fold. The Head of Product:
*"A field whose entire value is a red question is a blank field with makeup on"* — and it is the
block `04-ia.md` §3.3 puts at minute 1:00 of his read.

Rigour is **a stated fact plus a bounded caveat**, never a bare question. Render the muted literal
`not stated` as the value and let one chip carry the question, or answer it — CG B-series, one
sentence of recall, not research. Enforce in `lib/content/schema.ts`: a header field may not consist
solely of a `[NEEDS:]` token.

---

### 5. Enforce §5.0 rule 6 — one chip per figure **[4 reviewers: Head of Product App-C, desktop QA §1.3, recruiter T15, mobile QA §6]**

**Files:** `lib/content/schema.ts` (validation), `content/home.mdx:67`,
`content/work/steps-premier-league.mdx`.

`SESSION TIME` still carries two chips under one number (`league entrants, or everyone active?` +
`which window, against which baseline period?`), visible in `work-steps-premier-league-390.png`.
§5.0 rule 6 caps it at one *in the exact words* "reads as a broken template". Add a schema
assertion: at most one `[NEEDS:]` token across `denominator | timeframe | method`; a second collapses
into the first or becomes the muted literal `not stated`.

---

### 6. `/approach` §04 — stop denying the site's own best evidence **[VP ①, the highest-leverage change on that page]**

**Files:** `content/approach.mdx` §04, `app/approach/page.tsx:28`.

The page tells a cold VP *"I have no broken thing to show you"* while a better postmortem than most
people publish sits one link away in `/work/two-seconds`: *"a fix and the evidence that it worked
are two deliverables, and I shipped one of them."*

- Rewrite §04 from *"I cannot write this yet"* to **"here is the one I have, and here is the larger
  one I still owe you."** Lift the two-seconds sentence verbatim, cite it, keep the gap chip beneath
  for the bigger failure. Nothing is invented; no new source material needed.
- **Kill "cannot"** in the H1 (`app/approach/page.tsx:28`) and in §04. Nothing external prevents him
  writing it; he is choosing not to publish one. *Have not published* is honest and costs nothing.
  One verb decides rigour vs. cover, and it is the first thing a VP reads.
- **Phrase the chip as a question** (T23 FAIL, D1-17): `one decision that did not work, and what it
  cost` is a noun phrase. Match the two-seconds construction — *"was any guardrail added to stop
  regression?"*
- **Delete "Still open."** The callout already says it; three consecutive statements of the same
  absence in 200px draws more attention to the gap than it warrants.
- **Delete or fix** *"in the same type size as the beliefs above"* — the screenshot falsifies it. On
  a site whose premise is that every claim carries its method, a claim about its own typography that
  the render contradicts is an unforced error.
- Date the open slot. An undated gap cannot be told from an abandoned one.

---

### 7. Restore the proof strip to three cells, in rows **[desktop QA V1 + regression from `7faef21`]**

**Files:** `content/home.mdx` `proof:`, `components/content/ProofStrip.tsx:16`.

Two problems, one component.

(a) **Count.** T12 requires three cells; the tree has two. Do **not** restore `BUNDLE SIZE` — it is
the hero metric and re-adding it re-creates the duplication four reviewers caught. Promote a third
qualified figure, or accept two and amend T12 in `04-ia.md` with the reason. Decide explicitly; do
not leave a checklist row silently failing.

(b) **Form.** §5.3 mandates three **rows at every width**. Built is `sm:grid-cols-2 lg:grid-cols-3`
with `gap-px` dividers — a row of big numbers with rules between them, which is the named generator
pattern, at the top of screen two. Drop to stacked full-width rows with a hairline between, at all
widths.

---

### 8. Fix the two tablet-band components **[desktop QA ⑤]**

**Files:** `components/content/OwnershipBlock.tsx:31`, `app/work/[slug]/page.tsx:66`,
`components/lab/GroundedDemo.tsx`.

- `OwnershipBlock` and the case-study meta `<dl>`: replace `md:grid-cols-3` / `sm:grid-cols-3` with
  `repeat(auto-fit, minmax(260px, 1fr))`. Gate on the column, not the viewport: 1-up at 768 where it
  is readable, 3-up at ~900 where the columns can hold a sentence.
- `GroundedDemo` at 768–1023: scorecard first, or collapse the source panel by default, so the
  summary and its verdict are adjacent. §3.6 already specified this.

---

### 9. Build the three missing mobile diagram variants **[mobile QA ④]**

**Files:** `components/diagrams/EvalScorecard.tsx`, `components/diagrams/FeedbackCadence.tsx`,
`components/content/DecisionTable.tsx` (covered by fix #1).

The pattern already exists in the tree (`<span className="sm:hidden">…`). All three variants are
already specified.

- `EvalScorecard` → §8.5 variant, `viewBox="0 0 288 230"`: drop the 16-row matrix, keep the finding
  (*scope fails most often; five cases pass all four*) as four labelled count bars. Full matrix
  returns at ≥640.
- `FeedbackCadence` → §8.4 variant, `viewBox="0 0 288 210"`. The spec already authorises a changed
  encoding provided the finding is identical.

---

### 10. Delete the `LIVE` pill, the `Run it` button, and "Built with Next.js" **[desktop QA V2/V3/V6, mobile QA §4.3 + §7]**

**Files:** `app/page.tsx:163–184`, `app/lab/page.tsx`, `app/lab/[slug]/page.tsx`,
`components/layout/Footer.tsx:37–42`.

- The status pill above the heading is a named tell (§5.5) and on `lab-grounded-320.png` the pill is
  the **first element on the entire page**, above the H1. Set the status inline *after* the title, no
  background, no border, no dot. Title first (§5.5) — currently the render order is pill → mono tag
  line → title, and the title is third at the same optical weight as the tag line.
- `Run it →` is a second button style on a site that declares it has no primary button. Make it the
  same underlined signal link used everywhere else. The nav `Resume` is the only bordered link.
- `LIVE` at ~14px caps breaks the 11–12px all-caps rule.
- Footer: `04-ia.md` §2.5 — one row, mono, small: email · LinkedIn · Resume. Delete "Built with
  Next.js." and the six-line manifesto paragraph.

---

### 11. Put `Resume ↗` in the mobile nav bar **[recruiter fact 7, mobile QA ②]**

**File:** `components/layout/Nav.tsx`.

The hero half of T7 is closed. The nav half is not: at <768 the bar is wordmark + `Menu` and the
resume is one tap away inside `<details>`. IA §3.1 calls the resume *"fact 7 acquired in under a
second… this is why Resume is a button and not a nav link."* Render the outlined `Resume ↗` as a
**sibling** of `<summary>Menu</summary>`, outside the panel, `target="_blank" rel="noopener"`.

---

### 12. Fix `HAND-LABELLED 0` **[arbiter — T43, and a credibility hole no reviewer named]**

**Files:** `app/page.tsx:190`, `app/lab/page.tsx:68`, `components/diagrams/EvalScorecard.tsx:70`.

`lab-1440.png` renders `CASES 16 · HAND-LABELLED 0 · LABEL AGREEMENT 16/16 · FULL RUN 2.62ms`. A
label-agreement figure computed against zero hand labels is agreement with nothing. On the one page
that exists to prove the candidate is rigorous about evidence, this is the most checkable claim on
the site and it does not survive being checked. Also 3 hits on grep gate T43.

Either drop both tiles until CG B13 is answered and show `CASES · RULES · FULL RUN`, or relabel
`LABEL AGREEMENT` to what it actually measures (rule-vs-rule determinism across runs).

---

### 13. Make sub-page H1s responsive **[mobile QA ⑤a]**

**File:** `app/globals.css:78`.

`--text-3xl` is a **fixed 2.375rem (38px)** and every sub-page H1 uses it
(`app/work/page.tsx:22`, `about:52`, `approach:27`, `lab:27`, `not-found:8`). At 320 that gives
`/work` a six-line, ~233px title consuming the whole fold (`work-320.png`), and `/about` five lines.
It also **inverts the ladder**: the `/work` index title is set larger than the case-study title it
links to.

Change `--text-3xl` to `clamp(1.875rem, 1.2rem + 2.6vw, 2.375rem)` — 30px at 320 per §3.2, 38px at
≥768. Recovers ~100px of fold on four routes and un-inverts the hierarchy, in one line.

---

### 14. Homepage beliefs: single column, and vary the lengths **[desktop QA §2.1 — "the strongest generated signature on the homepage"]**

**File:** `app/page.tsx:130–143`.

`lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]` produces three rows of near-identical length in a
rigid claim-left / argument-right table. §3.1 says beliefs stay single-column **at every width**;
§3.4 says *"if all three run to the same length the page reads as generated."* Both violated. Drop
the `lg:grid-cols` and let the claim sit above its argument.

---

### 15. Headings must not be set narrower than the body they head **[desktop QA §5b]**

**Files:** `app/globals.css` (`.prose h2`), `components/work/CaseCard.tsx`, `app/page.tsx:134`.

`work-two-seconds-1440-full.png`: the h2 breaks at ~330px while the paragraph beneath runs to ~590px.
Same on the case-card headlines — the bold claim wraps at 280px while its own sub-line runs 770px.
Heading measure narrower than body measure inverts the normal relationship, forces two-line headings
where one would fit, and makes every heading look weaker than the text it introduces. Remove the
`max-w` from headings, or set it **wider** than `--measure`, never narrower.

---

### 16. Spacing and rhythm on mobile **[mobile QA §3]**

**Files:** `components/layout/Section.tsx` / the `py-7 lg:py-12` literals in `app/page.tsx`,
`components/content/Timeline.tsx`, `app/page.tsx:218`, `app/about/page.tsx:68`.

- **One section-gap token.** Measured on `home-390-full.png`: three boundaries agree at 116–122.5px;
  the two bracketing the proof strip are 70 and 60. Consequence: the proof strip does not read as a
  section, it reads as a continuation of the hero paragraph.
- **Give the proof strip an eyebrow.** It is the only homepage section without one. Combined with the
  above, the most important block after the H1 has neither a label nor a boundary.
- **Kill the double hairline** after `Dual degree, IIT Kharagpur` — ~65px of nothing between two
  rules on `/` and `/about`. It is not an empty row (see §3-D); it is `Timeline`'s last `border-b`
  plus the following block's `border-t`. Drop one.
- **Drop `place` below 768** (`Timeline.tsx:32`), per §5.4. It causes four orphan wraps in five rows
  at 390.
- One separator rhythm: case-study row separators measure 42.5/44, belief separators 35.5/37. Same
  object, 20% apart.

---

### 17. `/404` and the `lab-grounded` select at 320 **[mobile QA §2.1, T24]**

**Files:** `app/not-found.tsx`, `components/lab/GroundedDemo.tsx`.

- 404 offers three links plus a contact block. T24 wants one next step. Keep `The work`.
- The `<select>` is clipped mid-glyph at 320 and truncates without an ellipsis at 375. Add
  `text-overflow: ellipsis`, `max-width: 100%`, and a shortened mobile option label.

---

### 18. The 1920 band and the empty right column **[desktop QA ④ — partially a screenshot artifact, see §3-C]**

**File:** `components/layout/Container.tsx`, `components/content/ProgressRail.tsx`.

`Rail` is already `lg:sticky lg:top-12`, so the "empty for 17,000px" reading is an artifact of
full-page capture. The real, live defect is narrower: at ≥1600px the container stays at 1200 and
`--text-hero` is already maxed by ~834px viewport, so 1920 buys the reader **nothing except margin** —
`home-1920.png` and `home-1440.png` are the same picture with more white. Raise the container to
~1360 above 1600px. Additionally, move the denominator lines, method notes and attribution limits out
of the prose into `rail-r` on case studies (Part 4.4), which is the material the site is about and
which the sticky column can then carry the whole way down.

---

### 19. The bundle/cold-start relationship — one sentence **[Head of Product §4]**

**File:** `content/work/two-seconds.mdx`.

`25MB → 6MB` and `15s → under 2s` are presented as two adjacent independent results. In most Android
cold-start work a 76% bundle reduction is *a principal cause of* the launch-time win, not a separate
one. As displayed, the page looks like it is counting the same eight weeks twice. One sentence fixes
it — *"the bundle cut was the main lever on launch time"* or *"these were separate workstreams."*
Until it exists, a sceptic silently marks the proof strip from three findings down to two and the
candidate never learns why.

---

### 20. Do not re-use `--signal` / `--flag` as pass/fail **[mobile QA §4.6]**

**Files:** `components/diagrams/EvalScorecard.tsx`, `components/lab/GroundedDemo.tsx`.

`lab-grounded-390-full.png`: `pass` in `--signal`, `fail` in `--flag`. §1.1 assigns `--signal` = "a
number moved" and `--flag` = "where I was wrong or cannot substantiate". A reader who learns the pair
in ten seconds — which the design system claims as a feature — is then mis-taught by a 16-row table.
Use `--ink` / `--muted` with a glyph, or a third neutral pair.

---

### 21. `/approach` copy edits **[VP ④–⑦]**

**File:** `content/approach.mdx`.

- **Belief 02** names the cost — *"a competition sorts a user base into people who like being ranked
  and people who feel worse for it, and in a health product the second group is not a rounding
  error"* — and then does nothing with it. Add one sentence: what shipped to protect that person, or
  say plainly that nothing did. His own standard (*"a trade-off named at the time is a decision; the
  same trade-off named afterwards is a defence"*) convicts the current version.
- **Belief 03**: *"Session time **was the declared** north star."* Declared by whom? Three different
  candidates hide in that passive: he chose it, he inherited and argued, he inherited and never
  argued. It is the largest unflagged evasion on the page and the first thing the VP would ask.
- **Belief 01's heading** — *"Fix the floor before you build the ceiling"* — is the most common
  platitude in product writing and it throws away a genuinely non-obvious selection-bias argument.
  Make the heading the claim: *a broken floor does not slow your numbers, it invalidates them.*
- **ABDM note**: break the 180-word block into three bolded claims. It is the best paragraph on the
  page and the only one with no typographic entry point. Delete *"There is a retention figure …
  circulating"* — it collects credit for restraint **and** the halo of an unnamed favourable number.
  Open at *"What would settle it is a funnel, not a benchmark."*

---

### 22. Hero H1 measure **[arbiter, correcting desktop QA §5a]**

**File:** `app/page.tsx:36`.

The two sentences **are** already separate block spans (screenshot confirms). The real defect is
`max-w-[17ch]`, which forces `The roadmap was / engagement. The / app took fifteen / seconds to open.`
and strands `The` at the end of line 2. Widen to ~20–22ch at ≥1024 and let `text-wrap: balance` do
its job.

---

## 3. Disagreements between reviewers — arbitrated

### A. The right rail on `/approach` — **KEEP IT**

- **Desktop QA (V4, fix ③):** forbidden outright by `03-design-system.md` §3.4 — *"inventing one
  would be the documentation-template look."* Delete it.
- **VP:** *"That rail is doing real work and should not be removed"* — he used it to jump to the ABDM
  note at section 05 of a 11,576px page, and it is the only reason the best material on the page was
  reachable above the fold.

**Arbitration: the VP wins, and the spec is amended.** The VP *is* the reader `/approach` was
designed for, and he reports the rail changing his path through the page. §3.4 was written before the
page ran to 1,900 words. **Keep the rail; fix what makes it look templated:** number only the three
beliefs `01–03`, and render the postmortem, the market note and the pointer as unnumbered entries in
a second group. That removes the "six beliefs" reading without removing the navigation. Log the
amendment in `DECISIONS.md`.

### B. T22 "exactly three beliefs" — **PASS on substance, FAIL on presentation**

- **Desktop QA:** FAIL — six numbered sections; §05 is a fourth belief in everything but name and is
  the longest block on the page.
- **VP:** PASS — three beliefs, judged individually, all genuine.

**Arbitration: VP is right on the content, desktop QA is right about what a scanner sees.** §05 is a
market point of view, not a belief about how he works, and the VP rates it the second-best thing on
the page. Do not delete it. The failure is purely that `SectionIndex` numbers all six identically.
Fixed by (A). Mark T22 **PASS** once the rail is regrouped.

### C. "The right column is empty for 95% of every long page" — **PARTIALLY FALSE**

- **Desktop QA:** the rail holds a static list for ~400px and is then void on an 18,792px page;
  build it or delete it.

**Arbitration: this is a full-page-screenshot artifact.** `ProgressRail.tsx:50` is
`lg:sticky lg:top-12`. In a real 900px viewport the column travels with the reader. Full-page capture
freezes sticky elements at their static origin. **Do not delete the rail.** The genuine residue is
fix #18: the container does not grow past 1200 at 1920, and the rail could carry more (denominators,
method notes) than a section list. Re-capture at 1440×900 with scroll to verify before acting further.

### D. The "empty ruled band" — **REAL DEFECT, WRONG DIAGNOSIS**

- **Mobile QA §3.5:** *"An empty timeline row is being rendered"* — the clearest unfinished-build
  artefact on the mobile site.

**Arbitration: the band is real, the cause is not.** `Timeline.tsx` maps a static array in
`lib/site.ts` with no falsy entries. The ~65px gap is the education row's `border-b` plus the
following block's `border-t` (`app/page.tsx:218`, `app/about/page.tsx:68`) separated by
`mt-7`/`pt-5`. Filtering falsy entries would fix nothing. Remove one of the two rules. Covered in #16.

### E. The H1 block spans — **NOT A DEFECT**

- **Desktop QA §5a:** *"§3.1 mandates two block spans… it clearly does not"* — called the site's
  central hook broken at every desktop width.

**Arbitration: rejected.** `app/page.tsx:35–42` is a `flex flex-col` with two spans, and
`home-1440.png` renders sentence two on its own line at its own size. The recruiter's T9 read is the
correct one (PASS, "two type sizes rather than two lines of one block"). Reduced to the `max-w-[17ch]`
issue, fix #22.

### F. `1M+ registered users` — **ADOPT THE CEO's CLAUSE**

- **CEO §4:** the hero says `1M+ registered **users**`, and "users" in a hero is a growth claim. He
  will work out within five minutes that the population came from an employer-funded enterprise
  channel. Add one clause: *"an employer-funded population, not a growth number I built."*
- **Head of Product §2:** names the consistent `registered` (never `active`) as *"the single cheapest
  place to inflate on a portfolio and he did not take it"* — it bought credibility for the rest of
  the page.

**Arbitration: not actually in conflict — do both.** Keep `registered`; add the CEO's clause. The
site already asserts the two-sided structure on `/work/ai-health-reports` (*"The beneficiary reads
the report. The employer buys the programme"*), so nothing is invented. It converts *"let me check
that"* into *"he already checked it"*, and it is a **better** story: he made an inherited million-user
surface usable. **Also pick one noun** — `home.mdx` says `registered users`, `lib/site.ts:60` says
`registered users`, the case study says `beneficiaries`. Two nouns for one number on one page is
exactly the imprecision the site punishes elsewhere.

### G. Amber chip density — **RESOLVED, HOLD THE LINE**

- **Recruiter/CEO/desktop QA:** 8–10 chips reads as a form nobody finished.
- **VP §4:** *"Non-blockers I am explicitly not counting against him: absent denominators, absent
  team size, absent experiment design. The gap chips are the correct call."*

**Arbitration: both were right about different densities.** Commit `7faef21` took `/` from 10 to 2.
The strategy is sound; density was the whole problem. Remaining work is fixes #3 (render), #4 (no
all-red field) and #5 (one per figure). Do not remove any further chips.

### H. Page length — **DO NOT CUT**

- **CEO ⑤:** *"Cut the page roughly in half. I stopped being persuaded at screen four."*
- **HoP / VP:** both read to the bottom of long pages and drew their strongest positive signals from
  deep material (the DecisionTable, the ABDM note, the two-seconds mistake callout).

**Arbitration: keep the length, fix the pacing.** The CEO's real complaint was duplication — six
tiles for three numbers, two contact blocks — and that is closed. Fixes #7, #14 and #16 recover most
of the perceived tax without deleting anything the deeper readers valued. Re-test with the CEO's
90-second frame next iteration before cutting a single section.

---

## 4. Flagged, but DO NOT FIX

### 4.1 Requests for facts that do not exist — these are `CONTENT_GAPS.md`, not code

The source material is a one-page resume and a LinkedIn export. None of the following can be answered
by an edit. **Do not invent them, and do not let a fix pass silently fabricate them.** Log each as an
answerable question addressed to Aniket; a chip is the correct render until he answers.

| Request | Reviewer | Why it is not a code fix |
|---|---|---|
| "One decision where a named person disagreed, and what happened next" | HoP ①, and he calls it the single highest-leverage addition | Not in the record. Cannot be written by anyone but Aniket. Route to CONTENT_GAPS as the top-priority question. |
| "One artifact written at the time, dated" (a PRD section, a prioritisation memo) | HoP ② | D1-16 forbids a drawer *claiming* to hold a real document. Producing one is Aniket's job, not the build's. |
| Team size / headcount | HoP ③, desktop QA, mobile QA | One sentence of recall from Aniket. Fix #4 changes only the *render* (`not stated` + one chip), never the fact. |
| "Anything at all after launch" | HoP ④ | Not in the record. |
| "One outcome with a denominator" | HoP ⑤ | Not in the record. |
| "Who declared session time the north star" | VP ⑤ | Aniket's memory. Chip it as a question in the meantime. |
| "What did you ship to protect the person coming last" | VP ④ | Same — but note this one may have an answer he simply did not write down. Ask before chipping. |
| "What made the app slow — top three causes, in order" | HoP §4 | The site correctly disowns the engineering. Do not add speculation. |

### 4.2 Recommendations rejected on the merits

| Recommendation | Reviewer | Why not |
|---|---|---|
| **Cut the `+15%` cross-sell figure entirely**, per the D1-10 logic that removed CSAT | HoP §9 | The specific defect he objected to was *the graphic* — a delta bar drawn from a literal "unstated base". That is closed: `Stat.tsx` renders it with no bar, no arrow, no implied ratio. Cutting the number would leave the third case study with no figure at all and would remove the belief that the qualifier line demonstrates. Keep it as a `Stat`. |
| **Delete the `/approach` rail** | desktop QA V4 | See §3-A. The VP used it. |
| **Delete the case-study rail / go single-column** | desktop QA ③b | See §3-C. It is sticky; the emptiness is a capture artifact. |
| **"Two block spans on the H1"** | desktop QA §5a | Already built. See §3-E. |
| **"Filter falsy entries before mapping the timeline"** | mobile QA ⑤c | Wrong diagnosis. See §3-D. |
| **Cut the homepage in half** | CEO ⑤ | See §3-H. |
| **Add a GitHub link to the footer** | implied by IA §2.5's "email · LinkedIn · Resume · GitHub" | T49 blocks it: the URL is not recoverable from the resume PDF's text layer. CG B16. Ship the three-item row. |
| **`OptionSpread` is missing** | mobile QA §5 | It is not missing; the three-option content deliberately shipped as `DecisionTable`. Fix #1 makes that component work rather than swapping the encoding. |

---

## 5. Protect these — three things reviewers independently praised

Do not let any fix above touch them.

### 1. The hero sentence, and the restraint around it — **all four hiring reviewers**

- CEO: *"'The app took fifteen seconds to open. I spent eight weeks there instead. We shipped it
  under two.' That is a whole person in eighteen words… I could repeat it to a co-founder from
  memory."* He calls `home-390.png` *"doing more work than most candidates' entire site."*
- Desktop QA §1: no hero image, no gradient, no card grid, no icons, no pills, no filled CTA — *"the
  strongest call to action on the page is a selectable email address in mono. That is a decision very
  few templates make and no generator makes."*
- Recruiter: fact 4 (product scope) is *"the best line on the page."*
- HoP: the H1's claim is what he chose to probe hardest, which is the same as saying it is what he
  read.

**Constraint on fixes #13 and #22:** they touch H1 sizing. Do not change a word of the copy, do not
add an image, do not add a button.

### 2. The `I DID NOT OWN` column — **Head of Product, desktop QA, VP**

- HoP §3: **"Best-in-class, and the reason I keep reading."** *"A template has no column for what you
  did not do."* He names it *"the fastest substitute for the references this site does not have."*
- Desktop QA §1: the first item under "evidence it was made, not generated."

**Constraint on fix #8:** the `auto-fit minmax` change alters the *layout* of `OwnershipBlock`. The
three-column semantic — `I OWNED / WE SHIPPED / I DID NOT OWN` — must survive at every width,
including 1-up stacking. Never collapse the third column into a footnote and never drop it on mobile.

### 3. The visible qualifier line under every figure — **recruiter (T13 PASS), Head of Product, mobile QA, VP**

Every proof cell carries its denominator, window and method at the same type size as the label, never
on hover, never in a tooltip. T13 is the one row the strip passes unambiguously (recruiter). The HoP:
*"'which percentile, on which device population?' under `15s → under 2s` is exactly the question I
was about to ask, asked first, which is disarming."* The VP will not count absent denominators against
him *because* the absences are declared.

**Constraint on fixes #2, #3, #5 and #7:** the `MetricDelta` re-encoding and the chip restyle both
touch this line. It must stay at `--text-xs` mono directly under the figure, visible without
interaction. Reducing chip *count* per figure is correct; hiding a qualifier behind a disclosure is
not.

**Runners-up worth naming:** the Grounded demo (desktop QA: *"the single most credible object on the
site"*), `ColdStartScale` / `BundleScale` (mobile QA: *"the best component on mobile"* — real HTML
text, right-aligned values, bars to scale), and the arithmetic discipline (HoP checked every number
and found no percentage rendered beside `3.5 → 7.8`, a correct lower bound from an inequality, and an
exact 76.0%).

---

## 6. Re-capture before the next review pass

Two surfaces have never been looked at and one set of captures is now stale.

1. **The mobile `<details>` panel, open**, at 320 and 390. It is the only interactive surface on
   mobile with zero coverage, and fix #11 changes it.
2. **1440×900 at scroll ≥ 2000** on a case study and on `/approach` — the only way to see whether the
   sticky rail behaves (§3-C).
3. **All homepage captures**, at every width. `home-*.png` in `iteration-2/` predates the hero,
   status-line, proof-strip and case-card changes in `7faef21` and no longer shows what ships.
