// Building blocks for the Citizen Deliberations tab.

// A single participation-stat tile (big number + label).
export function DelibStat({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex-1 min-w-[104px] border border-[#e5e7eb] rounded-[8px] px-[10px] py-[12px] text-center">
      <p className="font-['Nunito'] font-bold text-[22px] text-black leading-none">
        {n}
      </p>
      <p className="font-['Nunito'] text-[11px] text-[#606060] mt-[5px] leading-[1.3]">
        {label}
      </p>
    </div>
  );
}

// One theme column — top rule, uppercase label, body. Neutral (uncolored).
export function DelibThemeCol({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex-1 min-w-0 border-t-[3px] border-[#d1d1d1] pt-[10px]">
      <p className="font-['Nunito'] font-bold text-[11px] tracking-[0.07em] uppercase text-[#606060]">
        {label}
      </p>
      <p className="font-['Nunito'] text-[13px] text-[#334156] leading-[1.55] mt-[6px]">
        {text}
      </p>
    </div>
  );
}
