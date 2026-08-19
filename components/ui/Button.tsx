import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'default' | 'large'

const BASE =
  'inline-flex items-center justify-center gap-1.5 rounded-[var(--radius)] font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-ui)] whitespace-nowrap'

const VARIANT: Record<Variant, string> = {
  primary:
    'bg-[var(--color-ink)] text-[var(--color-canvas)] hover:bg-[var(--color-accent)]',
  secondary:
    'border border-[var(--color-line-strong)] text-[var(--color-ink)] hover:border-[var(--color-ink)] hover:bg-[var(--color-surface)]',
  ghost: 'text-[var(--color-ink)] hover:text-[var(--color-accent)]',
}

const SIZE: Record<Size, string> = {
  default: 'px-2.5 py-1.5 text-[length:var(--text-sm)]',
  large: 'px-3.5 py-2 text-[length:var(--text-base)]',
}

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'default',
  external = false,
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: Variant
  size?: Size
  external?: boolean
  className?: string
}) {
  const cls = `${BASE} ${VARIANT[variant]} ${SIZE[size]} ${className}`
  if (external || href.startsWith('http') || href.startsWith('mailto:') || href === '/resume') {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}

/** A small category chip. Used on case cards and lab status. */
export function Tag({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'flag'
}) {
  const tones = {
    neutral: 'border-[var(--color-line)] bg-[var(--color-canvas)] text-[var(--color-muted)]',
    accent: 'border-[var(--color-accent)]/25 bg-[var(--color-accent-soft)] text-[var(--color-accent-ink)]',
    flag: 'border-[var(--color-flag)]/25 bg-[var(--color-flag-soft)] text-[var(--color-flag)]',
  }
  return (
    <span
      className={`eyebrow inline-flex items-center rounded-[var(--radius-sm)] border px-1.5 py-0.5 ${tones[tone]}`}
    >
      {children}
    </span>
  )
}
