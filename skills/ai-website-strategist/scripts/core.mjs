import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptRoot = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(scriptRoot, '..');

export const benchmark = readJson(path.join(skillRoot, 'assets', 'benchmark.json'));
export const pageTypes = readJson(path.join(skillRoot, 'assets', 'templates', 'page-types.json')).pageTypes;

export function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
  } catch (error) {
    throw new Error(`Cannot read JSON ${path.resolve(file)}: ${error.message}`);
  }
}

export function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

export function assertId(value, label) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value || '')) throw new Error(`${label} must be a lowercase hyphenated identifier.`);
}

function uniqueIds(items, label) {
  const seen = new Set();
  for (const item of items) {
    assertId(item.id, `${label} id`);
    if (seen.has(item.id)) throw new Error(`Duplicate ${label} id: ${item.id}`);
    seen.add(item.id);
  }
}

export function validateBrief(brief) {
  if (brief.schemaVersion !== 1) throw new Error('Brief schemaVersion must be 1.');
  if (!brief.site?.name || !brief.site?.category) throw new Error('Brief site.name and site.category are required.');
  if (!Array.isArray(brief.audiences) || !brief.audiences.length) throw new Error('Brief requires at least one audience.');
  if (!Array.isArray(brief.products) || !brief.products.length) throw new Error('Brief requires at least one product.');
  if (!brief.primaryAction?.id || !brief.primaryAction?.label || !brief.primaryAction?.destination) throw new Error('Brief primaryAction is incomplete.');
  uniqueIds(brief.audiences, 'audience');
  uniqueIds(brief.products, 'product');
  uniqueIds([brief.primaryAction, ...(brief.secondaryActions || [])], 'action');
  uniqueIds(brief.proof || [], 'proof');
  const primary = brief.audiences.filter((item) => item.primary);
  if (primary.length > 1) throw new Error('Only one audience may be marked primary.');
  for (const audience of brief.audiences) {
    if (!audience.label || !audience.role || !Array.isArray(audience.needs) || !audience.needs.length) throw new Error(`Audience ${audience.id} is incomplete.`);
  }
  for (const product of brief.products) {
    if (!product.name || !product.summary || !Array.isArray(product.jobs) || !product.jobs.length) throw new Error(`Product ${product.id} is incomplete.`);
  }
  return true;
}

function page({ id, route, type, phase = 'launch-core', intent, audiences, promise, action, sections, claimIds = [] }) {
  return {
    id, route, type, phase, intent, audiences, promise,
    primaryActionId: action,
    secondaryActionIds: [],
    sections: sections.map((component) => ({ id: component, component, purpose: `Fulfill the ${component.replaceAll('-', ' ')} responsibility.`, claimIds: [] })),
    claimIds,
    owner: '[OWNER]',
    reviewTrigger: '[RELEASE, EVIDENCE, OR QUARTERLY REVIEW]'
  };
}

export function planWebsite(brief) {
  validateBrief(brief);
  const primaryAudience = brief.audiences.find((item) => item.primary) || brief.audiences[0];
  const primaryProduct = brief.products[0];
  const actionId = brief.primaryAction.id;
  const audienceIds = brief.audiences.map((item) => item.id);
  const pages = [
    page({ id: 'home', route: '/', type: 'home', intent: 'Frame the category, prove relevance, and route every priority journey.', audiences: audienceIds, promise: `${brief.site.category} for ${primaryAudience.label}.`, action: actionId, sections: pageTypes.home }),
    page({ id: 'product-overview', route: '/product', type: 'product-overview', intent: 'Explain the product system and its primary workflow.', audiences: audienceIds, promise: primaryProduct.summary, action: actionId, sections: pageTypes['product-overview'] }),
    ...brief.products.map((product) => page({ id: `product-${product.id}`, route: `/product/${product.id}`, type: 'product-detail', intent: `Explain how ${product.name} completes its target jobs.`, audiences: audienceIds, promise: product.summary, action: actionId, sections: pageTypes['product-detail'] })),
    ...brief.audiences.map((audience) => page({ id: `solution-${audience.id}`, route: `/solutions/${audience.id}`, type: 'solution', intent: `Resolve the needs and objections of ${audience.label}.`, audiences: [audience.id], promise: `A controlled path to ${audience.needs[0]}.`, action: actionId, sections: pageTypes.solution })),
    page({ id: 'trust', route: '/trust', type: 'trust', intent: 'Explain boundaries, controls, evidence access, and accountable use.', audiences: audienceIds, promise: 'Clear controls and evidence for responsible evaluation.', action: actionId, sections: pageTypes.trust }),
    page({ id: 'customers', route: '/customers', type: 'customers', intent: 'Present contextual, approved evidence without unsupported inference.', audiences: audienceIds, promise: 'Evidence with method, context, and constraints.', action: actionId, sections: pageTypes.customers }),
    page({ id: 'resources', route: '/resources', type: 'resources', intent: 'Help visitors learn by task and readiness.', audiences: audienceIds, promise: 'Focused guidance for evaluation and adoption.', action: actionId, sections: pageTypes.resources }),
    page({ id: 'documentation', route: '/docs', type: 'documentation', intent: 'Route implementers to quick starts, concepts, references, limits, and support.', audiences: audienceIds, promise: 'A predictable path from first step to production operation.', action: (brief.secondaryActions || [])[0]?.id || actionId, sections: pageTypes.documentation }),
    page({ id: 'company', route: '/company', type: 'company', intent: 'Establish mission, operating principles, and durable company context.', audiences: audienceIds, promise: 'The purpose and operating model behind the product.', action: actionId, sections: pageTypes.company }),
    page({ id: 'contact', route: '/contact', type: 'contact', intent: 'Collect only the information needed to route a qualified inquiry.', audiences: audienceIds, promise: 'A clear next step with response expectations.', action: actionId, sections: pageTypes.contact })
  ];
  const proof = brief.proof || [];
  return {
    schemaVersion: 1,
    site: brief.site,
    strategy: {
      narrative: brief.site.narrative || 'trusted-intelligence',
      primaryAudienceId: primaryAudience.id,
      primaryActionId: actionId,
      messageLadder: {
        category: brief.site.category,
        outcome: primaryAudience.needs[0],
        mechanism: primaryProduct.summary,
        proof: proof.length ? 'Use only approved proof records.' : '[PROOF REQUIRED]',
        control: 'Show review, boundaries, and recovery in the product flow.'
      }
    },
    audiences: brief.audiences,
    products: brief.products,
    actions: [brief.primaryAction, ...(brief.secondaryActions || [])],
    journeys: brief.audiences.map((audience) => ({
      id: `${audience.id}-evaluation`, audienceId: audience.id,
      trigger: audience.needs[0], question: `Can this system help ${audience.label.toLowerCase()} ${audience.needs[0]}?`,
      minimumProof: proof.map((item) => item.id), decision: `Evaluate fit for ${audience.role.toLowerCase()}.`,
      actionId, recovery: (brief.secondaryActions || [])[0]?.id || 'resources'
    })),
    pages,
    navigation: {
      primary: ['product-overview', ...brief.audiences.map((item) => `solution-${item.id}`), 'customers', 'resources', 'trust'],
      utility: ['documentation', 'company', 'contact'],
      footer: pages.filter((item) => item.route !== '/').map((item) => item.id)
    },
    proof,
    claims: proof.map((item) => ({ id: `claim-${item.id}`, text: item.summary, type: item.type, status: item.status, evidence: item.id, qualifier: item.qualifier || '', owner: item.owner || '[OWNER]', surfaces: [] })),
    analytics: {
      events: [
        { name: 'primary_action_selected', required: ['pageId', 'actionId'] },
        { name: 'product_demo_started', required: ['pageId', 'sectionId'] },
        { name: 'contact_form_submitted', required: ['pageId', 'actionId', 'state'] },
        { name: 'journey_recovered', required: ['pageId', 'actionId', 'state'] }
      ]
    },
    assumptions: (brief.assumptions || []).map((text, index) => ({ id: `assumption-${index + 1}`, text, owner: '[OWNER]', validation: '[VALIDATION METHOD]' })),
    constraints: brief.constraints || []
  };
}

export function validatePlan(plan) {
  if (plan.schemaVersion !== 1 || !plan.site || !plan.strategy) throw new Error('Invalid site plan header.');
  for (const key of ['audiences', 'products', 'actions', 'journeys', 'pages', 'claims']) {
    if (!Array.isArray(plan[key])) throw new Error(`Site plan ${key} must be an array.`);
  }
  uniqueIds(plan.pages, 'page');
  const routes = new Set();
  const actionIds = new Set(plan.actions.map((item) => item.id));
  const audienceIds = new Set(plan.audiences.map((item) => item.id));
  for (const item of plan.pages) {
    if (!item.route?.startsWith('/')) throw new Error(`Page ${item.id} route must start with /.`);
    if (routes.has(item.route)) throw new Error(`Duplicate page route: ${item.route}`);
    routes.add(item.route);
    if (!actionIds.has(item.primaryActionId)) throw new Error(`Page ${item.id} references unknown primary action.`);
    for (const audience of item.audiences) if (!audienceIds.has(audience)) throw new Error(`Page ${item.id} references unknown audience ${audience}.`);
    if (!Array.isArray(item.sections) || !item.sections.length) throw new Error(`Page ${item.id} has no sections.`);
  }
  return true;
}

function gradeFor(total) {
  return benchmark.grades.find((item) => total >= item.minimum);
}

export function scoreAudit(audit) {
  if (audit.schemaVersion !== 1 || !audit.siteName) throw new Error('Audit schemaVersion and siteName are required.');
  const categoryIds = new Set(benchmark.categories.map((item) => item.id));
  const blockerIds = new Set(benchmark.blockers.map((item) => item.id));
  for (const id of categoryIds) if (!audit.categories?.[id]) throw new Error(`Missing audit category: ${id}`);
  for (const id of Object.keys(audit.categories || {})) if (!categoryIds.has(id)) throw new Error(`Unknown audit category: ${id}`);
  for (const id of blockerIds) if (!audit.blockers?.[id]) throw new Error(`Missing blocker assessment: ${id}`);
  for (const id of Object.keys(audit.blockers || {})) if (!blockerIds.has(id)) throw new Error(`Unknown blocker: ${id}`);
  const categories = benchmark.categories.map((category) => {
    const input = audit.categories[category.id];
    if (typeof input.score !== 'number' || input.score < 0 || input.score > 5) throw new Error(`${category.id} score must be between 0 and 5.`);
    if (!Array.isArray(input.evidence)) throw new Error(`${category.id} evidence must be an array.`);
    if (input.score > 2 && input.evidence.length === 0) throw new Error(`${category.id} cannot score above 2 without evidence.`);
    const points = category.weight * input.score / 5;
    return { ...category, score: input.score, points: Number(points.toFixed(2)), evidence: input.evidence, notes: input.notes || '' };
  });
  const total = Math.round(categories.reduce((sum, item) => sum + item.points, 0));
  const blockers = benchmark.blockers.map((blocker) => ({ ...blocker, ...audit.blockers[blocker.id] }));
  const activeBlockers = blockers.filter((item) => item.present);
  const grade = gradeFor(total);
  const recommendations = categories
    .filter((item) => item.score < 5)
    .map((item) => ({ categoryId: item.id, priorityScore: Number((item.weight * (5 - item.score)).toFixed(2)), recommendation: `Raise ${item.label.toLowerCase()} from ${item.score} by resolving the documented evidence gaps.`, acceptance: `Re-score with observable evidence at 4 or higher.` }))
    .sort((a, b) => b.priorityScore - a.priorityScore || a.categoryId.localeCompare(b.categoryId));
  return {
    schemaVersion: 1, siteName: audit.siteName, reviewedAt: audit.reviewedAt || null,
    total, grade: grade.grade, band: grade.label, readiness: activeBlockers.length ? 'blocked' : (total >= 80 ? 'ready-with-follow-up' : 'not-ready'),
    categories, blockers, activeBlockerIds: activeBlockers.map((item) => item.id), recommendations
  };
}

export function ensureOutput(target, force, kind = 'directory') {
  const resolved = path.resolve(target);
  if (kind === 'directory') {
    const unsafe = new Set([path.parse(resolved).root, path.resolve(os.homedir()), path.resolve(process.cwd())]);
    const isWorkspaceAncestor = path.resolve(process.cwd()).startsWith(`${resolved}${path.sep}`);
    if (unsafe.has(resolved) || isWorkspaceAncestor) {
      throw new Error(`Refusing to use a filesystem, home, working, or workspace-ancestor directory as output: ${resolved}`);
    }
  }
  if (fs.existsSync(resolved)) {
    if (kind === 'directory') {
      const entries = fs.readdirSync(resolved);
      if (entries.length && !force) throw new Error(`Output directory is not empty: ${resolved}. Use --force to replace it.`);
      if (entries.length) fs.rmSync(resolved, { recursive: true, force: true });
    } else if (!force) throw new Error(`Output file exists: ${resolved}. Use --force to replace it.`);
  }
  if (kind === 'directory') fs.mkdirSync(resolved, { recursive: true });
  else fs.mkdirSync(path.dirname(resolved), { recursive: true });
  return resolved;
}

export function scaffoldSite(plan, output, force = false) {
  validatePlan(plan);
  const root = ensureOutput(output, force);
  const contentDir = path.join(root, 'content');
  const pagesDir = path.join(contentDir, 'pages');
  fs.mkdirSync(pagesDir, { recursive: true });
  writeJson(path.join(contentDir, 'site.json'), { schemaVersion: 1, site: plan.site, strategy: plan.strategy });
  writeJson(path.join(contentDir, 'actions.json'), { schemaVersion: 1, actions: plan.actions });
  writeJson(path.join(contentDir, 'navigation.json'), { schemaVersion: 1, navigation: plan.navigation });
  writeJson(path.join(contentDir, 'claims.json'), { schemaVersion: 1, claims: plan.claims, proof: plan.proof });
  writeJson(path.join(contentDir, 'analytics.json'), { schemaVersion: 1, analytics: plan.analytics });
  for (const item of plan.pages) {
    writeJson(path.join(pagesDir, `${item.id}.json`), {
      schemaVersion: 1, ...item,
      seo: { title: `[TITLE: ${item.id}]`, description: `[VISIBLE-PAGE SUMMARY: ${item.id}]` }
    });
  }
  const routes = Object.fromEntries(plan.pages.map((item) => [item.route, `content/pages/${item.id}.json`]));
  writeJson(path.join(root, 'routes.json'), { schemaVersion: 1, routes });
  writeJson(path.join(root, 'site-manifest.json'), {
    schemaVersion: 1,
    content: {
      site: 'content/site.json', actions: 'content/actions.json', navigation: 'content/navigation.json',
      claims: 'content/claims.json', analytics: 'content/analytics.json', pages: plan.pages.map((item) => `content/pages/${item.id}.json`)
    },
    routes: 'routes.json'
  });
  const bindingsDir = path.join(root, 'bindings');
  fs.mkdirSync(bindingsDir, { recursive: true });
  fs.writeFileSync(path.join(bindingsDir, 'site-content.mjs'), `import fs from 'node:fs';\nimport path from 'node:path';\nimport { fileURLToPath } from 'node:url';\nconst root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');\nexport function loadJson(relative) { return JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8')); }\nexport function loadManifest() { return loadJson('site-manifest.json'); }\nexport function loadRoutes() { return loadJson('routes.json').routes; }\nexport function loadPage(route) { const file = loadRoutes()[route]; if (!file) return null; return loadJson(file); }\n`, 'utf8');
  fs.writeFileSync(path.join(bindingsDir, 'site-content.d.ts'), `export type ClaimStatus = 'verified' | 'qualified' | 'illustrative' | 'planned' | 'prohibited';\nexport interface PageSection { id: string; component: string; purpose: string; claimIds: string[]; }\nexport interface PageContent { schemaVersion: 1; id: string; route: string; type: string; intent: string; audiences: string[]; primaryActionId: string; sections: PageSection[]; seo: { title: string; description: string }; }\nexport declare function loadManifest(): Record<string, unknown>;\nexport declare function loadRoutes(): Record<string, string>;\nexport declare function loadPage(route: string): PageContent | null;\n`, 'utf8');
  validateScaffold(root);
  return root;
}

export function validateScaffold(root) {
  const resolved = path.resolve(root);
  const manifestPath = path.join(resolved, 'site-manifest.json');
  if (!fs.existsSync(manifestPath)) throw new Error(`Missing site-manifest.json in ${resolved}.`);
  const manifest = readJson(manifestPath);
  if (manifest.schemaVersion !== 1 || !manifest.content || !manifest.routes) throw new Error('Invalid site manifest.');
  const referenced = [manifest.routes, ...Object.values(manifest.content).flat()];
  for (const relative of referenced) {
    const absolute = path.resolve(resolved, relative);
    if (!absolute.startsWith(resolved + path.sep)) throw new Error(`Manifest path escapes scaffold: ${relative}`);
    if (!fs.existsSync(absolute)) throw new Error(`Manifest references missing file: ${relative}`);
    if (absolute.endsWith('.json')) readJson(absolute);
  }
  const routes = readJson(path.join(resolved, manifest.routes)).routes;
  const pageIds = new Set();
  for (const [route, relative] of Object.entries(routes)) {
    if (!route.startsWith('/')) throw new Error(`Invalid route: ${route}`);
    const page = readJson(path.join(resolved, relative));
    if (page.route !== route) throw new Error(`Route mismatch for ${relative}.`);
    if (pageIds.has(page.id)) throw new Error(`Duplicate page id: ${page.id}`);
    pageIds.add(page.id);
  }
  return { valid: true, root: resolved, pages: pageIds.size, routes: Object.keys(routes).length };
}
