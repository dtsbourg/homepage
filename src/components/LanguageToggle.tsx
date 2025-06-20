'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

function LanguageIcon(props: React.ComponentPropsWithoutRef<'span'> & { children: React.ReactNode }) {
  return (
    <span
      className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
      {...props}
    >
      {props.children}
    </span>
  )
}

export function LanguageToggle() {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only show language toggle on article pages
  const isArticlePage = pathname.startsWith('/en/articles') || pathname.startsWith('/fr/articles')
  
  if (!isArticlePage) {
    return null
  }

  // Determine current locale from pathname
  const currentLocale = pathname.startsWith('/fr/articles') ? 'fr' : 'en'
  const otherLocale = currentLocale === 'en' ? 'fr' : 'en'

  const handleLocaleChange = async () => {
    if (!mounted) return

    let newPathname: string
    
    if (pathname.startsWith('/en/articles') || pathname.startsWith('/fr/articles')) {
      // For both listing pages and individual articles, replace the locale
      newPathname = pathname.replace(/^\/(en|fr)/, `/${otherLocale}`)
    } else {
      // Fallback - shouldn't happen given our condition above
      newPathname = `/${otherLocale}/articles`
    }

    // Navigate to the new path
    // If the translation doesn't exist, Next.js will handle the 404
    router.push(newPathname)
  }

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${otherLocale === 'fr' ? 'French' : 'English'}` : 'Toggle language'}
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 hover:ring-lavender dark:hover:ring-white/20"
      onClick={handleLocaleChange}
    >
      <LanguageIcon>
        {currentLocale === 'en' ? 'EN' : 'FR'}
      </LanguageIcon>
    </button>
  )
} 