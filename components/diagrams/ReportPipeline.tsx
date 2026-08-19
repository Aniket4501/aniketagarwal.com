import { Flow, Funnel } from './Flow'

/**
 * Case study 03 — AI Smart Health Report.
 *
 * The PRODUCT flow — what a person experiences — not an internal architecture.
 * The distinction matters: the pipeline below is the journey Aniket designed
 * (requirements, UX flow, personalisation logic, cross-sell placement), which
 * is what the record supports. It is not a claim about which service calls
 * which.
 */
export function ReportFlow() {
  return (
    <Flow
      steps={[
        {
          badge: 'Input',
          label: 'Check-up results',
          detail: 'Clinical values a person cannot interpret on their own',
        },
        {
          badge: 'Generate',
          label: 'Plain-language interpretation',
          detail: 'Personalised to the individual reading it',
          tone: 'accent',
        },
        {
          badge: 'Act',
          label: 'A next step worth taking',
          detail: 'One prompted action, not a list of twelve',
          tone: 'accent',
        },
        {
          badge: 'Outcome',
          label: 'Evidence the employer can point at',
          detail: 'The artifact that makes the programme legible at renewal',
        },
      ]}
    />
  )
}

/**
 * Who pays. Three parties, three different tests — the structure most consumer
 * PMs never have to hold, and the reason this case study exists.
 */
export function ThreeParties() {
  const parties = [
    {
      role: 'The beneficiary',
      test: 'Can I understand my own result, and is there one thing worth doing about it?',
      tone: 'accent' as const,
    },
    {
      role: 'The employer',
      test: 'Did the programme I bought produce something my people actually valued?',
      tone: 'default' as const,
    },
    {
      role: 'The approver',
      test: 'Does this create a liability I have to sign my name to?',
      tone: 'default' as const,
    },
  ]
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {parties.map((p) => (
        <div
          key={p.role}
          className={`card flex flex-col gap-1.5 p-2.5 ${
            p.tone === 'accent' ? 'border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)]' : ''
          }`}
        >
          <p className="text-[length:var(--text-base)] font-semibold">{p.role}</p>
          <p className="text-[length:var(--text-sm)] leading-snug text-[var(--color-body)]">
            {p.test}
          </p>
        </div>
      ))}
    </div>
  )
}

/** The KYC wall, for the Infinyte short case. */
export function KycFunnel() {
  return (
    <Funnel
      caption="Reconstructed shape. The five-step verification wall sat before the account existed, so everyone who abandoned it abandoned the product."
      steps={[
        { label: 'Started signup', width: 100 },
        { label: 'Reached verification', width: 74 },
        { label: 'Completed five steps', width: 26, tone: 'problem', value: 'The wall' },
        { label: 'After deferring verification', width: 52, tone: 'accent', value: '2× completion' },
      ]}
    />
  )
}
