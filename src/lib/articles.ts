import glob from 'fast-glob'
import { join } from 'path';
import { existsSync } from 'fs';

interface Article {
  title: string
  description: string
  author: string
  date: string
  lang: string | undefined
}

export interface ArticleWithSlug extends Article {
  slug: string
  hasTranslation: boolean
}

async function importArticle(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  let { article } = (await import(`../app/articles/${articleFilename}`)) as {
    default: React.ComponentType
    article: Article
  }

  // Check if there is a translated.mdx in the same folder
  const folder = articleFilename.replace(/\/page\.mdx$/, '');
  const translatedFile = join('./src/app/articles', folder, 'translated.mdx');

  const hasTranslation = existsSync(translatedFile);

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
    hasTranslation,
    ...article,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob('*/page.mdx', {
    cwd: './src/app/articles',
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
