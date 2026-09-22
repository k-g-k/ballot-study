import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  FileText,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import {
  RC,
  SOURCES,
  PROSE,
  POSITION_USERS,
  TESTIMONY,
  VOTER_GUIDES,
  BALLOT_TIMELINE,
  COVERAGE_BY_TOPIC,
  type CoverageArticle,
  type CoverageType,
  BIBLIOGRAPHY,
  DELIB_THEMES,
  DELIB_TRANSCRIPTS,
  testimonyFor,
} from "../../data/tax-rebate-62f";
import {
  CitationBlock,
  StakeholderGrid,
  SynthSourcesNote,
} from "../ballot";
import {
  Chapter,
  Span,
  Split,
  SideHead,
  Disclosure,
  Synth,
  Label,
  Body,
} from "./spine";
import {
  TestimonyFeed,
  type StanceFilter,
  type TypeFilter,
} from "../tax-rebate-62f/testimony";
import {
  RosterRow,
  TestimonyBlock,
  RefList,
  Figure,
  CampaignCard,
} from "./pieces";

const supporters = POSITION_USERS.filter((u) => u.stance === "supports");
const opponents = POSITION_USERS.filter((u) => u.stance === "opposes");

// ---------------------------------------------------------------- 1
/** Grouped so the page states who gains before who pays, rather than
    interleaving them in whatever order the data happens to be in. */
const IMPACT_ORDER = { benefits: 0, cost: 1, neutral: 2 } as const;

const STAKEHOLDERS_BY_IMPACT = [...RC.stakeholders].sort(
  (a, b) => IMPACT_ORDER[a.impact] - IMPACT_ORDER[b.impact],
);

/** A campaign's money claim in the library's green provenance block, the way
    the tabbed page shows it. Same data as `Claim`, different clothing. */
function ClaimBlock({
  c,
}: {
  c: { title: string; body: string; ids: readonly string[] };
}) {
  return (
    <CitationBlock kind="outside" title={c.title}>
      <p className="font-body text-sm text-ink mt-[2px] leading-[1.5]">
        {c.body}
      </p>
      <div className="mt-[6px]">
        <SynthSourcesNote
          ids={[...c.ids]}
          variant="plain"
          linkClass="text-outside-ink hover:text-outside-deep"
        />
      </div>
    </CitationBlock>
  );
}

export function WhatWouldItChange() {
  return (
    <Chapter
      id="change"
      // One question, both halves of the answer. Splitting current law into a
      // chapter of its own put two synthesis blocks back to back at the top of
      // the page and left the first as a two-sentence stub.
      question="What would it change?"
      answer={
        <Span>
          <Synth
            ids={["petition", "chapter62F", "ballotpedia"]}
            prompt="Summarize Petition No. 25-17 in plain language for a general audience: how the Chapter 62F revenue limit is calculated today, what the measure would change about it, and how the surtax carve-in works. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
          >
            {RC.changeSummary.map((para, i) => (
              <div key={i} className={i ? "mt-[18px]" : ""}>
                <Body size="lead">{para}</Body>
              </div>
            ))}
          </Synth>
        </Span>
      }
    >
      {/* The two disclosures are one group, so they sit closer to each other
          than the chapter's own 28/40px rhythm would put them. The measure is
          applied inside each one rather than around both, because the prose
          wants a reading width and the tiles want the chapter's full width. */}
      <div
        id="change-more"
        // Clears whatever is pinned when a disclosure scrolls the group up.
        className="scroll-mt-[76px] lg:scroll-mt-[132px] flex flex-col gap-[26px]"
      >
        <Disclosure anchorId="change-more" label="What happens if it passes">
          <Span>
            <Synth
              ids={[...PROSE.whatHappens.ids]}
              prompt={PROSE.whatHappens.prompt}
            >
              <Body>{PROSE.whatHappens.text}</Body>
            </Synth>
          </Span>
        </Disclosure>
        {/* Duplicated from the chapter of the same name below, to see whether
            it reads better as depth inside this one. */}
        <Disclosure anchorId="change-more" label="Who does this affect">
          <StakeholderGrid rows={STAKEHOLDERS_BY_IMPACT} />
        </Disclosure>
        {/* Also duplicated from its own chapter below. This page's arrangement
            for the official statement and the spine, but the campaign claims
            wear the library's green provenance block, the way the tabbed page
            shows them: the claim is somebody else's, and the colour says so
            before the attribution does. */}
        <Disclosure anchorId="change-more" label="What would it cost">
          <Span>
            {/* The campaign cards' filed-statement treatment, with the label
                lifted out of the rule: inside a disclosure the rule marks the
                quote, and the label names the block rather than being part of
                what was said. */}
            <div className="ml-[6px]">
              <p className="font-body font-semibold text-sm text-ink-muted mb-[6px]">
                Official Statement
              </p>
              {/* The synthesis block's own geometry and type: a 2px rule at
                  the same inset and padding, and body size rather than the
                  smaller card treatment, so the two answers in this chapter
                  read at one scale. Italic is the one difference kept, because
                  this one is quoted and that one is written. */}
              <div className="border-l-2 border-official pl-[14px] sm:pl-[20px]">
                <p className="font-body italic text-lg text-ink leading-[1.65]">
                  “{PROSE.fiscal.official.text}”
                </p>
                <p className="font-body text-sm text-ink-muted mt-[8px]">
                  — {PROSE.fiscal.official.attribution}
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
                  {/* Outside the underline, so the rule runs under the words
                      and stops rather than trailing under the mark. */}
                  <ArrowUpRight className="w-[13px] h-[13px] no-underline" />
                </a>
              </div>
            </div>
          </Span>
          {/* Parked: the two campaign money claims, so the official statement
              stands alone in this disclosure for now. Stacked rather than
              paired when they come back: the green blocks already say whose
              claim each one is, so a spine and a pair of heads would be a
              third and fourth way of saying the same thing.

          <Span>
            <p className="font-body font-semibold text-sm text-ink-muted mt-[28px] ml-[6px]">
              Fiscal claims that go beyond the official statement
            </p>
            <div className="mt-[12px] ml-[6px] flex flex-col gap-[16px]">
              <ClaimBlock c={PROSE.fiscal.claims.yes} />
              <ClaimBlock c={PROSE.fiscal.claims.no} />
            </div>
          </Span>
          */}
        </Disclosure>
      </div>
    </Chapter>
  );
}

// ---------------------------------------------------------------- 2
// One card per argument rather than one per side: an argument is a real unit
// and a column of three was an arbitrary container. It also lets a reader
// compare across the spine rather than only down a side.
function ArgList({ args }: { args: typeof RC.yesArgs }) {
  return (
    <div className="flex flex-col gap-[16px]">
      {args.map((a) => (
        <div
          key={a.title}
          className="rounded-card border border-line p-[18px] sm:p-[20px]"
        >
          <p className="font-display font-medium text-lg text-ink">{a.title}</p>
          <p className="font-body text-lg text-ink leading-[1.65] mt-[6px]">
            {a.body}
          </p>
        </div>
      ))}
    </div>
  );
}

/**
 * The side's committee filing, folded away under the coalition it funded.
 * Parked: pass it back to CampaignCard's `finance` slot to restore it.
 */
// function CampaignFinance({ stance }: { stance: "yes" | "no" }) {
//   const c = RC.committees.find((x) => x.stance === stance);
//   if (!c) return null;
//   return (
//     <Disclosure label="Campaign Finance">
//       <Committee c={c} />
//     </Disclosure>
//   );
// }

export function WhatEachSideSays({
  onViewTestimony,
  railStance,
}: {
  onViewTestimony?: (stance: StanceFilter) => void;
  /** The side the page's drawer is currently showing, or null when closed. */
  railStance?: StanceFilter | null;
}) {
  /* Parked: the chapter's AI framing, `PROSE.argumentsGlance`, which used to
     sit in the chapter's `answer`. The campaigns say the same thing in the
     sides' own words, so the synthesis was answering a question the chapter
     then answers again. */
  return (
    <Chapter id="sides" question="What are the arguments?">
      <div className="flex flex-col gap-[28px] sm:gap-[40px]">
        {/* The campaigns sit in the chapter's band rather than either side
            taking its own card. The white is the page for this stretch, not a
            container around the content, so the spine is not drawn inside it:
            the pairing does the work the rule used to.

            Campaigns and arguments still share one grid, with placement stated
            explicitly rather than left to auto-flow. The empty 1px track is the
            old spine's column, kept so the parked argument columns below land in
            the right cells if they come back.

            Who is making the case comes before the case itself: knowing who is
            behind a claim changes how you read it. */}
        <div className="@container">
        {/* Two up or stacked is a question of how much room this row has, not of
            whether the rail is open. The rail takes about a third, which still
            leaves the pair side by side on a wide window, so the columns are
            measured against the row itself. */}
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

          {/* Parked: the yes and no argument columns.
          <div className="sm:col-start-1 sm:row-start-2 flex flex-col gap-[16px] min-w-0">
            <SideHead vote="yes" label="Yes arguments" />
            <ArgList args={RC.yesArgs} />
          </div>
          <div className="sm:col-start-3 sm:row-start-2 flex flex-col gap-[16px] min-w-0">
            <SideHead vote="no" label="No arguments" />
            <ArgList args={RC.noArgs} />
          </div>
          */}
        </div>
        </div>
        {/* The agreement material belongs to this chapter rather than standing
            on its own, and it is not subordinate to the campaigns: it is the
            second half of the same answer, so it keeps the question form and the
            full chapter heading size. It sits outside the band, though. The white
            is what marks the stretch where the two sides are apart, and this is
            the part where they are not. */}
        <Span>
          <h3 className="font-display font-medium text-xl sm:text-2xl lg:text-3xl tracking-display text-ink max-w-[20ch] text-balance">
            Where do they agree?
          </h3>
        </Span>
        <Span>
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
          <Label>Still Contested</Label>
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
      </div>
    </Chapter>
  );
}

// ---------------------------------------------------------------- 3
export function WhereTheyAgree() {
  return (
    <Chapter
      id="agree"
      question="Where do they agree?"
      answer={
        <Span>
          <Body size="lead">
            Both campaigns accept these points. The gutter closes here because
            nothing on this list is in dispute.
          </Body>
        </Span>
      }
    >
      <Span>
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
        <Label>Still Contested</Label>
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

// ---------------------------------------------------------------- 4
export function WhoItAffects() {
  return (
    <Chapter
      id="affects"
      question="Who would it affect?"
      answer={
        <Span>
          <Body size="lead">
            How different groups would be affected if the measure passes. Claims
            marked ⚠ are disputed.
          </Body>
        </Span>
      }
    >
      {/* The library's own tile grid, the same component the tabbed page uses.
          Not inside a Span: the tiles are a pair of columns and want the
          chapter's full width rather than a reading measure. */}
      <StakeholderGrid rows={RC.stakeholders} />
    </Chapter>
  );
}

// ---------------------------------------------------------------- 5
function Claim({ c }: { c: { title: string; body: string; ids: readonly string[] } }) {
  return (
    <div>
      <p className="font-display font-medium text-lg text-ink leading-[1.4]">
        {c.title}
      </p>
      <p className="font-body text-lg text-ink leading-[1.65] mt-[6px]">
        {c.body}
      </p>
      <div className="mt-[10px]">
        <RefList ids={[...c.ids]} />
      </div>
    </div>
  );
}

export function WhatItCosts() {
  const f = PROSE.fiscal;
  return (
    <Chapter
      id="cost"
      question="What would it cost?"
      answer={
        <Span>
          <div className="border-l-2 border-official pl-[20px]">
            <Label>Official statement of fiscal consequences</Label>
            <p className="font-body text-lg sm:text-xl text-ink leading-[1.55] text-pretty">
              {f.official.text}
            </p>
            <p className="font-body text-xs text-ink-muted mt-[10px] leading-[1.6]">
              {f.official.caveat} {f.official.note}
            </p>
          </div>
        </Span>
      }
    >
      <Span>
        <Body>
          Everything below goes further than the official statement does. Each
          claim is a campaign's own projection, and is shown attributed rather
          than asserted.
        </Body>
      </Span>
      <Split
        heads
        stackOnPhone
        left={<Claim c={f.claims.yes} />}
        right={<Claim c={f.claims.no} />}
      />
    </Chapter>
  );
}

// ---------------------------------------------------------------- 6 — signature
export function WhoIsOnTheRecord() {
  return (
    <Chapter
      id="record"
      question="Who has gone on the record?"
      answer={
        <Span>
          <Body size="lead">
            {supporters.length + opponents.length} organizations and officials
            have filed a position on Question 5 through MAPLE. This is who they
            are, not a measure of public opinion: anyone may file, and most
            people do not.
          </Body>
        </Span>
      }
    >
      <Split
        heads
        left={
          <div>
            <Label>{supporters.length} in support</Label>
            {supporters.map((u) => (
              <RosterRow key={u.id} u={u} />
            ))}
          </div>
        }
        right={
          <div>
            <Label>{opponents.length} opposed</Label>
            {opponents.map((u) => (
              <RosterRow key={u.id} u={u} />
            ))}
          </div>
        }
      />
    </Chapter>
  );
}

// ---------------------------------------------------------------- 7
/**
 * The reason MAPLE exists, given a chapter of its own.
 *
 * A filtered feed rather than a fixed comparison: two columns answer "how do
 * the sides differ", which the chapters above already do, while a feed answers
 * "what did a particular kind of account say", which is the advocate's and the
 * staffer's question and has no other home on the page.
 *
 * The feed pins its filter bar at --pinned-h, which this page does not
 * otherwise set, so the value is declared on the wrapper: the contents bar
 * alone on narrow, the nav and the bar together once the nav pins at lg.
 */
export function WhatPeopleAreSaying({
  filter,
  onFilterChange,
  typeFilter,
  onTypeFilterChange,
}: {
  filter: StanceFilter;
  onFilterChange: (v: StanceFilter) => void;
  typeFilter: TypeFilter;
  onTypeFilterChange: (v: TypeFilter) => void;
}) {
  // A counter rather than a boolean: the button can ask for the composer again
  // after it has been closed, which a boolean would swallow.
  const [composeSignal, setComposeSignal] = useState(0);
  return (
    <Chapter
      id="testimony"
      question="What is the public saying?"
      action={
        <button
          onClick={() => setComposeSignal((n) => n + 1)}
          className="inline-flex items-center gap-[5px] font-body font-semibold text-xs px-[10px] py-[4px] rounded-control border border-brand text-brand hover:bg-brand-soft cursor-pointer transition-colors"
        >
          <Plus className="w-[13px] h-[13px]" />
          Add your perspective
        </button>
      }
    >
      <div className="[--pinned-h:48px] lg:[--pinned-h:106px]">
        <TestimonyFeed
          filter={filter}
          onFilterChange={onFilterChange}
          typeFilter={typeFilter}
          onTypeFilterChange={onTypeFilterChange}
          hideAddButton
          composeSignal={composeSignal}
          items={testimonyFor(() => true)}
          stickyTop="var(--pinned-h)"
          includeFollowingFilter
          includeTypeFilter
          asCards
        />
      </div>
    </Chapter>
  );
}

// ---------------------------------------------------------------- 8
/**
 * One theme from the sessions, in three parts that are peers rather than
 * sides: what the room agreed on, where it split, and the trade-off it was
 * weighing. Not the page's yes/no spine, which is for a binary and would say
 * these three were two opposed positions.
 */
function DelibTheme({
  th,
  n,
}: {
  th: (typeof DELIB_THEMES)[number];
  n: number;
}) {
  const parts = [
    { label: "Agreed", text: th.agreed, dot: "bg-positive" },
    { label: "Split", text: th.split, dot: "bg-caution" },
    { label: "Trade-off weighed", text: th.tradeoff, dot: "bg-ink-faint" },
  ];
  return (
    <div className="border-t border-line pt-[20px]">
      <div className="flex gap-[12px] items-baseline">
        <span className="font-body font-semibold text-sm text-ink-faint tabular-nums shrink-0">
          {n}
        </span>
        <p className="font-display font-medium text-lg sm:text-xl text-ink leading-[1.35] max-w-[46ch]">
          {th.title}
        </p>
      </div>
      {/* Three columns where there is room, so the shape of the discussion is
          visible before any of it is read. */}
      <div className="mt-[18px] ml-[26px] grid gap-x-[32px] gap-y-[20px] lg:grid-cols-3">
        {parts.map((p) => (
          <div key={p.label}>
            <p className="flex items-center gap-[7px] font-body font-semibold text-xs uppercase tracking-[0.08em] text-ink-muted mb-[6px]">
              <span aria-hidden className={`w-[7px] h-[7px] rounded-full ${p.dot}`} />
              {p.label}
            </p>
            <p className="font-body text-base text-ink leading-[1.6]">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FromTheDiscussions() {
  const d = PROSE.deliberation;
  return (
    <Chapter
      id="discussions"
      question="What came out of the discussions?"
      answer={
        <Span>
          {/* The caveat first and in a mark, not as a footnote under the
              paragraph. None of this has happened yet, which is the single
              most important thing to know before reading any of it. */}
          <p className="inline-flex items-center gap-[6px] font-body font-semibold text-2xs uppercase tracking-[0.08em] text-caution-ink bg-caution-soft px-[8px] py-[3px] rounded-control mb-[14px]">
            {d.note}
          </p>
          <Body size="lead">{d.body}</Body>
        </Span>
      }
    >
      <Span>
        <div className="flex gap-[28px] sm:gap-[40px] flex-wrap">
          {d.stats.map((s) => (
            <Figure key={s.label} value={s.n} label={s.label} />
          ))}
        </div>
        <p className="font-body text-sm text-ink-muted leading-[1.6] mt-[20px]">
          {d.recruitment}
        </p>
      </Span>

      <div>
        {/* The themes are written from the transcripts rather than quoted from
            them, so they carry the page's synthesis mark and say what they were
            written from. The transcripts themselves are directly below, which
            is what makes the claim checkable. */}
        <div className="ml-[6px] border-l-2 border-ai pl-[14px] sm:pl-[20px] mb-[26px]">
          <p className="font-body text-base text-ink-muted leading-[1.6] max-w-[70ch]">
            {d.themesNote}
          </p>
          <span className="inline-flex items-center gap-[4px] border border-ai-edge text-ai-ink font-body font-semibold text-2xs uppercase tracking-[0.08em] px-[7px] py-[2px] rounded-control grayscale-[50%] mt-[10px]">
            <Sparkles className="w-[10px] h-[10px]" />
            AI Synthesis
          </span>
        </div>
        <div className="flex flex-col gap-[28px]">
          {DELIB_THEMES.map((th, i) => (
            <DelibTheme key={th.title} th={th} n={i + 1} />
          ))}
        </div>
      </div>

      <Span>
        <Label>Anonymized transcripts</Label>
        <ul className="flex flex-col gap-[10px]">
          {DELIB_TRANSCRIPTS.map((t) => (
            <li key={t.title} className="flex gap-[10px]">
              <FileText
                aria-hidden
                className="w-[15px] h-[15px] shrink-0 mt-[3px] text-ink-faint"
              />
              <div>
                <p className="font-body font-semibold text-base text-ink leading-[1.4]">
                  {t.title}
                </p>
                <p className="font-body text-sm text-ink-muted">{t.meta}</p>
              </div>
            </li>
          ))}
        </ul>
      </Span>
    </Chapter>
  );
}

// ---------------------------------------------------------------- 9
/**
 * Where an article came from, in the page's own provenance colours: blue for
 * government, green for outside reporting, amber for an interested party. The
 * data has carried this on every article all along and the page was dropping
 * it, on a page whose whole argument is that provenance should be visible.
 */
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
      question="Path to the ballot"
      answer={
        // The route to the ballot as five steps, oldest first, in the same
        // geometry as the record below so the two read as one system: dates in
        // a column, a rule with a node at each step. No synthesis mark, because
        // this is the chronology stated plainly rather than written from
        // sources.
        <ol className="flex flex-col max-w-[820px]">
          {PROSE.ballotHistory.steps.map((step, i, all) => (
            <li
              key={step.label}
              className="grid grid-cols-[86px_1fr] sm:grid-cols-[104px_1fr] gap-x-[16px] sm:gap-x-[22px]"
            >
              <p className="font-body font-semibold text-sm text-ink-muted text-right pt-[2px] tabular-nums">
                {step.when}
              </p>
              <div
                className={`relative border-l border-line pl-[22px] pb-[16px] ${
                  i === all.length - 1 ? "border-transparent pb-0" : ""
                }`}
              >
                <span
                  aria-hidden
                  className="absolute left-[-4px] top-[7px] w-[7px] h-[7px] rounded-full bg-ink-faint"
                />
                <p className="font-display font-medium text-lg text-ink leading-[1.35]">
                  {step.label}
                </p>
              </div>
            </li>
          ))}
        </ol>
      }
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

// ---------------------------------------------------------------- 10
function Committee({ c }: { c: (typeof RC.committees)[number] }) {
  return (
    <div>
      <p className="font-display font-medium text-lg text-ink">{c.name}</p>
      <div className="mt-[16px] flex gap-[28px] sm:gap-[32px] flex-wrap">
        <Figure value={c.total} label="raised" />
        <Figure value={c.spent} label="spent" />
      </div>
      <p className="font-body text-sm text-ink-muted leading-[1.6] mt-[12px]">
        {c.cash} cash · {c.inKind} in kind. {c.note}
      </p>
      {c.donors.length > 0 && (
        <div className="mt-[20px]">
          <Label>Largest donors</Label>
          {c.donors.map((d) => (
            <div
              key={d.name}
              className="flex justify-between gap-[16px] py-[6px] flex-wrap"
            >
              <span className="font-body text-base text-ink">{d.name}</span>
              <span className="font-body text-base text-ink tabular-nums shrink-0">
                {d.amount}
                <span className="text-ink-muted text-xs"> {d.kind}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function WhoIsFunding() {
  const yes = RC.committees.find((c) => c.stance === "yes");
  const no = RC.committees.find((c) => c.stance === "no");
  return (
    <Chapter
      id="funding"
      question="Who is funding each side?"
      answer={
        <Span>
          <Synth ids={[...PROSE.fundingPattern.ids]} prompt={PROSE.fundingPattern.prompt}>
            <Body size="lead">{PROSE.fundingPattern.text}</Body>
          </Synth>
          <p className="font-body text-xs text-ink-muted mt-[10px]">
            {PROSE.fundingPattern.windowNote}
          </p>
        </Span>
      }
    >
      <Split
        heads
        stackOnPhone
        left={yes ? <Committee c={yes} /> : null}
        right={no ? <Committee c={no} /> : null}
      />
    </Chapter>
  );
}

// ---------------------------------------------------------------- 11
/**
 * The bibliography's four sections are the provenance kinds this page already
 * colour-codes everywhere else, so they wear the same colours here: blue for
 * the state's own documents, green for outside and nonpartisan work, grey for
 * reporting, amber for material published by an interested party.
 */
const SECTION_DOT: Record<string, string> = {
  "Official government documentation": "bg-official",
  "Educational (Nonpartisan)": "bg-outside",
  News: "bg-ink-faint",
  Advocacy: "bg-caution",
};

function SourceSectionHead({ name, count }: { name: string; count: number }) {
  return (
    <div className="flex items-baseline gap-[8px] mb-[10px]">
      <span
        aria-hidden
        className={`w-[7px] h-[7px] rounded-full shrink-0 translate-y-[-2px] ${
          SECTION_DOT[name] ?? "bg-ink-faint"
        }`}
      />
      <p className="font-body font-semibold text-sm text-ink">{name}</p>
      <p className="font-body text-sm text-ink-faint tabular-nums">{count}</p>
    </div>
  );
}

export function WhereThisComesFrom() {
  return (
    <Chapter
      id="sources"
      question="Where does this come from?"
      answer={
        <Span>
          <Body size="lead">{PROSE.bibliographyNote}</Body>
        </Span>
      }
    >
      <Span>
        <SourceSectionHead
          name="Independent voter guides"
          count={VOTER_GUIDES.length}
        />
        <ul className="flex flex-col gap-[10px]">
          {VOTER_GUIDES.map((g) => (
            <li key={g.name}>
              <p className="font-body font-semibold text-base text-ink leading-[1.4]">
                {g.name}
              </p>
              <p className="font-body text-sm text-ink-muted leading-[1.5]">
                {g.publisher} · {g.note}
              </p>
            </li>
          ))}
        </ul>
      </Span>
      {/* Two columns from lg. The entries are short and there are dozens of
          them, so one column turns the whole chapter into a scroll; paired,
          a section is something you take in at once. */}
      <div className="grid gap-x-[48px] gap-y-[32px] lg:grid-cols-2">
        {BIBLIOGRAPHY.map((sec) => (
          <div key={sec.section}>
            <SourceSectionHead
              name={sec.section}
              count={sec.entries.length}
            />
            <ul className="flex flex-col gap-[10px]">
              {sec.entries.map((e) => (
                <li key={e.url}>
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-base text-ink leading-[1.4] hover:text-brand"
                  >
                    {e.person ? `${e.person}, ` : ""}
                    <span className={sec.italicTitle ? "italic" : ""}>
                      {e.title}
                    </span>
                  </a>
                  <p className="font-body text-xs text-ink-faint mt-[1px]">
                    {e.author} · {e.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Chapter>
  );
}
