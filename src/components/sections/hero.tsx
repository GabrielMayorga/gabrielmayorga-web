import { site } from '@/content/site'
import { ButtonLink } from '@/components/ui/button'
import { ArrowDownIcon, BrandIcon } from '@/components/ui/icons'
import { whatsappHref } from '@/lib/whatsapp'

/*
 * Una idea por pantalla: quién soy (línea pequeña), qué resuelvo (h1), cómo (bajada)
 * y qué hacer ahora (WhatsApp). Sin animación de entrada en el texto: el h1 es el
 * elemento LCP y debe pintarse de inmediato.
 */
export function Hero() {
  const { hero } = site

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center pt-(--nav-height)"
    >
      <div aria-hidden="true" className="hero-liquid">
        <span />
        <span />
        <span />
      </div>

      <div className="container-page py-20 sm:py-24">
        <p className="text-small font-medium text-fg-muted">{hero.eyebrow}</p>

        <h1 id="hero-title" className="mt-6 max-w-4xl text-display font-semibold">
          {hero.title}
        </h1>

        <p className="mt-6 max-w-2xl text-lead text-fg-muted sm:mt-8">{hero.subtitle}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink
            href={whatsappHref()}
            external
            srSuffix={site.ui.viaWhatsapp}
            size="lg"
            icon={<BrandIcon brand="whatsapp" />}
            className="w-full sm:w-auto"
          >
            {hero.primaryCta}
          </ButtonLink>
          <ButtonLink
            href="#servicios"
            variant="secondary"
            size="lg"
            trailingIcon={<ArrowDownIcon />}
            className="w-full sm:w-auto"
          >
            {hero.secondaryCta}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
