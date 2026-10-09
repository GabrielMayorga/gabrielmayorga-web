import { Inter, JetBrains_Mono, Poppins } from 'next/font/google'

/*
 * next/font descarga las fuentes en build y las sirve desde el propio dominio:
 * sin peticiones a Google en tiempo de ejecución y con métricas de respaldo
 * ajustadas (adjustFontFallback), así el texto no salta al cargar la fuente.
 */

// Títulos. Poppins no es variable: solo cargamos los pesos que usa el sistema.
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
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
