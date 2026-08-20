import { ArrowRight } from "lucide-react";

// Hand-off at the foot of a tab. Deliberately not a white Card — it sits on the
// page background with a hairline border so it reads as a way out rather than
// one more piece of content to read. The whole card is the click target; the
// circle is a visual affordance, not a separate control.
export function NextStepCard({
  eyebrow = "Next",
  title,
  body,
  action,
  onClick,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  action: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={action}
      className="group w-full text-left rounded-[8px] border border-[#dee2e6] bg-[#f9fafc] px-[24px] py-[20px] flex items-center justify-between gap-[24px] cursor-pointer transition-colors hover:bg-[#f1f4f9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12266f]"
    >
      <span className="min-w-0">
        <span className="block font-['Nunito'] font-bold text-[11px] tracking-[0.08em] uppercase text-[#64758b]">
          {eyebrow}
        </span>
        <span className="block font-['Nunito'] font-bold text-[16px] text-black mt-[4px]">
          {title}
        </span>
        <span className="block font-['Nunito'] text-[13px] text-[#606060] leading-[1.5] mt-[2px]">
          {body}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="shrink-0 inline-flex items-center justify-center w-[40px] h-[40px] bg-[#12266f] text-white rounded-full transition-colors group-hover:bg-[#0d1c52]"
      >
        <ArrowRight className="w-[18px] h-[18px]" />
      </span>
    </button>
  );
}
