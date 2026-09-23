'use client'

import { useState } from 'react'
import clsx from 'clsx'

// Illustrative outputs, written by hand to show the shape of each question type.
const teams = ['billing', 'technical', 'account', 'sales']

const examples = [
  {
    label: 'Double charge',
    text: 'I was charged twice for March and our renewal is Friday. If this isn’t fixed by then I’m moving us to another provider.',
    team: [0.86, 0.06, 0.05, 0.03],
    urgency: [0.02, 0.05, 0.18, 0.45, 0.3],
    cancel: 0.82,
  },
  {
    label: 'Greyed-out button',
    text: 'The export button has been greyed out since this morning’s update. Not blocking us, just annoying.',
    team: [0.02, 0.91, 0.04, 0.03],
    urgency: [0.2, 0.52, 0.21, 0.05, 0.02],
    cancel: 0.04,
  },
  {
    label: 'More seats',
    text: 'Could someone walk me through adding five more seats to our team plan?',
    team: [0.06, 0.02, 0.34, 0.58],
    urgency: [0.48, 0.38, 0.11, 0.02, 0.01],
    cancel: 0.02,
  },
]

function argmax(values: number[]) {
  return values.indexOf(Math.max(...values))
}

function Panel({
  kind,
  question,
  children,
}: {
  kind: string
  question: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700/60">
      <p className="font-mono text-xs uppercase tracking-wider text-darkLavender dark:text-lavender">
        {kind}
      </p>
      <p className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-100">
        {question}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

export default function QuestionTypes() {
  let [active, setActive] = useState(0)
  let example = examples[active]
  let team = argmax(example.team)
  let urgency = argmax(example.urgency)

  return (
    <figure className="not-prose my-10 rounded-2xl border border-zinc-200 p-5 sm:p-8 dark:border-zinc-700/60">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Example tickets"
      >
        {examples.map((e, index) => (
          <button
            key={e.label}
            type="button"
            role="tab"
            aria-selected={index === active}
            onClick={() => setActive(index)}
            className={clsx(
              'rounded-full px-3 py-1 text-xs font-medium transition-colors motion-reduce:transition-none',
              index === active
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700',
            )}
          >
            {e.label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
        <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
          State
        </p>
        <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
          &ldquo;{example.text}&rdquo;
        </p>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <Panel kind="Choice" question="Which team should handle this?">
          <ul className="space-y-1.5">
            {teams.map((name, index) => (
              <li
                key={name}
                className="grid grid-cols-[4.5rem_1fr_2.5rem] items-center gap-2 text-xs"
              >
                <span
                  className={clsx(
                    index === team
                      ? 'font-semibold text-zinc-900 dark:text-zinc-50'
                      : 'text-zinc-500',
                  )}
                >
                  {name}
                </span>
                <span className="h-2 rounded bg-zinc-100 dark:bg-zinc-800">
                  <span
                    className={clsx(
                      'block h-2 rounded transition-[width] duration-300 motion-reduce:transition-none',
                      index === team
                        ? 'bg-darkLavender dark:bg-lavender'
                        : 'bg-zinc-300 dark:bg-zinc-600',
                    )}
                    style={{ width: `${example.team[index] * 100}%` }}
                  />
                </span>
                <span className="text-right tabular-nums text-zinc-500">
                  {example.team[index].toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel kind="Score" question="How urgent is it, from 1 to 5?">
          <div className="flex h-20 gap-1.5">
            {example.urgency.map((p, index) => (
              <div key={index} className="flex flex-1 flex-col justify-end">
                <span
                  className={clsx(
                    'w-full rounded-t transition-[height] duration-300 motion-reduce:transition-none',
                    index === urgency
                      ? 'bg-darkLavender dark:bg-lavender'
                      : 'bg-zinc-300 dark:bg-zinc-600',
                  )}
                  style={{ height: `${Math.max(p * 100, 4)}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-1 flex gap-1.5 text-center text-xs">
            {example.urgency.map((_, index) => (
              <span
                key={index}
                className={clsx(
                  'flex-1 tabular-nums',
                  index === urgency
                    ? 'font-semibold text-zinc-900 dark:text-zinc-50'
                    : 'text-zinc-500',
                )}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </Panel>

        <Panel kind="Noul" question="The customer is threatening to leave.">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
              {example.cancel.toFixed(2)}
            </span>
            <span className="text-xs text-zinc-500">probability true</span>
          </div>
          <div className="mt-3 h-2 rounded bg-zinc-100 dark:bg-zinc-800">
            <span
              className="block h-2 rounded bg-darkLavender transition-[width] duration-300 motion-reduce:transition-none dark:bg-lavender"
              style={{ width: `${example.cancel * 100}%` }}
            />
          </div>
        </Panel>
      </div>

      <pre className="mt-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-xs leading-5 text-zinc-300 dark:bg-black/40">
        {`{ "team": "${teams[team]}", "urgency": ${urgency + 1}, "threatens_to_leave": ${example.cancel.toFixed(2)} }`}
      </pre>

      <figcaption className="mt-4 text-xs leading-5 text-zinc-500">
        One call, three typed answers, each with its probabilities. What comes
        back is a value your code can use directly. The numbers are
        illustrative, written to show the shape of each answer, not real Jev
        outputs.
      </figcaption>
    </figure>
  )
}
