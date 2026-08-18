/** A markdown H2 lifted out of an MDX body, for the section index. */
export type Heading = { id: string; label: string }

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

/**
 * Pulls H2s out of an MDX body without parsing it. Fenced code is stripped
 * first so a `## ` inside a code block is not mistaken for a section.
 */
export function extractHeadings(body: string): Heading[] {
  const withoutCode = body.replace(/```[\s\S]*?```/g, '')
  return [...withoutCode.matchAll(/^##\s+(.+)$/gm)].map((m) => {
    const label = (m[1] ?? '').replace(/[*_`]/g, '').trim()
    return { id: slugify(label), label }
  })
}
