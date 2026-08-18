import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLabProjects, getLabProject } from '@/lib/content'
import { Mdx } from '@/lib/content/mdx'
import { extractHeadings } from '@/lib/content/headings'
import { Container } from '@/components/layout/Container'
import { SectionIndex, Rail } from '@/components/content/ProgressRail'
import { GroundedDemo } from '@/components/lab/GroundedDemo'
import { readingFontVariable } from '../../fonts'

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

const STATUS_COPY: Record<string, string> = {
  live: 'Live',
  'in-development': 'In development',
  concept: 'Concept',
}

export default async function LabProject({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getLabProject(slug)
  if (!doc) notFound()

  const { meta, body } = doc
  const sections = extractHeadings(body)

  return (
    <div className={readingFontVariable}>
      <Container className="pt-6 pb-4 lg:pt-10">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={`eyebrow rounded-[var(--radius-sm)] border px-1 py-0.25 ${
              meta.status === 'live'
                ? 'border-[var(--color-signal)]/40 text-[var(--color-signal)]'
                : 'border-[var(--color-flag)]/40 text-[var(--color-flag)]'
            }`}
          >
            {STATUS_COPY[meta.status] ?? meta.status}
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)]">
            {meta.statusNote}
          </span>
        </div>

        <h1 className="mt-2.5 max-w-[18ch] text-[length:var(--text-3xl)] leading-[1.08] font-semibold tracking-[var(--track-display)]">
          {meta.title}
        </h1>
        <p className="mt-2 max-w-[52ch] text-[var(--text-lg)] leading-snug text-[var(--color-muted)]">
          {meta.tagline}
        </p>
      </Container>

      {/* The demo sits above the writeup. An AI-PM reviewer opens the live
          thing first and reads the reflection last. */}
      <Container width="wide">
        <GroundedDemo />
      </Container>

      <Container className="pb-10 lg:pb-14">
        <div className="lg:grid lg:grid-cols-[minmax(0,var(--measure))_minmax(0,1fr)] lg:gap-7">
          <div className="prose order-1">
            <Mdx source={body} />
          </div>
          <aside className="order-2 mt-7 lg:mt-1">
            <Rail>
              <SectionIndex sections={sections} />
            </Rail>
          </aside>
        </div>
      </Container>
    </div>
  )
}
