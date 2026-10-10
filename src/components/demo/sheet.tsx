'use client'

import { type ReactNode, useEffect, useId, useRef } from 'react'
import { CloseIcon } from '@/components/ui/icons'

interface SheetProps {
  open: boolean
  onClose: () => void
  title: string
  closeLabel: string
  children: ReactNode
  /** Botones fijos al pie (no se desplazan con el contenido). */
  footer?: ReactNode
}

/*
 * <dialog> nativo con showModal(): atrapa el foco, cierra con Escape y devuelve
 * el foco al elemento que lo abrió. Un toque en el fondo también lo cierra.
 */
export function Sheet({ open, onClose, title, closeLabel, children, footer }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      // El foco va al panel, no al botón de cerrar: Tab entra al contenido
      dialog.focus()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      tabIndex={-1}
      className="sheet outline-none"
      onClose={onClose}
      onClick={(event) => {
        // El clic cae en el propio <dialog> solo cuando es en el fondo
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="flex max-h-[inherit] flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-hairline py-4 pr-4 pl-6 sm:pl-8">
          <h2 id={titleId} className="text-title-3 font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-fg-muted transition-colors duration-(--duration-fast) hover:bg-surface hover:text-fg"
          >
            <CloseIcon className="size-5" />
            <span className="sr-only">{closeLabel}</span>
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8">
          {children}
        </div>
        {footer && (
          <footer className="flex flex-col-reverse gap-2 border-t border-hairline px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:justify-end sm:px-8">
            {footer}
          </footer>
        )}
      </div>
    </dialog>
  )
}
