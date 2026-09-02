import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';
import { ensureOutput, planWebsite, readJson, scaffoldSite, scoreAudit, validateScaffold } from './core.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('planner produces unique routes and complete page responsibilities', () => {
  const plan = planWebsite(readJson(path.join(root, 'examples', 'brief.json')));
  assert.ok(plan.pages.length >= 10);
  assert.equal(new Set(plan.pages.map((page) => page.route)).size, plan.pages.length);
  assert.ok(plan.pages.every((page) => page.intent && page.promise && page.primaryActionId && page.sections.length));
});

test('scorer returns weighted total, grade, and prioritized recommendations', () => {
  const report = scoreAudit(readJson(path.join(root, 'examples', 'audit.json')));
  assert.equal(report.total, 57, 'weighted total should remain deterministic');
  assert.equal(report.grade, 'F');
  assert.equal(report.readiness, 'not-ready');
  assert.equal(report.activeBlockerIds.length, 0);
  assert.ok(report.recommendations[0].priorityScore >= report.recommendations.at(-1).priorityScore);
});

test('scaffold creates valid, loadable route and content bindings', async () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'website-scaffold-'));
  const output = path.join(temp, 'site');
  const plan = planWebsite(readJson(path.join(root, 'examples', 'brief.json')));
  scaffoldSite(plan, output);
  const result = validateScaffold(output);
  assert.equal(result.valid, true);
  assert.equal(result.pages, plan.pages.length);
  const bindingsUrl = pathToFileURL(path.join(output, 'bindings', 'site-content.mjs'));
  bindingsUrl.searchParams.set('test', String(Date.now()));
  const bindings = await import(bindingsUrl.href);
  assert.equal(bindings.loadPage('/').id, 'home');
  assert.equal(bindings.loadPage('/missing'), null);
  fs.rmSync(temp, { recursive: true, force: true });
});

test('an active blocker overrides a high numeric score', () => {
  const audit = readJson(path.join(root, 'examples', 'audit.json'));
  for (const item of Object.values(audit.categories)) item.score = 5;
  audit.blockers['broken-primary-action'] = { present: true, evidence: ['Primary form returns an error.'] };
  const report = scoreAudit(audit);
  assert.equal(report.total, 100);
  assert.equal(report.readiness, 'blocked');
});

test('force output refuses dangerous broad directories', () => {
  assert.throws(() => ensureOutput(process.cwd(), true), /Refusing/);
  assert.throws(() => ensureOutput(path.parse(process.cwd()).root, true), /Refusing/);
});
