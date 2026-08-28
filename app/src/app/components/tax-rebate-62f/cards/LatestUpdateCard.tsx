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
    <div className="bg-surface rounded-control p-[24px]">
      <div className="flex items-baseline justify-between gap-[16px] mb-[12px]">
        <h3 className="font-body font-normal text-xl text-ink">
          Latest Update
        </h3>
        <button
          onClick={onOpenUpdates}
          className="inline-flex items-center gap-[4px] font-body font-semibold text-sm text-brand hover:text-alert cursor-pointer shrink-0"
        >
          View timeline
          <ArrowRight className="w-[13px] h-[13px]" />
        </button>
      </div>
      {/* Same rule and dot as the full timeline, so one milestone here reads as
          a slice of the chronology it links to. */}
      <div className="ml-[6px] pl-[28px] border-l-[2px] border-line">
        <div className="relative">
          <span className="absolute left-[-35px] top-[4px] w-[13px] h-[13px] rounded-full bg-brand" />
          <p className="font-body font-semibold text-2xs text-brand">
            {latest.when}
          </p>
          <p className="font-body font-semibold text-lg text-ink mt-[4px]">
            {latest.label}
          </p>
          {latest.body && (
            <p className="font-body text-base text-ink-muted leading-[1.55] mt-[4px]">
              {latest.body}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
