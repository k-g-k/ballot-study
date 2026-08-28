import { Section } from "../../ballot";
import { testimonyFor } from "../../../data/tax-rebate-62f";
import { TestimonyFeed, type StanceFilter } from "../testimony";
import { CitizenDeliberationsTab } from "../cards/CitizenDeliberationsTab";

// The reason MAPLE exists, given a chapter of its own rather than a sub-tab.
// The feed and the discussions sit one after the other now: they were behind a
// toggle because a tab could only hold one at a time, which was a constraint of
// the old shell rather than anything true about the content.
export function TestimonySection({
  orgFilter,
  discussionsRef,
}: {
  orgFilter: StanceFilter;
  discussionsRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <Section
      id="testimony"
      title="Testimony and deliberation"
      lede="What organizations, officials, and residents have filed on this question, and what came out of the facilitated discussions."
    >
      <TestimonyFeed
        title="Testimony"
        items={testimonyFor(() => true)}
        initialFilter={orgFilter}
        initialTypeFilter={orgFilter === "all" ? "all" : "organization"}
        stickyTop="var(--pinned-h, 0px)"
        includeFollowingFilter
        includeTypeFilter
        asCards
      />
      <div ref={discussionsRef} className="scroll-mt-[120px]">
        <CitizenDeliberationsTab />
      </div>
    </Section>
  );
}
