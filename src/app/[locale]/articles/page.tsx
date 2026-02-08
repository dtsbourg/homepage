import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function ChevronRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Article({
  article,
  locale,
}: {
  article: ArticleWithSlug
  locale: string
}) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title>
          <Link
            href={`/${locale}/articles/${article.slug}`}
            className="relative z-10 cursor-pointer decoration-dotted underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkLavender/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-lavender/40 dark:focus-visible:ring-offset-zinc-900"
          >
            {article.title}
          </Link>
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
        <div className="relative z-10 mt-4 flex items-center gap-3 text-sm font-medium">
          {article.hasTranslation ? (
            <>
              <Link
                href={`/en/articles/${article.slug}`}
                className="group/link relative flex items-center text-darkLavender transition hover:text-darkLavender/80 dark:text-lavender dark:hover:text-lavender/80"
              >
                <span className="absolute -inset-x-2 -inset-y-1 rounded-lg bg-zinc-100 opacity-0 transition group-hover/link:opacity-100 dark:bg-zinc-800/50" />
                <span className="relative flex items-center px-2 py-1">
                  Read in English
                  <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
                </span>
              </Link>
              <span className="text-zinc-400 dark:text-zinc-500">|</span>
              <Link
                href={`/fr/articles/${article.slug}`}
                className="group/link relative flex items-center text-darkLavender transition hover:text-darkLavender/80 dark:text-lavender dark:hover:text-lavender/80"
              >
                <span className="absolute -inset-x-2 -inset-y-1 rounded-lg bg-zinc-100 opacity-0 transition group-hover/link:opacity-100 dark:bg-zinc-800/50" />
                <span className="relative flex items-center px-2 py-1">
                  Lire en français
                  <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
                </span>
              </Link>
            </>
          ) : (
            <Link
              href={`/${locale}/articles/${article.slug}`}
              className="group/link relative flex items-center text-darkLavender transition hover:text-darkLavender/80 dark:text-lavender dark:hover:text-lavender/80"
            >
              <span className="absolute -inset-x-2 -inset-y-1 rounded-lg bg-zinc-100 opacity-0 transition group-hover/link:opacity-100 dark:bg-zinc-800/50" />
              <span className="relative flex items-center px-2 py-1">
                {locale === 'fr' ? "Lire l'article" : 'Read article'}
                <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
              </span>
            </Link>
          )}
        </div>
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
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  if (locale !== 'en' && locale !== 'fr') {
    notFound()
  }

  return {
    title: locale === 'fr' ? 'Articles' : 'Articles',
    description:
      locale === 'fr'
        ? "Un ensemble de réflexions approfondies sur l'IA, la robotique et leurs impacts sur la société, recueillies par ordre chronologique."
        : 'All of my long-form thoughts on AI, robotics and their interface with society, collected in chronological order.',
  }
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}

export default async function ArticlesIndex({ params }: Props) {
  const { locale } = await params

  if (locale !== 'en' && locale !== 'fr') {
    notFound()
  }

  let articles = await getAllArticles(locale)

  const title = locale === 'fr' ? 'Mes articles.' : 'My writing.'
  const intro =
    locale === 'fr'
      ? "Un ensemble de réflexions approfondies sur l'IA, la robotique et leurs impacts sur la société, recueillies par ordre chronologique."
      : 'All of my long-form thoughts on AI, robotics, and their interface with society, collected in chronological order.'

  return (
    <SimpleLayout title={title} intro={intro}>
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
