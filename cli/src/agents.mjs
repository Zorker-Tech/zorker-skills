import fs from 'node:fs';
import path from 'node:path';
import { resolveHome, resolveProject } from './paths.mjs';

export const agentAdapters = [
  { id: 'codex', label: 'Codex', marker: '.codex', skills: '.codex/skills', commands: ['codex'] },
  { id: 'claude', label: 'Claude Code', marker: '.claude', skills: '.claude/skills', commands: ['claude'] },
  { id: 'cursor', label: 'Cursor', marker: '.cursor', skills: '.cursor/skills', commands: ['cursor'] },
  { id: 'agents', label: 'Generic agents', marker: '.agents', skills: '.agents/skills' }
];

function commandExists(commands = [], env = process.env) {
  const directories = (env.PATH || '').split(path.delimiter).filter(Boolean);
  const extensions = process.platform === 'win32'
    ? (env.PATHEXT || '.COM;.EXE;.BAT;.CMD').split(';')
    : [''];
  return commands.some((command) => directories.some((directory) => extensions.some((extension) => {
    const candidate = path.join(directory.replace(/^"|"$/g, ''), `${command}${extension.toLowerCase()}`);
    const alternate = path.join(directory.replace(/^"|"$/g, ''), `${command}${extension.toUpperCase()}`);
    return fs.existsSync(candidate) || fs.existsSync(alternate);
  })));
}

export function getAdapter(id) {
  const adapter = agentAdapters.find((item) => item.id === id);
  if (!adapter) {
    throw new Error(`Unknown agent "${id}". Supported: ${agentAdapters.map((item) => item.id).join(', ')}`);
  }
  return adapter;
}

export function targetFor(adapter, scope, project, home) {
  const base = scope === 'project' ? resolveProject(project) : resolveHome({ ...process.env, ZORKER_SKILLS_HOME: home || process.env.ZORKER_SKILLS_HOME });
  return path.join(base, ...adapter.skills.split('/'));
}

export function detectAgents({ scope = 'global', project = process.cwd(), home, env = process.env } = {}) {
  const base = scope === 'project' ? resolveProject(project) : resolveHome({ ...process.env, ZORKER_SKILLS_HOME: home || process.env.ZORKER_SKILLS_HOME });
  return agentAdapters.map((adapter) => {
    const markerPath = path.join(base, adapter.marker);
    const skillsPath = path.join(base, ...adapter.skills.split('/'));
    const evidence = [];
    if (fs.existsSync(markerPath)) evidence.push('configuration-directory');
    if (fs.existsSync(skillsPath)) evidence.push('skills-directory');
    if (scope === 'global' && commandExists(adapter.commands, env)) evidence.push('command-on-path');
    const detected = evidence.length > 0;
    return { ...adapter, scope, detected, evidence, markerPath, skillsPath };
  });
}
