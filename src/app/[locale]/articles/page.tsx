import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function Article({ article, locale }: { article: ArticleWithSlug, locale: string }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/${locale}/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  
  if (locale !== 'en' && locale !== 'fr') {
    notFound()
  }

  return {
    title: locale === 'fr' ? 'Articles' : 'Articles',
    description: locale === 'fr' 
      ? 'Toutes mes réflexions approfondies sur l\'IA, la robotique et leur interface avec la société, recueillies par ordre chronologique.'
      : 'All of my long-form thoughts on AI, robotics and their interface with society, collected in chronological order.',
  }
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}

export default async function ArticlesIndex({ params }: Props) {
  const { locale } = params
  
  if (locale !== 'en' && locale !== 'fr') {
    notFound()
  }

  let articles = await getAllArticles(locale)

  const title = locale === 'fr' ? 'Mes écrits.' : 'My writing.'
  const intro = locale === 'fr' 
    ? 'Toutes mes réflexions approfondies sur l\'IA, la robotique et leur interface avec la société, recueillies par ordre chronologique.'
    : 'All of my long-form thoughts on AI, robotics, and their interface with society, collected in chronological order.'

  return (
    <SimpleLayout
      title={title}
      intro={intro}
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <Article key={article.slug} article={article} locale={locale} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
} 