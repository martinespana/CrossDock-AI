White card (1px line, 6px radius) with an illustrative mini UI on top (`.mini-demo`, gray inset) and copy below (`01 / OPERATIONAL WORKFLOW`, h3 19px, muted text). Classes `.use-case-grid`, `.use-case`, `.use-case-copy`; mini demo is `MiniDemo` in `landing.tsx`.

```tsx
<div className="use-case-grid">{cases.map(c =>
  <article className="use-case" key={c.type}><MiniDemo type={c.type} locale={locale} />
    <div className="use-case-copy"><span className="mono">{c.number} / {text.applicationArea}</span><h3>{c.title}</h3><p>{c.description}</p></div>
  </article>)}</div>
```

Mini demos are drawn in HTML/CSS with tiny type (5–8px) and sample data; always add a caption saying the data is illustrative.
