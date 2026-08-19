import Link from 'next/link'
import { getHome, getCaseStudies, getLabProjects } from '@/lib/content'
import { Container } from '@/components/layout/Container'
import { Section, SectionHead, Eyebrow } from '@/components/layout/Section'
import { Button, Tag } from '@/components/ui/Button'
import { CopyEmail } from '@/components/ui/CopyEmail'
import { HeroPanel } from '@/components/home/HeroPanel'
import { CaseCard, CardMetric } from '@/components/work/CaseCard'
import { LaunchDurations } from '@/components/diagrams/LaunchImpact'
import { site, education, tools, experience } from '@/lib/site'
import baseline from '@/public/grounded-baseline.json'

/** The visual half of each case card, keyed by slug. */
function cardVisual(slug: string) {
  switch (slug) {
    case 'step-syncing':
      return (
        <div className="flex flex-col gap-3">
          <LaunchDurations />
          <dl className="grid grid-cols-2 gap-2 border-t border-[var(--color-line)] pt-2.5">
            <div>
              <dt className="text-[length:var(--text-lg)] font-semibold tabular-nums">+35%</dt>
              <dd className="text-[length:var(--text-xs)] text-[var(--color-muted)]">
                Step-sync completion
              </dd>
            </div>
            <div>
              <dt className="text-[length:var(--text-lg)] font-semibold tabular-nums">25 → 6MB</dt>
              <dd className="text-[length:var(--text-xs)] text-[var(--color-muted)]">
                App bundle, 76% smaller
              </dd>
            </div>
          </dl>
        </div>
      )
    case 'steps-premier-league':
      return (
        <CardMetric
          headline={{
            value: '3.5 → 7.8',
            label: 'Minutes per session',
            note: 'The declared north star for the launch, and a choice I will argue about.',
          }}
          supporting={[
            { value: '0→1', label: 'Built from nothing' },
            { value: '3', label: 'Strategies evaluated, one shipped' },
          ]}
        />
      )
    case 'ai-health-report':
      return (
        <CardMetric
          headline={{
            value: '15%',
            label: 'Incremental revenue',
            note: 'From cross-sell placed inside the report, not around it.',
          }}
          supporting={[
            { value: '5+', label: 'Enterprise closes citing it' },
            { value: '0→1', label: 'Requirements, UX, personalisation' },
          ]}
        />
      )
    default:
      return null
  }
}

export default function Home() {
  const { meta } = getHome()
  const cases = getCaseStudies()
  const lab = getLabProjects()[0]

  return (
    <>
      {/* 1 — Hero */}
      <Container as="header" className="pt-4 pb-6 sm:pt-6 sm:pb-8 lg:pt-10 lg:pb-12">
        <div className="grid items-center gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
          <div className="flex flex-col gap-3">
            <p className="animate-rise eyebrow">{meta.eyebrow}</p>

            <h1
              className="animate-rise max-w-[16ch] text-[length:var(--text-hero)] leading-[1.04] font-semibold tracking-[var(--track-display)]"
              style={{ '--delay': '60ms' } as React.CSSProperties}
            >
              {meta.headline}
            </h1>

            <p
              className="animate-rise max-w-[54ch] text-[length:var(--text-base)] leading-relaxed text-[var(--color-body)] sm:text-[length:var(--text-md)]"
              style={{ '--delay': '120ms' } as React.CSSProperties}
            >
              {meta.intro}
            </p>

            <div
              className="animate-rise mt-1 flex flex-wrap items-center gap-2"
              style={{ '--delay': '180ms' } as React.CSSProperties}
            >
              <Button href="#work" size="large">
                View my work <span aria-hidden="true">→</span>
              </Button>
              <Button href={site.resume} variant="secondary" size="large">
                Résumé <span aria-hidden="true">↗</span>
              </Button>
              <Button href={site.linkedin} variant="secondary" size="large">
                LinkedIn <span aria-hidden="true">↗</span>
              </Button>
            </div>

            {/* Identification. Title, location and what he wants — all three
                sat below 23,000px on a phone before this, which is nowhere. */}
            <ul
              className="animate-rise mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-[var(--color-line)] pt-3 text-[length:var(--text-sm)] text-[var(--color-muted)]"
              style={{ '--delay': '240ms' } as React.CSSProperties}
            >
              {meta.meta.map((m, i) => (
                <li key={m} className="flex items-center gap-2">
                  {i > 0 ? (
                    <span aria-hidden="true" className="text-[var(--color-line-strong)]">
                      ·
                    </span>
                  ) : null}
                  <span className={i === 0 ? 'font-medium text-[var(--color-ink)]' : ''}>{m}</span>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="text-[var(--color-line-strong)]">
                  ·
                </span>
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-[var(--color-accent)] underline decoration-[var(--color-accent)]/30 underline-offset-[3px] hover:decoration-[var(--color-accent)]"
                >
                  Email me
                </a>
              </li>
            </ul>
          </div>

          <HeroPanel figures={meta.proofPanel} />
        </div>
      </Container>

      {/* 2 — By the numbers */}
      <Section band id="numbers" labelledBy="numbers-h">
        <Container>
          <SectionHead
            id="numbers-h"
            eyebrow="By the numbers"
            title="What the work actually moved."
            lead="Every figure below comes from shipped product work at HCL Healthcare."
          />
          <div className="mt-5 grid gap-x-6 gap-y-5 sm:mt-6 sm:gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {meta.numbers.map((n, i) => (
              <div
                key={n.label}
                className="flex flex-col gap-1.5 border-t border-[var(--color-line-strong)]/40 pt-3"
              >
                <p
                  className="animate-rise text-[length:var(--text-metric)] leading-none font-semibold tracking-[var(--track-display)] tabular-nums"
                  style={{ '--delay': `${i * 50}ms` } as React.CSSProperties}
                >
                  {n.value}
                </p>
                <p className="text-[length:var(--text-base)] font-medium">{n.label}</p>
                {n.context ? (
                  <p className="max-w-[36ch] text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
                    {n.context}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3 — Selected work */}
      <Section id="work" labelledBy="work-h" className="scroll-mt-8">
        <Container>
          <SectionHead
            id="work-h"
            eyebrow="Selected work"
            title="Three problems, three shapes."
            lead={meta.workLead}
            action={
              <Button href="/work" variant="secondary">
                All work <span aria-hidden="true">→</span>
              </Button>
            }
          />
          <div className="mt-6 flex flex-col gap-3">
            {cases.map((c, i) => (
              <CaseCard
                key={c.meta.slug}
                meta={c.meta}
                index={i + 1}
                reversed={i % 2 === 1}
                visual={cardVisual(c.meta.slug)}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 4 — Experience, compact. The full timeline lives on /about. */}
      <Section band labelledBy="exp-h">
        <Container>
          <SectionHead
            id="exp-h"
            eyebrow="Experience"
            title="Four years of product work, one of them owning a surface."
            action={
              <Button href="/about" variant="secondary">
                Full timeline <span aria-hidden="true">→</span>
              </Button>
            }
          />
          <ol className="mt-6 border-t border-[var(--color-line)]">
            {experience.map((role) => (
              <li
                key={role.company}
                className="grid gap-x-4 gap-y-1 border-b border-[var(--color-line)] py-2.5 sm:grid-cols-[minmax(0,11rem)_minmax(0,9rem)_minmax(0,1fr)] sm:items-baseline"
              >
                <span className="flex items-center gap-1.5 font-semibold">
                  {role.company}
                  {role.current ? (
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-[var(--color-accent)]"
                    />
                  ) : null}
                </span>
                <span className="text-[length:var(--text-sm)] text-[var(--color-ink)]">
                  {role.title}
                </span>
                <span className="flex flex-wrap gap-x-2 text-[length:var(--text-sm)] text-[var(--color-muted)] tabular-nums">
                  <span>{role.period}</span>
                  <span aria-hidden="true">·</span>
                  <span>{role.place}</span>
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 5 — How I work */}
      <Section labelledBy="how-h">
        <Container>
          <SectionHead
            id="how-h"
            eyebrow="How I work"
            title="How I make product decisions."
            action={
              <Button href="/approach" variant="secondary">
                The longer version <span aria-hidden="true">→</span>
              </Button>
            }
          />
          <div className="mt-5 grid gap-2 sm:mt-6 sm:gap-3 sm:grid-cols-2">
            {meta.principles.map((p, i) => (
              <div key={p.title} className="card flex flex-col gap-1.5 p-2.5 sm:gap-2 sm:p-3">
                <span className="text-[length:var(--text-sm)] font-semibold tabular-nums text-[var(--color-accent)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="max-w-[26ch] text-[length:var(--text-lg)] leading-snug font-semibold tracking-[var(--track-heading)]">
                  {p.title}
                </h3>
                <p className="text-[length:var(--text-sm)] leading-relaxed text-[var(--color-body)]">
                  {p.body}
                </p>
                <p className="mt-auto border-t border-[var(--color-line)] pt-2 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
                  {p.example}
                </p>
                {p.href ? (
                  <Link
                    href={p.href}
                    className="text-[length:var(--text-sm)] font-medium text-[var(--color-accent)]"
                  >
                    See it in the work <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6 — Product Lab */}
      {lab ? (
        <Section band labelledBy="lab-h">
          <Container>
            <SectionHead id="lab-h" eyebrow="Product lab" title={meta.labLead} />
            <div className="card mt-6 overflow-hidden">
              <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                <div className="flex flex-col gap-2.5 p-3 sm:p-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Tag tone={lab.meta.status === 'live' ? 'accent' : 'flag'}>
                      {lab.meta.status === 'live' ? 'Live' : lab.meta.status.replace('-', ' ')}
                    </Tag>
                    <span className="text-[length:var(--text-xs)] text-[var(--color-muted)]">
                      {lab.meta.statusNote}
                    </span>
                  </div>
                  <h3 className="text-[length:var(--text-2xl)] leading-tight font-semibold tracking-[var(--track-heading)]">
                    {lab.meta.title}
                  </h3>
                  <p className="max-w-[52ch] text-[length:var(--text-md)] leading-relaxed text-[var(--color-body)]">
                    {lab.meta.tagline}
                  </p>
                  <p className="max-w-[52ch] text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
                    <span className="font-medium text-[var(--color-ink)]">Why I built it: </span>
                    {lab.meta.why}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <Button href={`/lab/${lab.meta.slug}`}>
                      Run it <span aria-hidden="true">→</span>
                    </Button>
                  </div>
                </div>
                <dl className="grid grid-cols-2 content-start gap-px border-t border-[var(--color-line)] bg-[var(--color-line)] lg:border-t-0 lg:border-l">
                  {[
                    ['Cases in the set', String(baseline.stats.total)],
                    ['Scored dimensions', '4'],
                    ['Full run', `${baseline.totalElapsedMs}ms`],
                    ['Server calls', '0'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-0.5 bg-[var(--color-surface)] p-2.5">
                      <dt className="eyebrow">{k}</dt>
                      <dd className="text-[length:var(--text-xl)] font-semibold tabular-nums">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* 7 — About */}
      <Section labelledBy="about-h">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
            <div className="flex flex-col gap-2">
              <Eyebrow>About</Eyebrow>
              <h2
                id="about-h"
                className="max-w-[18ch] text-[length:var(--text-xl)] tracking-[var(--track-heading)] sm:text-[length:var(--text-2xl)]"
              >
                {meta.aboutLead}
              </h2>
              <Button href="/about" variant="secondary" className="mt-2 self-start">
                More about me <span aria-hidden="true">→</span>
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[length:var(--text-md)] leading-relaxed text-[var(--color-body)]">
                I like problems where the product already exists and something is quietly stopping
                people from using it — a wait, a wall, a number nobody can read. Finding that thing
                is most of the job.
              </p>
              <p className="text-[length:var(--text-base)] leading-relaxed text-[var(--color-muted)]">
                {education.degree}, {education.school}, {education.period}. Product work since 2022
                across media, marketplaces, fintech onboarding, insurance claims and now health.
              </p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-[var(--color-surface)] px-1.5 py-0.5 text-[length:var(--text-xs)] text-[var(--color-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8 — Final CTA */}
      <Section band labelledBy="cta-h">
        <Container>
          <div className="flex flex-col items-start gap-3">
            <h2
              id="cta-h"
              className="max-w-[20ch] text-[length:var(--text-2xl)] tracking-[var(--track-heading)] sm:text-[length:var(--text-3xl)]"
            >
              {meta.ctaTitle}
            </h2>
            <p className="max-w-[54ch] text-[length:var(--text-md)] leading-relaxed text-[var(--color-body)]">
              {meta.ctaBody}
            </p>
            <div className="mt-1">
              <CopyEmail size="large" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
