import { SynthSummaryCard } from "../../ballot";
import { BallotTimelineCard } from "./BallotTimelineCard";
import { CoverageByTopicCard } from "./CoverageByTopicCard";
import { NextStepCard } from "./NextStepCard";

// Coverage — a synthesis of how the measure reached the ballot, the full
// timeline unclipped, and the same coverage regrouped by topic.
export function CoverageUpdatesTab({ onNext }: { onNext?: () => void }) {
  return (
    <div className="flex flex-col gap-[16px]">
      <SynthSummaryCard
        title="Ballot History"
        ids={[
          "petition",
          "ballotpedia",
          "h5006",
          "masslive62F",
          "wgbhAnalysts",
          "globeTaxCutOff",
          "secBallotNumbers",
          "cwbSenateRepeal",
        ]}
        prompt="Summarize how Petition No. 25-17 reached the November 2026 ballot: filing, certification, signature rounds, legislative review, the court rulings, numbering, and the current legislative threat. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
      >
        <p>
          The petition to make taxpayer refunds more frequent was filed in
          August 2025 and certified in December 2025 after gathering 85,588
          first-round signatures. Supporters argue it restores a taxpayer refund
          guarantee that has been quietly eroded, while opponents warn it would
          shrink the state budget and send the largest refunds to the highest
          earners.
        </p>
        <p>
          The measure entered the Legislature as House Bill 5006 in February
          2026, where leaders labeled it a special-interest measure and let the
          May deadline pass without enacting it, sending supporters back out to
          gather a second round of signatures. After clearing the second-round
          threshold of 12,429 signatures, the ballot initiative was certified
          and numbered Question 5 on July 21.
        </p>
      </SynthSummaryCard>

      <BallotTimelineCard />
      <CoverageByTopicCard />
      <NextStepCard
        title="Dig into campaign finance"
        body="The filings behind it show what each committee has raised and spent, and who is funding them."
        action="Campaign Finance"
        onClick={onNext}
      />
    </div>
  );
}
