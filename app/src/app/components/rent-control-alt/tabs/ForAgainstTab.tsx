import {
  Card,
  ArgColumn,
  ClaimMap,
  SynthSourcesNote,
  SynthSummaryCard,
} from "../../ballot";
import { RC, ARG_FILTER_IDS } from "../../../data/rent-control";

// Shared bullet list for the analysis cards below.
function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-outside pl-[18px] space-y-[4px] font-['Nunito'] text-[14px] text-black leading-[1.55]">
      {items.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  );
}

// Consensus / disagreement / open questions — each its own AI-synthesis card
// with its own prompt + sources.
function ConsensusCard() {
  return (
    <SynthSummaryCard
      title="Areas of Consensus"
      ids={["petition", "ballotpedia", "mapleTestimony"]}
      prompt="Identify the points supporters and opponents of the rent-control ballot question agree on, across testimony, research, and the official text. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
    >
      <Bullets items={RC.consensus} />
    </SynthSummaryCard>
  );
}

function DisagreementCard() {
  return (
    <SynthSummaryCard
      title="Areas of Disagreement"
      ids={["academicResearch", "housingForMA", "mapleTestimony"]}
      prompt="Identify the points supporters and opponents of the rent-control ballot question most disagree on, across testimony and research. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
    >
      <Bullets items={RC.disagreement} />
    </SynthSummaryCard>
  );
}

function OpenQuestionsCard() {
  return (
    <SynthSummaryCard
      title="Open Questions"
      ids={["academicResearch", "petition", "q9"]}
      prompt="Identify the open questions about the rent-control measure that the available evidence can't yet answer — legal, market, and fiscal. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
    >
      <Bullets items={RC.openQuestions} />
    </SynthSummaryCard>
  );
}

// Two-column YES / NO argument glance with a single AI-synthesis attribution
// row below.
function ArgumentsAtAGlanceCard() {
  return (
    <Card
      title="Arguments at a Glance"
      subtitle="Synthesized from supporter and opponent positions."
    >
      <div className="flex gap-[16px] max-lg:flex-col">
        <ArgColumn title="YES Arguments" args={RC.yesArgs} />
        <div className="w-[1px] bg-[#e5e7eb] shrink-0 max-lg:hidden" />
        <ArgColumn title="NO Arguments" args={RC.noArgs} />
      </div>
      <div className="mt-[16px]">
        <SynthSourcesNote
          ids={ARG_FILTER_IDS.all}
          prompt="Synthesize the strongest and most common points for and against the rent-control ballot question from the cited sources, sorting each point by the side it supports — regardless of the speaker's declared position. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
        />
      </div>
    </Card>
  );
}

export function ForAgainstTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <ConsensusCard />
      <ArgumentsAtAGlanceCard />
      <DisagreementCard />
      <OpenQuestionsCard />
      <Card
        title="Claim Mapping"
        subtitle="Checkable claims pulled from the arguments above, each marked verified or attributed."
      >
        <ClaimMap rows={RC.claims} />
      </Card>
    </div>
  );
}
