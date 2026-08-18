/**
 * Site-wide constants.
 *
 * Every value here traces to docs/00-source-facts.md. Nothing is invented.
 * Conflicts between the resume and the LinkedIn export are resolved to the
 * more conservative claim and logged in CONTENT_GAPS.md.
 */

export const site = {
  name: 'Aniket Agarwal',
  /** Conservative: 22 months at HCL as of Aug 2026 is not "two years". */
  role: 'Product',
  company: 'HCL Healthcare',
  location: 'Noida, India',
  email: 'aniketagarwalmhq24@gmail.com',
  linkedin: 'https://www.linkedin.com/in/aniket-agarwal-pm',
  github: 'https://github.com/Aniket4501',
  resume: '/aniket-agarwal-resume.pdf',
  defaultDescription:
    'Product at HCL Healthcare — engagement and retention on a 1M+ registered-beneficiary consumer health app. Case studies on cold-start latency, habit-loop design and bounded generative AI in healthcare.',
} as const

/** Resolved once, so metadata, sitemap, robots and OG tags agree. */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (vercel) return `https://${vercel}`
  return 'http://localhost:3000'
}

/**
 * The timeline. One line per role, in reverse chronological order.
 *
 * Where the resume and LinkedIn disagree on a title or a duration, the value
 * below is the one that CLAIMS LESS. Conflict IDs refer to CONTENT_GAPS.md.
 */
export const timeline = [
  {
    period: '2024 — now',
    role: 'Product Analyst',
    org: 'HCL Healthcare',
    place: 'Noida',
    note: 'Consumer health · 1M+ registered beneficiaries',
  },
  {
    period: '2024',
    role: 'Product Intern',
    org: 'Circle Health',
    place: 'Bangalore',
    note: 'Insurance claims',
    conflict: 'C6',
  },
  {
    period: '2023',
    role: 'Product Management Intern',
    org: 'Droom',
    place: 'Gurugram',
    note: 'Auto marketplace',
  },
  {
    period: '2023',
    role: 'Product Operations',
    org: 'Infinyte Club',
    place: 'Bangalore',
    note: 'Fintech onboarding',
    conflict: 'C3, C4',
  },
  {
    period: '2022',
    role: 'Product Management Intern',
    org: 'YourStory Media',
    place: 'Bangalore',
    note: 'Media',
    conflict: 'C5',
  },
] as const

/** Tools. One line, at the bottom of /about, and nowhere else on the site. */
export const tools =
  'SQL · Python · Mixpanel · Amplitude · CleverTap · Tableau · Figma · JIRA · Confluence · Notion'
