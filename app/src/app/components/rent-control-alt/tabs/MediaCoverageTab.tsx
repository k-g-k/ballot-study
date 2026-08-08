import { SynthSummaryCard, Card, MediaPhase } from "../../ballot";
import { RC } from "../../../data/rent-control";

// Not currently routed (the Media Coverage tab is disabled in tabs.ts), kept
// available.
export function MediaCoverageTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <SynthSummaryCard
        title="AI Synthesis of Coverage"
        ids={["tuftsGlobe", "cwbCompromise", "cbsSigs", "healeyGlobe"]}
        prompt="Summarize Massachusetts media coverage of the rent-control ballot question: the major phases, dominant narratives, and any figures that are contested across outlets. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
      >
        <p>
          Coverage has moved through several phases: the signature drive and
          early polling, Gov. Healey's opposition, the dispute over the
          GBREB-commissioned Tufts fiscal study, and the June compromise talks.
          The 6–9% tax-base figure recurs across coverage and traces to a single
          industry-commissioned report.
        </p>
      </SynthSummaryCard>

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
    </div>
  );
}
