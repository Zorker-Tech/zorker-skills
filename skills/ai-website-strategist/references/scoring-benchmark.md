# Website scoring benchmark

## Method

Score every criterion from 0 to 5 using observable evidence:

| Score | Meaning |
|---:|---|
| 0 | absent, broken, or contradicted |
| 1 | mentioned but unusable or unsupported |
| 2 | partial, inconsistent, or high-friction |
| 3 | functional baseline with material gaps |
| 4 | strong, consistent, measured, and well supported |
| 5 | exemplary, differentiated, maintained, and validated |

Category points equal `category weight × category score ÷ 5`. Round only the
final total. Evidence should include a route, artifact, observation, or test;
unverified impressions cannot earn more than 2.

## Weighted categories

| Category | Weight | What to inspect |
|---|---:|---|
| Strategy and positioning | 12 | audience clarity, category, outcome, mechanism, differentiation, message coherence |
| Information architecture | 12 | journeys, page responsibility, navigation, findability, URL durability, recovery paths |
| Content and messaging | 12 | directness, specificity, hierarchy, objection coverage, freshness, localization readiness |
| Conversion journeys | 10 | action clarity, readiness alignment, expectation setting, form quality, recovery, measurement |
| Product demonstration | 10 | input, behavior, control, output, value, truthfulness, static fallback |
| Proof and trust | 10 | claim traceability, customer evidence, limitations, governance, deployment, support |
| UI, UX, and accessibility | 10 | hierarchy, consistency, responsive behavior, keyboard use, contrast, media alternatives |
| Discovery and answer readiness | 10 | intent mapping, rendering, metadata, canonical logic, extractability, structured relationships |
| Performance and engineering | 8 | budgets, loading stability, resilience, security hygiene, observability, release controls |
| Analytics and operations | 6 | event contracts, journey measurement, ownership, review triggers, experimentation discipline |

Total weight: 100.

## Grade bands

- **90–100, A**: launch-ready system; optimize with controlled experiments.
- **80–89, B**: strong; resolve a limited set of meaningful gaps.
- **70–79, C**: viable; important proof, journey, or operational gaps remain.
- **60–69, D**: material launch risk; prioritize structural fixes.
- **Below 60, F**: rebuild the highest-weight foundations before promotion.

The grade never overrides a critical blocker.

## Critical blockers

Any confirmed blocker makes readiness `blocked` until resolved:

- fabricated or unapproved consequential claims;
- broken primary action, contact flow, sign-up, or critical navigation;
- inaccessible primary journey or keyboard trap;
- private data, credentials, or personal information exposed publicly;
- core public content unintentionally unavailable to rendering or indexing;
- security, privacy, compliance, or availability statements that exceed evidence;
- no recovery path for a failed high-value form or transaction;
- destructive or misleading interaction without clear consent and reversal.

## Recommendation priority

Calculate impact as `category weight × gap × confidence`, where gap is
`5 - score` and confidence is high, medium, or low. Fix blockers first, then
high-weight problems shared across templates, then page-specific conversion
issues, and finally polish. Every recommendation needs an owner, acceptance
criterion, dependency, and verification method.
