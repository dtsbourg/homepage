import clsx from 'clsx'

type Kind = 'zero-shot' | 'jev' | 'trained'

interface Bar {
  label: string
  kind: Kind
  value: number
}

const groups: { title: string; note: string; bars: Bar[] }[] = [
  {
    title: 'Banking77',
    note: '77 intents, where the label shows up in the words',
    bars: [
      { label: 'Zero-shot NLI', kind: 'zero-shot', value: 48.8 },
      { label: 'Newer zero-shot NLI', kind: 'zero-shot', value: 66.7 },
      { label: 'Jev, no examples', kind: 'jev', value: 80.1 },
      { label: 'Trained 22M encoder', kind: 'trained', value: 93.2 },
    ],
  },
  {
    title: 'Yelp star ratings',
    note: 'a judgment about the words',
    bars: [
      { label: 'Jev, no examples', kind: 'jev', value: 67.2 },
      { label: 'Trained classifier', kind: 'trained', value: 51.9 },
    ],
  },
]

const styles: Record<Kind, { bar: string; swatch: string; name: string }> = {
  'zero-shot': {
    bar: 'bg-zinc-300 dark:bg-zinc-700',
    swatch: 'bg-zinc-300 dark:bg-zinc-700',
    name: 'Older zero-shot methods',
  },
  jev: {
    bar: 'bg-darkLavender dark:bg-lavender',
    swatch: 'bg-darkLavender dark:bg-lavender',
    name: 'Jev',
  },
  trained: {
    bar: 'bg-turquoise dark:bg-aqua',
    swatch: 'bg-turquoise dark:bg-aqua',
    name: 'Trained on labeled data',
  },
}

export default function TrainingBenchmark() {
  return (
    <figure className="not-prose my-10 rounded-2xl border border-zinc-200 p-6 sm:p-8 dark:border-zinc-700/60">
      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
              {group.title}
              <span className="ml-2 font-normal text-zinc-500">
                {group.note}
              </span>
            </p>
            <dl className="mt-3 space-y-2">
              {group.bars.map((bar) => (
                <div
                  key={bar.label}
                  className="grid grid-cols-[9.5rem_1fr] items-center gap-3 text-sm sm:grid-cols-[11rem_1fr]"
                >
                  <dt className="truncate text-zinc-600 dark:text-zinc-400">
                    {bar.label}
                  </dt>
                  <dd className="flex items-center gap-2">
                    <span
                      className={clsx('h-5 rounded', styles[bar.kind].bar)}
                      style={{ width: `${bar.value * 0.85}%` }}
                    />
                    <span className="tabular-nums text-zinc-800 dark:text-zinc-200">
                      {bar.value.toFixed(1)}%
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-500">
        {(Object.keys(styles) as Kind[]).map((kind) => (
          <span key={kind} className="flex items-center gap-1.5">
            <span
              className={clsx('h-2.5 w-2.5 rounded-sm', styles[kind].swatch)}
            />
            {styles[kind].name}
          </span>
        ))}
      </div>
      <figcaption className="mt-4 text-xs leading-5 text-zinc-500">
        Accuracy. Figures from one published comparison (
        <a
          href="https://www.mindstudio.ai/blog/jev-vs-classic-classifiers-benchmark"
          className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          MindStudio
        </a>
        ), not an independent benchmark.
      </figcaption>
    </figure>
  )
}
