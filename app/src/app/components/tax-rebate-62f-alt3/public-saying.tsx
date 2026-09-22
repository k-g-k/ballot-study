// "What is the public saying?" — the map, and nothing else.
//
// Individuals only. Organisations argue in their own names further up the page,
// and a communications shop's paragraph sitting beside a retired person's would
// flatten the difference between the two.
//
// The chapter opens with nothing to read. That is deliberate: a summary here
// would be the page telling you what the public thinks, and the point of the
// map is that you go and find out. Select a town and what came from there
// appears; until then the map is the whole chapter.

import { useEffect, useMemo, useState } from "react";
import { POSITION_USERS, testimonyFor } from "../../data/tax-rebate-62f";
import {
  MA_VIEWBOX,
  MA_OUTLINE,
  MA_ISLANDS,
  PLACES,
  cityOf,
} from "../../data/tax-rebate-62f/geography";
import { Chapter, Disclosure } from "./spine";
import {
  TestimonyFeed,
  type StanceFilter,
  type TypeFilter,
} from "../tax-rebate-62f/testimony";

/**
 * How long each town holds before the map moves on.
 *
 * Long enough to read the shortest statement in the panel rather than to
 * register that something changed. A carousel that turns faster than it can be
 * read is a distraction with the same shape as an advert.
 */
const TOUR_MS = 7000;

const STANCE_DOT = {
  supports: "bg-positive",
  opposes: "bg-negative",
  neutral: "bg-ink-faint",
} as const;

interface Filer {
  id: string;
  name: string;
  role: string;
  stance: "supports" | "opposes" | "neutral";
  city: string;
  excerpt: string;
}

/** The section the rail hands its filters to, for scrolling and for linking. */
export const FEED_ANCHOR = "public-feed";

export function WhatIsThePublicSaying({
  onOpenRail,
  feedFilter,
  onFeedFilterChange,
  feedType,
  onFeedTypeChange,
  feedOpenSignal = 0,
}: {
  /** Hand the reader off to the full feed in the rail. */
  onOpenRail?: () => void;
  /**
   * The in-page feed's filters, held by the page.
   *
   * Held there only so the rail can hand its own narrowing over when a reader
   * asks to see it here. The two feeds are otherwise unconnected: changing one
   * does nothing to the other, which is the point of having both.
   */
  feedFilter: StanceFilter;
  onFeedFilterChange: (v: StanceFilter) => void;
  feedType: TypeFilter;
  onFeedTypeChange: (v: TypeFilter) => void;
  /** Bump to open the feed, for a reader arriving from the rail. */
  feedOpenSignal?: number;
}) {
  /** The towns somebody has spoken from, in a random order per visit. */
  const tour = useMemo(() => {
    const towns = [
      ...new Set(
        POSITION_USERS.flatMap((u) =>
          u.userType === "individual" ? [cityOf(u.descriptor) ?? []].flat() : [],
        ),
      ),
    ];
    for (let i = towns.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [towns[i], towns[j]] = [towns[j], towns[i]];
    }
    return towns;
  }, []);

  // Opens on a town rather than empty, then moves through the rest.
  //
  // The panel beside the map was a prompt and nothing else, which asked the
  // reader to work out what a marker does before showing them. Rotating shows
  // it instead: what a town is, what is in it, and that there is more than one.
  // Shuffled per visit so the page does not always lead with the same place.
  const [step, setStep] = useState(0);
  // Set the moment the reader does anything here, and never unset. A rotation
  // that resumes would move the ground under someone who is reading, which is
  // worse than one that never started.
  const [touched, setTouched] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const selected = touched ? picked : (tour[step % tour.length] ?? null);

  useEffect(() => {
    if (touched || tour.length < 2) return;
    const id = window.setInterval(() => setStep((n) => n + 1), TOUR_MS);
    return () => window.clearInterval(id);
  }, [touched, tour.length]);

  /** Every control in this section goes through here, so any of them stops it. */
  const choose = (city: string | null) => {
    setTouched(true);
    setPicked(city);
  };

  const filers = useMemo<Filer[]>(() => {
    const byUser = new Map(testimonyFor(() => true).map((t) => [t.userId, t]));
    return POSITION_USERS.flatMap((u) => {
      if (u.userType !== "individual") return [];
      const city = cityOf(u.descriptor);
      if (!city) return [];
      return [
        {
          id: u.id,
          name: u.name,
          // "Retired, Holyoke" is a job and a place. The place is on the map
          // already, so only the job needs saying here.
          role: u.descriptor.split(",").slice(0, -1).join(",").trim(),
          stance: u.stance,
          city,
          excerpt: byUser.get(u.id)?.body ?? "",
        },
      ];
    });
  }, []);

  const inCity = (city: string) => filers.filter((f) => f.city === city);
  const shown = selected ? inCity(selected) : [];

  return (
    <Chapter
      id="public"
      question="What is the public saying?"
    >
      <div className="lg:grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-[44px] lg:items-start">
        {/* Dots, not filled districts. Ten people, and a choropleth would paint
            most of the state one colour and invite a reader to take an empty
            district as a district that disagrees. A dot can only say "somebody
            here spoke", which is all the data carries. */}
        <div>
          <svg
            viewBox={MA_VIEWBOX}
            role="img"
            aria-label="Massachusetts, with a marker for each town individual testimony came from"
            className="w-full h-auto"
          >
            <path d={MA_OUTLINE} className="fill-sunken" />
            {MA_ISLANDS.map((d) => (
              <path key={d} d={d} className="fill-sunken" />
            ))}
            {PLACES.map((p) => {
              const here = inCity(p.city);
              if (!here.length) return null;
              const active = selected === p.city;
              const lean =
                here.filter((f) => f.stance === "supports").length >=
                here.filter((f) => f.stance === "opposes").length
                  ? "fill-positive"
                  : "fill-negative";
              return (
                <g
                  key={p.city}
                  role="button"
                  tabIndex={0}
                  aria-pressed={active}
                  aria-label={`${p.city}, ${here.length} from here`}
                  className="cursor-pointer outline-none"
                  onClick={() => choose(selected === p.city ? null : p.city)}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter" && e.key !== " ") return;
                    e.preventDefault();
                    choose(selected === p.city ? null : p.city);
                  }}
                >
                  {/* A ring rather than a size change marks the selection, so
                      the dot keeps meaning "how many from here" throughout. */}
                  {active && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={9 + here.length * 3}
                      className="fill-none stroke-ink"
                      strokeWidth={2}
                    />
                  )}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={5 + here.length * 3}
                    // Long enough that the dimming reads as the map turning its
                    // attention rather than as a flicker, and well inside the
                    // hold so the town is settled before it can be read.
                    className={`${lean} transition-opacity duration-500 ${
                      selected && !active ? "opacity-25" : "opacity-90"
                    }`}
                  />
                  <text
                    x={p.x}
                    y={p.y - 12 - here.length * 3}
                    textAnchor="middle"
                    className={`font-body fill-ink-muted text-[19px] transition-opacity duration-500 ${
                      selected && !active ? "opacity-35" : ""
                    }`}
                  >
                    {p.city}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Empty until a town is chosen, so the chapter does not open by
            telling you what the public thinks. */}
        <div className="mt-[32px] lg:mt-0">
          {!selected ? (
            <p className="font-body text-sm text-ink-muted leading-[1.6] lg:pt-[8px]">
              Select a town.
            </p>
          ) : (
            <>
              <div className="flex items-baseline justify-between gap-[12px] pb-[12px] border-b border-line">
                <p className="font-display font-medium text-lg text-ink">
                  {selected}
                  <span className="font-body font-normal text-sm text-ink-muted">
                    {" · "}
                    {shown.length}
                  </span>
                </p>
                <button
                  onClick={() => choose(null)}
                  className="shrink-0 font-body font-semibold text-xs text-brand-ink hover:text-brand cursor-pointer"
                >
                  Clear
                </button>
              </div>

              <ul className="flex flex-col gap-[22px] mt-[18px]">
                {shown.map((f) => (
                  <li key={f.id}>
                    <p className="flex items-center gap-[8px]">
                      <span
                        aria-hidden
                        className={`w-[6px] h-[6px] rounded-full shrink-0 ${STANCE_DOT[f.stance]}`}
                      />
                      <span className="font-body font-semibold text-sm text-ink">
                        {f.name}
                      </span>
                      <span className="font-body text-xs text-ink-muted truncate">
                        {f.role}
                      </span>
                    </p>
                    <p className="font-body text-sm text-ink leading-[1.65] mt-[6px] pl-[14px]">
                      {f.excerpt}
                    </p>
                  </li>
                ))}
              </ul>

              {onOpenRail && (
                <button
                  onClick={() => {
                    setTouched(true);
                    onOpenRail?.();
                  }}
                  className="mt-[22px] font-body font-semibold text-sm text-brand-ink hover:text-brand cursor-pointer"
                >
                  Read everything in Public Perspectives
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Every statement, in full, after the map that says where they came
          from. Closed by default: the chapter's answer is the map, and a feed
          of twenty statements opened underneath it would bury that.

          Its own filters, deliberately. This feed and the one in the rail hold
          separate state, so narrowing one leaves the other alone: they are two
          readers of the same record, not two windows onto one view. Tying them
          would mean a filter set in a panel silently rewriting a section of the
          page you are not looking at.

          The pinned offset is zeroed because nothing is sticky above it here,
          unlike in the rail. */}
      {/* Parked, not deleted. Flip `false` to `true` to bring the feed back.
          A JSX comment cannot wrap this block, because the block carries
          comments of its own and the first one to end would close it early. */}
      {false && (
      <div
        id={FEED_ANCHOR}
        className="scroll-mt-[76px] lg:scroll-mt-[132px] mt-[44px] sm:mt-[56px] [--pinned-h:0px]"
      >
        <Disclosure
          variant="heading"
          label="Public Testimony"
          openSignal={feedOpenSignal}
        >
          <TestimonyFeed
            items={testimonyFor(() => true)}
            filter={feedFilter}
            onFilterChange={onFeedFilterChange}
            typeFilter={feedType}
            onTypeFilterChange={onFeedTypeChange}
            includeFollowingFilter
            includeTypeFilter
            asCards
            // The floating button is the one place to add a perspective now,
            // and it is on screen wherever you are on the page. A second
            // control inside the feed would be two doors to one room.
            hideAddButton
            // Paged here, scrolling in the rail. The rail has its own scroller
            // and a fixed height to fill; this sits inside the page's scroll,
            // where an unpaged feed would push the two chapters below it a
            // screen and a half down the moment the section is opened.
            pageSize={5}
          />
        </Disclosure>
      </div>
      )}

      {/* Held open on purpose. A dashed outline and a plain label rather than
          greyed-out fake content: a placeholder that imitates the thing it is
          standing in for gets read as a broken feature, and in a demo it gets
          read as a finished one. */}
      <div className="mt-[44px] sm:mt-[56px] rounded-card border border-dashed border-line-strong px-[24px] py-[32px] sm:px-[32px]">
        <p className="font-body font-semibold text-2xs uppercase tracking-[0.08em] text-ink-faint">
          Not built yet
        </p>
        <p className="font-display font-medium text-lg sm:text-xl tracking-display text-ink mt-[10px]">
          Discussions explorer
        </p>
        <p className="font-body text-sm text-ink-muted leading-[1.65] mt-[8px] max-w-[62ch]">
          A way to read across the facilitated discussions rather than one
          transcript at a time: where the rooms agreed, where they came apart,
          and which questions nobody answered.
        </p>
      </div>
    </Chapter>
  );
}
