#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { spawnSync } from 'node:child_process';
import { parseArgs } from '../src/args.mjs';
import { detectAgents } from '../src/agents.mjs';
import { findSkill, loadCatalog } from '../src/catalog.mjs';
import { installSkill } from '../src/installer.mjs';
import { formatInstall, print } from '../src/output.mjs';
import { packageRoot } from '../src/paths.mjs';
import { validateCatalog } from '../src/validate.mjs';

const help = `zorker-skills — select, install, import, validate, and run agent skills

Usage:
  zorker-skills list [--json]
  zorker-skills info <skill> [--json]
  zorker-skills detect [--scope global|project] [--project <dir>] [--json]
  zorker-skills install [<skill>|all] [--agent auto|all|codex|claude|cursor|agents]
                        [--scope global|project] [--project <dir>] [--target <dir>]
                        [--force] [--dry-run] [--json]
  zorker-skills import [<skill>|all] [--project <dir>] [--agent auto|all|...]
                       [--target <dir>] [--force] [--dry-run] [--json]
  zorker-skills validate [<skill>|all] [--json]
  zorker-skills run <skill> <skill-command> [...arguments]
  zorker-skills version

Notes:
  install defaults to global scope. import always uses project scope.
  Omitting a skill opens an interactive selector when a terminal is available.
  --target is the parent skills directory; the named skill is placed beneath it.`;

async function chooseSkill() {
  const skills = loadCatalog().skills;
  if (!process.stdin.isTTY) throw new Error('A skill name is required in non-interactive mode.');
  print(skills.map((skill, index) => `${index + 1}. ${skill.displayName} (${skill.name})`).join('\n'));
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question('Select a skill number: ');
  rl.close();
  const selected = skills[Number.parseInt(answer, 10) - 1];
  if (!selected) throw new Error('Invalid selection.');
  return selected.name;
}

function installSelection(selection, options) {
  const names = selection === 'all' ? loadCatalog().skills.map((skill) => skill.name) : [selection];
  return names.flatMap((name) => installSkill(name, options));
}

async function main() {
  const [command = 'help', ...rest] = process.argv.slice(2);
  const { positional, options } = parseArgs(rest);
  const json = Boolean(options.json);

  if (['help', '--help', '-h'].includes(command)) return print(help);
  if (command === 'version' || command === '--version' || command === '-v') {
    const pkg = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8'));
    return print(json ? { name: pkg.name, version: pkg.version } : pkg.version, json);
  }
  if (command === 'list') {
    const skills = loadCatalog().skills;
    return print(json ? skills : skills.map((skill) => `${skill.name.padEnd(28)} ${skill.description}`).join('\n'), json);
  }
  if (command === 'info') {
    const skill = findSkill(positional[0]);
    const result = { ...skill, root: undefined, skillFile: path.join(skill.root, skill.entry) };
    return print(json ? result : `${skill.displayName}\n${skill.description}\nVersion: ${skill.version}\nPath: ${result.skillFile}`, json);
  }
  if (command === 'detect') {
    const scope = options.scope || 'global';
    if (!['global', 'project'].includes(scope)) throw new Error('--scope must be global or project.');
    const results = detectAgents({ scope, project: options.project, home: options.home });
    return print(json ? results : results.map((item) => `${item.detected ? 'detected' : 'missing '}  ${item.id.padEnd(10)} ${item.skillsPath}`).join('\n'), json);
  }
  if (command === 'install' || command === 'import') {
    const selection = positional[0] || await chooseSkill();
    const scope = command === 'import' ? 'project' : (options.scope || 'global');
    if (!['global', 'project'].includes(scope)) throw new Error('--scope must be global or project.');
    const results = installSelection(selection, {
      agent: options.agent || 'auto', scope, project: options.project,
      home: options.home, target: options.target, force: Boolean(options.force), dryRun: Boolean(options.dryRun)
    });
    return print(json ? results : formatInstall(results), json);
  }
  if (command === 'validate') {
    const results = validateCatalog(positional[0] || 'all');
    const valid = results.every((result) => result.valid);
    print(json ? { valid, results } : results.map((result) => `${result.valid ? 'valid  ' : 'invalid'} ${result.name}${result.errors.length ? `\n  - ${result.errors.join('\n  - ')}` : ''}`).join('\n'), json);
    if (!valid) process.exitCode = 1;
    return;
  }
  if (command === 'run') {
    const [skillName, skillCommand, ...skillArgs] = rest;
    if (!skillName || !skillCommand) throw new Error('Usage: zorker-skills run <skill> <skill-command> [...arguments]');
    const skill = findSkill(skillName);
    const entry = skill.commands?.toolkit;
    if (!entry) throw new Error(`Skill "${skillName}" does not expose a toolkit command.`);
    const child = spawnSync(process.execPath, [path.join(skill.root, entry), skillCommand, ...skillArgs], { stdio: 'inherit' });
    if (child.error) throw child.error;
    process.exitCode = child.status ?? 1;
    return;
  }
  throw new Error(`Unknown command "${command}".\n\n${help}`);
}

main().catch((error) => {
  process.stderr.write(`Error: ${error.message}\n`);
  process.exitCode = 1;
});
