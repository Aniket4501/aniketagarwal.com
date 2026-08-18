import { timeline } from '@/lib/site'

/**
 * One line per role, with the REAL TITLE on every row.
 *
 * Four of the five were internships. Rendering them all as "Product" — which
 * the brief's example markup does — is title inflation in the single most
 * recruiter-scanned block on the page, and it breaks the moment anyone opens
 * LinkedIn. Where the resume and LinkedIn disagree on a title, the row shows
 * whichever claims less.
 */
export function Timeline({ showEducation = true }: { showEducation?: boolean }) {
  return (
    <ul className="border-t border-[var(--color-rule)]">
      {timeline.map((row) => (
        <li
          key={`${row.org}-${row.period}`}
          className="grid grid-cols-1 gap-0.5 border-b border-[var(--color-rule)] py-2 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-3"
        >
          <span className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] tabular-nums text-[var(--color-muted)]">
            {row.period}
          </span>
          <span className="flex flex-wrap items-baseline gap-x-1 gap-y-0.25 text-[var(--text-sm)] leading-relaxed">
            <span className="font-medium">{row.role}</span>
            <span aria-hidden="true" className="text-[var(--color-muted)]">
              ·
            </span>
            <span>{row.org}</span>
            <span aria-hidden="true" className="text-[var(--color-muted)]">
              ·
            </span>
            <span className="text-[var(--color-muted)]">{row.place}</span>
            {'note' in row && row.note ? (
              <span className="w-full text-[var(--color-muted)] sm:w-auto">{row.note}</span>
            ) : null}
          </span>
        </li>
      ))}
      {showEducation ? (
        <li className="grid grid-cols-1 gap-0.5 border-b border-[var(--color-rule)] py-2 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-3">
          <span className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] tabular-nums text-[var(--color-muted)]">
            2019 — 2024
          </span>
          <span className="text-[var(--text-sm)]">Dual degree, IIT Kharagpur</span>
        </li>
      ) : null}
    </ul>
  )
}
