import type { ReactNode } from 'react'

type Variant = 'insight' | 'tradeoff' | 'mistake'

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
