import { z } from 'zod'

/**
 * Content schema.
 *
 * Two fields here are deliberately non-optional and exist to force a
 * credibility behaviour into every case study that is ever added to this site:
 *
 *   1. `notOwned` — a case study that cannot state what it did NOT own does
 *      not ship. Candidates maximise ownership claims; strong ones bound them.
 *   2. `metrics[].denominator` — no number reaches a reader without a
 *      population, a timeframe and a measurement method attached.
 *
 * Do not relax either one. `npm run check:content` fails the build on both.
 */

/** A number that has earned the right to be displayed. */
export const metricSchema = z.object({
  /** Short uppercase label, e.g. "COLD START". Rendered in mono. */
  label: z.string().min(1),
  /** Value before the work. Include the unit: "15s", "3.5 min", "25MB". */
  before: z.string().min(1),
  /** Value after the work. Same unit as `before`. */
  after: z.string().min(1),
  /** Population or segment the number is measured over. REQUIRED. */
  denominator: z.string().min(1),
  /** Measurement window. REQUIRED. */
  timeframe: z.string().min(1),
  /** How it was measured. REQUIRED. */
  method: z.string().min(1),
  /** Which direction counts as good. Drives the delta colour, not the sign. */
  direction: z.enum(['down-is-good', 'up-is-good']),
  /** Pre-computed delta string, e.g. "−87%". Omit when a % is meaningless. */
  delta: z.string().optional(),
  /** Set only on the hero instances. Everything else is static. */
  animate: z.boolean().default(false),
})

export type Metric = z.infer<typeof metricSchema>

/** A collapsed disclosure containing depth, not decoration. */
export const artifactSchema = z.object({
  /**
   * A specific claim, never "Read more".
   * Good: "How I defined session time, and the metric I nearly used instead"
   */
  label: z.string().min(12, 'Artifact labels must be a specific claim, not a generic prompt'),
  kind: z.enum(['reasoning', 'method', 'decision', 'data']),
  /** Server-rendered markdown body. Indexed and Cmd-F-able while collapsed. */
  body: z.string().min(1),
})

export type Artifact = z.infer<typeof artifactSchema>

/**
 * A figure with no before. Same qualifier discipline, different shape — the
 * rule was never "every delta carries a denominator", it was every number.
 */
export const statSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  denominator: z.string().min(1),
  timeframe: z.string().min(1),
  method: z.string().min(1),
})

export type Stat = z.infer<typeof statSchema>

export const caseStudySchema = z
  .object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  tagline: z.string().min(1),
  /** The tension line used on the homepage card. Never a feature name. */
  headline: z.string().min(1),
  /** Manual ordering. Never sort by date. */
  order: z.number().int().positive(),
  role: z.string().min(1),
  teamShape: z.string().min(1),
  timeline: z.string().min(1),
  /** What Aniket personally decided, prioritised or led. */
  owned: z.array(z.string().min(1)).min(1),
  /** What the team delivered together. */
  shipped: z.array(z.string().min(1)).min(1),
  /** What engineering, design, leadership or another team owned. REQUIRED. */
  notOwned: z
    .array(z.string().min(1))
    .min(1, 'A case study that cannot state what it did not own does not ship.'),
  /**
   * A delta needs a real before. Where the record gives an outcome with no
   * baseline, it belongs in `stats`, not here with an invented starting point.
   */
  metrics: z.array(metricSchema).default([]),
  stats: z.array(statSchema).default([]),
  artifacts: z.array(artifactSchema).max(4, 'Maximum four artifact drawers per case study'),
  /** SEO. 150–160 chars. */
  description: z.string().min(80).max(200),
  ogHeadline: z.string().min(1),
  ogMetric: z.string().min(1),
  published: z.boolean().default(true),
  })
  .refine((c) => c.metrics.length + c.stats.length >= 1, {
    message: 'A case study must display at least one qualified figure, delta or otherwise.',
    path: ['metrics'],
  })

export type CaseStudyFrontmatter = z.infer<typeof caseStudySchema>

export const shortCaseSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  company: z.string().min(1),
  timeline: z.string().min(1),
  role: z.string().min(1),
  order: z.number().int().positive(),
  /** The trade-off, stated first. Short cases lead with the cost, not the win. */
  tradeoff: z.string().min(1),
  metrics: z.array(metricSchema),
  notOwned: z.array(z.string().min(1)).min(1),
})

export type ShortCaseFrontmatter = z.infer<typeof shortCaseSchema>

export const labProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  tagline: z.string().min(1),
  /**
   * Honest liveness. `live` may only be used when the demo runs end to end in
   * production. Everything else says so on the page, in the badge.
   */
  status: z.enum(['live', 'in-development', 'concept']),
  statusNote: z.string().min(1),
  repo: z.string().url().optional(),
  order: z.number().int().positive(),
  description: z.string().min(80).max(200),
})

export type LabProjectFrontmatter = z.infer<typeof labProjectSchema>

/**
 * The homepage.
 *
 * Its six sections are fixed; only the words move. Keeping them in content
 * rather than in the page component means the copy is diffable and the one
 * place a claim can be introduced is a content file the gates already scan.
 */
export const beliefSchema = z.object({
  /** One sentence. Present tense. Something an operator says. */
  claim: z.string().min(10),
  /** Two lines of concrete example. Must trace to the record. */
  example: z.string().min(20),
  /** The case study that evidences it. */
  href: z.string().startsWith('/'),
})

export const homeSchema = z.object({
  /** Names the role, the scale and the arrival. Never "1M users". */
  subline: z.string().min(20),
  /** Renders with a [NEEDS:] token until CONTENT_GAPS B12 is answered. */
  status: z.string().min(10),
  /** One line pointing at Grounded, for the reader who opens the demo first. */
  labPointer: z.string().min(10),
  /**
   * The visual anchor beside the headline. It is a separate field rather than
   * proof[0] because the hero must carry NO unanswered token — a reader in the
   * first ten seconds should meet a number that is complete. Unqualified
   * fields belong in the proof strip, where there is room to say what is
   * missing.
   */
  heroMetric: metricSchema,
  proof: z.array(metricSchema).min(2).max(3),
  workIntro: z.string().min(20),
  beliefs: z.array(beliefSchema).min(3).max(3),
  builtIntro: z.string().min(20),
  closing: z.string().min(10),
})

export type HomeFrontmatter = z.infer<typeof homeSchema>
