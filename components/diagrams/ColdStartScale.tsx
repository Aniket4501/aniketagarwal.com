/**
 * Cold start, drawn to scale.
 *
 * Three real numbers and nothing else: the 15s launch time, the 2s benchmark
 * it was measured against, and the sub-2s result. The brief asked for an
 * annotated latency waterfall; a waterfall needs per-phase timings, and no
 * phase breakdown exists in the record, so 90% of that diagram's area would
 * have been invented. What is left is the thing that actually carries the
 * point: the size of the gap.
 *
 * CSS rather than SVG so the labels are real text — selectable, translatable,
 * and legible at 320px without a viewBox fighting the type scale.
 */

const MAX = 15

const bars = [
  { label: 'Before', value: 15, display: '15s', tone: 'ink' as const },
  { label: 'Benchmark', value: 2, display: '2s', tone: 'rule' as const },
  { label: 'After', value: 2, display: 'under 2s', tone: 'signal' as const, capped: true },
]

const FILL = {
  ink: 'bg-[var(--color-ink)]',
  rule: 'bg-[var(--color-rule-strong)]',
  signal: 'bg-[var(--color-signal)]',
}

export function ColdStartScale() {
  return (
    <div className="flex flex-col gap-2">
      {bars.map((b) => (
        <div key={b.label} className="flex flex-col gap-0.75">
          <div className="flex items-baseline justify-between gap-1.5">
            <span className="eyebrow">{b.label}</span>
            <span className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] tabular-nums">
              {b.display}
            </span>
          </div>
          <div className="h-1.5 w-full bg-[var(--color-rule)]/50">
            <div
              className={`h-full ${FILL[b.tone]}`}
              style={{ width: `${(b.value / MAX) * 100}%` }}
            />
          </div>
        </div>
      ))}
      <p className="mt-0.5 font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)]">
        Drawn to scale. The record states an inequality for the result, so the bar shows the 2s
        ceiling, not a measured value.
      </p>
    </div>
  )
}
