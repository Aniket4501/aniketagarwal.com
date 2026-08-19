# Evidence audit — the three case studies

What each case study asserts, and what is actually behind the assertion. Written against the tree on
19 Aug 2026, before the expansion round adds anything.

The point of this document is to separate three things the site currently renders identically:
a claim backed by a number, a claim backed by a diagram I drew, and a claim backed by nothing but a
confident sentence. All three read the same in a well-set paragraph. Only the first two are evidence.

**Sources referenced below:**
`R` = `Aniket_s_PM_Resume.pdf` · `L` = `Profile.pdf` (LinkedIn export) · `D` = the user's own V2
statement · `S` = `portfolio-strategy-aniket-agarwal.md`. **S is a recommendation document, not a
record.** It proposes what the case studies *should* say. `docs/01b-truth-audit.md` found 60+ claims
in it that appear in neither R nor L. Nothing on the site may rest on S alone.

---

## A. Claims resting on prose alone

Ranked by how much weight the claim carries.

### Step Syncing

| Claim | Backing today | What would back it |
|---|---|---|
| "I reclassified launch time from an engineering backlog item into a product requirement" — the central ownership claim of the case | Prose only. R says "Diagnosed app performance as critical adoption blocker" and "led cross-functional initiative", which supports diagnosis and leadership but not the reclassification narrative | One page of the roadmap or a PRD showing latency entered as a requirement with a ceiling |
| "held my own roadmap for eight weeks" | Prose only. R gives the 8 weeks; it does not say a roadmap was held | The same artifact, or a sprint board showing deferred items |
| "a two-second benchmark" — used as the comparison bar in the headline chart | R states "15s launch time vs. 2s benchmark". The benchmark's *provenance* — who set it, against what — is not stated anywhere | One line on where the 2s came from: an internal target, a Play Console percentile, a competitor teardown |
| The `LaunchJourney` flow | A diagram I drew from the prose. It is labelled illustrative, correctly | A real before/after screen recording, or the splash screens |

### Steps Premier League

| Claim | Backing today | What would back it |
|---|---|---|
| "Cohort analysis put a drop-off on the table" | R: "Conducted cohort analysis". The *existence* of the analysis is on the record; **its output is not** — no drop-off shape, no week, no magnitude, no N | The cohort chart itself, redacted. This is the single highest-value missing artifact on the site |
| "Three strategies were live options… appetite for roughly one" | R lists the three strategies evaluated. "Appetite for roughly one" is from S, which is advice, not record | Anything showing the budget constraint. Otherwise this sentence should soften |
| "the only one of the three whose cost is the mechanic rather than the fuel" | Reasoning, not measurement. Sound reasoning, but it is an argument | Nothing needed — it is honestly presented as judgement. Flagged so it is not mistaken for a finding |
| `StrategySpread`, `LeagueLoop` | Diagrams drawn from prose, labelled illustrative | A real standings screenshot would do more than both combined |

### AI Smart Health Report

| Claim | Backing today | What would back it |
|---|---|---|
| "a generated health report people could actually read" — the readability claim in the outcome line | **Nothing.** No readability score, no comprehension test, no user quote. This is the weakest-backed headline claim on the site | One page of the report, redacted. Or a Flesch score. Or one line from a user |
| "designed the report as a product with three audiences" | Prose only, though R supports the components (requirements, UX flow, personalisation logic, cross-sell hooks) | The `ThreeParties` diagram already carries the structure; a redacted PRD page would close it |
| "15% incremental revenue" | R states it verbatim | Denominator — see section B |
| "key USP in five enterprise closes" | R states "key USP in closing 5+ enterprise clients" | Nothing further. Correctly attributed as not-owned |

---

## B. Metrics missing a denominator, timeframe, or method

The site's own rule is `BEFORE → AFTER · population · timeframe · method`. Measured against it:

| Metric | Before/after | Population | Timeframe | Method | Verdict |
|---|---|---|---|---|---|
| App bundle 25MB → 6MB | yes | n/a — a build artifact, not a user metric | 8 weeks | stated totals | **Complete.** The strongest number on the site |
| Launch time 15s → under 2s | yes, as a bound | not stated — which devices? | 8 weeks | not stated | Population missing. The case study says so, and explains why a mean would mislead |
| Step-sync completion +35% | after only | not stated | not stated | not stated | **Three of four missing.** Carried on the homepage proof panel |
| Session time 3.5 → 7.8 min | yes | not stated | not stated | not stated | Population and timeframe missing |
| Incremental revenue 15% | after only | not stated — 15% of what line? | not stated | not stated | **The vaguest number on the site.** "15%" with no base |
| Daily actives +20% | after only | not stated | 12 weeks ✓ | not stated | Timeframe present, rest missing |
| 1M+ registered users | n/a | it *is* the population | n/a | registration count | Complete, and correctly labelled registered rather than active |
| Enterprise closes 5+ | n/a | n/a | not stated | n/a | Fine as a count; ownership correctly disclaimed |

**Pattern.** Every figure the record states as a bare percentage is missing its base, because the
record states it as a bare percentage. This is not fixable by writing; it needs the user to supply
denominators. Ranked in `CONTENT_GAPS.md`.

---

## C. Drawers that contain reasoning but no artifact

All six drawers currently hold reasoning. That was a deliberate V2 choice and it is better than an
empty drawer, but the brief is right that a document beats an argument.

| Case | Drawer | Contains | Would be better as |
|---|---|---|---|
| step-syncing | "Why you cannot A/B test a latency fix" | Genuinely good methodological reasoning. Stands on its own | Keep as is — this one earns its place without an artifact |
| step-syncing | "Why a mean launch time is the wrong statistic" | Reasoning | A percentile table from the real data, even redacted |
| steps-premier-league | "Why the phone already having the data is the whole opportunity" | Reasoning | Keep — it is an insight, not a claim needing proof |
| steps-premier-league | "What a standings table costs the person in last place" | Reasoning, and the most senior paragraph on the site | Keep |
| ai-health-report | "Where a commercial ask can and cannot sit" | Reasoning about a design constraint | One redacted report page showing the register separation would prove it in one glance |
| ai-health-report | "The question an AI PM will ask, and where my answer stops" | Reasoning, plus a pointer to Grounded | Keep — the artifact is the Lab tool, and it is real |

**Verdict: 4 of 6 drawers are correctly reasoning-only.** Two would be materially stronger with a
document behind them, and both are blocked on the same missing asset: a redacted page of real work.

---

## D. What this audit changes in this round

1. **`ai-health-report`'s readability claim is the weakest-backed headline on the site.** It gets a
   reconstruction — a labelled, synthetic-data rebuild of the report's information hierarchy — so the
   reader can at least see the *shape* being claimed. That is not proof of readability and will be
   captioned as exactly what it is.
2. **The cohort chart is the highest-value missing artifact.** Blocking gap, escalated.
3. **Step-sync completion +35%** carries three of four required qualifiers as missing while sitting
   on the homepage proof panel. Escalated in `CONTENT_GAPS.md`.
4. Nothing here is fixed by writing more prose. Every item in section B needs a fact from the user.
