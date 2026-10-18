Secondary action: text 12px/500 + `Arrow`, underlines on hover (offset 5px). Class `.text-link`.

```tsx
<div className="hero-actions">
  <a className="button" href={demoPath(locale)}>{text.bookDemo}<Arrow /></a>
  <a className="text-link" href="#approach">{text.explore}<Arrow /></a>
</div>
```

Rules: pair it with a `.button`, never two buttons side by side.
