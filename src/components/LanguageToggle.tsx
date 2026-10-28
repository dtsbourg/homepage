'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const toggleClassName =
  'group block rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition hover:ring-lavender disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:ring-zinc-900/5 dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20 dark:disabled:hover:ring-white/10'

function LanguageLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-medium text-zinc-800 transition group-hover:text-darkLavender dark:text-zinc-200 dark:group-hover:text-lavender">
      {children}
    </span>
  )
}

function TooltipMessage({
  primary,
  secondary,
}: {
  primary: string
  secondary: string
}) {
  return (
    <>
      <div>{primary}</div>
      <div className="text-xs text-zinc-600 dark:text-zinc-400">
        {secondary}
      </div>
    </>
  )
}

export function LanguageToggle({
  translatedSlugs,
}: {
  translatedSlugs: string[]
}) {
  const pathname = usePathname()
  const match = pathname.match(/^\/(en|fr)\/articles(?:\/([^/]+))?$/)

  // Only show language toggle on article pages
  if (!match) {
    return null
  }

  const [, currentLocale, slug] = match
  const otherLocale = currentLocale === 'en' ? 'fr' : 'en'
  const otherLanguage = otherLocale === 'fr' ? 'French' : 'English'
  // Listing pages always exist in both languages
  const hasTranslation = !slug || translatedSlugs.includes(slug)
  const targetPath = pathname.replace(/^\/(en|fr)/, `/${otherLocale}`)

  const tooltip = hasTranslation ? (
    currentLocale === 'en' ? (
      <TooltipMessage
        primary="Cliquez pour la version française"
        secondary="Click here for French version"
      />
    ) : (
      <TooltipMessage
        primary="Click here for English version"
        secondary="Cliquez pour la version anglaise"
      />
    )
  ) : currentLocale === 'en' ? (
    <TooltipMessage
      primary="Version française non disponible"
      secondary="French version not available"
    />
  ) : (
    <TooltipMessage
      primary="English version not available"
      secondary="Version anglaise non disponible"
    />
  )

  const label = currentLocale === 'en' ? 'EN' : 'FR'

  return (
    <div className="group/tooltip relative">
      {hasTranslation ? (
        <Link
          href={targetPath}
          hrefLang={otherLocale}
          aria-label={`Switch to ${otherLanguage}`}
          className={toggleClassName}
        >
          <LanguageLabel>{label}</LanguageLabel>
        </Link>
      ) : (
        <button
          type="button"
          aria-label={`Translation not available in ${otherLanguage}`}
          className={toggleClassName}
          disabled
        >
          <LanguageLabel>{label}</LanguageLabel>
        </button>
      )}
      <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-max -translate-x-1/2 rounded-lg bg-white/95 px-3 py-2 text-sm font-medium text-zinc-800 opacity-0 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition-opacity duration-150 group-hover/tooltip:opacity-100 dark:bg-zinc-800/95 dark:text-zinc-200 dark:ring-white/10">
        {tooltip}
      </div>
    </div>
  )
}
