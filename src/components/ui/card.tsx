import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'surface' | 'outline' | 'glass'

const variants: Record<Variant, string> = {
  surface: 'border border-hairline bg-surface',
  outline: 'border border-hairline bg-canvas',
  glass: 'glass',
}

type CardProps<T extends 'div' | 'article' | 'li'> = {
  as?: T
  variant?: Variant
  /** Elevación sutil al pasar el cursor (solo si toda la tarjeta es clicable o enlazada). */
  interactive?: boolean
} & ComponentProps<T>

/*
 * Radios concéntricos: rounded-xl + p-6 en móvil, rounded-2xl + p-8 en escritorio.
 * Cualquier elemento redondeado dentro de la tarjeta usa rounded-xs (8 px).
 */
export function Card<T extends 'div' | 'article' | 'li' = 'div'>({
  as,
  variant = 'surface',
  interactive = false,
  className,
  ...props
}: CardProps<T>) {
  const Tag = (as ?? 'div') as 'div'
  return (
    <Tag
      className={cn(
        'relative rounded-xl p-6 sm:rounded-2xl sm:p-8',
        variants[variant],
        interactive &&
          'transition-[transform,box-shadow,border-color] duration-(--duration-base) ease-fluid hover:border-hairline-strong hover:shadow-md motion-safe:hover:-translate-y-0.5',
        className,
      )}
      {...(props as ComponentProps<'div'>)}
    />
  )
}
