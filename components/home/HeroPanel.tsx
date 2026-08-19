import type { Figure } from '@/lib/content/schema'

/**
 * The hero's evidence surface.
 *
 * One large figure and three supporting ones, rather than a 2×2 of equals —
 * scale is the fact that reframes everything else, and an equal grid gave four
 * incommensurable numbers the same weight.
 *
 * Deliberately not a fake app screenshot. It is a real summary of real numbers
 * arranged like an internal dashboard, which is what it is. An earlier version
 * put a proportional rule under each tile; those encoded nothing, because the
 * four metrics share no scale, so they are gone.
 */
export function HeroPanel({ figures }: { figures: Figure[] }) {
  const lead = figures[0]
  const rest = figures.slice(1, 4)
  const footer = figures[4]

  if (!lead) return null

  return (
    <div className="card overflow-hidden shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-line)] bg-[var(--color-canvas)] px-2.5 py-1.5">
        <p className="eyebrow">Product impact</p>
        <p className="hidden items-center gap-1 text-[length:var(--text-xs)] whitespace-nowrap text-[var(--color-muted)] sm:flex">
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
          HCL Healthcare · since Oct 2024
        </p>
      </div>

      <div
        className="animate-rise flex flex-wrap items-end justify-between gap-x-4 gap-y-1 px-2.5 py-3"
        style={{ '--delay': '140ms' } as React.CSSProperties}
      >
        <div className="flex flex-col gap-0.5">
          <p className="text-[length:var(--text-metric)] leading-none font-semibold tracking-[var(--track-display)] text-[var(--color-ink)] tabular-nums">
            {lead.value}
          </p>
          <p className="text-[length:var(--text-base)] font-medium text-[var(--color-ink)]">
            {lead.label}
          </p>
        </div>
        {lead.context ? (
          <p className="text-[length:var(--text-xs)] text-[var(--color-muted)]">{lead.context}</p>
        ) : null}
      </div>

      <dl className="grid grid-cols-3 gap-px border-t border-[var(--color-line)] bg-[var(--color-line)]">
        {rest.map((f, i) => (
          <div
            key={f.label}
            className="animate-rise flex flex-col gap-0.5 bg-[var(--color-surface)] px-2 py-2.5"
            style={{ '--delay': `${210 + i * 60}ms` } as React.CSSProperties}
          >
            <dt className="text-[length:var(--text-xl)] leading-none font-semibold tracking-[var(--track-display)] text-[var(--color-ink)] tabular-nums">
              {f.value}
            </dt>
            <dd className="text-[length:var(--text-xs)] leading-snug text-[var(--color-muted)]">
              <span className="block font-medium text-[var(--color-ink)]">{f.label}</span>
              {f.context}
            </dd>
          </div>
        ))}
      </dl>

      {footer ? (
        <div
          className="animate-rise flex items-center gap-2 border-t border-[var(--color-line)] bg-[var(--color-accent-soft)] px-2.5 py-2"
          style={{ '--delay': '400ms' } as React.CSSProperties}
        >
          <span
            aria-hidden="true"
            className="grid h-3 w-3 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-[var(--color-accent)] text-[length:var(--text-xs)] font-semibold text-white"
          >
            AI
          </span>
          <div className="min-w-0">
            <p className="truncate text-[length:var(--text-sm)] font-semibold text-[var(--color-accent-ink)]">
              {footer.label}
            </p>
            {footer.context ? (
              <p className="truncate text-[length:var(--text-xs)] text-[var(--color-accent-ink)]">
                {footer.context}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
