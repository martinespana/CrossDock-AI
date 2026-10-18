# CrossDock AI Design System

**CrossDock AI** — *The AI operations layer for logistics. / La capa de IA para tu operación logística.*

CrossDock AI pone agentes de IA entre los equipos, sistemas (TMS, ERP, WMS) y canales (correo, WhatsApp, GPS) de una operación logística para preparar actualizaciones, seguimientos, documentos y próximos pasos, con revisión humana donde hace falta. No reemplaza sistemas: es una capa encima. Fundado por operadores logísticos en Colombia, con visión global.

**Producto/superficie:** sitio de marketing Next.js 16 (App Router, export estático + standalone en Hostinger), bilingüe `/` (EN) y `/es/` (ES). Páginas actuales: landing, demo (`/demo/`), privacidad, laboratorio de marca (`/brand/`).

**Audiencia:** gerentes de operaciones, transporte y comercio electrónico B2B. Personas ocupadas que quieren ver rápido qué cambia en su día a día.

**Fuente de verdad** (lee estos archivos antes de diseñar):
- `components/landing.tsx` — la página de referencia, con estructura y copy finales.
- `app/globals.css` — todos los estilos de producción. `app/demo.css` es la página demo (variante oscura). `app/kinetic.css` es una dirección de arte **opcional** en preview (`?direction=kinetic`), no la base.
- `lib/palettes.ts` — paletas de acento en exploración (lime por defecto).

## Principios de diseño

1. **Sobrio y editorial.** Parece una ficha técnica de sala de control, no publicidad. El espacio en blanco y la tipografía hacen el trabajo.
2. **Un solo acento por vista.** Todo es papel y tinta en grises; el acento marca la acción o el nodo "agente".
3. **Secciones numeradas** con la misma anatomía: etiqueta → título + intro → grilla → caption.
4. **Mostrar el flujo, no adjetivos.** Diagramas de entradas → agente → acciones (`OperationsVisual`, `approach-map`, mini demos) en lugar de ilustraciones o fotos.
5. **Humano en el loop.** El copy siempre deja claro que las personas revisan las decisiones.
6. **Honestidad.** Ejemplos ilustrativos se rotulan como tales ("Illustrative workflows with sample data").

## CONTENT FUNDAMENTALS

- **Idiomas:** cada texto existe en EN y ES. Español colombiano neutro, tuteo ("tu operación", "Agenda una demo"). Nunca traducir literal: "Less chasing. More moving." → "Menos persecución. Más movimiento." solo si suena natural; si no, reescribe.
- **Frases cortas y declarativas, siempre con punto final**, incluso en títulos: "Freight moves. / The coordination never stops."
- **Títulos en pares de dos líneas** (`<br />`): afirmación + consecuencia. La segunda línea puede ir en gris (`.muted-heading`).
- **Intros a la derecha del título: exactamente dos líneas cortas.**
- **Etiquetas / overlines:** MAYÚSCULAS en mono: "THE WORK BETWEEN THE SYSTEMS", "OPERATIONAL WORKFLOW".
- **Botones = verbo + objeto, sentence case, con flecha:** "Book a demo →", "Explore How It Works →" / "Agendar una demo →".
- **Vocabulario:** operation, workflow, shipment, exception, follow-up, next step, coordinate, review / operación, flujo, envío, novedad, seguimiento, próximo paso, coordinar, revisión. EVITAR: "revolucionario", "disruptivo", "magia", "100% automático", promesas de cifras sin datos.
- **Sin emoji.** Sin signos de exclamación.

## VISUAL FOUNDATIONS

- **Colores:** papel `--paper #F9F9F9`, superficie `--surface #F1F1F1`, tarjetas `--white`, tinta `--ink #1F1F1F`, texto secundario `--muted #6B6B6B`, líneas `--line #DFDFDF`. Grises puntuales del CSS: `#919191` (heading en gris), `#A2A2A2` (números), `#EFEFEF` (banda de sección y footer). Acento `--accent` + `--accent-ink` (texto sobre acento), más `--accent-soft` y `--accent-line` derivados con `color-mix`. Bandas oscuras: `#232323` (operators) y `#20241F`/`#171C19` (demo).
- **Paletas:** `html[data-palette='lime' | 'cobalt' | 'petrol' | 'orange' | 'yellow']` cambian `--accent`, `--accent-ink` y a veces `--paper`/`--ink`. Diseña siempre con tokens para que todas funcionen.
- **Tipografía:** Geist (variable 100–900, local) para todo. Mono del sistema (`.mono`) solo en etiquetas MAYÚSCULAS 6–10px con tracking `.06–.08em`. Pesos display intermedios (480–490), nunca bold en títulos.
  - `h1` `clamp(54px,5.15vw,80px)` / 490 / `-.065em` / 1.035 (ES: `.hero-heading-es`, un paso más chico). Termina con `.accent-period`.
  - `h2` `clamp(35px,3.4vw,52px)` / 480 / `-.055em` / 1.12. En CTA y banda oscura sube a `clamp(43–44px, 4.3–4.4vw, 66px)`.
  - `h3` 18–24px / 500 / `-.035em`.
  - Lead del hero 17px; cuerpo 12–13px `--muted` con line-height 1.7–1.9 y `max-width` 285–400px.
- **Fondos:** planos. Sin gradientes, sin fotos, sin texturas. Única excepción: la retícula de puntos tenue dentro de `.operations-visual` y el arte de ruta en la demo.
- **Bordes:** 1px `--line` en todo. Las grillas se separan con bordes verticales (`.problem-block`) o tarjetas con borde, no con sombras.
- **Radios:** pequeños: 2–4px controles y chips, 6px tarjetas, 7–10px visuales. Excepción firmada: `.demo-invitation` `4px 28px 4px 4px`.
- **Sombras:** casi nunca. Solo la sombra plana desplazada `7px 7px 0 #DEDFD7` de `.demo-invitation`. Nada de sombras difusas.
- **Transparencia/blur:** solo el header sticky (`rgba(248,248,248,.96)` + blur 14px).
- **Animación:** `.18s ease` en hovers; la flecha del botón se mueve `translateX(3px)`; links subrayan con `text-underline-offset: 5px`. Loops lentos (4s) solo en visuales de flujo. Todo se apaga con `prefers-reduced-motion`.
- **Layout:** `.container` = `min(1344px, 100% - 112px)`. Secciones con `.section-pad` (104px arriba/abajo). Grillas de 3 columnas o 2 columnas (hero, CTA, operators) con gap 60–100px. Breakpoints: 1500 / 1150 / 900 / 700 / 365px; en 900px el nav pasa a menú, en 700px las grillas a 1 columna.
- **Imaginería:** ninguna fotografía. El único arte es el `Mark` (cuatro cuadrados con aspa) y diagramas de flujo hechos con HTML/SVG.

## ICONOGRAPHY

- **Sistema propio** en `components/icons.tsx`: `Arrow`, `Mark` y `Icon name=…` (`mail`, `message`, `location`, `system`, `grid`, `file`, `check`, `alert`, `clock`, `link`). Grilla 24px, trazo 1.4px, `currentColor`, line caps redondeados. Nombre desconocido cae en `grid`.
- Para un icono nuevo, agrégalo al mapa `paths` de `Icon` con el mismo estilo. Sin librerías de iconos, sin emoji, sin caracteres unicode como iconos (salvo `↗` en links externos y `☰`/`×` del menú, que ya existen).
- **Logo:** wordmark `cross-dock.ai` en minúsculas (22px / 630 / `-.05em`) precedido del `Mark` 29px. App icon: `assets/logos/app-icon.svg` (mark lime sobre `#171916`).

## Índice

| Ruta | Contenido |
|---|---|
| `styles.css` | Entrada para prototipos (solo `@import`s) |
| `tokens/` | `colors.css` (+ paletas), `typography.css`, `spacing.css`, `effects.css`, `fonts.css` |
| `components/crossdock-ui.css` | Copia literal de las clases de `app/globals.css` para prototipos HTML |
| `components/*/<Name>.prompt.md` | Uso de cada componente/patrón de la casa con ejemplo y archivo fuente |
| `guidelines/*.card.html` | Especímenes: colores, tipografía, botones, anatomía de sección, marca |
| `assets/logos/`, `assets/fonts/` | App icon SVG, Geist woff2 (+ licencia OFL), `og-reference.png` |
| `NUEVA-PAGINA.md` | Checklist para crear una página de producción en este repo |

## Caveats

- **El acento aún no es final:** `lib/palettes.ts` explora 5 paletas; lime es el default. No escribas hex del acento, usa `var(--accent)`.
- `kinetic.css` es una dirección alternativa en evaluación. No la uses salvo que te lo pidan.
- `components/crossdock-ui.css` puede desactualizarse: si algo difiere, manda `app/globals.css`.
- `SectionLabel` y `MiniDemo` hoy son funciones privadas de `landing.tsx`. Si una página nueva las necesita, muévelas a `components/` y expórtalas en vez de duplicarlas.
