import { Link } from "react-router-dom";
import { ChevronDown, Info } from "lucide-react";
import { MAPLE_DARK_NAVY, MapleTopNav, PageHeading } from "./maple-shared";
// Questions that have a deep-dive page source their card copy from the same
// content module the page uses, so the index card and the page hero never drift.
import { RC as RENT_CONTROL } from "../data/rent-control";
import { RC as TAX_REBATE_62F } from "../data/tax-rebate-62f";

// ─── Data model ───────────────────────────────────────────────────────────────
// A ballot question's presentation is driven by its state:
//   • no number, no outcome  → pre-election, unnumbered
//   • number, no outcome     → pre-election, numbered
//   • number + outcome       → post-election, numbered (border + badges)
type BadgeTone = "green" | "red" | "neutral" | "amber";
type Badge = { label: string; tone: BadgeTone };

type BallotQuestion = {
  title: string;
  description: string;
  number?: number;
  outcome?: "passed" | "rejected";
  badges?: Badge[];
  href?: string;
};

// The current 2026 statewide ballot questions — proposed but not yet numbered,
// so every entry is in the pre-election unnumbered state. The gun-law referendum
// is listed last as it is a different type of question than the initiatives.
const QUESTIONS_2026: BallotQuestion[] = [
  {
    title: RENT_CONTROL.title,
    description: RENT_CONTROL.plain,
    // No number — renders the "?" placeholder.
    href: "/ballotQuestions/rent-control-alt",
  },
  {
    title: "Public Records for the Legislature and Governor's Office",
    description:
      "Make records held by the state legislature and the governor's office public records",
    number: 1,
  },
  {
    title: "Single-Family Home Zoning Regulation",
    description:
      "Require cities and towns to allow single-family homes on residentially zoned lots that meet minimum standards of at least 5,000 square feet in area",
    number: 7,
  },
  {
    title: "Nonpartisan Primaries",
    description:
      "Eliminate political party primaries for state elections and create a single primary where candidates are listed regardless of their political party",
    number: 3,
  },
  {
    title: "Nature For All Fund",
    description:
      "Create a fund for state money, titled the Nature for All Fund, that would be used to further efforts of nature conservation",
    number: 6,
  },
  {
    title: TAX_REBATE_62F.title,
    description: TAX_REBATE_62F.plain,
    number: 5,
    href: "/ballotQuestions/tax-rebate-62f-grace",
  },
  {
    title: "Rollback Marijuana Legalization",
    description:
      "Repeal laws that permit the sale of recreational marijuana and the personal cultivation of cannabis in homes",
    number: 8,
  },
  {
    title: "Election Day Voter Registration",
    description:
      "Allow eligible voters to register in person and vote at their polling place on election day.",
    number: 4,
  },
  {
    title: "Collective Bargaining for CPCS Employees",
    description:
      "Permit employees of the Committee for Public Counsel Services to participate in collective bargaining practices",
    number: 2,
  },
  {
    title: "Do Not Repeal New Gun Laws",
    description:
      "Uphold recently passed firearm regulations (H.4885) that became law in 2024",
    number: 9,
  },
];

// ─── Toast / info banner (shown for the unnumbered state) ─────────────────────
function UnnumberedNotice() {
  return (
    <div
      className="flex items-start gap-2 rounded-[8px] px-[14px] py-[10px] mb-[20px]"
      style={{ backgroundColor: "#fef3c7", border: "1px solid #f59e0b" }}
    >
      <Info size={16} color="#b45309" className="mt-[1px] shrink-0" />
      <p
        className="font-['Nunito'] text-[13px] leading-[1.5]"
        style={{ color: "#92400e" }}
      >
        <span className="font-bold">Not yet numbered.</span> These questions
        have been proposed for the 2026 statewide ballot but have not been
        assigned official numbers. In Massachusetts, initiative petitions are
        numbered by the Secretary of the Commonwealth later in the cycle, once
        they qualify for the ballot.
      </p>
    </div>
  );
}

// ─── Status badge chip ────────────────────────────────────────────────────────
const BADGE_TONES: Record<
  BadgeTone,
  { bg: string; text: string; border: string }
> = {
  green: { bg: "#dcfce7", text: "#15803d", border: "#bbf7d0" },
  red: { bg: "#fee2e2", text: "#b91c1c", border: "#fecaca" },
  neutral: { bg: "#f1f1f1", text: "#525252", border: "#d4d4d4" },
  amber: { bg: "#fef3c7", text: "#92400e", border: "#f59e0b" },
};

function BadgeChip({ label, tone }: Badge) {
  const t = BADGE_TONES[tone];
  return (
    <span
      className="inline-flex items-center rounded-[4px] px-[8px] py-[2px]"
      style={{
        fontFamily: "Nunito",
        fontWeight: 700,
        fontSize: 12,
        backgroundColor: t.bg,
        color: t.text,
        border: `1px solid ${t.border}`,
      }}
    >
      {label}
    </span>
  );
}

// ─── Ballot question card (state-driven) ──────────────────────────────────────
function QuestionCard({ q }: { q: BallotQuestion }) {
  const isPostElection = q.outcome != null;
  const rejected = q.outcome === "rejected";
  const borderColor = !isPostElection
    ? "#e5e7eb"
    : rejected
      ? "#f87171"
      : "#22c55e";
  // Rejected questions are visually de-emphasized in the post-election state.
  const muted = rejected ? 0.6 : 1;
  // Unnumbered questions get a "Tentative" chip in the same spot post-election
  // questions show their outcome badges.
  const badges: Badge[] =
    q.number == null
      ? [{ label: "Tentative Ballot Question", tone: "amber" }]
      : (q.badges ?? []);

  const cardClassName =
    "flex items-center gap-[20px] bg-white rounded-[8px] px-[24px] py-[20px]" +
    (q.href ? " no-underline" : "");
  const cardStyle = {
    border: "1px solid #e5e7eb",
    borderLeft: isPostElection
      ? `4px solid ${borderColor}`
      : "1px solid #e5e7eb",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  };

  const content = (
    <>
      <span
        className="shrink-0 text-center"
        style={{
          fontFamily: "Lexend",
          fontWeight: 200,
          fontSize: 44,
          lineHeight: 1,
          color: "#000",
          width: 80,
          opacity: muted,
        }}
      >
        {q.number ?? "?"}
      </span>

      <div className="min-w-0 flex-1" style={{ opacity: muted }}>
        <h3
          className="font-['Lexend'] font-semibold text-[18px] leading-[1.3] tracking-[0.24px]"
          style={{ lineHeight: 1, color: "#1a1a1a" }}
        >
          {q.title}
        </h3>
        <p
          className="font-['Nunito'] font-light text-[14px] leading-[1.5] mt-[6px]"
          style={{ lineHeight: 1.25, color: "#808080" }}
        >
          {q.description}
        </p>
        {/* Badge row — temporarily hidden. Restore this block to show the
            "Tentative Ballot Question" chip and post-election outcome badges.
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-[6px] mt-[10px]">
            {badges.map((b) => (
              <BadgeChip key={b.label} {...b} />
            ))}
          </div>
        )}
        */}
      </div>
    </>
  );

  if (q.href) {
    return (
      <Link to={q.href} className={cardClassName} style={cardStyle}>
        {content}
      </Link>
    );
  }

  return (
    <div className={cardClassName} style={cardStyle}>
      {content}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BallotQuestions() {
  // Once questions are numbered, order them by that number; unnumbered
  // questions keep their authored order (gun-law referendum last).
  const questions = [...QUESTIONS_2026].sort((a, b) => {
    if (a.number == null && b.number == null) return 0;
    if (a.number == null) return 1;
    if (b.number == null) return -1;
    return a.number - b.number;
  });
  // The list phase is derived from the data: if nothing is numbered yet, we are
  // in the pre-election unnumbered state and show the notice banner.
  const unnumbered = questions.every((q) => q.number == null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f6f8" }}>
      <MapleTopNav />

      <main className="max-w-[1000px] mx-auto px-6 py-[28px]">
        {/* Heading row */}
        <div className="flex items-center justify-between mb-[20px]">
          <PageHeading>Ballot Questions</PageHeading>
          <button
            className="flex items-center gap-1.5 rounded-[6px] px-[12px] py-[6px]"
            style={{
              fontFamily: "Nunito",
              fontWeight: 800,
              fontSize: 18,
              color: MAPLE_DARK_NAVY,
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
            }}
          >
            2026
            <ChevronDown size={18} />
          </button>
        </div>

        {unnumbered && <UnnumberedNotice />}

        {/* Question list */}
        <div className="flex flex-col gap-[12px]">
          {questions.map((q) => (
            <QuestionCard key={q.title} q={q} />
          ))}
        </div>
      </main>
    </div>
  );
}
