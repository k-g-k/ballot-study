import { Section } from "../../ballot";
import {
  SummaryCard,
  ArgumentsAtAGlanceCard,
  ConsensusCard,
  DisagreementCard,
} from "../cards/ForAgainstTab";

// Both cases, then the parts that are genuinely settled and the parts that are
// not. Consensus comes before disagreement on purpose: a reader who stops early
// should leave knowing the two sides agree on something.
export function ArgumentsSection() {
  return (
    <Section
      id="arguments"
      title="What people argue"
      lede="The case on each side, where they agree, and where they do not."
      summary={<SummaryCard />}
    >
      <ArgumentsAtAGlanceCard />
      <ConsensusCard />
      <DisagreementCard />
    </Section>
  );
}
