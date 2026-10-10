import type { SVGProps } from 'react'
import { siGithub, siInstagram, siWhatsapp, siYoutube } from 'simple-icons'

type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'>

/*
 * Íconos de trazo propios (24×24, currentColor). Decorativos por defecto:
 * el texto del botón o enlace es lo que da el nombre accesible.
 */
function StrokeIcon({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export const ArrowRightIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </StrokeIcon>
)

export const ArrowUpRightIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </StrokeIcon>
)

export const ArrowDownIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </StrokeIcon>
)

export const MailIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </StrokeIcon>
)

export const SunIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </StrokeIcon>
)

export const MoonIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M20.5 14.1A8.5 8.5 0 1 1 9.9 3.5a7 7 0 0 0 10.6 10.6Z" />
  </StrokeIcon>
)

export const CheckIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="m5 12 5 5L20 7" />
  </StrokeIcon>
)

/* Servicios */
export const WrenchIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
  </StrokeIcon>
)

export const BrowserIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
  </StrokeIcon>
)

export const BoltIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </StrokeIcon>
)

/* Marcas: trazados oficiales de simple-icons (CC0). LinkedIn ya no está en el
   paquete por pedido de la marca, así que se incluye su glifo aquí. */
const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

const brandPaths = {
  whatsapp: siWhatsapp.path,
  github: siGithub.path,
  linkedin: LINKEDIN_PATH,
  youtube: siYoutube.path,
  instagram: siInstagram.path,
} as const

export type Brand = keyof typeof brandPaths

export function BrandIcon({ brand, ...props }: IconProps & { brand: Brand }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d={brandPaths[brand]} />
    </svg>
  )
}
