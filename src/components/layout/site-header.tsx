import Link from 'next/link'
import { site } from '@/content/site'
import { ButtonLink } from '@/components/ui/button'
import { BrandIcon } from '@/components/ui/icons'
import { Monogram } from '@/components/ui/monogram'
import { whatsappHref } from '@/lib/whatsapp'
import { ThemeToggle } from './theme-toggle'

/*
 * La marca usa next/link sin precarga: vuelve a la home desde otras páginas
 * sin recargar. Los enlaces de sección son anclas a "/#…".
 *
 * Barra fija de vidrio: el contenido pasa por debajo. En móvil solo quedan
 * marca, tema y WhatsApp; es una página de una sola columna que se recorre con scroll,
 * así que no hace falta menú desplegable.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 glass-bar">
      <div className="container-page flex h-(--nav-height) items-center justify-between gap-4">
        <Link
          href="/"
          prefetch={false}
          className="-ml-2 inline-flex min-h-11 items-center rounded-full px-2 text-body"
        >
          <Monogram />
          <span className="sr-only">{site.ui.homeLink}</span>
        </Link>

        <nav aria-label={site.ui.navLabel} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-small text-fg-muted transition-colors duration-(--duration-fast) hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle toDarkLabel={site.ui.themeToDark} toLightLabel={site.ui.themeToLight} />
          <ButtonLink href={whatsappHref()} external icon={<BrandIcon brand="whatsapp" />}>
            {site.ui.whatsappShort}
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}
