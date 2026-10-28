import { type MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

// AI crawlers are allowed explicitly. A crawler that matches a named group
// ignores the '*' group, so shared disallows would need repeating there.
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: aiCrawlers, allow: '/' },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
