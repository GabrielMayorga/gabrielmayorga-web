/*
 * Demo de la agenda de DentalSystem. Todo es ficticio: clínica, odontólogos,
 * pacientes y citas. Replica las reglas del sistema real (horario, intervalos,
 * estados y transiciones, y que dos citas del mismo odontólogo no choquen).
 */

export type AppointmentStatus =
  'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'

export interface Dentist {
  id: string
  name: string
}

export interface Treatment {
  id: string
  name: string
  /** Múltiplo del intervalo de la agenda (30 min). */
  minutes: number
}

export interface Appointment {
  id: string
  patient: string
  treatmentId: string
  dentistId: string
  /** 0 = lunes … 5 = sábado. */
  day: number
  /** Minutos desde la medianoche: 8:30 → 510. */
  start: number
  minutes: number
  status: AppointmentStatus
  cancelReason?: string
}

/** Horario de atención del sistema real: lunes a sábado, 8:00 a 17:00, cada 30 min. */
export const schedule = {
  opens: 8 * 60,
  closes: 17 * 60,
  step: 30,
  days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  daysShort: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  /** El día que la demo toma como "hoy". */
  today: 2,
} as const

export const dentists = [
  { id: 'mendez', name: 'Dra. Laura Méndez' },
  { id: 'castillo', name: 'Dr. Andrés Castillo' },
] as const satisfies readonly Dentist[]

export const treatments = [
  { id: 'consulta', name: 'Consulta general', minutes: 30 },
  { id: 'limpieza', name: 'Limpieza dental', minutes: 30 },
  { id: 'resina', name: 'Resina', minutes: 60 },
  { id: 'extraccion', name: 'Extracción', minutes: 60 },
  { id: 'endodoncia', name: 'Endodoncia', minutes: 90 },
] as const satisfies readonly Treatment[]

export const patients = [
  'María José Rivas',
  'Carlos Herrera',
  'Ana Lucía Torres',
  'Jorge Medina',
  'Sofía Martínez',
  'Luis Fernando Ortiz',
  'Daniela Cruz',
  'Roberto Gutiérrez',
  'Valeria Sánchez',
  'Miguel Ángel Rojas',
] as const

const h = (hours: number, minutes = 0) => hours * 60 + minutes

/** Semana de ejemplo: días pasados cerrados, hoy en curso, días siguientes por confirmar. */
export const initialAppointments: readonly Appointment[] = [
  // Lunes
  {
    id: 'c1',
    patient: 'Carlos Herrera',
    treatmentId: 'limpieza',
    dentistId: 'mendez',
    day: 0,
    start: h(8),
    minutes: 30,
    status: 'completed',
  },
  {
    id: 'c2',
    patient: 'Ana Lucía Torres',
    treatmentId: 'resina',
    dentistId: 'castillo',
    day: 0,
    start: h(9),
    minutes: 60,
    status: 'completed',
  },
  {
    id: 'c3',
    patient: 'Jorge Medina',
    treatmentId: 'consulta',
    dentistId: 'mendez',
    day: 0,
    start: h(11),
    minutes: 30,
    status: 'no_show',
  },
  {
    id: 'c4',
    patient: 'Daniela Cruz',
    treatmentId: 'endodoncia',
    dentistId: 'castillo',
    day: 0,
    start: h(14),
    minutes: 90,
    status: 'completed',
  },
  // Martes
  {
    id: 'c5',
    patient: 'Sofía Martínez',
    treatmentId: 'extraccion',
    dentistId: 'castillo',
    day: 1,
    start: h(8, 30),
    minutes: 60,
    status: 'completed',
  },
  {
    id: 'c6',
    patient: 'Roberto Gutiérrez',
    treatmentId: 'limpieza',
    dentistId: 'mendez',
    day: 1,
    start: h(10),
    minutes: 30,
    status: 'cancelled',
    cancelReason: 'El paciente pidió cambiar de día.',
  },
  {
    id: 'c7',
    patient: 'Valeria Sánchez',
    treatmentId: 'resina',
    dentistId: 'mendez',
    day: 1,
    start: h(15),
    minutes: 60,
    status: 'completed',
  },
  // Miércoles (hoy)
  {
    id: 'c8',
    patient: 'María José Rivas',
    treatmentId: 'limpieza',
    dentistId: 'mendez',
    day: 2,
    start: h(8),
    minutes: 30,
    status: 'completed',
  },
  {
    id: 'c9',
    patient: 'Luis Fernando Ortiz',
    treatmentId: 'endodoncia',
    dentistId: 'castillo',
    day: 2,
    start: h(9),
    minutes: 90,
    status: 'in_progress',
  },
  {
    id: 'c10',
    patient: 'Miguel Ángel Rojas',
    treatmentId: 'consulta',
    dentistId: 'mendez',
    day: 2,
    start: h(10),
    minutes: 30,
    status: 'confirmed',
  },
  {
    id: 'c11',
    patient: 'Carlos Herrera',
    treatmentId: 'resina',
    dentistId: 'mendez',
    day: 2,
    start: h(11),
    minutes: 60,
    status: 'confirmed',
  },
  {
    id: 'c12',
    patient: 'Daniela Cruz',
    treatmentId: 'consulta',
    dentistId: 'castillo',
    day: 2,
    start: h(14),
    minutes: 30,
    status: 'scheduled',
  },
  // Jueves
  {
    id: 'c13',
    patient: 'Ana Lucía Torres',
    treatmentId: 'limpieza',
    dentistId: 'castillo',
    day: 3,
    start: h(8, 30),
    minutes: 30,
    status: 'scheduled',
  },
  {
    id: 'c14',
    patient: 'Jorge Medina',
    treatmentId: 'consulta',
    dentistId: 'mendez',
    day: 3,
    start: h(9),
    minutes: 30,
    status: 'scheduled',
  },
  {
    id: 'c15',
    patient: 'Sofía Martínez',
    treatmentId: 'endodoncia',
    dentistId: 'mendez',
    day: 3,
    start: h(13),
    minutes: 90,
    status: 'confirmed',
  },
  // Viernes
  {
    id: 'c16',
    patient: 'Valeria Sánchez',
    treatmentId: 'extraccion',
    dentistId: 'castillo',
    day: 4,
    start: h(10),
    minutes: 60,
    status: 'scheduled',
  },
  {
    id: 'c17',
    patient: 'Roberto Gutiérrez',
    treatmentId: 'limpieza',
    dentistId: 'mendez',
    day: 4,
    start: h(15, 30),
    minutes: 30,
    status: 'scheduled',
  },
  // Sábado
  {
    id: 'c18',
    patient: 'María José Rivas',
    treatmentId: 'resina',
    dentistId: 'castillo',
    day: 5,
    start: h(9),
    minutes: 60,
    status: 'scheduled',
  },
]

/** Textos de la página y de la demo. */
export const demoAgenda = {
  meta: {
    title: 'Demo: agenda de DentalSystem · Gabriel Mayorga',
    description:
      'Prueba la agenda de DentalSystem: agenda, confirma y cancela citas de una clínica dental ficticia, sin crear una cuenta.',
  },
  back: 'Volver a proyectos',
  eyebrow: 'Demo interactiva · DentalSystem WebApp',
  title: 'Agenda una cita como lo haría recepción.',
  intro:
    'Esta es una réplica de la agenda del sistema, con sus reglas principales: horario de atención, citas de 30 a 90 minutos y ningún choque de horario con el mismo odontólogo. La clínica, los odontólogos y los pacientes son ficticios, y nada se guarda.',
  tryThis: {
    title: 'Prueba esto',
    steps: [
      'Toca un espacio libre o “Nueva cita” y agenda a un paciente.',
      'Intenta agendar una endodoncia (90 min) que se cruce con otra cita del mismo odontólogo: esos horarios aparecen bloqueados.',
      'Abre una cita y cámbiale el estado: confirmar, iniciar consulta, completar o cancelar.',
    ],
  },

  app: {
    clinic: 'Clínica Dental Ejemplo',
    section: 'Agenda',
    role: 'Recepción',
    fictional: 'Datos ficticios',
    today: 'Hoy',
    allDentists: 'Todos',
    dentistFilter: 'Odontólogo',
    dayPicker: 'Día',
    newAppointment: 'Nueva cita',
    reset: 'Reiniciar demo',
    resetDone: 'La agenda volvió a su estado inicial.',
    emptySlot: (day: string, time: string) => `Agendar el ${day} a las ${time}`,
    todayLabel: (day: string) => `${day}, hoy`,
    blockLabel: (p: {
      day: string
      from: string
      to: string
      patient: string
      treatment: string
      dentist: string
      status: string
    }) => `${p.day}, ${p.from} a ${p.to}, ${p.patient}, ${p.treatment}, ${p.dentist}, ${p.status}`,
    legend: 'Estados',
  },

  status: {
    scheduled: 'Programada',
    confirmed: 'Confirmada',
    in_progress: 'En consulta',
    completed: 'Completada',
    cancelled: 'Cancelada',
    no_show: 'No asistió',
  } satisfies Record<AppointmentStatus, string>,

  detail: {
    when: 'Fecha y hora',
    duration: 'Duración',
    treatment: 'Tratamiento',
    dentist: 'Odontólogo',
    status: 'Estado',
    cancelReason: 'Motivo de cancelación',
    minutes: (n: number) => `${n} min`,
    close: 'Cerrar',
    actions: {
      confirm: 'Confirmar',
      start: 'Iniciar consulta',
      complete: 'Completar',
      noShow: 'No asistió',
      cancel: 'Cancelar cita',
    },
    cancelForm: {
      label: 'Motivo de cancelación (opcional)',
      submit: 'Confirmar cancelación',
      back: 'Volver',
    },
    changed: (patient: string, status: string) => `${patient}: ${status.toLowerCase()}.`,
  },

  form: {
    title: 'Nueva cita',
    patient: 'Paciente',
    patientHint: 'Escribe un nombre nuevo o elige uno de la lista.',
    patientError: 'Escribe el nombre del paciente.',
    treatment: 'Tratamiento',
    dentist: 'Odontólogo',
    day: 'Día',
    time: 'Hora',
    timeError: 'Elige un horario libre.',
    noFreeSlots:
      'Este odontólogo no tiene horarios libres ese día para un tratamiento de esta duración.',
    busy: (from: string, to: string) => `Ocupado: choca con la cita de ${from} a ${to}`,
    closed: 'Fuera de horario: la cita terminaría después del cierre',
    legendFree: 'Libre',
    legendBusy: 'No disponible',
    submit: 'Agendar cita',
    cancel: 'Cancelar',
    created: (patient: string, day: string, time: string) =>
      `Cita agendada: ${patient}, ${day} a las ${time}.`,
  },

  cta: {
    title: '¿Tu negocio necesita algo así?',
    text: 'Agenda, inventario, pedidos o reportes: cuéntame cómo trabajas hoy y te digo cómo lo resolvería.',
    button: 'Escríbeme por WhatsApp',
    whatsappMessage: 'Hola Gabriel, vi la demo de la agenda y quiero algo así para mi negocio…',
    code: 'Ver el código en GitHub',
  },
} as const
