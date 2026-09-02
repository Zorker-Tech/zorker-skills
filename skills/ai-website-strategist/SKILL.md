---
name: ai-website-strategist
description: Plan, structure, write, score, scaffold, implement, or audit public enterprise AI websites and product portals. Use for positioning, information architecture, page systems, conversion journeys, product demonstrations, trust content, accessibility, SEO and answer-engine readiness, performance, analytics, structured content, or launch readiness. Do not use as the primary guide for authenticated application interfaces.
---

# AI Website Strategist

Build a decision system, not a collection of attractive pages. Every public
page must own an audience, question, proof burden, primary action, and next
step. Keep all claims traceable to approved evidence.

## Choose the operating mode

- **Plan**: turn a business brief into positioning, journeys, sitemap, page
  ownership, content model, measurement plan, and phased backlog.
- **Blueprint**: specify page-by-page section order, content responsibilities,
  interactions, states, proof, and responsive behavior.
- **Write**: create skimmable, evidence-aware copy and structured page content.
- **Score**: audit an existing plan or website against the weighted benchmark.
- **Scaffold**: produce route, navigation, page, claim, analytics, and component
  JSON that an implementation can bind to.
- **Implement**: translate approved blueprints into the user's existing stack.
  Inspect the repository and its local instructions before editing code.

## Core workflow

1. Normalize the brief. Record audience, buying motion, product maturity,
   desired actions, proof inventory, constraints, markets, and unknowns.
2. Choose one narrative spine and one primary action. Preserve secondary paths
   for evaluators, builders, users, and researchers without giving every path
   equal visual weight.
3. Model journeys before pages. For each journey define the triggering
   question, minimum proof, decision, action, and recovery path.
4. Assign page ownership. Do not create a route unless it answers a distinct
   question or serves a distinct intent better than an existing route.
5. Design the product demonstration early. Show input, system behavior, user
   control, output, and measurable value without implying unsupported behavior.
6. Build the claim register before polishing copy. Mark every consequential
   claim as verified, qualified, illustrative, planned, or prohibited.
7. Specify structured content and analytics with the page system. Treat JSON
   contracts and events as part of the design, not post-launch cleanup.
8. Score before launch. Resolve critical blockers regardless of the numeric
   total, then prioritize the lowest high-weight categories.

## Route to the right reference

- Read [strategy-and-positioning.md](references/strategy-and-positioning.md)
  for narrative, audiences, message hierarchy, evidence, and claims.
- Read [information-architecture.md](references/information-architecture.md)
  for sitemaps, journeys, navigation, URLs, and page responsibility.
- Read [page-blueprints.md](references/page-blueprints.md) for required page
  types, section patterns, demos, and reusable page modules.
- Read [content-and-conversion.md](references/content-and-conversion.md) for
  copy, calls to action, objections, proof, editorial systems, and localization.
- Read [design-and-ux.md](references/design-and-ux.md) for visual systems,
  responsive behavior, interaction, accessibility, and perceived performance.
- Read [seo-geo-technical.md](references/seo-geo-technical.md) for discovery,
  answer extraction, rendering, metadata, structured data, and crawl control.
- Read [scoring-benchmark.md](references/scoring-benchmark.md) for the weighted
  100-point audit and launch blockers.
- Read [json-contracts.md](references/json-contracts.md) before generating or
  binding structured content.
- Read [delivery-workflow.md](references/delivery-workflow.md) for sequencing,
  review gates, quality assurance, analytics, and operations.

## Deterministic toolkit

Use the bundled tool when the work is file-based:

```bash
node scripts/website-toolkit.mjs plan examples/brief.json --out build/plan
node scripts/website-toolkit.mjs score examples/audit.json --out build/report.json
node scripts/website-toolkit.mjs scaffold build/plan/site-plan.json --out build/site
node scripts/website-toolkit.mjs validate build/site
```

The schemas in `assets/schemas/` are the integration contract. The scripts
must reject invalid inputs, avoid overwriting non-empty output directories
without `--force`, and produce deterministic JSON.

## Non-negotiable rules

- Never invent metrics, customers, certifications, integrations, capabilities,
  availability, security controls, or legal assurances.
- Label prototypes, illustrative flows, planned features, and qualified claims.
- Put the shortest credible proof near the claim it supports.
- Keep one primary action per page; secondary actions must represent a real
  adjacent journey.
- Make critical content usable without animation, hover, or client-only state.
- Prefer semantic content and progressive enhancement over decorative density.
- Treat accessibility, performance, localization, analytics, privacy, and
  content operations as architecture requirements.
- Separate public marketing routes, developer learning routes, support routes,
  and authenticated product surfaces in both navigation and measurement.

## Required deliverables

For a complete planning engagement, return:

1. assumptions and unresolved decisions;
2. positioning and message hierarchy;
3. audience and journey matrix;
4. phased sitemap and navigation model;
5. page responsibility matrix and priority blueprints;
6. content, claim, proof, and demonstration plan;
7. design, component, interaction, and responsive rules;
8. SEO, answer-engine, performance, accessibility, and analytics requirements;
9. JSON content contracts and implementation handoff;
10. weighted score, blockers, prioritized fixes, and launch gates.
