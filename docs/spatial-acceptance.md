# Autumn world — phased acceptance

## Phase 1: foundation — passed

Inspected the running scene at 1440 × 1000, with DOM hidden, from the entrance and two alternate camera positions. Captures and measurements: `tmp/spatial/phase1-*.png`, `tmp/spatial/phase1.json`; reproducible with `scripts/phase-one.cjs`.

- Entrance camera approximately (0, 3.4, 16), target (0, 2.3, -3), perspective 46°.
- Real instanced trunks, branches, maple foliage and falling leaves; rocks, stone walkway, plinth, curved gold petals, shader core and orbital rings.
- Warm directional key, cast shadows, cool ambient/hemisphere fill, warm rim and a local point light. A locally rendered environment map supplies metallic reflections.
- Exponential fog initially #6a5140 / 0.026. Procedural sky and ground. Fullscreen raster forest is only the WebGL failure fallback.
- Side camera reveals different petal/ring surfaces; a near trunk occludes the sculpture naturally. Changing key/rim intensity changes lit surfaces and shadows.
- With a 0.5-unit lateral camera shift, measured near projection delta 0.100 vs distant 0.016 (6.25×). Leaves span Z -22.49 through 11.96.
- No runtime errors. Lint and production build passed at this gate. Opaque sculpture material reduced sampled rendering from 207 calls / 472k triangles to 106 calls / 233k triangles before later optimization.

Phase 2 begins only after these captures were inspected.

## Phase 2: persistent journey — passed

Ran `scripts/phase-two.cjs` and inspected top, 25%, 50%, 75%, bottom with HTML hidden. After the first pass, varied the corridor with large orbital arches and tilted frames, added dusk monoliths, replaced pyramid terrain with three modeled ridges, and adjusted their height to keep the sun visible. Re-ran all five checkpoints.

- Measured cameras: (0.04,3.43,16.10), (-0.25,3.64,-34.99), (0.35,3.62,-68.15), (0.15,3.30,-104.81), (1.67,5.67,-153.95).
- Waypoints: hero Z16, About Z-3, Skills Z-21, nine gallery stops Z-42 through -106, Experience Z-122, Contact Z-144 through -154. Targets travel with the route, independently of the camera.
- GSAP ScrollTrigger scrubs a single scene-route object. Waypoint timing uses actual section offsets; Lenis feeds ScrollTrigger on desktop. Camera interpolation, keyed lighting, exponential fog, shader atmosphere and seed unfolding read that object.
- Foreground arches/trunks enter and leave the frustum, revealing different geometry. Middle rings become near foreground, later tilted frames reveal dark monoliths, and the final camera reaches a pier overlooking water and ridges.
- Fog changes #6a5140 / 0.026 → #202936 / 0.041 → #9c6853 / 0.014. Warm key intensity transitions 3.5 → about 1.2 → 3.2.
- No browser runtime errors; production build passed. Evidence: `tmp/spatial/phase2-*.png` and `phase2.json`.

Phase 3 begins only after these captures were inspected.

## Implementation map

- `ForestCanvas.jsx`: one persistent Canvas, lifecycle, adaptive quality and scene diagnostics.
- `Foundation.jsx`, `AutumnEnvironment.jsx`, `GroundDetails.jsx`: light/fog/camera, instanced trees and instanced ground detail, hero sculpture.
- `CinematicJourney.jsx`: GSAP route timing derived from section offsets, camera dwell around readable content, Lenis integration, anchor navigation and cleanup.
- `JourneyLandmarks.jsx`: gallery architecture, monoliths, modeled ridge layers, procedural water, sunset pier.
- `PortfolioWorld.jsx`: nine textured physical displays, sixteen skill nodes with varying Z, the procedural root sculpture and two experience markers. Drei Html projects accessible controls from world coordinates into a dedicated overlay landmark.
- `contentStore.js`: shared selection state for HTML details and corresponding 3D objects; no React state updates inside frame loops.
- `shaders.js`: original animated amber surface and caustic shaders. Ground and water also use procedural shader detail. Metallic materials were informed by inspection of Figma's first-party Chromatic Metal reference; this task does not create a Figma file.

All scenes use the same world and camera. There are no section-specific canvases or cameras. The static forest artwork remains exclusively for unavailable/lost WebGL. Small screens, manual pause, and system reduced motion receive the complete HTML content presentation. The renderer stops continuous frames when paused or the document is hidden.
