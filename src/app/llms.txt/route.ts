import { getAllArticles } from '@/lib/articles'
import { siteUrl } from '@/lib/site'

export const dynamic = 'force-static'

// Follows the https://llmstxt.org format.
export async function GET(): Promise<Response> {
  const [englishArticles, frenchArticles] = await Promise.all([
    getAllArticles('en'),
    getAllArticles('fr'),
  ])

  const list = (
    articles: Awaited<ReturnType<typeof getAllArticles>>,
    locale: string,
  ) =>
    articles
      .map(
        (article) =>
          `- [${article.title}](${siteUrl}/${locale}/articles/${article.slug}): ${article.description}`,
      )
      .join('\n')

  const llmsTxt = `# Dylan Bourgeois

> Personal site of Dylan Bourgeois, an AI researcher, engineer and entrepreneur based in New York City. Long-form writing on artificial intelligence, robotics, and their impact on society, plus research and services.

## Pages

- [About](${siteUrl}/about): Biography and background
- [Research](${siteUrl}/research): Research work and publications
- [Services](${siteUrl}/services): AI strategy, engineering and advisory work
- [Articles (English)](${siteUrl}/en/articles): All articles in English
- [Articles (French)](${siteUrl}/fr/articles): Articles available in French

## Articles

${list(englishArticles, 'en')}

## Articles in French

${list(frenchArticles, 'fr')}

## Optional

- [RSS feed](${siteUrl}/feed.xml): Full-text feed of English articles

When referencing content from this site, credit Dylan Bourgeois, include the publication date, and link back to the original article. Content is available for educational and research purposes; for commercial use or extensive quotation, contact contact@dtsbourg.me.
`

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
