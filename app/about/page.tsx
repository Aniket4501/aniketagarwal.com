import type { Metadata } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { Mdx } from '@/lib/content/mdx'
import { Container } from '@/components/layout/Container'
import { CopyEmail } from '@/components/ui/CopyEmail'
import { readingFontVariable } from '../fonts-reading'
import { Timeline } from '@/components/content/Timeline'
import { site, tools, siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Aniket Agarwal — Product Analyst at HCL Healthcare since October 2024, working on engagement for a consumer health app with 1M+ registered users. Based in Noida.',
  alternates: { canonical: '/about' },
}

function personJsonLd() {
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
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />

      <Container className="pt-6 pb-8 lg:pt-10">
        <p className="eyebrow">About</p>
        <h1 className="mt-2 max-w-[24ch] text-[length:var(--text-3xl)] leading-[1.08] font-semibold tracking-[var(--track-display)]">
          Product Analyst at HCL Healthcare, on one app, since October 2024.
        </h1>
        <div className="prose mt-6">
          <Mdx source={content} />
        </div>
      </Container>

      <Container className="pb-8">
        <h2 className="eyebrow">Timeline</h2>
        <div className="mt-2.5">
          <Timeline />
        </div>
      </Container>

      <Container className="pb-10 lg:pb-14">
        <div className="flex flex-col gap-3 border-t border-[var(--color-rule)] pt-4">
          <div className="flex flex-col gap-1">
            <p className="eyebrow">Tools</p>
            <p className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
              {tools}
            </p>
          </div>
          <div className="flex flex-col gap-1 pt-1">
            <p className="eyebrow">Contact</p>
            <CopyEmail />
          </div>
        </div>
      </Container>
    </div>
  )
}
