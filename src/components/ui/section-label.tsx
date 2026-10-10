import { cn } from '@/lib/cn'

/** Etiqueta discreta de sección: "{ servicios }". Las llaves son decorativas. */
export function SectionLabel({
  children,
  className,
  id,
}: {
  children: string
  className?: string
  id?: string
}) {
  return (
    <p id={id} className={cn('section-label', className)}>
      <span aria-hidden="true" className="text-accent-text">
        {'{ '}
      </span>
      {children}
      <span aria-hidden="true" className="text-accent-text">
        {' }'}
      </span>
    </p>
  )
}
