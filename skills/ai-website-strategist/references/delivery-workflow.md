# Delivery workflow

## Phases and gates

### 1. Discovery

Inventory business goals, audiences, products, evidence, existing content,
technical constraints, markets, analytics, and operational owners.

Gate: primary audience, action, narrative, constraints, and assumptions are
explicit enough to make page decisions.

### 2. Architecture

Create journeys, phased sitemap, navigation, page responsibility matrix,
content entities, claim register, and measurement model.

Gate: every route has distinct intent, proof, action, owner, and phase.

### 3. Blueprint and content

Design priority pages at section level. Draft demonstration storyboards,
content, metadata, responsive behavior, states, and structured records.

Gate: claims are approved or visibly qualified; critical flows have complete
states and evidence.

### 4. Design system and prototype

Define tokens, primitives, modules, interaction rules, responsive behavior,
motion, and accessibility. Test representative high-risk flows and content
pressure.

Gate: component contracts cover real content, narrow screens, keyboard use,
reduced motion, errors, and loading.

### 5. Implementation

Build validated content bindings, routes, rendering, forms, search, analytics,
metadata, structured relationships, performance budgets, and observability.

Gate: automated checks and manual journey tests pass in a production-like
environment.

### 6. Launch and operation

Run content, legal, accessibility, performance, security, analytics, redirect,
indexing, and rollback checks. Assign dashboards, alerting, ownership, review
cadence, and experiment governance.

Gate: no critical blockers; launch decision, exceptions, and rollback trigger
are documented.

## Analytics contract

Track decisions and outcomes, not every click. A useful event record includes:

| Field | Purpose |
|---|---|
| name | stable verb-object identifier |
| pageId | page responsibility context |
| sectionId | component context |
| actionId | destination and intent |
| audiencePath | selected role or journey when known without sensitive data |
| state | success, failure, validation, abandonment, or recovery |
| experiment | approved experiment and variant identifiers |

Prohibit personal or sensitive data in event properties. Define success,
deduplication, retention, consent behavior, and quality monitoring.

## Quality matrix

Test across content, function, accessibility, responsiveness, performance,
discovery, analytics, privacy, security, and operations. Include:

- every header, footer, search, filter, form, and primary action;
- empty, loading, error, offline, timeout, and success states;
- keyboard-only, zoom, large text, reduced motion, and media alternatives;
- narrow, medium, wide, touch, constrained network, and low-power conditions;
- metadata, canonicals, redirects, language behavior, structured relationships;
- event names, required properties, consent, failure capture, and dashboards;
- stale claims, expired resources, owner changes, and review notifications.

## Release runbook

1. Freeze or version approved content and claim records.
2. Validate schemas, references, routes, links, redirects, and assets.
3. Run automated tests and manual priority journeys.
4. Capture performance and accessibility baselines.
5. Verify production configuration, privacy, forms, analytics, and monitoring.
6. Record known exceptions, owners, deadlines, and rollback criteria.
7. Release progressively when risk warrants it.
8. Confirm primary actions and error telemetry immediately after release.
9. Review discovery, conversion, support, and performance signals.
10. Retire obsolete content and feed findings into the next planning cycle.
