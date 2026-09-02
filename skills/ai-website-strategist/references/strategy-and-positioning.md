# Strategy and positioning

## Normalize the brief

Do not begin with a sitemap. Establish the decision context first:

| Field | Required decision |
|---|---|
| Business stage | category creation, category entry, expansion, or consolidation |
| Product maturity | concept, limited release, generally available, or platform |
| Primary audience | one role with budget, urgency, or daily use |
| Secondary audiences | evaluators, implementers, users, partners, researchers |
| Buying motion | self-serve, sales-assisted, enterprise-led, or hybrid |
| Primary action | start, try, contact, request access, or read documentation |
| Proof inventory | product evidence, customer evidence, technical evidence, governance evidence |
| Constraints | legal, security, localization, accessibility, staffing, launch date |

Turn unknowns into explicit assumptions. Attach an owner and validation method
to high-impact assumptions.

## Choose a narrative spine

Use one dominant narrative and borrow supporting traits sparingly:

- **Platform transformation**: lead with the future operating model, then show
  the product family and enterprise adoption path.
- **Trusted intelligence**: lead with the important problem, explain the
  approach, then foreground reliability, control, and responsible use.
- **Product-led experience**: lead with a visible interaction, fast time to
  value, examples, and a low-friction first action.
- **Autonomous workflow**: lead with delegated work, observable progress,
  checkpoints, completion criteria, and human control.

Avoid an identity collage. If the homepage cannot be summarized in one
sentence containing audience, problem, mechanism, and value, the narrative is
not yet coherent.

## Build the message hierarchy

1. **Category** — what kind of solution is this?
2. **Outcome** — what becomes faster, safer, cheaper, or newly possible?
3. **Mechanism** — what distinctive system behavior creates that outcome?
4. **Proof** — what verifiable evidence reduces doubt?
5. **Control** — what can the user inspect, constrain, approve, or recover?
6. **Action** — what is the lowest-friction credible next step?

Write one sentence for each layer before writing headlines. Each page should
inherit the hierarchy but emphasize only the layers needed for its intent.

## Segment by job and risk

Industry labels are useful only when they change proof, workflow, terminology,
or constraints. Prefer jobs such as investigate, create, automate, decide,
serve, or integrate. Cross jobs with risk level:

- low risk: speed and ease can lead;
- medium risk: show review, traceability, and recovery;
- high risk: lead with boundaries, governance, evidence, and accountable use.

## Evidence hierarchy

Prefer evidence in this order:

1. reproducible product behavior;
2. approved customer outcome with method and context;
3. transparent technical explanation or evaluation;
4. approved operational or governance documentation;
5. clearly labeled illustration;
6. unsupported assertion.

The last item must never ship as fact. Social proof without context is weaker
than a small, reproducible demonstration.

## Claim register

Track every consequential statement:

| Field | Meaning |
|---|---|
| id | stable identifier referenced by page JSON |
| text | proposed statement |
| type | capability, outcome, comparative, security, compliance, customer, availability |
| status | verified, qualified, illustrative, planned, prohibited |
| evidence | internal evidence identifier, never a fabricated citation |
| qualifier | condition, boundary, sample size, geography, or plan |
| owner | person accountable for approval |
| reviewAt | date or release that triggers review |
| surfaces | pages, cards, metadata, and campaigns using the claim |

If evidence changes, update the claim record first and let every bound surface
inherit the change.
