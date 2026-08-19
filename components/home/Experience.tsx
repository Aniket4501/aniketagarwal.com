import { experience, education } from '@/lib/site'

/**
 * Trajectory, not a reproduction of the resume.
 *
 * The current role is open by default with five points; everything earlier is
 * collapsed to a summary line and expands on demand. That ordering is the
 * whole purpose of the section — a reader should see the shape of the career
 * before they see any of its detail.
 */
export function Experience() {
  return (
    <ol className="flex flex-col">
      {experience.map((role, i) => (
        <li
          key={role.company}
          className={`border-t border-[var(--color-line)] py-4 ${i === 0 ? 'border-t-0 pt-0' : ''}`}
        >
          <div className="grid gap-2 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <h3 className="text-[length:var(--text-lg)] font-semibold tracking-[var(--track-heading)]">
                  {role.company}
                </h3>
                {role.current ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-accent-soft)] px-1.5 py-0.5 text-[length:var(--text-xs)] font-medium text-[var(--color-accent-ink)]">
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
                    Current
                  </span>
                ) : null}
              </div>
              <p className="text-[length:var(--text-sm)] font-medium text-[var(--color-ink)]">
                {role.title}
              </p>
              <p className="text-[length:var(--text-xs)] text-[var(--color-muted)] tabular-nums">
                {role.period} · {role.place}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="max-w-[62ch] text-[length:var(--text-base)] leading-relaxed text-[var(--color-body)]">
                {role.summary}
              </p>

              {role.current ? (
                <Points points={role.points} />
              ) : (
                <details className="group">
                  <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-[length:var(--text-sm)] font-medium text-[var(--color-accent)] [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">
                      What I did <span aria-hidden="true">↓</span>
                    </span>
                    <span className="hidden group-open:inline">
                      Hide <span aria-hidden="true">↑</span>
                    </span>
                  </summary>
                  <div className="mt-2">
                    <Points points={role.points} />
                  </div>
                </details>
              )}
            </div>
          </div>
        </li>
      ))}

      <li className="border-t border-[var(--color-line)] py-4">
        <div className="grid gap-2 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-[length:var(--text-lg)] font-semibold tracking-[var(--track-heading)]">
              {education.school}
            </h3>
            <p className="text-[length:var(--text-xs)] text-[var(--color-muted)] tabular-nums">
              {education.period}
            </p>
          </div>
          <p className="text-[length:var(--text-base)] text-[var(--color-body)]">
            {education.degree}
          </p>
        </div>
      </li>
    </ol>
  )
}

function Points({ points }: { points: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {points.map((p, i) => (
        <li key={i} className="flex max-w-[64ch] gap-2">
          <span
            aria-hidden="true"
            className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]"
          />
          <span className="text-[length:var(--text-sm)] leading-relaxed text-[var(--color-body)]">
            {p}
          </span>
        </li>
      ))}
    </ul>
  )
}
