# Autumn Afterglow

The supplied 16-page PDF is the design brief for this in-place portfolio transformation. The implementation keeps the existing React 18, Vite 4, React Three Fiber, Three.js, Framer Motion, and EmailJS infrastructure.

## Content inventory

- The three projects from `Mahmoud_Alkwisem_Resume_2026.pdf` lead the gallery: Production-Grade RAG Pipeline, Multi-Agent Autonomous Pipeline, and End-to-End MLOps Pipeline. All six original projects retain their descriptions, technology tags, screenshots, and GitHub destinations, for nine projects total.
- The resume supersedes the original experience data. Only Machine Learning Developer at Fani's Lab (September 2024–Present) and Software Development Team Lead at Vosyn (July–October 2023) remain, with the five resume bullets and corrected team size of 12+. Native expandable details remain keyboard accessible.
- All sixteen existing skills remain. Eighteen missing resume skills have been added in a grouped toolkit, covering all 27 resume skills and 34 skills overall. SQL is represented explicitly alongside SQL Server. Category filters and skill context work in both the ecosystem and the added toolkit.
- All four service specialties and testimonials remain. Obvious spelling mistakes in the biography, project name, and two testimonials were corrected.
- The original email address and repository links remain. The supplied resume is copied unchanged to `public/Mahmoud-Alkwisem-Resume-2026.pdf` and is available to download. Since it lists no project repository URLs, the three new cards open this PDF as their project brief.
- Existing `#about`, `#work`, and `#contact` anchors continue to work. The new skills and project sections have their own anchors.

## Design and architecture

The forest persists behind the full journey. Seeded procedural trees and curved maple leaves share instanced geometry. Fog, horizon light, and restrained camera movement gradually change from golden hour to dusk. A reading shade grows continuously with scroll; the forest parts at the contact overlook. Screenshot hovers influence the surrounding light. Entering the gallery produces one restrained gust.

| Area | Implementation |
| --- | --- |
| Forest | `src/world/ForestCanvas.jsx`, `AutumnEnvironment.jsx`, `geometry.js` |
| Wind and leaves | `src/world/LeafSystem.jsx` |
| Fog, sun rays, dust, sky | `src/world/Atmosphere.jsx`, `Lighting.jsx` |
| Camera | `src/world/CameraRig.jsx` |
| Scroll, preferences, visibility | `src/world/JourneyContext.jsx` |
| Quality and resource diagnostics | `src/world/PerformanceManager.jsx` |
| Palette, tiers, chapters | `src/world/config.js` |
| Design tokens, layout, focus, responsive states | `src/theme.css` |
| Project exhibits | `src/components/Works.jsx` |
| Skills ecosystem | `src/components/Tech.jsx` |
| Experience trail | `src/components/Experience.jsx` |

The application uses native scrolling, with damped camera motion and smooth anchor navigation. It does not intercept wheel or touch gestures. Typography uses locally hosted, licensed Cormorant Garamond and Manrope fonts. The six original project screenshots total 264 KB in WebP format. Three generated concept illustrations add approximately 281 KB. Their alt text and visible captions identify them as artwork. Generation details are in `docs/project-artwork.md`.

## Usability and performance

- High, medium, and low quality tiers reduce canopy instances, falling leaves, dust, sun rays, and device pixel ratio. Automatic mode considers viewport width, device memory, hardware concurrency, and data-saving preferences. Sustained slow frames lower the automatic tier.
- Three.js is loaded separately from the initial page bundle. The scene has no model or texture downloads. Secondary screenshots load lazily.
- The animation loop pauses in a hidden document. System reduced motion or the manual stillness control removes camera travel, custom cursor, wind, and the animated sticky gallery. The static gallery exposes all nine projects. Gallery length, counters, previous/next boundaries, and artwork metadata now follow the collection size.
- Mobile and short landscape screens use a normal project list and a readable skills layout. Custom cursor and magnetic interactions are disabled on touch devices.
- Scene errors, unavailable WebGL, and context loss leave the static forest and all HTML content available.
- Local preferences and contact drafts tolerate blocked storage. Contact drafts stay in session storage and are cleared on confirmed delivery.
- Keyboard navigation, a skip link, visible focus states, semantic landmarks, labeled controls, form error associations, and status announcements are included.
- Three Easter eggs: catch the golden leaf, read the little forest sign, or type `autumn` outside an input. Stillness mode announces discoveries without a gust.
- Audio is omitted; the brief makes it optional. No sound autoplays.

## Contact configuration

The actual preview currently has no usable EmailJS configuration. Direct email remains available, and an unconfigured submission explains how to contact Mahmoud. To enable delivery, set the existing integration's three values in `.env` and restart Vite:

```dotenv
VITE_APP_EMAILJS_SERVICE_ID=
VITE_APP_EMAILJS_TEMPLATE_ID=
VITE_APP_EMAILJS_PUBLIC_KEY=
```

The template receives `from_name`, `to_name`, `from_email`, `to_email`, and `message`. Retain those names in the EmailJS template. Delivery tests intercept the API; no real messages are sent by QA.

## Verification

Run the local server with `npm run dev -- --host 127.0.0.1`, then `npm run test:browser`. On a fresh machine, run `npx playwright install chromium` first. Set `PORTFOLIO_URL` to test another local server. The verification script stores screenshots, accessibility details, and the result record under ignored `tmp/qa/`.

Recorded checks include all navigation, all project destinations and images, experience detail expansion, technology filtering and keyboard context, all testimonials, form validation and draft recovery, quality changes and geometry disposal, manual and system reduced motion, context loss, blocked storage, and unavailable WebGL. Responsive coverage: 1440×1000, 390×844, 320×700, 768×1024, and 1024×600.

Desktop and mobile axe scans reported zero WCAG A/AA violations. Repeated high/low quality changes stayed at 14/7 geometries and 15/8 draw calls, with zero scene textures, rather than accumulating resources. Paused scenes stayed idle. Headless Chromium uses software rendering here; these results do not certify 60 FPS on physical desktop or phone GPUs.

The original development dependency stack predates this redesign. Dependency modernization is separate from the visual transformation; the framework was not upgraded as part of this work.

The initial redesign browser pass completed all 20 checks successfully, including a mocked HTTP 500 delivery failure and a mocked successful retry on a separate server with dummy EmailJS settings. The actual preview's missing-configuration behavior was checked separately. No real email was sent. The initial production smoke test passed in WebGL and static-fallback modes, with zero runtime/asset errors and zero accessibility violations in both. Production bundles were checked for accidental dummy EmailJS values; none were present.

The September 2026 resume update passed `npm run lint`, `npm run build`, and all 20 updated browser checks. Desktop and mobile axe scans each returned zero violations. Verification includes the replacement of all old roles, corrected Vosyn details, nine gallery entries and counters, concept-art captions, PDF availability, all eighteen added skills, skill filters, keyboard interaction, reduced motion, responsive layouts, and graphics resource cleanup. The copied resume's SHA-256 matches the uploaded file. Additional visual inspection covered 1024×800, 1280×720, and 1440×900 desktop gallery layouts; project text stayed clear of the heading and controls. The Three.js renderer remains a separate lazy chunk.

Restart Vite before scene diagnostics if the shared scene module has been hot-reloaded, so the diagnostic import and the active scene share the same module instance. The final resume verification ran against a fresh server, with its evidence in `tmp/qa/verification.json`.
