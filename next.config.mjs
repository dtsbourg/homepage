import nextMDX from '@next/mdx'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['@headlessui/react', 'clsx'],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
  },
  async redirects() {
    return [
      // Article URLs from before the /en and /fr split
      {
        source:
          '/articles/:date(\\d{4}-\\d{2}-\\d{2})-:slug([^/]+)/:locale(en|fr)',
        destination: '/:locale/articles/:slug',
        permanent: true,
      },
      {
        source: '/articles/:date(\\d{4}-\\d{2}-\\d{2})-:slug([^/]+)',
        destination: '/en/articles/:slug',
        permanent: true,
      },
      {
        source: '/articles/:slug',
        destination: '/en/articles/:slug',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      // Static assets caching
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Generated routes caching
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
    ]
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    // Plugins are referenced by package name so Turbopack can serialize them
    remarkPlugins: ['remark-gfm', 'remark-math'],
    rehypePlugins: ['rehype-slug', '@mapbox/rehype-prism', 'rehype-katex'],
  },
})

export default withMDX(nextConfig)
