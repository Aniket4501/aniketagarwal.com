/**
 * The standings screen, rebuilt.
 *
 * The case study argues that a standings table is a daily notice to whoever is
 * last. An artifact that showed the winner's view would illustrate the feature
 * and dodge the argument, so this one is drawn from seventh place out of eight
 * — which is where the argument actually lives. The highlighted row is the
 * reader.
 *
 * Names, step counts and the league name are invented.
 */
const ROWS: { rank: number; name: string; steps: number; you?: boolean }[] = [
  { rank: 1, name: 'R. Menon', steps: 84210 },
  { rank: 2, name: 'S. Iyer', steps: 79880 },
  { rank: 3, name: 'A. Bose', steps: 71340 },
  { rank: 4, name: 'K. Nair', steps: 66900 },
  { rank: 5, name: 'P. Rathi', steps: 61120 },
  { rank: 6, name: 'D. Sharma', steps: 58470 },
  { rank: 7, name: 'You', steps: 54300, you: true },
  { rank: 8, name: 'M. Qureshi', steps: 41260 },
]

const LEADER = ROWS[0]!.steps

export function LeagueStandings() {
  return (
    <div className="text-[length:var(--text-sm)]">
      <div className="border-b border-[var(--color-line)] px-2.5 py-2">
        <p className="font-semibold">Steps Premier League</p>
        <p className="text-[length:var(--text-xs)] text-[var(--color-muted)]">
          Group of 8 · Week 2 of 4 · ends Sunday
        </p>
      </div>

      <ol>
        {ROWS.map((r) => {
          const width = Math.round((r.steps / LEADER) * 100)
          return (
            <li
              key={r.rank}
              className={`flex items-center gap-2 border-b border-[var(--color-line)] px-2.5 py-1.5 last:border-b-0 ${
                r.you ? 'bg-[var(--color-accent-soft)]' : ''
              }`}
            >
              <span
                className={`w-3 shrink-0 tabular-nums ${
                  r.you ? 'font-semibold text-[var(--color-accent-ink)]' : 'text-[var(--color-muted)]'
                }`}
              >
                {r.rank}
              </span>
              <span className={`w-14 shrink-0 truncate ${r.you ? 'font-semibold' : ''}`}>
                {r.name}
              </span>
              <span className="h-1 min-w-0 flex-1 rounded-full bg-[var(--color-line)]">
                <span
                  aria-hidden="true"
                  className={`block h-1 rounded-full ${
                    r.you ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-line-strong)]'
                  }`}
                  style={{ width: `${width}%` }}
                />
              </span>
              <span className="w-12 shrink-0 text-right tabular-nums">
                {(r.steps / 1000).toFixed(1)}k
              </span>
            </li>
          )
        })}
      </ol>

      {/* The notification is part of the screen's argument, not chrome: it is
          the thing that arrives whether or not you opened the app. */}
      <div className="border-t border-[var(--color-line)] bg-[var(--color-wash)] px-2.5 py-2">
        <p className="eyebrow">8:00pm push</p>
        <p className="mt-0.5 leading-snug">
          You are 7th. 4,200 steps behind 6th, with two days left in the season.
        </p>
      </div>
    </div>
  )
}
