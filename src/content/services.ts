import type { Service } from './types'

/*
 * Servicios: cada tarjeta parte del problema del cliente, no de la tecnología.
 * El campo opcional `stack` es para el visitante técnico; vacío no se renderiza.
 */
export const servicesSection = {
  label: 'servicios',
  title: 'Cuéntame qué te está frenando y te digo cómo lo resolvería.',
  intro:
    'Antes de empezar te envío por escrito qué haría y cuánto costaría. Así decides con toda la información.',
  fallback: '¿Tu caso no aparece aquí? Escríbeme igual y lo vemos.',
  fallbackCta: 'Cuéntamelo por WhatsApp',
} as const

export const services = [
  {
    slug: 'soporte-tecnico',
    icon: 'support',
    name: 'Soporte técnico',
    problem: 'Tu computadora, impresora o internet dejó de funcionar.',
    description:
      'Reviso el equipo o la red, te explico en palabras simples qué falló y qué hace falta para que vuelvas a trabajar.',
    includes: [
      'Computadoras lentas, con virus o que no encienden',
      'Redes y Wi-Fi que se caen',
      'Impresoras y equipos de oficina',
      'Consejo antes de comprar equipo nuevo',
    ],
    cta: 'Pedir soporte',
    whatsappMessage: 'Hola Gabriel, necesito soporte técnico con…',
  },
  {
    slug: 'sitios-web',
    icon: 'web',
    name: 'Sitios web y sistemas',
    problem: 'Tus clientes no tienen dónde ver lo que ofreces ni cómo escribirte.',
    description:
      'Construyo un sitio rápido, pensado para el celular, que muestra lo que ofreces y lleva a tus clientes directo a tu WhatsApp.',
    includes: [
      'Página de tu negocio con servicios y ubicación',
      'Diseño hecho primero para el celular',
      'Botón directo a tu WhatsApp',
      'Sistemas a la medida: citas, expedientes y reportes',
    ],
    stack: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    cta: 'Cotizar mi sitio',
    whatsappMessage: 'Hola Gabriel, quiero un sitio web para mi negocio…',
  },
  {
    slug: 'automatizacion',
    icon: 'automation',
    name: 'Automatización',
    problem: 'Procesos manuales que te consumen horas cada semana.',
    description:
      'Identifico las tareas que se repiten en tu negocio y las automatizo para que dejes de hacerlas a mano y dediques ese tiempo a tus clientes.',
    includes: [
      'Respuestas y catálogo en WhatsApp Business',
      'Reportes que se arman sin copiar y pegar',
      'Textos y respuestas que hoy escribes desde cero, preparados con IA',
    ],
    stack: ['WhatsApp Business'],
    cta: 'Automatizar una tarea',
    whatsappMessage: 'Hola Gabriel, quiero automatizar una tarea de mi negocio…',
  },
] as const satisfies readonly Service[]
