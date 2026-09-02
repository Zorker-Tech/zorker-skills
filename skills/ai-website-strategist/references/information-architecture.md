# Information architecture

## Model journeys before routes

For each audience, write a journey record:

```text
trigger -> question -> minimum proof -> decision -> action -> recovery path
```

Common journeys include executive evaluation, practitioner discovery,
technical validation, security review, procurement, onboarding, and ongoing
learning. Do not force these journeys into one linear funnel.

## Use a four-layer portal model

1. **Narrative layer**: homepage, product overview, company point of view.
2. **Decision layer**: solutions, use cases, customer evidence, pricing or
   contact, security, governance, deployment.
3. **Learning layer**: documentation, guides, examples, evaluations, research,
   resources, support.
4. **Product layer**: sign-in, console, workspace, status, account management.

Keep the product layer visually related but operationally distinct. It has
different authentication, accessibility, telemetry, reliability, and support
requirements.

## Phase the sitemap

**Launch core** should normally include homepage, product overview, primary
solution or use-case pages, proof, trust, documentation entry, company/about,
contact or start path, legal, and utility pages.

**Growth** may add deep solution clusters, industry variants, comparison and
migration guidance, partner pages, integrations, pricing detail, customer
stories, research, events, and localization.

**Scale** may add interactive tools, templates, certification, community,
marketplace, regional hubs, programmatic directories, and personalized paths.

Every route needs a content owner and maintenance trigger before entering a
phase.

## Page responsibility matrix

Define the following for every page:

| Field | Question |
|---|---|
| intent | What exact user question does this route answer? |
| audience | Who needs the answer? |
| promise | What single value does the page establish? |
| proof | What evidence makes the promise credible? |
| primaryAction | What should happen next? |
| secondaryAction | Which adjacent journey deserves an escape hatch? |
| objections | Which doubts must be resolved here rather than elsewhere? |
| owner | Who keeps it accurate? |
| reviewTrigger | What event makes the content stale? |

Merge pages with materially identical responsibility. Split a page only when
intent, evidence, or action differs enough to justify a focused route.

## Navigation rules

- Use labels that predict destination content; avoid clever category names.
- Keep the primary navigation stable across public marketing pages.
- Put task-critical utility actions in consistent positions.
- Use a wide menu only when it improves scanning and grouping.
- Distinguish overview links from direct links to individual products or tasks.
- Make footer navigation a complete recovery map, not a duplicate header.
- Preserve keyboard order, focus visibility, escape behavior, and mobile parity.

## URL and hierarchy rules

- Prefer short, descriptive, lowercase, hyphenated paths.
- Encode durable user intent, not campaign language or org-chart ownership.
- Keep a canonical route for each concept.
- Maintain redirect maps when names or hierarchy change.
- Avoid deep nesting unless parent levels are genuine browse destinations.
- Keep locale and version conventions predictable.

## Content relationships

Model reusable entities: products, capabilities, audiences, jobs, solutions,
industries, proof items, claims, resources, people, events, integrations, and
calls to action. Bind pages to entities by stable identifiers so cards,
navigation, metadata, and related-content modules do not drift.
