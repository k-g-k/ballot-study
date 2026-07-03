# Ballot Question Prototype

**Live demo:** https://ballot-pi.vercel.app/

An interactive prototype exploring how a Massachusetts ballot question could be
presented on MAPLE — a React + Vite + Tailwind single-page app. The main page is a
rent-control ballot-question deep-dive with tabbed sections (Overview, For &
Against, Public Perspectives, Citizen Deliberations, Campaign Finance, Background,
Bibliography), built as a reusable system so other ballot questions can reuse the
same layout by supplying their own data. Earlier exploratory concepts remain in
the repo under `_archive/` folders and are not part of the live app.

> ⚠️ Prototype only. Content, campaign positions, testimony, citations, and AI
> syntheses are illustrative — not real ballot-measure data.

## Origins & evolution

This began as a design prototype in **Figma Make** — the original is published at
**[grow-turn-02824673.figma.site](https://grow-turn-02824673.figma.site)**. It was
then exported to this React + Vite + Tailwind codebase and refactored into a
reusable system: generic rendering components under `src/app/components/ballot/`,
driven by question content under `src/app/data/`, so a new ballot question can
reuse the same layout without rebuilding it. See [`CLAUDE.md`](./CLAUDE.md) for the
current architecture and conventions.

## Tech stack

React 18 · Vite 6 · Tailwind CSS v4 · React Router · TypeScript

## Getting started

Requires Node 20+.

```bash
npm install     # install dependencies
npm run dev     # start the dev server (prints a localhost URL)
npm run build   # production build → dist/
```

## Working in the code

New to this repo? The architecture, the reusable component library, and recipes
for common changes (move a card, add a card/tab, stand up a new ballot question)
live in **[`CLAUDE.md`](./CLAUDE.md)** — which Claude Code auto-loads, so your
Claude already knows the conventions and what to reuse.

To get oriented fast, paste this to your Claude:

> Read CLAUDE.md, then walk me through this codebase — the layering, the reusable
> `ballot/` components, where content lives, and the recipe for adding a card or a
> new ballot question. Point out what to reuse so I don't reinvent anything.

## Deployment

Deployed on **Vercel** at https://ballot-pi.vercel.app/. Vercel auto-detects the Vite setup:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

Pushes to `main` trigger a new deployment automatically once the repo is connected.
