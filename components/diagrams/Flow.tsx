import type { ReactNode } from 'react'

export type FlowStep = {
  label: string
  detail?: string
  /** Marks the step where the problem was, or the step that changed. */
  tone?: 'default' | 'problem' | 'accent'
  badge?: string
}

const TONE = {
  default: 'border-[var(--color-line)] bg-[var(--color-surface)]',
  problem: 'border-[var(--color-flag)]/30 bg-[var(--color-flag-soft)]',
  accent: 'border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)]',
}

/**
 * A horizontal product flow that stacks on small screens.
 *
 * Built from real text rather than an SVG so it stays legible at 320px, is
 * selectable and translatable, and never needs a pinch-to-zoom.
 */
export function Flow({ steps, className = '' }: { steps: FlowStep[]; className?: string }) {
  return (
    <ol className={`flex flex-col gap-1.5 sm:flex-row sm:items-stretch ${className}`}>
      {steps.map((s, i) => (
        <li key={s.label} className="flex flex-1 items-stretch gap-1.5 sm:flex-col sm:gap-0">
          <div
            className={`flex min-w-0 flex-1 flex-col gap-0.5 rounded-[var(--radius)] border p-2 ${TONE[s.tone ?? 'default']}`}
          >
            {s.badge ? (
              <span className="eyebrow text-[var(--color-muted)]">{s.badge}</span>
            ) : null}
            <span className="text-[length:var(--text-sm)] leading-snug font-semibold text-[var(--color-ink)]">
              {s.label}
            </span>
            {s.detail ? (
              <span className="text-[length:var(--text-xs)] leading-snug text-[var(--color-muted)]">
                {s.detail}
              </span>
            ) : null}
          </div>
          {i < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className="flex shrink-0 items-center justify-center text-[var(--color-line-strong)] sm:h-2 sm:w-full sm:rotate-90 sm:self-center"
            >
              <svg width="14" height="10" viewBox="0 0 14 10" className="fill-current sm:rotate-0">
                <path d="M0 4h9V0l5 5-5 5V6H0z" />
              </svg>
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  )
}

/**
 * Two flows stacked, before over after, so the change is read as a change
 * rather than as two pictures.
 */
export function BeforeAfterFlow({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: {
  before: FlowStep[]
  after: FlowStep[]
  beforeLabel?: string
  afterLabel?: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <p className="eyebrow">{beforeLabel}</p>
        <Flow steps={before} />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="eyebrow text-[var(--color-accent-ink)]">{afterLabel}</p>
        <Flow steps={after} />
      </div>
    </div>
  )
}

/**
 * A horizontal duration comparison drawn to scale. Used for the launch time,
 * where the ratio is the entire finding and a reader should see it before
 * reading either number.
 */
export function DurationBars({
  rows,
  max,
  unit = 's',
}: {
  rows: { label: string; value: number; display: string; tone?: 'problem' | 'accent' | 'default'; note?: string }[]
  max: number
  unit?: string
}) {
  const fill = {
    problem: 'bg-[var(--color-flag)]',
    accent: 'bg-[var(--color-accent)]',
    default: 'bg-[var(--color-line-strong)]',
  }
  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-x-2 gap-y-0.5 sm:grid-cols-[9rem_minmax(0,1fr)]">
          <span className="text-[length:var(--text-sm)] font-medium text-[var(--color-ink)]">
            {r.label}
          </span>
          <div className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className={`h-2.5 rounded-[3px] ${fill[r.tone ?? 'default']}`}
              style={{ width: `${Math.max((r.value / max) * 100, 2)}%` }}
            />
            <span className="shrink-0 text-[length:var(--text-sm)] font-semibold tabular-nums text-[var(--color-ink)]">
              {r.display}
            </span>
          </div>
          {r.note ? (
            <span className="col-start-2 text-[length:var(--text-xs)] text-[var(--color-muted)]">
              {r.note}
            </span>
          ) : null}
        </div>
      ))}
      <p className="text-[length:var(--text-xs)] text-[var(--color-muted)]">
        Drawn to scale in {unit === 's' ? 'seconds' : unit}.
      </p>
    </div>
  )
}

/** A labelled funnel, for drop-off stories. */
export function Funnel({
  steps,
  caption,
}: {
  steps: { label: string; width: number; value?: string; tone?: 'default' | 'problem' | 'accent' }[]
  caption?: string
}) {
  const fill = {
    default: 'bg-[var(--color-line-strong)]',
    problem: 'bg-[var(--color-flag)]',
    accent: 'bg-[var(--color-accent)]',
  }
  return (
    <div className="flex flex-col gap-1.5">
      {steps.map((s) => (
        <div key={s.label} className="flex items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-1.5">
            <span
              aria-hidden="true"
              className={`h-4 rounded-[3px] ${fill[s.tone ?? 'default']}`}
              style={{ width: `${s.width}%` }}
            />
            <span className="truncate text-[length:var(--text-sm)] text-[var(--color-body)]">
              {s.label}
            </span>
          </div>
          {s.value ? (
            <span className="shrink-0 text-[length:var(--text-sm)] font-semibold tabular-nums text-[var(--color-ink)]">
              {s.value}
            </span>
          ) : null}
        </div>
      ))}
      {caption ? (
        <p className="mt-1 text-[length:var(--text-xs)] text-[var(--color-muted)]">{caption}</p>
      ) : null}
    </div>
  )
}

/** A closed loop, for habit mechanics. */
export function LoopDiagram({ steps, centre }: { steps: string[]; centre: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="grid w-full max-w-[34rem] grid-cols-2 gap-1.5">
        {steps.map((s, i) => (
          <div
            key={s}
            className="flex items-start gap-1.5 rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-surface)] p-2"
          >
            <span
              aria-hidden="true"
              className="grid h-2.5 w-2.5 shrink-0 place-items-center rounded-full bg-[var(--color-accent-soft)] text-[length:var(--text-xs)] font-semibold text-[var(--color-accent-ink)]"
            >
              {i + 1}
            </span>
            <span className="text-[length:var(--text-sm)] leading-snug text-[var(--color-body)]">
              {s}
            </span>
          </div>
        ))}
      </div>
      <p className="flex items-center gap-1.5 rounded-[var(--radius)] bg-[var(--color-accent-soft)] px-2 py-1 text-[length:var(--text-sm)] font-medium text-[var(--color-accent-ink)]">
        <span aria-hidden="true">↻</span>
        {centre}
      </p>
    </div>
  )
}
