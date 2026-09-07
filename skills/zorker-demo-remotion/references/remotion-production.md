# Deterministic Production and Verification

Reuse existing lockfiles, compositions, fonts, and build commands; do not upgrade arbitrarily. Verify APIs and CLI options through local types/help and consult official Remotion documentation when needed.

Possible layers are source-ui (real components), fixtures (sanitized states), shots (state and camera), camera (geometry/curves), and composition (sequencing/audio/output). Do not force a small project into an unnecessary refactor.

Every visual is a function of frame, fps, props, and fixed assets. Do not drive animation with setTimeout, requestAnimationFrame, networking, Date.now, unseeded randomness, or accumulated cross-frame state. Renderers may request frames out of order.

Represent interaction with explicit idle -> typing -> submitted -> loading -> result/error states matching actual product behavior. Label demonstration data; do not claim real remote completion. Click only once controls are visible and enabled, preserving action-feedback causality.

## Time and assets

Author in seconds or one design fps: `outputFrame=round(seconds*fps)`; `designFrame=outputFrame*designFps/outputFps`. When fps doubles, update duration in frames. Use half-open intervals `[from,to)`; the final frame is durationInFrames-1. Convert between local/global time once and do not double-count transition overlaps.

Measure text after fonts are ready, using the same weight and spacing as rendering. Segment typing by grapheme to support Chinese and emoji. Track multiline text by caret geometry, not a fixed character ratio. Recheck overflow after changing copy, aspect ratio, or theme.

Preserve source SVGs. Check bitmap quality at enlarged scales; request higher-resolution assets or alter the shot when necessary. Record font, image, brand, and audio licensing. Distributed projects must not depend on the developer machine's absolute asset paths.

## Verification sequence

1. Run existing project type checks/tests; if none exist, say so rather than inventing a pass.
2. Sample the initial state, main actions, result, and ending. At each seam inspect seam-1, seam, and seam+1, plus midpoints where needed.
3. Re-render the same frames out of order in the same environment and compare, excluding playback-history dependencies.
4. Actually inspect frames for typography, focus, overlap, clipping, source-component fidelity, and distortion. If image inspection is unavailable, disclose that visual QA is incomplete.
5. Test complex effects in short segments before full rendering. Watch the whole film for rhythm and holds; listen to any audio for masked speech, clipping, truncated tails, and synchronization.
6. Read final media metadata to verify dimensions, fps, duration, codec, and audio tracks. File existence is not specification compliance; avoid unintended black ending frames.

On render failure, deliver the specific error and verified scope. Do not substitute screenshots for a video or retry identical failures indefinitely. Ask before additional spending, external publication, or broader system operations.

Deliver the actual composition ID, working commands, file paths, provenance inventory, and unresolved items. Distinguish design specification, implementation, type checking, sampled-frame inspection, and full-playback verification.
