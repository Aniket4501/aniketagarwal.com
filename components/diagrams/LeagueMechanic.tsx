import { LoopDiagram } from './Flow'

/**
 * Case study 02 — Steps Premier League.
 *
 * A mechanic diagram, not a product screenshot. It describes the loop the
 * league is built on: the phone already counts the steps, so the product has
 * to supply a reason to open it, and a social standing supplies one daily.
 */
export function LeagueLoop() {
  return (
    <LoopDiagram
      centre="A season ends, standings reset, and everyone gets a fresh reason to start"
      steps={[
        'The phone counts steps whether or not the app is opened — the data arrives for free.',
        'A standing places you against people you know, so the number acquires a consequence.',
        'Falling behind is felt today; the health benefit is felt in a decade.',
        'Opening the app to check a position is the behaviour the league is actually buying.',
      ]}
    />
  )
}

/**
 * Why competition rather than content or rewards. The three options are in the
 * record; the axis they are compared on is the argument.
 */
export function StrategySpread() {
  const options = [
    {
      name: 'Content',
      cost: 'Recurring',
      note: 'Every week needs new material, and the bill never stops.',
      chosen: false,
    },
    {
      name: 'Incentives',
      cost: 'Recurring',
      note: 'Withdraw the reward and the behaviour it bought goes with it.',
      chosen: false,
    },
    {
      name: 'Competition',
      cost: 'One-time, then self-sustaining',
      note: 'Other users supply the reason to return. The cost is the mechanic, not the fuel.',
      chosen: true,
    },
  ]
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {options.map((o) => (
        <div
          key={o.name}
          className={`card flex flex-col gap-1 p-2.5 ${
            o.chosen ? 'border-[var(--color-accent)]/35 bg-[var(--color-accent-soft)]' : ''
          }`}
        >
          <div className="flex items-center gap-1.5">
            <p className="text-[length:var(--text-base)] font-semibold">{o.name}</p>
            {o.chosen ? (
              <span className="eyebrow text-[var(--color-accent-ink)]">Shipped</span>
            ) : null}
          </div>
          <p className="text-[length:var(--text-xs)] font-medium text-[var(--color-muted)]">
            {o.cost}
          </p>
          <p className="text-[length:var(--text-sm)] leading-snug text-[var(--color-body)]">
            {o.note}
          </p>
        </div>
      ))}
    </div>
  )
}
