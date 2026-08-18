import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import {
  homeSchema,
  caseStudySchema,
  shortCaseSchema,
  labProjectSchema,
  type CaseStudyFrontmatter,
  type ShortCaseFrontmatter,
  type LabProjectFrontmatter,
  type HomeFrontmatter,
} from './schema'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export type Doc<T> = { meta: T; body: string }

function readCollection<T>(
  dir: string,
  parse: (data: unknown, file: string) => T,
): Doc<T>[] {
  const full = path.join(CONTENT_DIR, dir)
  if (!fs.existsSync(full)) return []
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), 'utf8')
      const { data, content } = matter(raw)
      return { meta: parse(data, `${dir}/${file}`), body: content }
    })
}

/**
 * Zod failures here abort `next build`. That is the point: the schema is the
 * enforcement mechanism for the ownership and denominator rules, not a
 * suggestion. See lib/content/schema.ts.
 */
function strict<T>(schema: { parse: (v: unknown) => T }) {
  return (data: unknown, file: string): T => {
    try {
      return schema.parse(data)
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err)
      throw new Error(`Content validation failed in content/${file}\n${detail}`)
    }
  }
}

export function getCaseStudies(): Doc<CaseStudyFrontmatter>[] {
  return readCollection('work', strict(caseStudySchema))
    .filter((d) => d.meta.published)
    .sort((a, b) => a.meta.order - b.meta.order)
}

export function getCaseStudy(slug: string): Doc<CaseStudyFrontmatter> | undefined {
  return getCaseStudies().find((d) => d.meta.slug === slug)
}

export function getShortCases(): Doc<ShortCaseFrontmatter>[] {
  return readCollection('short', strict(shortCaseSchema)).sort(
    (a, b) => a.meta.order - b.meta.order,
  )
}

export function getLabProjects(): Doc<LabProjectFrontmatter>[] {
  return readCollection('lab', strict(labProjectSchema)).sort(
    (a, b) => a.meta.order - b.meta.order,
  )
}

export function getLabProject(slug: string): Doc<LabProjectFrontmatter> | undefined {
  return getLabProjects().find((d) => d.meta.slug === slug)
}

export function getHome(): Doc<HomeFrontmatter> {
  const file = path.join(CONTENT_DIR, 'home.mdx')
  const { data, content } = matter(fs.readFileSync(file, 'utf8'))
  return { meta: strict(homeSchema)(data, 'home.mdx'), body: content }
}
