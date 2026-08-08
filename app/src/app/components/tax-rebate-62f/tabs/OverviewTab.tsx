import { ExternalLink } from "lucide-react";
import { SynthSummaryCard } from "../../ballot";
import { RC, SOURCES } from "../../../data/tax-rebate-62f";
import { VoteCard } from "../vote-card";
import { FollowedTestimonyCard, type StanceFilter } from "../testimony";
import { VoterGuidesCard } from "./VoterGuidesCard";
import { LatestUpdateCard } from "./LatestUpdateCard";
import { NextStepCard } from "./NextStepCard";

export function OverviewTab({
  onOpenFinance,
  onOpenUpdates,
  onOpenArguments,
  onViewTestimony,
}: {
  onOpenFinance?: () => void;
  onOpenUpdates?: () => void;
  onOpenArguments?: () => void;
  onViewTestimony?: (stance: StanceFilter) => void;
}) {
  return (
    <div className="flex flex-col gap-[16px]">
      <SynthSummaryCard
        title="Summary of Initiative"
        ids={["petition", "chapter62F", "ballotpedia"]}
        prompt="Summarize Petition No. 25-17 in plain language for a general audience: what the measure changes about the Chapter 62F revenue cap, how the surtax carve-in works, and how the two campaigns frame it. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
        extra={
          <a
            href={SOURCES.agSummary.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[4px] font-['Nunito'] font-semibold text-[13px] underline decoration-dotted underline-offset-[4px] text-[#1d4ed8] hover:text-[#1e3a8a]"
          >
            View Official Summary
            <ExternalLink className="w-[12px] h-[12px]" />
          </a>
        }
      >
        <p>{RC.overviewSummary}</p>
      </SynthSummaryCard>

      {/* Yes / No comparison — organizers, funding, testifying orgs, official statements */}
      <div className="flex gap-[16px] max-lg:flex-col">
        <VoteCard
          d={RC.overviewVotes.yes}
          onOpenFinance={onOpenFinance}
          onViewTestimony={() => onViewTestimony?.("endorsing")}
        />
        <VoteCard
          d={RC.overviewVotes.no}
          onOpenFinance={onOpenFinance}
          onViewTestimony={() => onViewTestimony?.("opposing")}
        />
      </div>

      <LatestUpdateCard onOpenUpdates={onOpenUpdates} />

      {/* Featured testimony from followed accounts — also on Public Perspectives. */}
      <FollowedTestimonyCard />

      <VoterGuidesCard />

      <NextStepCard
        title="Read the arguments"
        body="What supporters and opponents say, where they agree, who it affects, and what it would cost."
        action="Context & Arguments"
        onClick={onOpenArguments}
      />
    </div>
  );
}
