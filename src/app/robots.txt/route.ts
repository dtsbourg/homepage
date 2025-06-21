import { type MetadataRoute } from 'next'

export function GET(): Response {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dtsbourg.me'
  
  const robots: MetadataRoute.Robots = {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/thank-you'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }

  const rules = Array.isArray(robots.rules) ? robots.rules[0] : robots.rules
  const disallowList = Array.isArray(rules.disallow) ? rules.disallow : [rules.disallow]
  
  // AI-specific crawler directives
  const robotsTxt = `User-agent: ${rules.userAgent}
Allow: ${rules.allow}
${disallowList.map(path => `Disallow: ${path}`).join('\n')}

# AI Crawlers - Explicitly allow with specific directives
User-agent: GPTBot
Allow: /
Crawl-delay: 1

User-agent: OpenAI-SearchBot
Allow: /
Crawl-delay: 1

User-agent: ChatGPT-User
Allow: /

User-agent: anthropic-ai
Allow: /
Crawl-delay: 2

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /
Crawl-delay: 1

User-agent: Google-Extended
Allow: /

Sitemap: ${robots.sitemap}
Host: ${robots.host}`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
} 