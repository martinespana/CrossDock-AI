#!/usr/bin/env node
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import { cp, mkdtemp, readdir, realpath, rm } from 'node:fs/promises';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const isolated = await mkdtemp(path.join(tmpdir(), 'crossdock-runtime-'));
const app = path.join(isolated, 'app');
const env = { ...process.env, NODE_PATH: '', NODE_OPTIONS: '', NODE_ENV: 'production' };
const dereference = process.argv.includes('--dereference');
let server;
let serverExit;
let logs = '';
try {
  // Outside the checkout, Node cannot silently use development dependencies.
  await cp(path.join(project, '.next', 'standalone'), app, {
    recursive: true, ...(dereference ? { dereference: true } : { verbatimSymlinks: true }),
  });
  const isolatedRoot = await realpath(app);
  async function checkLinks(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) {
        assert((await realpath(file)).startsWith(isolatedRoot + path.sep), `Symlink escaped isolated bundle: ${file}`);
      } else if (entry.isDirectory()) await checkLinks(file);
    }
  }
  await checkLinks(app);
  const probe = `
    const assert = require('node:assert/strict');
    const path = require('node:path');
    const { createRequire } = require('node:module');
    const r = createRequire(require.resolve('next/package.json'));
    for (const name of ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/server', '@next/env', '@swc/helpers/_/_interop_require_default', 'tslib']) {
      const resolved = r.resolve(name);
      assert(resolved.startsWith(process.cwd() + path.sep), 'Dependency escaped isolated bundle: ' + name);
      r(name);
    }
    r('next/dist/client/lib/console.js');
    r('next/dist/server/app-render/dynamic-rendering.js');
  `;
  for (const flags of [[], ['--no-experimental-require-module']]) {
    const result = spawnSync(process.execPath, [...flags, '-e', probe], { cwd: app, env, encoding: 'utf8' });
    assert.equal(result.status, 0, `Isolated runtime dependency check failed:\n${result.stderr}`);
  }

  const reservation = createServer();
  reservation.listen(0, '127.0.0.1');
  await once(reservation, 'listening');
  const port = reservation.address().port;
  await new Promise((resolve, reject) => reservation.close(error => error ? reject(error) : resolve()));
  server = spawn(process.execPath, ['server.js'], {
    cwd: app, env: { ...env, PORT: String(port), HOSTNAME: '127.0.0.1' }, stdio: ['ignore', 'pipe', 'pipe'],
  });
  server.stdout.on('data', chunk => { logs += chunk; });
  server.stderr.on('data', chunk => { logs += chunk; });
  serverExit = once(server, 'exit');
  const base = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 20_000;
  while (true) {
    try {
      await fetch(base + '/icon.svg', { signal: AbortSignal.timeout(1_000) });
      break;
    } catch {
      if (server.exitCode !== null || Date.now() > deadline) throw new Error(`Isolated server did not start:\n${logs}`);
      await delay(100);
    }
  }
  const routes = ['/', '/es/', '/demo/', '/es/demo/', '/privacy/', '/es/privacy/', '/brand/', '/robots.txt', '/sitemap.xml'];
  const assets = new Set(['/icon.svg', '/og.png', '/og-es.png']);
  for (const route of routes) {
    const response = await fetch(base + route, { signal: AbortSignal.timeout(10_000) });
    const body = await response.text();
    assert.equal(response.status, 200, `${route} failed:\n${logs}`);
    assert(body.length > 0, `${route} was empty`);
    for (const match of body.matchAll(/(?:src|href)="(\/_next\/static\/[^"?#]+)[^"]*"/g)) assets.add(match[1]);
  }
  for (const asset of assets) {
    const response = await fetch(base + asset, { signal: AbortSignal.timeout(10_000) });
    assert.equal(response.status, 200, `Missing production asset: ${asset}`);
    await response.arrayBuffer();
  }
  const missing = await fetch(base + '/nonexistent-runtime-check/', { signal: AbortSignal.timeout(10_000) });
  assert.equal(missing.status, 404);
  assert(!logs.includes('Cannot find module'), logs);
  console.log(`Isolated standalone check passed (${dereference ? 'dereferenced packages' : 'preserved links'}): React/Next ESM/CJS dependencies, ${routes.length} routes, ${assets.size} assets, and the 404 page.`);
} finally {
  if (server && server.exitCode === null) server.kill('SIGTERM');
  if (serverExit) await serverExit;
  await rm(isolated, { recursive: true, force: true });
}
