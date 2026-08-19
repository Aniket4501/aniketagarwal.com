/**
 * A visible gap.
 *
 * Set in the correction red the site uses for "this is where I was wrong" —
 * deliberately, because a claim that cannot yet be substantiated and a decision
 * that went wrong are the same kind of honesty, and one colour means a reader
 * can scan for either without reading a word.
 *
 * Rendered inline with no border, no vertical padding and no glyph. An earlier
 * version was an inline-flex chip with a border and a U+21AF marker; it
 * inflated the line box inside 21px serif prose, and the glyph is not in Geist
 * Mono, so it fell back to a system font in the middle of a sentence.
 *
 * Every token here maps to an answerable question in CONTENT_GAPS.md.
 */
export function Needs({ children }: { children: string }) {
  return (
    <span
      className="rounded-[2px] bg-[var(--color-flag-tint)] px-[0.35em] font-[family-name:var(--font-mono)] text-[0.85em] text-[var(--color-flag)] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
      data-needs=""
    >
      <span className="sr-only">Unanswered question: </span>
      <span aria-hidden="true" className="font-medium">NEEDS: </span>
      {children}
    </span>
  )
}

const TOKEN = /\[NEEDS:\s*([^\]]+)\]/g

/**
 * Splits a string on `[NEEDS: …]` tokens. Content files carry the token inline
 * so the prose reads naturally with or without an answer, and one search finds
 * every remaining hole.
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
