import { useRef, useEffect, useState } from "react";
import { testimonyFor } from "../../../data/tax-rebate-62f";
import { TestimonyFeed, type StanceFilter } from "../testimony";
import { CitizenDeliberationsTab } from "./CitizenDeliberationsTab";
import { NextStepCard } from "./NextStepCard";

type Section = "testimony" | "discussions";

const SECTIONS: { id: Section; label: string }[] = [
  { id: "testimony", label: "Public Testimony" },
  { id: "discussions", label: "Live Discussions" },
];

export function PublicPerspectivesTab({
  orgFilter = "all",
  onNext,
}: {
  orgFilter?: StanceFilter;
  onNext?: () => void;
}) {
  const [section, setSection] = useState<Section>("testimony");
  // The sub-tab bar pins under the sticky hero and the filter bar pins under
  // that, so its height is mirrored into a CSS variable the same way the shell
  // mirrors the hero's.
  const rootRef = useRef<HTMLDivElement>(null);
  const subTabsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    const bar = subTabsRef.current;
    if (!root || !bar) return;
    const observer = new ResizeObserver(() => {
      root.style.setProperty("--subtabs-h", `${bar.offsetHeight}px`);
    });
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);
  // Arriving from a Vote card sets a stance filter. The feed is the first thing
  // on this section, so only the section needs switching — the shell has
  // already clamped the scroll to the top of the column.
  useEffect(() => {
    if (orgFilter !== "all") setSection("testimony");
  }, [orgFilter]);
  return (
    <div ref={rootRef} className="flex flex-col gap-[16px]">
      {/* -mb cancels the parent's flex gap; the gap below is supplied by the
          filter bar's own top padding so it holds when both are stuck. */}
      <div
        ref={subTabsRef}
        style={{ top: "var(--hero-h, 0px)" }}
        className="sticky z-[9] flex gap-[24px] bg-[#ededed] pt-[4px] -mb-[16px]"
      >
        {SECTIONS.map((s) => {
          const isActive = section === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              aria-current={isActive ? "page" : undefined}
              className={`font-['Nunito'] font-bold text-[14px] pb-[4px] border-b-[2px] transition-colors cursor-pointer ${
                isActive
                  ? "text-[#12266f] border-[#12266f]"
                  : "text-[#808080] border-transparent hover:text-[#12266f]"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {section === "discussions" && (
        <div className="pt-[16px]">
          <CitizenDeliberationsTab />
        </div>
      )}
      {section === "testimony" && (
        <div>
          <TestimonyFeed
            title="Testimony"
            items={testimonyFor(() => true)}
            initialFilter={orgFilter}
            initialTypeFilter={orgFilter === "all" ? "all" : "organization"}
            stickyTop="calc(var(--hero-h, 0px) + var(--subtabs-h, 0px))"
            includeFollowingFilter
            includeTypeFilter
            asCards
          />
        </div>
      )}
      <NextStepCard
        title="Learn more about how this has been covered"
        body="Beyond what people submitted themselves: the news reporting, official filings, and the path this question took to the ballot."
        action="Ballot Coverage"
        onClick={onNext}
      />
    </div>
  );
}
