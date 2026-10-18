Sticky top bar: `Mark` + `cross-dock.ai` wordmark, desktop nav (anchors to landing sections), small ink CTA, EN/ES switch, menu toggle under 900px. Source: `components/header.tsx`.

```tsx
<Header locale={locale} />                 // páginas de marketing
<Header locale={locale} variant="demo" />  // header oscuro con "Volver al sitio"
```

Rules: always first child before `<main id="main">`. When you add a route, map it in the `english`/`spanish` language-switch paths. No extra nav items without updating the mobile nav too.
