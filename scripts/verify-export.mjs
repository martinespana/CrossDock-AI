#!/usr/bin/env node
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(project, 'out');
const pages = ['index.html', 'es/index.html', 'demo/index.html', 'es/demo/index.html', 'privacy/index.html', 'es/privacy/index.html', 'brand/index.html'];
const assets = new Set();

async function buildDiagnostics() {
  const details = [];
  for (const directory of ['.next', 'out']) {
    try {
      const manifest = JSON.parse(await readFile(path.join(project, directory, 'required-server-files.json'), 'utf8'));
      details.push(JSON.stringify({ manifest: `${directory}/required-server-files.json`, output: manifest.config?.output ?? 'default', distDir: manifest.config?.distDir ?? 'default' }));
    } catch { /* A failed or static build may not emit a server manifest. */ }
    try {
      const detail = JSON.parse(await readFile(path.join(project, directory, 'export-detail.json'), 'utf8'));
      details.push(JSON.stringify({ manifest: `${directory}/export-detail.json`, success: detail.success, exportDirectory: typeof detail.outDirectory === 'string' ? path.relative(project, detail.outDirectory) : undefined }));
    } catch { /* Export details are optional diagnostic data. */ }
  }
  const configs = (await readdir(project)).filter(name => /(?:^|\.)next\.config\.(?:js|mjs|ts)$/.test(name));
  details.push(`Config filenames: ${configs.join(', ') || 'none'}`);
  return details.join('\n');
}

for (const page of pages) {
  let html;
  try { html = await readFile(path.join(output, page), 'utf8'); }
  catch { throw new Error(`Static export missing: out/${page}. Keep output: 'export' with the default .next build directory and publish out/. If the host applies a server preset, select a static/frontend or Other preset.\n${await buildDiagnostics()}`); }
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
