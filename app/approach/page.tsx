import type { Metadata } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { Mdx } from '@/lib/content/mdx'
import { Container } from '@/components/layout/Container'
import { extractHeadings } from '@/lib/content/headings'
import { SectionIndex, Rail } from '@/components/content/ProgressRail'
import { readingFontVariable } from '../fonts'

export const metadata: Metadata = {
  title: 'Approach — how I work, and one thing I have not answered yet',
  description:
    'Three product beliefs with the work attached to each, a postmortem that is still an open question, and a point of view on why manual logging is the ceiling on health-app engagement in India.',
  alternates: { canonical: '/approach' },
}

export default function Approach() {
  const file = path.join(process.cwd(), 'content', 'approach.mdx')
  const { content } = matter(fs.readFileSync(file, 'utf8'))
  const sections = extractHeadings(content)

  return (
    <div className={readingFontVariable}>
      <Container className="pt-12 pb-6 lg:pt-20">
        <p className="eyebrow">Approach</p>
      </Container>

      <Container className="pb-20 lg:pb-28">
        <div className="lg:grid lg:grid-cols-[minmax(0,var(--measure))_minmax(0,1fr)] lg:gap-14">
          <div className="prose order-1">
            <Mdx source={content} />
          </div>
          <aside className="order-2 mt-14 lg:mt-2">
            <Rail>
              <SectionIndex sections={sections} />
            </Rail>
          </aside>
        </div>
      </Container>
    </div>
  )
}
