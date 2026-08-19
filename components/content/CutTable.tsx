export type CutItem = {
  item: string
  /** Why it went where it went. */
  why: string
  /** Which case study or source this decision is drawn from. */
  from?: string
}

export type CutColumn = {
  heading: 'Shipped' | 'Deferred' | 'Won’t have'
  note: string
  items: CutItem[]
}

const TONE: Record<CutColumn['heading'], { dot: string; head: string }> = {
  Shipped: { dot: 'bg-[var(--color-accent)]', head: 'text-[var(--color-accent-ink)]' },
  Deferred: { dot: 'bg-[var(--color-line-strong)]', head: 'text-[var(--color-muted)]' },
  'Won’t have': { dot: 'bg-[var(--color-flag)]', head: 'text-[var(--color-flag)]' },
}

/**
 * What got cut, in three columns.
 *
 * The résumé says "prioritised using MoSCoW", which proves nothing on its own —
 * naming a framework is not the judgement, the cut is. This is the artifact
 * that line should have pointed at all along.
 *
 * Every row is a decision that appears in the record. The set is deliberately
 * partial and the page says so: a short honest artifact beats a complete
 * invented one, and there is no version of this where the missing rows get
 * filled in by inference.
 */
export function CutTable({ columns, caption }: { columns: CutColumn[]; caption: string }) {
  return (
    <div className="wide-block my-5">
      <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
        {columns.map((col) => {
          const tone = TONE[col.heading]
          return (
            <section key={col.heading} className="card flex flex-col p-2.5 sm:p-3">
              <h3 className={`flex items-center gap-1.5 eyebrow ${tone.head}`}>
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                {col.heading}
              </h3>
              <p className="mt-1.5 text-[length:var(--text-xs)] leading-relaxed text-[var(--color-muted)]">
                {col.note}
              </p>

              <ul className="mt-2.5 flex flex-col gap-2.5 border-t border-[var(--color-line)] pt-2.5">
                {col.items.map((i) => (
                  <li key={i.item}>
                    <p className="text-[length:var(--text-sm)] leading-snug font-semibold">
                      {i.item}
                    </p>
                    <p className="mt-0.5 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-body)]">
                      {i.why}
                    </p>
                    {i.from ? (
                      <p className="mt-0.5 text-[length:var(--text-xs)] text-[var(--color-muted)]">
                        {i.from}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
      <p className="mt-2 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
        {caption}
      </p>
    </div>
  )
}
