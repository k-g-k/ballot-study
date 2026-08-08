import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  MapPin,
  ExternalLink,
  TreePine,
} from "lucide-react";

// ─── Design tokens ────────────────────────────────────────────────────────────
export const MAPLE_NAVY = "#1a3185";
export const MAPLE_DARK_NAVY = "#12266f";
export const MAPLE_ACTIVE_BG = "rgba(232,239,255,0.68)";
export const MAPLE_ACTIVE_BORDER = "#c9d8ff";
export const MAPLE_ACTIVE_TEXT = "#1e3f8a";

// ─── Legislator data ──────────────────────────────────────────────────────────
export const L = {
  name: "Jane Doe",
  title: "State Representative",
  district: "15th Suffolk",
  party: "Democrat",
  chamber: "House",
  terms: 4,
  bills: 23,
  cosponsored: 87,
  raised: "$142k",
  photo:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&auto=format",
  priorities: [
    "Housing Justice",
    "Climate Action",
    "Education Equity",
    "Public Health",
    "Transportation",
  ],
  committees: ["Education", "Housing", "Ways & Means"],
  nextElection: "November 2026",
  website: "https://malegislature.gov",
  email: "jane.doe@mahouse.gov",
  phone: "(617) 722-2140",
  office: "State House, Room 234",
  bio: "Representative Doe has served the 15th Suffolk district since 2016, championing progressive legislation on housing affordability, climate resilience, and equitable education funding. A former public school teacher and community organizer, she brings a constituent-first approach to every vote.",
};

// ─── Navigation ───────────────────────────────────────────────────────────────
export function MapleNav() {
  return (
    <nav
      className="w-full flex items-center px-6 h-[72px] shrink-0"
      style={{ backgroundColor: MAPLE_NAVY }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mr-10">
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <span
            style={{
              fontFamily: "Lexend",
              fontWeight: 600,
              fontSize: 13,
              color: "#fff",
            }}
          >
            M
          </span>
        </div>
        <span
          style={{
            fontFamily: "Nunito",
            fontWeight: 800,
            fontSize: 18,
            color: "#fff",
            letterSpacing: "0.06em",
          }}
        >
          MAPLE
        </span>
      </div>

      {/* Links */}
      <div className="flex items-center gap-1 flex-1">
        {["Bills", "Legislators", "Ballot Questions", "Hearings", "About"].map(
          (label) => (
            <a
              key={label}
              href="#"
              className="px-3 py-1.5 rounded transition-colors hover:bg-white/10"
              style={{
                fontFamily: "Nunito",
                fontWeight: 800,
                fontSize: 14,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {label}
            </a>
          ),
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <a
          href="#"
          className="px-4 py-1.5 rounded"
          style={{
            fontFamily: "Nunito",
            fontWeight: 700,
            fontSize: 14,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Sign in
        </a>
        <a
          href="#"
          className="px-4 py-1.5 rounded text-white"
          style={{
            fontFamily: "Nunito",
            fontWeight: 700,
            fontSize: 14,
            backgroundColor: MAPLE_DARK_NAVY,
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          Sign up
        </a>
      </div>
    </nav>
  );
}

// ─── Top navigation (MAPLE chrome, tree logo + Log In/Sign Up) ────────────────
const TOP_NAV_LINKS = [
  "Ballot Questions",
  "Bills",
  "Hearings",
  "Testimony",
  "About MAPLE",
  "Learn",
];
const TOP_NAV_DROPDOWNS = new Set(["About MAPLE", "Learn"]);

export function MapleTopNav() {
  return (
    <nav
      className="w-full flex items-center px-6 h-[64px] shrink-0"
      style={{ backgroundColor: MAPLE_NAVY }}
    >
      <div className="flex items-center gap-2 mr-auto">
        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
          <TreePine size={18} color="#fff" />
        </div>
        <span
          style={{
            fontFamily: "Nunito",
            fontWeight: 800,
            fontSize: 18,
            color: "#fff",
            letterSpacing: "0.06em",
          }}
        >
          MAPLE
        </span>
      </div>

      <div className="hidden md:flex items-center gap-1">
        {TOP_NAV_LINKS.map((label) => (
          <a
            key={label}
            href="#"
            className="flex items-center gap-1 px-3 py-1.5 rounded transition-colors hover:bg-white/10"
            style={{
              fontFamily: "Nunito",
              fontWeight: 700,
              fontSize: 13,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            {label}
            {TOP_NAV_DROPDOWNS.has(label) && <ChevronDown size={13} />}
          </a>
        ))}
      </div>

      <a
        href="#"
        className="ml-4 px-4 py-1.5 rounded text-white shrink-0"
        style={{
          fontFamily: "Nunito",
          fontWeight: 700,
          fontSize: 13,
          backgroundColor: "#d32f2f",
        }}
      >
        Log In/Sign Up
      </a>
    </nav>
  );
}

// ─── Breadcrumb back link (e.g. "← Return to ballot questions") ──────────────
export function BreadcrumbBack({ to, label }: { to: string; label: string }) {
  return (
    <div className="w-full px-6 py-2" style={{ backgroundColor: "#ededed" }}>
      <Link
        to={to}
        className="inline-flex items-center gap-2 no-underline"
        style={{
          fontFamily: "Nunito",
          fontWeight: 700,
          fontSize: 15,
          color: MAPLE_DARK_NAVY,
        }}
      >
        <ArrowLeft size={16} />
        {label}
      </Link>
    </div>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
export function Breadcrumb({ items }: { items: string[] }) {
  return (
    <div
      className="flex items-center gap-1.5 px-6 py-3 text-xs"
      style={{ color: "#606060", fontFamily: "Nunito" }}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="opacity-50">/</span>}
          {i < items.length - 1 ? (
            <a
              href="#"
              className="hover:underline"
              style={{ color: "#1e3f8a" }}
            >
              {item}
            </a>
          ) : (
            <span style={{ color: "#333" }}>{item}</span>
          )}
        </span>
      ))}
    </div>
  );
}

// ─── Topic Tag ────────────────────────────────────────────────────────────────
export function TopicTag({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full"
      style={{
        fontFamily: "Nunito",
        fontWeight: 700,
        fontSize: 12,
        backgroundColor: "#f0f0f0",
        border: "1px solid #d1d1d1",
        color: "#606060",
      }}
    >
      {label}
    </span>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
export function StatusBadge({
  status,
}: {
  status: "Active" | "Passed" | "Referred" | "Failed" | "Signed";
}) {
  const map: Record<string, { bg: string; text: string }> = {
    Active: { bg: "#e8f5e9", text: "#2e7d32" },
    Passed: { bg: "#e3f2fd", text: "#1565c0" },
    Signed: { bg: "#e8f5e9", text: "#1b5e20" },
    Referred: { bg: "#fff8e1", text: "#f57f17" },
    Failed: { bg: "#fce4ec", text: "#b71c1c" },
  };
  const s = map[status] ?? { bg: "#f0f0f0", text: "#606060" };
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: s.bg, color: s.text, fontFamily: "Nunito" }}
    >
      {status}
    </span>
  );
}

// ─── Page Heading ─────────────────────────────────────────────────────────────
// Shared top-level page title (e.g. "Ballot Questions", "Proposed Ballot
// Question (2026)"). One place to adjust size/weight across all pages.
export const PAGE_HEADING_SIZE = 28;

export function PageHeading({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className="font-['Nunito'] font-normal"
      style={{ fontSize: PAGE_HEADING_SIZE, color: "#1a1a1a" }}
    >
      {children}
    </h1>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-xs uppercase tracking-widest mb-4"
      style={{ fontFamily: "Nunito", fontWeight: 700, color: "#606060" }}
    >
      {children}
    </div>
  );
}

// ─── Stat Pill ────────────────────────────────────────────────────────────────
export function StatPill({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center px-5 py-3">
      <span
        style={{
          fontFamily: "Lexend",
          fontWeight: 600,
          fontSize: 22,
          color: MAPLE_DARK_NAVY,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "Nunito",
          fontWeight: 500,
          fontSize: 12,
          color: "#606060",
          marginTop: 2,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Profile Banner (shared compact version) ──────────────────────────────────
export function ProfileBanner() {
  return (
    <div className="bg-white border-b border-border px-8 py-6 flex items-center gap-6">
      <img
        src={L.photo}
        alt={L.name}
        className="w-16 h-16 rounded-full object-cover shrink-0 ring-2 ring-border"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h1
            style={{
              fontFamily: "Lexend",
              fontWeight: 600,
              fontSize: 22,
              color: "#1a1a1a",
            }}
          >
            {L.name}
          </h1>
          <span
            className="px-2 py-0.5 rounded text-xs ml-1"
            style={{
              backgroundColor: "#e8eff7",
              color: MAPLE_DARK_NAVY,
              fontFamily: "Nunito",
              fontWeight: 700,
            }}
          >
            D
          </span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span
            style={{ fontFamily: "Nunito", fontSize: 14, color: "#606060" }}
          >
            {L.title}
          </span>
          <span className="text-border">·</span>
          <span
            className="flex items-center gap-1"
            style={{ fontFamily: "Nunito", fontSize: 14, color: "#606060" }}
          >
            <MapPin size={13} />
            {L.district} District
          </span>
          <span className="text-border">·</span>
          <span
            style={{ fontFamily: "Nunito", fontSize: 14, color: "#606060" }}
          >
            {L.chamber}
          </span>
        </div>
      </div>
      <a
        href={L.website}
        className="hidden md:flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
        style={{
          fontFamily: "Nunito",
          fontWeight: 600,
          color: MAPLE_DARK_NAVY,
        }}
      >
        <ExternalLink size={14} />
        Official Site
      </a>
    </div>
  );
}

// ─── Election bar chart row ───────────────────────────────────────────────────
export function ElectionBar({
  year,
  candidate,
  pct,
  opponent,
  oppPct,
}: {
  year: number;
  candidate: string;
  pct: number;
  opponent: string;
  oppPct: number;
}) {
  return (
    <div className="mb-5">
      <div
        className="flex justify-between text-xs mb-1.5"
        style={{ fontFamily: "Nunito", color: "#606060" }}
      >
        <span className="font-bold text-[#1a1a1a]">{year}</span>
      </div>
      <div className="flex gap-2 items-center mb-1">
        <span
          className="w-28 text-xs truncate"
          style={{ fontFamily: "Nunito", fontWeight: 600, color: "#1a1a1a" }}
        >
          {candidate}
        </span>
        <div className="flex-1 h-5 bg-[#f0f0f0] rounded-sm overflow-hidden">
          <div
            className="h-full rounded-sm transition-all"
            style={{ width: `${pct}%`, backgroundColor: MAPLE_DARK_NAVY }}
          />
        </div>
        <span
          className="w-10 text-right text-xs font-bold"
          style={{ color: MAPLE_DARK_NAVY, fontFamily: "Nunito" }}
        >
          {pct}%
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <span
          className="w-28 text-xs truncate"
          style={{ fontFamily: "Nunito", color: "#606060" }}
        >
          {opponent}
        </span>
        <div className="flex-1 h-5 bg-[#f0f0f0] rounded-sm overflow-hidden">
          <div
            className="h-full rounded-sm"
            style={{ width: `${oppPct}%`, backgroundColor: "#d1d1d1" }}
          />
        </div>
        <span
          className="w-10 text-right text-xs"
          style={{ color: "#606060", fontFamily: "Nunito" }}
        >
          {oppPct}%
        </span>
      </div>
    </div>
  );
}
