import { site } from '@/content/site'
import { BrandIcon, MailIcon } from '@/components/ui/icons'
import { Monogram } from '@/components/ui/monogram'
import { CurrentYear } from './current-year'

const iconLink =
  'grid size-11 place-items-center rounded-full text-fg-muted transition-colors duration-(--duration-fast) hover:bg-surface hover:text-fg'

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline">
      <div className="container-page flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <Monogram className="text-title-3" />
          <p className="font-mono text-caption tracking-[0.12em] text-fg-muted">
            {site.brand.footerTagline}
          </p>
          <p className="text-caption text-fg-muted">
            © <CurrentYear /> {site.ui.rights}
          </p>
        </div>

        <ul
          aria-label={site.ui.footerSocialLabel}
          className="-ml-3 flex items-center gap-1 sm:-mr-3 sm:ml-0"
        >
          <li>
            <a href={`mailto:${site.contact.email}`} className={iconLink}>
              <MailIcon className="size-5" />
              <span className="sr-only">{site.contact.email}</span>
            </a>
          </li>
          {site.social.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className={iconLink}>
                <BrandIcon brand={link.network} className="size-5" />
                <span className="sr-only">{`${link.label} ${site.ui.newTab}`}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
