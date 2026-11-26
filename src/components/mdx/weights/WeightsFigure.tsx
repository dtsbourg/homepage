import clsx from 'clsx'

import { SKELETONS } from './skeletons'
import './weights.css'

// One figure of "Installing a program in a language model". The static markup comes from SKELETONS;
// WeightsRuntime, placed once at the end of the article, brings every figure on the page to life.
export default function WeightsFigure({
  name,
  wide,
  hero,
  children,
}: {
  name: string
  wide?: boolean
  hero?: boolean
  children?: React.ReactNode
}) {
  return (
    <figure
      id={`fig-${name}`}
      data-fig={name}
      className={clsx('wi fig not-prose', wide && 'wide', hero && 'hero')}
    >
      <div
        className="fig-body"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: SKELETONS[name] }}
      />
      {children && <figcaption>{children}</figcaption>}
    </figure>
  )
}
