import { notFound } from 'next/navigation'

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params

  if (locale !== 'en' && locale !== 'fr') {
    notFound()
  }

  return children
}
