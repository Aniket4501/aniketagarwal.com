import baseline from '@/public/grounded-baseline.json'

type Dim = { dimension: string; passed: boolean }
type Case = { id: string; category: string; dimensions: Dim[]; verdictAgrees: boolean }

const DIMENSIONS = ['grounding', 'scope', 'escalation', 'readability'] as const

/**
 * The only diagram on this site drawn from data that actually exists.
 *
 * Every cell is read from public/grounded-baseline.json, which is written by
 * scripts/run-golden-set.ts running the real evaluator over the real set. If
 * a rule changes, this picture changes on the next build.
 */
export function EvalScorecard() {
  const cases = baseline.cases as unknown as Case[]

  // Below 640px a four-column matrix does not fit, so the same sixteen rows
  // render as one card per case with the four dimensions as chips. Every case
  // and every cell is present at 320px — this is the strongest artifact on the
  // site and the readers most likely to meet it first are on phones.
  const counts = DIMENSIONS.map((d) => ({
    dimension: d,
    passed: cases.filter((c) => c.dimensions.find((x) => x.dimension === d)?.passed).length,
  }))
  const allFour = cases.filter((c) => c.dimensions.every((d) => d.passed)).length

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        {counts.map((c) => (
          <div key={c.dimension} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="eyebrow">{c.dimension}</span>
              <span className="text-[length:var(--text-xs)] tabular-nums text-[var(--color-muted)]">
                {c.passed}/{cases.length} pass
              </span>
            </div>
            <div className="flex h-2 w-full bg-[var(--color-line)]">
              <div
                className="h-full bg-[var(--color-accent)]"
                style={{ width: `${(c.passed / cases.length) * 100}%` }}
              />
            </div>
          </div>
        ))}
        <p className="mt-1 text-[length:var(--text-xs)] leading-relaxed text-[var(--color-muted)]">
          {allFour} of {cases.length} cases clear all four.
        </p>

        <ol className="mt-1.5 flex flex-col gap-px bg-[var(--color-line)] sm:hidden">
          {cases.map((c) => (
            <li key={c.id} className="bg-[var(--color-surface)] p-2">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[length:var(--text-sm)] font-semibold tabular-nums">
                  {c.id}
                </span>
                <span className="text-[length:var(--text-xs)] text-[var(--color-muted)]">
                  {c.category}
                </span>
              </div>
              <dl className="mt-1 grid grid-cols-2 gap-x-2 gap-y-0.5">
                {DIMENSIONS.map((d) => {
                  const passed = c.dimensions.find((x) => x.dimension === d)?.passed ?? false
                  return (
                    <div key={d} className="flex items-baseline gap-1">
                      <dt className="text-[length:var(--text-xs)] text-[var(--color-muted)]">{d}</dt>
                      <dd
                        className={`text-[length:var(--text-xs)] font-medium ${
                          passed ? 'text-[var(--color-ink)]' : 'text-[var(--color-flag)]'
                        }`}
                      >
                        {passed ? 'pass' : 'fail'}
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </li>
          ))}
        </ol>
      </div>

      <div
        className="scroll-x hidden sm:block"
        tabIndex={0}
        role="region"
        aria-label="Grounded evaluator results per case"
      >
        <table className="w-full min-w-[30rem] border-collapse text-left">
          <caption className="sr-only">
            Per-case results of the Grounded evaluator across four scored dimensions
          </caption>
          <thead>
            <tr>
              <th scope="col" className="eyebrow px-1 pb-1 text-left">
                Case
              </th>
              {DIMENSIONS.map((d) => (
                <th key={d} scope="col" className="eyebrow px-1 pb-1 text-left">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[length:var(--text-xs)]">
            {cases.map((c) => (
              <tr key={c.id} className="border-t border-[var(--color-line)]">
                <th scope="row" className="px-1 py-0.75 font-normal whitespace-nowrap">
                  <span className="text-[var(--color-ink)]">{c.id}</span>{' '}
                  <span className="text-[var(--color-muted)]">{c.category}</span>
                </th>
                {DIMENSIONS.map((d) => {
                  const dim = c.dimensions.find((x) => x.dimension === d)
                  const passed = dim?.passed ?? false
                  return (
                    <td key={d} className="px-1 py-0.75">
                      <span
                        className={
                          // Only failure is coloured. Fifty-five green "pass"
                          // tokens made accent green the page's background
                          // rather than its signal.
                          passed ? 'text-[var(--color-ink)]' : 'text-[var(--color-flag)]'
                        }
                      >
                        {passed ? 'pass' : 'fail'}
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[length:var(--text-xs)] leading-relaxed text-[var(--color-muted)]">
        {/* Not "0 hand-labelled" — the labels ARE hand-written, by me, which the
            page says two paragraphs down. The field counts clinician review,
            and printing it as "hand-labelled" made the caption contradict the
            prose on the one page that cannot afford a wrong number. */}
        {baseline.stats.total} cases · {baseline.stats.handLabelled} reviewed by a clinician ·{' '}
        {baseline.agreement.dimensions.matched}/{baseline.agreement.dimensions.total} agreement with
        my own labels · {baseline.totalElapsedMs}ms total. Generated from a real run at build time.
      </p>
    </div>
  )
}
