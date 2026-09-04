'use client'

import { useRef, type PointerEvent, type ReactNode } from 'react'
import clsx from 'clsx'

export function GlowCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  let ref = useRef<HTMLDivElement>(null)

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    let element = ref.current
    if (!element) return
    let rect = element.getBoundingClientRect()
    element.style.setProperty('--gx', `${event.clientX - rect.left}px`)
    element.style.setProperty('--gy', `${event.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={clsx(
        'glow-card [--glow:100_97_206] dark:[--glow:174_164_254]',
        className,
      )}
    >
      {children}
    </div>
  )
}
