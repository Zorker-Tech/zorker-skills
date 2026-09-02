import fs from 'node:fs';
import path from 'node:path';
import { loadCatalog } from './catalog.mjs';
import { skillsRoot } from './paths.mjs';

const forbiddenContent = [
  /https?:\/\//i,
  new RegExp(['npm', '[A-Za-z0-9]{20,}'].join('_')),
  /(?:api|secret|access)[_-]?key\s*[:=]\s*["'][^"']+/i
];

function walk(root) {
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(root, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

export function validateSkill(skill) {
  const root = path.join(skillsRoot, skill.path);
  const errors = [];
  const skillFile = path.join(root, 'SKILL.md');
  const text = fs.readFileSync(skillFile, 'utf8');
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) errors.push('SKILL.md is missing YAML frontmatter.');
  if (!new RegExp(`^name:\\s*${skill.name}\\s*$`, 'm').test(frontmatter?.[1] || '')) errors.push('Frontmatter name does not match the catalog.');
  if (!/^description:\s*.+$/m.test(frontmatter?.[1] || '')) errors.push('Frontmatter description is missing.');
  if (!fs.existsSync(path.join(root, 'agents', 'openai.yaml'))) errors.push('agents/openai.yaml is missing.');
  const proseFiles = walk(root).filter((file) => /\.(md|yaml|yml|json)$/i.test(file));
  for (const file of proseFiles) {
    const content = fs.readFileSync(file, 'utf8');
    for (const pattern of forbiddenContent) {
      if (pattern.test(content) && !file.endsWith('.schema.json')) {
        errors.push(`${path.relative(root, file)} contains disallowed source, URL, or secret-like content.`);
        break;
      }
    }
  }
  return { name: skill.name, valid: errors.length === 0, errors };
}

export function validateCatalog(selection = 'all') {
  const catalog = loadCatalog();
  const selected = selection === 'all' ? catalog.skills : catalog.skills.filter((item) => item.name === selection);
  if (!selected.length) throw new Error(`Unknown skill "${selection}".`);
  return selected.map(validateSkill);
}
