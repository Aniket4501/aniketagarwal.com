/**
 * One page of the AI Smart Health Report, rebuilt.
 *
 * The case study makes two claims that prose alone cannot carry: that the
 * report is readable by a non-clinical adult, and that the commercial ask sits
 * in a visibly different register from the interpretation. Both are claims
 * about *layout*, so a layout is the only honest way to show them.
 *
 * What is reconstructed here is the hierarchy the case study describes: the
 * value, then the plain-language reading of it, then — separated by a rule, in
 * a different ground, never inside the sentence that explains a result — the
 * one prompted next step. Every value is synthetic and inside its reference
 * range except the one that is not, because the out-of-range case is where the
 * design constraint is actually tested.
 */
const ROWS = [
  { name: 'Haemoglobin', value: '14.2 g/dL', ref: '13.0–17.0', flag: false },
  { name: 'HbA1c', value: '5.9 %', ref: '4.0–5.6', flag: true },
  { name: 'LDL cholesterol', value: '96 mg/dL', ref: '0–100', flag: false },
  { name: 'Vitamin D', value: '22 ng/mL', ref: '30–100', flag: true },
]

export function ReportPage() {
  return (
    <div className="text-[length:var(--text-sm)]">
      <div className="border-b border-[var(--color-line)] px-2.5 py-2">
        <p className="eyebrow">Annual health check · March</p>
        <p className="mt-0.5 font-semibold">Your results, explained</p>
      </div>

      <table className="w-full text-left">
        <caption className="sr-only">
          Four synthetic blood-panel values with their reference ranges, two of them outside range.
        </caption>
        <thead>
          <tr className="border-b border-[var(--color-line)]">
            <th scope="col" className="eyebrow px-2.5 py-1.5">
              Test
            </th>
            <th scope="col" className="eyebrow px-2.5 py-1.5 text-right">
              Result
            </th>
            <th scope="col" className="eyebrow px-2.5 py-1.5 text-right">
              Usual range
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.name} className="border-b border-[var(--color-line)]">
              <th scope="row" className="px-2.5 py-1.5 font-normal">
                {r.name}
              </th>
              <td
                className={`px-2.5 py-1.5 text-right font-semibold tabular-nums ${
                  r.flag ? 'text-[var(--color-flag)]' : ''
                }`}
              >
                {r.value}
              </td>
              <td className="px-2.5 py-1.5 text-right tabular-nums text-[var(--color-muted)]">
                {r.ref}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-2.5 py-2">
        <p className="eyebrow">What this means</p>
        <p className="mt-1 leading-relaxed text-[var(--color-body)]">
          Two results sit outside their usual range. Your HbA1c of 5.9% is above 5.6, which is the
          figure a doctor would want to look at alongside your history — it is not a diagnosis on its
          own. Your vitamin D of 22 is below 30, which is common and usually straightforward to
          correct.
        </p>
        <p className="mt-1.5 leading-relaxed text-[var(--color-body)]">
          Everything else on this page is inside its usual range.
        </p>
      </div>

      {/* The register break. A different ground, below a rule, outside the
          sentence that explains a result, and never the answer to the
          out-of-range value above it. */}
      <div className="border-t border-[var(--color-line)] bg-[var(--color-wash)] px-2.5 py-2">
        <p className="eyebrow">Next step</p>
        <p className="mt-0.5 leading-snug">
          Book a 15-minute call with a doctor to go through these two results.
        </p>
        <span className="mt-1.5 inline-block rounded-[var(--radius-sm)] bg-[var(--color-ink)] px-2 py-1 text-[length:var(--text-xs)] font-medium text-[var(--color-canvas)]">
          Book a consultation
        </span>
      </div>
    </div>
  )
}
