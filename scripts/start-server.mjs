#!/usr/bin/env node
import { fileURLToPath } from 'node:url';

// The generated server reads PORT supplied by the hosting environment.
process.env.HOSTNAME = '0.0.0.0';
process.env.NODE_ENV = 'production';
const server = new URL('../.next/standalone/server.js', import.meta.url);
process.chdir(fileURLToPath(new URL('../.next/standalone/', import.meta.url)));
await import(server.href);
