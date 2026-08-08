import { SourceNote } from "../primitives";
import type { Committee } from "../types";

// Committee finance cards + top-donor tables.
export function FinanceLedger({
  committees,
  ids,
}: {
  committees: Committee[];
  ids: string[];
}) {
  return (
    <div>
      <div className="flex gap-[16px] max-lg:flex-col">
        {committees.map((c) => (
          <div
            key={c.name}
            className="flex-1 border border-[#d1d1d1] rounded-[12px] p-[18px]"
          >
            <div className="flex items-center gap-[8px] flex-wrap">
              <p className="font-['Nunito'] font-bold text-[16px] text-black">
                {c.name}
              </p>
              <span
                className={`font-['Nunito'] font-bold text-[10px] tracking-[0.04em] uppercase px-[10px] py-[2px] rounded-[100px] ${
                  c.stance === "yes"
                    ? "bg-[#e3f1e8] text-[#1e5b38]"
                    : "bg-[#fbe7e9] text-[#92121f]"
                }`}
              >
                {c.stance === "yes" ? "Yes" : "No"}
              </span>
            </div>
            <p className="font-['Nunito'] font-bold text-[24px] text-black mt-[8px]">
              {c.total}
            </p>
            <p className="font-['Nunito'] text-[12px] text-[#606060]">
              total contributions · {c.cash} cash · {c.inKind} in-kind ·{" "}
              {c.spent} spent
            </p>
            <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[8px] leading-[1.5]">
              {c.note}
            </p>
            <p className="font-['Nunito'] font-semibold text-[11px] tracking-[0.06em] uppercase text-[#606060] mt-[14px] mb-[6px]">
              Top donors
            </p>
            <div className="space-y-[5px]">
              {c.donors.map((d) => (
                <div
                  key={d.name}
                  className="flex justify-between gap-[12px] text-[13px] border-b border-dotted border-[#e5e7eb] pb-[4px]"
                >
                  <span className="font-['Nunito'] text-black">{d.name}</span>
                  <span className="font-['Nunito'] text-[#334156] whitespace-nowrap tabular-nums">
                    {d.amount} <span className="text-[#808080]">{d.kind}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <SourceNote ids={ids} />
    </div>
  );
}
