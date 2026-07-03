import { Cite } from "../primitives";
import type { Fact } from "../types";

// Key/value fact list with optional inline citations.
export function Facts({ items }: { items: Fact[] }) {
  return (
    <div className="space-y-[8px]">
      {items.map((f) => (
        <div key={f.k} className="flex gap-[10px] text-[14px] leading-[1.5]">
          <span className="font-['Nunito'] font-semibold text-black min-w-[190px] shrink-0">
            {f.k}
          </span>
          <span className="font-['Nunito'] text-[#334156]">
            {f.v}
            {f.ids && <Cite ids={f.ids} />}
          </span>
        </div>
      ))}
    </div>
  );
}
