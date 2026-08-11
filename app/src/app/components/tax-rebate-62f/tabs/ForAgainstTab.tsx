import {
  Card,
  ArgColumn,
  SynthSourcesNote,
  SynthSummaryCard,
} from "../../ballot";
import { RC, ARG_FILTER_IDS } from "../../../data/tax-rebate-62f";
import {
  WhoIsImpactedCard,
  FiscalCard,
  WhatHappensCard,
} from "./BackgroundTab";
import { NextStepCard } from "./NextStepCard";

export function SummaryCard() {
  return (
    <SynthSummaryCard
      title="Arguments at a Glance"
      ids={["petition", "maoBrief", "massBudget", "mtfPosition", "masslive62F"]}
      prompt="Summarize what the 62F reform measure would do and how each side frames it. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
    >
      <p>
        The measure would amend Massachusetts' Chapter 62F law to significantly
        increase the frequency of taxpayer refunds. Supporters, including the
        sponsoring campaign, business groups, and fiscal conservatives, argue it
        fulfills promises to return over-collected taxes. Opponents, including
        budget analysts, unions, and fiscal watchdogs, warn it would reduce the
        state budget, threaten funding for schools and transportation, and favor
        high earners with the largest refunds.
      </p>
    </SynthSummaryCard>
  );
}

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

export function ArgumentsAtAGlanceCard() {
  return (
    <Card title="Key Arguments" stickyTop="var(--hero-h, 0px)">
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

export function ForAgainstTab({ onNext }: { onNext?: () => void }) {
  return (
    <div className="flex flex-col gap-[16px]">
      <SummaryCard />
      <ArgumentsAtAGlanceCard />
      <ConsensusCard />
      <DisagreementCard />
      <WhoIsImpactedCard />
      <FiscalCard />
      <WhatHappensCard />
      <NextStepCard
        title="See what people are saying"
        body="Testimony submitted to MAPLE by organizations, officials, and residents, plus notes from live citizen discussions."
        action="Public Perspectives"
        onClick={onNext}
      />
    </div>
  );
}
