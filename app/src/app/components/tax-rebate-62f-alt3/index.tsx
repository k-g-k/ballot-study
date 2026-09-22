import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  ArrowUpRight,
  Plus,
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
import { Callout, Disclosure, Segments, Split, Synth } from "./spine";
import {
  WhatItDoes,
  WhatPeopleArgue,
  WhatDidTheLegislatureSay,
  HowItGotHere,
  WhoIsFunding,
  VoterGuides,
  Sources,
} from "./sections";
import {
  SUMMARY,
  WHAT_YOUR_VOTE_DOES,
} from "../../data/tax-rebate-62f/official-2026";
import { WhatIsThePublicSaying } from "./public-saying";
import { COMPOSE_PATH } from "./compose";
import { Rail } from "./rail";
import {
  ComposeActions,
  ComposeFields,
  ComposeGuidance,
} from "../tax-rebate-62f/testimony";
import type { TestimonyStance } from "../../data/tax-rebate-62f";

// The Grace page's five sections, in its order. "The question" is the hero
// rather than a chapter, so it has no anchor of its own.
// The Legislature's chapter has no entry. It is there to be scrolled past on
// the way to the public, not chosen from a bar, and giving a committee's
// procedural record its own tab put it on the same footing as the campaigns
// and the people.
/**
 * The panel's default width, as three numbers rather than one CSS string, so
 * the stylesheet and the drag handler cannot disagree about it. CSS gets the
 * clamp built from these; the drag handler computes the same value to use as
 * its floor.
 */
const DRAWER_MIN = 400;
const DRAWER_VW = 0.34;
const DRAWER_MAX = 520;
const drawerWidth = () =>
  Math.min(Math.max(DRAWER_MIN, DRAWER_VW * window.innerWidth), DRAWER_MAX);

/**
 * The largest share of the window the rail may be dragged to. Past this the
 * page is the smaller half of its own screen, which is the point at which the
 * modal is the honest way to read the feed in full.
 */
const RAIL_MAX_SHARE = 0.6;

/**
 * The share of the window at which the page stops holding the nav's gutter and
 * slides left into it. Below this the alignment is worth more than the space;
 * above it the reverse.
 */
const RAIL_GUTTER_DROP = 0.4;

const CONTENTS = [
  { id: "what-it-does", label: "Overview" },
  { id: "arguments", label: "Arguments" },
  { id: "public", label: "What the public is saying" },
  { id: "history", label: "News" },
  { id: "funding", label: "Funding" },
  { id: "guides", label: "Voter Guides" },
  { id: "sources", label: "Sources" },
];

/** The bill on MAPLE itself, where the filed text and its testimony live. */

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
/**
 * One outcome of the vote: what it means in the page's words, with the state's
 * words a click away.
 *
 * The plain sentence is what a reader needs to decide, and the statutory one is
 * what they need to check. Leading with the official text made the card a
 * quotation you had to parse; leading with ours makes it an answer, and the
 * disclosure keeps the source honest rather than merely cited. The official
 * text sits inside the blue rule this page uses for the state's own words,
 * with the note about who writes it, so nothing inside the card claims an
 * authorship it does not have.
 */
/**
 * One outcome of the vote: what it means in the page's words, with the state's
 * words a click away.
 *
 * The plain sentence is what a reader needs to decide, and the statutory one is
 * what they need to check. Leading with the official text made the card a
 * quotation you had to parse; leading with ours makes it an answer, and the
 * disclosure keeps the source honest rather than merely cited. The official
 * text sits inside the blue rule this page uses for the state's own words,
 * with the note about who writes it, so nothing inside the card claims an
 * authorship it does not have.
 */
function VoteOutcome({ side }: { side: "yes" | "no" }) {
  const d = side === "yes" ? RC.overviewVotes.yes : RC.overviewVotes.no;
  const official =
    side === "yes"
      ? WHAT_YOUR_VOTE_DOES.yesTrimmed
      : WHAT_YOUR_VOTE_DOES.noTrimmed;
  return (
    <div>
      <p className="font-body text-lg sm:text-xl text-ink leading-[1.5] text-pretty">
        {d.summary}
      </p>
      <div className="mt-[16px]">
        <Disclosure label="View full official text">
          <div className="border-l-2 border-official pl-[16px]">
            <p className="font-body text-base text-ink leading-[1.65]">
              {official}
            </p>
          </div>
          <p className="font-body text-xs text-ink-muted leading-[1.6] mt-[10px]">
            {WHAT_YOUR_VOTE_DOES.provenance}
          </p>
        </Disclosure>
      </div>
    </div>
  );
}

function Brief() {
  return (
    // A container, so the title can size itself against the column it is
    // actually in rather than against the window. The rail takes a third of the
    // page and the window has no idea.
    <div className="@container mx-auto max-w-[1180px] px-[20px] sm:px-[32px] pt-[48px] sm:pt-[72px] pb-[56px] sm:pb-[76px] lg:mx-0 lg:max-w-[var(--page-right)] lg:pl-[var(--page-gutter)] lg:pr-[32px]">
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
      {/* Number and title at one size. They are two halves of the same name,
          and setting the number larger made it the headline and the title its
          caption, which is backwards: the title is the part that says what the
          question is about. */}
      {/* Two sizes, not a scale, measured against this column rather than the
          window: the window has no idea the rail took a third of the page.
          Below 980 it settles at 36px and stays there. The rail cannot be
          dragged narrow enough to need a third size, and shrinking the hero
          further as a reader widens a panel makes the page look like it is
          retreating. */}
      <h1 className="font-display font-medium text-3xl @[980px]:text-[48px] leading-[1.15] tracking-display text-ink mt-[30px] text-balance">
        Question {RC.number}
        {/* A separator, not punctuation: the two halves are a number and a
            name, and a middle dot joins them without implying one describes the
            other. It can break here if the window is narrow enough, which is
            the one place the line is allowed to wrap. */}
        <span aria-hidden className="text-ink-faint">
          {" · "}
        </span>
        {RC.title}
      </h1>
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
                // The same container and the same thresholds as the title, so
                // the two change size together rather than one drifting ahead
                // of the other.
                className="font-body text-xl @[980px]:text-[26px] @[980px]:leading-[1.45] leading-[1.4] text-ink text-pretty"
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
      {/* The Attorney General's summary, opened in place rather than linked
          out. The synthesis above is this page's reading of the measure, so the
          official one belongs directly under it where the two can be compared,
          not at the end of a click into a PDF. Same control the committee
          reports use, so "the official words, if you want them" looks the same
          wherever the page offers it. The bill itself moved to the legislative
          chapter, next to the hearing it went through. */}
      <div className="mt-[26px] ml-[6px]">
        <Disclosure label="View full official text">
          <p className="font-body text-xs text-ink-muted leading-[1.6] mb-[14px]">
            {SUMMARY.provenance}
          </p>
          <div className="flex flex-col gap-[12px] border-l-2 border-official pl-[16px] sm:pl-[20px] max-w-[74ch]">
            {SUMMARY.paragraphs.map((t) => (
              <p key={t} className="font-body text-base text-ink leading-[1.7]">
                {t}
              </p>
            ))}
          </div>
          <a
            href={SOURCES.agSummary.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[4px] mt-[14px] font-body font-semibold text-sm underline decoration-dotted underline-offset-[4px] text-official-ink hover:text-official"
          >
            Read it on mass.gov
            <ArrowUpRight className="w-[13px] h-[13px] no-underline" />
          </a>
        </Disclosure>
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
          left={<VoteOutcome side="yes" />}
          right={<VoteOutcome side="no" />}
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
      className="sticky top-0 lg:top-[calc(var(--nav-h)+1px)] z-20 bg-ground/95 backdrop-blur border-b border-line lg:mr-[var(--taken-w)] transition-[margin] duration-300 ease-out motion-reduce:transition-none [[data-resizing]_&]:transition-none"
    >
      {/* Same left edge as the nav, measured against the whole window. Left to
          centre itself it would centre inside what the rail leaves and drift
          left of MAPLE by half the rail's width. */}
      <div className="mx-auto max-w-[1180px] px-[20px] sm:px-[32px] lg:mx-0 lg:max-w-[var(--page-right)] lg:pl-[var(--page-gutter)] lg:pr-[32px]">
        <div className="flex items-stretch gap-[18px] sm:gap-[22px] h-[var(--subnav-h)] overflow-x-auto scrollbar-hide">
          {CONTENTS.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              // Scrolled rather than jumped. A jump to a chapter halfway down
              // the page leaves the reader working out where they landed;
              // travelling there shows them. The href is kept, so the URL still
              // carries the anchor and a middle-click still opens it, and the
              // preventDefault only applies when this actually finds the target
              // and honours a reduced-motion preference.
              onClick={(e) => {
                if (
                  window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ) {
                  return;
                }
                const target = document.getElementById(c.id);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                history.replaceState(null, "", `#${c.id}`);
              }}
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

export function TaxRebate62FAlt3() {
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
  // The rail hangs off the nav, which at lg is sticky at the top and never
  // moves. That is the whole reason this page no longer measures anything: an
  // earlier version hung it off the contents bar, which sits below the hero
  // until you scroll past it, and every awkward thing about the rail came from
  // chasing that. No scroll handler, no ResizeObserver, no folding itself away
  // when you scroll back up, and no scrolling the page into position first,
  // because there is no position to get into.
  const railOpen = rail === "open";
  const [railCount, setRailCount] = useState(0);
  const [railFiltered, setRailFiltered] = useState(false);
  // The in-page feed's filters, held here rather than inside the feed so the
  // page can address them later if it needs to. Nothing connects them to the
  // rail's: the two read the same record and narrow it separately, so a filter
  // set in a panel never rewrites a section of the page you are not looking
  // at.
  const [pageStance, setPageStance] = useState<StanceFilter>("all");
  const [pageType, setPageType] = useState<TypeFilter>("all");

  // The panel's expanded setting. Three widths on one axis: the strip, the
  // panel, and nearly the whole window.
  //
  // Nearly, not entirely. Enough of the page is left showing on the left to
  // read a few words of it, which is the difference between a panel sitting
  // over a page and a screen you have navigated to: you can still see what you
  // were reading, and it is an obvious place to click to get back to it. At
  // this width it overlays rather than
  // pushing: shoving the document a whole viewport sideways would re-lay-out
  // all of it to put it where nobody can see, then do it again coming back.
  // A width the reader dragged to, or null for whatever the presets say.
  //
  // Written straight to the DOM rather than held in state: a drag fires on
  // every frame, and re-rendering the page that often to move one edge is a
  // lot of work for a number that only ever lands in two CSS variables.
  // Inline styles beat the class ternaries, so clearing them falls back to the
  // presets with nothing to undo.
  const shellRef = useRef<HTMLDivElement>(null);
  // What the reader dragged the panel to, remembered so collapsing and
  // reopening returns to it rather than snapping back to the default.
  const railWidthRef = useRef<number | null>(null);

  /** Write the dragged width to the DOM, or clear it and fall back to the presets. */
  const applyRailWidth = (px: number | null) => {
    const el = shellRef.current;
    if (!el) return;
    if (px === null) {
      // Inline styles beat the class ternaries, which is what makes a dragged
      // width stick. Collapsing has to remove them or the page keeps the
      // margin it had while the panel was open.
      el.style.removeProperty("--rail-w");
      el.style.removeProperty("--taken-w");
      return;
    }
    el.style.setProperty("--rail-w", `${px}px`);
    el.style.setProperty("--taken-w", `${px}px`);
  };

  const setRailWidth = (px: number | null) => {
    const el = shellRef.current;
    if (!el) return;
    if (px === null) {
      railWidthRef.current = null;
      applyRailWidth(null);
      el.removeAttribute("data-resizing");
      return;
    }
    // Never narrower than the default, because dragging it smaller would leave
    // the reader somewhere the collapse control already goes, more slowly. And
    // never past its share of the window, because the feed has a surface of its
    // own for that.
    const w = Math.round(
      Math.min(
        Math.max(px, drawerWidth()),
        RAIL_MAX_SHARE * window.innerWidth,
      ),
    );
    // The page's margin animates on 300ms, which lags a pixel behind the
    // pointer. The flag sits on the shell and the transitions are switched off
    // from it by descendant selector, so one attribute covers every element
    // that moves.
    el.dataset.resizing = "true";
    railWidthRef.current = w;
    applyRailWidth(w);
  };

  /** Drag over: the width stays, the "do not animate" flag does not. */
  const endRailResize = () => shellRef.current?.removeAttribute("data-resizing");
  // Working the rail itself is a fresh start: the panel comes back showing
  // everything rather than whatever narrowing was left behind last time.
  // Arriving from a campaign card is the exception, since that click is a
  // request for one particular slice.
  const [railReset, setRailReset] = useState(0);
  // Which view the rail is showing. The rail itself decides what controls that
  // earns; the page only says what is in it.
  const [railView, setRailView] = useState("perspectives");
  const [composeStance, setComposeStance] = useState<TestimonyStance>("endorse");
  const openRailClean = () => {
    clearRailFilters();
    applyRailWidth(railWidthRef.current);
    setRailView("perspectives");
    setRail("open");
  };
  /** Everything the feed narrows by, back to all. */
  const clearRailFilters = () => {
    setStance("all");
    setAccountType("all");
    // Following is the feed's own, so it takes a signal rather than a setter.
    setRailReset((n) => n + 1);
  };

  const collapseRail = () => {
    clearRailFilters();
    // The strip has one width, so the dragged one has to come off or the page
    // stays pushed over by a panel that is no longer there.
    applyRailWidth(null);
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
        style={
          {
            "--drawer-w": `clamp(${DRAWER_MIN}px, ${DRAWER_VW * 100}vw, ${DRAWER_MAX}px)`,

            // The page's left edge holds the nav's own gutter, so the content
            // stays in line with MAPLE however much the rail takes. Past the
            // point where the rail has a large share of the window that stops
            // being generous and starts being a wasted column, so the gutter
            // releases and the content slides left into it.
            //
            // A step, not a slide: `--rail-share` is positive while the rail is
            // under its share and negative past it, and multiplying it by a
            // large number turns that sign into a switch min() and max() can
            // read. CSS has no conditional on a variable's value, and this is
            // the arithmetic that stands in for one.
            "--rail-share": `calc((${RAIL_GUTTER_DROP * 100}vw - var(--taken-w, 0px)) * 1000)`,
            "--page-gutter":
              "max(32px, min(calc((100vw - min(1180px, 100vw)) / 2 + 32px), var(--rail-share)))",
            "--page-right":
              "min(100vw, max(calc((100vw - min(1180px, 100vw)) / 2 + 1180px), calc(-1 * var(--rail-share))))",
          } as CSSProperties
        }
        // Three widths, derived rather than repeated.
        //
        //   --rail-w    what Public Perspectives is taking: the strip, or the
        //               panel when it is open.
        //   --taken-w   what the page gives up altogether: the rail, plus the
        //               composer beside it when that is open.
        //   --fab-r     where the floating buttons sit, always just inside
        //               whatever is taken.
        //
        // --fab-r used to be set in two branches, and when both applied CSS
        // source order picked the winner rather than the page doing so. It is
        // computed from --taken-w now, so there is one place it can be wrong.
        className={`bg-ground min-h-screen font-body text-ink overflow-x-clip [--rail-tab-w:44px] [--compose-w:clamp(360px,30vw,460px)] lg:[--fab-r:calc(var(--taken-w)+24px)] [--subnav-h:46px] ${
          // Each token declared exactly once. Two classes setting the same
          // custom property on one element have equal specificity, so which
          // wins is decided by the order Tailwind happened to emit them, not by
          // the branch taken here. A ternary that produces one class or the
          // other cannot go wrong that way.
          // Two widths, and they are not the same thing.
          //
          //   --rail-w    how wide the panel draws.
          //   --taken-w   how much room the page gives up for it.
          //
          // They match at the strip and at the panel's normal width, which is
          // why the page moves aside rather than being covered. At full width
          // they part: the panel draws over everything and the page keeps the
          // layout it had. Pushing the page off by a whole viewport would
          // re-lay-out the whole document to put it somewhere nobody can see,
          // and do it again on the way back. Overlaying leaves the page exactly
          // as it was, so closing returns you to it rather than to a rebuild.
          rail !== "open"
            ? "lg:[--rail-w:var(--rail-tab-w)] lg:[--taken-w:var(--rail-tab-w)]"
            : "lg:[--rail-w:var(--drawer-w)] lg:[--taken-w:var(--drawer-w)]"
        }`}
      >
        {/* Outside the region the drawer pushes, so it spans the window and
            its own contents stay put. The nav is chrome over the whole
            application; the page is what the drawer takes room from. */}
        <SiteNav />
        {/* Everything below the nav gives up the rail's width, permanently.
            The strip is always there, so the page is laid out around it rather
            than being pushed aside when it opens: only the amount changes.
            The nav itself keeps the whole window, because the rail hangs from
            it rather than beside it. */}
        {/* The hero and the contents bar sit above where the rail begins, so
            they keep the whole window and stay centred in it. Only what is
            level with the rail moves over. */}
        <div className="lg:mr-[var(--taken-w)] transition-[margin] duration-300 ease-out motion-reduce:transition-none [[data-resizing]_&]:transition-none">
          <Brief />
        </div>
        <Contents active={active} />
        {/* The chapters move rather than being covered: the margin is what does
            the pushing, the transform is what does the sliding, and the two run
            on the same 300ms so the panel and the page arrive together. */}
        <div
          className="lg:mr-[var(--taken-w)] lg:[--page-w:calc(100vw-var(--taken-w))] transition-[margin] duration-300 ease-out motion-reduce:transition-none [[data-resizing]_&]:transition-none"
        >
        {/* The left edge is the nav's own gutter, measured against the whole
            window, and it never moves. Centring in what the rail leaves would
            drift the content left of MAPLE by half the rail's width, and since
            the rail is now always there that drift would be permanent. The
            right edge is what gives way: capped at the nav's right edge while
            there is room, and simply narrower once the rail takes more than
            that. */}
        <main className="mx-auto max-w-[1180px] px-[20px] sm:px-[32px] pt-[36px] sm:pt-[48px] pb-[80px] flex flex-col gap-[44px] sm:gap-[64px] lg:mx-0 lg:max-w-[var(--page-right)] lg:pl-[var(--page-gutter)] lg:pr-[32px]">
          <WhatItDoes />
          <WhatPeopleArgue
            railStance={railOpen ? stance : null}
            onViewTestimony={(side) => {
              // "Endorsing Orgs" means both halves of that phrase: the side and
              // the kind of account, so the drawer opens on exactly the list
              // the card was showing.
              setStance(side);
              setAccountType("organization");
              setRailView("perspectives");
              setRail("open");
            }}
          />
          <WhatDidTheLegislatureSay />
          {/* The Grace page runs the feed and the discussions here; this page
              keeps testimony in the rail and gives the section the map of where
              it came from instead, as alt 2 does. */}
          <WhatIsThePublicSaying
            onOpenRail={openRailClean}
            feedFilter={pageStance}
            onFeedFilterChange={setPageStance}
            feedType={pageType}
            onFeedTypeChange={setPageType}
          />
          <HowItGotHere />
          <WhoIsFunding />
          <VoterGuides />
          <Sources />
        </main>
        </div>
        {/* Pinned to the bottom: the note has to stay visible without being
            the first thing on the page, and a footer that scrolls away is a
            note most readers never reach. */}
      {/* One rail, two views. Public Perspectives is the default, so it is
          what the strip names and the only view that offers minimize; anything
          else that opens here gets an X and hands the rail back when it is
          dismissed. */}
      <Rail
        views={[
          {
            id: "perspectives",
            title: "Public Perspectives",
            // Only when something is actually narrowing the list, and the feed
            // is what says so: Following lives inside it, and a page holding
            // the stance and type filters alone would think the list was
            // unfiltered while it was not.
            action: railFiltered ? (
              <button
                onClick={clearRailFilters}
                className="shrink-0 font-body font-semibold text-xs text-brand-ink hover:text-brand cursor-pointer"
              >
                Clear filters
              </button>
            ) : undefined,
            content: (
              <div className="flex-1 min-h-0 overflow-y-auto px-[var(--rail-pad,18px)] pb-[22px] [--pinned-h:0px]">
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
            onFilteredChange={setRailFiltered}
                          resetSignal={railReset}
                        />
                      </div>
            ),
          },
          {
            id: "compose",
            title: "Add Your Perspective",
            // White, because the form is one object rather than a set of cards
            // on a page. On the ground colour the fields sat in a white card
            // inside a grey panel, which is a container around a container.
            surface: "bg-surface",
            // Beside the title, because it opens this form somewhere else
            // rather than doing something to the panel. A narrow column is fine
            // for a paragraph and tight for an argument, and the page is the
            // same form with room.
            action: (
              <a
                href={COMPOSE_PATH}
                target="_blank"
                rel="noopener noreferrer"
                // The form moves to the new tab, so it stops being here.
                // Leaving it open behind would give the reader two copies of
                // one draft and no way to tell which one they are writing in.
                onClick={() => setRailView("perspectives")}
                aria-label="Open in new tab"
                title="Open in new tab"
                className="shrink-0 -ml-[4px] p-[6px] rounded-control text-ink-muted hover:text-ink hover:bg-wash cursor-pointer transition-colors"
              >
                <ArrowUpRight className="w-[16px] h-[16px]" />
              </a>
            ),
            content: (
              // Exactly the panel's height, so the panel never scrolls. The
              // textarea takes whatever is left, which makes the only scroll
              // on screen the thing you are writing.
              <div className="flex-1 min-h-0 flex flex-col gap-[16px] px-[var(--rail-pad,18px)] pt-[12px] pb-[22px]">
                {/* The one grey block on a white panel: the rules of the road
                    are the page talking, and the rest of this is you. */}
                <div className="shrink-0 bg-sunken rounded-control p-[16px]">
                  <ComposeGuidance compact />
                </div>
                <ComposeFields
                  stance={composeStance}
                  onStanceChange={setComposeStance}
                  grow
                  bare
                />
                <div className="shrink-0">
                  <ComposeActions onCancel={() => setRailView("perspectives")} />
                </div>
              </div>
            ),
          },
        ]}
        view={railView}
        onViewChange={setRailView}
        open={rail === "open"}
        // Opening and collapsing both start clean. A panel that comes back
        // holding a narrowing you set minutes ago, on a view you have since
        // scrolled away from, is a filter you cannot see the cause of.
        onOpenChange={(o) => (o ? openRailClean() : collapseRail())}
        onAdd={() => setRailView("compose")}
        addLabel="Add your perspective"
        onResize={setRailWidth}
        onResizeEnd={endRailResize}
        count={railCount}
      />

      {/* One row, anchored to the corner: the leaf, then adding a perspective.
          A row rather than two fixed buttons, so when the plus opens into its
          label the leaf is pushed along by it instead of being covered.

          The plus opens the rail as well as the composer, because writing about
          a question while its existing perspectives are hidden is the wrong way
          round. The row's --fab-r keeps both clear of the rail. */}
      <div className="fixed bottom-[24px] right-[var(--fab-r,24px)] z-50 flex items-center gap-[12px] transition-[right] duration-300 ease-out motion-reduce:transition-none">
        <MapleFab inline open={askOpen} onOpenChange={setAskOpen} />
        <button
          onClick={() => {
            setRailView("compose");
            setRail("open");
          }}
          aria-label="Add your perspective"
          className="group hidden lg:inline-flex items-center h-[52px] px-[16px] rounded-pill border border-brand bg-brand text-ink-inverse hover:bg-brand-hover hover:border-brand-hover cursor-pointer transition-colors"
        >
          <Plus className="w-[22px] h-[22px] shrink-0" />
          <span className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] transition-[grid-template-columns] duration-300 ease-out motion-reduce:transition-none">
            <span className="overflow-hidden">
              <span className="block pl-[10px] pr-[2px] font-body font-semibold text-sm whitespace-nowrap">
                Add your perspective
              </span>
            </span>
          </span>
        </button>
      </div>
      </div>

    </SourcesProvider>
  );
}

export default TaxRebate62FAlt3;
