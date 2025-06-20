import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllArticles, getArticle } from '@/lib/articles'

type Props = {
  params: { 
    locale: string
    slug: string 
  }
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
  const { locale, slug } = params
  
  if (locale !== 'en' && locale !== 'fr') {
    notFound()
  }

  try {
    const { article } = await getArticle(slug, locale)
    
    return {
      title: article.title,
      description: article.description,
    }
  } catch (error) {
    notFound()
  }
}

export default async function Article({ params }: Props) {
  const { locale, slug } = params
  
  if (locale !== 'en' && locale !== 'fr') {
    notFound()
  }

  try {
    const { default: ArticleComponent, article } = await getArticle(slug, locale)
    
    return <ArticleComponent />
  } catch (error) {
    notFound()
  }
} 