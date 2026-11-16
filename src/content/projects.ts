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
  tryDemoCta: 'Probar la agenda',
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
    summary: 'Sistema de agenda, expedientes y reportes para una clínica dental.',
    // Clínica real; por decisión de Gabriel no se nombra (la demo usa una ficticia).
    problem:
      'La clínica manejaba sus citas en papel y mensajería: citas duplicadas con el mismo odontólogo, confirmaciones manuales que consumían tiempo de recepción y horarios vacíos por inasistencias que no se podían reasignar.',
    solution:
      'Una aplicación web que permite a recepción agendar en un calendario sin choques de horario, a los odontólogos llevar el expediente clínico de cada paciente y a la administración consultar indicadores del período que elija. Cada usuario ve solo lo que su rol le permite.',
    stack: ['React', 'Vite', 'Material UI', 'FullCalendar', 'Node.js', 'Express', 'PostgreSQL'],
    demo: '/proyectos/dentalsystem',
    repo: 'https://github.com/GabrielMayorga/dental-day-web',
  },
] as const satisfies readonly Project[]

export const visibleProjects: readonly Project[] = projects.filter(
  (project: Project) => project.visible !== false,
)
