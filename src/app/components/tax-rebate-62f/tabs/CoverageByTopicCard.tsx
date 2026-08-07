import { COVERAGE_BY_TOPIC } from "../../../data/tax-rebate-62f";
import { CoverageArticleRow } from "./CoverageArticleRow";

// Ballot Coverage variant card — the same topics as the former "Media"
// reference card, grouped without a timeline: a topic heading followed by its
// "outlet · title · type" rows. Follows the general styling of the Coverage
// Timeline card (BallotCoveragePathCard) minus the dated rail.
export function CoverageByTopicCard() {
  return (
    <div className="bg-white rounded-[8px] p-[24px]">
      {/* Pins below the hero while the card is in view, then scrolls away with
          it — sticky is bounded by its parent, so the card's own bottom edge
          releases it. Bled out to the card edges so content passes underneath
          rather than beside it. */}
      <h3
        style={{ top: "var(--hero-h, 0px)" }}
        className="sticky z-[5] -mx-[24px] -mt-[24px] mb-[4px] rounded-t-[8px] bg-white px-[24px] pt-[24px] pb-[10px] font-['Nunito'] font-normal text-[18px] text-black"
      >
        Media Coverage
      </h3>
      <div className="space-y-[20px]">
        {COVERAGE_BY_TOPIC.map((g, i) => (
          <div
            key={g.topic}
            className={
              i > 0 ? "border-t border-[#ededed] pt-[20px]" : undefined
            }
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
