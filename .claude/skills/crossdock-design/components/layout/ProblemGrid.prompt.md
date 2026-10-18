Three columns divided by 1px vertical lines over a top border; each block = icon + `/01` number, h3, short muted paragraph. Classes `.problem-grid` / `.problem-block`.

```tsx
<div className="problem-grid">{items.map(i =>
  <article className="problem-block" key={i.num}>
    <div className="problem-block-top"><Icon name={i.icon} /><span className="mono">/{i.num}</span></div>
    <h3>{i.title}</h3><p>{i.body}</p>
  </article>)}</div>
```

Use for problems, principles, features. Title ends with a period; body ≤ 2 sentences.
