import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Aniket Agarwal — Product, consumer health'

export default function Image() {
  return ogImage({
    eyebrow: 'Product · consumer health',
    headline: 'The roadmap was engagement. The app took fifteen seconds to open.',
    metric: '15s → under 2s',
  })
}
