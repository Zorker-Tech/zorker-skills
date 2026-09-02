import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { detectAgents, getAdapter, targetFor } from './agents.mjs';
import { findSkill } from './catalog.mjs';

function filesUnder(root, current = root) {
  const entries = fs.readdirSync(current, { withFileTypes: true })
    .filter((entry) => !['node_modules', '.git', '.DS_Store'].includes(entry.name))
    .sort((a, b) => a.name.localeCompare(b.name));
  return entries.flatMap((entry) => {
    const full = path.join(current, entry.name);
    return entry.isDirectory() ? filesUnder(root, full) : [path.relative(root, full).replaceAll('\\', '/')];
  });
}

export function digestDirectory(root) {
  const hash = crypto.createHash('sha256');
  for (const relative of filesUnder(root)) {
    hash.update(relative);
    hash.update('\0');
    hash.update(fs.readFileSync(path.join(root, relative)));
    hash.update('\0');
  }
  return hash.digest('hex');
}

function copyDirectory(source, destination) {
  fs.cpSync(source, destination, {
    recursive: true,
    errorOnExist: true,
    force: false,
    filter: (sourcePath) => !['node_modules', '.git', '.DS_Store'].includes(path.basename(sourcePath))
  });
}

export function resolveTargets({ agent = 'auto', scope = 'global', project, home, target } = {}) {
  if (target) return [{ id: 'custom', label: 'Custom directory', skillsPath: path.resolve(target), detected: true, scope }];
  if (agent === 'all') {
    const detected = detectAgents({ scope, project, home }).filter((item) => item.detected);
    if (!detected.length) throw new Error(`No ${scope} agent installation was detected. Pass --agent <id> or --target <directory>.`);
    return detected;
  }
  if (agent === 'auto') {
    const detected = detectAgents({ scope, project, home }).filter((item) => item.detected);
    if (!detected.length) {
      throw new Error(`No ${scope} agent installation was detected. Pass --agent <id> or --target <directory>.`);
    }
    return detected;
  }
  const adapter = getAdapter(agent);
  return [{ ...adapter, scope, detected: true, skillsPath: targetFor(adapter, scope, project, home) }];
}

export function installSkill(name, options = {}) {
  const skill = findSkill(name);
  const targets = resolveTargets(options);
  const sourceDigest = digestDirectory(skill.root);
  return targets.map((target) => {
    const destination = path.join(target.skillsPath, skill.name);
    if (options.dryRun) return { skill: name, agent: target.id, destination, action: 'would-install', digest: sourceDigest };
    fs.mkdirSync(target.skillsPath, { recursive: true });
    if (fs.existsSync(destination)) {
      const currentDigest = digestDirectory(destination);
      if (currentDigest === sourceDigest) {
        return { skill: name, agent: target.id, destination, action: 'unchanged', digest: sourceDigest };
      }
      if (!options.force) {
        throw new Error(`Destination differs: ${destination}. Re-run with --force to replace it.`);
      }
      const backup = `${destination}.backup-${Date.now()}`;
      fs.renameSync(destination, backup);
      try {
        copyDirectory(skill.root, destination);
        fs.rmSync(backup, { recursive: true, force: true });
      } catch (error) {
        if (fs.existsSync(destination)) fs.rmSync(destination, { recursive: true, force: true });
        fs.renameSync(backup, destination);
        throw error;
      }
      return { skill: name, agent: target.id, destination, action: 'updated', digest: sourceDigest };
    }
    copyDirectory(skill.root, destination);
    return { skill: name, agent: target.id, destination, action: 'installed', digest: sourceDigest };
  });
}
