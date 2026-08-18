import type { Metadata } from 'next'
import Link from 'next/link'
import { getLabProjects } from '@/lib/content'
import { Container } from '@/components/layout/Container'
import baseline from '@/public/grounded-baseline.json'

export const metadata: Metadata = {
  title: 'Lab — things I built',
  description:
    'Grounded: an open evaluation harness that scores LLM-generated health summaries on grounding, scope, escalation and readability against a visible rubric. Runs in the browser, no key required.',
  alternates: { canonical: '/lab' },
}

const STATUS_COPY: Record<string, string> = {
  live: 'Live',
  'in-development': 'In development',
  concept: 'Concept',
}

export default function LabIndex() {
  const projects = getLabProjects()

  return (
    <>
      <Container className="pt-12 pb-4 lg:pt-20">
        <p className="eyebrow">Lab</p>
        <h1 className="mt-4 max-w-[22ch] text-[length:var(--text-3xl)] leading-[1.08] font-semibold tracking-[var(--track-display)]">
          One thing, built properly, that you can actually use.
        </h1>
        <p className="mt-5 max-w-[58ch] text-[var(--text-base)] leading-relaxed text-[var(--color-muted)]">
          Everything else on this site is something to read. This is the one page with something to
          run.
        </p>
      </Container>

      <Container className="pb-20 lg:pb-28">
        {projects.map((p) => (
          <article
            key={p.meta.slug}
            className="mt-8 border border-[var(--color-rule)] bg-[var(--color-paper-raised)]"
          >
            <div className="flex flex-col gap-4 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`eyebrow rounded-[var(--radius-sm)] border px-2 py-0.5 ${
                    p.meta.status === 'live'
                      ? 'border-[var(--color-signal)]/40 text-[var(--color-signal)]'
                      : 'border-[var(--color-flag)]/40 text-[var(--color-flag)]'
                  }`}
                >
                  {STATUS_COPY[p.meta.status] ?? p.meta.status}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)]">
                  {p.meta.statusNote}
                </span>
              </div>

              <h2 className="text-[var(--text-2xl)] leading-snug font-semibold tracking-[var(--track-h2)]">
                {p.meta.title}
              </h2>
              <p className="max-w-[60ch] text-[var(--text-base)] leading-relaxed">
                {p.meta.tagline}
              </p>

              <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--color-rule)] pt-4 font-[family-name:var(--font-mono)] text-[var(--text-xs)] tabular-nums">
                {[
                  ['Cases', String(baseline.stats.total)],
                  ['Hand-labelled', String(baseline.stats.handLabelled)],
                  [
                    'Label agreement',
                    `${baseline.agreement.dimensions.matched}/${baseline.agreement.dimensions.total}`,
                  ],
                  ['Full run', `${baseline.totalElapsedMs}ms`],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1">
                    <dt className="eyebrow">{k}</dt>
                    <dd className="text-[var(--text-sm)]">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-3 flex flex-wrap gap-4">
                <Link
                  href={`/lab/${p.meta.slug}`}
                  className="rounded-[var(--radius)] border border-[var(--color-signal)] px-4 py-2 font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-signal)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-signal)] hover:text-[var(--color-paper)]"
                >
                  Run it <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </Container>
    </>
  )
}
