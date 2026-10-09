import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StatusBadge, Tag } from '@/components/ui/badge'
import { Button, ButtonLink } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  BrandIcon,
  CheckIcon,
  MailIcon,
  MoonIcon,
  SunIcon,
} from '@/components/ui/icons'
import { Monogram } from '@/components/ui/monogram'
import { SectionLabel } from '@/components/ui/section-label'

/*
 * Vista de desarrollo del sistema de diseño. Solo existe con `npm run dev`:
 * en producción responde 404 y no se indexa. Los textos de aquí son de prueba.
 */
export const metadata: Metadata = {
  title: 'Sistema de diseño',
  robots: { index: false, follow: false },
}

const typeScale = [
  ['text-display', 'Soluciones reales'],
  ['text-title-1', 'Se me cayó el sistema'],
  ['text-title-2', 'Pierdo horas en esto'],
  ['text-title-3', 'Diagnóstico por escrito'],
  ['text-lead', 'Procesos manuales que te consumen horas cada semana.'],
  ['text-body', 'Cuerpo de texto cómodo, entre 17 y 18 px, con interlineado amplio.'],
  ['text-small', 'Texto secundario y etiquetas de botones.'],
  ['text-caption', 'Notas, metadatos y etiquetas técnicas.'],
] as const

const swatches = [
  'bg-canvas',
  'bg-canvas-subtle',
  'bg-surface',
  'bg-fg',
  'bg-fg-muted',
  'bg-accent',
  'bg-accent-text',
  'bg-accent-solid',
] as const

function Showcase() {
  return (
    <div className="space-y-16">
      <div className="flex items-center justify-between">
        <Monogram className="text-title-3" />
        <SectionLabel>sistema</SectionLabel>
      </div>

      <section className="space-y-4">
        <SectionLabel>tipografía</SectionLabel>
        {typeScale.map(([cls, sample]) => (
          <div key={cls}>
            <p className="font-mono text-caption text-fg-muted">{cls}</p>
            <p
              className={`${cls} ${cls.startsWith('text-title') || cls === 'text-display' ? 'font-display font-semibold' : ''}`}
            >
              {sample}
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <SectionLabel>color</SectionLabel>
        <div className="grid grid-cols-4 gap-2">
          {swatches.map((cls) => (
            <div key={cls}>
              <div className={`h-12 rounded-sm border border-hairline ${cls}`} />
              <p className="mt-1 truncate font-mono text-caption text-fg-muted">
                {cls.replace('bg-', '')}
              </p>
            </div>
          ))}
        </div>
        <p className="text-accent-text">Enlace o texto en azul (accent-text)</p>
      </section>

      <section className="space-y-4">
        <SectionLabel>botones</SectionLabel>
        <div className="flex flex-wrap gap-4">
          <ButtonLink
            href="https://wa.me/"
            external
            size="lg"
            icon={<BrandIcon brand="whatsapp" />}
          >
            Escríbeme por WhatsApp
          </ButtonLink>
          <ButtonLink
            href="#servicios"
            variant="secondary"
            size="lg"
            trailingIcon={<ArrowDownIcon />}
          >
            Ver servicios
          </ButtonLink>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button trailingIcon={<ArrowRightIcon />}>Primario md</Button>
          <Button variant="secondary">Secundario md</Button>
          <Button variant="ghost" trailingIcon={<ArrowUpRightIcon />}>
            Ghost
          </Button>
          <Button disabled>Deshabilitado</Button>
        </div>
      </section>

      <section className="space-y-4">
        <SectionLabel>tarjetas</SectionLabel>
        <div className="grid gap-4">
          {(['surface', 'outline', 'glass'] as const).map((variant) => (
            <Card key={variant} variant={variant} interactive>
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-title-3 font-semibold">Card · {variant}</h3>
                <StatusBadge live={variant !== 'outline'}>
                  {variant === 'outline' ? 'Completado' : 'En desarrollo'}
                </StatusBadge>
              </div>
              <p className="mt-3 text-fg-muted">
                Radios concéntricos: el bloque interno usa rounded-xs.
              </p>
              <div className="mt-6 rounded-xs bg-canvas-subtle p-4 font-mono text-caption text-fg-muted">
                rounded-xs · 8 px
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Tag>Next.js</Tag>
                <Tag>PostgreSQL</Tag>
                <Tag>WhatsApp Business</Tag>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionLabel>íconos</SectionLabel>
        <div className="flex flex-wrap gap-4 text-fg [&_svg]:size-6">
          <ArrowRightIcon />
          <ArrowUpRightIcon />
          <ArrowDownIcon />
          <MailIcon />
          <SunIcon />
          <MoonIcon />
          <CheckIcon />
          <BrandIcon brand="whatsapp" />
          <BrandIcon brand="github" />
          <BrandIcon brand="linkedin" />
          <BrandIcon brand="youtube" />
          <BrandIcon brand="instagram" />
        </div>
      </section>

      <section className="space-y-4">
        <SectionLabel>revelado</SectionLabel>
        {[1, 2, 3, 4].map((n) => (
          <Card key={n} variant="outline" className="reveal">
            <p>Bloque {n}: aparece al entrar en pantalla.</p>
          </Card>
        ))}
      </section>
    </div>
  )
}

export default function DevPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main className="grid lg:grid-cols-2">
      <div data-theme="light" className="bg-canvas px-6 py-16 text-fg sm:px-12">
        <Showcase />
      </div>
      <div data-theme="dark" className="bg-canvas px-6 py-16 text-fg sm:px-12">
        <Showcase />
      </div>
    </main>
  )
}
