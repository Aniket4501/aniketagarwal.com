import Link from 'next/link'
import { getHome, getCaseStudies, getLabProjects } from '@/lib/content'
import { Container } from '@/components/layout/Container'
import { ProofStrip } from '@/components/content/ProofStrip'
import { MetricDelta } from '@/components/content/MetricDelta'
import { CaseCard } from '@/components/work/CaseCard'
import { Timeline } from '@/components/content/Timeline'
import { CopyEmail } from '@/components/ui/CopyEmail'
import { WithNeeds } from '@/components/ui/Needs'
import baseline from '@/public/grounded-baseline.json'
import { site } from '@/lib/site'

/**
 * Six sections. Nothing else.
 *
 * Mobile is the design, desktop is the adaptation: recruiters open these links
 * on phones. The hero is tall but not empty — the proof strip has to be
 * partially visible at the fold so the page reads dense rather than sparse.
 */
export default function Home() {
  const { meta } = getHome()
  const cases = getCaseStudies()
  const lab = getLabProjects()[0]

  return (
    <>
      {/* 1 — Identity */}
      <Container as="header" className="pt-5 pb-7 lg:pt-10 lg:pb-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-5">
          <div className="flex flex-col gap-3.5 lg:col-span-7">
            <h1 className="max-w-[17ch] text-[length:var(--text-hero)] leading-[1.06] font-semibold tracking-[var(--track-display)] text-balance">
              The roadmap was engagement. The app took fifteen seconds to open.
              <br />
              <span className="text-[var(--color-muted)]">
                I spent eight weeks there instead. We shipped it under two.
              </span>
            </h1>

            <p className="max-w-[54ch] text-[var(--text-lg)] leading-snug">{meta.subline}</p>

            <p className="max-w-[54ch] font-[family-name:var(--font-mono)] text-[var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
              <WithNeeds text={meta.status} />
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-0.5">
              <a
                href="#proof"
                className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-signal)]"
              >
                Read the work <span aria-hidden="true">↓</span>
              </a>
              <CopyEmail />
              <a
                href={site.linkedin}
                rel="me noopener"
                className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-ink)] hover:text-[var(--color-signal)]"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>

            {lab ? (
              <p className="max-w-[56ch] border-t border-[var(--color-rule)] pt-2.5 text-[var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
                {meta.labPointer}{' '}
                <Link
                  href={`/lab/${lab.meta.slug}`}
                  className="text-[var(--color-signal)] underline decoration-[var(--color-signal)]/30 underline-offset-4 hover:decoration-[var(--color-signal)]"
                >
                  Run it <span aria-hidden="true">→</span>
                </Link>
              </p>
            ) : null}
          </div>

          {/* The first delta is the visual anchor, not decoration: it is the
              number the headline just claimed. */}
          {meta.heroMetric ? (
            <div className="lg:col-span-4 lg:col-start-9 lg:pt-1.5">
              <MetricDelta metric={{ ...meta.heroMetric, animate: true }} size="large" />
            </div>
          ) : null}
        </div>
      </Container>

      {/* 2 — Proof. Pure evidence, no call to action. */}
      <section id="proof" aria-label="Evidence" className="scroll-mt-10">
        <Container>
          <ProofStrip metrics={meta.proof} />
        </Container>
      </section>

      {/* 3 — Selected work */}
      <Container className="py-7 lg:py-12">
        <div className="flex flex-col gap-1.5">
          <h2 className="eyebrow">Selected work</h2>
          <p className="max-w-[56ch] text-[var(--text-lg)] leading-snug">{meta.workIntro}</p>
        </div>
        <div className="mt-5">
          {cases.map((c) => (
            <CaseCard key={c.meta.slug} meta={c.meta} />
          ))}
        </div>
        <p className="mt-4 text-[var(--text-base)] text-[var(--color-muted)]">
          <Link
            href="/work"
            className="text-[var(--color-signal)] underline decoration-[var(--color-signal)]/30 underline-offset-4 hover:decoration-[var(--color-signal)]"
          >
            Two shorter ones: the KYC wall and the claims maze <span aria-hidden="true">→</span>
          </Link>
        </p>
      </Container>

      {/* 4 — How I work. The calmest section on the page. */}
      <Container className="py-7 lg:py-12">
        <h2 className="eyebrow">How I work</h2>
        <div className="mt-4 border-t border-[var(--color-rule)]">
          {meta.beliefs.map((b) => (
            <div
              key={b.claim}
              className="grid gap-1.5 border-b border-[var(--color-rule)] py-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-7"
            >
              <h3 className="max-w-[24ch] text-[var(--text-xl)] leading-snug font-semibold tracking-[var(--track-h2)]">
                <Link href={b.href} className="hover:text-[var(--color-signal)]">
                  {b.claim}
                </Link>
              </h3>
              <p className="max-w-[54ch] text-[var(--text-base)] leading-relaxed text-[var(--color-muted)]">
                <WithNeeds text={b.example} />
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4">
          <Link
            href="/approach"
            className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-signal)]"
          >
            The full version, and the one thing I have not answered{' '}
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </Container>

      {/* 5 — Built */}
      {lab ? (
        <Container className="py-7 lg:py-12">
          <h2 className="eyebrow">Built</h2>
          <div className="mt-4 border border-[var(--color-rule)] bg-[var(--color-paper-raised)] p-3 sm:p-4">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-7">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="eyebrow rounded-[var(--radius-sm)] border border-[var(--color-signal)]/40 px-1 py-0.25 text-[var(--color-signal)]">
                    Live
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)]">
                    {lab.meta.statusNote}
                  </span>
                </div>
                <h3 className="text-[var(--text-2xl)] leading-snug font-semibold tracking-[var(--track-h2)]">
                  {lab.meta.title}
                </h3>
                <p className="max-w-[52ch] text-[var(--text-base)] leading-relaxed">
                  {meta.builtIntro}
                </p>
                <p className="pt-0.5">
                  <Link
                    href={`/lab/${lab.meta.slug}`}
                    className="inline-block rounded-[var(--radius)] border border-[var(--color-signal)] px-2 py-1 font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-signal)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-signal)] hover:text-[var(--color-paper)]"
                  >
                    Run it <span aria-hidden="true">→</span>
                  </Link>
                </p>
              </div>

              <dl className="grid grid-cols-2 gap-x-3 gap-y-2.5 self-start border-t border-[var(--color-rule)] pt-3 lg:border-t-0 lg:pt-0">
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
                    <dd className="font-[family-name:var(--font-mono)] text-[var(--text-lg)] tabular-nums">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      ) : null}

      {/* 6 — Track record and contact */}
      <Container className="py-7 lg:py-12">
        <h2 className="eyebrow">Track record</h2>
        <div className="mt-4">
          <Timeline />
        </div>

        <div className="mt-7 flex flex-col gap-2.5 border-t border-[var(--color-rule)] pt-5">
          <p className="max-w-[46ch] text-[var(--text-xl)] leading-snug font-semibold tracking-[var(--track-h2)]">
            {meta.closing}
          </p>
          <CopyEmail size="large" />
        </div>
      </Container>
    </>
  )
}
