// Submitted-testimony UI. Each entry is renderable standalone (everything comes
// from the testimony record + its account), anticipating per-testimony URLs.

import { useState, useRef, useEffect, useMemo } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Users,
  Plus,
  Share,
} from "lucide-react";
import { Card, FilterChip, Modal } from "../ballot";
import type { DescriptorMode } from "../ballot";
import {
  UserAvatar,
  UserTypeIcon,
  StanceChip,
  STANCE_CHIP,
} from "./accounts";
import { EndorseIcon, OpposeIcon, NeutralIcon } from "./stance-icons";
import {
  RC,
  POSITION_USERS,
  testimonyFor,
  type TestimonyItem,
  type TestimonyStance,
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
  fullBody = false,
  hideAvatar = false,
}: {
  t: TestimonyItem;
  showTypeIcon?: boolean;
  showDescriptor?: DescriptorMode;
  /** Click-through to the testimony's own page (routing wired later). */
  onOpen?: (id: string) => void;
  /**
   * Render the body whole, without the six-line clamp and its Show more.
   * Used where the testimony is the point rather than one of a list.
   */
  fullBody?: boolean;
  /** Omit the avatar, for views that already show it above the card. */
  hideAvatar?: boolean;
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
        {!hideAvatar && <UserAvatar user={user} />}
        <div className="flex-1 min-w-0">
          {/* Name, type and stance wrap inside their own box; the date sits
              outside it so it always holds the top-right corner. */}
          <div className="flex items-start gap-[6px]">
            <div className="flex-1 min-w-0 flex items-center gap-[6px] flex-wrap">
              <p className="font-['Nunito'] font-semibold text-[14px] text-black leading-[1.3]">
                {user.name}
              </p>
              {showTypeIcon && <UserTypeIcon type={user.userType} />}
              {t.stance !== "no-position" && <StanceChip stance={t.stance} />}
            </div>
            <span className="shrink-0 font-['Nunito'] text-[12px] text-[#808080] whitespace-nowrap">
              {t.date}
            </span>
          </div>
          {showDesc && (
            <p className="font-['Nunito'] text-[12px] text-[#808080] leading-[1.4] mt-[1px]">
              {user.descriptor}
            </p>
          )}
          {fullBody ? (
            <p className="font-['Nunito'] text-[14px] text-black leading-[1.55] mt-[8px] whitespace-pre-line">
              {t.body}
            </p>
          ) : (
            <ClampedBody text={t.body} />
          )}
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

// The stance filter as a dropdown, for widths where the four-segment control
// no longer fits. Same shape and behaviour as TypeFilterMenu so the two read as
// a pair when both are collapsed.
function StanceFilterMenu({
  value,
  onChange,
}: {
  value: StanceFilter;
  onChange: (v: StanceFilter) => void;
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
  const current =
    STANCE_FILTERS.find((t) => t.id === value) ?? STANCE_FILTERS[0];
  // Standing alone in a dropdown, "All" has nothing to be all of. In the
  // segmented control the other three segments supply that context.
  const label = (t: (typeof STANCE_FILTERS)[number]) =>
    t.id === "all" ? "All Positions" : t.label;
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-[5px] font-['Nunito'] font-semibold text-[12px] px-[10px] py-[4px] rounded-[100px] border cursor-pointer transition-colors bg-[rgba(232,239,255,0.68)] border-[#c9d8ff] text-[#1e3f8a]"
      >
        {label(current)}
        <ChevronDown className="w-[12px] h-[12px]" />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-[calc(100%+6px)] z-20 min-w-[160px] bg-white border border-[#dee2e6] rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] py-[4px]"
        >
          {STANCE_FILTERS.map((t) => (
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
              {label(t)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// The stance as a large mark for the modal header, borrowing the chip's own
// colours so the two agree at a glance.
// Outline in the chip's text colour, filled with the chip's border colour: a
// lighter tone of the same hue, so the shape stays readable at badge size.
// The stance as a mark for the modal header. The icon and the ring take the
// same colour, so the mark reads as one thing rather than a badge on a circle.
// Oppose is orange here rather than the chip's red: against the endorse green,
// orange separates far better for the common red-green colour blindness. The
// chips keep their own reds, since there the word carries the meaning.
const STANCE_MARK: Record<
  TestimonyStance,
  { Icon: typeof EndorseIcon; hex: string }
> = {
  endorse: { Icon: EndorseIcon, hex: "#166534" },
  oppose: { Icon: OpposeIcon, hex: "#c2410c" },
  "no-position": { Icon: NeutralIcon, hex: "#606060" },
};

// Opens a testimony in place. The body is the same TestimonyEntry the feed
// renders, so the card a reader clicked is literally the card they get. Later
// this gets its own route; the modal is the step before that.
function TestimonyModal({
  t,
  showTypeIcon,
  showDescriptor,
  onClose,
}: {
  t: TestimonyItem;
  showTypeIcon?: boolean;
  showDescriptor?: DescriptorMode;
  onClose: () => void;
}) {
  const user = POSITION_USERS.find((u) => u.id === t.userId);
  return (
    <Modal
      onClose={onClose}
      title={
        <div className="flex items-center gap-[12px]">
          {/* The stance alone, ringed in its own colour. The account's logo is
              in the card below, so this says what was said, not who said it. */}
          {(() => {
            const { Icon, hex } = STANCE_MARK[t.stance];
            return (
              <div
                // Inline width: Tailwind reads a bare border-[…] as a colour,
                // so an arbitrary pixel width compiles to nothing.
                style={{ borderColor: hex, color: hex, borderWidth: 3 }}
                className="w-[40px] h-[40px] shrink-0 rounded-full border-solid bg-white flex items-center justify-center"
              >
                <Icon className="h-[18px] w-auto" />
              </div>
            );
          })()}
          <p className="font-['Nunito'] font-normal text-[18px] text-black">
            Ballot Question {RC.number} - {RC.title}
          </p>
        </div>
      }
      headerActions={
        <button
          aria-label="Share this testimony"
          className="text-[#606060] hover:text-black cursor-pointer"
        >
          <Share className="w-[19px] h-[19px]" />
        </button>
      }
      footer={
        // Deliberately empty: the bar is here so its slots have somewhere to
        // go, and so the scroll behaviour beneath it can be judged.
        <div className="h-[36px]" />
      }
      maxWidth="880px"
      minHeight="480px"
      mainMinWidth="600px"
      aside={
        // Everything that acts on this testimony rather than being part of it.
        <div className="bg-white rounded-[8px] p-[16px]">
          <p className="font-['Nunito'] font-bold text-[11px] tracking-[0.06em] uppercase text-[#606060] mb-[10px]">
            Actions
          </p>
          <div className="flex flex-col gap-[8px]">
            {["Follow This Account", "Add Your Perspective", "Report"].map(
              (label) => (
                <button
                  key={label}
                  className="w-full text-left font-['Nunito'] font-semibold text-[13px] text-[#12266f] hover:bg-[#f5f5f5] rounded-[4px] px-[8px] py-[6px] cursor-pointer"
                >
                  {label}
                </button>
              ),
            )}
          </div>
        </div>
      }
    >
      <div className="bg-white rounded-[8px]">
        <TestimonyEntry
          t={t}
          showTypeIcon={showTypeIcon}
          showDescriptor={showDescriptor}
          fullBody
        />
      </div>
    </Modal>
  );
}

// Composing a submission. A best guess at the shape: who you are, where you
// stand, what you want to say, with the rules of the road beside it rather
// than buried under it. Nothing submits; this is the form, not the plumbing.
function AddPerspectiveModal({ onClose }: { onClose: () => void }) {
  const [stance, setStance] = useState<TestimonyStance>("endorse");
  const choices: { id: TestimonyStance; label: string }[] = [
    { id: "endorse", label: "I support it" },
    { id: "oppose", label: "I oppose it" },
    { id: "no-position", label: "No position" },
  ];
  return (
    <Modal
      onClose={onClose}
      maxWidth="860px"
      minHeight="520px"
      mainMinWidth="520px"
      asideFirst
      footer={
        <div className="flex items-center justify-end gap-[12px]">
          <button
            onClick={onClose}
            className="font-['Nunito'] font-bold text-[13px] text-[#606060] hover:text-black cursor-pointer px-[8px] py-[8px]"
          >
            Cancel
          </button>
          <button className="bg-[#12266f] text-white font-['Nunito'] font-bold text-[13px] px-[18px] py-[8px] rounded-[4px] cursor-pointer hover:bg-[#0d1c52]">
            Review and Post
          </button>
        </div>
      }
      title={
        <p className="font-['Nunito'] font-normal text-[18px] text-black">
          Add your perspective on Ballot Question {RC.number}
        </p>
      }
      aside={
        <div className="flex flex-col gap-[16px]">
          <div className="bg-white rounded-[8px] p-[20px]">
            <p className="font-['Nunito'] font-bold text-[11px] tracking-[0.06em] uppercase text-[#606060] mb-[8px]">
              Before you post
            </p>
            <ul className="list-disc list-outside pl-[16px] space-y-[8px] font-['Nunito'] text-[12px] text-[#606060] leading-[1.5] marker:text-[#c9c9c9]">
              <li>
                Write in your own words. MAPLE does not edit or rank what you
                say.
              </li>
              <li>Posting is public and stays attached to your account.</li>
              <li>
                You can revise it later; earlier versions stay on the record.
              </li>
            </ul>
          </div>
          {/* Both sit on the panel's grey rather than in cards: they point off
              this form rather than being part of it. */}
          <a
            href="https://www.mapletestimony.org/learn/writing-effective-testimony"
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Nunito'] text-[12px] text-[#606060] hover:text-[#12266f] px-[16px]"
          >
            Testimony writing tips
          </a>
          <button className="text-left font-['Nunito'] text-[12px] text-[#606060] hover:text-[#12266f] cursor-pointer px-[16px]">
            View our code of conduct
          </button>
        </div>
      }
    >
      <div className="bg-white rounded-[8px] p-[20px]">
        <p className="font-['Nunito'] font-bold text-[11px] tracking-[0.06em] uppercase text-[#606060] mb-[8px]">
          Your position
        </p>
        <div className="flex gap-[8px] flex-wrap mb-[20px]">
          {choices.map(({ id, label }) => {
            const { Icon } = STANCE_MARK[id];
            const c = STANCE_CHIP[id];
            const on = stance === id;
            return (
              <button
                key={id}
                onClick={() => setStance(id)}
                aria-pressed={on}
                // Selected, it wears the same colours the chip on a posted
                // testimony will, so the choice previews its own result.
                className={`inline-flex items-center gap-[8px] rounded-[4px] border px-[14px] py-[8px] font-['Nunito'] font-semibold text-[13px] cursor-pointer transition-colors ${
                  on
                    ? `${c.bg} border-[#d1d1d1] ${c.tx}`
                    : "bg-white border-[#d1d1d1] text-[#606060] hover:bg-[#f5f5f5]"
                }`}
              >
                <Icon className="h-[16px] w-auto" />
                {label}
              </button>
            );
          })}
        </div>

        <textarea
          rows={10}
          placeholder="What do you want lawmakers and other voters to know about this question?"
          className="w-full resize-none border border-[#d1d1d1] rounded-[8px] p-[12px] font-['Nunito'] text-[14px] text-black leading-[1.55] placeholder:text-[#a0a0a0] focus:outline-none focus:border-[#12266f]"
        />
      </div>
    </Modal>
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
  const [openId, setOpenId] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);
  const openItem = items.find((t) => t.id === openId);
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
              <div className="flex items-center gap-[6px]">
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
                <div className="min-[1191px]:hidden">
                  <StanceFilterMenu value={filter} onChange={setFilter} />
                </div>
                <div
                  role="group"
                  aria-label="Filter by stance"
                  className="hidden min-[1191px]:inline-flex items-center rounded-[100px] border border-[#d1d1d1] bg-white overflow-hidden"
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
              {/* An action, not a filter: pushed to the far right so the chips
                  read as one group and this reads as separate from them. Same
                  height as they are, square corners so it does not look like
                  one more thing to toggle. */}
              <button
                onClick={() => setComposing(true)}
                className="ml-auto inline-flex items-center gap-[5px] font-['Nunito'] font-semibold text-[12px] px-[10px] py-[4px] rounded-[4px] border bg-white border-[#d1d1d1] text-[#606060] hover:bg-[#f5f5f5] cursor-pointer transition-colors"
              >
                <Plus className="w-[13px] h-[13px]" />
                {/* Two labels, one shown at a time: at narrow widths the row
                    needs the space more than the sentence. */}
                <span className="max-[1010px]:hidden">
                  Add Your Perspective
                </span>
                <span className="hidden max-[1010px]:inline">Add</span>
              </button>
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
              <div
                key={t.id}
                className="bg-white rounded-[8px] transition-shadow hover:shadow-[0_4px_14px_rgba(0,0,0,0.10)]"
              >
                <TestimonyEntry
                  t={t}
                  showTypeIcon={showTypeIcon}
                  showDescriptor={showDescriptor}
                  onOpen={setOpenId}
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
              <button
                onClick={() => setComposing(true)}
                className="bg-[#12266f] text-white font-['Nunito'] font-bold text-[13px] px-[18px] py-[8px] rounded-[100px] cursor-pointer hover:bg-[#0d1c52]"
              >
                Add Your Perspective
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
              Clear Filters
            </button>
          </div>
        </div>
      )}
      {composing && <AddPerspectiveModal onClose={() => setComposing(false)} />}
      {openItem && (
        <TestimonyModal
          t={openItem}
          showTypeIcon={showTypeIcon}
          showDescriptor={showDescriptor}
          onClose={() => setOpenId(null)}
        />
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
