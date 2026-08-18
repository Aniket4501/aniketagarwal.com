import { WithNeeds } from '@/components/ui/Needs'

/**
 * The three-way split, above the fold on every case study.
 *
 * The "I did not own" column is a required schema field and the build fails
 * without it. Candidates maximise ownership claims; bounding yours is what
 * makes the unbounded claims above it believable. It is also the fastest
 * available substitute for a testimonial.
 *
 * The "I owned" column must be at least as specific as "I did not own" —
 * where ownership is vague, a reviewer applies the least generous reading to
 * everything you left vague.
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
    { title: 'I owned', items: owned, accent: 'text-[var(--color-ink)]' },
    { title: 'We shipped', items: shipped, accent: 'text-[var(--color-ink)]' },
    { title: 'I did not own', items: notOwned, accent: 'text-[var(--color-muted)]' },
  ]

  return (
    <div className="grid gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] md:grid-cols-3">
      {columns.map((c) => (
        <div key={c.title} className="bg-[var(--color-paper-raised)] px-2.5 py-2.5">
          <p className="eyebrow mb-1.5" id={`own-${c.title.replace(/\s+/g, '-')}`}>
            {c.title}
          </p>
          <ul
            aria-labelledby={`own-${c.title.replace(/\s+/g, '-')}`}
            className={`flex flex-col gap-1 text-[var(--text-sm)] leading-relaxed ${c.accent}`}
          >
            {c.items.map((item, i) => (
              <li key={i} className="flex gap-1">
                <span aria-hidden="true" className="mt-[0.55em] h-px w-1 shrink-0 bg-[var(--color-rule-strong)]" />
                <span>
                  <WithNeeds text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
