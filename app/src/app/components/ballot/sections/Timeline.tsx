import { SourceNote } from "../primitives";
import type { TL } from "../types";

// Dated milestone list with a vertical rail.
export function Timeline({ items }: { items: TL[] }) {
  return (
    <div className="ml-[6px] pl-[24px] border-l-[2px] border-[#e5e7eb] space-y-[18px]">
      {items.map((it) => (
        <div key={it.when + it.label} className="relative">
          <span className="absolute left-[-30px] top-[5px] w-[10px] h-[10px] rounded-full bg-[#12266f]" />
          <p className="font-['Nunito'] font-bold text-[10px] tracking-[0.07em] uppercase text-[#12266f]">
            {it.when}
          </p>
          <p className="font-['Nunito'] font-semibold text-[15px] text-black mt-[2px]">
            {it.label}
          </p>
          {it.body && (
            <p className="font-['Nunito'] text-[14px] text-[#334156] leading-[1.5] mt-[2px]">
              {it.body}
            </p>
          )}
          {it.ids && <SourceNote ids={it.ids} />}
        </div>
      ))}
    </div>
  );
}
