/*
 * Tipos del contenido. Si a un objeto le falta un campo requerido,
 * TypeScript marca el error en el archivo de datos, antes de llegar a la página.
 */

export type ProjectStatus = 'in-development' | 'active' | 'completed'

export interface Project {
  /** Identificador estable, en minúsculas y con guiones. */
  slug: string
  name: string
  /** Qué es, en pocas palabras: "Sistema de gestión", "Sitio web", "Caso de estudio". */
  type: string
  status: ProjectStatus
  /** Una línea que entienda un dueño de negocio. */
  summary: string
  problem: string
  solution: string
  /** Opcional. Solo resultados verificables: nada de cifras inventadas. */
  result?: string
  stack: readonly string[]
  /** Enlace público al proyecto (demo o sitio). */
  href?: string
  /** Repositorio público. */
  repo?: string
  /** false lo oculta sin borrarlo. Por defecto se muestra. */
  visible?: boolean
}

export interface Course {
  name: string
  href: string
}

export interface CourseGroup {
  area: string
  courses: readonly Course[]
}

export type SocialNetwork = 'github' | 'linkedin' | 'youtube' | 'instagram'

export interface SocialLink {
  network: SocialNetwork
  label: string
  href: string
  /** Usuario visible, p. ej. "@gabriel_mayorga21". */
  handle: string
}
