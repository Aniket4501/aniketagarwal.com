import fs from 'node:fs'
import path from 'node:path'
import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const FONT_DIR = path.join(process.cwd(), 'app', 'og-fonts')

/**
 * TTFs live in the repo because Satori cannot read woff2, and because an OG
 * image that depends on a network fetch at build time is one that silently
 * loses its typography the first time the fetch is rate-limited. These files
 * are build-time only — no browser downloads them. Both are SIL OFL 1.1; see
 * app/og-fonts/OFL-NOTICE.md.
 */
function font(file: string) {
  return fs.readFileSync(path.join(FONT_DIR, file))
}

const INK = '#14181A'
const PAPER = '#F6F5F2'
const SIGNAL = '#3FBF9F' // lifted from #0E6F5C for legibility on the ink ground
const MUTED = '#8A9298'
const RULE = '#2B3134'

/**
 * The link preview looks like the site: ink ground, one claim, and the metric
 * in the signature treatment. A recruiter forwarding this in a DM should see a
 * number in the thumbnail.
 */
export function ogImage({
  eyebrow,
  headline,
  metric,
}: {
  eyebrow: string
  headline: string
  metric?: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: INK,
          padding: '72px 80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Mono',
            fontSize: 22,
            letterSpacing: 3,
            color: MUTED,
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: 'flex',
            fontFamily: 'Sans',
            fontSize: headline.length > 78 ? 54 : 64,
            lineHeight: 1.12,
            letterSpacing: -1.4,
            color: PAPER,
            maxWidth: 1000,
          }}
        >
          {headline}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', width: '100%', height: 1, background: RULE }} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', fontFamily: 'Mono', fontSize: 40, color: SIGNAL }}>
              {metric ?? ''}
            </div>
            <div style={{ display: 'flex', fontFamily: 'Sans', fontSize: 26, color: MUTED }}>
              Aniket Agarwal
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Sans', data: font('Instrument-Sans.ttf'), style: 'normal', weight: 600 },
        { name: 'Mono', data: font('Geist-Mono.ttf'), style: 'normal', weight: 500 },
      ],
    },
  )
}
