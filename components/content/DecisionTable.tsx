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
        className="hidden border border-[var(--color-rule)] bg-[var(--color-paper-raised)] sm:block"
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
      {/* Small screens: one block per option. */}
      <ul className="flex flex-col gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] sm:hidden">
        {rows.map((r) => (
          <li
            key={r.option}
            className={`flex flex-col gap-2 p-3 ${
              r.chosen
                ? 'bg-[var(--color-paper-raised)] ring-1 ring-[var(--color-signal)] ring-inset'
                : 'bg-[var(--color-paper-raised)]'
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <p className="font-[family-name:var(--font-sans)] text-[var(--text-base)] leading-snug font-semibold">
                {r.chosen ? (
                  <span aria-hidden="true" className="mr-1 text-[var(--color-signal)]">
                    ▸
                  </span>
                ) : null}
                {r.option}
                {r.chosen ? <span className="sr-only"> — chosen</span> : null}
              </p>
              {r.note ? (
                <p className="font-[family-name:var(--font-sans)] text-[var(--text-sm)] leading-snug text-[var(--color-muted)]">
                  {r.note}
                </p>
              ) : null}
            </div>
            <dl className="flex flex-col gap-1.5">
              {r.cells.map((cell, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <dt className="eyebrow">{columns[i]}</dt>
                  <dd className="font-[family-name:var(--font-sans)] text-[var(--text-sm)] leading-snug">
                    <WithNeeds text={cell} />
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      <p className="mt-1.5 font-[family-name:var(--font-sans)] text-[var(--text-sm)] leading-snug text-[var(--color-muted)] sm:hidden">
        {caption}
      </p>
    </div>
  )
}
