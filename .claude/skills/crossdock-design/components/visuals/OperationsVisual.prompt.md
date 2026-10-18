Hero diagram: sources (mail, message, location, system) → animated flow → accent agent node → action window with steps; scenario buttons switch examples. Source: `components/operations-visual.tsx`.

```tsx
<section className="hero container"><div className="hero-copy">…</div><OperationsVisual locale={locale} /></section>
```

Pattern for any new visual: `figure` with `aria-label`, mono top line + "Illustrative" pill, dotted grid background, ink/accent node in the middle, white cards for outputs, `figcaption` at the bottom. Also see `.approach-map` (static chips → ink core → chips).
