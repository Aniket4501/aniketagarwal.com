export type DecisionRow = {
  option: string
  note?: string
  cells: string[]
  chosen?: boolean
}

/**
 * The option comparison. It was the strongest artifact in V1 and it stays,
 * with the chosen row marked structurally as well as visually.
 *
 * Below 640px a four-column table cannot be made to work in 342px of viewport,
 * so it becomes one block per option — same content, same order, same marker,
 * nothing clipped and no horizontal scroll.
 */
export function DecisionTable({
  caption,
  columns,
  rows,
}: {
  caption: string
  columns: string[]
  rows: DecisionRow[]
}) {
  return (
    <div className="my-5">
      <div className="card hidden overflow-hidden sm:block">
        <table className="w-full table-fixed text-left text-[length:var(--text-sm)] leading-snug">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-[var(--color-line)] bg-[var(--color-canvas)]">
              <th scope="col" className="eyebrow px-2 py-2 align-bottom">
                Option
              </th>
              {columns.map((c) => (
                <th key={c} scope="col" className="eyebrow px-2 py-2 align-bottom">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.option}
                className={`border-b border-[var(--color-line)] last:border-b-0 ${
                  r.chosen ? 'bg-[var(--color-accent-soft)]' : ''
                }`}
              >
                <th scope="row" className="px-2 py-2.5 align-top font-semibold text-[var(--color-ink)]">
                  <span className="flex items-start gap-1.5">
                    {r.chosen ? (
                      <span
                        aria-hidden="true"
                        className="mt-[0.15em] grid h-2 w-2 shrink-0 place-items-center rounded-full bg-[var(--color-accent)] text-[10px] leading-none text-white"
                      >
                        ✓
                      </span>
                    ) : null}
                    <span>
                      {r.option}
                      {r.chosen ? <span className="sr-only"> — chosen</span> : null}
                      {r.note ? (
                        <span className="mt-0.5 block text-[length:var(--text-xs)] font-normal text-[var(--color-muted)]">
                          {r.note}
                        </span>
                      ) : null}
                    </span>
                  </span>
                </th>
                {r.cells.map((cell, i) => (
                  <td key={i} className="px-2 py-2.5 align-top text-[var(--color-body)]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="flex flex-col gap-2 sm:hidden">
        {rows.map((r) => (
          <li
            key={r.option}
            className={`card p-2.5 ${r.chosen ? 'border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)]' : ''}`}
          >
            <p className="flex items-start gap-1.5 text-[length:var(--text-base)] leading-snug font-semibold">
              {r.chosen ? (
                <span
                  aria-hidden="true"
                  className="mt-[0.2em] grid h-2 w-2 shrink-0 place-items-center rounded-full bg-[var(--color-accent)] text-[10px] leading-none text-white"
                >
                  ✓
                </span>
              ) : null}
              <span>
                {r.option}
                {r.chosen ? <span className="sr-only"> — chosen</span> : null}
              </span>
            </p>
            {r.note ? (
              <p className="mt-0.5 text-[length:var(--text-xs)] text-[var(--color-muted)]">{r.note}</p>
            ) : null}
            <dl className="mt-2 flex flex-col gap-1.5">
              {r.cells.map((cell, i) => (
                <div key={i}>
                  <dt className="eyebrow">{columns[i]}</dt>
                  <dd className="text-[length:var(--text-sm)] leading-snug text-[var(--color-body)]">
                    {cell}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      <p className="mt-2 text-[length:var(--text-xs)] leading-relaxed text-[var(--color-muted)]">
        {caption}
      </p>
    </div>
  )
}
