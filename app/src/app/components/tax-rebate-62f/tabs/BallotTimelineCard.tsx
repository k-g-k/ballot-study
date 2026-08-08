import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { BALLOT_TIMELINE } from "../../../data/tax-rebate-62f";
import { CoverageArticleRow } from "./CoverageArticleRow";

// The full ballot chronology, newest first. Each milestone carries the
// articles and documents that cover it; the bordered panel marks where MAPLE's
// narration stops and outside material begins.
//
// Collapsed, the card clips to roughly three milestones so the newest run of
// events is readable and there is visibly more behind the fade.
const COLLAPSED_HEIGHT = 880;

export function BallotTimelineCard() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      style={expanded ? undefined : { height: COLLAPSED_HEIGHT }}
      className="bg-white rounded-[8px] p-[24px] flex flex-col min-h-0"
    >
      {/* Pins below the hero while the card is in view, then scrolls away with
          it — sticky is bounded by its parent, so the card's own bottom edge
          releases it. Bled out to the card edges so content passes underneath
          rather than beside it. */}
      <h3
        style={{ top: "var(--hero-h, 0px)" }}
        className="sticky z-[5] -mx-[24px] -mt-[24px] mb-[4px] rounded-t-[8px] bg-white px-[24px] pt-[24px] pb-[10px] font-['Nunito'] font-normal text-[18px] text-black"
      >
        Timeline
      </h3>
      <div
        className={`flex-1 min-h-0 relative ${expanded ? "" : "overflow-hidden"}`}
      >
        <div className="ml-[6px] pl-[28px] border-l-[2px] border-[#e5e7eb] space-y-[28px]">
          {BALLOT_TIMELINE.map((m) => (
            <div key={m.when + m.label} className="relative">
              <span className="absolute left-[-35px] top-[4px] w-[13px] h-[13px] rounded-full bg-[#12266f]" />
              <p className="font-['Nunito'] font-bold text-[11px] tracking-[0.08em] uppercase text-[#12266f]">
                {m.when}
              </p>
              <p className="font-['Nunito'] font-bold text-[15px] text-black mt-[4px]">
                {m.label}
              </p>
              {m.body && (
                <p className="font-['Nunito'] text-[14px] text-[#808080] leading-[1.55] mt-[4px]">
                  {m.body}
                </p>
              )}
              {m.articles.length > 0 && (
                <div className="mt-[12px] bg-[#fafafa] rounded-[10px] p-[16px] space-y-[4px]">
                  {m.articles.map((a, i) => (
                    <CoverageArticleRow key={a.title + i} a={a} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {!expanded && (
          <div className="absolute inset-x-0 bottom-0 h-[56px] bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>
      <div className="flex justify-center pt-[10px]">
        <button
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="inline-flex items-center gap-[5px] bg-white border border-[#d1d1d1] text-[#606060] hover:border-[#a0a0a0] font-['Nunito'] font-semibold text-[12px] px-[14px] py-[5px] rounded-[100px] cursor-pointer"
        >
          {expanded ? "Collapse" : "Expand"}
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
