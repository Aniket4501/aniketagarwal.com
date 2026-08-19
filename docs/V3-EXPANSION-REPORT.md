# Expansion round 2 — final report

**Live:** https://aniketagarwal-com.vercel.app · **Date:** 19 Aug 2026 · **Screenshots:** `docs/screenshots/iteration-v3/` (120 files, 12 routes × 8 widths)

---

## 1. What was added, route by route

| Route | What it is | Status |
|---|---|---|
| `/thinking` | New index. Two pieces, with the disclaimer above the cards rather than inside them | **New** |
| `/thinking/strava-free-tier` | Product teardown, ~1,100 words of body. Built only on the App Store listing, the subscribe flow and Strava's own help centre, all read 19 Aug | **New** |
| `/thinking/abdm-manual-logging` | Market thesis, ~1,100 words. Evidence from ABDM's public dashboard, with the counterargument section running longer than the argument | **New** |
| `/approach` | Gains the rejected roadmap — shipped / deferred / won't-have, drawn only from decisions in the record. Loses the ABDM section (now a full page) and "the first five numbers" (cut, §2) | Changed |
| `/work/steps-premier-league` | Gains a standings reconstruction drawn from seventh of eight, and a guardrail table. The results section now says session time is the wrong north star, beside the number rather than 400 words later | Changed |
| `/work/ai-health-report` | Gains a report-page reconstruction showing the register break between interpretation and commercial ask | Changed |
| `/work/step-syncing` | Gains a visible metric-definition section: three defensible denominators for "step-sync completion", scored on which one my own intervention would inflate | Changed |
| `/lab/grounded` | Gains a regression diff. Rules v1 is executable code again, and both rubrics re-run over all 16 cases at build time | Changed |
| `/` | Identification moved above the CTA row; a link line to `/thinking` inside "How I work". No new section | Changed |
| `/about`, `/work` | Unchanged | — |

**Infrastructure:** `scripts/check-links.mts` (external link sweep that refuses to treat LinkedIn's HTTP 999 as a pass), a GitHub Actions workflow running the full gate chain, `.scratch/zoom.mts` (100%/200% zoom sweep), and `remark-smartypants` plus truth-rule `T01` so punctuation stops drifting.

---

## 2. What was NOT added, and why

**A fourth case study.** The existing three exhaust the material worth a thousand words each. A thinner fourth would have lowered the average, which is the failure mode this round was briefed against.

**"The first five numbers I would instrument" — built, then cut.** It was five numbers with no product, no population and no consequence, on a site whose stated rule is that a number without a population is a claim. Worse, it answered the "one employer, one surface" objection with a hypothetical, which demonstrates the objection rather than rebutting it. A reviewer called it the weakest new piece and said cut rather than fix. Agreed.

**A second Lab tool.** The brief allowed one "only if it emerges naturally from real work." Nothing did. Inventing one to fill a grid is exactly what this round was warned about.

**The before/after splash reconstruction.** A splash screen's content is not the argument — its duration is — and duration cannot be drawn in a static frame. The to-scale duration chart already carries it.

**Testimonials.** No quote exists in any source, and the LinkedIn export contains no recommendations. Nothing was written. A placeholder testimonial, even marked as an example, is the one thing this build will not produce.

**The photograph.** See §4.

---

## 3. Two things I got wrong, and how they were caught

Both were found by the review agents and **both were verified independently before I acted** — the first by reading Strava's help centre myself, the second by re-running the evaluator.

### The teardown's central claim was false

The first version said segment leaderboards and Group Challenges are *"the two mechanics in the entire product"* that create a reason to return, and its lead proposal was to give Group Challenges away.

Strava runs two different things called challenges. **Group Challenges** are private, invite-based and subscriber-only. **Strava's public Challenges** are a separate product, are not listed among subscription features, and athletes are automatically entered into segment challenges by riding the segment. So the free tier already has a time-boxed goal, and my lead proposal was "ship what already ships."

It was checkable in two clicks on the help centre the piece was already citing. That is a verification failure, not a reasoning failure, and it is the more embarrassing of the two.

**Rewritten** around the claim that survives checking: *a public challenge compares you to a number; a segment leaderboard compares you to a named person on a road you actually ride* — and that, plus every filter that makes the comparison bearable, is the paid half. **Strava gives away the goal and sells the rivalry.** The piece now also commits to not reasoning past the fence it drew around the signed-in experience.

### The regression diff proved less than it claimed

Rules v1 returns `fail` on all sixteen cases. Therefore its "11/16 agreement" is exactly the share of fail-labels in the set — a stub that always answered "fail" scores identically — and "0 regressions" was **structurally guaranteed**, because no case could move pass→fail.

The table now says this itself, in flag colour, above the rows. The honest payload is one fact: v2 fixed five false failures and introduced none.

---

## 4. Every image, and what was redacted

**No photographic image ships on this site.** There are no screenshots, no stock photos, no generated images.

| Asset | Real or reconstructed | Redactions |
|---|---|---|
| League standings | **Reconstructed** in React from the site's own tokens | All eight names invented, all step counts invented, league name is the one in the résumé, no real user |
| Report results page | **Reconstructed** | All four analytes and values invented; two deliberately out of range because that is where the design constraint is tested. Reference intervals are standard published adult intervals |
| Every diagram | Illustrative, labelled as such | No real data |
| OG cards (6 routes) | Generated from route text at build time | — |

**The photograph in the repo was found and not shipped.** `Image (2) copy.png` is a headshot of Aniket. It is off the site for two independent reasons, either sufficient:

1. **It carries an AI-generation sparkle badge in the lower-right corner**, and the rendering has the signature of an AI headshot generator. On a site whose entire argument is *nothing here is fabricated*, the one photograph being synthetic is the cheapest possible way to lose that argument.
2. **It is a blazer-and-glass-office corporate headshot** — precisely the register the brief rules out.

`[NEEDS: one real photograph — natural light, plain background, no blazer. A phone camera is fine.]`

---

## 5. Lighthouse, before and after

Both sweeps run against production.

Mobile performance, before this round → after it, with the final sweep taken after the LCP fix:

| Route | Before | After | Desktop |
|---|---|---|---|
| `/` | 97 | **98–99** | 100 |
| `/work` | 99 | **100** | 100 |
| `/work/step-syncing` | 99 | 98 | 100 |
| `/work/steps-premier-league` | 100 | **100** | 100 |
| `/work/ai-health-report` | 100 | 99 | 100 |
| `/thinking/strava-free-tier` | — | **100** | 100 |
| `/approach` | 100 | **100** | 100 |
| `/lab/grounded` | 97 | 96 | 100 |
| `/about` | 97 | **100** | 100 |

The homepage reads 97 in the batch sweep and 99 / 98 / 98 across three isolated runs; the batch
figure is depressed by concurrent Lighthouse instances hitting the same host. Both numbers are
printed here rather than only the flattering one.

Eight of nine mobile routes are at or above the 98 target. `/lab/grounded` is the exception at 96 —
it is the one route that ships client JavaScript (6.5KB for the live demo) and its LCP lands at
2.3s. That is the cost of the page having something to run, and I would not trade the demo for two
Lighthouse points.

**Accessibility 100, Best Practices 100, SEO 100, CLS 0 on every route, both form factors.**

**One regression found and fixed.** The homepage sat at 96–97 against the ≥98 target, LCP-bound. Cause: the hero headline is the LCP element and it carried the site's own `animate-rise` entrance, which starts at `opacity: 0` and runs 420ms behind a 60ms delay. LCP is recorded when the element is actually visible, so the animation was pushing it back by close to half a second. Removed from the three above-fold text elements; motion below the fold is untouched. Three confirmation runs: **99, 98, 98.**

**One false alarm.** The first sweep reported `/work/ai-health-report` SEO 92. Two isolated re-runs returned 100. It was a flake under concurrent load, not a regression — reported here because a number that moved and was not explained is worse than one that never moved.

---

## 6. The hiring-manager verdict: more evidence, or more content?

Three of four passes completed; the visual-QA agent stalled and its findings are not represented here.

**The verdict was "more evidence, narrowly — and the evidence-to-word ratio got worse."** Both the Head of Product and the CEO independently ranked the new work the same way:

- **Strongest:** the metric-definition work, the report-page reconstruction, the ABDM division, and the regression view's admission that two of five cases closed by moving the *label* toward the harness.
- **Weakest:** "the first five numbers" (cut), and the rejected roadmap (kept — the premise is right and the confession about who objected is honest, even if the artifact is half of one).

Both flagged the same structural problem, and it is now the site's largest: **nobody else appears anywhere on it.** Not one named counterparty, not one argument he lost to a person. Every disagreement published is between Aniket and his past self. That register is rare and genuinely good, and it is structurally incapable of showing he has survived a disagreement with a living, funded, unreasonable colleague — which is most of the job. The Strava teardown even *invents* its opposition.

They also caught something I had missed: the site now dissects a 4.3-minute session-time delta in several places and says **nothing** about the +20% DAU claim, which has no case study, no caveat and no attribution boundary. That asymmetry is where a reviewer said they would attack.

Acted on: the teardown correction, the regression disclosure, the fold reorder, the cut, promoting the metric-definition work out of a collapsed disclosure, four de-duplications, and the `0 hand-labelled` / `readability 100 / 70` / invisible-link / stale-tenure bugs.

---

## 7. The single highest-value thing still missing

**One decision where a named person disagreed with you, and what happened next.**

It outranks the retention number, the redacted PRD and the denominators, because those three make the existing claims stronger while this one closes a hole the site cannot close by writing more. Every additional page in the current register makes the absence more conspicuous, not less.

Two sentences would do it: who pushed back, on what grounds, how it resolved. It is now `B0` in `CONTENT_GAPS.md`.

---

## 8. Where things live

| | |
|---|---|
| Evidence audit — what rests on prose alone | `docs/11-evidence-audit.md` |
| Missing facts, blocking first, each a specific question | `CONTENT_GAPS.md` |
| Arbitrations, including this round's IA calls | `docs/DECISIONS.md` (D39–D41) |
| V2 close-out, all seventeen defects | `docs/v2-fix-list.md` |
| Current screenshots | `docs/screenshots/iteration-v3/` |
