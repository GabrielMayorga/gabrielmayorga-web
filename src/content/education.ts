import type { CourseGroup } from './types'

const diploma = (path: string) =>
  `https://platzi.com/p/gabrielmayorga1546646/curso/${path}/diploma/detalle/`

/*
 * Diplomas de Platzi, agrupados por área para contar una historia de
 * aprendizaje continuo. Fuente: perfil público de Platzi (8 de oct. de 2026).
 * "Gestión Efectiva del Tiempo" aparece dos veces en Platzi: se muestra una.
 */
export const courseGroups = [
  {
    area: 'IA aplicada',
    courses: [
      { name: 'Curso de Claude AI', href: diploma('12651-claude') },
      { name: 'Curso de Prompt Engineering', href: diploma('12323-prompt-engineering') },
    ],
  },
  {
    area: 'Desarrollo web',
    courses: [{ name: 'Curso de HTML', href: diploma('12341-html') }],
  },
  {
    area: 'Negocio y atención al cliente',
    courses: [
      { name: 'Curso de WhatsApp Business', href: diploma('8025-whatsapp-for-business') },
      { name: 'Curso de Marketing Digital', href: diploma('10994-introduccion-marketing') },
      {
        name: 'Glosario de Términos de Marketing Digital',
        href: diploma('2314-terminos-marketing-digital'),
      },
    ],
  },
  {
    area: 'Habilidades profesionales',
    courses: [
      { name: 'Curso de Oratoria Profesional', href: diploma('12966-oratoria-profesional') },
      { name: 'Curso de Gestión Efectiva del Tiempo', href: diploma('12069-gestion-tiempo') },
    ],
  },
] as const satisfies readonly CourseGroup[]
