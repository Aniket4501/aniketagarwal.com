import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLabProjects, getLabProject } from '@/lib/content'
import { Mdx } from '@/lib/content/mdx'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag, Button } from '@/components/ui/Button'
import { GroundedDemo } from '@/components/lab/GroundedDemo'
import { readingFontVariable } from '../../fonts-reading'
import { site } from '@/lib/site'

export function generateStaticParams() {
  return getLabProjects().map((p) => ({ slug: p.meta.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = getLabProject(slug)
  if (!doc) return {}
  return {
    title: `${doc.meta.title} — ${doc.meta.tagline}`,
    description: doc.meta.description,
    alternates: { canonical: `/lab/${slug}` },
  }
}

const STATUS: Record<string, string> = {
  live: 'Live',
  'in-development': 'In development',
  concept: 'Concept',
}

export default async function LabProject({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getLabProject(slug)
  if (!doc) notFound()
  const { meta, body } = doc

  return (
    <div className={readingFontVariable}>
      <Container className="pt-6 pb-5 lg:pt-9">
        <div className="flex flex-wrap items-center gap-1.5">
          <Tag tone={meta.status === 'live' ? 'accent' : 'flag'}>{STATUS[meta.status]}</Tag>
          <span className="text-[length:var(--text-xs)] text-[var(--color-muted)]">
            {meta.statusNote}
          </span>
        </div>
        <h1 className="mt-3 max-w-[14ch] text-[length:var(--text-3xl)] leading-[1.05] font-semibold tracking-[var(--track-display)] sm:text-[length:var(--text-hero)]">
          {meta.title}
        </h1>
        <p className="mt-3 max-w-[54ch] text-[length:var(--text-md)] leading-relaxed text-[var(--color-body)]">
          {meta.tagline}
        </p>
        <p className="mt-2 max-w-[54ch] text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
          <span className="font-medium text-[var(--color-ink)]">Why I built it: </span>
          {meta.why}
        </p>
      </Container>

      {/* The demo comes before the writeup: anyone assessing an AI PM opens the
          live thing first and reads the reflection last. */}
      <Section band className="py-6 lg:py-7">
        <Container width="wide">
          <p className="eyebrow mb-2">Try it — pick a case, or edit the text</p>
          <GroundedDemo />
        </Container>
      </Section>

      <Container className="py-8 lg:py-10">
        <div className="case-body">
          <Mdx source={body} />
        </div>
      </Container>

      <Container className="pb-10">
        <div className="card flex flex-col items-start gap-2 p-3 sm:p-4">
          <p className="eyebrow">Related</p>
          <p className="max-w-[42ch] text-[length:var(--text-lg)] leading-snug font-semibold tracking-[var(--track-heading)]">
            The case study this came out of.
          </p>
          <div className="mt-1 flex flex-wrap gap-2">
            <Button href="/work/ai-health-report">
              AI Smart Health Report <span aria-hidden="true">→</span>
            </Button>
            <Button href={`mailto:${site.email}`} variant="secondary">
              Ask me about it <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
