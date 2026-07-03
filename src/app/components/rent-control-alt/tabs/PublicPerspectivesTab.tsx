import { Card, EmptyState } from "../../ballot";
import { testimonyFor } from "../../../data/rent-control";
import {
  FollowedTestimonyCard,
  OrganizationTestimonyCard,
  TestimonyList,
} from "../testimony";

export function PublicPerspectivesTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <FollowedTestimonyCard />

      <OrganizationTestimonyCard />

      <Card
        title="Elected Official Testimony"
        subtitle="Submitted by state executive office and municipal accounts, under the same endorse / oppose / no position flow as every other account."
      >
        <TestimonyList items={testimonyFor((u) => u.userType === "government")} />
      </Card>

      <Card
        title="Legislator Response/Testimony"
        subtitle="Under construction: This will be the place that legislators may be able to weigh in oppose/endorse or respond under a neutral stance? What rules should govern this space?"
      >
        <TestimonyList items={testimonyFor((u) => u.userType === "legislator")} />
        {testimonyFor((u) => u.userType === "legislator").length === 0 && (
          <EmptyState
            title="No legislator responses yet"
            body="Legislator accounts exist on MAPLE, but the rules for how they participate here are still being designed."
          />
        )}
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
