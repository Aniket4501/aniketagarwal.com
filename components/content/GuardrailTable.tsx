export type Guardrail = {
  metric: string
  catches: string
  rollback: string
}

/**
 * The counter-metrics for a launch, stated as a plan rather than a result.
 *
 * This is the one artifact on the site that deliberately shows no data, and
 * the framing has to carry that or it becomes the thing the whole build exists
 * to prevent. A guardrail table that looked like a results table would read as
 * "here is what we measured" — so the header says PLANNED, NOT MEASURED, the
 * numbers column is a rollback threshold rather than an observation, and the
 * caption says plainly that these were not instrumented.
 *
 * Showing it anyway is the point: naming what would have falsified your own
 * launch is a different signal from reporting what confirmed it.
 */
export function GuardrailTable({
  caption,
  rows,
}: {
  caption: string
  rows: Guardrail[]
}) {
  return (
    <div className="decision-block my-5">
      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-[var(--color-line)] bg-[var(--color-wash)] px-2.5 py-2">
          <span className="eyebrow">Guardrails</span>
          <span className="eyebrow text-[var(--color-flag)]">Planned · not measured</span>
        </div>

        <table className="hidden w-full table-fixed text-left text-[length:var(--text-sm)] leading-snug sm:table">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-[var(--color-line)]">
              <th scope="col" className="eyebrow w-[26%] px-2.5 py-2 align-bottom">
                Counter-metric
              </th>
              <th scope="col" className="eyebrow px-2.5 py-2 align-bottom">
                The false win it catches
              </th>
              <th scope="col" className="eyebrow px-2.5 py-2 align-bottom">
                What would have stopped the rollout
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.metric} className="border-b border-[var(--color-line)] last:border-b-0">
                <th scope="row" className="px-2.5 py-2 align-top font-semibold">
                  {r.metric}
                </th>
                <td className="px-2.5 py-2 align-top text-[var(--color-body)]">{r.catches}</td>
                <td className="px-2.5 py-2 align-top text-[var(--color-muted)]">{r.rollback}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Three columns of prose cannot be read in 342px. One block per
            guardrail below sm — same content, same order, nothing clipped. */}
        <dl className="sm:hidden">
          {rows.map((r) => (
            <div key={r.metric} className="border-b border-[var(--color-line)] p-2.5 last:border-b-0">
              <dt className="font-semibold">{r.metric}</dt>
              <dd className="mt-1 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-body)]">
                {r.catches}
              </dd>
              <dd className="mt-1.5 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
                <span className="eyebrow">Would have stopped it: </span>
                {r.rollback}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="mt-1.5 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
        {caption}
      </p>
    </div>
  )
}
