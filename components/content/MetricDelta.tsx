import { WithNeeds, hasNeeds } from '@/components/ui/Needs'
import type { Metric } from '@/lib/content/schema'

/**
 * The signature element, and the most-repeated component on the site.
 *
 * The connecting rule is drawn TO SCALE. Its filled segment is the smaller of
 * the two values as a proportion of the larger, so a reader sees the ratio
 * before reading either number. That is the one aesthetic risk this site
 * takes: on a page whose whole argument is that furniture and evidence should
 * be told apart, the most-repeated ornament had to become data ink or go.
 *
 * Where `after` is a BOUND rather than a value — "under 2s" comes from "<2s",
 * an inequality — the bar is drawn to the bound and terminated with a dashed
 * edge, which is the standard notation for an open interval. Drawing a solid
 * bar there would assert a precision the source does not contain.
 *
 * Where the two values cannot be compared (different units, or no numeric
 * before), the scale is not drawn at all. A bar implying a ratio that the
 * record does not support would be exactly the invention this site exists to
 * avoid.
 *
 * The denominator renders at the same size as the label — never smaller, never
 * in a tooltip, never on hover. A denominator you have to hover to see is a
 * denominator you are hiding.
 */

type Scale = { fraction: number; smallerIsAfter: boolean; bounded: boolean }

const BOUND = /^\s*(under|below|<|less than|at most)\b/i

/** "15s" -> 15 · "3.5 min" -> 3.5 · "under 2s" -> 2 */
function parse(value: string): { n: number; unit: string } | null {
  const m = value.match(/(-?\d+(?:\.\d+)?)\s*([%A-Za-z/]*)/)
  if (!m?.[1]) return null
  const n = Number(m[1])
  return Number.isFinite(n) ? { n, unit: (m[2] ?? '').toLowerCase() } : null
}

function computeScale(before: string, after: string): Scale | null {
  const a = parse(before)
  const b = parse(after)
  if (!a || !b) return null
  if (a.unit !== b.unit) return null
  if (a.n <= 0 || b.n <= 0) return null

  const larger = Math.max(a.n, b.n)
  const smaller = Math.min(a.n, b.n)
  return {
    fraction: smaller / larger,
    smallerIsAfter: b.n < a.n,
    bounded: BOUND.test(after),
  }
}

export function MetricDelta({
  metric,
  size = 'default',
}: {
  metric: Metric
  size?: 'default' | 'large' | 'compact'
}) {
  const { label, before, after, denominator, timeframe, method, delta, animate } = metric
  const scale = computeScale(before, after)

  const figure =
    size === 'large'
      ? 'text-[var(--text-xl)] sm:text-[var(--text-2xl)]'
      : size === 'compact'
        ? 'text-[var(--text-base)]'
        : 'text-[var(--text-lg)]'

  const qualifiers = [denominator, timeframe, method].filter(Boolean)

  return (
    <figure className="flex flex-col gap-1">
      <figcaption className="eyebrow">{label}</figcaption>

      <div
        className={`flex items-baseline gap-1.5 font-[family-name:var(--font-mono)] tabular-nums ${figure}`}
      >
        <span className="shrink-0 text-[var(--color-ink)]">{before}</span>

        <span aria-hidden="true" className="flex min-w-4 flex-1 items-center self-center">
          {scale ? (
            /* The track is the larger value; the filled segment is the smaller
               one, drawn at its true proportion. */
            <span
              className={`relative h-[3px] flex-1 bg-[var(--color-rule)] ${
                animate ? 'metric-rule--animate' : ''
              }`}
            >
              <span
                className={`absolute inset-y-0 left-0 ${
                  scale.smallerIsAfter
                    ? 'bg-[var(--color-signal)]'
                    : 'bg-[var(--color-rule-strong)]'
                } ${scale.bounded ? 'metric-bound' : ''}`}
                style={{ width: `${(scale.fraction * 100).toFixed(2)}%` }}
              />
            </span>
          ) : (
            <span
              className={`h-px flex-1 bg-[var(--color-rule-strong)] ${
                animate ? 'metric-rule--animate' : ''
              }`}
            />
          )}
          <svg width="7" height="8" viewBox="0 0 7 8" className="ml-1 shrink-0 fill-[var(--color-rule-strong)]">
            <path d="M0 0L7 4L0 8Z" />
          </svg>
        </span>
        <span className="sr-only"> to </span>

        <span className="shrink-0 font-medium text-[var(--color-signal)]">{after}</span>
      </div>

      {delta ? (
        <div className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] tabular-nums text-[var(--color-signal)]">
          {delta}
        </div>
      ) : null}

      {qualifiers.length > 0 ? (
        <div className="mt-0.5 font-[family-name:var(--font-mono)] text-[var(--text-xs)] leading-relaxed">
          {qualifiers.map((q, i) => (
            <span key={i} className={hasNeeds(q) ? '' : 'text-[var(--color-muted)]'}>
              {i > 0 ? <span className="text-[var(--color-muted)]"> · </span> : null}
              <WithNeeds text={q} />
            </span>
          ))}
        </div>
      ) : null}

      {scale?.bounded ? (
        <p className="font-[family-name:var(--font-mono)] text-[var(--text-2xs)] text-[var(--color-muted)]">
          Bar drawn to the bound — the source states an inequality, not a value.
        </p>
      ) : null}
    </figure>
  )
}
