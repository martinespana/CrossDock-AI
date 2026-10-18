# Nueva página de producción en CrossDock-AI

Antes de escribir código: lee `AGENTS.md` (Next.js 16 tiene cambios; consulta `node_modules/next/dist/docs/`).

## 1. Componente compartido bilingüe

`components/<page>-page.tsx`, igual que `landing.tsx` y `demo-page.tsx`:

```tsx
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Arrow, Icon } from '@/components/icons';
import type { Locale } from '@/lib/i18n';

const content = {
  en: { label: 'PRICING', heading: ['Simple to start.', 'Built to grow.'], intro: ['…', '…'] },
  es: { label: 'PRECIOS', heading: ['Fácil de empezar.', 'Hecho para crecer.'], intro: ['…', '…'] },
};

export function PricingPage({ locale }: { locale: Locale }) {
  const text = content[locale];
  return <>
    <Header locale={locale} />
    <main id="main" lang={locale}>
      <section className="pricing-hero section-pad container" aria-labelledby="pricing-heading">
        <SectionLabel number="01">{text.label}</SectionLabel>
        <div className="section-heading-row">
          <h1 id="pricing-heading">{text.heading[0]}<br /><span className="muted-heading">{text.heading[1]}</span></h1>
          <p>{text.intro[0]}<br />{text.intro[1]}</p>
        </div>
        …
      </section>
    </main>
    <Footer locale={locale} />
  </>;
}
```

## 2. Rutas (envoltorios finos)

- `app/(english)/<page>/page.tsx` → `export const metadata = localizedMetadata('en', …); export default function X() { return <PricingPage locale="en" />; }`
- `app/(spanish)/es/<page>/page.tsx` → lo mismo con `'es'`.

## 3. Cableado obligatorio

- `lib/i18n.ts`: helper `<page>Path(locale)` y rama de título/descripción en `localizedMetadata`.
- `app/sitemap.ts`: entradas EN + ES con `alternates.languages`.
- `components/header.tsx`: mapear la ruta en `english`/`spanish` del selector de idioma (hoy solo conoce `/privacy` y `/demo`).
- Enlaces internos con `home`/helpers de `lib/i18n.ts`, siempre con slash final (`/es/demo/`).

## 4. Estilos

- Primero reutiliza clases existentes (ver `components/*.prompt.md`).
- Lo nuevo va en `app/globals.css` (o un archivo propio importado en `components/document-shell.tsx`, como `demo.css`), con prefijo de página (`.pricing-…`) y solo tokens (`var(--ink)`, `var(--line)`, `var(--accent)`…).
- Responsive dentro de los breakpoints existentes (1150 / 900 / 700 / 365px).

## 5. Verificación

- Un solo `h1`; `aria-labelledby` en cada sección; SVG decorativo `aria-hidden`; contraste ≥ 4.5:1.
- Revisa en 1440, 900, 390 y 365px: sin scroll horizontal. Prueba al menos `?palette=cobalt` además del default.
- `pnpm typecheck` y `pnpm build:static`.
