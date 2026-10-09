import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { SectionLabel } from './section-label'

interface SectionProps {
  /** Ancla de navegación (#servicios). También genera el id del título. */
  id: string
  label: string
  title: ReactNode
  intro?: ReactNode
  /** Fondo alterno para separar secciones sin líneas. */
  tone?: 'default' | 'subtle'
  className?: string
  children?: ReactNode
}

/** Sección de la página: etiqueta { }, h2, intro opcional y contenido. */
export function Section({
  id,
  label,
  title,
  intro,
  tone = 'default',
  className,
  children,
}: SectionProps) {
  const titleId = `${id}-title`
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn('section-space', tone === 'subtle' && 'bg-canvas-subtle', className)}
    >
      <div className="container-page">
        <header className="max-w-3xl reveal">
          <SectionLabel>{label}</SectionLabel>
          <h2 id={titleId} className="mt-4 text-title-1 font-semibold">
            {title}
          </h2>
          {intro && <p className="mt-6 text-lead text-fg-muted">{intro}</p>}
        </header>
        {children && <div className="mt-12 sm:mt-16">{children}</div>}
      </div>
    </section>
  )
}
