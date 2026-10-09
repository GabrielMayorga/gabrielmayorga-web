import { site } from '@/content/site'

/** Enlace wa.me con el mensaje predefinido (o uno propio) ya codificado. */
export function whatsappHref(message: string = site.contact.whatsapp.message): string {
  return `https://wa.me/${site.contact.whatsapp.number}?text=${encodeURIComponent(message)}`
}
