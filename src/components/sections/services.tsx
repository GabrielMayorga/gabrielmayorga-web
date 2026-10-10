import type { ComponentType, SVGProps } from 'react'
import { services, servicesSection } from '@/content/services'
import { site } from '@/content/site'
import type { ServiceIcon } from '@/content/types'
import { ButtonLink } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BoltIcon, BrandIcon, BrowserIcon, CheckIcon, WrenchIcon } from '@/components/ui/icons'
import { Section } from '@/components/ui/section'
import { whatsappHref } from '@/lib/whatsapp'

const icons: Record<ServiceIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  support: WrenchIcon,
  web: BrowserIcon,
  automation: BoltIcon,
}

/*
 * Cada tarjeta se lee de arriba abajo como una conversación: qué servicio (línea
 * pequeña), qué te pasa (h3), qué hago (texto), ejemplos y botón a WhatsApp con un
 * mensaje ya escrito para ese servicio. El stack va al final, discreto, para quien
 * lo busque. La tarjeta no es clicable entera: el único destino es el botón.
 */
export function Services() {
  return (
    <Section
      id="servicios"
      tone="subtle"
      label={servicesSection.label}
      title={servicesSection.title}
      intro={servicesSection.intro}
    >
      <ul role="list" className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = icons[service.icon]
          return (
            <Card key={service.slug} as="li" variant="outline" className="flex reveal flex-col">
              <span className="inline-flex size-12 shrink-0 items-center justify-center self-start rounded-xs bg-surface text-accent">
                <Icon className="size-6" />
              </span>

              <h3 className="mt-6 text-title-3 font-semibold">
                <span className="mb-2 block font-sans text-small font-medium text-fg-muted">
                  {service.name}
                </span>
                {service.problem}
              </h3>
              <p className="mt-4 text-fg-muted">{service.description}</p>

              <ul role="list" className="mt-6 space-y-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-small">
                    <CheckIcon className="mt-0.5 size-5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* mt-auto: los botones quedan alineados aunque las tarjetas difieran en texto */}
              <div className="mt-auto pt-8">
                {'stack' in service && service.stack.length > 0 && (
                  <p className="mb-6 border-t border-hairline pt-6 font-mono text-caption text-fg-muted">
                    {service.stack.join(' · ')}
                  </p>
                )}
                <ButtonLink
                  href={whatsappHref(service.whatsappMessage)}
                  external
                  srSuffix={site.ui.viaWhatsapp}
                  variant="secondary"
                  icon={<BrandIcon brand="whatsapp" />}
                  className="w-full text-center whitespace-normal"
                >
                  {service.cta}
                </ButtonLink>
              </div>
            </Card>
          )
        })}
      </ul>

      <p className="mt-10 reveal text-center text-fg-muted sm:mt-12">
        {servicesSection.fallback}{' '}
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center font-semibold text-accent-text underline decoration-current/40 underline-offset-4 transition-[text-decoration-color] duration-(--duration-fast) ease-out-soft hover:decoration-current"
        >
          {servicesSection.fallbackCta}
          <span className="sr-only"> {site.ui.newTab}</span>
        </a>
      </p>
    </Section>
  )
}
