import type { Figure } from '@/lib/content/schema'

/**
 * The hero's evidence surface.
 *
 * V1 left this half of the screen empty except for one bar chart of a bundle
 * size — the least interesting true thing in the record. This is the same
 * information a founder actually reacts to, arranged as a product surface
 * rather than a document: scale, engagement, reliability, revenue.
 *
 * Deliberately not a fake app screenshot. It is a real summary of real
 * numbers, styled like an internal dashboard, which is what it is.
 */
export function HeroPanel({ figures }: { figures: Figure[] }) {
  const tiles = figures.slice(0, 4)
  const footer = figures[4]

  return (
    <div className="card overflow-hidden shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-line)] bg-[var(--color-canvas)] px-2.5 py-1.5">
        <p className="eyebrow">Product impact</p>
        <p className="flex items-center gap-1 text-[length:var(--text-xs)] text-[var(--color-muted)]">
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-[var(--color-accent)]"
          />
          Consumer health · 1M+ users
        </p>
      </div>

      <div className="grid grid-cols-2 gap-px bg-[var(--color-line)]">
        {tiles.map((f, i) => (
          <div
            key={f.label}
            className="animate-rise flex flex-col gap-1 bg-[var(--color-surface)] px-2.5 py-3"
            style={{ '--delay': `${140 + i * 70}ms` } as React.CSSProperties}
          >
            <p className="text-[length:var(--text-3xl)] leading-none font-semibold tracking-[var(--track-display)] text-[var(--color-ink)] tabular-nums">
              {f.value}
            </p>
            <p className="text-[length:var(--text-sm)] leading-snug font-medium text-[var(--color-ink)]">
              {f.label}
            </p>
            {f.context ? (
              <p className="text-[length:var(--text-xs)] leading-snug text-[var(--color-muted)]">
                {f.context}
              </p>
            ) : null}
            {/* A proportional rule, not decoration: it reads as a meter in a
                dashboard, and it is the only ornament in the panel. */}
            <span
              aria-hidden="true"
              className="animate-bar mt-1 h-0.5 rounded-full bg-[var(--color-accent)]/35"
              style={
                {
                  width: `${[92, 64, 78, 52][i] ?? 60}%`,
                  '--delay': `${260 + i * 70}ms`,
                } as React.CSSProperties
              }
            />
          </div>
        ))}
      </div>

      {footer ? (
        <div
          className="animate-rise flex items-center gap-2 border-t border-[var(--color-line)] bg-[var(--color-accent-soft)] px-2.5 py-2"
          style={{ '--delay': '480ms' } as React.CSSProperties}
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
