import { type ReactNode } from 'react'

import CollapsibleCallout from '@/components/mdx/CollapsibleCallout'

interface CitationProps {
  title?: string
  defaultOpen?: boolean
  children: ReactNode
}

export default function Citation({
  title = 'Citation',
  defaultOpen = false,
  children,
}: CitationProps) {
  return (
    <CollapsibleCallout type="note" title={title} defaultOpen={defaultOpen}>
      {children}
    </CollapsibleCallout>
  )
}
