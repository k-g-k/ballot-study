import {
  SynthSummaryCard,
  Card,
  MediaPhase,
  CitationBlock,
  SynthSourcesNote,
  RefGroup,
} from "../../ballot";
import { RC } from "../../../data/tax-rebate-62f";
import type { PageVariant } from "../tabs";
import { BallotCoveragePathCard } from "./BallotCoveragePathCard";
// import { CoverageByTopicCard } from "./CoverageByTopicCard";

// Media Coverage tab — an AI synthesis of coverage plus a phase-grouped
// timeline rendered from RC.mediaPhases. On the Grace variant ("Ballot
// Coverage") it swaps the AI synthesis + timeline + Media card for the
// Coverage Timeline and Coverage by Topic cards.
export function MediaCoverageTab({
  variant = "matt",
}: {
  variant?: PageVariant;
}) {
  return (
    <div className="flex flex-col gap-[16px]">
      {variant === "grace" && (
        <SynthSummaryCard
          title="Context and History"
          ids={[
            "wburSigs",
            "cwbRecord",
            "masslive62F",
            "wgbhAnalysts",
            "massBudget",
            "mtfPosition",
            "maoBrief",
            "polityPoll",
            "ocpf",
          ]}
          prompt="Summarize the media, official, advocacy, polling, and campaign-finance coverage of the 62F reform ballot question into a single overview: what the measure does, how each side frames it, the legislative reaction, public opinion, and the funding picture. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
        >
          <p>
            The measure would amend Massachusetts' Chapter 62F law to
            significantly increase the frequency of taxpayer refunds, reaching
            the 2026 ballot amid a record number of proposals. Supporters,
            including the sponsoring campaign, business groups, and fiscal
            conservatives, argue it fulfills promises to return over-collected
            taxes. Opponents, including budget analysts, unions, and fiscal
            watchdogs, warn it would reduce the state budget, threaten funding
            for schools and transportation, and favor high earners with the
            largest refunds. Lawmakers opposed it, claiming it benefits special
            interests. Polls show strong public support for more frequent
            refunds, and campaign filings reveal a well-funded, primarily
            in-kind campaign backing the measure, against an opposition that has
            not reported any campaign fundraising.
          </p>
        </SynthSummaryCard>
      )}
      {variant !== "grace" && (
        <SynthSummaryCard
          title="AI Synthesis of Coverage"
          ids={["masslive62F", "wgbhAnalysts", "wburSigs", "cwbBoogeyman"]}
          prompt="Summarize Massachusetts media coverage of the 62F reform ballot question: the major phases, dominant narratives, and any figures that are contested across outlets. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
        >
          <p>
            Coverage has moved through several phases: the November 2025
            signature drive and certification, the February 2026 legislative
            pushback that branded the tax questions "special interest" measures,
            and a March 2026 round of analyst debate over whether recalculating
            the cap would improve competitiveness or destabilize the state
            budget. The competing framings — more frequent taxpayer refunds
            versus unpredictable budget cuts — recur across outlets.
          </p>
        </SynthSummaryCard>
      )}

      {variant === "grace" ? (
        <BallotCoveragePathCard />
      ) : (
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
      )}

      {/* Parked — Coverage by Topic, previously shown here on the Grace variant.
          Restore by uncommenting this and its import above.
      {variant === "grace" && <CoverageByTopicCard />}
      */}

      {variant !== "grace" && (
        <Card
          title="Media"
          subtitle="Confirmed articles cited on this page, grouped by coverage focus."
        >
          <div className="space-y-[20px]">
            <CitationBlock kind="ai">
              <p className="font-['Nunito'] text-[14px] text-black leading-[1.6]">
                Coverage has tracked the measure from the November 2025
                signature filing through certification, the February 2026
                legislative pushback that branded the tax questions 'special
                interest' measures, and a March 2026 round of analyst debate
                over whether the change would improve competitiveness or
                destabilize the budget. Polling coverage found lopsided
                support for the general idea of more frequent refunds, while
                campaign-finance reporting described the largely in-kind
                support behind the YES committee and the absence of reported
                opposition spending in the first window.
              </p>
              <SynthSourcesNote
                ids={[
                  "wburSigs",
                  "cwbRecord",
                  "masslive62F",
                  "cwbBoogeyman",
                  "wgbhAnalysts",
                  "massBudget",
                  "polityPoll",
                  "ocpf",
                ]}
                prompt="Summarize how confirmed media coverage of the 62F reform question developed across the campaign — the signature drive, legislative pushback, the analyst debate, polling, and campaign finance. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
              />
            </CitationBlock>
            <RefGroup
              title="Campaign & Ballot Path"
              ids={["wburSigs", "cwbRecord", "wburPreview"]}
            />
            <RefGroup
              title="The Fiscal Debate"
              ids={["masslive62F", "cwbBoogeyman", "wgbhAnalysts"]}
            />
            <RefGroup title="Polling" ids={["polityPoll"]} />
            <RefGroup title="Campaign Finance" ids={["ocpf"]} />
          </div>
        </Card>
      )}
    </div>
  );
}
