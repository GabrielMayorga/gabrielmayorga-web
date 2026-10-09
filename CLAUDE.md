@AGENTS.md

# gabrielmayorga-web

Portafolio y página de ventas de Gabriel Mayorga (Ingeniero de Sistemas, El Rama, RACCS, Nicaragua).
**No es un CV: es una página que convierte.** La acción principal de toda la página es escribir por WhatsApp.

Visitantes, en orden de prioridad:

1. Dueños de negocios pequeños: hablan de problemas ("se me cayó el sistema"), no de tecnologías.
2. Gente técnica y reclutadores: necesitan ver profundidad sin estorbar al primero.

## Comandos

```bash
npm run dev          # desarrollo en http://localhost:3000
npm run build        # build de producción (debe pasar antes de cada commit de fase)
npm run check        # typecheck + lint + formato (correr antes de cada commit)
npm run format       # aplicar Prettier
```

## Stack (no cambiar sin consultar a Gabriel)

- Next.js 16.4 (App Router, `cacheComponents` y `partialPrefetching` activos), React 19, TypeScript strict.
- Tailwind CSS v4 vía `@tailwindcss/turbopack` (no hay `postcss.config`).
- Motion para animación. **Sin librerías de UI**: componentes propios.
- Fuentes con `next/font`: Poppins (títulos), Inter (cuerpo), JetBrains Mono (detalles técnicos).
- Despliegue en Vercel. npm como gestor de paquetes. Versiones exactas en dependencias nuevas.

### Particularidades de Next 16.4 que ya mordieron

- Antes de usar una API de Next, leer su guía en `node_modules/next/dist/docs/` (ver AGENTS.md).
- Con `cacheComponents`, `new Date()`, `Date.now()` y `Math.random()` **rompen el prerender**, tanto en Server como en Client Components. Solución: `'use cache'` + `cacheLife()` (ver `src/components/layout/current-year.tsx`).
- Tema sin parpadeo: script en línea en `<head>` que pone `data-theme` en `<html>` antes del primer pintado (guía oficial: `02-guides/preventing-flash-before-hydration.md`). `<html>` lleva `suppressHydrationWarning`.

## Estructura

```
src/
  app/              rutas, layout, globals.css (base + utilidades), fonts.ts
  styles/tokens.css ÚNICA fuente de tokens (paleta, tipografía, radios, movimiento, @theme)
  content/          TODO el texto del sitio, tipado (site.ts, projects.ts, education.ts, types.ts)
  components/
    ui/             piezas base: Button/ButtonLink, Card, Section, SectionLabel, Tag,
                    StatusBadge, Monogram, icons (BrandIcon + trazos propios)
    layout/         SiteHeader, SiteFooter, ThemeToggle, ThemeScript, CurrentYear
    sections/       una sección de la home por archivo (Hero, Services…)
  lib/              utilidades sin UI (whatsapp.ts, cn.ts)
```

## Sistema de diseño

- **Tokens**: todo color, sombra, radio, curva y tamaño de texto sale de `src/styles/tokens.css`. Cambiar la paleta = editar ese archivo. Las escalas por defecto de Tailwind (colores, texto, radios, sombras, fuentes) están **desactivadas**: si una clase no existe, falta un token, no se pone un valor a mano.
- **Clases de color disponibles**: `canvas`, `canvas-subtle`, `surface`, `fg`, `fg-muted`, `accent`, `accent-text`, `accent-solid`, `accent-solid-hover`, `on-accent`, `hairline`, `hairline-strong`.
- **Contraste (AA verificado)**: texto en azul usa `accent-text` (no `accent`). Botón principal = `bg-accent-solid text-on-accent` (5.2:1). `#3B82F6` sobre la superficie oscura no llega a AA para texto (3.98:1).
- **Texto**: `text-caption` (13), `text-small` (15), `text-body` (17→18), `text-lead` (19→22), `text-title-3/2/1`, `text-display` (44→88). Cada tamaño trae su interlineado y tracking: no sobrescribir `tracking-*` ni `leading-*` salvo razón.
- **Espaciado**: rejilla de 8 px → en Tailwind solo pasos pares (`2, 4, 6, 8, 10, 12…`). Impares solo para ajustes ópticos de 4 px justificados.
- **Radios concéntricos**: radio interno = radio externo − padding. `rounded-xs 8 · sm 12 · md 16 · lg 24 · xl 32 · 2xl 40 · full`. `Card` ya aplica `rounded-xl p-6` / `sm:rounded-2xl sm:p-8`: lo redondeado dentro de una Card usa `rounded-xs`.
- **Objetivo táctil** mínimo 44 px (`min-h-11`, o `var(--tap-min)`).
- **Lightning CSS y `backdrop-filter`**: con `var()` en el valor descarta la propiedad sin prefijo (Chrome queda sin desenfoque). Usar las utilidades `backdrop-blur-(--x)` / `backdrop-saturate-(--x)` de Tailwind, como en `glass` y `glass-bar`.
- **Utilidades propias**: `glass`, `glass-bar`, `container-page`, `section-space`, `section-label`, `theme-transition`, `reveal`.
- **Vista `/dev`**: muestra el sistema en claro y oscuro lado a lado (`npm run dev` → `/dev`). En producción responde 404. Todo componente nuevo de `ui/` se agrega ahí.
- **Forzar tema en un bloque**: `data-theme="dark"` en cualquier contenedor recalcula los tokens.
- **Identidad**: monograma `{GM}` en mono. Las etiquetas de sección usan llaves: `{ servicios }` con `section-label`.
- **Profundidad**: vidrio legible + borde de 1 px con luz + sombras suaves en capas (`shadow-sm/md/lg`). Nada de degradados estridentes ni sombras duras.

## Movimiento

- Curva `ease-fluid` = `cubic-bezier(0.32, 0.72, 0, 1)`. Duraciones 300–600 ms (`--duration-fast/base/slow`). Respuesta al presionar: 120 ms (`--duration-press`), porque el feedback táctil debe ser inmediato.
- Springs en Motion: críticamente amortiguados por defecto (`bounce: 0`). Rebote solo tras un gesto con inercia.
- Solo `transform` y `opacity`. Nunca animar `width`, `height`, `top`, `left`.
- **Una sola pieza líquida protagonista**: el fondo del hero. No añadir otra.
- **Herramienta más barata que funcione**: hover, presión y cambios de estado con transición CSS; revelado al hacer scroll con la utilidad `reveal` (CSS scroll-driven, sin JS: el contenido nunca depende de un script para verse); Motion solo para springs, gestos, salidas y el hero.
- Botones: `scale(0.97)` al presionar (ya incluido en `Button`). Nada de `transition: all`, nada de `scale(0)`, nunca `ease-in`.
- **`prefers-reduced-motion` sin excepción**: en Motion, `MotionConfig reducedMotion="user"`; en CSS, todo desplazamiento con `motion-safe:`. Con movimiento reducido se usa un fundido de opacidad, no se elimina el feedback.

## Accesibilidad (criterio de aceptación)

- Un solo `h1`. HTML semántico (`header`, `nav`, `main`, `section` con `aria-labelledby`, `footer`).
- Navegación completa con teclado, foco visible (ya global en `:focus-visible`), enlace "Saltar al contenido".
- Enlaces externos: `rel="noopener noreferrer"` y texto que diga a dónde llevan.
- Imágenes con `next/image`, `alt` descriptivo o `alt=""` si son decorativas.

## Reglas de contenido

- Todo texto vive en `src/content/`. Los componentes no llevan textos escritos a mano.
- Español neutro y natural; **sin jerga nicaragüense**. Identificadores de código en inglés.
- Escribir desde el problema del cliente: "Procesos manuales que te consumen horas cada semana", no "automatización con IA".
- **Prohibido inventar**: testimonios, cifras, clientes, logos, años de experiencia o resultados. Lo que falte se marca `// TODO(...)` y se pregunta a Gabriel.
- **Nunca incluir**: GoPartner, cuentas de streaming ni ningún canal de comisiones.
- Casa de las Pacas: `visible: false` hasta que el dueño autorice. Siempre lenguaje de ejecución ("lideré", "implementé", "gestioné"), nunca de propiedad; sin cifras de ventas, precios ni datos internos.
- Proyectos: agregar uno = agregar un objeto a `src/content/projects.ts` (ver skill `add-project`). Campo opcional vacío = no se renderiza. La sección debe verse bien con 0, 1 y 6 proyectos.

## Calidad (criterios de aceptación)

- Lighthouse móvil ≥ 95 en rendimiento, accesibilidad, buenas prácticas y SEO.
- Contraste AA, sin layout shift, sin `any`, `npm run check` y `npm run build` en verde.
- Diseño mobile-first: la mayoría de clientes llega desde el celular.

## Flujo de trabajo

- Una fase a la vez; al terminar, resumen + cómo verlo + qué sigue, y esperar confirmación.
- Un commit por pieza terminada, formato convencional en español: `feat:`, `fix:`, `chore:`, `style:`, `docs:`, `refactor:`.
- Antes de cada commit de sección: `npm run check`, y pasar los subagents `content-guardian` y `a11y-reviewer`.
- Desviarse de este documento o del brief requiere consultarlo antes.

## Skills a usar

- Subagents y skill del repo (`content-guardian`, `a11y-reviewer`, `add-project`) solo cargan si Claude Code se inicia dentro de este directorio.

- `apple-design` y `emil-design-eng`: criterio visual y de interacción en cada componente.
- `animate`: al construir cualquier animación. `/review-animations` al cerrar las fases 3 y 8.
- `mobile-native`: navegación, hero y cualquier interacción táctil.
- `break-ui`: sección de proyectos con datos extremos (Fase 5).
- `copywriting` / `page-cro`: textos de cada sección. `schema-markup` y `seo-audit`: Fase 8.

## TODO abiertos

- Dominio propio (hoy `NEXT_PUBLIC_SITE_URL`).
- Foto profesional para "Sobre mí".
- Marca Nuvix: se conectará después como respaldo del negocio.
- ¿El diagnóstico es gratis o pagado? (afecta "Cómo trabajo").
- ¿Se pueden nombrar las empresas donde trabajó? (afecta "Sobre mí").
- DentalSystem WebApp: ¿mostrar la demo (requiere inicio de sesión)?
- Casa de las Pacas: autorización del dueño y estado real.
