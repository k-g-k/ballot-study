import { SynthSummaryCard } from "../../ballot";

// How the measure reached the ballot.
export function BallotHistoryCard() {
  return (
    <SynthSummaryCard
        title="Ballot history"
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
  );
}
