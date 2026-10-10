/*
 * "Sobre mí" y cierre de contacto. Solo datos confirmados: título, ubicación,
 * modalidad, proyectos y formación (education.ts).
 */
export const aboutSection = {
  label: 'sobre mí',
  title: 'Un ingeniero de sistemas cerca de tu negocio.',
  paragraphs: [
    'Soy Gabriel Mayorga, ingeniero de sistemas. Atiendo en persona a negocios de El Rama y, en remoto, a negocios de cualquier lugar.',
    'Lo mismo reparo una computadora que no enciende que construyo un sistema web completo: mi tesis, DentalSystem, organiza la agenda, los expedientes y los reportes de una clínica dental.',
    'Sigo formándome en IA aplicada, desarrollo web y negocio para traer a tu negocio lo que de verdad sirve.',
  ],
  // TODO(foto): agregar la foto profesional en public/ y poner aquí su ruta y alt.
  photo: undefined as { src: string; alt: string } | undefined,
  // TODO(confirmar): ¿se pueden nombrar las empresas donde trabajó? Agregar experiencia aquí.
  facts: [
    { term: 'Profesión', detail: 'Ingeniero de Sistemas' },
    { term: 'Ubicación', detail: 'El Rama, RACCS, Nicaragua' },
    { term: 'Modalidad', detail: 'Presencial en El Rama y remoto' },
  ],
  learningTitle: 'Formación continua',
  learningIntro: 'Diplomas de Platzi, por área.',
  allCourses: 'Ver perfil completo en Platzi',
  /** Solo para lectores de pantalla, tras el nombre de cada curso. */
  courseContext: 'diploma en Platzi',
  linkedin: 'Ver mi LinkedIn',
  github: 'Ver mi GitHub',
} as const

export const contactSection = {
  label: 'contacto',
  title: '¿Qué está frenando a tu negocio hoy?',
  text: 'Escríbeme por WhatsApp y cuéntamelo con tus palabras. Vemos juntos el siguiente paso.',
  primary: 'Escribirme por WhatsApp',
  emailLabel: 'O por correo:',
} as const
