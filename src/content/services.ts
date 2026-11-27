import type { Service } from './types'

/*
 * Las tres puertas de la home: Reparar, Construir, Equipar. Cada tarjeta parte del
 * problema del cliente, no de la tecnología. El campo opcional `stack` es para el
 * visitante técnico; vacío no se renderiza.
 *
 * GoPartner solo aparece en "Equipar": GoPartner vende, factura, entrega y da la
 * garantía; Gabriel asesora y conecta la venta. Nunca se menciona su comisión.
 */
export const servicesSection = {
  label: 'servicios',
  title: '¿Qué necesitas resolver?',
  intro:
    'Para reparar o construir, antes de revisar te digo cuánto cuesta el diagnóstico, y antes de empezar te envío por escrito qué haría y cuánto costaría. Así decides con toda la información.',
  fallback: '¿Tu caso no aparece aquí? Escríbeme igual y lo vemos.',
  fallbackCta: 'Cuéntamelo por WhatsApp',
} as const

export const services = [
  {
    slug: 'reparar',
    icon: 'repair',
    name: 'Reparar',
    serviceName: 'Soporte técnico y redes',
    serviceSummary:
      'Diagnóstico, mantenimiento preventivo y correctivo de computadoras, cambio a SSD, redes e impresoras.',
    problem: 'Tu equipo o tu red fallan y tu trabajo se detiene.',
    description:
      'Diagnóstico, mantenimiento preventivo y correctivo, cambio a SSD, redes e impresoras. Cotización por escrito antes de empezar.',
    includes: [
      'Computadoras lentas, con virus o que no encienden',
      'Cambio de disco mecánico a SSD',
      'Redes y Wi-Fi que se caen',
      'Impresoras que no imprimen o no se conectan',
    ],
    cta: 'Pedir una revisión',
    whatsappMessage: 'Hola Gabriel, necesito que revises…',
  },
  {
    slug: 'construir',
    icon: 'build',
    name: 'Construir',
    serviceName: 'Sitios web, sistemas a la medida y automatización',
    serviceSummary:
      'Sitios web, sistemas a la medida y automatización de procesos y de la atención por WhatsApp.',
    problem: 'Tareas repetitivas que te quitan horas, o procesos que siguen en cuaderno o Excel.',
    description:
      'Sitios web, sistemas a la medida y automatización de procesos y de la atención por WhatsApp.',
    includes: [
      'Página de tu negocio con botón directo a tu WhatsApp',
      'Sistemas a la medida: citas, expedientes y reportes',
      'Respuestas y catálogo en WhatsApp Business',
      'Reportes que se arman sin copiar y pegar',
    ],
    stack: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    cta: 'Contar mi proceso',
    whatsappMessage: 'Hola Gabriel, quiero dejar de hacer a mano…',
  },
  {
    slug: 'equipar',
    icon: 'equip',
    name: 'Equipar',
    serviceName: 'Asesoría para comprar equipos',
    serviceSummary:
      'Asesoría para elegir celulares, televisores y computadoras según tu uso y presupuesto.',
    problem: 'Quieres comprar un celular, una TV o una computadora sin dudas.',
    description:
      'Te asesoro según tu uso y presupuesto. Gestiono tu pedido con GoPartner, que factura, entrega y da la garantía.',
    includes: [
      'Celulares, televisores y computadoras',
      'Equipos originales con factura y garantía',
    ],
    cta: 'Pedir asesoría',
    whatsappMessage: 'Hola Gabriel, quiero comprar… y me gustaría tu recomendación.',
    externalLink: {
      label: 'Ver tienda en GoPartner',
      // TODO(confirmar): ¿es este el enlace definitivo de GoPartner?
      href: 'https://fjmendez.app/c/gabrielmayorga1546',
    },
  },
] as const satisfies readonly Service[]
