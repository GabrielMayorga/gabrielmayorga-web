import type { Project } from '@/content/types'

/*
 * Datos extremos pero realistas para probar la sección de proyectos en /dev.
 * No se usan en producción. Cada proyecto rompe algo distinto.
 */
export const worstCaseProjects: readonly Project[] = [
  {
    slug: 'sistema-inventario',
    name: 'Sistema de Inventario y Facturación para Ferretería y Materiales de Construcción',
    type: 'Sistema de gestión · Facturación electrónica · Inventario multisucursal',
    status: 'active',
    summary:
      'Inventario, ventas a crédito y facturas de tres sucursales en un solo lugar, consultable desde el celular del dueño.',
    problem:
      'Cada sucursal llevaba su inventario en un cuaderno distinto y el dueño solo se enteraba de los faltantes cuando un cliente pedía algo que no había. Las ventas a crédito se anotaban a mano y al final del mes nadie sabía con certeza quién debía qué, ni desde cuándo, ni cuánto se había abonado ya.',
    solution:
      'Un sistema web donde cada venta descuenta del inventario de su sucursal, avisa cuando un producto baja del mínimo y lleva el saldo de cada cliente a crédito con su historial de abonos.',
    result: 'Los cierres de mes dejaron de hacerse a mano.',
    stack: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Prisma',
      'Tailwind CSS',
      'Docker',
      'GitHub Actions',
      '@tanstack/react-query',
      'Zod',
      'Vercel',
    ],
    href: 'https://inventario-ferreteria-demo-sucursales.vercel.app',
    repo: 'https://github.com/GabrielMayorga/sistema-inventario-facturacion-ferreteria',
  },
  {
    slug: 'kiosko',
    name: 'Kiosko',
    type: 'Sitio web',
    status: 'completed',
    summary: 'Menú en línea.',
    problem: 'Pedidos por llamada.',
    solution: 'Menú con botón a WhatsApp.',
    stack: ['HTML'],
  },
  {
    slug: 'bot-citas',
    name: 'AsistenteDeCitasWhatsAppClínicaVeterinaria',
    type: 'Automatización',
    status: 'in-development',
    summary: 'Confirma citas por WhatsApp sin que recepción escriba cada mensaje. 🐾',
    problem: 'Recepción confirmaba cada cita a mano, una por una, al final del día.',
    solution: 'Un asistente que envía la confirmación y registra la respuesta del cliente.',
    stack: ['WhatsApp Business API', 'n8n'],
    repo: 'https://github.com/GabrielMayorga/asistente-citas',
  },
  {
    slug: 'sin-stack',
    name: 'Red de oficina',
    type: 'Soporte técnico',
    status: 'completed',
    summary: 'Wi-Fi estable en las dos plantas de la oficina.',
    problem: 'La señal no llegaba al segundo piso.',
    solution: 'Reubiqué el enrutador y agregué un punto de acceso cableado.',
    stack: [],
  },
  {
    slug: 'catalogo',
    name: 'Catálogo digital',
    type: 'Sitio web',
    status: 'active',
    summary: 'Catálogo con precios actualizados que el dueño edita desde una hoja de cálculo.',
    problem: 'Cada cambio de precio obligaba a reimprimir el catálogo.',
    solution: 'Un catálogo web que lee los precios de una hoja de cálculo compartida.',
    stack: ['Next.js', 'Google Sheets'],
    href: 'https://catalogo.example.com',
  },
  {
    slug: 'reportes',
    name: 'Reportes automáticos de ventas',
    type: 'Automatización',
    status: 'in-development',
    summary: 'El reporte semanal de ventas llega solo al correo del dueño cada lunes.',
    problem: 'Armar el reporte tomaba la mañana del lunes copiando datos de varias hojas.',
    solution: 'Un flujo que junta los datos y envía el resumen por correo.',
    stack: ['Python', 'Google Sheets API'],
  },
]
