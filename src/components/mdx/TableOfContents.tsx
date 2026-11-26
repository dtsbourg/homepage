interface TocItem {
  title: string
  anchor: string
  level?: 1 | 2 | 3
}

interface TocGroup {
  title: string
  items: TocItem[]
}

interface TableOfContentsProps {
  items?: TocItem[]
  // Optional: sections gathered under a few part labels, laid out two parts across.
  groups?: TocGroup[]
}

function TocLink({ item }: { item: TocItem }) {
  const id = item.anchor.startsWith('#') ? item.anchor.slice(1) : item.anchor

  return (
    <a
      href={`#${id}`}
      className={`block rounded-md px-3 py-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-200 ${
        item.level === 3 ? 'ml-4' : ''
      }`}
    >
      {item.title}
    </a>
  )
}

export default function TableOfContents({
  items = [],
  groups,
}: TableOfContentsProps) {
  return (
    <nav className="not-prose my-8 rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-zinc-700/50 dark:bg-zinc-800/30">
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
      {groups ? (
        <div className="grid gap-x-8 gap-y-5 text-sm sm:grid-cols-2">
          {groups.map((group, groupIndex) => (
            <section key={groupIndex}>
              <h3 className="mb-1 flex items-baseline gap-2 px-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                <span className="tabular-nums text-zinc-400 dark:text-zinc-500">
                  {String(groupIndex + 1).padStart(2, '0')}
                </span>
                {group.title}
              </h3>
              <ul className="space-y-0.5">
                {group.items.map((item, index) => (
                  <li key={index} className="list-none">
                    <TocLink item={item} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <ul className="space-y-0.5 text-sm">
          {items.map((item, index) => (
            <li key={index} className="list-none">
              <TocLink item={item} />
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
