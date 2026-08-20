/**
 * What the wait actually looked like, in two frames.
 *
 * Step Syncing is the one case study with no product imagery, and for a while
 * that was the right call: a splash screen's content is not the argument, its
 * duration is, and duration cannot be drawn in a still. What can be drawn is
 * the thing the user was trying to reach and the screen standing in front of
 * it — which is why this is two frames rather than one, with the elapsed time
 * as the only figure that differs.
 *
 * The device shell earns its weight here. A cold start is a property of the
 * phone, not of the design, and the argument is about a phone.
 *
 * No device tier is named. The record does not state one.
 */
function Phone({
  label,
  elapsed,
  tone,
  children,
}: {
  label: string
  elapsed: string
  tone: 'before' | 'after'
  children: React.ReactNode
}) {
  return (
    <figure className="flex min-w-0 flex-col gap-2">
      <figcaption className="flex items-baseline justify-between gap-2">
        <span className="eyebrow">{label}</span>
        <span
          className={`text-[length:var(--text-base)] font-semibold tabular-nums ${
            // --color-line-strong is a 3.06:1 border colour. It is legal on a
            // hairline and illegal on a word; the a11y gate caught this one.
            tone === 'after' ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'
          }`}
        >
          {elapsed}
        </span>
      </figcaption>
      <div className="mx-auto w-full max-w-[13rem] rounded-[var(--radius-lg)] border-2 border-[var(--color-line-strong)] bg-[var(--color-surface)] p-1">
        <div className="flex aspect-[9/16] flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--color-line)]">
          {children}
        </div>
      </div>
    </figure>
  )
}

export function LaunchFrames() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5">
      <Phone label="Before" elapsed="15s" tone="before">
        {/* The splash. Nothing to read, nothing to do, and it is the screen
            standing between a person and the number they opened the app for. */}
        <div className="flex flex-1 flex-col items-center justify-center gap-1.5 bg-[var(--color-wash)]">
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded-[var(--radius)] bg-[var(--color-muted)] text-[10px] font-bold text-[var(--color-canvas)]"
          >
            AA
          </span>
          <span className="text-[length:var(--text-2xs)] text-[var(--color-muted)]">Loading…</span>
        </div>
      </Phone>

      <Phone label="After" elapsed="under 2s" tone="after">
        <div className="flex flex-1 flex-col gap-1.5 p-1.5">
          <span className="text-[length:var(--text-2xs)] text-[var(--color-muted)]">Today</span>
          <span className="text-[length:var(--text-xl)] leading-none font-semibold tabular-nums">
            7,412
          </span>
          <span className="text-[length:var(--text-2xs)] text-[var(--color-muted)]">steps</span>
          <span className="mt-0.5 h-1 w-full rounded-full bg-[var(--color-line)]">
            <span
              aria-hidden="true"
              className="block h-1 w-3/4 rounded-full bg-[var(--color-accent)]"
            />
          </span>
          <div className="mt-auto flex flex-col gap-0.5">
            <span className="text-[length:var(--text-2xs)] text-[var(--color-muted)]">
              Synced just now
            </span>
          </div>
        </div>
      </Phone>
    </div>
  )
}
