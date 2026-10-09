'use client'

import { useEffect } from 'react'
import { MoonIcon, SunIcon } from '@/components/ui/icons'
import { THEME_STORAGE_KEY } from './theme-script'

type Theme = 'light' | 'dark'

/** Aplica el tema con una transición de color breve, para evitar saltos de brillo. */
function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.add('theme-transition')
  root.dataset.theme = theme
  window.setTimeout(() => root.classList.remove('theme-transition'), 300)
}

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

interface ThemeToggleProps {
  toDarkLabel: string
  toLightLabel: string
}

/*
 * El ícono y la etiqueta correctos se eligen con CSS según data-theme, no con
 * estado de React: el HTML del servidor ya es correcto y no hay parpadeo al hidratar.
 */
export function ThemeToggle({ toDarkLabel, toLightLabel }: ThemeToggleProps) {
  // Mientras el usuario no elija, el sitio sigue al sistema también en vivo.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => {
      if (!storedTheme()) applyTheme(event.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  function toggle() {
    const next: Theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Sin almacenamiento (modo privado estricto): el cambio vale solo para esta visita.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="grid size-11 [touch-action:manipulation] place-items-center rounded-full text-fg-muted transition-[background-color,color,transform] duration-(--duration-fast) ease-out-soft hover:bg-surface hover:text-fg active:duration-(--duration-press) motion-safe:active:scale-95"
    >
      <MoonIcon className="size-5 dark:hidden" />
      <SunIcon className="hidden size-5 dark:block" />
      <span className="sr-only">
        <span className="dark:hidden">{toDarkLabel}</span>
        <span className="hidden dark:inline">{toLightLabel}</span>
      </span>
    </button>
  )
}
