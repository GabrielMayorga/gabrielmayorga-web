'use client'

import { useId, useRef, useState } from 'react'
import {
  type Appointment,
  type AppointmentStatus,
  demoAgenda,
  schedule,
} from '@/content/demo-agenda'
import { Button } from '@/components/ui/button'
import { dentistName, formatTime, transitions, treatmentName } from '@/lib/agenda'
import { cn } from '@/lib/cn'
import { fieldClass, fieldLabelClass, statusDot } from './agenda-styles'
import { Sheet } from './sheet'

const { detail, status: statusLabels } = demoAgenda

const actionLabel: Partial<Record<AppointmentStatus, string>> = {
  confirmed: detail.actions.confirm,
  in_progress: detail.actions.start,
  completed: detail.actions.complete,
  no_show: detail.actions.noShow,
  cancelled: detail.actions.cancel,
}

interface AppointmentDetailProps {
  appointment: Appointment | null
  onClose: () => void
  onChangeStatus: (id: string, status: AppointmentStatus, cancelReason?: string) => void
}

/** Detalle de una cita con los cambios de estado que permite el sistema real. */
export function AppointmentDetail({
  appointment,
  onClose,
  onChangeStatus,
}: AppointmentDetailProps) {
  // Conserva la última cita mientras el panel se cierra, para que la salida no quede vacía
  const [shown, setShown] = useState(appointment)
  const [cancelling, setCancelling] = useState(false)
  const [reason, setReason] = useState('')
  const reasonId = useId()
  const statusRef = useRef<HTMLSpanElement>(null)

  // Tras un cambio, los botones del pie cambian: el foco pasa al estado, que se anuncia
  const focusStatus = () => requestAnimationFrame(() => statusRef.current?.focus())
  const change = (id: string, status: AppointmentStatus, cancelReason?: string) => {
    onChangeStatus(id, status, cancelReason)
    focusStatus()
  }

  if (appointment && appointment !== shown) {
    setShown(appointment)
    if (appointment.id !== shown?.id) {
      setCancelling(false)
      setReason('')
    }
  }

  const a = appointment ?? shown
  const next = a ? transitions[a.status] : []

  return (
    <Sheet
      open={appointment !== null}
      onClose={onClose}
      title={a?.patient ?? ''}
      closeLabel={detail.close}
      footer={
        a && next.length > 0 && !cancelling ? (
          <>
            {next.map((status) => (
              <Button
                key={status}
                variant={status === next[0] ? 'primary' : 'secondary'}
                onClick={() =>
                  status === 'cancelled' ? setCancelling(true) : change(a.id, status)
                }
              >
                {actionLabel[status]}
              </Button>
            ))}
          </>
        ) : a && cancelling ? (
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setCancelling(false)
                focusStatus()
              }}
            >
              {detail.cancelForm.back}
            </Button>
            <Button
              onClick={() => {
                change(a.id, 'cancelled', reason.trim() || undefined)
                setCancelling(false)
              }}
            >
              {detail.cancelForm.submit}
            </Button>
          </>
        ) : null
      }
    >
      {a && (
        <>
          <dl className="grid gap-6 sm:grid-cols-2">
            <Row term={detail.when}>
              {schedule.days[a.day]}, {formatTime(a.start)}
            </Row>
            <Row term={detail.duration}>{detail.minutes(a.minutes)}</Row>
            <Row term={detail.treatment}>{treatmentName(a.treatmentId)}</Row>
            <Row term={detail.dentist}>{dentistName(a.dentistId)}</Row>
            <Row term={detail.status}>
              <span
                ref={statusRef}
                tabIndex={-1}
                role="status"
                className="inline-flex items-center gap-2 rounded-xs outline-offset-4"
              >
                <span
                  aria-hidden="true"
                  className={cn('size-2 rounded-full', statusDot[a.status])}
                />
                {statusLabels[a.status]}
              </span>
            </Row>
            {a.cancelReason && <Row term={detail.cancelReason}>{a.cancelReason}</Row>}
          </dl>

          {cancelling && (
            <div className="mt-8">
              <label htmlFor={reasonId} className={fieldLabelClass}>
                {detail.cancelForm.label}
              </label>
              <textarea
                id={reasonId}
                // Al pasar a cancelar, el foco va directo al motivo
                autoFocus
                rows={2}
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                className={cn(fieldClass, 'mt-2 py-2')}
              />
            </div>
          )}
        </>
      )}
    </Sheet>
  )
}

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="section-label">{term}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  )
}
