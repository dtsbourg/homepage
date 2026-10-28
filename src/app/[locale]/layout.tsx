import { notFound } from 'next/navigation'

import { isLocale } from '@/lib/site'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  // The root <html> is shared by every page and stays lang="en", so mark
  // the localized subtree here.
  return <div lang={locale}>{children}</div>
}
