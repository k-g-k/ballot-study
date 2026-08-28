import { useState } from "react";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import {
  RC,
  SOURCES,
  PROSE,
  POSITION_USERS,
  VOTER_GUIDES,
  BALLOT_TIMELINE,
  COVERAGE_BY_TOPIC,
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
}: {
  onViewTestimony?: (stance: StanceFilter) => void;
}) {
  /* Parked: the chapter's AI framing. The campaigns and the argument columns
     below say the same thing in the sides' own words, so the synthesis was
     answering a question the chapter then answers again.

      answer={
        <Span>
          <Synth
            ids={[...PROSE.argumentsGlance.ids]}
            prompt={PROSE.argumentsGlance.prompt}
          >
            <Body size="lead">{PROSE.argumentsGlance.text}</Body>
          </Synth>
        </Span>
      }
  */
  return (
    <Chapter
      id="sides"
      question="What are the arguments?"
      band={
        <>
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
          <div className="flex flex-col gap-[32px] sm:grid sm:grid-cols-[1fr_1px_1fr] sm:gap-x-[28px] sm:gap-y-[40px] lg:gap-x-[48px]">
            <div className="sm:col-start-1 sm:row-start-1 flex flex-col gap-[16px] min-w-0">
              <SideHead vote="yes" label="Supporting Campaign" />
              <CampaignCard
                d={RC.overviewVotes.yes}
                stance="endorse"
              />
            </div>
            <div className="sm:col-start-3 sm:row-start-1 flex flex-col gap-[16px] min-w-0">
              <SideHead vote="no" label="Opposing Campaign" />
              <CampaignCard
                d={RC.overviewVotes.no}
                stance="oppose"
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
        </>
      }
    >
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
        <div className="mt-[16px]">
          <Body size="lead">
            Both campaigns accept these points. The gutter closes here
            because nothing on this list is in dispute.
          </Body>
        </div>
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
        {/* Back inside the feed, so the heading, the filters and the add
            button share one row rather than the button sitting under the
            heading it belongs beside. */}
        <TestimonyFeed
          title="Testimony"
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
export function FromTheDiscussions() {
  const d = PROSE.deliberation;
  return (
    <Chapter
      id="discussions"
      question="What came out of the discussions?"
      answer={
        <Span>
          <Body size="lead">{d.body}</Body>
          <p className="font-body text-xs text-ink-muted mt-[8px]">{d.note}</p>
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
      {DELIB_THEMES.map((th) => (
        <div key={th.title}>
          <p className="font-display font-medium text-lg sm:text-xl text-ink mb-[16px]">
            {th.title}
          </p>
          <Span>
            <Label>Where groups agreed</Label>
            <Body>{th.agreed}</Body>
          </Span>
          <div className="mt-[20px]">
            <Split
              left={
                <div>
                  <Label>Where they split</Label>
                  <Body>{th.split}</Body>
                </div>
              }
              right={
                <div>
                  <Label>The trade-off weighed</Label>
                  <Body>{th.tradeoff}</Body>
                </div>
              }
            />
          </div>
        </div>
      ))}
      <Span>
        <Label>Anonymized transcripts</Label>
        {DELIB_TRANSCRIPTS.map((t) => (
          <div key={t.title} className="py-[12px] border-b border-line">
            <p className="font-body font-semibold text-base text-ink">
              {t.title}
            </p>
            <p className="font-body text-sm text-ink-muted">{t.meta}</p>
          </div>
        ))}
      </Span>
    </Chapter>
  );
}

// ---------------------------------------------------------------- 9
export function HowItGotHere() {
  return (
    <Chapter
      id="history"
      question="How did it get here?"
      answer={
        <Span>
          <Synth
            ids={[...PROSE.ballotHistory.ids]}
            prompt={PROSE.ballotHistory.prompt}
          >
            {/* Just the beats. The framing sentence and the original two
                paragraphs are both still in `prose.ts`, as `lead` and
                `paragraphs`, if the chapter wants prose again. */}
            <ul className="flex flex-col gap-[8px]">
              {PROSE.ballotHistory.bullets.map((b) => (
                <li key={b} className="flex gap-[10px]">
                  <span aria-hidden className="text-ink-faint">
                    •
                  </span>
                  <span className="font-body text-lg text-ink-muted leading-[1.5]">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </Synth>
        </Span>
      }
    >
      <Span>
        <Label>Every step, newest first</Label>
        <div className="flex flex-col">
          {BALLOT_TIMELINE.map((m) => (
            <div
              key={m.label}
              className="grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-[6px] sm:gap-[24px] py-[18px] border-b border-line"
            >
              <p className="font-body font-semibold text-xs text-ink-muted pt-[3px]">
                {m.when}
              </p>
              <div>
                <p className="font-display font-medium text-lg text-ink">
                  {m.label}
                </p>
                {m.body && (
                  <p className="font-body text-lg text-ink leading-[1.65] mt-[4px]">
                    {m.body}
                  </p>
                )}
                {m.articles.length > 0 && (
                  <ul className="mt-[10px] flex flex-col gap-[4px]">
                    {m.articles.map((a) => (
                      <li key={a.url}>
                        <a
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group font-body text-sm text-ink-muted hover:text-brand"
                        >
                          <span className="font-semibold">{a.outlet}</span>{" "}
                          {a.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </Span>
      <Span>
        <Label>The same coverage, by topic</Label>
        {COVERAGE_BY_TOPIC.map((t) => (
          <div key={t.topic} className="py-[14px] border-b border-line">
            <p className="font-display font-medium text-lg text-ink mb-[6px]">
              {t.topic}
            </p>
            <ul className="flex flex-col gap-[4px]">
              {t.articles.map((a) => (
                <li key={a.url}>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-ink-muted hover:text-brand"
                  >
                    <span className="font-semibold">{a.outlet}</span> {a.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Span>
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
        <Label>Independent voter guides</Label>
        {VOTER_GUIDES.map((g) => (
          <div key={g.name} className="py-[12px] border-b border-line">
            <p className="font-body font-semibold text-base text-ink">
              {g.name}
            </p>
            <p className="font-body text-sm text-ink-muted">
              {g.publisher} · {g.note}
            </p>
          </div>
        ))}
      </Span>
      {BIBLIOGRAPHY.map((sec) => (
        <Span key={sec.section}>
          <Label>{sec.section}</Label>
          <ul className="flex flex-col">
            {sec.entries.map((e) => (
              <li key={e.url} className="py-[10px] border-b border-line">
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group font-body text-base text-ink hover:text-brand"
                >
                  {e.person ? `${e.person}, ` : ""}
                  <span className={sec.italicTitle ? "italic" : ""}>
                    {e.title}
                  </span>
                </a>
                <p className="font-body text-xs text-ink-muted mt-[2px]">
                  {e.author} · {e.date}
                </p>
              </li>
            ))}
          </ul>
        </Span>
      ))}
    </Chapter>
  );
}
