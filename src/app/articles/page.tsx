'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ArticlesRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Detect user's preferred language or default to English
    const userLang = navigator.language.startsWith('fr') ? 'fr' : 'en'
    router.replace(`/${userLang}/articles`)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lavender mx-auto"></div>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">Redirecting...</p>
      </div>
    </div>
  )
}
