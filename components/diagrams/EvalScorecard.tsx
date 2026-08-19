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

  // Below 640px the sixteen-row matrix loses two of four columns off-screen.
  // The finding survives without the matrix: which dimension fails most, and
  // how many cases clear all four.
  const counts = DIMENSIONS.map((d) => ({
    dimension: d,
    passed: cases.filter((c) => c.dimensions.find((x) => x.dimension === d)?.passed).length,
  }))
  const allFour = cases.filter((c) => c.dimensions.every((d) => d.passed)).length

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:hidden">
        {counts.map((c) => (
          <div key={c.dimension} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="eyebrow">{c.dimension}</span>
              <span className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tabular-nums text-[var(--color-muted)]">
                {c.passed}/{cases.length} pass
              </span>
            </div>
            <div className="flex h-2 w-full bg-[var(--color-rule)]">
              <div
                className="h-full bg-[var(--color-signal)]"
                style={{ width: `${(c.passed / cases.length) * 100}%` }}
              />
            </div>
          </div>
        ))}
        <p className="mt-1 font-[family-name:var(--font-mono)] text-[var(--text-xs)] leading-relaxed text-[var(--color-muted)]">
          {allFour} of {cases.length} cases clear all four. The per-case matrix is on a wider
          screen.
        </p>
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
          <tbody className="font-[family-name:var(--font-mono)] text-[var(--text-xs)]">
            {cases.map((c) => (
              <tr key={c.id} className="border-t border-[var(--color-rule)]">
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
                          passed ? 'text-[var(--color-signal)]' : 'text-[var(--color-flag)]'
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
      <p className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] leading-relaxed text-[var(--color-muted)]">
        {baseline.stats.total} cases · {baseline.stats.handLabelled} hand-labelled ·{' '}
        {baseline.agreement.dimensions.matched}/{baseline.agreement.dimensions.total} agreement with
        the labels · {baseline.totalElapsedMs}ms total. Generated from a real run at build time.
      </p>
    </div>
  )
}
