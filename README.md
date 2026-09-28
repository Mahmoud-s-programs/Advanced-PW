# Mahmoud Alkwisem — Autumn Afterglow

A personal portfolio inside a procedural autumn forest. Built with React, Vite, React Three Fiber, Three.js, and Framer Motion.

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

- A persistent forest travels from golden hour to dusk.
- Three resume projects lead the gallery, followed by the six original projects. New project artwork is clearly labeled as concept art; project briefs open the supplied resume.
- The skills ecosystem and grouped toolkit support pointer, touch, and keyboard exploration, with all 27 resume skills alongside the existing skills.
- Professional experience contains only Fani's Lab and Vosyn, matching the supplied 2026 resume. The resume is available to download; the four original testimonials remain.
- The contact form validates input and preserves a draft. Direct email works even when EmailJS is unconfigured.
- System reduced motion, manual stillness, automatic graphics tiers, and a matching static fallback keep the experience usable across devices.

Set `VITE_APP_EMAILJS_SERVICE_ID`, `VITE_APP_EMAILJS_TEMPLATE_ID`, and `VITE_APP_EMAILJS_PUBLIC_KEY` in `.env` to enable the existing EmailJS integration. Restart the server after changing them. Never put an EmailJS private key in a browser environment variable.

See [the implementation and verification notes](docs/autumn-afterglow.md) for the content inventory, architecture, configuration, test coverage, and performance evidence.
