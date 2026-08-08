import { useRef, useEffect } from "react";
import { Card, EmptyState, SynthSummaryCard } from "../../ballot";
import { testimonyFor } from "../../../data/rent-control";
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
        ids={["mapleTestimony"]}
        prompt="Summarize the testimony submitted to MAPLE on the rent-control question: what supporters argue, what opponents argue, and whether residents have weighed in. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
      >
        <p>
          Supporters frame the measure as rent stabilization: predictable rents
          for working families and a check on corporate investors, while still
          letting local landlords earn a reasonable profit and allowing new
          construction. Opponents frame it as a threat to housing production and
          investment, warning it would shrink municipal tax bases and property
          values, shift costs onto homeowners, and repeat what led voters to ban
          rent control statewide in 1994. Neutral parties took no position while
          voicing reservations, and no individual residents have submitted yet.
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
