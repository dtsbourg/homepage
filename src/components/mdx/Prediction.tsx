import { ReactNode } from 'react'

interface PredictionProps {
  confidence: number // 0-100
  children: ReactNode
}

function getConfidenceColor(confidence: number) {
  if (confidence >= 80) {
    return {
      bar: 'bg-emerald-500 dark:bg-emerald-400',
      text: 'text-emerald-600 dark:text-emerald-400',
      badge:
        'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300',
    }
  }
  if (confidence >= 65) {
    return {
      bar: 'bg-amber-500 dark:bg-amber-400',
      text: 'text-amber-600 dark:text-amber-400',
      badge:
        'bg-amber-500/15 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300',
    }
  }
  return {
    bar: 'bg-rose-500 dark:bg-rose-400',
    text: 'text-rose-600 dark:text-rose-400',
    badge:
      'bg-rose-500/15 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300',
  }
}

function getConfidenceLabel(confidence: number) {
  if (confidence >= 85) return 'Very High'
  if (confidence >= 75) return 'High'
  if (confidence >= 65) return 'Moderate'
  if (confidence >= 50) return 'Medium'
  return 'Low'
}

export default function Prediction({ confidence, children }: PredictionProps) {
  const colors = getConfidenceColor(confidence)
  const label = getConfidenceLabel(confidence)

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-lavender/30 bg-lavender/5 dark:border-lavender/20 dark:bg-lavender/5">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-lavender/20 bg-gradient-to-r from-lavender/10 to-transparent px-5 py-3 dark:border-lavender/10 dark:from-lavender/10">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-darkLavender dark:bg-lavender">
          <svg
            className="h-4 w-4 text-white dark:text-zinc-900"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12,6 12,12 16,14" />
          </svg>
        </div>
        <span className="text-sm font-semibold uppercase tracking-wider text-darkLavender dark:text-lavender">
          Prediction
        </span>
      </div>

      {/* Prediction content */}
      <div className="px-5 py-4">
        <div className="text-base leading-relaxed text-zinc-800 dark:text-zinc-200 [&>p]:m-0">
          {children}
        </div>
      </div>

      {/* Confidence meter */}
      <div className="border-t border-lavender/20 bg-zinc-50/50 px-5 py-4 dark:border-lavender/10 dark:bg-zinc-900/30">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Confidence
          </span>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${colors.text}`}>
              {label}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-sm font-bold ${colors.badge}`}
            >
              {confidence}%
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div
            className={`h-full rounded-full ${colors.bar} transition-all duration-500 ease-out`}
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>
    </div>
  )
}
