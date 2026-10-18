#!/usr/bin/env node
import { cp, mkdir, readFile, readdir, rm, stat } from 'node:fs/promises';
import { createRequire } from 'node:module';
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

// Some tracers follow only the CJS condition of @swc/helpers. Node 22+ can
// choose module-sync (ESM) instead, so ship the complete runtime packages.
const projectRequire = createRequire(path.join(project, 'package.json'));
const nextRequire = createRequire(projectRequire.resolve('next/package.json'));
const helpersManifest = nextRequire.resolve('@swc/helpers/package.json');
const helpersRequire = createRequire(helpersManifest);
const runtimePackages = [
  { name: '@swc/helpers', manifest: helpersManifest, prefix: '@swc+helpers@' },
  { name: 'tslib', manifest: helpersRequire.resolve('tslib/package.json'), prefix: 'tslib@' },
];
const modules = path.join(standalone, 'node_modules');
const store = path.join(modules, '.pnpm');
const entries = await readdir(store).catch(error => {
  if (error.code === 'ENOENT') return [];
  throw error;
});
for (const pkg of runtimePackages) {
  const destinations = [path.join(modules, pkg.name)];
  for (const entry of entries.filter(entry => entry.startsWith(pkg.prefix))) {
    destinations.push(path.join(store, entry, 'node_modules', pkg.name));
  }
  for (const destination of destinations) {
    // Replace generated symlinks as well as partial packages; never copy through
    // a symlink that could point back to the development dependencies.
    await rm(destination, { recursive: true, force: true });
    await mkdir(path.dirname(destination), { recursive: true });
    await cp(path.dirname(pkg.manifest), destination, { recursive: true, dereference: true });
  }
}

const bundledNextRequire = createRequire(path.join(modules, 'next', 'package.json'));
for (const file of ['@swc/helpers/esm/_interop_require_default.js', '@swc/helpers/cjs/_interop_require_default.cjs', 'tslib/tslib.js']) {
  if (!(await stat(path.join(modules, file))).isFile()) throw new Error(`Standalone runtime file missing: ${file}`);
}
const helper = bundledNextRequire.resolve('@swc/helpers/_/_interop_require_default');
if (!helper.startsWith(standalone + path.sep)) throw new Error('Standalone helper resolved outside the deployment bundle.');
bundledNextRequire('@swc/helpers/_/_interop_require_default');

for (const file of ['server.js', '.next/BUILD_ID', '.next/server/app/index.html', '.next/server/app/es.html', '.next/server/app/demo.html', '.next/server/app/es/demo.html', 'public/icon.svg', 'public/og.png', 'public/og-es.png']) {
  if (!(await stat(path.join(standalone, file))).isFile()) throw new Error(`Standalone deployment file missing: ${file}`);
}
console.log('Standalone deployment prepared: server, complete SWC/tslib runtime dependencies, public assets, static resources, and bilingual pages.');
