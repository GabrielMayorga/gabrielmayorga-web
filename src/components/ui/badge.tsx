import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Etiqueta técnica (stack). Monoespaciada y discreta: no compite con el contenido. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center rounded-full border border-hairline px-3 py-1 font-mono text-caption wrap-anywhere text-fg-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Estado con punto de color. `live` = en curso (acento), si no, neutro. */
export function StatusBadge({ children, live = false }: { children: ReactNode; live?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-caption font-medium text-fg-muted">
      <span
        aria-hidden="true"
        className={cn('size-2 rounded-full', live ? 'bg-accent' : 'bg-fg-muted')}
      />
      {children}
    </span>
  )
}
