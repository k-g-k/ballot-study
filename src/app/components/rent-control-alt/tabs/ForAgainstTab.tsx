import { useState } from "react";
import {
  Card,
  ArgColumn,
  ClaimMap,
  SynthSourcesNote,
  AnalysisSection,
  FilterChip,
  type ArgFilter,
} from "../../ballot";
import { RC, ARG_FILTERS, ARG_FILTER_IDS } from "../../../data/rent-control";

// Consensus / disagreement / open-questions, each a purple synthesis block,
// with a single shared attribution at the bottom.
function AnalysisOpenQuestionsCard() {
  const Bullets = ({ items }: { items: string[] }) => (
    <ul className="list-disc list-outside pl-[18px] space-y-[4px] font-['Nunito'] text-[14px] text-black leading-[1.55]">
      {items.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  );
  return (
    <Card title="Analysis & Open Questions">
      <div className="space-y-[16px]">
        <AnalysisSection title="Areas of Consensus">
          <Bullets items={RC.consensus} />
        </AnalysisSection>
        <AnalysisSection title="Areas of Disagreement">
          <Bullets items={RC.disagreement} />
        </AnalysisSection>
        <AnalysisSection title="Open Questions">
          <Bullets items={RC.openQuestions} />
        </AnalysisSection>
      </div>
      {/* One shared attribution for all three sections. */}
      <SynthSourcesNote
        ids={["academicResearch", "mapleTestimony", "petition", "ballotpedia"]}
        prompt="Identify the points supporters and opponents of the rent-control ballot question agree on, the points they most disagree on, and the open questions the available evidence can't yet answer — across testimony, research, and the official text. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
      />
    </Card>
  );
}

export function ForAgainstTab() {
  const [argFilter, setArgFilter] = useState<ArgFilter>("all");
  const hasArgs =
    (argFilter === "all"
      ? RC.yesArgs.length + RC.noArgs.length
      : RC.argsBySource[argFilter].yes.length +
        RC.argsBySource[argFilter].no.length) > 0;
  return (
    <div className="flex flex-col gap-[16px]">
      {/* Arguments — two-column glance format, purple bars; one AI-synthesis
          attribution row below all sections. */}
      <Card
        title="Arguments at a Glance"
        subtitle="Synthesized from supporter and opponent positions."
      >
        <div className="flex items-center gap-[6px] flex-wrap mb-[16px]">
          {ARG_FILTERS.map(({ id, label }) => (
            <FilterChip
              key={id}
              active={argFilter === id}
              onClick={() => setArgFilter(id)}
            >
              {label}
            </FilterChip>
          ))}
        </div>
        <div className="flex gap-[16px] max-lg:flex-col">
          <ArgColumn
            title="YES Arguments"
            args={argFilter === "all" ? RC.yesArgs : RC.argsBySource[argFilter].yes}
          />
          <div className="w-[1px] bg-[#e5e7eb] shrink-0 max-lg:hidden" />
          <ArgColumn
            title="NO Arguments"
            args={argFilter === "all" ? RC.noArgs : RC.argsBySource[argFilter].no}
          />
        </div>
        {/* No attribution when the selected source type has no arguments. */}
        {hasArgs && (
          <div className="mt-[16px]">
            <SynthSourcesNote
              ids={ARG_FILTER_IDS[argFilter]}
              prompt="Synthesize the strongest and most common points for and against the rent-control ballot question from the cited sources, sorting each point by the side it supports — regardless of the speaker's declared position. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
            />
          </div>
        )}
      </Card>

      <AnalysisOpenQuestionsCard />

      <Card
        title="Claim Mapping"
        subtitle="Checkable claims pulled from the arguments above, each marked verified or attributed."
      >
        <ClaimMap rows={RC.claims} />
      </Card>
    </div>
  );
}
