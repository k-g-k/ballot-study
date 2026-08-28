import { Section } from "../../ballot";
import { BallotHistoryCard } from "../cards/CoverageUpdatesTab";
import { BallotTimelineCard } from "../cards/BallotTimelineCard";
import { CoverageByTopicCard } from "../cards/CoverageByTopicCard";
import { FundingPatternCard, FundingLedgerCard } from "../cards/CampaignFinanceTab";
import { BibliographyTab } from "../cards/BibliographyTab";

// Everything that can be checked: how it reached the ballot, who covered it,
// who is paying for it, and every source the page draws on. The deepest
// chapter, and the last, because almost nobody needs it to decide.
export function TheRecordSection({ onAskMaple }: { onAskMaple?: () => void }) {
  return (
    <Section
      id="the-record"
      title="The record"
      lede="How the question reached the ballot, how it has been covered, who is funding each side, and every source behind this page."
      summary={<BallotHistoryCard />}
    >
      <BallotTimelineCard />
      <CoverageByTopicCard />
      <FundingPatternCard />
      <FundingLedgerCard />
      <BibliographyTab onAskMaple={onAskMaple} />
    </Section>
  );
}
