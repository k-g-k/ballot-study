// BQ3 — the Chapter 62F reform ballot-question deep-dive page.
//
// This file is only the SHELL: top nav, sticky hero, and the section rail with
// its source-type legend. The page itself is one scroll: chapters live in
// ./sections/*.tsx, each composing cards from ./cards/ and the ../ballot
// library, fed by ../../data/tax-rebate-62f.
//
// Depth is the axis rather than breadth. Every section leads with its
// plain-language answer and descends into the evidence for it, so a reader who
// stops early has still been told something true. The rail's one control
// collapses every section to that answer.
//
// Wrapped in <SourcesProvider> so citations resolve ids against this question's
// sources. Parallels src/app/components/rent-control-alt/index.tsx.

import { useState, useRef, useEffect } from "react";
import { X, Bell, BellRing, BellPlus, BellOff, Share } from "lucide-react";
import { MapleTopNav, PageHeading } from "../maple-shared";
import {
  SourcesProvider,
  SectionRail,
  useActiveSection,
  DepthProvider,
  type DepthMode,
  KIND_DOT,
  type SrcKind,
} from "../ballot";
import { RC, SOURCES } from "../../data/tax-rebate-62f";
import { SECTIONS } from "./sections";

const SECTION_IDS = SECTIONS.map((s) => s.id);
import type { StanceFilter } from "./testimony";
import { TheQuestionSection } from "./sections/TheQuestion";
import { WhatItDoesSection } from "./sections/WhatItDoes";
import { ArgumentsSection } from "./sections/Arguments";
import { TestimonySection } from "./sections/Testimony";
import { TheRecordSection } from "./sections/TheRecord";
import { MapleFab, ASK_DELAY_MS } from "./maple-fab";

export function TaxRebate62FPage() {
  const [mode, setMode] = useState<DepthMode>("full");
  const [noticeOpen, setNoticeOpen] = useState(true);
  const [following, setFollowing] = useState(false);
  // Raised by the floating leaf and by the Ask Maple card on Bibliography.
  const [askOpen, setAskOpen] = useState(false);
  const [askNudge, setAskNudge] = useState(0);
  const askTimer = useRef<number | null>(null);

  // Asking from the Bibliography card waves the leaf first, then toggles the
  // panel, so the eye is already at the corner when it opens or shuts.
  const askMaple = () => {
    setAskNudge((n) => n + 1);
    if (askTimer.current) window.clearTimeout(askTimer.current);
    askTimer.current = window.setTimeout(
      () => setAskOpen((o) => !o),
      ASK_DELAY_MS,
    );
  };
  useEffect(
    () => () => {
      if (askTimer.current) window.clearTimeout(askTimer.current);
    },
    [],
  );
  // Set by the vote cards' "View testimony", which scrolls to the feed with
  // that side already selected.
  const [orgFilter, setOrgFilter] = useState<StanceFilter>("all");
  // The hero's two calls to action both land in the testimony chapter. Writing
  // deliberately stops at the feed rather than opening the form: seeing what
  // others submitted, and how, is the better thing to meet first.
  const discussionsRef = useRef<HTMLDivElement>(null);
  const openTestimony = () => jumpTo("testimony");
  const openDiscussions = () => {
    discussionsRef.current?.scrollIntoView({ block: "start" });
  };
  const heroRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // Two measurements, because two things pin and they nest.
  //
  // --hero-h is the hero alone, which is where the rail pins: directly under it
  // at every width, beside the content when wide and above it when narrow.
  //
  // --pinned-h is the whole pinned stack. Card headers, the testimony filter
  // bar, and every section anchor offset against it. Wide, the rail sits beside
  // the content, so the stack is just the hero. Narrow, it sits above and counts
  // too, and anything pinned at --hero-h would slide under the strip.
  //
  // Set on the root rather than the column so useActiveSection can read them
  // back; inheritance still carries them to every consumer below.
  //
  // Both boxes change height with window width, hence an observer on each.
  useEffect(() => {
    const hero = heroRef.current;
    const rail = railRef.current;
    if (!hero || !rail) return;
    const root = document.documentElement;
    const wide = window.matchMedia("(min-width: 950px)");
    const measure = () => {
      const heroH = hero.offsetHeight;
      root.style.setProperty("--hero-h", `${heroH}px`);
      root.style.setProperty(
        "--pinned-h",
        `${wide.matches ? heroH : heroH + rail.offsetHeight}px`,
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(hero);
    observer.observe(rail);
    wide.addEventListener("change", measure);
    return () => {
      observer.disconnect();
      wide.removeEventListener("change", measure);
    };
  }, []);

  // The rail marks whichever section has passed the pinned stack.
  const activeSection = useActiveSection(SECTION_IDS);

  // Jumping is a scroll rather than a swap, so the reader keeps their place in
  // the page and the back button stays untouched. Anchors carry their own
  // scroll-margin for the pinned hero and rail.
  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  };

  return (
    <SourcesProvider value={SOURCES}>
      <div className="bg-ground min-h-screen">
        <div className="relative">
          <MapleTopNav />
          {noticeOpen && (
            <div className="absolute top-0  inset-0 z-30 flex items-center justify-center px-6 pointer-events-none">
              <div className="pointer-events-auto inline-flex items-start gap-[8px] rounded-control px-[14px] py-[10px] bg-caution-soft/95 border border-caution shadow-[0_6px_18px_rgba(0,0,0,0.16)]">
                <span className="text-lg leading-none">⚠️</span>
                <p className="font-body text-sm leading-[1.5] text-caution-ink max-w-[900px]">
                  <span className="font-semibold">Design prototype.</span> This page
                  is a design prototype for demonstration only. Content,
                  testimony, positions, citations, and AI syntheses are
                  illustrative only.
                </p>
                <button
                  onClick={() => setNoticeOpen(false)}
                  aria-label="Dismiss notice"
                  className="shrink-0 mt-[1px] text-caution-ink hover:text-ink cursor-pointer"
                >
                  <X className="w-[15px] h-[15px]" />
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Page-level utilities sit with the title rather than in Take part:
            these act on the question as a record, not on the debate. */}
        <div className="max-w-[1200px] w-full mx-auto pt-[24px] px-6 flex items-center justify-between gap-[16px]">
          <PageHeading>Ballot Question 5 (2026)</PageHeading>
          <div className="shrink-0 flex items-center gap-[18px]">
            <button
              onClick={() => setFollowing((f) => !f)}
              aria-pressed={following}
              className={`group inline-flex items-center gap-[6px] font-body font-semibold text-sm cursor-pointer hover:text-alert ${
                following ? "text-ink-muted" : "text-brand"
              }`}
            >
              {/* Gains motion lines once following, and steps back to grey:
                  before, it is asking to be pressed; after, it is only
                  reporting a state. On hover each swaps to the sign of what a
                  click would do, so the outcome is shown before it happens. */}
              {following ? (
                <>
                  <BellRing className="w-[15px] h-[15px] group-hover:hidden" />
                  <BellOff className="w-[15px] h-[15px] hidden group-hover:block" />
                </>
              ) : (
                <>
                  <Bell className="w-[15px] h-[15px] group-hover:hidden" />
                  <BellPlus className="w-[15px] h-[15px] hidden group-hover:block" />
                </>
              )}
              {/* Two labels stacked, swapped by the same hover as the icon, so
                  the word and the sign always agree. */}
              {following ? (
                <>
                  <span className="group-hover:hidden">Following</span>
                  <span className="hidden group-hover:inline">Unfollow</span>
                </>
              ) : (
                "Follow"
              )}
            </button>
            <button className="inline-flex items-center gap-[6px] font-body font-semibold text-sm text-brand hover:text-alert cursor-pointer">
              <Share className="w-[15px] h-[15px]" />
              Share
            </button>
          </div>
        </div>

        <div
          className="max-w-[1200px] w-full mx-auto flex flex-col px-6 pb-[24px]"
        >
          {/* The top padding sits inside the sticky box on purpose: padding
              travels with a sticky element, so once pinned the content scrolls
              under a band of page background instead of touching the window. */}
          <div
            ref={heroRef}
            className="sticky top-0 z-10 bg-ground pt-[16px] pb-[16px]"
          >
            <div className="bg-surface rounded-card border border-line overflow-clip px-[36px] py-[20px]">
              <div className="flex gap-[24px] items-center w-full">
                <span className="shrink-0 w-[72px] text-center font-display font-extralight text-4xl leading-none text-ink">
                  {RC.number}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-[12px]">
                    <div>
                      <p className="font-display font-medium text-2xl text-ink tracking-heading mb-[8px]">
                        {RC.title}
                      </p>
                      <p className="font-body font-normal text-lg text-ink-muted max-w-[681px]">
                        {RC.plain}
                      </p>
                    </div>
                    <div className="flex gap-[8px] items-start flex-wrap">
                      {RC.tags.map((tag) => (
                        <div
                          key={tag}
                          className="bg-sunken border border-line-strong px-[10px] py-[4px] rounded-pill"
                        >
                          <p className="font-body font-semibold text-xs text-ink-muted tracking-[0.12px]">
                            {tag}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Tightens rather than disappears: both actions stay
                    reachable, the label and the spacing give up the room. */}
                <div className="shrink-0 w-[250px]">
                  <div className="bg-sunken border border-line rounded-panel p-[24px] flex flex-col gap-[16px] items-center">
                    <p className="font-body font-semibold text-xs text-ink-muted">
                      Take part
                    </p>
                    <div className="flex flex-col gap-[14px] w-full items-center">
                      <button
                        onClick={openTestimony}
                        className="bg-brand text-ink-inverse font-body font-semibold text-sm px-[12px] py-[8px] rounded-control w-[196px] cursor-pointer hover:bg-brand-hover"
                      >
                        Add your perspective
                      </button>
                      <button
                        onClick={openDiscussions}
                        className="bg-surface border border-brand text-brand font-body font-semibold text-sm px-[12px] py-[8px] rounded-control w-[196px] cursor-pointer hover:bg-brand-soft/60"
                      >
                        Join a live discussion
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-first: the tabs sit above the content as a pinned strip,
              and the sidebar shape only returns at 950px, where there is room
              for a column beside it. */}
          <div className="flex flex-col gap-0 min-[950px]:flex-row min-[950px]:gap-[24px] min-[950px]:items-start">
            {/* Pinned directly under the hero at both widths, so one offset
                covers both. Narrow, the gap beneath it is bottom padding rather
                than a row gap: padding travels with a sticky box, so the strip
                keeps the same 16px of page colour under it that the hero leaves
                above it, pinned or at rest, instead of white cards scrolling up
                flush against the white strip. */}
            <div
              ref={railRef}
              className="sticky top-[var(--hero-h,0px)] z-20 w-full bg-ground pb-[16px] flex flex-col gap-[16px] min-[950px]:w-[224px] min-[950px]:shrink-0 min-[950px]:bg-transparent min-[950px]:pb-0"
            >
              <SectionRail
                sections={SECTIONS}
                active={activeSection}
                onJump={jumpTo}
                mode={mode}
                onModeChange={setMode}
              />
              {/* Source-type legend. The strip has no room for it below
                  950px, and it explains colours that only appear further down
                  the page, past where a pinned bar can help. */}
              <div className="hidden min-[950px]:block space-y-[8px] pl-[40px]">
                {(
                  [
                    ["official", "Official info"],
                    ["user", "User-submitted"],
                    ["outside", "Outside content"],
                    ["ai", "AI synthesis"],
                  ] as [SrcKind, string][]
                ).map(([kind, label]) => (
                  <div key={kind} className="flex items-center gap-[8px]">
                    <div
                      className="w-[8px] h-[8px] rounded-full shrink-0"
                      style={{ background: KIND_DOT[kind] }}
                    />
                    <p className="font-body text-xs text-ink-muted">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* The page itself. One scroll, chapters in reading order, each
                descending from its plain-language answer into the evidence. */}
            <div className="flex-1 min-w-0">
              <DepthProvider mode={mode}>
                <div className="flex flex-col gap-[48px] pb-[24px]">
                  <TheQuestionSection
                    onOpenFinance={() => jumpTo("the-record")}
                    onViewTestimony={(stance) => {
                      setOrgFilter(stance);
                      jumpTo("testimony");
                    }}
                  />
                  <WhatItDoesSection />
                  <ArgumentsSection />
                  <TestimonySection
                    orgFilter={orgFilter}
                    discussionsRef={discussionsRef}
                  />
                  <TheRecordSection onAskMaple={askMaple} />
                </div>
              </DepthProvider>
            </div>
          </div>
        </div>
      </div>
      <MapleFab open={askOpen} onOpenChange={setAskOpen} nudge={askNudge} />
    </SourcesProvider>
  );
}
