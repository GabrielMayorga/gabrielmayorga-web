import { processSection, processSteps } from '@/content/process'
import type { ProcessStep } from '@/content/types'
import { site } from '@/content/site'
import { ButtonLink } from '@/components/ui/button'
import { BrandIcon } from '@/components/ui/icons'
import { Section } from '@/components/ui/section'
import { cn } from '@/lib/cn'
import { whatsappHref } from '@/lib/whatsapp'

/*
 * Línea de tiempo: vertical en el celular, horizontal en escritorio. El <ol> ya da
 * el orden a los lectores de pantalla; los números grandes son decorativos.
 * Las condiciones de dinero (nota) se destacan: es lo que más frena a un cliente.
 */
export function Process() {
  const steps: readonly ProcessStep[] = processSteps
  return (
    <Section
      id="proceso"
      tone="subtle"
      label={processSection.label}
      title={processSection.title}
      intro={processSection.intro}
    >
      <ol role="list" className="grid gap-10 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, index) => {
          const last = index === steps.length - 1
          return (
            <li key={step.title} className="relative reveal pl-18 lg:pt-20 lg:pl-0">
              {/* Conector al siguiente paso */}
              {!last && (
                <span
                  aria-hidden="true"
                  className="absolute top-14 -bottom-8 left-6 w-px bg-hairline-strong lg:top-6 lg:right-0 lg:bottom-auto lg:left-14 lg:-mr-6 lg:h-px lg:w-auto"
                />
              )}
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-0 left-0 inline-flex size-12 items-center justify-center rounded-full border font-mono text-small',
                  index === 0
                    ? 'border-transparent bg-accent-solid text-on-accent'
                    : 'border-hairline-strong bg-canvas text-accent-text',
                )}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3 className="text-title-3 font-semibold">{step.title}</h3>
              <p className="mt-3 text-fg-muted">{step.description}</p>
              {step.note && (
                <p className="mt-4 rounded-xs border border-hairline bg-canvas px-4 py-3 text-small">
                  {step.note}
                </p>
              )}
            </li>
          )
        })}
      </ol>

      <div className="mt-12 reveal sm:mt-16">
        <ButtonLink
          href={whatsappHref(processSection.whatsappMessage)}
          external
          srSuffix={site.ui.viaWhatsapp}
          size="lg"
          icon={<BrandIcon brand="whatsapp" />}
          className="w-full text-center whitespace-normal sm:w-auto"
        >
          {processSection.cta}
        </ButtonLink>
      </div>
    </Section>
  )
}
