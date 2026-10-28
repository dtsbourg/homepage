export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dtsbourg.me'

export const locales = ['en', 'fr'] as const

export type Locale = (typeof locales)[number]

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

// Next replaces `alternates` wholesale rather than merging it with the
// layout's, so every page that sets a canonical also needs the feed link.
export function alternates(
  canonical: string,
  languages?: Record<string, string>,
) {
  return {
    canonical,
    languages,
    types: {
      'application/rss+xml': `${siteUrl}/feed.xml`,
    },
  }
}
