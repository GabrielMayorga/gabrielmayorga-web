import { cn } from '@/lib/cn'

/** Etiqueta discreta de sección: "{ servicios }". Las llaves son decorativas. */
export function SectionLabel({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn('section-label', className)}>
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
