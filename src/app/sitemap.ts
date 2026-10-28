import { type MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'
import { locales, siteUrl } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/research`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...locales.map((locale) => ({
      url: `${siteUrl}/${locale}/articles`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  ]

  const articlePages: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const article of await getAllArticles(locale)) {
      articlePages.push({
        url: `${siteUrl}/${locale}/articles/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return [...staticPages, ...articlePages]
}
