import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { BALLOT_TIMELINE } from "../../../data/tax-rebate-62f";
import { CoverageArticleRow } from "./CoverageArticleRow";

// The full ballot chronology, newest first. Each milestone carries the
// articles and documents that cover it; the bordered panel marks where MAPLE's
// narration stops and outside material begins.
//
// Collapsed, the card shows the newest milestone whole, with everything that
// covers it. Clipping by milestone rather than by pixel height means no entry
// is ever cut mid-sentence, whatever it contains.
export function BallotTimelineCard() {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? BALLOT_TIMELINE : BALLOT_TIMELINE.slice(0, 1);
  const remaining = BALLOT_TIMELINE.length - shown.length;
  const peek = expanded ? undefined : BALLOT_TIMELINE[shown.length];
  return (
    <div className="bg-surface rounded-control p-[24px] flex flex-col">
      {/* Pins below the hero while the card is in view, then scrolls away with
          it — sticky is bounded by its parent, so the card's own bottom edge
          releases it. Bled out to the card edges so content passes underneath
          rather than beside it. */}
      <h3
        style={{ top: "var(--pinned-h, 0px)" }}
        className="sticky z-[5] -mx-[24px] -mt-[24px] mb-[4px] rounded-t-control bg-surface px-[24px] pt-[24px] pb-[10px] font-body font-normal text-xl text-ink"
      >
        Timeline
      </h3>
      <div className="ml-[6px] pl-[28px] border-l-[2px] border-line space-y-[28px]">
        {shown.map((m) => (
          <div key={m.when + m.label} className="relative">
            <span className="absolute left-[-35px] top-[4px] w-[13px] h-[13px] rounded-full bg-brand" />
            <p className="font-body font-semibold text-2xs text-brand">
              {m.when}
            </p>
            <p className="font-body font-semibold text-lg text-ink mt-[4px]">
              {m.label}
            </p>
            {m.body && (
              <p className="font-body text-base text-ink-muted leading-[1.55] mt-[4px]">
                {m.body}
              </p>
            )}
            {m.articles.length > 0 && (
              <div className="mt-[12px] bg-sunken rounded-panel p-[16px] space-y-[4px]">
                {m.articles.map((a, i) => (
                  <CoverageArticleRow key={a.title + i} a={a} />
                ))}
              </div>
            )}
          </div>
        ))}
        {/* The next milestone clipped so its dot and date read clearly and the
            title is half under the fade: enough to see what is coming without
            it competing with the entry above. */}
        {peek && (
          <div className="relative" aria-hidden="true">
            {/* The dot hangs outside the left edge, so the clip has to sit on an
                inner box or it takes the dot with it. */}
            <span className="absolute left-[-35px] top-[4px] w-[13px] h-[13px] rounded-full bg-brand" />
            <div className="relative h-[32px] overflow-hidden">
              <p className="font-body font-semibold text-2xs text-brand">
                {peek.when}
              </p>
              <p className="font-body font-semibold text-lg text-ink mt-[4px]">
                {peek.label}
              </p>
              <div className="absolute inset-x-0 bottom-0 h-[24px] bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>
          </div>
        )}
      </div>
      {/* Collapsed, it straddles the line where the peek is cut off, and needs
          a stacking order of its own or the absolutely positioned fade washes
          over it. Expanded there is no peek to straddle, so it sits clear of
          the last entry instead. */}
      <div
        className={`relative z-[6] flex justify-center ${
          expanded ? "mt-[24px]" : "-mt-[13px]"
        }`}
      >
        <button
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="inline-flex items-center gap-[5px] bg-surface border border-line-strong text-ink-muted hover:border-ink-faint font-body font-semibold text-xs px-[14px] py-[5px] rounded-pill cursor-pointer"
        >
          {expanded ? "Collapse" : `Expand (+${remaining})`}
          {expanded ? (
            <ChevronUp className="w-[13px] h-[13px]" />
          ) : (
            <ChevronDown className="w-[13px] h-[13px]" />
          )}
        </button>
      </div>
    </div>
  );
}
