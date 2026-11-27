import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    agentUpgrade: 'security',
  },
  // La demo cambió de ruta al renombrar el proyecto: 308 para no romper enlaces viejos.
  redirects() {
    return [
      {
        source: '/proyectos/dentalsystem',
        destination: '/proyectos/dental-cloud',
        permanent: true,
      },
    ]
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
}

export default nextConfig
