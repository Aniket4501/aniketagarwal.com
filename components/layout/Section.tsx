/**
 * Section rhythm: 64px mobile, 88px desktop. V1 ran 112/192, which is where
 * the emptiness came from — a page with five viewports and sixty words in it.
 */
export function Section({
  children,
  className = '',
  id,
  band = false,
  labelledBy,
}: {
  children: React.ReactNode
  className?: string
  id?: string
  /** Alternating wash, used to change gear between sections. */
  band?: boolean
  labelledBy?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`py-8 lg:py-11 ${band ? 'band border-y border-[var(--color-line)]' : ''} ${className}`}
    >
      {children}
    </section>
  )
}

/** A section's field name. Sans, tracked, small — never mono. */
export function Eyebrow({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} className="eyebrow">
      {children}
    </p>
  )
}

/** Eyebrow + heading + optional lead, the standard section opener. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  id,
  action,
}: {
  eyebrow: string
  title: string
  lead?: string
  id?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
      <div className="flex flex-col gap-1.5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          id={id}
          className="max-w-[22ch] text-[length:var(--text-xl)] tracking-[var(--track-heading)] sm:text-[length:var(--text-2xl)]"
        >
          {title}
        </h2>
        {lead ? (
          <p className="mt-1 max-w-[58ch] text-[length:var(--text-md)] leading-relaxed text-[var(--color-body)]">
            {lead}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
