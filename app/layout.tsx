import type { Metadata } from 'next'
import { baseFontVariables } from './fonts'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { site, siteUrl } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    // Outcome first, name last. Someone searching his name finds him either
    // way; outcome-first titles perform better when links are shared.
    default: 'Aniket Agarwal — Product, consumer health',
    template: '%s | Aniket Agarwal',
  },
  description: site.defaultDescription,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

/**
 * JSON-LD Person.
 *
 * `jobTitle` is "Product Analyst" — the title in both the resume and the
 * LinkedIn export. Writing "Product Manager" here would publish a
 * machine-readable false claim to search engines and to the AI-assisted
 * screening tools recruiters increasingly use, and it is the
 * highest-consequence single word on the site.
 *
 * No `alumniOf` degree field and no GitHub `sameAs`: the degree name is in
 * three-way conflict across the two source documents, and the GitHub URL is
 * not recoverable from the resume PDF. Both are logged in CONTENT_GAPS.md.
 */
function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: 'Product Analyst',
    email: `mailto:${site.email}`,
    url: siteUrl(),
    worksFor: { '@type': 'Organization', name: site.company },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Indian Institute of Technology Kharagpur' },
    address: { '@type': 'PostalAddress', addressLocality: 'Noida', addressCountry: 'IN' },
    knowsAbout: [
      'Consumer product management',
      'Mobile application performance',
      'User engagement and habit design',
      'Applied AI product management',
      'Digital health',
    ],
    sameAs: [site.linkedin],
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={baseFontVariables}>
      <body>
        <script
          type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
