import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllArticles,
  getArticle,
  getArticleOgImageSrc,
} from '@/lib/articles'

type Props = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const enArticles = await getAllArticles('en')
  const frArticles = await getAllArticles('fr')

  const params = []

  // Add English articles
  for (const article of enArticles) {
    params.push({ locale: 'en', slug: article.slug })
  }

  // Add French articles
  for (const article of frArticles) {
    params.push({ locale: 'fr', slug: article.slug })
  }

  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params

  if (locale !== 'en' && locale !== 'fr') {
    notFound()
  }

  try {
    const { article } = await getArticle(slug, locale)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dtsbourg.me'
    const url = `${baseUrl}/${locale}/articles/${slug}`
    const ogImageSrc = await getArticleOgImageSrc(slug, locale)
    const ogImageUrl = ogImageSrc
      ? ogImageSrc.startsWith('http')
        ? ogImageSrc
        : `${baseUrl}${ogImageSrc.startsWith('/') ? '' : '/'}${ogImageSrc}`
      : `${baseUrl}/portrait.jpg`

    return {
      title: article.title,
      description: article.description,
      keywords: [
        'Dylan Bourgeois',
        'AI',
        'artificial intelligence',
        'robotics',
        article.title.split(' ').slice(0, 3),
      ].flat(),
      authors: [{ name: article.author }],
      publisher: 'Dylan Bourgeois',
      openGraph: {
        type: 'article',
        title: article.title,
        description: article.description,
        url,
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
      alternates: {
        canonical: url,
        languages: article.hasTranslation
          ? {
              'en-US': `${baseUrl}/en/articles/${slug}`,
              'fr-FR': `${baseUrl}/fr/articles/${slug}`,
            }
          : undefined,
      },
      robots: {
        index: true,
        follow: true,
      },
    }
  } catch (error) {
    notFound()
  }
}

export default async function Article({ params }: Props) {
  const { locale, slug } = await params

  if (locale !== 'en' && locale !== 'fr') {
    notFound()
  }

  try {
    const { default: ArticleComponent, article } = await getArticle(
      slug,
      locale,
    )

    return <ArticleComponent />
  } catch (error) {
    notFound()
  }
}
