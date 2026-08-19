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
  // No GitHub URL. The resume hyperlinks the word "GitHub" but the target is
  // not recoverable from the PDF's text layer, and `gh` being authenticated as
  // a handle on this machine is a local credential, not a stated public
  // profile. Guessing it would publish an unverified link in the footer and in
  // JSON-LD. See CONTENT_GAPS.md B16.
  /**
   * The speakable URL, not the file path. It 307s to the PDF via next.config,
   * so the filename can change without breaking a link anyone has said out
   * loud or written on a resume.
   */
  resume: '/resume',
  // Rewritten per D1-03: "retention" may appear only as a problem, never as an
  // outcome. The previous string used it as an outcome, in the one sentence
  // that shows up in search results. Case three is a monetisation case (D1-07),
  // so it is described that way and not as AI safety work.
  defaultDescription:
    // "retention" is deliberately absent. It appears in the record only as a
  // problem being addressed, never as an outcome, and a meta description is
  // read out of context where the distinction is invisible.
  'Product Analyst at HCL Healthcare — engagement on a consumer health app with 1M+ registered users. Cold-start latency, three strategies on the table and one choice, and a health report that ended up inside the enterprise sale.',
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
    note: 'Consumer health · 1M+ registered users',
  },
  {
    period: '2024',
    role: 'Product Intern',
    org: 'Circle Health',
    place: 'Bangalore',
    note: 'Claims journey',
    conflict: 'C6',
  },
  {
    period: '2023',
    role: 'Product Management Intern',
    org: 'Droom',
    place: 'Gurugram',
  },
  {
    period: '2023',
    role: 'Product Operations',
    org: 'Infinyte Club',
    place: 'Bangalore',
    note: 'Signup and KYC',
    conflict: 'C3, C4',
  },
  {
    period: '2022',
    role: 'Product Management Intern',
    org: 'YourStory Media',
    place: 'Bangalore',
    conflict: 'C5',
  },
] as const

/** Tools. One line, at the bottom of /about, and nowhere else on the site. */
export const tools =
  'SQL · Python · Mixpanel · Amplitude · CleverTap · Tableau · Figma · JIRA · Confluence · Notion'
