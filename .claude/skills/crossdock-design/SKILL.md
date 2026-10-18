---
name: crossdock-design
description: Use this skill to design or build any page, section, mock or asset for CrossDock AI (cross-dock.ai, capa de agentes de IA para operaciones logísticas B2B), either for production in this Next.js repo or for throwaway prototypes/mocks. The landing page is the reference; contains the design guidelines, tokens, type, fonts, logo, and the catalog of house components to reuse.
user-invocable: true
---

Read the readme.md file within this skill, and explore the other available files.
If working on production code in this repo, read `NUEVA-PAGINA.md` and follow it: reuse the real components in `components/` and the classes in `app/globals.css`; never copy `components/crossdock-ui.css` into the app.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), link `styles.css` from this skill (or inline it), copy assets out of `assets/`, and create static HTML files that use the same class names as the landing.
If the user invokes this skill without any other guidance, ask them what page or section they want to build, ask a few questions (audience, goal, CTA, bilingual copy), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key facts: B2B logistics, editorial and quiet; paper `#F9F9F9` + ink `#1F1F1F` monochrome with **one** accent (`--accent`, default lime `#C5EE9C`, swappable via `html[data-palette]`); Geist for everything + system mono for UPPERCASE labels; huge tight headings (`letter-spacing -.065em`); 1px `--line` borders, radius 2–6px, no gradients, no photos, no soft shadows; numbered sections (`01 / LABEL`); every CTA carries the `Arrow` icon; house icons only (`components/icons.tsx`); bilingual EN/ES (Colombian Spanish, "tú") on every page.
