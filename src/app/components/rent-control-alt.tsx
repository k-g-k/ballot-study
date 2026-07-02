import { useState, useRef, useEffect, useMemo } from "react";
import {
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Megaphone,
  Scale,
  Lectern,
  MessageSquare,
  MessageSquareX,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  MessageSquareShare,
  MessagesSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MapleTopNav, BreadcrumbBack, PageHeading } from "./maple-shared";
import { POSITION_USERS, type PositionUser } from "../data/rent-control-users";
import {
  TESTIMONY,
  type TestimonyItem,
  type TestimonyStance,
} from "../data/rent-control-testimony";

// ─────────────────────────────────────────────────────────────────────────────
// BQ2-alt — alternative ballot-question deep-dive prototype.
//
// Same shell + six tabs as prototypes H/I. Everything INSIDE the tabs is built
// from GENERIC, REPEATABLE section components (PlainLanguage, YesNoMeaning,
// Provisions, Arguments, ClaimMap, Timeline, Polls, FinanceLedger, …) driven by a
// data object — so any other ballot question could populate the identical layout.
// Only the `RC` data below is rent-control-specific.
//
// Content bar: every fact is traceable to official info, a confirmed study, or a
// confirmed media article (see SOURCES). Unverifiable items (e.g. bare
// endorsements) are excluded entirely. Attributed opinion appears only as a
// confirmed quote, framed as "X said …", never as fact.
// ─────────────────────────────────────────────────────────────────────────────

type TabId =
  | "overview"
  | "background"
  | "for-against"
  | "perspectives"
  | "media"
  | "finance"
  | "references";
type SrcKind = "official" | "outside" | "ai" | "user";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "background", label: "Background" },
  { id: "for-against", label: "For & Against" },
  { id: "perspectives", label: "Public Perspectives" },
  { id: "media", label: "Media Coverage" },
  { id: "finance", label: "Campaign Finance" },
  { id: "references", label: "References" },
];

// ── Sources (all followed & verified this build) ─────────────────────────────
interface Source {
  label: string; // outlet / publisher
  kind: SrcKind;
  url: string;
  date?: string;
  /** Popover bibliography fields — title, issuer/author line, and a one-line note. */
  title?: string;
  meta?: string;
  note?: string;
}
const SOURCES: Record<string, Source> = {
  petition: {
    label: "Petition No. 25-21 (Mass.gov)",
    kind: "official",
    url: "https://www.mass.gov/doc/25-21-an-initiative-petition-to-protect-tenants-by-limiting-rent-increases/download",
    title:
      "An Initiative Petition to Protect Tenants by Limiting Rent Increases — certified petition text",
    meta: "Secretary of the Commonwealth / Office of the Attorney General · Certified Sep 3, 2025",
    note: "The full legal text of the measure, including coverage, baseline, and exemption provisions.",
  },
  agSummary: {
    label: "AG Summary of No. 25-21 (Mass.gov)",
    kind: "official",
    url: "https://www.mass.gov/doc/final-summary-for-25-21-an-initiative-petition-to-protect-tenants-by-limiting-rent-increases/download",
    title: "Attorney General's final summary of Petition No. 25-21",
    meta: "Office of the Attorney General · Sep 2025",
    note: "The AG's plain-language summary of the measure, prepared for voters and signature sheets.",
  },
  h5008: {
    label: "House Bill 5008, MA Legislature",
    kind: "official",
    url: "https://malegislature.gov/Bills/194/H5008.pdf",
    title: "House Bill 5008 — the initiative's legislative form",
    meta: "Massachusetts General Court · Feb 2026",
    note: "The bill the Legislature took up during its review window; lawmakers did not act by the May 2026 deadline.",
  },
  ballotpedia: {
    label: "Massachusetts Rent Control Initiative 2026 (Ballotpedia)",
    kind: "outside",
    url: "https://ballotpedia.org/Massachusetts_Rent_Control_Initiative_(2026)",
    title: "Massachusetts Rent Control Initiative (2026)",
    meta: "Ballotpedia",
    note: "Encyclopedia entry covering the measure text, support and opposition, campaign finance, and polling.",
  },
  tuftsGlobe: {
    label:
      "Boston Globe — Real estate-backed study warns rent control could tank property values",
    kind: "outside",
    url: "https://www.bostonglobe.com/2026/03/12/business/rent-control-property-values-massachusetts/",
    date: "Mar 12, 2026",
    title:
      "Real estate-backed study warns rent control could tank property values",
    meta: "Boston Globe",
    note: "Coverage of the GBREB-commissioned Tufts CSPA study projecting property-value and tax-base impacts.",
  },
  tuftsWBUR: {
    label: "WBUR — Real estate group warns proposal could lower property taxes",
    kind: "outside",
    url: "https://www.wbur.org/news/2026/03/12/rent-control-ballot-initiative-affordability-housing",
    date: "Mar 12, 2026",
    title:
      "Real estate group warns proposal could lower property taxes for cities and towns",
    meta: "WBUR",
    note: "Coverage of the Tufts CSPA projections and the campaigns' responses to them.",
  },
  healeyGlobe: {
    label:
      "Boston Globe — Rent control would 'effectively halt' housing production, Healey says",
    kind: "outside",
    url: "https://www.bostonglobe.com/2025/12/23/metro/maura-healey-rent-control-ballot-question-oppose/",
    date: "Dec 23, 2025",
    title:
      "Rent control would 'effectively halt' housing production, Healey says",
    meta: "Boston Globe",
    note: "Gov. Healey's first public statement of opposition to the ballot question.",
  },
  suffolkGlobe: {
    label: "Boston Globe — Suffolk/Globe poll on ballot questions",
    kind: "outside",
    url: "https://www.bostonglobe.com/2025/11/25/metro/suffolk-globe-poll-ballot-questions-rent-contol/",
    date: "Nov 25, 2025",
  },
  unhFeb: {
    label: "UNH Survey Center — Bay State Poll",
    kind: "outside",
    url: "https://scholars.unh.edu/survey_center_polls/931/",
    date: "Feb 2026",
  },
  wwlpPoll: {
    label: "WWLP — Poll shows more support for rent control",
    kind: "outside",
    url: "https://www.wwlp.com/news/massachusetts/poll-shows-more-support-for-rent-control-tax-cut/",
    date: "Feb 2026",
  },
  cbsSigs: {
    label: "CBS News Boston — Supporters say they have enough signatures",
    kind: "outside",
    url: "https://www.cbsnews.com/boston/news/rent-control-ballot-question-massachusetts",
    date: "Nov 19, 2025",
    title:
      "Rent control proposal has enough signatures for Massachusetts ballot, supporters say",
    meta: "CBS News Boston",
    note: "Signature filing; exemptions for owner-occupied ≤4 units and 10-year new construction; campaign statements from Carolyn Chou and Rose Webster-Smith.",
  },
  cwbCompromise: {
    label:
      "CommonWealth Beacon — Rent control backers seek legislative road away from ballot",
    kind: "outside",
    url: "https://commonwealthbeacon.org/housing/rent-control-backers-scrambling-to-find-legislative-road-away-from-the-ballot/",
    date: "Jun 2, 2026",
    title:
      "Rent control backers scrambling to find legislative road away from the ballot",
    meta: "CommonWealth Beacon",
    note: "Reports the June 2026 compromise talks between the YES campaign and legislative leaders.",
  },
  ocpfSHNS: {
    label:
      "State House News — Supportive groups helped finance signature gathering (OCPF)",
    kind: "outside",
    url: "https://www.statehousenews.com/news/politics/campaignfinance/supportive-groups-helped-finance-rent-control-signature-gathering/article_1cf44c97-5266-446e-9d15-d50d12d629b1.html",
    date: "2026",
    title: "Supportive groups helped finance rent control signature gathering",
    meta: "State House News Service",
    note: "Analysis of OCPF filings: totals raised, in-kind support behind the YES committee, and real-estate industry donors on the NO side.",
  },
  keepMAHome: {
    label: "Keep Massachusetts Home (Yes committee)",
    kind: "official",
    url: "https://www.homesforallmass.org/",
  },
  housingForMA: {
    label: "Housing for Massachusetts (No committee)",
    kind: "official",
    url: "https://housingformass.com/",
  },
  academicResearch: {
    label: "Peer-reviewed rent-control research (see Research & Evidence)",
    kind: "outside",
    url: "",
    title: "Peer-reviewed rent-control research",
    meta: "Autor, Palmer & Pathak 2014 · Sims 2007 · Diamond, McQuade & Qian 2019",
    note: "The studies summarized under Research & Evidence on the For & Against tab.",
  },
  mapleTestimony: {
    label: "Testimony submitted to MAPLE (this question)",
    kind: "user",
    url: "",
    title: "Verified account testimony on this question",
    meta: "MAPLE · Public Perspectives tab",
    note: "Statements submitted by organization, executive-office, and legislator accounts, shown in their own words on the Public Perspectives tab.",
  },
  q9: {
    label: "Massachusetts 1994 Election Results (Question 9)",
    kind: "official",
    url: "https://ballotpedia.org/Massachusetts_Rent_Control_Initiative_(2026)",
    title: "Question 9: Prohibition of Rent Control (1994)",
    meta: "Massachusetts election results · Nov 1994",
    note: "The voter-approved statewide ban on rent control that this initiative would end; it passed 51.3%–48.7% and repealed programs in Boston, Cambridge, and Brookline.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GENERIC, REPEATABLE SECTION COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const KIND_DOT: Record<SrcKind, string> = {
  official: "#3b82f6",
  user: "#f97316",
  outside: "#22c55e",
  ai: "#a855f7",
};

function Card({
  title,
  subtitle,
  children,
}: {
  title?: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-[8px] p-[24px]">
      {title && (
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[4px]">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="font-['Nunito'] text-[13px] text-[#808080] mb-[14px]">
          {subtitle}
        </p>
      )}
      {!subtitle && title && <div className="mb-[12px]" />}
      {children}
    </div>
  );
}

// Inline citation chips — each links out to a verified source.
function Cite({ ids }: { ids: string[] }) {
  return (
    <sup className="ml-[3px] whitespace-nowrap">
      {ids.map((id, i) => {
        const s = SOURCES[id];
        if (!s) return null;
        return (
          <a
            key={id}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            title={s.label}
            className="font-['Nunito'] font-bold text-[10px] text-[#6b21a8] no-underline hover:text-[#12266f]"
          >
            [{i > 0 ? "" : "src"}
            {i > 0 ? i + 1 : ""}↗]
          </a>
        );
      })}
    </sup>
  );
}

function SourceNote({ ids, text }: { ids?: string[]; text?: string }) {
  return (
    <p className="font-['Nunito'] text-[12px] text-[#808080] mt-[8px] leading-[1.5]">
      {text ? `${text} ` : "Source: "}
      {ids?.map((id, i) => {
        const s = SOURCES[id];
        if (!s) return null;
        return (
          <span key={id}>
            {i > 0 && "; "}
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#12266f] hover:text-[#c71e32]"
            >
              {s.label}
              {s.date ? ` (${s.date})` : ""}
            </a>
          </span>
        );
      })}
    </p>
  );
}

// Short display name for AI-synthesis source lists: official sources drop the
// trailing publisher parenthetical (the link covers it); outside sources cite
// just the website/outlet.
function shortSourceName(s: Source): string {
  if (s.kind === "outside") {
    const beforeDash = s.label.split(" — ")[0];
    if (beforeDash !== s.label) return beforeDash;
    const paren = s.label.match(/\(([^)]+)\)\s*$/);
    if (paren) return paren[1];
    return s.label;
  }
  return s.label.replace(/\s*\([^)]*\)\s*$/, "");
}

// Source line for AI-synthesized passages: sparkle badge, then each source as
// a short-name link with an outbound arrow.
function AISynthSources({ ids }: { ids: string[] }) {
  return (
    <p className="font-['Nunito'] text-[12px] text-[#808080] mt-[8px] leading-[1.5]">
      <Sparkles className="w-[12px] h-[12px] text-[#6b21a8] inline-block align-[-1.5px] mr-[4px]" />
      AI Synthesis of{" "}
      {ids.map((id, i) => {
        const s = SOURCES[id];
        if (!s) return null;
        return (
          <span key={id}>
            {i > 0 && "; "}
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#12266f] hover:text-[#c71e32] whitespace-nowrap"
            >
              {shortSourceName(s)}
              <ArrowUpRight className="w-[11px] h-[11px] inline-block align-[-1px]" />
            </a>
          </span>
        );
      })}
    </p>
  );
}

// Outlined provenance chips used in the sources popover.
const SRC_CHIP: Record<SrcKind, { bd: string; tx: string; label: string }> = {
  official: {
    bd: "border-[#93c5fd]",
    tx: "text-[#1e40af]",
    label: "Official Info",
  },
  outside: {
    bd: "border-[#86efac]",
    tx: "text-[#166534]",
    label: "Outside Content",
  },
  user: {
    bd: "border-[#fdba74]",
    tx: "text-[#9a3412]",
    label: "User-Submitted",
  },
  ai: { bd: "border-[#d8b4fe]", tx: "text-[#6b21a8]", label: "AI Synthesis" },
};

// Sources popover trigger.
//  - "ai" (default): muted AI Synthesis chip + "View Prompt & Sources".
//  - "plain": no chip, "View Sources" — for non-AI provenance (e.g. claims).
// Opens a bibliography popover (optional prompt, then each source with
// provenance chip, title, issuer · date, note, outbound link). Closes on
// outside click or Escape.
function SynthSourcesNote({
  ids,
  prompt,
  variant = "ai",
  linkClass,
  inline = false,
}: {
  ids: string[];
  prompt?: string;
  variant?: "ai" | "plain";
  /** Tailwind text/hover classes for the plain-variant trigger. */
  linkClass?: string;
  /** Render as an inline trigger (e.g. at the end of a sentence). */
  inline?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const triggerLabel =
    variant === "ai"
      ? "View Prompt & Sources"
      : ids.length === 1
        ? "View Source"
        : "View Sources";
  const triggerClass = `font-['Nunito'] font-semibold text-[13px] underline decoration-dotted underline-offset-[4px] cursor-pointer ${
    variant === "ai"
      ? "text-[#6b21a8] hover:text-[#4c1d95]"
      : (linkClass ?? "text-[#12266f] hover:text-[#c71e32]")
  }`;
  const trigger = (
    <button
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className={triggerClass}
    >
      {triggerLabel}
    </button>
  );
  const popover = open && (
    <div
      role="dialog"
      aria-label="Sources"
      className="absolute left-0 top-full mt-[8px] w-[440px] max-w-[80vw] max-h-[420px] overflow-y-auto bg-white border border-[#d1d1d1] rounded-[8px] shadow-[0_10px_28px_rgba(0,0,0,0.14)] p-[18px] z-30 text-left"
    >
      {prompt && (
        <div className="border-b border-dotted border-[#d1d1d1] mb-[14px] pb-[14px]">
          <span className="inline-block bg-white border border-[#d8b4fe] text-[#6b21a8] font-['Nunito'] font-bold text-[10px] tracking-[0.08em] uppercase px-[8px] py-[2px] rounded-[6px]">
            Prompt
          </span>
          <p className="font-['Nunito'] text-[13px] text-black leading-[1.5] mt-[8px]">
            {prompt}
          </p>
        </div>
      )}
      {ids.map((id, i) => {
        const s = SOURCES[id];
        if (!s) return null;
        const chip = SRC_CHIP[s.kind];
        const metaLine =
          s.meta && s.date && !s.meta.includes(s.date)
            ? `${s.meta} · ${s.date}`
            : (s.meta ?? s.date);
        return (
          <div
            key={id}
            className={
              i > 0
                ? "border-t border-dotted border-[#d1d1d1] mt-[14px] pt-[14px]"
                : ""
            }
          >
            <span
              className={`inline-block bg-white border ${chip.bd} ${chip.tx} font-['Nunito'] font-bold text-[10px] tracking-[0.08em] uppercase px-[8px] py-[2px] rounded-[6px]`}
            >
              {chip.label}
            </span>
            <p className="font-['Nunito'] font-bold text-[14px] text-black leading-[1.4] mt-[8px]">
              {s.title ?? s.label}
            </p>
            {metaLine && (
              <p className="font-['Nunito'] text-[13px] text-[#808080] mt-[2px]">
                {metaLine}
              </p>
            )}
            {s.note && (
              <p className="font-['Nunito'] text-[13px] text-black leading-[1.5] mt-[4px]">
                {s.note}
              </p>
            )}
            {s.url ? (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[3px] font-['Nunito'] font-bold text-[13px] text-[#12266f] underline underline-offset-2 hover:text-[#c71e32] mt-[6px]"
              >
                Open source <ArrowUpRight className="w-[13px] h-[13px]" />
              </a>
            ) : (
              <p className="font-['Nunito'] text-[13px] text-[#808080] mt-[6px]">
                Link not yet on file
              </p>
            )}
          </div>
        );
      })}
    </div>
  );

  if (inline) {
    return (
      <span ref={wrapRef} className="relative inline-block">
        {trigger}
        {popover}
      </span>
    );
  }
  return (
    <span ref={wrapRef} className="relative block mt-[10px]">
      <span className="flex items-center gap-[10px] flex-wrap">
        {variant === "ai" && (
          <span className="inline-flex items-center gap-[4px] bg-white border border-[#e2d6f5] text-[#8b6fb3] font-['Nunito'] font-bold text-[10px] tracking-[0.08em] uppercase px-[7px] py-[2px] rounded-[4px]">
            <Sparkles className="w-[10px] h-[10px]" />
            AI Synthesis
          </span>
        )}
        {trigger}
      </span>
      {popover}
    </span>
  );
}

// Lead summary card for a tab: card title, AI-synthesized paragraphs in a
// purple citation-line block, then the AI Synthesis chip + prompt/sources
// popover. Modeled on the Overview's "Summary of Initiative" card.
function SynthSummaryCard({
  title,
  subtitle,
  ids,
  prompt,
  children,
}: {
  title: string;
  subtitle?: string;
  ids: string[];
  prompt?: string;
  children: React.ReactNode;
}) {
  return (
    <Card title={title} subtitle={subtitle}>
      <div className="border-l-[3px] border-[#a855f7] pl-[14px]">
        <div className="space-y-[12px] font-['Nunito'] text-[14px] text-black leading-[1.6]">
          {children}
        </div>
        <SynthSourcesNote ids={ids} prompt={prompt} />
      </div>
    </Card>
  );
}

// Source-type-coded content box (official / user / outside / ai).
function ContentItem({
  type,
  children,
}: {
  type: SrcKind;
  children: React.ReactNode;
}) {
  const c = {
    official: {
      bg: "bg-[#dbeafe]",
      bd: "border-[#93c5fd]",
      tx: "text-[#1e40af]",
    },
    user: { bg: "bg-[#fed7aa]", bd: "border-[#fdba74]", tx: "text-[#9a3412]" },
    outside: {
      bg: "bg-[#bbf7d0]",
      bd: "border-[#86efac]",
      tx: "text-[#166534]",
    },
    ai: { bg: "bg-[#e9d5ff]", bd: "border-[#d8b4fe]", tx: "text-[#6b21a8]" },
  }[type];
  return (
    <div className={`${c.bg} border ${c.bd} rounded-[6px] px-[12px] py-[8px]`}>
      <div className={`font-['Nunito'] text-[14px] ${c.tx} tracking-[0.14px]`}>
        {children}
      </div>
    </div>
  );
}

// AI synthesis is a *layer*, not a section — a labeled purple block.
function AISynth({
  title,
  ids,
  children,
}: {
  title: string;
  ids?: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px]">
      <div className="flex items-center gap-[8px] mb-[8px] flex-wrap">
        <span className="bg-[#ede9fe] text-[#6b21a8] font-['Nunito'] font-bold text-[9px] tracking-[0.08em] uppercase px-[7px] py-[2px] rounded-[4px]">
          AI synthesis
        </span>
        <p className="font-['Nunito'] font-semibold text-[14px] text-[#6b21a8]">
          {title}
          {ids && <Cite ids={ids} />}
        </p>
      </div>
      <div className="font-['Nunito'] text-[14px] text-black leading-[1.55]">
        {children}
      </div>
    </div>
  );
}

// Two-column include/exclude scope list — generic.
function TwoColList({
  leftTitle,
  left,
  rightTitle,
  right,
  ids,
}: {
  leftTitle: string;
  left: string[];
  rightTitle: string;
  right: string[];
  ids?: string[];
}) {
  const Col = ({
    title,
    items,
    yes,
  }: {
    title: string;
    items: string[];
    yes: boolean;
  }) => (
    <div className="flex-1">
      <p className="font-['Nunito'] font-semibold text-[13px] text-[#606060] uppercase tracking-[0.08em] mb-[8px]">
        {title}
      </p>
      <div className="space-y-[6px]">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-[8px]">
            {yes ? (
              <Check className="w-[14px] h-[14px] text-[#3b82f6] shrink-0 mt-[2px]" />
            ) : (
              <X className="w-[14px] h-[14px] text-[#808080] shrink-0 mt-[2px]" />
            )}
            <p className="font-['Nunito'] text-[13px] text-black leading-[1.5]">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div>
      <div className="flex gap-[16px] max-lg:flex-col">
        <Col title={leftTitle} items={left} yes />
        <div className="w-[1px] bg-[#e5e7eb] shrink-0 max-lg:hidden" />
        <Col title={rightTitle} items={right} yes={false} />
      </div>
      {ids && <SourceNote ids={ids} />}
    </div>
  );
}

// Stakeholder-impact tiles — who benefits, who bears cost, who is exempt.
// Disputed/projected claims carry a ⚠ marker; every tile names its basis.
type StakeholderImpact = "benefits" | "cost" | "neutral";
interface Stakeholder {
  group: string;
  impact: StakeholderImpact;
  body: string;
  /** Projected or disputed claim — marked with a warning triangle. */
  disputed?: boolean;
  basis: string;
}

// Styling mirrors the Stakeholder Impact grid in concept I (i-ballotpedia-test).
const IMPACT_BADGE: Record<
  StakeholderImpact,
  { bg: string; tx: string; label: string }
> = {
  benefits: { bg: "bg-[#dcfce7]", tx: "text-[#166534]", label: "BENEFITS" },
  cost: { bg: "bg-[#fee2e2]", tx: "text-[#991b1b]", label: "BEARS COST" },
  neutral: {
    bg: "bg-[#f0f0f0]",
    tx: "text-[#606060]",
    label: "EXEMPT / NEUTRAL",
  },
};

function StakeholderGrid({ rows }: { rows: Stakeholder[] }) {
  return (
    <div className="grid grid-cols-2 gap-[10px]">
      {rows.map((s) => {
        const badge = IMPACT_BADGE[s.impact];
        return (
          <div
            key={s.group}
            className="border border-[#e5e7eb] rounded-[6px] p-[12px]"
          >
            <div className="flex items-start justify-between gap-[8px] mb-[6px]">
              <p className="font-['Nunito'] font-semibold text-[13px] text-black">
                {s.group}
              </p>
              <span
                className={`shrink-0 font-['Nunito'] font-bold text-[10px] tracking-[0.08em] px-[8px] py-[2px] rounded-[100px] ${badge.bg} ${badge.tx}`}
              >
                {badge.label}
              </span>
            </div>
            <p className="font-['Nunito'] text-[13px] text-[#334156] leading-[1.5]">
              {s.disputed && "⚠ "}
              {s.body}
            </p>
            <p className="font-['Nunito'] text-[11px] text-[#808080] mt-[6px]">
              Basis: {s.basis}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// Vote-side comparison card (Voting Yes / Voting No) — generic: summary,
// organizer avatars, funding, testifying-organization avatars, and the side's
// AG-approved official statement.
interface VoteSide {
  vote: "yes" | "no";
  summary: string;
  /** Account ids of the campaign organizers — avatars with hover tooltip, no link-out. */
  organizerIds: string[];
  /** Total raised — links to this page's Campaign Finance tab, not externally. */
  funding: string;
  sideLabel: string;
  /** This side's AG-approved statement (filler language in this prototype). */
  official: { text: string; who: string };
  ids?: string[];
}

// Hover reveals the account name — deliberately no link-out.
function AvatarWithTooltip({
  user,
  size = 40,
}: {
  user: PositionUser;
  size?: number;
}) {
  return (
    <div className="relative group shrink-0">
      <UserAvatar user={user} size={size} />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-[6px] hidden group-hover:block bg-[#1a1a1a] text-white font-['Nunito'] text-[12px] px-[8px] py-[4px] rounded-[6px] whitespace-nowrap z-20 pointer-events-none">
        {user.name}
      </div>
    </div>
  );
}

// Organization accounts (never public officials) that submitted MAPLE
// testimony with the given stance, newest first, deduped.
function orgTestifiers(stance: TestimonyStance): PositionUser[] {
  const seen = new Set<string>();
  const out: PositionUser[] = [];
  for (const t of TESTIMONY) {
    if (t.stance !== stance || seen.has(t.userId)) continue;
    const u = POSITION_USERS.find((x) => x.id === t.userId);
    if (u && u.userType === "organization") {
      seen.add(t.userId);
      out.push(u);
    }
  }
  return out;
}

// Lucide has no message-square-check — compose one to pair with MessageSquareX.
function MessageSquareCheckIcon({ size = 15 }: { size?: number }) {
  return (
    <span
      className="relative inline-block shrink-0"
      style={{ width: size, height: size }}
    >
      <MessageSquare className="w-full h-full" />
      <Check
        className="absolute"
        strokeWidth={3}
        style={{
          width: size * 0.5,
          height: size * 0.5,
          left: size * 0.25,
          top: size * 0.18,
        }}
      />
    </span>
  );
}

function shuffled<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Show at most 6 circles: with 7+ orgs, 5 avatars plus a "+N" overflow circle.
const MAX_SIDE_AVATARS = 6;

function VoteCard({
  d,
  onOpenFinance,
  onViewTestimony,
}: {
  d: VoteSide;
  onOpenFinance?: () => void;
  onViewTestimony?: () => void;
}) {
  const isYes = d.vote === "yes";
  const organizers = d.organizerIds
    .map((id) => POSITION_USERS.find((u) => u.id === id))
    .filter((u): u is PositionUser => Boolean(u));
  const sideOrgs = useMemo(
    () => shuffled(orgTestifiers(isYes ? "endorse" : "oppose")),
    [isYes],
  );
  const shownOrgs =
    sideOrgs.length > MAX_SIDE_AVATARS
      ? sideOrgs.slice(0, MAX_SIDE_AVATARS - 1)
      : sideOrgs;
  const overflowOrgs = sideOrgs.slice(shownOrgs.length);
  return (
    <div className="bg-white rounded-[8px] p-[24px] flex-1 flex flex-col">
      <div className="flex items-center gap-[10px] mb-[10px]">
        {isYes ? (
          <Check className="w-[24px] h-[24px] text-black shrink-0" />
        ) : (
          <X className="w-[24px] h-[24px] text-black shrink-0" />
        )}
        <p className="font-['Nunito'] font-normal text-[18px] text-black">
          Voting {isYes ? "Yes" : "No"}
        </p>
      </div>

      <p className="font-['Nunito'] text-[15px] text-[#334156] leading-[1.5] mb-[16px]">
        {d.summary}
        {d.ids && <Cite ids={d.ids} />}
      </p>

      <div className="grid grid-cols-2 gap-[8px] mb-[20px]">
        <div>
          <p className="font-['Nunito'] font-bold text-[13px] text-[#606060] uppercase tracking-[0.06em] mb-[6px]">
            Campaign Organizer
          </p>
          <div className="flex gap-[6px]">
            {organizers.map((u) => (
              <AvatarWithTooltip key={u.id} user={u} />
            ))}
          </div>
        </div>
        <div>
          <p className="font-['Nunito'] font-bold text-[13px] text-[#606060] uppercase tracking-[0.06em] mb-[4px]">
            Funding Raised
          </p>
          <button
            onClick={onOpenFinance}
            title="View the Campaign Finance tab"
            className="font-['Nunito'] font-bold text-[22px] text-[#12266f] hover:text-[#c71e32] cursor-pointer"
          >
            {d.funding}
          </button>
        </div>
      </div>

      <div className="mb-[20px]">
        <OfficialStatementLine text={d.official.text} who={d.official.who} />
      </div>

      <div className="mt-auto">
        <p className="flex items-center gap-[6px] font-['Nunito'] font-bold text-[13px] text-[#606060] uppercase tracking-[0.06em] mb-[6px]">
          {isYes ? (
            <MessagesSquare size={15} />
          ) : (
            <MessagesSquare className="w-[15px] h-[15px] shrink-0" />
          )}
          {d.sideLabel}
        </p>
        <div className="flex items-center flex-wrap gap-[6px]">
          {shownOrgs.map((u) => (
            <AvatarWithTooltip key={u.id} user={u} />
          ))}
          {overflowOrgs.length > 0 && (
            <div
              title={overflowOrgs.map((u) => u.name).join(", ")}
              className="w-[40px] h-[40px] rounded-full bg-[rgba(232,239,255,0.68)] border border-[#c9d8ff] flex items-center justify-center shrink-0"
            >
              <span className="font-['Nunito'] font-bold text-[12px] text-[#1e3f8a]">
                +{overflowOrgs.length}
              </span>
            </div>
          )}
          <button
            onClick={onViewTestimony}
            className="font-['Nunito'] font-bold text-[13px] text-[#12266f] hover:text-[#c71e32] cursor-pointer inline-flex items-center gap-[4px] ml-[0]"
          >
            View Testimony
            <ArrowRight className="w-[14px] h-[14px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Arguments — synthesized points, grouped per source type. Each source-type
// set is synthesized ONLY from that kind of source, and statements are sorted
// by which side of the question they support, not by the speaker's declared
// stance (a no-position official's point can still land In Favor or Against).
type ArgSourceTag =
  | "official"
  | "academic"
  | "organization"
  | "elected"
  | "citizen";
interface Arg {
  title: string;
  body: string;
  quote?: { text: string; who: string; ids: string[] };
}
type ArgSet = { yes: Arg[]; no: Arg[] };
function ArgList({ args }: { args: Arg[] }) {
  return (
    <div className="space-y-[12px]">
      {args.map((a) => (
        <div
          key={a.title}
          className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px]"
        >
          <p className="font-['Nunito'] font-semibold text-[14px] text-[#6b21a8] mb-[4px]">
            {a.title}
          </p>
          <p className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
            {a.body}
          </p>
        </div>
      ))}
    </div>
  );
}

// The side's AG-approved statement in the citation-block format used by the
// academic-research section — blue line, then the quote.
function OfficialStatementLine({ text, who }: { text: string; who: string }) {
  return (
    <div className="border-l-[3px] border-[#3b82f6] pl-[14px]">
      <p className="font-['Nunito'] font-bold text-[11px] tracking-[0.06em] uppercase text-[#606060] mb-[4px]">
        Official Statement
      </p>
      <p className="font-['Nunito'] italic text-[14px] text-black leading-[1.55]">
        “{text}”
      </p>
      <p className="font-['Nunito'] text-[12px] text-[#606060] mt-[3px]">
        — {who}
      </p>
    </div>
  );
}

// Timeline — generic dated milestone list.
interface TL {
  when: string;
  label: string;
  body?: string;
  ids?: string[];
}
function Timeline({ items }: { items: TL[] }) {
  return (
    <div className="ml-[6px] pl-[24px] border-l-[2px] border-[#e5e7eb] space-y-[18px]">
      {items.map((it) => (
        <div key={it.when + it.label} className="relative">
          <span className="absolute left-[-30px] top-[5px] w-[10px] h-[10px] rounded-full bg-[#12266f]" />
          <p className="font-['Nunito'] font-bold text-[10px] tracking-[0.07em] uppercase text-[#12266f]">
            {it.when}
          </p>
          <p className="font-['Nunito'] font-semibold text-[15px] text-black mt-[2px]">
            {it.label}
          </p>
          {it.body && (
            <p className="font-['Nunito'] text-[14px] text-[#334156] leading-[1.5] mt-[2px]">
              {it.body}
            </p>
          )}
          {it.ids && <SourceNote ids={it.ids} />}
        </div>
      ))}
    </div>
  );
}

// Key/value fact list — generic.
function Facts({
  items,
}: {
  items: { k: string; v: string; ids?: string[] }[];
}) {
  return (
    <div className="space-y-[8px]">
      {items.map((f) => (
        <div key={f.k} className="flex gap-[10px] text-[14px] leading-[1.5]">
          <span className="font-['Nunito'] font-semibold text-black min-w-[190px] shrink-0">
            {f.k}
          </span>
          <span className="font-['Nunito'] text-[#334156]">
            {f.v}
            {f.ids && <Cite ids={f.ids} />}
          </span>
        </div>
      ))}
    </div>
  );
}

// Claim mapping — verified claims first, then attributed. The ✓/⚠ marker and a
// bold Verified/Attributed label lead the note; the "View Source(s)" link sits
// inline at the end of the note. Not AI. Link color matches the claim's source
// (green = outside content, orange = MAPLE testimony).
type ClaimSource = "outside" | "testimony";
const CLAIM_LINK: Record<ClaimSource, string> = {
  outside: "text-[#166534] hover:text-[#0f4a26]",
  testimony: "text-[#9a3412] hover:text-[#7c2d12]",
};
interface ClaimRow {
  claim: string;
  mark: "verified" | "attributed";
  source: ClaimSource;
  note: string;
  ids?: string[];
}
function ClaimMap({ rows }: { rows: ClaimRow[] }) {
  return (
    <div className="space-y-[16px]">
      {rows.map((r) => {
        const verified = r.mark === "verified";
        return (
          <div
            key={r.claim}
            className="border-t border-dotted border-[#d1d1d1] pt-[16px] first:border-0 first:pt-0"
          >
            <p className="font-['Nunito'] font-semibold text-[15px] text-black leading-[1.45]">
              {r.claim}
            </p>
            <div className="font-['Nunito'] text-[13px] text-[#606060] mt-[4px] leading-[1.55]">
              {verified ? (
                <ShieldCheck className="w-[14px] h-[14px] text-[#166534] inline-block align-[-2px] mr-[4px]" />
              ) : (
                <AlertTriangle className="w-[14px] h-[14px] text-[#8a6d1d] inline-block align-[-2px] mr-[4px]" />
              )}
              <span
                className={`font-bold ${verified ? "text-[#166534]" : "text-[#8a6d1d]"}`}
              >
                {verified ? "Verified. " : "Attributed. "}
              </span>
              {r.note}
              {r.ids && (
                <>
                  {" "}
                  <SynthSourcesNote
                    ids={r.ids}
                    variant="plain"
                    inline
                    linkClass={CLAIM_LINK[r.source]}
                  />
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Polls — generic bar + methodology row.
interface PollRow {
  pollster: string;
  dates: string;
  sample: string;
  moe: string;
  support: number;
  oppose: number;
  undecided: number;
  ids: string[];
}
function Polls({ rows }: { rows: PollRow[] }) {
  return (
    <div className="space-y-[16px]">
      {rows.map((p) => (
        <div
          key={p.pollster + p.dates}
          className="border-t border-dotted border-[#d1d1d1] pt-[12px] first:border-0 first:pt-0"
        >
          <p className="font-['Nunito'] font-bold text-[14px] text-black">
            {p.pollster}
            <Cite ids={p.ids} />
          </p>
          <div className="flex h-[26px] rounded-[6px] overflow-hidden my-[8px] font-['Nunito'] font-bold text-[11px] text-white">
            <div
              className="bg-[#12266f] flex items-center pl-[9px]"
              style={{ width: `${p.support}%` }}
            >
              {p.support}%
            </div>
            <div
              className="bg-[#7c8196] flex items-center pl-[9px]"
              style={{ width: `${p.oppose}%` }}
            >
              {p.oppose}%
            </div>
            <div
              className="bg-[#d8d5ca] text-[#1f2330] flex items-center pl-[9px]"
              style={{ width: `${p.undecided}%` }}
            >
              {p.undecided}%
            </div>
          </div>
          <p className="font-['Nunito'] text-[12px] text-[#606060]">
            Support {p.support}% · Oppose {p.oppose}% · Undecided {p.undecided}%
            · {p.dates} · {p.sample} · MoE {p.moe}
          </p>
        </div>
      ))}
    </div>
  );
}

// Committee finance cards + donor tables — generic.
interface Committee {
  name: string;
  stance: "yes" | "no";
  total: string;
  cash: string;
  inKind: string;
  spent: string;
  note: string;
  donors: { name: string; amount: string; kind: string }[];
}
function FinanceLedger({
  committees,
  ids,
}: {
  committees: Committee[];
  ids: string[];
}) {
  return (
    <div>
      <div className="flex gap-[16px] max-lg:flex-col">
        {committees.map((c) => (
          <div
            key={c.name}
            className="flex-1 border border-[#d1d1d1] rounded-[12px] p-[18px]"
          >
            <div className="flex items-center gap-[8px] flex-wrap">
              <p className="font-['Nunito'] font-bold text-[16px] text-black">
                {c.name}
              </p>
              <span
                className={`font-['Nunito'] font-bold text-[10px] tracking-[0.04em] uppercase px-[10px] py-[2px] rounded-[100px] ${
                  c.stance === "yes"
                    ? "bg-[#e3f1e8] text-[#1e5b38]"
                    : "bg-[#fbe7e9] text-[#92121f]"
                }`}
              >
                {c.stance === "yes" ? "Yes" : "No"}
              </span>
            </div>
            <p className="font-['Nunito'] font-bold text-[24px] text-black mt-[8px]">
              {c.total}
            </p>
            <p className="font-['Nunito'] text-[12px] text-[#606060]">
              total contributions · {c.cash} cash · {c.inKind} in-kind ·{" "}
              {c.spent} spent
            </p>
            <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[8px] leading-[1.5]">
              {c.note}
            </p>
            <p className="font-['Nunito'] font-semibold text-[11px] tracking-[0.06em] uppercase text-[#606060] mt-[14px] mb-[6px]">
              Top donors
            </p>
            <div className="space-y-[5px]">
              {c.donors.map((d) => (
                <div
                  key={d.name}
                  className="flex justify-between gap-[12px] text-[13px] border-b border-dotted border-[#e5e7eb] pb-[4px]"
                >
                  <span className="font-['Nunito'] text-black">{d.name}</span>
                  <span className="font-['Nunito'] text-[#334156] whitespace-nowrap tabular-nums">
                    {d.amount} <span className="text-[#808080]">{d.kind}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <SourceNote ids={ids} />
    </div>
  );
}

// Research & evidence list — generic.
interface Study {
  citation: string;
  affiliation?: string;
  finding: string;
  url?: string;
}
function ResearchList({ studies }: { studies: Study[] }) {
  return (
    <div className="space-y-[12px]">
      {studies.map((s) => (
        <div
          key={s.citation}
          className="border-l-[3px] border-[#22c55e] pl-[14px]"
        >
          <p className="font-['Nunito'] font-semibold text-[14px] text-black leading-[1.5]">
            {s.citation}
            {s.affiliation && (
              <span className="font-normal italic text-[#606060]">
                {" "}
                — {s.affiliation}
              </span>
            )}
          </p>
          <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[2px] leading-[1.5]">
            {s.finding}
          </p>
          {s.url && (
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Nunito'] text-[12px] font-bold text-[#12266f] hover:text-[#c71e32] inline-flex items-center gap-[3px] mt-[3px]"
            >
              Source <ExternalLink className="w-[11px] h-[11px]" />
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

// Media article rows grouped by phase — generic.
interface Article {
  outlet: string;
  title: string;
  url: string;
  type: string;
}
function MediaPhase({
  phase,
  when,
  articles,
}: {
  phase: string;
  when: string;
  articles: Article[];
}) {
  return (
    <div className="border-t border-[#e8e6de] pt-[14px]">
      <p className="font-['Nunito'] font-semibold text-[15px] text-black">
        {phase}
      </p>
      <p className="font-['Nunito'] font-bold text-[10px] tracking-[0.07em] uppercase text-[#606060] mt-[2px] mb-[8px]">
        {when}
      </p>
      <div className="space-y-[8px]">
        {articles.map((a) => (
          <div
            key={a.title}
            className="flex gap-[12px] items-baseline flex-wrap"
          >
            <span className="font-['Nunito'] font-bold text-[10px] tracking-[0.06em] uppercase text-[#606060] min-w-[130px]">
              {a.outlet}
            </span>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Nunito'] font-semibold text-[14px] text-[#12266f] hover:text-[#c71e32] flex-1"
            >
              {a.title}
            </a>
            <span className="font-['Nunito'] text-[10px] tracking-[0.05em] uppercase text-[#808080]">
              {a.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Empty / invitation state — generic.
function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-[1.5px] border-dashed border-[#d1d1d1] rounded-[12px] p-[22px] text-center bg-[#fbfaf7]">
      <p className="font-['Nunito'] font-bold text-[15px] text-black mb-[4px]">
        {title}
      </p>
      <p className="font-['Nunito'] text-[13px] text-[#606060] leading-[1.5] max-w-[560px] mx-auto">
        {body}
      </p>
      <div className="flex gap-[10px] justify-center mt-[14px] flex-wrap">
        <button className="bg-[#12266f] text-white font-['Nunito'] font-bold text-[13px] px-[18px] py-[8px] rounded-[100px]">
          Share your perspective
        </button>
        <button className="bg-white border border-[#12266f] text-[#12266f] font-['Nunito'] font-bold text-[13px] px-[18px] py-[8px] rounded-[100px]">
          Ask a question
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VERIFIED, QUESTION-SPECIFIC DATA (the only rent-control-specific part)
// ─────────────────────────────────────────────────────────────────────────────

const RC = {
  title: "An Initiative Petition to Protect Tenants by Limiting Rent Increases",
  plain:
    "Would cap annual rent increases for most residential units at the Consumer Price Index (CPI) or 5%, whichever is lower.",
  tags: ["Housing Policy", "Tenant Rights", "Rental Market"],

  overviewSummary:
    "This initiative would cap annual rent increases on most residential units at either inflation (CPI) or 5% whichever is lower, and would apply between tenancies, measured from the rent in place on January 31, 2026. It would end the statewide ban on rent control that Massachusetts voters approved in 1994. After clearing the signature and certification stages, it advanced to the Legislature; because lawmakers did not enact it, a second round of signatures sends it toward the November 2026 statewide ballot.",

  yes: "The rent cap takes effect statewide for covered residential units. Annual increases may not exceed CPI or 5% (whichever is lower), measured from each unit's January 31, 2026 base rent, and the cap applies even when a new tenant moves in.",
  no: "No change in the law. The statewide ban on rent control — in effect since voters approved Question 9 in 1994 — remains, and landlords of non-exempt units keep full discretion over rent pricing.",

  covered: [
    "Most multi-unit rental buildings where the landlord does not live on-site",
    "Larger rental complexes and apartment buildings",
    "Units rented by tenants holding a mobile housing voucher",
    "Rental housing first occupied more than 10 years ago",
  ],
  exempt: [
    "Owner-occupied buildings with fewer than 5 units",
    "New construction — first occupied less than 10 years ago",
    "Units already regulated by another public authority (except mobile-voucher holders)",
    "Short-term rentals to transient guests (fewer than 14 consecutive days)",
    "Facilities operated solely for educational, religious, or non-profit purposes",
  ],

  stakeholders: [
    {
      group: "Tenants in covered units",
      impact: "benefits",
      body: "Rent increases capped at CPI or 5% annually from Jan 31, 2026 base. Protection follows the unit — applies to new tenants too.",
      basis: "Petition text",
    },
    {
      group: "Small landlords (owner-occ, <5 units)",
      impact: "neutral",
      body: "Fully exempt from the cap. Owner-occupants of buildings with 4 or fewer units are not covered by any provision of the initiative.",
      basis: "Petition text",
    },
    {
      group: "Larger / corporate landlords",
      impact: "cost",
      body: "Annual rent increases limited. Revenue growth constrained at inflation or 5%, regardless of market conditions or vacancies.",
      basis: "Petition text",
    },
    {
      group: "Developers (new construction)",
      impact: "neutral",
      body: "Buildings less than 10 years old are exempt, preserving incentives for new development in the near term.",
      basis: "Petition text",
    },
    {
      group: "Homeowners (non-landlords)",
      impact: "cost",
      disputed: true,
      body: "Per Tufts CSPA study (cited by opposition): property values could fall up to 14% over a decade, shifting ~$300B in value and potentially raising property tax burdens.",
      basis: "Tufts CSPA study — independent peer review not confirmed",
    },
    {
      group: "Cities & towns",
      impact: "cost",
      disputed: true,
      body: "Per same Tufts study: residential property tax base could shrink 6–9% immediately, forcing service cuts or tax increases of at least 10% to compensate.",
      basis: "Tufts CSPA study — independent peer review not confirmed",
    },
  ] as Stakeholder[],

  overviewFraming:
    "Supporters argue a predictable, inflation-linked cap protects tenants from displacement and is aimed at large corporate owners, while small owner-occupied buildings and new construction are exempt. Opponents argue a statewide cap binding at turnover would deter housing creation and shift costs onto homeowners and tax-payer dollars. Both sides have mounted organized, well-funded campaigns.",

  overviewVotes: {
    yes: {
      vote: "yes",
      summary:
        "Establishes the statewide cap — annual rent increases limited to CPI or 5%, whichever is lower.",
      organizerIds: ["keep-ma-home", "homes-for-all-ma"],
      funding: "$748K",
      sideLabel: "Endorsing Orgs",
      official: {
        text: "This is the official statement submitted by the endorsing parties and approved by the AG's office. This statement will cover all of the reasons voters should vote yes for this measure on Election Day and likely why voting no is a very unadvised idea for Massachusetts. This will be likely shorter than the official statement because we are using filler language instead of actual official language.",
        who: "Rep for Homes for All Massachusetts",
      },
    },
    no: {
      vote: "no",
      summary:
        "Makes no change in the law; the statewide ban on rent control in place since 1994 remains.",
      organizerIds: ["housing-for-ma"],
      funding: "$458K",
      sideLabel: "Opposing Orgs",
      official: {
        text: "This is the official statement submitted by the opposing parties and approved by the AG's office. This statement will cover all of the reasons voters should vote no for this measure on Election Day and likely why voting yes is a very unadvised idea for Massachusetts. This will be likely shorter than the official statement because we are using filler language instead of actual official language.",
        who: "Rep for Housing for Massachusetts",
      },
    },
  } as { yes: VoteSide; no: VoteSide },

  timeline: [
    {
      when: "Aug 7, 2025",
      label: "Petition filed",
      body: "The Attorney General announced the initiative had been filed (No. 25-21).",
      ids: ["ballotpedia", "petition"],
    },
    {
      when: "Sep 3, 2025",
      label: "Cleared for signatures",
      body: "The AG certified the petition; signature gathering began.",
      ids: ["ballotpedia"],
    },
    {
      when: "Nov 19, 2025",
      label: "Signatures submitted",
      body: "Homes for All Massachusetts reported submitting more than 124,000 signatures.",
      ids: ["cbsSigs"],
    },
    {
      when: "Dec 18, 2025",
      label: "Signatures certified",
      body: "The Elections Division certified 88,132 valid signatures (74,574 required), sending it to the Legislature.",
      ids: ["ballotpedia"],
    },
    {
      when: "Feb 5, 2026",
      label: "Introduced as H.5008",
      body: "The initiative entered the Legislature as House Bill 5008.",
      ids: ["h5008"],
    },
    {
      when: "May 5, 2026",
      label: "Legislature does not act",
      body: "With no legislative approval by the deadline, second-round signature collection began.",
      ids: ["ballotpedia"],
    },
    {
      when: "Jun 2, 2026",
      label: "Compromise floated",
      body: "Homes for All Massachusetts drafted a legislative compromise, offering to drop the ballot effort if it passed by July 1.",
      ids: ["cwbCompromise"],
    },
    {
      when: "Jun 16, 2026",
      label: "Healey & NAIOP open to compromise",
      body: "Both said they would support a legislative compromise on rent control.",
      ids: ["ballotpedia"],
    },
  ] as TL[],

  processFacts: [
    {
      k: "Measure type",
      v: "Indirect initiated state statute — goes to the Legislature first, then to voters if it does not act.",
      ids: ["ballotpedia"],
    },
    {
      k: "First-round signatures",
      v: "74,574 required (3% of the last gubernatorial vote); 124,000+ submitted; 88,132 certified.",
      ids: ["ballotpedia", "cbsSigs"],
    },
    {
      k: "Second-round signatures",
      v: "12,429 required (0.5%); deadline July 1, 2026.",
      ids: ["ballotpedia"],
    },
    {
      k: "Distribution rule",
      v: "No more than 25% of certified signatures may come from a single county.",
      ids: ["ballotpedia"],
    },
    {
      k: "Legislative window",
      v: "The Legislature had until the first Wednesday of May 2026 to enact the measure; it did not, triggering the second signature round.",
      ids: ["ballotpedia"],
    },
  ],

  relatedContext: [
    {
      k: "Current law",
      v: "Rent control has been banned statewide since 1994, when Question 9 passed with 51.3% and repealed programs in Boston, Cambridge, and Brookline.",
      ids: ["q9"],
    },
    {
      k: "Related legislation",
      v: "S.1299 (2023) and S.1447 / H.2328 (2025) would have let cities adopt local rent control; none passed. H.5008 (2026) was this initiative's legislative form.",
      ids: ["ballotpedia", "h5008"],
    },
    {
      k: "Other states",
      v: "California is the only other state to decide rent control by statewide ballot — five measures (Props 199, 98, 10, 21, 33) from 1996–2024, all defeated; Prop 10 (2018) had the highest support at 40.6%.",
      ids: ["ballotpedia"],
    },
  ],

  // "All" — the best and most common arguments rolled up across the source
  // categories (academic research, organization / elected-official / citizen
  // testimony), with design points derived from the official documents.
  yesArgs: [
    {
      title: "Housing Costs are Unsustainable",
      body: "Across organization and official testimony the same picture recurs: housing costs are outrunning wages and renters are stretched thin. A predictable cap on increases is the relief people are asking for now.",
    },
    {
      title: "It Keeps Families in Their Homes",
      body: "Peer-reviewed research finds covered tenants are far less likely to be displaced, and the cap takes effect right away — giving renters protection before rising costs force them out, not years down the line.",
    },
    {
      title: "Protecting Tenants Doesn't Stop Building",
      body: "Supporters argue tenant protection and new housing production are two different problems with two different tools: a cap shields current renters from displacement while the state keeps working to build more — one doesn't have to come at the expense of the other.",
    },
  ] as Arg[],
  noArgs: [
    {
      title: "Housing Creation Would Grind to a Halt",
      body: "Officials, the real-estate industry, and the peer-reviewed research all warn a statewide cap deters investment and shrinks rental supply — in the studies, owners pulled units off the market and citywide rents rose.",
    },
    {
      title: "The Costs Get Shifted, Not Solved",
      body: "A cap doesn't erase costs, it moves them — onto small landlords facing rising insurance and upkeep, onto renters in uncontrolled units, and onto homeowners and towns through falling property values and a shrinking tax base.",
    },
    {
      title: "Smaller Cities Would be Hit Hardest",
      body: "One CPI-or-5% formula binds Boston's overheated market and slow regional cities alike, with no local option — and where development already barely pencils out, a one-size-fits-all cap could stop new housing cold.",
    },
  ] as Arg[],

  // Per-source argument sets for the glance filters — three In Favor and three
  // Against per source type where the sources support it. Statements from
  // no-position accounts (Wu, Mariano) are sorted by the direction of the
  // point itself.
  argsBySource: {
    official: {
      yes: [
        {
          title: "Protection Starts Immediately",
          body: "The text sets each unit's base rent at January 31, 2026 and caps increases from there — relief for covered tenants begins at once, without waiting for new housing supply to materialize.",
        },
        {
          title: "It Removes the Incentive to Push Tenants Out",
          body: "Because the cap holds even when tenancy changes, a landlord gains nothing by displacing a tenant to reset the rent — the design closes the turnover loophole that undermined earlier rent control.",
        },
        {
          title: "The Text Already Answers the Supply Objection",
          body: "The petition exempts new buildings for ten years and small owner-occupied properties entirely — engineering the cap so it cannot touch the construction and small-landlord activity opponents say it threatens.",
        },
      ],
      no: [
        {
          title: "One Formula Can't Fit Every Market",
          body: "The text applies the identical CPI-or-5% cap to every municipality — from Boston's overheated market to regions where rents are flat — with no provision for local conditions or local choice.",
        },
        {
          title: "There's No Way to Fix It if It Breaks",
          body: "The certified text contains no hardship waiver, cost pass-through, or review mechanism; if the cap proves too tight against real operating costs, only another statewide statute or ballot vote can adjust it.",
        },
        {
          title: "Voters Already Decided This Question",
          body: "The official record shows Massachusetts weighed statewide rent control in 1994 and rejected it — and the Legislature has since declined every local-option alternative. The petition reverses that verdict wholesale.",
        },
      ],
    },
    academic: {
      yes: [
        {
          title: "Rent Control Keeps People in Their Homes",
          body: "Across the studies, rent control achieves its core aim: covered tenants stay in their homes longer and are measurably less likely to be displaced, with the largest gains for long-tenured households.",
        },
        {
          title: "The Known Downsides are Largely Exempted Here",
          body: "The supply and value losses in the literature came largely through new construction and small-building conversion — activity this petition exempts for ten years or excludes for small owner-occupants.",
        },
        {
          title: "Construction Impacts are Smaller Than Claimed",
          body: "Where researchers measured construction directly, effects were modest; the literature locates rent control's costs mainly in upkeep and conversion, not in a halt to building.",
        },
      ],
      no: [
        {
          title: "Rental Supply Shrinks Under Rent Caps",
          body: "Across the cities studied, owners respond to caps by pulling units from the rental market — conversions, owner move-ins, redevelopment — shrinking supply and raising rents on uncontrolled units.",
        },
        {
          title: "The Costs Reach Beyond Controlled Units",
          body: "The research repeatedly finds effects past the regulated stock: higher citywide rents, depressed property values while caps bind, and value rebounds only after decontrol.",
        },
        {
          title: "Housing Quality Declines Over Time",
          body: "Studies of Massachusetts' own experience find binding caps surface as deferred maintenance and unit conversion, degrading the existing stock even where construction continues.",
        },
      ],
    },
    organization: {
      yes: [
        {
          title: "Housing Costs are an Emergency",
          body: "Tenant, labor, and community groups converge on the same picture: housing costs are outrunning wages statewide, and renters need predictable costs now — not after new supply eventually arrives.",
        },
        {
          title: "This Targets Corporate Landlords, Not Small Owners",
          body: "Endorsing organizations consistently name big corporate investors who unreasonably raise rents as the target, insisting the policy still lets local landlords earn a reasonable profit.",
        },
        {
          title: "Protecting Tenants Doesn't Stop Building",
          body: "Across the endorsing testimony, groups reject judging the measure as development policy: it is a tenant-protection tool meant to work alongside building more housing, not instead of it.",
        },
      ],
      no: [
        {
          title: "It Would be the Nation's Most Restrictive Rent Control",
          body: "The common thread in business and real-estate testimony is scope: a mandatory cap on every city and town with no local opt-in, which opponents describe as the most restrictive program in the country.",
        },
        {
          title: "The Costs Get Shifted, Not Solved",
          body: "Opposing groups repeatedly argue the cap relocates costs — onto small landlords facing rising insurance and maintenance, and onto homeowners and municipal budgets through a shrinking tax base.",
        },
        {
          title: "We've Been Here Before — It Didn't Work",
          body: "Several opponents invoke the pre-1994 experience — deferred maintenance, reduced quality, stalled development — and note production rebounded after voters ended rent control statewide.",
        },
      ],
    },
    elected: {
      yes: [
        {
          title: "Housing Costs are Unsustainable",
          body: "Officials taking no position still describe the same squeeze in their testimony: polling shows people are frustrated, housing costs are far too high, and voters want something done.",
        },
        {
          title: "This Could Force a Better Solution",
          body: "Sympathetic officials frame the question as an opening — even without endorsing it, they hope broad support pushes the state toward a more nuanced stabilization solution after the vote.",
        },
        {
          title: "The Status Quo is Failing Us",
          body: "Even officials withholding a position testify that the old approaches to housing are not working and new, inventive ones are needed — the same frustration supporters channel into this question.",
        },
      ],
      no: [
        {
          title: "Housing Production Would Grind to a Halt",
          body: "The governor, gateway-city mayors, and the Speaker converge on one warning: the cap would deter investment and halt housing production — in Boston, and especially in regional markets with thin margins.",
        },
        {
          title: "It Defeats Its Own Purpose",
          body: "Officials across positions argue the question works against its stated aim of housing abundance by raising barriers and costs for anyone entering the rental market.",
        },
        {
          title: "Smaller Cities Would be Hit Hardest",
          body: "Officials stress the cap applies not just to the red-hot Boston market but everywhere in the Commonwealth — and that regions where development already struggles to pencil out would be hit hardest.",
        },
      ],
    },
    citizen: { yes: [], no: [] },
  } as Record<ArgSourceTag, ArgSet>,

  consensus: [
    "Massachusetts is experiencing a severe housing affordability crisis driving tenant displacement.",
    "Both sides agree the state needs substantially more housing production regardless of this measure.",
    "Owner-occupied buildings under 5 units and new construction (first 10 years) are exempt — that scope is not in dispute.",
  ],
  disagreement: [
    "Whether a statewide mandate or a local option is the right scale for rent policy.",
    "Whether rent caps reduce new housing construction — the central empirical dispute.",
    "Whether exemptions are sufficient to protect small landlords from operating at a loss.",
    "The severity and probability of fiscal impacts on the residential property tax base.",
    "Whether a cap that binds at turnover deters construction and maintenance.",
  ],
  openQuestions: [
    "No U.S. state runs a statewide cap that binds at turnover, so direct evidence on this exact design does not exist.",
    "How a CPI-linked cap would interact with insurance and utility costs that have risen faster than inflation.",
    "How the 10-year new-construction exemption interacts with longer-term housing production cycles.",
    "Would local governments retain any ability to set tighter or looser caps under this statewide framework?",
  ],

  // Checkable claims pulled from the arguments for and against, then vetted.
  // Verified first, then attributed (Tufts study, then testimony).
  claims: [
    {
      // From the YES argument "It Keeps Families in Their Homes."
      claim: "A rent cap makes covered tenants far less likely to be displaced.",
      mark: "verified",
      source: "outside",
      note: "Supported by peer-reviewed research (Diamond, McQuade & Qian 2019) on San Francisco — the tenant-stability effect is well established, though measured in a different city.",
      ids: ["academicResearch"],
    },
    {
      // From the NO argument "Housing Creation Would Grind to a Halt."
      claim:
        "Rent caps shrink rental supply and push up rents on uncontrolled units.",
      mark: "verified",
      source: "outside",
      note: "Supported by peer-reviewed research (Diamond, McQuade & Qian 2019), where covered landlords cut supply ~15% and citywide rents rose — the Massachusetts effect of this specific design is not directly measured.",
      ids: ["academicResearch"],
    },
    {
      // From the NO argument "The Costs Get Shifted, Not Solved."
      claim:
        "“Rent control would shrink the property tax base by 6–9% immediately”",
      mark: "attributed",
      source: "outside",
      note: "From a Tufts CSPA study cited and publicized by the opposition — independent peer review status not confirmed in available reporting",
      ids: ["tuftsGlobe", "tuftsWBUR"],
    },
    {
      // From the NO organization argument "It Would be the Nation's Most Restrictive…"
      claim:
        "“Creates the most restrictive rent control program in the entire United States”",
      mark: "attributed",
      source: "testimony",
      note: "Asserted jointly by Greater Boston Real Estate Board, MA Association of REALTORS, and NAIOP Massachusetts — no independent comparative citation provided",
      ids: ["mapleTestimony", "ballotpedia"],
    },
    {
      // From the NO elected argument "Housing Creation Would Grind to a Halt" (Healey).
      claim: "“Investors have already pulled out of Massachusetts”",
      mark: "attributed",
      source: "testimony",
      note: "Asserted by Gov. Healey — no data source cited; the initiative had not become law at the time the statement was made",
      ids: ["mapleTestimony", "healeyGlobe"],
    },
  ] as ClaimRow[],

  studies: [
    {
      citation: "Center for State Policy Analysis, Tufts University (2026)",
      affiliation:
        "commissioned by the Greater Boston Real Estate Board, which opposes the measure",
      finding:
        "Projects the residential property tax base would shrink 6–9%, with property values down ~14% over a decade (~$300B), extrapolating from Cambridge and St. Paul.",
      url: SOURCES.tuftsGlobe.url,
    },
    {
      citation: "Autor, Palmer & Pathak, Journal of Political Economy (2014)",
      affiliation: "peer-reviewed",
      finding:
        "After Cambridge, MA ended rent control, property values rose substantially, including at never-controlled buildings nearby.",
    },
    {
      citation: "Diamond, McQuade & Qian, American Economic Review (2019)",
      affiliation: "peer-reviewed",
      finding:
        "In San Francisco, covered tenants were more likely to stay, but covered landlords reduced rental supply ~15%, raising citywide rents.",
    },
    {
      citation: "Sims, Journal of Urban Economics (2007)",
      affiliation: "peer-reviewed",
      finding:
        "The end of Massachusetts rent control had small effects on new construction; larger effects ran through maintenance and conversion.",
    },
  ] as Study[],

  mediaPhases: [
    {
      phase: "Compromise talks",
      when: "June 2026",
      articles: [
        {
          outlet: "CommonWealth Beacon",
          title:
            "Rent control backers scrambling to find a legislative road away from the ballot",
          url: SOURCES.cwbCompromise.url,
          type: "News",
        },
      ],
    },
    {
      phase: "The evidence dispute",
      when: "March 2026",
      articles: [
        {
          outlet: "Boston Globe",
          title:
            "Real estate-backed study warns rent control could tank Massachusetts property values",
          url: SOURCES.tuftsGlobe.url,
          type: "News",
        },
        {
          outlet: "WBUR",
          title:
            "Real estate group warns proposal could lower property taxes for cities and towns",
          url: SOURCES.tuftsWBUR.url,
          type: "News",
        },
      ],
    },
    {
      phase: "Opposition & signature drive",
      when: "November – December 2025",
      articles: [
        {
          outlet: "Boston Globe",
          title:
            "Rent control would 'effectively halt' housing production, Healey says",
          url: SOURCES.healeyGlobe.url,
          type: "News",
        },
        {
          outlet: "CBS News Boston",
          title:
            "Supporters say they have enough signatures for ballot question",
          url: SOURCES.cbsSigs.url,
          type: "News",
        },
      ],
    },
  ],

  polls: [
    {
      pollster: "Suffolk University / The Boston Globe",
      dates: "Nov 19–23, 2025",
      sample: "500 registered voters",
      moe: "±4.4%",
      support: 62.6,
      oppose: 30.6,
      undecided: 6.8,
      ids: ["suffolkGlobe"],
    },
    {
      pollster: "UNH Survey Center",
      dates: "Feb 12–16, 2026",
      sample: "669 residents",
      moe: "±3.8%",
      support: 56,
      oppose: 26,
      undecided: 17,
      ids: ["unhFeb", "wwlpPoll"],
    },
  ] as PollRow[],

  committees: [
    {
      name: "Keep Massachusetts Home",
      stance: "yes",
      total: "$747,702",
      cash: "$57,722",
      inKind: "$689,981",
      spent: "$707,765",
      note: "Support is overwhelmingly in-kind — organizing staff time and services from tenant, labor, and community nonprofits.",
      donors: [
        { name: "Urban Revival Inc.", amount: "$203,341", kind: "in-kind" },
        {
          name: "Right to the City Alliance Inc.",
          amount: "$136,581",
          kind: "in-kind",
        },
        {
          name: "New England Community Project",
          amount: "$54,987",
          kind: "in-kind",
        },
        { name: "Tides Advocacy", amount: "$34,416", kind: "in-kind" },
        { name: "La Colaborativa", amount: "$33,444", kind: "in-kind" },
      ],
    },
    {
      name: "Housing for Massachusetts",
      stance: "no",
      total: "$458,234",
      cash: "$431,600",
      inKind: "$26,634",
      spent: "$26,634",
      note: "Opposition funding is overwhelmingly cash from real-estate industry organizations.",
      donors: [
        { name: "NAIOP Massachusetts", amount: "$226,600", kind: "cash" },
        {
          name: "Greater Boston Real Estate Board",
          amount: "$100,000",
          kind: "cash",
        },
        {
          name: "Massachusetts Association of Realtors",
          amount: "$55,000",
          kind: "cash",
        },
        { name: "Nordblom Management Co.", amount: "$50,000", kind: "cash" },
        { name: "MassLandlords, Inc.", amount: "$26,634", kind: "in-kind" },
      ],
    },
  ] as Committee[],
};

// ─────────────────────────────────────────────────────────────────────────────
// TABS — compose generic sections from RC data
// ─────────────────────────────────────────────────────────────────────────────

function OverviewTab({
  onOpenFinance,
  onViewTestimony,
}: {
  onOpenFinance?: () => void;
  onViewTestimony?: () => void;
}) {
  return (
    <div className="flex flex-col gap-[16px]">
      <SynthSummaryCard
        title="Summary of Initiative"
        ids={["petition", "agSummary", "ballotpedia"]}
        prompt="Summarize Petition No. 25-21 in plain language for a general audience: what the measure does, who it covers, and how the two campaigns frame it. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
      >
        <p>{RC.overviewSummary}</p>
        <p>{RC.overviewFraming}</p>
      </SynthSummaryCard>

      {/* Yes / No comparison — organizers, funding, testifying orgs, official statements */}
      <div className="flex gap-[16px] max-lg:flex-col">
        <VoteCard
          d={RC.overviewVotes.yes}
          onOpenFinance={onOpenFinance}
          onViewTestimony={onViewTestimony}
        />
        <VoteCard
          d={RC.overviewVotes.no}
          onOpenFinance={onOpenFinance}
          onViewTestimony={onViewTestimony}
        />
      </div>

      {/* Scope — per-group impact tiles */}
      <Card
        title="Stakeholder Impact"
        subtitle="How different groups would be affected if the measure passes. Claims marked ⚠ are projected or disputed."
      >
        <StakeholderGrid rows={RC.stakeholders} />
      </Card>

      {/* Original scope card — kept for reference; Stakeholder Impact replaced it.
      <Card title="Who will be affected?">
        <TwoColList
          leftTitle="Covered by the Cap"
          left={RC.covered}
          rightTitle="Exempt from the Cap"
          right={RC.exempt}
          ids={["petition"]}
        />
      </Card>
      */}
    </div>
  );
}

function BackgroundTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <SynthSummaryCard
        title="Context and History"
        ids={["petition", "h5008", "q9", "ballotpedia"]}
        prompt="Summarize how Petition No. 25-21 reached the November 2026 ballot — filing, certification, signature rounds, and legislative review — plus the history of rent control at the Massachusetts ballot. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
      >
        <p>
          Petition No. 25-21 was filed in August 2025 and certified by the
          Attorney General that September. Supporters submitted more than
          124,000 first-round signatures in November, of which 88,132 were
          certified — well above the 74,574 required — sending the measure to
          the Legislature as House Bill 5008. Lawmakers did not act by the May
          2026 deadline, so a second round of signature collection began to
          place the question on the November 2026 ballot.
        </p>
        <p>
          Rent control has been banned statewide since 1994, when voters
          approved Question 9 and repealed the programs in Boston, Cambridge,
          and Brookline. Recent bills to allow local rent control have not
          passed, and in June 2026 both the YES campaign and leading opponents
          signaled openness to a legislative compromise that could still take
          the question off the ballot.
        </p>
      </SynthSummaryCard>

      <SynthSummaryCard
        title="Research & Evidence"
        subtitle="Confirmed studies relevant to the debate. Affiliation is named; MAPLE does not rank research by conclusion."
        ids={["academicResearch", "tuftsGlobe"]}
        prompt="Summarize what the peer-reviewed research finds about rent control's effects on tenants, rental supply, and property values, and note where the widely cited fiscal projection diverges from that literature. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
      >
        <p>
          The peer-reviewed literature is consistent on the trade-off: rent
          control keeps covered tenants in place, but reduces rental supply
          over time. Cambridge's 1994 decontrol raised property values even at
          never-controlled buildings nearby; in San Francisco, covered
          landlords cut rental supply about 15%, raising citywide rents; and
          the end of Massachusetts rent control had small effects on new
          construction, with larger effects on maintenance and conversion. The
          widely cited 6–9% tax-base projection does not come from this
          literature — it traces to a single industry-commissioned analysis
          extrapolating from Cambridge and St. Paul.
        </p>
      </SynthSummaryCard>

      <Card title="Path to the Ballot">
        <Timeline items={[...RC.timeline].reverse()} />
      </Card>

      {/* Same citation-block format as Research & evidence, blue for official. */}

      <Card title="Official Petition Information">
        <div className="space-y-[12px]">
          <div className="border-l-[3px] border-[#3b82f6] pl-[14px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-black leading-[1.5]">
              Petition No. 25-21 — "An Initiative Petition to Protect Tenants by
              Limiting Rent Increases."
            </p>
            <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[2px] leading-[1.5]">
              Filed Aug 7, 2025; cleared by the Attorney General Sep 3, 2025.
            </p>
            <SourceNote ids={["petition", "agSummary"]} />
          </div>
          <div className="border-l-[3px] border-[#3b82f6] pl-[14px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-black leading-[1.5]">
              What it would do
            </p>
            <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[2px] leading-[1.5]">
              Limit annual rent increases on covered units to CPI or 5%,
              whichever is lower, applying whether or not there is a change in
              tenancy. The base is the rent in place on January 31, 2026 (or the
              most recent rent if the unit was then vacant).
            </p>
            <SourceNote ids={["petition"]} />
          </div>
          <div className="border-l-[3px] border-[#3b82f6] pl-[14px]">
            <p className="font-['Nunito'] font-semibold text-[14px] text-black leading-[1.5]">
              Exemptions
            </p>
            <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[2px] leading-[1.5]">
              Owner-occupied buildings under 5 units; units regulated by another
              public authority (except mobile-voucher holders); transient
              rentals under 14 days; facilities operated solely for educational,
              religious, or non-profit purposes; and units first occupied less
              than 10 years ago.
            </p>
            <SourceNote ids={["petition"]} />
          </div>
        </div>
      </Card>

      <Card title="Related Context">
        <Facts items={RC.relatedContext} />
      </Card>

      <Card title="Signature & Process Facts">
        <Facts items={RC.processFacts} />
      </Card>
    </div>
  );
}

// Analysis & open questions — each sub-section in its own purple AI-synthesis
// block: a labeled purple citation line with its own prompt/sources popover.
function AnalysisSection({
  title,
  ids,
  prompt,
  children,
}: {
  title: string;
  ids: string[];
  prompt: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-[3px] border-[#a855f7] pl-[14px]">
      <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[6px]">
        {title}
      </p>
      {children}
      <SynthSourcesNote ids={ids} prompt={prompt} />
    </div>
  );
}

function AnalysisOpenQuestionsCard() {
  const Bullets = ({ items }: { items: string[] }) => (
    <ul className="list-disc list-outside pl-[18px] space-y-[4px] font-['Nunito'] text-[14px] text-black leading-[1.55]">
      {items.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  );
  return (
    <Card title="Analysis & Open Questions">
      <div className="space-y-[16px]">
        <AnalysisSection
          title="Areas of Consensus"
          ids={["academicResearch", "mapleTestimony", "petition"]}
          prompt="Identify the points supporters and opponents of the rent-control ballot question agree on, across testimony, research, and the official text. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
        >
          <Bullets items={RC.consensus} />
        </AnalysisSection>
        <AnalysisSection
          title="Areas of Disagreement"
          ids={["academicResearch", "mapleTestimony"]}
          prompt="Identify the points supporters and opponents of the rent-control ballot question most disagree on. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
        >
          <Bullets items={RC.disagreement} />
        </AnalysisSection>
        <AnalysisSection
          title="Open Questions"
          ids={["academicResearch", "ballotpedia"]}
          prompt="Identify the open questions about the rent-control ballot question that the available evidence can't yet answer. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
        >
          <Bullets items={RC.openQuestions} />
        </AnalysisSection>
      </div>
    </Card>
  );
}

// A research group as a plain header + bulleted list of studies.
function ResearchGroup({
  title,
  studies,
}: {
  title: string;
  studies: Study[];
}) {
  if (!studies.length) return null;
  return (
    <div>
      <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[8px]">
        {title}
      </p>
      <ul className="list-disc list-outside pl-[18px] space-y-[8px]">
        {studies.map((s) => (
          <li
            key={s.citation}
            className="font-['Nunito'] text-[13px] text-[#334156] leading-[1.5]"
          >
            <span className="font-semibold text-black">{s.citation}</span>
            {s.affiliation && s.affiliation !== "peer-reviewed" && (
              <span className="italic text-[#606060]"> — {s.affiliation}</span>
            )}
            {" — "}
            {s.finding}
            {s.url && (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Nunito'] text-[12px] font-bold text-[#12266f] hover:text-[#c71e32] inline-flex items-center gap-[3px] ml-[4px] align-baseline"
              >
                Source <ExternalLink className="w-[11px] h-[11px]" />
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// One argument column in the concept-I "Arguments at a Glance" style —
// colored left bar per argument, purple for AI-synthesized points.
function ArgColumn({ title, args }: { title: string; args: Arg[] }) {
  return (
    <div className="flex-1 space-y-[10px]">
      <p className="font-['Nunito'] font-bold text-[12px] text-[#334156] uppercase tracking-[0.08em] mb-[4px]">
        {title}
      </p>
      {args.length === 0 && (
        <p className="font-['Nunito'] text-[13px] text-[#808080]">
          No arguments from this source type on file.
        </p>
      )}
      {args.map((a) => (
        <div
          key={a.title}
          className="border-l-[3px] border-[#a855f7] pl-[12px] py-[2px]"
        >
          <p className="font-['Nunito'] font-semibold text-[13px] text-black">
            {a.title}
          </p>
          <p className="font-['Nunito'] text-[13px] text-[#606060] leading-[1.5]">
            {a.body}
          </p>
        </div>
      ))}
    </div>
  );
}

// Source-type filter for the arguments glance. Each non-"all" filter swaps in
// a set synthesized only from that source type (RC.argsBySource).
type ArgFilter = "all" | ArgSourceTag;
// "All" rolls up the source categories; the remaining chips narrow to one.
// (Official and academic sets still exist in RC.argsBySource but are not
// offered as filters.)
const ARG_FILTERS: { id: ArgFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "organization", label: "Organizations" },
  { id: "elected", label: "Elected Officials" },
  { id: "citizen", label: "Citizen" },
];

// Which sources back each set — drives the attribution popover. "All" cites
// the official documents, the academic research, and MAPLE testimony;
// organizations / elected officials / citizens are synthesized ONLY from
// testimony submitted to MAPLE — never from outside reporting.
const ARG_FILTER_IDS: Record<ArgFilter, string[]> = {
  all: ["petition", "agSummary", "academicResearch", "mapleTestimony"],
  official: ["petition", "agSummary", "q9"],
  academic: ["tuftsGlobe", "tuftsWBUR", "ballotpedia"],
  organization: ["mapleTestimony"],
  elected: ["mapleTestimony"],
  citizen: ["mapleTestimony"],
};

function ForAgainstTab() {
  const [argFilter, setArgFilter] = useState<ArgFilter>("all");
  const peerReviewed = RC.studies.filter(
    (s) => s.affiliation === "peer-reviewed",
  );
  const commissioned = RC.studies.filter(
    (s) => s.affiliation !== "peer-reviewed",
  );
  return (
    <div className="flex flex-col gap-[16px]">
      {/* Official statements — their own cards */}
      <div className="flex gap-[16px] max-lg:flex-col">
        <div className="flex-1 min-w-0">
          <Card title="Why Vote Yes">
            <OfficialStatementLine
              text={RC.overviewVotes.yes.official.text}
              who={RC.overviewVotes.yes.official.who}
            />
          </Card>
        </div>
        <div className="flex-1 min-w-0">
          <Card title="Why Vote No">
            <OfficialStatementLine
              text={RC.overviewVotes.no.official.text}
              who={RC.overviewVotes.no.official.who}
            />
          </Card>
        </div>
      </div>

      {/* Arguments — concept-I two-column glance format, purple bars; one
          AI-synthesis attribution row below all sections. */}
      <Card
        title="Arguments at a Glance"
        subtitle="Synthesized from supporter and opponent positions."
      >
        <div className="flex items-center gap-[6px] flex-wrap mb-[16px]">
          {ARG_FILTERS.map(({ id, label }) => {
            const active = argFilter === id;
            return (
              <button
                key={id}
                onClick={() => setArgFilter(id)}
                className={`font-['Nunito'] font-semibold text-[12px] px-[10px] py-[4px] rounded-[100px] border cursor-pointer transition-colors ${
                  active
                    ? "bg-[rgba(232,239,255,0.68)] border-[#c9d8ff] text-[#1e3f8a]"
                    : "bg-white border-[#d1d1d1] text-[#606060] hover:border-[#a0a0a0]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="flex gap-[16px] max-lg:flex-col">
          <ArgColumn
            title="YES Arguments"
            args={
              argFilter === "all"
                ? RC.yesArgs
                : RC.argsBySource[argFilter].yes
            }
          />
          <div className="w-[1px] bg-[#e5e7eb] shrink-0 max-lg:hidden" />
          <ArgColumn
            title="NO Arguments"
            args={
              argFilter === "all" ? RC.noArgs : RC.argsBySource[argFilter].no
            }
          />
        </div>
        <div className="mt-[16px]">
          <SynthSourcesNote
            ids={ARG_FILTER_IDS[argFilter]}
            prompt="Synthesize the strongest and most common points for and against the rent-control ballot question from the cited sources, sorting each point by the side it supports — regardless of the speaker's declared position. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
          />
        </div>
      </Card>

      <AnalysisOpenQuestionsCard />

      <Card
        title="Claim Mapping"
        subtitle="Checkable claims pulled from the arguments above, each marked verified or attributed."
      >
        <ClaimMap rows={RC.claims} />
      </Card>

      <Card
        title="Research & Evidence"
        subtitle="Confirmed studies relevant to the debate. Affiliation is named; MAPLE does not rank research by conclusion."
      >
        <div className="space-y-[20px]">
          <div className="border-l-[3px] border-[#a855f7] pl-[14px]">
            <p className="font-['Nunito'] text-[14px] text-black leading-[1.6]">
              The peer-reviewed literature is consistent on the trade-off: rent
              control keeps covered tenants in place, but reduces rental supply
              over time. Cambridge's 1994 decontrol raised property values even
              at never-controlled buildings nearby; in San Francisco, covered
              landlords cut rental supply about 15%, raising citywide rents; and
              the end of Massachusetts rent control had small effects on new
              construction, with larger effects on maintenance and conversion.
              The widely cited 6–9% tax-base projection does not come from this
              literature — it traces to a single industry-commissioned analysis
              extrapolating from Cambridge and St. Paul.
            </p>
            <SynthSourcesNote
              ids={["academicResearch", "tuftsGlobe"]}
              prompt="Summarize what the peer-reviewed research finds about rent control's effects on tenants, rental supply, and property values, and note where the widely cited fiscal projection diverges from that literature. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
            />
          </div>
          <ResearchGroup title="Peer-Reviewed Research" studies={peerReviewed} />
          <ResearchGroup
            title="Industry-Commissioned Research"
            studies={commissioned}
          />
        </div>
      </Card>
    </div>
  );
}

// Circular user avatar — uploaded image when on file, initials otherwise.
function UserAvatar({
  user,
  size = 40,
}: {
  user: PositionUser;
  size?: number;
}) {
  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        style={{ width: size, height: size }}
        className="rounded-full object-cover bg-white border border-[#e5e7eb] shrink-0"
      />
    );
  }
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-[rgba(232,239,255,0.68)] border border-[#c9d8ff] flex items-center justify-center shrink-0"
    >
      <span
        style={{ fontSize: size >= 40 ? 12 : 10 }}
        className="font-['Nunito'] font-bold text-[#1e3f8a] tracking-[0.02em]"
      >
        {user.initials}
      </span>
    </div>
  );
}

// Account-type iconography — small lucide icon, meaning spelled out in the
// tooltip. Uncolored (inherits text color) except the organization bullhorn.
const USER_TYPE_ICON: Record<
  PositionUser["userType"],
  { Icon: typeof Megaphone; color?: string; label: string }
> = {
  organization: { Icon: Megaphone, label: "Organization" },
  legislator: { Icon: Scale, label: "Legislator" },
  government: { Icon: Lectern, label: "Executive office" },
};

function UserTypeIcon({
  type,
  size = 15,
}: {
  type: PositionUser["userType"];
  size?: number;
}) {
  const { Icon, color, label } = USER_TYPE_ICON[type];
  return (
    <span title={label} aria-label={label} className="shrink-0 leading-none">
      <Icon style={{ width: size, height: size, color }} />
    </span>
  );
}

function PositionUserRow({ user }: { user: PositionUser }) {
  return (
    <div className="flex items-center gap-[12px] min-w-0">
      <UserAvatar user={user} />
      <div className="min-w-0">
        <div className="flex items-center gap-[6px] flex-wrap">
          <p className="font-['Nunito'] font-semibold text-[14px] text-black leading-[1.3]">
            {user.name}
          </p>
          <UserTypeIcon type={user.userType} />
        </div>
        <p className="font-['Nunito'] text-[12px] text-[#808080] leading-[1.4]">
          {user.descriptor}
        </p>
      </div>
    </div>
  );
}

function PositionUserGroup({
  heading,
  users,
}: {
  heading: string;
  users: PositionUser[];
}) {
  return (
    <div>
      <p className="font-['Nunito'] font-semibold text-[13px] text-[#606060] uppercase tracking-[0.08em] mb-[10px]">
        {heading} ({users.length})
      </p>
      <div className="grid grid-cols-2 gap-x-[24px] gap-y-[12px] max-lg:grid-cols-1">
        {users.map((u) => (
          <PositionUserRow key={u.id} user={u} />
        ))}
      </div>
    </div>
  );
}

// ── Submitted testimony ───────────────────────────────────────────────────────
// Display per spec: avatar, account name, date, endorse/oppose/no-position, body.
// Each testimony will eventually have its own URL (see rent-control-testimony.ts),
// so an entry must stay renderable standalone — everything it shows comes from
// the testimony record plus its account, never from surrounding page context.

const STANCE_CHIP: Record<
  TestimonyStance,
  { bg: string; bd: string; tx: string; label: string }
> = {
  endorse: {
    bg: "bg-[#dcfce7]",
    bd: "border-[#86efac]",
    tx: "text-[#166534]",
    label: "Endorses",
  },
  oppose: {
    bg: "bg-[#fee2e2]",
    bd: "border-[#fca5a5]",
    tx: "text-[#991b1b]",
    label: "Opposes",
  },
  "no-position": {
    bg: "bg-[#f0f0f0]",
    bd: "border-[#d1d1d1]",
    tx: "text-[#606060]",
    label: "No Position",
  },
};

function StanceChip({ stance }: { stance: TestimonyStance }) {
  const c = STANCE_CHIP[stance];
  return (
    <span
      className={`${c.bg} border ${c.bd} ${c.tx} px-[8px] py-[1px] rounded-[100px] font-['Nunito'] font-bold text-[11px]`}
    >
      {c.label}
    </span>
  );
}

// Body text capped at three lines with "Show more" INLINE at the end of the
// third line — the text is truncated early enough to leave room for it. A
// hidden measurer binary-searches the longest prefix that, with "… Show more"
// appended, still fits three lines at the current width; recomputed on resize.
function ClampedBody({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const [cutoff, setCutoff] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const m = measureRef.current;
    if (!wrap || !m) return;
    const compute = () => {
      m.style.width = `${wrap.clientWidth}px`;
      const maxH = parseFloat(getComputedStyle(m).lineHeight) * 3 + 2;
      m.textContent = text;
      if (m.scrollHeight <= maxH) {
        setCutoff(null);
        return;
      }
      let lo = 0;
      let hi = text.length;
      while (lo < hi) {
        const mid = Math.ceil((lo + hi) / 2);
        m.textContent = text.slice(0, mid).trimEnd() + "… Show more";
        if (m.scrollHeight <= maxH) lo = mid;
        else hi = mid - 1;
      }
      setCutoff(lo);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [text]);

  const collapsed = !expanded && cutoff !== null;
  return (
    <div ref={wrapRef} className="mt-[8px]">
      <p
        ref={measureRef}
        aria-hidden="true"
        className="font-['Nunito'] text-[14px] leading-[1.55] absolute invisible pointer-events-none"
      />
      <p className="font-['Nunito'] text-[14px] text-black leading-[1.55]">
        {collapsed ? `${text.slice(0, cutoff).trimEnd()}… ` : `${text} `}
        {cutoff !== null && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="font-['Nunito'] font-bold text-[13px] text-[#12266f] hover:text-[#c71e32] cursor-pointer"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </p>
    </div>
  );
}

// Testimony belongs to the account, not an individual — no speaker byline, no
// quotation marks; the body reads as the org's own submission.
// showDescriptor: "officials" shows the gray context line only for
// executive-office and legislator accounts (used in mixed feeds).
type DescriptorMode = boolean | "officials";

function TestimonyEntry({
  t,
  showTypeIcon = true,
  showDescriptor = true,
}: {
  t: TestimonyItem;
  showTypeIcon?: boolean;
  showDescriptor?: DescriptorMode;
}) {
  const user = POSITION_USERS.find((u) => u.id === t.userId);
  if (!user) return null;
  const showDesc =
    showDescriptor === true ||
    (showDescriptor === "officials" && user.userType !== "organization");
  return (
    <div className="border-t border-dotted border-[#d1d1d1] pt-[14px] first:border-0 first:pt-0">
      <div className="flex items-start gap-[12px]">
        <UserAvatar user={user} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[6px] flex-wrap">
            <p className="font-['Nunito'] font-semibold text-[14px] text-black leading-[1.3]">
              {user.name}
            </p>
            {showTypeIcon && <UserTypeIcon type={user.userType} />}
            {/* Neutral / no-position testimony carries no stance chip. */}
            {t.stance !== "no-position" && <StanceChip stance={t.stance} />}
            <span className="ml-auto font-['Nunito'] text-[12px] text-[#808080] whitespace-nowrap">
              {t.date}
            </span>
          </div>
          {showDesc && (
            <p className="font-['Nunito'] text-[12px] text-[#808080] leading-[1.4] mt-[1px]">
              {user.descriptor}
            </p>
          )}
          <ClampedBody text={t.body} />
        </div>
      </div>
    </div>
  );
}

function TestimonyList({
  items,
  showTypeIcon = true,
  showDescriptor = true,
}: {
  items: TestimonyItem[];
  showTypeIcon?: boolean;
  showDescriptor?: DescriptorMode;
}) {
  return (
    <div className="space-y-[14px]">
      {items.map((t) => (
        <TestimonyEntry
          key={t.id}
          t={t}
          showTypeIcon={showTypeIcon}
          showDescriptor={showDescriptor}
        />
      ))}
    </div>
  );
}

// Testimony whose submitting account matches the predicate, newest first.
function testimonyFor(match: (u: PositionUser) => boolean): TestimonyItem[] {
  return TESTIMONY.filter((t) => {
    const u = POSITION_USERS.find((x) => x.id === t.userId);
    return u ? match(u) : false;
  }).sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

// Numbered pagination: ‹ 1 2 3 … n › — current page bold black, others link
// blue, chevrons disabled at the ends. Windows long ranges with ellipses.
function pageWindow(current: number, count: number): (number | "…")[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i);
  const around = [current - 1, current, current + 1].filter(
    (p) => p > 0 && p < count - 1,
  );
  const items: (number | "…")[] = [0];
  if (around[0] > 1) items.push("…");
  items.push(...around);
  if (around[around.length - 1] < count - 2) items.push("…");
  items.push(count - 1);
  return items;
}

function Pagination({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-[14px] mt-[18px]">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 0}
        aria-label="Previous page"
        className="text-[#334156] hover:text-[#c71e32] cursor-pointer disabled:text-[#c9c9c9] disabled:cursor-default"
      >
        <ChevronLeft className="w-[16px] h-[16px]" />
      </button>
      {pageWindow(page, pageCount).map((item, i) =>
        item === "…" ? (
          <span
            key={`gap-${i}`}
            className="font-['Nunito'] text-[13px] text-[#808080]"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPage(item)}
            aria-current={item === page ? "page" : undefined}
            className={`font-['Nunito'] text-[13px] cursor-pointer ${
              item === page
                ? "font-bold text-black cursor-default"
                : "text-[#12266f] hover:text-[#c71e32]"
            }`}
          >
            {item + 1}
          </button>
        ),
      )}
      <button
        onClick={() => onPage(page + 1)}
        disabled={page >= pageCount - 1}
        aria-label="Next page"
        className="text-[#334156] hover:text-[#c71e32] cursor-pointer disabled:text-[#c9c9c9] disabled:cursor-default"
      >
        <ChevronRight className="w-[16px] h-[16px]" />
      </button>
    </div>
  );
}

// Filterable, paginated testimony feed. Filter chips and pagination appear
// only once the feed reaches FEED_CONTROLS_MIN testimonies.
const FEED_PAGE_SIZE = 5;
const FEED_CONTROLS_MIN = 5;
type StanceFilter =
  | "all"
  | "following"
  | "endorsing"
  | "opposing"
  | "no-position";

const STANCE_FILTERS: { id: StanceFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "endorsing", label: "Endorsing" },
  { id: "opposing", label: "Opposing" },
  { id: "no-position", label: "Neutral or No Position" },
];

function TestimonyFeed({
  items,
  showTypeIcon = true,
  showDescriptor = true,
  includeFollowingFilter = false,
}: {
  items: TestimonyItem[];
  showTypeIcon?: boolean;
  showDescriptor?: DescriptorMode;
  /** Add a "Following" chip that filters to accounts the viewer follows. */
  includeFollowingFilter?: boolean;
}) {
  const [filter, setFilter] = useState<StanceFilter>("all");
  const [page, setPage] = useState(0);

  const showControls = items.length >= FEED_CONTROLS_MIN;
  const showFilters = showControls;
  const chips = includeFollowingFilter
    ? [
        STANCE_FILTERS[0],
        { id: "following" as StanceFilter, label: "Following" },
        ...STANCE_FILTERS.slice(1),
      ]
    : STANCE_FILTERS;
  const filtered =
    !showFilters || filter === "all"
      ? items
      : items.filter((t) => {
          if (filter === "following") {
            return POSITION_USERS.find((u) => u.id === t.userId)
              ?.followedByViewer;
          }
          if (filter === "endorsing") return t.stance === "endorse";
          if (filter === "opposing") return t.stance === "oppose";
          return t.stance === "no-position";
        });
  const pageCount = Math.max(1, Math.ceil(filtered.length / FEED_PAGE_SIZE));
  const current = Math.min(page, pageCount - 1);
  const shown = showControls
    ? filtered.slice(
        current * FEED_PAGE_SIZE,
        current * FEED_PAGE_SIZE + FEED_PAGE_SIZE,
      )
    : filtered;

  return (
    <div>
      {showFilters && (
        <div className="flex items-center gap-[6px] flex-wrap mb-[16px]">
          {chips.map(({ id, label }) => {
            const active = filter === id;
            return (
              <button
                key={id}
                onClick={() => {
                  setFilter(id);
                  setPage(0);
                }}
                className={`font-['Nunito'] font-semibold text-[12px] px-[10px] py-[4px] rounded-[100px] border cursor-pointer transition-colors ${
                  active
                    ? "bg-[rgba(232,239,255,0.68)] border-[#c9d8ff] text-[#1e3f8a]"
                    : "bg-white border-[#d1d1d1] text-[#606060] hover:border-[#a0a0a0]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {shown.length > 0 ? (
        <TestimonyList
          items={shown}
          showTypeIcon={showTypeIcon}
          showDescriptor={showDescriptor}
        />
      ) : (
        <p className="font-['Nunito'] text-[13px] text-[#808080]">
          No testimony matches this filter.
        </p>
      )}

      {showControls && pageCount > 1 && (
        <Pagination page={current} pageCount={pageCount} onPage={setPage} />
      )}
    </div>
  );
}

// Testimony from accounts the prototype's viewer follows — an infinite
// carousel showing one entry at a time, starting at a random one, with
// chevrons on either side. Every entry is also rendered as an invisible sizer
// stacked in the same grid cell, so the container holds the height of the
// tallest (collapsed) testimony and cycling never causes layout jumps. The
// visible entry is keyed by index so it remounts collapsed on each step.
function FollowedTestimonyCard() {
  const items = useMemo(
    () => testimonyFor((u) => Boolean(u.followedByViewer)),
    [],
  );
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * Math.max(1, items.length)),
  );
  if (items.length === 0) return null;
  const current = index % items.length;
  const step = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + items.length) % items.length);
  return (
    <Card
      title="Featured Testimony"
      subtitle="Testimony of the organizations, officials, and individuals that you follow on MAPLE."
    >
      <div className="flex items-center gap-[10px]">
        <button
          onClick={() => step(-1)}
          aria-label="Previous testimony"
          className="text-[#334156] hover:text-[#c71e32] cursor-pointer shrink-0"
        >
          <ChevronLeft className="w-[18px] h-[18px]" />
        </button>

        <div className="flex-1 min-w-0 grid">
          {/* Invisible sizers — reserve the height of the tallest entry. */}
          {items.map((t) => (
            <div
              key={t.id}
              aria-hidden="true"
              className="col-start-1 row-start-1 invisible pointer-events-none"
            >
              <TestimonyEntry t={t} showDescriptor="officials" />
            </div>
          ))}
          {/* Active entry — keyed so it remounts collapsed when cycling. */}
          <div key={items[current].id} className="col-start-1 row-start-1">
            <TestimonyEntry t={items[current]} showDescriptor="officials" />
          </div>
        </div>

        <button
          onClick={() => step(1)}
          aria-label="Next testimony"
          className="text-[#334156] hover:text-[#c71e32] cursor-pointer shrink-0"
        >
          <ChevronRight className="w-[18px] h-[18px]" />
        </button>
      </div>
      {items.length > 1 && (
        <p className="font-['Nunito'] text-[12px] text-[#808080] text-center mt-[10px]">
          {current + 1} of {items.length}
        </p>
      )}
    </Card>
  );
}

function OrganizationTestimonyCard() {
  return (
    <Card
      title="Organization Testimony"
      subtitle="Submitted by verified organization accounts. Each account chose endorse, oppose, or no position before writing; testimony appears in the account's own words and is never edited."
    >
      <TestimonyFeed
        items={testimonyFor((u) => u.userType === "organization")}
        showDescriptor={false}
        includeFollowingFilter
      />
    </Card>
  );
}

function PublicPerspectivesTab() {
  const supporting = POSITION_USERS.filter((u) => u.stance === "supports");
  const opposing = POSITION_USERS.filter((u) => u.stance === "opposes");
  return (
    <div className="flex flex-col gap-[16px]">
      {/* On the record — parked for now; testimony cards carry the tab.
      <Card
        title="On the Record"
        subtitle="Organizations and officials with MAPLE accounts that have taken a public position on this question."
      >
        <div className="flex items-center gap-[16px] flex-wrap mb-[16px]">
          {(Object.keys(USER_TYPE_ICON) as PositionUser["userType"][]).map(
            (type) => (
              <div key={type} className="flex items-center gap-[5px]">
                <UserTypeIcon type={type} size={13} />
                <span className="font-['Nunito'] text-[12px] text-[#606060]">
                  {USER_TYPE_ICON[type].label}
                </span>
              </div>
            ),
          )}
        </div>
        <div className="space-y-[20px]">
          <PositionUserGroup
            heading="Support the initiative"
            users={supporting}
          />
          <PositionUserGroup heading="Oppose the initiative" users={opposing} />
        </div>
        <SourceNote ids={["ballotpedia"]} text="Positions as reported by" />
      </Card>
      */}

      <FollowedTestimonyCard />

      <OrganizationTestimonyCard />

      <Card
        title="Elected Official Testimony"
        subtitle="Submitted by state executive office and municipal accounts, under the same endorse / oppose / no position flow as every other account."
      >
        <TestimonyList
          items={testimonyFor((u) => u.userType === "government")}
        />
      </Card>

      <Card
        title="Legislator Response/Testimony"
        subtitle="Under construction: This will be the place that legislators may be able to weigh in oppose/endorse or respond under a neutral stance? What rules should govern this space?"
      >
        <TestimonyList
          items={testimonyFor((u) => u.userType === "legislator")}
        />
        {testimonyFor((u) => u.userType === "legislator").length === 0 && (
          <EmptyState
            title="No legislator responses yet"
            body="Legislator accounts exist on MAPLE, but the rules for how they participate here are still being designed."
          />
        )}
      </Card>

      <Card
        title="Individual Testimony"
        subtitle="Submitted by verified Massachusetts residents, shown in their own words and never edited."
      >
        <EmptyState
          title="No individual testimony on this question yet"
          body="No resident submissions are on file for this question yet — be among the first to add your perspective. Public statements reported elsewhere are kept under For & Against and Media Coverage, where they can be traced to their source."
        />
      </Card>
    </div>
  );
}

function MediaCoverageTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <SynthSummaryCard
        title="AI Synthesis of Coverage"
        ids={["tuftsGlobe", "cwbCompromise", "cbsSigs", "healeyGlobe"]}
        prompt="Summarize Massachusetts media coverage of the rent-control ballot question: the major phases, dominant narratives, and any figures that are contested across outlets. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
      >
        <p>
          Coverage has moved through several phases: the signature drive and
          early polling, Gov. Healey's opposition, the dispute over the
          GBREB-commissioned Tufts fiscal study, and the June compromise talks.
          The 6–9% tax-base figure recurs across coverage and traces to a
          single industry-commissioned report.
        </p>
      </SynthSummaryCard>

      <Card
        title="Coverage Timeline"
        subtitle="Reported news, grouped by phase. Outlet always named; links go to the original article."
      >
        <div className="space-y-[14px]">
          {RC.mediaPhases.map((p) => (
            <MediaPhase
              key={p.phase}
              phase={p.phase}
              when={p.when}
              articles={p.articles}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}

function CampaignFinanceTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <SynthSummaryCard
        title="Funding Pattern"
        ids={["ocpfSHNS", "ballotpedia"]}
        prompt="Summarize the OCPF campaign-finance filings for the committees supporting and opposing the rent-control question: totals raised, cash versus in-kind contributions, and notable donors. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
      >
        <p>
          The two sides raised money in very different forms. The YES
          committee's total is dominated by in-kind contributions — staff time
          and services from tenant, labor, and community organizations — while
          the NO committee's total is almost entirely cash from real-estate
          industry groups (NAIOP, the Greater Boston Real Estate Board, the
          Massachusetts Association of Realtors). Dollar amounts and each
          donor's location are drawn from itemized OCPF filings; MAPLE does not
          estimate figures.
        </p>
      </SynthSummaryCard>

      <Card
        title="Who is funding each side"
        subtitle="From Massachusetts OCPF filings covering through January 20, 2026 — an early snapshot; the next scheduled reports were due September 2026."
      >
        <FinanceLedger
          committees={RC.committees}
          ids={["ocpfSHNS", "ballotpedia"]}
        />
      </Card>
    </div>
  );
}

// Bibliography — citation-block format matching the academic-articles section
// of For & Against, split into Academic / Media / Other cards.
function RefList({ items }: { items: Source[] }) {
  return (
    <div className="space-y-[12px]">
      {items.map((s) => (
        <div
          key={s.url + s.label}
          className="border-l-[3px] pl-[14px]"
          style={{ borderLeftColor: KIND_DOT[s.kind] }}
        >
          {s.url ? (
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Nunito'] font-semibold text-[14px] text-[#12266f] hover:text-[#c71e32] inline-flex items-baseline gap-[5px] leading-[1.5]"
            >
              {s.label}
              <ExternalLink className="w-[12px] h-[12px] shrink-0 self-center" />
            </a>
          ) : (
            <p className="font-['Nunito'] font-semibold text-[14px] text-black leading-[1.5]">
              {s.label}
            </p>
          )}
          {s.date && (
            <p className="font-['Nunito'] text-[12px] text-[#808080] mt-[2px]">
              {s.date}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function ReferencesTab() {
  const entries = Object.entries(SOURCES);
  // Ballotpedia lives under Other; everything else outside-kind is media.
  const media = entries
    .filter(([id, s]) => s.kind === "outside" && id !== "ballotpedia")
    .map(([, s]) => s);
  const other = entries
    .filter(([id, s]) => s.kind !== "outside" || id === "ballotpedia")
    .map(([, s]) => s);
  return (
    <div className="flex flex-col gap-[16px]">
      <Card
        title="Academic"
        subtitle="Every source cited on this page, grouped by type. MAPLE publishes its sources so any claim can be checked at its origin."
      >
        <ResearchList studies={RC.studies} />
      </Card>

      <Card title="Media">
        <RefList items={media} />
      </Card>

      <Card title="Other">
        <RefList items={other} />
        <p className="font-['Nunito'] text-[12px] text-[#808080] mt-[18px] leading-[1.5]">
          Inline citations throughout the page link to the matching entry here.
        </p>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHELL (mirrors prototypes H / I)
// ─────────────────────────────────────────────────────────────────────────────

export default function RentControlAlt() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
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
    const el = columnRef.current;
    if (!el) return;
    // Measure from the non-sticky column: a stuck sticky element reports its
    // pinned position, not its document-flow position.
    const target = el.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY > target) window.scrollTo({ top: target });
  };

  return (
    <div className="bg-[#ededed] min-h-screen min-w-[950px]">
      {/* Chrome matches BQ1 (content-schemata-rent-control): top nav + breadcrumb. */}
      <MapleTopNav />
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
        {/* Hero — pins at the viewport top once the heading scrolls away. The
            wrapper's background + bottom padding mask content scrolling under
            the card's rounded corners. */}
        <div ref={heroRef} className="sticky top-0 z-10 bg-[#ededed] pb-[16px]">
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
        </div>

        {/* Sidebar + content — sidebar pins below the hero, content scrolls with the page */}
        <div className="flex gap-[24px] items-start">
          {/* Sidebar */}
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

          {/* Tab content — normal document flow; the page itself scrolls */}
          <div className="flex-1 pr-[8px]">
            <div className="flex flex-col gap-[16px] pb-[24px]">
              {activeTab === "overview" && (
                <OverviewTab
                  onOpenFinance={() => handleTabChange("finance")}
                  onViewTestimony={() => handleTabChange("perspectives")}
                />
              )}
              {activeTab === "background" && <BackgroundTab />}
              {activeTab === "for-against" && <ForAgainstTab />}
              {activeTab === "perspectives" && <PublicPerspectivesTab />}
              {activeTab === "media" && <MediaCoverageTab />}
              {activeTab === "finance" && <CampaignFinanceTab />}
              {activeTab === "references" && <ReferencesTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
