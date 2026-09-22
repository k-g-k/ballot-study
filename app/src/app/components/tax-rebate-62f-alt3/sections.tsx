// Alt 3: the tabbed page's content, in the alt page's voice.
//
// The 62F Grace page is organised around five sections that narrow as you read:
// the question, what it does, what people argue, what the public is saying, and
// the record. That ordering is good and this page keeps it exactly, along with
// its section titles and its ledes.
//
// What changes is the rendering. The Grace page states each section through the
// ballot library's cards; this page states it through the alt spine, where a
// section is a question with an answer rather than a stack of titled boxes. No
// copy is rewritten in the move: every string here is the one that page shows,
// read from the shared data rather than retyped.
//
// The one substitution is testimony. The Grace page gives it a section of its
// own with the feed and the discussions inside; this page follows alt 2, where
// testimony lives in the Public Perspectives rail and the section becomes the
// map of where it came from. See ./public-saying.

import { ArrowUpRight } from "lucide-react";
import {
  RC,
  PROSE,
  SOURCES,
  POSITION_USERS,
  BIBLIOGRAPHY,
  VOTER_GUIDES,
  BALLOT_TIMELINE,
  COVERAGE_BY_TOPIC,
  type CoverageArticle,
  type CoverageType,
} from "../../data/tax-rebate-62f";
import {
  FinanceLedger,
  StakeholderGrid,
} from "../ballot";
import {
  Chapter,
  Span,
  Split,
  SideHead,
  Synth,
  Body,
  Disclosure,
} from "./spine";
import { CampaignCard, LogoWithTooltip } from "./pieces";
import type { StanceFilter } from "../tax-rebate-62f/testimony";
import { useState } from "react";
import { Check } from "lucide-react";
import { STANCE_CHIP } from "../tax-rebate-62f/accounts";
import {
  FISCAL_CONSEQUENCES,
  MAJORITY_REPORT,
  MINORITY_REPORT,
  REPORTS_NOTE,
  HEARING_RECORD,
} from "../../data/tax-rebate-62f/official-2026";

/** The bill as filed, for the chapter about what the Legislature did with it. */
const BILL_TEXT_URL = "https://www.mapletestimony.org/bills/194/H5006";

/**
 * A section's internal heading, in the Grace page's card-header voice.
 *
 * That page names each block with a display-face heading and sets its
 * qualifying line directly under it, and those names are part of what is being
 * carried over here. The alt spine's own `Label` is a quieter thing, a small
 * caps-weight tag for a block that does not need announcing, so it is left
 * alone for the hero and the campaign cards that use it.
 */
function SubHead({ title, note }: { title: string; note?: string }) {
  return (
    <>
      <h3 className="font-display font-medium text-xl text-ink mb-[4px]">
        {title}
      </h3>
      {note && (
        <p className="font-body text-sm text-ink-muted mb-[14px] max-w-[74ch]">
          {note}
        </p>
      )}
      {!note && <div className="mb-[12px]" />}
    </>
  );
}

// ── 2. What would it change? ──────────────────────────────────────────────
//
// Section 1, "The question", is the hero: the summary of the initiative and the
// two vote cards are already what the page opens with, so repeating them as a
// chapter would state the same thing twice.

export function WhatItDoes() {
  return (
    <Chapter
      id="what-it-does"
      question="What would it change?"
      answer={
        // Alt 2's account of the change rather than the Grace page's "what
        // happens if it passes". It answers the section's own question, which
        // is what the measure does, where the other answers what follows from
        // it.
        <Span>
          <Synth
            ids={["petition", "chapter62F", "ballotpedia"]}
            prompt="Summarize Petition No. 25-17 in plain language for a general audience: how the Chapter 62F revenue limit is calculated today, what the measure would change about it, and how the surtax carve-in works. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
          >
            {RC.changeSummary.map((para, i) => (
              <div key={i} className={i ? "mt-[18px]" : ""}>
                <Body>{para}</Body>
              </div>
            ))}
          </Synth>
        </Span>
      }
    >
      {/* Collapsed, not restyled. Each of these keeps the heading it has when
          the chapter is laid out in full, and the heading is what you press, so
          the page reads the same either way with parts of it folded. Opening
          any one brings the group to the top of the viewport, so the headings
          you did not pick stay reachable. */}
      <div
        id="change-more"
        className="scroll-mt-[76px] lg:scroll-mt-[132px] flex flex-col gap-[26px]"
      >
        <Disclosure anchorId="change-more" variant="heading" label="What happens if it passes">
          <Span>
            <Synth
              ids={[...PROSE.whatHappens.ids]}
              prompt={PROSE.whatHappens.prompt}
            >
              <Body>{PROSE.whatHappens.text}</Body>
            </Synth>
          </Span>
        </Disclosure>

        <Disclosure anchorId="change-more" variant="heading" label="Who is impacted">
          <p className="font-body text-sm text-ink-muted leading-[1.6] mb-[18px] max-w-[74ch]">
            How different groups would be affected if the measure passes. Claims
            marked ⚠ are disputed.
          </p>
          <StakeholderGrid rows={RC.stakeholders} />
        </Disclosure>

        <Disclosure anchorId="change-more" variant="heading" label="What it would cost">
          <Span>
            {/* Alt 2's treatment: the official statement alone, in the campaign
                cards' filed-statement geometry. A 2px rule at the same inset
                and padding as the synthesis block, and body size rather than
                the smaller card treatment, so the two answers in this section
                read at one scale. Italic is the one difference kept, because
                this one is quoted and that one is written. */}
            <div className="ml-[6px]">
              <p className="font-body font-semibold text-sm text-ink-muted mb-[6px]">
                Official Statement
              </p>
              <div className="border-l-2 border-official pl-[14px] sm:pl-[20px]">
                {FISCAL_CONSEQUENCES.paragraphs.map((t) => (
                  <p
                    key={t}
                    className="font-body italic text-lg text-ink leading-[1.65]"
                  >
                    “{t}”
                  </p>
                ))}
                <p className="font-body text-sm text-ink-muted mt-[8px]">
                  — {FISCAL_CONSEQUENCES.author}
                </p>
                {/* Dotted and arrowless, matching the sources triggers rather
                    than the page's outbound links: inside the rule it reads as
                    part of the citation rather than as somewhere to go next. */}
                <a
                  href={SOURCES.agSummary.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[4px] mt-[10px] font-body font-semibold text-sm underline decoration-dotted underline-offset-[4px] text-official-ink hover:text-official"
                >
                  View official statement
                  <ArrowUpRight className="w-[13px] h-[13px] no-underline" />
                </a>
              </div>
            </div>
          </Span>
        </Disclosure>
      </div>
    </Chapter>
  );
}

// ── 3. What are the arguments? ────────────────────────────────────────────

export function WhatPeopleArgue({
  onViewTestimony,
  railStance,
}: {
  onViewTestimony?: (stance: StanceFilter) => void;
  /** The side the page's drawer is currently showing, or null when closed. */
  railStance?: StanceFilter | null;
}) {
  return (
    <Chapter id="arguments" question="What are the arguments?">
      {/* The campaigns, in place of a synthesis. The two sides state their own
          cases here in their own statutory words, so a written summary above
          them would be answering a question the section then answers again,
          less reliably.

          Who is making the case comes before the case itself: knowing who is
          behind a claim changes how you read it. */}
      <div className="@container">
        {/* Two up or stacked is a question of how much room this row has, not
            of whether the rail is open. The rail takes about a third, which
            still leaves the pair side by side on a wide window, so the columns
            are measured against the row itself. */}
        <div className="flex flex-col gap-[32px] @[700px]:grid @[700px]:grid-cols-[1fr_1px_1fr] @[700px]:gap-x-[28px] @[700px]:gap-y-[40px] @[960px]:gap-x-[48px]">
          <div className="@[700px]:col-start-1 @[700px]:row-start-1 flex flex-col gap-[16px] min-w-0">
            <SideHead vote="yes" label="Supporting Campaign" />
            <CampaignCard
              d={RC.overviewVotes.yes}
              stance="endorse"
              onViewTestimony={() => onViewTestimony?.("endorsing")}
            />
          </div>
          <div
            // Stacked, the side you asked to see comes first. Two up, explicit
            // placement decides and the order is reset so it cannot interfere.
            className={`@[700px]:col-start-3 @[700px]:row-start-1 flex flex-col gap-[16px] min-w-0 ${
              railStance === "opposing" ? "order-first @[700px]:order-none" : ""
            }`}
          >
            <SideHead vote="no" label="Opposing Campaign" />
            <CampaignCard
              d={RC.overviewVotes.no}
              stance="oppose"
              onViewTestimony={() => onViewTestimony?.("opposing")}
            />
          </div>
        </div>
      </div>

      {/* Consensus before disagreement, on purpose: a reader who stops early
          should leave knowing the two sides agree on something. */}
      <Span>
        <SubHead title="Areas of consensus" />
        <ul className="flex flex-col gap-[14px]">
          {RC.consensus.map((c) => (
            <li key={c} className="flex gap-[12px] items-start">
              <Check className="w-[16px] h-[16px] mt-[4px] shrink-0 text-positive-ink" />
              <span className="font-body text-lg text-ink leading-[1.65]">
                {c}
              </span>
            </li>
          ))}
        </ul>
      </Span>

      <Span>
        <SubHead title="Areas of disagreement" />
        <ul className="flex flex-col gap-[14px]">
          {RC.disagreement.map((d) => (
            <li key={d} className="border-l-2 border-line-strong pl-[16px]">
              <span className="font-body text-lg text-ink leading-[1.65]">
                {d}
              </span>
            </li>
          ))}
        </ul>
      </Span>
    </Chapter>
  );
}

// ── 4. How did the Legislature respond? ───────────────────────────────────

/**
 * Which way a committee report came down, in the stance chip's clothes.
 *
 * "In Favor" and "Against" rather than the feed's "Endorses" and "Opposes":
 * those two belong to accounts taking a side, and a committee did not take a
 * side, it made a recommendation. These are the voter guide's own headings for
 * the two sides of a question, so the page borrows the document's vocabulary
 * rather than inventing one.
 */
function ReportChip({ kind }: { kind: "majority" | "minority" }) {
  const c = STANCE_CHIP[kind === "minority" ? "endorse" : "oppose"];
  return (
    <span
      className={`${c.bg} border ${c.bd} ${c.tx} px-[8px] py-[1px] rounded-pill font-body font-semibold text-2xs`}
    >
      {kind === "minority" ? "In Favor" : "Against"}
    </span>
  );
}

export function WhatDidTheLegislatureSay() {
  return (
    <Chapter
      id="legislature"
      question="How did the Legislature respond?"
      answer={
        // How the step works, not what happened in it. The committee and its
        // hearing are left out on purpose: naming them means explaining that
        // the committee reports and the Legislature votes, which is two bodies
        // and two acts for a line that only needs to say a question can become
        // law here. No dates and no counts either, so it stays true of any
        // ballot question and does not repeat the chapter underneath it.
        <Span>
          <p className="font-body text-sm text-ink-muted leading-[1.65] max-w-[74ch]">
            Every ballot question gets heard by the Legislature where they can
            choose to pass the measure into law. If the Legislature does not
            pass it, supporters will then gather a second round of signatures to
            get the measure added to the ballot.
          </p>
        </Span>
      }
    >
      <div className="flex flex-col gap-[28px] sm:gap-[40px]">
        <div className="flex flex-col gap-[28px]">
          {[MAJORITY_REPORT, MINORITY_REPORT].map((r) => (
            <div key={r.kind} className="max-w-[74ch]">
              {/* The stance sits on the title because the recommendation below
                  is procedural language: "take no action" is what the committee
                  voted, and the chip is what it amounts to for a voter reading
                  the question. */}
              <p className="flex items-center gap-[10px]">
                {/* Same level as the disclosure headings in "What would it
                    change?": these are the sections of this chapter, and a
                    reader running down the page should meet one size of section
                    heading rather than two. */}
                <span className="font-display font-medium text-xl text-ink capitalize">
                  {r.kind} report
                </span>
                <ReportChip kind={r.kind} />
              </p>
              {/* The page's own gloss on procedural language, so it stays
                  outside the rule. */}
              <p className="font-body text-sm text-ink-muted mt-[4px] leading-[1.55]">
                {r.recommendation}
              </p>

              {/* What the report argues, in plain language, marked as synthesis
                  so it is never taken for the committee's words. Offering a
                  summary is only fair when the thing summarised is within
                  reach, which is what the disclosure below is for. */}
              <div className="mt-[16px]">
                <Synth ids={r.summarySourceIds} prompt={r.summaryPrompt}>
                  <p className="font-body text-base text-ink leading-[1.7]">
                    {r.summary}
                  </p>
                </Synth>
              </div>

              {/* Signed, by name. A committee report is not an institution's
                  opinion, it is these members', and the names are the part a
                  reader can act on at the next election. */}
              <dl className="flex flex-wrap gap-x-[36px] gap-y-[10px] mt-[22px] ml-[20px] sm:ml-[26px]">
                {r.signers.map((g) => (
                  <div key={g.chamber}>
                    <dt className="font-body font-semibold text-2xs uppercase tracking-[0.08em] text-ink-faint mb-[6px]">
                      {g.chamber}
                    </dt>
                    {/* Faces, not names. A list of ten names is a list; ten
                        faces is a committee, which is what signed the thing.
                        The name is still there for anyone who needs it, on
                        hover and to a screen reader, so nothing is lost by not
                        printing it. */}
                    <dd className="flex flex-wrap items-center gap-[10px]">
                      {g.names.map((n) => {
                        const u = POSITION_USERS.find((x) =>
                          x.name.endsWith(n),
                        );
                        return (
                          <span key={n} aria-label={n}>
                            {u ? (
                              <LogoWithTooltip u={u} size={46} />
                            ) : (
                              <span className="font-body text-sm text-ink">
                                {n}
                              </span>
                            )}
                          </span>
                        );
                      })}
                    </dd>
                  </div>
                ))}
              </dl>
              {/* The report itself, closed. Carried verbatim it runs to nine
                  paragraphs, several of them about a petition that is not on
                  this ballot, which is more than the chapter can spend on it
                  unprompted. The label is the citation and the control at once:
                  a reader who wants the state's words opens them, and one who
                  does not still sees that they are here.

                  What they wrote sits inside the rule, because those are their
                  words and the rule is how this page marks a quotation. Who
                  signed it sits outside, above: that is the page naming these
                  members, not the report speaking. */}
              {/* The label on the signers' left edge, not the chevron: the "V"
                  of "View" lines up with the "S" of "Senators" and with the
                  names above it. The chevron's own 20px, its width plus its gap,
                  is taken back off the inset so the words land where the words
                  around them do. */}
              <div className="mt-[18px] ml-0 sm:ml-[6px]">
                <Disclosure label="View full official text">
                  <div className="border-l-2 border-official pl-[16px] sm:pl-[20px]">
                {/* The guide prints this note once, above both reports. It is
                    about what the reports discuss, so it sits with the first of
                    them rather than above the section, where it read as a
                    caveat on the whole chapter. */}
                {r.kind === "majority" && (
                  <p className="font-body text-xs text-ink-muted leading-[1.6] mt-[10px]">
                    {REPORTS_NOTE}
                  </p>
                )}
                <div className="flex flex-col gap-[10px] mt-[14px]">
                  {r.paragraphs.map((t) => (
                    <p
                      key={t}
                      className="font-body text-sm text-ink leading-[1.65]"
                    >
                      {t}
                    </p>
                    ))}
                    </div>
                  </div>
                </Disclosure>
              </div>
            </div>
          ))}

          {/* Both, after the reports rather than before: where to go if the
              summaries are not enough. The bill comes first because the hearing
              was a hearing on it, so the order is the thing and then what the
              committee did with it. */}
          <div className="pt-[4px] flex flex-col gap-[16px]">
            <div>
              <a
                href={BILL_TEXT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[4px] font-body font-semibold text-sm underline decoration-dotted underline-offset-[4px] text-official-ink hover:text-official"
              >
                Read the bill text
                <ArrowUpRight className="w-[13px] h-[13px] no-underline" />
              </a>
              <p className="font-body text-xs text-ink-muted mt-[6px] max-w-[62ch] leading-[1.6]">
                House Bill 5006, the citizen-led petition as filed with the
                Legislature.
              </p>
            </div>
            <div>
              <a
                href={HEARING_RECORD.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[4px] font-body font-semibold text-sm underline decoration-dotted underline-offset-[4px] text-official-ink hover:text-official"
              >
                {HEARING_RECORD.label}
                <ArrowUpRight className="w-[13px] h-[13px] no-underline" />
              </a>
              <p className="font-body text-xs text-ink-muted mt-[6px]">
                {HEARING_RECORD.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}

// ── 5. Latest news ────────────────────────────────────────────────────────
//
// Alt 2's chapter, unchanged: the coverage library with its by-date and
// by-topic views. It was a block inside the record here, which buried a
// hundred-odd articles under a heading about sources.

const COVERAGE_CHIP: Record<CoverageType, { bg: string; tx: string }> = {
  "GOV'T": { bg: "bg-official-soft", tx: "text-official-ink" },
  NEWS: { bg: "bg-outside-soft", tx: "text-outside-ink" },
  ADVOCACY: { bg: "bg-caution-soft", tx: "text-caution-ink" },
};

function ArticleRow({ a }: { a: CoverageArticle }) {
  const chip = COVERAGE_CHIP[a.type];
  return (
    <li>
      <a
        href={a.url}
        target="_blank"
        rel="noopener noreferrer"
        // Grid rather than inline: the chips line up in a column of their own,
        // so a stack of articles can be read down the left edge for kind and
        // across for what it says.
        className="group grid grid-cols-[62px_1fr] gap-[10px] items-baseline py-[5px]"
      >
        <span
          className={`justify-self-start font-body font-semibold text-2xs tracking-[0.06em] px-[6px] py-[2px] rounded-chip ${chip.bg} ${chip.tx}`}
        >
          {a.type}
        </span>
        <span className="font-body text-sm text-ink-muted leading-[1.5] group-hover:text-ink">
          <span className="font-semibold text-ink">{a.outlet}</span> {a.title}
        </span>
      </a>
    </li>
  );
}

export function HowItGotHere() {
  const [view, setView] = useState<"date" | "topic">("date");
  const total = BALLOT_TIMELINE.reduce((n, m) => n + m.articles.length, 0);
  return (
    <Chapter
      id="history"
      question="Latest News"
    >
      <div className="max-w-[820px]">
        {/* One library, two ways in. The chapter used to print the whole
            coverage list twice, by date and then by topic, with nothing saying
            the second was the same articles. It is one set, and which axis you
            want is the reader's choice, so it is a control rather than two
            sections. */}
        <div className="flex items-baseline justify-between gap-[16px] flex-wrap mb-[20px]">
          <p className="font-body font-semibold text-sm text-ink-muted">
            {total} articles and documents
          </p>
          <div className="flex items-center gap-[2px]">
            {(
              [
                ["date", "By date"],
                ["topic", "By topic"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setView(id)}
                aria-pressed={view === id}
                className={`font-body font-semibold text-sm px-[10px] py-[4px] rounded-pill cursor-pointer transition-colors ${
                  view === id
                    ? "bg-wash-strong text-ink"
                    : "text-ink-muted hover:bg-wash"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {view === "date" ? (
          // A drawn line with dated nodes on it, rather than rows separated by
          // rules. A chronology should look like one before you read a word of
          // it, and the date is what you scan, so it leads rather than sitting
          // in grey beside the heading.
          <ol className="flex flex-col">
            {BALLOT_TIMELINE.map((m, i) => (
              <li
                key={m.label}
                className="grid grid-cols-[86px_1fr] sm:grid-cols-[104px_1fr] gap-x-[16px] sm:gap-x-[22px]"
              >
                <p className="font-display font-medium text-sm sm:text-base text-ink text-right pt-[1px]">
                  {m.when}
                </p>
                <div
                  className={`relative border-l border-line pl-[22px] pb-[26px] ${
                    i === BALLOT_TIMELINE.length - 1 ? "border-transparent" : ""
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute left-[-4px] top-[7px] w-[7px] h-[7px] rounded-full bg-ink-faint"
                  />
                  <p className="font-display font-medium text-lg text-ink leading-[1.35]">
                    {m.label}
                  </p>
                  {m.body && (
                    <p className="font-body text-base text-ink-muted leading-[1.6] mt-[6px]">
                      {m.body}
                    </p>
                  )}
                  {m.articles.length > 0 && (
                    <ul className="mt-[10px] flex flex-col">
                      {m.articles.map((a) => (
                        <ArticleRow key={a.url} a={a} />
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <div className="flex flex-col gap-[26px]">
            {COVERAGE_BY_TOPIC.map((t) => (
              <div key={t.topic}>
                <p className="font-display font-medium text-lg text-ink mb-[8px]">
                  {t.topic}
                </p>
                <ul className="flex flex-col">
                  {t.articles.map((a) => (
                    <ArticleRow key={a.url} a={a} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </Chapter>
  );
}

// Dates are authored APA-style ("2026, March 30"); IEEE puts the month first
// and abbreviates it. Anything that does not match, such as "n.d." or a bare
// year, is passed through unchanged.
const IEEE_MONTHS: Record<string, string> = {
  January: "Jan.",
  February: "Feb.",
  March: "Mar.",
  April: "Apr.",
  May: "May",
  June: "Jun.",
  July: "Jul.",
  August: "Aug.",
  September: "Sep.",
  October: "Oct.",
  November: "Nov.",
  December: "Dec.",
};

function ieeeDate(date: string) {
  const m = date.match(/^(\d{4}),\s*([A-Za-z]+)(?:\s+(\d{1,2}))?$/);
  if (!m) return date;
  const [, year, month, day] = m;
  const abbr = IEEE_MONTHS[month] ?? month;
  return day ? `${abbr} ${day}, ${year}` : `${abbr} ${year}`;
}

/** The host of a source URL, without the scheme or a leading "www.". */
function hostLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "");
  }
}

// ── 6. Funding ────────────────────────────────────────────────────────────

export function WhoIsFunding() {
  return (
    <Chapter
      id="funding"
      question="Campaign Finance"
      answer={
        <Span>
          <Synth
            ids={[...PROSE.fundingPattern.ids]}
            prompt={PROSE.fundingPattern.prompt}
          >
            {/* Reading size rather than lead size: this is a paragraph of
                numbers, and the chapters that open at lead size open on a
                sentence. */}
            <Body>{PROSE.fundingPattern.text}</Body>
          </Synth>
        </Span>
      }
    >
      <div>
        <SubHead
          title="Who is funding each side"
          note={PROSE.fundingPattern.windowNote}
        />
        <FinanceLedger committees={RC.committees} ids={["ocpf"]} />
      </div>
    </Chapter>
  );
}

// ── 7. Voter guides ───────────────────────────────────────────────────────
//
// Its own chapter, immediately before the sources. Both answer "where else can
// I look", and a guide is closer to a source than to anything else on the page:
// somebody else's reading of the same question, offered rather than argued.

export function VoterGuides() {
  return (
    <Chapter
      id="guides"
      question="Voter Guides"
      answer={
        <Span>
          <p className="font-body text-sm text-ink-muted leading-[1.65] max-w-[74ch]">
            Independent guides to this question, by organisations that write
            them for every measure on the ballot. MAPLE does not endorse them or
            rank them, and none of them is affiliated with either campaign.
          </p>
        </Span>
      }
    >
      <Span>
        <ul className="flex flex-col gap-[18px]">
          {VOTER_GUIDES.map((g) => (
            <li key={g.name}>
              <p className="font-body font-semibold text-base text-ink leading-[1.4]">
                {g.name}
              </p>
              <p className="font-body text-sm text-ink-muted leading-[1.55] mt-[2px]">
                {g.note}
              </p>
            </li>
          ))}
        </ul>
      </Span>
    </Chapter>
  );
}

// ── 7. Sources ────────────────────────────────────────────────────────────
//
// Its own chapter rather than the tail of a record. It is the longest block on
// the page and the one a reader comes to deliberately, which is exactly the
// shape a chapter is for.

export function Sources() {
  return (
    <Chapter
      id="sources"
      question="Sources"
      answer={
        <Span>
          <p className="font-body text-sm text-ink-muted leading-[1.65] max-w-[74ch]">
            {PROSE.bibliographyNote}
          </p>
        </Span>
      }
    >
      <Span>
        {/* The Grace page's bibliography: IEEE citations as bullets, the host
            name as the link, one column. A citation is a sentence, so it wants
            to be read as one rather than broken into a title line and a byline
            under it. */}
        <div className="flex flex-col gap-[28px]">
          {BIBLIOGRAPHY.map((sec) => (
            <div key={sec.section}>
              <p className="font-body font-semibold text-lg text-ink mb-[10px]">
                {sec.section}
              </p>
              <ul className="list-disc list-outside pl-[20px] space-y-[8px] marker:text-ink-faint">
                {sec.entries.map((e) => (
                  <li
                    key={e.title}
                    className="font-body text-sm leading-[1.6] text-ink"
                  >
                    {e.person && <>{e.person}, </>}
                    &ldquo;{e.title},&rdquo; <em>{e.author}</em>,{" "}
                    {ieeeDate(e.date)}.
                    {e.url && (
                      <>
                        {" "}
                        [Online]. Available:{" "}
                        <a
                          href={e.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-baseline gap-[3px] text-brand underline underline-offset-[3px] hover:text-alert transition-colors"
                        >
                          {hostLabel(e.url)}
                          <ArrowUpRight className="w-[12px] h-[12px] shrink-0 self-center no-underline" />
                        </a>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Span>
    </Chapter>
  );
}
