import { getThinking, getThinkingPiece } from '@/lib/content'
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Thinking — Aniket Agarwal'

export function generateStaticParams() {
  return getThinking().map((p) => ({ slug: p.meta.slug }))
}

/**
 * The eyebrow carries "not shipped work" into the share card itself. A link
 * preview is where a piece is most likely to be mistaken for a case study,
 * because it arrives with no page around it.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getThinkingPiece(slug)
  return ogImage({
    eyebrow: doc?.meta.eyebrow ?? 'Point of view · not shipped work',
    headline: doc?.meta.ogHeadline ?? 'Aniket Agarwal',
    metric: doc?.meta.ogMetric ?? '',
  })
}
