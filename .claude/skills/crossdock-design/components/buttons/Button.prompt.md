Ink button, 52px tall, 4px radius, label left and `Arrow` right (`justify-content: space-between`, gap 32px); the arrow nudges 3px on hover. Classes in `app/globals.css`.

```tsx
<a className="button" href={demoPath(locale)}>{text.bookDemo}<Arrow /></a>
<a className="button button-small header-cta" href="…">Book a demo <Arrow /></a>
<a className="button button-accent" href="…">Agendar una demo<Arrow /></a>
<button className="button" type="submit" disabled={sending}>…</button>
```

Rules: every CTA has an `Arrow`. `button-accent` = the one accent action per viewport (also on dark cards). Primary action of the hero is rendered in accent automatically (`.hero-actions > .button`). Labels: verb + object, sentence case.
