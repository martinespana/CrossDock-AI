// Run with @napi-rs/canvas available through the project or NODE_PATH.
import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { createCanvas, GlobalFonts } = require('@napi-rs/canvas');
const fontPath = fileURLToPath(new URL('../public/fonts/geist-latin.woff2', import.meta.url));
const registered = GlobalFonts.registerFromPath(fontPath, 'CrossDock Geist');
const family = registered ? 'CrossDock Geist' : 'Arial';

const variants = [
  {
    file: 'og.png',
    heading: ['The AI operations', 'layer for logistics.'],
    subtitle: 'Built by logistics operators. For your daily operation.',
    cta: 'Book a demo',
    footer: 'LOGISTICS EXPERIENCE · APPLIED AI · GLOBAL OUTLOOK',
  },
  {
    file: 'og-es.png',
    heading: ['La capa de IA para', 'tu operación logística.'],
    subtitle: 'Creado por operadores logísticos. Para tu operación diaria.',
    cta: 'Agendar una demo',
    footer: 'EXPERIENCIA LOGÍSTICA · IA APLICADA · VISIÓN GLOBAL',
  },
];

for (const variant of variants) {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f8f8f8';
  ctx.fillRect(0, 0, 1200, 630);
  ctx.fillStyle = '#202020';
  ctx.font = `28px "${family}"`;
  ctx.fillText('cross-dock.ai', 64, 70);
  ctx.font = `76px "${family}"`;
  variant.heading.forEach((line, index) => {
    ctx.fillText(line, 60, 238 + index * 92);
  });
  ctx.fillStyle = '#686868';
  ctx.font = `24px "${family}"`;
  ctx.fillText(variant.subtitle, 64, 411);
  ctx.font = `18px "${family}"`;
  const buttonWidth = Math.ceil(ctx.measureText(variant.cta).width) + 42;
  ctx.fillStyle = '#c5ee9c';
  ctx.fillRect(64, 493, buttonWidth, 57);
  ctx.fillStyle = '#202020';
  ctx.fillText(variant.cta, 85, 530);
  ctx.strokeStyle = '#dedede';
  ctx.beginPath();
  ctx.moveTo(64, 580);
  ctx.lineTo(1136, 580);
  ctx.stroke();
  ctx.fillStyle = '#686868';
  ctx.font = `12px "${family}"`;
  ctx.fillText(variant.footer, 64, 607);
  await writeFile(new URL(`../public/${variant.file}`, import.meta.url), canvas.toBuffer('image/png'));
  process.stdout.write(`Created public/${variant.file} (1200 × 630)\n`);
}
