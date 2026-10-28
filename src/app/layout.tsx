import { type Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { getTranslatedSlugs } from '@/lib/articles'
import { siteUrl } from '@/lib/site'

import '@/styles/tailwind.css'
import '@/styles/prism.css'
import 'katex/dist/katex.min.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Dylan Bourgeois',
    default: 'Dylan Bourgeois | Crafting Artificially Intelligent Minds',
  },
  description:
    'Dylan Bourgeois is an AI researcher, engineer and entrepreneur based in New York City. Explore his thoughts on artificial intelligence, robotics, and their impact on society.',
  keywords: [
    'Dylan Bourgeois',
    'AI',
    'artificial intelligence',
    'robotics',
    'machine learning',
    'research',
    'technology',
  ],
  authors: [{ name: 'Dylan Bourgeois', url: siteUrl }],
  creator: 'Dylan Bourgeois',
  publisher: 'Dylan Bourgeois',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Dylan Bourgeois | Crafting Artificially Intelligent Minds',
    description:
      'Dylan Bourgeois is an AI researcher, engineer and entrepreneur based in New York City. Explore his thoughts on artificial intelligence, robotics, and their impact on society.',
    siteName: 'Dylan Bourgeois',
    images: [
      {
        url: `${siteUrl}/portrait.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dylan Bourgeois',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dylan Bourgeois | Crafting Artificially Intelligent Minds',
    description:
      'Dylan Bourgeois is an AI researcher, engineer and entrepreneur based in New York City. Explore his thoughts on artificial intelligence, robotics, and their impact on society.',
    images: [`${siteUrl}/portrait.jpg`],
    creator: '@dtsbourg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Canonical URLs are set per page: a canonical here would be inherited by
  // every page that doesn't override it and point them all at the homepage.
  alternates: {
    types: {
      'application/rss+xml': `${siteUrl}/feed.xml`,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const translatedSlugs = await getTranslatedSlugs()

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout translatedSlugs={translatedSlugs}>{children}</Layout>
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
