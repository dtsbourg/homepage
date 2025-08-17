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
            description="For many individuals, decisions taken by a computer are preferable to ones made by humans because they are often considered to be more objective. At the same time, individuals feel uncomfortable with autonomous vehicles roaming the roads. This clash can be explained by the fact that decisions made by computers, and more specifically by AI-enabled systems, can be virtually impossible to understand from the outside."
            authors="D. Bourgeois, S. Vergnolle"
            event="PLSC 2022"
            ctas={[{ title: 'Preprint', href: '#' }]}
          />
          <Publication
            title="Learning Representations of Source Code from Structure and Context"
            description="Early transformer models would view source code as plain text. In this work, we show the value of heterogenous representations, in particular tree and graph-based forms such as ASTs. We also show how transformers can be considered equivalent to Graph Neural Networks (GNN) in some forms, and leverage this fact to propose novel code understanding models."
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
            description="Graph Neural Networks (GNNs) represent information very compactly, yet when machine learning models operate on them we lose the ability to understand predictions' rationale. In this work we propose a model-agnostic framework to extract meaningful explanations of any GNN's predictions."
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
            description="Leverage the unsupervised news coverage similarity maps from prior work, we show that market dynamics greatly affect coverage patterns. In particular, acquisitions tend to concentrate and unify the set of covered events over time."
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
            description="Leveraging advanced recommendation systems, we analyze large amounts of news coverage from many sources. We extract similarity maps from the embedding, in order to understand similarities and biases in coverage, and propose a method for diversifying news consumption."
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
            description="The trigger sifts through large amounts of particle collision data in near real-time. This must be done in software, at a whopping 30MHz rate. In doing so, it must remove large amounts of data while retaining the most important information (i.e. the rarest decays). For this purpose, we devise high recall, configurable machine learning methods to efficiently retain the most useful information for later processing."
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
            description="The VErtex LOcator (VELO) is the closest subdetector to the collision point. We reconstruct collision tracks and the residuals of each hit with respect to the initial estimated straight line. Using recurrent networks, we estimate the position and uncertainty of a VELO track's closest to beam state. The resolution of this prediction as well as its ability to estimate the uncertainty is shown to be superior to existing methods."
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
            description="An autonomous UV disinfection robot for COVID-19 and other pathogens."
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
            description="A factor graph optimization based framework for provable UV disinfection thresholds."
            authors="A. Trevor, D. Bourgeois, M. Kollmitz, C. Chao"
            event="US20210347048A1"
            ctas={[
              {
                title: 'Filing',
                href: 'https://patents.google.com/patent/US20210346543A1',
              },
            ]}
          />
                    <Publication
            title="Systems and methods for a virtual facility supporting robotics fleet control and sensor data simulation"
            description="A system for simulating robotic fleets in a virtual facility and generating large amounts of sensor data for training and validation of robotic systems."
            authors="M. Amer, D. bourgeois, S. Nusser, P.-E. Evreux, K. Marshall, J. Staker, N. Vander Valk"
            event="US12276989"
            ctas={[
              {
                title: 'Filing',
                href: 'https://www.freepatentsonline.com/12276989.html',
              },
            ]}
          />
          <Publication
            title="Systems and Methods for a Virtual Facility Supporting Robotics Fleet Control and Sensor Data Simulation"
            description="A virtual facility system may include a storage system, a data engine, an integration system, a virtual facility interface system, and a simulator engine. The storage system may store data including video of the real facility. The data engine may train a neural rendering model of the real facility based on the data providing a photorealistic three-dimensional representation of the real facility."
            authors="M. Amer, D. Bourgeois, S. Nusser, P.-E. Evreux, K. Marshall, J. Staker, N. Vander Valk"
            event="US20250251740A1"
            ctas={[
              {
                title: 'Filing',
                href: 'https://patents.google.com/patent/US20250251740A1/en?inventor=Dylan+Bourgeois',
              },
            ]}
          />
        </ResearchSection>
      </div>
    </SimpleLayout>
  )
}
