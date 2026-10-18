Numbered overline that opens every section: small boxed number + UPPERCASE mono label. Defined (private) in `components/landing.tsx`; export it to `components/` before reusing.

```tsx
<SectionLabel number="02">{text.approachLabel}</SectionLabel>       // → <p class="section-label mono"><span>02</span>ONE OPERATIONAL LAYER</p>
<SectionLabel number="04" light>{text.operatorsLabel}</SectionLabel> // en bandas oscuras
```

Rules: numbers are sequential per page (`01`, `02`…). Label copy is 3–5 words, uppercase in the content object.
