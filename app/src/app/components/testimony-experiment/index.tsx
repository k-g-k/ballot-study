import { useState } from "react";
import { SOURCES } from "../../data/tax-rebate-62f";
import { SourcesProvider } from "../ballot/sources-context";
import { WhatPeopleAreSaying } from "../tax-rebate-62f-alt/chapters";
import { SiteNav, useDeviceWidthViewport } from "../tax-rebate-62f-alt";
import type {
  StanceFilter,
  TypeFilter,
} from "../tax-rebate-62f/testimony";

/**
 * The testimony section on its own route, to be worked on without the rest of
 * the ballot page around it.
 *
 * Deliberately thin: it renders the same `WhatPeopleAreSaying` the clean-slate
 * page does, wearing the same chrome, so anything changed here is changed in
 * one place and both pages get it. When this stops being a copy of that
 * section and becomes its own thing, it should get its own component rather
 * than a fork of that one.
 */
export default function TestimonyExperiment() {
  // Same two filters the ballot page lifts above the feed, so the campaign
  // cards can narrow it. Nothing else on this page sets them yet.
  const [stance, setStance] = useState<StanceFilter>("all");
  const [accountType, setAccountType] = useState<TypeFilter>("all");
  useDeviceWidthViewport();

  return (
    <SourcesProvider value={SOURCES}>
      <div className="bg-ground min-h-screen font-body text-ink overflow-x-clip">
        <SiteNav />
        {/* No contents bar here, so the only pinned thing is the nav, and the
            feed's own sticky bar clears that rather than the pair. */}
        <main className="mx-auto max-w-[1180px] px-[20px] sm:px-[32px] pt-[20px] sm:pt-[32px] pb-[96px] [--pinned-h:0px] lg:[--pinned-h:var(--nav-h)]">
          <WhatPeopleAreSaying
            filter={stance}
            onFilterChange={setStance}
            typeFilter={accountType}
            onTypeFilterChange={setAccountType}
          />
        </main>
      </div>
    </SourcesProvider>
  );
}
