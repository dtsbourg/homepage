import { type Metadata } from 'next'
import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'

import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { GlowCard } from '@/components/GlowCard'
import { Section } from '@/components/Section'
import { MailIcon } from '@/components/SocialIcons'

import logoAzard from '@/images/logos/azard.svg'
import logoStealth from '@/images/logos/ghost.svg'
import logoPace from '@/images/logos/pace.svg'
import logoComma from '@/images/logos/comma.svg'
import logoAstra from '@/images/logos/astra.svg'
import logoTactimetry from '@/images/logos/tactimetry.svg'
import logoAttune from '@/images/logos/attune.svg'

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ChevronRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface Offering {
  name: string
  description: string
  bullets: string[]
}

interface Engagement {
  name: string
  role: string
  description: string
  link?: { url: string; label: string }
  logo: ImageProps['src']
}

function CheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function OfferingCard({ offering }: { offering: Offering }) {
  return (
    <GlowCard className="flex flex-col rounded-2xl border border-zinc-200 bg-gradient-to-b from-white to-zinc-50 p-8 dark:border-zinc-700/60 dark:from-zinc-900/60 dark:to-zinc-900/20">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
        {offering.name}
      </h2>
      <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {offering.description}
      </p>
      <ul role="list" className="mt-6 space-y-3">
        {offering.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400"
          >
            <CheckIcon className="mt-1 h-4 w-4 flex-none text-darkLavender dark:text-lavender" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </GlowCard>
  )
}

function EngagementCard({ engagement }: { engagement: Engagement }) {
  return (
    <Card as="li" className="py-6">
      <div className="flex items-center gap-4">
        <div className="relative z-10 flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <Image
            src={engagement.logo}
            alt={`${engagement.name} logo`}
            className="h-8 w-8 rounded-full object-cover"
            unoptimized
          />
        </div>
        <div>
          <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
            {engagement.link ? (
              <Card.Link
                href={engagement.link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {engagement.name}
              </Card.Link>
            ) : (
              engagement.name
            )}
          </h2>
          <p className="relative z-10 text-sm text-darkLavender dark:text-lavender">
            {engagement.role}
          </p>
        </div>
      </div>
      <Card.Description>{engagement.description}</Card.Description>
      {engagement.link && (
        <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-darkLavender dark:group-hover:text-lavender">
          <LinkIcon className="h-6 w-6 flex-none" />
          <span className="ml-2">{engagement.link.label}</span>
        </p>
      )}
    </Card>
  )
}

function EngagementsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-16 gap-y-12 sm:grid-cols-2"
      >
        {children}
      </ul>
    </Section>
  )
}

const offerings: Offering[] = [
  {
    name: 'AI Product Strategy & Engineering',
    description:
      'Understand how AI will reshape your product, then build it. From early-stage strategy to production-grade AI engineering.',
    bullets: [
      'Assess how AI changes your product landscape and competitive position',
      'Define an AI roadmap tied to real business outcomes',
      'End-to-end AI engineering: architecture, design, evaluation, and deployment',
      'Deep expertise across agentic systems, RAG, model selection, embodied AI, and spatial intelligence',
    ],
  },
  {
    name: 'AI Transformation & Enablement',
    description:
      'Help your engineering organization understand how AI changes the way they work, and equip them to thrive.',
    bullets: [
      'Talks and workshops on AI for engineering teams and leadership',
      'Developer re-training: integrating AI tools into daily workflows',
      'Process and architecture audits to identify automation opportunities',
      'Build internal AI competency so your team owns it long-term',
    ],
  },
]

const advisoryEngagements: Engagement[] = [
  {
    name: 'Azard',
    role: 'Advisor',
    description:
      'Climate risk modeling platform. Advising on AI/ML strategy for geospatial risk assessment and predictive analytics.',
    link: { url: 'https://azard.io', label: 'azard.io' },
    logo: logoAzard,
  },
  {
    name: 'Stealth',
    role: 'Advisor',
    description:
      'Building a compliance agent for regulated industries, including autonomous vehicles. Advising on AI architecture and safety-critical systems.',
    logo: logoStealth,
  },
  {
    name: 'Tactimetry',
    role: 'Advisor',
    description:
      'On-brand creative intelligence for performance marketing, helping teams find winning angles and ship high-converting creative faster. Advising on AI strategy, go-to-market, and market positioning.',
    link: { url: 'https://tactimetry.com', label: 'tactimetry.com' },
    logo: logoTactimetry,
  },
  {
    name: 'Attune',
    role: 'Advisor',
    description:
      'AI companion that helps people feel connected to mind and body, grounded in somatic therapy. Advising on AI strategy and product.',
    logo: logoAttune,
  },
]

const ventureEngagements: Engagement[] = [
  {
    name: 'Pace Ventures',
    role: 'Venture Partner',
    description:
      'Evaluating deep-tech and AI-native startups, with a focus on embodied intelligence and spatial computing.',
    link: { url: 'https://paceventures.com', label: 'paceventures.com' },
    logo: logoPace,
  },
  {
    name: 'Comma Capital',
    role: 'Fellow',
    description:
      'Early-stage fund supporting founders at the intersection of AI, infrastructure, and applied research.',
    link: { url: 'https://comma.vc', label: 'comma.vc' },
    logo: logoComma,
  },
  {
    name: 'Agent Astra',
    role: 'Angel',
    description:
      'Bringing structure to logistics complexity — tools to move containers faster and track shipments with confidence.',
    link: { url: 'https://agentastra.ai', label: 'agentastra.ai' },
    logo: logoAstra,
  },
]

export const metadata: Metadata = {
  title: 'Services',
  description:
    'AI strategy, engineering, and team enablement for companies whose processes, KPIs, and workflows were built for a world where output was scarce.',
}

export default function Services() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 [text-wrap:balance] sm:text-5xl dark:text-zinc-100">
          Output is no longer scarce. Your processes still assume it is.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          I help companies ship AI products and rebuild the processes, KPIs, and
          workflows those products make obsolete.
        </p>
        <Link
          href="/en/articles/new-ai-playbook"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/60 px-4 py-1.5 text-sm text-zinc-600 transition-colors hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkLavender focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 motion-reduce:transition-none dark:border-zinc-700/60 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-zinc-600 dark:focus-visible:ring-lavender dark:focus-visible:ring-offset-black"
        >
          Read the argument:
          <span className="font-semibold text-darkLavender dark:text-lavender">
            The new AI-native playbook
          </span>
          <ChevronRightIcon className="h-4 w-4 text-darkLavender dark:text-lavender" />
        </Link>
      </header>

      <section aria-label="Ways to work together" className="mt-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {offerings.map((offering) => (
            <OfferingCard key={offering.name} offering={offering} />
          ))}
        </div>
      </section>

      <div className="mt-16 flex flex-col items-start justify-between gap-8 rounded-2xl bg-zinc-800 p-8 sm:flex-row sm:items-center sm:p-10 dark:bg-zinc-800 dark:ring-1 dark:ring-zinc-700">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-100">
            Tell me what you&apos;re building.
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            The first reply is a straight read on scope, fit, and whether
            I&apos;m the right person for it. If I&apos;m not, I&apos;ll say so
            and point you somewhere better.
          </p>
        </div>
        <div className="flex flex-none flex-col items-start gap-3 sm:items-end">
          <a
            href={`mailto:contact@dtsbourg.me?subject=${encodeURIComponent('Working together')}`}
            className="inline-flex items-center gap-2 rounded-lg bg-darkLavender px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-darkLavender/25 transition-shadow hover:shadow-xl hover:shadow-darkLavender/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-800 motion-reduce:transition-none dark:bg-lavender dark:text-zinc-900 dark:shadow-lavender/20 dark:hover:shadow-lavender/35"
          >
            Get in touch
            <MailIcon className="h-4 w-4 fill-current" />
          </a>
          <span className="select-all text-sm text-zinc-400">
            contact@dtsbourg.me
          </span>
        </div>
      </div>

      <div className="mt-24 sm:mt-32">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          Current work
        </h2>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Companies and funds I&apos;m currently working with.
        </p>
        <div className="mt-12 space-y-24">
          <EngagementsSection title="Advisory">
            {advisoryEngagements.map((engagement, index) => (
              <EngagementCard
                key={`${engagement.name}-${index}`}
                engagement={engagement}
              />
            ))}
          </EngagementsSection>
          <EngagementsSection title="Venture">
            {ventureEngagements.map((engagement) => (
              <EngagementCard key={engagement.name} engagement={engagement} />
            ))}
          </EngagementsSection>
        </div>
      </div>
    </Container>
  )
}
