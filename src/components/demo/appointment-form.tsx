'use client'

import { useId, useState } from 'react'
import {
  type Appointment,
  demoAgenda,
  dentists,
  patients,
  schedule,
  treatments,
} from '@/content/demo-agenda'
import { Button } from '@/components/ui/button'
import { computeSlots, formatTime } from '@/lib/agenda'
import { cn } from '@/lib/cn'
import { fieldClass, fieldLabelClass } from './agenda-styles'
import { Sheet } from './sheet'

const { form } = demoAgenda

export interface FormPrefill {
  day: number
  dentistId?: string
  start?: number
}

interface AppointmentFormProps {
  prefill: FormPrefill | null
  appointments: readonly Appointment[]
  onClose: () => void
  onCreate: (appointment: Omit<Appointment, 'id' | 'status'>) => void
}

const FIRST_DENTIST = dentists[0].id
const FIRST_TREATMENT = treatments[0].id

/*
 * Nueva cita: paciente, tratamiento, odontólogo, día y hora. La cuadrícula de horas
 * se recalcula con cada cambio y deshabilita lo que chocaría, igual que el sistema real.
 */
export function AppointmentForm({
  prefill,
  appointments,
  onClose,
  onCreate,
}: AppointmentFormProps) {
  const [opened, setOpened] = useState<FormPrefill | null>(null)
  const [patient, setPatient] = useState('')
  const [treatmentId, setTreatmentId] = useState<string>(FIRST_TREATMENT)
  const [dentistId, setDentistId] = useState<string>(FIRST_DENTIST)
  const [day, setDay] = useState<number>(schedule.today)
  const [start, setStart] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const ids = {
    patient: useId(),
    list: useId(),
    hint: useId(),
    patientError: useId(),
    timeError: useId(),
  }

  // Cada apertura empieza limpia, con el día, odontólogo y hora del espacio tocado
  if (prefill && prefill !== opened) {
    setOpened(prefill)
    setPatient('')
    setTreatmentId(FIRST_TREATMENT)
    setDentistId(prefill.dentistId ?? FIRST_DENTIST)
    setDay(prefill.day)
    setStart(prefill.start ?? null)
    setSubmitted(false)
  }

  const minutes = treatments.find((t) => t.id === treatmentId)?.minutes ?? schedule.step
  const slots = computeSlots(appointments, { day, dentistId, minutes })
  const startIsFree = slots.some((s) => s.start === start && s.state === 'free')
  const chosenStart = startIsFree ? start : null
  const patientError = submitted && patient.trim().length === 0
  const timeError = submitted && chosenStart === null
  const hasFree = slots.some((s) => s.state === 'free')

  function submit() {
    setSubmitted(true)
    if (patient.trim().length === 0) {
      document.getElementById(ids.patient)?.focus()
      return
    }
    if (chosenStart === null) {
      document
        .getElementById(`${ids.patient}-form`)
        ?.querySelector<HTMLInputElement>('input[type=radio]:not(:disabled)')
        ?.focus()
      return
    }
    onCreate({ patient: patient.trim(), treatmentId, dentistId, day, start: chosenStart, minutes })
  }

  return (
    <Sheet
      open={prefill !== null}
      onClose={onClose}
      title={form.title}
      closeLabel={form.cancel}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {form.cancel}
          </Button>
          <Button type="submit" form={`${ids.patient}-form`}>
            {form.submit}
          </Button>
        </>
      }
    >
      <form
        id={`${ids.patient}-form`}
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
        className="grid gap-6"
      >
        <div>
          <label htmlFor={ids.patient} className={fieldLabelClass}>
            {form.patient}
          </label>
          <input
            id={ids.patient}
            list={ids.list}
            value={patient}
            onChange={(event) => setPatient(event.target.value)}
            autoComplete="off"
            aria-invalid={patientError}
            aria-describedby={patientError ? ids.patientError : ids.hint}
            className={cn(fieldClass, 'mt-2')}
          />
          <datalist id={ids.list}>
            {patients.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
          {patientError ? (
            <p id={ids.patientError} className="mt-2 text-small text-danger-text">
              {form.patientError}
            </p>
          ) : (
            <p id={ids.hint} className="mt-2 text-small text-fg-muted">
              {form.patientHint}
            </p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Select
            label={form.treatment}
            value={treatmentId}
            onChange={setTreatmentId}
            options={treatments.map((t) => ({
              value: t.id,
              label: `${t.name} · ${demoAgenda.detail.minutes(t.minutes)}`,
            }))}
          />
          <Select
            label={form.dentist}
            value={dentistId}
            onChange={setDentistId}
            options={dentists.map((d) => ({ value: d.id, label: d.name }))}
          />
        </div>

        <Select
          label={form.day}
          value={String(day)}
          onChange={(value) => setDay(Number(value))}
          options={schedule.days.map((label, index) => ({
            value: String(index),
            label: index === schedule.today ? `${label} (${demoAgenda.app.today})` : label,
          }))}
        />

        <fieldset aria-describedby={timeError ? ids.timeError : undefined}>
          <legend className={fieldLabelClass}>{form.time}</legend>
          {hasFree ? (
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {slots.map((slot) => {
                const disabled = slot.state !== 'free'
                const reason =
                  slot.state === 'busy' && slot.conflict
                    ? form.busy(formatTime(slot.conflict.start), formatTime(slot.conflict.end))
                    : slot.state === 'closed'
                      ? form.closed
                      : undefined
                return (
                  <label
                    key={slot.start}
                    title={reason}
                    className={cn(
                      'relative flex min-h-11 items-center justify-center rounded-xs border font-mono text-small transition-[background-color,border-color,color] duration-(--duration-fast)',
                      'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--focus-ring)',
                      disabled
                        ? 'cursor-not-allowed border-dashed border-hairline text-fg-muted line-through opacity-60'
                        : 'cursor-pointer border-hairline-strong hover:border-fg-muted has-checked:border-accent-solid has-checked:bg-accent-solid has-checked:text-on-accent',
                    )}
                  >
                    <input
                      type="radio"
                      name="hora"
                      value={slot.start}
                      checked={chosenStart === slot.start}
                      disabled={disabled}
                      onChange={() => setStart(slot.start)}
                      className="sr-only"
                    />
                    {formatTime(slot.start)}
                    {reason && <span className="sr-only">. {reason}</span>}
                  </label>
                )
              })}
            </div>
          ) : (
            <p className="mt-2 text-small text-fg-muted">{form.noFreeSlots}</p>
          )}
          {timeError && hasFree && (
            <p id={ids.timeError} className="mt-2 text-small text-danger-text">
              {form.timeError}
            </p>
          )}
          <ul
            role="list"
            className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-caption text-fg-muted"
          >
            <li>{form.legendFree}</li>
            <li className="line-through">{form.legendBusy}</li>
          </ul>
        </fieldset>
      </form>
    </Sheet>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly { value: string; label: string }[]
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className={fieldLabelClass}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(fieldClass, 'mt-2')}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
