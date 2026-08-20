import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import {
  Card,
  CitationBlock,
  SynthSourcesNote,
} from "../../ballot";
import { RC, SOURCES } from "../../../data/tax-rebate-62f";
import { VoteCard } from "../vote-card";
import type { StanceFilter } from "../testimony";
import { VoterGuidesCard } from "./VoterGuidesCard";
// import { LatestUpdateCard } from "./LatestUpdateCard";
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
  // The Yes and No summaries are different lengths, so the taller one sets the
  // height of both. Re-measured on width change, since that is what alters how
  // many lines each wraps to.
  const votesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = votesRef.current;
    if (!el) return;
    let lastWidth = 0;
    const measure = () => {
      const ps = el.querySelectorAll<HTMLElement>("[data-vote-summary]");
      ps.forEach((p) => (p.style.minHeight = "0px"));
      let tallest = 0;
      ps.forEach((p) => (tallest = Math.max(tallest, p.offsetHeight)));
      ps.forEach((p) => (p.style.minHeight = `${tallest}px`));
    };
    measure();
    const observer = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w === lastWidth) return;
      lastWidth = w;
      measure();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  // Used by both summary cards below: beside the AI sources note in one,
  // standing in for the source line in the other.
  const officialSummaryLink = (
    <a
      href={SOURCES.agSummary.url}
      target="_blank"
      rel="noopener noreferrer"
      /* Official-info blue rather than the page's link navy: the colour is
         carrying provenance here, not just marking it as a link. */
      className="inline-flex items-center gap-[4px] font-['Nunito'] font-semibold text-[13px] underline decoration-dotted underline-offset-[4px] text-[#1d4ed8] hover:text-[#1e3a8a]"
    >
      View Official Summary
      <ExternalLink className="w-[12px] h-[12px]" />
    </a>
  );
  return (
    <div className="flex flex-col gap-[16px]">
      <Card title="Summary of Initiative">
        <CitationBlock kind="ai">
          <p className="font-['Nunito'] text-[14px] text-black leading-[1.6]">
{RC.overviewSummary}
          </p>
          <SynthSourcesNote
            ids={["petition", "chapter62F", "ballotpedia"]}
            prompt="Summarize Petition No. 25-17 in plain language for a general audience: what the measure changes about the Chapter 62F revenue cap, how the surtax carve-in works, and how the two campaigns frame it. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
            extra={officialSummaryLink}
          />
        </CitationBlock>
      </Card>

      {/* Yes / No comparison — organizers, funding, testifying orgs, official statements */}
      <div ref={votesRef} className="flex gap-[16px]">
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

      <VoterGuidesCard />

      {/* Commenting this out for now but we might consider adding it back in
          if we want to show the latest developments. */}
      {/* <LatestUpdateCard onOpenUpdates={onOpenUpdates} /> */}

      <NextStepCard
        title="Read the arguments"
        body="What supporters and opponents say, where they agree, who it affects, and what it would cost."
        action="Context & Arguments"
        onClick={onOpenArguments}
      />
    </div>
  );
}
