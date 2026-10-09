import { site } from '@/content/site'

// Página provisional de la Fase 0: comprueba que tokens y fuentes están conectados.
export default function Home() {
  return (
    <div className="container-page section-space">
      <p className="section-label">{'{ fase 0 }'}</p>
      <h1 className="mt-4 text-display font-semibold">{site.name}</h1>
      <p className="mt-6 max-w-2xl text-lead text-fg-muted">{site.tagline}</p>
    </div>
  )
}
