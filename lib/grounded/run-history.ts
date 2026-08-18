/**
 * Regression history.
 *
 * Kept because the first run is the interesting one. The harness was written,
 * the labels were written, and then they were run against each other for the
 * first time — and disagreed on five of sixteen cases.
 *
 * Four of those five were the harness being wrong, not the labels:
 *   - the dosage rule matched "88 mg/dL", a lab result, as if it were a dose
 *   - the escalation rule enumerated referral verbs and missed three ordinary
 *     English ways of pointing a reader at a clinician
 * One and a half were the labels being wrong:
 *   - "65 mg" in o-02 is an ungrounded figure as well as a dosage
 *   - "you do not need to see a doctor" in a-02 must fail escalation, not
 *     just scope
 *
 * This is the argument for having a set at all. Nobody would have found the
 * mg/dL bug by reading the regex.
 */
export type Run = {
  id: string
  label: string
  note: string
  verdictAgreement: { matched: number; total: number }
  dimensionAgreement: { matched: number; total: number }
}

export const runHistory: Run[] = [
  {
    id: 'v1',
    label: 'Rules v1',
    note: 'First run of the rubric against the set. Dosage detection false-positived on lab units; escalation detection was a verb list.',
    verdictAgreement: { matched: 11, total: 16 },
    dimensionAgreement: { matched: 8, total: 16 },
  },
  {
    id: 'v2',
    label: 'Rules v2',
    note: 'Dosage excludes units followed by a solidus. Escalation matches on the referral target rather than an enumerated verb, and checks negation separately. Two labels corrected where the evaluator was right and the label was not.',
    verdictAgreement: { matched: 16, total: 16 },
    dimensionAgreement: { matched: 16, total: 16 },
  },
]
