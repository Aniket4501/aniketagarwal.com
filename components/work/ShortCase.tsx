import { Mdx } from '@/lib/content/mdx'
import { MetricDelta } from '@/components/content/MetricDelta'
import { WithNeeds } from '@/components/ui/Needs'
import type { ShortCaseFrontmatter } from '@/lib/content/schema'

/**
 * ~300 words, and the brevity is itself the signal: being able to make a point
 * in 300 words is a product skill. These lead with the TRADE-OFF, not the
 * outcome — the cut is the judgment, the result is just the result.
 */
export function ShortCase({
  meta,
  body,
}: {
  meta: ShortCaseFrontmatter
  body: string
}) {
  return (
    <article className="flex flex-col gap-2.5 border-t border-[var(--color-rule)] pt-4">
      <div className="flex flex-col gap-1">
        <p className="eyebrow">
          {meta.company} · {meta.role} · {meta.timeline}
        </p>
        <h3 className="max-w-[26ch] text-[var(--text-xl)] leading-snug font-semibold tracking-[var(--track-h2)]">
          {meta.title}
        </h3>
      </div>

      <p className="max-w-[56ch] border-l-2 border-[var(--color-rule-strong)] pl-2 text-[var(--text-base)] leading-relaxed">
        <span className="eyebrow mr-1">The trade-off</span>
        <WithNeeds text={meta.tradeoff} />
      </p>

      <div className="prose-short max-w-[56ch] text-[var(--text-base)] leading-relaxed [&>p+p]:mt-2">
        <Mdx source={body} />
      </div>

      {meta.metrics.length > 0 ? (
        <div className="flex flex-col gap-3 pt-1 sm:grid sm:grid-cols-2">
          {meta.metrics.map((m) => (
            <MetricDelta key={m.label} metric={m} size="compact" />
          ))}
        </div>
      ) : null}

      <div className="flex flex-col gap-1 pt-0.5">
        <p className="eyebrow">I did not own</p>
        <ul className="flex flex-col gap-0.5 text-[var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
          {meta.notOwned.map((n, i) => (
            <li key={i}>
              <WithNeeds text={n} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
