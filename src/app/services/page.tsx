import { type Metadata } from 'next'
import Image, { type ImageProps } from 'next/image'

import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { MailIcon } from '@/components/SocialIcons'

import logoAzard from '@/images/logos/azard.svg'
import logoStealth from '@/images/logos/ghost.svg'
import logoPace from '@/images/logos/pace.svg'
import logoComma from '@/images/logos/comma.svg'
import logoAstra from '@/images/logos/astra.svg'

function LightBulbIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  )
}

function UsersIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  )
}

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

interface Offering {
  name: string
  tagline: string
  icon: React.ComponentType<React.ComponentPropsWithoutRef<'svg'>>
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

function OfferingCard({ offering }: { offering: Offering }) {
  let Icon = offering.icon

  return (
    <div className="group relative rounded-2xl border border-zinc-100 p-8 transition-colors hover:border-zinc-200 dark:border-zinc-700/40 dark:hover:border-zinc-600/50">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-darkLavender/10 dark:bg-lavender/10">
          <Icon className="h-5 w-5 text-darkLavender dark:text-lavender" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            {offering.name}
          </h3>
          <p className="text-sm font-medium text-darkLavender dark:text-lavender">
            {offering.tagline}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {offering.description}
      </p>
      <ul className="mt-6 space-y-3">
        {offering.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-2.5 text-sm leading-6 text-zinc-600 dark:text-zinc-400"
          >
            <CheckIcon className="mt-1 h-4 w-4 flex-none text-darkLavender dark:text-lavender" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
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
    tagline: 'Ship AI-powered products with confidence',
    icon: LightBulbIcon,
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
    tagline: 'Prepare your team for the AI era',
    icon: UsersIcon,
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
    name: 'Stealth',
    role: 'Advisor',
    description:
      'The payroll system for your AI workforce. Advising on AI strategy, go-to-market, and market positioning.',
    logo: logoStealth,
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
    'AI advisory and consulting for companies building with embodied intelligence, spatial AI, and applied machine learning.',
}

export default function Services() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          AI strategy, from research to production.
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          I help companies turn AI ambition into shipped products. Whether
          you&apos;re deploying AI systems internally, evaluating vendors and competition,
          or defining your organization&apos;s AI strategy, I bring
          deep technical expertise and a founder&apos;s sense of urgency.
        </p>
      </header>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-2">
        {offerings.map((offering) => (
          <OfferingCard key={offering.name} offering={offering} />
        ))}
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-8 rounded-2xl bg-zinc-800 p-8 dark:bg-zinc-800/50 dark:ring-1 dark:ring-zinc-700/40 sm:flex-row sm:items-center sm:p-10">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">
            Every company has a unique situation.
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            Whether you need a one-off architecture review or an ongoing
            advisory engagement, I&apos;d love to hear what you&apos;re
            building.
          </p>
        </div>
        <a
          href="mailto:contact@dtsbourg.me"
          className="group relative inline-flex flex-none items-center gap-2 overflow-hidden rounded-lg bg-darkLavender px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-darkLavender/25 transition-all duration-300 hover:shadow-xl hover:shadow-darkLavender/30 dark:bg-lavender dark:text-zinc-900 dark:shadow-lavender/20 dark:hover:shadow-lavender/30"
        >
          <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative">Get in touch</span>
          <MailIcon className="relative h-4 w-4 fill-white transition-transform duration-300 group-hover:translate-x-0.5 dark:fill-zinc-900" />
        </a>
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
            <EngagementCard key={`${engagement.name}-${index}`} engagement={engagement} />
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
