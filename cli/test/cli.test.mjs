import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import { detectAgents } from '../src/agents.mjs';
import { findSkill, loadCatalog } from '../src/catalog.mjs';
import { digestDirectory, installSkill } from '../src/installer.mjs';
import { packageRoot } from '../src/paths.mjs';
import { validateCatalog } from '../src/validate.mjs';

const cli = path.join(packageRoot, 'cli', 'bin', 'zorker-skills.mjs');

test('catalog loads and every skill validates', () => {
  const catalog = loadCatalog();
  assert.ok(catalog.skills.length >= 1);
  assert.equal(findSkill('ai-website-strategist').name, 'ai-website-strategist');
  assert.ok(validateCatalog('all').every((result) => result.valid), JSON.stringify(validateCatalog('all')));
});

test('agent detection respects an isolated home', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'zskills-detect-'));
  fs.mkdirSync(path.join(root, '.codex'), { recursive: true });
  const detected = detectAgents({ scope: 'global', home: root, env: { PATH: '' } }).filter((item) => item.detected);
  assert.deepEqual(detected.map((item) => item.id), ['codex']);
  fs.rmSync(root, { recursive: true, force: true });
});

test('custom install is safe, idempotent, and force-updatable', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'zskills-install-'));
  const target = path.join(root, 'skills');
  const [first] = installSkill('ai-website-strategist', { target });
  assert.equal(first.action, 'installed');
  assert.equal(digestDirectory(first.destination), digestDirectory(findSkill('ai-website-strategist').root));
  const [second] = installSkill('ai-website-strategist', { target });
  assert.equal(second.action, 'unchanged');
  fs.appendFileSync(path.join(first.destination, 'SKILL.md'), '\nlocal change\n');
  assert.throws(() => installSkill('ai-website-strategist', { target }), /differs/);
  const [updated] = installSkill('ai-website-strategist', { target, force: true });
  assert.equal(updated.action, 'updated');
  assert.equal(digestDirectory(updated.destination), digestDirectory(findSkill('ai-website-strategist').root));
  fs.rmSync(root, { recursive: true, force: true });
});

test('CLI emits machine-readable catalog and dry-run install output', () => {
  const listed = spawnSync(process.execPath, [cli, 'list', '--json'], { encoding: 'utf8' });
  assert.equal(listed.status, 0, listed.stderr);
  assert.equal(JSON.parse(listed.stdout)[0].name, 'ai-website-strategist');
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'zskills-cli-'));
  const dryRun = spawnSync(process.execPath, [cli, 'install', 'ai-website-strategist', '--target', path.join(root, 'skills'), '--dry-run', '--json'], { encoding: 'utf8' });
  assert.equal(dryRun.status, 0, dryRun.stderr);
  assert.equal(JSON.parse(dryRun.stdout)[0].action, 'would-install');
  assert.equal(fs.existsSync(path.join(root, 'skills')), false);
  fs.rmSync(root, { recursive: true, force: true });
});
