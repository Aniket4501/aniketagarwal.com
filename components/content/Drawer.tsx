import type { ReactNode } from 'react'

/**
 * Progressive disclosure, server-rendered, zero client JavaScript.
 *
 * Native <details> keeps the content in the DOM whether open or closed, so it
 * is indexed, findable with Cmd-F while collapsed, keyboard operable and
 * announced correctly — none of which an aria-expanded div with useState gets
 * for free.
 *
 * The summary must be a specific claim. The label does work for the reader who
 * never opens it: it says the argument happened.
 */
export function Drawer({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="group card my-4 overflow-hidden">
      <summary className="flex cursor-pointer list-none items-start gap-2 p-2.5 text-[length:var(--text-sm)] leading-snug font-medium text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-accent)] [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="mt-[0.1em] grid h-2 w-2 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--color-line)] text-[10px] text-[var(--color-muted)] transition-transform duration-[var(--duration)] group-open:rotate-90"
        >
          ▸
        </span>
        <span>{label}</span>
      </summary>
      <div className="border-t border-[var(--color-line)] bg-[var(--color-canvas)] p-2.5 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-body)] [&>*+*]:mt-2">
        {children}
      </div>
    </details>
  )
}
