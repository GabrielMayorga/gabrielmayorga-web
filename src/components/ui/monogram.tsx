import { cn } from '@/lib/cn'

/** Monograma {GM}. Visual: quien lo envuelve (p. ej. el enlace al inicio) da el nombre accesible. */
export function Monogram({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('font-mono font-semibold tracking-tight', className)}>
      <span className="text-accent-text">{'{'}</span>
      GM
      <span className="text-accent-text">{'}'}</span>
    </span>
  )
}
