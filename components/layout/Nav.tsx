import Link from 'next/link'
import { site } from '@/lib/site'

const LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/approach', label: 'Approach' },
  { href: '/lab/grounded', label: 'Lab' },
  { href: '/about', label: 'About' },
]

/**
 * Zero client JavaScript.
 *
 * The brief allows Nav to be a Client Component for scroll state. It does not
 * need to be. The condense-on-scroll is a CSS scroll-driven animation against
 * a sentinel, and the mobile panel is a native <details> — which is keyboard
 * operable, screen-reader announced, and works before hydration, none of which
 * a useState toggle can claim.
 *
 * Mobile control is the word "Menu", not a hamburger glyph.
 */
export function Nav() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-1.5 focus-visible:left-1.5 focus-visible:z-50 focus-visible:rounded-[var(--radius)] focus-visible:bg-[var(--color-ink)] focus-visible:px-2 focus-visible:py-1 focus-visible:text-[var(--color-paper)]"
      >
        Skip to content
      </a>

      <header className="site-nav sticky top-0 z-40 border-b border-[var(--color-rule)] bg-[var(--color-paper)]">
        <nav aria-label="Primary" className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-3 sm:px-4 lg:px-5">
          <Link
            href="/"
            className="nav-link text-[var(--text-base)] font-semibold tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {site.name}
          </Link>

          {/* Desktop */}
          <ul className="hidden items-center gap-3.5 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="nav-link text-[var(--text-sm)] text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-signal)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.resume}
                className="rounded-[var(--radius)] border border-[var(--color-rule-strong)] px-1.5 py-0.75 text-[var(--text-sm)] text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-signal)] hover:text-[var(--color-signal)]"
              >
                Resume <span aria-hidden="true">↗</span>
                <span className="sr-only">(PDF)</span>
              </a>
            </li>
          </ul>

          {/* Mobile */}
          <div className="flex items-center gap-4 md:hidden">
            <a
              href={site.resume}
              className="nav-link font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-ink)]"
            >
              Resume <span aria-hidden="true">↗</span>
              <span className="sr-only">(PDF)</span>
            </a>
            <details className="nav-panel group">
            <summary className="nav-link cursor-pointer list-none text-[var(--text-sm)] text-[var(--color-ink)] [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Menu</span>
              <span className="hidden group-open:inline">Close</span>
            </summary>
            <div className="absolute inset-x-0 top-full z-40 overflow-y-auto border-t border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-4">
              <ul className="flex flex-col gap-0.5">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="block border-b border-[var(--color-rule)] py-2 text-[var(--text-lg)] text-[var(--color-ink)]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={site.resume}
                    className="block border-b border-[var(--color-rule)] py-2 text-[var(--text-lg)] text-[var(--color-ink)]"
                  >
                    Resume <span aria-hidden="true">↗</span>
                  </a>
                </li>
              </ul>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 inline-block font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-signal)]"
              >
                {site.email}
              </a>
              </div>
            </details>
          </div>
        </nav>
      </header>
    </>
  )
}
