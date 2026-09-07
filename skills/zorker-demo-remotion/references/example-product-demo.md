# Worked Example: A 30-Second Collaboration Demo

This is a production specification, not a rendered video or bundled application components. Zorker Workspace is a fictional example name and the task data is illustrative. Replace both with the user's product and verified capabilities.

## Example request

> Use $zorker-demo-remotion to make a 30-second, 1920x1080, 60fps enterprise collaboration demo. Import or extract the actual composer, task-card, and result-panel presentation components from the application repository I provide. Use a continuous logo-to-composer transition and typing tracking with our brand. Show task input -> execution feedback -> results, labeling demonstration data.

Obtain the real repository path and locate actual exports first. Composer, TaskCard, and ResultPanel are roles, not claims that those symbols exist. Verify the product supports the complete loop; otherwise revise the script instead of inventing capabilities.

Use one task journey, original brand tokens, stable UI, and precise pushes/pullbacks. The recurring motif is caret -> progress -> result indicator. Focused push/pull, tracking, and a result reveal are enough; do not add unrelated orbits.

## Storyboard: 1,800 frames, half-open intervals

| Time / frames | Content and state | Camera and transition | Captions, sound, and acceptance |
| --- | --- | --- | --- |
| 0-3s / [0,180) | Brand and one task goal | Gently push in a wide shot, retaining mark negative space | "Turn a request into a deliverable." The promise must match capability |
| 3-6s / [180,360) | Mark portal -> actual composer, idle | Enter negative space, match the real composer edge, then pull back | Brief transition sound and demo label; check anchor/velocity, no redrawn replacement |
| 6-12s / [360,720) | Type "Summarize this week's customer feedback into action items" | Follow the measured text front, then hold | Optional soft typing sounds; preserve graphemes and keep the button in the safe window |
| 12-17s / [720,1020) | Submit -> pending -> execution feedback | Hold before clicking; keep feedback in a medium shot | "See each step and its progress." Label compressed waiting |
| 17-24s / [1020,1440) | Completed -> results and task cards | Show a result close-up, then reveal the whole context | "Keep the result in the same workspace." Allow at least one item to be read |
| 24-28s / [1440,1680) | Stable result and next-action entry | Locked shot with external annotations, not altered source UI | "Review the result. Take the next step." No fabricated performance claims |
| 28-30s / [1680,1800) | Brand and actual CTA | Match cut from the result anchor to the brand motif | User-selected CTA; no unintended black ending |

Transitions occupy the specified time; layers may overlap, but total duration remains 1,800 frames. If voiceover does not fit, shorten the copy or confirm a longer duration rather than automatically speeding it up.

## Adapter sketch, not an existing product API

```ts
type DemoState = {
  phase: 'idle' | 'typing' | 'pending' | 'result';
  visiblePrompt: string;
  progressLabel: string;
  resultItems: readonly {id: string; title: string}[];
};
type CameraPose = {focusX: number; focusY: number; scale: number};
// stateAt(frame, fps, fixture) -> DemoState
// cameraAt(frame, fps, measuredAnchors) -> CameraPose
// SourceAdapter maps to actual component props; CameraRig transforms only the outer layer.
```

Begin typing at frame 360 and finish before 660, reserving 60 frames for reading and submission preparation. Show submission feedback at 720 and results at 1020. Adapt these events to real behavior rather than inventing execution feedback. Measure the text front with the actual font; do not use a fixed tracking distance unrelated to layout.

The provenance inventory needs at least three entries: composer, task card, and result panel, each with actual source path/revision, reuse method, assets, and representative state comparisons. Mark missing paths as awaiting access, not complete.

## Verification and delivery

Sample frames 0, 179, 180, 359, 360, 660, 719, 720, 1019, 1020, 1439, 1440, 1679, 1680, and 1799. Add seam±1 at actual transitions, plus longest-copy and fastest-tracking cases. Re-render out of order to check determinism. Watch the full film for first-view comprehension, truthful steps, readable results, and synchronized audio. Verify 1920x1080, 60fps, approximately 30 seconds, and the requested audio tracks. Deliver the source inventory, storyboard, project, video, and verified scope.

## Adaptations and pressure cases

- 45-second tutorial: shorten the brand opening, add prerequisites/entry points, hold each step/checkpoint, and end with success criteria and troubleshooting.
- 20-second industrial introduction: retain the real control panel; use documented part details for the opening and real operating-condition feedback, not invented internal structure.
- 15-second commerce film: use the real product-page component and authorized product assets; show option selection without placing an unauthorized order.
- Healthcare/finance: use synthetic identities/data, remove unsupported efficacy/return promises, and retain risk notices and result-reading time.
- Source inaccessible with ten minutes remaining: continue script/storyboard/camera math, identify the missing path, and request access. Do not draw approximate UI and claim completion. Only make a clearly labeled temporary concept after explicit approval; final source-based delivery remains outstanding.
