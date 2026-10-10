import type { Project, ProjectStatus } from './types'

/** Textos de la sección. Los datos de cada proyecto van en `projects`, abajo. */
export const projectsSection = {
  label: 'proyectos',
  title: 'Del problema a la solución, paso por paso.',
  intro:
    'Cada proyecto empieza por entender qué falla en el día a día. Aquí ves el problema, lo que hice y con qué lo construí.',
  problemLabel: 'El problema',
  solutionLabel: 'Lo que hice',
  resultLabel: 'Resultado',
  stackLabel: 'Tecnologías',
  demoCta: 'Ver demo',
  repoCta: 'Ver código',
  /** Completa el nombre accesible del enlace: "Ver demo de DentalSystem WebApp". */
  linkContext: (projectName: string) => `de ${projectName}`,
  repoContext: (projectName: string) => `de ${projectName} en GitHub`,
  status: {
    'in-development': 'En desarrollo',
    active: 'Activo',
    completed: 'Terminado',
  } satisfies Record<ProjectStatus, string>,
  /** Sin proyectos visibles: la sección no queda vacía, invita a escribir. */
  empty: {
    text: 'Estoy preparando los casos para mostrarlos aquí. Si quieres ver ejemplos de mi trabajo, pídemelos.',
    cta: 'Pedir ejemplos por WhatsApp',
    whatsappMessage: 'Hola Gabriel, me gustaría ver ejemplos de tu trabajo…',
  },
} as const

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
    summary: 'Agenda, expedientes y reportes para clínicas dentales, en un solo lugar.',
    // TODO(confirmar): ¿la tesis se basó en una clínica real? ¿se puede mencionar?
    problem:
      'En muchas clínicas dentales las citas se llevan en papel y por mensajería: se duplican horarios con el mismo odontólogo, confirmar cada cita le quita tiempo a recepción y los espacios que deja una inasistencia no se aprovechan.',
    solution:
      'Una aplicación web que permite a recepción agendar en un calendario sin choques de horario, a los odontólogos llevar el expediente clínico de cada paciente y a la administración consultar indicadores del período que elija. Cada usuario ve solo lo que su rol le permite.',
    stack: ['React', 'Vite', 'Material UI', 'FullCalendar', 'Node.js', 'Express', 'PostgreSQL'],
    // TODO(confirmar): ¿mostrar la demo? Requiere inicio de sesión. Oculta hasta confirmar.
    // href: 'https://dental-day-web.vercel.app',
    // TODO(confirmar): ¿"Dental Day" identifica a una clínica real? ¿el repo no tiene datos reales?
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
    // TODO(autorización): redactar con Gabriel cuando se autorice.
    problem: '',
    solution:
      'Implementé el catálogo digital, gestioné la atención por WhatsApp Business y coordiné el contenido promocional.',
    stack: ['WhatsApp Business'],
  },
] as const satisfies readonly Project[]

export const visibleProjects: readonly Project[] = projects.filter(
  (project: Project) => project.visible !== false,
)
