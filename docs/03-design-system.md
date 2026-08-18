# 03 — Design system

**Scope.** Part 1 documents what is already built and measured. Part 2 lists defects found in the
built system, with exact fixes. Parts 3–9 specify the parts that do not exist yet: page composition
(mobile first), the asymmetric case-study grid, nine unfinalised components, the closed
micro-interaction inventory, the one aesthetic risk, five diagrams as hand-authorable SVG, and the
`[NEEDS:]` chip.

**Binding on this file:** `docs/DECISIONS.md` (D1-01 … D1-38) and `docs/01b-truth-audit.md` §8.
Where this file and either of those disagree, they win.

**Status legend used throughout**

| Tag | Meaning |
|---|---|
| `BUILT` | Exists in the tree and is correct. Do not re-derive. |
| `DEFECT` | Exists in the tree and is wrong. Part 2 gives the fix. |
| `SPEC` | Does not exist. Build it exactly as written here. |
| `OPEN` | A decision this file deliberately leaves to the content pass. |

---

# Part 1 — What is already built

## 1.1 Colour `BUILT`

Measured against WCAG 2.1 before it was written down. Ratios are on `--paper` unless stated.
None of these values changes.

| Token | Value | Ratio | Role |
|---|---|---:|---|
| `--paper` | `#F6F5F2` | — | Page ground |
| `--paper-raised` | `#FFFFFF` | — | Cards, drawers, figure interiors |
| `--ink` | `#14181A` | **16.39:1** | All body and heading text |
| `--signal` | `#0E6F5C` | **5.59:1** (6.09 on white) | A number moved. Links. Focus ring. |
| `--flag` | `#A32F35` | **6.39:1** (6.96 on white, 6.33 on tint) | Where I was wrong, or cannot yet substantiate |
| `--flag-tint` | `#FBF2F3` | — | Ground for `mistake` / `gap` / `[NEEDS:]` |
| `--muted` | `#63696E` | **5.10:1** | Captions, metadata, denominators. Corrected from `#6B7278` (4.48, failed AA). |
| `--rule` | `#DEDCD6` | 1.26:1 | Decorative hairlines **only** |
| `--rule-strong` | `#8E8D89` | 3.05:1 | Any boundary a reader must perceive to use the component |

Two accents, one job each. A reader learns the pair in ten seconds and it becomes navigation: an
amber block visible while scrolling promises honesty before a word is read.

**The `--rule` trap.** SC 1.4.11 says a hairline that is the *only* thing separating rows in a
table is a graphical object required to understand content, and needs 3:1. That is why
`DecisionTable` uses `--rule-strong` on the header rule. Any new component that separates
meaningful rows uses `--rule-strong`, not `--rule`.

## 1.2 Type `BUILT`

Three families, latin only, 108.6 KB total: Instrument Sans 29.2 + Newsreader roman 56.8 +
Geist Mono 22.6. No serif italic (+63 KB for emphasis that weight 600 already carries). No `opsz`
axis on Newsreader (2.3× the bytes for an identical default rendering).

Interface scale, ratio ~1.20: `2xs` 11 · `xs` 12 · `sm` 14 · `base` 16 · `lg` 19 · `xl` 24 ·
`2xl` 30 · `3xl` 38 · `hero` `clamp(2.25rem, 1.1rem + 4.6vw, 3.5rem)`.

Prose scale, three steps only: `prose-sm` 17 · `prose` 21 · `lede` 24.

Reading measure `--measure: 37rem` (592px ≈ 68 real characters at 21px Newsreader). Set in rem,
never `ch` — `1ch` is the width of `0`, which in a lining-figure serif is ~34% wider than an
average character, so `68ch` renders at 91 CPL.

Tracking: `--track-display` −0.022 · `--track-h2` −0.014 · `--track-ui` −0.006 ·
`--track-body` 0 · `--track-eyebrow` +0.06.

`font-variant-numeric: tabular-nums` is on `body`. Without it the timeline years and every
denominator fail to align. Do not remove it from any component.

**The all-caps rule, settled here.** Research §3.2 says restrict all-caps to one role. Five roles
already ship it (MetricDelta label, section eyebrow, OwnershipBlock column heads, DecisionTable
column heads, Callout label). A count is the wrong constraint. The enforceable rule is:

> All-caps appears **only** in Geist Mono, **only** at 11–12px, **only** in `--muted` (or
> `--flag` on a `gap` callout), and **only** as the *name of a field* — never a value, never a
> section heading, never in Instrument Sans, never above 12px, never in `--ink`.

That is greppable, keeps the eyebrow a signal rather than a texture, and settles the question.
Values are sentence case: `Product Intern · Circle Health · Jul–Sep 2024`, never uppercase.

## 1.3 Space and geometry `BUILT` (with one defect — see D-01)

8px base (`--spacing: 0.5rem`). 4px maximum radius, `--radius-sm: 2px`. **No shadow of any kind,
including `inset`.** `grep -rn "box-shadow" app components` must return zero.

## 1.4 Components in the tree

| Component | Path | Status |
|---|---|---|
| `MetricDelta` | `components/content/MetricDelta.tsx` | `BUILT` · upgraded in Part 7 |
| `Callout` | `components/content/Callout.tsx` | `DEFECT` D-03 |
| `Drawer` | `components/content/Drawer.tsx` | `BUILT` — native `<details>`, zero JS |
| `DecisionTable` | `components/content/DecisionTable.tsx` | `DEFECT` D-11 |
| `Figure` | `components/content/Figure.tsx` | `BUILT` · a11y contract in D-12 |
| `OwnershipBlock` | `components/content/OwnershipBlock.tsx` | `DEFECT` D-10 |
| `Needs` / `WithNeeds` | `components/ui/Needs.tsx` | `DEFECT` D-09 |
| `CopyEmail` | `components/ui/CopyEmail.tsx` | `DEFECT` D-08 |
| `Nav` | `components/layout/Nav.tsx` | `DEFECT` D-05, D-06, D-19 |
| `Footer` · `Section` · `Eyebrow` | `components/layout/` | `BUILT` |
| `Container` | `components/layout/Container.tsx` | `DEFECT` D-02 |

`lib/content/mdx.tsx` already imports five diagram components that do not exist:
`ColdStartScale`, `BundleScale`, `OptionSpread`, `FeedbackCadence`, `EvalScorecard`. Part 8
specifies exactly those five, under exactly those names. The build is currently broken until they
land.

---

# Part 2 — Defects in the built system

Fifteen. Four of them are build failures against the binding documents rather than taste calls.

## D-01 — Every spacing utility in the tree is exactly twice its intended value

Tailwind v4 computes `p-4` as `calc(var(--spacing) * 4)`. `globals.css` sets `--spacing: 0.5rem`
to make 8px the base unit. That is the right decision and it stays — but it means every numeric
utility already written is double what its author meant.

| Where | Written | Renders | Comment claims | Should be |
|---|---|---:|---|---|
| `Section` | `py-14 lg:py-24` | 112 / 192px | "56px mobile, 96px desktop" | `py-7 lg:py-12` |
| `Container` | `px-6 sm:px-8 lg:px-10` | 48 / 64 / 80px | — | `px-2 sm:px-3 lg:px-5` (16 / 24 / 40) |
| `Nav` sentinel | `h-30` | 240px | "120px tall" | delete (see D-06) |
| `Nav` links | `py-4` | 32px | — | `py-3` (24px → 62px row, hits 44px target) |
| `Callout` | `my-8 px-5 py-4 sm:px-6 sm:py-5` | 64 / 40 / 32 | — | `my-4 px-3 py-2 sm:px-4 sm:py-3` |
| `Drawer` | `my-6 px-5 py-4` | 48 / 40 / 32 | — | `my-3 px-3 py-2` |
| `Figure` | `my-10 p-4 sm:p-6` | 80 / 32 / 48 | — | `my-5 p-2 sm:p-4` (16 / 32) |
| `DecisionTable` | `my-10 px-4 py-3` | 80 / 32 / 24 | — | `my-5 px-2 py-1.5` |
| `OwnershipBlock` | `px-5 py-5` | 40 / 40 | — | `px-3 py-3` (24) |
| `Footer` | `py-14 lg:py-20` | 112 / 160 | — | `py-7 lg:py-10` |

**Fix:** halve every numeric spacing utility in `app/` and `components/`. Do not change
`--spacing`. Add a comment at the token: *"8px base — so `p-3` is 24px, not 12px. Halve any value
copied from Tailwind documentation."* Arbitrary values in brackets (`min-w-[36rem]`) are
unaffected.

Consequence if unfixed: the 8px rhythm is intact but the page is 2× as airy as designed, the
homepage runs about 900px longer than it should, and the proof strip falls below the fold on a
375px screen. That last one is the expensive part.

## D-02 — `Container width="prose"` uses `max-w-[76ch]`

Banned by research rejected-list #36 and wrong by ~38%: 76ch in Newsreader renders at roughly 104
characters per line, past the WCAG AAA 80-character ceiling.

**Fix:** `max-w-[var(--measure)]`.

## D-03 — `Callout` uses a coloured left border

Research §3.3, quoting 2026 generator-output audits: a coloured left border on a card or callout
is *"almost as reliable a sign of AI-generated design as em-dashes in text."* Rejected-list #7
names the `mistake` variant specifically. The shipped component uses `border-l-2` in a variant
colour on all four variants.

**Fix — same scannability, different fingerprint:**

```
┌ 1px solid variant colour, TOP edge only, full width
  MONO 11px UPPERCASE, variant colour, tracking 0.06em      ← the label
  body, --text-base, --ink
└ (no bottom border, no side borders)
```

- `border-top: 1px solid` in the variant colour · `border-inline: 0` · `border-bottom: 0`
- `insight` → top rule `--signal`, ground `--paper-raised`, label `--signal`
- `tradeoff` → top rule `--rule-strong`, ground `--paper-raised`, label `--muted`
- `mistake` → top rule `--flag`, ground `--flag-tint`, label `--flag`
- `gap` → top rule `--flag`, ground `--flag-tint`, label `--flag`
- padding `24px` block, `0` inline. The callout is not a box; it is a passage under a rule.
- `margin-block: 32px`

`mistake` and `gap` keep the shared correction red on purpose. A decision that went wrong and a
claim that cannot yet be substantiated are the same kind of honesty.

## D-04 — The hero animation hides the shipped number for 500ms

`animate-settle` is `animation: settle 200ms linear both; animation-delay: 500ms` and it is
applied to the `after` value in `MetricDelta`. `animation-fill-mode: both` applies the `from`
state during the delay, so `under 2s` renders at `opacity: 0` for the first half-second of every
page load.

This is a build failure against research §5.2 condition 2 (*content must be present and readable
before, during and after*) and against the site's own thesis. The page whose lead case study is a
cold-start fix must not withhold its own result while an ornament plays.

**Fix:** see Part 7. The number is opaque at first paint. Only the rule moves.

## D-05 — The nav does not condense; four selectors are undefined

`Nav.tsx` references `.site-nav`, `.nav-sentinel`, `.nav-mark` and `var(--nav-h, 3.5rem)`. None
exists in `globals.css`. CSS supplied in Part 6.2.

## D-06 — The scroll sentinel is 240px and unnecessary

`h-30` with `--spacing: 0.5rem` is 240px, not the 120px its comment claims. It also stops being
needed once the condense uses `animation-timeline: scroll(root block)`.

**Fix:** delete the sentinel `<div>` entirely.

## D-07 — Three banned industry descriptors in `lib/site.ts` — **RESOLVED during this pass**

`timeline[]` carried `note: 'Insurance claims'`, `'Auto marketplace'` and `'Fintech onboarding'`.
All three are banned by D1-22 and by truth-audit A5, A6, A7, and being live code made it a
build-failure condition rather than a taste note.

The content pass has since corrected the file: Circle Health now reads `Claims journey`, Infinyte
Club reads `Signup and KYC`, Droom and YourStory carry no descriptor. Logged here so the gate in
Part 10 stays in place — this is the kind of value that gets re-added during a polish pass by
someone filling an empty-looking field.

## D-08 — The copy-email control fails WCAG 2.2 SC 2.5.8

`px-2 py-0.5` on 12px text gives a ~20px-tall target. The minimum is 24×24, and the practical
floor on a phone is 44×44.

**Fix**, without changing how it looks:

```css
.copy-btn { position: relative; }
.copy-btn::before {
  content: ''; position: absolute; inset: 50% auto auto 50%;
  width: 44px; height: 44px; transform: translate(-50%, -50%);
}
```

Same rule applies to any other control under 44px: the `<summary>` chevron rows already exceed it.

## D-09 — The `[NEEDS:]` chip is `inline-flex` with vertical padding and a probably-absent glyph

`inline-flex` with `py-[0.1em]` and a border inflates the line box inside 21px serif prose, which
is exactly the vertical rhythm this file is asked to protect. Separately, `↯` is U+21AF; Geist
Mono does not ship it, so it falls back to a system font at a mismatched size and weight.

**Fix:** Part 9. Inline display, zero vertical padding, no glyph, no border.

## D-10 — `OwnershipBlock` goes three-across at 640px

At 640px that is three ~200px columns of 14px text with a 24px gutter — five or six words per
line. The three-way split is the highest-value block above the fold on a case study and it must
not be the thing that breaks on a small tablet.

**Fix:** `sm:grid-cols-3` → `md:grid-cols-3` (768px).

## D-11 — `DecisionTable` announces its caption twice

There is a `<caption className="sr-only">` and a visible `<p>` with the same string. A screen
reader hears both.

**Fix:** delete the `<p>`. Keep one `<caption>`, make it visible, and move it below the table with
`caption-side: bottom`, styled `--text-sm` / `--muted` / `margin-block-start: 12px`.

## D-12 — Figure's a11y contract is not enforced on the children

`Figure` sets `role="img"` and `aria-label={alt}` on the wrapper. Every `<svg>` placed inside it
must therefore carry `aria-hidden="true"` and `focusable="false"`, or the SVG's own text nodes are
announced after the alt text.

**Fix:** state it as a contract in the `Figure` doc comment and enforce it in all five diagram
components in Part 8.

## D-13 — Motion tokens do not match the researched values

`--duration-fast: 150ms` / `--duration: 200ms`; research §5.3 settled on 120 / 180 / 520.

**Fix**, minimal diff, keeping the existing names so no component changes:

```css
--duration-fast: 120ms;   /* colour, border colour, focus */
--duration:      180ms;   /* <details> height and opacity */
--duration-hero: 520ms;   /* the one arrival sequence */
--ease-ui:   cubic-bezier(0.2, 0, 0, 1);
--ease-out:  cubic-bezier(0.16, 1, 0.3, 1);  /* hero only, already present */
```

Three durations, two easings, total. A twenty-token motion system on a five-page portfolio is
itself a tell.

## D-14 — The hero sequence runs 700ms

`draw-rule 700ms` plus a 500ms-delayed 200ms settle. Retune to 520ms in Part 7. A reader who came
to check a number should not wait 700ms on a decoration.

## D-15 — `backdrop-blur-[6px]` on the sticky nav

Not animated, so it does not break research §5.4. But it adds a compositing layer on every scroll
frame on exactly the device class case study one is about, and `backdrop-filter` on a translucent
bar is the most common 2024 template signature after the gradient.

**Fix:** solid `background: var(--color-paper)`, `backdrop-filter: none`. The nav already has a
`--rule` bottom border, which is all the separation it needs on a paper ground.

---

# Part 3 — Page composition, mobile first

Every page below is described at **375px first**. Content width at 375px is **343px**
(`100% − 32px`). Desktop behaviour is stated after, as a delta from the mobile stack.

Two rules govern all seven pages:

1. **Source order is the mobile order.** Every rail item, every aside, every callout sits in the
   DOM immediately after the block it annotates. Desktop placement is done by grid, never by
   reordering. The screen-reader order and the mobile stack are then correct for free. Verify in
   the accessibility tree, not by eye.
2. **Nothing in a rail is ever `display: none`.** One documented exception exists and it is
   `PullQuote` (Part 5.9), which is safe only because its text is required to be verbatim from the
   prose column of the same page.

## 3.1 `/` — Home

**375px stack, in order:**

| # | Block | Notes |
|---|---|---|
| 1 | Nav, sticky, 56px | wordmark left, `Menu` right. No hamburger glyph. |
| 2 | **Hero** | see below |
| 3 | **ProofStrip** — 3 rows | must start above 700px of scroll depth; this is what D-01 currently breaks |
| 4 | **Work** — 3 stacked `CaseCard` rows | full width. Never a `grid-cols-3`. |
| 5 | **Beliefs** — 3–4 claims | unnumbered, each links to the case that evidences it |
| 6 | **Built** — 1 `LabCard` (Grounded) | |
| 7 | **Track record** — `Timeline`, 5 rows | real title on every row |
| 8 | Footer | |

**Hero, exactly:**

```
[h1, two block spans, 36px/1.08, weight 600, tracking −0.022em, --ink]
  The roadmap was engagement.
  The app took fifteen seconds to open.

[sub-line, serif 19px/1.45, --ink, margin-block-start 24px, max-width 30rem]
  I spent eight weeks there instead. We shipped it under two.

[currently, mono 12px, --muted, margin-block-start 32px]
  Currently: Product Analyst, HCL Healthcare, Noida.

[lab pointer, mono 12px, --signal, margin-block-start 8px]
  Grounded — an eval harness for generated health summaries →
```

- The h1 is **two `<span style="display:block">` elements, not `<br>`**, so `text-wrap: balance`
  balances each sentence independently. At 375px each sentence occupies two lines; four lines
  total, 156px.
- `Currently:` sits **below** the sub-line, in mono, with no pill, no background, no border, no
  dot. A coloured badge above the H1 is a named tell.
- The lab pointer is D1-29: Grounded needs an entry point above the attention cliff because
  AI-PM reviewers open the live URL first.
- Hero block `padding-block: 64px 48px` at 375px, `96px 64px` at ≥768.

**≥768px:** hero unchanged apart from the clamp (52.9px at 768, maxing at 56px around 834px
viewport). ProofStrip rows gain a 160px label column (Part 5.3). CaseCards gain a 200px left
column (Part 5.1). Timeline gains a 96px period column. Beliefs stay single-column at every width —
a three-up belief grid is the feature-card tell.

**What never happens on this page:** a three-up card grid, an icon, a logo strip, a testimonial
block, a count-up number, a scroll reveal.

## 3.2 `/work` — Work index

**375px stack:**

1. Nav
2. Page h1, 30px/1.15 (`--text-2xl` at mobile, `--text-3xl` ≥768). One line of serif 19px under it
   saying what the reader is about to get.
3. Three `CaseCard` rows, full width, hairline `--rule-strong` above each.
4. A `--rule` hairline, 32px of space, then the eyebrow `EARLIER` and two `ShortCase` blocks
   stacked.
5. One paragraph, serif 17px `--muted`, naming what is deliberately not here (Droom and YourStory
   appear only as timeline rows). Saying so is cheaper than letting a reader find the gap.
6. Footer.

**≥768px:** the two `ShortCase` blocks go two-up. `CaseCard` rows stay full width at every size.

## 3.3 `/work/[slug]` — Case study

This is the page the whole grid in Part 4 exists for. **375px stack:**

| # | Block | Spec |
|---|---|---|
| 1 | Nav (condensed after 120px) | |
| 2 | Progress bar, 2px, `--signal`, sticky under nav | CSS `scroll()` timeline; hidden entirely where unsupported |
| 3 | Meta line | mono 12px `--muted`, sentence case: `HCL Healthcare · Product Analyst · 8 weeks` |
| 4 | h1 | 30px/1.12 weight 600 |
| 5 | Lede | serif 24px/1.45, `--ink`, max 3 lines |
| 6 | `OwnershipBlock` | **stacked, 1 column** below 768px. Order: I owned → We shipped → I did not own. |
| 7 | `MetricDelta` group | 1–3 stacked, hairline `--rule` between, 24px padding-block each |
| 8 | `<details>` "Sections" | collapsed, mono 12px, lists the same anchors the desktop rail lists |
| 9 | Prose, serif 18px/1.65 | 343px wide → ~44 CPL |
| 10 | Rail items, inline | each one immediately after the section it annotates |
| 11 | Closing section | what the work traded away, and the instrument that would have been better |
| 12 | Next case link | mono 14px `--signal`, `Next: …  →` |
| 13 | Footer | |

**What the right rail becomes at 375px.** It dissolves into the prose flow, in place, visually
demoted. Each rail item renders as:

```
  ── 1px --rule, 40% width, left-aligned ──
  [content, 12px sans or mono, --muted, line-height 1.5]
  margin-block: 16px
```

Never `display: none` — the rail holds denominators, method notes and attribution limits, and
those are the point of the site. The one exception is `PullQuote`, which is removed below 1024px
because its text is required to be a verbatim lift from the prose it would sit beside.

**Rail item types and their mobile homes:**

| Rail item | Mobile behaviour |
|---|---|
| Compact `MetricDelta` | inline block between paragraphs, full prose width |
| Denominator / method note | inline, 12px mono `--muted`, hairline above |
| Attribution limit | inline, 12px sans `--muted`, hairline above |
| `Drawer` trigger | inline `<details>`, full width |
| `PullQuote` | **removed** (see above) |

**≥768px:** prose caps at 600px, left-aligned, rail still inline. **≥1024px:** the two-rail grid
appears. Part 4 has the exact numbers.

## 3.4 `/approach` — Approach

Four beliefs, unnumbered, each one a claim as a heading rather than a label.

**375px stack:** Nav → h1 → one-paragraph lede → belief 1 → belief 2 → belief 3 → belief 4 → the
one visible `[NEEDS:]` postmortem (D1-27) → footer.

Each belief block:

```
[h2, sans 24px/1.2 weight 600 — a claim, never "Belief 3"]
[argument, serif 18px, 2–4 paragraphs]
[evidence link, mono 14px --signal: "Where this shows up: Two Seconds →"]
── 1px --rule, full width, margin-block 48px ──
```

The postmortem block is a `gap` `Callout`: `--flag` top rule, `--flag-tint` ground, mono label
`WHAT I GOT WRONG`, and one `[NEEDS:]` chip carrying the specific question. D1-27 is explicit that
this ships as **one** confession slot, not four, because four trivial admissions read as a format
rather than as honesty.

**≥768px:** unchanged apart from type steps and section padding. No rail on this page — there is
no evidence column to fill, and inventing one would be the documentation-template look.

## 3.5 `/lab` — Lab index

One project exists. A one-card page.

**375px stack:** Nav → h1 → two sentences saying what the Lab is and, plainly, that these are built
for this site rather than at work (D1-08) → one `LabCard` → footer.

**≥768px:** the single card is capped at 640px and left-aligned, not centred. A lone centred card
on a wide page reads as a placeholder for two more.

Do not add a greyed-out second card, a "coming soon", or a placeholder. Rejected-list #55.

## 3.6 `/lab/grounded` — Grounded

The stacking order on this page is not aesthetic. Research §D1-29 records the documented behaviour
of an AI-PM reviewer: **they open the live URL first, look for the eval suite second, and read the
reflection last.** The mobile stack is that order.

**375px stack:**

| # | Block |
|---|---|
| 1 | Nav |
| 2 | h1 + status, inline: `Grounded` then mono 11px `--signal` `live` |
| 3 | One sentence: what it does. One sentence: that it was built for this portfolio, not at work. |
| 4 | **The thing itself** — run a case, see the verdict |
| 5 | **`EvalScorecard`** (Part 8.5), mobile variant |
| 6 | What the four dimensions are, and why those four |
| 7 | What the harness cannot tell you — the limits, in prose |
| 8 | `[NEEDS:]` on hand-labelling (CONTENT_GAPS B13) |
| 9 | `Source ↗` repo link, mono 14px `--signal` |
| 10 | Footer |

Blocks 4 and 5 must both be reachable without scrolling past a wall of prose. If the interactive
demo cannot be above 900px of scroll depth on a 375px screen, the scorecard goes first and the demo
second.

**≥640px:** `EvalScorecard` switches to the full 16×4 matrix. **≥1024px:** the page uses the
case-study grid with the left rail carrying section anchors and the right rail carrying the
per-dimension counts.

## 3.7 `/about` — About

**375px stack:** Nav → h1 → three or four short paragraphs, serif 18px → `Timeline` (5 rows, real
title on every row) → education line, no discipline named (D1-23) → tools, one mono line → contact
block with `CopyEmail` → footer.

The literal string `Product Analyst` appears verbatim on this page (D1-20). Absent from the site
and present on LinkedIn reads as concealment, which costs more than the title does.

**≥768px:** Timeline gains its 96px period column. Prose caps at `--measure`. No rail.

---

# Part 4 — The asymmetric case-study grid

## 4.1 The geometry, stated as tokens

```css
.case-grid {
  display: grid;
  grid-template-columns:
    [rail-l-start] var(--rail-l) [rail-l-end]
    var(--gap-l)
    [prose-start] minmax(0, var(--prose-w)) [prose-end]
    var(--gap-r)
    [rail-r-start] var(--rail-r) [rail-r-end];
  justify-content: start;   /* NOT center. The asymmetry is the composition. */
  column-gap: 0;            /* gaps are explicit track sizes, so figures can span them */
}
```

| Range | Container | `--rail-l` | `--gap-l` | `--prose-w` | `--gap-r` | `--rail-r` | Grid total | Slack |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| ≥1280 | 1200 | 150 | 32 | 570 | 48 | 258 | 1058 | 142 right |
| 1024–1279 | 960 | 120 | 24 | 520 | 32 | 240 | 936 | 24 right |
| 768–1023 | 720 | — | — | 600 max | — | — | single col | 120 right |
| 640–767 | 100% − 48 | — | — | full | — | — | single col | 0 |
| 320–639 | 100% − 32 | — | — | full | — | — | single col | 0 |

Prose CPL at 21px Newsreader: 68 at ≥1280, 62 at 1024, 71 at 768. All inside the 50–75 band.
At 320px prose drops to 18px/1.65 giving 38 CPL, which is below the band and unavoidable on a
320px screen — 21px there would give 33 CPL and read as a column of confetti.

**Why the grid does not fill the container.** At ≥1280 the composition ends 142px short of the
right container edge. That slack is the design. Prose sits left-of-centre (its centre lands at
about 587px in a 1440px viewport, against a 720px viewport centre) and the rail balances it
optically. A centred prose column with a rail floating beside it is the documentation-template
look, and it is the single easiest thing to get wrong here.

## 4.2 Figure widths

Three, never one. The rhythm — narrow, narrow, wide, narrow — is what makes a long page read as a
document rather than a scroll, and it is the cheapest way to look unlike a template, because
templates use one content width throughout.

| Class | Grid span | ≥1280 | 1024–1279 | 768–1023 | <768 |
|---|---|---:|---:|---:|---:|
| **Column** | `prose-start / prose-end` | 570 | 520 | 600 | full |
| **Wide** | `prose-start / rail-r-end` | 876 | 792 | 720 | full |
| **Full** | `rail-l-start / rail-r-end` | 1058 | 936 | 720 | full |

**Full-bleed is capped at one per case study**, reserved for the single hero diagram. Two
full-bleed figures on one page and neither reads as the hero.

## 4.3 What happens at exactly 768, 1024 and 1280

The tablet band is where asymmetric layouts most often look broken, because they are designed at
1440 and tested at 375. These three transitions are specified so a builder can check them
deliberately.

### At 768px — the rail is born as inline content, and the ownership block goes three-across

| Property | 767px | 768px |
|---|---|---|
| Container | `100% − 48px` = 719 | 720 fixed |
| Prose | full container width | `max-width: 600px`, `margin-inline: 0` — **left-aligned, not centred** |
| Rail items | inline, demoted | inline, demoted (unchanged) |
| `OwnershipBlock` | 1 column | 3 columns |
| Progress | 2px top bar | 2px top bar (unchanged) |
| Figures | column = full | column 600 / wide 720 / full 720 |
| Prose size | 21px (from 640px up) | 21px |

Left-aligning the prose at tablet rather than centring it is the load-bearing decision here. A
page that is asymmetric on desktop and centred on tablet reads as two different designs by the
same author, which is worse than either one alone.

### At 1024px — both rails appear, and the prose gets narrower

| Property | 1023px | 1024px |
|---|---|---|
| Container | 720 | 960 |
| Prose | 600 (71 CPL) | **520 (62 CPL)** |
| Left rail | 2px top bar | sticky, 120px |
| Right rail | inline in prose flow | 240px column |
| `PullQuote` | not rendered | rendered in the right rail |
| Wide figure | 720 | 792 |

**The prose column shrinks by 80px as the viewport grows by 1px.** This is deliberate and it is
the correct trade. The rail only earns its 240px when there is room for it, and both 71 and 62 CPL
are comfortable. What must not happen is the naive alternative: keeping prose at 600 and squeezing
the rail to 180px, which puts a compact `MetricDelta` value line into a wrap.

The 220px rail floor in research §4.3 was computed against the string `15.0s → <2s`, which this
site does not use. The real constraint is that the widest compact delta must not wrap:
`3.5 → 7.8 min` is 13 characters at 12px Geist Mono = 94px, and `15s → under 2s` is 14 characters
= 101px. **240px is the floor this site adopts**, and it is met at 1024.

### At 1280px — the composition reaches full size

| Property | 1279px | 1280px |
|---|---|---|
| Container | 960 | 1200 |
| Prose | 520 (62 CPL) | 570 (68 CPL) |
| Left rail | 120 | 150 |
| Right rail | 240 | 258 |
| Right slack | 24 | 142 |
| Full-bleed | 936 | 1058 |

Nothing reflows in kind here; every track grows. This is the only one of the three transitions
that is invisible to the reader, and that is how it should be.

## 4.4 The failure modes, and the structural fix for each

| Failure | Fix |
|---|---|
| Two rail notes anchored to adjacent paragraphs collide | **Anchor rail items to `<section>`, never to a paragraph.** One rail item per section, maximum two. Collision becomes structurally impossible and needs zero JavaScript. Do not build a general sidenote system. |
| Rail item taller than its section | Cap editorially at the content pass, not with CSS. If it does not fit, it belongs in the prose or in a `Drawer`. |
| Block content inside an inline float breaks | The rail is a real grid child. Never a float. |
| Rail content vanishes on mobile | Never `display: none`. Reflow inline. One exception, `PullQuote`. |
| Source order ≠ visual order | Rail item in the DOM immediately after its section. |
| Sticky rail overlaps the condensed nav | `top: calc(var(--nav-h-condensed) + 24px)` and `max-height: calc(100vh - var(--nav-h-condensed) - 48px); overflow-y: auto` |
| Anchor jumps land under the nav | `scroll-margin-top: calc(var(--nav-h-condensed) + 24px)` on every `h2` in `.prose` |
| 200% zoom reflows into overlap | A 1280px viewport at 200% behaves as 640px → single column. The collapse is a CSS-pixel media query, so this works automatically. **Verify it** — it is the most common place a grid-with-rail layout fails an audit. |

---

# Part 5 — Component specs

Nine components. All are mobile-first: the base rule is the 375px rule, and every `≥` line is a
delta from it. All obey: no shadow, 4px max radius, no coloured left border, no decorative icon, no
`transform` on hover, spacing in multiples of 8.

## 5.1 `CaseCard` — homepage and `/work` index

Stacked full-width rows. **Never a `grid-cols-3`.** Rejected-list #10, and D1-38 notes both
research agents independently reached the same conclusion.

**375px:**

```
──────────────────────────────────────────  1px --rule-strong (top edge only)
   [eyebrow]   mono 11px UPPER --muted tracking .06em     HCL HEALTHCARE · 8 WEEKS
   [headline]  sans 24px/1.15 w600 --ink, max 3 lines     ← the tension line, never a feature name
   [sub]       serif 17px/1.5 --muted, max 2 lines
   [metric]    compact MetricDelta, one only
   [cue]       mono 14px --signal                          Read the case →
──────────────────────────────────────────  (last card only: 1px --rule-strong bottom)
```

- `padding-block: 32px`. Vertical gaps: eyebrow→headline 12px, headline→sub 12px, sub→metric 24px,
  metric→cue 24px.
- The whole row is one `<a>`. No nested interactive elements.
- No background, no border box, no radius. It is a row under a rule, not a card.

**≥1024px:** two-column row, `grid-template-columns: 200px 1fr; column-gap: 32px`.
Left column: eyebrow, then the compact `MetricDelta` at 40px below it. Right column: headline
(30px/1.15), sub, cue. `padding-block: 40px`.

This mirrors the case-study page's left-rail composition, so the homepage and the case studies read
as one system rather than two.

**States:**

| State | Change |
|---|---|
| hover | top rule → `--signal`; headline → `--signal`; cue → `--signal`. 120ms. **Nothing moves.** |
| focus-visible | the global 2px `--signal` outline at 3px offset on the `<a>` |
| visited | no change. A visited-state colour on a portfolio is noise. |

## 5.2 `ShortCase` — Circle Health, Infinyte Club

Short cases lead with the cost, not the win (`shortCaseSchema.tradeoff` is required and comes
first).

**375px:**

```
┌ 1px --rule, --paper-raised, radius 4px, padding 24px ────────┐
│ [meta]      mono 12px --muted, sentence case                 │
│             Circle Health · Product Intern · Jul–Sep 2024    │
│ [title]     sans 19px/1.25 w600 --ink                        │
│ [tradeoff]  serif 17px/1.5 --ink                             │
│ [metric]    compact MetricDelta, or omitted entirely         │
│ [notOwned]  mono 12px --muted, prefixed "Did not own: "      │
└──────────────────────────────────────────────────────────────┘
```

- Gaps: meta→title 8px, title→tradeoff 12px, tradeoff→metric 20px, metric→notOwned 16px.
- **Circle Health carries no metric.** D1-10 cuts CSAT +50% entirely rather than placeholdering it.
  A `ShortCase` with an empty `metrics` array renders with no metric row and no empty space where
  one would be.
- Infinyte Club carries `+100% signup completion`, which the record supports and which is
  `DERIVED`-safe as "doubled".
- Titles print the conservative reading: `Product Intern`, `Product Operations`. D1-21.
- **No industry descriptor.** D-07.

**≥768px:** two-up, `grid-template-columns: 1fr 1fr; gap: 24px`. Equal height via `align-items:
stretch`. Padding 32px.

## 5.3 `ProofStrip` — homepage, three rows

The stat-banner risk is real: *"a four-across row of big numbers on a tinted band is exactly the
generator pattern."* Three defences, all structural rather than cosmetic:

1. **Three rows, at every width.** Not a four-across, not a three-across. A row-per-metric reads
   as a result sheet; a column-per-metric reads as a marketing banner.
2. **A denominator under every figure.** Generator stat bars never carry populations or
   timeframes. This is the difference that cannot be faked.
3. **No box.** No border around the group, no tint, no background, no icons.

**375px:**

```
[label]        mono 11px UPPER --muted tracking .06em
[figure]       mono 19px, before --ink → rule → after --signal w500   (see Part 7)
[delta]        mono 14px --signal, or omitted
[qualifiers]   mono 12px --muted, joined by " · ", [NEEDS:] chips inline
──────────────────────────────────────────────────  1px --rule
[next row]
```

- `padding-block: 24px` per row. Hairline `--rule` between rows only, none above the first, none
  below the last.
- Figure size ladder: `--text-lg` 19px below 400px · `--text-xl` 24px 400–767 · `--text-2xl` 30px
  ≥768. At 320px the widest line (`15s → under 2s`) measures 189px against 288px of content. It
  fits with room.
- The connecting rule has `min-width: 32px` below 640px and `min-width: 64px` above. The shipped
  `min-w-8` is 64px at every size (D-01) and overflows at 320px.

**≥768px:** `grid-template-columns: 160px 1fr; column-gap: 24px`. The label moves into the left
column, baseline-aligned with the figure. The figure, delta and qualifiers stack in the right
column. `padding-block: 32px`.

**Hard cap: three rows, floor of two.** `homeSchema.proof` is `min(2).max(3)`, which the content
pass added after this spec was drafted, and the schema is right — D1-11 and D1-31 cut the fourth
line because the enterprise claim has no before, no after and no denominator, and if a second line
later turns out to be unqualifiable the strip should shrink rather than pad.

The component therefore renders 2 or 3 rows and nothing else. At two rows it keeps the same
`padding-block` and the same single hairline; it does not stretch to fill the width it had at
three. A two-row strip that has been re-proportioned to look like a three-row strip is padding
with extra steps.

`OPEN` — which metrics occupy the rows is a content decision, not a design one.

## 5.4 `Timeline` — homepage and `/about`

Five rows, one line per role, no bullets. M4 in the narrative is explicit: a reviewer opening
LinkedIn sees six stints of ≤5 months before the current job, and the site's answer is compression,
not explanation.

**375px:** two lines per row.

```
2024 — now                              mono 12px --muted, tabular
Product Analyst · HCL Healthcare        sans 16px/1.4 — title --ink w500, org --muted
──────────────────────────────────────  1px --rule
```

- `padding-block: 16px`. Rows separated by `--rule`; the group has no outer border.
- `place` (Noida, Bangalore) is omitted at 375px and appended at ≥768.
- Reverse chronological. No logos, no dots, no connecting spine, no chart.

**≥768px:** `grid-template-columns: 96px 1fr; column-gap: 24px`, one line per row, period in the
left column. `padding-block: 12px`.

**Every row prints its real title.** D1-21: rendering four internships as "Product" is title
inflation in the single most recruiter-scanned block on the page, and it breaks the instant
LinkedIn is opened. The five titles are `Product Analyst`, `Product Intern`,
`Product Management Intern`, `Product Operations`, `Product Management Intern`.

## 5.5 `LabCard`

**375px:**

```
┌ 1px --rule, --paper-raised, radius 4px, padding 24px ─────────┐
│ [title + status]  sans 19px w600 --ink  ·  mono 11px status   │
│ [tagline]         serif 17px/1.5 --muted                      │
│ [statusNote]      mono 12px --muted                           │
│ [links]           mono 14px --signal                          │
└───────────────────────────────────────────────────────────────┘
```

- **Status is inline after the title, never a pill above it.** `live` → `--signal`;
  `in-development` and `concept` → `--muted`. Lowercase, mono 11px, 12px of space before it, no
  background, no border, no dot. A coloured badge above a heading is a named tell.
- `statusNote` is where "built for this portfolio, not at work" goes. D1-08 makes that sentence
  load-bearing rather than a disclaimer: it is what makes Grounded's existence make sense on the
  page.
- Links row: `Open Grounded →` in `--signal`, then `Source ↗` in `--signal`, 24px apart.

**≥768px:** padding 32px, `max-width: 640px`, `margin-inline: 0`. Two-up grid only if a second
project ever exists.

## 5.6 `ProgressRail`

Desktop only. Below 1024px it is replaced by two things, not one: the 2px top bar **and** the
`<details>` "Sections" disclosure under the case-study header. Both, because they do different
jobs — the bar gives position, the disclosure gives an overview.

**≥1024px:**

```css
.progress-rail {
  position: sticky;
  top: calc(var(--nav-h-condensed) + 24px);
  max-height: calc(100vh - var(--nav-h-condensed) - 48px);
  overflow-y: auto;
  overscroll-behavior: contain;
}
```

- Items: mono 11px/1.4, `--muted`, `padding-block: 8px`. **No background, no border, no box.**
  The rail must be visually quieter than the nav, or the page reads as having two navigations.
- Active item: colour → `--ink`, plus a 1px × 12px `--signal` bar in the 8px gutter to its left.
  Not a background fill, not a bold weight, not a dot.
- Maximum 8 items. Beyond 8 the rail is longer than a short laptop viewport and the overflow scroll
  becomes a second scrollbar next to the page scrollbar.
- Numbers appear here and only here. Numbering the case-study sections in the body would be the
  "1 / 2 / 3 process steps" tell; in the rail they are navigation.

**The active marker needs JavaScript, and that is the correct trade.** A ~30-line client component
with `IntersectionObserver`, `rootMargin: '-20% 0px -70% 0px'` — which marks a section active when
its top third crosses the upper fifth of the viewport, and avoids the classic bug where the last
short section never activates. The rail renders fully functional without it; only the highlight is
JS-dependent. This is the third and last client component on the site, after `CopyEmail` and the
mobile-nav closer.

**The 2px mobile bar** is zero-JS:

```css
.read-progress { display: none; }
@supports (animation-timeline: scroll()) {
  .read-progress {
    display: block; position: sticky; top: var(--nav-h-condensed);
    height: 2px; background: var(--color-signal); transform-origin: left center;
    animation: read-progress linear both;
    animation-timeline: scroll(root block);
  }
  @keyframes read-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
}
```

Hidden outright where `scroll()` is unsupported. A progress bar is decoration; a broken progress
bar is worse than no progress bar.

## 5.7 `Tag`

Not a component with a box. A class.

```css
.tag {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);      /* 11 */
  letter-spacing: var(--track-eyebrow);
  color: var(--color-muted);
  text-transform: uppercase;        /* labels only — see 1.2 */
}
.tag + .tag::before { content: ' · '; color: var(--color-rule-strong); }
```

Zero background, zero border, zero radius, zero padding. A pill is the badge tell with the corners
rounded off.

**Uppercase for labels, sentence case for values.** `LAB` is a label. `Product Intern` and
`Jul–Sep 2024` are values and stay sentence case in mono 12px `--muted`.

## 5.8 `Button`

**There is no primary button on this site.** No filled button exists anywhere. The strongest call
to action is the email address itself, set in `--signal` mono, underlined. Stating this is a design
decision, not an omission: a filled accent button is the last piece of the generator silhouette
still available after the gradients, the pills and the icon cards have gone.

Two forms exist:

**Bordered link** (nav `Resume`):
`border: 1px solid var(--color-rule-strong)` · `border-radius: 4px` · `padding: 6px 12px` ·
`font: 14px sans` · `color: --ink`.
Hover: `border-color: --signal; color: --signal`, 120ms. No fill, no transform.
Minimum target 44×44 via the `::before` expander in D-08.

**Text link with an arrow**:
`font: mono 14px` · `color: --signal` · the arrow is `→` U+2192 or `↗` U+2197 from the type, in a
`aria-hidden` span, never an SVG or an icon font — so the label stays copy-pasteable.
Hover: underline appears (`text-decoration-color` transitions from 35% to 100%). The arrow does not
move; a nudging arrow is a seventh interaction.

## 5.9 `PullQuote`

**Maximum one per case study, in the right rail, ≥1024px only.**

The governing rule, and the reason this component is safe on this site:

> A `PullQuote` may contain only text that appears **verbatim** in the prose column of the same
> page.

That makes it a typographic emphasis device rather than a new claim, which means it cannot become a
place where a sentence with no source quietly appears. It also makes removing it below 1024px
correct rather than lossy — the text is by definition still on screen, in the prose, two hundred
pixels to the left. This is the one documented exception to "never `display: none` a rail item".

**It is never a user quote.** Four user quotes exist in the strategy document and all four are
fabricated. Zero exist in the record. The component takes a string and a `cite` of `"self"`, and
has no author field.

```
── 1px --rule-strong, 32px wide, left-aligned ──
[serif 19px/1.35, weight 400, --ink]
```

- 16px between the rule and the text. `margin-block: 8px`.
- No quotation marks. No large decorative glyph. No italic — there is no serif italic in the build,
  and faux-italic is worse than none.
- Weight 400, not 600. Bold is already doing the load-bearing-sentence job in the prose column; a
  bold pull quote next to a bold prose sentence flattens both.

---

# Part 6 — Micro-interaction inventory

## 6.1 The list, closed at six

Nothing outside this list ships. A seventh interaction is a design change, not a polish pass.

| # | Interaction | Trigger | Mechanism | Duration | JS? |
|---|---|---|---|---|---|
| 1 | **Hero rule draw** | page load, above the fold | CSS `@keyframes` on server-rendered markup | 520ms | no |
| 2 | **Nav condense** | scroll past 120px | `animation-timeline: scroll(root block)` | range-driven | no |
| 3 | **Disclosure open/close** | click / Enter on `<summary>` | native `<details>` | 180ms | no |
| 4 | **Colour change on hover / focus** | pointer or keyboard | `transition` on colour and border-colour only | 120ms | no |
| 5 | **Copy-email confirmation** | click | label text swap | 1600ms hold | yes |
| 6 | **Reading position** | scroll | rail active marker ≥1024, 2px bar <1024 | — | rail only |

Applies to all six:

- **No `transform` on hover, anywhere.** A 4px card lift plus a shadow upgrade is a named tell, and
  this site has no shadows to upgrade.
- **Nothing re-triggers.** No `whileInView`, no `IntersectionObserver` replay, no replay on
  back-navigation.
- **No `translateY(20px)` reveal.** `grep -rn "translateY(20px)\|whileInView\|y: 20"` must return
  zero. That is the single most recognisable motion signature of 2026, reported in ~83% of
  AI-generated landing pages.
- **Reduced motion is handled twice**: the blanket override in `globals.css` is a safety net, and
  each animated rule also checks the query itself so the final state is applied directly rather
  than animated in 0.01ms.

**Explicitly out**, so nobody has to re-litigate them: scroll-triggered text fades, page/route
transitions, loading skeletons, count-up numbers, parallax, scroll-jacking, custom cursors, image
zoom, tooltips, marquees, toast notifications, an animated hamburger, a resizing wordmark.

Interaction 4 is the one that will try to grow. It is one rule:
`transition: color var(--duration-fast) var(--ease-ui), border-color var(--duration-fast) var(--ease-ui);`
Nothing else transitions. Not `background`, not `opacity`, not `width`.

## 6.2 Nav condense, as CSS `SPEC`

Fixes D-05 and D-06. Zero JavaScript, no sentinel element.

```css
@property --nav-pad {
  syntax: '<length>'; inherits: true; initial-value: 24px;
}

:root {
  --nav-h: 72px;              /* 24 + 24 padding + 24 line box */
  --nav-h-condensed: 56px;    /* 16 + 16 padding + 24 line box */
}

.site-nav {
  position: sticky; top: 0; z-index: 40;
  background: var(--color-paper);          /* solid — see D-15 */
  border-bottom: 1px solid var(--color-rule);
  transition: border-bottom-color var(--duration-fast) var(--ease-ui);
}
.site-nav a, .site-nav summary { padding-block: var(--nav-pad); }

@supports (animation-timeline: scroll()) {
  .site-nav {
    animation: nav-condense linear both;
    animation-timeline: scroll(root block);
    animation-range: 0 120px;
  }
  @keyframes nav-condense {
    to { --nav-pad: 16px; border-bottom-color: var(--color-rule-strong); }
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-nav { animation: none; }
}
```

Notes a builder needs:

- **`@property` registration is what makes `--nav-pad` interpolate.** An unregistered custom
  property jumps rather than animates.
- **Only `--nav-pad` and `border-bottom-color` change.** Not `backdrop-filter` (expensive, and
  blur-on-scroll is a 2024 signature). Not the wordmark size — a resizing wordmark is a fidget.
- **Delete the `.nav-sentinel` div.** `scroll(root block)` needs no anchor element.
- Where `scroll()` is unsupported the nav sits at full height forever, which is correct.

## 6.3 The mobile nav panel `SPEC`

The panel is a native `<details>`, which is keyboard operable, screen-reader announced and works
before hydration. Three things it needs that are not in the tree:

**Scroll lock, zero JS:**

```css
html:has(.nav-panel[open]) { overflow: hidden; }
```

**Panel positioning that survives the condense.** The shipped `top: var(--nav-h, 3.5rem)` leaves a
16px gap once the nav has condensed. Fix: the panel is `position: fixed; inset: 0;
padding-block-start: var(--nav-h-condensed);` and sits at a lower `z-index` than the header, so the
header always covers its own height whatever that height currently is.

**Closing on navigation needs JavaScript.** With App Router client navigation the `<details>`
element is not remounted, so tapping a link changes the route and leaves the panel open over the
new page. A ~15-line client component watching `usePathname()` and clearing the `open` attribute is
the fix. It is the second of the site's three client components. There is no zero-JS version of
this that does not give up client navigation.

---

# Part 7 — The one aesthetic risk

**The brief's risk was the hero delta draw. I am endorsing the moment and changing what it draws.**

## 7.1 The risk, stated

> **Every quantity on the site is drawn to scale, in the same horizontal track, at the same
> pixels-per-unit — and the connecting rule inside `MetricDelta` *is* that scale bar.**

`15s → under 2s` renders with a rule whose length is proportional to 15 and an end mark at the
position of 2. The reader sees the ratio before reading either number. The proof strip and the
case-study diagrams then become the same object at two sizes: `ColdStartScale` (Part 8.1) is a
`MetricDelta` with a benchmark line and an axis.

## 7.2 Why this and not the ornament that was proposed

The connecting rule already exists in the shipped `MetricDelta`. Today it is `flex-1` — its length
is whatever the container leaves over, and it carries no information at all. It is furniture on a
site whose entire argument is that furniture and evidence should be told apart.

Making its length carry the ratio converts the most-repeated ornament on the site into data ink.
That is the Tufte argument in research §2.1(d), applied to the one element that repeats twenty
times. It costs nothing to load: it is a percentage width on a `<span>`. It needs no JavaScript, no
image, no measurement at runtime. And it makes a claim a Head of Product can check with a ruler,
which is the correct posture for a site whose thesis is that numbers should be checkable.

## 7.3 The honesty mechanic that makes it defensible

`under 2s` comes from `<2s`, which is an **inequality**. A bar drawn to a specific length would
assert a value the source does not contain. So:

- The `after` bar is drawn **to the 2s position**, and its right edge is a **1.5px dashed
  `--signal` rule**, dash pattern `3 2`.
- A dashed terminator is the standard notation for an open bound, and the figure caption says so
  in one sentence: *the bar is drawn to the bound because the source is an inequality.*
- The label reads `under 2s`. Never `1.9s`, never `2s`.

The same rule governs `at least 7.5× faster` (D1-13): a lower bound rendered as a lower bound.

**When the scale rule does not apply.** It renders only when `before` and `after` are both numeric
in the same unit. `+20% DAU` has no before/after pair in the record, so its `MetricDelta` falls
back to a fixed-length hairline and no scale is implied. A scale bar drawn from a delta with no
baseline would be exactly the invention this site exists to avoid.

## 7.4 Timing and reduced motion

```css
@keyframes draw-rule { from { transform: scaleX(0); } to { transform: scaleX(1); } }

.metric-rule--animate {
  transform-origin: left center;
  animation: draw-rule var(--duration-hero) var(--ease-out) both;   /* 520ms */
}
.metric-arrow--animate {
  animation: settle 160ms linear both;
  animation-delay: 360ms;                                          /* total 520ms */
}

@media (prefers-reduced-motion: reduce) {
  .metric-rule--animate, .metric-arrow--animate { animation: none; }
}
```

Four constraints, all non-negotiable:

1. **The bars are content, not motion.** `prefers-reduced-motion` disables the 520ms draw. It does
   not remove the proportional widths, which carry information.
2. **Nothing is ever hidden.** The `after` value renders at full opacity at first paint. Only the
   rule and the arrowhead animate. This is the direct fix for D-04, and it is the difference
   between an arrival sequence and a page that withholds its own result for half a second.
3. **It fires on load, above the fold, once.** Not scroll-triggered — which sidesteps the entire
   body of scroll-fade findings, because those are about content the reader scrolls *into*.
4. **`animate: true` is set on the hero instances only.** Every other `MetricDelta` on the site is
   static. Twenty animating deltas is not one orchestrated moment.

## 7.5 What a hostile reviewer will say, and the answer

*"The bars are decorative."* They are not: remove them and the ratio has to be computed by the
reader. That is what a chart is for.

*"15s to 2s at 37px per second makes the second bar tiny."* Yes. That is the finding. A bar that
is one-seventh the length of the bar above it is the argument the case study makes in three
paragraphs.

*"You drew a bar from an inequality."* The bar is drawn to the bound and terminated with a dashed
edge, and the caption says so. That is more careful than the resume it is drawn from.

---

# Part 8 — Diagram specs

Five diagrams. Six of the brief's nine were cut because their data does not exist (D1-14) — a
latency waterfall needs per-phase timings, a treemap needs composition, a device matrix needs a
grid of values, a cohort curve needs retention figures, a decision matrix needs scores. Ninety
percent of the area of each of those would have been invented.

## 8.0 Rules that apply to all five

**Component names are fixed.** `lib/content/mdx.tsx` already imports `ColdStartScale`,
`BundleScale`, `OptionSpread`, `FeedbackCadence`, `EvalScorecard` from `@/components/diagrams/`.
Build exactly those, at exactly those paths.

**Two variants per diagram, switched with CSS at 640px, never with JavaScript.**

```tsx
<span className="sm:hidden"><MobileVariant /></span>
<span className="hidden sm:block"><DesktopVariant /></span>
```

**Sizing, so text never scales below 11px.** SVG text scales with the viewBox, so a single
viewBox cannot serve 288px and 876px.

| Variant | viewBox width | Rendered | Effective scale | 11px text renders at |
|---|---:|---|---:|---:|
| Mobile (<640px) | **288** | `width:100%; max-width:340px; height:auto` | 1.00 – 1.18 | 11 – 13.0px |
| Column (≥640px) | **500** | `width:100%; height:auto` in a column figure | 0.93 – 1.07 | 10.2 – 11.8px |
| Wide (≥640px) | **780** | `width:100%; height:auto` in a wide figure | 0.93 – 1.04 | 10.2 – 11.4px |

Author every SVG with explicit `width` and `height` attributes alongside the `viewBox` so the
figure has an intrinsic size and never reflows on font load. A figure that shifts during load is a
CLS event on a page arguing its author cares about CLS.

**Accessibility contract** (D-12). `Figure` already sets `role="img"` and `aria-label={alt}` on the
wrapper. Every `<svg>` inside therefore carries `aria-hidden="true" focusable="false"`. The `alt`
describes the **finding**, not the shape.

**Palette.** `--ink`, `--muted`, `--rule`, `--rule-strong`, `--signal`, `--flag`, `--paper`,
`--flag-tint`. Nothing else. No lavender, no gradient, no legend — direct-label every series, with
the label at the end of the mark, in the mark's colour.

**Type inside SVG:** values mono 13px weight 500 · labels and axis mono 11px weight 400 ·
annotation sans 12px weight 400. Set via `font-family: var(--font-mono)` on a class; the SVG is
inline in the DOM so CSS variables resolve.

**Strokes:** hairlines and axes 1px. Bars are fills, never strokes. The only dashed strokes are the
benchmark rule (`4 3`) and the open-bound terminator (`3 2`).

**No `[NEEDS:]` token ever goes inside an SVG.** Tokens live in the `figcaption` or the prose, where
they render as real chips with real semantics. An amber rectangle drawn in SVG is not the same
object.

**Pattern and gradient IDs must be unique per instance.** `FeedbackCadence` uses a `<pattern>`;
generate its id with `useId()` or take it as a prop, or a second instance on the same page will
reference the first one's definition.

---

## 8.1 `ColdStartScale`

**What it shows:** three real numbers — 15s, the 2s benchmark, and the shipped result — at one
scale. Nothing else. The benchmark is a threshold, so it is drawn as a line through the chart
rather than as a third bar.

**Wide variant — `viewBox="0 0 780 200"`**

| Element | Geometry | Style |
|---|---|---|
| Zero axis | `x=120`, `y 48 → 180` | 1px `--rule-strong` |
| Scale: 15s across 560px | `37.333 px/s`, track `x 120 → 680` | — |
| Benchmark rule | `x=194.7`, `y 36 → 168` | 1px `--muted`, `stroke-dasharray="4 3"` |
| Benchmark label | `(201, 30)`, anchor start | mono 11px `--muted` · `2s benchmark` |
| Row A label | `(104, 74)`, anchor end | mono 11px `--muted` · `Before` |
| Row A bar | `x=120 y=58 w=560 h=24` | fill `--ink` |
| Row A value | `(692, 74)` | mono 13px w500 `--ink` · `15s` |
| Row B label | `(104, 134)`, anchor end | mono 11px `--muted` · `Shipped` |
| Row B bar | `x=120 y=118 w=74.7 h=24` | fill `--signal` |
| Row B open bound | `x=194.7`, `y 112 → 148` | 1.5px `--signal`, `stroke-dasharray="3 2"` |
| Row B value | `(207, 128)` | mono 13px w500 `--signal` · `under 2s` |
| Row B note | `(207, 144)` | mono 11px `--muted` · `upper bound` |
| Ticks | `x = 120, 306.7, 493.3, 680`, `y 180 → 186` | 1px `--rule` |
| Tick labels | `y=198`, anchor middle (last: end) | mono 11px `--muted` · `0` `5s` `10s` `15s` |

The tick row is what makes "to scale" checkable. Do not omit it to save 18px.

**Mobile variant — `viewBox="0 0 288 160"`**

Left gutter disappears; labels move above each bar. Scale: 15s across 272px = `18.133 px/s`,
so the 2s benchmark lands at `x = 8 + 36.3 = 44.3`.

| Element | Geometry | Style |
|---|---|---|
| Zero axis | `x=8`, `y 26 → 130` | 1px `--rule-strong` |
| Row A label | `(8, 20)` | mono 11px `--muted` · `Before` |
| Row A bar | `x=8 y=28 w=272 h=22` | fill `--ink` |
| Row A value | `(272, 43)`, anchor end | mono 13px w500 `--paper` · `15s` (inside the bar) |
| Benchmark rule | `x=44.3`, `y 26 → 130` | 1px `--muted`, dasharray `4 3` |
| Benchmark label | `(50, 20)` | mono 11px `--muted` · `2s benchmark` |
| Row B label | `(8, 74)` | mono 11px `--muted` · `Shipped` |
| Row B bar | `x=8 y=82 w=36.3 h=22` | fill `--signal` |
| Row B open bound | `x=44.3`, `y 78 → 108` | 1.5px `--signal`, dasharray `3 2` |
| Row B value | `(52, 97)` | mono 13px w500 `--signal` · `under 2s` |
| Ticks | `x = 8, 98.7, 189.3, 280`, `y 130 → 136` | 1px `--rule` |
| Tick labels | `y=150` | mono 11px `--muted` · `0` `5s` `10s` `15s` |

`Before` at 11px mono is ~40px wide and ends at x=48; `2s benchmark` starts at x=50. No collision.

**Caption pattern** (identity, provenance, finding — the provenance sentence is mandatory):

> **Cold start, to scale.** 15s and the 2s benchmark are from the record; the shipped bar is drawn
> to the 2s bound and terminated with a dashed edge because the source states an inequality, not a
> value. The gap is the finding: the app was more than seven times slower than the thing it was
> being measured against. `[NEEDS: which percentile, on what device population, measured cold start
> to what event?]`

`alt`: *"Launch time falling from fifteen seconds to under two, against a two-second benchmark."*

**Bans this diagram is checked against:** no `1.9s`, no `15.0s`, no percentile, no device
population, no `−87%` as a clean delta.

## 8.2 `BundleScale`

**What it shows:** 25MB and 6MB as **areas**, with the smaller nested inside the larger so the
removed portion is the visible L-shape. Both totals are in the record; the composition is not, which
is why this is not a treemap.

Side lengths go as `√value`: `√(6/25) = 0.4899`.

**Column variant — `viewBox="0 0 460 250"`**

| Element | Geometry | Style |
|---|---|---|
| Before square | `x=8 y=32 w=180 h=180` | fill `--rule`, stroke `--rule-strong` 1px |
| After square | `x=8 y=124 w=88 h=88` | fill `--signal`, no stroke |
| `25MB` | `(140, 72)`, anchor middle | mono 13px w500 `--ink` |
| `before` | `(140, 88)`, anchor middle | mono 11px `--muted` |
| `6MB` | `(52, 168)`, anchor middle | mono 13px w500 `--paper` |
| `after` | `(52, 184)`, anchor middle | mono 11px `--paper` |
| `−76%` | `(210, 116)` | mono 15px w500 `--signal` |
| `of the bundle removed` | `(210, 134)` | mono 11px `--muted` |
| `in 8 weeks` | `(210, 152)` | mono 11px `--muted` |

- `88 / 180 = 0.489`, which is `√(6/25)` to three places. State this in a code comment so a future
  edit does not silently make it a length comparison.
- `−76%` uses U+2212, never a hyphen-minus. It is the only exact percentage on the site:
  `(25 − 6) / 25 = 0.76` with no rounding and no inequality (D1-06).
- `--paper` on `--signal` is 5.59:1 — AA at 11px.
- The `25MB` label sits in the L-region of the before square, and `6MB` sits inside the after
  square. Direct labels, zero leader lines, zero legend.

**Mobile variant — `viewBox="0 0 288 200"`**

| Element | Geometry | Style |
|---|---|---|
| Before square | `x=8 y=24 w=150 h=150` | fill `--rule`, stroke `--rule-strong` 1px |
| After square | `x=8 y=100 w=74 h=74` | fill `--signal` |
| `25MB` | `(116, 56)`, anchor middle | mono 13px w500 `--ink` |
| `before` | `(116, 72)`, anchor middle | mono 11px `--muted` |
| `6MB` | `(45, 141)`, anchor middle | mono 12px w500 `--paper` |
| `−76%` | `(170, 100)` | mono 15px w500 `--signal` |
| `of the bundle` | `(170, 118)` | mono 11px `--muted` |
| `removed, 8 weeks` | `(170, 134)` | mono 11px `--muted` |

`74 / 150 = 0.493`. The `after` sub-label is dropped on mobile for room; `−76%` carries it.

**Caption:**

> **Bundle size, to scale by area.** Both totals are from the record; the composition is not, which
> is why this is two squares and not a treemap. The smaller square is nested so the removed
> three-quarters is the shape you can see. `[NEEDS: compressed or uncompressed? APK, AAB, or
> install size?]`

`alt`: *"Bundle size falling from twenty-five megabytes to six, drawn as areas."*

## 8.3 `OptionSpread`

**What it shows:** the three options that were evaluated, the one that shipped, and the scoring
criteria as an open question rather than invented scores. D1-14 replaces the mandated scored
decision matrix with exactly this.

**The record's words matter here.** b3 says *"evaluated 3 retention strategies (content,
incentives, gamification)"* and *"prioritizing competitive mechanics"*. So the third option is
labelled **Gamification** — the record's word — and the note says it shipped as competitive
mechanics. Labelling the option "Competition" would quietly rewrite the source.

The one-line notes are argument, not biography, and they are the argument from `01-narrative.md`
§3: content and incentives buy attention you have to keep paying for; competition manufactures a
reason to open the app on the day your own motivation is gone.

**Wide variant — `viewBox="0 0 780 260"`** — this is the case study's one full-bleed figure.

| Element | Geometry | Style |
|---|---|---|
| Box 1 | `x=8 y=24 w=292 h=48 rx=4` | fill none, stroke `--rule-strong` 1px |
| Box 1 name | `(24, 46)` | sans 15px w500 `--ink` · `Content` |
| Box 2 | `x=8 y=100 w=292 h=48 rx=4` | fill none, stroke `--rule-strong` 1px |
| Box 2 name | `(24, 122)` | sans 15px w500 `--ink` · `Incentives` |
| Box 3 | `x=8 y=176 w=292 h=48 rx=4` | fill none, stroke **`--signal` 1.5px** |
| Box 3 name | `(24, 198)` | sans 15px w500 `--ink` · `Gamification` |
| Box 3 mark | `(284, 198)`, anchor end | mono 11px `--signal` · `shipped` |
| Shared bracket | `M 308,24 h 8 V 148 h -8` | 1px `--muted`, fill none |
| Bracket tick | `(316, 86) → (328, 86)` | 1px `--muted` |
| Shared note | `(336, 90)` | sans 12px `--muted` · `buys attention you have to keep paying for` |
| Box 3 tick | `(308, 200) → (328, 200)` | 1px `--signal` |
| Box 3 note | `(336, 196)` | sans 12px `--ink` · `manufactures a reason to open the app on the day` |
| Box 3 note (2) | `(336, 212)` | sans 12px `--ink` · `your own motivation is gone` |
| Box 3 sub | `(336, 234)` | mono 11px `--signal` · `shipped as competitive mechanics` |

The bracket spanning boxes 1 and 2 with one shared note is the point of the drawing: the two
rejected options fail the same way, and saying it once rather than twice is what makes that legible.

**Mobile variant — `viewBox="0 0 288 288"`** — SVG text does not wrap, so every line is an explicit
`<tspan x="20" dy="16">`.

| Element | Geometry | Style |
|---|---|---|
| Box 1 | `x=8 y=8 w=272 h=76 rx=4` | stroke `--rule-strong` 1px |
| Box 1 name | `(20, 32)` | sans 14px w500 `--ink` · `Content` |
| Box 1 note | tspans at `(20, 52)`, `(20, 68)` | sans 11px `--muted` · `buys attention you have` / `to keep paying for` |
| Box 2 | `x=8 y=92 w=272 h=76 rx=4` | stroke `--rule-strong` 1px |
| Box 2 name | `(20, 116)` | sans 14px w500 `--ink` · `Incentives` |
| Box 2 note | tspans at `(20, 136)`, `(20, 152)` | same two lines |
| Box 3 | `x=8 y=176 w=272 h=104 rx=4` | stroke **`--signal` 1.5px** |
| Box 3 name | `(20, 200)` | sans 14px w500 `--ink` · `Gamification` |
| Box 3 mark | `(268, 200)`, anchor end | mono 11px `--signal` · `shipped` |
| Box 3 note | tspans `(20, 220)`, `(20, 236)`, `(20, 252)` | sans 11px `--muted` · `manufactures a reason to open` / `on the day your own motivation` / `is gone` |
| Box 3 sub | `(20, 272)` | mono 11px `--signal` · `shipped as competitive mechanics` |

The bracket is dropped on mobile and the shared note is repeated in both boxes. The repetition is
honest — the two options fail identically — and it costs less than a bracket that would be 4px wide.

**Caption — this is where the open question lives, as a real chip, not as SVG:**

> **Three options, one choice.** The three option names and the choice are from the record. There
> are no scores in this diagram because there are no scores in the record, and a scored matrix
> whose numbers were invented would be the least defensible object on this site.
> `[NEEDS: what criteria did you score content, incentives and gamification against, and what made
> gamification win?]`

`alt`: *"Three evaluated options — content, incentives, gamification — with gamification marked as
the one that shipped."*

**`SPEC` note on the alternative.** `DecisionTable` could carry this content in three rows plus a
criteria row, and it already handles `[NEEDS:]` in cells and scrolls horizontally. I am specifying
the SVG anyway: this is the case study's hero figure, a three-row table reads as an afterthought,
and the shape a reviewer is hunting for — options, choice, defended rationale — needs to be legible
in one glance rather than one read.

## 8.4 `FeedbackCadence`

**What it shows:** an argument, not a claim about what shipped. Why a social cost registers daily
while a health benefit registers once. D1-14 replaces the mandated habit-loop diagram with this,
and the caption must say plainly that it is an argument about cadence.

**Wide variant — `viewBox="0 0 780 240"`**

| Element | Geometry | Style |
|---|---|---|
| Thesis line | `(120, 30)` | sans 13px `--ink` · `One signal a day against one signal a year.` |
| Track 1 label | `(8, 68)` | sans 13px `--ink` · `A social cost` |
| Track 1 sub | `(8, 86)` | mono 11px `--muted` · `felt daily` |
| Track 1 marks | `rect x=120 y=60 w=620 h=24 fill="url(#daily)"` | see pattern below |
| Track 2 label | `(8, 136)` | sans 13px `--ink` · `A health benefit` |
| Track 2 sub | `(8, 154)` | mono 11px `--muted` · `felt once` |
| Track 2 mark | `x=740`, `y 128 → 152` | 2px `--flag` |
| Track 2 note | `(734, 122)`, anchor end | mono 11px `--flag` · `one reading` |
| Axis | `y=190`, `x 120 → 740` | 1px `--rule-strong` |
| Month ticks | `x = 120 + n × 51.67`, n=0..12, `y 190 → 196` | 1px `--rule` |
| Quarter labels | `x = 120, 275, 430, 585`, `y=212` | mono 11px `--muted` · `Jan` `Apr` `Jul` `Oct` |

The daily pattern — one element, not 365:

```svg
<pattern id={id} width="1.703" height="24" patternUnits="userSpaceOnUse">
  <rect width="1" height="24" fill="var(--color-ink)" />
</pattern>
```

`620 / 364 = 1.703`. At 59% ink coverage this reads as a dense comb at a glance and resolves into
discrete events up close, which is exactly the perceptual behaviour the argument needs. **The `id`
must be unique per instance** — `useId()` or a prop.

**Mobile variant — `viewBox="0 0 288 210"`.** The encoding changes, deliberately. At 288px the
daily comb has a 0.75px pitch and renders as solid grey, which destroys the "many discrete events"
reading. A mobile variant may change encoding as long as the **finding** is identical.

| Element | Geometry | Style |
|---|---|---|
| Thesis line | `(8, 16)` | sans 12px `--ink` · `One signal a day against one signal a year.` |
| Track 1 label | `(8, 44)` | sans 13px `--ink` · `A social cost` |
| Track 1 sub | `(8, 60)` | mono 11px `--muted` · `felt daily` |
| Track 1 bar | `x=8 y=70 w=272 h=18` | fill `--ink` |
| Track 1 inline | `(272, 83)`, anchor end | mono 11px `--paper` · `every day, all year` |
| Track 2 label | `(8, 116)` | sans 13px `--ink` · `A health benefit` |
| Track 2 sub | `(8, 132)` | mono 11px `--muted` · `felt once` |
| Empty-year guide | `y=150`, `x 8 → 268` | 1px `--rule`, dasharray `2 3` |
| Track 2 mark | `x=272 y=141 w=8 h=18` | fill `--flag` |
| Axis | `y=170`, `x 8 → 280` | 1px `--rule-strong` |
| End note | `(280, 190)`, anchor end | mono 11px `--muted` · `end of year` |

The flag block sits at the far right of the same 272px span, so its x-position still encodes "at the
end of the year". The dashed guide is the empty year in front of it.

**Caption — the framing sentence is load-bearing:**

> **Why the two rewards are not comparable.** This is an argument about feedback cadence, not a
> record of what shipped. A social standing is legible the moment you open the app; a health
> outcome is legible once, much later. Anything built on the second has to survive the gap that
> the first fills for free. `[NEEDS: at what cadence does a beneficiary actually receive a health
> report — per check-up, annually, on demand?]`

`alt`: *"A dense band of daily signals against a single mark at the end of a year."*

**Ban check:** no retention figure, no cohort curve, no D30/D90 benchmark, no claim that either
track describes a shipped feature.

## 8.5 `EvalScorecard`

**The only diagram on this site drawn from real generated data.** It reads
`public/grounded-baseline.json`, which is produced by actually running the harness.

**Every number in it is computed at build time. Nothing is hardcoded.** Truth-audit §8 lists "a
hardcoded golden-set count" as a build-failure condition. The component imports the JSON and
derives everything.

Current contents of that file, for a builder's reference only:

- 16 cases: 3 `normal`, 3 `borderline`, 5 `out-of-range`, 5 `adversarial`
- 4 dimensions: `grounding`, `scope`, `escalation`, `readability`
- Per-dimension pass counts: grounding 13/16 · scope 9/16 · escalation 12/16 · readability 15/16
- Case-level: 5 of 16 pass all four
- `agreement.verdict`: 16/16 · `handLabelled`: 0 · `labelledBy`: `synthetic-starter`
- `totalElapsedMs`: 2.62

**Wide variant — `viewBox="0 0 780 260"`.** A 16-column × 4-row matrix. Cell 30px, gap 5px, plus
12px between category groups.

| Element | Geometry | Style |
|---|---|---|
| Group labels | centred over each group, `y=44` | mono 11px `--muted` · `normal` `borderline` `out of range` `adversarial` |
| Group x-spans | `128–228` · `245–345` · `362–532` · `549–719` | 3, 3, 5, 5 cells |
| Row labels | `(112, rowY + 20)`, anchor end | mono 11px `--muted` · `grounding` `scope` `escalation` `readability` |
| Row y | `60, 96, 132, 168` (pitch 36) | cell height 30 |
| Cell x | `128 + i×35`, plus `+12` per group crossed | cell width 30 |
| **Pass cell** | `rect w=30 h=30 rx=2` | fill `--signal` |
| **Fail cell** | `rect w=30 h=30 rx=2` | fill `--flag-tint`, stroke `--flag` 1px, **plus** a 1px `--flag` slash from `(x+6, y+24)` to `(x+24, y+6)` |
| Row counts | `(730, rowY + 20)` | mono 11px `--ink` · `13/16` etc. |
| Summary | `(128, 224)` | mono 13px w500 `--ink` · `5 of 16 cases pass all four dimensions.` |
| Sub | `(128, 242)` | mono 11px `--muted` · `harness run in 2.6 ms` |

The slash on fail cells is what makes the matrix legible without colour. Do not encode pass/fail by
hue alone.

**Mobile variant — `viewBox="0 0 288 230"`.** The full 16×4 matrix cannot be labelled at 288px
without a legend, and legends are banned. The mobile variant keeps the **finding** and drops the
resolution: four segmented bars, one per dimension, 16 segments each in case order, so the
adversarial cluster failing `scope` is still the thing you see.

| Element | Geometry | Style |
|---|---|---|
| Row label | `(8, rowY)` | mono 11px `--muted` · dimension name |
| Row count | `(280, rowY)`, anchor end | mono 11px `--ink` · `13/16` |
| Row label y | `20, 64, 108, 152` | |
| Segments | `y = rowY + 6`, height 16, width 14, gap 2, **+4 between category groups** | 16 segments, `x` from 8 to 274 |
| Pass segment | `rect w=14 h=16 rx=1` | fill `--signal` |
| Fail segment | `rect w=14 h=16 rx=1` | fill `--flag-tint`, stroke `--flag` 1px |
| Summary | `(8, 200)` | mono 12px w500 `--ink` · `5 of 16 cases pass` |
| Sub | `(8, 218)` | mono 11px `--muted` · `all four dimensions` |

`16×14 + 15×2 + 3×4 = 266`, so segments run `x 8 → 274` inside 288. The slash is dropped at 14px
wide; the hollow-versus-filled contrast carries it.

**Caption — this one carries the most valuable sentence on the Lab page:**

> **The harness, run against its own golden set.** Sixteen cases, four dimensions, generated by
> running the suite rather than by drawing it. Five cases pass all four, and `scope` — the rule
> that a summary must not assert a diagnosis — is where it fails most.
> `[NEEDS: hand-label the sixteen cases, so that agreement measures correctness rather than
> self-consistency. Until then the expected verdicts are synthetic starters.]`

`alt`: *"Sixteen evaluation cases across four dimensions; scope fails most often, and five cases
pass all four."*

**Ban check.** The string `hand-labelled` must not describe this set before it is labelled
(truth-audit §8). The `[NEEDS:]` above is phrased as an action still to take, which is the honest
form. `agreement: 16/16` must never be presented as accuracy — with `handLabelled: 0` it measures
the harness against its own synthetic expectations, and the caption says so.

---

# Part 9 — The `[NEEDS:]` chip

Replaces the shipped implementation (D-09). One visual identity, three renderings, and the rhythm
is protected structurally rather than by tuning numbers.

## 9.1 The governing constraint

An inline box's **vertical padding, borders and line-height do not participate in line-box
sizing** — but its `font-size` does, and `inline-flex` makes it an atomic inline-level box whose
full height *does*. So:

> The chip is `display: inline`, has **zero vertical padding**, sets **no `line-height`**, and has
> **no border**. Then a paragraph containing four chips is exactly as tall as the same paragraph
> containing none.

That is the whole mechanism. Everything else is colour.

## 9.2 In serif prose

```css
[data-needs] {
  display: inline;
  font-family: var(--font-mono);
  font-size: 0.82em;           /* 17.2px inside 21px prose; 14.8px inside 18px mobile prose */
  line-height: inherit;        /* never set a value here */
  padding-block: 0;            /* zero. non-negotiable. */
  padding-inline: 0.4em;
  color: var(--color-flag);
  background: var(--color-flag-tint);
  border-radius: 2px;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}
```

- `0.82em` in Geist Mono next to Newsreader lands the mono x-height just under the serif's, so the
  chip reads as an annotation rather than as a competing voice.
- `box-decoration-break: clone` gives both fragments their own padding and rounding when a chip
  wraps across a line. Without it the second fragment loses its left padding and looks broken.
- `--flag` on `--flag-tint` is **6.33:1** — AA at any size, AAA at 17px.
- **No glyph.** `↯` is U+21AF and Geist Mono does not ship it, so it falls back to a system font at
  a mismatched size and weight. The mono family shift plus the amber tint is already two
  non-positional cues.
- The `sr-only` prefix stays: `<span class="sr-only">Unanswered: </span>`. That is the third cue and
  it is the one a screen-reader user gets.

Nothing else changes about a paragraph containing a chip. No extra margin, no `break-inside`, no
orphan handling.

## 9.3 In a table cell

Two changes, both because a cell is not a line of prose.

```css
td [data-needs], th [data-needs] {
  display: block;
  font-size: 12px;       /* fixed, not em — cells are 14px sans and 0.82em lands at 11.5 */
  padding: 4px 8px;
  margin-block-start: 4px;
}
```

**Editorial rule that removes the layout problem entirely:** in a `DecisionTable`, a cell
containing a `[NEEDS:]` token contains **nothing else**. The token is the whole cell. Mixing a
sentence and a token in one cell inside a horizontally scrolling table produces a column that is
either 400px wide or wraps to six lines, and neither is readable.

`DecisionTable` already routes cells through `WithNeeds`, so no component change is needed beyond
the CSS above.

## 9.4 In `OwnershipBlock`

Items are 14px sans in a three-column grid at ≥768px, which is the tightest context the chip has.

**Inline within an item** — same as prose but `font-size: 12px` fixed:

```css
.ownership li [data-needs] { font-size: 12px; }
```

**When the token is the entire item** — which is the common case, because `notOwned` is where the
unknowns live — it is promoted to a block, and the block is sized in multiples of 8 so the column
rhythm survives:

```css
.ownership li:has(> [data-needs]:only-child) [data-needs] {
  display: block;
  border-block-start: 1px solid var(--color-flag);   /* ABOVE. never a left border. */
  background: var(--color-flag-tint);
  padding: 7px 8px 8px;      /* 7 + 1px rule = 8. total block = 40px at 12px/1.4 */
  border-radius: 0 0 2px 2px;
  margin-block: 8px;
}
```

- Total height `1 + 7 + 17 + 8 = 33px`, plus `8px` margins each side = 49px. For a strict 8px
  rhythm use `margin-block: 8px 15px`, or accept the 33px block since the column's own gap is 16px
  and the block sits between items rather than defining the grid.
- **Rule above, never left.** A coloured left border is the tell this system spends Part 2 removing;
  reintroducing it on the one component that is meant to signal honesty would be the worst possible
  place for it.
- The list marker (`h-px w-2` dash) is suppressed for a promoted item: the rule above is the marker.

## 9.5 Where chips are counted

`hasNeeds()` already exists. Add a build check that prints the total and the file list, and have
the final report state the number plainly. D1-17: the site is not shareable until the blocking
answers land, and a count in the build output is what keeps that true rather than aspirational.

---

# Part 10 — Build gates

Greppable checks. All must pass before the site is shareable.

| Check | Expect |
|---|---|
| `grep -rn "box-shadow" app components` | 0 |
| `grep -rn "3b82f6\|2563eb\|blue-500\|blue-600\|indigo-\|violet-\|purple-" app components` | 0 |
| `grep -rn "linear-gradient\|radial-gradient" app components` | 1 — the documented `.scroll-x` mask only |
| `grep -rn "rounded-xl\|rounded-2xl\|rounded-lg\|rounded-full" app components` | 0 |
| `grep -rn "translateY(20px)\|whileInView\|y: 20\|framer-motion" app components` | 0 |
| `grep -rn "border-l-\[" app components` | 0 (after D-03) |
| `grep -rn "1\.9s\|15\.0s\|P75\|low-end Android\|mid-tier\|2–4GB\|Q1 2025" app components content lib public` | 0 |
| `grep -rn "enrolled cohort\|1M+ user base\|six 0" app components content lib` | 0 |
| `grep -rn "hand-labelled\|hand-labeled" app components content lib` | 0 |
| `grep -rn "Insurance claims\|Auto marketplace\|Fintech onboarding" lib app content` | 0 (D-07) |
| `grep -rn "+122%" content` | 0 |
| `grep -rn "#000\|#fff\b" app components` | 0 outside the `--paper-raised` token |
| `grep -rn "max-w-\[.*ch\]" components app` | 0 (D-02) |
| `grep -c "aria-hidden" components/diagrams/*.tsx` | one per SVG root (D-12) |

Manual passes, none of which a grep can do:

1. **The silhouette test.** Screenshot the homepage, reduce to a 200px black-on-white silhouette,
   put it beside three template portfolios. If you cannot tell which is yours, the page is
   structurally templated regardless of how carefully the colours were chosen. Run it after the
   build pass and again before ship.
2. **200% zoom on a case study at 1280px.** It must behave as 640px and reflow to one column with
   no overlap. This is the most common place a grid-with-rail layout fails an audit.
3. **375px and 320px scroll-depth check.** The proof strip must be reachable in under two thumb
   scrolls. This is what D-01 currently breaks.
4. **Accessibility tree order on a case study.** Every rail item must appear immediately after the
   section it annotates, not at the end of the document.
5. **First paint with animations disabled.** Every number, including `under 2s`, must be readable
   in the first frame (D-04).

---

# Part 11 — `OPEN` items handed to later phases

| # | Item | Owner |
|---|---|---|
| O-1 | Which three metrics occupy the `ProofStrip` rows | content pass |
| O-2 | The four belief headings on `/approach` | content pass |
| O-3 | The eight section anchors per case study, which set the `ProgressRail` contents | content pass |
| O-4 | Whether the Grounded demo can sit above 900px of scroll depth at 375px, or whether the scorecard leads (3.6) | build pass |
| O-5 | The exact `[NEEDS:]` wording in every caption in Part 8 — the questions here are drafts and must reconcile with `CONTENT_GAPS.md` B2, B9, B13 | content pass |
| O-6 | Custom domain. Research §3.7 treats `.vercel.app` + a stat banner as a three-signal stack, so this is a design requirement rather than a deployment nicety | ship pass |
