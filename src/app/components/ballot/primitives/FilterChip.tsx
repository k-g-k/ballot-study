import type { ReactNode } from "react";

// The rounded pill used for every filter/toggle chip on the page (argument
// source filters, testimony stance filters, the Following toggle). `active`
// swaps to the selected blue treatment; `className` appends layout tweaks
// (e.g. `ml-auto` or `inline-flex gap` when the chip carries an icon).
export function FilterChip({
  active,
  onClick,
  className = "",
  title,
  ariaPressed,
  children,
}: {
  active: boolean;
  onClick: () => void;
  className?: string;
  title?: string;
  ariaPressed?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-pressed={ariaPressed}
      className={`font-['Nunito'] font-semibold text-[12px] px-[10px] py-[4px] rounded-[100px] border cursor-pointer transition-colors ${
        active
          ? "bg-[rgba(232,239,255,0.68)] border-[#c9d8ff] text-[#1e3f8a]"
          : "bg-white border-[#d1d1d1] text-[#606060] hover:border-[#a0a0a0]"
      } ${className}`}
    >
      {children}
    </button>
  );
}
