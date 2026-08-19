import Link from 'next/link'
import type { ReactNode } from 'react'
import { Tag } from '@/components/ui/Button'
import type { CaseStudyFrontmatter } from '@/lib/content/schema'

/**
 * A case study as a product card, not a paragraph.
 *
 * V1 rendered these as a left column of text and a right column holding a
 * single abstract bar chart, using about 35% of the horizontal band. Here the
 * visual occupies roughly half the card and the text is four short blocks —
 * problem, change, outcome, metric — so the card is scannable in about five
 * seconds and complete on its own.
 */
export function CaseCard({
  meta,
  visual,
  index,
  reversed = false,
  level = 3,
}: {
  meta: CaseStudyFrontmatter
  visual: ReactNode
  index: number
  /** Alternates the visual side on desktop so three cards do not march. */
  reversed?: boolean
  /** h3 under a section heading, h2 directly under a page h1. */
  level?: 2 | 3
}) {
  const Heading = level === 2 ? ('h2' as const) : ('h3' as const)
  return (
    <article className="card card-interactive group relative overflow-hidden">
      <div
        className={`grid lg:grid-cols-2 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}
      >
        <div className="flex flex-col gap-2 p-2.5 sm:gap-2.5 sm:p-4">
          <div className="flex items-center gap-1.5">
            <span className="text-[length:var(--text-xs)] font-semibold tabular-nums text-[var(--color-muted)]">
              {String(index).padStart(2, '0')}
            </span>
            <Tag>{meta.category}</Tag>
          </div>

          <Heading className="text-[length:var(--text-xl)] leading-tight font-semibold tracking-[var(--track-heading)] sm:text-[length:var(--text-2xl)]">
            <Link href={`/work/${meta.slug}`} className="after:absolute after:inset-0">
              {meta.title}
            </Link>
          </Heading>

          <p className="max-w-[46ch] text-[length:var(--text-md)] leading-snug text-[var(--color-body)]">
            {meta.outcome}
          </p>

          <dl className="mt-0.5 flex flex-col gap-1.5 border-t border-[var(--color-line)] pt-2 sm:mt-1 sm:gap-2 sm:pt-2.5">
            <div className="flex flex-col gap-0.5">
              <dt className="eyebrow">Problem</dt>
              <dd className="max-w-[48ch] text-[length:var(--text-sm)] leading-relaxed text-[var(--color-body)]">
                {meta.problem}
              </dd>
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="eyebrow">What I changed</dt>
              <dd className="max-w-[48ch] text-[length:var(--text-sm)] leading-relaxed text-[var(--color-body)]">
                {meta.change}
              </dd>
            </div>
          </dl>

          <p className="mt-auto pt-2 text-[length:var(--text-sm)] font-medium text-[var(--color-accent)]">
            Read the case study{' '}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5"
            >
              →
            </span>
          </p>
        </div>

        <div className="flex items-center border-t border-[var(--color-line)] bg-[var(--color-canvas)] p-2.5 sm:p-4 lg:border-t-0 lg:border-l">
          <div className="w-full">{visual}</div>
        </div>
      </div>
    </article>
  )
}

/** The compact outcome block that sits inside a card's visual half. */
export function CardMetric({
  headline,
  supporting,
}: {
  headline: { value: string; label: string; note?: string }
  supporting?: { value: string; label: string }[]
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <p className="text-[length:var(--text-metric)] leading-none font-semibold tracking-[var(--track-display)] text-[var(--color-ink)] tabular-nums">
          {headline.value}
        </p>
        <p className="text-[length:var(--text-sm)] font-medium text-[var(--color-ink)]">
          {headline.label}
        </p>
        {headline.note ? (
          <p className="max-w-[32ch] text-[length:var(--text-xs)] leading-snug text-[var(--color-muted)]">
            {headline.note}
          </p>
        ) : null}
      </div>
      {supporting?.length ? (
        <dl className="grid grid-cols-2 gap-2 border-t border-[var(--color-line)] pt-2.5">
          {supporting.map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <dt className="text-[length:var(--text-lg)] font-semibold tabular-nums text-[var(--color-ink)]">
                {s.value}
              </dt>
              <dd className="text-[length:var(--text-xs)] leading-snug text-[var(--color-muted)]">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  )
}
