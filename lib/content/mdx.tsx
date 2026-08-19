import { MDXRemote } from 'next-mdx-remote/rsc'
import smartypants from 'remark-smartypants'
import { Callout } from '@/components/content/Callout'
import { Drawer } from '@/components/content/Drawer'
import { DecisionTable } from '@/components/content/DecisionTable'
import { GuardrailTable } from '@/components/content/GuardrailTable'
import { CutTable } from '@/components/content/CutTable'
import { Figure } from '@/components/content/Figure'
import { Metric, MetricDelta } from '@/components/content/Metric'
import { StatRow } from '@/components/content/StatRow'
import { Flow, BeforeAfterFlow, DurationBars, Funnel, LoopDiagram } from '@/components/diagrams/Flow'
import { LaunchJourney, LaunchDurations, BundleImpact } from '@/components/diagrams/LaunchImpact'
import { LeagueLoop, StrategySpread } from '@/components/diagrams/LeagueMechanic'
import { ReportFlow, ThreeParties, KycFunnel } from '@/components/diagrams/ReportPipeline'
import { EvalScorecard } from '@/components/diagrams/EvalScorecard'
import { RegressionDiff } from '@/components/lab/RegressionDiff'
import { Reconstruction } from '@/components/product/Reconstruction'
import { LeagueStandings } from '@/components/product/LeagueStandings'
import { ReportPage } from '@/components/product/ReportPage'

/**
 * Rendered entirely in a Server Component, so a case-study route ships zero
 * client JavaScript for its content.
 */
const components = {
  Callout,
  Drawer,
  DecisionTable,
  GuardrailTable,
  CutTable,
  Figure,
  Metric,
  MetricDelta,
  StatRow,
  Flow,
  BeforeAfterFlow,
  DurationBars,
  Funnel,
  LoopDiagram,
  LaunchJourney,
  LaunchDurations,
  BundleImpact,
  LeagueLoop,
  StrategySpread,
  ReportFlow,
  ThreeParties,
  KycFunnel,
  EvalScorecard,
  RegressionDiff,
  Reconstruction,
  LeagueStandings,
  ReportPage,
}

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        /**
         * next-mdx-remote v6 defaults `blockJS` to true, which strips every
         * `{…}` expression as a hardening measure for user-supplied MDX. That
         * silently removes every component prop: a DecisionTable arrives with
         * only its string attributes and throws on `columns.map`.
         *
         * Right default for content submitted by strangers; wrong here. This
         * MDX lives in the repo, is authored by one person, changes only
         * through a pull request, and is validated by Zod plus two gate
         * scripts before it can build.
         */
        blockJS: false,
        mdxOptions: {
          /**
           * Typographic punctuation, applied by the pipeline rather than by
           * whoever is typing. The designer review caught the same word
           * rendering with a straight apostrophe on one page and a curly one
           * on another; hand-authoring `’` fixes that instance and guarantees
           * the next one. Only quotes and dashes are converted — ellipses are
           * left alone so a deliberate "…" is not double-processed.
           *
           * Runs on text nodes only, so inline code and code blocks keep their
           * literal ASCII quotes.
           */
          remarkPlugins: [[smartypants, { dashes: 'oldschool', ellipses: false }]],
        },
      }}
    />
  )
}
