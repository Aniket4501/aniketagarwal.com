import { goldenSet } from '@/lib/grounded/golden-set'
import { evaluate } from '@/lib/grounded/evaluate'
import { evaluateV1 } from '@/lib/grounded/rules-v1'

/**
 * The regression view.
 *
 * A scorer tells you whether one output is good. A harness tells you what a
 * change broke — which means running the same set against two rubric versions
 * and diffing. This runs both, at build time, over all sixteen cases. Nothing
 * here is a stored table: change a rule and this table changes with it.
 *
 * Server component on purpose. The evaluators are pure and deterministic, so
 * this costs the client zero bytes.
 */
type Row = {
  id: string
  category: string
  title: string
  v1: boolean
  v2: boolean
  expected: boolean
}

function verdict(pass: boolean) {
  return pass ? 'pass' : 'fail'
}

export function RegressionDiff() {
  const rows: Row[] = goldenSet.map((c) => ({
    id: c.id,
    category: c.category,
    title: c.title,
    v1: evaluateV1(c.summary, c.labs).passed,
    v2: evaluate(c.summary, c.labs).passed,
    expected: c.expected.passed,
  }))

  const v1Agree = rows.filter((r) => r.v1 === r.expected).length
  const v2Agree = rows.filter((r) => r.v2 === r.expected).length
  const changed = rows.filter((r) => r.v1 !== r.v2)
  // A regression is a case the change made worse: it agreed with the label
  // before and does not now.
  const regressions = changed.filter((r) => r.v1 === r.expected && r.v2 !== r.expected)

  // The two numbers above are weaker than they look, and the table has to say
  // so itself. v1 returns `fail` on every case, so its agreement score is
  // exactly the share of fail-labels in the set — a stub that always answered
  // "fail" would score identically — and no case could move pass→fail, which
  // makes "0 regressions" structurally guaranteed rather than earned.
  const v1Passes = rows.filter((r) => r.v1).length
  const failLabels = rows.filter((r) => !r.expected).length
  const v1Degenerate = v1Passes === 0

  return (
    <div className="wide-block my-5">
      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-[var(--color-line)] bg-[var(--color-wash)] px-2.5 py-2">
          <span className="eyebrow">Regression · Rules v1 → Rules v2</span>
          <span className="eyebrow">Both versions re-run over all {rows.length} cases</span>
        </div>

        <dl className="grid grid-cols-2 gap-px border-b border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-4">
          {[
            ['v1 agreement', `${v1Agree}/${rows.length}*`, null],
            ['v2 agreement', `${v2Agree}/${rows.length}`, 'accent'],
            ['Verdicts changed', String(changed.length), null],
            [
              'Regressions',
              v1Degenerate ? `${regressions.length}*` : String(regressions.length),
              regressions.length ? 'flag' : null,
            ],
          ].map(([k, v, tone]) => (
            <div key={k} className="flex flex-col gap-0.5 bg-[var(--color-surface)] p-2.5">
              <dt className="eyebrow">{k}</dt>
              <dd
                className={`text-[length:var(--text-xl)] font-semibold tabular-nums ${
                  tone === 'accent'
                    ? 'text-[var(--color-accent)]'
                    : tone === 'flag'
                      ? 'text-[var(--color-flag)]'
                      : ''
                }`}
              >
                {v}
              </dd>
            </div>
          ))}
        </dl>

        {v1Degenerate ? (
          <p className="border-b border-[var(--color-line)] px-2.5 py-2 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-body)]">
            <span className="eyebrow text-[var(--color-flag)]">
              * What these two numbers do not prove
            </span>
            <br />
            v1 returns <strong>fail</strong> on all {rows.length} cases — it never passes anything.
            So its {v1Agree}/{rows.length} is exactly the share of fail-labels in the set (
            {failLabels} of {rows.length}); a stub that always answered “fail” would score the same.
            And because v1 produced no passes, no case <em>could</em> move pass→fail, which makes
            zero regressions structurally guaranteed rather than earned. The honest payload of this
            table is one fact: v2 fixed {changed.length} false failures and introduced none. A real
            regression check needs a v1 that passes something.
          </p>
        ) : null}

        <table className="hidden w-full table-fixed text-left text-[length:var(--text-sm)] sm:table">
          <caption className="sr-only">
            Every golden-set case, with the verdict from rules v1, the verdict from rules v2, and the
            hand-written expectation.
          </caption>
          <thead>
            <tr className="border-b border-[var(--color-line)]">
              <th scope="col" className="eyebrow w-[9%] px-2.5 py-2">
                Case
              </th>
              <th scope="col" className="eyebrow px-2.5 py-2">
                What it tests
              </th>
              <th scope="col" className="eyebrow w-[12%] px-2.5 py-2">
                v1
              </th>
              <th scope="col" className="eyebrow w-[12%] px-2.5 py-2">
                v2
              </th>
              <th scope="col" className="eyebrow w-[14%] px-2.5 py-2">
                Label
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const moved = r.v1 !== r.v2
              return (
                <tr
                  key={r.id}
                  className={`border-b border-[var(--color-line)] last:border-b-0 ${
                    moved ? 'bg-[var(--color-accent-soft)]' : ''
                  }`}
                >
                  <th scope="row" className="px-2.5 py-1.5 font-normal tabular-nums">
                    {r.id}
                  </th>
                  <td className="px-2.5 py-1.5 text-[var(--color-body)]">{r.title}</td>
                  {/* The verdict word is never coloured green. "fail" set in
                      the accent — because the harness agreed with a label that
                      says fail — reads as a contradiction at a glance. Only
                      disagreement is marked, so the eye catches problems and
                      nothing else. */}
                  <td className={`px-2.5 py-1.5 ${r.v1 === r.expected ? '' : 'text-[var(--color-flag)]'}`}>
                    {verdict(r.v1)}
                    {r.v1 === r.expected ? null : (
                      <span aria-hidden="true"> ✗</span>
                    )}
                    {r.v1 === r.expected ? null : <span className="sr-only"> — disagrees with the label</span>}
                  </td>
                  <td
                    className={`px-2.5 py-1.5 font-semibold ${
                      r.v2 === r.expected ? '' : 'text-[var(--color-flag)]'
                    }`}
                  >
                    {verdict(r.v2)}
                    {r.v2 === r.expected ? null : (
                      <span aria-hidden="true"> ✗</span>
                    )}
                    {r.v2 === r.expected ? null : <span className="sr-only"> — disagrees with the label</span>}
                  </td>
                  <td className="px-2.5 py-1.5 text-[var(--color-muted)]">{verdict(r.expected)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Five columns do not survive 342px, so every case becomes a card.
            All sixteen are here, not just the five that moved — a reader on a
            phone gets the same matrix a reader on a desktop gets. */}
        <ol className="sm:hidden">
          {rows.map((r) => {
            const moved = r.v1 !== r.v2
            return (
              <li
                key={r.id}
                className={`border-b border-[var(--color-line)] p-2.5 last:border-b-0 ${
                  moved ? 'bg-[var(--color-accent-soft)]' : ''
                }`}
              >
                <p className="flex items-baseline gap-1.5 font-semibold">
                  <span className="tabular-nums">{r.id}</span>
                  <span className="min-w-0 flex-1">{r.title}</span>
                </p>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-[length:var(--text-sm)] text-[var(--color-muted)]">
                  <span>
                    v1{' '}
                    <span
                      className={r.v1 === r.expected ? 'text-[var(--color-ink)]' : 'text-[var(--color-flag)]'}
                    >
                      {verdict(r.v1)}
                      {r.v1 === r.expected ? '' : ' ✗'}
                    </span>
                  </span>
                  <span>
                    v2{' '}
                    <span
                      className={`font-semibold ${
                        r.v2 === r.expected ? 'text-[var(--color-ink)]' : 'text-[var(--color-flag)]'
                      }`}
                    >
                      {verdict(r.v2)}
                      {r.v2 === r.expected ? '' : ' ✗'}
                    </span>
                  </span>
                  <span>label {verdict(r.expected)}</span>
                  {moved ? (
                    <span className="text-[var(--color-accent-ink)]">changed</span>
                  ) : null}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
