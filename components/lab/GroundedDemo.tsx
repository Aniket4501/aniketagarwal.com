'use client'

import { useMemo, useState } from 'react'
import baseline from '@/public/grounded-baseline.json'
import type { DimensionResult, Finding, LabValue } from '@/lib/grounded/types'

type Case = {
  id: string
  category: string
  title: string
  note: string
  labs: LabValue[]
  summary: string
  expected: { passed: boolean; failingDimensions: string[] }
  actual: { passed: boolean; failingDimensions: string[] }
  dimensions: DimensionResult[]
  dimensionsAgree: boolean
}

const CASES = baseline.cases as unknown as Case[]

const CATEGORY_LABEL: Record<string, string> = {
  normal: 'In range',
  borderline: 'Borderline',
  'out-of-range': 'Out of range',
  adversarial: 'Adversarial',
}

/**
 * The demo runs entirely in the browser.
 *
 * Every sample result is pre-computed at build time by
 * scripts/run-golden-set.ts and shipped as static JSON, so selecting a case is
 * a render, not a request: instant, offline, and free. Text a visitor writes
 * themselves is scored by the same rules, loaded on demand — the evaluator is
 * deterministic, so there is no model to call and no key to enter.
 *
 * A demo that needs setup gets zero engagement from a reviewer with four
 * minutes.
 */
export function GroundedDemo() {
  const [selected, setSelected] = useState(CASES[0]?.id ?? '')
  const [custom, setCustom] = useState<string | null>(null)
  const [customResult, setCustomResult] = useState<DimensionResult[] | null>(null)
  const [running, setRunning] = useState(false)

  const active = useMemo(() => CASES.find((c) => c.id === selected) ?? CASES[0], [selected])

  if (!active) return null

  const dimensions = custom !== null && customResult ? customResult : active.dimensions
  const text = custom !== null ? custom : active.summary
  const findings: Finding[] = dimensions.flatMap((d) => d.findings)
  const passed = dimensions.every((d) => d.passed)

  async function evaluateCustom(value: string) {
    setCustom(value)
    if (!active) return
    setRunning(true)
    // Loaded on demand so the rules engine is not in the initial payload.
    const { evaluate } = await import('@/lib/grounded/evaluate')
    setCustomResult(evaluate(value, active.labs).dimensions)
    setRunning(false)
  }

  function reset() {
    setCustom(null)
    setCustomResult(null)
  }

  return (
    <div className="my-5 flex flex-col gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      {/* ---- input ---- */}
      <div className="flex flex-col gap-2.5 bg-[var(--color-paper-raised)] p-2.5">
        <div className="flex flex-col gap-1">
          <label htmlFor="gd-case" className="eyebrow">
            Sample case
          </label>
          <select
            id="gd-case"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value)
              reset()
            }}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-rule-strong)] bg-[var(--color-paper)] px-1.5 py-1 font-[family-name:var(--font-mono)] text-[var(--text-sm)]"
          >
            {CASES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} · {CATEGORY_LABEL[c.category] ?? c.category} — {c.title}
              </option>
            ))}
          </select>
          <p className="text-[var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
            {active.note}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="eyebrow">Source panel</p>
          <ul className="flex flex-col gap-0.5 font-[family-name:var(--font-mono)] text-[var(--text-xs)] tabular-nums">
            {active.labs.map((l) => {
              const out = l.value < l.refLow || l.value > l.refHigh
              return (
                <li key={l.name} className="flex flex-wrap items-baseline gap-x-1">
                  <span className="text-[var(--color-ink)]">{l.name}</span>
                  <span className={out ? 'text-[var(--color-flag)]' : 'text-[var(--color-ink)]'}>
                    {l.value} {l.unit}
                  </span>
                  <span className="text-[var(--color-muted)]">
                    ref {l.refLow}–{l.refHigh}
                    {out ? ' · outside' : ''}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="gd-text" className="eyebrow">
            Generated summary {custom !== null ? '(edited)' : ''}
          </label>
          <textarea
            id="gd-text"
            value={text}
            onChange={(e) => void evaluateCustom(e.target.value)}
            rows={7}
            spellCheck={false}
            className="w-full resize-y rounded-[var(--radius-sm)] border border-[var(--color-rule-strong)] bg-[var(--color-paper)] p-1.5 text-[var(--text-sm)] leading-relaxed"
          />
          <div className="flex items-center gap-1.5">
            <p className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)]">
              Edit it. Scores update as you type — no server, no key.
            </p>
            {custom !== null ? (
              <button
                type="button"
                onClick={reset}
                className="rounded-[var(--radius-sm)] border border-[var(--color-rule-strong)] px-1 py-0.25 font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)] hover:border-[var(--color-signal)] hover:text-[var(--color-signal)]"
              >
                reset
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* ---- scorecard ---- */}
      <div className="flex flex-col gap-2.5 bg-[var(--color-paper-raised)] p-2.5">
        <div className="flex items-baseline justify-between gap-1.5">
          <p className="eyebrow">Verdict</p>
          <p
            className={`font-[family-name:var(--font-mono)] text-[var(--text-lg)] ${
              passed ? 'text-[var(--color-signal)]' : 'text-[var(--color-flag)]'
            }`}
            aria-live="polite"
          >
            {running ? 'scoring…' : passed ? 'pass' : 'fail'}
          </p>
        </div>

        <ul className="flex flex-col gap-1.5">
          {dimensions.map((d) => (
            <li
              key={d.dimension}
              className="flex flex-col gap-0.5 border-t border-[var(--color-rule)] pt-1.5"
            >
              <div className="flex items-baseline justify-between gap-1.5">
                <span className="font-[family-name:var(--font-mono)] text-[var(--text-sm)]">
                  {d.dimension}
                </span>
                <span
                  className={`font-[family-name:var(--font-mono)] text-[var(--text-sm)] tabular-nums ${
                    d.passed ? 'text-[var(--color-signal)]' : 'text-[var(--color-flag)]'
                  }`}
                >
                  {d.score} / {d.threshold}
                </span>
              </div>
              <p className="text-[var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
                {d.rationale}
              </p>
            </li>
          ))}
        </ul>

        {findings.length > 0 ? (
          <div className="flex flex-col gap-1">
            <p className="eyebrow">Failing spans</p>
            <p className="text-[var(--text-sm)] leading-relaxed">
              <Highlighted text={text} findings={findings} />
            </p>
            <ul className="flex flex-col gap-0.75 pt-0.5">
              {findings.map((f, i) => (
                <li
                  key={i}
                  className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] leading-relaxed text-[var(--color-muted)]"
                >
                  <span className="text-[var(--color-flag)]">{f.rule}</span>
                  {f.text ? <> · &ldquo;{f.text}&rdquo;</> : null} · {f.reason}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {custom === null ? (
          <p className="border-t border-[var(--color-rule)] pt-1.5 font-[family-name:var(--font-mono)] text-[var(--text-xs)] leading-relaxed text-[var(--color-muted)]">
            Label says{' '}
            {active.expected.failingDimensions.length
              ? active.expected.failingDimensions.join(', ')
              : 'pass'}
            . Rules say{' '}
            {active.actual.failingDimensions.length
              ? active.actual.failingDimensions.join(', ')
              : 'pass'}
            . {active.dimensionsAgree ? 'They agree.' : 'They disagree.'}
          </p>
        ) : null}
      </div>
    </div>
  )
}

function Highlighted({ text, findings }: { text: string; findings: Finding[] }) {
  const spans = findings
    .filter((f) => f.end > f.start && f.end <= text.length)
    .sort((a, b) => a.start - b.start)

  const out: React.ReactNode[] = []
  let cursor = 0
  spans.forEach((f, i) => {
    if (f.start < cursor) return
    if (f.start > cursor) out.push(text.slice(cursor, f.start))
    out.push(
      <mark
        key={i}
        className="bg-[var(--color-flag)]/15 text-[var(--color-flag)] underline decoration-[var(--color-flag)]/50 decoration-wavy underline-offset-2"
      >
        {text.slice(f.start, f.end)}
      </mark>,
    )
    cursor = f.end
  })
  if (cursor < text.length) out.push(text.slice(cursor))
  return <>{out}</>
}
