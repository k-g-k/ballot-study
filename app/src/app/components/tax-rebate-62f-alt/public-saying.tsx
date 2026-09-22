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

import { useMemo, useState } from "react";
import { POSITION_USERS, testimonyFor } from "../../data/tax-rebate-62f";
import {
  MA_VIEWBOX,
  MA_OUTLINE,
  MA_ISLANDS,
  PLACES,
  cityOf,
} from "../../data/tax-rebate-62f/geography";
import { Chapter } from "./spine";

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

export function WhatIsThePublicSaying({
  onOpenRail,
}: {
  /** Hand the reader off to the full feed in the rail. */
  onOpenRail?: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

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
                  onClick={() =>
                    setSelected((c) => (c === p.city ? null : p.city))
                  }
                  onKeyDown={(e) => {
                    if (e.key !== "Enter" && e.key !== " ") return;
                    e.preventDefault();
                    setSelected((c) => (c === p.city ? null : p.city));
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
                    className={`${lean} transition-opacity ${
                      selected && !active ? "opacity-25" : "opacity-90"
                    }`}
                  />
                  <text
                    x={p.x}
                    y={p.y - 12 - here.length * 3}
                    textAnchor="middle"
                    className={`font-body fill-ink-muted text-[19px] ${
                      selected && !active ? "opacity-35" : ""
                    }`}
                  >
                    {p.city}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="font-body text-xs text-ink-muted leading-[1.6] mt-[12px] max-w-[52ch]">
            This is not a survey of Massachusetts. A town with no marker is a
            town nobody has spoken from yet.
          </p>
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
                  onClick={() => setSelected(null)}
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
                  onClick={onOpenRail}
                  className="mt-[22px] font-body font-semibold text-sm text-brand-ink hover:text-brand cursor-pointer"
                >
                  Read everything in Public Perspectives
                </button>
              )}
            </>
          )}
        </div>
      </div>

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
