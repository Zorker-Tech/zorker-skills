import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

export const packageRoot = path.resolve(here, '..', '..');
export const skillsRoot = path.join(packageRoot, 'skills');
export const catalogPath = path.join(skillsRoot, 'catalog.json');

export function resolveHome(env = process.env) {
  return env.ZORKER_SKILLS_HOME ? path.resolve(env.ZORKER_SKILLS_HOME) : os.homedir();
}

export function resolveProject(value = process.cwd()) {
  return path.resolve(value);
}
