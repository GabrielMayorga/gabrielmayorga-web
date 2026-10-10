import type { ComponentProps, ReactNode } from 'react'
import { site } from '@/content/site'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

interface StyleProps {
  variant?: Variant
  size?: Size
}

/*
 * Feedback al presionar: scale(0.97) en 120 ms, con transición CSS (interrumpible,
 * sin JavaScript). La suelta vuelve con la curva suave. hover: en Tailwind v4 solo
 * aplica con puntero real, así que en el celular no queda "pegado".
 */
const base =
  'group/button relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none [touch-action:manipulation] transition-[background-color,border-color,color,box-shadow,transform] duration-(--duration-fast) ease-out-soft active:duration-(--duration-press) motion-safe:active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-accent-solid text-on-accent shadow-sm hover:bg-accent-solid-hover hover:shadow-md',
  secondary: 'border border-hairline-strong text-fg hover:bg-surface',
  ghost: 'text-accent-text hover:bg-surface',
}

const sizes: Record<Size, string> = {
  md: 'px-5 text-small',
  lg: 'min-h-14 px-8 text-body',
}

export function buttonStyles({ variant = 'primary', size = 'md' }: StyleProps = {}) {
  return cn(base, variants[variant], sizes[size], variant === 'ghost' && 'px-4')
}

/** Ícono al final del botón que se desplaza 2 px al pasar el cursor. */
function TrailingIcon({ children }: { children: ReactNode }) {
  return (
    <span className="-mr-1 inline-flex size-5 transition-transform duration-(--duration-fast) ease-out-soft motion-safe:group-hover/button:translate-x-0.5">
      {children}
    </span>
  )
}

interface SharedProps extends StyleProps {
  /** Ícono antes del texto. */
  icon?: ReactNode
  /** Ícono después del texto (con microinteracción). */
  trailingIcon?: ReactNode
  className?: string
  children: ReactNode
}

export function Button({
  variant,
  size,
  icon,
  trailingIcon,
  className,
  children,
  type = 'button',
  ...props
}: SharedProps & Omit<ComponentProps<'button'>, keyof SharedProps>) {
  return (
    <button type={type} className={cn(buttonStyles({ variant, size }), className)} {...props}>
      {icon && <span className="-ml-1 inline-flex size-5">{icon}</span>}
      {children}
      {trailingIcon && <TrailingIcon>{trailingIcon}</TrailingIcon>}
    </button>
  )
}

interface LinkProps extends SharedProps {
  href: string
  /** Abre en otra pestaña y lo anuncia a lectores de pantalla. */
  external?: boolean
  /** Texto solo para lectores de pantalla tras el visible, p. ej. a dónde lleva. */
  srSuffix?: string
}

export function ButtonLink({
  href,
  external = false,
  srSuffix,
  variant,
  size,
  icon,
  trailingIcon,
  className,
  children,
  ...props
}: LinkProps & Omit<ComponentProps<'a'>, keyof LinkProps>) {
  const content = (
    <>
      {icon && <span className="-ml-1 inline-flex size-5">{icon}</span>}
      {children}
      {srSuffix && <span className="sr-only"> {srSuffix}</span>}
      {trailingIcon && <TrailingIcon>{trailingIcon}</TrailingIcon>}
    </>
  )
  const classes = cn(buttonStyles({ variant, size }), className)

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {content}
        <span className="sr-only"> {site.ui.newTab}</span>
      </a>
    )
  }

  // Sitio de una sola página: los enlaces internos son anclas (#servicios).
  // Un <a> simple basta; next/link añadiría precarga de rutas que no existen.
  return (
    <a href={href} className={classes} {...props}>
      {content}
    </a>
  )
}
