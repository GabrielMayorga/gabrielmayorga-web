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
  /** Enlace público al proyecto (sitio externo). */
  href?: string
  /** Ruta interna a una demo interactiva dentro de este sitio. */
  demo?: string
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

export type ServiceIcon = 'repair' | 'build' | 'equip'

/** Enlace externo secundario de una puerta (p. ej. la tienda de GoPartner en "Equipar"). */
export interface ServiceExternalLink {
  /** Texto visible: debe decir a dónde lleva. */
  label: string
  href: string
}

/** Una de las tres puertas de la home: Reparar, Construir, Equipar. */
export interface Service {
  /** Ancla estable, en minúsculas y con guiones. */
  slug: string
  icon: ServiceIcon
  /** El verbo de la puerta: "Reparar". */
  name: string
  /** Nombre del servicio para buscadores (datos estructurados). */
  serviceName: string
  /** Resumen para buscadores: qué hago yo, sin mencionar terceros. */
  serviceSummary: string
  /** El problema, en palabras del cliente. Es el título de la tarjeta. */
  problem: string
  /** Qué hago y qué obtiene el cliente. */
  description: string
  /** Ejemplos concretos de lo que incluye. */
  includes: readonly string[]
  /** Opcional. Herramientas, para el visitante técnico. */
  stack?: readonly string[]
  /** Texto del botón de WhatsApp de la tarjeta. */
  cta: string
  /** Mensaje predefinido de WhatsApp para esta puerta. */
  whatsappMessage: string
  /** Opcional. Segundo enlace, externo. */
  externalLink?: ServiceExternalLink
}

export interface ProcessStep {
  title: string
  description: string
  /** Opcional. Condición importante del paso (costos, pagos). */
  note?: string
}
