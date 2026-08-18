import type { ReactNode } from 'react'

type Variant = 'insight' | 'tradeoff' | 'mistake' | 'gap'

const STYLE: Record<Variant, { rule: string; ground: string; label: string }> = {
  insight: {
    rule: 'border-t-[var(--color-signal)]',
    ground: '',
    label: 'text-[var(--color-signal)]',
  },
  tradeoff: {
    rule: 'border-t-[var(--color-rule-strong)]',
    ground: '',
    label: 'text-[var(--color-muted)]',
  },
  mistake: {
    rule: 'border-t-[var(--color-flag)]',
    ground: 'bg-[var(--color-flag-tint)] px-3',
    label: 'text-[var(--color-flag)]',
  },
  gap: {
    rule: 'border-t-[var(--color-flag)]',
    ground: 'bg-[var(--color-flag-tint)] px-3',
    label: 'text-[var(--color-flag)]',
  },
}

/**
 * A passage under a rule, not a box.
 *
 * The obvious construction — a card with a coloured left border — is one of the
 * more reliable signatures of generated design, so the accent runs across the
 * top instead. Scannability is unchanged: a reader still finds the amber block
 * while scrolling, which is the whole job.
 *
 * `mistake` and `gap` share the correction red on purpose. A decision that went
 * wrong and a claim that cannot yet be substantiated are the same kind of
 * honesty.
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
    <div className={`my-4 border-t py-3 ${s.rule} ${s.ground}`}>
      <p className={`mb-1 eyebrow ${s.label}`}>{label}</p>
      <div className="[&>*+*]:mt-1.5 [&>p]:text-[var(--text-base)] [&>p]:leading-relaxed">
        {children}
      </div>
    </div>
  )
}
