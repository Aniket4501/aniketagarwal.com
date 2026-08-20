import type { Metadata } from 'next'
import Link from 'next/link'
import { getThinking } from '@/lib/content'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Analysis',
  description:
    'A product teardown of Strava’s free tier, and a point of view on why manual logging caps engagement for Indian health apps. Analysis, not shipped work — labelled as such.',
  alternates: { canonical: '/thinking' },
}

export default function ThinkingIndex() {
  const pieces = getThinking()

  return (
    <>
      <Container className="pt-6 pb-0 lg:pt-9">
        <p className="eyebrow">Analysis</p>
        <h1 className="mt-2 max-w-[22ch] text-[length:var(--text-3xl)] leading-[1.05] font-semibold tracking-[var(--track-display)] sm:text-[length:var(--text-hero)]">
          Product judgement, applied to things nobody handed me.
        </h1>
        {/* The disclaimer sits above the pieces, not inside them, because the
            failure mode of this page is a reader filing an opinion as a track
            record. The work is one click away and clearly separated. */}
        <p className="mt-3 max-w-[58ch] text-[length:var(--text-md)] leading-relaxed text-[var(--color-body)]">
          Everything under <Link href="/work">Work</Link> is something I shipped and can be held to.
          Nothing on this page is. These are a teardown and a thesis — written to be argued with, and
          labelled so that nobody mistakes one for the other.
        </p>
      </Container>

      <Section className="pt-4">
        <Container>
          <ol className="flex flex-col gap-3">
            {pieces.map((p) => (
              <li key={p.meta.slug}>
                <article className="card card-interactive relative p-3 sm:p-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Tag tone="flag">{p.meta.kind}</Tag>
                    <span className="text-[length:var(--text-xs)] text-[var(--color-muted)]">
                      {p.meta.subject} · {p.meta.readingTime} ·{' '}
                      <time dateTime={p.meta.published}>
                        {new Date(`${p.meta.published}T00:00:00Z`).toLocaleDateString('en-GB', {
                          month: 'long',
                          year: 'numeric',
                          timeZone: 'UTC',
                        })}
                      </time>{' '}
                      · not shipped work
                    </span>
                  </div>

                  <h2 className="mt-2 max-w-[30ch] text-[length:var(--text-2xl)] leading-tight font-semibold tracking-[var(--track-heading)]">
                    <Link
                      href={`/thinking/${p.meta.slug}`}
                      className="after:absolute after:inset-0"
                    >
                      {p.meta.title}
                    </Link>
                  </h2>

                  <p className="mt-2 max-w-[62ch] text-[length:var(--text-md)] leading-relaxed text-[var(--color-body)]">
                    {p.meta.hook}
                  </p>

                  <p className="mt-2.5 text-[length:var(--text-sm)] font-medium text-[var(--color-accent)]">
                    Read it <span aria-hidden="true">→</span>
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  )
}
