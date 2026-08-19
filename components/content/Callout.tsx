import type { ReactNode } from 'react'

type Variant = 'insight' | 'tradeoff' | 'mistake' | 'caveat'

const STYLE: Record<Variant, { wrap: string; label: string }> = {
  insight: {
    wrap: 'border-[var(--color-accent)]/25 bg-[var(--color-accent-soft)]',
    label: 'text-[var(--color-accent-ink)]',
  },
  tradeoff: {
    wrap: 'border-[var(--color-line)] bg-[var(--color-surface)]',
    label: 'text-[var(--color-muted)]',
  },
  mistake: {
    wrap: 'border-[var(--color-flag)]/25 bg-[var(--color-flag-soft)]',
    label: 'text-[var(--color-flag)]',
  },
  /**
   * Scope disclaimer — "this is not shipped work", "this was not measured".
   * Shares the flag treatment with `mistake` because both are things a reader
   * must not skim past, but it is named separately: an unmeasured guardrail is
   * not an error, and a variant whose name lies about its content is how the
   * wrong one gets picked next time.
   */
  caveat: {
    wrap: 'border-[var(--color-flag)]/25 bg-[var(--color-flag-soft)]',
    label: 'text-[var(--color-flag)]',
  },
}

export function Callout({
  variant = 'insight',
  label,
  children,
}: {
  variant?: Variant
  label: string
  children: ReactNode
}) {
  const s = STYLE[variant]
  return (
    <aside className={`my-4 rounded-[var(--radius)] border p-3 ${s.wrap}`}>
      <p className={`eyebrow mb-1.5 ${s.label}`}>{label}</p>
      <div className="text-[length:var(--text-base)] leading-relaxed text-[var(--color-body)] [&>*+*]:mt-2">
        {children}
      </div>
    </aside>
  )
}
