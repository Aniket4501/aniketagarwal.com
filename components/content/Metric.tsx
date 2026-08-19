import type { Metric as MetricType } from '@/lib/content/schema'

/**
 * A headline number, its label, and one line of context.
 *
 * The context line is what makes it evidence rather than a stat. "+20%" is a
 * boast; "+20% app engagement — an engagement module spanning challenges,
 * streaks, content and live events" is a claim someone can ask about.
 */
export function Metric({
  value,
  label,
  context,
  size = 'default',
  delay = 0,
}: {
  value: string
  label: string
  context?: string
  size?: 'default' | 'large'
  delay?: number
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <p
        className={`animate-rise font-semibold tracking-[var(--track-display)] text-[var(--color-ink)] tabular-nums ${
          size === 'large'
            ? 'text-[length:var(--text-metric)]'
            : 'text-[length:var(--text-3xl)] leading-none'
        }`}
        style={{ '--delay': `${delay}ms` } as React.CSSProperties}
      >
        {value}
      </p>
      <p className="text-[length:var(--text-base)] font-medium text-[var(--color-ink)]">{label}</p>
      {context ? (
        <p className="max-w-[34ch] text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
          {context}
        </p>
      ) : null}
    </div>
  )
}

const BOUND = /^\s*(under|below|<|less than|at most)\b/i

function parse(v: string) {
  const m = v.match(/(-?\d+(?:\.\d+)?)/)
  return m?.[1] ? Number(m[1]) : null
}

/**
 * Before → after, drawn as two bars from one origin at one scale.
 *
 * The reader compares two lengths, which is what a bar chart is for, and each
 * bar is labelled at its own end so no legend is needed. Where the "after" is
 * a bound rather than a value — "under 2s" from "<2s" — the bar stops at the
 * bound and its edge is dashed, the standard notation for an open interval.
 */
export function MetricDelta({
  metric,
  animate = false,
  delay = 0,
}: {
  metric: MetricType
  animate?: boolean
  delay?: number
}) {
  const a = parse(metric.before)
  const b = parse(metric.after)
  const scale = a && b && a > 0 && b > 0 ? { a: (a / Math.max(a, b)) * 100, b: (b / Math.max(a, b)) * 100 } : null
  const bounded = BOUND.test(metric.after)

  return (
    <figure className="flex flex-col gap-2">
      <figcaption className="eyebrow">{metric.label}</figcaption>

      {scale ? (
        <div className="grid grid-cols-[max-content_minmax(0,1fr)] items-center gap-x-2 gap-y-1.5 text-[length:var(--text-base)] tabular-nums">
          <span className="text-right text-[var(--color-muted)]">{metric.before}</span>
          <span aria-hidden="true" className="flex h-2 items-center">
            <span
              className={`h-full rounded-[2px] bg-[var(--color-line-strong)] ${animate ? 'animate-bar' : ''}`}
              style={{ width: `${scale.a}%`, '--delay': `${delay}ms` } as React.CSSProperties}
            />
          </span>

          <span className="text-right font-semibold text-[var(--color-ink)]">{metric.after}</span>
          <span aria-hidden="true" className="flex h-2 items-center">
            <span
              className={`h-full rounded-[2px] bg-[var(--color-accent)] ${
                bounded ? 'border-r-2 border-dashed border-[var(--color-accent)]' : ''
              } ${animate ? 'animate-bar' : ''}`}
              style={
                { width: `${scale.b}%`, '--delay': `${delay + 90}ms` } as React.CSSProperties
              }
            />
          </span>
        </div>
      ) : (
        <p className="flex items-baseline gap-1.5 text-[length:var(--text-base)] tabular-nums">
          <span className="text-[var(--color-muted)]">{metric.before}</span>
          <span aria-hidden="true" className="text-[var(--color-line-strong)]">
            →
          </span>
          <span className="font-semibold text-[var(--color-ink)]">{metric.after}</span>
        </p>
      )}

      {metric.delta ? (
        <p className="text-[length:var(--text-sm)] font-medium text-[var(--color-accent)] tabular-nums">
          {metric.delta}
        </p>
      ) : null}

      {metric.note ? (
        <p className="max-w-[38ch] text-[length:var(--text-xs)] leading-relaxed text-[var(--color-muted)]">
          {metric.note}
        </p>
      ) : null}
    </figure>
  )
}
