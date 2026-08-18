import type { Metadata } from 'next'
import { getCaseStudies, getShortCases } from '@/lib/content'
import { Container } from '@/components/layout/Container'
import { CaseCard } from '@/components/work/CaseCard'
import { ShortCase } from '@/components/work/ShortCase'

export const metadata: Metadata = {
  title: 'Work — three case studies and two short ones',
  description:
    'Cold-start latency on a consumer health app, choosing between three retention mechanics, and a generated health report that became a sales asset. Plus two shorter funnel cases.',
  alternates: { canonical: '/work' },
}

export default function WorkIndex() {
  const cases = getCaseStudies()
  const shorts = getShortCases()

  return (
    <>
      <Container className="pt-12 pb-4 lg:pt-20">
        <p className="eyebrow">Work</p>
        <h1 className="mt-4 max-w-[20ch] text-[length:var(--text-3xl)] leading-[1.08] font-semibold tracking-[var(--track-display)]">
          Three problems of three different shapes, from one product surface.
        </h1>
        <p className="mt-5 max-w-[58ch] text-[var(--text-base)] leading-relaxed text-[var(--color-muted)]">
          A latency problem, a choice between mechanics, and a commercial one. Each is written the
          same way, so the pattern only has to be learned once: what the brief was, what the
          evidence said, what was rejected, and what the decision cost.
        </p>
      </Container>

      <Container className="pb-8">
        {cases.map((c) => (
          <CaseCard key={c.meta.slug} meta={c.meta} />
        ))}
      </Container>

      {shorts.length > 0 ? (
        <Container className="pb-20 lg:pb-28">
          <div className="mt-12 flex flex-col gap-3">
            <p className="eyebrow">Two shorter ones</p>
            <p className="max-w-[54ch] text-[var(--text-base)] leading-relaxed text-[var(--color-muted)]">
              Both are funnel problems, and both are here for the trade-off rather than the result.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:gap-14">
            {shorts.map((s) => (
              <ShortCase key={s.meta.slug} meta={s.meta} body={s.body} />
            ))}
          </div>
        </Container>
      ) : null}
    </>
  )
}
