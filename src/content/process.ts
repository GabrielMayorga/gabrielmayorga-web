import type { ProcessStep } from './types'

/*
 * "Cómo trabajo": del primer mensaje a la entrega. Confirmado con Gabriel
 * (9 de oct. de 2026): diagnóstico pagado, su costo se dice por WhatsApp antes
 * de revisar y se descuenta si el cliente sigue adelante; cotización por escrito;
 * anticipo para empezar y saldo al entregar.
 */
export const processSection = {
  label: 'cómo trabajo',
  title: 'Sabes qué voy a hacer y cuánto cuesta antes de empezar.',
  intro: 'Así es el proceso, desde tu primer mensaje hasta la entrega.',
  cta: 'Empezar por el paso 1',
  whatsappMessage: 'Hola Gabriel, quiero empezar. Te cuento qué está pasando…',
} as const

export const processSteps = [
  {
    title: 'Me cuentas qué pasa',
    description:
      'Escríbeme por WhatsApp con tus palabras: “la computadora no enciende”, “quiero que mis clientes me encuentren”. No necesitas saber de tecnología.',
  },
  {
    title: 'Diagnóstico',
    description:
      'Reviso el equipo, la red o tu forma de trabajar para encontrar la causa real, no solo el síntoma.',
    note: 'Tiene un costo que te digo antes de revisar. Si sigues adelante, lo que pagaste se descuenta del precio del trabajo.',
  },
  {
    title: 'Cotización por escrito',
    description:
      'Te envío qué haría y cuánto costaría. Tú decides si seguimos: nada empieza sin tu aprobación.',
  },
  {
    title: 'Trabajo y entrega',
    description:
      'Empiezo con un anticipo y el resto lo pagas cuando te entrego el trabajo. Al terminar te explico qué hice.',
    // TODO(confirmar): Gabriel ofrece garantía o soporte después de entregar.
    // Falta qué cubre y por cuánto tiempo; agregarlo como `note` cuando lo confirme.
  },
] as const satisfies readonly ProcessStep[]
