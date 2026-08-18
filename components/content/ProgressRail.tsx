import type { ReactNode } from 'react'

export type RailSection = { id: string; label: string }

/**
 * Section navigation for a long read, plus a scroll-position indicator.
 *
 * Zero client JavaScript: the indicator is a CSS scroll-driven animation and
 * the index is a list of anchors. The brief specifies this as a client
 * component; it does not need to be, and a reading aid that costs bundle on
 * the page arguing for small bundles would be an odd thing to ship.
 */
export function ReadProgress() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent"
    >
      <div className="read-progress h-full w-full bg-[var(--color-signal)]" />
    </div>
  )
}

export function SectionIndex({ sections }: { sections: RailSection[] }) {
  if (sections.length === 0) return null
  return (
    <nav aria-label="Sections in this case study" className="flex flex-col gap-3">
      <p className="eyebrow">Sections</p>
      <ol className="flex flex-col gap-2">
        {sections.map((s, i) => (
          <li key={s.id} className="flex gap-2 text-[var(--text-sm)] leading-snug">
            <span className="mt-[0.15em] shrink-0 font-[family-name:var(--font-mono)] text-[var(--text-xs)] tabular-nums text-[var(--color-muted)]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <a
              href={`#${s.id}`}
              className="text-[var(--color-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-signal)]"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** The right rail on desktop; inline blocks between paragraphs on mobile. */
export function Rail({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-8 lg:sticky lg:top-24">{children}</div>
}
