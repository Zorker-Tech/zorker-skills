import fs from 'node:fs';
import path from 'node:path';
import { catalogPath, skillsRoot } from './paths.mjs';

export function loadCatalog() {
  const parsed = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  if (parsed.catalogVersion !== 1 || !Array.isArray(parsed.skills)) {
    throw new Error('Unsupported or invalid skill catalog.');
  }
  const names = new Set();
  for (const skill of parsed.skills) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skill.name)) {
      throw new Error(`Invalid skill name: ${skill.name}`);
    }
    if (names.has(skill.name)) throw new Error(`Duplicate skill: ${skill.name}`);
    names.add(skill.name);
    const root = path.resolve(skillsRoot, skill.path);
    if (!root.startsWith(path.resolve(skillsRoot) + path.sep)) {
      throw new Error(`Skill path escapes catalog root: ${skill.path}`);
    }
    if (!fs.existsSync(path.join(root, skill.entry))) {
      throw new Error(`Missing entry for ${skill.name}: ${skill.entry}`);
    }
  }
  return parsed;
}

export function findSkill(name) {
  const skill = loadCatalog().skills.find((item) => item.name === name);
  if (!skill) throw new Error(`Unknown skill "${name}". Run "zorker-skills list".`);
  return { ...skill, root: path.join(skillsRoot, skill.path) };
}
