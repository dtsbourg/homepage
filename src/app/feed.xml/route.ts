import * as cheerio from 'cheerio'
import { Feed } from 'feed'
import { getAllArticles } from '@/lib/articles'
import { siteUrl } from '@/lib/site'

// Articles render through client components (ArticleLayout, interactive MDX
// widgets), so the feed reuses the rendered page HTML instead of rendering
// the MDX itself.
async function getArticleHtml(url: string) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`${response.status} fetching ${url}`)
  }

  const $ = cheerio.load(await response.text())
  const content = $('article [data-mdx-content]').first()

  // Feed readers resolve relative URLs inconsistently, so make them absolute.
  content.find('[src], [href], [srcset]').each((_, el) => {
    const node = $(el)
    for (const attr of ['src', 'href']) {
      const value = node.attr(attr)
      if (value?.startsWith('/')) {
        node.attr(attr, new URL(value, siteUrl).toString())
      }
    }
    node.removeAttr('srcset')
  })

  return content.html()
}

export async function GET(req: Request) {
  let author = {
    name: 'Dylan Bourgeois',
    email: 'contact@dtsbourg.me',
  }

  let feed = new Feed({
    title: author.name,
    description: 'Crafting artificially intelligent minds.',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  })

  const articles = await getAllArticles('en')

  const items = await Promise.all(
    articles.map(async (article) => {
      const path = `/en/articles/${article.slug}`
      let content: string | null = null

      try {
        content = await getArticleHtml(String(new URL(path, req.url)))
      } catch (error) {
        console.error(`Feed: falling back to description for ${path}`, error)
      }

      return {
        title: article.title,
        id: `${siteUrl}${path}`,
        link: `${siteUrl}${path}`,
        description: article.description,
        content: content ?? article.description,
        author: [author],
        contributor: [author],
        date: new Date(article.date),
      }
    }),
  )

  for (const item of items) {
    feed.addItem(item)
  }

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'content-type': 'application/xml',
      'cache-control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
