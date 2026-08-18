import type { Metadata } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { Mdx } from '@/lib/content/mdx'
import { Container } from '@/components/layout/Container'
import { CopyEmail } from '@/components/ui/CopyEmail'
import { readingFontVariable } from '../fonts'
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

      <Container className="pt-12 pb-16 lg:pt-20">
        <p className="eyebrow">About</p>
        <div className="prose mt-6">
          <Mdx source={content} />
        </div>
      </Container>

      <Container className="pb-16">
        <h2 className="eyebrow">Timeline</h2>
        <div className="mt-5">
          <Timeline />
        </div>
      </Container>

      <Container className="pb-20 lg:pb-28">
        <div className="flex flex-col gap-6 border-t border-[var(--color-rule)] pt-8">
          <div className="flex flex-col gap-2">
            <p className="eyebrow">Tools</p>
            <p className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
              {tools}
            </p>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <p className="eyebrow">Contact</p>
            <CopyEmail />
          </div>
        </div>
      </Container>
    </div>
  )
}
