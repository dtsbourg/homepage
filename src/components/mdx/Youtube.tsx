'use client'

import { useState } from 'react'
import Image from 'next/image'

interface YouTubeProps {
  id: string
  title?: string
}

export default function YouTube({
  id,
  title = 'YouTube Video Player',
}: YouTubeProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
      {!isLoaded && (
        <div
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 transition-opacity hover:bg-black/30"
          onClick={handleLoad}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 transition-transform hover:scale-110">
            <svg
              className="ml-1 h-6 w-6 fill-white"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <Image
            src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            alt={title}
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
      )}
      {isLoaded && (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${id}?autoplay=1><img src=https://img.youtube.com/vi/${id}/hqdefault.jpg alt='${title}'><span>▶</span></a>`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  )
}
