import type { ReactNode } from "react";

// The base white card every section sits in. Optional title/subtitle header.
export function Card({
  title,
  subtitle,
  children,
}: {
  title?: ReactNode;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white rounded-[8px] p-[24px]">
      {title && (
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[4px]">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="font-['Nunito'] text-[13px] text-[#808080] mb-[14px]">
          {subtitle}
        </p>
      )}
      {!subtitle && title && <div className="mb-[12px]" />}
      {children}
    </div>
  );
}
