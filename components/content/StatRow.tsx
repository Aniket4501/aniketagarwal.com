export type Stat = {
  value: string
  label: string
  /** The denominator, the source, or the exact figure the headline rounds. */
  context: string
}

/**
 * Three or four figures read side by side.
 *
 * Stacked `Metric` blocks inside a prose column read as a run-on list: three
 * 44px numbers in a 36rem measure with nothing between them, and every context
 * line wrapping at half the width it wants. A row across the full figure track
 * lets the reader compare them, which is the only reason they are together.
 *
 * `source` is required. These are the numbers a reader is most likely to
 * challenge, and a stat row without a provenance line is the shape this whole
 * site exists to avoid.
 */
export function StatRow({ stats, source }: { stats: Stat[]; source: string }) {
  return (
    <div className="wide-block my-5">
      <dl className="grid gap-x-6 gap-y-4 border-t border-[var(--color-line-strong)]/40 pt-3 sm:grid-cols-3">
        {stats.map((s, i) => (
          <div key={s.label} className="flex flex-col gap-1">
            <dt className="sr-only">{s.label}</dt>
            <dd className="flex flex-col gap-1">
              <span
                className="animate-rise block text-[length:var(--text-3xl)] leading-none font-semibold tracking-[var(--track-display)] tabular-nums"
                style={{ '--delay': `${i * 60}ms` } as React.CSSProperties}
              >
                {s.value}
              </span>
              <span className="block text-[length:var(--text-base)] font-medium">{s.label}</span>
              <span className="block text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
                {s.context}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-2.5 text-[length:var(--text-sm)] text-[var(--color-muted)]">{source}</p>
    </div>
  )
}
