import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Every route is statically generated. The only exception is the Grounded
  // evaluate route handler, which is explicitly dynamic.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Speakable URL for the resume: "aniketagarwal.com slash resume".
      {
        source: '/resume',
        destination: '/aniket-agarwal-resume.pdf',
        permanent: false,
      },
      // V1 case-study URLs. They were live and shared; a renamed route that
      // 404s is a broken link in somebody's inbox.
      { source: '/work/two-seconds', destination: '/work/step-syncing', permanent: true },
      { source: '/work/ai-health-reports', destination: '/work/ai-health-report', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ]
  },
}

export default withBundleAnalyzer(nextConfig)
