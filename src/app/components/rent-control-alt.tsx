import { useState, useRef, useEffect } from "react";
import {
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { MapleTopNav, BreadcrumbBack, PageHeading } from "./maple-shared";
import {
  POSITION_USERS,
  type PositionUser,
} from "../data/rent-control-users";

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
}
const SOURCES: Record<string, Source> = {
  petition: {
    label: "Petition No. 25-21 (full text), Mass.gov",
    kind: "official",
    url: "https://www.mass.gov/doc/25-21-an-initiative-petition-to-protect-tenants-by-limiting-rent-increases/download",
  },
  agSummary: {
    label: "AG Summary of No. 25-21, Mass.gov",
    kind: "official",
    url: "https://www.mass.gov/doc/final-summary-for-25-21-an-initiative-petition-to-protect-tenants-by-limiting-rent-increases/download",
  },
  h5008: {
    label: "House Bill 5008, MA Legislature",
    kind: "official",
    url: "https://malegislature.gov/Bills/194/H5008.pdf",
  },
  ballotpedia: {
    label: "Massachusetts Rent Control Initiative (2026), Ballotpedia",
    kind: "outside",
    url: "https://ballotpedia.org/Massachusetts_Rent_Control_Initiative_(2026)",
  },
  tuftsGlobe: {
    label:
      "Boston Globe — Real estate-backed study warns rent control could tank property values",
    kind: "outside",
    url: "https://www.bostonglobe.com/2026/03/12/business/rent-control-property-values-massachusetts/",
    date: "Mar 12, 2026",
  },
  tuftsWBUR: {
    label: "WBUR — Real estate group warns proposal could lower property taxes",
    kind: "outside",
    url: "https://www.wbur.org/news/2026/03/12/rent-control-ballot-initiative-affordability-housing",
    date: "Mar 12, 2026",
  },
  healeyGlobe: {
    label:
      "Boston Globe — Rent control would 'effectively halt' housing production, Healey says",
    kind: "outside",
    url: "https://www.bostonglobe.com/2025/12/23/metro/maura-healey-rent-control-ballot-question-oppose/",
    date: "Dec 23, 2025",
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
  },
  cwbCompromise: {
    label:
      "CommonWealth Beacon — Rent control backers seek legislative road away from ballot",
    kind: "outside",
    url: "https://commonwealthbeacon.org/housing/rent-control-backers-scrambling-to-find-legislative-road-away-from-the-ballot/",
    date: "Jun 2, 2026",
  },
  ocpfSHNS: {
    label:
      "State House News — Supportive groups helped finance signature gathering (OCPF)",
    kind: "outside",
    url: "https://www.statehousenews.com/news/politics/campaignfinance/supportive-groups-helped-finance-rent-control-signature-gathering/article_1cf44c97-5266-446e-9d15-d50d12d629b1.html",
    date: "2026",
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
  q9: {
    label: "Massachusetts 1994 Election Results (Question 9)",
    kind: "official",
    url: "https://ballotpedia.org/Massachusetts_Rent_Control_Initiative_(2026)",
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
  title?: string;
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

// Vote-side comparison card (Voting Yes / Voting No) — generic: summary,
// organizer, funding, supporting/opposing list, and a featured testimony quote.
interface VoteSide {
  vote: "yes" | "no";
  summary: string;
  organizer: string;
  organizerUrl?: string;
  funding: string;
  fundingUrl?: string;
  sideLabel: string;
  side: string[];
  testimony?: { text: string; who: string; ids: string[] };
  ids?: string[];
}
function VoteCard({ d }: { d: VoteSide }) {
  const isYes = d.vote === "yes";
  return (
    <div className="bg-white rounded-[8px] p-[24px] flex-1 flex flex-col">
      <div className="flex items-center gap-[10px] mb-[10px]">
        <span
          className={`w-[32px] h-[32px] rounded-full flex items-center justify-center ${
            isYes ? "bg-[#e3f1e8]" : "bg-[#fbe7e9]"
          }`}
        >
          {isYes ? (
            <Check className="w-[18px] h-[18px] text-[#1e5b38]" />
          ) : (
            <X className="w-[18px] h-[18px] text-[#92121f]" />
          )}
        </span>
        <p className="font-['Nunito'] font-semibold text-[22px] text-black">
          Voting {isYes ? "Yes" : "No"}
        </p>
      </div>

      <p className="font-['Nunito'] text-[15px] text-[#334156] leading-[1.5] mb-[16px]">
        {d.summary}
        {d.ids && <Cite ids={d.ids} />}
      </p>

      <div className="grid grid-cols-2 gap-[8px] mb-[16px]">
        <div>
          <p className="font-['Nunito'] font-bold text-[13px] text-[#606060] uppercase tracking-[0.06em] mb-[4px]">
            Campaign Organizer
          </p>
          {d.organizerUrl ? (
            <a
              href={d.organizerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Nunito'] font-semibold text-[15px] text-[#12266f] hover:text-[#c71e32]"
            >
              {d.organizer}
            </a>
          ) : (
            <p className="font-['Nunito'] font-semibold text-[15px] text-[#606060]">
              {d.organizer}
            </p>
          )}
        </div>
        <div>
          <p className="font-['Nunito'] font-bold text-[13px] text-[#606060] uppercase tracking-[0.06em] mb-[4px]">
            Funding Raised
          </p>
          <a
            href={d.fundingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Nunito'] font-bold text-[22px] text-[#12266f] hover:text-[#c71e32] inline-flex items-center gap-[4px]"
          >
            {d.funding}
            <ExternalLink className="w-[14px] h-[14px]" />
          </a>
        </div>
      </div>

      <p className="font-['Nunito'] font-bold text-[13px] text-[#606060] uppercase tracking-[0.06em] mb-[6px]">
        {d.sideLabel}
      </p>
      <div className="flex flex-wrap gap-[6px] mb-[16px]">
        {d.side.map((s) => (
          <span
            key={s}
            className="bg-[#f0f0f0] border border-[#d1d1d1] rounded-[100px] px-[10px] py-[3px] font-['Nunito'] font-semibold text-[12px] text-[#334156]"
          >
            {s}
          </span>
        ))}
      </div>

      {d.testimony && (
        <div className="mt-auto bg-[#f4f3f0] rounded-[6px] p-[16px]">
          <p className="font-['Nunito'] font-bold text-[13px] text-[#606060] uppercase tracking-[0.06em] mb-[6px]">
            Testimony
          </p>
          <p className="font-['Nunito'] italic text-[14px] text-black leading-[1.55]">
            “{d.testimony.text}”
          </p>
          <p className="font-['Nunito'] font-bold text-[13px] text-black mt-[6px]">
            — {d.testimony.who}
            <Cite ids={d.testimony.ids} />
          </p>
        </div>
      )}
    </div>
  );
}

// Argument cards (one column) — synthesized point + attributed quote.
interface Arg {
  title: string;
  body: string;
  quote?: { text: string; who: string; ids: string[] };
}
function ArgList({ args }: { args: Arg[] }) {
  return (
    <div className="space-y-[12px]">
      {args.map((a) => (
        <div
          key={a.title}
          className="border border-[#e5e7eb] rounded-[8px] p-[16px]"
        >
          <p className="font-['Nunito'] font-semibold text-[15px] text-black mb-[6px]">
            {a.title}
          </p>
          <p className="font-['Nunito'] text-[14px] text-[#334156] leading-[1.55]">
            {a.body}
          </p>
          {a.quote && (
            <blockquote className="mt-[10px] border-l-[3px] border-[#c9d8ff] pl-[12px]">
              <p className="font-['Nunito'] italic text-[14px] text-black leading-[1.55]">
                “{a.quote.text}”
              </p>
              <p className="font-['Nunito'] text-[12px] text-[#606060] mt-[3px]">
                — {a.quote.who}
                <Cite ids={a.quote.ids} />
              </p>
            </blockquote>
          )}
        </div>
      ))}
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

// Claim mapping — generic ✓ verified / ⚠ attributed marker per claim.
interface ClaimRow {
  claim: string;
  mark: "verified" | "attributed";
  note: string;
  ids?: string[];
}
function ClaimMap({ rows }: { rows: ClaimRow[] }) {
  return (
    <div className="space-y-[10px]">
      {rows.map((r) => (
        <div
          key={r.claim}
          className="border-t border-dotted border-[#d1d1d1] pt-[10px]"
        >
          <div className="flex items-start gap-[8px]">
            {r.mark === "verified" ? (
              <ShieldCheck className="w-[16px] h-[16px] text-[#166534] shrink-0 mt-[2px]" />
            ) : (
              <AlertTriangle className="w-[16px] h-[16px] text-[#8a6d1d] shrink-0 mt-[2px]" />
            )}
            <div>
              <p className="font-['Nunito'] font-semibold text-[14px] text-black">
                {r.claim}
              </p>
              <p className="font-['Nunito'] text-[13px] text-[#606060] mt-[2px] leading-[1.5]">
                <span
                  className={`font-bold ${r.mark === "verified" ? "text-[#166534]" : "text-[#8a6d1d]"}`}
                >
                  {r.mark === "verified" ? "Verified. " : "Attributed. "}
                </span>
                {r.note}
                {r.ids && <Cite ids={r.ids} />}
              </p>
            </div>
          </div>
        </div>
      ))}
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
    "This initiative would cap annual rent increases on most residential units at the lower of inflation (CPI) or 5% — and the cap would apply even between tenancies (at turnover), measured from the rent in place on January 31, 2026. It would end the statewide ban on rent control that Massachusetts voters approved in 1994. After clearing the signature and certification stages, it advanced to the Legislature; because lawmakers did not enact it, a second round of signatures sends it toward the November 2026 statewide ballot.",

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

  overviewFraming:
    "Supporters argue a predictable, inflation-linked cap protects tenants from displacement and is aimed at large corporate owners, while small owner-occupied buildings and new construction are exempt. Opponents argue a statewide cap that binds even at turnover would deter housing production and shift costs onto homeowners and municipal budgets. Both sides have mounted organized, well-funded campaigns.",

  overviewVotes: {
    yes: {
      vote: "yes",
      summary:
        "Establishes the statewide cap — annual rent increases limited to CPI or 5%, whichever is lower, including between tenancies.",
      organizer: "Keep Massachusetts Home",
      organizerUrl: SOURCES.keepMAHome.url,
      funding: "$748K",
      fundingUrl: SOURCES.ocpfSHNS.url,
      sideLabel: "Supporting",
      side: [
        "Homes for All Massachusetts",
        "New England Community Project",
        "La Colaborativa",
      ],
      testimony: {
        text: "Working class and middle class people who do the jobs that keep our state going should be able to afford a roof over our heads… We need rent stabilization to keep rent costs reasonable and predictable.",
        who: "Rose Webster-Smith, Director, Springfield No One Leaves",
        ids: ["ballotpedia"],
      },
    },
    no: {
      vote: "no",
      summary:
        "Makes no change in the law; the statewide ban on rent control in place since 1994 remains.",
      organizer: "Housing for Massachusetts",
      organizerUrl: SOURCES.housingForMA.url,
      funding: "$458K",
      fundingUrl: SOURCES.ocpfSHNS.url,
      sideLabel: "Opposing",
      side: [
        "NAIOP Massachusetts",
        "Greater Boston Real Estate Board",
        "MA Association of Realtors",
      ],
      testimony: {
        text: "Investors in housing have already pulled out of Massachusetts because they're concerned about rent control. I don't want to see housing production stopped.",
        who: "Gov. Maura Healey",
        ids: ["healeyGlobe"],
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

  yesArgs: [
    {
      title: "Stability for working families",
      body: "Supporters cast the measure as a response to a displacement crisis, arguing predictable rents let renters save and stay.",
      quote: {
        text: "Working class and middle class people who do the jobs that keep our state going should be able to afford a roof over our heads… We need rent stabilization to keep rent costs reasonable and predictable.",
        who: "Rose Webster-Smith, Director, Springfield No One Leaves",
        ids: ["ballotpedia"],
      },
    },
    {
      title: "Stabilization is not development policy",
      body: "Advocates reject the framing that rent stabilization reduces housing production, calling them separate problems.",
      quote: {
        text: "This isn't a development policy. This is a stabilization policy. Judging a stabilization policy based off of whether or not it's going to spur development doesn't make a whole lot of sense.",
        who: "Mark Martinez, Staff Attorney, Massachusetts Law Reform Institute",
        ids: ["ballotpedia"],
      },
    },
    {
      title: "Wage gains eaten by rent",
      body: "Labor supporters tie the measure to the cost-of-living squeeze on lower-wage workers.",
      quote: {
        text: "Whatever wages the union is able to win at the bargaining table, those raises are almost always eaten up by huge rent increases.",
        who: "David Foley, President, SEIU Local 509",
        ids: ["ballotpedia"],
      },
    },
  ] as Arg[],
  noArgs: [
    {
      title: "Investment and production chilling",
      body: "The lead opponent and state officials argue a statewide cap deters investment and slows housing production.",
      quote: {
        text: "Investors in housing have already pulled out of Massachusetts because they're concerned about rent control. I don't want to see housing production stopped.",
        who: "Gov. Maura Healey",
        ids: ["healeyGlobe"],
      },
    },
    {
      title: "Fiscal impact on property taxes",
      body: "The opposition points to a Tufts Center for State Policy Analysis study it commissioned projecting a shrinking residential tax base.",
      quote: {
        text: "A recent study from the Center for State Policy Analysis at Tufts University found that rent control would almost immediately shrink the residential property tax base by 6–9% across Massachusetts municipalities.",
        who: "Housing for Massachusetts",
        ids: ["tuftsGlobe", "tuftsWBUR"],
      },
    },
    {
      title: "Small-landlord squeeze",
      body: "Small-owner advocates argue a CPI-linked cap can't keep pace with rising operating costs.",
      quote: {
        text: "When you have a policy where rents would be capped at 5% or CPI, whichever is lower — and CPI is typically somewhere in the 2–2.5% range — that's not enough for us to keep up with expenses.",
        who: "Amir Shahsavari, President, Small Property Owners Association",
        ids: ["ballotpedia"],
      },
    },
  ] as Arg[],

  consensus: [
    "Massachusetts has a severe housing affordability problem driving displacement pressure on tenants.",
    "The state needs substantially more housing production regardless of this measure.",
    "Owner-occupied buildings under 5 units and new construction (first 10 years) are exempt — that scope is not in dispute.",
  ],
  disagreement: [
    "Whether a cap that binds at turnover deters construction and maintenance.",
    "The severity and probability of fiscal impacts on the residential tax base.",
    "Whether a statewide mandate or a local option is the right scale for rent policy.",
  ],
  openQuestions: [
    "No U.S. state runs a statewide cap that binds at turnover, so direct evidence on this exact design does not exist.",
    "How a CPI-linked cap would interact with insurance and utility costs that have risen faster than inflation.",
    "What the June 2026 legislative compromise contained, since the court ended the effort before it was resolved.",
  ],

  claims: [
    {
      claim:
        "88,132 valid signatures were certified against a 74,574 requirement.",
      mark: "verified",
      note: "Certified by the Massachusetts Elections Division and reported by Ballotpedia.",
      ids: ["ballotpedia"],
    },
    {
      claim:
        "The cap would apply even between tenancies, with no reset to market rate at vacancy.",
      mark: "verified",
      note: "Stated in the petition text and the AG summary.",
      ids: ["petition", "agSummary"],
    },
    {
      claim:
        '"The most restrictive rent control program in the entire United States."',
      mark: "attributed",
      note: "A characterization by the CEOs of GBREB, the MA Association of Realtors, and NAIOP MA — no independent comparative source is cited.",
      ids: ["ballotpedia"],
    },
    {
      claim: "Rent control would shrink the residential tax base 6–9%.",
      mark: "attributed",
      note: "A projection from a Tufts CSPA study commissioned by the Greater Boston Real Estate Board (opposes the measure); disputed by supporters and without independent replication.",
      ids: ["tuftsGlobe"],
    },
    {
      claim: '"Investors have already pulled out of Massachusetts."',
      mark: "attributed",
      note: "Stated by Gov. Healey; no data source cited and the measure had not become law.",
      ids: ["healeyGlobe"],
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

function OverviewTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* Plain-language intro — the fast path for casual & last-minute voters */}
      <Card>
        <div className="space-y-[12px] font-['Nunito'] text-[14px] text-black leading-[1.6]">
          <p>{RC.overviewSummary}</p>
          <p>{RC.overviewFraming}</p>
        </div>
        <SourceNote ids={["petition", "agSummary", "ballotpedia"]} />
      </Card>

      {/* Yes / No comparison — organizer, funding, coalition, featured testimony */}
      <div className="flex gap-[16px] max-lg:flex-col">
        <VoteCard d={RC.overviewVotes.yes} />
        <VoteCard d={RC.overviewVotes.no} />
      </div>

      {/* Scope */}
      <Card title="Who is — and isn't — covered">
        <TwoColList
          leftTitle="Covered by the cap"
          left={RC.covered}
          rightTitle="Exempt from the cap"
          right={RC.exempt}
          ids={["petition"]}
        />
      </Card>

      {/* Quick read on public opinion */}
      <Card
        title="Where the polls stand"
        subtitle="Public polling has consistently found majority support for the measure."
      >
        <Polls rows={RC.polls} />
      </Card>
    </div>
  );
}

function BackgroundTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <Card title="Official petition information">
        <div className="space-y-[8px]">
          <ContentItem type="official">
            <span className="font-semibold">Petition No. 25-21</span> — "An
            Initiative Petition to Protect Tenants by Limiting Rent Increases."
            Filed Aug 7, 2025; cleared by the Attorney General Sep 3, 2025.
            <SourceNote ids={["petition", "agSummary"]} />
          </ContentItem>
          <ContentItem type="official">
            <span className="font-semibold">What it would do:</span> limit
            annual rent increases on covered units to CPI or 5%, whichever is
            lower, applying whether or not there is a change in tenancy. The
            base is the rent in place on January 31, 2026 (or the most recent
            rent if the unit was then vacant).
            <SourceNote ids={["petition"]} />
          </ContentItem>
          <ContentItem type="official">
            <span className="font-semibold">Exemptions:</span> owner-occupied
            buildings under 5 units; units regulated by another public authority
            (except mobile-voucher holders); transient rentals under 14 days;
            facilities operated solely for educational, religious, or non-profit
            purposes; and units first occupied less than 10 years ago.
            <SourceNote ids={["petition"]} />
          </ContentItem>
        </div>
      </Card>

      <Card title="Path to the ballot">
        <Timeline items={RC.timeline} />
      </Card>

      <Card title="Signature & process facts">
        <Facts items={RC.processFacts} />
      </Card>

      <Card title="Related context">
        <Facts items={RC.relatedContext} />
      </Card>
    </div>
  );
}

function ForAgainstTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex gap-[16px] max-lg:flex-col">
        <Card title="YES arguments">
          <ArgList args={RC.yesArgs} />
        </Card>
        <Card title="NO arguments">
          <ArgList args={RC.noArgs} />
        </Card>
      </div>

      <Card title="Analysis & open questions">
        <div className="space-y-[16px]">
          <AISynth title="Areas of consensus">
            <ul className="list-disc list-inside space-y-[4px]">
              {RC.consensus.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </AISynth>
          <AISynth title="Areas of disagreement">
            <ul className="list-disc list-inside space-y-[4px]">
              {RC.disagreement.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </AISynth>
          <AISynth title="Open questions">
            <ul className="list-disc list-inside space-y-[4px]">
              {RC.openQuestions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </AISynth>
        </div>
      </Card>

      <Card
        title="Claim mapping"
        subtitle="Contested claims from both campaigns, each marked by whether it is independently verified or only attributed to its source."
      >
        <ClaimMap rows={RC.claims} />
      </Card>

      <Card
        title="Research & evidence"
        subtitle="Confirmed studies relevant to the debate. Affiliation is named; MAPLE does not rank research by conclusion."
      >
        <ResearchList studies={RC.studies} />
      </Card>
    </div>
  );
}

// Circular user avatar — uploaded image when on file, initials otherwise.
function UserAvatar({ user }: { user: PositionUser }) {
  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt=""
        className="w-[40px] h-[40px] rounded-full object-cover bg-white border border-[#e5e7eb] shrink-0"
      />
    );
  }
  return (
    <div className="w-[40px] h-[40px] rounded-full bg-[rgba(232,239,255,0.68)] border border-[#c9d8ff] flex items-center justify-center shrink-0">
      <span className="font-['Nunito'] font-bold text-[12px] text-[#1e3f8a] tracking-[0.02em]">
        {user.initials}
      </span>
    </div>
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
          <span className="bg-[#f0f0f0] border border-[#d1d1d1] px-[6px] py-[1px] rounded-[100px] font-['Nunito'] font-bold text-[10px] text-[#606060]">
            {user.userType === "legislator" ? "Legislator" : "Organization"}
          </span>
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

function PublicPerspectivesTab() {
  const supporting = POSITION_USERS.filter((u) => u.stance === "supports");
  const opposing = POSITION_USERS.filter((u) => u.stance === "opposes");
  return (
    <div className="flex flex-col gap-[16px]">
      <Card
        title="On the record"
        subtitle="Organizations and officials with MAPLE accounts that have taken a public position on this question."
      >
        <div className="space-y-[20px]">
          <PositionUserGroup
            heading="Support the initiative"
            users={supporting}
          />
          <PositionUserGroup heading="Oppose the initiative" users={opposing} />
        </div>
        <SourceNote ids={["ballotpedia"]} text="Positions as reported by" />
      </Card>

      <Card
        title="Perspectives submitted to MAPLE"
        subtitle="Testimony submitted directly by verified Massachusetts residents and organizations, shown in their own words and never edited."
      >
        <EmptyState
          title="No verified testimony on this question yet"
          body="No resident or organization submissions are on file for this question yet — be among the first to add your perspective. Public statements reported elsewhere are kept under For & Against and Media Coverage, where they can be traced to their source."
        />
      </Card>
    </div>
  );
}

function MediaCoverageTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <Card>
        <AISynth
          title="AI synthesis of coverage"
          ids={["tuftsGlobe", "cwbCompromise", "cbsSigs", "healeyGlobe"]}
        >
          <p>
            Coverage has moved through several phases: the signature drive and
            early polling, Gov. Healey's opposition, the dispute over the
            GBREB-commissioned Tufts fiscal study, and the June compromise
            talks. The 6–9% tax-base figure recurs across coverage and traces to
            a single industry-commissioned report.
          </p>
        </AISynth>
      </Card>

      <Card
        title="Coverage timeline"
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

      <Card
        title="Polling"
        subtitle="Every poll with its methodology. Wording moves results, so a topline never appears without its field dates, sample, and margin of error."
      >
        <Polls rows={RC.polls} />
      </Card>
    </div>
  );
}

function CampaignFinanceTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <Card
        title="Who is funding each side"
        subtitle="From Massachusetts OCPF filings covering through January 20, 2026 — an early snapshot; the next scheduled reports were due September 2026."
      >
        <FinanceLedger
          committees={RC.committees}
          ids={["ocpfSHNS", "ballotpedia"]}
        />
      </Card>

      <Card title="What the money shows">
        <AISynth title="Funding pattern" ids={["ocpfSHNS", "ballotpedia"]}>
          <p>
            The two sides raised money in very different forms. The YES
            committee's total is dominated by in-kind contributions — staff time
            and services from tenant, labor, and community organizations — while
            the NO committee's total is almost entirely cash from real-estate
            industry groups (NAIOP, the Greater Boston Real Estate Board, the
            Massachusetts Association of Realtors). Dollar amounts and each
            donor's location are drawn from itemized OCPF filings; MAPLE does
            not estimate figures.
          </p>
        </AISynth>
      </Card>
    </div>
  );
}

// Bibliography of every source cited on the page — generic: reads the SOURCES map.
function ReferencesTab() {
  const groups: { kind: SrcKind; title: string }[] = [
    { kind: "official", title: "Official information" },
    { kind: "outside", title: "Media coverage & studies" },
    { kind: "user", title: "User-submitted" },
    { kind: "ai", title: "AI synthesis" },
  ];
  const all = Object.values(SOURCES);
  return (
    <div className="flex flex-col gap-[16px]">
      <Card
        title="References"
        subtitle="Every source cited on this page, grouped by type. MAPLE publishes its sources so any claim can be checked at its origin."
      >
        <div className="space-y-[20px]">
          {groups.map(({ kind, title }) => {
            const items = all.filter((s) => s.kind === kind);
            if (!items.length) return null;
            return (
              <div key={kind}>
                <div className="flex items-center gap-[8px] mb-[10px]">
                  <span
                    className="w-[8px] h-[8px] rounded-full shrink-0"
                    style={{ background: KIND_DOT[kind] }}
                  />
                  <p className="font-['Nunito'] font-bold text-[12px] tracking-[0.08em] uppercase text-[#606060]">
                    {title}
                  </p>
                </div>
                <ol className="space-y-[10px]">
                  {items.map((s) => (
                    <li
                      key={s.url + s.label}
                      className="border-t border-dotted border-[#d1d1d1] pt-[10px] first:border-0 first:pt-0"
                    >
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-['Nunito'] font-semibold text-[14px] text-[#12266f] hover:text-[#c71e32] inline-flex items-baseline gap-[5px] leading-[1.5]"
                      >
                        {s.label}
                        <ExternalLink className="w-[12px] h-[12px] shrink-0 self-center" />
                      </a>
                      {s.date && (
                        <span className="font-['Nunito'] text-[13px] text-[#808080]">
                          {" "}
                          · {s.date}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
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
              {activeTab === "overview" && <OverviewTab />}
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
