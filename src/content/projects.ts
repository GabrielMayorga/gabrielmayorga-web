import type { Project } from './types'

/*
 * Para agregar un proyecto: añade un objeto a este array. Nada más.
 * Los campos opcionales vacíos no se renderizan.
 */
export const projects = [
  {
    slug: 'dentalsystem-webapp',
    name: 'DentalSystem WebApp',
    type: 'Sistema de gestión · Tesis',
    status: 'in-development',
    summary: 'Agenda, expedientes y reportes de una clínica dental en un solo lugar.',
    problem:
      'La clínica manejaba sus citas en papel y mensajería: citas duplicadas con el mismo odontólogo, confirmaciones manuales que consumían tiempo de recepción y horarios vacíos por inasistencias que no se podían reasignar.',
    solution:
      'Una aplicación web donde recepción agenda en un calendario que no permite choques de horario, los odontólogos registran el expediente clínico de cada paciente y la administración consulta indicadores del período que elija. Cada usuario ve solo lo que su rol le permite.',
    stack: ['React', 'Vite', 'Material UI', 'FullCalendar', 'Node.js', 'Express', 'PostgreSQL'],
    // TODO(confirmar): ¿mostrar la demo? Requiere inicio de sesión.
    href: 'https://dental-day-web.vercel.app',
    repo: 'https://github.com/GabrielMayorga/dental-day-web',
  },
  {
    slug: 'casa-de-las-pacas',
    name: 'Casa de las Pacas',
    type: 'Caso de estudio · Operación digital',
    status: 'completed', // TODO(confirmar): ¿la operación sigue activa?
    // TODO(autorización): no publicar hasta que el dueño autorice mostrarlo.
    // Redacción siempre en lenguaje de ejecución; sin cifras, precios ni datos internos.
    visible: false,
    summary: 'Lideré la operación digital de una tienda: catálogo, WhatsApp y contenido.',
    problem: 'TODO: redactar con Gabriel cuando se autorice.',
    solution:
      'Implementé el catálogo digital, gestioné la atención por WhatsApp Business y coordiné el contenido promocional.',
    stack: ['WhatsApp Business'],
  },
] as const satisfies readonly Project[]

export const visibleProjects: readonly Project[] = projects.filter(
  (project: Project) => project.visible !== false,
)
