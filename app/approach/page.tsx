import type { Metadata } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { Mdx } from '@/lib/content/mdx'
import { Container } from '@/components/layout/Container'
import { extractHeadings } from '@/lib/content/headings'
import { SectionIndex, Rail } from '@/components/content/ProgressRail'
import { readingFontVariable } from '../fonts-reading'

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
      <Container className="pt-6 pb-3 lg:pt-10">
        <p className="eyebrow">Approach</p>
        <h1 className="mt-2 max-w-[22ch] text-[length:var(--text-3xl)] leading-[1.08] font-semibold tracking-[var(--track-display)]">
          Three beliefs, and the one section I cannot write yet.
        </h1>
      </Container>

      <Container className="pb-10 lg:pb-14">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(14rem,17rem)] lg:gap-10">
          <div className="prose order-1">
            <Mdx source={content} />
          </div>
          <aside className="order-2 mt-7 lg:mt-1">
            <Rail>
              <SectionIndex sections={sections} />
            </Rail>
          </aside>
        </div>
      </Container>
    </div>
  )
}
