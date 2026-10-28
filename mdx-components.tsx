import Image, { type ImageProps } from 'next/image'
import { type MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    Image: ({ alt, ...props }: ImageProps) => <Image alt={alt} {...props} />,
  }
}
