import { WithNeeds, hasNeeds } from '@/components/ui/Needs'
import type { Stat as StatType } from '@/lib/content/schema'

/**
 * A number that is not a delta.
 *
 * "15% incremental revenue" and "5+ enterprise closes" have no before. Forcing
 * them through MetricDelta produced a bar with no left endpoint, labelled
 * "unstated base" — the page drawing a movement it had, in the same breath,
 * said was undefined. And giving enterprise closes a before of "0" invented a
 * starting point the record does not contain.
 *
 * So they get their own shape: no bar, no arrow, no implied ratio. Same
 * discipline about qualifiers, because the rule was never "every delta carries
 * a denominator" — it was every number.
 */
export function Stat({ stat }: { stat: StatType }) {
  const qualifiers = [stat.denominator, stat.timeframe, stat.method].filter(Boolean)

  return (
    <figure className="flex flex-col gap-1">
      <figcaption className="eyebrow">{stat.label}</figcaption>

      <div className="flex items-baseline gap-1.5 font-[family-name:var(--font-mono)] text-[var(--text-lg)] tabular-nums">
        <span className="font-medium text-[var(--color-signal)]">{stat.value}</span>
        {/* A short rule, fixed length, deliberately NOT the scale bar. Nothing
            here is proportional to anything, so nothing should look like it is. */}
        <span aria-hidden="true" className="h-px w-3 self-center bg-[var(--color-rule-strong)]" />
      </div>

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
    </figure>
  )
}
