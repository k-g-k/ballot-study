import { Section } from "../../ballot";
import { WhatHappensCard, WhoIsImpactedCard, FiscalCard } from "../cards/BackgroundTab";
import { VoterGuidesCard } from "../cards/VoterGuidesCard";

// The mechanics, once a reader has decided they want them: who it lands on,
// what it costs, and what actually happens the day after it passes.
export function WhatItDoesSection() {
  return (
    <Section
      id="what-it-does"
      title="What it does"
      lede="How the change works in practice, who it affects, and what it would cost."
      summary={<WhatHappensCard />}
    >
      <WhoIsImpactedCard />
      <FiscalCard />
      <VoterGuidesCard />
    </Section>
  );
}
