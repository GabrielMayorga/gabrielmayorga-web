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
 * Barra fija de vidrio: el contenido pasa por debajo. Medido en 320–1280 px:
 * - Celular: nombre y WhatsApp. El botón de tema pasa al pie (SiteFooter) para que
 *   "WhatsApp" conserve su texto; bajo 360 px el botón queda solo con el ícono.
 * - Enlaces de sección desde lg: con el nombre completo no caben en 768 px. Es una
 *   página de una columna que se recorre con scroll, así que no hace falta menú.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 glass-bar">
      <div className="container-page flex h-(--nav-height) items-center justify-between gap-4">
        <Link
          href="/"
          prefetch={false}
          className="-ml-2 inline-flex min-h-11 shrink-0 items-center gap-3 rounded-full px-2"
        >
          <Monogram className="hidden text-body sm:inline" />
          <span className="font-display text-small font-semibold whitespace-nowrap sm:text-body">
            {site.name}
          </span>
          <span className="sr-only">{site.ui.homeLinkSuffix}</span>
        </Link>

        <nav aria-label={site.ui.navLabel} className="hidden lg:block">
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
          <div className="hidden sm:block">
            <ThemeToggle toDarkLabel={site.ui.themeToDark} toLightLabel={site.ui.themeToLight} />
          </div>
          <ButtonLink href={whatsappHref()} external icon={<BrandIcon brand="whatsapp" />}>
            <span className="max-[359px]:sr-only">{site.ui.whatsappShort}</span>
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}
