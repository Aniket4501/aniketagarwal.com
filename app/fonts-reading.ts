import { Newsreader } from 'next/font/google'

/**
 * The reading serif, in its own module.
 *
 * next/font emits a preload link for every font declared in a module that a
 * page's import graph touches — not for every font a page actually renders.
 * While all three families were exported from one file, the homepage
 * preloaded Newsreader's 58 KB despite setting no serif anywhere on it, and
 * that download sat on the LCP critical path.
 *
 * Two deliberate omissions here:
 *
 * 1. NO italic. It would add 63 KB to carry emphasis that weight 600 already
 *    carries. On a site whose lead case study is a 25MB bundle, 171 KB of
 *    font is not defensible.
 *
 * 2. NO `axes: ['opsz']`. next/font downloads the weight axis only by default
 *    and instances it at opsz 18 — Newsreader's Text optical size, which is
 *    exactly right for 21px body copy. Requesting the optical-size axis costs
 *    2.3x the bytes (56.8 -> 128.8 KB) for a file whose default rendering is
 *    identical.
 */
const readingFont = Newsreader({
  subsets: ['latin'],
  variable: '--font-reading',
  display: 'swap',
  weight: ['400', '600'],
  style: ['normal'],
  /**
   * Not preloaded, deliberately. The largest element on every page that sets
   * prose is its heading, and headings are set in the interface grotesk — the
   * serif is not needed until the reader reaches the body, a moment later.
   * Preloading it put 58 KB in front of the paint that actually decides LCP.
   * `adjustFontFallback` (on by default) keeps the fallback metrically close,
   * so the swap costs no layout shift; measured CLS stays at 0.
   */
  preload: false,
})

export const readingFontVariable = readingFont.variable
