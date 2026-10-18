#!/usr/bin/env node
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(project, 'out');
const pages = ['index.html', 'es/index.html', 'demo/index.html', 'es/demo/index.html', 'privacy/index.html', 'es/privacy/index.html', 'brand/index.html'];
const assets = new Set();

for (const page of pages) {
  let html;
  try { html = await readFile(path.join(output, page), 'utf8'); }
  catch { throw new Error(`Static export missing: out/${page}. Hostinger must publish the static export in out/. Check that next.config.ts retains output: 'export' and distDir: 'out'.`); }
  if (!html.includes('<html') || !html.includes('<body')) throw new Error(`Incomplete exported page: out/${page}`);
  for (const [, resource] of html.matchAll(/(?:src|href)="(\/_next\/[^"?#]+)(?:[^"\s]*)"/g)) {
    assets.add(decodeURIComponent(resource));
  }
}
if (!assets.size) throw new Error('Static export contains no Next assets.');
for (const resource of assets) {
  const file = path.resolve(output, '.' + resource);
  if (!file.startsWith(output + path.sep) || !(await stat(file)).isFile()) throw new Error(`Exported asset missing: ${resource}`);
}
console.log(`Static export verified: ${pages.length} pages and ${assets.size} referenced assets in out/.`);
