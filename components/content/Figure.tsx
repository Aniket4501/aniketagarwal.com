import type { ReactNode } from 'react'

/**
 * Wraps every diagram.
 *
 * CONTRACT: this wrapper carries role="img" and aria-label, so every <svg>
 * inside must set aria-hidden="true" and focusable="false" — otherwise the
 * SVG's own text nodes are announced after the alt text.
 *
 * `alt` describes the FINDING, not the shape. `label` states what the diagram
 * is when it is a reconstruction rather than an export, which costs nothing and
 * is the difference between a diagram and a claim.
 */
export function Figure({
  children,
  caption,
  alt,
  label,
  tone = 'surface',
}: {
  children: ReactNode
  caption?: string
  alt: string
  label?: string
  tone?: 'surface' | 'canvas' | 'bare'
}) {
  const wrap =
    tone === 'bare'
      ? ''
      : `card p-2.5 sm:p-3 ${tone === 'canvas' ? 'bg-[var(--color-canvas)]' : ''}`

  return (
    <figure className="my-5">
      <div role="img" aria-label={alt} className={wrap}>
        {children}
      </div>
      {caption || label ? (
        <figcaption className="mt-2 flex flex-col gap-0.5">
          {caption ? (
            <span className="text-[length:var(--text-sm)] leading-relaxed text-[var(--color-body)]">
              {caption}
            </span>
          ) : null}
          {label ? (
            <span className="text-[length:var(--text-xs)] text-[var(--color-muted)]">{label}</span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  )
}
