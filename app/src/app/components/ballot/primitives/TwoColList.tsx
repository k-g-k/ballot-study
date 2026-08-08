import { Check, X } from "lucide-react";
import { SourceNote } from "./citations";

// Two-column include/exclude scope list (check column vs. x column).
export function TwoColList({
  leftTitle,
  left,
  rightTitle,
  right,
  ids,
}: {
  leftTitle: string;
  left: string[];
  rightTitle: string;
  right: string[];
  ids?: string[];
}) {
  const Col = ({
    title,
    items,
    yes,
  }: {
    title: string;
    items: string[];
    yes: boolean;
  }) => (
    <div className="flex-1">
      <p className="font-['Nunito'] font-semibold text-[13px] text-[#606060] uppercase tracking-[0.08em] mb-[8px]">
        {title}
      </p>
      <div className="space-y-[6px]">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-[8px]">
            {yes ? (
              <Check className="w-[14px] h-[14px] text-[#3b82f6] shrink-0 mt-[2px]" />
            ) : (
              <X className="w-[14px] h-[14px] text-[#808080] shrink-0 mt-[2px]" />
            )}
            <p className="font-['Nunito'] text-[13px] text-black leading-[1.5]">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div>
      <div className="flex gap-[16px] max-lg:flex-col">
        <Col title={leftTitle} items={left} yes />
        <div className="w-[1px] bg-[#e5e7eb] shrink-0 max-lg:hidden" />
        <Col title={rightTitle} items={right} yes={false} />
      </div>
      {ids && <SourceNote ids={ids} />}
    </div>
  );
}
