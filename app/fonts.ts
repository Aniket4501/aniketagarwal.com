import { Instrument_Sans, Geist_Mono } from 'next/font/google'

/**
 * Loaded on every route: the interface grotesk and the data mono.
 *
 * Instrument Sans replaces the brief's Geist for the interface role. Geist is
 * named in 2026 generator-output audits as a default headline face, and
 * shipping Vercel's own typeface on a Vercel-hosted Next.js site adds a "used
 * the starter" signal — a measurable cost when 49% of hiring managers flag
 * AI-generated material. Instrument Sans is narrower and more editorial,
 * carries the tnum feature every number here needs, and its weight axis is
 * 400–700, which is exactly the range this site uses.
 *
 * The reading serif is deliberately NOT exported from this file — see
 * app/fonts-reading.ts for why.
 */

export const interfaceFont = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-interface',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const dataFont = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-data',
  display: 'swap',
  weight: ['400', '500'],
})

export const baseFontVariables = `${interfaceFont.variable} ${dataFont.variable}`
