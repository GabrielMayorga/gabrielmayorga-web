import {
  type Appointment,
  type AppointmentStatus,
  dentists,
  schedule,
  treatments,
} from '@/content/demo-agenda'

/*
 * Reglas de la agenda, sin React. Replican las del sistema real:
 * - Intervalos semiabiertos [inicio, fin): una cita que termina a las 9:30
 *   no choca con otra que empieza a las 9:30.
 * - Solo choca con citas del mismo odontólogo.
 * - Diferencia con el sistema real: en la demo una cita cancelada libera su
 *   horario, para que se pueda volver a agendar sin confusión.
 */

export type SlotState = 'free' | 'busy' | 'closed'

export interface Slot {
  start: number
  state: SlotState
  /** Cita con la que choca (solo si state = 'busy'). */
  conflict?: { start: number; end: number }
}

const p2 = (n: number) => String(n).padStart(2, '0')

/** 510 → '8:30' */
export function formatTime(minutes: number): string {
  return `${Math.floor(minutes / 60)}:${p2(minutes % 60)}`
}

/** Inicio de cada intervalo del día: 8:00, 8:30 … 16:30. */
export const slotStarts: readonly number[] = Array.from(
  { length: (schedule.closes - schedule.opens) / schedule.step },
  (_, i) => schedule.opens + i * schedule.step,
)

export const treatmentName = (id: string) => treatments.find((t) => t.id === id)?.name ?? id
export const dentistName = (id: string) => dentists.find((d) => d.id === id)?.name ?? id

export function occupiesTime(appointment: Appointment): boolean {
  return appointment.status !== 'cancelled'
}

/** Estado de cada horario de un día para un odontólogo y una duración. */
export function computeSlots(
  appointments: readonly Appointment[],
  { day, dentistId, minutes }: { day: number; dentistId: string; minutes: number },
): Slot[] {
  const taken = appointments.filter(
    (a) => a.day === day && a.dentistId === dentistId && occupiesTime(a),
  )

  return slotStarts.map((start) => {
    const end = start + minutes
    const clash = taken.find((a) => start < a.start + a.minutes && a.start < end)
    if (clash) {
      return {
        start,
        state: 'busy',
        conflict: { start: clash.start, end: clash.start + clash.minutes },
      }
    }
    if (end > schedule.closes) return { start, state: 'closed' }
    return { start, state: 'free' }
  })
}

/** Transiciones permitidas desde cada estado (las mismas del sistema real). */
export const transitions: Record<AppointmentStatus, readonly AppointmentStatus[]> = {
  scheduled: ['confirmed', 'no_show', 'cancelled'],
  confirmed: ['in_progress', 'no_show', 'cancelled'],
  in_progress: ['completed'],
  completed: [],
  cancelled: [],
  no_show: [],
}

/**
 * Columnas para dibujar las citas de un día: una cita ocupa todo el ancho salvo
 * que se cruce en el tiempo con otra (de otro odontólogo); entonces se reparten.
 */
export function layoutDay(
  dayAppointments: readonly Appointment[],
): Map<string, { column: number; columns: number }> {
  const sorted = [...dayAppointments].sort((a, b) => a.start - b.start || b.minutes - a.minutes)
  const layout = new Map<string, { column: number; columns: number }>()
  let cluster: Appointment[] = []
  let columnEnds: number[] = []
  let clusterEnd = -1

  const flush = () => {
    for (const a of cluster) {
      const entry = layout.get(a.id)
      if (entry) entry.columns = columnEnds.length
    }
    cluster = []
    columnEnds = []
  }

  for (const a of sorted) {
    if (a.start >= clusterEnd) flush()
    let column = columnEnds.findIndex((end) => end <= a.start)
    if (column === -1) column = columnEnds.push(0) - 1
    columnEnds[column] = a.start + a.minutes
    layout.set(a.id, { column, columns: 1 })
    cluster.push(a)
    clusterEnd = Math.max(clusterEnd, a.start + a.minutes)
  }
  flush()
  return layout
}
