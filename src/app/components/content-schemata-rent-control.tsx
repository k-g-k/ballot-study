import { useState, useRef, useEffect, useCallback } from "react";
import { Check, X, Users } from "lucide-react";
import { BreadcrumbBack, MapleTopNav, PageHeading } from "./maple-shared";
import imgScreenshot from "../../imports/B2/2054e5a4b64ba614f10d70a8f875d30fc2074b4e.png";
import imgImage1 from "../../imports/B2/6da9b0c0d0d379ad14b8c41301da222f17bbe4a5.png";
import imgImage5 from "../../imports/B2/8fa55f3d54e09cd1ef96735352eaf57c5d68e0a3.png";
import imgImage2 from "../../imports/B2/f281b799d3bcfb6e348ba78f5e6c7430177f2352.png";
import imgImage3 from "../../imports/B2/d381bc8eade23a1d313b202a4c2dea1a3ac69661.png";
import imgImage4 from "../../imports/B2/feed02efd8b5cc0863cee0ffc4228f479dc27bb6.png";
import imgImage6 from "../../imports/B2/a0d621eadb04bcfc3bacc0257c95c4239eca28c8.png";

type TabId =
  | "overview"
  | "background"
  | "for-against"
  | "perspectives"
  | "media"
  | "finance";

const TABS = [
  { id: "overview" as TabId, label: "Overview" },
  { id: "background" as TabId, label: "Background" },
  { id: "for-against" as TabId, label: "For & Against" },
  { id: "perspectives" as TabId, label: "Public Perspectives" },
  { id: "media" as TabId, label: "Media Coverage" },
  { id: "finance" as TabId, label: "Campaign Finance" },
];

export default function ContentSchemataRentControl() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const titleRef = useRef<HTMLDivElement>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  // The scroll-lock (sticky viewport-height box + wheel hijack) only applies at
  // >= 950px. Below that the page keeps its desktop layout but scrolls natively,
  // with a horizontal scrollbar from the min-width floor. Mirrors the matchMedia
  // pattern in ui/use-mobile.ts. Keep this breakpoint in sync with the
  // min-[950px]: Tailwind variants and min-w-[950px] below.
  const [isWide, setIsWide] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 950px)");
    const onChange = () => setIsWide(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const updateSpacer = useCallback(() => {
    const tabContent = tabContentRef.current;
    const spacer = spacerRef.current;
    if (!tabContent || !spacer) return;
    spacer.style.height = `${tabContent.scrollHeight - tabContent.clientHeight}px`;
  }, []);

  // Update spacer whenever tab changes (content height changes). Below the
  // breakpoint there is no scroll-lock, so keep the spacer collapsed.
  useEffect(() => {
    if (!isWide) {
      if (spacerRef.current) spacerRef.current.style.height = "0px";
      return;
    }
    const t = setTimeout(updateSpacer, 50);
    return () => clearTimeout(t);
  }, [activeTab, updateSpacer, isWide]);

  // Intercept all wheel events and route through outer scroll —
  // prevents inner div from scrolling natively before the page locks
  useEffect(() => {
    if (!isWide) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      window.scrollBy(0, e.deltaY);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isWide]);

  // Drive inner scroll from outer scroll position
  useEffect(() => {
    if (!isWide) return;
    const handleScroll = () => {
      const tabContent = tabContentRef.current;
      const titleEl = titleRef.current;
      if (!tabContent || !titleEl) return;
      tabContent.scrollTop = Math.max(0, window.scrollY - titleEl.offsetHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isWide]);

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  return (
    <div className="bg-[#ededed] min-h-screen min-w-[950px]">
      {/* Header, breadcrumb, and title all scroll away with the page — grouped
          under one ref so the scroll-lock math below accounts for their full
          combined height, not just the title's. */}
      <div ref={titleRef}>
        <MapleTopNav />
        <BreadcrumbBack
          to="/ballotQuestions"
          label="Return to ballot questions"
        />
        <div className="max-w-[1200px] mx-auto pt-[8px] pb-[16px] px-6">
          <PageHeading>Proposed Ballot Question (2026)</PageHeading>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto">
        {/* ── Sticky: hero + sidebar + tab content ── */}
        <div className="min-[950px]:sticky min-[950px]:top-[24px] min-[950px]:h-[calc(100vh-24px)] min-[950px]:overflow-hidden flex flex-col gap-[16px] px-6 pb-[24px] bg-[#ededed]">
          {/* Hero card */}
          <div className="bg-white rounded-[12px] overflow-clip shrink-0 pt-[36px] pr-[36px] pb-[36px] pl-[36px]">
            <div className="flex gap-[24px] items-center w-full">
              {/* Number column — temporarily hidden. Restore this <p> to show the
                  number (or its "?" placeholder) again in the unnumbered/numbered states.
              <p className="font-['Lexend'] font-thin text-[56px] text-black text-center tracking-[0.56px] w-[135px]">
                ?
              </p>
              */}
              <div className="flex-1">
                <div className="flex flex-col gap-[12px]">
                  <div>
                    <p className="font-['Lexend'] font-semibold text-[24px] text-black tracking-[0.24px] mb-[8px]">
                      Limiting Rent Increases
                    </p>
                    <p className="font-['Nunito'] font-normal text-[16px] text-[#808080] tracking-[-0.625px] max-w-[681px]">
                      Establish rent control, limiting annual rent increases for
                      residential units to the Consumer Price Index (CPI) or 5%,
                      whichever is lower
                    </p>
                  </div>
                  <div className="flex gap-[8px] items-start">
                    <div className="bg-[#f0f0f0] border border-[#d1d1d1] px-[10px] py-[4px] rounded-[100px]">
                      <p className="font-['Nunito'] font-bold text-[12px] text-[#606060] tracking-[0.12px]">
                        Housing Policy
                      </p>
                    </div>
                    <div className="bg-[#f0f0f0] border border-[#d1d1d1] px-[10px] py-[4px] rounded-[100px]">
                      <p className="font-['Nunito'] font-bold text-[12px] text-[#606060] tracking-[0.12px]">
                        Rent Control
                      </p>
                    </div>
                    <div className="bg-[#f0f0f0] border border-[#d1d1d1] px-[10px] py-[4px] rounded-[100px]">
                      <p className="font-['Nunito'] font-bold text-[12px] text-[#606060] tracking-[0.12px]">
                        Tenant Protections
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#f9fafc] border border-[#dee2e6] rounded-[12px] p-[24px] flex flex-col gap-[16px] items-center w-[250px]">
                <p className="font-['Nunito'] font-bold text-[14px] text-[#64758b] tracking-[1.26px]">
                  TAKE PART
                </p>
                <div className="flex flex-col gap-[14px] w-full items-center">
                  <button className="bg-[#12266f] text-white font-['Nunito'] font-bold text-[12px] px-[12px] py-[8px] rounded-[4px] w-[196px]">
                    Share Your Perspective
                  </button>
                  <button className="bg-white border border-[#12266f] text-[#12266f] font-['Nunito'] font-bold text-[12px] px-[12px] py-[8px] rounded-[4px] w-[196px]">
                    Ask a Question
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row: sidebar + scrollable tab content */}
          <div className="flex gap-[24px] flex-1 overflow-hidden">
            {/* Left Sidebar */}
            <div className="w-[224px] shrink-0 flex flex-col gap-[16px]">
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
              <div className="space-y-[8px] pl-[40px]">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#3b82f6] shrink-0" />
                  <p className="font-['Nunito'] text-[12px] text-[#606060]">
                    Official info
                  </p>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#f97316] shrink-0" />
                  <p className="font-['Nunito'] text-[12px] text-[#606060]">
                    User-submitted
                  </p>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#22c55e] shrink-0" />
                  <p className="font-['Nunito'] text-[12px] text-[#606060]">
                    Outside content
                  </p>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#a855f7] shrink-0" />
                  <p className="font-['Nunito'] text-[12px] text-[#606060]">
                    AI synthesis
                  </p>
                </div>
              </div>
            </div>

            {/* Tab content — scrolled programmatically, no visible scrollbar */}
            <div
              ref={tabContentRef}
              className="flex-1 min-[950px]:overflow-y-scroll hide-scrollbar pr-[8px]"
            >
              <div className="flex flex-col gap-[16px] pb-[40px]">
                {activeTab === "overview" && <OverviewTab />}
                {activeTab === "background" && <BackgroundTab />}
                {activeTab === "for-against" && <ForAgainstTab />}
                {activeTab === "perspectives" && <PublicPerspectivesTab />}
                {activeTab === "media" && <MediaCoverageTab />}
                {activeTab === "finance" && <CampaignFinanceTab />}
              </div>
            </div>
          </div>
        </div>

        {/* Spacer — makes page tall enough for outer scrollbar to represent inner content */}
        <div ref={spacerRef} aria-hidden="true" />
      </div>
    </div>
  );
}

function ContentItem({
  type,
  children,
}: {
  type: "official" | "user" | "outside" | "ai";
  children: React.ReactNode;
}) {
  const colors = {
    official: {
      bg: "bg-[#dbeafe]",
      border: "border-[#93c5fd]",
      text: "text-[#1e40af]",
    },
    user: {
      bg: "bg-[#fed7aa]",
      border: "border-[#fdba74]",
      text: "text-[#9a3412]",
    },
    outside: {
      bg: "bg-[#bbf7d0]",
      border: "border-[#86efac]",
      text: "text-[#166534]",
    },
    ai: {
      bg: "bg-[#e9d5ff]",
      border: "border-[#d8b4fe]",
      text: "text-[#6b21a8]",
    },
  };

  const style = colors[type];

  return (
    <div
      className={`${style.bg} border ${style.border} rounded-[6px] px-[12px] py-[8px]`}
    >
      <p
        className={`font-['Nunito'] text-[14px] ${style.text} tracking-[0.14px]`}
      >
        {children}
      </p>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* Overview Content Block */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
          Overview Content
        </h3>
        <div className="space-y-[8px]">
          <ContentItem type="ai">
            AI plain-language summary of the measure
          </ContentItem>
          <ContentItem type="official">
            Yes / No vote summary (AG verbatim)
          </ContentItem>
          <ContentItem type="official">
            Current procedural stage callout with next key date
          </ContentItem>
          <ContentItem type="official">
            Campaign finance snapshot — total raised YES vs NO
          </ContentItem>
        </div>
      </div>

      {/* Featured Testimony */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
          Featured Testimony
        </h3>
        <div className="space-y-[8px]">
          <ContentItem type="user">
            Featured org testimony — YES (surfaced from Testimony & Community
            tab)
          </ContentItem>
          <ContentItem type="user">
            Featured org testimony — NO (surfaced from Testimony & Community
            tab)
          </ContentItem>
        </div>
      </div>

      {/* AI Synthesis & Media Snapshot */}
      <div className="flex gap-[16px]">
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
            AI Synthesis
          </h3>
          <div className="space-y-[8px]">
            <ContentItem type="ai">
              AI synthesis snapshot — top YES argument with citation
            </ContentItem>
            <ContentItem type="ai">
              AI synthesis snapshot — top NO argument with citation
            </ContentItem>
          </div>
        </div>
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
            Media Coverage
          </h3>
          <div className="space-y-[8px]">
            <ContentItem type="outside">
              Media coverage snapshot (surfaced from Media Coverage tab)
            </ContentItem>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* Official Ballot Information */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
          Official Ballot Information
        </h3>
        <div className="space-y-[8px]">
          <ContentItem type="ai">
            Plain language translation of fiscal impact
          </ContentItem>
          <ContentItem type="official">
            Official ballot question — exact wording (Secretary of State)
          </ContentItem>
          <ContentItem type="official">
            AG plain-language summary (verbatim)
          </ContentItem>
          <ContentItem type="official">Full legal text (link out)</ContentItem>
          <ContentItem type="official">
            What a YES vote does (AG verbatim)
          </ContentItem>
          <ContentItem type="official">
            What a NO vote does (AG verbatim)
          </ContentItem>
          <ContentItem type="official">
            Fiscal impact statement (verbatim)
          </ContentItem>
        </div>
      </div>

      {/* Readability & Context */}
      <div className="flex gap-[16px]">
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
            Readability
          </h3>
          <div className="space-y-[8px]">
            <ContentItem type="outside">
              Readability score — Flesch-Kincaid grade level of ballot language
            </ContentItem>
            <ContentItem type="outside">
              Readability score — Flesch Reading Ease
            </ContentItem>
            <ContentItem type="ai">
              Glossary — undefined or ambiguous terms surfaced from ballot text,
              defined from official sources
            </ContentItem>
          </div>
        </div>
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
            Process & Timeline
          </h3>
          <div className="space-y-[8px]">
            <ContentItem type="ai">
              Plain language explainer of how this measure type works in
              Massachusetts
            </ContentItem>
            <ContentItem type="official">
              Path to ballot timeline — filing, AG certification, signature
              rounds, legislative review, final certification
            </ContentItem>
            <ContentItem type="official">
              Signature counts — required vs submitted vs certified
            </ContentItem>
            <ContentItem type="official">
              Legislative action or inaction during review window
            </ContentItem>
          </div>
        </div>
      </div>

      {/* Related Context */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
          Related Context
        </h3>
        <div className="space-y-[8px]">
          <ContentItem type="official">
            Current state of the law or policy being changed
          </ContentItem>
          <ContentItem type="official">
            Key institutions and offices involved
          </ContentItem>
          <ContentItem type="outside">
            Prior Massachusetts ballot measures on this topic (RAG from
            legislative database)
          </ContentItem>
          <ContentItem type="outside">
            Related bills filed on Beacon Hill (RAG from legislative database)
          </ContentItem>
          <ContentItem type="outside">
            How comparable measures have fared in other states
          </ContentItem>
          <ContentItem type="ai">
            AI identification of essential context for understanding this
            measure
          </ContentItem>
          <ContentItem type="ai">
            AI-surfaced connections to related Beacon Hill activity
          </ContentItem>
        </div>
      </div>
    </div>
  );
}

function ForAgainstTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* Official Campaign Information */}
      <div className="flex gap-[16px]">
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
            YES Campaign
          </h3>
          <div className="space-y-[8px]">
            <ContentItem type="official">
              Official YES campaign committee name and registration
            </ContentItem>
            <ContentItem type="official">
              Official YES campaign position statement (verbatim)
            </ContentItem>
            <ContentItem type="official">
              Endorsing organizations on record — YES (official filings)
            </ContentItem>
            <ContentItem type="official">
              Elected officials with a public position — YES
            </ContentItem>
          </div>
        </div>
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
            NO Campaign
          </h3>
          <div className="space-y-[8px]">
            <ContentItem type="official">
              Official NO campaign committee name and registration
            </ContentItem>
            <ContentItem type="official">
              Official NO campaign position statement (verbatim)
            </ContentItem>
            <ContentItem type="official">
              Endorsing organizations on record — NO (official filings)
            </ContentItem>
            <ContentItem type="official">
              Elected officials with a public position — NO
            </ContentItem>
          </div>
        </div>
      </div>

      {/* AI Synthesis */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
          AI Synthesis of Arguments
        </h3>
        <div className="space-y-[8px]">
          <ContentItem type="ai">
            AI synthesis — strongest YES arguments across all sources, citations
            required
          </ContentItem>
          <ContentItem type="ai">
            AI synthesis — strongest NO arguments across all sources, citations
            required
          </ContentItem>
          <ContentItem type="ai">Areas of consensus across sources</ContentItem>
          <ContentItem type="ai">
            Areas of disagreement across sources
          </ContentItem>
          <ContentItem type="ai">
            Open questions and unresolved claims
          </ContentItem>
          <ContentItem type="ai">
            Claim mapping — claims made, evidence cited, what is contested
          </ContentItem>
        </div>
      </div>

      {/* Research & Evidence */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
          Research & Evidence
        </h3>
        <div className="space-y-[8px]">
          <ContentItem type="ai">
            AI synthesis of research — what evidence shows, where evidence is
            thin or contested, citations required
          </ContentItem>
          <ContentItem type="outside">
            Peer-reviewed research relevant to the measure
          </ContentItem>
          <ContentItem type="outside">
            Think tank and research institute reports (ideological affiliation
            noted)
          </ContentItem>
          <ContentItem type="outside">
            Government-produced research or data
          </ContentItem>
        </div>
      </div>
    </div>
  );
}

function PublicPerspectivesTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* Analysis of Community Input — top */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
          Analysis of Community Input
        </h3>
        <div className="space-y-[8px]">
          <ContentItem type="ai">
            Areas of consensus across testimony
          </ContentItem>
          <ContentItem type="ai">
            Areas of disagreement across testimony
          </ContentItem>
          <ContentItem type="ai">
            Open questions and unresolved claims from testimony
          </ContentItem>
        </div>
      </div>

      {/* Organization Testimony */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
          Organization Testimony
        </h3>
        {/* AI synthesis side by side at top */}
        <div className="flex gap-[12px] mb-[8px]">
          <div className="flex-1 bg-[#e9d5ff] border border-[#d8b4fe] rounded-[6px] px-[12px] py-[8px]">
            <p className="font-['Nunito'] text-[14px] text-[#6b21a8] tracking-[0.14px]">
              AI synthesis of org testimony — strongest YES arguments, citations
              required
            </p>
          </div>
          <div className="flex-1 bg-[#e9d5ff] border border-[#d8b4fe] rounded-[6px] px-[12px] py-[8px]">
            <p className="font-['Nunito'] text-[14px] text-[#6b21a8] tracking-[0.14px]">
              AI synthesis of org testimony — strongest NO arguments, citations
              required
            </p>
          </div>
        </div>
        <div className="space-y-[8px]">
          <ContentItem type="user">
            Verified org testimony — YES position
          </ContentItem>
          <ContentItem type="user">
            Verified org testimony — NO position
          </ContentItem>
          <ContentItem type="user">
            Verified org testimony — neutral or informational
          </ContentItem>
          <ContentItem type="user">
            Count of orgs who have submitted testimony
          </ContentItem>
        </div>
      </div>

      {/* Individual Testimony */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
          Individual Testimony
        </h3>
        {/* AI synthesis side by side at top */}
        <div className="flex gap-[12px] mb-[8px]">
          <div className="flex-1 bg-[#e9d5ff] border border-[#d8b4fe] rounded-[6px] px-[12px] py-[8px]">
            <p className="font-['Nunito'] text-[14px] text-[#6b21a8] tracking-[0.14px]">
              AI synthesis of individual testimony — strongest YES arguments,
              citations required
            </p>
          </div>
          <div className="flex-1 bg-[#e9d5ff] border border-[#d8b4fe] rounded-[6px] px-[12px] py-[8px]">
            <p className="font-['Nunito'] text-[14px] text-[#6b21a8] tracking-[0.14px]">
              AI synthesis of individual testimony — strongest NO arguments,
              citations required
            </p>
          </div>
        </div>
        <div className="space-y-[8px]">
          <ContentItem type="user">
            Individual testimony — YES position
          </ContentItem>
          <ContentItem type="user">
            Individual testimony — NO position
          </ContentItem>
          <ContentItem type="user">
            Individual testimony — neutral or questions raised
          </ContentItem>
          <ContentItem type="user">
            Count of individuals who have submitted testimony
          </ContentItem>
        </div>
      </div>
    </div>
  );
}

function MediaCoverageTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* News Coverage */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
          News Coverage
        </h3>
        <div className="space-y-[8px]">
          <ContentItem type="outside">
            News articles — Massachusetts outlets
          </ContentItem>
          <ContentItem type="outside">
            News articles — national outlets
          </ContentItem>
          <ContentItem type="outside">
            Editorial board positions (outlet named, YES / NO / neutral)
          </ContentItem>
          <ContentItem type="outside">
            Opinion and op-ed pieces (author and outlet named)
          </ContentItem>
        </div>
      </div>

      {/* AI Analysis of Coverage */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
          AI Analysis of Media Coverage
        </h3>
        <div className="space-y-[8px]">
          <ContentItem type="ai">
            AI synthesis of media coverage — dominant narratives, notable
            disagreements, citations required
          </ContentItem>
          <ContentItem type="ai">
            AI identification of claims in media coverage that are contested or
            unverified
          </ContentItem>
        </div>
      </div>

      {/* Polling Data */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
          Polling Data
        </h3>
        <div className="space-y-[8px]">
          <ContentItem type="ai">
            AI synthesis of polling trend (if multiple polls exist)
          </ContentItem>
          <ContentItem type="outside">
            Polls — pollster, date, sample size, margin of error, YES %, NO %,
            undecided %
          </ContentItem>
          <ContentItem type="outside">
            Exact poll question wording per poll
          </ContentItem>
        </div>
      </div>
    </div>
  );
}

function CampaignFinanceTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* Financial Overview */}
      <div className="flex gap-[16px]">
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
            YES Committee
          </h3>
          <div className="space-y-[8px]">
            <ContentItem type="official">
              Total raised — YES committee
            </ContentItem>
            <ContentItem type="official">
              Total spent — YES committee
            </ContentItem>
            <ContentItem type="official">
              Top donors — YES (name, amount, employer or affiliation)
            </ContentItem>
          </div>
        </div>
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
            NO Committee
          </h3>
          <div className="space-y-[8px]">
            <ContentItem type="official">
              Total raised — NO committee
            </ContentItem>
            <ContentItem type="official">
              Total spent — NO committee
            </ContentItem>
            <ContentItem type="official">
              Top donors — NO (name, amount, employer or affiliation)
            </ContentItem>
          </div>
        </div>
      </div>

      {/* AI Analysis */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
          AI Analysis of Funding Patterns
        </h3>
        <div className="space-y-[8px]">
          <ContentItem type="ai">
            AI pattern note — funding concentration, out-of-state money, timing
            of donations (cited to OCPF)
          </ContentItem>
        </div>
      </div>

      {/* Additional Financial Details */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[12px]">
          Additional Financial Details
        </h3>
        <div className="space-y-[8px]">
          <ContentItem type="official">
            In-kind contributions (where notable)
          </ContentItem>
          <ContentItem type="official">
            Signature gathering expenditures
          </ContentItem>
          <ContentItem type="official">
            Cost per required signature (CPRS)
          </ContentItem>
        </div>
      </div>
    </div>
  );
}
