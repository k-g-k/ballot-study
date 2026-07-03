# MAPLE ballot-question prototypes — working guide

A React + TypeScript + Vite + Tailwind prototype for MAPLE's ballot-question
pages. The flagship page is the **rent-control deep-dive** at
`/ballotQuestions/rent-control-alt`, built as a reusable system so a new ballot
question can reuse the same layout by supplying its own data.

- Dev server: `npm run dev` — the collapsible **Dev Nav** (bottom-left, dev only)
  lists every routable prototype.
- Check before committing: `npx tsc --noEmit` and `npm run build` (both should be
  clean; the build's "chunk > 500 kB" note is a harmless warning).

## Architecture — the layering rule

Data flows one direction: **content data → ballot library → page**. Nothing in a
lower layer imports a higher one.

1. **`src/app/data/rent-control/`** — the question's content, no JSX.
   - `sources.ts` — the source registry (`SOURCES`), keyed by id.
   - `content.ts` — `RC` (all structured data), deliberation data, arg-filter config.
   - `selectors.ts` — `orgTestifiers`, `testimonyFor` (join testimony ↔ accounts).
   - `users.ts` / `testimony.ts` still live one level up (`data/rent-control-*.ts`)
     and are re-exported through `data/rent-control/index.ts`.
   - Import everything from the barrel: `import { RC, SOURCES } from "../../data/rent-control"`.

2. **`src/app/components/ballot/`** — the generic, question-agnostic library.
   Depends only on its own `types.ts`, `helpers.ts`, and `sources-context.tsx`.
   - `primitives/` — generic UI: `Card`, `CitationBlock`, `Cite`, `SourceNote`,
     `SynthSourcesNote`, `SynthSummaryCard`, `AnalysisSection`, `AISynth`,
     `ContentItem`, `FilterChip`, `Pagination`, `TwoColList`.
   - `sections/` — typed, data-driven blocks: `StakeholderGrid`, `ArgList`,
     `ArgColumn`, `Timeline`, `Facts`, `ClaimMap`, `Polls`, `FinanceLedger`,
     `MediaPhase`, `ResearchGroup`, `RefGroup`, `EmptyState`, `DelibStat`,
     `DelibThemeCol`.
   - Import from the barrel: `import { Card, StakeholderGrid } from "../ballot"`.

3. **`src/app/components/rent-control-alt/`** — the page itself.
   - `index.tsx` — the **shell** only: nav, hero, tab sidebar + legend, tab switch.
     Wraps everything in `<SourcesProvider value={SOURCES}>`.
   - `tabs.ts` — `TABS` config + `TabId`.
   - `tabs/*.tsx` — one file per tab; each is a **thin composition** of `ballot`
     sections fed by `RC`.
   - `accounts.tsx`, `testimony.tsx`, `vote-card.tsx` — components bound to this
     question's account model (`PositionUser` / testimony). They live with the page
     rather than the generic library because they read that data model; generalize
     later by lifting those types into `ballot/types.ts`.

## Provenance / citation model

Every citable fact carries a **`SrcKind`**: `official` (blue), `outside` (green),
`ai` (purple), `user` (orange). This drives the color of left-bar blocks, chips,
and legend dots (`KIND_DOT` / `SRC_CHIP` in `ballot/types.ts`).

Sources live in the per-question `SOURCES` registry and are referenced **by id**.
Citation components resolve ids via React context — the page wraps content in
`<SourcesProvider value={SOURCES}>`, and components call `useSources()`. So call
sites stay clean: `<Cite ids={["petition"]} />`, `<SourceNote ids={[…]} />`,
`<SynthSourcesNote ids={[…]} prompt="…" />`, `<RefGroup ids={[…]} />`.

- **`CitationBlock`** — the one colored left-bar block. `<CitationBlock kind="official"
  title="…">…children…</CitationBlock>`. Use it instead of hand-writing
  `border-l-[3px] border-<color>`.
- **`SynthSummaryCard` / `AnalysisSection`** — the purple "AI synthesis" treatment
  with a prompt + sources popover.

## Recipes

- **Change a card's words** → edit `data/rent-control/content.ts` (structured data)
  or `sources.ts`. Some inline prose still lives in the tab files; search the tab.
- **Move a card within/between tabs** → cut the JSX block (e.g. `<Card>…</Card>`)
  from one `tabs/*.tsx` and paste it into another. Data comes from `RC`, so nothing
  else changes.
- **Add a card** → compose a `ballot` section inside a `Card` in the target tab,
  and add its data to `content.ts`.
- **Add / reorder / rename a tab** → edit `TABS` in `rent-control-alt/tabs.ts`, add
  the `TabId`, create `tabs/YourTab.tsx`, and add the `activeTab === "…"` branch in
  `index.tsx`.
- **Stand up a new ballot question** → copy `data/rent-control/` to
  `data/<question>/`, refill `content.ts` + `sources.ts`, then build a page folder
  that composes the same `ballot` sections. Add a route in `App.tsx`.

## Conventions

- Tailwind with arbitrary values everywhere (`text-[14px]`, `text-[#334156]`).
  Fonts: `font-['Nunito']` (body), `font-['Lexend']` (display).
- `App.tsx` holds a single `PROTOTYPES` registry that drives both routes and the
  Dev Nav.
- Superseded early drafts are parked (unrouted) in `components/_archive/` and
  `data/_archive/`; they are not part of the build graph's live pages.
