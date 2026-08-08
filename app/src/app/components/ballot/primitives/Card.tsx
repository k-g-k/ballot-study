import type { ReactNode } from "react";

// The base white card every section sits in. Optional title/subtitle header.
export function Card({
  title,
  subtitle,
  stickyTop,
  children,
}: {
  title?: ReactNode;
  subtitle?: string;
  /**
   * When set, the title pins at this offset while the card is in view and
   * releases at the card's own bottom edge. Only worth it on cards that can
   * run longer than a viewport. The subtitle is left in normal flow so a
   * pinned header does not eat the top of the screen.
   */
  stickyTop?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white rounded-[8px] p-[24px]">
      {title &&
        (stickyTop ? (
          // Bled to the card edges so content passes under the header rather
          // than beside it, and the card's top padding travels with it.
          <h3
            style={{ top: stickyTop }}
            className="sticky z-[5] -mx-[24px] -mt-[24px] mb-[4px] rounded-t-[8px] bg-white px-[24px] pt-[24px] pb-[4px] font-['Nunito'] font-normal text-[18px] text-black"
          >
            {title}
          </h3>
        ) : (
          <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[4px]">
            {title}
          </h3>
        ))}
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
