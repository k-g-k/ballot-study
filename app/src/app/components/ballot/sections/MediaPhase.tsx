import type { Article } from "../types";

// Article rows grouped under a phase heading.
export function MediaPhase({
  phase,
  when,
  articles,
}: {
  phase: string;
  when: string;
  articles: Article[];
}) {
  return (
    <div className="border-t border-[#e8e6de] pt-[14px]">
      <p className="font-['Nunito'] font-semibold text-[15px] text-black">
        {phase}
      </p>
      <p className="font-['Nunito'] font-bold text-[10px] tracking-[0.07em] uppercase text-[#606060] mt-[2px] mb-[8px]">
        {when}
      </p>
      <div className="space-y-[8px]">
        {articles.map((a) => (
          <div key={a.title} className="flex gap-[12px] items-baseline flex-wrap">
            <span className="font-['Nunito'] font-bold text-[10px] tracking-[0.06em] uppercase text-[#606060] min-w-[130px]">
              {a.outlet}
            </span>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Nunito'] font-semibold text-[14px] text-[#12266f] hover:text-[#c71e32] flex-1"
            >
              {a.title}
            </a>
            <span className="font-['Nunito'] text-[10px] tracking-[0.05em] uppercase text-[#808080]">
              {a.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
