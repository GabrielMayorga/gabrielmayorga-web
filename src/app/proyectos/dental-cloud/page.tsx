import Link from 'next/link'
import type { Metadata } from 'next'
import { demoAgenda } from '@/content/demo-agenda'
import { projects } from '@/content/projects'
import { site } from '@/content/site'
import { AgendaDemo } from '@/components/demo/agenda-demo'
import { ButtonLink } from '@/components/ui/button'
import { ArrowLeftIcon, BrandIcon } from '@/components/ui/icons'
import { SectionLabel } from '@/components/ui/section-label'
import { whatsappHref } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: demoAgenda.meta.title,
  description: demoAgenda.meta.description,
  alternates: { canonical: '/proyectos/dental-cloud' },
  openGraph: {
    title: demoAgenda.meta.title,
    description: demoAgenda.meta.description,
    url: '/proyectos/dental-cloud',
    // Al definir openGraph en la página no se hereda la imagen de la raíz
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: site.share.imageAlt }],
  },
}

const repo = projects.find((p) => p.slug === 'dental-cloud-system')?.repo

/*
 * Demo interactiva de la agenda de Dental Cloud System, con datos ficticios.
 * El texto y la explicación van arriba; la agenda ocupa todo el ancho útil.
 */
export default function DentalCloudDemoPage() {
  const { tryThis, cta } = demoAgenda
  return (
    <div className="pt-(--nav-height)">
      <section aria-labelledby="demo-title" className="container-page py-12 sm:py-16">
        <Link
          href="/#proyectos"
          className="-ml-2 inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-small text-fg-muted transition-colors duration-(--duration-fast) hover:text-fg"
        >
          <ArrowLeftIcon className="size-5" />
          {demoAgenda.back}
        </Link>

        <p className="mt-8 text-small font-medium text-fg-muted">{demoAgenda.eyebrow}</p>
        <h1 id="demo-title" className="mt-4 max-w-3xl text-title-1 font-semibold">
          {demoAgenda.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lead text-fg-muted">{demoAgenda.intro}</p>

        <div className="mt-8 max-w-3xl">
          <SectionLabel>{tryThis.title}</SectionLabel>
          <ol className="mt-4 grid list-decimal gap-2 pl-6 text-fg-muted marker:font-mono marker:text-accent-text">
            {tryThis.steps.map((step) => (
              <li key={step} className="pl-2">
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 sm:mt-12">
          <AgendaDemo />
        </div>
      </section>

      <section
        aria-labelledby="demo-cta-title"
        className="border-t border-hairline bg-canvas-subtle py-16 sm:py-20"
      >
        <div className="container-page">
          <div className="max-w-3xl">
            <h2 id="demo-cta-title" className="text-title-2 font-semibold">
              {cta.title}
            </h2>
            <p className="mt-4 text-lead text-fg-muted">{cta.text}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink
                href={whatsappHref(cta.whatsappMessage)}
                external
                size="lg"
                icon={<BrandIcon brand="whatsapp" />}
                className="w-full text-center whitespace-normal sm:w-auto"
              >
                {cta.button}
              </ButtonLink>
              {repo && (
                <ButtonLink
                  href={repo}
                  external
                  variant="secondary"
                  size="lg"
                  icon={<BrandIcon brand="github" />}
                  className="w-full text-center whitespace-normal sm:w-auto"
                >
                  {cta.code}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
