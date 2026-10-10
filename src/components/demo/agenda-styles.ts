import type { AppointmentStatus } from '@/content/demo-agenda'

/* Clases por estado. Escritas completas para que Tailwind las detecte. */
export const statusBorder: Record<AppointmentStatus, string> = {
  scheduled: 'border-status-scheduled',
  confirmed: 'border-status-confirmed',
  in_progress: 'border-status-in-progress',
  completed: 'border-status-completed',
  cancelled: 'border-status-cancelled',
  no_show: 'border-status-no-show',
}

export const statusDot: Record<AppointmentStatus, string> = {
  scheduled: 'bg-status-scheduled',
  confirmed: 'bg-status-confirmed',
  in_progress: 'bg-status-in-progress',
  completed: 'bg-status-completed',
  cancelled: 'bg-status-cancelled',
  no_show: 'bg-status-no-show',
}

/** Campo de formulario: 44 px de alto, 16 px+ de texto (iOS no hace zoom), borde ≥ 3:1. */
export const fieldClass =
  'min-h-11 w-full rounded-xs border border-fg-muted bg-canvas px-4 text-body text-fg aria-invalid:border-danger-text'

export const fieldLabelClass = 'block text-small font-medium'
