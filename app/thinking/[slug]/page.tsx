import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getThinking, getThinkingPiece } from '@/lib/content'
import { Mdx } from '@/lib/content/mdx'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag, Button } from '@/components/ui/Button'

/** "19 August 2026" — a published date a reader can weigh the analysis against. */
function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function generateStaticParams() {
  return getThinking().map((p) => ({ slug: p.meta.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = getThinkingPiece(slug)
  if (!doc) return {}
  return {
    title: doc.meta.title,
    description: doc.meta.description,
    alternates: { canonical: `/thinking/${slug}` },
    openGraph: {
      title: doc.meta.title,
      description: doc.meta.description,
      url: `/thinking/${slug}`,
      type: 'article',
    },
  }
}

export default async function ThinkingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getThinkingPiece(slug)
  if (!doc) notFound()

  const { meta, body } = doc
  const all = getThinking()
  const next = all[(all.findIndex((p) => p.meta.slug === slug) + 1) % all.length]

  return (
    <article>
      <Container className="pt-6 pb-5 lg:pt-9">
        <div className="flex flex-wrap items-center gap-1.5">
          <Tag tone="flag">{meta.eyebrow}</Tag>
          <span className="text-[length:var(--text-xs)] text-[var(--color-muted)]">
            {meta.subject} · {meta.readingTime} ·{' '}
            <time dateTime={meta.published}>{formatDate(meta.published)}</time>
          </span>
        </div>

        <h1 className="mt-3 max-w-[20ch] text-[length:var(--text-3xl)] leading-[1.05] font-semibold tracking-[var(--track-display)] sm:text-[length:var(--text-hero)]">
          {meta.title}
        </h1>

        <p className="mt-3 max-w-[58ch] text-[length:var(--text-md)] leading-relaxed text-[var(--color-body)]">
          {meta.hook}
        </p>
      </Container>

      {/* Method, before the argument.

          A teardown's credibility is decided by whether it admits its own
          boundary, and a reader deciding whether to trust the piece should not
          have to reach the end to find out what the author could actually see.
          So sources and limits render above the body, not in a footnote. */}
      <Section band className="py-5">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
            <div>
              <h2 className="eyebrow">What this is built on</h2>
              {meta.walkedOn ? (
                <p className="mt-2 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-body)]">
                  {meta.walkedOn}
                </p>
              ) : null}
              <dl className="mt-2 flex flex-col gap-2">
                {meta.sources.map((s) => (
                  <div key={s.label}>
                    <dt className="text-[length:var(--text-sm)] font-semibold">{s.label}</dt>
                    <dd className="text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
                      {s.note}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {meta.reached ? (
              <div>
                <h2 className="eyebrow">What I could reach</h2>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {meta.reached.map((r) => (
                    <li
                      key={r}
                      className="text-[length:var(--text-sm)] leading-relaxed text-[var(--color-body)]"
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {meta.notReached ? (
              <div>
                <h2 className="eyebrow text-[var(--color-flag)]">What I could not</h2>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {meta.notReached.map((r) => (
                    <li
                      key={r}
                      className="text-[length:var(--text-sm)] leading-relaxed text-[var(--color-body)]"
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      <Container className="py-7">
        <div className="case-body">
          <Mdx source={body} />
        </div>
      </Container>

      <Section band labelledBy="next-h">
        <Container>
          <p className="eyebrow" id="next-h">
            Next
          </p>
          <h2 className="mt-2 max-w-[24ch] text-[length:var(--text-xl)] leading-tight font-semibold tracking-[var(--track-heading)]">
            {next && next.meta.slug !== slug
              ? next.meta.title
              : 'The work this judgement was built on.'}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {next && next.meta.slug !== slug ? (
              <Button href={`/thinking/${next.meta.slug}`}>
                Read it <span aria-hidden="true">→</span>
              </Button>
            ) : null}
            <Button href="/work" variant="secondary">
              See the shipped work <span aria-hidden="true">→</span>
            </Button>
          </div>
          <p className="mt-3 max-w-[54ch] text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
            <Link href="/work">Work</Link> is what I shipped and can be held to. This page was not.
          </p>
        </Container>
      </Section>
    </article>
  )
}
