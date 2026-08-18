/**
 * Section rhythm: 56px mobile, 96px desktop. Unvaried.
 * Irregular vertical rhythm is the most common tell of an amateur build, so
 * the spacing lives here and nowhere else.
 */
export function Section({
  children,
  className = '',
  id,
  as: Tag = 'section',
  labelledBy,
}: {
  children: React.ReactNode
  className?: string
  id?: string
  as?: 'section' | 'div' | 'footer' | 'header'
  labelledBy?: string
}) {
  return (
    <Tag id={id} aria-labelledby={labelledBy} className={`py-14 lg:py-24 ${className}`}>
      {children}
    </Tag>
  )
}

/** An uppercase mono eyebrow. Used once per section, never decoratively. */
export function Eyebrow({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p
      id={id}
      className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] font-medium tracking-[0.14em] text-[var(--color-muted)] uppercase"
    >
      {children}
    </p>
  )
}
