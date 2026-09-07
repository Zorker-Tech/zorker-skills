# Specified Source to Pure Presentation Components

## Provenance

Read source-repository instructions, working-tree status, package configuration, and existing component catalogs, Storybook stories, or fixtures. Find real components, states, and tokens through existing catalogs before following imports. Do not carry unrelated credentials.

For each component record the user-specified repository, actual relative path, exported symbol, available commit (identify dirty files separately), destination file/shot, direct import or extraction method, retained structure and style assets, adaptations and reasons, code/font/image licensing or unresolved rights, and representative same-viewport comparisons.

Names such as Native or Official, and visual similarity alone, do not prove provenance. Trace files and import chains.

## Decoupling order

1. Already pure presentation: import directly and supply the original theme and fonts.
2. Context only: create the smallest read-only provider with deterministic fixtures; do not boot the entire application.
3. Mixed service logic: extract the presentation subtree into the video workspace, retain JSX/SVG and styles, remove service hooks, and expose their outputs as props. Refactor the original application only with authorization.
4. Non-React source: explain runtime boundaries, port the actual presentation structure, assets, and layout into a compatible layer, and retain a mapping. Do not call this a direct import. If a port cannot satisfy the request, ask the user to choose.

Pure components receive presentation data/state and produce visuals. They must not depend on real authentication, database writes, networking, WebSockets, Electron IPC, the current clock, random values, or real clicks. The outer Remotion adapter constructs props from the frame; callbacks are inert and do not send messages, pay, or delete. Replace self-running CSS animations with frame-driven styles in the adapter without changing business layout.

For example, expose an account hook's output as accountLabel and a send hook's state as status/messages. Preserve actual loading, disabled, error, and result visuals; do not delete difficult states. Label synthetic fixtures as demonstration data. Do not present compressed waiting time as measured performance.

## Static before animated

Compare typography, weight, wrapping, spacing, radii, borders, shadows, icon paths, states, and clipping at the same viewport, theme, and state. Record permitted differences such as privacy substitutions, aspect-ratio adaptation, and external annotations before adding camera motion.

If the user both requires extraction and says to sketch something quickly, clarify whether a temporary concept is acceptable; do not silently interpret this as withdrawing the source requirement. Explicitly approved alternatives apply only within the agreed scope and remain labeled as not satisfying final source acceptance.
