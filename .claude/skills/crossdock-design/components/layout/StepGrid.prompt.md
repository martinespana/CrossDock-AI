Process steps in 3 columns, no borders: `01 /` mono, h3 with trailing `Arrow`, muted copy. Class `.approach-steps`.

```tsx
<div className="approach-steps">{steps.map(s =>
  <article key={s.number}><span className="mono">{s.number} /</span><h3>{s.title}<Arrow /></h3><p>{s.description}</p></article>)}</div>
```

Titles are single verbs (Connect · Orchestrate · Execute / Conectar · Orquestar · Ejecutar).
