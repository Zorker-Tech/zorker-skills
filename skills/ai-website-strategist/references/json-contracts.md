# JSON contracts and binding

## Principles

Treat structured content as a public interface between strategy, content,
design, engineering, analytics, and operations.

- Use stable lowercase-hyphen identifiers.
- Separate reusable entities from page composition.
- Reference claims, actions, proof, and components by identifier.
- Reject unknown fields in governed records.
- Version contracts and migrate data deliberately.
- Keep route data deterministic and serializable.
- Never embed credentials, private evidence, or unpublished customer data.

## Brief contract

The brief captures company context, audiences, products, outcomes, actions,
proof inventory, constraints, locales, and desired launch phase. It is input to
planning, not published content. Unknown material decisions belong in
`assumptions` rather than invented values.

## Site plan contract

A generated site plan includes:

- `strategy`: narrative, audience priority, primary action, and message ladder;
- `journeys`: trigger, question, proof need, decision, action, and recovery;
- `pages`: stable id, route, type, phase, intent, audience, promise, actions,
  sections, claim references, owner, and review trigger;
- `navigation`: groups and page references;
- `claims`: status-aware claim records;
- `analytics`: events tied to decisions and actions;
- `assumptions`: unresolved decisions with validation tasks.

## Page contract

Page JSON should describe content and intent, not framework-specific markup:

```json
{
  "id": "product-overview",
  "route": "/product",
  "type": "product-overview",
  "intent": "Explain how the product system solves the primary job.",
  "audiences": ["operations-leader"],
  "seo": {
    "title": "[Descriptive page title]",
    "description": "[Accurate visible-page summary]"
  },
  "primaryActionId": "request-consultation",
  "sections": [
    {
      "id": "hero",
      "component": "hero",
      "purpose": "Establish category, outcome, and action.",
      "content": {
        "eyebrow": "[Category]",
        "title": "[Outcome-led title]",
        "summary": "[Mechanism and audience]"
      },
      "claimIds": []
    }
  ]
}
```

Placeholders are explicit and cannot be mistaken for approved copy.

## Route and component binding

1. Resolve the request route against `routes.json`.
2. Load the referenced page record.
3. Validate it against the page schema during build and preview.
4. Resolve action, claim, proof, and entity references from central registries.
5. Map each section's `component` to an allowlisted implementation.
6. Render a visible fallback for unknown or unavailable interactive modules.
7. Attach analytics from stable page, section, and action identifiers.

Never evaluate component names as code or accept arbitrary template paths from
content. The renderer owns the allowlist.

## Claims and approval

Render `verified` and properly `qualified` claims. Render `illustrative` claims
only with a visible label. Keep `planned` claims out of generally available
product copy unless the page is explicitly a roadmap. Never render `prohibited`
claims. Builds should fail when a section references a missing claim.

## Schema evolution

Increment the contract version when semantics change. For additive optional
fields, update schemas, examples, scaffolders, renderers, and tests together.
For breaking changes, provide a migration, preserve old content until converted,
and verify route, metadata, analytics, and claim references after migration.
