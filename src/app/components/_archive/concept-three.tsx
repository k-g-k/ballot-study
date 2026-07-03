import { useState } from "react";
import {
  MapleNav, Breadcrumb, TopicTag, StatusBadge, SectionLabel,
  ElectionBar, StatPill, L, MAPLE_DARK_NAVY, MAPLE_ACTIVE_BG, MAPLE_ACTIVE_BORDER, MAPLE_ACTIVE_TEXT,
} from ".././maple-shared";
import { User, FileText, Vote, Mic, BarChart2, DollarSign, ChevronRight, MessageSquare } from "lucide-react";

const SECTIONS = [
  { id: "overview",  label: "Overview",         icon: User },
  { id: "bills",     label: "Bills",             icon: FileText },
  { id: "votes",     label: "Votes",             icon: Vote },
  { id: "hearings",  label: "Hearings",          icon: Mic },
  { id: "elections", label: "Elections",         icon: BarChart2 },
  { id: "finances",  label: "Finances",          icon: DollarSign },
];

const BILLS = [
  { id: "H.2341", title: "An Act relative to affordable housing production", status: "Active" as const, committee: "Housing", date: "Mar 2024" },
  { id: "H.2198", title: "An Act establishing a green new deal for Massachusetts", status: "Referred" as const, committee: "Environment", date: "Jan 2024" },
  { id: "H.1847", title: "An Act providing for equitable school funding", status: "Passed" as const, committee: "Education", date: "Nov 2023" },
  { id: "H.1532", title: "An Act expanding access to behavioral health services", status: "Signed" as const, committee: "Health Care", date: "Jun 2023" },
];

const VOTES = [
  { bill: "H.4040", title: "FY2025 Budget — Education Line Items", vote: "Yes", date: "Jul 2024", result: "Passed" },
  { bill: "H.3800", title: "Climate Roadmap Act Extension", vote: "Yes", date: "May 2024", result: "Passed" },
  { bill: "H.3750", title: "MBTA Communities Zoning Compliance", vote: "Yes", date: "Apr 2024", result: "Passed" },
  { bill: "H.2985", title: "Public Safety Omnibus Bill", vote: "No", date: "Mar 2024", result: "Passed" },
  { bill: "H.2812", title: "Tax Relief for Seniors Act", vote: "Yes", date: "Feb 2024", result: "Failed" },
];

const HEARINGS = [
  { title: "Joint Committee on Housing — H.2341", date: "Apr 15, 2024", role: "Presenting", location: "Gardner Auditorium" },
  { title: "Joint Committee on Education — H.1847", date: "Feb 8, 2024", role: "Presenting", location: "Room B-1" },
  { title: "Ways & Means Budget Hearing", date: "Jan 22, 2024", role: "Attending", location: "Room 236" },
];

export default function ConceptThree() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <MapleNav />
      <Breadcrumb items={["Legislators", L.name]} />

      {/* Slim profile banner */}
      <div className="bg-white border-b border-border px-8 py-5 flex items-center gap-5">
        <img
          src={L.photo}
          alt={L.name}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-border shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h1 style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 20, color: "#1a1a1a" }}>{L.name}</h1>
          <p style={{ fontFamily: "Nunito", fontSize: 13, color: "#606060" }}>{L.title} · {L.district} District · MA House</p>
        </div>
        <div className="hidden md:flex divide-x divide-border bg-[#f9fafc] border border-[#dee2e6] rounded-xl">
          <StatPill value={L.terms} label="Terms" />
          <StatPill value={L.bills} label="Bills" />
          <StatPill value={L.cosponsored} label="Cosponsored" />
          <StatPill value={L.raised} label="Raised" />
        </div>
      </div>

      {/* Dashboard layout */}
      <div className="flex max-w-7xl mx-auto">

        {/* Left sidebar nav */}
        <aside className="hidden md:flex flex-col w-56 shrink-0 py-6 px-3 sticky top-0 h-screen overflow-y-auto">
          <div className="space-y-0.5">
            {SECTIONS.map(({ id, label, icon: Icon }) => {
              const active = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className="w-full flex items-center gap-3 px-3 h-11 rounded-lg transition-all text-left"
                  style={{
                    fontFamily: "Nunito",
                    fontWeight: active ? 700 : 600,
                    fontSize: 15,
                    backgroundColor: active ? MAPLE_ACTIVE_BG : "transparent",
                    border: active ? `1px solid ${MAPLE_ACTIVE_BORDER}` : "1px solid transparent",
                    color: active ? MAPLE_ACTIVE_TEXT : "#334156",
                  }}
                >
                  <Icon size={16} style={{ opacity: active ? 1 : 0.6 }} />
                  {label}
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-6 border-t border-border">
            <button
              className="w-full py-2.5 rounded text-white text-sm font-bold mb-2 transition-opacity hover:opacity-90"
              style={{ backgroundColor: MAPLE_DARK_NAVY, fontFamily: "Nunito", fontWeight: 700, fontSize: 13 }}
            >
              Submit Testimony
            </button>
            <button
              className="w-full py-2.5 rounded text-sm font-bold transition-colors hover:bg-[#e8eff7]"
              style={{
                border: `1px solid ${MAPLE_DARK_NAVY}`,
                color: MAPLE_DARK_NAVY,
                fontFamily: "Nunito",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              Follow Rep. Doe
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 py-6">

          {/* ── Overview ── */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-border p-6">
                <SectionLabel>Biography</SectionLabel>
                <p style={{ fontFamily: "Nunito", fontSize: 15, color: "#333", lineHeight: 1.7 }}>{L.bio}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-border p-6">
                  <SectionLabel>Policy Priorities</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    {L.priorities.map((p) => <TopicTag key={p} label={p} />)}
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-border p-6">
                  <SectionLabel>Committees</SectionLabel>
                  <div className="space-y-2">
                    {L.committees.map((c) => (
                      <div key={c} className="flex items-center gap-2">
                        <ChevronRight size={14} style={{ color: MAPLE_DARK_NAVY }} />
                        <span style={{ fontFamily: "Nunito", fontSize: 14, color: "#333" }}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-border p-6">
                <SectionLabel>Contact</SectionLabel>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Office", L.office],
                    ["Phone", L.phone],
                    ["Email", L.email],
                    ["Next Election", L.nextElection],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p style={{ fontFamily: "Nunito", fontSize: 11, color: "#888", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
                      <p style={{ fontFamily: "Nunito", fontSize: 14, color: "#333", marginTop: 2 }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Bills ── */}
          {activeSection === "bills" && (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex justify-between items-center">
                <h2 style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 16, color: "#1a1a1a" }}>Filed Bills</h2>
                <span style={{ fontFamily: "Nunito", fontSize: 13, color: "#606060" }}>2023–2024 Session</span>
              </div>
              {BILLS.map((bill, i) => (
                <div key={bill.id} className={`flex items-start gap-4 px-6 py-4 ${i < BILLS.length - 1 ? "border-b border-border" : ""} hover:bg-[#f9fafc] transition-colors cursor-pointer`}>
                  <span style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 12, color: MAPLE_DARK_NAVY, paddingTop: 2, minWidth: 56 }}>{bill.id}</span>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: "Nunito", fontSize: 14, color: "#1a1a1a", lineHeight: 1.5 }}>{bill.title}</p>
                    <p style={{ fontFamily: "Nunito", fontSize: 12, color: "#606060", marginTop: 2 }}>{bill.committee} · {bill.date}</p>
                  </div>
                  <StatusBadge status={bill.status} />
                </div>
              ))}
            </div>
          )}

          {/* ── Votes ── */}
          {activeSection === "votes" && (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2 style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 16, color: "#1a1a1a" }}>Recent Votes</h2>
              </div>
              {VOTES.map((v, i) => (
                <div key={v.bill} className={`flex items-center gap-4 px-6 py-4 ${i < VOTES.length - 1 ? "border-b border-border" : ""} hover:bg-[#f9fafc] transition-colors`}>
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
          )}

          {/* ── Hearings ── */}
          {activeSection === "hearings" && (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2 style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 16, color: "#1a1a1a" }}>Committee Hearings</h2>
              </div>
              {HEARINGS.map((h, i) => (
                <div key={i} className={`flex items-start gap-4 px-6 py-4 ${i < HEARINGS.length - 1 ? "border-b border-border" : ""} hover:bg-[#f9fafc] transition-colors`}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: h.role === "Presenting" ? "#e8eff7" : "#f0f0f0" }}
                  >
                    <MessageSquare size={14} style={{ color: h.role === "Presenting" ? MAPLE_DARK_NAVY : "#606060" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: "Nunito", fontSize: 14, color: "#1a1a1a", lineHeight: 1.5 }}>{h.title}</p>
                    <p style={{ fontFamily: "Nunito", fontSize: 12, color: "#606060", marginTop: 2 }}>{h.date} · {h.location}</p>
                  </div>
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: h.role === "Presenting" ? "#e8eff7" : "#f0f0f0",
                      color: h.role === "Presenting" ? MAPLE_DARK_NAVY : "#606060",
                      fontFamily: "Nunito",
                      fontWeight: 700,
                    }}
                  >
                    {h.role}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ── Elections ── */}
          {activeSection === "elections" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-border p-6 max-w-lg">
                <SectionLabel>Election History</SectionLabel>
                <ElectionBar year={2024} candidate={L.name} pct={68} opponent="R. Gomez" oppPct={32} />
                <ElectionBar year={2022} candidate={L.name} pct={61} opponent="T. Walsh" oppPct={39} />
                <ElectionBar year={2020} candidate={L.name} pct={57} opponent="M. Torres" oppPct={43} />
                <ElectionBar year={2018} candidate={L.name} pct={54} opponent="K. Park" oppPct={46} />
              </div>
            </div>
          )}

          {/* ── Finances ── */}
          {activeSection === "finances" && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Total Raised (2024)", value: "$142,300" },
                  { label: "Individual Donors", value: "847" },
                  { label: "Average Donation", value: "$168" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white rounded-xl border border-border p-6">
                    <p style={{ fontFamily: "Nunito", fontSize: 11, color: "#888", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
                    <p style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 28, color: MAPLE_DARK_NAVY, marginTop: 8 }}>{value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-border p-6">
                <SectionLabel>Donor Categories</SectionLabel>
                {[
                  { label: "Individual Contributions", pct: 62 },
                  { label: "Labor Organizations", pct: 18 },
                  { label: "Progressive PACs", pct: 12 },
                  { label: "Small Businesses", pct: 8 },
                ].map(({ label, pct }) => (
                  <div key={label} className="mb-3">
                    <div className="flex justify-between text-xs mb-1" style={{ fontFamily: "Nunito", color: "#606060" }}>
                      <span>{label}</span>
                      <span className="font-bold">{pct}%</span>
                    </div>
                    <div className="h-2 bg-[#f0f0f0] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: MAPLE_DARK_NAVY }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
