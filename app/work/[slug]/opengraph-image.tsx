import { getCaseStudies, getCaseStudy } from '@/lib/content'
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Case study — Aniket Agarwal'

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.meta.slug }))
}

/** Each case study previews with its own claim and its own number. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getCaseStudy(slug)
  return ogImage({
    eyebrow: doc ? `Case study · ${doc.meta.title}` : 'Case study',
    headline: doc?.meta.ogHeadline ?? 'Aniket Agarwal',
    metric: doc?.meta.ogMetric ?? '',
  })
}
