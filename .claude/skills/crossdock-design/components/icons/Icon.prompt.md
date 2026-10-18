House icon set, 24px grid, 1.4 stroke, `currentColor`, `aria-hidden`. Source: `components/icons.tsx`.

```tsx
<Arrow />                 // every CTA and link
<Mark />                  // brand mark (wordmark, dark cards, agent core)
<Icon name="alert" />     // mail · message · location · system · grid · file · check · alert · clock · link
```

Rules: size via CSS (`width/height` on the parent class), color inherited, accent only on dark backgrounds. New icon → add a path to the `paths` map in the same style. No icon libraries, no emoji.
