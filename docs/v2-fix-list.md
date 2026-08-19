# V2 fix list — synthesised from four independent reviews

Sources: `docs/v2-review-designer.md`, `docs/v2-review-head-of-product.md`, `docs/v2-review-ceo.md`,
`docs/v2-review-recruiter.md`. Screenshots reviewed: `docs/screenshots/iteration-v2-1/`.

**Read this first.** The working tree has moved since `iteration-v2-1` was captured. I verified every
item below against the code on disk today, not against the screenshots. Items marked **LANDED —
VERIFY** are already changed in the source and need a fresh screenshot run, not a rewrite. Items
marked **OPEN** are still present in the code as written. Do not re-fix a landed item; do not trust a
screenshot over the file.

Already landed since the screenshots, confirmed in source:
hero eyebrow no longer says "PRODUCT MANAGER" (`content/home.mdx:16`); the hero carries an
identification line — title, tenure, Noida, target roles, Email me (`content/home.mdx:22-26`,
`app/page.tsx:113-138`); the full name renders in the nav at every width (`components/layout/Nav.tsx:47-53`);
the footer no longer repeats the CTA pitch (`components/layout/Footer.tsx`); `MetricDelta` no longer
draws two equal bars for a null scale (`components/content/Metric.tsx:78-108`); the hero panel is
1-large + 3-small with the decorative green rules deleted (`components/home/HeroPanel.tsx`);
section rhythm is now 64/88px (`components/layout/Section.tsx:23`).

---

## 1. Every "no" and every failure

These are defects. They are not opinions and they are not scheduled against effort.

**Non-negotiable, and met.** No `NEEDS:` or `not stated` marker appears in any of the 90 screenshots.
All four reviewers checked independently; `grep -rI "NEEDS:\|not stated"` over the repo is clean;
`lib/content/schema.ts` and both build gates fail on one. **Keep this met.**

### Failed outright

| # | Failure | Who called it |
|---|---|---|
| F1 | The site publishes "Product Manager" as machine-readable fact in the page title, the OG share card, the site description and the About copy, while the record says Product Analyst | Recruiter (blocker 2), CEO (2b) |
| F2 | The flagship Lab demo is built on CSS tokens that no longer exist — it renders as a different, unstyled site | Designer (1g, §5, §9) |
| F3 | `/work`, `/lab` and the homepage publish the same content twice; the homepage repeats the `/about` timeline | Designer (1d), CEO (#2), Recruiter (page length) |
| F4 | The homepage renders two contact blocks back to back | Designer (1a), HoP (D1), CEO (2c), Recruiter |
| F5 | A bar chart drew a 15% lift as a 0.3% difference on the AI case — the AI PM differentiator | Designer (1b) |
| F6 | The same 15s datum renders red on one page and grey on another, with a row dropped between them | Designer (1c) |
| F7 | The decision table — the best artifact on the site — is squeezed into a 576px prose measure with ~550px empty on each side | Designer (§3, #5a), HoP (D4) |
| F8 | `/approach` has no visual anchor at all across 5,730px, with a 419px empty left column | Designer (#3), HoP (D3) |
| F9 | The Lab card ships a ~505×190px empty grey rectangle in production | Designer (1e) |
| F10 | Two of three case studies carry no timeline field, so velocity is unreadable | HoP (D5, §4) |
| F11 | Grounded leads with `2.62ms` / `0 server calls` — engineering vanity, which is V1's lead-metric sin in a new room | CEO (§4) |
| F12 | The 1M+ number never says where the users came from, so it deflates the moment the reader works it out | CEO (§5) |
| F13 | Green does seven jobs and means none of them | Designer (§6) |
| F14 | At 1024 the hero CTA row wraps 2+1 and orphans "LinkedIn ↗" | Designer (§2) |
| F15 | "isn't" renders with a straight apostrophe on home and a typographic one on about — same sentence | Designer (1f) |
| F16 | Three labels for one figure: "+20% app engagement" is captioned differently in the panel, the grid and the timeline | HoP (§7) |
| F17 | The mobile homepage is 12,773 CSS px — everything below screen 8 is unread by a real first visitor | CEO (§0), Recruiter |

### Passed, and must not regress

No gradients, glassmorphism, blobs, custom cursors, stock photos, fake screenshots, fake
testimonials, dark mode, excessive rules. Not Framer, not Webflow, not agency, not developer, not
resume-site. Sans-first system holds. Palette is disciplined. HoP checked the full constraint list
and passed it; designer confirmed every banned decoration is genuinely absent.

---

## 2. The ranked fix list

Ranked by hiring impact. Anything two or more reviewers raised independently is in Tier 0 or 1.

### Tier 0 — credibility. These cost him the job before anyone reads a case study.

**1. Purge "Product Manager" from every machine-readable surface. `OPEN`**
Two reviewers, and the code contains a comment in `app/layout.tsx:27-34` arguing that this exact
word is "the highest-consequence single word on the site" — thirty lines below a `<title>` that
publishes it.
- `app/layout.tsx:13` — `default: 'Aniket Agarwal — Product Manager, consumer health & applied AI'` → `Aniket Agarwal — Product at HCL Healthcare, consumer health & applied AI`. This is the browser tab, the Google result and the link-preview title on every page.
- `app/opengraph-image.tsx:9` — `eyebrow: 'Product Manager · Consumer · Health · Applied AI'` → match the hero: `Product Analyst · Consumer health · Applied AI`. This is the image the recruiter pastes into Slack; it is the single most-shared asset on the site.
- `lib/site.ts:13` — `role: 'Product Manager'` → `'Product Analyst'`.
- `lib/site.ts:21` — `defaultDescription` opens "Product Manager at HCL Healthcare" → "Product Analyst at HCL Healthcare, owning engagement on a consumer health app with 1M+ registered users."
- `app/about/page.tsx:17` — "product manager at HCL Healthcare" → "Product Analyst".
- `content/about.mdx:5` — "I'm a product manager working on consumer health" → "I'm a Product Analyst at HCL Healthcare, owning engagement on a consumer health app with 1M+ registered users."
Raised by: Recruiter (blocker 2 — "recruiters do not forward things that can embarrass them"), CEO (2b — "the most prominent one is the one that is not true").

**2. Rebuild Grounded on the live design system. `OPEN`**
`components/lab/GroundedDemo.tsx` is the only file in the codebase still referencing V1's deleted
tokens: `--color-rule`, `--color-rule-strong`, `--color-paper`, `--color-paper-raised`,
`--color-signal` (10 occurrences; none is defined in `app/globals.css`). Every border falls back to
currentColor, every panel background falls back to transparent, and the radius resolves to nothing —
which is exactly why `lab-grounded-1440.png` shows a square, borderless, terminal-looking panel that
does not belong to the rest of the site. Same file also uses `text-[var(--text-sm)]` where the whole
codebase uses `text-[length:var(--text-sm)]`, so the type sizes are not applying either.
Fix, in one pass over `components/lab/GroundedDemo.tsx`:
- `--color-rule` → `--color-line`, `--color-rule-strong` → `--color-line-strong`, `--color-paper` → `--color-canvas`, `--color-paper-raised` → `--color-surface`, `--color-signal` → `--color-accent`.
- All `text-[var(--text-*)]` → `text-[length:var(--text-*)]`.
- Add `rounded-[var(--radius)]` to the outer panel so it matches every other card.
- Style the `<select>` (line 79-93): `appearance-none`, a drawn chevron, and truncate the option label to `{c.id} · {CATEGORY_LABEL[...]}` — at 1440 it currently clips mid-word to "…plain reporti" with macOS chrome on the only interactive surface on the site.
- Set the verdict ("pass") as a sans status badge, and the rubric dimension labels in sans, keeping mono for values only.
Raised by: Designer (1g, §5, §9 — "one of those two is wrong"). This is the asset all four reviewers rate as the strongest evidence on the site, shipping broken.

**3. Confirm the duplicate contact block is gone, and keep one. `LANDED — VERIFY`**
All four reviewers called this. `components/layout/Footer.tsx` no longer carries the pitch headline;
the homepage keeps one CTA section (`app/page.tsx`, section 8). Two `CopyEmail` buttons still land
within ~400px of each other (CTA section then footer). Verify in a fresh `home-1440-full.png` and
`home-390-full.png`; if they still read as a repeat, drop `CopyEmail` from the footer and leave the
links and the byline. Raised by: Designer (1a), HoP (D1), CEO (2c), Recruiter.

**4. Make every chart encode its own numbers, in one palette. `PARTLY LANDED`**
- `MetricDelta` now falls back to a "Baseline → +15%" text row when one side has no parseable number (`components/content/Metric.tsx:78-108`). Verify against a fresh `work-ai-health-report-1440.png`; the screenshot shows a 673px bar against a 671px bar. `OPEN` question: `content/work/ai-health-report.mdx:27-29` still declares `before: Baseline / after: +15%`, which is not a comparison. Either give it a real pair or drop `headline` and let the two figures carry the panel.
- **Unify the "before" colour.** `components/diagrams/LaunchImpact.tsx:33` sets `tone: 'problem'` → `--color-flag` (#a4342c, red) for the 15s bar on the homepage and `/work`, while `components/content/Metric.tsx:83` draws the same 15s datum in `--color-line-strong` (#948f84, grey) on the case page. Pick neutral grey everywhere and reserve red for corrections: change `LaunchImpact.tsx:33` to drop `tone: 'problem'`.
- **Restore the dropped row.** The homepage card shows Before / Benchmark / Shipped; the case page shows two. Give `work/step-syncing` the same three-row `LaunchDurations` in its hero panel, or add the benchmark to both.
Raised by: Designer (1b, 1c, #2). The CEO independently named the benchmark row as the single best instinct on the page — do not lose it.

### Tier 1 — the ten seconds, and the second visit.

**5. De-duplicate the site. `OPEN`**
Three reviewers, three different framings, one cause: four content blocks are published twice.
- `app/page.tsx:192-202` (three full `CaseCard`s) vs `app/work/page.tsx:92-101` (the same three, same visuals, same copy). Homepage keeps the cards; **`/work` earns its click** by leading with the two short cases and a different frame — or the homepage drops to three compact rows (title, one-line result, link) at ~140px each instead of ~440px.
- `app/lab/page.tsx` is one card, a dashed "in progress" note and 1,783px, and it duplicates `app/page.tsx:290-341` verbatim including the H1 "What I build when nobody hands me a roadmap." **Redirect `/lab` → `/lab/grounded`** and point every link at the demo.
- `app/page.tsx:206-246` (experience `<ol>`) vs `app/about/page.tsx:107-114` (`<Experience />`). Homepage keeps three roles with dates only; `/about` keeps the full timeline.
Net on the homepage: roughly −1,800px, and every internal link acquires a reason to exist.
Raised by: Designer (1d), CEO (#2 — "cut the page to a third"), Recruiter (page length).

**6. Give the decision table the full width. `OPEN` — one line.**
`app/globals.css:310-317` already defines `.case-body > .decision-block { grid-column: 1 / -1 }`.
`components/content/DecisionTable.tsx:26` renders `<div className="my-5">` — the class is never
applied, so the rule has never fired and the table has always been trapped in the 36rem measure.
Change line 26 to `<div className="decision-block my-5">`. That alone takes it from 570px to the full
column and stops "Ship the engagement roadmap as written" wrapping to four lines.
Raised by: Designer (§3, #5a), HoP (D4). Both call it the best artifact on the site.

**7. Rebuild `/approach` around its own evidence. `OPEN`**
`app/approach/page.tsx` renders the MDX into `.approach-body .case-body` with no rail and no
figures; `content/approach.mdx` contains seven headings and zero components. Two moves:
- (a) Add a sticky left index rail carrying the four principle numbers (`app/approach/page.tsx:42-46` plus a `.approach-body` grid rule in `app/globals.css:388-416`), so the empty 419px band holds navigation and the H1 and the body finally share a left edge.
- (b) Pull one artifact into each principle in `content/approach.mdx` — principle 01 gets `<LaunchDurations />`, 03 gets the `<DecisionTable />` rows, 04 gets the 3.5→7.8 chart. All three components exist and are already registered in `lib/content/mdx.tsx`.
Raised by: Designer (#3 — "indistinguishable from any thoughtful person's Substack"), HoP (D3 — "the best sustained writing on the site and the least likely to be read"). **Do not cut the argument.** See §3.A.

**8. Give Grounded a finding instead of a latency. `OPEN`**
`app/page.tsx:322-335` and `app/lab/page.tsx:62-76` both render `Cases in the set / Scored
dimensions / Full run 2.62ms / Server calls 0`. Replace the last two tiles with what the harness
caught, read from `public/grounded-baseline.json` (`baseline.stats`, `baseline.agreement`) — how many
of the 16 failed the rubric and which dimension failed most. One line of "11 of 16 passed; the five
that failed all invented a normal range" makes this the second-strongest thing on the site.
Raised by: CEO (§4 — "as shipped it is a demo bragging about its latency"), and it is the same
class of defect V1 was torn down for.

**9. Fix the Lab card's empty grey rectangle. `OPEN`**
`app/page.tsx:322` and `app/lab/page.tsx:62`: the stats `<dl>` uses `content-start` inside a stretched
grid column whose background is `--color-line`, so the unfilled remainder renders as a flat filled
panel with nothing in it. Drop `content-start`, or add `self-start` to the `<dl>` so the card ends
where the content ends. Raised by: Designer (1e).

**10. Delete the tool-chip cloud from the homepage. `OPEN`**
`app/page.tsx:369-378` renders ten identical pills. Keep the one in the `/about` sidebar
(`app/about/page.tsx:88-101`) where a recruiter is actually filtering; delete it from the homepage.
Raised by: CEO (weakest single element on the page), Designer (§4, third most generic thing on the site).

**11. Unify the "+20% app engagement" caption. `OPEN`**
Three labels for one figure: `content/home.mdx:38-40` ("Within twelve weeks"),
`content/home.mdx:56-57` ("An engagement suite spanning challenges, streaks, live events and
trackers, shipped over twelve weeks"), `lib/site.ts:49` ("lifting daily actives 20% within twelve
weeks"). Pick the resume's own wording — daily actives, +20%, twelve weeks — and use it in all three.
Raised by: HoP (§7, the one number he discounts to zero specifically because the site cannot agree
what it means).

### Tier 2 — craft. These are what separate "competent" from "premium".

**12. Take green down to two jobs. `OPEN`** — 21 discrete green bands per homepage. Keep: links, and
one positive-outcome state. Move the principle ordinals (`app/page.tsx:264`) and the `/approach`
counters (`app/globals.css:402`) to `--color-muted`; bullets to `--color-line-strong`; the "Current"
dot (`app/page.tsx:230`) and the hero panel dot to neutral with a text label. Designer (§6).

**13. Two measures, one left edge. `OPEN`** — `work-step-syncing-1440-full.png` uses three
unrelated left edges (x=157 cards, x=233 callout, x=419 prose). Define `--measure-wide` and
`--measure-read` in `app/globals.css` and give them the same left edge; `Callout` and
`OwnershipBlock` pick one. Designer (§7 — "the single most amateur signal on the site").

**14. Unbox the four principle cards. `OPEN`** — `app/page.tsx:263` renders four `.card` boxes whose
content is editorial paragraphs, not discrete objects. Same content on the page background with
hairline separators removes four of nine boxes on the homepage. Designer (§9).

**15. `home-1024` orphans "LinkedIn ↗". `OPEN`** — `app/page.tsx:96-109`. Either keep the row on one
line with the tertiary link allowed to shrink, or break it deliberately at a defined breakpoint.
Designer (§2).

**16. One quote pass. `OPEN`** — `content/home.mdx:18` "isn't" (straight) vs `app/about/page.tsx:57`
`isn&rsquo;t`. Same sentence, two glyphs. Run one pass over `content/**`. Designer (1f).

**17. Retitle the Experience section. `OPEN`** — `app/page.tsx:212` reads "Four years of product work,
one of them owning a surface." HoP: the site level-sets him before anyone asked. Recruiter: the
tenure fact belongs on the first screen, where it now is (`content/home.mdx:24`). Retitle to
"Where I have worked." and let the roles carry it. HoP (§3), Recruiter (fact 2).

---

## 3. Disagreements, and how they are settled

**A. `/approach`: delete it, or rebuild it?**
Designer calls it the most generic screen on the site and the worst offender for emptiness. HoP calls
it "the best sustained writing on the site." CEO never reached it. **Arbitration: rebuild, do not
cut.** They are describing different objects — the designer is judging the layout, the HoP the prose.
Fix #7 changes the container and adds the artifacts; not one sentence of `content/approach.mdx` gets
deleted for length. If it is still an essay after the rail and the three figures land, revisit.

**B. Page length: cut to a third, or dedupe?**
CEO wants 8,000px from 25,546px raw. Designer wants ~1,800px of duplication removed. HoP wants *more*
evidence, not less. **Arbitration: delete duplication, never unique evidence.** Fix #5 plus fix #17
gets the desktop homepage under ~6,500px CSS and mobile under ~9,000px. That is not the CEO's third,
and the CEO's third would have deleted the experience timeline the recruiter needs and the "How I
work" cards the HoP reads as judgment. Target the number by removing repeats.

**C. Is the H1 the right use of the biggest type?**
Recruiter calls it a blocker — "a philosophy, not an identification". Designer calls it "the best
thing on the site". CEO calls the thesis "correct for a seed-stage hire". **Arbitration: 3–1, keep the
H1 exactly as it is.** The recruiter's real complaint is routing, and routing is now solved by the
identification line under the button row (`content/home.mdx:22-26`) — name, real title, tenure,
Noida, target roles, email, all above the fold at 390px. Do not shrink the headline.

**D. Should the hero panel show a product surface?**
Designer wants "a small, honestly-drawn frame of the AI Smart Health Report" in the panel. HoP's #1
missing item is "any evidence the product exists". The owner bans fake screenshots and
`CONTENT_GAPS.md` D4 requires every reconstructed diagram to be labelled as one. **Arbitration:
allowed — but only with components already on the site and already labelled.** Put the real
`<LaunchDurations />` bars in the panel if anything goes there. **Never draw an app UI, a device
frame, or a mock report screen.** A drawn "product surface" that looks like a screenshot is the
banned thing, whatever we call it in the commit message.

**E. Is "+20% engagement" worth keeping in the hero?**
HoP discounts it to zero. No one else objects. **Arbitration: keep the figure, fix the caption**
(#11). It is in the resume, it is bounded by twelve weeks, and removing an evidenced number to
pre-empt one skeptical reader costs more than it saves. The defect is that the site says it three
different ways, not that it says it.

**F. Tool chips: delete or keep?**
CEO says delete outright; designer says it is the least differentiating content rendered as a design
element; recruiter never mentions them. **Arbitration: delete from the homepage, keep on `/about`.**
The homepage is arguing; the About sidebar is filtering, and a recruiter genuinely scans for SQL and
Mixpanel there.

**G. Is LinkedIn under-weighted?**
Recruiter says it is demoted to a footnote; designer says at 1024 it orphans onto its own line. Both
observations pre-date the current code, where it is a `Button variant="secondary" size="large"`
(`app/page.tsx:106-108`). **Arbitration: no promotion needed — fix the 1024 wrap only** (#15).

---

## 4. Flagged, and deliberately NOT fixed

Everything in this section is a fact that does not exist in the source record. It is answered by
`CONTENT_GAPS.md`, not by code. **None of it may be written, drawn, mocked or inferred into the site.**

| Request | Raised by | Why it is not a code fix |
|---|---|---|
| A real product screenshot of the app | HoP (§8.1, "the single biggest gap"), CEO (#10) | No asset exists, and the owner bans fake screenshots. `CONTENT_GAPS.md` §5 already asks Aniket for one anonymised screen; the `Drawer` component is built to receive it. Until it arrives, the labelled diagrams stay. |
| Anything after the launch window — month-three retention, D7/D30, season two | HoP (§8.2), HoP (§4) | Not in the record. Inventing a durability number is the worst possible failure on a site whose thesis is bounded claims. |
| A stakeholder who disagreed, escalated, or took a decision away | HoP (§3, §8.3 — "what currently caps him at APM") | `CONTENT_GAPS.md` §2 already names this as the single highest-leverage addition available. It is two sentences from Aniket and zero lines of code. |
| Timelines for Steps Premier League and AI Health Report | HoP (D5) | `content/work/*.mdx` omits `timeline` because the record has none. Do not estimate one. The field renders conditionally (`app/work/[slug]/page.tsx:49-54`), so it appears the day Aniket supplies it. |
| Team shape — how many engineers, was there a designer | CEO (#6), HoP (§8.3) | `CONTENT_GAPS.md` §3. Not in the record. |
| p50/p90, device tier, denominators, "15% of which revenue line" | HoP (§4, ×3) | `CONTENT_GAPS.md` "Metrics that need a denominator" logs every one. The site already ships the conservative reading. |
| A redacted PRD or roadmap artifact | HoP (§8.4) | `CONTENT_GAPS.md` §5. Aniket's to supply. |
| "The million users arrived through employer contracts" in the hero | CEO (§5 — "the biggest upside on the page") | **The best content idea in all four reviews, and it is an inference.** The CEO deduced it from "HCL Healthcare" + "5+ enterprise closes". It is very probably right and it is not in the record. Add it to `CONTENT_GAPS.md` as a one-question ask; ship the two sentences the day Aniket confirms, and not before. |
| Describe Grounded's set as hand-labelled | — | `CONTENT_GAPS.md` §7 and the page itself already say it is not. |
| Soften the ownership hedging | HoP (§3, "hedged past the point of usefulness") | Do not touch. Three reviewers rate the bounded claims as the most credible thing on the site. The HoP's actual point is that the *authority* claim is unbounded — which is an interview answer, not a copy edit. |
| Delete the Experience timeline and "How I work" from the homepage | CEO (#2) | Rejected as written; see §3.B. Compressed, not deleted — the recruiter needs the tenure signal and the HoP reads the principles as judgment. |

---

## 5. The three things all four reviewers praised — protect these

1. **The 15s → 2s story, and the to-scale Before / Benchmark / Shipped chart.** CEO: "the fifteen-second
   guy… the only honest visual on the page", and singles out naming the benchmark as "a PM instinct,
   not a designer one". HoP takes it at face value where he discounts everything else. Designer
   verified the geometry is correct (3.5min=307px, 7.8min=685px, true ratio). Recruiter puts it in the
   Slack paste. `components/diagrams/LaunchImpact.tsx`, `components/diagrams/Flow.tsx` —
   **do not restyle the benchmark row out of existence while unifying the palette.**

2. **I OWNED / WE SHIPPED / I DID NOT OWN, and the bounded claims.** HoP: "the most credible thing on
   the site… not inflated, this is the correct shape". CEO: "I built the artifact; I did not own the
   sale" is "the single most hireable line on the site". Designer: "no template produces this — the
   most distinctive thing on the site." `components/content/OwnershipBlock.tsx`. Promote it, do not
   soften it, do not turn it into a paragraph.

3. **The hero's ten seconds: the H1, the proof panel, and the warm sans system.** HoP: clears the
   ten-second bar on who / what / domain / scale / evidence "without scrolling", where V1 needed
   4,987px for 62 words. Recruiter: domain and product scope are the two strongest facts on the page,
   and the proof panel "is the only block that would survive being screenshotted into Slack". CEO:
   "the order is right… V1 did not have it." Designer: the 92px grotesque is "the best thing on the
   site". `app/page.tsx:77-143`, `components/home/HeroPanel.tsx`, `app/globals.css`.

Fourth, and structural: **zero internal QA markers, enforced at build time.** All four reviewers
checked it independently and all four passed it. `lib/content/schema.ts`, `scripts/check-truth.ts`,
`scripts/validate-content.ts` — never weaken these gates.

---

## 6. Order of execution

1. Fixes 1, 2, 6, 9, 16 — mechanical, no content decisions, all verifiable by grep. Half a day.
2. Fixes 4, 11, 17, 10, 8 — content and token unification.
3. Fix 5 — the IA change. Touches four routes; do it in one pass.
4. Fix 7 — `/approach`. The largest single piece of work here.
5. Fixes 12–15 — craft pass.
6. Re-screenshot into `docs/screenshots/iteration-v2-2/` **before** any further review. Four of the
   defects in the source reviews are already fixed on disk and would be re-reported against stale PNGs.
