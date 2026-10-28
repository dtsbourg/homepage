import { cache } from 'react'
import glob from 'fast-glob'
import { dirname, join, relative, resolve } from 'path'
import { existsSync } from 'fs'
import { readFile } from 'fs/promises'

import { type Locale } from '@/lib/site'

export interface Article {
  title: string
  description: string
  author: string
  date: string
  lang?: string
  slug: string
}

export interface ArticleWithSlug extends Article {
  hasTranslation: boolean
  folder: string
}

// Articles live in src/app/_articles/<folder>/<locale>/page.mdx. The _ prefix
// makes it a private folder, so they are only reachable through
// /[locale]/articles/[slug] while still compiling as app router modules.
const articlesDir = join(process.cwd(), 'src', 'app', '_articles')

function mdxPath(folder: string, locale: Locale) {
  return join(articlesDir, folder, locale, 'page.mdx')
}

export const getAllArticles = cache(async function getAllArticles(
  locale: Locale = 'en',
): Promise<ArticleWithSlug[]> {
  const files = await glob(`*/${locale}/page.mdx`, { cwd: articlesDir })
  const otherLocale: Locale = locale === 'en' ? 'fr' : 'en'

  const articles = await Promise.all(
    files.map(async (file) => {
      const folder = file.split('/')[0]
      const { article } = (await import(`../app/_articles/${file}`)) as {
        article: Article
      }

      return {
        ...article,
        slug: article.slug || folder,
        folder,
        hasTranslation: existsSync(mdxPath(folder, otherLocale)),
      }
    }),
  )

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
})

export async function getArticle(slug: string, locale: Locale) {
  const article = (await getAllArticles(locale)).find((a) => a.slug === slug)

  if (!article) {
    return null
  }

  const { default: Content } = (await import(
    `../app/_articles/${article.folder}/${locale}/page.mdx`
  )) as { default: React.ComponentType }

  return { article, Content }
}

// Slugs that exist in both languages, for the header language toggle.
export async function getTranslatedSlugs() {
  return (await getAllArticles('en'))
    .filter((article) => article.hasTranslation)
    .map((article) => article.slug)
}

function toPosixPath(p: string) {
  return p.replace(/\\/g, '/')
}

type ImageImport = {
  name: string
  from: string
}

function extractImageImports(mdx: string): ImageImport[] {
  const imports: ImageImport[] = []
  const importRe =
    /^import\s+([A-Za-z0-9_$]+)\s+from\s+['"]([^'"]+\.(?:png|jpe?g|webp|gif|svg))['"];?\s*$/gm

  let match: RegExpExecArray | null
  while ((match = importRe.exec(mdx)) !== null) {
    imports.push({ name: match[1], from: match[2] })
  }

  return imports
}

function extractFirstUsedImageName(mdx: string, importNames: Set<string>) {
  const usageRe = /<(Image|Figure)\b[^>]*\bsrc=\{([A-Za-z0-9_$]+)\}[^>]*>/g

  let match: RegExpExecArray | null
  while ((match = usageRe.exec(mdx)) !== null) {
    const name = match[2]
    if (importNames.has(name)) return name
  }

  return null
}

/**
 * Returns a Next-emitted image `src` (e.g. `/_next/static/media/...`) for the first
 * image used in an article MDX, or null if none can be resolved.
 *
 * Intended for server-side metadata (OG/Twitter cards).
 */
export async function getArticleOgImageSrc(
  article: ArticleWithSlug,
  locale: Locale,
): Promise<string | null> {
  try {
    const mdxAbsPath = mdxPath(article.folder, locale)
    const mdx = await readFile(mdxAbsPath, 'utf8')
    const imageImports = extractImageImports(mdx)
    if (imageImports.length === 0) return null

    const importMap = new Map(imageImports.map((i) => [i.name, i.from]))
    const firstUsedName = extractFirstUsedImageName(
      mdx,
      new Set(importMap.keys()),
    )

    const importFrom = firstUsedName
      ? (importMap.get(firstUsedName) ?? null)
      : imageImports[0].from

    if (!importFrom) return null

    const imageAbsPath = resolve(dirname(mdxAbsPath), importFrom)
    if (!imageAbsPath.startsWith(articlesDir)) return null

    const relFromArticlesRoot = toPosixPath(relative(articlesDir, imageAbsPath))

    const mod = (await import(`../app/_articles/${relFromArticlesRoot}`)) as {
      default?: string | { src?: string }
    }

    const img = mod.default ?? mod
    if (typeof img === 'string') return img
    if (img && 'src' in img && typeof img.src === 'string') return img.src
    return null
  } catch {
    return null
  }
}
