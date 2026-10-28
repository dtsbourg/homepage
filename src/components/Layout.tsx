import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function Layout({
  children,
  translatedSlugs,
}: {
  children: React.ReactNode
  translatedSlugs: string[]
}) {
  return (
    <>
      <div className="relative flex w-full flex-col">
        <Header translatedSlugs={translatedSlugs} />
        <main className="flex-auto">{children}</main>
        <Footer />
      </div>
    </>
  )
}
