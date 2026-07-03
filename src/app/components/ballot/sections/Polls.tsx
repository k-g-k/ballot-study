import { Cite } from "../primitives";
import type { PollRow } from "../types";

// Support/oppose/undecided bar + methodology row per poll.
export function Polls({ rows }: { rows: PollRow[] }) {
  return (
    <div className="space-y-[16px]">
      {rows.map((p) => (
        <div
          key={p.pollster + p.dates}
          className="border-t border-dotted border-[#d1d1d1] pt-[12px] first:border-0 first:pt-0"
        >
          <p className="font-['Nunito'] font-bold text-[14px] text-black">
            {p.pollster}
            <Cite ids={p.ids} />
          </p>
          <div className="flex h-[26px] rounded-[6px] overflow-hidden my-[8px] font-['Nunito'] font-bold text-[11px] text-white">
            <div
              className="bg-[#12266f] flex items-center pl-[9px]"
              style={{ width: `${p.support}%` }}
            >
              {p.support}%
            </div>
            <div
              className="bg-[#7c8196] flex items-center pl-[9px]"
              style={{ width: `${p.oppose}%` }}
            >
              {p.oppose}%
            </div>
            <div
              className="bg-[#d8d5ca] text-[#1f2330] flex items-center pl-[9px]"
              style={{ width: `${p.undecided}%` }}
            >
              {p.undecided}%
            </div>
          </div>
          <p className="font-['Nunito'] text-[12px] text-[#606060]">
            Support {p.support}% · Oppose {p.oppose}% · Undecided {p.undecided}%
            · {p.dates} · {p.sample} · MoE {p.moe}
          </p>
        </div>
      ))}
    </div>
  );
}
