Demo request form (name, company, email, role, interests, message) with validation, status and privacy note. Source: `components/lead-form.tsx`; fields use `.field`, `.form-row` (2 cols), `.form-status`, `.form-privacy`.

```tsx
<LeadForm locale={locale} />
```

New fields follow `.field`: label 11px/500 (optional part in gray `<span>`), input 45px tall, 1px `#D8D8D8`, 4px radius, white; errors in `.field-error` `#7A3525`, never red fill. Reuse this component instead of new forms when the goal is contact.
