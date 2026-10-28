import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function ArticlesRedirect() {
  const acceptLanguage = (await headers()).get('accept-language') ?? ''
  const locale = acceptLanguage.trim().toLowerCase().startsWith('fr')
    ? 'fr'
    : 'en'

  redirect(`/${locale}/articles`)
}
