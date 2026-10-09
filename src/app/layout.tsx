import type { Metadata, Viewport } from 'next'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { ThemeScript } from '@/components/layout/theme-script'
import { site } from '@/content/site'
import { inter, jetbrainsMono, poppins } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  colorScheme: 'light dark',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    // suppressHydrationWarning: el script de tema cambia data-theme antes de hidratar.
    <html
      lang="es"
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="sr-only rounded-full bg-accent-solid px-6 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[60]"
        >
          {site.ui.skipToContent}
        </a>
        <SiteHeader />
        <main id="contenido" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
