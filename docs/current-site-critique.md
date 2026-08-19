# Critique of V1

Written after inspecting every route in the built site at 390px and 1440px, and reading every
content file. The verdict up front, then the evidence.

---

## The one-sentence verdict

**V1 is an essay about product judgment wearing the clothes of a portfolio.** It is honest, well
written, technically excellent — and it does not look like the work of someone who ships products.
It looks like the work of someone who writes about shipping products.

A Head of Product opening it does not see a product. They see prose.

---

## The five failures that matter

### 1. It shows no product. Anywhere.

This is the big one. Across nine routes there is **not one screen, flow, funnel, architecture
diagram, or product surface**. The only visuals are five abstract charts, four of which are two
horizontal bars.

The site's own case studies describe a step-counting league with standings and seasons, a
personalised health report with a cross-sell surface, and a launch sequence that went from fifteen
seconds to under two — and **shows none of it**. A reader is asked to take the product on trust and
read 1,700 words instead.

For a PM portfolio, that is backwards. The artifact is the evidence. Prose is the annotation.

### 2. The homepage is 4,987px tall and carries 62 words

`content/home.mdx` has sixty-two words of visible prose. The page is five viewports deep. That
arithmetic is the whole problem: enormous vertical space, almost nothing in it.

Measured on the work index at 1440px, a single case-study row occupies ~450px of height and uses
about 35% of the horizontal band. The right two-fifths of most sections are empty. Not "generous
whitespace" — unused.

### 3. It leads with a bundle size

The hero's visual anchor is `25MB → 6MB`. That is a real number and an honest one, and it is the
least interesting thing this candidate has done. It says "I care about payload." It does not say
"I build products people use."

`1M+ users`, `+20% engagement`, `0→1 launches`, `AI health product` — the things a founder actually
reacts to — are nine screens down, in a mono timeline, in grey.

### 4. It publishes its own homework

The site renders internal QA markers **in production**, in red:

> `not stated · 8 weeks · NEEDS: percentile, device population, instrument`

Twenty-six of them. There were twenty-six on the live site.

I built these deliberately and defended them at length, and they were a mistake. The intent was
"this person knows what a denominator is." The effect is a form with validation errors. A recruiter
does not read it as rigour; they read it as unfinished. Worse, it trains the reader to hunt for red
— so the first thing they scan for on every page is what is *missing*.

**Internal content QA does not belong on a public site.** It belongs in `CONTENT_GAPS.md`.

### 5. The writing is defensive

From `/about`, in bold, in the third paragraph:

> **"One limit, before you find it yourself: I have never owned acquisition."** … "If that is the
> job, I am not yet the person for it."

The instinct — volunteer the limit before the reader finds it — is sound. The execution is a
candidate arguing himself out of a job on his own About page. Nobody reading a portfolio wants a
list of what its author cannot do, bolded, above the fold.

The same reflex runs through the case studies: *"here is what these numbers do not prove"*, *"the
instrument that would have counted those users is the thing that was broken"*, *"I attribute this
directionally, not causally"*. Individually each is a good sentence. Collectively they read as
someone pre-emptively conceding every argument.

---

## Page by page

### Hero

- The headline is two sentences and nineteen words. It is a good line. It is also the *only* thing
  on the first screen with any weight.
- No visual on the right at 1440px except one bar chart, leaving roughly 500×400px of nothing.
- Three of the four things a founder wants — scale, domain, launches — are in a 16px paragraph
  below the fold on mobile.
- **What it needs:** an evidence panel. Numbers, product context, a surface that looks like a
  product rather than a document.

### Navigation

- Functional, and the mobile `Menu` + `Resume` is right.
- The wordmark is a plain 16px label; there is no active state, so on `/work` nothing indicates
  where you are.
- The sticky bar has a hairline and nothing else — it does not read as a designed component.
- The condense-on-scroll animates padding only, which is invisible in practice.

### Typography

**The single most damaging aesthetic decision in V1.** Mono is used for: every eyebrow, every
metric, every qualifier, every timeline row, every nav link on mobile, the tools line, the footer,
the section index, the status line, and both CTAs.

That is not "mono for data." That is a mono site with serif paragraphs. It reads as a terminal
crossed with an essay, and it signals *developer* or *writer* — not product.

The reading serif at 21px is genuinely good and should survive, scoped tighter.

### Colour

- The palette is fine and the contrast work is sound.
- Green is over-applied: links, metrics, arrows, CTAs, section markers, chosen rows, focus rings,
  progress bar, badges. When everything positive is green, green stops meaning anything.
- The correction red is now doing *two* jobs (mistakes and gaps) and the second one is 26× more
  frequent than the first, so red now reads as "incomplete" rather than "honest".

### Layout and spacing

- Section rhythm is 112px mobile / 192px desktop after the spacing correction — nearly double the
  60–80px a dense product site wants.
- Everything is the same shape: a left column of text, a right column of either one chart or
  nothing. Nine routes, one layout.
- No full-bleed section, no split composition, no image band, no grid of anything. The page never
  changes gear.

### Content and hierarchy

- Case studies run 1,700–2,100 words. The stated target was 900–1,300.
- `/approach` is 1,195 words of unbroken argument with no visual anchor at all.
- `/lab/grounded` is 1,566 words and the demo — the single most valuable thing on the site — sits
  above them, unheralded.
- Section headings are claims rather than labels, which is right, but there are eight per case
  study and they all have the same weight, so nothing leads.

### Case studies

- Structurally sound and genuinely well argued.
- **Two visuals per case study, both abstract.** No flow, no screen, no architecture, no funnel.
- The decision table is the strongest artifact on the site and it appears once, below 2,000px of
  prose.
- Ownership blocks are excellent and should survive V2 unchanged in substance.

### Product artifacts

Effectively zero. The `Drawer` component is well built and holds reasoning, not artifacts. That was
the honest call given no real exports exist — but "no fabricated screenshots" does not mean "no
visuals". Flows, architectures, funnels and decision matrices can all be drawn truthfully from what
the record supports.

### Mobile

- 6,512px homepage. Eleven screens.
- Nothing breaks — no overflow at 320px, and the nav is good.
- But it is the desktop layout stacked. The hero, the proof strip and the cards all become the same
  full-width text block, one after another, for eleven screens.

### CTA

- Two contact blocks were merged into one, which helped.
- "Read →" on a case card is weak. "Read the work ↓" scrolls rather than navigating.
- There is no single, obvious, high-contrast primary action anywhere on the site.

### The hiring-manager experience

Four reviews ran against V1. Three said yes. The reasons they said yes were, in every case, **the
writing** — not the design, not the evidence, not the product. The Head of Product's verdict was
*"yes to the reasoning, not the outcomes,"* and his level call was APM/PM I.

That is the ceiling V1 imposes: it is convincing about how this person thinks and unconvincing that
they have shipped anything.

---

## What survives into V2

Not everything here is wrong, and the rebuild should not discard:

1. **The ownership block** — I owned / We shipped / I did not own. Every reviewer called it out.
2. **The decision matrix** with reversibility as a column.
3. **The truth gate** and the content schema. The discipline stays; only its public rendering goes.
4. **The reading serif for long-form argument**, used far more sparingly.
5. **The honest framing of Grounded** — a real evaluator, a synthetic set, and the page saying so.
6. **Zero-client-JS architecture**, static routes, 100 accessibility.

## What V2 must do differently

| V1 | V2 |
|---|---|
| Prose is the evidence | The artifact is the evidence; prose annotates it |
| 62 words and 5 viewports on the homepage | Eight sections, each earning its screen |
| Bundle size in the hero | Users, engagement, launches, AI in the hero |
| 26 red gap markers in production | Zero. They live in `CONTENT_GAPS.md` |
| Mono everywhere | Sans for everything; mono for small metadata only |
| One layout, nine times | Split, full-bleed, grid, card, editorial — by section |
| Defensive About | Human About, limits stated once and without apology |
| Two abstract charts per case study | Flows, architectures, funnels, before/after, matrices |
