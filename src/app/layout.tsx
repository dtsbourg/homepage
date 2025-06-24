import { type Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dtsbourg.me'),
  title: {
    template: '%s | Dylan Bourgeois',
    default: 'Dylan Bourgeois | Crafting Articially Intelligent Minds',
  },
  description: 'Dylan Bourgeois is an AI researcher and co-founder of Claryo. Explore his thoughts on artificial intelligence, robotics, and their impact on society.',
  keywords: ['Dylan Bourgeois', 'AI', 'artificial intelligence', 'robotics', 'machine learning', 'Claryo', 'research', 'technology'],
  authors: [{ name: 'Dylan Bourgeois', url: 'https://dtsbourg.me' }],
  creator: 'Dylan Bourgeois',
  publisher: 'Dylan Bourgeois',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dtsbourg.me',
    title: 'Dylan Bourgeois | Crafting Articially Intelligent Minds',
    description: 'Dylan Bourgeois is an AI researcher, engineer and co-founder of Claryo. Explore his thoughts on artificial intelligence, robotics, and their impact on society.',
    siteName: 'Dylan Bourgeois',
    images: [
      {
        url: '/portrait.jpg',
        width: 1200,
        height: 630,
        alt: 'Dylan Bourgeois',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dylan Bourgeois | Crafting Articially Intelligent Minds',
    description: 'Dylan Bourgeois is an AI researcher, engineer and co-founder of Claryo. Explore his thoughts on artificial intelligence, robotics, and their impact on society.',
    images: ['/portrait.jpg'],
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
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://dtsbourg.me',
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
    languages: {
      'en-US': '/en',
      'fr-FR': '/fr',
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  other: {
    'dns-prefetch': '//fonts.googleapis.com //img.youtube.com //www.youtube-nocookie.com',
    'preconnect': 'https://fonts.googleapis.com https://fonts.gstatic.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
