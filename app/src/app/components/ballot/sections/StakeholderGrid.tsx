import type { Stakeholder, StakeholderImpact } from "../types";

const IMPACT_BADGE: Record<
  StakeholderImpact,
  { bg: string; tx: string; label: string }
> = {
  benefits: { bg: "bg-[#dcfce7]", tx: "text-[#166534]", label: "BENEFITS" },
  cost: { bg: "bg-[#fee2e2]", tx: "text-[#991b1b]", label: "BEARS COST" },
  neutral: {
    bg: "bg-[#f0f0f0]",
    tx: "text-[#606060]",
    label: "EXEMPT / NEUTRAL",
  },
};

// Per-group impact tiles — who benefits, who bears cost, who is exempt.
export function StakeholderGrid({ rows }: { rows: Stakeholder[] }) {
  return (
    <div className="grid grid-cols-2 gap-[10px]">
      {rows.map((s) => {
        const badge = IMPACT_BADGE[s.impact];
        return (
          <div
            key={s.group}
            className="border border-[#e5e7eb] rounded-[6px] p-[12px]"
          >
            <div className="flex items-start justify-between gap-[8px] mb-[6px]">
              <p className="font-['Nunito'] font-semibold text-[13px] text-black">
                {s.group}
              </p>
              <span
                className={`shrink-0 font-['Nunito'] font-bold text-[10px] tracking-[0.08em] px-[8px] py-[2px] rounded-[100px] ${badge.bg} ${badge.tx}`}
              >
                {badge.label}
              </span>
            </div>
            <p className="font-['Nunito'] text-[13px] text-[#334156] leading-[1.5]">
              {s.disputed && "⚠ "}
              {s.body}
            </p>
            <p className="font-['Nunito'] text-[11px] text-[#808080] mt-[6px]">
              Basis: {s.basis}
            </p>
          </div>
        );
      })}
    </div>
  );
}
