'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AppContext } from '@/app/providers'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { type ArticleWithSlug } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArticleLayout({
  article,
  children,
}: {
  article: ArticleWithSlug
  children: React.ReactNode
}) {
  let router = useRouter()
  let { previousPathname } = useContext(AppContext)
  const [translatedContent, setTranslatedContent] =
    useState<React.ReactNode>(null)
  let [showTranslation, setShowTranslation] = useState(false)

  useEffect(() => {
    if (showTranslation) {
      import(`../app/articles/${article.slug}/translated.mdx`)
        .then((mod) => {
          setTranslatedContent(<mod.default />)
        })
        .catch((err) => {
          console.error('Failed to load translated article:', err)
        })
    } else {
      setTranslatedContent(undefined)
    }
  }, [showTranslation, article.slug])

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to articles"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </button>
          )}
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {article.title}
              </h1>
              <time
                dateTime={article.date}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">{formatDate(article.date)}</span>
              </time>
            </header>
            {article.hasTranslation && (
              <button
                type="button"
                onClick={() => setShowTranslation(!showTranslation)}
                aria-label="Show translation"
                className="group mb-8 mt-8 flex items-center justify-center rounded-full bg-white px-4 py-2 shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
              >
                {showTranslation ? (
                  <span>Cliquez ici pour lire cet article en Français</span>
                ) : (
                  <span>Click here to read this article in English</span>
                )}
              </button>
            )}
            <Prose className="mt-8" data-mdx-content>
              {translatedContent ?? children}
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}
