/**
 * Bundle size, drawn as area.
 *
 * 25MB and 6MB are both in the record. What the 25MB was MADE OF is not, which
 * is why this is two squares rather than the treemap the brief asked for — a
 * treemap is almost entirely composition, and composition would have been
 * invented.
 *
 * Area is proportional to megabytes, so the side lengths go as the square
 * root: sqrt(6/25) = 0.49. The eye reads area, so this is the honest encoding.
 */
export function BundleScale() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-5">
      <figure className="flex flex-col gap-1.5">
        <div
          className="border border-[var(--color-rule-strong)] bg-[var(--color-ink)]/[0.08]"
          style={{ width: 160, height: 160 }}
          aria-hidden="true"
        />
        <figcaption className="flex flex-col gap-0.25">
          <span className="font-[family-name:var(--font-mono)] text-[var(--text-lg)] tabular-nums">
            25MB
          </span>
          <span className="eyebrow">Before</span>
        </figcaption>
      </figure>

      <figure className="flex flex-col gap-1.5">
        <div
          className="border border-[var(--color-signal)] bg-[var(--color-signal)]/15"
          style={{ width: 78, height: 78 }}
          aria-hidden="true"
        />
        <figcaption className="flex flex-col gap-0.25">
          <span className="font-[family-name:var(--font-mono)] text-[var(--text-lg)] tabular-nums text-[var(--color-signal)]">
            6MB
          </span>
          <span className="eyebrow">After</span>
        </figcaption>
      </figure>

      <p className="max-w-[28ch] font-[family-name:var(--font-mono)] text-[var(--text-xs)] leading-relaxed text-[var(--color-muted)] sm:self-end sm:pb-0.5">
        Area is proportional to size. A 76% reduction — the only figure on this site that computes
        exactly from two stated values.
      </p>
    </div>
  )
}
