import type { Arg } from "../types";

// Purple argument boxes (stacked).
export function ArgList({ args }: { args: Arg[] }) {
  return (
    <div className="space-y-[12px]">
      {args.map((a) => (
        <div
          key={a.title}
          className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px]"
        >
          <p className="font-['Nunito'] font-semibold text-[14px] text-[#6b21a8] mb-[4px]">
            {a.title}
          </p>
          <p className="font-['Nunito'] text-[14px] text-black leading-[1.5]">
            {a.body}
          </p>
        </div>
      ))}
    </div>
  );
}

// One argument column in the "Arguments at a Glance" style — a purple left bar
// per point; empty state when a source type has no arguments on file.
export function ArgColumn({ title, args }: { title: string; args: Arg[] }) {
  return (
    <div className="flex-1 space-y-[10px]">
      <p className="font-['Nunito'] font-bold text-[12px] text-[#334156] uppercase tracking-[0.08em] mb-[4px]">
        {title}
      </p>
      {args.length === 0 && (
        <p className="font-['Nunito'] text-[13px] text-[#808080]">
          No arguments from this source type on file.
        </p>
      )}
      {args.map((a) => (
        <div
          key={a.title}
          className="border-l-[3px] border-[#a855f7] pl-[12px] py-[2px]"
        >
          <p className="font-['Nunito'] font-semibold text-[13px] text-black">
            {a.title}
          </p>
          <p className="font-['Nunito'] text-[13px] text-[#606060] leading-[1.5]">
            {a.body}
          </p>
        </div>
      ))}
    </div>
  );
}
