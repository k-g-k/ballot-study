// BQ2-alt — the rent-control ballot-question deep-dive page.
//
// This file is only the SHELL: top nav, breadcrumb, sticky hero, the tab
// sidebar + source-type legend, and the active-tab switch. Everything inside a
// tab is a thin composition of ballot section components (../ballot) fed by the
// question's content (../../data/rent-control) — so moving a card = moving a
// JSX block in a tab file, and changing words = editing the data module.
//
// The whole page is wrapped in <SourcesProvider> so every citation component
// resolves source ids against this question's registry.

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { MapleTopNav, BreadcrumbBack, PageHeading } from "../maple-shared";
import { SourcesProvider, KIND_DOT, type SrcKind } from "../ballot";
import { RC, SOURCES } from "../../data/rent-control";
import { TABS, type TabId } from "./tabs";
import type { StanceFilter } from "./testimony";
import { OverviewTab } from "./tabs/OverviewTab";
import { BackgroundTab } from "./tabs/BackgroundTab";
import { ForAgainstTab } from "./tabs/ForAgainstTab";
import { PublicPerspectivesTab } from "./tabs/PublicPerspectivesTab";
import { CitizenDeliberationsTab } from "./tabs/CitizenDeliberationsTab";
import { CampaignFinanceTab } from "./tabs/CampaignFinanceTab";
import { BibliographyTab } from "./tabs/BibliographyTab";
import { MapleFab } from "./maple-fab";

export default function RentControlAlt() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  // Dismissible prototype notice — dismissal lives in component state, so it
  // persists across tab switches (the shell stays mounted) but resets on reload.
  const [noticeOpen, setNoticeOpen] = useState(true);
  // Which stance Organization Testimony opens with — set when a Vote card's
  // "View Testimony" is clicked, reset by any ordinary tab navigation.
  const [orgFilter, setOrgFilter] = useState<StanceFilter>("all");
  const columnRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // The sidebar pins just below the sticky hero; the hero's height varies with
  // viewport width, so mirror it into a CSS variable the sidebar's `top` reads.
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

  // The page scrolls natively. On tab switch, clamp the scroll back to where the
  // tab content starts (heading stays scrolled away, hero/sidebar stay pinned);
  // if the user is already above that point, don't move at all.
  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    setOrgFilter("all");
    const el = columnRef.current;
    if (!el) return;
    // Measure from the non-sticky column: a stuck sticky element reports its
    // pinned position, not its document-flow position.
    const target = el.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY > target) window.scrollTo({ top: target });
  };

  return (
    <SourcesProvider value={SOURCES}>
      <div className="bg-[#ededed] min-h-screen min-w-[950px]">
        {/* Chrome matches BQ1 (content-schemata-rent-control): top nav + breadcrumb. */}
        {/* Top nav with the prototype notice anchored to it — absolutely
            positioned so it overlaps the nav bar slightly and scrolls away
            together with it (the nav is not sticky). */}
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
        <BreadcrumbBack
          to="/ballotQuestions"
          label="Return to ballot questions"
        />
        <div className="max-w-[1200px] w-full mx-auto pt-[8px] pb-[16px] px-6">
          <PageHeading>Proposed Ballot Question (2026)</PageHeading>
        </div>

        <div
          ref={columnRef}
          className="max-w-[1200px] w-full mx-auto flex flex-col px-6 pb-[24px]"
        >
          {/* Hero — pins at the viewport top once the heading scrolls away. */}
          <div
            ref={heroRef}
            className="sticky top-0 z-10 bg-[#ededed] pt-[16px] pb-[16px]"
          >
            <div className="bg-white rounded-[12px] overflow-clip pt-[36px] pr-[36px] pb-[36px] pl-[36px]">
              <div className="flex gap-[24px] items-center w-full">
                <div className="flex-1">
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
                <div className="bg-[#f9fafc] border border-[#dee2e6] rounded-[12px] p-[24px] flex flex-col gap-[16px] items-center w-[250px]">
                  <p className="font-['Nunito'] font-bold text-[14px] text-[#64758b] tracking-[1.26px]">
                    TAKE PART
                  </p>
                  <div className="flex flex-col gap-[14px] w-full items-center">
                    <button className="bg-[#12266f] text-white font-['Nunito'] font-bold text-[13px] px-[12px] py-[8px] rounded-[4px] w-[196px]">
                      Share Your Perspective
                    </button>
                    <button className="bg-white border border-[#12266f] text-[#12266f] font-['Nunito'] font-bold text-[13px] px-[12px] py-[8px] rounded-[4px] w-[196px]">
                      Join a Deliberation!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar + content — sidebar pins below the hero, content scrolls. */}
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

            {/* Tab content — normal document flow; the page itself scrolls. */}
            <div className="flex-1 pr-[8px]">
              <div className="flex flex-col gap-[16px] pb-[24px]">
                {activeTab === "overview" && (
                  <OverviewTab
                    onOpenFinance={() => handleTabChange("finance")}
                    onViewTestimony={(stance) => {
                      setOrgFilter(stance);
                      setActiveTab("perspectives");
                    }}
                  />
                )}
                {activeTab === "background" && <BackgroundTab />}
                {activeTab === "for-against" && <ForAgainstTab />}
                {activeTab === "perspectives" && (
                  <PublicPerspectivesTab orgFilter={orgFilter} />
                )}
                {activeTab === "deliberations" && <CitizenDeliberationsTab />}
                {/* {activeTab === "media" && <MediaCoverageTab />} */}
                {activeTab === "finance" && <CampaignFinanceTab />}
                {activeTab === "bibliography" && <BibliographyTab />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <MapleFab />
    </SourcesProvider>
  );
}
