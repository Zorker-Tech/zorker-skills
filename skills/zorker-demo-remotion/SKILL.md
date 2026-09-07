---
name: zorker-demo-remotion
description: Design and produce cinematic Remotion brand films, product introductions, functional demos, and tutorials. Use especially when users specify an existing application's source components for a video or need product-video storyboards. Complements Remotion implementation skills with directing and source-component reuse; not for ordinary UI development without a video deliverable.
---

# Zorker Demo Remotion

Connect product facts, real components, visual storytelling, and repeatable rendering. Cinematic quality comes from attention, space, rhythm, and sound-image relationships, not rotating and blurring every interface.

## Mandatory source-component requirement

When the user specifies importing or extracting pure components from an existing application's source for a Remotion animation, actually do it. Locate that source and prefer importing pure presentation components. Where runtime coupling exists, extract the presentation layer, styles, fonts, icons, and required dependencies, driven by explicit props. Do not substitute approximate redrawn UI, another component library, screenshots, recordings, generated images, or an iframe and present them as source extraction, whether for convenience, speed, or style.

If source is inaccessible, missing, has unclear licensing, or cannot be safely decoupled, report the specific blocker and request the source or explicit permission for an alternative. Continue independent scripting and storyboarding where useful, but do not claim extraction is complete. Attempt to resolve ordinary dependency coupling before treating it as a blocker. Do not change the source application's business logic without authorization. Read the [source-component protocol](references/source-components.md).

## Workflow and selective reading

1. **Define the brief.** Identify product, audience, primary action, format, duration/aspect ratio/fps, channel, language, assets, and specified source. Preserve explicit requirements. State assumptions for noncritical omissions; ask only about gaps affecting truthfulness, authorization, or delivery. When visual references are supplied, verify accessible assets and requirements; do not describe source inspection as watching a finished video.
2. **Choose the narrative.** Read [narratives and industries](references/narrative-and-industries.md). Choose one main structure and visual direction. Brand films communicate value, demos prove a task loop, and tutorials enable reproduction; do not reduce them all to feature-card carousels.
3. **Establish the real UI.** When source is specified, read the component protocol first and produce a provenance inventory and representative static states. Adapt the camera to the component rather than distorting the component for the shot.
4. **Storyboard.** Read [cinematography](references/cinematography.md). For each shot record time/frame range, narrative purpose, subject and state, framing/focus/path, entry and exit anchors, captions/voiceover/sound, evidence, and acceptance criteria. Select motivated techniques, not every technique in the library.
5. **Implement.** Read [production and verification](references/remotion-production.md). Reuse the existing Remotion entry point, pinned versions, and build. Check local types/dependencies for APIs and consult official documentation when needed. If relevant Remotion create/markup/render skills are available, load only the required parts; this skill does not replace version-specific implementation guidance.
6. **Verify and deliver.** Check static UI fidelity, arbitrary-frame determinism, transition boundaries, full playback, and final media. Deliver source files, storyboard, provenance records, verification results, and the requested output format. Explicitly disclose unrendered output or unreviewed audio. Do not publish, purchase assets, or call paid generation services without authorization.

## Examples and boundaries

- For a complete example, read the [30-second product demo](references/example-product-demo.md). It is a production specification, not a rendered video or bundled user source.
- For continuous transitions, glyph relays, or typing tracking, read [motion recipes](references/motion-recipes.md). Adapt them to actual component geometry, brand, and copy.

## Definition of done

Specified source is traceable and actually used on screen; editing does not fabricate product behavior; key states remain readable; transitions have a spatial basis; rendering is frame-determined; output matches the brief. Compilation does not prove visual quality, and still frames do not prove full-film pacing.
