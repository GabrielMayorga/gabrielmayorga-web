import type { SocialLink } from './types'

/*
 * Datos globales del sitio. Todo texto de la página sale de src/content/,
 * nunca escrito directamente en un componente.
 */

/**
 * Número de WhatsApp en formato internacional, sin "+" ni espacios (Nicaragua = 505).
 * Sale solo de NEXT_PUBLIC_WHATSAPP (.env.local en tu equipo, variables del proyecto
 * en Vercel). Sin ella el build se detiene: mejor un error claro que publicar un
 * número viejo escrito en el código.
 */
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP?.trim() ?? ''
if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
  throw new Error(
    'Falta NEXT_PUBLIC_WHATSAPP (solo dígitos, con código de país, p. ej. 505XXXXXXXX). ' +
      'Defínela en .env.local o en las variables del proyecto en Vercel.',
  )
}

export const site = {
  name: 'Gabriel Mayorga',
  role: 'Ingeniero de Sistemas',
  title: 'Gabriel Mayorga · Soporte técnico, sistemas a la medida y asesoría en equipos',
  description:
    'Reparo computadoras y redes, construyo sitios web y sistemas a la medida, y te asesoro para elegir y comprar equipos originales. En El Rama y en remoto.',
  // TODO(dominio): poner NEXT_PUBLIC_SITE_URL cuando exista el dominio propio.
  // Mientras, en Vercel se usa su dominio de producción (variable que Vercel define sola).
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'),
  locale: 'es',

  location: {
    city: 'El Rama',
    region: 'RACCS',
    country: 'Nicaragua',
    countryCode: 'NI',
    /** Cómo atiende: presencial en la ciudad y remoto en cualquier lugar. */
    serviceModes: ['presencial', 'remoto'] as const,
  },

  brand: {
    monogram: '{GM}',
    initials: 'GM',
    /** En minúsculas: la mayúscula la pone CSS (los lectores de pantalla deletrean texto en mayúsculas). */
    footerTagline: 'Reparar · Construir · Equipar',
  },

  contact: {
    whatsapp: {
      number: WHATSAPP_NUMBER,
      message: 'Hola Gabriel, vi tu página y necesito ayuda con…',
    },
    email: 'gabrielmayorga1546@gmail.com',
  },

  social: [
    {
      network: 'github',
      label: 'GitHub',
      href: 'https://github.com/GabrielMayorga',
      handle: 'GabrielMayorga',
    },
    {
      network: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/gabriel-mf25',
      handle: 'gabriel-mf25',
    },
    {
      network: 'youtube',
      label: 'YouTube',
      href: 'https://www.youtube.com/@gabrielmayorga5170',
      handle: '@gabrielmayorga5170',
    },
    {
      network: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/gabriel_mayorga21',
      handle: '@gabriel_mayorga21',
    },
  ] satisfies readonly SocialLink[],

  platzi: {
    profile: 'https://platzi.com/p/gabrielmayorga1546646/',
  },

  /** Vista previa al compartir el enlace (WhatsApp, Facebook, LinkedIn). */
  share: {
    imageAlt:
      'Gabriel Mayorga, ingeniero de sistemas: soporte técnico, sistemas a la medida y asesoría en equipos, en El Rama y en remoto.',
    locale: 'es_NI',
  },

  /** Primera pantalla. El h1 es la promesa en lenguaje del cliente. */
  hero: {
    eyebrow: 'Gabriel Mayorga · Ingeniero de Sistemas',
    title: 'Reparo, construyo y te asesoro en tecnología.',
    subtitle:
      'Soporte técnico, sistemas a la medida y equipos originales con factura y garantía, para personas y negocios de El Rama y en remoto.',
    primaryCta: 'Cuéntame qué necesitas',
    secondaryCta: 'Ver servicios',
  },

  /** Secciones enlazadas en la navegación (los id coinciden con cada <Section>). */
  nav: [
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Proyectos', href: '/#proyectos' },
    { label: 'Cómo trabajo', href: '/#proceso' },
    { label: 'Sobre mí', href: '/#sobre-mi' },
  ],

  /** Textos de interfaz (accesibilidad y controles). */
  ui: {
    skipToContent: 'Saltar al contenido',
    /** Tras el nombre visible del encabezado, solo para lectores de pantalla. */
    homeLinkSuffix: ', ir al inicio',
    navLabel: 'Principal',
    whatsappShort: 'WhatsApp',
    themeToDark: 'Activar tema oscuro',
    themeToLight: 'Activar tema claro',
    footerSocialLabel: 'Redes sociales',
    rights: 'Gabriel Mayorga',
    newTab: '(se abre en otra pestaña)',
    viaWhatsapp: 'por WhatsApp',
  },
} as const
