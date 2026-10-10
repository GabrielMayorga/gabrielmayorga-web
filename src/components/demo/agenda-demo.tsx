'use client'

import { useState } from 'react'
import {
  type Appointment,
  type AppointmentStatus,
  demoAgenda,
  dentists,
  initialAppointments,
  schedule,
} from '@/content/demo-agenda'
import { Button } from '@/components/ui/button'
import { CheckIcon, PlusIcon } from '@/components/ui/icons'
import { dentistName, formatTime, layoutDay, slotStarts, treatmentName } from '@/lib/agenda'
import { cn } from '@/lib/cn'
import { AppointmentDetail } from './appointment-detail'
import { AppointmentForm, type FormPrefill } from './appointment-form'
import { statusBorder, statusDot } from './agenda-styles'

const { app, status: statusLabels } = demoAgenda

/** Alto de un intervalo de 30 min, en rem (48 px). */
const ROW = 3

type DentistFilter = 'all' | string

/*
 * Agenda semanal de una clínica ficticia. En escritorio se ve la semana completa;
 * en el celular, un día a la vez con selector de día. Con "Todos", cada día se
 * divide en un carril por odontólogo, como en el sistema real.
 */
export function AgendaDemo() {
  const [appointments, setAppointments] = useState<readonly Appointment[]>(initialAppointments)
  const [filter, setFilter] = useState<DentistFilter>('all')
  const [day, setDay] = useState<number>(schedule.today)
  const [detailId, setDetailId] = useState<string | null>(null)
  const [form, setForm] = useState<FormPrefill | null>(null)
  const [notice, setNotice] = useState('')

  const detail = appointments.find((a) => a.id === detailId) ?? null
  // Citas visibles de cada día y su reparto en columnas
  const week = schedule.days.map((_, dayIndex) => {
    const list = appointments
      .filter((a) => a.day === dayIndex && (filter === 'all' || a.dentistId === filter))
      .sort((x, y) => x.start - y.start)
    return { list, layout: layoutDay(list) }
  })

  function changeStatus(id: string, status: AppointmentStatus, cancelReason?: string) {
    const target = appointments.find((a) => a.id === id)
    setAppointments((list) => list.map((a) => (a.id === id ? { ...a, status, cancelReason } : a)))
    if (target) setNotice(demoAgenda.detail.changed(target.patient, statusLabels[status]))
  }

  function create(appointment: Omit<Appointment, 'id' | 'status'>) {
    setAppointments((list) => [
      ...list,
      { ...appointment, id: `n${list.length + 1}-${appointment.start}`, status: 'scheduled' },
    ])
    setDay(appointment.day)
    if (filter !== 'all' && filter !== appointment.dentistId) setFilter(appointment.dentistId)
    setForm(null)
    // Después de cerrar el diálogo: con él abierto, el resto de la página es inerte
    window.setTimeout(
      () =>
        setNotice(
          demoAgenda.form.created(
            appointment.patient,
            schedule.days[appointment.day] ?? '',
            formatTime(appointment.start),
          ),
        ),
      0,
    )
  }

  function reset() {
    setAppointments(initialAppointments)
    setFilter('all')
    setDay(schedule.today)
    setNotice(app.resetDone)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-canvas shadow-md sm:rounded-2xl">
      {/* Barra de la aplicación */}
      <div className="flex items-center justify-between gap-4 border-b border-hairline bg-canvas-subtle px-4 py-3 sm:px-6">
        <p className="min-w-0 truncate text-small">
          <span className="font-semibold">{app.clinic}</span>
          <span className="hidden text-fg-muted sm:inline"> · {app.section}</span>
        </p>
        <span className="shrink-0 text-caption text-fg-muted">
          {app.role}
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          <span className="font-medium text-accent-text">{app.fictional}</span>
        </span>
      </div>

      {/* Herramientas */}
      <div className="flex flex-col gap-4 border-b border-hairline p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div role="group" aria-label={app.dentistFilter} className="flex flex-wrap gap-2">
          {[{ id: 'all', name: app.allDentists }, ...dentists].map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={filter === option.id}
              onClick={() => setFilter(option.id)}
              className="inline-flex min-h-11 items-center rounded-full border border-hairline px-4 text-small text-fg-muted transition-[background-color,border-color,color] duration-(--duration-fast) hover:text-fg aria-pressed:border-transparent aria-pressed:bg-fg aria-pressed:text-canvas"
            >
              {option.name}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={reset}>
            {app.reset}
          </Button>
          <Button
            icon={<PlusIcon />}
            onClick={() => setForm({ day, dentistId: filter === 'all' ? undefined : filter })}
            className="flex-1 sm:flex-none"
          >
            {app.newAppointment}
          </Button>
        </div>
      </div>

      {/* Selector de día (solo celular) */}
      <div
        role="group"
        aria-label={app.dayPicker}
        className="flex gap-1 overflow-x-auto border-b border-hairline px-4 py-2 md:hidden"
      >
        {schedule.daysShort.map((label, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={day === index}
            aria-label={
              index === schedule.today
                ? app.todayLabel(schedule.days[index] ?? label)
                : schedule.days[index]
            }
            onClick={() => setDay(index)}
            className="flex min-h-11 min-w-12 flex-1 flex-col items-center justify-center rounded-xs text-small text-fg-muted transition-[background-color,color] duration-(--duration-fast) aria-pressed:bg-surface aria-pressed:font-semibold aria-pressed:text-fg"
          >
            {label}
            {index === schedule.today && (
              <span className="text-caption text-accent-text">{app.today}</span>
            )}
          </button>
        ))}
      </div>

      {/* Cuadrícula */}
      <div className="grid grid-cols-[3rem_minmax(0,1fr)] md:grid-cols-[3.5rem_repeat(6,minmax(0,1fr))]">
        {/* Encabezados de día (escritorio) */}
        <div className="hidden border-b border-hairline md:block" />
        {schedule.days.map((label, index) => (
          <div
            key={label}
            className="hidden border-b border-l border-hairline px-2 py-3 text-center text-small md:block"
          >
            <span className={cn(index === schedule.today && 'font-semibold')}>
              {schedule.daysShort[index]}
            </span>
            {index === schedule.today && (
              <span className="ml-2 text-caption text-accent-text">{app.today}</span>
            )}
          </div>
        ))}

        {/* Horas */}
        <div aria-hidden="true">
          {slotStarts.map((start) => (
            <div key={start} style={{ height: `${ROW}rem` }} className="relative">
              {start % 60 === 0 && (
                <span className="absolute top-1 right-2 font-mono text-caption text-fg-muted">
                  {formatTime(start)}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Días */}
        {schedule.days.map((dayLabel, dayIndex) => (
          <div
            key={dayLabel}
            className={cn(
              'relative border-l border-hairline',
              dayIndex === day ? 'block' : 'hidden md:block',
            )}
          >
            {/* Líneas y espacios libres: clic o toque para agendar. Con teclado se usa "Nueva cita". */}
            {slotStarts.map((start) => (
              <div
                key={start}
                style={{ height: `${ROW}rem` }}
                className={cn(
                  'flex border-t',
                  start % 60 === 0 ? 'border-hairline' : 'border-dashed border-hairline',
                )}
              >
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={app.emptySlot(dayLabel, formatTime(start))}
                  onClick={() =>
                    setForm({
                      day: dayIndex,
                      dentistId: filter === 'all' ? undefined : filter,
                      start,
                    })
                  }
                  className="flex-1 transition-colors duration-(--duration-fast) hover:bg-canvas-subtle"
                />
              </div>
            ))}

            {/* Citas */}
            {week[dayIndex]?.list.map((a) => {
              const { column, columns } = week[dayIndex]?.layout.get(a.id) ?? {
                column: 0,
                columns: 1,
              }
              const width = 100 / columns
              const tall = a.minutes >= 60
              const end = a.start + a.minutes
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setDetailId(a.id)}
                  aria-label={app.blockLabel({
                    day: dayLabel,
                    from: formatTime(a.start),
                    to: formatTime(end),
                    patient: a.patient,
                    treatment: treatmentName(a.treatmentId),
                    dentist: dentistName(a.dentistId),
                    status: statusLabels[a.status],
                  })}
                  style={{
                    top: `calc(${((a.start - schedule.opens) / schedule.step) * ROW}rem + 2px)`,
                    height: `calc(${(a.minutes / schedule.step) * ROW}rem - 4px)`,
                    left: `calc(${column * width}% + 2px)`,
                    width: `calc(${width}% - 4px)`,
                  }}
                  className={cn(
                    'absolute flex flex-col overflow-hidden rounded-xs border-l-[3px] bg-surface px-2 py-1 text-left shadow-sm transition-[box-shadow,transform] duration-(--duration-fast) ease-out-soft hover:shadow-md active:duration-(--duration-press) motion-safe:active:scale-[0.98] motion-reduce:active:opacity-80',
                    statusBorder[a.status],
                    (a.status === 'cancelled' || a.status === 'no_show') &&
                      'border-dashed bg-canvas-subtle shadow-none',
                  )}
                >
                  <span className="font-mono text-caption text-fg-muted">
                    {formatTime(a.start)}
                  </span>
                  <span
                    className={cn(
                      'truncate text-caption font-medium',
                      a.status === 'cancelled' && 'line-through',
                    )}
                  >
                    {a.patient}
                  </span>
                  {tall && (
                    <span className="truncate text-caption text-fg-muted">
                      {treatmentName(a.treatmentId)}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Leyenda y avisos */}
      <div className="flex flex-col gap-4 border-t border-hairline px-4 py-4 sm:px-6">
        <ul role="list" aria-label={app.legend} className="flex flex-wrap gap-x-4 gap-y-2">
          {(Object.keys(statusLabels) as AppointmentStatus[]).map((s) => (
            <li key={s} className="inline-flex items-center gap-2 text-caption text-fg-muted">
              <span aria-hidden="true" className={cn('size-2 rounded-full', statusDot[s])} />
              {statusLabels[s]}
            </li>
          ))}
        </ul>
        <p role="status" className="flex min-h-6 items-center gap-2 text-small">
          {notice && (
            <>
              <CheckIcon className="size-5 shrink-0 text-accent" />
              {notice}
            </>
          )}
        </p>
      </div>

      <AppointmentDetail
        appointment={detail}
        onClose={() => setDetailId(null)}
        onChangeStatus={changeStatus}
      />
      <AppointmentForm
        prefill={form}
        appointments={appointments}
        onClose={() => setForm(null)}
        onCreate={create}
      />
    </div>
  )
}
