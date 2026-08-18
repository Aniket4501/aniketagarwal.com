import type { ReactNode } from 'react'

/**
 * Wraps every diagram on the site.
 *
 * `reconstruction` is not decoration. Where a chart is redrawn from summarised
 * or remembered data rather than exported directly, saying so costs nothing
 * and buys credibility — and where the underlying values do not exist at all,
 * the diagram is not drawn.
 *
 * `alt` describes the FINDING, not the shape. "Cold start falling from fifteen
 * seconds to under two" — never "latency chart".
 */
export function Figure({
  children,
  caption,
  alt,
  reconstruction = false,
  scroll = false,
}: {
  children: ReactNode
  caption: string
  alt: string
  reconstruction?: boolean
  scroll?: boolean
}) {
  return (
    <figure className="my-10">
      <div
        role="img"
        aria-label={alt}
        className={`border border-[var(--color-rule)] bg-[var(--color-paper-raised)] p-4 sm:p-6 ${scroll ? 'scroll-x' : ''}`}
      >
        {children}
      </div>
      <figcaption className="mt-3 flex flex-col gap-1 text-[var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
        <span>{caption}</span>
        {reconstruction ? (
          <span className="font-[family-name:var(--font-mono)] text-[var(--text-xs)]">
            Reconstruction — shape and direction accurate, absolute values withheld.
          </span>
        ) : null}
      </figcaption>
    </figure>
  )
}
