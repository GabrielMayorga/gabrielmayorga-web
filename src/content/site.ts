import type { SocialLink } from './types'

/*
 * Datos globales del sitio. Todo texto de la página sale de src/content/,
 * nunca escrito directamente en un componente.
 */

/**
 * Número de WhatsApp en formato internacional, sin "+" ni espacios.
 * Se puede sobrescribir con NEXT_PUBLIC_WHATSAPP (ver .env.example).
 */
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP ?? '50586602410'

export const site = {
  name: 'Gabriel Mayorga',
  role: 'Ingeniero de Sistemas',
  /** Posicionamiento. */
  tagline: 'Construyo soluciones tecnológicas reales.',
  title: 'Gabriel Mayorga · Soporte técnico, sitios web y automatización',
  description:
    'Reparo, construyo y equipo la tecnología de tu negocio: soporte técnico, sitios web a la medida y automatización de procesos. En El Rama y en remoto.',
  // TODO(dominio): reemplazar cuando exista el dominio propio. Mientras, la URL de Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
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
    footerTagline: 'IA · AUTOMATIZACIÓN · DESARROLLO',
    // TODO(nuvix): la marca Nuvix se conectará más adelante como respaldo del negocio.
  },

  contact: {
    whatsapp: {
      number: WHATSAPP_NUMBER,
      display: '+505 8660 2410',
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

  /** Primera pantalla. El h1 es la promesa en lenguaje del cliente. */
  hero: {
    eyebrow: 'Gabriel Mayorga · Ingeniero de Sistemas',
    title: 'Tu tecnología funcionando. Tú, enfocado en tu negocio.',
    subtitle:
      'Reparo equipos y redes, construyo sitios web y automatizo tareas repetitivas. Para negocios en El Rama y en remoto, con cotización por escrito antes de empezar.',
    primaryCta: 'Cuéntame qué necesitas',
    secondaryCta: 'Ver servicios',
  },

  /** Secciones enlazadas en la navegación (los id coinciden con cada <Section>). */
  nav: [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Cómo trabajo', href: '#proceso' },
    { label: 'Sobre mí', href: '#sobre-mi' },
  ],

  /** Textos de interfaz (accesibilidad y controles). */
  ui: {
    skipToContent: 'Saltar al contenido',
    homeLink: 'Gabriel Mayorga, ir al inicio',
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
