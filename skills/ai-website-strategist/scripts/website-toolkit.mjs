#!/usr/bin/env node
import path from 'node:path';
import { ensureOutput, planWebsite, readJson, scaffoldSite, scoreAudit, validateBrief, validatePlan, validateScaffold, writeJson } from './core.mjs';

function parse(argv) {
  const positional = [];
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--force') options.force = true;
    else if (value === '--out') options.out = argv[++index];
    else if (value.startsWith('--out=')) options.out = value.slice(6);
    else if (value.startsWith('--')) throw new Error(`Unknown option: ${value}`);
    else positional.push(value);
  }
  return { positional, options };
}

const usage = `website-toolkit

Commands:
  plan <brief.json> --out <directory> [--force]
  score <audit.json> --out <report.json> [--force]
  scaffold <site-plan.json> --out <directory> [--force]
  validate <brief.json|site-plan.json|scaffold-directory>`;

function main() {
  const [command, ...raw] = process.argv.slice(2);
  const { positional, options } = parse(raw);
  if (!command || command === 'help' || command === '--help') return process.stdout.write(`${usage}\n`);
  if (command === 'plan') {
    if (!positional[0] || !options.out) throw new Error('plan requires <brief.json> and --out <directory>.');
    const plan = planWebsite(readJson(positional[0]));
    const output = ensureOutput(options.out, options.force);
    writeJson(path.join(output, 'site-plan.json'), plan);
    writeJson(path.join(output, 'routes.json'), { schemaVersion: 1, routes: Object.fromEntries(plan.pages.map((item) => [item.route, item.id])) });
    writeJson(path.join(output, 'navigation.json'), { schemaVersion: 1, navigation: plan.navigation });
    writeJson(path.join(output, 'claims-register.json'), { schemaVersion: 1, claims: plan.claims, proof: plan.proof });
    writeJson(path.join(output, 'analytics-plan.json'), { schemaVersion: 1, analytics: plan.analytics });
    return process.stdout.write(`${JSON.stringify({ ok: true, command, output, pages: plan.pages.length }, null, 2)}\n`);
  }
  if (command === 'score') {
    if (!positional[0] || !options.out) throw new Error('score requires <audit.json> and --out <report.json>.');
    const report = scoreAudit(readJson(positional[0]));
    const output = ensureOutput(options.out, options.force, 'file');
    writeJson(output, report);
    return process.stdout.write(`${JSON.stringify({ ok: true, command, output, total: report.total, grade: report.grade, readiness: report.readiness }, null, 2)}\n`);
  }
  if (command === 'scaffold') {
    if (!positional[0] || !options.out) throw new Error('scaffold requires <site-plan.json> and --out <directory>.');
    const output = scaffoldSite(readJson(positional[0]), options.out, options.force);
    return process.stdout.write(`${JSON.stringify({ ok: true, command, output }, null, 2)}\n`);
  }
  if (command === 'validate') {
    if (!positional[0]) throw new Error('validate requires a JSON file or scaffold directory.');
    const input = path.resolve(positional[0]);
    let result;
    if (input.toLowerCase().endsWith('.json')) {
      const value = readJson(input);
      if (value.site && value.audiences && value.products && value.primaryAction) result = { valid: validateBrief(value), type: 'brief', input };
      else if (value.site && value.pages && value.strategy) result = { valid: validatePlan(value), type: 'site-plan', input };
      else throw new Error('JSON is neither a recognized brief nor site plan.');
    } else result = { ...validateScaffold(input), type: 'scaffold', input };
    return process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  }
  throw new Error(`Unknown command "${command}".\n\n${usage}`);
}

try {
  main();
} catch (error) {
  process.stderr.write(`Error: ${error.message}\n`);
  process.exitCode = 1;
}
