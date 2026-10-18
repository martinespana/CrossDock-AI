Signature dark CTA card: `#20241F`, radius `4px 28px 4px 4px`, flat offset shadow `7px 7px 0`. Accent `Mark`, h3, checklist with accent `check` icons, full-width `button-accent`, tiny next-step note. Class `.demo-invitation`, used inside `.cta-section` (2 columns with `.cta-copy`).

```tsx
<div className="demo-invitation"><Mark /><h3>{heading}</h3>
  <ul>{items.map(i => <li key={i}><Icon name="check" />{i}</li>)}</ul>
  <a className="button button-accent" href={demoPath(locale)}>{text.bookDemo}<Arrow /></a><p>{note}</p></div>
```

Close every marketing page with this CTA section (number = last section).
