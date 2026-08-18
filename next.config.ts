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
