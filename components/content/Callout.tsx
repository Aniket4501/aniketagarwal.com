import type { ReactNode } from 'react'

type Variant = 'insight' | 'tradeoff' | 'mistake' | 'gap'

const STYLE: Record<Variant, { border: string; ground: string; label: string; color: string }> = {
  insight: {
    border: 'border-l-[var(--color-signal)]',
    ground: 'bg-[var(--color-paper-raised)]',
    label: 'text-[var(--color-signal)]',
    color: '',
  },
  tradeoff: {
    border: 'border-l-[var(--color-rule-strong)]',
    ground: 'bg-[var(--color-paper-raised)]',
    label: 'text-[var(--color-muted)]',
    color: '',
  },
  mistake: {
    border: 'border-l-[var(--color-flag)]',
    ground: 'bg-[var(--color-flag-tint)]',
    label: 'text-[var(--color-flag)]',
    color: '',
  },
  gap: {
    border: 'border-l-[var(--color-flag)]',
    ground: 'bg-[var(--color-flag-tint)]',
    label: 'text-[var(--color-flag)]',
    color: '',
  },
}

/**
 * `mistake` and `gap` share the correction red deliberately. A decision that
 * went wrong and a claim that cannot yet be substantiated are the same kind of
 * honesty, and giving them one colour means a reader scanning a long page can
 * find either without reading a word.
 */
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
    <aside
      className={`my-8 border border-[var(--color-rule)] border-l-2 ${s.border} ${s.ground} px-5 py-4 sm:px-6 sm:py-5`}
    >
      <p
        className={`mb-2 font-[family-name:var(--font-mono)] text-[var(--text-xs)] font-medium tracking-[0.12em] uppercase ${s.label}`}
      >
        {label}
      </p>
      <div className="[&>*+*]:mt-3 [&>p]:text-[var(--text-base)] [&>p]:leading-relaxed">
        {children}
      </div>
    </aside>
  )
}
