import type { Metadata } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { Mdx } from '@/lib/content/mdx'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { readingFontVariable } from '../fonts-reading'

export const metadata: Metadata = {
  title: 'Approach',
  description:
    'How I make product decisions: start with the real problem, use evidence before instinct, make the trade-off explicit, and measure what shipped. Four principles with the work attached to each.',
  alternates: { canonical: '/approach' },
}

export default function Approach() {
  const file = path.join(process.cwd(), 'content', 'approach.mdx')
  const { content } = matter(fs.readFileSync(file, 'utf8'))

  return (
    <div className={readingFontVariable}>
      <Container className="pt-6 pb-4 lg:pt-9">
        <p className="eyebrow">Approach</p>
        <h1 className="mt-2 max-w-[20ch] text-[length:var(--text-3xl)] leading-[1.05] font-semibold tracking-[var(--track-display)] sm:text-[length:var(--text-hero)]">
          How I make product decisions.
        </h1>
        <p className="mt-3 max-w-[58ch] text-[length:var(--text-md)] leading-relaxed text-[var(--color-body)]">
          Four principles, each with the work attached, and each with the part of it I would argue
          about. This page is argument; the record is under{' '}
          <a
            href="/work"
            className="font-medium text-[var(--color-accent)] underline decoration-[var(--color-accent)]/35 underline-offset-[3px]"
          >
            Work
          </a>
          .
        </p>
      </Container>

      <Container className="pb-10">
        <div className="approach-body case-body">
          <Mdx source={content} />
        </div>
      </Container>

      <Container className="pb-10">
        <div className="card flex flex-col items-start gap-2 p-3 sm:p-4">
          <p className="eyebrow">Next</p>
          <p className="max-w-[38ch] text-[length:var(--text-lg)] leading-snug font-semibold tracking-[var(--track-heading)]">
            The shortest distance on this site between a decision and what it cost.
          </p>
          <Button href="/work/step-syncing" className="mt-1">
            Read Step Syncing <span aria-hidden="true">→</span>
          </Button>
        </div>
      </Container>
    </div>
  )
}
