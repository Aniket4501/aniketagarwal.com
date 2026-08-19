import { MDXRemote } from 'next-mdx-remote/rsc'
import { Callout } from '@/components/content/Callout'
import { Drawer } from '@/components/content/Drawer'
import { DecisionTable } from '@/components/content/DecisionTable'
import { Figure } from '@/components/content/Figure'
import { Metric, MetricDelta } from '@/components/content/Metric'
import { Flow, BeforeAfterFlow, DurationBars, Funnel, LoopDiagram } from '@/components/diagrams/Flow'
import { LaunchJourney, LaunchDurations, BundleImpact } from '@/components/diagrams/LaunchImpact'
import { LeagueLoop, StrategySpread } from '@/components/diagrams/LeagueMechanic'
import { ReportFlow, ThreeParties, KycFunnel } from '@/components/diagrams/ReportPipeline'
import { EvalScorecard } from '@/components/diagrams/EvalScorecard'

/**
 * Rendered entirely in a Server Component, so a case-study route ships zero
 * client JavaScript for its content.
 */
const components = {
  Callout,
  Drawer,
  DecisionTable,
  Figure,
  Metric,
  MetricDelta,
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
      }}
    />
  )
}
