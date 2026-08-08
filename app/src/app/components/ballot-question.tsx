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

export default function BallotQuestion() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="min-h-screen bg-[#ededed]">
      {/* Max-width wrapper for centering */}
      <div className="max-w-[1550px] mx-auto">
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
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`h-[45px] rounded-[8px] p-[8px] flex items-center justify-start transition-colors ${
                    isActive ? "bg-[rgba(232,239,255,0.68)] border border-[#c9d8ff]" : ""
                  }`}
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
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* For & Against Cards */}
      <div className="flex gap-[16px]">
        <VotingYesCard />
        <VotingNoCard />
      </div>
    </div>
  );
}

function VotingYesCard() {
  return (
    <div className="bg-white rounded-[8px] p-[24px] flex-1 space-y-[4px]">
      <div className="flex gap-[8px] items-start mb-[12px]">
        <Check className="size-[36px]" />
        <p className="font-['Nunito'] text-[24px] text-black tracking-[0.24px]">Voting Yes</p>
      </div>

      <div className="font-['Nunito'] text-[16px] text-black tracking-[0.16px] mb-[16px]">
        <p>Would specify that the State Auditor</p>
        <p>has the authority to audit the Legislature.</p>
      </div>

      <div className="grid grid-cols-2 gap-[8px] mb-[8px]">
        <p className="font-['Nunito'] font-bold text-[14px] text-black tracking-[0.14px]">
          Campaign Organizer
        </p>
        <p className="font-['Nunito'] font-bold text-[14px] text-black tracking-[0.14px]">Funding Raised</p>
      </div>

      <div className="grid grid-cols-2 gap-[8px] mb-[16px]">
        <div className="relative h-[44px]">
          <div className="absolute left-0 top-0 size-[31px] rounded-full border-[7px] border-[#f3e684] overflow-hidden">
            <img alt="" className="w-full h-full object-cover" src={imgScreenshot} />
          </div>
        </div>
        <p className="font-['Nunito'] font-bold text-[24px] text-black tracking-[0.24px]">$436K</p>
      </div>

      <p className="font-['Nunito'] font-bold text-[14px] text-black tracking-[0.14px] mb-[8px]">Supporting</p>

      <div className="flex gap-[8px] mb-[16px]">
        <img src={imgImage1} alt="" className="size-[44px] rounded-full border border-[#e5e5e5]" />
        <img src={imgImage5} alt="" className="size-[44px] rounded-full" />
        <img src={imgImage2} alt="" className="size-[44px] rounded-full border border-[#e5e5e5]" />
        <img src={imgImage3} alt="" className="size-[44px] rounded-full border border-[#e5e5e5]" />
        <img src={imgImage4} alt="" className="size-[44px] rounded-full border border-[#e5e5e5]" />
      </div>

      <p className="font-['Nunito'] font-bold text-[14px] text-black tracking-[0.14px] mb-[8px]">Testimony</p>

      <div className="bg-[#eaeaea] p-[16px]">
        <div className="font-['Nunito'] text-[14px] text-black tracking-[0.14px]">
          <p className="mb-2">
            "Legislative leaders claim it is sufficient for the Legislature to conduct audits of itself through a procured private vendor. However, the Massachusetts Legislature is continuously ranked as one of the least effective, least transparent legislatures in America and is one of only four legislatures that exempts itself from public records laws."
          </p>
          <p className="font-bold">- Neil Morrison, Committee for Transparent Democracy</p>
        </div>
      </div>
    </div>
  );
}

function VotingNoCard() {
  return (
    <div className="bg-white rounded-[8px] p-[24px] flex-1 space-y-[4px]">
      <div className="flex gap-[8px] items-start mb-[12px]">
        <X className="size-[36px]" />
        <p className="font-['Nunito'] text-[24px] text-black tracking-[0.24px]">Voting No</p>
      </div>

      <div className="font-['Nunito'] text-[16px] text-black tracking-[0.16px] mb-[16px]">
        <p>Would make no change in the law</p>
        <p>relative to the State Auditor's authority.</p>
      </div>

      <div className="grid grid-cols-2 gap-[8px] mb-[8px]">
        <p className="font-['Nunito'] font-bold text-[14px] text-black tracking-[0.14px]">
          Campaign Organizer
        </p>
        <p className="font-['Nunito'] font-bold text-[14px] text-black tracking-[0.14px]">Funding Raised</p>
      </div>

      <div className="grid grid-cols-2 gap-[8px] mb-[16px]">
        <div className="bg-[#f7f7f7] border-2 border-dashed border-[#acacac] rounded-full size-[44px] flex items-center justify-center">
          <p className="font-['Nunito'] font-bold text-[13px] text-black tracking-[0.13px]">N/A</p>
        </div>
        <p className="font-['Nunito'] font-bold text-[24px] text-black tracking-[0.24px]">$0</p>
      </div>

      <p className="font-['Nunito'] font-bold text-[14px] text-black tracking-[0.14px] mb-[8px]">Opposing</p>

      <div className="flex gap-[8px] mb-[16px]">
        <img src={imgImage6} alt="" className="size-[44px] rounded-full" />
        <div className="bg-[#d9d9d9] rounded-full size-[44px]" />
        <div className="bg-[#d9d9d9] rounded-full size-[44px]" />
      </div>

      <p className="font-['Nunito'] font-bold text-[14px] text-black tracking-[0.14px] mb-[8px]">Testimony</p>

      <div className="bg-[#eaeaea] p-[16px]">
        <div className="font-['Nunito'] text-[14px] text-black tracking-[0.14px]">
          <p className="mb-2">
            "If enacted Question 1 would make the State Auditor into a political actor and a potentially influential participant in the legislative process, two roles that would clearly compromise the State Auditor's ability to carry out her fundamental constitutional duty to conduct credible, independent, objective, and non-partisan audits of state government departments and programs."
          </p>
          <p className="font-bold">- Jerold Duquette, Professor of Political Science at CCSU</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundTab() {
  return (
    <div className="bg-white rounded-[8px] p-[24px]">
      <h2 className="font-['Nunito'] font-semibold text-[24px] text-black mb-[16px]">Background</h2>
      <div className="font-['Nunito'] text-[16px] text-black tracking-[0.16px] space-y-[12px]">
        <p>Additional background information would be displayed here.</p>
        <p>This section would provide historical context, previous legislation, and relevant details about the ballot question.</p>
      </div>
    </div>
  );
}

function ForAgainstTab() {
  return (
    <div className="flex gap-[16px]">
      <VotingYesCard />
      <VotingNoCard />
    </div>
  );
}

function CampaignFinanceTab() {
  return (
    <div className="bg-white rounded-[8px] p-[24px]">
      <h2 className="font-['Nunito'] font-semibold text-[24px] text-black mb-[16px]">Campaign Finance</h2>
      <div className="font-['Nunito'] text-[16px] text-black tracking-[0.16px] space-y-[12px]">
        <p>Detailed campaign finance information would be displayed here.</p>
        <p>This would include funding sources, expenditures, and financial reports for both supporting and opposing campaigns.</p>
      </div>
    </div>
  );
}

function PublicPerspectivesTab() {
  return (
    <div className="bg-white rounded-[8px] p-[24px]">
      <div className="flex gap-[8px] items-center mb-[16px]">
        <Users className="size-[24px]" />
        <h2 className="font-['Nunito'] font-semibold text-[24px] text-black">Public Perspectives</h2>
      </div>

      <div className="space-y-[16px]">
        <div>
          <p className="font-['Nunito'] font-bold text-[14px] text-black tracking-[0.14px] mb-[4px]">
            Community Feedback
          </p>
          <p className="font-['Nunito'] text-[16px] text-black tracking-[0.16px]">
            Public comments and perspectives from community members would be displayed here.
          </p>
        </div>
        <div>
          <p className="font-['Nunito'] font-bold text-[14px] text-black tracking-[0.14px] mb-[4px]">
            Survey Results
          </p>
          <p className="font-['Nunito'] text-[16px] text-black tracking-[0.16px]">
            Results from public opinion surveys and polls.
          </p>
        </div>
      </div>
    </div>
  );
}

function MediaCoverageTab() {
  return (
    <div className="bg-white rounded-[8px] p-[24px]">
      <h2 className="font-['Nunito'] font-semibold text-[24px] text-black mb-[16px]">Media Coverage</h2>
      <div className="font-['Nunito'] text-[16px] text-black tracking-[0.16px] space-y-[12px]">
        <p>News articles, opinion pieces, and media analysis would be displayed here.</p>
        <p>This section would include coverage from local and national news sources about the ballot question.</p>
      </div>
    </div>
  );
}
