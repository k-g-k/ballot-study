import { useState, useRef, useEffect, useCallback } from "react";
import { Check, X, Users } from "lucide-react";
import imgScreenshot from "../../imports/B2/2054e5a4b64ba614f10d70a8f875d30fc2074b4e.png";
import imgImage1 from "../../imports/B2/6da9b0c0d0d379ad14b8c41301da222f17bbe4a5.png";
import imgImage5 from "../../imports/B2/8fa55f3d54e09cd1ef96735352eaf57c5d68e0a3.png";
import imgImage2 from "../../imports/B2/f281b799d3bcfb6e348ba78f5e6c7430177f2352.png";
import imgImage3 from "../../imports/B2/d381bc8eade23a1d313b202a4c2dea1a3ac69661.png";
import imgImage4 from "../../imports/B2/feed02efd8b5cc0863cee0ffc4228f479dc27bb6.png";
import imgImage6 from "../../imports/B2/a0d621eadb04bcfc3bacc0257c95c4239eca28c8.png";

type TabId = "overview" | "background" | "for-against" | "perspectives" | "media" | "finance";

const TABS = [
  { id: "overview" as TabId, label: "Overview" },
  { id: "background" as TabId, label: "Background" },
  { id: "for-against" as TabId, label: "For & Against" },
  { id: "perspectives" as TabId, label: "Public Perspectives" },
  { id: "media" as TabId, label: "Media Coverage" },
  { id: "finance" as TabId, label: "Campaign Finance" },
];

export default function ConceptH() {
  const [activeTab, setActiveTab] = useState<TabId>("for-against");
  const titleRef = useRef<HTMLDivElement>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  const updateSpacer = useCallback(() => {
    const tabContent = tabContentRef.current;
    const spacer = spacerRef.current;
    if (!tabContent || !spacer) return;
    spacer.style.height = `${tabContent.scrollHeight - tabContent.clientHeight}px`;
  }, []);

  useEffect(() => {
    const t = setTimeout(updateSpacer, 50);
    return () => clearTimeout(t);
  }, [activeTab, updateSpacer]);

  // Intercept all wheel events and route through outer scroll —
  // prevents inner div from scrolling natively before the page locks
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      window.scrollBy(0, e.deltaY);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const tabContent = tabContentRef.current;
      const titleEl = titleRef.current;
      if (!tabContent || !titleEl) return;
      tabContent.scrollTop = Math.max(0, window.scrollY - titleEl.offsetHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  return (
    <div className="bg-[#ededed] min-h-screen">
      <div className="max-w-[1550px] mx-auto">

        {/* Title — scrolls away with the page */}
        <div ref={titleRef} className="pt-[24px] pb-[16px] px-[90px]">
          <h1 className="font-['Nunito'] font-semibold text-[40px] text-black tracking-[0.4px]">
            Ballot Question 1 (2024)
          </h1>
        </div>

        {/* ── Sticky: hero + sidebar + tab content ── */}
        <div className="sticky top-[61px] h-[calc(100vh-61px)] overflow-hidden flex flex-col gap-[16px] px-[90px] pb-[24px] bg-[#ededed]">

          {/* Hero card */}
          <div className="bg-white rounded-[12px] overflow-clip pb-[22px] pt-[24px] shrink-0">
            <div className="flex gap-[24px] items-center w-full px-[24px]">
              <p className="font-['Lexend'] font-thin text-[56px] text-black text-center tracking-[0.56px] w-[135px]">
                1
              </p>
              <div className="flex-1">
                <div className="flex flex-col gap-[12px]">
                  <div>
                    <p className="font-['Lexend'] font-semibold text-[24px] text-black tracking-[0.24px] mb-[8px]">
                      State Auditor's Authority to Audit the Legislature
                    </p>
                    <p className="font-['Nunito'] font-normal text-[16px] text-[#808080] tracking-[-0.625px] max-w-[681px]">
                      Authorize the state auditor to audit the state legislature, and remove some existing regulations regarding the auditing process
                    </p>
                  </div>
                  <div className="flex gap-[8px] items-start">
                    <div className="bg-[#f0f0f0] border border-[#d1d1d1] px-[10px] py-[4px] rounded-[100px]">
                      <p className="font-['Nunito'] font-bold text-[12px] text-[#606060] tracking-[0.12px]">Public Information</p>
                    </div>
                    <div className="bg-[#f0f0f0] border border-[#d1d1d1] px-[10px] py-[4px] rounded-[100px]">
                      <p className="font-['Nunito'] font-bold text-[12px] text-[#606060] tracking-[0.12px]">Legislative Process</p>
                    </div>
                    <div className="bg-[#f0f0f0] border border-[#d1d1d1] px-[10px] py-[4px] rounded-[100px]">
                      <p className="font-['Nunito'] font-bold text-[12px] text-[#606060] tracking-[0.12px]">State Executive Powers</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#f9fafc] border border-[#dee2e6] rounded-[12px] p-[24px] flex flex-col gap-[24px] items-center w-[260px]">
                <p className="font-['Nunito'] font-bold text-[14px] text-[#64758b] tracking-[1.26px]">TAKE PART</p>
                <div className="flex flex-col gap-[14px] w-full items-center">
                  <button className="bg-[#12266f] text-white font-['Nunito'] font-bold text-[14px] px-[12px] py-[8px] rounded-[4px] w-[196px]">
                    Share Your Perspective
                  </button>
                  <button className="bg-white border border-[#12266f] text-[#12266f] font-['Nunito'] font-bold text-[14px] px-[12px] py-[8px] rounded-[4px] w-[196px]">
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
                      onClick={() => tab.id === "for-against" && handleTabChange(tab.id)}
                      className={`h-[45px] rounded-[8px] p-[8px] flex items-center justify-start transition-colors ${
                        isActive ? "bg-[rgba(232,239,255,0.68)] border border-[#c9d8ff]" : ""
                      }`}
                    >
                      <p className={`font-['Nunito'] font-semibold text-[16px] tracking-[0.16px] ${
                        isActive ? "text-[#1e3f8a]" : "text-[#334156]"
                      }`}>
                        {tab.label}
                      </p>
                    </button>
                  );
                })}
              </div>
              <div className="space-y-[8px] pl-[40px]">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#3b82f6] shrink-0" />
                  <p className="font-['Nunito'] text-[12px] text-[#606060]">Official info</p>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#f97316] shrink-0" />
                  <p className="font-['Nunito'] text-[12px] text-[#606060]">User-submitted</p>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#22c55e] shrink-0" />
                  <p className="font-['Nunito'] text-[12px] text-[#606060]">Outside content</p>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#a855f7] shrink-0" />
                  <p className="font-['Nunito'] text-[12px] text-[#606060]">AI synthesis</p>
                </div>
              </div>
            </div>

            {/* Tab content — scrolled programmatically, no visible scrollbar */}
            <div ref={tabContentRef} className="flex-1 overflow-y-scroll hide-scrollbar pr-[8px]">
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

function ContentItem({ type, children }: { type: "official" | "user" | "outside" | "ai"; children: React.ReactNode }) {
  const colors = {
    official: { bg: "bg-[#dbeafe]", border: "border-[#93c5fd]", text: "text-[#1e40af]" },
    user: { bg: "bg-[#fed7aa]", border: "border-[#fdba74]", text: "text-[#9a3412]" },
    outside: { bg: "bg-[#bbf7d0]", border: "border-[#86efac]", text: "text-[#166534]" },
    ai: { bg: "bg-[#e9d5ff]", border: "border-[#d8b4fe]", text: "text-[#6b21a8]" },
  };

  const style = colors[type];

  return (
    <div className={`${style.bg} border ${style.border} rounded-[6px] px-[12px] py-[8px]`}>
      <p className={`font-['Nunito'] text-[14px] ${style.text} tracking-[0.14px]`}>{children}</p>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* Overview Content Block */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">Overview Content</h3>
        <div className="space-y-[8px]">
          <ContentItem type="official">Yes / No vote summary (AG verbatim)</ContentItem>
          <ContentItem type="ai">AI plain-language summary of the measure</ContentItem>
          <ContentItem type="official">Current procedural stage callout with next key date</ContentItem>
          <ContentItem type="official">Campaign finance snapshot — total raised YES vs NO</ContentItem>
        </div>
      </div>

      {/* Featured Testimony */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">Featured Testimony</h3>
        <div className="space-y-[8px]">
          <ContentItem type="user">Featured org testimony — YES (surfaced from Testimony & Community tab)</ContentItem>
          <ContentItem type="user">Featured org testimony — NO (surfaced from Testimony & Community tab)</ContentItem>
        </div>
      </div>

      {/* AI Synthesis & Media Snapshot */}
      <div className="flex gap-[16px]">
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">AI Synthesis</h3>
          <div className="space-y-[8px]">
            <ContentItem type="ai">AI synthesis snapshot — top YES argument with citation</ContentItem>
            <ContentItem type="ai">AI synthesis snapshot — top NO argument with citation</ContentItem>
          </div>
        </div>
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">Media Coverage</h3>
          <div className="space-y-[8px]">
            <ContentItem type="outside">Media coverage snapshot (surfaced from Media Coverage tab)</ContentItem>
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
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">Official Ballot Information</h3>
        <div className="space-y-[8px]">
          <ContentItem type="official">Official ballot question — exact wording (Secretary of State)</ContentItem>
          <ContentItem type="official">AG plain-language summary (verbatim)</ContentItem>
          <ContentItem type="official">Full legal text (link out)</ContentItem>
          <ContentItem type="official">What a YES vote does (AG verbatim)</ContentItem>
          <ContentItem type="official">What a NO vote does (AG verbatim)</ContentItem>
          <ContentItem type="official">Fiscal impact statement (verbatim)</ContentItem>
          <ContentItem type="ai">Plain language translation of fiscal impact</ContentItem>
        </div>
      </div>

      {/* Readability & Context */}
      <div className="flex gap-[16px]">
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">Readability</h3>
          <div className="space-y-[8px]">
            <ContentItem type="outside">Readability score — Flesch-Kincaid grade level of ballot language</ContentItem>
            <ContentItem type="outside">Readability score — Flesch Reading Ease</ContentItem>
            <ContentItem type="ai">Glossary — undefined or ambiguous terms surfaced from ballot text, defined from official sources</ContentItem>
          </div>
        </div>
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">Process & Timeline</h3>
          <div className="space-y-[8px]">
            <ContentItem type="official">Path to ballot timeline — filing, AG certification, signature rounds, legislative review, final certification</ContentItem>
            <ContentItem type="official">Signature counts — required vs submitted vs certified</ContentItem>
            <ContentItem type="official">Legislative action or inaction during review window</ContentItem>
            <ContentItem type="ai">Plain language explainer of how this measure type works in Massachusetts</ContentItem>
          </div>
        </div>
      </div>

      {/* Related Context */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">Related Context</h3>
        <div className="space-y-[8px]">
          <ContentItem type="official">Current state of the law or policy being changed</ContentItem>
          <ContentItem type="official">Key institutions and offices involved</ContentItem>
          <ContentItem type="outside">Prior Massachusetts ballot measures on this topic (RAG from legislative database)</ContentItem>
          <ContentItem type="outside">Related bills filed on Beacon Hill (RAG from legislative database)</ContentItem>
          <ContentItem type="outside">How comparable measures have fared in other states</ContentItem>
          <ContentItem type="ai">AI identification of essential context for understanding this measure</ContentItem>
          <ContentItem type="ai">AI-surfaced connections to related Beacon Hill activity</ContentItem>
        </div>
      </div>
    </div>
  );
}

function ForAgainstTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* AI Synthesis of Arguments — Side by Side */}
      <div className="flex gap-[16px]">
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[16px]">YES Arguments</h3>
          <div className="space-y-[12px]">
            <div className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px]">
              <p className="font-['Nunito'] font-semibold text-[14px] text-[#6b21a8] mb-[4px]">
                Transparency Argument <sup className="text-[#6b21a8] font-normal">[1][3][testimony]</sup>
              </p>
              <p className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
                Massachusetts is one of only 4 states that exempt their legislature from auditor oversight. Academic research and testimony from good-government groups argue this creates an accountability gap, especially given the legislature's exemption from public records laws.
              </p>
            </div>
            <div className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px]">
              <p className="font-['Nunito'] font-semibold text-[14px] text-[#6b21a8] mb-[4px]">
                Precedent Argument <sup className="text-[#6b21a8] font-normal">[2][5]</sup>
              </p>
              <p className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
                46 other states grant their auditors this authority without constitutional crisis. Think tank reports note that peer states like Connecticut and Vermont have successfully implemented legislative audits for over 20 years.
              </p>
            </div>
            <div className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px]">
              <p className="font-['Nunito'] font-semibold text-[14px] text-[#6b21a8] mb-[4px]">
                Self-Audit Limitation <sup className="text-[#6b21a8] font-normal">[4][6]</sup>
              </p>
              <p className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
                Legislature currently audits itself via hired consultants. Research on self-audit finds lower detection rates for compliance issues and procedural irregularities compared to independent review.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[16px]">NO Arguments</h3>
          <div className="space-y-[12px]">
            <div className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px]">
              <p className="font-['Nunito'] font-semibold text-[14px] text-[#6b21a8] mb-[4px]">
                Separation of Powers <sup className="text-[#6b21a8] font-normal">[3][testimony]</sup>
              </p>
              <p className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
                Allowing an elected executive branch official to audit the legislature could violate the state constitution's separation of powers clause. Legal scholars cited in testimony argue this could set precedent for executive overreach into legislative functions.
              </p>
            </div>
            <div className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px]">
              <p className="font-['Nunito'] font-semibold text-[14px] text-[#6b21a8] mb-[4px]">
                Politicization Risk <sup className="text-[#6b21a8] font-normal">[1][testimony]</sup>
              </p>
              <p className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
                Because the State Auditor is elected, granting legislative audit authority could turn the office into a political actor. Academic research notes potential for "audit as opposition research" when auditor and legislative majority are from different parties.
              </p>
            </div>
            <div className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px]">
              <p className="font-['Nunito'] font-semibold text-[14px] text-[#6b21a8] mb-[4px]">
                Existing Mechanisms <sup className="text-[#6b21a8] font-normal">[testimony]</sup>
              </p>
              <p className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
                Legislature already contracts independent auditors and publishes financial statements. Opposition argues Question 1 is a solution in search of a problem, noting no documented instances of financial mismanagement requiring external intervention.
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Nunito'] text-[13px] text-[#808080] italic px-[8px]">
        Each argument individually wrapped in purple containers maintains neutrality while visually grouping related AI synthesis — matches treatment of analysis sections below.
      </p>

      {/* Analysis & Open Questions — from Concept F */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[16px]">Analysis & Open Questions</h3>

        <div className="space-y-[16px]">
          <div className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-[#6b21a8] mb-[6px]">
              Areas of Consensus <sup className="text-[#6b21a8] font-normal">[all sources]</sup>
            </p>
            <ul className="list-disc list-inside space-y-[4px]">
              <li className="font-['Nunito'] text-[14px] text-black">The current system relies on legislative self-audit via contracted vendors</li>
              <li className="font-['Nunito'] text-[14px] text-black">Massachusetts is among a small minority of states without external legislative audit</li>
              <li className="font-['Nunito'] text-[14px] text-black">No documented financial scandals have prompted this measure</li>
            </ul>
          </div>

          <div className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-[#6b21a8] mb-[6px]">
              Areas of Disagreement <sup className="text-[#6b21a8] font-normal">[all sources]</sup>
            </p>
            <ul className="list-disc list-inside space-y-[4px]">
              <li className="font-['Nunito'] text-[14px] text-black">Whether cross-branch audit violates separation of powers (legal scholars split)</li>
              <li className="font-['Nunito'] text-[14px] text-black">Whether an elected auditor can remain non-partisan when auditing legislature</li>
              <li className="font-['Nunito'] text-[14px] text-black">Whether existing transparency mechanisms are sufficient</li>
            </ul>
          </div>

          <div className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-[#6b21a8] mb-[6px]">
              Open Questions <sup className="text-[#6b21a8] font-normal">[evidence gaps]</sup>
            </p>
            <ul className="list-disc list-inside space-y-[4px]">
              <li className="font-['Nunito'] text-[14px] text-black">What specific practices would an audit examine? (scope undefined in ballot language)</li>
              <li className="font-['Nunito'] text-[14px] text-black">Have other states seen politicization of similar cross-branch audit authority?</li>
              <li className="font-['Nunito'] text-[14px] text-black">What problems would be solved that current mechanisms don't address?</li>
            </ul>
          </div>

          <div className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-[#6b21a8] mb-[6px]">
              Claim Mapping <sup className="text-[#6b21a8] font-normal">[contested claims]</sup>
            </p>
            <div className="space-y-[8px]">
              <div>
                <p className="font-['Nunito'] text-[14px] text-black font-semibold">Claim: "MA is one of the least transparent legislatures"</p>
                <p className="font-['Nunito'] text-[13px] text-[#606060] mt-[2px]">
                  ✓ Supported by Center for Public Integrity ranking (2015) — ⚠ No recent comparative data available
                </p>
              </div>
              <div>
                <p className="font-['Nunito'] text-[14px] text-black font-semibold">Claim: "Would violate separation of powers"</p>
                <p className="font-['Nunito'] text-[13px] text-[#606060] mt-[2px]">
                  ⚠ Contested — Constitutional law scholars split, no definitive legal precedent in MA
                </p>
              </div>
              <div>
                <p className="font-['Nunito'] text-[14px] text-black font-semibold">Claim: "46 states already have this authority"</p>
                <p className="font-['Nunito'] text-[13px] text-[#606060] mt-[2px]">
                  ✓ Confirmed by National Conference of State Legislatures data (2023)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Nunito'] text-[13px] text-[#808080] italic px-[8px]">
        Consensus and contested areas presented in single column because they represent cross-cutting analysis that doesn't fit YES/NO framing.
      </p>

      {/* Research & Evidence — at Bottom */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[16px]">Research & Evidence</h3>

        <div className="space-y-[16px]">
          {/* AI Synthesis at Top */}
          <div className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-[#6b21a8] mb-[8px]">
              AI Synthesis of Research <sup className="text-[#6b21a8] font-normal">[1-6]</sup>
            </p>
            <p className="font-['Nunito'] text-[14px] text-black leading-[1.6]">
              The academic literature consistently finds that audit independence improves oversight outcomes, but is divided on whether cross-branch auditing violates separation of powers principles. Research shows that 46 states grant their auditors authority to audit the legislature, though implementation varies. Evidence on effectiveness is thin: only 3 published studies examine legislative audit outcomes, none in Massachusetts. The contested area is constitutional interpretation, not empirical effectiveness.
            </p>
          </div>

          <div className="border-l-4 border-[#22c55e] pl-[16px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[4px]">
              Peer-Reviewed Research <sup className="text-[#6b21a8] font-normal">[1][2][3]</sup>
            </p>
            <ul className="space-y-[8px]">
              <li className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
                Bowman, A. & Woods, N. (2010). "Effective State Auditing: Examining the Relationship Between Audit Independence and Oversight Outcomes." <em>Public Administration Review</em>, 70(3), 468-479.
              </li>
              <li className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
                Clark, R. (2015). "Legislative Self-Audit vs. Independent Review: A Comparative Study of U.S. State Legislatures." <em>State Politics & Policy Quarterly</em>, 15(2), 201-223.
              </li>
              <li className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
                Dunn, D. & Legge, J. (2001). "Separation of Powers and State Audit Functions: The Case for Constitutional Independence." <em>American Political Science Review</em>, 95(4), 855-869.
              </li>
            </ul>
          </div>

          <div className="border-l-4 border-[#22c55e] pl-[16px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[4px]">
              Think Tank Reports <sup className="text-[#6b21a8] font-normal">[4][5]</sup>
            </p>
            <ul className="space-y-[8px]">
              <li className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
                <span className="font-semibold">Pioneer Institute</span> <span className="text-[#808080]">(right-leaning)</span>: "Legislative Transparency in Massachusetts: Recommendations for Reform" (2023)
              </li>
              <li className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
                <span className="font-semibold">MassINC</span> <span className="text-[#808080]">(non-partisan)</span>: "State Government Accountability: Audit Practices Across New England" (2022)
              </li>
            </ul>
          </div>

          <div className="border-l-4 border-[#22c55e] pl-[16px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[4px]">
              Government Data <sup className="text-[#6b21a8] font-normal">[6]</sup>
            </p>
            <p className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
              Office of the State Auditor Annual Report (FY2023): Documents 47 audits of executive branch agencies, zero audits of legislative operations in past 10 years.
            </p>
          </div>
        </div>
      </div>
      <p className="font-['Nunito'] text-[13px] text-[#808080] italic px-[8px]">
        Research & evidence appears at bottom for reference — users who engaged with positions and analysis above can verify claims with underlying sources.
      </p>
    </div>
  );
}

function PublicPerspectivesTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* Organization Testimony */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">Organization Testimony</h3>
        <div className="space-y-[8px]">
          <ContentItem type="user">Verified org testimony — YES position</ContentItem>
          <ContentItem type="user">Verified org testimony — NO position</ContentItem>
          <ContentItem type="user">Verified org testimony — neutral or informational</ContentItem>
          <ContentItem type="user">Count of orgs who have submitted testimony</ContentItem>
        </div>
      </div>

      {/* Individual Testimony */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">Individual Testimony</h3>
        <div className="space-y-[8px]">
          <ContentItem type="user">Individual testimony — YES position</ContentItem>
          <ContentItem type="user">Individual testimony — NO position</ContentItem>
          <ContentItem type="user">Individual testimony — neutral or questions raised</ContentItem>
          <ContentItem type="user">Count of individuals who have submitted testimony</ContentItem>
        </div>
      </div>

      {/* Questions & Engagement */}
      <div className="flex gap-[16px]">
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">User Engagement</h3>
          <div className="space-y-[8px]">
            <ContentItem type="user">User-submitted questions</ContentItem>
            <ContentItem type="user">Post your own testimony (CTA)</ContentItem>
          </div>
        </div>
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">AI Synthesis</h3>
          <div className="space-y-[8px]">
            <ContentItem type="ai">AI synthesis of org testimony — strongest YES arguments, citations required</ContentItem>
            <ContentItem type="ai">AI synthesis of org testimony — strongest NO arguments, citations required</ContentItem>
          </div>
        </div>
      </div>

      {/* Analysis of Testimony */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">Analysis of Community Input</h3>
        <div className="space-y-[8px]">
          <ContentItem type="ai">Areas of consensus across testimony</ContentItem>
          <ContentItem type="ai">Areas of disagreement across testimony</ContentItem>
          <ContentItem type="ai">Open questions and unresolved claims from testimony</ContentItem>
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
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">News Coverage</h3>
        <div className="space-y-[8px]">
          <ContentItem type="outside">News articles — Massachusetts outlets</ContentItem>
          <ContentItem type="outside">News articles — national outlets</ContentItem>
          <ContentItem type="outside">Editorial board positions (outlet named, YES / NO / neutral)</ContentItem>
          <ContentItem type="outside">Opinion and op-ed pieces (author and outlet named)</ContentItem>
        </div>
      </div>

      {/* AI Analysis of Coverage */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">AI Analysis of Media Coverage</h3>
        <div className="space-y-[8px]">
          <ContentItem type="ai">AI synthesis of media coverage — dominant narratives, notable disagreements, citations required</ContentItem>
          <ContentItem type="ai">AI identification of claims in media coverage that are contested or unverified</ContentItem>
        </div>
      </div>

      {/* Polling Data */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">Polling Data</h3>
        <div className="space-y-[8px]">
          <ContentItem type="outside">Polls — pollster, date, sample size, margin of error, YES %, NO %, undecided %</ContentItem>
          <ContentItem type="outside">Exact poll question wording per poll</ContentItem>
          <ContentItem type="ai">AI synthesis of polling trend (if multiple polls exist)</ContentItem>
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
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">YES Committee</h3>
          <div className="space-y-[8px]">
            <ContentItem type="official">Total raised — YES committee</ContentItem>
            <ContentItem type="official">Total spent — YES committee</ContentItem>
            <ContentItem type="official">Top donors — YES (name, amount, employer or affiliation)</ContentItem>
          </div>
        </div>
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">NO Committee</h3>
          <div className="space-y-[8px]">
            <ContentItem type="official">Total raised — NO committee</ContentItem>
            <ContentItem type="official">Total spent — NO committee</ContentItem>
            <ContentItem type="official">Top donors — NO (name, amount, employer or affiliation)</ContentItem>
          </div>
        </div>
      </div>

      {/* Additional Financial Details */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">Additional Financial Details</h3>
        <div className="space-y-[8px]">
          <ContentItem type="official">In-kind contributions (where notable)</ContentItem>
          <ContentItem type="official">Signature gathering expenditures</ContentItem>
          <ContentItem type="official">Cost per required signature (CPRS)</ContentItem>
        </div>
      </div>

      {/* AI Analysis */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">AI Analysis of Funding Patterns</h3>
        <div className="space-y-[8px]">
          <ContentItem type="ai">AI pattern note — funding concentration, out-of-state money, timing of donations (cited to OCPF)</ContentItem>
        </div>
      </div>
    </div>
  );
}
