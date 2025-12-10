'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

function LanguageIcon(
  props: React.ComponentPropsWithoutRef<'span'> & { children: React.ReactNode },
) {
  return (
    <span
      className="text-sm font-medium text-zinc-800 transition group-hover:text-darkLavender dark:text-zinc-200 dark:group-hover:text-lavender"
      {...props}
    >
      {props.children}
    </span>
  )
}

function LoadingSpinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin text-zinc-800 dark:text-zinc-200"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export function LanguageToggle() {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasTranslation, setHasTranslation] = useState<boolean | null>(null)

  // Only show language toggle on article pages
  const isArticlePage =
    pathname.startsWith('/en/articles') || pathname.startsWith('/fr/articles')

  // Determine current locale from pathname
  const currentLocale = pathname.startsWith('/fr/articles') ? 'fr' : 'en'
  const otherLocale = currentLocale === 'en' ? 'fr' : 'en'

  // Extract slug from pathname for individual articles
  const isIndividualArticle = pathname.match(/^\/(en|fr)\/articles\/([^/]+)$/)
  const slug = isIndividualArticle ? isIndividualArticle[2] : null

  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if translation exists for individual articles
  useEffect(() => {
    if (!slug) {
      // For article listing pages, translation always exists
      setHasTranslation(true)
      return
    }

    // Check if the translation file exists
    const checkTranslation = async () => {
      const targetPath = `/${otherLocale}/articles/${slug}`

      const response = await fetch(targetPath, {
        method: 'HEAD',
      })

      setHasTranslation(response.ok)
    }

    checkTranslation()
  }, [slug, otherLocale])

  if (!isArticlePage) {
    return null
  }

  const handleLocaleChange = async () => {
    if (!mounted || isLoading || hasTranslation === false) return

    setIsLoading(true)

    let newPathname: string

    if (
      pathname.startsWith('/en/articles') ||
      pathname.startsWith('/fr/articles')
    ) {
      // For both listing pages and individual articles, replace the locale
      newPathname = pathname.replace(/^\/(en|fr)/, `/${otherLocale}`)
    } else {
      // Fallback - shouldn't happen given our condition above
      newPathname = `/${otherLocale}/articles`
    }

    // Navigate to the new path
    router.push(newPathname)

    // Reset loading state after a short delay to show feedback
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  const isDisabled = isLoading || hasTranslation === false
  const isCheckingTranslation = hasTranslation === null && slug !== null

  const getAriaLabel = () => {
    if (!mounted) return 'Toggle language'
    if (hasTranslation === false)
      return `Translation not available in ${otherLocale === 'fr' ? 'French' : 'English'}`
    return `Switch to ${otherLocale === 'fr' ? 'French' : 'English'}`
  }

  const getTitle = () => {
    if (hasTranslation === false)
      return `Translation not available in ${otherLocale === 'fr' ? 'French' : 'English'}`
    if (isCheckingTranslation) return 'Checking translation availability...'
    return `Switch to ${otherLocale === 'fr' ? 'French' : 'English'}`
  }

  const getTooltipMessage = () => {
    if (hasTranslation === false) {
      if (currentLocale === 'en') {
        return (
          <>
            <div>Version française non disponible</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">
              French version not available
            </div>
          </>
        )
      }
      return (
        <>
          <div>English version not available</div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">
            Version anglaise non disponible
          </div>
        </>
      )
    }

    if (currentLocale === 'en') {
      return (
        <>
          <div>Cliquez pour la version française</div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">
            Click here for French version
          </div>
        </>
      )
    }
    return (
      <>
        <div>Click here for English version</div>
        <div className="text-xs text-zinc-600 dark:text-zinc-400">
          Cliquez pour la version anglaise
        </div>
      </>
    )
  }

  // Wrap in div with hover tooltip
  return (
    <div className="group/tooltip relative">
      <button
        type="button"
        aria-label={getAriaLabel()}
        className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition hover:ring-lavender disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:ring-zinc-900/5 dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20 dark:disabled:hover:ring-white/10"
        onClick={handleLocaleChange}
        disabled={isDisabled}
      >
        {isLoading || isCheckingTranslation ? (
          <LoadingSpinner />
        ) : (
          <LanguageIcon>{currentLocale === 'en' ? 'EN' : 'FR'}</LanguageIcon>
        )}
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-max -translate-x-1/2 rounded-lg bg-white/95 px-3 py-2 text-sm font-medium text-zinc-800 opacity-0 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition-opacity duration-150 group-hover/tooltip:opacity-100 dark:bg-zinc-800/95 dark:text-zinc-200 dark:ring-white/10">
        {getTooltipMessage()}
      </div>
    </div>
  )
}
