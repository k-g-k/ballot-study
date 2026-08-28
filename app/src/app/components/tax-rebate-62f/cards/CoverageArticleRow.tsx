import type { CoverageArticle } from "../../../data/tax-rebate-62f";

// Shared "outlet · title · type" row used by the Ballot Coverage cards
// (Coverage Timeline and Coverage by Topic). The whole row links out to the
// source with a light hover background; renders as plain text when no URL.
export function CoverageArticleRow({ a }: { a: CoverageArticle }) {
  const rowClass =
    "flex gap-[16px] items-baseline rounded-control -mx-[8px] px-[8px] py-[6px] transition-colors";
  const inner = (
    <>
      <span className="font-body font-semibold text-xs text-ink-muted w-[150px] shrink-0">
        {a.outlet}
      </span>
      <span className="font-body text-sm text-ink flex-1 min-w-[220px]">
        {a.title}
      </span>
      <span className="font-body font-semibold text-2xs text-ink-faint shrink-0 w-[72px] text-right">
        {a.type}
      </span>
    </>
  );
  return a.url ? (
    <a
      href={a.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${rowClass} hover:bg-wash cursor-pointer`}
    >
      {inner}
    </a>
  ) : (
    <div className={rowClass}>{inner}</div>
  );
}
