/** Une clases condicionales. Sin dependencias: el sistema no necesita fusionar conflictos. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
