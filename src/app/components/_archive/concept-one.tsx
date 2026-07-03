import { useState } from "react";
import {
  MapleNav, Breadcrumb, TopicTag, StatusBadge, SectionLabel,
  StatPill, ElectionBar, L, MAPLE_DARK_NAVY,
} from ".././maple-shared";
import { FileText, CheckSquare, BarChart2, Vote, DollarSign, ChevronRight } from "lucide-react";

const SECTIONS = [
  { id: "voice",     label: "Voice & Priorities", icon: FileText },
  { id: "bills",     label: "Legislation",         icon: CheckSquare },
  { id: "votes",     label: "Voting Record",        icon: Vote },
  { id: "elections", label: "Elections",            icon: BarChart2 },
  { id: "finance",   label: "Campaign Finance",     icon: DollarSign },
];

const BILLS = [
  { id: "H.2341", title: "An Act relative to affordable housing production", status: "Active" as const, committee: "Housing", date: "Mar 2024" },
  { id: "H.2198", title: "An Act establishing a green new deal for Massachusetts", status: "Referred" as const, committee: "Environment", date: "Jan 2024" },
  { id: "H.1847", title: "An Act providing for equitable school funding", status: "Passed" as const, committee: "Education", date: "Nov 2023" },
  { id: "H.1532", title: "An Act expanding access to behavioral health services", status: "Signed" as const, committee: "Health Care", date: "Jun 2023" },
  { id: "H.3104", title: "An Act relative to public transit funding", status: "Referred" as const, committee: "Transportation", date: "Feb 2024" },
];

const VOTES = [
  { bill: "H.4040", title: "FY2025 Budget — Education Line Items", vote: "Yes", date: "Jul 2024", result: "Passed" },
  { bill: "H.3800", title: "Climate Roadmap Act Extension", vote: "Yes", date: "May 2024", result: "Passed" },
  { bill: "H.3750", title: "MBTA Communities Zoning Compliance", vote: "Yes", date: "Apr 2024", result: "Passed" },
  { bill: "H.2985", title: "Public Safety Omnibus Bill", vote: "No", date: "Mar 2024", result: "Passed" },
  { bill: "H.2812", title: "Tax Relief for Seniors Act", vote: "Yes", date: "Feb 2024", result: "Failed" },
  { bill: "H.2401", title: "Charter School Expansion Funding", vote: "No", date: "Jan 2024", result: "Passed" },
];

// ─── Section panels ───────────────────────────────────────────────────────────

function VoicePanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 16, color: "#1a1a1a", marginBottom: 16 }}>
          Policy Priorities
        </h3>
        <div className="space-y-2.5">
          {L.priorities.map((p, i) => (
            <div key={p} className="flex items-center gap-3">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ backgroundColor: MAPLE_DARK_NAVY, fontFamily: "Nunito" }}
              >
                {i + 1}
              </span>
              <span style={{ fontFamily: "Nunito", fontSize: 14, color: "#333" }}>{p}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 16, color: "#1a1a1a", marginBottom: 12 }}>
            Committee Assignments
          </h3>
          <div className="space-y-2">
            {L.committees.map((c) => (
              <div key={c} className="flex items-center gap-2">
                <ChevronRight size={14} style={{ color: MAPLE_DARK_NAVY }} />
                <span style={{ fontFamily: "Nunito", fontSize: 14, color: "#333" }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 16, color: "#1a1a1a", marginBottom: 12 }}>
            About Rep. {L.name.split(" ")[1]}
          </h3>
          <p style={{ fontFamily: "Nunito", fontSize: 14, color: "#444", lineHeight: 1.65 }}>{L.bio}</p>
        </div>
      </div>
    </div>
  );
}

function BillsPanel() {
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex justify-between items-center">
        <h2 style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 16, color: "#1a1a1a" }}>Filed Bills</h2>
        <span style={{ fontFamily: "Nunito", fontSize: 13, color: "#606060" }}>2023–2024 Session</span>
      </div>
      {BILLS.map((bill, i) => (
        <div
          key={bill.id}
          className={`flex items-start gap-4 px-6 py-4 hover:bg-[#f9fafc] transition-colors cursor-pointer ${i < BILLS.length - 1 ? "border-b border-border" : ""}`}
        >
          <span style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 12, color: MAPLE_DARK_NAVY, paddingTop: 2, minWidth: 56 }}>
            {bill.id}
          </span>
          <div className="flex-1 min-w-0">
            <p style={{ fontFamily: "Nunito", fontSize: 14, color: "#1a1a1a", lineHeight: 1.5 }}>{bill.title}</p>
            <p style={{ fontFamily: "Nunito", fontSize: 12, color: "#606060", marginTop: 2 }}>{bill.committee} · {bill.date}</p>
          </div>
          <StatusBadge status={bill.status} />
        </div>
      ))}
    </div>
  );
}

function VotesPanel() {
  const yesCount = VOTES.filter((v) => v.vote === "Yes").length;
  const noCount = VOTES.filter((v) => v.vote === "No").length;

  return (
    <div className="space-y-4">
      {/* Summary row */}
      <div className="flex gap-4">
        {[
          { label: "Yes votes", value: yesCount, color: "#2e7d32", bg: "#e8f5e9" },
          { label: "No votes",  value: noCount,  color: "#b71c1c", bg: "#fce4ec" },
          { label: "Alignment with party", value: "91%", color: MAPLE_DARK_NAVY, bg: "#e8eff7" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-border px-6 py-4 flex-1">
            <p style={{ fontFamily: "Nunito", fontSize: 11, color: "#888", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
            <p style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 26, color, marginTop: 4 }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {VOTES.map((v, i) => (
          <div
            key={v.bill}
            className={`flex items-center gap-4 px-6 py-4 hover:bg-[#f9fafc] transition-colors ${i < VOTES.length - 1 ? "border-b border-border" : ""}`}
          >
            <span
              className="w-11 h-7 rounded flex items-center justify-center text-xs font-bold shrink-0"
              style={{
                backgroundColor: v.vote === "Yes" ? "#e8f5e9" : "#fce4ec",
                color: v.vote === "Yes" ? "#2e7d32" : "#b71c1c",
                fontFamily: "Nunito",
              }}
            >
              {v.vote}
            </span>
            <div className="flex-1 min-w-0">
              <p style={{ fontFamily: "Nunito", fontSize: 14, color: "#1a1a1a" }}>{v.title}</p>
              <p style={{ fontFamily: "Nunito", fontSize: 12, color: "#606060" }}>{v.bill} · {v.date}</p>
            </div>
            <span style={{ fontFamily: "Nunito", fontSize: 12, color: "#606060" }}>{v.result}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ElectionsPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 16, color: "#1a1a1a", marginBottom: 20 }}>
          Election History
        </h3>
        <ElectionBar year={2024} candidate={L.name} pct={68} opponent="R. Gomez" oppPct={32} />
        <ElectionBar year={2022} candidate={L.name} pct={61} opponent="T. Walsh" oppPct={39} />
        <ElectionBar year={2020} candidate={L.name} pct={57} opponent="M. Torres" oppPct={43} />
        <ElectionBar year={2018} candidate={L.name} pct={54} opponent="K. Park" oppPct={46} />
      </div>
      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-border p-6">
          <SectionLabel>Margin Trend</SectionLabel>
          <div className="space-y-3">
            {[
              { year: "2024", margin: "+36 pts" },
              { year: "2022", margin: "+22 pts" },
              { year: "2020", margin: "+14 pts" },
              { year: "2018", margin: "+8 pts" },
            ].map(({ year, margin }) => (
              <div key={year} className="flex justify-between items-center">
                <span style={{ fontFamily: "Nunito", fontSize: 14, color: "#333" }}>{year}</span>
                <span style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 14, color: MAPLE_DARK_NAVY }}>{margin}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-6">
          <SectionLabel>District Info</SectionLabel>
          <div className="space-y-2">
            {[
              ["District", "15th Suffolk"],
              ["Registered voters", "24,810"],
              ["2024 turnout", "38.4%"],
              ["Next election", L.nextElection],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span style={{ fontFamily: "Nunito", fontSize: 13, color: "#606060" }}>{label}</span>
                <span style={{ fontFamily: "Nunito", fontWeight: 600, fontSize: 13, color: "#1a1a1a" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FinancePanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Raised (2024)", value: "$142,300" },
          { label: "Individual Donors",   value: "847" },
          { label: "Average Donation",    value: "$168" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-border p-6">
            <p style={{ fontFamily: "Nunito", fontSize: 11, color: "#888", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
            <p style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 28, color: MAPLE_DARK_NAVY, marginTop: 8 }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 15, color: "#1a1a1a", marginBottom: 16 }}>
            Donor Categories
          </h3>
          {[
            { label: "Individual Contributions", pct: 62 },
            { label: "Labor Organizations",      pct: 18 },
            { label: "Progressive PACs",          pct: 12 },
            { label: "Small Businesses",          pct: 8 },
          ].map(({ label, pct }) => (
            <div key={label} className="mb-4">
              <div className="flex justify-between text-xs mb-1.5" style={{ fontFamily: "Nunito", color: "#606060" }}>
                <span>{label}</span>
                <span className="font-bold">{pct}%</span>
              </div>
              <div className="h-2 bg-[#f0f0f0] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: MAPLE_DARK_NAVY }} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h3 style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 15, color: "#1a1a1a", marginBottom: 16 }}>
            Fundraising by Quarter
          </h3>
          {[
            { q: "Q1 2024", amount: "$28,400" },
            { q: "Q2 2024", amount: "$41,200" },
            { q: "Q3 2024", amount: "$52,700" },
            { q: "Q4 2024", amount: "$20,000" },
          ].map(({ q, amount }) => (
            <div key={q} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
              <span style={{ fontFamily: "Nunito", fontSize: 14, color: "#333" }}>{q}</span>
              <span style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 14, color: MAPLE_DARK_NAVY }}>{amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ConceptOne() {
  const [activeSection, setActiveSection] = useState("voice");

  const panels: Record<string, JSX.Element> = {
    voice:     <VoicePanel />,
    bills:     <BillsPanel />,
    votes:     <VotesPanel />,
    elections: <ElectionsPanel />,
    finance:   <FinancePanel />,
  };

  return (
    <div className="min-h-screen bg-background">
      <MapleNav />
      <Breadcrumb items={["Legislators", L.name]} />

      {/* Hero */}
      <div className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-8 flex gap-6 items-start">
          <img
            src={L.photo}
            alt={L.name}
            className="w-24 h-24 rounded-full object-cover ring-2 ring-border shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 flex-wrap mb-1">
              <h1 style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 28, color: "#1a1a1a" }}>{L.name}</h1>
              <span
                className="px-2.5 py-0.5 rounded text-xs"
                style={{ backgroundColor: "#e8eff7", color: MAPLE_DARK_NAVY, fontFamily: "Nunito", fontWeight: 700 }}
              >
                Democrat
              </span>
            </div>
            <p style={{ fontFamily: "Nunito", fontSize: 15, color: "#606060" }}>
              {L.title} · {L.district} District · MA House
            </p>
            <div className="flex gap-1 mt-3 flex-wrap">
              {L.priorities.map((p) => <TopicTag key={p} label={p} />)}
            </div>
          </div>

          {/* Stats */}
          <div className="hidden lg:flex shrink-0 bg-[#f9fafc] border border-[#dee2e6] rounded-xl divide-x divide-border">
            <StatPill value={L.terms}       label="Terms" />
            <StatPill value={L.bills}       label="Bills Filed" />
            <StatPill value={L.cosponsored} label="Cosponsored" />
            <StatPill value={L.raised}      label="Raised" />
          </div>
        </div>
      </div>

      {/* Sticky tab nav */}
      <nav className="sticky top-0 z-30 bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-6 flex gap-0 overflow-x-auto scrollbar-hide">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className="flex items-center gap-2 px-4 py-4 border-b-2 transition-all whitespace-nowrap shrink-0"
              style={{
                fontFamily: "Nunito",
                fontWeight: activeSection === id ? 700 : 500,
                fontSize: 14,
                color: activeSection === id ? MAPLE_DARK_NAVY : "#606060",
                borderBottomColor: activeSection === id ? MAPLE_DARK_NAVY : "transparent",
              }}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Panel content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {panels[activeSection]}
      </div>
    </div>
  );
}
