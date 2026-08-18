/**
 * A visible gap.
 *
 * Rendered in `--flag` amber, the same colour the site uses for "this is where
 * I was wrong". That is deliberate: a claim I cannot yet substantiate and a
 * decision I got wrong are the same kind of honesty, and giving them the same
 * colour means a reader can scan for either without reading a word.
 *
 * Every token here is mirrored by an answerable question in CONTENT_GAPS.md.
 */
export function Needs({ children }: { children: string }) {
  return (
    <span
      className="inline-flex items-baseline gap-[0.4em] rounded-[2px] border border-[var(--color-flag)]/35 bg-[var(--color-flag)]/[0.06] px-[0.45em] py-[0.1em] align-baseline font-[family-name:var(--font-mono)] text-[0.82em] leading-snug text-[var(--color-flag)]"
      data-needs=""
    >
      <span aria-hidden="true" className="select-none opacity-70">
        ↯
      </span>
      <span>
        <span className="sr-only">Unanswered: </span>
        {children}
      </span>
    </span>
  )
}

const TOKEN = /\[NEEDS:\s*([^\]]+)\]/g

/**
 * Splits a string on `[NEEDS: …]` tokens and renders the tokens as chips.
 * Content files carry the token inline so the prose reads naturally with or
 * without an answer, and one search finds every remaining hole.
 */
export function WithNeeds({ text }: { text: string }) {
  const parts: React.ReactNode[] = []
  let last = 0
  let key = 0

  for (const match of text.matchAll(TOKEN)) {
    const at = match.index
    if (at === undefined) continue
    if (at > last) parts.push(text.slice(last, at))
    parts.push(<Needs key={key++}>{(match[1] ?? '').trim()}</Needs>)
    last = at + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))

  return <>{parts}</>
}

/** True when a string still contains an unanswered token. */
export function hasNeeds(text: string): boolean {
  return /\[NEEDS:/.test(text)
}
