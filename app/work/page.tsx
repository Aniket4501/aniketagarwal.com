import type { Metadata } from 'next'
import { getCaseStudies, getShortCases } from '@/lib/content'
import { Container } from '@/components/layout/Container'
import { Section, SectionHead } from '@/components/layout/Section'
import { CaseCard, CardMetric } from '@/components/work/CaseCard'
import { ShortCase } from '@/components/work/ShortCase'
import { LaunchDurations } from '@/components/diagrams/LaunchImpact'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Three case studies from a consumer health app with 1M+ registered users: app launch time and step syncing, a 0→1 competitive league, and an AI health report that became an enterprise USP.',
  alternates: { canonical: '/work' },
}

function visual(slug: string) {
  switch (slug) {
    case 'step-syncing':
      return (
        <div className="flex flex-col gap-3">
          <LaunchDurations />
          <dl className="grid grid-cols-2 gap-2 border-t border-[var(--color-line)] pt-2.5">
            <div>
              <dt className="text-[length:var(--text-lg)] font-semibold tabular-nums">+35%</dt>
              <dd className="text-[length:var(--text-xs)] text-[var(--color-muted)]">
                Step-sync completion
              </dd>
            </div>
            <div>
              <dt className="text-[length:var(--text-lg)] font-semibold tabular-nums">25 → 6MB</dt>
              <dd className="text-[length:var(--text-xs)] text-[var(--color-muted)]">
                App bundle, 76% smaller
              </dd>
            </div>
          </dl>
        </div>
      )
    case 'steps-premier-league':
      return (
        <CardMetric
          headline={{
            value: '3.5 → 7.8',
            label: 'Minutes per session',
            note: 'The declared north star, and a choice I will argue about.',
          }}
          supporting={[
            { value: '0→1', label: 'Built from nothing' },
            { value: '3', label: 'Strategies evaluated' },
          ]}
        />
      )
    case 'ai-health-report':
      return (
        <CardMetric
          headline={{
            value: '15%',
            label: 'Incremental revenue',
            note: 'From cross-sell placed inside the report, not around it.',
          }}
          supporting={[
            { value: '5+', label: 'Enterprise closes' },
            { value: '0→1', label: 'Requirements to launch' },
          ]}
        />
      )
    default:
      return null
  }
}

export default function WorkIndex() {
  const cases = getCaseStudies()
  const shorts = getShortCases()

  return (
    <>
      <Container className="pt-6 pb-2 lg:pt-9">
        <p className="eyebrow">Work</p>
        <h1 className="mt-2 max-w-[18ch] text-[length:var(--text-3xl)] leading-[1.05] font-semibold tracking-[var(--track-display)] sm:text-[length:var(--text-hero)]">
          Three problems, three shapes.
        </h1>
        <p className="mt-3 max-w-[58ch] text-[length:var(--text-md)] leading-relaxed text-[var(--color-body)]">
          A reliability problem, a choice between mechanics, and a commercial one — all on the same
          product surface. Each is written the same way: what the problem was, what I changed, and
          what it cost.
        </p>
      </Container>

      <Section className="pt-6">
        <Container>
          <div className="flex flex-col gap-3">
            {cases.map((c, i) => (
              <CaseCard
                key={c.meta.slug}
                meta={c.meta}
                index={i + 1}
                reversed={i % 2 === 1}
                visual={visual(c.meta.slug)}
                level={2}
              />
            ))}
          </div>
        </Container>
      </Section>

      {shorts.length > 0 ? (
        <Section band labelledBy="shorts-h">
          <Container>
            <SectionHead
              id="shorts-h"
              eyebrow="Two shorter ones"
              title="Funnels I fixed before this job."
              lead="Both are here for the trade-off rather than the result, and both fit in three hundred words — which is about what either is worth."
            />
            <div className="mt-6 grid gap-3 lg:grid-cols-2">
              {shorts.map((s) => (
                <ShortCase key={s.meta.slug} meta={s.meta} body={s.body} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  )
}
