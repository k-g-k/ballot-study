import { useRef, useEffect } from "react";
import { Card, EmptyState, SynthSummaryCard } from "../../ballot";
import { testimonyFor } from "../../../data/tax-rebate-62f";
import {
  OrganizationTestimonyCard,
  TestimonyList,
  type StanceFilter,
} from "../testimony";

export function PublicPerspectivesTab({
  orgFilter = "all",
}: {
  orgFilter?: StanceFilter;
}) {
  const orgRef = useRef<HTMLDivElement>(null);
  // Arriving from a Vote card (a stance filter is set) → jump to Organization
  // Testimony, offset below the sticky hero.
  useEffect(() => {
    if (orgFilter !== "all") {
      requestAnimationFrame(() => {
        orgRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [orgFilter]);
  return (
    <div className="flex flex-col gap-[16px]">
      <SynthSummaryCard
        title="Summary of MAPLE Testimony"
        ids={["mapleTestimony", "maoBrief", "massBudget", "mtfPosition", "masslive62F"]}
        prompt="Summarize the testimony submitted to MAPLE on the 62F reform question — the supporters' and opponents' arguments, any legislator input, and whether residents have weighed in. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
      >
        <p>
          Public perspectives split with supporters arguing the measure
          restores a taxpayer-refund guarantee voters approved in 1986 — closing
          a "loophole," reflecting spending that has outpaced wages, and, by one
          estimate, returning about $19 billion over four decades — while
          opponents warn it would shrink the budget and cut schools, transit, and
          healthcare, steadily tighten the cap over time, and send the largest
          refunds to high earners. A legislator also weighed in: Senate President
          Karen Spilka opposed it, questioning who the measure is really written
          for. No individual resident perspectives have been submitted on this
          question yet.
        </p>
      </SynthSummaryCard>

      <div
        ref={orgRef}
        style={{ scrollMarginTop: "calc(var(--hero-h, 0px) + 16px)" }}
      >
        <OrganizationTestimonyCard initialFilter={orgFilter} />
      </div>

      <Card
        title="Elected Official Testimony"
        subtitle="Submitted by legislator, state executive office, and municipal accounts, under the same endorse / oppose / no position flow as every other account."
      >
        <TestimonyList
          items={testimonyFor(
            (u) => u.userType === "government" || u.userType === "legislator",
          )}
        />
      </Card>

      <Card
        title="Individual Testimony"
        subtitle="Submitted by verified Massachusetts residents, shown in their own words and never edited."
      >
        <EmptyState
          title="No individual testimony on this question yet"
          body="No resident submissions are on file for this question yet — be among the first to add your perspective. Public statements reported elsewhere are kept under For & Against and Media Coverage, where they can be traced to their source."
          shareOnly
        />
      </Card>
    </div>
  );
}
