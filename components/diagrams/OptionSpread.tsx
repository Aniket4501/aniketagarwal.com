/**
 * The three options, arranged by whether their cost recurs.
 *
 * The option names and the choice are in the record. The SCORES are not, so
 * this is not the scored decision matrix the brief asked for — inventing a
 * grid of numbers would have been the largest fabrication on the site.
 *
 * What it shows instead is the argument: content and incentives buy attention
 * you keep paying for, and a competitive mechanic is self-sustaining once it
 * is seeded. That is reasoning, and reasoning is free.
 */

const options = [
  {
    name: 'Content',
    cost: 'Recurring',
    note: 'Every week needs new content. The cost never stops and neither does the production.',
    chosen: false,
  },
  {
    name: 'Incentives',
    cost: 'Recurring',
    note: 'Rewards have to keep arriving. Withdraw them and the behaviour they bought goes with them.',
    chosen: false,
  },
  {
    name: 'Competition',
    cost: 'One-time, then self-sustaining',
    note: 'Other people supply the reason to return. The cost is the mechanic, not the fuel.',
    chosen: true,
  },
]

export function OptionSpread() {
  return (
    <div className="grid gap-px bg-[var(--color-rule)] sm:grid-cols-3">
      {options.map((o) => (
        <div
          key={o.name}
          className={`flex flex-col gap-1 bg-[var(--color-paper-raised)] p-2 ${
            o.chosen ? 'ring-1 ring-[var(--color-signal)] ring-inset' : ''
          }`}
        >
          <div className="flex items-baseline gap-1">
            <h4 className="text-[var(--text-base)] font-semibold">{o.name}</h4>
            {o.chosen ? (
              <span className="eyebrow text-[var(--color-signal)]">shipped</span>
            ) : null}
          </div>
          <p className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)]">
            {o.cost}
          </p>
          <p className="text-[var(--text-sm)] leading-relaxed">{o.note}</p>
        </div>
      ))}
    </div>
  )
}
