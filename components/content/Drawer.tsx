import type { ReactNode } from 'react'

/**
 * Progressive disclosure, server-rendered and zero client JavaScript.
 *
 * Native <details> means the content is in the DOM whether open or closed, so
 * it is indexed, findable with Cmd-F while collapsed, keyboard operable, and
 * announced correctly — none of which an aria-expanded div with useState gets
 * for free.
 *
 * NOT called an "artifact drawer" in the UI. There are no real redacted
 * artifacts to put in one; a drawer that promises a document and opens onto a
 * self-authored diagram converts a neutral absence into a discovered
 * overclaim. The label says what is actually inside.
 *
 * The summary must be a specific claim, never "Read more" — the label tells a
 * reviewer you had the argument whether or not they open it.
 */
export function Drawer({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="group my-6 border border-[var(--color-rule)] bg-[var(--color-paper-raised)]">
      <summary className="flex cursor-pointer list-none items-start gap-3 px-5 py-4 text-[var(--text-sm)] leading-snug text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-signal)] [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="mt-[0.15em] shrink-0 font-[family-name:var(--font-mono)] text-[var(--color-signal)] transition-transform duration-[var(--duration)] group-open:rotate-90"
        >
          ▸
        </span>
        <span>{label}</span>
      </summary>
      <div className="border-t border-[var(--color-rule)] px-5 py-5 text-[var(--text-sm)] leading-relaxed [&>*+*]:mt-4">
        {children}
      </div>
    </details>
  )
}
