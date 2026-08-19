import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'How I make product decisions — Aniket Agarwal'

/**
 * The strongest of the four beliefs, because a link preview gets one sentence
 * and the abstract ones ("use evidence before instinct") are what every
 * portfolio says. This one commits to something.
 */
export default function Image() {
  return ogImage({
    eyebrow: 'How I work',
    headline: 'The brief and the bottleneck are often different things.',
    metric: 'Four beliefs · and what each one cost',
  })
}
