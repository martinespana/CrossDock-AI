Canonical section anatomy: label → heading row (h2 left, two-line intro right, bottom-aligned) → content grid → optional caption.

```tsx
<section className="problem-section section-pad container" aria-labelledby="problem-heading">
  <SectionLabel number="01">{text.problemLabel}</SectionLabel>
  <div className="section-heading-row">
    <h2 id="problem-heading">{text.problemHeading[0]}<br /><span className="muted-heading">{text.problemHeading[1]}</span></h2>
    <p>{text.problemIntro[0]}<br />{text.problemIntro[1]}</p>
  </div>
  …grid…
  <p className="concept-caption">{text.caption}</p>
</section>
```

Variants: full-bleed band → `<section className="approach-section section-pad"><div className="container">…` (gray `#EFEFEF` band with top/bottom lines). Dark band → `.operators-section` (max one per page).
