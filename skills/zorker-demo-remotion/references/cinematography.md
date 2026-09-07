# Cinematography, Camera Movement, and Editing

Before choosing motion, write what change the viewer should notice now. Usually give each shot one attention target and keep reading phases stable. This is a selection toolkit, not a checklist to exhaust.

| Technique | Narrative purpose | Implementation and limits |
| --- | --- | --- |
| Locked-off shot / hero hold | Tutorial results, metrics, end cards | Keep the subject stable; important results must not flash past |
| Dolly-in | Move from context into a crucial detail | Use a 2D focus-based scale or real 3D translation; do not call scaling true perspective movement |
| Dolly-out / reveal | Expand a local outcome into broader value | Restore context while keeping key information readable |
| Truck / pedestal | Follow a process or production line | Translate while maintaining distance; distinguish UI scrolling from camera motion |
| Pan / tilt | Scan a scene or equipment structure | Rotate the viewing axis in 3D or simulate through 2D cropping; preserve reading time |
| Tracking | Follow a cursor, typing front, or shipment | Smooth focus with a safe window; avoid per-character jumps |
| Arc / orbit | Show hardware volume or spatial relationships | Use real models or restrained 2.5D angles; do not invent unseen sides |
| Crane / jib | Reveal team, site, or system scale | Rise and retreat while preserving spatial hierarchy |
| Aerial / bird's-eye | Maps, energy, logistics, real estate | Move between region and node; verify geography/assets and avoid ground intersections |
| Macro insert | Craftsmanship, button feedback, numbers | Preserve contextual continuity and avoid enlarged bitmap artifacts |
| Rack focus | Redirect attention from problem to answer | Hand off sharpness between layers; do not blur essential tutorial steps |
| 2.5D parallax | Add depth to flat assets | Move foreground, middle, and background differently with consistent occlusion and lighting |
| Dolly zoom | Emphasize a change in perception or scale | Combine real camera translation with opposing field-of-view change; scale alone is not equivalent; use sparingly in tutorials |
| Whip pan | Connect scenes rapidly | Cut near peak same-direction motion and settle; do not hide every seam with blur |
| Crash zoom | Promotions, games, exceptional events | Push quickly and stop clearly; use cautiously in serious enterprise explanations |
| Roll / Dutch angle | Tension, imbalance, experimental tone | Motivate the tilt; do not routinely distort the product |
| Handheld | Human-centered, on-location documentary tone | Use real footage or seeded low-amplitude motion; avoid continuous shaking over text |
| POV / over-the-shoulder | Place viewers in the operator's position | Connect user perspective to action inserts without obscuring steps or fabricating endorsements |
| Exploded view / cutaway | Explain industrial mechanisms or system structure | Separate layers while retaining connections, then restore; do not invent undocumented internals |
| Frozen orbit / bullet time | Sports, games, hardware hero shots | Requires multiview assets or real 3D; a single image does not establish unseen structure |

## Transitions and editing grammar

- **Match cut:** Match shape, position, or action, such as a circular opening to a progress ring. Align screen anchor, size, direction, and velocity, with a meaningful connection.
- **Logo portal:** Enter a mark's negative space and emerge into a matching real UI region. Match endpoints before tuning easing.
- **Occlusion / invisible cut:** Change scenes when foreground coverage fills the frame, preserving direction and exposure. Describe this as a continuous-shot impression, not a real uncut take.
- **Match-on-action:** Continue one click across shots; the next shot shows the outcome of that same action.
- **Graphic morph / glyph relay:** Preserve baselines or glyph-slot mappings. Allow time to read meaningful intermediate text; use masks instead of stretching incompatible glyphs.
- **J-cut / L-cut:** Bring the next scene's sound in early or carry the previous scene's sound forward to support continuity; voiceover is optional.
- **Parallel editing:** Advance two roles or systems toward the same task, retaining identity and time cues.
- **Montage:** Compress repetition or show breadth; do not present it as evidence of uninterrupted operation.
- **Split-screen / before-and-after:** Match task, conditions, units, and viewport. Label demonstrations versus measurements and avoid unfair comparisons.
- **Speed ramp / time compression:** Label accelerated or omitted waiting. Preserve operation order and necessary steps.

## Motion engineering

For an unrotated 2D camera with world focus F, screen anchor A, and scale s, translation is `T=A-s*F`. Set transform-origin to 0 0 and make matrix order explicit so translation is not accidentally scaled. Rotated cameras require a complete transform matrix.

For large zoom ratios use `s(p)=exp(lerp(log(s0),log(s1),p))`, with s0 and s1 positive. This does not automatically ensure continuity: match endpoint position, scale, and first derivative, using piecewise or Hermite curves where needed. Settle to zero velocity for a hold; do not restart ease-in at every segment of a continuous move.

Track typing using actual font layout or precomputed glyph widths. Set a dead zone and follow only outside the safe window. Use fixed historical-sample filtering or analytical curves, not accumulated state dependent on the previous rendered frame. Test Chinese text, emoji, wrapping, and long copy separately.

Depth of field and motion blur should separate subjects. Render a test segment to assess cost; keep captions and essential UI on a separate sharp layer when appropriate. Shaking and white flashes are not prerequisites for cinematic quality; provide a reduced-motion variant when needed.

## Lighting, composition, and sound

Use high-key soft light and negative space for clarity, low-key rim lighting for premium hardware, natural light for human services, and hard side lighting for craftsmanship. Match light direction, color temperature, and shadows across assets; do not sacrifice UI contrast to lighting.

Wide shots establish place, medium shots show action, close-ups prove feedback, and returning wide shots establish results. Maintain eyelines and screen direction; re-establish space when deliberately crossing the axis. Keep captions away from platform overlays and buttons, validating safe margins for the actual output channel.

Clicks, completion tones, and whooshes have distinct roles; do not sound-design every element. Voiceover determines pauses, and music should yield to speech. If licensed music is unavailable, deliver an explicitly identified music-free version rather than downloading commercial songs.
