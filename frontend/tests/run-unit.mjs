// Bundles tests/decisionRules.test.mjs with the esbuild that ships with Vite, then runs it with node's built-in runner.
// Usage (from frontend/):  node tests/run-unit.mjs        No dependency is added; esbuild is already a dependency of Vite.
import { build } from 'esbuild';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'cara-unit-')), 'unit.mjs');
await build({ entryPoints: [path.join(here, 'decisionRules.test.mjs')], bundle: true, platform: 'node', format: 'esm', outfile: out, logLevel: 'error' });
const r = spawnSync(process.execPath, ['--test', out], { stdio: 'inherit' });
process.exit(r.status ?? 1);
