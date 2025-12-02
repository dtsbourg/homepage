import Image, { type ImageProps } from 'next/image'
import { ReactNode } from 'react'

interface FigureProps extends Omit<ImageProps, 'alt'> {
  alt: string
  caption?: string
}

function parseMarkdownLinks(text: string): ReactNode[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: ReactNode[] = []
  let lastIndex = 0
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push(
      <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer">
        {match[1]}
      </a>
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

export default function Figure({ caption, alt, ...imageProps }: FigureProps) {
  return (
    <figure className="my-8">
      <Image
        alt={alt}
        {...imageProps}
        className="rounded-lg"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-zinc-500 dark:text-zinc-400 [&_a]:text-teal-500 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-teal-600 dark:hover:[&_a]:text-teal-400">
          {parseMarkdownLinks(caption)}
        </figcaption>
      )}
    </figure>
  )
}

