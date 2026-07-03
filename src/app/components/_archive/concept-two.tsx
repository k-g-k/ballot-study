import { useState } from "react";
import {
  MapleNav, Breadcrumb, TopicTag, StatusBadge, SectionLabel,
  ElectionBar, ProfileBanner, L, MAPLE_DARK_NAVY,
} from ".././maple-shared";
import { MessageSquare, BookOpen, TrendingUp, ChevronRight } from "lucide-react";

const TABS = [
  { id: "about",    label: "About",        icon: BookOpen },
  { id: "bills",    label: "Legislation",  icon: TrendingUp },
  { id: "record",   label: "Track Record", icon: MessageSquare },
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
];

export default function ConceptTwo() {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="min-h-screen bg-background">
      <MapleNav />
      <Breadcrumb items={["Legislators", L.name]} />
      <ProfileBanner />

      {/* Tab bar */}
      <div className="bg-white border-b border-border sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 flex gap-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-2 px-5 py-4 border-b-2 transition-all whitespace-nowrap"
              style={{
                fontFamily: "Nunito",
                fontWeight: activeTab === id ? 700 : 500,
                fontSize: 14,
                color: activeTab === id ? MAPLE_DARK_NAVY : "#606060",
                borderBottomColor: activeTab === id ? MAPLE_DARK_NAVY : "transparent",
              }}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main + Engage sidebar */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8 items-start">
        <div className="flex-1 min-w-0">

          {/* ── About ── */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-border p-6">
                <h2 style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 18, color: "#1a1a1a", marginBottom: 12 }}>
                  About Rep. {L.name.split(" ")[1]}
                </h2>
                <p style={{ fontFamily: "Nunito", fontSize: 15, color: "#333", lineHeight: 1.7 }}>{L.bio}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-border p-6">
                  <SectionLabel>Policy Priorities</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    {L.priorities.map((p) => <TopicTag key={p} label={p} />)}
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-border p-6">
                  <SectionLabel>Committee Assignments</SectionLabel>
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
                <SectionLabel>Contact Information</SectionLabel>
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

          {/* ── Legislation ── */}
          {activeTab === "bills" && (
            <div className="space-y-6">
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
            </div>
          )}

          {/* ── Track Record ── */}
          {activeTab === "record" && (
            <div className="space-y-6">
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

              <div className="bg-white rounded-xl border border-border p-6">
                <SectionLabel>Election History</SectionLabel>
                <ElectionBar year={2024} candidate={L.name} pct={68} opponent="R. Gomez" oppPct={32} />
                <ElectionBar year={2022} candidate={L.name} pct={61} opponent="T. Walsh" oppPct={39} />
                <ElectionBar year={2020} candidate={L.name} pct={57} opponent="M. Torres" oppPct={43} />
              </div>
            </div>
          )}

        </div>

        {/* Engage sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-20 space-y-4">
          <div
            className="rounded-xl border p-5"
            style={{ backgroundColor: "#f9fafc", borderColor: "#dee2e6" }}
          >
            <h3 style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 14, color: "#1a1a1a", marginBottom: 12 }}>
              Make Your Voice Heard
            </h3>
            <p style={{ fontFamily: "Nunito", fontSize: 13, color: "#606060", lineHeight: 1.6, marginBottom: 16 }}>
              Submit testimony on pending bills. Your perspective matters.
            </p>
            <button
              className="w-full py-2.5 rounded text-white text-sm font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: MAPLE_DARK_NAVY, fontFamily: "Nunito", fontWeight: 700, fontSize: 13 }}
            >
              Submit Testimony
            </button>
            <button
              className="w-full py-2.5 rounded text-sm font-bold mt-2 transition-colors hover:bg-[#e8eff7]"
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

          <div className="bg-white rounded-xl border border-border p-5">
            <SectionLabel>Quick Stats</SectionLabel>
            <div className="space-y-3">
              {[
                { label: "Terms served", value: `${L.terms}` },
                { label: "Bills filed", value: `${L.bills}` },
                { label: "Cosponsored", value: `${L.cosponsored}` },
                { label: "Raised (2024)", value: L.raised },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span style={{ fontFamily: "Nunito", fontSize: 13, color: "#606060" }}>{label}</span>
                  <span style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 13, color: "#1a1a1a" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
