'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { site } from '@/lib/site'

/**
 * Five is the ceiling and this is five. Anything added from here replaces
 * something rather than joining it.
 */
const LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/thinking', label: 'Thinking' },
  { href: '/approach', label: 'Approach' },
  { href: '/lab/grounded', label: 'Lab' },
  { href: '/about', label: 'About' },
]

/**
 * The one thing this needs that V1's nav did not have: an active state. On
 * /work, V1 gave no indication of where you were, and its wordmark was an
 * unstyled 16px label that picked up a browser focus outline and looked
 * accidental.
 *
 * The mobile panel is a native <details>, so it is keyboard operable and
 * announced correctly, and its links are plain anchors — a client-side
 * navigation would leave the element mounted and the panel open over the page
 * you just arrived at.
 */
export function Nav() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === '/lab/grounded'
      ? pathname.startsWith('/lab')
      : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <>
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:rounded-[var(--radius)] focus-visible:bg-[var(--color-ink)] focus-visible:px-2.5 focus-visible:py-1.5 focus-visible:text-[var(--color-canvas)]"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-canvas)]/85 backdrop-blur-md">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-7 max-w-[76rem] items-center justify-between gap-4 px-3 sm:px-5 lg:px-6"
        >
          <Link
            href="/"
            className="group flex items-center gap-1.5 text-[length:var(--text-base)] font-semibold tracking-[var(--track-heading)] text-[var(--color-ink)]"
          >
            <span
              aria-hidden="true"
              className="hidden h-3 w-3 place-items-center rounded-[var(--radius-sm)] bg-[var(--color-ink)] text-[10px] font-bold text-[var(--color-canvas)] transition-colors duration-[var(--duration-fast)] group-hover:bg-[var(--color-accent)] sm:grid"
            >
              AA
            </span>
            <span>{site.name}</span>
          </Link>

          <div className="hidden items-center gap-0.5 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={`rounded-[var(--radius-sm)] px-1.5 py-1 text-[length:var(--text-sm)] transition-colors duration-[var(--duration-fast)] ${
                  isActive(l.href)
                    ? 'font-medium text-[var(--color-ink)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={site.resume}
              className="ml-1 rounded-[var(--radius)] border border-[var(--color-line-strong)] px-2 py-1 text-[length:var(--text-sm)] font-medium text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-ink)] hover:bg-[var(--color-surface)]"
            >
              Résumé <span aria-hidden="true">↗</span>
              <span className="sr-only">(PDF)</span>
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href={site.resume}
              className="rounded-[var(--radius)] border border-[var(--color-line-strong)] px-1.5 py-0.75 text-[length:var(--text-sm)] font-medium text-[var(--color-ink)]"
            >
              Résumé <span aria-hidden="true">↗</span>
              <span className="sr-only">(PDF)</span>
            </a>
            <details className="group/panel">
              <summary className="flex cursor-pointer list-none items-center gap-1 rounded-[var(--radius-sm)] px-1 py-1 text-[length:var(--text-sm)] font-medium text-[var(--color-ink)] [&::-webkit-details-marker]:hidden">
                <span className="group-open/panel:hidden">Menu</span>
                <span className="hidden group-open/panel:inline">Close</span>
              </summary>
              <div className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-100%)] overflow-y-auto border-b border-[var(--color-line)] bg-[var(--color-canvas)] px-3 py-3 shadow-[var(--shadow-card)]">
                <ul className="flex flex-col">
                  {LINKS.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        aria-current={isActive(l.href) ? 'page' : undefined}
                        className={`block border-b border-[var(--color-line)] py-2 text-[length:var(--text-lg)] ${
                          isActive(l.href)
                            ? 'font-semibold text-[var(--color-ink)]'
                            : 'text-[var(--color-body)]'
                        }`}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 block break-all text-[length:var(--text-sm)] font-medium text-[var(--color-accent)]"
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
