interface TocItem {
  title: string
  anchor: string
  level?: 1 | 2 | 3
}

interface TableOfContentsProps {
  items: TocItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <nav className="my-8 rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-zinc-700/50 dark:bg-zinc-800/30">
      <div className="mb-4 flex items-center gap-2">
        <svg
          className="h-5 w-5 text-zinc-500 dark:text-zinc-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Table of Contents
        </span>
      </div>
      <ol className="space-y-0.5 text-sm">
        {items.map((item, index) => {
          const id = item.anchor.startsWith('#')
            ? item.anchor.slice(1)
            : item.anchor
          const level = item.level || 2

          return (
            <li key={index}>
              <a
                href={`#${id}`}
                className={`block rounded-md px-3 py-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-200 ${
                  level === 3 ? 'ml-4' : ''
                }`}
              >
                <span className="mr-2 font-medium text-zinc-400 dark:text-zinc-500">
                  {index + 1}.
                </span>
                {item.title}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
