---
name: add-project
description: Agregar, editar u ocultar un proyecto del portafolio en src/content/projects.ts. Usar cuando Gabriel pida "agrega este proyecto", "oculta X", "actualiza el estado de Y".
---

# Agregar un proyecto

Un proyecto es un objeto en el array `projects` de `src/content/projects.ts`. No se toca ningún componente.

## Pasos

1. Pregunta a Gabriel lo que falte. **No inventes** resultados, cifras, clientes ni fechas.
2. Agrega el objeto al array respetando el tipo `Project` (`src/content/types.ts`):
   - Requeridos: `slug` (kebab-case, único), `name`, `type`, `status` (`'in-development' | 'active' | 'completed'`), `summary`, `problem`, `solution`, `stack`.
   - Opcionales: `result` (solo si es verificable), `href`, `repo`, `visible`.
3. Redacta desde el problema del cliente, en español neutro:
   - `summary`: una línea que entienda un dueño de negocio, sin nombres de tecnologías.
   - `problem`: qué dolía antes, en sus palabras.
   - `solution`: qué cambió para el usuario, no cómo está construido. Las tecnologías van en `stack`.
4. Si el proyecto es de un tercero y no hay autorización explícita: `visible: false` y un `// TODO(autorización)`.
5. Si Gabriel ejecutó el trabajo pero el negocio no es suyo: lenguaje de ejecución ("lideré", "implementé", "gestioné"), nunca de propiedad.
6. Corre `npm run check`. Un campo requerido que falte aparece como error de tipos en `projects.ts`.
7. Pasa el subagent `content-guardian` y haz commit: `feat: agregar proyecto <nombre>`.

## Ocultar sin borrar

Pon `visible: false`. El proyecto sale de `visibleProjects` y no se renderiza.
