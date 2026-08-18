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
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-50 focus-visible:rounded-[var(--radius)] focus-visible:bg-[var(--color-ink)] focus-visible:px-4 focus-visible:py-2 focus-visible:text-[var(--color-paper)]"
      >
        Skip to content
      </a>

      <header className="site-nav sticky top-0 z-40 border-b border-[var(--color-rule)] bg-[var(--color-paper)]/92 backdrop-blur-[6px]">
        <nav aria-label="Primary" className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="nav-link text-[var(--text-base)] font-semibold tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {site.name}
          </Link>

          {/* Desktop */}
          <ul className="hidden items-center gap-7 md:flex">
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
                className="rounded-[var(--radius)] border border-[var(--color-rule-strong)] px-3 py-1.5 text-[var(--text-sm)] text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-signal)] hover:text-[var(--color-signal)]"
              >
                Resume <span aria-hidden="true">↗</span>
                <span className="sr-only">(PDF, opens in this tab)</span>
              </a>
            </li>
          </ul>

          {/* Mobile */}
          <details className="nav-panel group md:hidden">
            <summary className="nav-link cursor-pointer list-none text-[var(--text-sm)] text-[var(--color-ink)] [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Menu</span>
              <span className="hidden group-open:inline">Close</span>
            </summary>
            <div className="absolute inset-x-0 top-full z-40 overflow-y-auto border-t border-[var(--color-rule)] bg-[var(--color-paper)] px-6 py-8">
              <ul className="flex flex-col gap-1">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="block border-b border-[var(--color-rule)] py-4 text-[var(--text-lg)] text-[var(--color-ink)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={site.resume}
                    className="block border-b border-[var(--color-rule)] py-4 text-[var(--text-lg)] text-[var(--color-ink)]"
                  >
                    Resume <span aria-hidden="true">↗</span>
                  </a>
                </li>
              </ul>
              <a
                href={`mailto:${site.email}`}
                className="mt-8 inline-block font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-signal)]"
              >
                {site.email}
              </a>
            </div>
          </details>
        </nav>
      </header>
    </>
  )
}
