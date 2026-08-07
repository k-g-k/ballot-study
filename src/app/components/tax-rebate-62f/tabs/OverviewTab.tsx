import { ExternalLink } from "lucide-react";
import { SynthSummaryCard, Card } from "../../ballot";
import { RC, SOURCES } from "../../../data/tax-rebate-62f";
import { VoteCard } from "../vote-card";
import { FollowedTestimonyCard, type StanceFilter } from "../testimony";
import type { PageVariant } from "../tabs";
import { WhatHappensCard, WhoIsImpactedCard, FiscalCard } from "./BackgroundTab";
import { VoterGuidesCard } from "./VoterGuidesCard";

export function OverviewTab({
  variant = "matt",
  onOpenFinance,
  onViewTestimony,
}: {
  variant?: PageVariant;
  onOpenFinance?: () => void;
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

      {/* Grace-only: measure-context cards mirrored from the Background tab. */}
      {variant === "grace" && (
        <>
          <VoterGuidesCard />
          <WhatHappensCard />
          <WhoIsImpactedCard />
          <FiscalCard />
        </>
      )}

      {/* Featured testimony from followed accounts — also on Public Perspectives. */}
      <FollowedTestimonyCard />

      <Card title="Still deciding? Ask MAPLE about this measure">
        <p className="font-['Nunito'] text-[14px] text-black leading-[1.6]">
          Ask a plain question —{" "}
          <span className="italic">
            "If the state runs a surplus next year, would I actually get a refund
            under this?"
          </span>{" "}
          — here on the page or through your own AI assistant. Answers draw only
          from the sources on this page and cite them.
        </p>
        <div className="flex items-center gap-[20px] mt-[16px] flex-wrap">
          <button className="bg-white border-[1.5px] border-[#12266f] text-[#12266f] font-['Nunito'] font-bold text-[13px] px-[20px] py-[8px] rounded-[100px] cursor-pointer hover:bg-[rgba(232,239,255,0.4)]">
            Ask on MAPLE
          </button>
          <button className="font-['Nunito'] font-bold text-[13px] text-[#12266f] hover:text-[#c71e32] underline underline-offset-[4px] cursor-pointer">
            Connect your assistant (MCP) →
          </button>
        </div>
      </Card>
    </div>
  );
}
