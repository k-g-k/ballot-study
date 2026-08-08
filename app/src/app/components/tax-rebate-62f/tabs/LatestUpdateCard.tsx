import { ArrowRight } from "lucide-react";
import { BALLOT_TIMELINE } from "../../../data/tax-rebate-62f";

// Overview's pointer at the newest milestone. Deliberately not the timeline
// card at a smaller height — this shows one item and sends you to the full
// chronology on Coverage & Updates.
export function LatestUpdateCard({
  onOpenUpdates,
}: {
  onOpenUpdates?: () => void;
}) {
  const latest = BALLOT_TIMELINE[0];
  if (!latest) return null;
  return (
    <div className="bg-white rounded-[8px] p-[24px]">
      <div className="flex items-baseline justify-between gap-[16px] mb-[12px]">
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black">
          Latest Update
        </h3>
        <button
          onClick={onOpenUpdates}
          className="inline-flex items-center gap-[4px] font-['Nunito'] font-bold text-[13px] text-[#12266f] hover:text-[#c71e32] cursor-pointer shrink-0"
        >
          View timeline
          <ArrowRight className="w-[13px] h-[13px]" />
        </button>
      </div>
      <div className="border-l-[3px] border-[#12266f] pl-[14px]">
        <p className="font-['Nunito'] font-bold text-[11px] tracking-[0.08em] uppercase text-[#12266f]">
          {latest.when}
        </p>
        <p className="font-['Nunito'] font-bold text-[15px] text-black mt-[4px]">
          {latest.label}
        </p>
        {latest.body && (
          <p className="font-['Nunito'] text-[14px] text-[#808080] leading-[1.55] mt-[4px]">
            {latest.body}
          </p>
        )}
      </div>
    </div>
  );
}
