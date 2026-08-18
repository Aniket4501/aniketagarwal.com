import { Instrument_Sans, Newsreader, Geist_Mono } from 'next/font/google'

/**
 * Three roles, three families, latin only.
 *
 * Measured payload, latin subset: Instrument Sans 29.2 KB + Newsreader roman
 * 56.8 KB + Geist Mono 22.6 KB = 108.6 KB.
 *
 * Two deliberate omissions:
 *
 * 1. NO serif italic. It would add 63 KB — more than half again — to carry
 *    emphasis that weight 600 already carries. On a site whose lead case study
 *    is about a 25MB bundle, 171 KB of font is not defensible.
 *
 * 2. NO `axes: ['opsz']` on Newsreader. next/font downloads the weight axis
 *    only by default, and that file is instanced at opsz 18 — Newsreader's
 *    Text optical size, which is exactly right for 21px body copy. Requesting
 *    the optical-size axis costs 2.3x the bytes (56.8 → 128.8 KB) for a file
 *    whose default rendering is identical.
 *
 * The brief's `font-feature-settings: "ss01"` is not set: Google's Geist build
 * does not contain ss01, so the declaration would be inert. It is available
 * only on a self-subset path, which is the documented next step.
 */

export const interfaceFont = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-interface',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const readingFont = Newsreader({
  subsets: ['latin'],
  variable: '--font-reading',
  display: 'swap',
  weight: ['400', '600'],
  style: ['normal'],
})

export const dataFont = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-data',
  display: 'swap',
  weight: ['400', '500'],
})

/**
 * Loaded on every route: the interface grotesk and the data mono.
 */
export const baseFontVariables = `${interfaceFont.variable} ${dataFont.variable}`

/**
 * The reading serif is scoped to the routes that actually set long-form prose
 * — the case studies and /approach. The homepage sets no serif at all, so
 * loading Newsreader there would cost 56.8 KB for a face that never renders.
 * Next only emits a font's CSS on pages whose tree references it, so applying
 * this variable in a nested layout keeps it off the homepage's critical path.
 */
export const readingFontVariable = readingFont.variable
