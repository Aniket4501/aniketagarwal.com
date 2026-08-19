import Link from 'next/link'
import { Container } from './Container'
import { CopyEmail } from '@/components/ui/CopyEmail'
import { site } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <Container className="py-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-[length:var(--text-lg)] font-semibold tracking-[var(--track-heading)]">
              {site.name}
            </p>
            <p className="max-w-[38ch] text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
              Product Analyst at HCL Healthcare · {site.location} · open to PM, APM and AI PM roles.
            </p>
            <div className="mt-1">
              <CopyEmail />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 self-start text-[length:var(--text-sm)] lg:justify-items-end">
            <nav aria-label="Site" className="flex flex-col gap-1.5">
              <p className="eyebrow mb-0.5">Site</p>
              {[
                ['/work', 'Work'],
                ['/approach', 'Approach'],
                ['/thinking', 'Thinking'],
                ['/lab/grounded', 'Lab'],
                ['/about', 'About'],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href as string}
                  className="text-[var(--color-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-ink)]"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <nav aria-label="Elsewhere" className="flex flex-col gap-1.5">
              <p className="eyebrow mb-0.5">Elsewhere</p>
              <a
                href={site.linkedin}
                rel="me noopener"
                className="text-[var(--color-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-ink)]"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <a
                href={site.resume}
                className="text-[var(--color-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-ink)]"
              >
                Résumé <span aria-hidden="true">↗</span>
              </a>
            </nav>
          </div>
        </div>

        <p className="mt-8 border-t border-[var(--color-line)] pt-3 text-[length:var(--text-xs)] text-[var(--color-muted)]">
          {site.name} · {site.location} · Built with Next.js
        </p>
      </Container>
    </footer>
  )
}
