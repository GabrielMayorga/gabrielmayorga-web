import { cacheLife } from 'next/cache'

/*
 * Año del pie. Con cacheComponents, `new Date()` solo se permite dentro de
 * 'use cache': el valor queda en caché y se revalida a diario, así la página
 * sigue siendo estática y el año cambia solo al llegar enero. Sin JS en el cliente.
 */
export async function CurrentYear() {
  'use cache'
  cacheLife('days')
  return <>{new Date().getFullYear()}</>
}
