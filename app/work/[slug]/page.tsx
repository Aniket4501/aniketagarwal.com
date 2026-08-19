import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCaseStudies, getCaseStudy } from '@/lib/content'
import { extractHeadings } from '@/lib/content/headings'
import { Mdx } from '@/lib/content/mdx'
import { Container } from '@/components/layout/Container'
import { MetricDelta } from '@/components/content/MetricDelta'
import { Stat } from '@/components/content/Stat'
import { OwnershipBlock } from '@/components/content/OwnershipBlock'
import { Drawer } from '@/components/content/Drawer'
import { ReadProgress, SectionIndex, Rail } from '@/components/content/ProgressRail'
import { WithNeeds } from '@/components/ui/Needs'
import { site } from '@/lib/site'

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.meta.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = getCaseStudy(slug)
  if (!doc) return {}
  return {
    // Outcome first, name last.
    title: `${doc.meta.title} — ${doc.meta.tagline}`,
    description: doc.meta.description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${doc.meta.title} — ${doc.meta.tagline}`,
      description: doc.meta.description,
      url: `/work/${slug}`,
      type: 'article',
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getCaseStudy(slug)
  if (!doc) notFound()

  const { meta, body } = doc
  const sections = extractHeadings(body)
  const all = getCaseStudies()
  const index = all.findIndex((c) => c.meta.slug === slug)
  const next = all[(index + 1) % all.length]

  return (
    <article>
      <ReadProgress />

      <Container className="pt-6 pb-4 lg:pt-10">
        <p className="eyebrow">Case study {String(meta.order).padStart(2, '0')}</p>
        <h1 className="mt-2 max-w-[18ch] text-[length:var(--text-3xl)] leading-[1.08] font-semibold tracking-[var(--track-display)] sm:text-[length:var(--text-hero)]">
          {meta.title}
        </h1>
        <p className="mt-2 max-w-[46ch] text-[var(--text-lg)] leading-snug text-[var(--color-muted)]">
          {meta.tagline}
        </p>

        <dl className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2 border-t border-[var(--color-rule)] pt-3 sm:grid-cols-3">
          {[
            { k: 'Role', v: meta.role },
            { k: 'Team', v: meta.teamShape },
            { k: 'Timeline', v: meta.timeline },
          ].map((row) => (
            <div key={row.k} className="flex flex-col gap-0.5">
              <dt className="eyebrow">{row.k}</dt>
              <dd className="text-[var(--text-sm)] leading-relaxed">
                <WithNeeds text={row.v} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {meta.metrics.map((m) => (
            <MetricDelta key={m.label} metric={m} />
          ))}
          {meta.stats.map((st) => (
            <Stat key={st.label} stat={st} />
          ))}
        </div>

        <div className="mt-6">
          <OwnershipBlock owned={meta.owned} shipped={meta.shipped} notOwned={meta.notOwned} />
        </div>
      </Container>

      <Container className="pb-8 lg:pb-12">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(14rem,17rem)] lg:gap-10">
          <div className="prose order-1">
            <Mdx source={body} />
          </div>

          <aside className="order-2 mt-7 lg:mt-1">
            <Rail>
              <SectionIndex sections={sections} />
              {meta.artifacts.length > 0 ? (
                <div className="flex flex-col gap-1">
                  <p className="eyebrow">How I worked this out</p>
                  {meta.artifacts.map((a) => (
                    <Drawer key={a.label} label={a.label}>
                      <div className="text-[var(--text-sm)] leading-relaxed">
                        <Mdx source={a.body} />
                      </div>
                    </Drawer>
                  ))}
                </div>
              ) : null}
            </Rail>
          </aside>
        </div>
      </Container>

      <Container className="border-t border-[var(--color-rule)] py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="eyebrow">Next</p>
            <Link
              href={`/work/${next?.meta.slug ?? ''}`}
              className="max-w-[34ch] text-[var(--text-xl)] leading-snug font-semibold hover:text-[var(--color-signal)]"
            >
              {next?.meta.headline ?? 'All work'}
            </Link>
          </div>
          <a
            href={`mailto:${site.email}`}
            className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-signal)]"
          >
            {site.email}
          </a>
        </div>
      </Container>
    </article>
  )
}
