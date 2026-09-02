# Design and user experience

## Visual direction

Express confidence through hierarchy, restraint, and visible product behavior.
A mature enterprise AI site should feel precise enough for evaluators and alive
enough for practitioners. Avoid decorative complexity that competes with the
product story.

Choose one primary visual language:

- product surfaces and real workflow states;
- structured editorial typography and explanatory diagrams;
- modular system maps and capability relationships;
- outcome-led photography or illustration with clear context.

Mix languages only when each has a defined role.

## Token system

Define semantic tokens for color, typography, spacing, size, radius, border,
shadow, motion, layer, and content width. Include states for default, hover,
focus, active, selected, disabled, loading, success, warning, and error.

Use tokens to guarantee:

- readable contrast in every theme;
- predictable hierarchy across marketing, documentation, and trust content;
- density variants for editorial, data-heavy, and interactive modules;
- consistent reduced-motion and high-contrast behavior.

## Component inventory

Start with primitives, then compose page modules:

- header, wide menu, mobile navigation, breadcrumb, footer;
- button, text link, input, select, checkbox, radio, disclosure, dialog;
- hero, proof strip, capability grid, workflow steps, comparison table;
- demo frame, code block, terminal, output preview, diagram, metric card;
- quote, customer result, trust summary, resource card, related-content rail;
- alert, empty state, error state, loading state, pagination, filter, search.

Each component needs content constraints, responsive rules, states, keyboard
behavior, analytics contract, and accessibility notes.

## Responsive behavior

Specify behavior by content pressure rather than device labels. Test narrow,
medium, wide, zoomed, large-text, and touch conditions. Decide what reflows,
stacks, scrolls, collapses, truncates, or becomes a different component.

Never hide decision-critical content on smaller screens. Tables need an
accessible narrow-screen strategy. Demonstrations need a static or stepwise
alternative when the full interaction does not fit.

## Motion

Use motion to explain sequence, causality, state change, or spatial continuity.
Do not require motion to access content. Keep durations consistent, avoid
auto-running distraction, provide pause controls when needed, and honor reduced
motion preferences without losing meaning.

## Accessibility baseline

- semantic landmarks and logical heading order;
- keyboard access and visible focus for every interaction;
- accessible names, descriptions, errors, status announcements, and labels;
- sufficient contrast and non-color indicators;
- reflow at high zoom and support for large text;
- captions, transcripts, alternatives, and pause controls for media;
- target sizes and spacing suitable for touch and motor variation;
- no unexpected focus changes or keyboard traps.

Test real journeys with a keyboard and assistive technology, not only automated
rules.

## Perceived performance

Reserve space for media, load the primary message and action first, prefer
stable skeletons over layout shifts, and delay nonessential widgets. A useful
static demo is better than a slow interactive demo. Measure route transitions,
filters, search, forms, and embedded media as well as the initial page load.
