import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

/*
 * Vista previa al compartir el enlace. Colores fijos (ImageResponse no lee CSS):
 * son los primitivos de tokens.css, tema oscuro.
 */
export const alt = site.share.imageAlt
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const colors = {
  canvas: '#0f172a',
  fg: '#f8fafc',
  muted: '#94a3b8',
  accent: '#60a5fa',
  glow: 'rgba(37, 99, 235, 0.45)',
}

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: `radial-gradient(circle at 15% 10%, ${colors.glow}, ${colors.canvas} 60%)`,
        color: colors.fg,
      }}
    >
      <div style={{ display: 'flex', fontSize: 44, fontWeight: 700 }}>
        <span style={{ color: colors.accent }}>{site.brand.monogram.at(0)}</span>
        {site.brand.initials}
        <span style={{ color: colors.accent }}>{site.brand.monogram.at(-1)}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
          {site.hero.title}
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: colors.muted }}>
          {`${site.name} · ${site.role} · ${site.location.city}, ${site.location.country}`}
        </div>
      </div>
    </div>,
    size,
  )
}
