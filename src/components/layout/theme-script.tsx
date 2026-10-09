/*
 * Se ejecuta en <head>, antes del primer pintado: pone data-theme en <html>
 * con la elección guardada o, si no hay, con el tema del sistema. Así nunca
 * se ve un destello del tema equivocado. (Guía oficial de Next:
 * node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md)
 */
export const THEME_STORAGE_KEY = 'theme'

const script = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
