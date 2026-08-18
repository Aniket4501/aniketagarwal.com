import Link from 'next/link'
import { MetricDelta } from '@/components/content/MetricDelta'
import type { CaseStudyFrontmatter } from '@/lib/content/schema'

/**
 * A full-width stacked row, not a card in a three-up grid.
 *
 * Attention demonstrably runs out around the third case study, and a grid
 * invites parallel skimming of all three and deep reading of none. Rows force
 * a sequence. Alignment stays consistent across rows — alternating reads as
 * decoration.
 *
 * The headline is the tension or the outcome. Never a feature name.
 */
export function CaseCard({ meta }: { meta: CaseStudyFrontmatter }) {
  const lead = meta.metrics[0]

  return (
    <Link
      href={`/work/${meta.slug}`}
      className="group block border-t border-[var(--color-rule)] py-5 transition-colors duration-[var(--duration-fast)] last:border-b lg:py-6"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-8">
        <div className="flex flex-col gap-2">
          <p className="eyebrow">
            {String(meta.order).padStart(2, '0')} · {meta.title}
          </p>
          <h3 className="max-w-[24ch] text-[var(--text-xl)] leading-[1.18] font-semibold tracking-[var(--track-h2)] transition-colors duration-[var(--duration-fast)] group-hover:text-[var(--color-signal)] sm:text-[var(--text-2xl)]">
            {meta.headline}
          </h3>
          <p className="max-w-[52ch] text-[var(--text-base)] leading-relaxed text-[var(--color-muted)]">
            {meta.tagline}
          </p>
          <p className="mt-0.5 font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-signal)]">
            Read <span aria-hidden="true">→</span>
          </p>
        </div>

        {lead ? (
          <div className="lg:pt-4">
            <MetricDelta metric={lead} />
          </div>
        ) : null}
      </div>
    </Link>
  )
}
