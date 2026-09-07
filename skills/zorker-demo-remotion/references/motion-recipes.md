# Reusable Motion Recipes

These are composable directing patterns, not fixed project templates. Choose duration, magnification, color, and coordinates for the current product and audience.

## Shape portal to real interface

Useful for product introductions and brand-film openings. Connect a line, circle, or negative space in the brand mark to a real component's border, caret, or progress ring with a meaningful relationship.

1. Measure target geometry in both scenes and convert it to a shared screen coordinate system.
2. Push toward the shared anchor in the first scene. For large ratios, logarithmic interpolation can prevent an almost motionless start and an abrupt final surge.
3. Hand over to the next layer where outline, position, and size align most closely. A short dissolve or occlusion cut refines the match rather than replacing it.
4. Pull back to a useful framing so viewers recognize the real product and next action; settle while body text is read.
5. Check position, scale, velocity, and exposure across the seam. If a bitmap cannot support the magnification, use a suitable authorized asset or change the framing.

Without a suitable shape, use action matching or a direct cut instead of forcing a logo portal.

## Glyph relay to new meaning

Useful for short titles, state changes, and launches. Define initial, optional intermediate, and final meanings. Map outline, baseline, and horizontal position by glyph slot, relaying out different lengths. Stagger glyphs into waves, but hold the final title long enough to read as a whole.

Show intermediate text only when meaningful and allow reading time. Avoid random garbage-character reels. Check mixed scripts, missing glyphs, and weight changes separately. Masks or compressed projections can suggest a flip without requiring true 3D.

## Typing front to smooth tracking

Useful for forms, search, terminals, editors, and AI-tool demos.

- Derive the caret position from the actual font, spacing, and container width; handle Chinese and emoji as graphemes.
- Drive typing state and camera target from a deterministic time curve; let the camera settle naturally during pauses.
- Preserve context with a safe window/dead zone. Use fixed historical samples or analytical smoothing, not dependence on previously played frames.
- Handle line starts and vertical motion together when wrapping. Short copy does not require unnecessary camera movement.
- Keep the submit button visible and enabled before submission and allow reading time after typing. Result feedback must not depend on real external writes.

## Local result to system value

Useful for analytics, industrial panels, collaboration, and logistics. Prove one result in close-up, then pull back to establish its place in the system. Reveal background layers by information hierarchy, not arbitrary floating motion. Retain evidence and demonstration labels for important numbers, charts, and terminology; do not rush past them to avoid scrutiny.

## Low-motion tutorial variant

Remove unnecessary brand transitions. Establish the entry point with a stable wide shot and push modestly only toward the operation area. Settle each step as action -> feedback -> checkpoint. Captions and pointers must not obscure buttons. Hold success states long enough and demonstrate recovery paths when needed. End with reproducible outcomes rather than a mandatory marketing CTA.
