import { BALLOT_TIMELINE } from "../../../data/tax-rebate-62f";
import { CoverageArticleRow } from "./CoverageArticleRow";

// Kept separate from BackgroundTab's PathToBallotCard so the Background tab
// stays untouched.
export function BallotCoveragePathCard() {
  return (
    <div className="bg-white rounded-[8px] p-[24px]">
      <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[20px]">
        Path to the Ballot
      </h3>
      <div className="ml-[6px] pl-[28px] border-l-[2px] border-[#e5e7eb] space-y-[28px]">
        {BALLOT_TIMELINE.map((m) => (
          <div key={m.when + m.label} className="relative">
            <span className="absolute left-[-35px] top-[4px] w-[13px] h-[13px] rounded-full bg-[#12266f]" />
            <p className="font-['Nunito'] font-bold text-[11px] tracking-[0.08em] uppercase text-[#12266f]">
              {m.when}
            </p>
            <p className="font-['Nunito'] font-bold text-[15px] text-black mt-[4px]">
              {m.label}
            </p>
            {m.body && (
              <p className="font-['Nunito'] text-[14px] text-[#808080] leading-[1.55] mt-[4px]">
                {m.body}
              </p>
            )}
            {m.articles.length > 0 && (
              <div className="mt-[12px] bg-[#fafafa] rounded-[10px] p-[16px] space-y-[4px]">
                {m.articles.map((a, i) => (
                  <CoverageArticleRow key={a.title + i} a={a} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
