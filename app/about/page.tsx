import type { Metadata } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { Mdx } from '@/lib/content/mdx'
import { Container } from '@/components/layout/Container'
import { Section, SectionHead } from '@/components/layout/Section'
import { Experience } from '@/components/home/Experience'
import { CopyEmail } from '@/components/ui/CopyEmail'
import { Button } from '@/components/ui/Button'
import { readingFontVariable } from '../fonts-reading'
import { site, tools, siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Aniket Agarwal — product manager at HCL Healthcare, working on engagement for a consumer health app with 1M+ registered users. Based in Noida, India.',
  alternates: { canonical: '/about' },
}

function jsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: site.name,
      jobTitle: 'Product Analyst',
      worksFor: { '@type': 'Organization', name: site.company },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Indian Institute of Technology Kharagpur',
      },
      email: `mailto:${site.email}`,
      url: `${siteUrl()}/about`,
      sameAs: [site.linkedin],
    },
  }
}

export default function About() {
  const file = path.join(process.cwd(), 'content', 'about.mdx')
  const { content } = matter(fs.readFileSync(file, 'utf8'))

  return (
    <div className={readingFontVariable}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <Container className="pt-6 pb-8 lg:pt-9">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-10">
          <div>
            <p className="eyebrow">About</p>
            <h1 className="mt-2 max-w-[18ch] text-[length:var(--text-3xl)] leading-[1.05] font-semibold tracking-[var(--track-display)] sm:text-[length:var(--text-hero)]">
              I find the reason a product isn&rsquo;t being used.
            </h1>
            <div className="case-body mt-4">
              <Mdx source={content} />
            </div>
          </div>

          <aside className="flex flex-col gap-3 self-start lg:sticky lg:top-12">
            <div className="card flex flex-col gap-2.5 p-3">
              <p className="eyebrow">At a glance</p>
              <dl className="flex flex-col gap-2 text-[length:var(--text-sm)]">
                {[
                  ['Now', 'Product Analyst, HCL Healthcare'],
                  ['Based in', site.location],
                  ['Domain', 'Consumer health · applied AI'],
                  ['Looking for', 'PM · APM · AI PM'],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-0.5">
                    <dt className="eyebrow">{k}</dt>
                    <dd className="text-[var(--color-ink)]">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-1 flex flex-wrap gap-2 border-t border-[var(--color-line)] pt-2.5">
                <Button href={site.resume} variant="secondary">
                  Résumé <span aria-hidden="true">↗</span>
                </Button>
                <Button href={site.linkedin} variant="secondary">
                  LinkedIn <span aria-hidden="true">↗</span>
                </Button>
              </div>
            </div>

            <div className="card flex flex-col gap-2 p-3">
              <p className="eyebrow">Tools I actually use</p>
              <div className="flex flex-wrap gap-1.5">
                {tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-[var(--radius-sm)] border border-[var(--color-line)] px-1.5 py-0.5 text-[length:var(--text-xs)] text-[var(--color-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>

      <Section band labelledBy="exp-h">
        <Container>
          <SectionHead id="exp-h" eyebrow="Experience" title="Where I have worked." />
          <div className="mt-6">
            <Experience />
          </div>
        </Container>
      </Section>

      <Container className="py-8 lg:py-10">
        <div className="flex flex-col items-start gap-3">
          <h2 className="max-w-[20ch] text-[length:var(--text-2xl)] tracking-[var(--track-heading)]">
            Want to talk about a product problem?
          </h2>
          <CopyEmail size="large" />
        </div>
      </Container>
    </div>
  )
}
