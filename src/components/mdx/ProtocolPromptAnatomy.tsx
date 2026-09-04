'use client'

import { useMemo, useState } from 'react'
import clsx from 'clsx'

type RegionKey = 'S' | 'O' | 'P'

interface Triad {
  freedom: string
  gate: string
  ledger: string
}

interface Block {
  name: string
  short: string
  words: number
  region: RegionKey
  note?: string
  triad?: Triad
}

const REGIONS: Record<
  RegionKey,
  { label: string; cell: string; active: string; swatch: string; text: string }
> = {
  S: {
    label: 'Science and tooling',
    cell: 'border-darkLavender/30 bg-darkLavender/10 hover:bg-darkLavender/20 dark:border-lavender/25 dark:bg-lavender/10 dark:hover:bg-lavender/20',
    active:
      'border-darkLavender/80 bg-darkLavender/25 dark:border-lavender/80 dark:bg-lavender/25',
    swatch: 'bg-darkLavender dark:bg-lavender',
    text: 'text-darkLavender dark:text-lavender',
  },
  O: {
    label: 'Orchestration and verification',
    cell: 'border-turquoise/30 bg-turquoise/10 hover:bg-turquoise/20 dark:border-aqua/25 dark:bg-aqua/10 dark:hover:bg-aqua/20',
    active:
      'border-turquoise/80 bg-turquoise/25 dark:border-aqua/80 dark:bg-aqua/25',
    swatch: 'bg-turquoise dark:bg-aqua',
    text: 'text-turquoise dark:text-aqua',
  },
  P: {
    label: 'Operations',
    cell: 'border-amber-600/30 bg-amber-600/10 hover:bg-amber-600/20 dark:border-amber-300/25 dark:bg-amber-300/10 dark:hover:bg-amber-300/20',
    active:
      'border-amber-600/80 bg-amber-600/25 dark:border-amber-300/80 dark:bg-amber-300/25',
    swatch: 'bg-amber-600 dark:bg-amber-300',
    text: 'text-amber-700 dark:text-amber-300',
  },
}

const BLOCKS: Block[] = [
  {
    name: 'Compute',
    short: 'Compute',
    words: 2445,
    region: 'P',
    note: 'rate card, governor, pacing bands',
    triad: {
      freedom: 'How to allocate across methods and targets.',
      gate: 'submit_gate() refuses when ceiling == 0.',
      ledger: '/ledger/job_metadata/{frame_id}.jsonl, one append per dispatch.',
    },
  },
  {
    name: 'Verification',
    short: 'Verification',
    words: 2205,
    region: 'O',
    note: 'tool roster, PASS gates, ledgers',
    triad: {
      freedom: 'Which tools to try, in what mix.',
      gate: 'No PASS row means the method must not dispatch.',
      ledger:
        'Model-roster ledger: model, image_id, s/design, $/design, validated_at.',
    },
  },
  {
    name: 'Deliverables',
    short: 'Deliverables',
    words: 2186,
    region: 'P',
    note: 'docs, molecules, data, status',
  },
  {
    name: 'Timing',
    short: 'Timing',
    words: 942,
    region: 'O',
    note: 'clock discipline, dormancy, hang vs compaction',
  },
  {
    name: 'Additional co-folding scoring considerations',
    short: 'Co-folding scoring',
    words: 926,
    region: 'S',
  },
  {
    name: 'Delegation',
    short: 'Delegation',
    words: 882,
    region: 'O',
    note: 'architecture, watchdog, budget singletons',
    triad: {
      freedom: 'Design your own agent architecture.',
      gate: 'Orchestrator-frame tokens above one third of campaign total is an architecture failure.',
      ledger: 'Post the delegation architecture within the first hour.',
    },
  },
  {
    name: 'Models and Tools',
    short: 'Models & tools',
    words: 851,
    region: 'S',
  },
  { name: 'Task', short: 'Task', words: 826, region: 'S' },
  {
    name: 'Provenance keys',
    short: 'Provenance keys',
    words: 762,
    region: 'S',
    note: 'frozen vocab, recompute-at-write',
    triad: {
      freedom: 'How to generate designs.',
      gate: 'The sheet writer recomputes every gate at write time; a mismatch halts.',
      ledger: 'Frozen method_vocab.json enum, no free text.',
    },
  },
  {
    name: 'Target-fold mimics',
    short: 'Target-fold mimics',
    words: 520,
    region: 'S',
    note: 'the named degenerate solution',
  },
  {
    name: 'Note on output formats',
    short: 'Output formats',
    words: 493,
    region: 'S',
  },
  {
    name: 'Timeline',
    short: 'Timeline',
    words: 310,
    region: 'O',
    note: 'no reward for finishing early',
  },
  {
    name: 'Round discipline',
    short: 'Round discipline',
    words: 274,
    region: 'S',
  },
  {
    name: 'Behavior',
    short: 'Behavior',
    words: 269,
    region: 'O',
    note: 'claims trace to artifacts',
    triad: {
      freedom: 'What to claim in any report.',
      gate: 'Every identifier must be the literal output of a fetch this session.',
      ledger: 'The fetched artifact itself.',
    },
  },
  {
    name: 'Two seed-tiers of scores',
    short: 'Seed tiers',
    words: 217,
    region: 'S',
  },
  {
    name: 'The −20 pp floor is the scale-up trigger',
    short: '−20pp trigger',
    words: 207,
    region: 'P',
  },
  { name: 'Resources', short: 'Resources', words: 171, region: 'S' },
  {
    name: 'Creativity and perseverance',
    short: 'Creativity',
    words: 164,
    region: 'O',
    note: 'the bandit',
    triad: {
      freedom: 'Which target, which method, when to pivot.',
      gate: 'Each retry must differ in a way you can name.',
      ledger: 'Living ideas document, ranked by expected value.',
    },
  },
  { name: 'Isolation', short: 'Isolation', words: 157, region: 'O' },
  {
    name: 'Calibration',
    short: 'Calibration',
    words: 155,
    region: 'S',
    note: 'ceiling/floor bands',
    triad: {
      freedom: 'Choose the control panel members.',
      gate: 'A known binder must separate from constructed negatives, on the same instrument.',
      ledger: 'Calibration runs report raw scores only.',
    },
  },
  {
    name: 'Sequence feasibility',
    short: 'Sequence feasibility',
    words: 149,
    region: 'S',
  },
  {
    name: 'Sub-agents',
    short: 'Sub-agents',
    words: 135,
    region: 'O',
    note: 'one method per agent',
  },
  {
    name: 'Literature',
    short: 'Literature',
    words: 121,
    region: 'O',
    note: 'triggered, not cadenced',
  },
  { name: 'Safety', short: 'Safety', words: 102, region: 'O' },
  {
    name: 'Addressing',
    short: 'Addressing',
    words: 90,
    region: 'O',
    note: 'who this binds, at what depth',
  },
  { name: 'Logistics', short: 'Logistics', words: 89, region: 'O' },
  {
    name: 'Autonomy',
    short: 'Autonomy',
    words: 79,
    region: 'O',
    note: 'do not ask for approval',
  },
  { name: 'Volume layout', short: 'Volume layout', words: 69, region: 'P' },
  { name: 'Slack input', short: 'Slack input', words: 62, region: 'P' },
  {
    name: 'Generation must stay paced with scoring',
    short: 'Generation pacing',
    words: 61,
    region: 'P',
  },
  {
    name: 'Unavailability',
    short: 'Unavailability',
    words: 59,
    region: 'O',
    note: 'assume your knowledge is stale',
  },
  {
    name: 'Data Generation and Analysis',
    short: 'Data gen',
    words: 33,
    region: 'S',
  },
  {
    name: 'Redundancy',
    short: 'Redundancy',
    words: 29,
    region: 'S',
    note: 'cluster at 90% identity',
  },
]

const ORDER: RegionKey[] = ['S', 'O', 'P']
const W = 160
const H = 100

interface Placed extends Block {
  x: number
  y: number
  w: number
  h: number
}

/** Squarified treemap: lay items into the rect, keeping cells near-square. */
function squarify(
  items: Block[],
  x0: number,
  y0: number,
  w0: number,
  h0: number,
): Placed[] {
  const out: Placed[] = []
  const sorted = [...items].sort((a, b) => b.words - a.words)
  const total = sorted.reduce((sum, d) => sum + d.words, 0)
  if (total <= 0 || w0 <= 0 || h0 <= 0) return out

  const scale = (w0 * h0) / total
  let x = x0
  let y = y0
  let w = w0
  let h = h0
  let row: Block[] = []
  let rowSum = 0

  const ratio = (candidate: Block[], sum: number) => {
    if (candidate.length === 0 || sum <= 0) return Infinity
    const side = Math.min(w, h)
    const thickness = (sum * scale) / side
    if (thickness <= 0) return Infinity
    let worst = 1
    for (const item of candidate) {
      const length = (item.words * scale) / thickness
      if (length <= 0) return Infinity
      worst = Math.max(worst, thickness / length, length / thickness)
    }
    return worst
  }

  const flush = () => {
    const side = Math.min(w, h)
    const thickness = (rowSum * scale) / side
    if (w <= h) {
      let cx = x
      for (const item of row) {
        const cw = (item.words * scale) / thickness
        out.push({ ...item, x: cx, y, w: cw, h: thickness })
        cx += cw
      }
      y += thickness
      h -= thickness
    } else {
      let cy = y
      for (const item of row) {
        const ch = (item.words * scale) / thickness
        out.push({ ...item, x, y: cy, w: thickness, h: ch })
        cy += ch
      }
      x += thickness
      w -= thickness
    }
    row = []
    rowSum = 0
  }

  for (const item of sorted) {
    const nextRow = [...row, item]
    const nextSum = rowSum + item.words
    if (row.length === 0 || ratio(nextRow, nextSum) <= ratio(row, rowSum)) {
      row = nextRow
      rowSum = nextSum
    } else {
      flush()
      row = [item]
      rowSum = item.words
    }
  }
  if (row.length > 0) flush()
  return out
}

export default function ProtocolPromptAnatomy() {
  const [activeName, setActiveName] = useState<string | null>(null)

  const { cells, regions, total } = useMemo(() => {
    const total = BLOCKS.reduce((sum, b) => sum + b.words, 0)
    const cells: Placed[] = []
    const regions: {
      key: RegionKey
      words: number
      pct: number
      x: number
      w: number
      count: number
    }[] = []
    let cursor = 0

    for (const key of ORDER) {
      const blocks = BLOCKS.filter((b) => b.region === key)
      const words = blocks.reduce((sum, b) => sum + b.words, 0)
      const width = (words / total) * W
      regions.push({
        key,
        words,
        pct: (words / total) * 100,
        x: cursor,
        w: width,
        count: blocks.length,
      })
      cells.push(...squarify(blocks, cursor, 0, width, H))
      cursor += width
    }

    return { cells, regions, total }
  }, [])

  const active = cells.find((c) => c.name === activeName) ?? null

  return (
    <figure className="not-prose my-10">
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-700/60 dark:bg-zinc-900/40">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            One system prompt, 16,040 words, 33 labelled blocks
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Area is word count. Select a block for detail.
          </p>
        </div>

        <ul
          role="list"
          className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-600 dark:text-zinc-400"
        >
          {regions.map((region) => (
            <li key={region.key} className="flex items-center gap-2">
              <span
                className={clsx(
                  'h-2.5 w-2.5 flex-none rounded-sm',
                  REGIONS[region.key].swatch,
                )}
              />
              <span>
                {REGIONS[region.key].label}{' '}
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {region.pct.toFixed(1)}%
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="relative mt-4 h-[420px] w-full sm:h-[500px]">
          {cells.map((cell) => {
            const region = REGIONS[cell.region]
            const isActive = cell.name === activeName
            const showLabel = cell.w >= 13 && cell.h >= 7
            const showPct = cell.w >= 22 && cell.h >= 14
            return (
              <button
                key={cell.name}
                type="button"
                onClick={() => setActiveName(isActive ? null : cell.name)}
                onMouseEnter={() => setActiveName(cell.name)}
                onFocus={() => setActiveName(cell.name)}
                aria-label={`${cell.name}, ${cell.words} words, ${((cell.words / total) * 100).toFixed(1)} percent`}
                aria-pressed={isActive}
                className="absolute p-[2px] focus:outline-none"
                style={{
                  left: `${(cell.x / W) * 100}%`,
                  top: `${(cell.y / H) * 100}%`,
                  width: `${(cell.w / W) * 100}%`,
                  height: `${(cell.h / H) * 100}%`,
                }}
              >
                <span
                  className={clsx(
                    'flex h-full w-full flex-col items-start justify-start overflow-hidden rounded-md border px-2 py-1.5 text-left transition-colors',
                    isActive ? region.active : region.cell,
                  )}
                >
                  {showLabel && (
                    <span className="line-clamp-2 text-[11px] font-medium leading-tight text-zinc-800 dark:text-zinc-100">
                      {cell.short}
                    </span>
                  )}
                  {showPct && (
                    <span className="mt-0.5 text-[10px] tabular-nums text-zinc-600 dark:text-zinc-400">
                      {((cell.words / total) * 100).toFixed(1)}%
                    </span>
                  )}
                  {cell.triad && showLabel && (
                    <span
                      aria-hidden="true"
                      className={clsx(
                        'mt-auto h-1.5 w-1.5 rounded-full',
                        region.swatch,
                      )}
                    />
                  )}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-4 min-h-[8.5rem] rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700/60 dark:bg-zinc-900/60">
          {active ? (
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  {active.name}
                </h4>
                <span className={clsx('text-xs', REGIONS[active.region].text)}>
                  {REGIONS[active.region].label}
                </span>
                <span className="text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
                  {active.words.toLocaleString()} words ·{' '}
                  {((active.words / total) * 100).toFixed(1)}%
                </span>
              </div>
              {active.note && (
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {active.note}
                </p>
              )}
              {active.triad ? (
                <dl className="mt-3 grid gap-2 sm:grid-cols-3">
                  {(
                    [
                      ['Freedom', active.triad.freedom],
                      ['Gate', active.triad.gate],
                      ['Ledger', active.triad.ledger],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        {label}
                      </dt>
                      <dd className="mt-0.5 text-xs leading-5 text-zinc-700 dark:text-zinc-300">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-3 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                  This block does not publish an explicit freedom / gate /
                  ledger triad in the released prompt. The seven marked with a
                  dot do.
                </p>
              )}
            </div>
          ) : (
            <div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                The three largest blocks are compute, verification and
                deliverables. Together they are 42.6% of the document, and not
                one of them is about biology.
              </p>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                Hover, tap or tab through a block to read it. Seven blocks
                (marked with a dot) publish an explicit freedom / gate / ledger
                triad.
              </p>
            </div>
          )}
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
        Composition of the released single-target protocol prompt (15-PGDH),
        segmented by its own label structure. Percentages are computed from the
        word counts and sum to 100.
      </figcaption>
    </figure>
  )
}
