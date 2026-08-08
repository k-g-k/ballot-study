// Submitted-testimony UI. Each entry is renderable standalone (everything comes
// from the testimony record + its account), anticipating per-testimony URLs.

import { useState, useRef, useEffect, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, ChevronDown, Users } from "lucide-react";
import { Card, FilterChip } from "../ballot";
import type { DescriptorMode } from "../ballot";
import { UserAvatar, UserTypeIcon, StanceChip } from "./accounts";
import {
  POSITION_USERS,
  testimonyFor,
  type TestimonyItem,
  type PositionUserType,
} from "../../data/tax-rebate-62f";

// Body text capped at six lines with an inline "Show more". A hidden measurer
// binary-searches the longest prefix that, with "… Show more" appended, still
// fits six lines at the current width; recomputed on resize.
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
      const maxH = parseFloat(getComputedStyle(m).lineHeight) * 6 + 2;
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
            onClick={(e) => {
              // Keep expand/collapse from triggering the row's click-through.
              e.stopPropagation();
              setExpanded((x) => !x);
            }}
            className="font-['Nunito'] font-bold text-[13px] text-[#12266f] hover:text-[#c71e32] cursor-pointer"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </p>
    </div>
  );
}

export function TestimonyEntry({
  t,
  showTypeIcon = true,
  showDescriptor = true,
  onOpen,
}: {
  t: TestimonyItem;
  showTypeIcon?: boolean;
  showDescriptor?: DescriptorMode;
  /** Click-through to the testimony's own page (routing wired later). */
  onOpen?: (id: string) => void;
}) {
  const user = POSITION_USERS.find((u) => u.id === t.userId);
  if (!user) return null;
  const showDesc =
    showDescriptor === true ||
    (showDescriptor === "officials" && user.userType !== "organization");
  return (
    <div
      onClick={onOpen ? () => onOpen(t.id) : undefined}
      className={`relative px-[20px] py-[16px] rounded-[8px] ${onOpen ? "cursor-pointer" : ""}`}
    >
      <div className="relative flex items-start gap-[12px]">
        <UserAvatar user={user} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[6px] flex-wrap">
            <p className="font-['Nunito'] font-semibold text-[14px] text-black leading-[1.3]">
              {user.name}
            </p>
            {showTypeIcon && <UserTypeIcon type={user.userType} />}
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
    <div>
      {items.map((t, i) => (
        <div key={t.id} className="mb-[14px] last:mb-0">
          {i > 0 && (
            <div className="border-t border-dotted border-[#d1d1d1] mb-[14px]" />
          )}
          <TestimonyEntry
            t={t}
            showTypeIcon={showTypeIcon}
            showDescriptor={showDescriptor}
          />
        </div>
      ))}
    </div>
  );
}

// Filter chips appear only once the feed reaches FEED_CONTROLS_MIN.
const FEED_CONTROLS_MIN = 4;
export type StanceFilter = "all" | "endorsing" | "opposing" | "no-position";
// Rendered as a segmented control, so "All" is a real segment: stance is
// one-of, and an empty segmented control reads as broken where a pill does not.
const STANCE_FILTERS: { id: StanceFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "endorsing", label: "Endorsing" },
  { id: "opposing", label: "Opposing" },
  { id: "no-position", label: "Neutral" },
];

export type TypeFilter = "all" | PositionUserType;

const TYPE_FILTERS: { id: TypeFilter; label: string }[] = [
  { id: "all", label: "All Accounts" },
  { id: "individual", label: "Individuals" },
  { id: "organization", label: "Organizations" },
  { id: "government", label: "Government Officials" },
  { id: "legislator", label: "Legislators" },
];

// Single-select account-type chooser. A dropdown rather than more pills so the
// row does not read as one undifferentiated set of toggles: the shape says
// "pick one of these", where a pill says "on or off".
function TypeFilterMenu({
  value,
  onChange,
}: {
  value: TypeFilter;
  onChange: (v: TypeFilter) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);
  const current = TYPE_FILTERS.find((t) => t.id === value) ?? TYPE_FILTERS[0];
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-[5px] font-['Nunito'] font-semibold text-[12px] px-[10px] py-[4px] rounded-[100px] border cursor-pointer transition-colors bg-[rgba(232,239,255,0.68)] border-[#c9d8ff] text-[#1e3f8a]"
      >
        {current.id === "all" ? (
          <Users className="w-[13px] h-[13px]" />
        ) : (
          <UserTypeIcon type={current.id} size={13} />
        )}
        {current.label}
        <ChevronDown className="w-[12px] h-[12px]" />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-[calc(100%+6px)] z-20 min-w-[190px] bg-white border border-[#dee2e6] rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] py-[4px]"
        >
          {TYPE_FILTERS.map((t) => (
            <button
              key={t.id}
              role="option"
              aria-selected={t.id === value}
              onClick={() => {
                onChange(t.id);
                setOpen(false);
              }}
              className={`flex items-center gap-[8px] w-full text-left font-['Nunito'] text-[13px] px-[12px] py-[6px] cursor-pointer hover:bg-[#f5f5f5] ${
                t.id === value ? "font-bold text-[#12266f]" : "text-[#334156]"
              }`}
            >
              <span className="w-[15px] shrink-0 flex items-center justify-center">
                {t.id === "all" ? (
                  <Users className="w-[15px] h-[15px]" />
                ) : (
                  <UserTypeIcon type={t.id} />
                )}
              </span>
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function TestimonyFeed({
  items,
  showTypeIcon = true,
  showDescriptor = true,
  includeFollowingFilter = false,
  initialFilter = "all",
  initialTypeFilter = "all",
  asCards = false,
  includeTypeFilter = false,
  title,
  stickyTop,
}: {
  items: TestimonyItem[];
  showTypeIcon?: boolean;
  showDescriptor?: DescriptorMode;
  /** Render each entry in its own card instead of as rows inside one. */
  asCards?: boolean;
  /** Add the account-type dropdown ahead of the stance chips. */
  includeTypeFilter?: boolean;
  /** Heading rendered inline at the head of the filter row. */
  title?: string;
  /** When set, the filter bar pins at this offset while the feed scrolls. */
  stickyTop?: string;
  /** Add a "Following" toggle that narrows any stance filter to accounts the
      viewer follows. */
  includeFollowingFilter?: boolean;
  /** Stance filter to open with (e.g. when arriving from a Vote card). */
  initialFilter?: StanceFilter;
  /** Account-type filter to open with, alongside `initialFilter`. */
  initialTypeFilter?: TypeFilter;
}) {
  const [filter, setFilter] = useState<StanceFilter>(initialFilter);
  // Following is an overlay, not a stance: it combines with every stance chip.
  const [followingOnly, setFollowingOnly] = useState(false);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>(initialTypeFilter);
  // The feed itself is masked so entries fade out in opacity as they rise
  // toward the pinned bar. The fade line is fixed to the viewport while the
  // feed scrolls, so its offset within the feed is recomputed on scroll and
  // handed to the mask as a CSS variable.
  const barRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = barRef.current;
    const feed = feedRef.current;
    if (!stickyTop || !bar || !feed) return;
    const onScroll = () => {
      const rect = bar.getBoundingClientRect();
      const feedTop = feed.getBoundingClientRect().top;
      feed.style.setProperty(
        "--fade-end",
        `${Math.max(0, rect.bottom - feedTop)}px`,
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [stickyTop]);

  const showFilters = items.length >= FEED_CONTROLS_MIN;
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
  const shown =
    showFilters && includeTypeFilter && typeFilter !== "all"
      ? filtered.filter(
          (t) =>
            POSITION_USERS.find((u) => u.id === t.userId)?.userType ===
            typeFilter,
        )
      : filtered;

  return (
    <div>
      {/* Stuck, the bar needs the page colour behind it and a gap beneath, or
          white testimony cards scroll flush against the white filter card. */}
      {showFilters && (
        <div
          ref={barRef}
          style={stickyTop ? { top: stickyTop } : undefined}
          className={
            stickyTop
              ? "sticky z-[8] bg-[#ededed] pt-[16px] pb-[16px]"
              : "mb-[16px]"
          }
        >
          <div
            className={
              asCards ? "bg-white rounded-[8px] px-[20px] py-[14px]" : ""
            }
          >
            <div className="flex min-h-[30px] items-center gap-[6px] flex-wrap">
              {title && (
                <h3 className="font-['Nunito'] font-normal text-[18px] text-black mr-[6px]">
                  {title}
                </h3>
              )}
              <div className="ml-auto flex items-center gap-[6px] flex-wrap">
                {includeTypeFilter && (
                  <>
                    <TypeFilterMenu
                      value={typeFilter}
                      onChange={setTypeFilter}
                    />
                    <span
                      aria-hidden="true"
                      className="text-[#d1d1d1] select-none mx-[2px]"
                    >
                      |
                    </span>
                  </>
                )}
                <div
                  role="group"
                  aria-label="Filter by stance"
                  className="inline-flex items-center rounded-[100px] border border-[#d1d1d1] bg-white overflow-hidden"
                >
                  {STANCE_FILTERS.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setFilter(id)}
                      aria-pressed={filter === id}
                      className={`font-['Nunito'] font-semibold text-[12px] px-[12px] py-[4px] cursor-pointer transition-colors border-l border-[#e5e7eb] first:border-l-0 ${
                        filter === id
                          ? "bg-[rgba(232,239,255,0.68)] text-[#1e3f8a]"
                          : "text-[#606060] hover:bg-[#f5f5f5]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {includeFollowingFilter && (
                  <>
                    <span
                      aria-hidden="true"
                      className="text-[#d1d1d1] select-none mx-[2px]"
                    >
                      |
                    </span>
                    <FilterChip
                      active={followingOnly}
                      ariaPressed={followingOnly}
                      onClick={() => setFollowingOnly((f) => !f)}
                      title={
                        followingOnly
                          ? "Clear the Following filter"
                          : "Only accounts you follow"
                      }
                      className="inline-flex items-center gap-[5px]"
                    >
                      Following
                      {followingOnly && <X className="w-[12px] h-[12px]" />}
                    </FilterChip>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {shown.length > 0 ? (
        asCards ? (
          <div
            ref={feedRef}
            style={
              stickyTop
                ? {
                    maskImage:
                      "linear-gradient(to bottom, transparent calc(var(--fade-end, 0px) - 44px), #000 var(--fade-end, 0px))",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent calc(var(--fade-end, 0px) - 44px), #000 var(--fade-end, 0px))",
                  }
                : undefined
            }
            className="flex flex-col gap-[16px]"
          >
            {shown.map((t) => (
              <div key={t.id} className="bg-white rounded-[8px]">
                <TestimonyEntry
                  t={t}
                  showTypeIcon={showTypeIcon}
                  showDescriptor={showDescriptor}
                />
              </div>
            ))}
          </div>
        ) : (
          <TestimonyList
            items={shown}
            showTypeIcon={showTypeIcon}
            showDescriptor={showDescriptor}
          />
        )
      ) : (
        // Individuals is the one empty result a visitor can act on themselves,
        // so it keeps the invitation; every other empty result only offers a
        // way back out of the filters.
        <div className="border-[1.5px] border-dashed border-[#d1d1d1] rounded-[12px] p-[22px] text-center bg-white">
          <p className="font-['Nunito'] font-bold text-[15px] text-black mb-[4px]">
            {typeFilter === "individual"
              ? "No individual testimony yet"
              : "No testimony matches these filters"}
          </p>
          <p className="font-['Nunito'] text-[13px] text-[#606060] leading-[1.5] max-w-[560px] mx-auto">
            {typeFilter === "individual"
              ? "No residents have submitted testimony on this question yet. Be among the first to add your perspective."
              : "Try widening your selection to see submissions on this question."}
          </p>
          <div className="flex gap-[10px] justify-center mt-[14px] flex-wrap">
            {typeFilter === "individual" && (
              <button className="bg-[#12266f] text-white font-['Nunito'] font-bold text-[13px] px-[18px] py-[8px] rounded-[100px] cursor-pointer hover:bg-[#0d1c52]">
                Share your perspective
              </button>
            )}
            <button
              onClick={() => {
                setFilter("all");
                setTypeFilter("all");
                setFollowingOnly(false);
              }}
              className="bg-white border border-[#12266f] text-[#12266f] font-['Nunito'] font-bold text-[13px] px-[18px] py-[8px] rounded-[100px] cursor-pointer hover:bg-[rgba(232,239,255,0.4)]"
            >
              Clear filters
            </button>
          </div>
        </div>
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
          <div className="max-w-[760px] mx-auto grid">
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
      subtitle="Submitted by verified organization user accounts. Each account chose endorse, oppose, or no position before writing; testimony appears in the account's own words and is never edited."
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
