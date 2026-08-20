import type { Role } from './content/schema'

/**
 * Site-wide facts.
 *
 * Every value traces to the resume, the LinkedIn export, or Aniket's own V2
 * brief (recorded as Source D in docs/00-source-facts.md). Where the resume and
 * LinkedIn disagree, the value below is the one that claims less.
 */

export const site = {
  name: 'Aniket Agarwal',
  /** The literal title in both source documents. Never 'Product Manager'. */
  title: 'Product Analyst',
  company: 'HCL Healthcare',
  location: 'Noida, India',
  email: 'aniketagarwalmhq24@gmail.com',
  linkedin: 'https://www.linkedin.com/in/aniket-agarwal-pm',
  /** The speakable URL. 307s to the PDF, so the filename can change freely. */
  resume: '/resume',
  defaultDescription:
    'Product Analyst at HCL Healthcare, owning engagement on a consumer health app with 1M+ registered users. Step syncing, a 0→1 engagement league, and an AI health report that became an enterprise USP.',
} as const

export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (vercel) return `https://${vercel}`
  return 'http://localhost:3000'
}

/**
 * Experience. Four or five high-value points per role, not every resume
 * bullet — the purpose is trajectory, not reproduction.
 */
/**
 * Months of continuous ownership, computed rather than written down.
 *
 * The homepage previously claimed "one of them owning a surface", which was
 * true in month one and had been wrong for a year by the time anyone noticed.
 * A duration hard-coded into copy is a fact with an expiry date, so this one
 * is derived at build time from the start date and cannot rot.
 */
/**
 * Build date, formatted for the footer. Nothing on the site said whether it was
 * current, and an undated portfolio reads as abandoned after a year. Derived
 * from the build so it needs no maintenance.
 */
export function lastUpdated(now: Date = new Date()): string {
  return now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

export const OWNERSHIP_START = new Date(2024, 9) // October 2024

export function ownershipMonths(now: Date = new Date()): number {
  return (
    (now.getFullYear() - OWNERSHIP_START.getFullYear()) * 12 +
    (now.getMonth() - OWNERSHIP_START.getMonth())
  )
}

export const experience: Role[] = [
  {
    company: 'HCL Healthcare',
    title: 'Product Analyst',
    period: 'Oct 2024 — Present',
    place: 'Noida',
    current: true,
    summary:
      'Own engagement on a consumer health super-app with 1M+ registered users — the roadmap, the PRDs, and what ships in what order.',
    points: [
      'Diagnosed a fifteen-second app launch as the real adoption blocker, and led an eight-week cross-functional initiative that brought it under two seconds and cut the bundle from 25MB to 6MB.',
      'Ran cohort analysis across three retention strategies and took Steps Premier League from 0→1, moving session time from 3.5 to 7.8 minutes.',
      'Built the AI Smart Health Report 0→1 — product requirements, UX flow and personalisation logic — with cross-sell hooks driving 15% incremental revenue and the report becoming a key USP in 5+ enterprise closes.',
      'Shipped an engagement suite spanning challenges, streaks, live events and trackers, lifting daily actives 20% within twelve weeks.',
      'Raised step-sync completion 35% and health-assessment completion 15%, and cut 30% of the manual effort in the reporting loop.',
    ],
  },
  {
    company: 'Circle Health',
    title: 'Product Intern',
    period: 'Jul — Sep 2024',
    place: 'Bangalore',
    summary: 'Discovery and redesign on the insurance claims journey.',
    points: [
      'Owned discovery for the claims journey, mapped the drop-off points, and redesigned the flow with user stories written for engineering.',
      'Built a real-time dashboard tracking 50K+ user journeys, which set sprint priorities.',
      'Strengthened client pitches with year-on-year claims analysis across 20+ enterprise clients, contributing to a 15% lift in renewals.',
    ],
  },
  {
    company: 'Droom',
    title: 'Product Management Intern',
    period: 'May — Jul 2023',
    place: 'Gurugram',
    summary: 'Listing quality and report monetisation on an online marketplace.',
    points: [
      'Revamped the QuickSell listing flow with fraud detection, validated through A/B testing.',
      'Rebuilt the vehicle valuation report page from user and competitor research, growing report purchases 16%.',
    ],
  },
  {
    company: 'Infinyte Club',
    title: 'Product Operations',
    period: 'Feb — Apr 2023',
    place: 'Bangalore',
    summary: 'Signup funnel and verification.',
    points: [
      'Found a five-step verification wall was where signups were dying, proposed deferring it past the signup boundary, aligned the CEO, and doubled signup completion.',
      'Shipped a push and in-app nudge system with engineering in three weeks to recover verification after signup.',
    ],
  },
  {
    company: 'YourStory Media',
    title: 'Product Management Intern',
    period: 'Jun — Sep 2022',
    place: 'Bangalore',
    summary: 'Discovery for a new content vertical.',
    points: [
      'Ran discovery across 5,000+ surveyed users and wrote the go/no-go recommendation that shaped the vertical.',
      'Launched See, Read and Listen for the Hindi podcast catalogue after evaluating five audio platforms.',
    ],
  },
]

export const education = {
  school: 'Indian Institute of Technology Kharagpur',
  degree: 'Dual degree',
  period: '2019 — 2024',
}

export const tools = [
  'SQL',
  'Python',
  'Mixpanel',
  'Amplitude',
  'CleverTap',
  'Tableau',
  'Figma',
  'JIRA',
  'Confluence',
  'Notion',
]
