'use client'

import { useState } from 'react'
import { site } from '@/lib/site'

/**
 * The address is a real mailto link first; the copy control is an addition to
 * it, never a replacement. A way of contacting someone that only works with
 * JavaScript is not a way of contacting someone.
 */
export function CopyEmail({ size = 'default' }: { size?: 'default' | 'large' }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked. The mailto link beside this still works, so there
      // is nothing to recover from.
    }
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1.5">
      <a
        href={`mailto:${site.email}`}
        className={`inline-flex items-center gap-1.5 rounded-[var(--radius)] bg-[var(--color-ink)] font-medium text-[var(--color-canvas)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-accent)] ${
          size === 'large'
            ? 'px-3.5 py-2 text-[length:var(--text-base)]'
            : 'px-2.5 py-1.5 text-[length:var(--text-sm)]'
        }`}
      >
        {site.email} <span aria-hidden="true">→</span>
      </a>
      <button
        type="button"
        onClick={copy}
        className="copy-btn relative rounded-[var(--radius-sm)] px-1.5 py-1 text-[length:var(--text-xs)] font-medium text-[var(--color-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-ink)]"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </span>
  )
}
