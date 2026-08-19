import type { Metadata } from 'next'
import { getLabProjects } from '@/lib/content'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag, Button } from '@/components/ui/Button'
import baseline from '@/public/grounded-baseline.json'

export const metadata: Metadata = {
  title: 'Lab',
  description:
    'Grounded — an evaluation harness that scores LLM-generated health summaries on grounding, scope, escalation and readability against a visible rubric. Runs in the browser, no key required.',
  alternates: { canonical: '/lab' },
}

export default function LabIndex() {
  const projects = getLabProjects()

  return (
    <>
      <Container className="pt-6 pb-2 lg:pt-9">
        <p className="eyebrow">Product lab</p>
        <h1 className="mt-2 max-w-[20ch] text-[length:var(--text-3xl)] leading-[1.05] font-semibold tracking-[var(--track-display)] sm:text-[length:var(--text-hero)]">
          What I build when nobody hands me a roadmap.
        </h1>
        <p className="mt-3 max-w-[56ch] text-[length:var(--text-md)] leading-relaxed text-[var(--color-body)]">
          Everything else on this site is something to read. This is the page with something to run.
        </p>
      </Container>

      <Section className="pt-6">
        <Container>
          <div className="flex flex-col gap-3">
            {projects.map((p) => (
              <article key={p.meta.slug} className="card card-interactive relative overflow-hidden">
                <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                  <div className="flex flex-col gap-2.5 p-3 sm:p-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Tag tone={p.meta.status === 'live' ? 'accent' : 'flag'}>
                        {p.meta.status === 'live' ? 'Live' : p.meta.status.replace('-', ' ')}
                      </Tag>
                      <span className="text-[length:var(--text-xs)] text-[var(--color-muted)]">
                        {p.meta.statusNote}
                      </span>
                    </div>
                    <h2 className="text-[length:var(--text-2xl)] leading-tight font-semibold tracking-[var(--track-heading)]">
                      <a href={`/lab/${p.meta.slug}`} className="after:absolute after:inset-0">
                        {p.meta.title}
                      </a>
                    </h2>
                    <p className="max-w-[50ch] text-[length:var(--text-md)] leading-relaxed text-[var(--color-body)]">
                      {p.meta.tagline}
                    </p>
                    <p className="max-w-[50ch] text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
                      <span className="font-medium text-[var(--color-ink)]">Why I built it: </span>
                      {p.meta.why}
                    </p>
                    <p className="mt-auto pt-2 text-[length:var(--text-sm)] font-medium text-[var(--color-accent)]">
                      Run it <span aria-hidden="true">→</span>
                    </p>
                  </div>
                  <dl className="grid grid-cols-2 content-start gap-px border-t border-[var(--color-line)] bg-[var(--color-line)] lg:border-t-0 lg:border-l">
                    {[
                      ['Cases in the set', String(baseline.stats.total)],
                      ['Scored dimensions', '4'],
                      ['Full run', `${baseline.totalElapsedMs}ms`],
                      ['Server calls', '0'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex flex-col gap-0.5 bg-[var(--color-surface)] p-2.5">
                        <dt className="eyebrow">{k}</dt>
                        <dd className="text-[length:var(--text-xl)] font-semibold tabular-nums">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>

          <div className="card mt-3 flex flex-col items-start gap-2 border-dashed p-3 sm:p-4">
            <p className="eyebrow">In progress</p>
            <p className="max-w-[48ch] text-[length:var(--text-base)] leading-relaxed text-[var(--color-body)]">
              A faithfulness judge for Grounded — checking whether an interpretation follows from the
              values, not merely whether the values appear. Grounded catches invented figures today;
              it does not catch a correctly-quoted number with the meaning reversed.
            </p>
            <Button href="/lab/grounded" variant="secondary" className="mt-1">
              Where it stops today <span aria-hidden="true">→</span>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
