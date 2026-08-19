import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Aniket Agarwal — Product, consumer health'

export default function Image() {
  return ogImage({
    eyebrow: 'Product · Consumer health · Applied AI',
    headline: 'I find the reason a product isn\u2019t being used — then I go fix it.',
    metric: '1M+ users · 0→1 · applied AI',
  })
}
