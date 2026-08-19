import { WithNeeds, hasNeeds } from '@/components/ui/Needs'
import type { Metric } from '@/lib/content/schema'

/**
 * The signature element, and the most-repeated component on the site.
 *
 * TWO BARS FROM ONE ORIGIN, drawn to a shared scale. The reader compares two
 * lengths, which is the comparison a bar chart is for, and no legend is needed
 * to know which is which because each bar is labelled at its own end.
 *
 * The first version was a single track whose filled segment was the smaller
 * value. That produced three different meanings for one widget — fill = after
 * on `25MB → 6MB`, fill = before on `3.5 → 7.8 min` — separated only by hue.
 * A numerate reviewer would have called it wrong, on the site whose whole
 * argument is that figures should be checkable.
 *
 * Where `after` is a BOUND rather than a value — "under 2s" comes from "<2s",
 * an inequality — the bar is drawn to the bound and terminated with a dashed
 * edge, the standard notation for an open interval. A solid bar there would
 * assert a precision the source does not contain.
 *
 * Where the two values cannot be compared (different units, no numeric before)
 * no bars are drawn at all. A figure with no baseline belongs in `Stat`.
 *
 * The denominator renders at the same size as the label — never smaller, never
 * in a tooltip, never on hover. A denominator you have to hover to see is a
 * denominator you are hiding.
 */

const BOUND = /^\s*(under|below|<|less than|at most)\b/i

function parse(value: string): { n: number; unit: string } | null {
  const m = value.match(/(-?\d+(?:\.\d+)?)\s*([%A-Za-z/]*)/)
  if (!m?.[1]) return null
  const n = Number(m[1])
  return Number.isFinite(n) ? { n, unit: (m[2] ?? '').toLowerCase() } : null
}

function scaleOf(before: string, after: string) {
  const a = parse(before)
  const b = parse(after)
  if (!a || !b || a.unit !== b.unit || a.n <= 0 || b.n <= 0) return null
  const max = Math.max(a.n, b.n)
  return { before: (a.n / max) * 100, after: (b.n / max) * 100, bounded: BOUND.test(after) }
}

export function MetricDelta({
  metric,
  size = 'default',
}: {
  metric: Metric
  size?: 'default' | 'large' | 'compact'
}) {
  const { label, before, after, denominator, timeframe, method, delta, animate } = metric
  const scale = scaleOf(before, after)

  const figure =
    size === 'large'
      ? 'text-[var(--text-lg)] sm:text-[var(--text-xl)]'
      : size === 'compact'
        ? 'text-[var(--text-sm)]'
        : 'text-[var(--text-base)]'

  // Collapse repeats: "not stated · not stated · NEEDS: …" says the same thing
  // twice before it says the useful thing once.
  const qualifiers = [...new Set([denominator, timeframe, method].filter(Boolean))]

  return (
    <figure className="flex flex-col gap-1.5">
      <figcaption className="eyebrow">{label}</figcaption>

      <div
        className={`grid grid-cols-[max-content_minmax(0,1fr)] items-center gap-x-1.5 gap-y-1 font-[family-name:var(--font-mono)] tabular-nums ${figure}`}
      >
        <span className="text-right text-[var(--color-ink)]">{before}</span>
        {scale ? (
          <span aria-hidden="true" className="flex h-2 items-center">
            <span
              className={`h-full bg-[var(--color-ink)]/70 ${animate ? 'metric-rule--animate' : ''}`}
              style={{ width: `${scale.before.toFixed(2)}%` }}
            />
          </span>
        ) : (
          <span aria-hidden="true" className="h-px bg-[var(--color-rule-strong)]" />
        )}

        <span className="text-right font-medium text-[var(--color-signal)]">{after}</span>
        {scale ? (
          <span aria-hidden="true" className="flex h-2 items-center">
            <span
              className={`h-full bg-[var(--color-signal)] ${
                scale.bounded ? 'border-r-2 border-dashed border-[var(--color-signal)]' : ''
              } ${animate ? 'metric-rule--animate' : ''}`}
              style={{ width: `${scale.after.toFixed(2)}%` }}
            />
          </span>
        ) : (
          <span />
        )}
      </div>

      {delta ? (
        <div className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] tabular-nums text-[var(--color-signal)]">
          {delta}
        </div>
      ) : null}

      {qualifiers.length > 0 ? (
        <div className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] leading-relaxed">
          {qualifiers.map((q, i) => (
            <span key={i} className={hasNeeds(q) ? '' : 'text-[var(--color-muted)]'}>
              {i > 0 ? <span className="text-[var(--color-muted)]"> · </span> : null}
              <WithNeeds text={q} />
            </span>
          ))}
        </div>
      ) : null}

      {scale?.bounded ? (
        <p className="font-[family-name:var(--font-mono)] text-[var(--text-2xs)] leading-snug text-[var(--color-muted)]">
          Drawn to the bound — the source states an inequality, not a value.
        </p>
      ) : null}
    </figure>
  )
}
