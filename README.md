# Mahmoud Alkwisem — Autumn Afterglow

A personal portfolio inside a continuous, procedural autumn world. Built with React, Vite, Three.js / React Three Fiber, Drei, GSAP ScrollTrigger, Lenis, and original GLSL materials. Framer Motion handles small interface reveals.

## Run locally

```sh
npm install
npm run dev
```

## Check and build

```sh
npm run lint
npm run build
npx playwright install chromium
npm run test:browser
```

Start the development server before running browser tests. `PORTFOLIO_URL` can select a different local test server; test evidence is written to `tmp/qa/`.

## Explore

- A single perspective camera travels approximately 170 world units: amber seed → root sculpture → skill clearing → nine physical project displays → experience markers → sunset pier.
- Rotate and unfold the hero sculpture. Select skill satellites at different depths, or follow the two lit experience markers to their resume details.
- Three resume projects lead the gallery, followed by the six original projects. New project artwork is clearly labeled as concept art; project briefs open the supplied resume.
- The skills ecosystem and grouped toolkit support pointer, touch, and keyboard exploration, with all 27 resume skills alongside the existing skills.
- Professional experience contains only Fani's Lab and Vosyn, matching the supplied 2026 resume. The resume is available to download; the four original testimonials remain.
- The contact form validates input and preserves a draft. Direct email works even when EmailJS is unconfigured.
- System reduced motion, manual stillness, automatic graphics tiers, and a matching static fallback keep the experience usable across devices.

Set `VITE_APP_EMAILJS_SERVICE_ID`, `VITE_APP_EMAILJS_TEMPLATE_ID`, and `VITE_APP_EMAILJS_PUBLIC_KEY` in `.env` to enable the existing EmailJS integration. Restart the server after changing them. Never put an EmailJS private key in a browser environment variable.

See [the implementation and verification notes](docs/autumn-afterglow.md) for the content inventory, architecture, configuration, test coverage, and performance evidence.

The current 3D architecture and phased visual gates are documented in [spatial acceptance](docs/spatial-acceptance.md). `scripts/phase-one.cjs` inspects alternate camera/light setups, `scripts/phase-two.cjs` captures five Canvas-only checkpoints, `scripts/spatial-checks.cjs` verifies the embedded content, and `scripts/spatial-performance.cjs` measures the local rendering backend. Generated evidence lives in `tmp/spatial/`. Add `?orbit` to the local preview URL for debug OrbitControls.
