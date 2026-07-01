# Ballot Question Prototype

**Live demo:** https://ballot-pi.vercel.app/

An interactive prototype exploring information-architecture concepts for ballot-question pages —
a React + Vite + Tailwind single-page app with a top switcher between three concepts:

- **Content Schemata** — content inventory organized by tab
- **For & Against Example** — arguments synthesis + research evidence (AI-generated demo content)
- **Rent Control Example** — a real-content example based on public sources

> ⚠️ Prototype only. Some content is AI-generated for demonstration and is not real ballot-measure data.

## Tech stack

React 18 · Vite 6 · Tailwind CSS v4 · shadcn/ui (Radix) · TypeScript

## Getting started

Requires Node 20+.

```bash
npm install     # install dependencies
npm run dev     # start the dev server (prints a localhost URL)
npm run build   # production build → dist/
```

## Deployment

Deployed on **Vercel** at https://ballot-pi.vercel.app/. Vercel auto-detects the Vite setup:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

Pushes to `main` trigger a new deployment automatically once the repo is connected.
