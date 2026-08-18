# 02b — Design & editorial research

**Agent 2b.** Research into typography systems, long-form technical presentation, 2026 AI/template tells, asymmetric editorial layout, and motion restraint — extracted as **principles and measured numbers**, not as copies of any site's layout, structure or copy.

**Date:** 2026-08-19.
**Scope note:** this file contains **zero claims about Aniket**. Where a metric appears (`15s → under 2s`) it is used only as a *typographic specimen* to show how the `MetricDelta` component sets. All actual numbers, denominators and wording are owned by `CONTENT_GAPS.md` and Agent 5. Nothing here authorises a number.

**Method note — what is measured vs. what is cited.** Every KB figure, glyph metric, contrast ratio and character-per-line figure in this file was **measured locally on 2026-08-19**, not taken from a blog post. The measurement scripts are in the session scratchpad; the technique is documented in §1.3 so it can be re-run. Where a claim comes from published research or a vendor doc, it is cited with a URL. Two findings from blog sources contradicted each other and were resolved by measurement (§1.4, §1.9).

---

## Executive summary — the eight things that change the build

| # | Finding | Consequence for the build |
|---|---|---|
| 1 | **`max-width: 68ch` is wrong by ~38%.** In Newsreader at 19px, 68ch renders **≈91 characters per line** — over the WCAG AAA 80-char ceiling and far past the 66-CPL optimum. `ch` is the width of `0`, and `0` is much wider than an average lowercase letter. | Set prose measure in **px/rem, not ch**: **534–600px** for Newsreader @19–20px (§1.9). |
| 2 | **Geist is now on the AI-generator default list.** Independent 2026 audits name Geist as a headline default in generator output, alongside Inter/DM Sans/Space Grotesk. | Keep Geist **only if** paired with a serif and a strict palette that break the cluster — the cluster, not the single font, is the tell (§3.2). A safer swap is given in §1.7. |
| 3 | **Next.js `next/font/google` downloads the `wght` axis only by default.** Newsreader's wght-only file is instanced at **opsz = 18** — exactly the text optical size. | Do **not** pass `axes: ['opsz']`. It more than doubles the file (56.8 → 128.8 KB) *and* gives you a worse cut for body copy (§1.5). |
| 4 | **Specifying a weight *range* in `next/font/google` saves zero bytes.** Geist at `wght@400..600` and `wght@100..900` return the byte-identical file (29,288 B, verified). | Weight ranges are a documentation nicety, not an optimisation. Real savings require self-subsetting (§1.6). |
| 5 | **Self-subsetting beats `next/font/google` by 62%** and simultaneously recovers stylistic sets Google strips. Measured total: **171.2 KB → 63.6 KB** for the four faces. | Recommended path: `next/font/local` over a committed, pre-subset `woff2` set (§1.6). Both fonts are SIL OFL, so subsetting and self-hosting are licensed. |
| 6 | **`font-feature-settings: "ss01"` does not exist in the Google Fonts build of Geist.** Google's Geist ships `ccmp,dnom,frac,liga,locl,numr,pnum,tnum`. Vercel's own build ships `ss01–ss11, case, dlig` and more. | The brief's `ss01` instruction is a **no-op** on `next/font/google`. It works only on the self-subset path (§1.4). |
| 7 | **`--muted #6B7278` on `--paper #F6F5F2` measures 4.48:1 — it fails WCAG AA for normal text**, and will therefore fail the Lighthouse contrast audit. The brief demands Accessibility 100. | Darken to **`#5A6167` (5.77:1)**. `--flag #B4551F` passes at 4.52:1 but by 0.02 — darken to **`#9A4517` (5.95:1)** (§7). |
| 8 | **NN/g field research supports the brief's no-scroll-fade-on-text rule** and adds a number: fades over **500ms** are scrolled past before they finish; the workable band is **100–400ms**, applied to *one* element type, *once*. | Keep the brief's ban on text fade-ins. Use the 100–400ms band only for the single hero sequence, and honour `prefers-reduced-motion` (§5). |

---

# 1. Typography systems for dense, technical, editorial content

## 1.1 What the register problem actually is

This site has to hold three different kinds of text at once:

1. **Interface and headings** — short, scanned, never read linearly. Wants tight tracking, a high x-height, and unambiguous digits.
2. **Argument prose** — 900–1,300 words per case study, read linearly by a sceptic. Wants a comfortable measure, generous leading, and a face designed for continuous reading rather than for interfaces.
3. **Evidence** — metric deltas, decision tables, denominators, code-ish labels. Wants fixed-width digits so that vertically stacked numbers align on their columns.

Most PM portfolios set all three in one grotesk. The result reads as documentation — the brief already identifies this (§10.3). The three-role split is correct, and the research below evaluates the specific families proposed.

The important non-obvious point: **the register shift is the design idea, and it only works if the two families are far apart.** A grotesk plus a *near-grotesk* serif (e.g. a low-contrast slab) reads as an accident. A grotesk plus a proper text serif with visible stroke modulation reads as a decision. That argues for Newsreader or Literata over the more neutral Source Serif 4 — see §1.7.

## 1.2 Verdict on each family the brief proposes

| Brief proposes | Verdict | Reason |
|---|---|---|
| **Geist** (interface grotesk) | **Conditional keep** | Excellent metrics; shares an x-height with Geist Mono, which is rare and valuable. But it is named in 2026 generator-output audits as a default headline face, and it is Vercel's own typeface on a Vercel-hosted site — a small "shipped the starter" signal. Keep only with the serif + palette doing the differentiating work. Alternative in §1.7. |
| **Inter Tight** (alternative) | **Reject** | Inter is the single most-identified AI-slop tell of 2026; Inter Tight inherits the skeleton and the association. It is also *larger* than Geist (43.9 KB vs 28.6 KB latin) for no benefit here. |
| **Newsreader** (text serif) | **Keep — best of the three** | Commissioned by Google Fonts specifically for continuous on-screen reading; three optical sizes. Cheapest of the serif candidates when subset (21.6 KB). Its default optical cut (opsz 18) is the text cut, so the cheap file is also the *correct* file. Caveat: lowest x-height of the candidates (0.426 em) — must be set 1–2px larger than you'd expect (§1.10). |
| **Source Serif 4** (alternative) | **Acceptable, second choice** | Higher x-height (0.475 em), so more forgiving at small sizes; sturdier at 400. But it is the house serif of a very large number of design systems and documentation sites, so it reads as "the default serious serif". Costs 25.1 KB subset vs Newsreader's 21.6 KB. |
| **Geist Mono** (numerals) | **Keep** | 0.600 em fixed advance; shares Geist's x-height (0.530) exactly, so mono inline in sans needs no size correction — genuinely unusual. |
| **JetBrains Mono** (alternative) | **Reject for this site** | Designed for code editors; the ligature-forward, wide-aperture design is a *developer-tool* signal, not an instrument signal. Also 39.5 KB latin from Google vs Geist Mono's 22.6 KB. |
| **`font-variant-numeric: tabular-nums` on the mono** | **Redundant, keep anyway** | A monospaced font is tabular by construction; Google's Geist Mono build does not even expose a `tnum` feature. The declaration is a harmless no-op on the mono. **It is *not* redundant on the sans** — Geist Sans *does* ship `tnum`, and any number set in the sans (nav counters, timeline years) needs it explicitly. |

## 1.3 How the numbers below were produced

So the build agent can reproduce or re-verify:

1. Request the Google Fonts CSS2 API **with a modern Chrome UA string** (with an old/absent UA, Google serves TTF URLs and every measurement is wrong — this bit us once during research).
2. Split the CSS on its `/* latin */`, `/* latin-ext */` … comments; take the `latin` block only. That block is exactly what `next/font/google` with `subsets: ['latin']` will inline.
3. `GET` the `.woff2`, record `Content-Length`.
4. Open it with `fontTools.ttLib.TTFont` to read `fvar` axes, `GSUB` feature tags, `numGlyphs`, `OS/2.sxHeight`, and `hmtx` advances.
5. For the subset path: `fontTools.varLib.instancer` to clamp the weight axis, then `fontTools.subset` with an explicit unicode range and an explicit `--layout-features` list, `--flavor=woff2`.

## 1.4 OpenType feature audit — measured, and it contradicts the brief

Feature tags actually present in the **Google-served latin subset**:

| Family (Google build) | latin KB | glyphs | axes | `GSUB` features present |
|---|---:|---:|---|---|
| Geist | 28.6 | 288 | wght 100–900 | `ccmp, dnom, frac, liga, locl, numr, pnum, tnum` |
| Geist Mono | 22.6 | 264 | wght 100–900 | `ccmp, dnom, frac, locl, numr` |
| Newsreader | 56.8 | 262 | wght 200–800 | `liga, pnum, rvrn, tnum` |
| Source Serif 4 | 49.7 | 331 | wght 200–900 | `ccmp, dnom, frac, liga, locl, numr, pnum, tnum` |
| Inter Tight | 43.9 | 482 | wght 100–900 | `calt, ccmp, dnom, frac, locl, numr, pnum, tnum` |
| JetBrains Mono | 39.5 | 394 | wght 100–800 | `calt, ccmp, frac, locl` |
| Literata | 51.5 | 300 | wght 200–900 | `ccmp, dnom, frac, liga, locl, numr, pnum, rvrn, tnum` |
| Public Sans | 26.0 | 278 | wght 100–900 | `calt, ccmp, dnom, frac, liga, locl, numr, pnum, tnum` |
| Instrument Sans | 29.2 | 244 | wght 400–700 | `ccmp, liga, locl, pnum, tnum` |
| Martian Mono | 23.0 | 276 | wght 100–800 | `calt, ccmp, dnom, frac, locl, numr, rvrn` |

Feature tags in **Vercel's own Geist build** (`npm i geist@1.7.2`, `dist/fonts/geist-sans/Geist-Variable.woff2`, 69,652 B, 975 glyphs):

```
aalt, case, ccmp, dlig, dnom, frac, liga, locl, numr, ordn, pnum,
sinf, ss01, ss02, ss03, ss04, ss05, ss06, ss07, ss08, ss09, ss10, ss11,
subs, sups, tnum
```

**Three consequences the builder must act on:**

- `font-feature-settings: "ss01"` in the brief is **inert** if Geist comes from `next/font/google`. Delete the declaration or move to the self-subset path.
- **`case` is the feature that actually matters here** and it is also absent from Google's build. `case` shifts parentheses, hyphens and arrows up to cap-height in all-caps runs. Every eyebrow label on this site is all-caps mono (`COLD START (P75, LOW-END ANDROID)`), so `case` is doing real work on the parentheses.
- Google's Newsreader/Source Serif builds ship **no `onum`** (old-style figures). If anyone asks for old-style figures in serif prose, the answer is "not available on this path" — do not fake them.

## 1.5 `next/font` availability matrix

Source: Next.js 16.3 font docs and API reference.

| Family | `next/font/google` | Notes |
|---|---|---|
| **Geist** | ✅ `import { Geist } from 'next/font/google'` — this is literally the example in the Next.js docs | Variable, `wght` only. No italic needed. |
| **Geist Mono** | ✅ `import { Geist_Mono } from 'next/font/google'` | Variable, `wght` only. |
| **Newsreader** | ✅ `import { Newsreader } from 'next/font/google'` | Two axes upstream (`opsz` 6–72, `wght` 200–800). |
| **Source Serif 4** | ✅ `import { Source_Serif_4 } from 'next/font/google'` | Two axes upstream (`opsz` 8–60, `wght` 200–900). Underscore-for-space and the trailing `4` are both required in the import name. |
| **Inter Tight** | ✅ `Inter_Tight` | — |
| **JetBrains Mono** | ✅ `JetBrains_Mono` | — |
| **Mona Sans / Hubot Sans** | ❌ | GitHub's OFL grotesks. `next/font/local` only. Heavy unsubset (MonaSansVF\[opsz,wght\].woff2 = 134 KB; the 4-axis file is 520 KB). Only viable if you subset. |

**The `axes` rule, verbatim from the Next.js API reference:** *"Some variable fonts have extra `axes` that can be included. By default, only the font weight is included to keep the file size down."*

Measured effect on Newsreader (latin subset):

| Request | latin KB |
|---|---:|
| `wght` only (what `next/font` does by default) | **56.8** |
| `axes: ['opsz']` (both axes) | 128.8 |
| both axes + italic | 128.8 + 143.6 = 272.4 |

And the wght-only file is **instanced at `opsz = 18`** — Newsreader's default, which is its *Text* optical size. Source Serif 4's wght-only file is instanced at `opsz = 20`. Both are exactly right for 19–21px body copy.

> **Rule: never pass `axes: ['opsz']` for a body serif.** You pay 2.3× the bytes to get a file whose default rendering is identical, and you gain an axis you would only use for display sizes — which this site sets in the grotesk anyway.

**Weight ranges do not save bytes.** Verified: `Geist:wght@400..600` and `Geist:wght@100..900` both resolve to `gyByhwUxId8gMEwcGFWNOITd.woff2`, 29,288 bytes, identical. `weight: '400 600'` in `next/font/google` is documentation, not compression.

## 1.6 Measured font economics — the actual KB decision

**Path A — `next/font/google`, zero build tooling.**

| Face | latin KB |
|---|---:|
| Geist (wght 100–900) | 28.6 |
| Geist Mono (wght 100–900) | 22.6 |
| Newsreader roman (wght 200–800) | 56.8 |
| Newsreader italic (wght 200–800) | 63.0 |
| **Total** | **171.0 KB** |
| Total if you drop serif italic | 108.0 KB |

**Path B — pre-subset `woff2` committed to the repo, loaded with `next/font/local`. Recommended.**

Weight axis clamped to what the design actually uses; unicode range = Google's `latin` range **plus** `U+2190–2193` (arrows), `U+2197` (↗, used by the `Resume ↗` button), `U+2212` (true minus, for `−87%`), `U+2215`.

| Face | axis clamp | features kept | KB | vs Path A |
|---|---|---|---:|---:|
| Geist | `wght 400:700` | `ccmp,liga,locl,tnum,pnum,frac,case,ss01` | **16.3** | −43% |
| Geist Mono | `wght 400:500` | `ccmp,locl,case,ss01` | **13.0** | −42% |
| Newsreader roman | `wght 400:700` | `liga,tnum,pnum,ccmp,locl,rvrn` | **21.6** | −62% |
| Newsreader italic | `wght 400:400` (single) | `liga,tnum,pnum,ccmp,locl,rvrn` | **12.6** | −80% |
| **Total** | | | **63.6 KB** | **−62.8%** |
| Total without serif italic | | | 51.0 KB | |

Same treatment on the alternatives, for comparison:

| Face | Google latin | instanced + subset |
|---|---:|---:|
| Source Serif 4 roman (`wght 400:700`) | 49.7 | **25.1** |
| Source Serif 4 italic (`wght 400:400`) | 50.3 | **14.4** |
| Literata roman (`wght 400:700`) | 51.5 | **25.4** |
| JetBrains Mono (`wght 400:500`) | 39.5 | **13.1** |

**Licensing is clear for the subset path.** Geist is SIL Open Font License 1.1 (`Copyright (c) 2023 Vercel, in collaboration with basement.studio`, per `LICENSE.txt` in `geist@1.7.2`; repo `github.com/vercel/geist-font`). Newsreader, Source Serif 4 and Literata are OFL. OFL permits modification (subsetting is modification) and redistribution as part of a work, provided the licence travels with the font. **Commit `OFL.txt` next to the `.woff2` files in `/app/fonts/` or `/public/fonts/`.**

**Budget context.** The brief's hard criterion is *total JS < 90 KB gzipped on the homepage*. Fonts are separate from JS but they are on the LCP critical path via `<link rel=preload>`. 171 KB of preloaded font is a real LCP risk on a mid-tier Android device on 4G; 63.6 KB is not. This site's entire argument is that its author cares about cold start. **Path B is the choice that is consistent with the content.**

**Pragmatic compromise if the build agent wants to avoid a font pipeline in week one:** ship Path A but **drop the serif italic entirely** (108 KB) and set emphasis in the serif with weight 600 rather than italic. Then migrate to Path B in polish. Do not ship Path A *with* italic — 171 KB of font for a five-page portfolio is indefensible on this specific site.

## 1.7 If you want to break the Geist association

Geist appears by name in 2026 generator-output audits as a headline default. Two ways out, both measured:

**Option 1 — keep Geist, differentiate everywhere else.** Defensible. The audits are explicit that a single default is noise and it is the *combination* of ten defaults that identifies a generator ("the conditional probability stacks"). Geist + a text serif + a two-accent semantic palette + zero gradients + zero rounded cards is already outside the cluster.

**Option 2 — swap the grotesk.** Best replacements that self-host cleanly, are not on any AI-default list, and stay in budget:

| Family | Google latin KB | x-height | `tnum` | Character |
|---|---:|---:|:---:|---|
| **Public Sans** | 26.0 | — | ✅ | USWDS's face. Neutral, slightly official, engineered rather than styled. Full feature set including `calt`. Closest match to "instrument". |
| **Instrument Sans** | 29.2 | — | ✅ | Narrower, more editorial, a touch more personality. `wght` axis is 400–700 only — which is exactly this site's range. |
| **Libre Franklin** | 28.6 | — | ❌ | Franklin Gothic lineage; more American-newspaper than instrument. No `tnum` in Google's build — **disqualifying**, given every number on this site needs tabular figures. |
| **IBM Plex Sans** | 39.3 | — | ❌ | No `tnum`. Also strongly IBM-coded. Skip. |

**Recommendation: keep Geist (Option 1), on the self-subset path so you get `ss01` and `case`.** The x-height match with Geist Mono (both 0.530 em) is a real, rare advantage for a site whose signature element mixes mono numerals into sans labels — you get no optical size correction to fight. If a later review finds the site reading as generator output, **Public Sans is the drop-in replacement**: it has the full numerics feature set and is 26.0 KB.

## 1.8 Measured glyph metrics for the candidates

| Family @ wght 400 | `0` advance | avg English char | x-height | cap-height | hhea asc/desc |
|---|---:|---:|---:|---:|---|
| Newsreader | 0.5665 em | 0.4218 em | **0.426** | 0.670 | 0.735 / −0.265 |
| Source Serif 4 | 0.5290 em | 0.4761 em | 0.475 | 0.670 | 1.036 / −0.335 |
| Literata | 0.5790 em | 0.4745 em | 0.507 | 0.701 | 1.177 / −0.308 |
| Geist | 0.6630 em | 0.4659 em | **0.530** | 0.710 | 1.005 / −0.295 |
| Geist Mono | 0.6000 em | 0.6000 em | **0.530** | 0.710 | 1.005 / −0.295 |
| Inter Tight | 0.5781 em | 0.4269 em | 0.546 | 0.728 | 0.969 / −0.241 |

(*avg English char* = advance widths of a–z weighted by English letter frequency at 82%, plus the space glyph at 18%.)

Two things fall straight out of this table:

- **Geist and Geist Mono share an x-height and a cap-height exactly.** Mono set inline in sans at the same px size will optically match. No `font-size: 0.95em` correction needed — which is the usual hack and always looks slightly off.
- **Newsreader's x-height (0.426) is 20% smaller than Geist's (0.530).** Newsreader at 19px has an x-height of 8.09px; Geist at 16px has 8.48px. **Newsreader at 19px reads optically smaller than Geist at 16px.** See §1.10.

## 1.9 Measure — the `68ch` error, corrected

`1ch` = the advance width of `0` in the current font. It is **not** the average character width. For a serif with wide lining figures, `0` is ~34% wider than an average English character. The gap compounds at the exact place the brief uses it.

Measured, at 19px:

| Family | `max-width: 68ch` | Real chars/line at 68ch | px needed for 66 CPL | ch equivalent of 66 CPL |
|---|---:|---:|---:|---:|
| Newsreader | 732px | **91** | 529px | 49ch |
| Source Serif 4 | 683px | 76 | 597px | 59ch |
| Literata | 748px | 83 | 595px | 54ch |
| Geist | 857px | 97 | 584px | 46ch |
| Inter Tight | 747px | 92 | 535px | 49ch |
| Geist Mono | 775px | 68 | 752px | 66ch |

**91 CPL breaches two independent limits.** WCAG 2.1 SC 1.4.8 (AAA) caps line width at **80 characters**. Bringhurst's 45–75 and the Dyson & Haselgrove literature-review consensus put the comfortable band at **50–75, optimum ~66**.

**Corroboration from live premium editorial sites** (stylesheet values pulled 2026-08-19, so these are the actual shipped constraints, not what someone wrote in a blog post):

| Site | content column | outer container |
|---|---|---|
| Vercel blog | `max-width: 600px` | 960px |
| Anthropic engineering | `max-width: 640px` | 880px / 1400px |
| Works in Progress | `max-width: 650px` | 768px / 1024px |
| Every.to article shell | — | 900px |
| Tufte CSS | 55% of an 87.5%-wide, 1400px-max body ≈ **674px** | 1400px |

All five land in a **600–675px** band. `68ch` in Newsreader (732px) sits outside it. The band is real.

> **Set the prose measure in px/rem, never in `ch`.**
> **Newsreader @ 19px → `max-width: 34rem` (544px) = 68 CPL.**
> **Newsreader @ 20px → `max-width: 36rem` (576px) = 68 CPL.**
> Acceptable range **520–600px**; hard ceiling **640px** (= 80 CPL, the AAA limit).
> If a later reviewer wants a wider column, the correct move is to *increase the type size*, not the width — CPL is the invariant, not px.

Sub-elements set at smaller sizes need proportionally narrower columns to stay in the band. A caption at 14px in Newsreader hits 66 CPL at 390px — which is why captions belong in the rail (§4), not spanning the prose column.

## 1.10 Optical size matching across the two families

Because Newsreader's x-height is 20% shorter than Geist's, nominal px sizes lie. To make serif prose *look* one step larger than UI text rather than the same size:

| Pair | Nominal | x-height (px) | Reads as |
|---|---|---:|---|
| Geist 16px | 16 | 8.48 | baseline |
| Newsreader 19px | 19 | 8.09 | **slightly smaller** than Geist 16 ❌ |
| Newsreader 20px | 20 | 8.52 | equal to Geist 16 |
| **Newsreader 21px** | 21 | **8.95** | one comfortable step larger ✅ |
| Source Serif 4 18px | 18 | 8.55 | equal to Geist 16 |
| Source Serif 4 19px | 19 | 9.03 | one step larger |

**Recommendation:** if the serif is **Newsreader**, set case-study body at **20–21px** (not the brief's 19px) with `line-height: 1.6` → 32–33.6px. If the serif is **Source Serif 4**, 19px/1.6 is correct as written. Restate the measure accordingly: Newsreader 21px → 68 CPL at **602px**.

## 1.11 Line-height, tracking and the two scales

**Line-height.** The floor is WCAG SC 1.4.8: leading ≥ 1.5, and paragraph spacing ≥ 1.5× the leading. Practical bands:

| Role | size | line-height | computed | rationale |
|---|---|---|---|---|
| Serif body | 20–21px | **1.60** | 32–33.6px | Above the 1.5 AAA floor. Newsreader's tight hhea (1.0 em total) means `1.6` gives real, visible leading rather than the metric slack other serifs already carry. |
| Serif body, mobile (<640px) | 18px | **1.65** | 29.7px | Narrower measure tolerates — and benefits from — slightly more leading. |
| Sans UI 16px | 16 | 1.50 | 24px | — |
| Sans UI 14px | 14 | 1.45 | 20px | — |
| Mono label 12px | 12 | 1.40 | 17px | — |
| H2 30px | 30 | 1.20 | 36px | — |
| H1 / hero 48–60px | 48–60 | **1.05–1.10** | 50–66px | At display sizes the metric leading is already generous; 1.1 is tight without collision. |
| Paragraph spacing | — | **`margin-block: 1.5em`** | 30–31.5px | Satisfies the AAA "paragraph spacing ≥ 1.5× line spacing" clause. Do **not** use `<br>`-style tight paragraphs. |

**Tracking.** Optical, size-dependent, and small:

```css
--track-display: -0.022em;  /* 48–60px */
--track-h2:      -0.014em;  /* 24–38px */
--track-ui:      -0.006em;  /* 14–19px sans */
--track-body:     0em;      /* serif prose — never track a text serif */
--track-eyebrow:  0.06em;   /* all-caps mono labels, 11–12px */
```

Two rules: **never apply negative tracking to the serif body** (text serifs are already fitted for continuous reading and tightening them destroys the fit), and **all-caps always needs positive tracking** — the eyebrow labels (`COLD START (P75, LOW-END ANDROID)`) are the only place on this site where letter-spacing goes positive. Sampled tracking on the live sites above clustered at `-0.02em` to `-0.04em` for display and `-0.01em` for UI, which brackets these values.

**Two scales, not one.** A single 1.25 ratio across nine steps (the brief's `12/14/16/19/24/30/38/48/60`) is serviceable but has two problems: it forces UI and prose to share steps, and 1.25 compounds too fast at the top (38→48→60 in three steps). Split it:

```css
/* UI / grotesk — ratio 1.20, tighter, more steps where labels live */
--ui-2xs: 0.6875rem;  /* 11px  eyebrow mono */
--ui-xs:  0.75rem;    /* 12px  metadata, denominators */
--ui-sm:  0.875rem;   /* 14px  nav, captions, table cells */
--ui-base:1rem;       /* 16px  UI default, card subheads */
--ui-lg:  1.1875rem;  /* 19px  belief statements, card headlines */
--ui-xl:  1.5rem;     /* 24px  H3 */
--ui-2xl: 1.875rem;   /* 30px  H2 */
--ui-3xl: 2.375rem;   /* 38px  page H1 */
--ui-4xl: clamp(2.25rem, 1.1rem + 4.6vw, 3.5rem);  /* 36→56px hero */

/* Prose / serif — only three steps exist, because only three are needed */
--prose-sm:   1.0625rem;  /* 17px  pull-quote attribution, aside prose */
--prose-base: 1.3125rem;  /* 21px  case-study body (Newsreader) */
--prose-lead: 1.5rem;     /* 24px  the one lede paragraph per case study */
```

Nine UI steps, three prose steps. Twelve total is enough for a five-page site; anything more will drift.

**Hero clamp.** `clamp(2.25rem, 1.1rem + 4.6vw, 3.5rem)` gives 36px at 320px width, ~48px at 900px, capping at 56px. The brief's 60px is fine on a 1440px screen but the clamp is what protects the 320px requirement in §13.7 of the brief.

## 1.12 Numerals — the rules that make the signature element work

The `MetricDelta` component is the signature. Its typography must be exact:

```css
.metric-figure {
  font-family: var(--font-mono);          /* Geist Mono */
  font-variant-numeric: tabular-nums;      /* no-op on mono; harmless, and correct if the family ever changes */
  font-feature-settings: "case" 1;         /* lifts −, →, ( ) to cap height — self-subset path only */
  letter-spacing: 0;                       /* never track figures */
  font-weight: 500;
}
.metric-label {                            /* the eyebrow */
  font-family: var(--font-sans);
  font-size: var(--ui-2xs);                /* 11px */
  text-transform: uppercase;
  letter-spacing: var(--track-eyebrow);    /* 0.06em */
  font-variant-numeric: tabular-nums;      /* REQUIRED — Geist Sans is proportional by default */
  color: var(--muted);
}
.metric-denominator {                      /* "P75, low-end Android, 8 weeks" */
  font-family: var(--font-sans);
  font-size: var(--ui-xs);                 /* 12px */
  font-variant-numeric: tabular-nums;
  color: var(--muted);
}
```

Three non-obvious specifics:

1. **Use U+2212 MINUS SIGN (`−`), not the hyphen-minus (`-`), in deltas.** `−87%` is typographically correct and, in a tabular font, the true minus is figure-width so a column of deltas aligns. The hyphen is not. Include `U+2212` in the subset range (it is already in Google's latin range, but confirm it survives your own subsetting).
2. **Use U+2192 (`→`) for the delta arrow, not an em-dash-plus-caret or an SVG.** It is one glyph, it is in the subset, and it is copy-pasteable — which matters, because a recruiter forwarding your metric line in Slack should get working text.
3. **`font-variant-numeric: tabular-nums` on the *sans* is load-bearing and easy to forget.** The timeline (`2024 — now`, `2023`, `2022`) and every denominator are set in Geist Sans. Without `tnum` those year columns will not align. Set it once on `:root` for the sans and let it inherit.

## 1.13 Loading, fallback and CLS

```ts
// app/fonts.ts — Path B (self-subset). Weight-limited, latin-only, OFL committed alongside.
import localFont from 'next/font/local'

export const sans = localFont({
  src: './fonts/Geist-latin-400-700.woff2',
  variable: '--font-sans',
  display: 'swap',
  weight: '400 700',
  style: 'normal',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial'],
  adjustFontFallback: 'Arial',
})

export const serif = localFont({
  src: [
    { path: './fonts/Newsreader-latin-400-700.woff2', weight: '400 700', style: 'normal' },
    { path: './fonts/Newsreader-latin-italic-400.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
  preload: false,                    // serif is used only on /work/[slug] and /approach
  fallback: ['Iowan Old Style', 'Charter', 'Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
})

export const mono = localFont({
  src: './fonts/GeistMono-latin-400-500.woff2',
  variable: '--font-mono',
  display: 'swap',
  weight: '400 500',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
  adjustFontFallback: 'Arial',
})
```

Notes the builder needs:

- **`next/font/local` does not subset or convert.** It serves the file byte-for-byte. That is precisely why the pre-subset is worth doing, and why you must not point `next/font/local` at the raw `geist` npm `Geist-Variable.woff2` (69.6 KB, 975 glyphs, most of them unused).
- **Preload discipline.** `next/font` preloads per-route based on where the loader is called (root layout → all routes). Sans and mono belong in the root layout. **The serif does not** — it is used on `/work/[slug]` and `/approach` only. Call it in those routes, or call it in the root layout with `preload: false` so it is declared but not preloaded on `/`. This is worth ~22 KB off the homepage critical path.
- **`adjustFontFallback` is on by default for `next/font/google` and defaults to `'Arial'` for `next/font/local`.** It synthesises `size-adjust`, `ascent-override` and `descent-override` on the fallback so the swap does not shift layout. Given Newsreader's low x-height, the *serif* fallback deserves attention: `adjustFontFallback: 'Times New Roman'` is closer than Arial. Verify CLS < 0.02 with a throttled 3G profile and font loading forced to `swap`.
- **`display: 'swap'` everywhere.** Not `optional`. `optional` will silently show system fonts on a slow first load, and on a site whose whole argument is typographic that is a worse failure than a 100ms swap.
- **Do not use `@next/font`** (the pre-13.2 package name) — it was renamed to `next/font` and requires no install.

---

# 2. How the best long-form technical writeups actually work

Four mechanisms, extracted from scientific-publishing conventions (Distill), the marginalia tradition (Tufte CSS, Gwern), documentation practice, and the shipped constraints of Vercel/Anthropic/Works in Progress measured in §1.9.

## 2.1 Data visualisation inline with prose

**The governing principle: a figure is a *sentence in the argument*, not an illustration of it.** Technical-writing convention is unambiguous — every figure is called out in the running text, and the text *interprets* rather than *repeats* the figure. If the prose says "cold start fell" and the chart shows cold start falling, the chart is decoration and should be cut.

Five implementable rules:

**(a) Three figure widths, not one.** Distill's layout system, and every serious long-form system since, resolves to the same three:

| Width class | Use | This site |
|---|---|---|
| **Column** — same width as prose | Anything read *with* the sentence: a small before/after bar, a two-row table | 520–600px |
| **Wide** — prose + rail, breaking right | Anything with a horizontal axis: latency waterfall, cohort curve, bundle treemap | 780–860px |
| **Full-bleed** — container width | Reserved. Maximum **one per case study**, for the single hero diagram | up to 1200px |

The rhythm this produces — narrow, narrow, wide, narrow — is what makes a long page feel like a document rather than a scroll. It is also the single cheapest way to look unlike a template, because templates use one content width throughout.

**(b) Direct-label everything; never ship a legend.** Direct labelling removes the gaze-switch between mark and key and removes the colour-identification task entirely, which is an accessibility win as well as a comprehension one. On a site with exactly two accent colours this is not optional — you do not have enough colours to build a legend with. Put the series name at the end of the line, in the line's colour, in mono at 11–12px.

**(c) The caption carries the finding, not the description.** Convention: open with what the figure is, then the conditions/source, then the observation that matters. Applied here, and this maps directly onto the brief's alt-text rule (§13.7) and its `[DERIVED]`/reconstruction requirement (`CONTENT_GAPS.md` D-R5):

> **Fig. 2 — Cold start by device tier, before and after.** Reconstructed from internal analytics; shape and direction accurate, absolute values withheld. The gap between tiers is the finding: the fix moved the low-RAM tier furthest, which is the tier that was churning.

Three sentences: identity, provenance, finding. The provenance sentence is *mandatory* on every reconstructed chart on this site and it is a credibility asset, not an apology.

**(d) Word-sized graphics inside sentences.** Tufte's sparklines are "data-intense, design-simple, word-sized graphics" with a data-ink ratio of 1.0 — no frame, no ticks, no axis furniture. An inline 60×14px sparkline set on the text baseline inside a sentence is a genuinely uncommon move in a PM portfolio and costs almost nothing: it is a `<svg>` with one `<path>`, `vertical-align: -0.15em`, `stroke: currentColor`. Use it for at-a-glance shape (a retention curve's elbow) where a full figure would be an interruption. **Cap: three per case study.** Beyond that it becomes a mannerism.

**(e) Give every figure an intrinsic size and never let it move.** `<svg viewBox>` with an explicit `width`/`height` attribute pair or an `aspect-ratio` wrapper. A figure that reflows on font-load is a CLS event on the page that argues its author cares about CLS.

## 2.2 Progressive disclosure of detail

The brief already specifies the mechanism (`ArtifactDrawer`, max 4 per case study, server-rendered). Research adds four constraints:

**(a) Label with a claim, never with "Read more".** Documentation practice is explicit that the label must carry enough information scent for the reader to decide *before* clicking. The brief's own example is the correct form: `▸ How I defined "session time" and why I nearly used a different metric`. That label does work even for the reader who never opens it — it advertises that the argument happened.

**(b) Server-render the content; hide it with CSS, not with JavaScript.** Content present in the HTML and hidden via CSS is crawled and indexed normally; content injected only after a click is not reliably indexed. `<details>`/`<summary>` satisfies this natively, is keyboard-operable and screen-reader-announced for free, needs zero client JS, and is `Cmd-F`-findable in Chrome (which auto-expands `<details>` on find since Chrome 120). **Use `<details>`. Do not build a custom disclosure.**

**(c) Never hide anything load-bearing.** SEO guidance converges on the same rule UX guidance gives: collapsed content is *supplementary*. The decision, the trade-off, the mistake and the numbers are visible. What collapses: the derivation, the full options analysis, the metric definition, the methodology.

**(d) Do not collapse too aggressively.** The documented failure mode is a system that collapses at "not even half a sentence", forcing a click for content that would have fit. Set a floor: **if the disclosed content is under ~60 words, it is not a disclosure, it is a parenthesis — inline it.**

## 2.3 Section navigation for long reads

NN/g's TOC guidance gives a clean decision matrix, and it happens to contradict part of the brief.

| NN/g finding | Consequence here |
|---|---|
| A TOC in a **left or right rail should be sticky**; a TOC in the **main body should not be**. | The brief's sticky left progress rail is correct. |
| **Right-rail TOCs suffer "right-rail blindness"** — readers pattern-match right-hand columns to advertising and ignore them. | Confirms the brief's split: **progress rail left, evidence rail right**. Do not move navigation into the right rail. |
| **Highlight the current section as the reader scrolls** — it gives progress feedback *and* increases discoverability of the TOC itself, because the movement attracts the eye. | Build the active-state marker; it is not decoration. |
| In-page links are **ignored on first exploration and used when the reader has a specific need**. Only 2 of 11 study participants showed no engagement with them at all. | The rail is for the *second* pass — a Senior PM re-reading adversarially, or a Head of Product jumping to "What happened". Design it for return visits, not first scroll. |
| Sticky elements in the body **compete with global navigation** and cause usability problems. | The nav shrinks to a hairline past 120px (brief §10.3). Verify the shrunken nav and the sticky rail do not read as two competing navigations — the rail must be visually quieter than the nav: mono, 11px, `--muted`, no background, no border, no box. |

**Implementation.** `IntersectionObserver` with `rootMargin: '-20% 0px -70% 0px'` marks a section active when its top third crosses the upper fifth of the viewport — this avoids the classic bug where the last short section never activates. Add `scroll-margin-top: 96px` to every `<h2>` so anchor jumps do not land under the nav. Under `prefers-reduced-motion`, `scroll-behavior` must stay `auto`, not `smooth`.

**Mobile.** The brief converts the rail to a 2px top progress bar below 1024px. That is right, and one addition is worth it: a `<details>` "Sections" disclosure directly under the case-study header block, collapsed. It costs nothing, it is server-rendered, and it gives the phone reader the same section overview the desktop reader gets from the rail. NN/g's mobile recommendation for rail TOCs is exactly this — move to the body, or convert to an accordion.

## 2.4 The transition between argument and evidence

This is the hardest thing on the page and it is where most technical writeups fail — they either bury the claim in the data or state the claim and never show the data.

**The mechanism the best long-form writing uses is a *register shift*, signalled typographically.** The reader should be able to tell, without reading a word, whether they are looking at a claim or at the support for it. Four shifts, in increasing strength:

| Shift | Signal | Use for |
|---|---|---|
| **1. Weight** | Serif 400 → serif 600, same size, same column | The load-bearing sentence in a paragraph. The brief already requires this ("bold the load-bearing sentence"); a reader who reads only the bolded lines gets the argument. |
| **2. Family** | Serif prose → mono figures/labels | Any number. This is the site's core move: *prose is what I claim, mono is what I measured.* |
| **3. Column** | Prose column → right rail | Provenance, denominators, method notes, sample sizes. Evidence that supports the claim but would interrupt it. |
| **4. Block** | Full-width rule + figure + caption | The finding that *is* the argument — the waterfall, the cohort curve, the safety-boundary diagram. |

Three concrete patterns worth stealing (as principles):

**(a) Claim → colon → evidence, in one visual unit.** State the claim in serif; put the delta immediately under it in mono, on a hairline; put the denominator under that in 12px sans. The reader's eye descends through claim → measurement → conditions in one movement. This is what `MetricDelta` should render, and it is why it must not be a card — a border around it would break the vertical read.

**(b) Name the objection *before* the evidence, in the prose voice.** The brief's copy rule ("Name the objection before the reader does") is also a *layout* instruction: the objection sentence belongs in the serif column, immediately above the figure that answers it. A sceptical reader who has just formed a doubt and then reads their own doubt in your voice will read the next figure generously rather than adversarially. This is the highest-leverage sequencing decision on the whole page.

**(c) Attribution limits go in the rail, not the prose.** *"This shipped alongside X, so I attribute directionally, not causally"* is evidence-about-evidence. Putting it in the rail, in 12px sans, adjacent to the figure, is the register-3 move: it is visibly a footnote and visibly not hidden. Burying it in prose makes it read like hedging; deleting it makes the whole page less credible.

**The anti-pattern:** an "Impact" or "Results" section at the end that dumps every number at once. It severs each number from the claim it supports and it front-loads all the sceptic's ammunition into one screen. Distribute evidence to the claim it serves.

---

# 3. What a 2026 site reads as AI-generated or templated

The brief already forbids three looks. This section supplies **the other tells**, drawn from 2026 generator-output audits. Each is stated as a concrete value the builder can check for.

## 3.1 The meta-finding that governs everything below

> *"The conditional probability stacks. A single element is noise; the combination of ten defaults creates a high generator-likelihood signal."*

**No single item below is disqualifying.** Geist alone is not a tell. A 16px radius alone is not a tell. Ten of them together are a fingerprint. Audit the site as a *set*.

**The silhouette test** (from the same body of work, and the fastest self-check that exists): screenshot the homepage, reduce it to a 200px-wide black-on-white silhouette — blocks for sections, lines for text, no colour, no type. Put it next to three template portfolios. **If you cannot tell which is yours, the page is structurally templated regardless of how carefully the colours were chosen.** Run this at the end of Stage 4 and again at Stage 6.

## 3.2 Typography tells

| Tell | Concrete check |
|---|---|
| **Inter as body** | Reported at ~95% of generator output and the most-used webfont on the indexed web. Already excluded. |
| **The recurring generator trio: Inter + Space Grotesk + Instrument Serif; Geist and Cal Sans as headline defaults** | Geist is *on this list*. See §1.7. Never pair Geist with Space Grotesk or Instrument Serif. |
| **One italic serif word inside an otherwise-sans hero** | e.g. "The *fastest* way to ship". A named 2026 tell. **Ban this outright.** The hero headline is one family, one style. |
| **All-caps micro-labels everywhere** | Also a named tell — because generators emit them on every section. **Restrict all-caps to exactly one role on this site: the `MetricDelta` eyebrow.** No all-caps section headers, no all-caps nav, no all-caps buttons. Scarcity is what turns the eyebrow into a signal instead of a texture. |
| **Pure `#000` / `#fff` text** | Real designers use off-blacks. The brief's `--ink #14181A` and `--paper #F6F5F2` are already correct. Verify no stray `#fff` or `#000` survives in components — a single `color: #000` is a giveaway. |
| **Seven type sizes that are all 1.25× apart with nothing distinctive at either end** | Generator scales are mathematically perfect and expressively dead. The two-scale split in §1.11 plus the clamp on the hero is the fix. |

## 3.3 Colour and surface tells

| Tell | Concrete check |
|---|---|
| **Tailwind `blue-500`/`blue-600` (`#3b82f6` / `#2563eb`)** — reported at ~78% of indexed marketing sites by 2026 | `grep -rn "3b82f6\|2563eb\|blue-500\|blue-600\|indigo-\|violet-\|purple-"` must return **zero** hits in `app/` and `components/`. |
| **Blue→purple and purple→pink gradients** | `grep -rn "linear-gradient\|bg-gradient\|radial-gradient"` → zero hits, with one permitted exception: the horizontal-scroll edge fade on tables (brief §13.10), which is a `--paper`-to-transparent mask. Document that exception in a code comment so a reviewer knows it was deliberate. |
| **"VibeCode purple"** — a specific lavender that leaks in from image-generation defaults | Any lavender in an OG image, a diagram, or an illustration. Diagrams must use only `--ink`, `--muted`, `--rule`, `--signal`, `--flag`. |
| **Coloured glows / coloured `box-shadow`** | `grep -rn "box-shadow"` → the brief already says no shadows. Enforce it as a lint rule, because it is the single most common thing to creep back in during polish. |
| **Coloured left borders on cards and callouts** | Named as being "almost as reliable a sign of AI-generated design as em-dashes in text." **This directly threatens the `Callout` component.** The `mistake` variant must *not* be a 4px amber left border — that is the exact pattern. Use instead: an amber all-caps mono eyebrow (`WHAT I GOT WRONG`), amber rule *above* the block, and `--paper` background. Same scannability, different fingerprint. |
| **`rounded-2xl` (16px) / `rounded-xl` (12px) on everything** | The brief's 4px is already outside the cluster. Check nothing else in the tree uses 8px+. |
| **Permanent dark mode with mid-grey body text failing WCAG AA** | Not applicable — this site is light-first with no theme toggle (brief §14.3). Good. |

## 3.4 Layout and structure tells

| Tell | Concrete check |
|---|---|
| **`hero → three feature cards with icons → testimonials → pricing → CTA → footer`** | The brief's homepage order is Identity → Proof → Work → Beliefs → Built → Track record. Different. But watch section 3: **three cards in a `grid-cols-3`** is the tell. The brief already specifies *stacked full-width rows*, not a three-up grid. **Hold that line** — it is one of the highest-value layout decisions in the whole spec. |
| **Icon-on-top feature cards** | Zero icon-topped cards. In fact: **zero decorative icons anywhere.** The only permitted glyphs are `→ ↗ ↓ −` from the type, plus data marks inside figures. |
| **A coloured pill/badge directly above the H1** | e.g. `[ Available for work ]` above the headline. Named tell. The brief's `Currently:` line must be **below** the sub-line, set in mono at 12px, with no pill, no background, no border, no dot. |
| **Numbered "1 / 2 / 3" process steps** | Do not number the four beliefs. Do not number "how I work". The eight case-study sections carry numbers only in the progress rail, where they are navigation, not decoration. |
| **A horizontal stat banner** | This is the risk to the **proof strip**. A four-across row of big numbers on a tinted band is exactly the generator pattern. The brief already prescribes the differentiators — no icons, no cards, no border around the group, hairline rules between, denominators under every figure. **The denominators are what make it not a stat banner**: generator stat bars never carry populations or timeframes. |
| **Bento grids** | 2026 template shorthand. Zero bento anywhere. |
| **Logo marquees / infinite tickers** | Zero. The brief already bans the tool logo wall; the marquee is its animated cousin. |
| **Emoji in nav or section labels** | Zero emoji anywhere in the UI. |
| **Uniform padding (24px) and uniform radius on every surface** | The tell is *sameness*, not the value. The brief's fix is the asymmetric grid (§4) and the three figure widths (§2.1). Deliberately vary block spacing between section *types* while keeping the 8px scale. |

## 3.5 Motion tells

| Tell | Concrete check |
|---|---|
| **`opacity: 0 → 1` + `translateY(20px)` on scroll** — reported in ~83% of AI-generated landing pages; in React specifically as `initial={{ opacity: 0, y: 20 }} whileInView` with `0.1s` stagger | `grep -rn "translateY(20px)\|translate3d(0, *20px\|whileInView\|y: 20"` → **zero hits.** This is the single most recognisable motion signature of 2026. |
| **A 4px card lift on hover plus a shadow upgrade** | The brief's hover is border-colour + metric-colour only. Enforce; no `transform` on hover anywhere. |
| **Identical duration and easing on everything** | Real motion systems have a duration *ladder*. Use three tokens: `--dur-fast: 120ms` (colour/border), `--dur-base: 180ms` (disclosure height), `--dur-hero: 700ms` (the one arrival sequence). One easing for UI (`cubic-bezier(0.2, 0, 0, 1)`), one for the hero (`cubic-bezier(0.16, 1, 0.3, 1)`). |
| **No `prefers-reduced-motion` handling at all** | Generators omit it. Its *presence*, correctly implemented, is a quiet anti-tell. |

## 3.6 Copy tells

The vocabulary bans in brief §12.4 are correct and already cover the biggest offenders. Additions from 2026 audits:

- **Em-dash density.** Measured at 4–6× higher per 1,000 words in AI-built copy than in archived 2019 copy. This site's voice is short declarative sentences; **cap em-dashes at roughly one per 150 words** and prefer a full stop. (This file itself is over that budget — a research document can be; the site cannot.)
- **Rule-of-three everywhere.** "Fast, simple, and reliable." Three-item lists in every sentence is a generator rhythm. Vary list lengths deliberately — two, four, and five-item lists read as human.
- **Hedged verbs**: "may help you", "can potentially", "designed to". The brief's "I attribute this directionally, not causally" is *not* hedging — it is a precise epistemic claim. The difference is that it names the limit rather than softening the claim.
- **Vague aspirational headlines**: "Build the future of X", "Your all-in-one platform", "Scale without limits". The brief's headline options are all specific and falsifiable, which is the antidote.
- **Symmetric, perfectly-parallel section headers.** Generators emit "Discover / Design / Deliver". The brief's rule — every section header is a *claim*, not a label — breaks this automatically. Check that no two case studies share a header phrasing pattern.

## 3.7 Two tells specific to *this* site's risk profile

1. **A Vercel-hosted, Next.js, Geist-typeset site is the exact starter-template silhouette.** Everything above matters more here than it would elsewhere. The serif, the light warm paper, the flat 4px cards and the absence of gradients are what pull it out — do not let any of the four erode during polish.
2. **A `.vercel.app` domain plus Geist plus a stat banner is a three-signal stack.** The brief already requires a custom domain (§13.11); treat it as a design requirement, not a deployment nicety.

---

# 4. Asymmetric editorial layout: narrow prose + right rail

## 4.1 The geometry

The brief specifies prose in columns 2–8 of a 12-column, 1200px grid with a right rail. Reconciling that with the corrected measure from §1.9:

```
Desktop ≥1280px — 1200px container, 12 cols, 24px gutter (col ≈ 78px)
┌────────┬───────────────────────────────────────┬──────────────────────┐
│ rail L │  prose                                │  rail R              │
│ 2 cols │  7 cols  ≈ 570px  → 68 CPL @21px      │  3 cols ≈ 258px      │
│ sticky │  figures may break right to 860px     │  static, flows       │
└────────┴───────────────────────────────────────┴──────────────────────┘

1024–1279px — 960px container
┌──────┬──────────────────────────────┬───────────────┐
│ 1.5c │  prose 6.5 cols ≈ 520px      │  rail 3 cols  │
│ ~120 │  → 62 CPL @21px              │  ≈ 210px      │
└──────┴──────────────────────────────┴───────────────┘

<1024px — single column, both rails dissolve (see §4.3)
```

**Why the left rail must be narrower than the right.** The left rail holds navigation — eight short labels, mono 11px. It needs ~120–160px. The right rail holds evidence — metric callouts, denominators, provenance notes, the artifact drawer trigger. Below ~220px a metric callout cannot hold `15.0s → <2s` on one line at 12px mono without wrapping, and a wrapped delta looks broken. **220px is the hard floor for the right rail. Below it, dissolve it.**

**Do not centre the prose column in the viewport.** The asymmetry is the point: prose sits left-of-centre, rail sits right. A centred column with a rail floating beside it reads as a documentation template. The whole composition should be optically balanced by the rail's presence, not by geometric centring.

## 4.2 What actually goes in the right rail

Rank-ordered by how much it earns its place:

1. **The metric callout for the section you are reading.** `MetricDelta` in its compact form.
2. **Denominators and method notes** — population, timeframe, measurement method. This is the rail's highest-value job: it lets the prose stay readable while the evidence stays visible.
3. **The attribution-limit sentence** (§2.4c).
4. **The artifact-drawer trigger** for that section.
5. **A pull-quote** — at most **one per case study**. More than one and the rail becomes decorative.

**What must never go in the right rail:** navigation (right-rail blindness), anything load-bearing that has no equivalent in the prose column, and anything that a mobile reader would lose. Everything in the rail must have a defined mobile home (§4.3).

## 4.3 What breaks, and at what width

This is the part that goes wrong in practice. Failure modes documented in the marginalia literature, mapped to this build:

| Failure | When | Fix for this site |
|---|---|---|
| **Rail items collide** — two notes anchored to adjacent paragraphs overlap | The classic static-CSS marginalia failure; unavoidable without JS layout | **Anchor rail items to `<section>`, never to a paragraph.** One rail item per case-study section, maximum two. This makes collision structurally impossible and needs zero JavaScript. Do not build a general sidenote system. |
| **Rail item is taller than its anchor section** | Long note, short section | Cap rail item height at the section height; if it does not fit, it belongs in the prose or in the drawer. Enforce editorially at Stage 2, not with CSS. |
| **Block content inside an inline float breaks** | Lists and paragraphs inside a `<span>`-based sidenote | Rail is a real grid child (`grid-column: 10 / -1`), not a float. Never a float. |
| **Margin space vanishes** | Below ~760px the margin column is unusable; ~800px is where most implementations abandon marginalia entirely | The brief's 1024px collapse point is **more conservative and correct** — at 1024px the rail is already down to ~210px. Keep 1024px. |
| **Rail content disappears on mobile** — the worst failure, because the evidence is the point | Any naïve `display: none` | **Never `display: none` a rail item.** Below 1024px each rail item re-flows *inline, immediately after the paragraph it supports*, at full prose width, visually demoted: 12px sans, `--muted`, hairline rule above, 16px vertical margins. The brief already says "metric callouts become inline blocks between paragraphs" — this extends it to *every* rail item type. |
| **Source order ≠ visual order** | Rail markup placed after the prose but displayed beside it | Put each rail item in the DOM **immediately after the section it annotates**. Grid handles the desktop placement. Then the mobile stack is correct for free, and screen-reader order is correct for free. Verify with the accessibility tree, not by eye. |
| **Sticky left rail overlaps the shrunken nav** | Scroll past 120px | `top: calc(var(--nav-h-shrunk) + 24px)` on the sticky rail, and give the rail `max-height: calc(100vh - var(--nav-h-shrunk) - 48px); overflow-y: auto` so an eight-item rail can never exceed the viewport on a short laptop screen. |
| **Anchor jumps land under the nav** | Any TOC click | `scroll-margin-top: calc(var(--nav-h-shrunk) + 24px)` on every `h2`. |
| **200% zoom reflows into overlap** | The brief requires a 200%-zoom pass | At 200% zoom a 1280px viewport behaves as 640px → single column. Because the collapse is a media query on CSS pixels, this works automatically. **Verify** — it is the most common place a grid-with-rail layout fails an accessibility audit. |

## 4.4 The tablet band (768–1023px) is the real risk

This is where asymmetric layouts most often look broken, because designers design at 1440px and test at 375px.

At 900px, a 3-column rail is ~180px — below the 220px floor. **So at 768–1023px there is no rail at all**, and the prose column becomes the full container minus generous margins:

```
768–1023px: container 720px, prose max-width 600px (≈ 71 CPL @21px), left-aligned,
            not centred; rail items inline; progress rail is a 2px top bar.
```

Left-aligning rather than centring at tablet preserves the composition's asymmetry and keeps the visual identity consistent across breakpoints. A page that is asymmetric on desktop and centred on tablet reads as two different designs.

**Explicit breakpoint table for the build:**

| Range | Container | Prose | Left rail | Right rail | Figures |
|---|---|---|---|---|---|
| ≥1280 | 1200px | 570px | sticky, 150px | 258px | column 570 / wide 860 / full 1200 |
| 1024–1279 | 960px | 520px | sticky, 120px | 210px | column 520 / wide 720 / full 960 |
| 768–1023 | 720px | 600px | 2px top bar | inline | column 600 / wide 720 / full 720 |
| 640–767 | 100% − 48px | full | 2px top bar | inline | full width |
| 320–639 | 100% − 32px | full | 2px top bar | inline | full width, simplified diagram variants |

At 320px: prose = 288px. Newsreader at 18px → 38 CPL. That is below the comfortable band and unavoidable on a 320px screen; it is why body drops to 18px/1.65 on mobile rather than staying at 21px (which would give 33 CPL and look like a column of confetti).

---

# 5. Micro-interaction restraint: what the evidence actually says

## 5.1 Scroll-triggered fade-ins on text

**The brief's ban is supported by field research.** NN/g ran usability studies specifically on scroll-triggered text animation and on scroll fading. Findings, with the numbers:

- **Speed determines whether the content is read at all.** A scroll-fade taking **more than 500ms** is perceived as too slow, and when that duration is approached or exceeded **users routinely scroll past the element before the animation completes** — i.e. the animation causes the content to be *missed*, not noticed.
- **The workable band is 100–400ms.**
- **On body text it is a nuisance.** In NN/g's words, when scroll triggers are applied to the main body of text it becomes a nuisance, because fast readers do not want to be bogged down by a text fade every other paragraph. A participant: *"I don't like how everything comes together when I'm scrolling down. … I hate that it has to load every single section."*
- **Users skip most scroll-fading text on the first pass down a page.**
- **Persistence beats repetition.** Elements that stay visible after their first fade reduce cognitive load and give users a better chance of seeing the content. Re-triggering on every scroll-past is strictly worse.
- **One element at a time.** Text and image fading simultaneously pulls attention in too many directions; the successful examples animated one element only.
- **Context matters.** NN/g scopes scroll animation to leisure/browsing contexts (entertainment, art, ecommerce) and explicitly *not* to high-stakes, task-focused reading. **A hiring manager evaluating a candidate under time pressure is a task-focused reader.** This site is squarely in the "don't" bucket.

**Verdict: the brief's rule — "No scroll-triggered fade-ins on text blocks" — is correct and should be treated as non-negotiable.** The research does not merely say it is neutral; it says it causes content to be missed by exactly the fast-scanning reader this site is built for.

**On perceived quality**, the honest position: there is no controlled evidence that fade-ins raise perceived quality. What the 2026 design commentary converges on is the opposite association — restraint reads as authority, and uniform generic fade-ins are a named generator signature (§3.5). So the fade-in is negative on comprehension (measured) and negative on differentiation (pattern-matched). There is no side of the ledger on which it wins here.

## 5.2 The one permitted moment

The brief's hero sequence — three deltas drawing themselves once over ~700ms, then stillness — survives scrutiny **on three conditions**:

1. **It must not be scroll-triggered.** It fires on load, above the fold, where the reader is already looking. That sidesteps the entire body of scroll-fade findings, which are about content the reader scrolls *into*.
2. **Content must be present and readable before, during and after.** Animate `stroke-dashoffset` on the rule and `opacity` on the delta figure — never `opacity: 0` on the *number itself*, and never `display`/`visibility`. If JS fails or the animation never fires, the fully-formed proof strip must already be on screen. Author it as CSS `@keyframes` on server-rendered markup with the final state as the default, and the animation running *from* an offset state.
3. **It must never replay.** No `whileInView`, no `IntersectionObserver` re-trigger, no replay on back-navigation.

**Timing.** 700ms exceeds the 500ms scroll-fade threshold — but that threshold is specifically about content the user might scroll past mid-animation, which does not apply to an above-the-fold arrival sequence. Still, tighten it: **520ms for the rule draw, delta figures fading in over the final 160ms, no per-item stagger above 60ms.** Total ≤ 700ms including stagger. Anything slower and a reader who came to check a number is waiting on a decoration.

## 5.3 Motion tokens

```css
:root {
  --dur-fast: 120ms;   /* border colour, text colour, focus ring */
  --dur-base: 180ms;   /* <details> height + opacity */
  --dur-hero: 520ms;   /* the arrival sequence */
  --ease-ui:   cubic-bezier(0.2, 0, 0, 1);
  --ease-hero: cubic-bezier(0.16, 1, 0.3, 1);
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Three durations, two easings, total. Material Design 3's token set is far larger (`short1` = 50ms upward through several tiers) because it covers an entire OS surface area; a five-page portfolio with six interactions needs three tokens, and having exactly three is itself the differentiator (§3.5: "identical duration and easing on everything" is a tell — so is a 20-token motion system on a portfolio).

**The reduced-motion block must not be the only handling.** The hero sequence should *also* check the media query in its own CSS so that the final state is applied directly rather than being animated in 0.01ms — the blanket override is a safety net, not the implementation.

## 5.4 Interaction inventory — hold the line at six

The brief's list of six is right. Two refinements:

- **Nav shrink at 120px.** Animate `height` and `border-bottom-color` only. Do not animate `backdrop-filter` (expensive, and blur-on-scroll is a 2024 template signature). Do not change the wordmark size — a resizing wordmark is a fidget.
- **Copy-email confirmation.** The strongest version is the least animated: swap the label text to `Copied` in `--signal`, hold 1600ms, swap back. No toast, no checkmark icon, no scale bounce. Announce with `aria-live="polite"`.

---

# 6. Rejected list — patterns not to use on this brief

Grouped by why they are rejected. Each line is a build-time check.

## 6.1 Rejected because they are 2026 generator signatures

1. `initial={{ opacity: 0, y: 20 }}` / `whileInView` / any `translateY(20px)` reveal.
2. Framer Motion at all — 40 KB for six interactions the brief already scopes to CSS.
3. Blue→purple or purple→pink gradients; any `linear-gradient` outside the one documented table-fade mask.
4. Tailwind `blue-500` / `blue-600` / `indigo` / `violet` / `purple` anywhere in the tree.
5. `rounded-xl` / `rounded-2xl` (12–16px radius). 4px, everywhere, no exceptions.
6. `box-shadow` of any kind, including "subtle" `shadow-sm`.
7. Coloured left borders on cards or callouts — **including on the `mistake` callout.** Use an amber eyebrow + rule-above instead.
8. Icon-on-top feature cards; any decorative icon set (Lucide, Heroicons, Phosphor).
9. A coloured badge or pill directly above the H1.
10. A three-up `grid-cols-3` card row on the homepage. Stacked full-width rows, per the brief.
11. Bento grids.
12. Logo marquees, infinite tickers, auto-scrolling anything.
13. Numbered "1 / 2 / 3" process steps.
14. Emoji in navigation, section labels, or headings.
15. All-caps labels on every section. One all-caps role only (the `MetricDelta` eyebrow).
16. A single italic serif word inside a sans hero headline.
17. Pure `#000` or `#fff` for text or background.
18. Permanent dark mode; a theme toggle at all (the brief already excludes it).
19. AI-generated or stock imagery of any kind, including "abstract" hero art.
20. A hero with a centred headline and a centred sub-line and two centred buttons.

## 6.2 Rejected because the research says they harm this reader

21. Scroll-triggered fade-ins on any text block. Measured to cause content to be *missed* by fast scanners.
22. Any animation that re-triggers on scroll-past or on back-navigation.
23. Scroll-jacking, parallax, pinned-section scrollytelling. This reader arrived to evaluate a claim, not to be taken on a journey.
24. A custom cursor.
25. A right-rail table of contents (right-rail blindness). Progress rail left, evidence rail right.
26. A sticky in-body TOC (competes with global nav).
27. `scroll-behavior: smooth` without a `prefers-reduced-motion` guard.
28. Disclosure widgets that collapse under ~60 words — that is a parenthesis, not a disclosure.
29. Client-side-only disclosure content (not indexed, not `Cmd-F`-able). Use `<details>` with server-rendered content.
30. A chart legend. Direct-label every series.
31. A bare, unannotated product screenshot. Annotated or cut.
32. Mermaid default theme diagrams; whiteboard photographs.
33. A loading skeleton or spinner anywhere on a statically generated site.
34. A cookie banner (follows from choosing Plausible/Vercel Analytics over GA).
35. A contact form.

## 6.3 Rejected because they are typographically wrong here

36. `max-width` on prose expressed in `ch`. Use px/rem — `ch` overshoots by ~38% in Newsreader (§1.9).
37. Any prose measure above **640px** (= 80 CPL, the WCAG AAA ceiling).
38. Negative letter-spacing on serif body copy.
39. Font weights 800/900 for headings. 600 is the ceiling, per the brief.
40. Setting numerals in the sans without `font-variant-numeric: tabular-nums`.
41. Hyphen-minus (`-`) in a delta. Use U+2212 (`−`).
42. An SVG or icon-font arrow in a metric delta. Use U+2192 (`→`) so it is copy-pasteable.
43. `text-align: justify` (fails WCAG SC 1.4.8; produces rivers at a 570px measure).
44. More than three families or more than two axes of variation. Two families + one mono, weight 400–700 only.
45. `axes: ['opsz']` on the body serif — 2.3× the bytes for an identical default rendering.
46. `next/font/local` pointed at an unsubset upstream file (the raw `geist` npm woff2 is 69.6 KB / 975 glyphs).
47. `display: 'optional'` on any face. `swap`.
48. `font-feature-settings: "ss01"` while sourcing Geist from `next/font/google` — the feature does not exist in that build.

## 6.4 Rejected because they undermine this specific positioning

49. A "Design system" or "Style guide" page. Not a designer's portfolio (brief §9.4).
50. Personas, empathy maps, journey canvases, mood boards, Crazy-8s.
51. A skills grid, a tool logo wall, or a proficiency bar chart.
52. Twelve hi-fi screens per case study. Three to four annotated diagrams.
53. A hero portrait; any photograph above the fold.
54. A number without a denominator, anywhere, in any size — including in an OG image.
55. A testimonial placeholder, a "coming soon" case study, or a greyed-out third card. Ship what exists.
56. A stat banner without denominators — the pattern that turns the proof strip into a generator artifact.
57. Any diagram that requires pinch-to-zoom on mobile. Responsive SVG or a distinct simplified mobile variant.
58. A Lighthouse score badge image. If the score is mentioned at all, it is one line of text in the footer (brief §10.3).

---

# 7. Bonus: contrast audit of the brief's palette

Measured with the WCAG 2.x relative-luminance formula against `--paper #F6F5F2`. The brief itself asks for this verification (§13.7) and demands Lighthouse Accessibility 100.

| Pair | Ratio | WCAG |
|---|---:|---|
| `--ink #14181A` on `--paper` | **16.39:1** | AAA ✅ |
| `--signal #0E6F5C` on `--paper` | **5.59:1** | AA ✅ (AAA ✗) |
| `--signal #0E6F5C` on `#FFFFFF` | 6.09:1 | AA ✅ |
| `--flag #B4551F` on `--paper` | **4.52:1** | AA ✅ by 0.02 ⚠️ |
| `--muted #6B7278` on `--paper` | **4.48:1** | **FAILS AA for normal text** ❌ |
| `--rule #DEDCD6` on `--paper` | 1.26:1 | decorative only |

**Required changes:**

| Token | Current | Change to | New ratio | Why |
|---|---|---|---:|---|
| `--muted` | `#6B7278` | **`#5A6167`** | **5.77:1** | 4.48:1 fails AA at normal text sizes. `--muted` is specified for captions, metadata and denominators — all normal-size body text. This will fail Lighthouse's contrast audit and block the 100 score. |
| `--flag` | `#B4551F` | **`#9A4517`** | **5.95:1** | 4.52:1 passes by 0.02. Any anti-aliasing difference, any `opacity` below 1, or a later shift in `--paper` breaks it. The "what I got wrong" callout is one of the highest-value blocks on the site; it must not be the one that fails an audit. |
| `--signal` | `#0E6F5C` | keep, or `#0B5A4A` for AAA | 5.59 → 7.48:1 | Passes AA as-is. Darken only if AAA is wanted; `#0E6F5C` is more distinctive and 5.59:1 is comfortable for links and deltas. **Keep `#0E6F5C`.** |
| `--rule` | `#DEDCD6` | keep | 1.26:1 | Fine — decorative dividers are exempt from contrast minimums. **But**: if a hairline is the *only* thing separating rows in a decision table, that border becomes a "graphical object required to understand content" under SC 1.4.11 and needs 3:1. Fix by giving table rows alternating `--paper` / `--paper-raised` backgrounds, or by using `--muted` for the header rule specifically. |

**Additional checks the build must run:**

- Focus rings in `--signal` need **3:1 against both `--paper` and the adjacent component colour** (SC 1.4.11). `#0E6F5C` on `#F6F5F2` = 5.59:1 ✅.
- The `--signal` metric delta text is often 12–14px — normal text, so 4.5:1 applies, not the 3:1 large-text allowance. ✅ at 5.59.
- If any component sets `opacity` below 1 on text, recompute — `opacity` is applied after compositing and silently breaks contrast.

---

# 8. Sources

**Framework and font documentation**
- Next.js — Font Optimization: https://nextjs.org/docs/app/getting-started/fonts
- Next.js — Font Module API reference (`axes`, `weight`, `subsets`, `preload`, `adjustFontFallback`): https://nextjs.org/docs/app/api-reference/components/font
- Google Fonts CSS API v2: https://developers.google.com/fonts/docs/css2
- Google Fonts — variable fonts index: https://fonts.google.com/variablefonts
- Google Fonts — Geist: https://fonts.google.com/specimen/Geist · Geist Mono: https://fonts.google.com/specimen/Geist+Mono · Newsreader: https://fonts.google.com/specimen/Newsreader
- Vercel Geist: https://vercel.com/font · repo: https://github.com/vercel/geist-font · npm: https://www.npmjs.com/package/geist
- Production Type — Newsreader (optical sizes, design intent): https://productiontype.com/font/newsreader · repo: https://github.com/productiontype/Newsreader
- GitHub Mona Sans / Hubot Sans: https://github.com/github/mona-sans · https://github.blog/news-insights/company-news/introducing-mona-sans-and-hubot-sans/

**Typography and readability research**
- Baymard — Readability: The Optimal Line Length: https://baymard.com/blog/line-length-readability
- Visible Language — *Optimal Line Length in Reading: A Literature Review*: https://journals.uc.edu/index.php/vl/article/view/5765
- UXPin — Optimal line length, the 50–75 character rule (2026): https://www.uxpin.com/studio/blog/optimal-line-length-for-readability/
- W3C — Understanding SC 1.4.8 Visual Presentation (80 chars, 1.5 leading, no justification, 200% zoom): https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation.html

**Long-form and editorial layout**
- Tufte CSS: https://edwardtufte.github.io/tufte-css/ (stylesheet measured directly: `raw.githubusercontent.com/edwardtufte/tufte-css/gh-pages/tufte.css`)
- Gwern — Sidenotes in Web Design (failure modes, 760px/520px thresholds, implementation comparison): https://gwern.net/sidenote
- Distill — authoring guide and figure layout system: https://distill.pub/guide/ · https://rstudio.github.io/distill/figures.html
- Edward Tufte — Sparkline theory and practice: https://www.edwardtufte.com/notebook/sparkline-theory-and-practice-edward-tufte/
- Caltech Hixon Writing Center — Composing effective figure captions: https://writing.caltech.edu/documents/27629/HWC-FigureCaptionHandout.1-2024.pdf

**Navigation, disclosure and motion research**
- NN/g — Scroll-Triggered Text Animations Delay Users: https://www.nngroup.com/articles/scroll-animations/
- NN/g — Scroll Fading 101 (100–400ms band, 500ms threshold, element persistence): https://www.nngroup.com/articles/scroll-fading-101/
- NN/g — Animation for Attention and Comprehension: https://www.nngroup.com/articles/animation-usability/
- NN/g — Table of Contents: The Ultimate Design Guide (sticky-in-rail vs non-sticky-in-body; right-rail blindness): https://www.nngroup.com/articles/table-of-contents/
- NN/g — In-Page Links for Content Navigation: https://www.nngroup.com/articles/in-page-links-content-navigation/
- GitHub Primer — Progressive disclosure: https://primer.style/product/ui-patterns/progressive-disclosure/
- Material Design 3 — Easing and duration tokens: https://m3.material.io/styles/motion/easing-and-duration/tokens-specs

**Data visualisation**
- U.S. Data Visualization Standards — Labels (direct labelling over legends): https://xdgov.github.io/data-design-standards/components/labels
- Depict Data Studio — Remove legends and directly label: https://depictdatastudio.com/accessibility-quick-wins-remove-legends-and-directly-label/

**2026 AI-generated / templated design tells**
- Sailop — AI Slop in 2026: The State of the AI-Generated Web (font share, `blue-500` prevalence, `rounded-2xl`, `opacity/y:20` motion default, 154-point rubric, "the conditional probability stacks"): https://www.sailop.com/blog/ai-slop-2026-state-of-the-ai-generated-web
- Sailop — AI Slop: The Definitive 2026 Guide: https://www.sailop.com/blog/ai-slop-definitive-guide-2026
- Developers Digest — AI Design Slop: 16 Patterns That Out Your App as Vibe-Coded (coloured left borders, badge-above-H1, italic serif accent word, all-caps labels, icon-top cards): https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it
- 925 Studios — AI Slop Web Design: Complete Guide (uniform 16px radius, uniform 24px padding, copy patterns): https://www.925studios.co/blog/ai-slop-web-design-guide
- GrowthGuys — How to Spot an AI Slop Website in 60 Seconds (the 200px silhouette test): https://growthguys.tech/blog/genuine-website-vs-ai-slop.html
- Medium (S. Kargutkar) — Your Website Looks Like AI Made It: https://medium.com/@sahilkargutkar.sk/your-website-looks-like-ai-made-it-and-thats-becoming-a-problem-e679668ca7f4

**Shipped stylesheets measured directly on 2026-08-19** (used only to corroborate the measure band in §1.9; no layout, structure or copy was taken from any of them)
- vercel.com/blog · anthropic.com/engineering · worksinprogress.news · every.to · asteriskmag.com

---

## Appendix — reproduction commands

```bash
# 1. Measure the latin-subset size of any Google font, exactly as next/font would ship it.
#    NOTE: a modern Chrome UA is REQUIRED or Google serves TTF and every number is wrong.
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'
curl -s -A "$UA" 'https://fonts.googleapis.com/css2?family=Newsreader:wght@200..800&display=swap'
# → take the woff2 URL from the /* latin */ block, then:
curl -s -A "$UA" -o /dev/null -w '%{size_download}\n' '<that-url>'

# 2. Audit which OpenType features and axes a build actually contains.
pip3 install fonttools brotli
python3 - <<'PY'
from fontTools.ttLib import TTFont
f = TTFont('font.woff2')
print('axes  ', [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in f['fvar'].axes])
print('GSUB  ', sorted({r.FeatureTag for r in f['GSUB'].table.FeatureList.FeatureRecord}))
print('glyphs', f['maxp'].numGlyphs, 'x-height', f['OS/2'].sxHeight / f['head'].unitsPerEm)
PY

# 3. Produce the Path-B subset files (run once, commit the output to app/fonts/).
GF_LATIN="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,\
U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2190-2193,U+2197,U+2212,U+2215,U+FEFF,U+FFFD"

npm pack geist@1.7.2 && tar xzf geist-1.7.2.tgz
python3 -m fontTools.varLib.instancer \
  package/dist/fonts/geist-sans/Geist-Variable.woff2 wght=400:700 -o /tmp/g.ttf
python3 -m fontTools.subset /tmp/g.ttf --unicodes="$GF_LATIN" \
  --layout-features="ccmp,liga,locl,tnum,pnum,frac,case,ss01" \
  --flavor=woff2 --no-hinting --output-file=app/fonts/Geist-latin-400-700.woff2
# → 16,720 bytes. Repeat for GeistMono (wght=400:500) and Newsreader (wght=400:700 + italic 400).
# → Copy OFL.txt from each upstream repo into app/fonts/. Required by the licence.
```
