'use client'

import Image from 'next/image'
import { ThinkingOrb } from 'thinking-orbs'
import illustrationImage from '@/images/bg-new.svg'

// The orb draws monochrome ink on a canvas; the filter swaps that ink for a gradient,
// keeping only the ink's alpha, so it reads the same on light and dark backgrounds.
const gradient =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='#87E8EC'/><stop offset='.5' stop-color='#AEA4FE'/><stop offset='1' stop-color='#FFE1D9'/></linearGradient><rect width='64' height='64' fill='url(#g)'/></svg>",
  )

export function Illustration() {
  return (
    <div className="relative">
      <Image
        src={illustrationImage}
        alt="Dylan Bourgeois working at his desk."
        width={1200}
        height={800}
        className="rounded-2xl"
        priority={true}
        unoptimized={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {/* Sits in the scanner beam, at 162,336 of the SVG's 1312x467 viewBox. */}
      <div className="pointer-events-none absolute left-[12.35%] top-[71.95%] -translate-x-1/2 -translate-y-1/2">
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <filter
            id="orb-tint"
            x="0"
            y="0"
            width="64"
            height="64"
            filterUnits="userSpaceOnUse"
          >
            <feImage
              href={gradient}
              x="0"
              y="0"
              width="64"
              height="64"
              result="g"
            />
            <feComposite in="g" in2="SourceAlpha" operator="in" />
          </filter>
        </svg>
        <ThinkingOrb
          state="composing"
          size={64}
          speed={0.6}
          style={{ filter: 'url(#orb-tint)' }}
        />
      </div>
    </div>
  )
}
