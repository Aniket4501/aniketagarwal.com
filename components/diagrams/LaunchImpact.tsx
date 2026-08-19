import { BeforeAfterFlow, DurationBars } from './Flow'

/**
 * Case study 01 — Step Syncing.
 *
 * The journey is the whole story: the user's path to their step count ran
 * through a fifteen-second wait, and a wait that long is indistinguishable
 * from a broken app. Both flows and both durations come from the record —
 * 15s launch, a 2s benchmark, shipped under 2s.
 */
export function LaunchJourney() {
  return (
    <BeforeAfterFlow
      before={[
        { label: 'Tap the icon', detail: 'From the home screen' },
        { label: 'Splash screen', detail: 'Fifteen seconds', tone: 'problem', badge: 'The wall' },
        { label: 'Steps not synced', detail: 'Many never got here', tone: 'problem' },
      ]}
      after={[
        { label: 'Tap the icon', detail: 'From the home screen' },
        { label: 'App open', detail: 'Under two seconds', tone: 'accent', badge: 'Shipped' },
        { label: 'Steps synced', detail: 'Sync completion up 35%', tone: 'accent' },
      ]}
    />
  )
}

export function LaunchDurations() {
  return (
    <DurationBars
      max={15}
      rows={[
        { label: 'Before', value: 15, display: '15s', tone: 'problem' },
        { label: 'Benchmark', value: 2, display: '2s', note: 'What we measured against' },
        { label: 'Shipped', value: 2, display: 'under 2s', tone: 'accent' },
      ]}
    />
  )
}

/** 25MB and 6MB are both in the record; 76% is exact, not rounded. */
export function BundleImpact() {
  return (
    <div className="flex flex-wrap items-end gap-4 sm:gap-6">
      <div className="flex flex-col gap-1.5">
        <span className="eyebrow">App bundle, before</span>
        <div className="flex items-end gap-1.5">
          <span
            aria-hidden="true"
            className="rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-line-strong)]/25"
            style={{ width: 104, height: 104 }}
          />
          <span className="text-[length:var(--text-lg)] font-semibold tabular-nums">25MB</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="eyebrow text-[var(--color-accent-ink)]">After</span>
        <div className="flex items-end gap-1.5">
          <span
            aria-hidden="true"
            className="rounded-[var(--radius-sm)] border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/20"
            style={{ width: 51, height: 51 }}
          />
          <span className="text-[length:var(--text-lg)] font-semibold tabular-nums text-[var(--color-accent)]">
            6MB
          </span>
        </div>
      </div>
    </div>
  )
}
