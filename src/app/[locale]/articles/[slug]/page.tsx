import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  type ArticleWithSlug,
  getAllArticles,
  getArticle,
  getArticleOgImageSrc,
} from '@/lib/articles'
import { alternates, isLocale, type Locale, locales, siteUrl } from '@/lib/site'

type Props = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const params = []

  for (const locale of locales) {
    for (const article of await getAllArticles(locale)) {
      params.push({ locale, slug: article.slug })
    }
  }

  return params
}

export const dynamicParams = false

async function loadArticle(params: Props['params']) {
  const { locale, slug } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const result = await getArticle(slug, locale)

  if (!result) {
    notFound()
  }

  return { locale, ...result }
}

async function getOgImageUrl(article: ArticleWithSlug, locale: Locale) {
  const src = await getArticleOgImageSrc(article, locale)

  if (!src) {
    return `${siteUrl}/portrait.jpg`
  }

  return src.startsWith('http') ? src : new URL(src, siteUrl).toString()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, article } = await loadArticle(params)
  const path = `/${locale}/articles/${article.slug}`
  const ogImageUrl = await getOgImageUrl(article, locale)

  return {
    title: article.title,
    description: article.description,
    keywords: [
      'Dylan Bourgeois',
      'AI',
      'artificial intelligence',
      'robotics',
      ...article.title.split(' ').slice(0, 3),
    ],
    authors: [{ name: article.author }],
    publisher: 'Dylan Bourgeois',
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: path,
      siteName: 'Dylan Bourgeois',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.date,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [ogImageUrl],
      creator: '@dtsbourg',
    },
    alternates: alternates(
      path,
      article.hasTranslation
        ? {
            'en-US': `/en/articles/${article.slug}`,
            'fr-FR': `/fr/articles/${article.slug}`,
          }
        : undefined,
    ),
  }
}

export default async function ArticlePage({ params }: Props) {
  const { locale, article, Content } = await loadArticle(params)
  const url = `${siteUrl}/${locale}/articles/${article.slug}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: [await getOgImageUrl(article, locale)],
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author,
      url: siteUrl,
      jobTitle: 'AI Researcher & Engineer, Founder',
      sameAs: ['https://twitter.com/dtsbourg', 'https://github.com/dtsbourg'],
    },
    publisher: {
      '@type': 'Person',
      name: 'Dylan Bourgeois',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: article.slug.split('-').join(', '),
    inLanguage: locale,
    isAccessibleForFree: true,
    copyrightHolder: {
      '@type': 'Person',
      name: 'Dylan Bourgeois',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Content />
    </>
  )
}
