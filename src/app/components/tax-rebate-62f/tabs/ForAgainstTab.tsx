import {
  Card,
  ArgColumn,
  SynthSourcesNote,
  SynthSummaryCard,
} from "../../ballot";
import { RC, ARG_FILTER_IDS } from "../../../data/tax-rebate-62f";

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
export function ConsensusCard() {
  return (
    <SynthSummaryCard
      title="Areas of Consensus"
      ids={["petition", "ballotpedia", "mapleTestimony"]}
      prompt="Identify the points supporters and opponents of the 62F reform question agree on, across testimony, fiscal analysis, and the official text. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
    >
      <Bullets items={RC.consensus} />
    </SynthSummaryCard>
  );
}

export function DisagreementCard() {
  return (
    <SynthSummaryCard
      title="Areas of Disagreement"
      ids={["maoBrief", "massBudget", "mapleTestimony"]}
      prompt="Identify the points supporters and opponents of the 62F reform question most disagree on, across testimony and fiscal analysis. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
    >
      <Bullets items={RC.disagreement} />
    </SynthSummaryCard>
  );
}

export function OpenQuestionsCard() {
  return (
    <SynthSummaryCard
      title="Open Questions"
      ids={["massBudget", "petition", "fairShare"]}
      prompt="Identify the open questions about the 62F reform that the available evidence can't yet answer — legal, fiscal, and procedural. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
    >
      <Bullets items={RC.openQuestions} />
    </SynthSummaryCard>
  );
}

export function ArgumentsAtAGlanceCard() {
  return (
    <Card
      title="Arguments at a Glance"
      subtitle="Synthesized from the ballot petition, both campaign committees, independent analyses, and testimony submitted to MAPLE."
    >
      <div className="flex gap-[24px] max-lg:flex-col">
        <ArgColumn title="YES Arguments" args={RC.yesArgs} />
        <ArgColumn title="NO Arguments" args={RC.noArgs} />
      </div>
      <div className="mt-[16px]">
        <SynthSourcesNote
          ids={ARG_FILTER_IDS.all}
          prompt="Synthesize the strongest and most common points for and against the 62F reform question from the cited sources, sorting each point by the side it supports — regardless of the speaker's declared position. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
        />
      </div>
    </Card>
  );
}

export function ForAgainstTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <ArgumentsAtAGlanceCard />
      <ConsensusCard />
      <DisagreementCard />
      <OpenQuestionsCard />
    </div>
  );
}
