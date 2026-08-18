'use client'

import { useState } from 'react'
import { site } from '@/lib/site'

/**
 * One of the six micro-interactions on the site, and one of only three client
 * components. The address is a real mailto link first; the copy button is an
 * addition to it, never a replacement — a control that only works with
 * JavaScript is not how you let someone contact you.
 */
export function CopyEmail({ size = 'default' }: { size?: 'default' | 'large' }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked (insecure context, permissions). The mailto link
      // beside this button still works, so there is nothing to recover from.
    }
  }

  const type =
    size === 'large'
      ? 'text-[var(--text-lg)] sm:text-[var(--text-xl)]'
      : 'text-[var(--text-base)]'

  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
      <a
        href={`mailto:${site.email}`}
        className={`font-[family-name:var(--font-mono)] ${type} text-[var(--color-signal)] underline decoration-[var(--color-signal)]/30 underline-offset-[6px] transition-colors duration-[var(--duration-fast)] hover:decoration-[var(--color-signal)]`}
      >
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="copy-btn rounded-[var(--radius-sm)] border border-[var(--color-rule-strong)] px-1 py-0.25 font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)] transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-signal)] hover:text-[var(--color-signal)]"
      >
        {copied ? 'copied' : 'copy'}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </span>
  )
}
