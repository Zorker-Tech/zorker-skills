import fs from 'node:fs';
import path from 'node:path';
import { loadCatalog } from '../src/catalog.mjs';
import { packageRoot } from '../src/paths.mjs';

const failures = [];
const ignored = new Set(['.git', 'node_modules', '.tmp']);

function walk(root) {
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name) || entry.name.endsWith('.tgz')) return [];
    const full = path.join(root, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

for (const file of walk(packageRoot)) {
  const data = fs.readFileSync(file);
  const registryTokenPrefix = Buffer.from(['n', 'p', 'm', '_'].join(''));
  if (data.includes(registryTokenPrefix) && !file.endsWith('.npmrc.example')) failures.push(`${file}: possible registry token`);
  const text = data.toString('utf8');
  if (/(?:api|secret|access)[_-]?key\s*[:=]\s*["'][^"'\n]{8,}/i.test(text)) failures.push(`${file}: possible embedded secret`);
}

for (const skill of loadCatalog().skills) {
  const root = path.join(packageRoot, 'skills', skill.path);
  const prose = walk(root).filter((file) => /(?:SKILL\.md|references[\\/].+\.md)$/i.test(file));
  for (const file of prose) {
    const text = fs.readFileSync(file, 'utf8');
    if (/https?:\/\//i.test(text)) failures.push(`${file}: source URL in portable skill prose`);
    if (/\b(?:official sources?|competitor research|benchmark sources?)\b/i.test(text)) failures.push(`${file}: source-oriented language in portable skill prose`);
  }
}

if (failures.length) {
  process.stderr.write(`${failures.join('\n')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write('Package audit passed: catalog resolved, no embedded token pattern, and portable skill prose is source-free.\n');
}
