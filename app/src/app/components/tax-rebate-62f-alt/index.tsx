import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { SourcesProvider } from "../ballot";
import type {
  StanceFilter,
  TypeFilter,
} from "../tax-rebate-62f/testimony";
import { RC, SOURCES } from "../../data/tax-rebate-62f";
import { MapleFab, ASK_DELAY_MS } from "../tax-rebate-62f/maple-fab";
import {
  WhatWouldItChange,
  WhatEachSideSays,
  WhereTheyAgree,
  WhoItAffects,
  WhatItCosts,
  WhatPeopleAreSaying,
  FromTheDiscussions,
  HowItGotHere,
  WhoIsFunding,
  WhereThisComesFrom,
} from "./chapters";
import { Callout, Segments, Split, Synth } from "./spine";

const CONTENTS = [
  { id: "change", label: "What it changes" },
  { id: "sides", label: "Each side" },
  // Parked with the chapter itself: the agreement material now sits inside
  // the sides chapter, so it has no anchor of its own.
  // { id: "agree", label: "Agreement" },
  { id: "testimony", label: "Testimony" },
  // Parked with the chapter.
  // { id: "affects", label: "Who it affects" },
  // Parked with the chapter.
  // { id: "cost", label: "Cost" },
  { id: "discussions", label: "Discussions" },
  { id: "history", label: "How it got here" },
  { id: "funding", label: "Funding" },
  { id: "sources", label: "Sources" },
];

/** The bill on MAPLE itself, where the filed text and its testimony live. */
const BILL_TEXT_URL = "https://www.mapletestimony.org/bills/194/H5006";

const NAV = ["Ballot questions", "Bills", "Hearings", "Testimony", "About"];

/**
 * index.html pins the layout viewport to 875px and scales it to fit, which is
 * how the fixed-width pages reach a phone. This page reflows instead, so it
 * opts out and asks for the real device width. The flag is read by the script
 * in index.html, including on rotation, and cleared on the way out.
 */
export function useDeviceWidthViewport() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.viewport = "device";
    const refit = (window as unknown as { __mapleFitViewport?: () => void })
      .__mapleFitViewport;
    refit?.();
    return () => {
      delete root.dataset.viewport;
      refit?.();
    };
  }, []);
}

/**
 * Hold the reading position across a browser resize.
 *
 * A browser keeps the scroll offset as a pixel count, so anything above the
 * viewport that reflows to a different height drags the page out from under
 * you. This pins what you are actually looking at instead: while you scroll it
 * keeps note of the element sitting just below the chrome and how far down the
 * window it is, and after each resize reflow it corrects the scroll to put that
 * element back at the same place.
 *
 * Browsers do have scroll anchoring for this, but it is scoped to DOM
 * mutations rather than viewport changes, and Safari does not implement it.
 */
function useResizeScrollAnchor() {
  useEffect(() => {
    // Below the tallest the sticky chrome gets, so the probe lands on the page
    // rather than on the bar covering it.
    const PROBE_Y = 160;
    // Long enough that a slow drag reads as one gesture, short enough that
    // letting go and scrolling again picks a fresh anchor.
    const SETTLE_MS = 300;

    let anchor: { el: Element; top: number } | null = null;
    let resizing = false;
    let queued = false;
    let settle = 0;

    const pick = () => {
      const el = document.elementFromPoint(window.innerWidth / 2, PROBE_Y);
      if (!el) return null;
      // Sticky and fixed chrome does not move with the page, so anchoring to
      // it would be anchoring to nothing.
      for (let n: Element | null = el; n; n = n.parentElement) {
        const pos = getComputedStyle(n).position;
        if (pos === "fixed" || pos === "sticky") return null;
      }
      return { el, top: el.getBoundingClientRect().top };
    };

    const onScroll = () => {
      // Our own corrections scroll the page. Re-reading the anchor from them
      // would just re-record wherever the reflow had already pushed it.
      if (resizing || queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        if (!resizing) anchor = pick();
      });
    };

    const onResize = () => {
      resizing = true;
      // resize fires after layout, so the anchor has already moved and the
      // delta is the distance the reflow pushed it.
      if (anchor?.el.isConnected) {
        const delta = anchor.el.getBoundingClientRect().top - anchor.top;
        if (delta) window.scrollBy(0, delta);
      }
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        resizing = false;
        anchor = pick();
      }, SETTLE_MS);
    };

    anchor = pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);
}

/** Paper rather than a coloured slab: the page's material starts at the top. */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    // Not pinned on small screens. Two stacked sticky bars would eat a sixth of
    // a phone viewport, and the contents bar is the one worth keeping.
    <header className="relative lg:sticky lg:top-0 z-30 bg-ground/95 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-[1180px] px-[20px] sm:px-[32px] h-[var(--nav-h)] flex items-center gap-[32px]">
        <span className="font-display font-semibold text-xl text-brand tracking-heading">
          MAPLE
        </span>
        <nav className="hidden lg:flex items-center gap-[22px]">
          {NAV.map((n) => (
            <button
              key={n}
              className="font-body text-base text-ink-muted hover:text-ink cursor-pointer"
            >
              {n}
            </button>
          ))}
        </nav>
        <button className="ml-auto hidden sm:inline-flex font-body font-semibold text-sm text-ink-inverse bg-brand hover:bg-brand-hover px-[16px] py-[8px] rounded-control cursor-pointer">
          Sign in
        </button>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="ml-auto lg:hidden inline-flex items-center justify-center w-[40px] h-[40px] -mr-[8px] rounded-control text-ink hover:bg-wash cursor-pointer"
        >
          {open ? (
            <X className="w-[20px] h-[20px]" />
          ) : (
            <Menu className="w-[20px] h-[20px]" />
          )}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-line">
          <nav className="mx-auto max-w-[1180px] px-[20px] sm:px-[32px] py-[8px] flex flex-col">
            {NAV.map((n) => (
              <button
                key={n}
                className="text-left font-body text-lg text-ink py-[10px] border-b border-line last:border-0 cursor-pointer"
              >
                {n}
              </button>
            ))}
            <button className="sm:hidden mt-[12px] mb-[8px] font-body font-semibold text-base text-ink-inverse bg-brand px-[16px] py-[10px] rounded-control cursor-pointer">
              Sign in
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

/**
 * The whole page for a reader with a minute.
 *
 * Not a summary of what follows: the question, what each campaign says in its
 * own words, and how much is on the record. Someone who reads only this screen
 * has been told the truth, briefly. Everything below is for people who want
 * more, which is what the rest of the page is for.
 */
function Brief() {
  return (
    <div className="mx-auto max-w-[1180px] px-[20px] sm:px-[32px] pt-[48px] sm:pt-[72px] pb-[56px] sm:pb-[76px]">
      <p className="font-body font-semibold text-sm text-ink-muted">
        Massachusetts · Statewide ballot · November 3, 2026
      </p>

      {/* Three jobs, three voices, so the header does not read as one more
          chapter heading.

          "Question 5" is how you find this on a ballot, and a numeral is a
          different typographic gesture from the Lexend sentences every chapter
          opens with, so it can be large without competing with them.

          The official name is the formal label. It stays small but stays in
          full ink: it is not an afterthought, it is just not the useful part.

          The description is the useful part, so it is set large, but as prose
          in Nunito rather than as display type. It is the page speaking in the
          voice it uses for content everywhere else. */}
      <h1 className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl tracking-display text-ink mt-[30px]">
        Question {RC.number}
      </h1>
      <p className="font-display font-medium text-lg sm:text-xl text-ink mt-[4px]">
        {RC.title}
      </p>
      {/* Topic sits above the description, so the reading starts once and is
          not interrupted by metadata. */}
      <div className="flex gap-[8px] flex-wrap mt-[22px]">
        {RC.tags.map((t) => (
          <span
            key={t}
            className="font-body text-sm text-ink-muted border border-line rounded-pill px-[12px] py-[3px]"
          >
            {t}
          </span>
        ))}
      </div>

      {/* The plain-language line is written, not quoted, so it carries the AI
          mark and its sources like every other synthesis on the page. */}
      {/* Scaled down rather than just set smaller: the measure came in with the
          type rather than the text being left to reflow wider, so the block
          keeps its shape at the smaller size. 26px against 996px is the pairing
          that was settled on by eye; it started from the type's own ratio
          against the 1116px content width and was opened from there. Any
          further size change moves the measure by the same factor. Below sm the
          column is narrower than that anyway. */}
      <div className="mt-[38px] sm:max-w-[996px]">
        <Synth
          ids={["petition", "chapter62F", "ballotpedia"]}
          prompt="Summarize Petition No. 25-17 in plain language for a general audience: what the measure changes about the Chapter 62F revenue cap, how the surtax carve-in works, and how the two campaigns frame it. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
        >
          <div className="flex flex-col gap-[18px]">
            {RC.soundbite.map((para, i) => (
              <p
                key={i}
                className="font-body text-xl sm:text-[26px] sm:leading-[1.45] text-ink leading-[1.4] text-pretty"
              >
                <Segments
                  parts={para}
                  notes={RC.heroFootnotes}
                  strongClass="font-bold"
                />
              </p>
            ))}
          </div>
        </Synth>
      </div>

      {/* The hero asks the reader to take a written summary on trust, so the
          official text is offered in the same breath rather than left to a
          chapter further down. Aligned to the synthesis rule's left edge, and
          above the two outcomes: by the time you are reading those, you should
          already have been shown where to check. */}
      {/* The two primary documents, side by side: what the state says the
          measure does, and the measure itself. */}
      <div className="flex flex-wrap items-center gap-x-[28px] gap-y-[10px] mt-[30px] ml-[6px]">
        <a
          href={SOURCES.agSummary.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[4px] font-body font-semibold text-base text-official-ink hover:text-official"
        >
          Read the official summary
          <ArrowUpRight className="w-[14px] h-[14px]" />
        </a>
        <a
          href={BILL_TEXT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[4px] font-body font-semibold text-base text-official-ink hover:text-official"
        >
          Read the bill text
          <ArrowUpRight className="w-[14px] h-[14px]" />
        </a>
      </div>

      {/* The spine's first appearance, and the reason the page has one. Same
          component the chapters use, so it stacks the same way on a phone.

          One card, not two. A ballot question is a single decision with two
          outcomes, and a shared container says that where a pair of cards would
          say "two separate things". It also keeps the spine legible: bordering
          each side would put three vertical lines within 50px of each other and
          the centre rule would stop reading as a centre. */}
      <div className="mt-[56px] sm:mt-[64px]">
        <Split
          heads
          variant="cards"
          left={
            <p className="font-body text-lg sm:text-xl text-ink leading-[1.5] text-pretty">
              {RC.overviewVotes.yes.summary}
            </p>
          }
          right={
            <p className="font-body text-lg sm:text-xl text-ink leading-[1.5] text-pretty">
              {RC.overviewVotes.no.summary}
            </p>
          }
        />
      </div>

      {/* Parked: counts of accounts on the record, statements filed, and
          sources cited. Reads as a scoreboard this high on the page, and the
          roster chapter says the same thing where it means something.
      <dl className="flex gap-[24px] sm:gap-[40px] flex-wrap mt-[36px] pt-[20px] border-t border-line">
        {[
          [String(POSITION_USERS.length), "organizations and officials on the record"],
          [String(TESTIMONY.length), "statements filed"],
          [String(Object.keys(SOURCES).length), "sources cited"],
        ].map(([n, label]) => (
          <div key={label}>
            <dt className="font-display font-medium text-2xl text-ink tracking-heading">
              {n}
            </dt>
            <dd className="font-body text-sm text-ink-muted mt-[2px] max-w-[22ch]">
              {label}
            </dd>
          </div>
        ))}
      </dl>
      */}
    </div>
  );
}

/** Sticky index. Horizontally scrollable so eleven entries fit any width. */
function Contents({ active }: { active: string }) {
  return (
    <div className="sticky top-0 lg:top-[60px] z-20 bg-ground/95 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-[1180px] px-[20px] sm:px-[32px]">
        <div className="flex gap-[18px] sm:gap-[22px] overflow-x-auto scrollbar-hide">
          {CONTENTS.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`shrink-0 whitespace-nowrap font-body text-sm py-[12px] border-b-2 transition-colors ${
                active === c.id
                  ? "text-ink border-brand font-semibold"
                  : "text-ink-muted border-transparent hover:text-ink"
              }`}
            >
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TaxRebate62FAlt() {
  const [active, setActive] = useState(CONTENTS[0].id);
  const [askOpen, setAskOpen] = useState(false);
  const [askNudge, setAskNudge] = useState(0);
  // The campaign cards and the feed sit in different chapters, so the filters
  // they share have to live above both.
  const [stance, setStance] = useState<StanceFilter>("all");
  const [accountType, setAccountType] = useState<TypeFilter>("all");
  useDeviceWidthViewport();
  useResizeScrollAnchor();

  useEffect(() => {
    const onScroll = () => {
      let current = CONTENTS[0].id;
      for (const c of CONTENTS) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= 140) current = c.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const askMaple = () => {
    setAskNudge((n) => n + 1);
    window.setTimeout(() => setAskOpen((o) => !o), ASK_DELAY_MS);
  };

  return (
    <SourcesProvider value={SOURCES}>
      <div className="bg-ground min-h-screen font-body text-ink overflow-x-clip">
        <SiteNav />
        <Brief />
        <Contents active={active} />
        <main className="mx-auto max-w-[1180px] px-[20px] sm:px-[32px] pt-[36px] sm:pt-[48px] pb-[96px] flex flex-col gap-[44px] sm:gap-[64px]">
          <WhatWouldItChange />
          <WhatEachSideSays
            onViewTestimony={(s) => {
              // "Endorsing Orgs" means both halves of that phrase: the side and
              // the kind of account, so the feed opens on exactly the list the
              // card was showing.
              setStance(s);
              setAccountType("organization");
            }}
          />
          {/* Parked: the agreement material moved into WhatEachSideSays,
              where it reads as the second half of that chapter's answer.
          <WhereTheyAgree />
          */}
          <WhatPeopleAreSaying
            filter={stance}
            onFilterChange={setStance}
            typeFilter={accountType}
            onTypeFilterChange={setAccountType}
          />
          {/* Parked: both now appear as disclosures inside "What would it
              change?", so as chapters they said the same thing a second time.
          <WhoItAffects />
          <WhatItCosts />
          */}
          {/* Parked: the roster of who has filed, by side. The campaign cards
              now carry the same coalition, and the testimony chapter carries the
              statements, so it was saying both a second time. `WhoIsOnTheRecord`
              is still exported from ./chapters. */}
          <FromTheDiscussions />
          <HowItGotHere />
          <WhoIsFunding />
          <WhereThisComesFrom />
        </main>
        <footer className="border-t border-line">
          <div className="mx-auto max-w-[1180px] px-[20px] sm:px-[32px] py-[32px] flex flex-col sm:flex-row sm:items-center justify-between gap-[16px] sm:gap-[24px]">
            <p className="font-body text-sm text-ink-muted max-w-[60ch]">
              Design prototype. Content, testimony, positions, citations, and
              AI syntheses are illustrative only.
            </p>
            <button
              onClick={askMaple}
              className="shrink-0 inline-flex items-center gap-[6px] font-body font-semibold text-sm text-brand hover:text-alert cursor-pointer"
            >
              Ask Maple about this question
              <ChevronDown className="w-[14px] h-[14px]" />
            </button>
          </div>
        </footer>
      </div>
      <MapleFab open={askOpen} onOpenChange={setAskOpen} nudge={askNudge} />
    </SourcesProvider>
  );
}

export default TaxRebate62FAlt;
