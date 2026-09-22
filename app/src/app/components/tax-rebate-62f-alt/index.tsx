import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  X,
} from "lucide-react";
import { SourcesProvider } from "../ballot";
import {
  TestimonyFeed,
  type StanceFilter,
  type TypeFilter,
} from "../tax-rebate-62f/testimony";
import {
  RC,
  SOURCES,
  TESTIMONY,
  testimonyFor,
} from "../../data/tax-rebate-62f";
import { MapleFab } from "../tax-rebate-62f/maple-fab";
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
import { WhatIsThePublicSaying } from "./public-saying";

const CONTENTS = [
  { id: "change", label: "What it changes" },
  { id: "sides", label: "Each side" },
  // Parked with the chapter itself: the agreement material now sits inside
  // the sides chapter, so it has no anchor of its own.
  // { id: "agree", label: "Agreement" },
  // Parked with the chapter.
  // { id: "testimony", label: "Testimony" },
  // Parked with the chapter.
  // { id: "affects", label: "Who it affects" },
  // Parked with the chapter.
  // { id: "cost", label: "Cost" },
  // Parked with the chapter.
  // { id: "discussions", label: "Discussions" },
  { id: "public", label: "Public" },
  { id: "history", label: "Path to the ballot" },
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
        {/* Drawn the way an account without a picture is drawn in the feed
            below, but hollow until you reach it: the pale brand edge and the
            initials in brand ink, with the soft fill arriving on hover. Signing
            in is the way into an account rather than the page's own action, so
            it wears an account's clothes and not a button's.
 */}
        <button
          aria-label="Account"
          className="ml-auto hidden sm:inline-flex items-center gap-[10px] cursor-pointer group"
        >
          <span className="inline-flex items-center justify-center w-[36px] h-[36px] rounded-full border border-brand-edge group-hover:bg-brand-soft group-hover:border-brand transition-colors">
            <span
              style={{ fontSize: 12 }}
              className="font-body font-semibold text-brand-ink tracking-[0.02em]"
            >
              GK
            </span>
          </span>
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
            {/* The open menu has room for words, so it keeps them; only the
                collapsed bar trades the label for the mark. */}
            <button className="sm:hidden mt-[12px] mb-[8px] font-body font-semibold text-base text-brand border border-brand px-[16px] py-[10px] rounded-control cursor-pointer">
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
    <div
      data-contents-bar
      className="sticky top-0 lg:top-[calc(var(--nav-h)+1px)] z-20 bg-ground/95 backdrop-blur border-b border-line"
    >
      <div className="mx-auto max-w-[1180px] px-[20px] sm:px-[32px]">
        <div className="flex items-stretch gap-[18px] sm:gap-[22px] h-[var(--subnav-h)] overflow-x-auto scrollbar-hide">
          {CONTENTS.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`shrink-0 whitespace-nowrap font-body text-sm flex items-center border-b-2 transition-colors ${
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
  // The campaign cards and the feed sit in different chapters, so the filters
  // they share have to live above both.
  const [stance, setStance] = useState<StanceFilter>("all");
  const [accountType, setAccountType] = useState<TypeFilter>("all");
  // The strip is standing chrome, there from the first paint. Testimony is the
  // point of the page, so the handle should not be something you have to find a
  // button to summon; collapsing folds the panel back to the strip rather than
  // closing it away.
  const [rail, setRail] = useState<"open" | "min">("min");
  // The rail begins under the contents bar, and the contents bar moves: it sits
  // below the hero until you scroll past it, then pins under the nav. So the
  // offset is measured rather than declared, and written straight to the DOM
  // instead of through state, which would re-render the page on every frame of
  // a scroll. The class keeps the pinned value as its fallback, so the rail is
  // in the right place for the first paint and if this never runs.
  const shellRef = useRef<HTMLDivElement>(null);
  // Read inside the scroll handler, which is set up once and must not be torn
  // down and rebuilt every time the rail opens or closes.
  const openRef = useRef(false);
  openRef.current = rail === "open";
  useEffect(() => {
    /**
     * Where the contents bar's underside sits once it has pinned. Read off the
     * shell rather than the document, because --subnav-h is declared on the
     * shell and the root knows nothing about it.
     */
    const pinnedBottom = (el: HTMLElement) => {
      const cs = getComputedStyle(el);
      const px = (v: string) => parseFloat(cs.getPropertyValue(v)) || 0;
      return px("--nav-h") + px("--subnav-h") + 2;
    };
    const shell = shellRef.current;
    const bar = shell?.querySelector<HTMLElement>("[data-contents-bar]");
    if (!shell || !bar) return;
    const sync = () => {
      const bottom = bar.getBoundingClientRect().bottom;
      shell.style.setProperty("--rail-top", `${Math.max(0, Math.round(bottom))}px`);
      // Scrolled back up into the hero, the contents bar leaves its pinned
      // position and the rail has nothing to sit under. Rather than let it hang
      // from a bar that is halfway down the page, it folds itself away and the
      // strip is waiting when you come back down. Collapsing is cheap because
      // the panel is never unmounted, so nothing is lost by it.
      if (openRef.current && bottom > pinnedBottom(shell) + 1) setRail("min");
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    // Opening the rail narrows the page, which reflows the hero and moves the
    // bar even though nothing scrolled.
    const ro = new ResizeObserver(sync);
    ro.observe(shell);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      ro.disconnect();
    };
  }, []);
  const railOpen = rail === "open";
  const [railCount, setRailCount] = useState(0);
  // Working the rail itself is a fresh start: the panel comes back showing
  // everything rather than whatever narrowing was left behind last time.
  // Arriving from a campaign card is the exception, since that click is a
  // request for one particular slice.
  const [railReset, setRailReset] = useState(0);
  const openRailClean = () => {
    setStance("all");
    setAccountType("all");
    setRailReset((n) => n + 1);
    setRail("open");
  };
  const collapseRail = () => {
    setStance("all");
    setAccountType("all");
    setRailReset((n) => n + 1);
    setRail("min");
  };
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

  return (
    <SourcesProvider value={SOURCES}>
      <div
        ref={shellRef}
        className={`bg-ground min-h-screen font-body text-ink overflow-x-clip [--drawer-w:clamp(400px,34vw,520px)] [--rail-tab-w:44px] [--page-gutter:calc((100vw-min(1180px,100vw))/2+32px)] [--page-right:calc((100vw-min(1180px,100vw))/2+1180px)] [--subnav-h:46px] ${
          rail === "open"
            ? "lg:[--fab-r:calc(var(--drawer-w)+24px)]"
            : "lg:[--fab-r:calc(var(--rail-tab-w)+24px)]"
        }`}>
        {/* Outside the region the drawer pushes, so it spans the window and
            its own contents stay put. The nav is chrome over the whole
            application; the page is what the drawer takes room from. */}
        <SiteNav />
        {/* The hero and the contents bar sit above where the rail begins, so
            they keep the whole window and stay centred in it. Only what is
            level with the rail moves over. */}
        <Brief />
        <Contents active={active} />
        {/* The chapters move rather than being covered: the margin is what does
            the pushing, the transform is what does the sliding, and the two run
            on the same 300ms so the panel and the page arrive together. */}
        <div
          className={`transition-[margin] duration-300 ease-out motion-reduce:transition-none ${
            rail === "open"
              ? "lg:mr-[var(--drawer-w)] lg:[--page-w:calc(100vw-var(--drawer-w))]"
              : "lg:mr-[var(--rail-tab-w)] lg:[--page-w:calc(100vw-var(--rail-tab-w))]"
          }`}
        >
        {/* With the rail open the region is narrower than the page's own
            measure, so re-centring in it would pull the chapters left of the
            nav and the contents bar, which still have the whole window. The
            left edge is held at the window's own gutter instead, so the
            chapters stay in line with the chrome above them and the rail simply
            takes width off the right. */}
        <main className="mx-auto max-w-[1180px] px-[20px] sm:px-[32px] pt-[36px] sm:pt-[48px] pb-[80px] flex flex-col gap-[44px] sm:gap-[64px] lg:mx-0 lg:max-w-[var(--page-right)] lg:pl-[var(--page-gutter)] lg:pr-[32px]">
          <WhatWouldItChange />
          <WhatEachSideSays
            railStance={railOpen ? stance : null}
            onViewTestimony={(side) => {
              // "Endorsing Orgs" means both halves of that phrase: the side and
              // the kind of account, so the drawer opens on exactly the list
              // the card was showing.
              setStance(side);
              setAccountType("organization");
              setRail("open");
            }}
          />
          {/* Parked: the agreement material moved into WhatEachSideSays,
              where it reads as the second half of that chapter's answer.
          <WhereTheyAgree />
          */}
          {/* Parked: the feed now lives in the Public Perspectives rail, so the
              chapter was the same list a second time.
          <WhatPeopleAreSaying
            filter={stance}
            onFilterChange={setStance}
            typeFilter={accountType}
            onTypeFilterChange={setAccountType}
          />
          */}
          {/* Parked: both now appear as disclosures inside "What would it
              change?", so as chapters they said the same thing a second time.
          <WhoItAffects />
          <WhatItCosts />
          */}
          {/* Parked: the roster of who has filed, by side. The campaign cards
              now carry the same coalition, and the testimony chapter carries the
              statements, so it was saying both a second time. `WhoIsOnTheRecord`
              is still exported from ./chapters. */}
          {/* Parked: what the discussions produced is the subject of the new
              chapter below, which will carry the explorer when it exists.
          <FromTheDiscussions />
          */}
          <WhatIsThePublicSaying onOpenRail={openRailClean} />
          <HowItGotHere />
          <WhoIsFunding />
          <WhereThisComesFrom />
        </main>
        </div>
        {/* Pinned to the bottom: the note has to stay visible without being
            the first thing on the page, and a footer that scrolls away is a
            note most readers never reach. */}
      {/* Pinned to the window under the nav, its own scroller, always mounted
          and parked off the right edge so the feed keeps its place between
          openings. Below lg there is no width to give up, so it stays away. */}
      <aside
        aria-label="Public Perspectives"
        aria-hidden={!railOpen}
        className={`hidden lg:flex fixed right-0 top-[var(--rail-top,calc(var(--nav-h)+var(--subnav-h)+2px))] bottom-0 z-40 w-[var(--drawer-w)] flex-col bg-ground border-l border-line transition-transform duration-300 ease-out motion-reduce:transition-none ${
          railOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="shrink-0 flex items-center justify-between gap-[12px] px-[18px] pt-[24px] pb-[4px]">
          <p className="font-display font-medium text-lg text-ink">Public Perspectives</p>
          <button
            onClick={collapseRail}
            aria-label="Collapse public perspectives"
            title="Collapse"
            className="shrink-0 -mr-[6px] p-[6px] rounded-control text-ink-muted hover:text-ink hover:bg-wash cursor-pointer transition-colors"
          >
            <ChevronsRight className="w-[18px] h-[18px]" />
          </button>
        </header>
        {/* Opened at the side and the account type the card was showing, and
            both stay live: arriving on a view is not the same as being held
            there. */}
        <div className="flex-1 overflow-y-auto px-[18px] pb-[22px] [--pinned-h:0px]">
          <TestimonyFeed
            filter={stance}
            onFilterChange={setStance}
            typeFilter={accountType}
            onTypeFilterChange={setAccountType}
            hideAddButton
            items={testimonyFor(() => true)}
            stickyTop="var(--pinned-h)"
            includeFollowingFilter
            includeTypeFilter
            asCards
            onCountChange={setRailCount}
            resetSignal={railReset}
          />
        </div>
      </aside>
      {/* The panel folded to its edge. Same top, same bottom, same left border,
          so it reads as the drawer standing on end rather than as a new piece
          of furniture. The count is the reason it is worth keeping on screen:
          a bare handle is a button, a handle that says 9 says the filters are
          still set and there is something behind it.

          It never moves. It sits a layer below the panel and the panel slides
          over it, so opening covers it and closing uncovers it. Sliding both at
          once meant two things crossing in the same strip of screen, which is
          what made the transition read as a scramble. */}
      <button
        onClick={openRailClean}
        aria-label={`Show public perspectives, ${railCount} matching`}
        title="Show public perspectives"
        aria-hidden={rail === "open"}
        tabIndex={rail === "open" ? -1 : 0}
        className="hidden lg:flex fixed right-0 top-[var(--rail-top,calc(var(--nav-h)+var(--subnav-h)+2px))] bottom-0 z-30 w-[var(--rail-tab-w)] flex-col items-center gap-[14px] pt-[13px] bg-ground border-l border-line text-ink-muted hover:text-ink hover:bg-wash cursor-pointer transition-colors"
      >
        <ChevronsLeft className="shrink-0 w-[18px] h-[18px]" />
        <span className="font-display font-medium text-sm tracking-[0.02em] text-ink [writing-mode:vertical-rl]">
          Public Perspectives
        </span>
        <span className="font-body font-semibold text-xs text-ink-muted [writing-mode:vertical-rl]">
          {railCount}
        </span>
      </button>
      <MapleFab open={askOpen} onOpenChange={setAskOpen} />
      </div>

    </SourcesProvider>
  );
}

export default TaxRebate62FAlt;
