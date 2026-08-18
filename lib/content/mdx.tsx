import { MDXRemote } from 'next-mdx-remote/rsc'
import { MetricDelta } from '@/components/content/MetricDelta'
import { Callout } from '@/components/content/Callout'
import { Drawer } from '@/components/content/Drawer'
import { DecisionTable } from '@/components/content/DecisionTable'
import { Figure } from '@/components/content/Figure'
import { Needs, WithNeeds } from '@/components/ui/Needs'
import { slugify } from './headings'
import { ColdStartScale } from '@/components/diagrams/ColdStartScale'
import { BundleScale } from '@/components/diagrams/BundleScale'
import { OptionSpread } from '@/components/diagrams/OptionSpread'
import { FeedbackCadence } from '@/components/diagrams/FeedbackCadence'
import { EvalScorecard } from '@/components/diagrams/EvalScorecard'

/**
 * Rendered entirely in a Server Component, so a case-study route ships zero
 * client JavaScript for its content. Everything below is server-rendered
 * markup by the time it reaches the browser.
 */

const components = {
  MetricDelta,
  Callout,
  Drawer,
  DecisionTable,
  Figure,
  Needs,
  ColdStartScale,
  BundleScale,
  OptionSpread,
  FeedbackCadence,
  EvalScorecard,
  /**
   * Paragraphs are piped through the [NEEDS:] splitter so a token written
   * inline in the prose renders as a chip without the author needing to
   * import or wrap anything.
   */
  p: ({ children }: { children?: React.ReactNode }) => (
    <p>{typeof children === 'string' ? <WithNeeds text={children} /> : children}</p>
  ),
  /**
   * Section headers get their slug here rather than through rehype-slug, which
   * would be a dependency for six lines of code. The id has to match
   * extractHeadings() exactly or the section index points at nothing.
   */
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 id={typeof children === 'string' ? slugify(children) : undefined}>{children}</h2>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li>{typeof children === 'string' ? <WithNeeds text={children} /> : children}</li>
  ),
}

export function Mdx({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />
}
