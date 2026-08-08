import { useState } from "react";
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

export default function ConceptG() {
  const [activeTab, setActiveTab] = useState<TabId>("for-against");

  return (
    <div className="min-h-screen bg-[#ededed]">
      {/* Page Content */}
      <div className="flex flex-col gap-[16px] pb-[72px] pt-[24px] px-[90px]">
        {/* Page Title */}
        <div className="flex items-start">
          <h1 className="font-['Nunito'] font-semibold text-[40px] text-black tracking-[0.4px]">
            Ballot Question 1 (2024)
          </h1>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-[12px] overflow-clip pb-[22px] pt-[24px]">
          <div className="flex gap-[24px] items-center w-full px-[24px]">
            {/* Large Number */}
            <p className="font-['Lexend'] font-thin text-[56px] text-black text-center tracking-[0.56px] w-[135px]">
              1
            </p>

            {/* Title & Description */}
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

                {/* Topic Tags */}
                <div className="flex gap-[8px] items-start">
                  <div className="bg-[#f0f0f0] border border-[#d1d1d1] px-[10px] py-[4px] rounded-[100px]">
                    <p className="font-['Nunito'] font-bold text-[12px] text-[#606060] tracking-[0.12px]">
                      Public Information
                    </p>
                  </div>
                  <div className="bg-[#f0f0f0] border border-[#d1d1d1] px-[10px] py-[4px] rounded-[100px]">
                    <p className="font-['Nunito'] font-bold text-[12px] text-[#606060] tracking-[0.12px]">
                      Legislative Process
                    </p>
                  </div>
                  <div className="bg-[#f0f0f0] border border-[#d1d1d1] px-[10px] py-[4px] rounded-[100px]">
                    <p className="font-['Nunito'] font-bold text-[12px] text-[#606060] tracking-[0.12px]">
                      State Executive Powers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Take Part Sidebar */}
            <div className="bg-[#f9fafc] border border-[#dee2e6] rounded-[12px] p-[24px] flex flex-col gap-[24px] items-center w-[260px]">
              <p className="font-['Nunito'] font-bold text-[14px] text-[#64758b] tracking-[1.26px]">
                TAKE PART
              </p>
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

        {/* Main Content Area with Sidebar and Tabs */}
        <div className="bg-[#ededed] flex gap-[24px] items-start pb-[40px] pr-[24px] pt-[16px]">
          {/* Left Sidebar Navigation */}
          <div className="bg-white flex flex-col gap-[8px] p-[16px] rounded-[8px] w-[224px] shrink-0">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const isDisabled = tab.id !== "for-against";
              return (
                <button
                  key={tab.id}
                  onClick={() => !isDisabled && setActiveTab(tab.id)}
                  disabled={isDisabled}
                  className={`h-[45px] rounded-[8px] p-[8px] flex items-center justify-start transition-colors ${
                    isActive ? "bg-[rgba(232,239,255,0.68)] border border-[#c9d8ff]" : ""
                  } ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  <p
                    className={`font-['Nunito'] font-semibold text-[16px] tracking-[0.16px] ${
                      isActive ? "text-[#1e3f8a]" : "text-[#334156]"
                    }`}
                  >
                    {tab.label}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1">
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
      {/* Research & Evidence — Leading with Facts */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[16px]">Research & Evidence</h3>

        <div className="space-y-[16px]">
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

          <div className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-[#6b21a8] mb-[8px]">
              AI Synthesis of Research <sup className="text-[#6b21a8] font-normal">[1-6]</sup>
            </p>
            <p className="font-['Nunito'] text-[14px] text-black leading-[1.6]">
              The academic literature consistently finds that audit independence improves oversight outcomes, but is divided on whether cross-branch auditing violates separation of powers principles. Research shows that 46 states grant their auditors authority to audit the legislature, though implementation varies. Evidence on effectiveness is thin: only 3 published studies examine legislative audit outcomes, none in Massachusetts. The contested area is constitutional interpretation, not empirical effectiveness.
            </p>
          </div>
        </div>
      </div>
      <p className="font-['Nunito'] text-[13px] text-[#808080] italic px-[8px]">
        Evidence appears first to ground the user in factual material before encountering campaign advocacy — serves users who want to form opinions from research.
      </p>

      {/* Official Campaign Positions — Condensed */}
      <div className="flex gap-[16px]">
        {/* YES Campaign */}
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[16px]">YES Campaign Position</h3>

          <div className="mb-[16px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-[#606060] mb-[4px]">Committee</p>
            <p className="font-['Nunito'] text-[16px] text-black">Committee for Transparent Democracy</p>
            <p className="font-['Nunito'] text-[14px] text-[#808080] mt-[2px]">OCPF ID: 24-001-YES</p>
          </div>

          <div>
            <p className="font-['Nunito'] font-semibold text-[14px] text-[#606060] mb-[4px]">Official Statement</p>
            <p className="font-['Nunito'] text-[16px] text-black leading-[1.5]">
              "Legislative leaders claim it is sufficient for the Legislature to conduct audits of itself through a procured private vendor. However, the Massachusetts Legislature is continuously ranked as one of the least effective, least transparent legislatures in America and is one of only four legislatures that exempts itself from public records laws."
            </p>
          </div>
        </div>

        {/* NO Campaign */}
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[16px]">NO Campaign Position</h3>

          <div className="mb-[16px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-[#606060] mb-[4px]">Committee</p>
            <p className="font-['Nunito'] text-[16px] text-black">No registered committee</p>
            <p className="font-['Nunito'] text-[14px] text-[#808080] mt-[2px]">No official campaign finance activity</p>
          </div>

          <div>
            <p className="font-['Nunito'] font-semibold text-[14px] text-[#606060] mb-[4px]">Position Statement</p>
            <p className="font-['Nunito'] text-[16px] text-black leading-[1.5]">
              "If enacted Question 1 would make the State Auditor into a political actor and a potentially influential participant in the legislative process, two roles that would clearly compromise the State Auditor's ability to carry out her fundamental constitutional duty to conduct credible, independent, objective, and non-partisan audits of state government departments and programs."
            </p>
            <p className="font-['Nunito'] text-[14px] text-[#808080] mt-[8px]">— Prof. Jerold Duquette, Political Science, CCSU</p>
          </div>
        </div>
      </div>
      <p className="font-['Nunito'] text-[13px] text-[#808080] italic px-[8px]">
        Campaign positions condensed to committee info and official statements only — advocacy appears after evidence to avoid priming the user's interpretation.
      </p>

      {/* Supporting Voices — Demoted to Links */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[16px]">Supporting Voices</h3>
        <div className="flex gap-[24px]">
          <div className="flex-1">
            <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[8px]">YES Side</p>
            <div className="space-y-[6px]">
              <div className="flex items-center gap-[8px]">
                <span className="font-['Nunito'] text-[14px] text-[#606060]">12 organizations</span>
                <a href="#" className="text-[#12266f] underline font-['Nunito'] text-[14px]">View list →</a>
              </div>
              <div className="flex items-center gap-[8px]">
                <span className="font-['Nunito'] text-[14px] text-[#606060]">3 elected officials</span>
                <a href="#" className="text-[#12266f] underline font-['Nunito'] text-[14px]">View list →</a>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[8px]">NO Side</p>
            <div className="space-y-[6px]">
              <div className="flex items-center gap-[8px]">
                <span className="font-['Nunito'] text-[14px] text-[#606060]">1 organization</span>
                <a href="#" className="text-[#12266f] underline font-['Nunito'] text-[14px]">View list →</a>
              </div>
              <div className="flex items-center gap-[8px]">
                <span className="font-['Nunito'] text-[14px] text-[#606060]">0 elected officials</span>
                <span className="font-['Nunito'] text-[14px] text-[#808080] italic">None publicly opposed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Nunito'] text-[13px] text-[#808080] italic px-[8px]">
        Endorsers and elected officials demoted to one-click-away links to reduce visual weight of advocacy and keep focus on positions and evidence.
      </p>

      {/* AI Synthesis Dashboard — All Together */}
      <div className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-[#6b21a8] mb-[16px]">AI Synthesis & Analysis</h3>

        <div className="space-y-[20px]">
          {/* Arguments Grid */}
          <div className="grid grid-cols-2 gap-[16px]">
            <div>
              <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[8px]">
                Strongest YES Arguments <sup className="text-[#6b21a8] font-normal">[1][3][5][testimony]</sup>
              </p>
              <ul className="list-disc list-inside space-y-[6px]">
                <li className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
                  <span className="font-semibold">Transparency gap:</span> MA is one of only 4 states without legislative audit authority
                </li>
                <li className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
                  <span className="font-semibold">Precedent:</span> 46 states have this authority without constitutional issues
                </li>
                <li className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
                  <span className="font-semibold">Self-audit limits:</span> Research shows lower detection rates vs. independent review
                </li>
              </ul>
            </div>
            <div>
              <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[8px]">
                Strongest NO Arguments <sup className="text-[#6b21a8] font-normal">[3][testimony]</sup>
              </p>
              <ul className="list-disc list-inside space-y-[6px]">
                <li className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
                  <span className="font-semibold">Separation of powers:</span> May violate constitutional clause per legal scholars
                </li>
                <li className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
                  <span className="font-semibold">Politicization risk:</span> Elected auditor could use authority as political tool
                </li>
                <li className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
                  <span className="font-semibold">Existing mechanisms:</span> Legislature already contracts independent auditors
                </li>
              </ul>
            </div>
          </div>

          {/* Consensus & Disagreement */}
          <div className="border-t border-[#d8b4fe] pt-[16px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[6px]">
              Areas of Consensus <sup className="text-[#6b21a8] font-normal">[all sources]</sup>
            </p>
            <ul className="list-disc list-inside space-y-[4px] mb-[12px]">
              <li className="font-['Nunito'] text-[14px] text-black">Current system relies on legislative self-audit via contracted vendors</li>
              <li className="font-['Nunito'] text-[14px] text-black">Massachusetts is among small minority of states without external legislative audit</li>
              <li className="font-['Nunito'] text-[14px] text-black">No documented financial scandals prompted this measure</li>
            </ul>

            <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[6px]">
              Areas of Disagreement <sup className="text-[#6b21a8] font-normal">[all sources]</sup>
            </p>
            <ul className="list-disc list-inside space-y-[4px]">
              <li className="font-['Nunito'] text-[14px] text-black">Whether cross-branch audit violates separation of powers (legal scholars split)</li>
              <li className="font-['Nunito'] text-[14px] text-black">Whether elected auditor can remain non-partisan when auditing legislature</li>
              <li className="font-['Nunito'] text-[14px] text-black">Whether existing transparency mechanisms are sufficient</li>
            </ul>
          </div>

          {/* Open Questions */}
          <div className="border-t border-[#d8b4fe] pt-[16px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[6px]">
              Open Questions <sup className="text-[#6b21a8] font-normal">[evidence gaps]</sup>
            </p>
            <ul className="list-disc list-inside space-y-[4px]">
              <li className="font-['Nunito'] text-[14px] text-black">What specific practices would an audit examine? (scope undefined in ballot language)</li>
              <li className="font-['Nunito'] text-[14px] text-black">Have other states seen politicization of similar cross-branch audit authority?</li>
              <li className="font-['Nunito'] text-[14px] text-black">What problems would be solved that current mechanisms don't address?</li>
            </ul>
          </div>

          {/* Claim Mapping */}
          <div className="border-t border-[#d8b4fe] pt-[16px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[8px]">
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
        All AI synthesis grouped together at bottom as a unified navigation dashboard — user has seen primary sources first, AI layer helps synthesize and navigate.
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
