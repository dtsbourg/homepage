import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-lavender dark:text-zinc-200 dark:hover:text-lavender"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-lavender" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description: 'I’m Dylan Bourgeois. I build robots and their brains.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I’m Dylan Bourgeois. I build robots and their brains.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              We live in a world full of promises around AI and robotics. Each
              advancement promises to make us more dependent on autonomous
              agents. In order to become true companions though, robots will
              need to understand and interact with the world the way we do. They
              will need to be predictable, reliable and safe in doing so.
              Whether we achieve this in the near term will determine whether
              robots will stay on the sidelines or truly change our lives for
              the better.
            </p>
            <p>
              We need robots to understand and interact with the world the way
              we do, and I made it my career to study and build their brains to
              do so.
            </p>
            <p>
              In 2016/17, I pioneered novel unsupervised methods to measure bias
              in news coverage, mapping the media landscape and quantifying the
              impact of acquisitions on news narratives. Then at CERN, I
              leveraged early generative AI techniques, including attention, to
              efficiently filter through vast amounts of collision data in
              search of new physics.
            </p>
            <p>
              In 2018/19, I focused on developing novel methods for source code
              understanding at Stanford. These were foundational for the latest
              advancements in code generation with LLMs. Model interpretability
              and explainability were at the core of this work, both from a
              technical perspective (proposing novel methods for graph neural
              networks at NeurIPS 2019) and from a societal perspective (working
              with the legal community to draft standards and requirements,
              resulting in published work at the Privacy Law Scholars Conference
              in 2022 and currently serving in the pool of experts for the
              European Data Protection Bureau).
            </p>
            <p>
              Robotics stems as the natural extension of these abstractions,
              requiring extremely vertical system-level thinking. I was employee
              #3 at Robust.AI where I architected various critical systems, from
              robot execution models to knowledge frameworks for common sense
              reasoning. There, I realized that robotics could not scale to its
              full potential, yet. This led me to co-found Claryo to push novel
              and intelligent representations of the world.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="http://github.com/dtsbourg" icon={GitHubIcon}>
              Find me on GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/dylan-bourgeois-319ab294/"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Find me on LinkedIn
            </SocialLink>
            <SocialLink
              href="https://x.com/dtsbourg"
              icon={XIcon}
              className="mt-4"
            >
              Find me on X
            </SocialLink>
            <SocialLink
              href="mailto:contact@dtsbourg.me"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              contact [at] dtsbourg [dot] me
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
