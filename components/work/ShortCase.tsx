import { Mdx } from '@/lib/content/mdx'
import type { ShortCaseFrontmatter } from '@/lib/content/schema'

/**
 * ~300 words, and the brevity is the signal. These lead with the trade-off
 * rather than the result: the cut is the judgment, the number is just what
 * happened afterwards.
 */
export function ShortCase({ meta, body }: { meta: ShortCaseFrontmatter; body: string }) {
  return (
    <article className="card flex flex-col gap-3 p-3 sm:p-4">
      <div className="flex flex-col gap-1">
        <p className="eyebrow">
          {meta.company} · {meta.role} · {meta.timeline}
        </p>
        <h3 className="text-[length:var(--text-lg)] leading-snug font-semibold tracking-[var(--track-heading)]">
          {meta.title}
        </h3>
      </div>

      <p className="text-[length:var(--text-sm)] leading-relaxed text-[var(--color-body)]">
        {meta.problem}
      </p>

      <div className="rounded-[var(--radius)] bg-[var(--color-canvas)] p-2.5">
        <p className="eyebrow mb-1">The trade-off</p>
        <p className="text-[length:var(--text-sm)] leading-relaxed text-[var(--color-body)]">
          {meta.tradeoff}
        </p>
      </div>

      <div className="short-body text-[length:var(--text-sm)] leading-relaxed text-[var(--color-body)] [&>p+p]:mt-2">
        <Mdx source={body} />
      </div>

      {meta.figures.length > 0 ? (
        <dl className="grid grid-cols-2 gap-3 border-t border-[var(--color-line)] pt-3">
          {meta.figures.map((f) => (
            <div key={f.label} className="flex flex-col gap-0.5">
              <dt className="text-[length:var(--text-xl)] font-semibold tabular-nums">{f.value}</dt>
              <dd className="text-[length:var(--text-xs)] leading-snug text-[var(--color-muted)]">
                {f.label}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="flex flex-col gap-1 border-t border-[var(--color-line)] pt-3">
        <p className="eyebrow">I did not own</p>
        <ul className="flex flex-col gap-1 text-[length:var(--text-xs)] leading-relaxed text-[var(--color-muted)]">
          {meta.notOwned.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}
