# Discovery, answer extraction, and technical delivery

## Search intent architecture

Map one primary intent and a small set of supporting questions to each route.
Avoid multiple pages competing for the same question. Build topic clusters from
canonical overviews, focused task pages, evidence, examples, definitions, and
related learning.

Metadata must accurately summarize the visible page. Headings should express a
logical answer hierarchy. Internal links should use descriptive language and
connect the user to the next question, not merely distribute authority.

## Answer-engine readiness

Make important claims easy to extract and verify:

- provide a direct answer before elaboration;
- define entities and terms consistently;
- keep claim, evidence, qualifier, and date close together;
- use descriptive headings, concise summaries, lists, and comparison tables;
- show authorship or ownership and freshness where relevant;
- separate facts, interpretation, examples, and planned behavior;
- expose meaningful content in rendered markup rather than hidden interaction;
- maintain canonical pages for products, concepts, policies, and evaluations.

Do not create machine-facing assertions that are absent from human-visible
content.

## Rendering and crawlability

Deliver primary public content and links in initial or reliably rendered
markup. Use client-side behavior for enhancement. Every indexable route needs a
stable status code, canonical decision, title, description, language signal,
and inclusion decision. Keep sitemap generation and crawler directives aligned
with release state.

Exclude authenticated, duplicated, internal-search, preview, test, filtered,
and parameter-generated surfaces unless they intentionally serve distinct
public intent. Protect private data with access controls, never crawler rules.

## Structured data

Represent only entities and relationships visible on the page. Select types
that match the actual content, keep identifiers stable, validate required
properties, and update markup when visible content changes. Never mark up
invented ratings, questions, events, prices, or organizational relationships.

## Performance budgets

Set budgets before implementation for document weight, script, style, fonts,
images, media, third-party execution, main-thread work, and layout movement.
Measure representative pages and interactions on constrained networks and
devices. Give the homepage, documentation, search, forms, and interactive demos
separate budgets because their risk profiles differ.

Prefer server rendering or static generation for stable public content. Cache
immutable assets aggressively, compress and resize media, subset fonts, split
noncritical code, and isolate third-party scripts behind purpose and consent.

## Technical hygiene

- deterministic URLs, redirects, canonicals, and language alternates;
- useful not-found and server-error responses;
- accessible validation and success states for forms;
- secure headers, dependency hygiene, secret isolation, and input handling;
- privacy-aware analytics and consent behavior;
- preview, staging, and production environment separation;
- content validation and broken-link checks in delivery automation;
- observability for errors, latency, conversion failures, and stale content.

## Agent-friendly content

Provide stable page structure, descriptive anchors, plain-text equivalents for
critical visual explanations, and explicit version or freshness information.
If publishing optional machine-readable summaries, generate them from the same
approved source as visible pages and never use them to bypass access or content
governance.
