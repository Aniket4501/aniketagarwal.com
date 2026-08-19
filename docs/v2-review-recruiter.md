# V2 Review 4 — Product Recruiter · 20 seconds · mobile (390px)

Sources read: `docs/screenshots/iteration-v2-1/home-390.png` (first screen),
`docs/screenshots/iteration-v2-1/home-390-full.png` (780 × 25,546px — fast-scroll check).
All pixel positions below are in `home-390-full.png` image pixels (2× DPR, so halve for CSS px).

---

## 1. Can I understand the candidate in 20 seconds?

**Yes — the work. No — the person.**

In 20 seconds I can tell you what he has shipped and at what scale. I cannot tell you his name,
where he lives, how senior he is, or what job he wants. That is a pass on evidence and a fail on
routing, and routing is what a recruiter does. I do not evaluate candidates in 20 seconds; I decide
which pile they go in, and this page does not give me enough to file it.

---

## 2. The eight facts

| # | Fact | Verdict | Evidence |
|---|---|---|---|
| 1 | Current role | **FOUND — but misleading** | See below |
| 2 | Years of experience | **NOT FOUND** — FAILURE | Buried at 11,340px |
| 3 | Domain | **FOUND** | First screen |
| 4 | Product scope | **FOUND** | First screen |
| 5 | Location | **NOT FOUND** — FAILURE | Footer, 25,293px |
| 6 | Target role | **NOT FOUND** — FAILURE | 23,300px |
| 7 | Résumé link | **FOUND** | First screen, twice |
| 8 | LinkedIn link | **FOUND** — under-weighted | First screen |

### 1. Current role — FOUND, but the page tells me two different things

First screen, hero paragraph: *"Product at HCL Healthcare since October 2024, where I own
engagement on a consumer health app with 1M+ registered users."* Company and start date, clean.

But the eyebrow directly above the headline reads **"PRODUCT MANAGER · CONSUMER · HEALTH ·
APPLIED AI"**, and the hero paragraph says "Product at" — not a title. Scroll to the experience
timeline at 11,550px and the actual title appears: **"HCL Healthcare · Current"** / **"Product
Analyst"** / **"Oct 2024 — Present · Noida"**.

So the top of the page says Product Manager and the record says Product Analyst. That is not a
detail. It is the exact discrepancy a hiring manager will find on the click-through, after I have
already sent it, and the cost lands on me.

### 2. Years of experience — NOT FOUND. FAILURE.

Nothing on the first screen. The only answers are *"Four years of product work, one of them owning
a surface"* (EXPERIENCE heading, 11,340px) and *"Product work since 2022 across media,
marketplaces, fintech onboarding, insurance claims and now health"* (About block, ~22,300px). Both
are past the point a 20-second mobile scroll reaches. On the first screen "since October 2024" is
the only date, which — read alone, which is how it will be read — implies he started ten months ago.

Worse, the honest version is the hedge: "one of them owning a surface." The timeline confirms it —
Circle Health, Product Intern, Jul–Sep 2024; Droom, Product Management Intern, May–Jul 2023;
Infinyte Club, Product Operations. So it is roughly ten months of full-time product ownership on
top of internships. That is a fine story for an APM pipeline and a bad surprise at minute four. The
first screen should own the number instead of letting me discover it.

### 3. Domain — FOUND. Strongest fact on the page.

Eyebrow: "CONSUMER · HEALTH · APPLIED AI". Hero paragraph: "consumer health app". Proof panel:
"Consumer health super-app". Three reinforcements above the fold. I never have to guess.

### 4. Product scope — FOUND. Also strong.

Hero: "1M+ registered users." Proof panel, partially visible on the first screen and fully visible
after one thumb-flick: **1M+** Registered users · **+20%** App engagement · **+35%** Step-sync
completion · **15%** Incremental revenue, plus an "AI Smart Health Report · Personalised insights ·
taken 0→1" strip. Four numbers with what-they-mean captions under each. This is the part of the
page doing real work — it is the only block that would survive being screenshotted into Slack.

### 5. Location — NOT FOUND. FAILURE, and the most expensive one.

The only statements are the timeline meta line "Oct 2024 — Present · Noida" at 11,660px and the
footer byline **"Aniket Agarwal · Noida, India · Built with Next.js"** at 25,293px — the last line
of a 25,546px page. For any role with a geography or work-authorisation constraint, region is the
first filter I apply, before I read a single metric. Making me scroll 25,000px for it means I open
LinkedIn instead, and once I am on LinkedIn the site has lost the candidate's story to a template.

### 6. Target role — NOT FOUND. FAILURE.

*"I'm open to PM, APM and AI PM roles across consumer product, health and applied AI"* exists — at
~23,300px, in the contact block, 91% of the way down. That sentence is the single most useful line
on the entire site for a recruiter and it is placed where only someone who has already decided to
hire him will read it. The eyebrow "PRODUCT MANAGER" is not a substitute: it reads as a claim about
what he is, not a statement about what he is looking for, and per fact 1 it is a claim the timeline
contradicts.

### 7. Résumé link — FOUND. Best-executed thing on the page.

Two hits on the first screen: a bordered pill **"Résumé ↗"** in the sticky header, and a secondary
outlined button **"Résumé ↗"** in the hero button row. Present again in the footer under ELSEWHERE.
I can get the PDF without thinking. Good.

### 8. LinkedIn — FOUND, but visually demoted to a footnote.

**"LinkedIn ↗"** sits on the first screen, to the right of the Résumé button. It is rendered as
grey plain text with no button container, next to a filled black "View my work →" button and an
outlined "Résumé" button. It is the lowest-contrast and smallest tap target in a row of three, and
on a phone I will miss it or mis-tap it. Given that LinkedIn is where I go to get his name, title
and location — the three things this page will not tell me — demoting it is backwards.

**Score: 4 clean, 1 misleading, 3 outright failures.**

---

## 3. The Slack message I would actually paste

> Product at HCL Healthcare since Oct 2024 — owns engagement on a consumer health app with 1M+
> registered users. Two products 0→1, cut app launch from 15s to under 2s (+35% step-sync
> completion), and shipped an AI health report now cited as a USP in 5 enterprise closes. Résumé
> and LinkedIn on the site. Portfolio: [link]

Read that back. **It has no name in it.** I built it entirely from the first screen and the first
scroll, exactly as briefed, and the first screen does not contain "Aniket Agarwal" anywhere — the
header carries an **"AA" monogram only**, and the full name appears once, in the footer byline at
25,293px. I cannot write "Hey, take a look at ___" without opening a second tab first.

That is a structural defect, not a nitpick. It is also trivially fixable.

---

## 4. What I would open a second tab to find out

1. **His name.** Monogram only in the header.
2. **Where he is based and whether he needs sponsorship.** Footer-only.
3. **What he is actually looking for, and at what level.** PM? APM? That answer is at 23,300px.
4. **Whether "Product Manager" is his title or his ambition.** The page says both.
5. **Total experience.** Ten months, or four years, or four years mostly interning.

Every one of those is on LinkedIn and answerable in five seconds. **That is the gap: the second tab
does not supplement this site, it replaces it.** A portfolio that sends me to LinkedIn for the
filtering facts has inverted its own job — it wins the argument about competence and then loses the
decision about routing.

---

## 5. Would anything on the first screen stop me forwarding this? Bluntly, yes.

**Blocker 1 — no name.** I cannot write the intro line without leaving. Realistically, half the
time that means I forward the LinkedIn profile and this site is never opened by the hiring manager
at all. Everything else on this page is downstream of that failure.

**Blocker 2 — "PRODUCT MANAGER" over a Product Analyst record.** This is the one that would make me
hesitate rather than just slow down. If I forward it as PM-ready and my hiring manager scrolls to
11,550px and reads "Product Analyst," I look like I did not read the material. Recruiters do not
forward things that can embarrass them. Either the eyebrow becomes accurate ("PRODUCT ANALYST ·
CONSUMER HEALTH · APPLIED AI") or the hero states the transition plainly. The current wording tries
to have it both ways and buys a credibility problem for free.

**Blocker 3 — the headline is a philosophy, not an identification.** *"I find the reason a product
isn't being used — then I go fix it."* occupies four lines and the largest type on the screen. It
is a genuinely good line and it is not what I needed that space for. I skipped it and read the
paragraph underneath, which is where all the facts live. Big type spent on a maxim while the name,
level and location are absent is the wrong allocation for the first screen.

**Not blockers, but noted:**

- **Page length.** 25,546px at 390 wide (≈12,700 CSS px). In 20 seconds of thumb-flicking I reach
  the first case card and no further. Everything from the experience timeline down — the timeline,
  the About block, the target-role sentence, the location — does not exist for a first-pass reader.
- **Duplicate contact block.** "Have a product problem worth solving?" renders **twice, back to
  back**, at ~23,240px and again at ~24,210px, each with the same `aniketagarwalmhq24@gmail.com`
  button and the same "Copy" link, with nothing between them. The second is the footer CTA
  repeating the section directly above it verbatim. It reads as a rendering bug and it is the one
  thing on the page that looks unfinished.
- No internal QA markers found. The red bar at ~7,390px is a legitimate "Before 15s / Benchmark 2s
  / Shipped under 2s" scale chart, not a leaked marker. Clean on that count.

---

## The three edits that fix the filter, in priority order

1. **Put "Aniket Agarwal" on the first screen** — wordmark instead of the "AA" monogram, or a name
   line above the eyebrow. Nothing else matters until I can name him.
2. **Move "Noida, India · Open to PM / APM / AI PM roles" into the hero**, as a small line under
   the button row. It costs one line of type and closes two of the three failures outright.
3. **Make the eyebrow match the timeline, and put the tenure on the first screen** — "Product
   Analyst · HCL Healthcare · 4 years in product, 10 months owning a surface" is a stronger,
   safer sentence than an unqualified "PRODUCT MANAGER," because it survives the click-through.

Do those three and the page goes from "open LinkedIn to file this" to "forward as-is." The evidence
layer is already good enough; it is the identification layer that is missing.
