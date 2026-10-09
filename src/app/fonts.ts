import { Inter, JetBrains_Mono, Poppins } from 'next/font/google'

/*
 * next/font descarga las fuentes en build y las sirve desde el propio dominio:
 * sin peticiones a Google en tiempo de ejecución y con métricas de respaldo
 * ajustadas (adjustFontFallback), así el texto no salta al cargar la fuente.
 */

// Títulos. Poppins no es variable: cada peso es un archivo más en la ruta crítica.
// El sistema solo usa 600 (font-semibold) en títulos, así que solo se carga ese.
export const poppins = Poppins({
  subsets: ['latin'],
  weight: '600',
  display: 'swap',
  variable: '--font-poppins',
})

// Cuerpo. Variable: un solo archivo cubre todos los pesos.
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Detalles técnicos ({GM}, etiquetas). No está en la ruta crítica: sin preload.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  preload: false,
})
