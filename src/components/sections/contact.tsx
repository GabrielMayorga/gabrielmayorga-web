import { contactSection } from '@/content/about'
import { site } from '@/content/site'
import { ButtonLink } from '@/components/ui/button'
import { BrandIcon } from '@/components/ui/icons'
import { SectionLabel } from '@/components/ui/section-label'
import { whatsappHref } from '@/lib/whatsapp'

/** Cierre de la página: una sola pregunta y una sola acción. El correo queda como alternativa. */
export function Contact() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-title"
      className="border-t border-hairline bg-canvas-subtle section-space"
    >
      <div className="container-page reveal text-center">
        <SectionLabel>{contactSection.label}</SectionLabel>
        <h2 id="contacto-title" className="mx-auto mt-4 max-w-3xl text-title-1 font-semibold">
          {contactSection.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lead text-fg-muted">{contactSection.text}</p>
        <ButtonLink
          href={whatsappHref()}
          external
          size="lg"
          icon={<BrandIcon brand="whatsapp" />}
          className="mt-10 w-full text-center whitespace-normal sm:w-auto"
        >
          {contactSection.primary}
        </ButtonLink>
        <p className="mt-6 text-small text-fg-muted">
          {contactSection.emailLabel}{' '}
          <a
            href={`mailto:${site.contact.email}`}
            className="inline-flex min-h-11 items-center font-medium text-accent-text underline decoration-current/40 underline-offset-4 transition-[text-decoration-color] duration-(--duration-fast) ease-out-soft hover:decoration-current"
          >
            {site.contact.email}
          </a>
        </p>
      </div>
    </section>
  )
}
