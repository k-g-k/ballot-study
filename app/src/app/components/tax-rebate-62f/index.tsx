// BQ3 — the Chapter 62F reform ballot-question deep-dive page.
//
// This file is only the SHELL: top nav, breadcrumb, sticky hero, the tab
// sidebar + source-type legend, and the active-tab switch. Tab content lives in
// ./tabs/*.tsx, built from ../ballot sections and data from
// ../../data/tax-rebate-62f — so moving a card = moving a JSX block in a tab
// file, and changing words = editing the data module.
//
// Wrapped in <SourcesProvider> so citations resolve ids against this question's
// sources. Parallels src/app/components/rent-control-alt/index.tsx.

import { useState, useRef, useEffect } from "react";
import { X, Bell, BellRing, BellPlus, BellOff, Share } from "lucide-react";
import { MapleTopNav, PageHeading } from "../maple-shared";
import { SourcesProvider, KIND_DOT, type SrcKind } from "../ballot";
import { RC, SOURCES } from "../../data/tax-rebate-62f";
import { TABS, type TabId } from "./tabs";
import type { StanceFilter } from "./testimony";
import { OverviewTab } from "./tabs/OverviewTab";
import { ForAgainstTab } from "./tabs/ForAgainstTab";
import { CoverageUpdatesTab } from "./tabs/CoverageUpdatesTab";
import { PublicPerspectivesTab } from "./tabs/PublicPerspectivesTab";
import { CampaignFinanceTab } from "./tabs/CampaignFinanceTab";
import { BibliographyTab } from "./tabs/BibliographyTab";
import { MapleFab, ASK_DELAY_MS } from "./maple-fab";

export function TaxRebate62FPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
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
  // Default state opens on all unless navigated to by a specific route. Example:
  // clicking view testimony on the "Voting Yes" card on the overview page will
  // navigate to this page with "Endorsing" already selected.
  const [orgFilter, setOrgFilter] = useState<StanceFilter>("all");
  // The hero's two calls to action both land on Public Perspectives. Writing
  // deliberately stops at the feed rather than opening the form: seeing what
  // others submitted, and how, is the better thing to meet first.
  const [perspectivesSection, setPerspectivesSection] = useState<
    "testimony" | "discussions"
  >("testimony");
  const openTestimony = () => {
    handleTabChange("perspectives");
    setPerspectivesSection("testimony");
  };
  const openDiscussions = () => {
    handleTabChange("perspectives");
    setPerspectivesSection("discussions");
  };
  const columnRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // The hero's height changes with window width, so it is measured here and
  // stored as a CSS variable the sidebar uses to position itself.
  useEffect(() => {
    const column = columnRef.current;
    const hero = heroRef.current;
    if (!column || !hero) return;
    const observer = new ResizeObserver(() => {
      column.style.setProperty("--hero-h", `${hero.offsetHeight}px`);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Each tab's closing call to action opens the one after it in the sidebar, so
  // the destination follows TABS rather than being wired per tab.
  const openNext = (from: TabId) => () => {
    const next = TABS[TABS.findIndex((t) => t.id === from) + 1];
    if (next) handleTabChange(next.id);
  };

  // Without this, switching tabs would leave the page scrolled partway down the
  // previous tab's content.
  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    setOrgFilter("all");
    // Leaving the tab drops anything the hero asked for, so returning to it
    // lands on the default view rather than where a call to action left it.
    setPerspectivesSection("testimony");
    const el = columnRef.current;
    if (!el) return;
    // The container is not sticky, so it reports its true position in the page.
    // A sticky element that has frozen in place would instead report where it is
    // pinned on screen.
    const target = el.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY > target) window.scrollTo({ top: target });
  };

  return (
    <SourcesProvider value={SOURCES}>
      <div className="bg-[#ededed] min-h-screen min-w-[950px]">
        <div className="relative">
          <MapleTopNav />
          {noticeOpen && (
            <div className="absolute top-0  inset-0 z-30 flex items-center justify-center px-6 pointer-events-none">
              <div className="pointer-events-auto inline-flex items-start gap-[8px] rounded-[8px] px-[14px] py-[10px] bg-[#fef3c7]/95 border border-[#f59e0b] shadow-[0_6px_18px_rgba(0,0,0,0.16)]">
                <span className="text-[16px] leading-none">⚠️</span>
                <p className="font-['Nunito'] text-[13px] leading-[1.5] text-[#92400e] max-w-[900px]">
                  <span className="font-bold">Design prototype.</span> This page
                  is a design prototype for demonstration only. Content,
                  testimony, positions, citations, and AI syntheses are
                  illustrative only.
                </p>
                <button
                  onClick={() => setNoticeOpen(false)}
                  aria-label="Dismiss notice"
                  className="shrink-0 mt-[1px] text-[#92400e] hover:text-[#5c2d0a] cursor-pointer"
                >
                  <X className="w-[15px] h-[15px]" />
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Page-level utilities sit with the title rather than in TAKE PART:
            these act on the question as a record, not on the debate. */}
        <div className="max-w-[1200px] w-full mx-auto pt-[24px] px-6 flex items-center justify-between gap-[16px]">
          <PageHeading>Ballot Question 5 (2026)</PageHeading>
          <div className="shrink-0 flex items-center gap-[18px]">
            <button
              onClick={() => setFollowing((f) => !f)}
              aria-pressed={following}
              className={`group inline-flex items-center gap-[6px] font-['Nunito'] font-bold text-[13px] cursor-pointer hover:text-[#c71e32] ${
                following ? "text-[#606060]" : "text-[#12266f]"
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
            <button className="inline-flex items-center gap-[6px] font-['Nunito'] font-bold text-[13px] text-[#12266f] hover:text-[#c71e32] cursor-pointer">
              <Share className="w-[15px] h-[15px]" />
              Share
            </button>
          </div>
        </div>

        <div
          ref={columnRef}
          className="max-w-[1200px] w-full mx-auto flex flex-col px-6 pb-[24px]"
        >
          {/* The top padding sits inside the sticky box on purpose: padding
              travels with a sticky element, so once pinned the content scrolls
              under a band of page background instead of touching the window. */}
          <div
            ref={heroRef}
            className="sticky top-0 z-10 bg-[#ededed] pt-[16px] pb-[16px]"
          >
            <div className="bg-white rounded-[12px] overflow-clip px-[36px] py-[20px]">
              <div className="flex gap-[24px] items-center w-full">
                <span className="shrink-0 w-[72px] text-center font-['Lexend'] font-extralight text-[56px] leading-none text-black">
                  {RC.number}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-[12px]">
                    <div>
                      <p className="font-['Lexend'] font-semibold text-[24px] text-black tracking-[0.24px] mb-[8px]">
                        {RC.title}
                      </p>
                      <p className="font-['Nunito'] font-normal text-[16px] text-[#808080] tracking-[-0.625px] max-w-[681px]">
                        {RC.plain}
                      </p>
                    </div>
                    <div className="flex gap-[8px] items-start flex-wrap">
                      {RC.tags.map((tag) => (
                        <div
                          key={tag}
                          className="bg-[#f0f0f0] border border-[#d1d1d1] px-[10px] py-[4px] rounded-[100px]"
                        >
                          <p className="font-['Nunito'] font-bold text-[12px] text-[#606060] tracking-[0.12px]">
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
                  <div className="bg-[#f9fafc] border border-[#dee2e6] rounded-[12px] p-[24px] flex flex-col gap-[16px] items-center">
                    <p className="font-['Nunito'] font-bold text-[12px] text-[#64758b] tracking-[1.26px]">
                      TAKE PART
                    </p>
                    <div className="flex flex-col gap-[14px] w-full items-center">
                      <button
                        onClick={openTestimony}
                        className="bg-[#12266f] text-white font-['Nunito'] font-bold text-[13px] px-[12px] py-[8px] rounded-[4px] w-[196px] cursor-pointer hover:bg-[#0d1c52]"
                      >
                        Add Your Perspective
                      </button>
                      <button
                        onClick={openDiscussions}
                        className="bg-white border border-[#12266f] text-[#12266f] font-['Nunito'] font-bold text-[13px] px-[12px] py-[8px] rounded-[4px] w-[196px] cursor-pointer hover:bg-[rgba(232,239,255,0.4)]"
                      >
                        Join a Live Discussion!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-[24px] items-start">
            <div
              className="w-[224px] shrink-0 flex flex-col gap-[16px] sticky"
              style={{ top: "var(--hero-h, 0px)" }}
            >
              <div className="bg-white flex flex-col gap-[8px] p-[16px] rounded-[8px]">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`cursor-pointer h-[36px] rounded-[8px] px-[10px] py-[6px] flex items-center justify-start transition-colors ${
                        isActive
                          ? "bg-[rgba(232,239,255,0.68)] border border-[#c9d8ff]"
                          : ""
                      }`}
                    >
                      <p
                        className={`font-['Nunito'] font-semibold text-[14px] tracking-[0.14px] ${
                          isActive ? "text-[#1e3f8a]" : "text-[#334156]"
                        }`}
                      >
                        {tab.label}
                      </p>
                    </button>
                  );
                })}
              </div>
              {/* Source-type legend */}
              <div className="space-y-[8px] pl-[40px]">
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
                    <p className="font-['Nunito'] text-[12px] text-[#606060]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-[16px] pb-[24px]">
                {activeTab === "overview" && (
                  <OverviewTab
                    onOpenFinance={() => handleTabChange("finance")}
                    onOpenUpdates={() => handleTabChange("updates")}
                    onOpenArguments={openNext("overview")}
                    onViewTestimony={(stance) => {
                      setOrgFilter(stance);
                      setActiveTab("perspectives");
                    }}
                  />
                )}
                {activeTab === "for-against" && (
                  <ForAgainstTab onNext={openNext("for-against")} />
                )}
                {activeTab === "updates" && (
                  <CoverageUpdatesTab onNext={openNext("updates")} />
                )}
                {activeTab === "perspectives" && (
                  <PublicPerspectivesTab
                    orgFilter={orgFilter}
                    initialSection={perspectivesSection}
                    onNext={openNext("perspectives")}
                  />
                )}
                {activeTab === "finance" && (
                  <CampaignFinanceTab onNext={openNext("finance")} />
                )}
                {activeTab === "bibliography" && (
                  <BibliographyTab onAskMaple={askMaple} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <MapleFab open={askOpen} onOpenChange={setAskOpen} nudge={askNudge} />
    </SourcesProvider>
  );
}
