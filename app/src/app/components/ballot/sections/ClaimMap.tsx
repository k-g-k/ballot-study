import { ShieldCheck, AlertTriangle } from "lucide-react";
import { SynthSourcesNote } from "../primitives";
import type { ClaimRow, ClaimSource } from "../types";

// Link color matches the claim's source (green = outside, orange = testimony).
const CLAIM_LINK: Record<ClaimSource, string> = {
  outside: "text-[#166534] hover:text-[#0f4a26]",
  testimony: "text-[#9a3412] hover:text-[#7c2d12]",
};

// Verified/attributed claim rows: a ✓/⚠ marker + bold label lead the note; the
// "View Source(s)" popover sits inline at the end.
export function ClaimMap({ rows }: { rows: ClaimRow[] }) {
  return (
    <div className="space-y-[16px]">
      {rows.map((r) => {
        const verified = r.mark === "verified";
        return (
          <div
            key={r.claim}
            className="border-t border-dotted border-[#d1d1d1] pt-[16px] first:border-0 first:pt-0"
          >
            <p className="font-['Nunito'] font-semibold text-[15px] text-black leading-[1.45]">
              {r.claim}
            </p>
            <div className="font-['Nunito'] text-[13px] text-[#606060] mt-[4px] leading-[1.55]">
              {verified ? (
                <ShieldCheck className="w-[14px] h-[14px] text-[#166534] inline-block align-[-2px] mr-[4px]" />
              ) : (
                <AlertTriangle className="w-[14px] h-[14px] text-[#8a6d1d] inline-block align-[-2px] mr-[4px]" />
              )}
              <span
                className={`font-bold ${verified ? "text-[#166534]" : "text-[#8a6d1d]"}`}
              >
                {verified ? "Verified. " : "Attributed. "}
              </span>
              {r.note}
              {r.ids && (
                <>
                  {" "}
                  <SynthSourcesNote
                    ids={r.ids}
                    variant="plain"
                    inline
                    linkClass={CLAIM_LINK[r.source]}
                  />
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
