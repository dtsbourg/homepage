'use client'

import { useEffect, useRef } from 'react'

import { TAPE_FONTS } from './fonts'
import { SKELETONS } from './skeletons'

// Loads the measured data and the figure code, then mounts every WeightsFigure in the article.
// Rendered once, after the last figure.
export default function WeightsRuntime() {
  let ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cleanup: (() => void) | undefined
    let cancelled = false
    let root =
      ref.current?.closest<HTMLElement>('[data-mdx-content]') ?? document.body

    Promise.all([
      import('./runtime'),
      fetch('/articles/installing-a-program/data.json').then((r) => r.json()),
    ]).then(([runtime, data]) => {
      if (!cancelled) cleanup = runtime.mount(root, data, SKELETONS)
    })

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return (
    <div ref={ref} className="wi not-prose">
      <link rel="stylesheet" href={TAPE_FONTS} precedence="default" />
      <div className="tip" id="tip" hidden />
    </div>
  )
}
