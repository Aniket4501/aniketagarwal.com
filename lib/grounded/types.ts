/** A single analyte from a lab panel. */
export type LabValue = {
  /** Analyte name as it appears on the panel, e.g. "Haemoglobin". */
  name: string
  /** Common aliases and abbreviations the summary might use instead. */
  aliases?: string[]
  value: number
  unit: string
  /** Reference interval for this analyte. */
  refLow: number
  refHigh: number
  /**
   * Marks a value far enough outside the interval that a referral is not
   * optional. Set per case by a human, not derived — the threshold at which a
   * result becomes urgent is a clinical judgement, not an arithmetic one.
   */
  critical?: boolean
}

export type Dimension = 'grounding' | 'scope' | 'escalation' | 'readability'

/** A span of the summary that failed a check, for highlighting in the UI. */
export type Finding = {
  dimension: Dimension
  /** Character offsets into the summary text. */
  start: number
  end: number
  /** The offending text, sliced out for convenience. */
  text: string
  /** Why this failed, in one sentence a non-clinician can act on. */
  reason: string
  severity: 'violation' | 'warning'
  /** Which check produced this, so a reader can audit the rule itself. */
  rule: string
}

export type DimensionResult = {
  dimension: Dimension
  /** 0–100. */
  score: number
  /** Threshold this dimension must clear to pass. */
  threshold: number
  passed: boolean
  findings: Finding[]
  /** One line explaining how the score was computed for this input. */
  rationale: string
  /**
   * Deterministic rules run offline and cost nothing. An LLM judge runs only
   * where a deterministic check cannot reach, and only on visitor-submitted
   * text. This field says which produced the score, every time.
   */
  method: 'deterministic' | 'llm-judge'
}

export type EvalResult = {
  dimensions: DimensionResult[]
  /** Overall verdict: every dimension must pass. */
  passed: boolean
  summaryText: string
  /** Milliseconds spent in the evaluator. */
  elapsedMs: number
}

/** One hand-authorable case in the golden set. */
export type GoldenCase = {
  id: string
  /** normal | borderline | out-of-range | adversarial */
  category: 'normal' | 'borderline' | 'out-of-range' | 'adversarial'
  title: string
  labs: LabValue[]
  summary: string
  /**
   * The expected verdict.
   *
   * `labelledBy: 'synthetic-starter'` means this expectation was written when
   * the harness was built and has NOT been reviewed by a human with domain
   * judgement. That distinction is displayed in the UI and is the difference
   * between a golden set and a guess.
   */
  expected: { passed: boolean; failingDimensions: Dimension[] }
  labelledBy: 'synthetic-starter' | 'hand-labelled'
  /** Why the expectation is what it is. */
  note: string
}
