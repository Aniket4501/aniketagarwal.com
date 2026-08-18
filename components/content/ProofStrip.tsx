import { MetricDelta } from './MetricDelta'
import type { Metric } from '@/lib/content/schema'

/**
 * Pure evidence. No icons, no cards, no border around the group, and no call
 * to action — the section's whole job is to convert the claim above it into
 * something checkable before the reader has committed to scrolling.
 *
 * Three cells, not four. The brief specified a fourth reading
 * "ENTERPRISE · AI Health Reports → USP in 5+ closes", which has no before, no
 * after and no denominator. A qualitative claim in a grid of qualified deltas
 * undermines the three beside it, so it moved to the case-study card.
 */
export function ProofStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid gap-px border-y border-[var(--color-rule)] bg-[var(--color-rule)] sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((m) => (
        <div key={m.label} className="bg-[var(--color-paper)] px-0.5 py-4 sm:px-3">
          <MetricDelta metric={m} />
        </div>
      ))}
    </div>
  )
}
