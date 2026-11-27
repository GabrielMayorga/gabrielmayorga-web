import { site } from '@/content/site'
import { services } from '@/content/services'

/*
 * Datos estructurados (schema.org) para buscadores y asistentes de IA.
 * Solo datos confirmados del contenido: nada de precios, horarios ni reseñas.
 */
export function siteJsonLd() {
  const url = site.url
  const personId = `${url}/#gabriel`
  const businessId = `${url}/#servicios-tecnologicos`
  const address = {
    '@type': 'PostalAddress',
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    addressCountry: site.location.countryCode,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: site.name,
        jobTitle: site.role,
        url,
        email: site.contact.email,
        telephone: `+${site.contact.whatsapp.number}`,
        address,
        sameAs: site.social.map((link) => link.href),
      },
      {
        '@type': 'ProfessionalService',
        '@id': businessId,
        name: site.name,
        description: site.description,
        url,
        telephone: `+${site.contact.whatsapp.number}`,
        email: site.contact.email,
        address,
        // TODO(confirmar): alcance del servicio remoto (¿todo el país, otros países?).
        areaServed: { '@type': 'City', name: site.location.city },
        founder: { '@id': personId },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: site.title,
          itemListElement: services.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.serviceName,
              // Resumen propio de cada puerta: lo que hace Gabriel, sin nombrar a terceros.
              description: service.serviceSummary,
            },
          })),
        },
      },
    ],
  }
}

/** JSON para <script type="application/ld+json">, con "<" escapado (guía oficial de Next). */
export function toJsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
