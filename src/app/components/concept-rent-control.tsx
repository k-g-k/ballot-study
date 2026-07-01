import { useState, useRef, useEffect, useCallback } from "react";
import {
  Megaphone,
  Scale,
  User,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from "lucide-react";

type TabId =
  | "overview"
  | "background"
  | "for-against"
  | "perspectives"
  | "media"
  | "finance";
type TestimonyType = "org" | "official" | "individual";
type Position = "yes" | "no";

interface Testimony {
  id: string;
  type: TestimonyType;
  position: Position;
  name: string;
  role: string;
  isCurrent?: boolean;
  quote: string;
}

const TESTIMONIES: Testimony[] = [
  // YES — Org statements
  {
    id: "yes-org-hmfa",
    type: "org",
    position: "yes",
    name: "Homes for All Massachusetts",
    role: "Lead campaign organization",
    quote:
      "Designed with input from residents and experts across Massachusetts, this modern rent stabilization policy will protect tenants from big corporate investors who unreasonably increase rents, while allowing local landlords to earn a reasonable profit and enabling new construction to address housing shortages.",
  },
  // YES — Officials
  {
    id: "yes-off-wu",
    type: "official",
    position: "yes",
    name: "Michelle Wu",
    role: "Mayor, City of Boston",
    isCurrent: true,
    quote:
      "Boston families deserve housing stability. This initiative reflects the kind of tenant protections that working people across our communities urgently need.",
  },
  // YES — Individuals
  {
    id: "yes-ind-ramos",
    type: "individual",
    position: "yes",
    name: "Noemi Ramos",
    role: "Executive Director, New England Community Project",
    quote:
      "We know that corporate real estate lobbyists will say anything to protect their ability to double rents overnight, and we've already had tens of thousands of conversations with voters across the state to get ahead of their misinformation, and talk about how rent stabilization will stabilize our communities, protect our essential workers, and keep rent costs reasonable and predictable so that renters can save and have a fair shot at the dream of owning a home.",
  },
  {
    id: "yes-ind-webster-smith",
    type: "individual",
    position: "yes",
    name: "Rose Webster-Smith",
    role: "Director, Springfield No One Leaves",
    quote:
      "Working class and middle class people who do the jobs that keep our state going should be able to afford a roof over our heads. But right now, out-of-control housing costs are making it impossible for hundreds of thousands of families in Massachusetts to make ends meet. We need rent stabilization to keep rent costs reasonable and predictable, so that renters can save and have a fair shot at the dream of owning a home.",
  },
  {
    id: "yes-ind-foley",
    type: "individual",
    position: "yes",
    name: "David Foley",
    role: "President, SEIU Local 509",
    quote:
      "We represent a lot of workers who make $20 or $21 an hour, and everyone feels the same crunch if they rent right now. Whatever wages the union is able to win at the bargaining table, those raises are almost always eaten up by huge rent increases.",
  },
  {
    id: "yes-ind-martinez",
    type: "individual",
    position: "yes",
    name: "Mark Martinez",
    role: "Staff Housing Attorney, Massachusetts Law Reform Institute",
    quote:
      "This isn't a development policy. This is a stabilization policy. Judging a stabilization policy based off of whether or not it's going to spur development doesn't make a whole lot of sense.",
  },
  {
    id: "yes-ind-chou",
    type: "individual",
    position: "yes",
    name: "Carolyn Chou",
    role: "Executive Director, Homes for All Massachusetts",
    quote:
      "While we made significant concessions in an effort to reach a true compromise, this legislation would achieve our primary goals of ending the state's ban on rent control and enabling strong protections from excessive rent hikes and unjust evictions for Massachusetts residents. We have agreed to not move forward with the ballot measure if this compromise language is passed by July 1.",
  },
  {
    id: "yes-ind-ramos2",
    type: "individual",
    position: "yes",
    name: "Noemi Ramos",
    role: "Chair, Keep Massachusetts Home",
    quote:
      "Rather than accept any restrictions on their ability to extract profits from our communities, a few private equity-backed real estate investment corporations financed this lawsuit in a desperate attempt to avoid a ballot campaign they were set to lose.",
  },
  // NO — Org statements
  {
    id: "no-org-hfma",
    type: "org",
    position: "no",
    name: "Housing for Massachusetts",
    role: "Lead opposition campaign committee",
    quote:
      "Rent control will impact everyone — not just rent controlled units. A recent study from the Center for State Policy Analysis at Tufts University found that rent control would almost immediately shrink the residential property tax base by 6–9% across Massachusetts municipalities. Over a decade, property values could fall by nearly 14%, costing homeowners roughly $300 billion. Cities and towns would be forced to choose between deep cuts to services or tax hikes of at least 10% to compensate.",
  },
  // NO — Officials
  {
    id: "no-off-healey",
    type: "official",
    position: "no",
    name: "Maura Healey",
    role: "Governor of Massachusetts",
    isCurrent: true,
    quote:
      "Investors in housing have already pulled out of Massachusetts because they're concerned about rent control. I don't want to see housing production stopped.",
  },
  {
    id: "no-off-mitchell",
    type: "official",
    position: "no",
    name: "Jon Mitchell",
    role: "Mayor, City of New Bedford",
    isCurrent: true,
    quote:
      "What is especially ominous about the proposed ballot question is that it applies not just to the red-hot Boston housing market, but everywhere else in the Commonwealth. In Greater New Bedford and other regions where housing developers at times struggle to make their numbers work, it would effectively shut down housing production.",
  },
  // NO — Individuals
  {
    id: "no-ind-lopes",
    type: "individual",
    position: "no",
    name: "Tony Lopes",
    role: "Representative, Small Property Owners Association",
    quote:
      "[The initiative] penalizes the small property owners who make up 60% or more of the commonwealth's rental market, including the immigrant and minority property owners who are seeking just to get ahead. We need to consider real solutions, zoning reform, more state-level housing production, and accountability for the rising cost of insurance.",
  },
  {
    id: "no-ind-joint-real-estate",
    type: "individual",
    position: "no",
    name: "Greg Vasil, Theresa Hatton & Tamara Small",
    role: "CEOs of Greater Boston Real Estate Board, MA Association of Realtors, and NAIOP Massachusetts",
    quote:
      "The risks of this ballot question for our economy cannot be overstated. It is not an opt-in: this question creates the most restrictive rent control program in the entire United States and forces it on every city and town across the Commonwealth. It will unquestionably make our housing crisis worse and significantly reduce the supply of quality homes on the rental market.",
  },
  {
    id: "no-ind-craney",
    type: "individual",
    position: "no",
    name: "Paul Diego Craney",
    role: "Executive Director, Massachusetts Fiscal Alliance",
    quote:
      "Whenever government imposes price controls, the costs always get shifted elsewhere, in this case, onto homeowners. It's a tax hike disguised as housing relief that will ultimately lead to increased costs for everyone.",
  },
  {
    id: "no-ind-shahsavari",
    type: "individual",
    position: "no",
    name: "Amir Shahsavari",
    role: "President, Small Property Owners Association",
    quote:
      "When you have a policy where rents would be capped at 5% or CPI, whichever is lower — and CPI is typically somewhere in the 2–2.5% range — that's not enough for us to keep up with expenses, and therefore housing falls into disrepair and problems ensue for both tenants, owners and other stakeholders.",
  },
  {
    id: "no-ind-ma-housing-coalition",
    type: "individual",
    position: "no",
    name: "Steve Callahan Jr., Neily Soto & Peggy Pratt",
    role: "Board Members, Massachusetts Housing Coalition",
    quote:
      "Massachusetts voters overwhelmingly banned rent control statewide in 1994 after experiencing its negative effects in communities like Boston, Cambridge, and Brookline. Rental properties under rate caps experienced deferred maintenance, reduced quality, while communities saw a noticeable drop in new rental development. When controls were lifted, housing production rebounded, and the market began adding units again.",
  },
  {
    id: "no-ind-yunits",
    type: "individual",
    position: "no",
    name: "Conor Yunits",
    role: "Spokesperson, Housing for Massachusetts",
    quote:
      "While we firmly believe that Massachusetts voters were prepared to vote 'no' in November, today's decision puts the issue to rest and protects our housing pipeline and our communities from the proven damage that rent control inflicts.",
  },
];

const TABS = [
  { id: "overview" as TabId, label: "Overview" },
  { id: "background" as TabId, label: "Background" },
  { id: "for-against" as TabId, label: "For & Against" },
  { id: "perspectives" as TabId, label: "Public Perspectives" },
  { id: "media" as TabId, label: "Media Coverage" },
  { id: "finance" as TabId, label: "Campaign Finance" },
];

const ACTIVE_TABS = new Set<TabId>([
  "overview",
  "background",
  "for-against",
  "perspectives",
  "finance",
]);

export default function ConceptRentControl() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const titleRef = useRef<HTMLDivElement>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  const updateSpacer = useCallback(() => {
    const tabContent = tabContentRef.current;
    const spacer = spacerRef.current;
    if (!tabContent || !spacer) return;
    spacer.style.height = `${tabContent.scrollHeight - tabContent.clientHeight}px`;
  }, []);

  // Re-sync spacer on tab change
  useEffect(() => {
    const t = setTimeout(updateSpacer, 50);
    return () => clearTimeout(t);
  }, [activeTab, updateSpacer]);

  // Re-sync spacer whenever inner content height changes (e.g. filter/pagination state)
  useEffect(() => {
    const tabContent = tabContentRef.current;
    if (!tabContent) return;
    const observer = new ResizeObserver(updateSpacer);
    observer.observe(tabContent);
    return () => observer.disconnect();
  }, [updateSpacer]);

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
        {/* Title */}
        <div ref={titleRef} className="pt-[24px] pb-[16px] px-[90px]">
          <h1 className="font-['Nunito'] font-semibold text-[40px] text-black tracking-[0.4px]">
            Proposed Ballot Question (2026)
          </h1>
        </div>

        {/* Sticky layout */}
        <div className="sticky top-[61px] h-[calc(100vh-61px)] overflow-hidden flex flex-col gap-[16px] px-[90px] pb-[24px] bg-[#ededed]">
          {/* Hero card */}
          <div className="bg-white rounded-[12px] overflow-clip pb-[22px] pt-[24px] shrink-0">
            <div className="flex gap-[24px] items-center w-full px-[24px]">
              <p className="font-['Lexend'] font-thin text-[56px] text-black text-center tracking-[0.56px] w-[135px]">
                —
              </p>
              <div className="flex-1">
                <div className="flex flex-col gap-[12px]">
                  <div>
                    <p className="font-['Lexend'] font-semibold text-[24px] text-black tracking-[0.24px] mb-[8px]">
                      An Initiative Petition to Protect Tenants by Limiting Rent
                      Increases
                    </p>
                    <p className="font-['Nunito'] font-normal text-[16px] text-[#808080] tracking-[-0.625px] max-w-[681px]">
                      Would cap annual rent increases for most residential units
                      at the Consumer Price Index or 5%, whichever is lower
                    </p>
                  </div>
                  <div className="flex gap-[8px] items-start flex-wrap">
                    <div className="bg-[#f0f0f0] border border-[#d1d1d1] px-[10px] py-[4px] rounded-[100px]">
                      <p className="font-['Nunito'] font-bold text-[12px] text-[#606060] tracking-[0.12px]">
                        Housing Policy
                      </p>
                    </div>
                    <div className="bg-[#f0f0f0] border border-[#d1d1d1] px-[10px] py-[4px] rounded-[100px]">
                      <p className="font-['Nunito'] font-bold text-[12px] text-[#606060] tracking-[0.12px]">
                        Tenant Rights
                      </p>
                    </div>
                    <div className="bg-[#f0f0f0] border border-[#d1d1d1] px-[10px] py-[4px] rounded-[100px]">
                      <p className="font-['Nunito'] font-bold text-[12px] text-[#606060] tracking-[0.12px]">
                        Rental Market
                      </p>
                    </div>
                    <div className="bg-[#fff3cd] border border-[#f59e0b] px-[10px] py-[4px] rounded-[100px]">
                      <p className="font-['Nunito'] font-bold text-[12px] text-[#856404] tracking-[0.12px]">
                        ⚠ Removed from 2026 ballot — June 23, 2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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

          {/* Bottom row */}
          <div className="flex gap-[24px] flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-[224px] shrink-0 flex flex-col gap-[16px]">
              <div className="bg-white flex flex-col gap-[8px] p-[16px] rounded-[8px]">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const isClickable = ACTIVE_TABS.has(tab.id);
                  return (
                    <button
                      key={tab.id}
                      onClick={() => isClickable && handleTabChange(tab.id)}
                      className={`h-[45px] rounded-[8px] p-[8px] flex items-center justify-start transition-colors ${
                        isActive
                          ? "bg-[rgba(232,239,255,0.68)] border border-[#c9d8ff]"
                          : ""
                      } ${isClickable ? "cursor-pointer" : "cursor-default opacity-40"}`}
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

            {/* Tab content */}
            <div
              ref={tabContentRef}
              className="flex-1 overflow-y-scroll hide-scrollbar pr-[8px]"
            >
              <div className="flex flex-col gap-[16px] pb-[40px]">
                {activeTab === "overview" && <OverviewTab />}
                {activeTab === "background" && <BackgroundTab />}
                {activeTab === "for-against" && <ForAgainstTab />}
                {activeTab === "perspectives" && <PublicPerspectivesTab />}
                {activeTab === "finance" && <CampaignFinanceTab />}
              </div>
            </div>
          </div>
        </div>

        <div ref={spacerRef} aria-hidden="true" />
      </div>
    </div>
  );
}

// ── Shared components ──────────────────────────────────────────────────────────

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
      <div
        className={`font-['Nunito'] text-[14px] ${style.text} tracking-[0.14px]`}
      >
        {children}
      </div>
    </div>
  );
}

function AISynthBlock({
  title,
  citation,
  children,
}: {
  title: string;
  citation?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px]">
      <p className="font-['Nunito'] font-semibold text-[14px] text-[#6b21a8] mb-[8px]">
        {title}
        {citation && <sup className="font-normal ml-[2px]">{citation}</sup>}
      </p>
      <div className="font-['Nunito'] text-[14px] text-black leading-[1.55]">
        {children}
      </div>
    </div>
  );
}

function BorderItem({
  color,
  children,
}: {
  color: "blue" | "orange" | "green";
  children: React.ReactNode;
}) {
  const border = {
    blue: "border-[#3b82f6]",
    orange: "border-[#f97316]",
    green: "border-[#22c55e]",
  }[color];
  return (
    <div className={`border-l-[3px] ${border} pl-[14px] py-[4px]`}>
      <div className="font-['Nunito'] text-[14px] text-black leading-[1.55]">
        {children}
      </div>
    </div>
  );
}

// ── Overview Tab ───────────────────────────────────────────────────────────────

function OverviewTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* Plain-language summary */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">
          What This Measure Would Do
        </h3>
        <AISynthBlock title="Plain-language summary">
          <p>
            This initiative would make Massachusetts the first state in the
            country to implement a statewide residential rent cap since the
            1990s. Starting from a January 31, 2026 base rent, landlords of
            covered units could not raise rent by more than the rate of
            inflation (CPI) or 5%, whichever is smaller — and that cap would
            apply to the unit permanently, not just to the current tenant. In
            practical terms, if CPI is 3.2% in a given year, the maximum
            increase is 3.2%. If CPI spikes to 8%, the cap is 5%.
          </p>
        </AISynthBlock>
        <div className="mt-[12px] space-y-[8px]">
          <ContentItem type="official">
            <span className="font-semibold">
              The cap is "vacancy decontrolled"? No.
            </span>{" "}
            Most historical rent control allowed landlords to reset rent to
            market rate when a tenant left. This initiative does not — the cap
            follows the unit regardless of who moves in. This is one reason
            opponents describe it as unusually strong.
            <span className="block mt-[2px] text-[12px] opacity-75">
              Source: Petition text (No. 25-21), mass.gov
            </span>
          </ContentItem>
          <ContentItem type="official">
            <span className="font-semibold">Base rent:</span> The rent in place
            on January 31, 2026. If a unit was vacant that day, the most
            recently charged rent applies. This date is fixed in the text —
            there is no mechanism for periodic resets.
            <span className="block mt-[2px] text-[12px] opacity-75">
              Source: Petition text (No. 25-21), mass.gov
            </span>
          </ContentItem>
        </div>
      </div>

      {/* YES / NO vote meaning */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">
          What a YES or NO Vote Would Mean
        </h3>
        <div className="flex gap-[16px]">
          <div className="flex-1 border border-[#d1d1d1] rounded-[8px] p-[16px]">
            <div className="flex items-center gap-[8px] mb-[10px]">
              <span className="bg-[#12266f] text-white font-['Nunito'] font-bold text-[11px] tracking-[0.08em] px-[10px] py-[3px] rounded-[100px]">
                YES
              </span>
            </div>
            <p className="font-['Nunito'] text-[14px] text-black leading-[1.55]">
              The rent cap takes effect statewide for all covered residential
              units. Landlords may not raise rents beyond the CPI or 5% annual
              limit, measured from each unit's January 31, 2026 base rent.
              Applies to all tenancy changes — new tenants in a covered unit are
              also protected by the cap from day one.
            </p>
            <p className="font-['Nunito'] text-[12px] text-[#606060] mt-[8px]">
              Source: AG Summary (No. 25-21) / petition text
            </p>
          </div>
          <div className="flex-1 border border-[#d1d1d1] rounded-[8px] p-[16px]">
            <div className="flex items-center gap-[8px] mb-[10px]">
              <span className="bg-[#334156] text-white font-['Nunito'] font-bold text-[11px] tracking-[0.08em] px-[10px] py-[3px] rounded-[100px]">
                NO
              </span>
            </div>
            <p className="font-['Nunito'] text-[14px] text-black leading-[1.55]">
              The initiative does not become law. Massachusetts's statewide ban
              on rent control — in effect since voters approved Question 9 in
              1994 — remains in place. Landlords of non-subsidized, non-exempt
              units retain full discretion over rent pricing with no statutory
              cap.
            </p>
            <p className="font-['Nunito'] text-[12px] text-[#606060] mt-[8px]">
              Source: AG Summary (No. 25-21); MA Elections Division — 1994
              results
            </p>
          </div>
        </div>
      </div>

      {/* Who's covered / who's not */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">
          Who Is — and Isn't — Covered
        </h3>
        <div className="flex gap-[16px]">
          <div className="flex-1">
            <p className="font-['Nunito'] font-semibold text-[13px] text-[#606060] uppercase tracking-[0.08em] mb-[8px]">
              Covered by the cap
            </p>
            <div className="space-y-[6px]">
              {[
                "Most multi-unit rental buildings (landlord does not live in building)",
                "Large rental complexes and apartment buildings",
                "Units rented by tenants with mobile housing vouchers",
                "Older rental housing stock (first occupied more than 10 years ago)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-[8px]">
                  <Check className="w-[14px] h-[14px] text-[#3b82f6] shrink-0 mt-[2px]" />
                  <p className="font-['Nunito'] text-[13px] text-black">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[1px] bg-[#e5e7eb] shrink-0" />
          <div className="flex-1">
            <p className="font-['Nunito'] font-semibold text-[13px] text-[#606060] uppercase tracking-[0.08em] mb-[8px]">
              Exempt from the cap
            </p>
            <div className="space-y-[6px]">
              {[
                "Owner-occupied buildings with fewer than 5 units",
                "Units with first occupancy less than 10 years ago (new construction)",
                "Publicly regulated housing (except mobile voucher holders)",
                "Short-term rentals (fewer than 14 consecutive days)",
                "Educational, religious, and nonprofit-operated facilities",
              ].map((item) => (
                <div key={item} className="flex items-start gap-[8px]">
                  <X className="w-[14px] h-[14px] text-[#808080] shrink-0 mt-[2px]" />
                  <p className="font-['Nunito'] text-[13px] text-black">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="font-['Nunito'] text-[12px] text-[#606060] mt-[12px]">
          Source: Petition text (No. 25-21), mass.gov
        </p>
      </div>

      {/* Arguments at a glance */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">
          Arguments at a Glance
        </h3>
        <p className="font-['Nunito'] text-[13px] text-[#808080] mb-[14px]">
          Synthesized from supporter and opponent positions. Full arguments in
          the For & Against tab.
        </p>
        <div className="flex gap-[16px]">
          <div className="flex-1 space-y-[8px]">
            <p className="font-['Nunito'] font-bold text-[12px] text-[#334156] uppercase tracking-[0.08em] mb-[4px]">
              In favor
            </p>
            {[
              [
                "Housing stability",
                "Rising rents are pricing working families out of their communities. A predictable cap lets renters plan their lives.",
              ],
              [
                "Stabilization vs. supply",
                "Supporters argue this is a tenant protection tool, not a development policy — separate problems require separate solutions.",
              ],
              [
                "Targets corporate investors",
                "Small owner-occupied landlords are exempt. The cap is aimed at institutional and corporate property ownership.",
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="border-l-[3px] border-[#f97316] pl-[12px] py-[2px]"
              >
                <p className="font-['Nunito'] font-semibold text-[13px] text-black">
                  {title}
                </p>
                <p className="font-['Nunito'] text-[13px] text-[#606060] leading-[1.5]">
                  {text}
                </p>
              </div>
            ))}
          </div>
          <div className="w-[1px] bg-[#e5e7eb] shrink-0" />
          <div className="flex-1 space-y-[8px]">
            <p className="font-['Nunito'] font-bold text-[12px] text-[#334156] uppercase tracking-[0.08em] mb-[4px]">
              Against
            </p>
            {[
              [
                "Construction chilling",
                "Investors and developers say a statewide cap reduces the return on new development, leading to less housing being built.",
              ],
              [
                "Property tax impact",
                "A Tufts study cited by opponents projects the residential property tax base would shrink 6–9%, forcing cuts or tax hikes on homeowners.",
              ],
              [
                "Small landlord squeeze",
                "CPI-level caps (often 2–2.5%) may not cover rising insurance, maintenance, and utility costs for small property owners.",
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="border-l-[3px] border-[#f97316] pl-[12px] py-[2px]"
              >
                <p className="font-['Nunito'] font-semibold text-[13px] text-black">
                  {title}
                </p>
                <p className="font-['Nunito'] text-[13px] text-[#606060] leading-[1.5]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Who stands to gain / who bears costs */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[4px]">
          Stakeholder Impact
        </h3>
        <p className="font-['Nunito'] text-[13px] text-[#808080] mb-[14px]">
          How different groups would be affected if the measure had passed.
          Claims marked ⚠ are projected or disputed.
        </p>
        <div className="grid grid-cols-2 gap-[10px]">
          {[
            {
              group: "Tenants in covered units",
              impact: "gain",
              desc: "Rent increases capped at CPI or 5% annually from Jan 31, 2026 base. Protection follows the unit — applies to new tenants too.",
              basis: "Petition text",
            },
            {
              group: "Small landlords (owner-occ, <5 units)",
              impact: "neutral",
              desc: "Fully exempt from the cap. Owner-occupants of buildings with 4 or fewer units are not covered by any provision of the initiative.",
              basis: "Petition text",
            },
            {
              group: "Larger / corporate landlords",
              impact: "cost",
              desc: "Annual rent increases limited. Revenue growth constrained at inflation or 5%, regardless of market conditions or vacancies.",
              basis: "Petition text",
            },
            {
              group: "Developers (new construction)",
              impact: "neutral",
              desc: "Buildings less than 10 years old are exempt, preserving incentives for new development in the near term.",
              basis: "Petition text",
            },
            {
              group: "Homeowners (non-landlords)",
              impact: "cost",
              desc: "⚠ Per Tufts CSPA study (cited by opposition): property values could fall up to 14% over a decade, shifting ~$300B in value and potentially raising property tax burdens.",
              basis: "Tufts CSPA study — independent peer review not confirmed",
            },
            {
              group: "Cities & towns",
              impact: "cost",
              desc: "⚠ Per same Tufts study: residential property tax base could shrink 6–9% immediately, forcing service cuts or tax increases of at least 10% to compensate.",
              basis: "Tufts CSPA study — independent peer review not confirmed",
            },
          ].map((s) => (
            <div
              key={s.group}
              className="border border-[#e5e7eb] rounded-[6px] p-[12px]"
            >
              <div className="flex items-start justify-between gap-[8px] mb-[6px]">
                <p className="font-['Nunito'] font-semibold text-[13px] text-black">
                  {s.group}
                </p>
                <span
                  className={`shrink-0 font-['Nunito'] font-bold text-[10px] tracking-[0.08em] px-[8px] py-[2px] rounded-[100px] ${
                    s.impact === "gain"
                      ? "bg-[#dcfce7] text-[#166534]"
                      : s.impact === "cost"
                        ? "bg-[#fee2e2] text-[#991b1b]"
                        : "bg-[#f0f0f0] text-[#606060]"
                  }`}
                >
                  {s.impact === "gain"
                    ? "BENEFITS"
                    : s.impact === "cost"
                      ? "BEARS COST"
                      : "EXEMPT / NEUTRAL"}
                </span>
              </div>
              <p className="font-['Nunito'] text-[13px] text-[#334156] leading-[1.5]">
                {s.desc}
              </p>
              <p className="font-['Nunito'] text-[11px] text-[#808080] mt-[6px]">
                Basis: {s.basis}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation: how the cap works */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">
          Implementation: How the Cap Would Work
        </h3>
        <div className="space-y-[10px]">
          <AISynthBlock title="How CPI interacts with the 5% ceiling">
            The cap is the lower of two numbers: that year's Consumer Price
            Index for All Urban Consumers (CPI-U) or 5%. In recent years, CPI
            has ranged widely — 1.2% in 2020, 7.0% in 2021, 6.5% in 2022, 3.4%
            in 2023, 2.9% in 2024. In most "normal" years, CPI would be the
            binding limit, not the 5% ceiling. In high-inflation years like
            2021–2022, the 5% cap would kick in and be more restrictive than
            current market conditions. The petition does not specify which CPI
            measure would be used or which agency would publish the annual
            figure — this would likely require implementing regulations.
          </AISynthBlock>
          <BorderItem color="blue">
            <span className="font-semibold">
              Base rent is set once: January 31, 2026.
            </span>{" "}
            If a tenant was paying $1,800/month on that date, the cap applies to
            that amount. Each subsequent year, the landlord may raise the rent
            by the permitted percentage of that year's base. The initiative does
            not provide for periodic market resets or adjustments for capital
            improvements.
            <p className="font-['Nunito'] text-[12px] text-[#606060] mt-[4px]">
              Source: Petition text (No. 25-21)
            </p>
          </BorderItem>
          <BorderItem color="blue">
            <span className="font-semibold">Enforcement:</span> The petition
            text does not specify an enforcement mechanism, penalty structure,
            or administering agency. Implementation would require a follow-on
            regulatory process — likely the Legislature or a designated state
            agency — to establish complaint procedures, penalties, and an
            appeals process.
            <p className="font-['Nunito'] text-[12px] text-[#606060] mt-[4px]">
              Source: Petition text (No. 25-21) — enforcement mechanism not
              specified
            </p>
          </BorderItem>
          <BorderItem color="blue">
            <span className="font-semibold">Local variation:</span> The
            initiative would apply uniformly to all cities and towns in
            Massachusetts. Local governments would have no authority to opt out
            or set different caps. This statewide-mandate approach was a
            deliberate choice by the organizing coalition and a central point of
            opposition from mayors of smaller cities.
            <p className="font-['Nunito'] text-[12px] text-[#606060] mt-[4px]">
              Source: Petition text; Mayor Jon Mitchell (New Bedford) statement
            </p>
          </BorderItem>
        </div>
      </div>

      {/* Campaign finance snapshot */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[4px]">
          Campaign Finance Snapshot
        </h3>
        <p className="font-['Nunito'] text-[13px] text-[#808080] mb-[14px]">
          As of January 20, 2026 — early campaign phase only. Full details in
          Campaign Finance tab.
        </p>
        <div className="flex gap-[16px]">
          <div className="flex-1">
            <BorderItem color="blue">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-['Nunito'] font-semibold text-[14px] text-black">
                    Keep Massachusetts Home{" "}
                    <span className="font-normal text-[#606060]">(YES)</span>
                  </p>
                  <p className="font-['Nunito'] text-[12px] text-[#606060]">
                    92% in-kind contributions — grassroots labor and organizing
                  </p>
                </div>
                <p className="font-['Nunito'] font-bold text-[16px] text-[#1e40af]">
                  $747,702
                </p>
              </div>
            </BorderItem>
          </div>
          <div className="flex-1">
            <BorderItem color="blue">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-['Nunito'] font-semibold text-[14px] text-black">
                    Housing for Massachusetts{" "}
                    <span className="font-normal text-[#606060]">(NO)</span>
                  </p>
                  <p className="font-['Nunito'] text-[12px] text-[#606060]">
                    94% cash contributions — real estate industry donations
                  </p>
                </div>
                <p className="font-['Nunito'] font-bold text-[16px] text-[#1e40af]">
                  $458,234
                </p>
              </div>
            </BorderItem>
          </div>
        </div>
        <p className="font-['Nunito'] text-[12px] text-[#606060] mt-[8px]">
          Source: Massachusetts OCPF, accessed May 28, 2026, via Ballotpedia
        </p>
      </div>
    </div>
  );
}

// ── Background Tab ─────────────────────────────────────────────────────────────

function BackgroundTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">
          Official Petition Information
        </h3>
        <div className="space-y-[8px]">
          <ContentItem type="official">
            <span className="font-semibold">Petition No. 25-21</span> — "An
            Initiative Petition to Protect Tenants by Limiting Rent Increases."
            Filed August 7, 2025; cleared by Attorney General September 3, 2025.
            <span className="block mt-[4px] text-[12px] opacity-75">
              Source: Massachusetts Attorney General / mass.gov
            </span>
          </ContentItem>
          <ContentItem type="official">
            <span className="font-semibold">What the measure would do:</span>{" "}
            Limit annual rent increases for most residential units to the
            Consumer Price Index (CPI) or 5%, whichever is lower. The cap
            applies whether or not there is a change in tenancy.
            <span className="block mt-[4px] text-[12px] opacity-75">
              Source: Petition text (No. 25-21), mass.gov
            </span>
          </ContentItem>
          <ContentItem type="official">
            <span className="font-semibold">Base rent:</span> The rent amount in
            place on January 31, 2026. If a unit was vacant on that date, the
            most recently charged rental price serves as the base.
            <span className="block mt-[4px] text-[12px] opacity-75">
              Source: Petition text (No. 25-21), mass.gov
            </span>
          </ContentItem>
          <ContentItem type="official">
            <span className="font-semibold">Units exempt from the cap:</span>{" "}
            (1) Owner-occupied buildings with fewer than 5 units; (2) Units
            where rent is regulated by other public authorities, except mobile
            housing voucher holders; (3) Units rented to transient guests for
            fewer than 14 consecutive days; (4) Facilities operated solely for
            educational, religious, or nonprofit purposes; (5) Units with a
            first occupancy date less than 10 years old.
            <span className="block mt-[4px] text-[12px] opacity-75">
              Source: Petition text (No. 25-21), mass.gov
            </span>
          </ContentItem>
          <ContentItem type="ai">
            In plain language: Most apartments in Massachusetts would have their
            annual rent increases capped at inflation or 5%, whichever is
            smaller. Small landlords living in their own buildings, brand-new
            construction (under 10 years old), and a handful of specialized
            facilities would be excluded. The cap follows the unit, not the
            tenant — protections remain even when a tenant moves out and a new
            one moves in.
          </ContentItem>
        </div>
      </div>

      <div className="flex gap-[16px]">
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">
            Path to the Ballot
          </h3>
          <div className="space-y-[8px]">
            <ContentItem type="official">
              <span className="font-semibold">Aug 7, 2025:</span> AG announces
              initiative filed.
            </ContentItem>
            <ContentItem type="official">
              <span className="font-semibold">Sept 3, 2025:</span> AG certifies;
              signature gathering begins.
            </ContentItem>
            <ContentItem type="official">
              <span className="font-semibold">Nov 19, 2025:</span> Homes for All
              Massachusetts submits 124,000+ signatures.{" "}
              <span className="block text-[12px] opacity-75">
                Source: CBS News, Nov. 19, 2025
              </span>
            </ContentItem>
            <ContentItem type="official">
              <span className="font-semibold">Dec 18, 2025:</span> 88,132
              signatures certified (required: 74,574). Initiative advances to
              legislature.{" "}
              <span className="block text-[12px] opacity-75">
                Source: Massachusetts Elections Division
              </span>
            </ContentItem>
            <ContentItem type="official">
              <span className="font-semibold">Feb 5, 2026:</span> Introduced as
              House Bill 5008 (H. 5008).{" "}
              <span className="block text-[12px] opacity-75">
                Source: General Court of Massachusetts
              </span>
            </ContentItem>
            <ContentItem type="official">
              <span className="font-semibold">May 5, 2026:</span> Legislature
              takes no action. Second-round signature collection begins.
            </ContentItem>
            <ContentItem type="official">
              <span className="font-semibold">June 2, 2026:</span> Homes for All
              drafts legislative compromise; agrees to drop ballot effort if
              passed by July 1.{" "}
              <span className="block text-[12px] opacity-75">
                Source: Commonwealth Beacon, June 2, 2026
              </span>
            </ContentItem>
            <ContentItem type="official">
              <span className="font-semibold">June 16, 2026:</span> Gov. Healey
              and NAIOP announce openness to compromise.{" "}
              <span className="block text-[12px] opacity-75">
                Source: MassLive / Commonwealth Beacon, June 16–17, 2026
              </span>
            </ContentItem>
            <ContentItem type="official">
              <span className="font-semibold">June 23, 2026:</span> SJC rules
              initiative cannot appear on November ballot — religious
              institution exemption violates Article 48.{" "}
              <span className="block text-[12px] opacity-75">
                Source: Cella et. al. v. AG et. al. (SJC, June 23, 2026)
              </span>
            </ContentItem>
          </div>
        </div>

        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">
            Signature Requirements & Process
          </h3>
          <div className="space-y-[8px]">
            <ContentItem type="official">
              <span className="font-semibold">Type:</span> Indirect initiated
              state statute — presented to legislature first, then to voters if
              legislature does not act.{" "}
              <span className="block text-[12px] opacity-75">
                Source: Massachusetts Constitution / Secretary of State
              </span>
            </ContentItem>
            <ContentItem type="official">
              <span className="font-semibold">First round required:</span>{" "}
              74,574 (3% of last gubernatorial vote). Collected: 124,000+.
              Certified: 88,132.
            </ContentItem>
            <ContentItem type="official">
              <span className="font-semibold">Second round required:</span>{" "}
              12,429 (0.5%). Deadline: July 1, 2026.
            </ContentItem>
            <ContentItem type="official">
              <span className="font-semibold">Distribution rule:</span> No more
              than 25% of signatures from a single county.
            </ContentItem>
            <ContentItem type="official">
              <span className="font-semibold">Legislative window:</span> First
              Wednesday in May (May 5, 2026). No action taken.
            </ContentItem>
            <ContentItem type="official">
              <span className="font-semibold">
                Court challenge — Cella v. AG:
              </span>{" "}
              Filed Feb. 6, 2026 by property owners. Ruling June 23, 2026:
              religious institution exemption makes petition relate to religion,
              barring it under Article 48. Justice Gaziano: "the petition
              impermissibly makes religion 'a factor in [the petition's]
              application.'"{" "}
              <span className="block text-[12px] opacity-75">
                Source: Massachusetts Supreme Court, June 23, 2026
              </span>
            </ContentItem>
            <ContentItem type="ai">
              In plain language: Massachusetts's "indirect" process means the
              legislature gets first crack. This measure cleared the signature
              hurdle by a wide margin, went to the legislature, was not acted
              on, and was then struck from the ballot by the courts — on a legal
              technicality unrelated to rent control policy.
            </ContentItem>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">
          Related Context
        </h3>
        <div className="space-y-[8px]">
          <ContentItem type="official">
            <span className="font-semibold">Current state of law:</span> Rent
            control banned statewide since 1994. Question 9 passed with 51.3% of
            the vote, repealing existing laws in Boston, Cambridge, and
            Brookline and prohibiting any future rent control measures.{" "}
            <span className="block text-[12px] opacity-75">
              Source: Massachusetts Elections Division — 1994 Election Results
            </span>
          </ContentItem>
          <ContentItem type="official">
            <span className="font-semibold">
              Related legislation (2023–2026):
            </span>{" "}
            S. 1299 (Jehlen, 2023), S. 1447 and H. 2328 (2025) would have
            enabled local rent control — none passed. H. 5008 (2026) was this
            initiative's direct legislative form.{" "}
            <span className="block text-[12px] opacity-75">
              Source: Massachusetts Legislature
            </span>
          </ContentItem>
          <ContentItem type="official">
            <span className="font-semibold">
              Prior ballot attempt (2024 cycle):
            </span>{" "}
            Rep. Mike Connolly's local-option initiative suspended in November
            2025 without qualifying. Homes for All Massachusetts publicly
            opposed it.{" "}
            <span className="block text-[12px] opacity-75">
              Source: Secretary of State; Boston Globe; Homes for All
              Massachusetts
            </span>
          </ContentItem>
          <ContentItem type="outside">
            <span className="font-semibold">
              Rent control by ballot in other states:
            </span>{" "}
            California is the only other state to decide rent control by
            statewide ballot. Five measures (Props. 199, 98, 10, 21, and 33)
            between 1996–2024 — all defeated. Highest support: Prop. 10 (2018)
            at 40.6%.{" "}
            <span className="block text-[12px] opacity-75">
              Source: Ballotpedia, "Rent control and regulations ballot
              measures"
            </span>
          </ContentItem>
          <ContentItem type="ai">
            This initiative is part of a sustained multi-year effort by a broad
            tenant-labor coalition. The statewide mandate approach (vs. local
            option) was a deliberate and contested strategic choice — visible in
            the split with the 2024 Connolly campaign — and is likely to shape
            future efforts.
          </ContentItem>
        </div>
      </div>
    </div>
  );
}

// ── For & Against Tab ──────────────────────────────────────────────────────────

function ForAgainstTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex gap-[16px]">
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[16px]">
            YES Arguments
          </h3>
          <div className="space-y-[12px]">
            <AISynthBlock
              title="Housing Stability for Working Families"
              citation=" [Webster-Smith][Foley][Homes for All MA]"
            >
              Supporters frame the initiative as a response to a displacement
              crisis making it "impossible for hundreds of thousands of families
              in Massachusetts to make ends meet." Rose Webster-Smith of
              Springfield No One Leaves argues that working- and middle-class
              people need rent stabilization "to keep rent costs reasonable and
              predictable so that renters can save and have a fair shot at the
              dream of owning a home." SEIU Local 509 president David Foley
              notes that union wage gains are "almost always eaten up by huge
              rent increases."
            </AISynthBlock>
            <AISynthBlock
              title="Stabilization ≠ Development Policy"
              citation=" [Martinez][Homes for All MA]"
            >
              Advocates directly challenge the framing that rent stabilization
              reduces housing production. Mark Martinez of the Massachusetts Law
              Reform Institute: "This isn't a development policy. This is a
              stabilization policy. Judging a stabilization policy based off of
              whether or not it's going to spur development doesn't make a whole
              lot of sense." Homes for All MA adds that the policy was designed
              to allow "local landlords to earn a reasonable profit and enabling
              new construction to address housing shortages."
            </AISynthBlock>
            <AISynthBlock
              title="Corporate Investors Are the Target; Small Landlords Are Protected"
              citation=" [Ramos][Homes for All MA][petition text]"
            >
              Supporters point to the owner-occupied small building exemption.
              Noemi Ramos characterizes the opposition as "corporate real estate
              lobbyists" seeking to protect "their ability to double rents
              overnight." The initiative positions itself as a check on
              institutional property ownership — not neighborhood landlords.
            </AISynthBlock>
          </div>
        </div>

        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[16px]">
            NO Arguments
          </h3>
          <div className="space-y-[12px]">
            <AISynthBlock
              title="Investment Chilling and Construction Slowdown"
              citation=" [Healey][Small][Mitchell]"
            >
              Gov. Healey stated that "investors in housing have already pulled
              out of Massachusetts because they're concerned about rent
              control." NAIOP CEO Tamara Small: "If rent control is in place in
              the market, investors do not go to that market. They go elsewhere.
              Without those investment dollars, projects are not built." New
              Bedford Mayor Jon Mitchell warns the statewide scope would
              "effectively shut down housing production" in regions where
              development margins are already thin.
            </AISynthBlock>
            <AISynthBlock
              title="Fiscal Impact on Property Taxes and Homeowners"
              citation=" [Housing for MA][Tufts CSPA]"
            >
              Housing for Massachusetts cites a Tufts CSPA study projecting rent
              control would "almost immediately shrink the residential property
              tax base by 6–9% across Massachusetts municipalities." Over a
              decade, property values could fall nearly 14%, costing homeowners
              ~$300 billion. Cities and towns would face service cuts or
              property tax increases of at least 10%. Urban areas and college
              towns projected at 15–20% declines.
            </AISynthBlock>
            <AISynthBlock
              title="Small Landlord Harm and Maintenance Decline"
              citation=" [Lopes][Shahsavari][MA Housing Coalition]"
            >
              Tony Lopes argues the measure "penalizes the small property owners
              who make up 60% or more of the commonwealth's rental market." SPOA
              president Amir Shahsavari: CPI is "typically 2–2.5% — that's not
              enough to keep up with expenses, and therefore housing falls into
              disrepair." The MA Housing Coalition board points to post-1994
              evidence: rent-controlled properties saw "deferred maintenance,
              reduced quality" and "a noticeable drop in new rental development"
              before controls were lifted.
            </AISynthBlock>
          </div>
        </div>
      </div>

      <p className="font-['Nunito'] text-[13px] text-[#808080] italic px-[8px]">
        YES and NO arguments synthesized from organizational positions and
        individual statements. Primary quotes appear in the Public Perspectives
        tab.
      </p>

      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[16px]">
          Analysis & Open Questions
        </h3>
        <div className="space-y-[16px]">
          <AISynthBlock title="Areas of Consensus" citation=" [all sources]">
            <ul className="list-disc list-inside space-y-[4px]">
              <li>
                Massachusetts is experiencing a severe housing affordability
                crisis driving tenant displacement
              </li>
              <li>
                Rent control has been banned statewide since voters approved
                Question 9 in 1994
              </li>
              <li>
                Both sides agree new housing production is needed — the dispute
                is whether rent caps accelerate or slow it
              </li>
              <li>
                Small landlords in owner-occupied buildings under 5 units would
                be exempt from the cap
              </li>
              <li>
                The legislative compromise talks (June 2026) showed movement on
                both sides before the court intervened
              </li>
            </ul>
          </AISynthBlock>

          <AISynthBlock title="Areas of Disagreement" citation=" [all sources]">
            <ul className="list-disc list-inside space-y-[4px]">
              <li>
                Whether rent caps reduce new housing construction — the central
                empirical dispute
              </li>
              <li>
                Whether exemptions are sufficient to protect small landlords
                from operating at a loss
              </li>
              <li>
                The severity and probability of fiscal impacts on the
                residential property tax base
              </li>
              <li>
                Whether the 1994 Massachusetts experience is an accurate
                predictor of this initiative's effects
              </li>
              <li>
                Statewide mandate vs. local option: the 2024 Connolly split
                divided the tenant organizing community on this
              </li>
            </ul>
          </AISynthBlock>

          <AISynthBlock title="Open Questions" citation=" [evidence gaps]">
            <ul className="list-disc list-inside space-y-[4px]">
              <li>
                At what CPI level does the 5% cap become the binding constraint?
                (Recent CPI ranges make the CPI ceiling the more likely limit
                most years)
              </li>
              <li>
                How does the 10-year new-construction exemption interact with
                longer-term housing production cycles?
              </li>
              <li>
                Would local governments retain any ability to set tighter or
                looser caps under this statewide framework?
              </li>
              <li>
                What are the terms of the June 2026 legislative compromise, and
                would it have achieved equivalent tenant protections?
              </li>
            </ul>
          </AISynthBlock>

          <AISynthBlock title="Claim Mapping" citation=" [contested claims]">
            <div className="space-y-[8px]">
              {[
                {
                  claim:
                    '"Creates the most restrictive rent control program in the entire United States"',
                  status: "⚠",
                  note: "Asserted jointly by Greater Boston Real Estate Board, MA Association of REALTORS, and NAIOP Massachusetts — no independent comparative citation provided",
                },
                {
                  claim:
                    '"Rent control would shrink the property tax base by 6–9% immediately"',
                  status: "⚠",
                  note: "From a Tufts CSPA study cited and publicized by the opposition — independent peer review status not confirmed in available reporting",
                },
                {
                  claim: '"Investors have already pulled out of Massachusetts"',
                  status: "⚠",
                  note: "Asserted by Gov. Healey — no data source cited; the initiative had not become law at the time the statement was made",
                },
                {
                  claim:
                    '"88,132 valid signatures certified; required threshold was 74,574"',
                  status: "✓",
                  note: "Confirmed by Massachusetts Elections Division, December 18, 2025",
                },
                {
                  claim:
                    '"Small property owners make up 60% or more of the rental market"',
                  status: "⚠",
                  note: "Asserted by Tony Lopes, Small Property Owners Association — no data source cited in available reporting",
                },
              ].map((item) => (
                <div key={item.claim}>
                  <p className="font-['Nunito'] text-[14px] text-black font-semibold">
                    {item.claim}
                  </p>
                  <p className="font-['Nunito'] text-[13px] text-[#606060] mt-[2px]">
                    {item.status} {item.note}
                  </p>
                </div>
              ))}
            </div>
          </AISynthBlock>
        </div>
      </div>

      <p className="font-['Nunito'] text-[13px] text-[#808080] italic px-[8px]">
        Analysis synthesizes positions from all available sources. Claim mapping
        uses original citations where available.
      </p>

      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[16px]">
          Research & Evidence
        </h3>
        <div className="space-y-[16px]">
          <AISynthBlock
            title="AI Synthesis of Research"
            citation=" [Tufts CSPA][polling][media reporting]"
          >
            The primary quantitative study cited — the Tufts Center for State
            Policy Analysis report on property tax impacts — was produced and
            publicized by the opposition, raising independence questions. No
            comparable economic study was produced by the YES campaign. Polling
            data from four surveys (Nov 2025–May 2026) showed consistent
            majority support ranging from 56% to 69%. The core empirical dispute
            (whether rent stabilization reduces housing supply) remains
            contested in national economics literature and was not resolved by
            evidence specific to Massachusetts.
          </AISynthBlock>

          <div className="border-l-4 border-[#22c55e] pl-[16px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[4px]">
              Policy Research{" "}
              <sup className="text-[#6b21a8] font-normal">
                [opposition-cited]
              </sup>
            </p>
            <p className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
              <span className="font-semibold">
                Center for State Policy Analysis, Tufts University
              </span>{" "}
              — Study cited by Housing for Massachusetts projecting 6–9%
              near-term residential property tax base shrinkage and up to 14%
              property value decline over a decade (~$300 billion cost to
              homeowners). Urban areas and college towns projected at 15–20%
              declines. Cited and publicized by opposition; commissioned-by and
              peer-review status not confirmed in available public reporting.
            </p>
          </div>

          <div className="border-l-4 border-[#22c55e] pl-[16px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[8px]">
              Media & Investigative Reporting
            </p>
            <ul className="space-y-[6px]">
              {[
                [
                  "Shelterforce",
                  "Could Massachusetts Get Rent Control Back After a 32-Year Ban? (June 5, 2026)",
                ],
                [
                  "WBUR News",
                  "High court derails rent control ballot question, citing mention of religion (June 23, 2026)",
                ],
                [
                  "Commonwealth Beacon",
                  "Rent control opponents sue to keep measure off the ballot (Feb. 10, 2026); Powerful real estate group says it's open to rent control compromise (June 17, 2026)",
                ],
                [
                  "Boston Globe",
                  "As high court tosses out rent control ballot measure, tenant groups lose on Beacon Hill again (June 24, 2026)",
                ],
                [
                  "MassLive",
                  "As momentum builds, Mass. Gov. Healey wants a compromise on rent control (June 16, 2026)",
                ],
              ].map(([outlet, title]) => (
                <li
                  key={outlet}
                  className="font-['Nunito'] text-[14px] text-black leading-[1.5]"
                >
                  <span className="font-semibold">{outlet}</span> — {title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Public Perspectives Tab ────────────────────────────────────────────────────

type PerspectiveFilter = "all" | "org" | "official" | "individual";

const YES_ORGS = [
  {
    type: "org" as const,
    name: "Homes for All Massachusetts",
    role: "Lead campaign organization",
  },
  {
    type: "org" as const,
    name: "Keep Massachusetts Home",
    role: "Registered campaign committee",
  },
  {
    type: "org" as const,
    name: "1199 SEIU United Healthcare Workers East",
    role: "Union",
  },
  {
    type: "org" as const,
    name: "Asian American Resource Workshop",
    role: "Community organization",
  },
  { type: "org" as const, name: "Boston Teachers Union", role: "Union" },
  { type: "org" as const, name: "Local 509 SEIU", role: "Union" },
  {
    type: "org" as const,
    name: "Massachusetts Teachers Association",
    role: "Union",
  },
  {
    type: "org" as const,
    name: "SEIU Massachusetts State Council",
    role: "Union",
  },
  {
    type: "org" as const,
    name: "Brockton Workers Alliance",
    role: "Community organization",
  },
  {
    type: "org" as const,
    name: "Chinese Progressive Association",
    role: "Community organization",
  },
  {
    type: "org" as const,
    name: "Coalition for Social Justice",
    role: "Advocacy organization",
  },
  {
    type: "org" as const,
    name: "Community Action Agency of Somerville",
    role: "Community organization",
  },
  {
    type: "org" as const,
    name: "La Colaborativa",
    role: "Community organization",
  },
  {
    type: "org" as const,
    name: "Massachusetts Law Reform Institute",
    role: "Legal advocacy",
  },
  {
    type: "org" as const,
    name: "Merrimack Valley Project",
    role: "Community organization",
  },
  {
    type: "org" as const,
    name: "New England Community Project",
    role: "Community organization",
  },
  {
    type: "org" as const,
    name: "Reclaim Roxbury",
    role: "Community organization",
  },
  { type: "org" as const, name: "Resist Inc.", role: "Community organization" },
  {
    type: "org" as const,
    name: "Springfield No One Leaves",
    role: "Tenant advocacy",
  },
  {
    type: "org" as const,
    name: "United Interfaith Action of SE Massachusetts",
    role: "Community organization",
  },
  {
    type: "org" as const,
    name: "Urban Revival Inc.",
    role: "Community organization",
  },
];

const YES_OFFICIALS = [
  {
    type: "official" as const,
    name: "Michelle Wu",
    role: "Mayor, City of Boston",
    isCurrent: true,
  },
];

const NO_ORGS = [
  {
    type: "org" as const,
    name: "Housing for Massachusetts",
    role: "Lead opposition campaign committee",
  },
  {
    type: "org" as const,
    name: "Associated Industries of Massachusetts (AIM)",
    role: "Business association",
  },
  {
    type: "org" as const,
    name: "Greater Boston Real Estate Board",
    role: "Industry association",
  },
  {
    type: "org" as const,
    name: "Massachusetts Association of REALTORS",
    role: "Industry association",
  },
  {
    type: "org" as const,
    name: "Massachusetts Biotechnology Council",
    role: "Industry association",
  },
  {
    type: "org" as const,
    name: "Massachusetts Business Roundtable",
    role: "Business association",
  },
  {
    type: "org" as const,
    name: "Massachusetts Fiscal Alliance",
    role: "Advocacy organization",
  },
  {
    type: "org" as const,
    name: "MassLandlords Inc.",
    role: "Landlord association",
  },
  {
    type: "org" as const,
    name: "NAIOP Massachusetts",
    role: "Commercial real estate association",
  },
  {
    type: "org" as const,
    name: "Nordblom Management Co.",
    role: "Real estate company",
  },
  {
    type: "org" as const,
    name: "Small Property Owners Association",
    role: "Landlord association",
  },
];

const NO_OFFICIALS = [
  {
    type: "official" as const,
    name: "Maura Healey",
    role: "Governor of Massachusetts",
    isCurrent: true,
  },
  {
    type: "official" as const,
    name: "Ronald Mariano",
    role: "Speaker of the House",
    isCurrent: true,
  },
  {
    type: "official" as const,
    name: "David Beauregard Jr.",
    role: "Mayor, Methuen",
    isCurrent: true,
  },
  {
    type: "official" as const,
    name: "Brian DePeña",
    role: "Mayor, Lawrence",
    isCurrent: true,
  },
  {
    type: "official" as const,
    name: "Joshua Garcia",
    role: "Mayor, Holyoke",
    isCurrent: true,
  },
  {
    type: "official" as const,
    name: "Christopher Johnson",
    role: "Mayor, Agawam",
    isCurrent: true,
  },
  {
    type: "official" as const,
    name: "Patrick Keefe Jr.",
    role: "Mayor, Revere",
    isCurrent: true,
  },
  {
    type: "official" as const,
    name: "Thomas Koch",
    role: "Mayor, Quincy",
    isCurrent: true,
  },
  {
    type: "official" as const,
    name: "Dean Mazzarella",
    role: "Mayor, Leominster",
    isCurrent: true,
  },
  {
    type: "official" as const,
    name: "Jon Mitchell",
    role: "Mayor, New Bedford",
    isCurrent: true,
  },
  {
    type: "official" as const,
    name: "Michael Nicholson",
    role: "Mayor, Gardner",
    isCurrent: true,
  },
  {
    type: "official" as const,
    name: "Joseph Petty",
    role: "Mayor, Worcester",
    isCurrent: true,
  },
];

function TypeIcon({ type }: { type: TestimonyType }) {
  if (type === "org")
    return <Megaphone className="w-[14px] h-[14px] shrink-0" />;
  if (type === "official")
    return <Scale className="w-[14px] h-[14px] shrink-0" />;
  return <User className="w-[14px] h-[14px] shrink-0" />;
}

function TypeLabel({ type }: { type: TestimonyType }) {
  if (type === "org") return "Organization";
  if (type === "official") return "Official";
  return "Individual";
}

function PublicPerspectivesTab() {
  const [filter, setFilter] = useState<PerspectiveFilter>("all");
  const [page, setPage] = useState(1);
  const PER_PAGE = 4;

  const filtered = TESTIMONIES.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilter = (f: PerspectiveFilter) => {
    setFilter(f);
    setPage(1);
  };

  const filterOptions: { id: PerspectiveFilter; label: string }[] = [
    { id: "all", label: "All testimony" },
    { id: "org", label: "Organizations" },
    { id: "official", label: "Officials" },
    { id: "individual", label: "Individuals" },
  ];

  return (
    <div className="flex flex-col gap-[16px]">
      {/* AI Synthesis — structured breakdown */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">
          AI Synthesis of Perspectives
        </h3>
        <div className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px] space-y-[14px]">
          <div>
            <p className="font-['Nunito'] font-semibold text-[13px] text-[#6b21a8] uppercase tracking-[0.07em] mb-[6px]">
              Who is speaking
            </p>
            <div className="flex gap-[16px]">
              <div className="flex-1 bg-white bg-opacity-60 rounded-[4px] p-[10px]">
                <p className="font-['Nunito'] font-semibold text-[13px] text-[#6b21a8] mb-[4px]">
                  YES coalition
                </p>
                <p className="font-['Nunito'] text-[13px] text-black leading-[1.5]">
                  Broad and labor-anchored: major unions (SEIU, MTA, BTU),
                  immigrant rights groups, legal aid, and community organizing
                  networks. Geographic reach across Springfield, Merrimack
                  Valley, Brockton, Roxbury, and Somerville. 21 organizations on
                  record.
                </p>
              </div>
              <div className="flex-1 bg-white bg-opacity-60 rounded-[4px] p-[10px]">
                <p className="font-['Nunito'] font-semibold text-[13px] text-[#6b21a8] mb-[4px]">
                  NO coalition
                </p>
                <p className="font-['Nunito'] text-[13px] text-black leading-[1.5]">
                  Led by real estate industry trade associations (NAIOP, GBREB,
                  MAR) plus a distinct small-landlord constituency (SPOA) and
                  business groups (AIM, MA Fiscal Alliance). 10 elected
                  officials — including the Governor and House Speaker — and 11
                  organizations on record.
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="font-['Nunito'] font-semibold text-[13px] text-[#6b21a8] uppercase tracking-[0.07em] mb-[6px]">
              Dominant themes in YES testimony
            </p>
            <ul className="space-y-[4px]">
              {[
                "Displacement of working-class and immigrant families due to uncontrolled rent increases",
                "Wages eaten up by rent hikes despite union bargaining wins",
                "Distinction between corporate investors (the target) and small owner-occupant landlords (exempt)",
              ].map((t) => (
                <li key={t} className="flex items-start gap-[8px]">
                  <span className="text-[#6b21a8] shrink-0 mt-[1px]">•</span>
                  <p className="font-['Nunito'] text-[13px] text-black">{t}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-['Nunito'] font-semibold text-[13px] text-[#6b21a8] uppercase tracking-[0.07em] mb-[6px]">
              Dominant themes in NO testimony
            </p>
            <ul className="space-y-[4px]">
              {[
                "Investment already leaving Massachusetts; new construction will halt",
                "Statewide mandate hurts outer cities (New Bedford, Lawrence, Gardner) where development economics are tight",
                "Small landlords — many immigrant and minority property owners — cannot absorb a CPI-level cap",
              ].map((t) => (
                <li key={t} className="flex items-start gap-[8px]">
                  <span className="text-[#6b21a8] shrink-0 mt-[1px]">•</span>
                  <p className="font-['Nunito'] text-[13px] text-black">{t}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-['Nunito'] font-semibold text-[13px] text-[#6b21a8] uppercase tracking-[0.07em] mb-[6px]">
              Notable internal tension
            </p>
            <p className="font-['Nunito'] text-[13px] text-black leading-[1.5]">
              Homes for All Massachusetts explicitly opposed the 2024 Connolly
              initiative (a home-rule approach), calling it a "unilateral
              decision against the wishes of movement leaders." This
              statewide-vs-local tension is unresolved and likely to shape
              future organizing strategy.
            </p>
          </div>
        </div>
      </div>

      {/* Org roll-up — YES */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[16px]">
          Positions on Record
        </h3>

        <div className="space-y-[20px]">
          {/* YES orgs */}
          <div>
            <div className="flex items-center gap-[8px] mb-[10px]">
              <span className="bg-[#12266f] text-white font-['Nunito'] font-bold text-[11px] tracking-[0.08em] px-[10px] py-[2px] rounded-[100px]">
                YES
              </span>
              <p className="font-['Nunito'] font-semibold text-[14px] text-[#334156]">
                Organizations — {YES_ORGS.length} on record
              </p>
            </div>
            <div className="border-l-[3px] border-[#f97316] pl-[14px] space-y-[6px]">
              {YES_ORGS.map((org) => (
                <div key={org.name} className="flex items-center gap-[8px]">
                  <Megaphone className="w-[13px] h-[13px] text-[#f97316] shrink-0" />
                  <p className="font-['Nunito'] text-[13px] text-black">
                    <span className="font-semibold">{org.name}</span>{" "}
                    <span className="text-[#808080]">— {org.role}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* YES officials */}
          <div>
            <div className="flex items-center gap-[8px] mb-[10px]">
              <span className="bg-[#12266f] text-white font-['Nunito'] font-bold text-[11px] tracking-[0.08em] px-[10px] py-[2px] rounded-[100px]">
                YES
              </span>
              <p className="font-['Nunito'] font-semibold text-[14px] text-[#334156]">
                Officials — {YES_OFFICIALS.length} on record
              </p>
            </div>
            <div className="border-l-[3px] border-[#f97316] pl-[14px] space-y-[6px]">
              {YES_OFFICIALS.map((o) => (
                <div key={o.name} className="flex items-center gap-[8px]">
                  <Scale className="w-[13px] h-[13px] text-[#f97316] shrink-0" />
                  <p className="font-['Nunito'] text-[13px] text-black">
                    <span className="font-semibold">{o.name}</span>
                    {o.isCurrent === false && (
                      <span className="text-[#808080]"> (former)</span>
                    )}
                    <span className="text-[#808080]"> — {o.role}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#e5e7eb]" />

          {/* NO orgs */}
          <div>
            <div className="flex items-center gap-[8px] mb-[10px]">
              <span className="bg-[#334156] text-white font-['Nunito'] font-bold text-[11px] tracking-[0.08em] px-[10px] py-[2px] rounded-[100px]">
                NO
              </span>
              <p className="font-['Nunito'] font-semibold text-[14px] text-[#334156]">
                Organizations — {NO_ORGS.length} on record
              </p>
            </div>
            <div className="border-l-[3px] border-[#f97316] pl-[14px] space-y-[6px]">
              {NO_ORGS.map((org) => (
                <div key={org.name} className="flex items-center gap-[8px]">
                  <Megaphone className="w-[13px] h-[13px] text-[#f97316] shrink-0" />
                  <p className="font-['Nunito'] text-[13px] text-black">
                    <span className="font-semibold">{org.name}</span>{" "}
                    <span className="text-[#808080]">— {org.role}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* NO officials */}
          <div>
            <div className="flex items-center gap-[8px] mb-[10px]">
              <span className="bg-[#334156] text-white font-['Nunito'] font-bold text-[11px] tracking-[0.08em] px-[10px] py-[2px] rounded-[100px]">
                NO
              </span>
              <p className="font-['Nunito'] font-semibold text-[14px] text-[#334156]">
                Officials — {NO_OFFICIALS.length} on record
              </p>
            </div>
            <div className="border-l-[3px] border-[#f97316] pl-[14px] space-y-[6px]">
              {NO_OFFICIALS.map((o) => (
                <div key={o.name} className="flex items-center gap-[8px]">
                  <Scale className="w-[13px] h-[13px] text-[#f97316] shrink-0" />
                  <p className="font-['Nunito'] text-[13px] text-black">
                    <span className="font-semibold">{o.name}</span>
                    {o.isCurrent === false && (
                      <span className="text-[#808080]"> (former)</span>
                    )}
                    <span className="text-[#808080]"> — {o.role}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimony browser */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <div className="flex items-center justify-between mb-[16px]">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black">
            Browse Testimony
          </h3>
          <p className="font-['Nunito'] text-[13px] text-[#808080]">
            Showing {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–
            {Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-[6px] mb-[16px] flex-wrap">
          {filterOptions.map((f) => {
            const count =
              f.id === "all"
                ? TESTIMONIES.length
                : TESTIMONIES.filter((t) => t.type === f.id).length;
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => handleFilter(f.id)}
                className="flex items-center gap-[6px] px-[12px] h-[32px] rounded-[6px] transition-colors"
                style={{
                  backgroundColor: isActive ? "#12266f" : "#f0f0f0",
                  color: isActive ? "#fff" : "#334156",
                  fontFamily: "Nunito",
                  fontWeight: 700,
                  fontSize: 13,
                  border: isActive ? "none" : "1px solid #d1d1d1",
                }}
              >
                {f.id === "org" && <Megaphone className="w-[12px] h-[12px]" />}
                {f.id === "official" && <Scale className="w-[12px] h-[12px]" />}
                {f.id === "individual" && (
                  <User className="w-[12px] h-[12px]" />
                )}
                {f.label}
                <span className="font-normal opacity-70 text-[12px]">
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Testimony cards */}
        <div className="space-y-[10px]">
          {visible.map((t) => (
            <div
              key={t.id}
              className="border-l-[3px] border-[#f97316] pl-[14px] py-[8px]"
            >
              <div className="flex items-start justify-between gap-[8px] mb-[6px]">
                <div className="flex items-center gap-[8px]">
                  <span
                    className={`font-['Nunito'] font-bold text-[10px] tracking-[0.08em] px-[8px] py-[2px] rounded-[100px] ${
                      t.position === "yes"
                        ? "bg-[#12266f] text-white"
                        : "bg-[#334156] text-white"
                    }`}
                  >
                    {t.position.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-[4px] font-['Nunito'] text-[12px] text-[#808080]">
                    <TypeIcon type={t.type} />
                    <TypeLabel type={t.type} />
                  </span>
                </div>
              </div>
              <p className="font-['Nunito'] font-semibold text-[13px] text-black">
                {t.name}
              </p>
              <p className="font-['Nunito'] text-[12px] text-[#808080] mb-[8px]">
                {t.role}
              </p>
              <p className="font-['Nunito'] text-[13px] text-[#334156] leading-[1.6] italic">
                "{t.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-[16px] pt-[16px] border-t border-[#e5e7eb]">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-[4px] px-[12px] h-[32px] rounded-[6px] font-['Nunito'] font-bold text-[13px] border border-[#d1d1d1] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              color: "#334156",
              backgroundColor: page === 1 ? "#f9f9f9" : "#fff",
            }}
          >
            <ChevronLeft className="w-[14px] h-[14px]" /> Previous
          </button>
          <div className="flex gap-[4px]">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="w-[32px] h-[32px] rounded-[6px] font-['Nunito'] font-bold text-[13px] border"
                style={{
                  backgroundColor: page === p ? "#12266f" : "#fff",
                  color: page === p ? "#fff" : "#334156",
                  borderColor: page === p ? "#12266f" : "#d1d1d1",
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-[4px] px-[12px] h-[32px] rounded-[6px] font-['Nunito'] font-bold text-[13px] border border-[#d1d1d1] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              color: "#334156",
              backgroundColor: page === totalPages ? "#f9f9f9" : "#fff",
            }}
          >
            Next <ChevronRight className="w-[14px] h-[14px]" />
          </button>
        </div>
      </div>

      {/* Polling Data */}
      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">
          Polling Data
        </h3>
        <AISynthBlock title="Polling trend">
          Four polls conducted between November 2025 and May 2026 showed
          consistent majority support ranging from 56% to 69%, with undecided
          voters declining from 17% to 12% as the campaign progressed —
          primarily moving toward YES. No poll showed the NO side above 31%.
        </AISynthBlock>
        <div className="mt-[12px] space-y-[8px]">
          {[
            {
              pollster: "Polity Research Consulting",
              dates: "Apr 29 – May 7, 2026",
              sample: "608, all voters",
              moe: "±3.97%",
              support: "69.0%",
              oppose: "19.0%",
              undecided: "12.0%",
            },
            {
              pollster: "UNH Survey Center",
              dates: "Apr 16 – Apr 20, 2026",
              sample: "601 LV",
              moe: "±3.60%",
              support: "57.0%",
              oppose: "27.0%",
              undecided: "17.0%",
            },
            {
              pollster: "UNH Survey Center",
              dates: "Feb 12 – Feb 16, 2026",
              sample: "669 residents",
              moe: "±3.80%",
              support: "56.0%",
              oppose: "26.0%",
              undecided: "17.0%",
            },
            {
              pollster: "Suffolk University / Boston Globe",
              dates: "Nov 19 – Nov 23, 2025",
              sample: "500 RV",
              moe: "±4.40%",
              support: "62.6%",
              oppose: "30.6%",
              undecided: "6.8%",
            },
          ].map((poll) => (
            <div
              key={poll.pollster + poll.dates}
              className="border-l-[3px] border-[#22c55e] pl-[14px] py-[6px]"
            >
              <div className="flex items-center justify-between gap-[16px]">
                <div>
                  <p className="font-['Nunito'] font-semibold text-[13px] text-black">
                    {poll.pollster}
                  </p>
                  <p className="font-['Nunito'] text-[12px] text-[#808080]">
                    {poll.dates} · {poll.sample} · {poll.moe}
                  </p>
                </div>
                <div className="flex gap-[16px]">
                  {[
                    ["Support", poll.support, "#15803d"],
                    ["Oppose", poll.oppose, "#334156"],
                    ["Undecided", poll.undecided, "#808080"],
                  ].map(([label, val, color]) => (
                    <div key={label} className="text-center w-[60px]">
                      <p
                        className="font-['Nunito'] font-bold text-[15px]"
                        style={{ color }}
                      >
                        {val}
                      </p>
                      <p className="font-['Nunito'] text-[11px] text-[#808080]">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <p className="font-['Nunito'] text-[12px] text-[#606060] px-[2px]">
            LV = likely voters · RV = registered voters · Source: Ballotpedia
            (citing pollster reports)
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Campaign Finance Tab ───────────────────────────────────────────────────────

function CampaignFinanceTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <ContentItem type="official">
        <span className="font-semibold">Data currency:</span> Campaign finance
        figures reflect OCPF reports processed through January 20, 2026. Next
        reporting deadline: September 4, 2026. Figures do not capture
        contributions made after January 20, 2026.
        <span className="block mt-[2px] text-[12px] opacity-75">
          Source: Massachusetts Office of Campaign and Political Finance (OCPF),
          accessed May 28, 2026, via Ballotpedia
        </span>
      </ContentItem>

      <div className="flex gap-[16px]">
        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[4px]">
            YES Committee
          </h3>
          <p className="font-['Nunito'] text-[14px] text-[#606060] mb-[16px]">
            Keep Massachusetts Home
          </p>
          <div className="space-y-[8px]">
            {[
              ["Total contributions", "$747,702.43"],
              ["Cash contributions", "$57,721.88"],
              ["In-kind contributions", "$689,980.55"],
              ["Cash expenditures", "$17,784.07"],
              ["Total expenditures", "$707,764.62"],
            ].map(([label, val]) => (
              <div
                key={label}
                className="border-l-[3px] border-[#3b82f6] pl-[12px] py-[3px] flex justify-between items-center"
              >
                <p className="font-['Nunito'] text-[13px] text-black">
                  {label}
                </p>
                <p className="font-['Nunito'] font-bold text-[13px] text-[#1e40af]">
                  {val}
                </p>
              </div>
            ))}
          </div>
          <h4 className="font-['Nunito'] font-semibold text-[14px] text-black mt-[20px] mb-[10px]">
            Top Donors
          </h4>
          <div className="space-y-[6px]">
            {[
              {
                name: "Urban Revival Inc.",
                cash: "$0.00",
                inkind: "$203,341.31",
                total: "$203,341.31",
              },
              {
                name: "Right to the City Alliance Inc.",
                cash: "$0.00",
                inkind: "$136,580.98",
                total: "$136,580.98",
              },
              {
                name: "New England Community Project",
                cash: "$0.00",
                inkind: "$54,987.42",
                total: "$54,987.42",
              },
              {
                name: "Tides Advocacy",
                cash: "$0.00",
                inkind: "$34,415.77",
                total: "$34,415.77",
              },
              {
                name: "La Colaborativa",
                cash: "$0.00",
                inkind: "$33,443.90",
                total: "$33,443.90",
              },
            ].map((d) => (
              <div
                key={d.name}
                className="border-l-[3px] border-[#3b82f6] pl-[12px] py-[6px]"
              >
                <div className="flex justify-between items-start gap-[8px]">
                  <p className="font-['Nunito'] font-semibold text-[13px] text-black">
                    {d.name}
                  </p>
                  <p className="font-['Nunito'] font-bold text-[13px] text-[#1e40af] shrink-0">
                    {d.total}
                  </p>
                </div>
                <p className="font-['Nunito'] text-[12px] text-[#808080]">
                  Cash: {d.cash} · In-kind: {d.inkind}
                </p>
              </div>
            ))}
            <p className="font-['Nunito'] text-[12px] text-[#606060]">
              Source: Massachusetts OCPF, via Ballotpedia
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[8px] p-[24px] flex-1">
          <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[4px]">
            NO Committee
          </h3>
          <p className="font-['Nunito'] text-[14px] text-[#606060] mb-[16px]">
            Housing for Massachusetts
          </p>
          <div className="space-y-[8px]">
            {[
              ["Total contributions", "$458,234.30"],
              ["Cash contributions", "$431,600.00"],
              ["In-kind contributions", "$26,634.30"],
              ["Cash expenditures", "$0.00"],
              ["Total expenditures", "$26,634.30"],
            ].map(([label, val]) => (
              <div
                key={label}
                className="border-l-[3px] border-[#3b82f6] pl-[12px] py-[3px] flex justify-between items-center"
              >
                <p className="font-['Nunito'] text-[13px] text-black">
                  {label}
                </p>
                <p className="font-['Nunito'] font-bold text-[13px] text-[#1e40af]">
                  {val}
                </p>
              </div>
            ))}
          </div>
          <h4 className="font-['Nunito'] font-semibold text-[14px] text-black mt-[20px] mb-[10px]">
            Top Donors
          </h4>
          <div className="space-y-[6px]">
            {[
              {
                name: "NAIOP Massachusetts",
                cash: "$226,600.00",
                inkind: "$0.00",
                total: "$226,600.00",
              },
              {
                name: "Greater Boston Real Estate Board Operating Account",
                cash: "$100,000.00",
                inkind: "$0.00",
                total: "$100,000.00",
              },
              {
                name: "Massachusetts Association of Realtors",
                cash: "$55,000.00",
                inkind: "$0.00",
                total: "$55,000.00",
              },
              {
                name: "Nordblom Management Co. Inc.",
                cash: "$50,000.00",
                inkind: "$0.00",
                total: "$50,000.00",
              },
              {
                name: "MassLandlords, Inc.",
                cash: "$0.00",
                inkind: "$26,634.30",
                total: "$26,634.30",
              },
            ].map((d) => (
              <div
                key={d.name}
                className="border-l-[3px] border-[#3b82f6] pl-[12px] py-[6px]"
              >
                <div className="flex justify-between items-start gap-[8px]">
                  <p className="font-['Nunito'] font-semibold text-[13px] text-black">
                    {d.name}
                  </p>
                  <p className="font-['Nunito'] font-bold text-[13px] text-[#1e40af] shrink-0">
                    {d.total}
                  </p>
                </div>
                <p className="font-['Nunito'] text-[12px] text-[#808080]">
                  Cash: {d.cash} · In-kind: {d.inkind}
                </p>
              </div>
            ))}
            <p className="font-['Nunito'] text-[12px] text-[#606060]">
              Source: Massachusetts OCPF, via Ballotpedia
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">
          Combined Totals
        </h3>
        <div className="space-y-[8px]">
          {[
            ["Total raised — all committees", "$1,205,936.73"],
            ["Total cash contributions", "$489,321.88"],
            ["Total in-kind contributions", "$716,614.85"],
            ["Total expenditures", "$734,398.92"],
          ].map(([label, val]) => (
            <div
              key={label}
              className="border-l-[3px] border-[#3b82f6] pl-[12px] py-[3px] flex justify-between items-center"
            >
              <p className="font-['Nunito'] text-[13px] text-black">{label}</p>
              <p className="font-['Nunito'] font-bold text-[13px] text-[#1e40af]">
                {val}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-semibold text-[18px] text-black mb-[12px]">
          AI Analysis of Funding Patterns
        </h3>
        <div className="space-y-[10px]">
          <AISynthBlock
            title="YES side: in-kind dominated by grassroots organizing labor"
            citation=" [OCPF via Ballotpedia]"
          >
            Of the YES committee's $747,702 raised, 92% ($689,980) came as
            in-kind contributions — primarily from community organizing groups
            providing staff time and canvassing labor. Urban Revival Inc. and
            Right to the City Alliance together contributed $339,922 in-kind.
            Cash contributions ($57,721) were minimal. This pattern is
            consistent with a coalition-driven grassroots signature effort
            rather than a professionally managed media campaign.
          </AISynthBlock>
          <AISynthBlock
            title="NO side: cash dominated by real estate industry"
            citation=" [OCPF via Ballotpedia]"
          >
            The NO committee raised $458,234, with 94% ($431,600) in cash — a
            reverse of the YES pattern. NAIOP Massachusetts alone contributed
            $226,600, representing nearly half the NO committee's total. The
            Greater Boston Real Estate Board and MA Association of Realtors
            contributed another $155,000. Cash-heavy fundraising with $0 in cash
            expenditures through January 2026 suggests the opposition was
            holding funds for a later media and legal phase.
          </AISynthBlock>
          <AISynthBlock
            title="Notable asymmetry"
            citation=" [OCPF; next reporting deadline Sept 4, 2026]"
          >
            YES raised more in total ($747,702 vs $458,234) but through
            labor-in-kind rather than liquid cash. NO held significantly more
            liquid cash relative to expenditures. Both campaigns would likely
            have raised substantially more had the measure proceeded to the
            November 2026 ballot — the data reflects an early-campaign snapshot
            only.
          </AISynthBlock>
        </div>
      </div>
    </div>
  );
}
