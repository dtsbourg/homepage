import { ReactNode } from 'react'

type CalloutType = 'info' | 'warning' | 'tip' | 'error' | 'quote' | 'note'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

const icons: Record<CalloutType, ReactNode> = {
  info: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  ),
  tip: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.75.75h2.5a.75.75 0 00.75-.75v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.863 17.414a.75.75 0 00-.226 1.483 9.066 9.066 0 002.726 0 .75.75 0 00-.226-1.483 7.553 7.553 0 01-2.274 0z" />
    </svg>
  ),
  error: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
  ),
  quote: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4.5 3A2.5 2.5 0 002 5.5v5.006c0 .982.57 1.873 1.46 2.287l3.04 1.414V17a1 1 0 001.707.707l2.56-2.56c.184-.183.432-.286.692-.286H17.5a2.5 2.5 0 002.5-2.5V5.5A2.5 2.5 0 0017.5 3h-13zM6 7.75A.75.75 0 016.75 7h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 016 7.75zm.75 2.25a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5zM12 7.75a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5z" clipRule="evenodd" />
    </svg>
  ),
  note: null,
}

const styles: Record<CalloutType, { container: string; icon: string }> = {
  info: {
    container: 'border-sky-500/30 bg-sky-500/10 dark:border-sky-400/30 dark:bg-sky-400/10',
    icon: 'text-sky-600 dark:text-sky-400',
  },
  warning: {
    container: 'border-amber-500/30 bg-amber-500/10 dark:border-amber-400/30 dark:bg-amber-400/10',
    icon: 'text-amber-600 dark:text-amber-400',
  },
  tip: {
    container: 'border-emerald-500/30 bg-emerald-500/10 dark:border-emerald-400/30 dark:bg-emerald-400/10',
    icon: 'text-emerald-600 dark:text-emerald-400',
  },
  error: {
    container: 'border-rose-500/30 bg-rose-500/10 dark:border-rose-400/30 dark:bg-rose-400/10',
    icon: 'text-rose-600 dark:text-rose-400',
  },
  quote: {
    container: 'border-violet-500/30 bg-violet-500/10 dark:border-violet-400/30 dark:bg-violet-400/10',
    icon: 'text-violet-600 dark:text-violet-400',
  },
  note: {
    container: 'border-zinc-500/30 bg-zinc-500/10 dark:border-zinc-400/30 dark:bg-zinc-400/10',
    icon: '',
  },
}

export default function Callout({ type = 'info', title, children }: CalloutProps) {
  const style = styles[type]
  const icon = icons[type]

  return (
    <div className={`my-6 rounded-lg border-l-4 p-4 ${style.container}`}>
      <div className={`flex ${icon ? 'gap-3' : ''}`}>
        {icon && <div className={`flex-shrink-0 ${style.icon}`}>{icon}</div>}
        <div className="min-w-0 flex-1">
          {title && (
            <p className="mb-1 font-semibold text-zinc-900 dark:text-zinc-100">
              {title}
            </p>
          )}
          <div className="text-sm text-zinc-700 dark:text-zinc-300 [&>p]:m-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

