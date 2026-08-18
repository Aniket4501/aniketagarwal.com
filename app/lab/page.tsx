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
      <Container className="pt-6 pb-2 lg:pt-10">
        <p className="eyebrow">Lab</p>
        <h1 className="mt-2 max-w-[22ch] text-[length:var(--text-3xl)] leading-[1.08] font-semibold tracking-[var(--track-display)]">
          One thing, built properly, that you can actually use.
        </h1>
        <p className="mt-2.5 max-w-[58ch] text-[var(--text-base)] leading-relaxed text-[var(--color-muted)]">
          Everything else on this site is something to read. This is the one page with something to
          run.
        </p>
      </Container>

      <Container className="pb-10 lg:pb-14">
        {projects.map((p) => (
          <article
            key={p.meta.slug}
            className="mt-4 border border-[var(--color-rule)] bg-[var(--color-paper-raised)]"
          >
            <div className="flex flex-col gap-2 p-3 sm:p-4">
              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  className={`eyebrow rounded-[var(--radius-sm)] border px-1 py-0.25 ${
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

              <dl className="mt-1 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-[var(--color-rule)] pt-2 font-[family-name:var(--font-mono)] text-[var(--text-xs)] tabular-nums">
                {[
                  ['Cases', String(baseline.stats.total)],
                  ['Hand-labelled', String(baseline.stats.handLabelled)],
                  [
                    'Label agreement',
                    `${baseline.agreement.dimensions.matched}/${baseline.agreement.dimensions.total}`,
                  ],
                  ['Full run', `${baseline.totalElapsedMs}ms`],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-0.5">
                    <dt className="eyebrow">{k}</dt>
                    <dd className="text-[var(--text-sm)]">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-1.5 flex flex-wrap gap-2">
                <Link
                  href={`/lab/${p.meta.slug}`}
                  className="rounded-[var(--radius)] border border-[var(--color-signal)] px-2 py-1 font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-signal)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-signal)] hover:text-[var(--color-paper)]"
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
