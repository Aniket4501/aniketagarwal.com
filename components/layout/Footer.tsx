import { CopyEmail } from '@/components/ui/CopyEmail'
import { Container } from './Container'
import { site } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-rule)]">
      <Container className="flex flex-col gap-10 py-14 lg:flex-row lg:items-end lg:justify-between lg:py-20">
        <div className="flex flex-col gap-4">
          <p className="max-w-[38ch] text-[var(--text-lg)] leading-snug font-semibold tracking-[-0.01em]">
            If any of this is a problem you have right now, I&rsquo;d like to hear about it.
          </p>
          <CopyEmail size="large" />
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 font-[family-name:var(--font-mono)] text-[var(--text-sm)]">
          <li>
            <a
              href={site.linkedin}
              rel="me noopener"
              className="text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-signal)]"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a
              href={site.resume}
              className="text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-signal)]"
            >
              Resume <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </Container>

      <Container className="border-t border-[var(--color-rule)] py-6">
        <p className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)]">
          {site.name} · {site.location} · Built with Next.js. Source and content are in one
          repository; every number on this site carries the population and window it was measured
          over, or says that it doesn&rsquo;t yet.
        </p>
      </Container>
    </footer>
  )
}
