import type { CoverageArticle } from "../../../data/tax-rebate-62f";

// Shared "outlet · title · type" row used by the Ballot Coverage cards
// (Coverage Timeline and Coverage by Topic). The whole row links out to the
// source with a light hover background; renders as plain text when no URL.
export function CoverageArticleRow({ a }: { a: CoverageArticle }) {
  const rowClass =
    "flex gap-[16px] items-baseline rounded-[6px] -mx-[8px] px-[8px] py-[6px] transition-colors";
  const inner = (
    <>
      <span className="font-['Nunito'] font-bold text-[12px] text-[#606060] w-[150px] shrink-0">
        {a.outlet}
      </span>
      <span className="font-['Nunito'] text-[13px] text-black flex-1 min-w-[220px]">
        {a.title}
      </span>
      <span className="font-['Nunito'] font-semibold text-[10px] tracking-[0.06em] uppercase text-[#a0a0a0] shrink-0 w-[72px] text-right">
        {a.type}
      </span>
    </>
  );
  return a.url ? (
    <a
      href={a.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${rowClass} hover:bg-[#f5f5f5] cursor-pointer`}
    >
      {inner}
    </a>
  ) : (
    <div className={rowClass}>{inner}</div>
  );
}
