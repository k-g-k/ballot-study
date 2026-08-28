import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Card, CitationBlock, SynthSourcesNote } from "../../ballot";
import { RC, SOURCES } from "../../../data/tax-rebate-62f";
import { VoteCard } from "../vote-card";
import type { StanceFilter } from "../testimony";

// Official-info blue rather than the page's link navy: the colour is carrying
// provenance here, not just marking it as a link.
const officialSummaryLink = (
  <a
    href={SOURCES.agSummary.url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-[4px] font-body font-semibold text-sm underline decoration-dotted underline-offset-[4px] text-official-ink hover:text-official"
  >
    View official summary
    <ExternalLink className="w-[12px] h-[12px]" />
  </a>
);

// The plain-language answer to "what is this". The one thing a reader in a
// hurry should be left with.
export function SummaryOfInitiativeCard() {
  return (
    <Card title="Summary of initiative">
      <CitationBlock kind="ai">
        <p className="font-body text-base text-ink leading-[1.6]">
          {RC.overviewSummary}
        </p>
        <SynthSourcesNote
          ids={["petition", "chapter62F", "ballotpedia"]}
          prompt="Summarize Petition No. 25-17 in plain language for a general audience: what the measure changes about the Chapter 62F revenue cap, how the surtax carve-in works, and how the two campaigns frame it. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
          extra={officialSummaryLink}
        />
      </CitationBlock>
    </Card>
  );
}

// The two sides side by side: organizers, funding, testifying orgs, official
// statements.
export function VoteComparison({
  onOpenFinance,
  onViewTestimony,
}: {
  onOpenFinance?: () => void;
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
  return (
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
  );
}
