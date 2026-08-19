import { z } from 'zod'

/**
 * Content schema — V2.
 *
 * Two rules are enforced here rather than trusted to an author:
 *
 *   1. `notOwned` is required. A case study that cannot state what it did NOT
 *      own does not ship. Candidates maximise ownership claims; bounding yours
 *      is what makes the unbounded ones believable.
 *
 *   2. No field may contain an internal gap marker. V1 rendered `[NEEDS: …]`
 *      tokens in production — twenty-six of them, in red — which read as a form
 *      with validation errors rather than as rigour. Unanswered questions now
 *      live in CONTENT_GAPS.md and nowhere else, and the build fails if one
 *      leaks back in.
 */

/** No internal QA marker may reach the public site. */
const clean = (label: string) =>
  z.string().refine((v) => !/\[NEEDS:/i.test(v), {
    message: `${label} contains an internal [NEEDS:] marker. Those belong in CONTENT_GAPS.md, never on the site.`,
  })

const cleanMin = (label: string, min = 1) => clean(label).pipe(z.string().min(min))

/** A before → after movement. */
export const metricSchema = z.object({
  label: cleanMin('metric.label'),
  before: cleanMin('metric.before'),
  after: cleanMin('metric.after'),
  /** Pre-computed delta, e.g. "76% smaller". Omit where a % is meaningless. */
  delta: clean('metric.delta').optional(),
  /**
   * One readable line of measurement context — population, window, method —
   * written as prose rather than three separate fields. Omitted entirely when
   * it is not known, which is the honest render; the open question is tracked
   * in CONTENT_GAPS.md.
   */
  note: clean('metric.note').optional(),
})

export type Metric = z.infer<typeof metricSchema>

/** A headline figure with no before: "1M+ users", "5+ enterprise clients". */
export const figureSchema = z.object({
  value: cleanMin('figure.value'),
  label: cleanMin('figure.label'),
  context: clean('figure.context').optional(),
})

export type Figure = z.infer<typeof figureSchema>

/** Collapsed depth. The label is a specific claim, never "Read more". */
export const drawerSchema = z.object({
  label: cleanMin('drawer.label', 12),
  body: cleanMin('drawer.body'),
})

export const caseStudySchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    /** Short product name, used as the card and page title. */
    title: cleanMin('title'),
    /** One line: what the work achieved. Shown under the title. */
    outcome: cleanMin('outcome'),
    /** The card's category chip — "Performance", "0→1 Growth", "Applied AI". */
    category: cleanMin('category'),
    /** One line stating the problem, for the card. */
    problem: cleanMin('problem'),
    /** What changed, for the card. */
    change: cleanMin('change'),
    order: z.number().int().positive(),

    role: cleanMin('role'),
    timeline: clean('timeline').optional(),
    team: clean('team').optional(),
    scope: clean('scope').optional(),

    owned: z.array(cleanMin('owned')).min(1),
    shipped: z.array(cleanMin('shipped')).min(1),
    notOwned: z
      .array(cleanMin('notOwned'))
      .min(1, 'A case study that cannot state what it did not own does not ship.'),

    /** The one number the card leads with. */
    headline: metricSchema,
    /** Everything measured, shown in the results block. */
    metrics: z.array(metricSchema).default([]),
    figures: z.array(figureSchema).default([]),

    drawers: z.array(drawerSchema).max(3).default([]),

    description: clean('description').pipe(z.string().min(80).max(200)),
    ogHeadline: cleanMin('ogHeadline'),
    ogMetric: cleanMin('ogMetric'),
    published: z.boolean().default(true),
  })
  .refine((c) => c.metrics.length + c.figures.length >= 1, {
    message: 'A case study must show at least one measured figure.',
    path: ['metrics'],
  })

export type CaseStudyFrontmatter = z.infer<typeof caseStudySchema>

export const shortCaseSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: cleanMin('title'),
  company: cleanMin('company'),
  timeline: cleanMin('timeline'),
  role: cleanMin('role'),
  order: z.number().int().positive(),
  problem: cleanMin('problem'),
  /** Short cases lead with the cut, not the result. */
  tradeoff: cleanMin('tradeoff'),
  metrics: z.array(metricSchema).default([]),
  figures: z.array(figureSchema).default([]),
  notOwned: z.array(cleanMin('notOwned')).min(1),
})

export type ShortCaseFrontmatter = z.infer<typeof shortCaseSchema>

export const labProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: cleanMin('title'),
  tagline: cleanMin('tagline'),
  /** Honest liveness. `live` only where the thing runs end to end in production. */
  status: z.enum(['live', 'in-development', 'concept']),
  statusNote: cleanMin('statusNote'),
  /** Why it was built, in one line. */
  why: cleanMin('why'),
  repo: z.string().url().optional(),
  order: z.number().int().positive(),
  description: clean('description').pipe(z.string().min(80).max(200)),
})

export type LabProjectFrontmatter = z.infer<typeof labProjectSchema>

/** A belief, with the work that evidences it. */
export const principleSchema = z.object({
  title: cleanMin('principle.title'),
  body: cleanMin('principle.body'),
  example: cleanMin('principle.example'),
  href: z.string().startsWith('/').optional(),
})

export const homeSchema = z.object({
  eyebrow: cleanMin('eyebrow'),
  headline: cleanMin('headline'),
  /** 2–3 lines: current role, product scope, scale, what makes him different. */
  intro: cleanMin('intro'),
  /** The hero's evidence panel. */
  proofPanel: z.array(figureSchema).min(3).max(5),
  /** "By the numbers" — the section immediately after the hero. */
  numbers: z.array(figureSchema).min(3).max(6),
  workLead: cleanMin('workLead'),
  principles: z.array(principleSchema).min(3).max(4),
  labLead: cleanMin('labLead'),
  aboutLead: cleanMin('aboutLead'),
  ctaTitle: cleanMin('ctaTitle'),
  ctaBody: cleanMin('ctaBody'),
})

export type HomeFrontmatter = z.infer<typeof homeSchema>

/** One role on the experience timeline. */
export type Role = {
  company: string
  title: string
  period: string
  place: string
  summary: string
  points: string[]
  current?: boolean
}
