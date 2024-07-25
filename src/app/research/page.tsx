import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ResearchSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Publication({
  title,
  description,
  authors,
  event,
  ctas,
}: {
  title: string
  description: string
  authors: string
  event: string
  ctas: Array<{
    title: string
    href: string
  }>
}) {
  return (
    <Card as="article">
      <Card.Title as="h3">{title}</Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.SubTitle>{authors}</Card.SubTitle>
      <Card.Description>{description}</Card.Description>
      <div className="xs:grid-cols-1 grid grid-cols-3 gap-x-5">
        {ctas.map((cta) => (
          <div key={cta.href} className="mx-5 mt-1">
            <Card.Cta key={cta.href} href={cta.href}>
              {cta.title}
            </Card.Cta>
          </div>
        ))}
      </div>
    </Card>
  )
}

export const metadata: Metadata = {
  title: 'Research',
  description: 'My Research',
}

export default function Speaking() {
  return (
    <SimpleLayout
      title="My research."
      intro="This work is the product of diverse research interests and a variety of research opportunities that I have been lucky enough to pursue. The overarching goal is to provide interpretable methods, useful in their application but that also provide a broader understanding of the problem at hand."
    >
      <div className="space-y-20">
        <ResearchSection title="Publications">
          <Publication
            title="Explanations and meaningful information: at the interface between technical capabilities and legal frameworks"
            description="A technical deep-dive into HelioStream, the real-time streaming library I wrote for transmitting live video back to Earth."
            authors="D. Bourgeois, S. Vergnolle"
            event="PLSC 2022"
            ctas={[{ title: 'Preprint', href: '#' }]}
          />
          <Publication
            title="Learning Representations of Source Code from Structure and Context"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            authors="D. Bourgeois"
            event="MSc. Thesis"
            ctas={[
              { title: 'PDF', href: '#1' },
              { title: 'Code', href: 'https://github.com/dtsbourg/BiFocalE' },
              {
                title: 'Slides',
                href: 'https://docs.google.com/presentation/d/1YZCNcU98oOiA40OE6P8thlQa8JHzj_QcssWkD4SZZTs/edit?usp=sharing',
              },
            ]}
          />
          <Publication
            title="GNNExplainer: Generating explanations for Graph Neural Networks"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            authors="R. Ying, D. Bourgeois, J. You, M. Zitnik, J. Leskovec"
            event="NeurIPS 2019"
            ctas={[
              {
                title: 'Arxiv',
                href: 'https://arxiv.org/abs/1903.03894',
              },
              {
                title: 'Website',
                href: 'http://snap.stanford.edu/gnnexplainer',
              },
              {
                title: 'Code',
                href: 'https://github.com/RexYing/gnn-model-explainer',
              },
            ]}
          />
          <Publication
            title="A Dynamic Embedding Model of the Media Landscape"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            authors="J. Rappaz*, D. Bourgeois*, K. Aberer "
            event="WWW 2019"
            ctas={[
              {
                title: 'Proceedings',
                href: 'https://dl.acm.org/citation.cfm?id=3313526',
              },
              {
                title: 'Website',
                href: 'https://mediaobservatory.com/',
              },
            ]}
          />
          <Publication
            title="Selection Bias in News Coverage: Learning It, Fighting It"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            authors="D. Bourgeois, J. Rappaz, K. Aberer"
            event="WWW 2018"
            ctas={[
              {
                title: 'Proceedings',
                href: 'https://dl.acm.org/citation.cfm?id=3188724',
              },
              {
                title: 'Website',
                href: 'https://mediaobservatory.com/',
              },
              {
                title: 'Code',
                href: 'https://github.com/lsir-media-obs/selection-bias-code',
              },
            ]}
          />
          <Publication
            title="Using holistic information in the Trigger"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            authors="D. Bourgeois, C. Fitzpatrick, S. Stahl"
            event="LHCb Public Note"
            ctas={[
              {
                title: 'Inspire HEP',
                href: 'https://inspirehep.net/record/1684792',
              },
              {
                title: 'Arxiv',
                href: 'https://arxiv.org/abs/1808.00711',
              },
              {
                title: 'LHCb-Pub',
                href: 'https://cds.cern.ch/record/2632767',
              },
            ]}
          />
          <Publication
            title="New approaches for track reconstruction in LHCb's Vertex Locator"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            authors="C. Hasse, J. Albrecht, B. Couturier, D. Bourgeois, V. Coco, N. Nolte, S. Ponce"
            event=" JHEP 2018"
            ctas={[
              {
                title: "Poster (CHEP'18)",
                href: 'https://dtsbourg.me/Poster_268-compressed.pdf',
              },
              {
                title: 'Preprint',
                href: '#',
              },
            ]}
          />
        </ResearchSection>
        <ResearchSection title="Patents">
          <Publication
            title="Cleaning robot"
            description="How we used world-class visual design to attract a great team, win over customers, and get more press for Planetaria."
            authors="R. Brooks, D. Bourgeois, C. Chao, A. Trevor, M.R. Amer, A. Jules, G.F. Marcus"
            event="US20210346543A1"
            ctas={[
              {
                title: 'Filing',
                href: 'https://patents.google.com/patent/US20210346543A1',
              },
            ]}
          />
          <Publication
            title="Ultraviolet cleaning trajectory modeling"
            description="How we used world-class visual design to attract a great team, win over customers, and get more press for Planetaria."
            authors="A. Trevor, D. Bourgeois, M. Kollmitz, C. Chao"
            event="US20210347048A1"
            ctas={[
              {
                title: 'Filing',
                href: 'https://patents.google.com/patent/US20210346543A1',
              },
            ]}
          />
        </ResearchSection>
      </div>
    </SimpleLayout>
  )
}
