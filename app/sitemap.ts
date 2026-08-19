import type { MetadataRoute } from 'next'
import { getCaseStudies, getLabProjects } from '@/lib/content'
import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl()
  const now = new Date()

  const staticRoutes = ['', '/work', '/approach', '/about'].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  const cases = getCaseStudies().map((c) => ({
    url: `${base}/work/${c.meta.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const lab = getLabProjects().map((p) => ({
    url: `${base}/lab/${p.meta.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...cases, ...lab]
}
