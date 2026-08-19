import { getLabProjects, getLabProject } from '@/lib/content'
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Product lab — Aniket Agarwal'

export function generateStaticParams() {
  return getLabProjects().map((p) => ({ slug: p.meta.slug }))
}

/**
 * The rubric is the pitch. "An eval harness" is a category; the four things it
 * scores are the reason an AI PM would click.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getLabProject(slug)
  return ogImage({
    eyebrow: doc ? `Product lab · ${doc.meta.title}` : 'Product lab',
    headline: 'Scores generated health text on grounding, scope, escalation and readability.',
    metric: 'Runs in your browser · no key required',
  })
}
