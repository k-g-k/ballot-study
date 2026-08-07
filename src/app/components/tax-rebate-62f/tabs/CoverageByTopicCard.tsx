import { COVERAGE_BY_TOPIC } from "../../../data/tax-rebate-62f";
import { CoverageArticleRow } from "./CoverageArticleRow";

// Ballot Coverage variant card — the same topics as the former "Media"
// reference card, grouped without a timeline: a topic heading followed by its
// "outlet · title · type" rows. Follows the general styling of the Coverage
// Timeline card (BallotCoveragePathCard) minus the dated rail.
export function CoverageByTopicCard() {
  return (
    <div className="bg-white rounded-[8px] p-[24px]">
      <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[20px]">
        Coverage by Topic
      </h3>
      <div className="space-y-[20px]">
        {COVERAGE_BY_TOPIC.map((g, i) => (
          <div
            key={g.topic}
            className={i > 0 ? "border-t border-[#ededed] pt-[20px]" : undefined}
          >
            <p className="font-['Nunito'] font-bold text-[15px] text-black mb-[10px]">
              {g.topic}
            </p>
            <div className="space-y-[4px]">
              {g.articles.map((a, i) => (
                <CoverageArticleRow key={a.title + i} a={a} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
