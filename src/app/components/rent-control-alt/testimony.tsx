// Submitted-testimony UI. Each entry is renderable standalone (everything comes
// from the testimony record + its account), anticipating per-testimony URLs.

import { useState, useRef, useEffect, useMemo } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, Pagination, FilterChip } from "../ballot";
import type { DescriptorMode } from "../ballot";
import { UserAvatar, UserTypeIcon, StanceChip } from "./accounts";
import {
  POSITION_USERS,
  testimonyFor,
  type TestimonyItem,
} from "../../data/rent-control";

// Body text capped at three lines with an inline "Show more". A hidden measurer
// binary-searches the longest prefix that, with "… Show more" appended, still
// fits three lines at the current width; recomputed on resize.
function ClampedBody({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const [cutoff, setCutoff] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const m = measureRef.current;
    if (!wrap || !m) return;
    const compute = () => {
      m.style.width = `${wrap.clientWidth}px`;
      const maxH = parseFloat(getComputedStyle(m).lineHeight) * 3 + 2;
      m.textContent = text;
      if (m.scrollHeight <= maxH) {
        setCutoff(null);
        return;
      }
      let lo = 0;
      let hi = text.length;
      while (lo < hi) {
        const mid = Math.ceil((lo + hi) / 2);
        m.textContent = text.slice(0, mid).trimEnd() + "… Show more";
        if (m.scrollHeight <= maxH) lo = mid;
        else hi = mid - 1;
      }
      setCutoff(lo);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [text]);

  const collapsed = !expanded && cutoff !== null;
  return (
    <div ref={wrapRef} className="mt-[8px]">
      <p
        ref={measureRef}
        aria-hidden="true"
        className="font-['Nunito'] text-[14px] leading-[1.55] absolute invisible pointer-events-none"
      />
      <p className="font-['Nunito'] text-[14px] text-black leading-[1.55]">
        {collapsed ? `${text.slice(0, cutoff).trimEnd()}… ` : `${text} `}
        {cutoff !== null && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="font-['Nunito'] font-bold text-[13px] text-[#12266f] hover:text-[#c71e32] cursor-pointer"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </p>
    </div>
  );
}

// One testimony entry: avatar, account name + type icon + stance chip + date,
// optional descriptor line, clamped body.
export function TestimonyEntry({
  t,
  showTypeIcon = true,
  showDescriptor = true,
}: {
  t: TestimonyItem;
  showTypeIcon?: boolean;
  showDescriptor?: DescriptorMode;
}) {
  const user = POSITION_USERS.find((u) => u.id === t.userId);
  if (!user) return null;
  const showDesc =
    showDescriptor === true ||
    (showDescriptor === "officials" && user.userType !== "organization");
  return (
    <div className="border-t border-dotted border-[#d1d1d1] pt-[14px] first:border-0 first:pt-0">
      <div className="flex items-start gap-[12px]">
        <UserAvatar user={user} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[6px] flex-wrap">
            <p className="font-['Nunito'] font-semibold text-[14px] text-black leading-[1.3]">
              {user.name}
            </p>
            {showTypeIcon && <UserTypeIcon type={user.userType} />}
            {/* Neutral / no-position testimony carries no stance chip. */}
            {t.stance !== "no-position" && <StanceChip stance={t.stance} />}
            <span className="ml-auto font-['Nunito'] text-[12px] text-[#808080] whitespace-nowrap">
              {t.date}
            </span>
          </div>
          {showDesc && (
            <p className="font-['Nunito'] text-[12px] text-[#808080] leading-[1.4] mt-[1px]">
              {user.descriptor}
            </p>
          )}
          <ClampedBody text={t.body} />
        </div>
      </div>
    </div>
  );
}

export function TestimonyList({
  items,
  showTypeIcon = true,
  showDescriptor = true,
}: {
  items: TestimonyItem[];
  showTypeIcon?: boolean;
  showDescriptor?: DescriptorMode;
}) {
  return (
    <div className="space-y-[14px]">
      {items.map((t) => (
        <TestimonyEntry
          key={t.id}
          t={t}
          showTypeIcon={showTypeIcon}
          showDescriptor={showDescriptor}
        />
      ))}
    </div>
  );
}

// Filter chips + pagination appear only once the feed reaches FEED_CONTROLS_MIN.
const FEED_PAGE_SIZE = 5;
const FEED_CONTROLS_MIN = 5;
export type StanceFilter = "all" | "endorsing" | "opposing" | "no-position";
const STANCE_FILTERS: { id: StanceFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "endorsing", label: "Endorsing" },
  { id: "opposing", label: "Opposing" },
  { id: "no-position", label: "Neutral or No Position" },
];

export function TestimonyFeed({
  items,
  showTypeIcon = true,
  showDescriptor = true,
  includeFollowingFilter = false,
  initialFilter = "all",
}: {
  items: TestimonyItem[];
  showTypeIcon?: boolean;
  showDescriptor?: DescriptorMode;
  /** Add a "Following" toggle that narrows any stance filter to accounts the
      viewer follows. */
  includeFollowingFilter?: boolean;
  /** Stance filter to open with (e.g. when arriving from a Vote card). */
  initialFilter?: StanceFilter;
}) {
  const [filter, setFilter] = useState<StanceFilter>(initialFilter);
  // Following is an overlay, not a stance: it combines with every stance chip.
  const [followingOnly, setFollowingOnly] = useState(false);
  const [page, setPage] = useState(0);

  const showControls = items.length >= FEED_CONTROLS_MIN;
  const showFilters = showControls;
  const stanceMatched =
    !showFilters || filter === "all"
      ? items
      : items.filter((t) => {
          if (filter === "endorsing") return t.stance === "endorse";
          if (filter === "opposing") return t.stance === "oppose";
          return t.stance === "no-position";
        });
  const filtered =
    showFilters && followingOnly
      ? stanceMatched.filter(
          (t) =>
            POSITION_USERS.find((u) => u.id === t.userId)?.followedByViewer,
        )
      : stanceMatched;
  const pageCount = Math.max(1, Math.ceil(filtered.length / FEED_PAGE_SIZE));
  const current = Math.min(page, pageCount - 1);
  const shown = showControls
    ? filtered.slice(
        current * FEED_PAGE_SIZE,
        current * FEED_PAGE_SIZE + FEED_PAGE_SIZE,
      )
    : filtered;

  return (
    <div>
      {showFilters && (
        <div className="flex items-center gap-[6px] flex-wrap mb-[16px]">
          {STANCE_FILTERS.map(({ id, label }) => (
            <FilterChip
              key={id}
              active={filter === id}
              onClick={() => {
                setFilter(id);
                setPage(0);
              }}
            >
              {label}
            </FilterChip>
          ))}
          {includeFollowingFilter && (
            <FilterChip
              active={followingOnly}
              ariaPressed={followingOnly}
              onClick={() => {
                setFollowingOnly((f) => !f);
                setPage(0);
              }}
              title={
                followingOnly
                  ? "Clear the Following filter"
                  : "Only accounts you follow"
              }
              className="ml-auto inline-flex items-center gap-[5px]"
            >
              Following
              {followingOnly && <X className="w-[12px] h-[12px]" />}
            </FilterChip>
          )}
        </div>
      )}

      {shown.length > 0 ? (
        <TestimonyList
          items={shown}
          showTypeIcon={showTypeIcon}
          showDescriptor={showDescriptor}
        />
      ) : (
        <p className="font-['Nunito'] text-[13px] text-[#808080]">
          No testimony matches this filter.
        </p>
      )}

      {showControls && pageCount > 1 && (
        <Pagination page={current} pageCount={pageCount} onPage={setPage} />
      )}
    </div>
  );
}

// Testimony from followed accounts — an infinite carousel showing one entry at
// a time, starting at a random one, with edge chevrons. Every entry is also an
// invisible sizer stacked in the same grid cell so the container holds the
// tallest (collapsed) height and cycling never shifts layout.
export function FollowedTestimonyCard() {
  const items = useMemo(
    () => testimonyFor((u) => Boolean(u.followedByViewer)),
    [],
  );
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * Math.max(1, items.length)),
  );
  if (items.length === 0) return null;
  const current = index % items.length;
  const step = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + items.length) % items.length);
  return (
    <Card
      title="Featured Testimony"
      subtitle="Testimony of the organizations, officials, and individuals that you follow on MAPLE."
    >
      {/* Chevrons sit at the card edges and stretch the full height of the row
          for a large click target; the entry is width-capped and centered. */}
      <div className="flex items-stretch gap-[10px]">
        <button
          onClick={() => step(-1)}
          aria-label="Previous testimony"
          className="text-[#334156] hover:text-[#c71e32] hover:bg-[#f5f5f5] cursor-pointer shrink-0 self-stretch flex items-center px-[14px] rounded-[8px]"
        >
          <ChevronLeft className="w-[18px] h-[18px]" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="max-w-[760px] mx-auto border border-[#e5e7eb] rounded-[12px] p-[18px] bg-[#fbfaf7] grid">
            {items.map((t) => (
              <div
                key={t.id}
                aria-hidden="true"
                className="col-start-1 row-start-1 invisible pointer-events-none"
              >
                <TestimonyEntry t={t} showDescriptor="officials" />
              </div>
            ))}
            <div key={items[current].id} className="col-start-1 row-start-1">
              <TestimonyEntry t={items[current]} showDescriptor="officials" />
            </div>
          </div>
        </div>

        <button
          onClick={() => step(1)}
          aria-label="Next testimony"
          className="text-[#334156] hover:text-[#c71e32] hover:bg-[#f5f5f5] cursor-pointer shrink-0 self-stretch flex items-center px-[14px] rounded-[8px]"
        >
          <ChevronRight className="w-[18px] h-[18px]" />
        </button>
      </div>
    </Card>
  );
}

export function OrganizationTestimonyCard({
  initialFilter,
}: {
  initialFilter?: StanceFilter;
}) {
  return (
    <Card
      title="Organization Testimony"
      subtitle="Submitted by verified organization accounts. Each account chose endorse, oppose, or no position before writing; testimony appears in the account's own words and is never edited."
    >
      <TestimonyFeed
        items={testimonyFor((u) => u.userType === "organization")}
        showDescriptor={false}
        includeFollowingFilter
        initialFilter={initialFilter}
      />
    </Card>
  );
}
