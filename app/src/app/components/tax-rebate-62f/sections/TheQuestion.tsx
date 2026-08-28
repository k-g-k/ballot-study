import { Section } from "../../ballot";
import { SummaryOfInitiativeCard, VoteComparison } from "../cards/OverviewTab";
import type { StanceFilter } from "../testimony";

// Where a reader with sixty seconds should be able to stop. The synthesis says
// what the measure is; the two vote cards say what each choice would mean.
export function TheQuestionSection({
  onOpenFinance,
  onViewTestimony,
}: {
  onOpenFinance?: () => void;
  onViewTestimony?: (stance: StanceFilter) => void;
}) {
  return (
    <Section
      id="the-question"
      title="The question"
      lede="What Question 5 would change, and what each vote would mean."
      summary={<SummaryOfInitiativeCard />}
    >
      <VoteComparison
        onOpenFinance={onOpenFinance}
        onViewTestimony={onViewTestimony}
      />
    </Section>
  );
}
