# V2 — final report

**Live:** https://aniketagarwal-com.vercel.app · **Commit:** `a53c745` · **Date:** 19 Aug 2026

---

## 1. What changed, and why

V1 was functional and it was the wrong product. The teardown is in
`docs/current-site-critique.md`; the short version is five failures.

1. **It showed no product anywhere.** Nine routes, zero flows, zero screens, zero funnels, zero
   architectures. A product portfolio that contains no product is an essay collection.
2. **The homepage was 4,987px tall carrying 62 words.** Whitespace was doing the work that evidence
   should have been doing.
3. **It led with a bundle size.** The first number a Head of Product met was an engineering stat.
4. **It published 26 internal QA markers in production, in red.** `NEEDS: population`, `not stated`.
   Content validation is a build concern; it was on the site.
5. **It argued against itself.** `/about` bolded *"I have never owned acquisition"* and followed with
   *"If that is the job, I am not yet the person for it."*

V2 is a different site. Same facts, opposite posture.

| | V1 | V2 |
|---|---|---|
| Product artifacts | 0 | 11 (flows, funnels, to-scale charts, a decision matrix, a pipeline, a live demo) |
| Internal QA markers in production | 26 | 0, and the build now fails on one |
| Homepage words above the fold | 62 | 63 words of claim + a five-figure evidence panel |
| Mobile homepage | 12,773px (V2 iteration 1) | 11,278px |
| Routes | 10 | 9 (the `/lab` index was a click-tax and is gone) |
| Register | Editorial, serif-forward, defensive | Sans-first, product-surface, declarative |

## 2. The evidence discipline

This is the part that is not visible and is the reason the site is trustworthy.

**Nothing on this site was invented.** Every company, title, date, metric, population and outcome
traces to one of four sources logged in `docs/00-source-facts.md`. Where two sources conflicted, the
more conservative version shipped and the conflict is recorded in `CONTENT_GAPS.md` — nine of them.

Three mechanisms enforce it, and all three fail the build rather than warn:

- **`lib/content/schema.ts`** — a Zod layer used as an enforcement mechanism, not a convenience.
  `notOwned` is a required, non-empty array: *"A case study that cannot state what it did not own
  does not ship."* Every string field is wrapped in a refinement that rejects `[NEEDS:` outright.
- **`scripts/check-truth.ts`** — 22 patterns across 76 files, catching invented-number shapes,
  unqualified superlatives and the QA-marker syntax.
- **`scripts/validate-content.ts`** — 9 content files, 0 internal markers, hard error on a leak.

**What this cost, honestly.** Six of the nine diagrams originally planned were cut because 90% of
each one's area would have been invented: a delivery waterfall needs per-phase timings, a treemap
needs composition, a cohort curve needs retention values. None of those exist in the record. The
positioning noun is "engagement" rather than "retention" for the same reason — no retention metric
exists. Two of three case studies carry no timeline, and that gap is published as a gap rather than
filled with a plausible number.

`docs/DECISIONS.md` holds 38+ arbitrations of this kind.

## 3. The four reviews, and what they found

Reviews are in `docs/v2-review-{designer,head-of-product,ceo,recruiter}.md`. They produced 17
distinct defects, synthesised and closed out in `docs/v2-fix-list.md`. **Sixteen are fixed. One
cannot be.**

The three that mattered most:

**The title contradiction (recruiter blocker).** The site published "Product Manager" as
machine-readable fact — page title, OG share card, site description, About copy — while the record
says Product Analyst. The recruiter's verdict was the sharp one: *"If I forward it as PM-ready and my
hiring manager scrolls to 11,550px and reads 'Product Analyst,' I look like I did not read the
material."* Both facts are now stated together, in the candidate's own voice: the title is Product
Analyst, the scope is a PM's.

**The demo rendered unstyled.** `GroundedDemo` — the flagship artifact, the only page with something
to run — was bound to five CSS tokens deleted during the V2 system rewrite. In production it looked
like a different, broken site. Found by the designer, fixed, re-verified.

**The recruiter's Slack message had no name in it.** Written from the first screen exactly as
briefed, it read *"Product at HCL Healthcare since Oct 2024 — owns engagement on a consumer health
app with 1M+ registered users…"*, and there was no way to write "Hey, take a look at ___" without
opening a second tab. The header carried a monogram only. The name now renders at every width, and
the hero carries an identification line: title, employer, tenure, Noida, target roles, email.

**F10 stays open.** Two case studies have no timeline because the record does not state one. It is
ranked in `CONTENT_GAPS.md` as the highest-value missing fact. Inventing dates is the one thing this
build will not do.

## 4. Gates — all green on the deployed build

```
typecheck          clean (TS strict + noUncheckedIndexedAccess)
lint               clean (--max-warnings 0)
truth gate         OK — 22 patterns across 76 files
content            OK — 9 files, 0 internal markers
budget             OK — 145 KB first-load worst case, 136.3 KB framework floor
axe + structural   clean across 9 routes
horizontal scroll  none at 320 / 375 / 390 / 430 / 768 / 1024 / 1440 / 1920
golden set         16/16 verdicts, 16/16 dimensions
```

Lighthouse, run against production:

| | perf | a11y | best practices | SEO | CLS |
|---|---|---|---|---|---|
| Mobile | 97–100 | 100 | 100 | 100 | 0 |
| Desktop | 100 | 100 | 100 | 100 | 0 |

Every route, both form factors. Full table in `docs/lighthouse/summary.json`.

## 5. What I would push on next

1. **Get the two missing timelines.** Velocity is the one dimension a Head of Product reads that this
   site currently cannot answer, and it is a two-minute answer from the user, not a build problem.
2. **Decide on mobile length.** 11,278px is thirteen screens. Every further cut costs evidence — the
   2,847px of case cards is the densest, best part of the page. That trade is the user's call.
3. **Point a real domain at it.** `aniketagarwal-com.vercel.app` works; `aniketagarwal.com` reads
   better on a résumé.

## 6. Where things live

| | |
|---|---|
| V1 teardown | `docs/current-site-critique.md` |
| Source facts and provenance | `docs/00-source-facts.md` |
| Every arbitration made under uncertainty | `docs/DECISIONS.md` |
| Missing facts, ranked, with conflicts | `CONTENT_GAPS.md` |
| The four reviews | `docs/v2-review-*.md` |
| 17 defects, closed out one by one | `docs/v2-fix-list.md` |
| Current screenshots (90, all widths) | `docs/screenshots/iteration-v2-2/` |
