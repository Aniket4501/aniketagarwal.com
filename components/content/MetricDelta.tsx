import { WithNeeds, hasNeeds } from '@/components/ui/Needs'
import type { Metric } from '@/lib/content/schema'

/**
 * The signature element, and the most-repeated component on the site.
 *
 *   COLD START
 *   15s ──────────────────▶ under 2s
 *                           at least 7.5× faster
 *   8 weeks · [NEEDS: percentile, device population, method]
 *
 * The denominator renders at the same size as the label — never smaller, never
 * in a tooltip, never on hover. A denominator you have to hover to see is a
 * denominator you are hiding.
 *
 * `animate` is true only for the hero instances. The rule draws once on load
 * and never again; `prefers-reduced-motion` disables it in globals.css.
 */
export function MetricDelta({
  metric,
  size = 'default',
}: {
  metric: Metric
  size?: 'default' | 'large' | 'compact'
}) {
  const { label, before, after, denominator, timeframe, method, delta, animate } = metric

  const figure =
    size === 'large'
      ? 'text-[var(--text-xl)] sm:text-[var(--text-2xl)]'
      : size === 'compact'
        ? 'text-[var(--text-base)]'
        : 'text-[var(--text-lg)]'

  const qualifiers = [denominator, timeframe, method].filter(Boolean)

  return (
    <figure className="flex flex-col gap-1">
      <figcaption className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] font-medium tracking-[0.12em] text-[var(--color-muted)] uppercase">
        {label}
      </figcaption>

      <div
        className={`flex items-baseline gap-1.5 font-[family-name:var(--font-mono)] tabular-nums ${figure}`}
      >
        <span className="shrink-0 text-[var(--color-ink)]">{before}</span>

        {/* The rule is decorative: the arrow's meaning is carried by the
            visually-hidden "to" below, so a screen reader hears
            "15s to under 2s" rather than a dash. */}
        <span aria-hidden="true" className="flex min-w-4 flex-1 items-center self-center">
          <span
            className={`h-px flex-1 bg-[var(--color-rule-strong)] ${animate ? 'animate-draw' : ''}`}
          />
          <svg
            width="7"
            height="8"
            viewBox="0 0 7 8"
            className="shrink-0 fill-[var(--color-rule-strong)]"
          >
            <path d="M0 0L7 4L0 8Z" />
          </svg>
        </span>
        <span className="sr-only"> to </span>

        <span
          className="shrink-0 font-medium text-[var(--color-signal)]"
        >
          {after}
        </span>
      </div>

      {delta ? (
        <div className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] tabular-nums text-[var(--color-signal)]">
          {delta}
        </div>
      ) : null}

      {qualifiers.length > 0 ? (
        <div
          className={`font-[family-name:var(--font-mono)] text-[var(--text-xs)] leading-relaxed ${
            qualifiers.some(hasNeeds) ? '' : 'text-[var(--color-muted)]'
          }`}
        >
          {qualifiers.map((q, i) => (
            <span key={i} className={hasNeeds(q) ? '' : 'text-[var(--color-muted)]'}>
              {i > 0 ? <span className="text-[var(--color-muted)]"> · </span> : null}
              <WithNeeds text={q} />
            </span>
          ))}
        </div>
      ) : null}
    </figure>
  )
}
