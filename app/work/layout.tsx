import { readingFontVariable } from '../fonts-reading'

/**
 * The reading serif is applied here rather than in the root layout, so
 * Newsreader is only requested on the routes that actually set long-form
 * prose. The homepage sets no serif and does not pay its 56.8 KB.
 */
export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <div className={readingFontVariable}>{children}</div>
}
