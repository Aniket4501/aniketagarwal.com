/**
 * The three-way split, above the fold on every case study.
 *
 * "I did not own" is a required schema field and the build fails without it.
 * Candidates maximise ownership claims; bounding yours is what makes the
 * unbounded ones believable, and it was the single most-praised element in
 * every V1 review.
 */
export function OwnershipBlock({
  owned,
  shipped,
  notOwned,
}: {
  owned: readonly string[]
  shipped: readonly string[]
  notOwned: readonly string[]
}) {
  const columns = [
    { title: 'I owned', items: owned, accent: true },
    { title: 'We shipped', items: shipped, accent: false },
    { title: 'I did not own', items: notOwned, accent: false, muted: true },
  ]

  return (
    <div className="grid gap-2 lg:grid-cols-3">
      {columns.map((c) => (
        <div
          key={c.title}
          className={`card flex flex-col gap-2 p-3 ${c.accent ? 'border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)]' : ''}`}
        >
          <p
            id={`own-${c.title.replace(/\s+/g, '-')}`}
            className={`eyebrow ${c.accent ? 'text-[var(--color-accent-ink)]' : ''}`}
          >
            {c.title}
          </p>
          <ul
            aria-labelledby={`own-${c.title.replace(/\s+/g, '-')}`}
            className={`flex flex-col gap-1.5 text-[length:var(--text-sm)] leading-relaxed ${
              c.muted ? 'text-[var(--color-muted)]' : 'text-[var(--color-body)]'
            }`}
          >
            {c.items.map((item, i) => (
              <li key={i} className="flex gap-1.5">
                <span
                  aria-hidden="true"
                  className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-[var(--color-line-strong)]" 
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
