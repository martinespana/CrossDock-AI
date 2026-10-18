#!/usr/bin/env node
import { cp, mkdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const build = path.join(project, '.next');
const standalone = path.join(build, 'standalone');
const manifest = JSON.parse(await readFile(path.join(build, 'required-server-files.json'), 'utf8'));
if (manifest.config?.output !== 'standalone') throw new Error('Expected the standalone Next.js server build. Use pnpm run build:static for a static export.');
if (!(await stat(path.join(standalone, 'server.js'))).isFile()) throw new Error('Standalone server.js is missing.');
await mkdir(path.join(standalone, '.next'), { recursive: true });
await cp(path.join(project, 'public'), path.join(standalone, 'public'), { recursive: true, force: true });
await cp(path.join(build, 'static'), path.join(standalone, '.next', 'static'), { recursive: true, force: true });

for (const file of ['server.js', '.next/BUILD_ID', '.next/server/app/index.html', '.next/server/app/es.html', '.next/server/app/demo.html', '.next/server/app/es/demo.html', 'public/icon.svg', 'public/og.png', 'public/og-es.png']) {
  if (!(await stat(path.join(standalone, file))).isFile()) throw new Error(`Standalone deployment file missing: ${file}`);
}
console.log('Standalone deployment prepared: .next/standalone/server.js, public assets, static resources, and bilingual pages.');
