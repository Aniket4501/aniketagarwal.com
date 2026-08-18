/**
 * An argument, not a claim about what shipped.
 *
 * Why a competitive mechanic works in a health product: the benefit a health
 * app promises is felt once a year, and the cost of falling behind people you
 * know is felt today. The product has to borrow a feedback loop that runs at
 * the cadence of a day, because the one it is actually selling runs at the
 * cadence of a decade.
 *
 * Nothing here asserts anything about Aniket's product. It is the reasoning
 * behind choosing competition over content or rewards.
 */
export function FeedbackCadence() {
  return (
    <svg
      viewBox="0 0 640 220"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker id="fc-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--color-rule-strong)" />
        </marker>
      </defs>

      {/* Row 1 — the benefit the product actually sells */}
      <text x="0" y="14" className="fill-[var(--color-muted)] font-[family-name:var(--font-mono)]" fontSize="11" letterSpacing="1.2">
        WHAT A HEALTH APP SELLS
      </text>
      <line x1="0" y1="46" x2="620" y2="46" stroke="var(--color-rule-strong)" strokeWidth="1" markerEnd="url(#fc-arrow)" />
      <circle cx="4" cy="46" r="3.5" fill="var(--color-rule-strong)" />
      <circle cx="600" cy="46" r="3.5" fill="var(--color-rule-strong)" />
      <text x="0" y="68" className="fill-[var(--color-ink)]" fontSize="13">today</text>
      <text x="600" y="68" textAnchor="end" className="fill-[var(--color-ink)]" fontSize="13">
        a decade from now
      </text>
      <text x="0" y="92" className="fill-[var(--color-muted)]" fontSize="13">
        One felt signal, arriving far too late to change what you do this evening.
      </text>

      {/* Row 2 — the loop the mechanic borrows */}
      <text x="0" y="140" className="fill-[var(--color-muted)] font-[family-name:var(--font-mono)]" fontSize="11" letterSpacing="1.2">
        WHAT A LEAGUE BORROWS
      </text>
      <line x1="0" y1="172" x2="620" y2="172" stroke="var(--color-signal)" strokeWidth="1" markerEnd="url(#fc-arrow)" />
      {Array.from({ length: 15 }, (_, i) => (
        <circle key={i} cx={4 + i * 42.5} cy={172} r="3.5" fill="var(--color-signal)" />
      ))}
      <text x="0" y="194" className="fill-[var(--color-ink)]" fontSize="13">today</text>
      <text x="600" y="194" textAnchor="end" className="fill-[var(--color-ink)]" fontSize="13">
        two weeks from now
      </text>
      <text x="0" y="216" className="fill-[var(--color-muted)]" fontSize="13">
        A social cost that lands every single day, whether or not motivation does.
      </text>
    </svg>
  )
}
