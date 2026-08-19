import { WithNeeds } from '@/components/ui/Needs'

export type DecisionRow = {
  option: string
  cells: string[]
  chosen?: boolean
  note?: string
}

/**
 * Scrolls horizontally inside its own container with a visible edge fade
 * rather than being squeezed. The chosen row is marked structurally (a scope
 * attribute and a visually-hidden word), not only by colour.
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
    <div className="prose-wide my-5">
      <div
        className="scroll-x border border-[var(--color-rule)] bg-[var(--color-paper-raised)]"
        tabIndex={0}
        role="region"
        aria-label={caption}
      >
        <table className="w-full min-w-[34rem] table-fixed text-left font-[family-name:var(--font-sans)] text-[var(--text-sm)] leading-snug tracking-[var(--track-ui)]">
          <caption className="decision-caption">{caption}</caption>
          <thead>
            <tr className="border-b border-[var(--color-rule-strong)]">
              <th scope="col" className="px-2 py-1.5 font-[family-name:var(--font-mono)] text-[var(--text-xs)] font-medium tracking-[0.1em] text-[var(--color-muted)] uppercase">
                Option
              </th>
              {columns.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="px-2 py-1.5 font-[family-name:var(--font-mono)] text-[var(--text-xs)] font-medium tracking-[0.1em] text-[var(--color-muted)] uppercase"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.option}
                className={`border-b border-[var(--color-rule)] last:border-b-0 ${
                  r.chosen ? 'bg-[var(--color-signal)]/[0.05]' : ''
                }`}
              >
                <th scope="row" className="px-2 py-1.5 align-top font-medium">
                  {r.chosen ? (
                    <span
                      aria-hidden="true"
                      className="mr-1 font-[family-name:var(--font-mono)] text-[var(--color-signal)]"
                    >
                      ▸
                    </span>
                  ) : null}
                  {r.option}
                  {r.chosen ? <span className="sr-only"> — chosen</span> : null}
                  {r.note ? (
                    <span className="mt-0.5 block text-[var(--text-xs)] font-normal text-[var(--color-muted)]">
                      {r.note}
                    </span>
                  ) : null}
                </th>
                {r.cells.map((cell, i) => (
                  <td key={i} className="px-2 py-1.5 align-top text-[var(--color-ink)]">
                    <WithNeeds text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
