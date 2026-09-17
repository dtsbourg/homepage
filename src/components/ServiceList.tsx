'use client'

import { useId, useState } from 'react'
import clsx from 'clsx'

export interface Service {
  name: string
  description: string
}

export function ServiceList({ services }: { services: Service[] }) {
  let [active, setActive] = useState(0)
  let id = useId()
  let current = services[active]

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
      <div className="order-2 lg:order-1 lg:pt-14">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          <span className="tabular-nums text-zinc-800 dark:text-zinc-200">
            {String(active + 1).padStart(2, '0')}
          </span>
          {' / '}
          {String(services.length).padStart(2, '0')}
        </p>
        {/* min-h keeps the list from jumping when descriptions differ in length */}
        <div className="mt-6 min-h-[8rem]">
          {services.map((service, index) => (
            <p
              key={service.name}
              id={`${id}-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`${id}-tab-${index}`}
              hidden={index !== active}
              className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400"
            >
              {service.description}
            </p>
          ))}
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <p className="flex items-center gap-3 text-sm text-zinc-800 dark:text-zinc-200">
          <span className="h-2.5 w-2.5 rounded-full bg-darkLavender dark:bg-lavender" />
          What I can help with
        </p>
        <ul role="tablist" aria-label="Services" className="-ml-2 mt-8">
          {services.map((service, index) => (
            <li key={service.name}>
              <button
                type="button"
                role="tab"
                id={`${id}-tab-${index}`}
                aria-selected={index === active}
                aria-controls={`${id}-panel-${index}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={clsx(
                  'block rounded-lg px-2 py-1 text-left text-4xl font-bold leading-none tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkLavender motion-reduce:transition-none sm:text-5xl lg:text-6xl dark:focus-visible:ring-lavender',
                  index === active
                    ? 'text-zinc-900 dark:text-zinc-50'
                    : 'text-zinc-300 dark:text-zinc-700',
                )}
              >
                {service.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
