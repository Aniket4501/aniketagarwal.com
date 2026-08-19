import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCaseStudies, getCaseStudy } from '@/lib/content'
import { Mdx } from '@/lib/content/mdx'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag, Button } from '@/components/ui/Button'
import { MetricDelta, Metric } from '@/components/content/Metric'
import { OwnershipBlock } from '@/components/content/OwnershipBlock'
import { Drawer } from '@/components/content/Drawer'
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
    title: `${doc.meta.title} — ${doc.meta.outcome}`,
    description: doc.meta.description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${doc.meta.title} — ${doc.meta.outcome}`,
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
  const all = getCaseStudies()
  const index = all.findIndex((c) => c.meta.slug === slug)
  const next = all[(index + 1) % all.length]

  const facts = [
    ['Role', meta.role],
    ['Timeline', meta.timeline],
    ['Team', meta.team],
    ['Scope', meta.scope],
  ].filter(([, v]) => Boolean(v)) as [string, string][]

  return (
    <article>
      {/* Header */}
      <Container className="pt-6 pb-6 lg:pt-9">
        <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[length:var(--text-xs)] font-semibold tabular-nums text-[var(--color-muted)]">
                {String(meta.order).padStart(2, '0')}
              </span>
              <Tag>{meta.category}</Tag>
            </div>
            <h1 className="max-w-[16ch] text-[length:var(--text-3xl)] leading-[1.05] font-semibold tracking-[var(--track-display)] sm:text-[length:var(--text-hero)]">
              {meta.title}
            </h1>
            <p className="max-w-[46ch] text-[length:var(--text-md)] leading-snug text-[var(--color-body)]">
              {meta.outcome}
            </p>

            {/* The facts sit inside the left column rather than in a full-width
                row beneath it, which had left ~250px of dead space beside the
                metric card. */}
            <dl className="mt-auto grid gap-x-5 gap-y-3 border-t border-[var(--color-line)] pt-3 sm:grid-cols-2">
              {facts.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-0.5">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="text-[length:var(--text-sm)] leading-snug text-[var(--color-body)]">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="card flex flex-col gap-3 p-3 sm:p-4">
            {/* A case with no baseline leads with its figure. Forcing a delta
                on it drew two equal bars, which encodes nothing. */}
            {meta.headline ? (
              <MetricDelta metric={meta.headline} animate />
            ) : meta.figures[0] ? (
              <Metric
                value={meta.figures[0].value}
                label={meta.figures[0].label}
                context={meta.figures[0].context}
                size="large"
              />
            ) : null}
            {meta.figures.length > 0 ? (
              <dl className="grid grid-cols-2 gap-3 border-t border-[var(--color-line)] pt-3">
                {meta.figures.slice(meta.headline ? 0 : 1, meta.headline ? 2 : 3).map((f) => (
                  <div key={f.label} className="flex flex-col gap-0.5">
                    <dt className="text-[length:var(--text-xl)] font-semibold tabular-nums">
                      {f.value}
                    </dt>
                    <dd className="text-[length:var(--text-xs)] leading-snug text-[var(--color-muted)]">
                      {f.label}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>

      </Container>

      {/* Ownership */}
      <Section band className="py-6 lg:py-7">
        <Container>
          <OwnershipBlock owned={meta.owned} shipped={meta.shipped} notOwned={meta.notOwned} />
        </Container>
      </Section>

      {/* Body */}
      <Container className="py-8 lg:py-10">
        <div className="case-body">
          <Mdx source={body} />
        </div>

        {meta.drawers.length > 0 ? (
          <div className="mx-auto mt-8 max-w-[var(--measure)]">
            <p className="eyebrow mb-2">How I worked this out</p>
            {meta.drawers.map((d) => (
              <Drawer key={d.label} label={d.label}>
                <p>{d.body}</p>
              </Drawer>
            ))}
          </div>
        ) : null}
      </Container>

      {/* Results */}
      {meta.metrics.length > 0 || meta.figures.length > 0 ? (
        <Section band labelledBy="results-h">
          <Container>
            <p className="eyebrow">Results</p>
            <h2 id="results-h" className="sr-only">
              Measured outcomes
            </h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {meta.metrics.map((m) => (
                <MetricDelta key={m.label} metric={m} />
              ))}
              {meta.figures.map((f) => (
                <Metric key={f.label} value={f.value} label={f.label} context={f.context} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Next */}
      <Container className="py-8 lg:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <p className="eyebrow">Next case study</p>
            <Link
              href={`/work/${next?.meta.slug ?? ''}`}
              className="group max-w-[28ch] text-[length:var(--text-xl)] leading-snug font-semibold tracking-[var(--track-heading)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-accent)] sm:text-[length:var(--text-2xl)]"
            >
              {next?.meta.title ?? 'All work'}{' '}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <p className="max-w-[44ch] text-[length:var(--text-sm)] text-[var(--color-muted)]">
              {next?.meta.outcome}
            </p>
          </div>
          <Button href={`mailto:${site.email}`} variant="secondary">
            Ask me about this <span aria-hidden="true">→</span>
          </Button>
        </div>
      </Container>
    </article>
  )
}
