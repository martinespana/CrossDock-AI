#!/usr/bin/env node
/**
 * Package the current Next static export as one self-contained review file.
 * Run after npm run build: node scripts/create-review.mjs
 * No dependencies, hosting, analytics, submissions, or network requests.
 */
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exportRoot = path.join(project, 'out');
const destination = path.join(project, 'outputs', 'CrossDock-review.html');
const routeFiles = {
  en: 'index.html', es: 'es/index.html',
  enPrivacy: 'privacy/index.html', esPrivacy: 'es/privacy/index.html',
  enDemo: 'demo/index.html', esDemo: 'es/demo/index.html',
};
const pages = {};
const stylesheets = new Set();
let fontClass = '';

function exportPath(resource, relativeTo = exportRoot) {
  const clean = decodeURIComponent(resource.split(/[?#]/)[0]);
  const resolved = clean.startsWith('/')
    ? path.resolve(exportRoot, '.' + clean)
    : path.resolve(relativeTo, clean);
  if (resolved !== exportRoot && !resolved.startsWith(exportRoot + path.sep)) {
    throw new Error('Resource is outside the static export: ' + resource);
  }
  return resolved;
}

const mimeTypes = {
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.gif': 'image/gif', '.ico': 'image/x-icon',
};
async function dataUri(resource, relativeTo) {
  if (resource.startsWith('data:') || resource.startsWith('#')) return resource;
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(resource)) {
    throw new Error('A remote asset cannot be included in this offline review: ' + resource);
  }
  const file = exportPath(resource, relativeTo);
  const mime = mimeTypes[path.extname(file).toLowerCase()];
  if (!mime) throw new Error('Unsupported asset type: ' + resource);
  return 'data:' + mime + ';base64,' + (await readFile(file)).toString('base64');
}

async function replaceAsync(value, expression, replacer) {
  const replacements = [];
  value.replace(expression, (...args) => {
    replacements.push(replacer(...args));
    return '';
  });
  const results = await Promise.all(replacements);
  let index = 0;
  return value.replace(expression, () => results[index++]);
}

for (const [key, filename] of Object.entries(routeFiles)) {
  let source;
  try { source = await readFile(path.join(exportRoot, filename), 'utf8'); }
  catch { throw new Error('Missing out/' + filename + '. Build the site before creating the review.'); }
  fontClass ||= source.match(/<html\b[^>]*\bclass="([^"]*)"/i)?.[1] || '';
  for (const link of source.matchAll(/<link\b[^>]*>/gi)) {
    if (/\brel=["']stylesheet["']/i.test(link[0])) {
      const href = link[0].match(/\bhref=["']([^"']+)["']/i)?.[1];
      if (href) stylesheets.add(href);
    }
  }
  const body = source.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1];
  if (!body) throw new Error('No server-rendered body found in out/' + filename);
  let clean = body
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
    .replace(/<link\b[^>]*>/gi, '')
    .replace(/<div hidden="">(?:<!--[^]*?-->)?\s*<\/div>/gi, '')
    .replace(/<!--[^]*?-->/g, '');
  clean = await replaceAsync(clean, /\b(src|poster)="([^"]+)"/gi, async (_, attr, src) =>
    attr + '="' + await dataUri(src, path.dirname(path.join(exportRoot, filename))) + '"');
  if (/\b(?:srcset|on[a-z]+)=/i.test(clean)) {
    throw new Error('Unexpected image source set or inline event handler in out/' + filename);
  }
  pages[key] = clean;
}

if (!stylesheets.size) throw new Error('No exported stylesheet found. Build the site first.');
let siteCss = '';
for (const stylesheet of stylesheets) {
  const filename = exportPath(stylesheet);
  let css = await readFile(filename, 'utf8');
  if (/@import\b/i.test(css)) throw new Error('Resolve CSS imports before creating the offline review.');
  css = await replaceAsync(css, /url\(\s*(["']?)([^)'"\s]+)\1\s*\)/gi,
    async (_, quote, resource) => 'url("' + await dataUri(resource, path.dirname(filename)) + '")');
  siteCss += css + '\n';
}

// Escape all HTML-sensitive characters, including script terminators, in embedded data.
const json = value => JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, c => ({
  '<': '\\u003c', '>': '\\u003e', '&': '\\u0026', '\u2028': '\\u2028', '\u2029': '\\u2029',
}[c]));
const fontLicense = await readFile(path.join(project, 'public', 'fonts', 'OFL.txt'), 'utf8');

const reviewCss = `
:root { --review-toolbar-offset:0px; }
html, html[data-direction='kinetic'] { scroll-padding-top:calc(var(--review-toolbar-offset) + 100px); }
#review-toolbar { position:relative; z-index:100; color:#f5f5ef; background:#1a1e1c; border-bottom:1px solid #555b56; padding:14px clamp(18px,3vw,48px); font-family:Arial,Helvetica,sans-serif; }
.review-topline { display:flex; align-items:baseline; justify-content:space-between; gap:16px; margin-bottom:12px; }
.review-topline strong { font-size:14px; letter-spacing:-.02em; font-weight:650; }
.review-topline p { margin:0; color:#b8c1b9; font-size:11px; line-height:1.5; }
.review-controls { display:flex; align-items:end; gap:16px; flex-wrap:wrap; }
.review-control { display:grid; gap:5px; flex:1; min-width:110px; }
.review-control label { color:#bac4bb; font-size:10px; text-transform:uppercase; letter-spacing:.07em; }
.review-control select { width:100%; min-height:38px; padding:7px 32px 7px 10px; border:1px solid #687169; border-radius:4px; background:#252c26; color:#fff; font:12px Arial,Helvetica,sans-serif; color-scheme:dark; }
.review-copy { flex:0 0 auto; min-height:38px; border:1px solid #9da99e; border-radius:4px; color:#fff; background:transparent; font:12px Arial,Helvetica,sans-serif; padding:8px 16px; cursor:pointer; }
.review-copy:hover { background:#333d35; }
#review-toolbar button:focus-visible,#review-toolbar select:focus-visible { outline:2px solid #fff; outline-offset:3px; }
#review-status { font-size:11px; color:#d8e5d9; margin:10px 0 0; line-height:1.6; }
#review-status:empty { display:none; }
.review-feedback { margin-top:12px; max-width:700px; }
.review-feedback[hidden] { display:none!important; }
.review-feedback label { display:block; font-size:11px; color:#c7d4c9; margin-bottom:7px; }
.review-feedback textarea { display:block; box-sizing:border-box; width:100%; min-height:155px; border:1px solid #93a196; border-radius:4px; background:#f8faf6; color:#19211b; padding:12px; font:13px/1.7 Arial,Helvetica,sans-serif; resize:vertical; }
.review-feedback .review-copy { margin-top:9px; margin-right:8px; }
.site-header { top:var(--review-toolbar-offset); }
.review-form-note { padding:12px 14px; margin:0 0 20px; background:color-mix(in srgb,var(--accent) 18%,var(--paper)); border:1px solid var(--line); font-size:12px; line-height:1.7; }
.lead-form fieldset { opacity:.68; }
.lead-form button:disabled { cursor:default; }
@media(min-width:900px) { #review-toolbar { position:sticky; top:0; } .review-control { max-width:230px; } .review-copy { margin-left:auto; } }
@media(max-width:600px) { #review-toolbar { padding:15px 18px; } .review-topline { display:block; margin-bottom:10px; } .review-topline p { margin-top:5px; } .review-controls { gap:10px; } .review-control { min-width:calc(50% - 10px); } .review-control:first-child { min-width:calc(50% - 10px); } .review-copy { flex:1; font-size:11px; } }
@media print { #review-toolbar { display:none; } .site-header { position:static; } }
`;

function reviewRuntime() {
  'use strict';
  const pages = JSON.parse(document.getElementById('review-pages').textContent);
  const root = document.documentElement;
  const preview = document.getElementById('review-preview');
  const toolbar = document.getElementById('review-toolbar');
  const language = document.getElementById('review-language');
  const palette = document.getElementById('review-palette');
  const direction = document.getElementById('review-direction');
  const status = document.getElementById('review-status');
  const feedback = document.getElementById('review-feedback');
  const opinion = document.getElementById('review-opinion');
  let locale = 'es';
  let page = 'home';
  let activeScenario = 0;
  const workflows = {
    en: [
      ['Shipment update', 'location', 'Location update received', 'Shipment context reviewed', 'Customer update prepared', 'Keep the next person in the loop.'],
      ['Exception', 'alert', 'Pickup timing changed', 'Affected parties identified', 'Next step ready for review', 'Bring the right context to a decision.'],
      ['Document', 'file', 'Delivery document received', 'Shipment details organized', 'Record prepared for review', 'Move information into the next step.'],
    ],
    es: [
      ['Actualización de envío', 'location', 'Ubicación actualizada recibida', 'Contexto del envío revisado', 'Actualización al cliente preparada', 'Mantén informada a la siguiente persona.'],
      ['Excepción', 'alert', 'Cambio en la hora de recogida', 'Partes afectadas identificadas', 'Siguiente paso listo para revisión', 'Decide con el contexto adecuado.'],
      ['Documento', 'file', 'Documento de entrega recibido', 'Datos del envío organizados', 'Registro preparado para revisión', 'Lleva la información al siguiente paso.'],
    ],
  };
  const iconPaths = {
    location: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"></path><circle cx="12" cy="10" r="2.5"></circle>',
    alert: '<path d="m12 3 10 18H2L12 3Z"></path><path d="M12 9v5m0 3h.01"></path>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path><path d="M14 2v6h6M8 13h8m-8 4h6"></path>',
  };

  function updateOffset() {
    root.style.setProperty('--review-toolbar-offset', window.innerWidth >= 900 ? toolbar.offsetHeight + 'px' : '0px');
  }
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(updateOffset).observe(toolbar);
  window.addEventListener('resize', updateOffset);

  function setScenario(index) {
    activeScenario = index;
    const visual = preview.querySelector('.operations-visual');
    if (!visual) return;
    const scenario = workflows[locale][index];
    const heading = visual.querySelector('.action-head');
    if (heading) {
      heading.querySelector('svg').innerHTML = iconPaths[scenario[1]];
      heading.querySelector('span').textContent = scenario[0];
    }
    visual.querySelectorAll('.action-steps li').forEach((li, i) => {
      const marker = li.querySelector('.step-marker').cloneNode(true);
      const text = i === 2 ? document.createElement('strong') : document.createTextNode('');
      text.textContent = scenario[i + 2];
      li.replaceChildren(marker, text);
    });
    const detail = visual.querySelector('.visual-bottom > span');
    if (detail) detail.textContent = scenario[5];
    visual.querySelectorAll('.scenario-controls button').forEach((button, i) => {
      button.setAttribute('aria-pressed', String(i === index));
      button.onclick = () => setScenario(i);
    });
  }

  function closeMenu() {
    const toggle = preview.querySelector('.menu-toggle');
    preview.querySelector('#mobile-nav')?.remove();
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', locale === 'es' ? 'Abrir navegación' : 'Open navigation');
      toggle.querySelector('span').textContent = '☰';
    }
  }

  function configurePage() {
    preview.querySelector('.menu-toggle')?.addEventListener('click', () => {
      const toggle = preview.querySelector('.menu-toggle');
      if (toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); return; }
      const nav = document.createElement('nav');
      nav.id = 'mobile-nav';
      nav.className = 'mobile-nav';
      nav.setAttribute('aria-label', locale === 'es' ? 'Navegación móvil' : 'Mobile navigation');
      preview.querySelectorAll('.desktop-nav a,.header-cta').forEach(link => {
        const clone = link.cloneNode(true);
        clone.className = '';
        nav.appendChild(clone);
      });
      preview.querySelector('.site-header').appendChild(nav);
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', locale === 'es' ? 'Cerrar navegación' : 'Close navigation');
      toggle.querySelector('span').textContent = '×';
    });
    preview.querySelectorAll('form').forEach(form => {
      form.removeAttribute('action');
      form.removeAttribute('method');
      form.addEventListener('submit', event => event.preventDefault());
      const note = document.createElement('p');
      note.className = 'review-form-note';
      note.textContent = locale === 'es'
        ? 'Vista de revisión sin conexión. Este formulario es una muestra visual: está deshabilitado y no envía ni guarda datos.'
        : 'Offline review preview. This form is a visual sample: it is disabled and does not send or save any data.';
      form.prepend(note);
      form.querySelectorAll('fieldset,button,input,textarea,select').forEach(field => { field.disabled = true; });
      const availability = form.querySelector('.form-availability');
      if (availability) availability.remove();
    });
    setScenario(activeScenario);
  }

  function render(nextPage = page, anchor = '', resetScroll = true) {
    page = nextPage;
    preview.innerHTML = pages[locale + (page === 'privacy' ? 'Privacy' : page === 'demo' ? 'Demo' : '')];
    root.lang = locale;
    language.value = locale;
    configurePage();
    updateOffset();
    if (anchor) requestAnimationFrame(() => preview.querySelector('[id="' + anchor.replace(/[^\w-]/g, '') + '"]')?.scrollIntoView());
    else if (resetScroll) window.scrollTo({ top: 0, behavior: 'instant' });
  }

  preview.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (/^(https?:|mailto:|tel:)/i.test(href)) return;
    if (!href.startsWith('/') && !href.startsWith('#')) return;
    event.preventDefault();
    closeMenu();
    if (href.startsWith('#')) {
      preview.querySelector('[id="' + href.slice(1).replace(/[^\w-]/g, '') + '"]')?.scrollIntoView();
      return;
    }
    const url = new URL(href, 'https://offline.invalid');
    const nextLocale = url.pathname.startsWith('/es') ? 'es' : 'en';
    const nextPage = url.pathname.includes('/privacy') ? 'privacy' : url.pathname.includes('/demo') ? 'demo' : 'home';
    locale = nextLocale;
    render(nextPage, url.hash.slice(1));
  });
  language.addEventListener('change', () => {
    locale = language.value;
    render(page);
  });
  palette.addEventListener('change', () => { root.dataset.palette = palette.value; });
  direction.addEventListener('change', () => { root.dataset.direction = direction.value; });

  document.getElementById('review-copy').addEventListener('click', () => {
    opinion.value = 'CrossDock AI — Revisión de marca\nIdioma: ' + (locale === 'es' ? 'Español' : 'English')
      + '\nPaleta: ' + palette.options[palette.selectedIndex].text
      + '\nEstilo: ' + direction.options[direction.selectedIndex].text
      + '\n\nQué conservar:\n\nQué cambiar:\n';
    feedback.hidden = false;
    status.textContent = 'Completa tu opinión y copia el texto para enviarlo por el canal que prefieras.';
    opinion.focus();
    updateOffset();
  });
  document.getElementById('review-copy-text').addEventListener('click', async () => {
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(opinion.value);
        copied = true;
      }
    } catch { /* File URLs may not have permission to use the clipboard. */ }
    if (!copied) {
      opinion.focus();
      opinion.select();
      try { copied = document.execCommand('copy'); } catch { /* Manual selection remains available. */ }
    }
    status.textContent = copied
      ? 'Opinión copiada. Pégala en WhatsApp, correo o el chat de tus socios.'
      : 'Selecciona el texto y usa Copiar (⌘C en Mac o Ctrl+C en Windows).';
    updateOffset();
  });
  document.getElementById('review-close-feedback').addEventListener('click', () => {
    feedback.hidden = true;
    status.textContent = '';
    document.getElementById('review-copy').focus();
    updateOffset();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  render('home', '', false);
}

const document = `<!DOCTYPE html>
<html lang="es" class="${fontClass}" data-palette="yellow" data-direction="kinetic">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; font-src data:; img-src data:; connect-src 'none'; base-uri 'none'; form-action 'none'">
<title>CrossDock AI · Revisión de marca</title>
<!-- Bundled Geist font license (public/fonts/OFL.txt):
${fontLicense.replace(/-->/g, '-- >')}
-->
<style>${siteCss.replace(/<\/style/gi, '<\\/style')}\n${reviewCss}</style>
</head>
<body>
<aside id="review-toolbar" aria-label="Herramientas para revisión de marca">
  <div class="review-topline"><strong>CrossDock AI · Revisión de marca</strong><p>Archivo de revisión para comparar · Funciona sin conexión · No envía datos</p></div>
  <div class="review-controls">
    <div class="review-control"><label for="review-language">Idioma</label><select id="review-language"><option value="es">Español</option><option value="en">English</option></select></div>
    <div class="review-control"><label for="review-palette">Paleta</label><select id="review-palette"><option value="cobalt">Cobalto · #315CFD</option><option value="petrol">Petróleo · #007F78</option><option value="lime">Lima · #C5EE9C</option><option value="orange">Naranja · #E97435</option><option value="yellow" selected>Amarillo · #F4D83A</option></select></div>
    <div class="review-control"><label for="review-direction">Estilo</label><select id="review-direction"><option value="classic">Editorial</option><option value="kinetic" selected>Routing</option></select></div>
    <button class="review-copy" id="review-copy" type="button">Copiar opinión ↗</button>
  </div>
  <div class="review-feedback" id="review-feedback" hidden>
    <label for="review-opinion">Tu opinión (solo en este archivo; no se envía ni se guarda)</label>
    <textarea id="review-opinion" rows="8" spellcheck="true"></textarea>
    <button type="button" class="review-copy" id="review-copy-text">Copiar texto</button><button type="button" class="review-copy" id="review-close-feedback">Cerrar</button>
  </div>
  <p id="review-status" role="status" aria-live="polite"></p>
</aside>
<div id="review-preview">${pages.es}</div>
<noscript><p style="padding:20px">Activa JavaScript para cambiar idioma, paleta y estilo. Esta vista de revisión no envía datos.</p></noscript>
<script type="application/json" id="review-pages">${json(pages)}</script>
<script>(${reviewRuntime.toString()})();</script>
</body>
</html>`;

await mkdir(path.dirname(destination), { recursive: true });
await writeFile(destination, document, 'utf8');
const servedReview = path.join(exportRoot, 'review', 'CrossDock-review.html');
await mkdir(path.dirname(servedReview), { recursive: true });
await writeFile(servedReview, document, 'utf8');
console.log('Created ' + path.relative(project, destination) + ' (' + Math.ceil(Buffer.byteLength(document) / 1024) + ' KB).');
console.log('Includes both languages, demo and privacy pages, five palettes, two styles, and offline review controls.');
