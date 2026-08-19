import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { site } from '@/lib/site'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Aniket Agarwal — Product Analyst, HCL Healthcare'

/**
 * The one card whose job is identification rather than argument. A recruiter
 * pasting this link into Slack should get the name, the title and the scope in
 * the thumbnail without opening it.
 */
export default function Image() {
  return ogImage({
    eyebrow: 'About',
    headline: 'Aniket Agarwal — I fix the unglamorous blocker before building the exciting feature.',
    metric: `${site.title} · HCL Healthcare · ${site.location}`,
  })
}
