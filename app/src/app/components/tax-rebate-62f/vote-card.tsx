// Vote-side comparison card (Voting Yes / Voting No): summary, organizer
// avatars, funding, the side's official statement, and testifying-org avatars.

import { useMemo, useRef, useState } from "react";
import { Check, X, ArrowRight, MessagesSquare } from "lucide-react";
import { Cite, shuffled, type VoteSide } from "../ballot";
import { AvatarWithTooltip } from "./accounts";
import {
  POSITION_USERS,
  orgTestifiers,
  type PositionUser,
} from "../../data/tax-rebate-62f";

// Five avatars fit the row at the current size. A sixth would not, so from six
// onward it shows four and rolls the rest into a "+N" circle, keeping the row
// to five circles either way.
const ROW_FITS = 5;
const WITH_OVERFLOW = 4;

// The side's AG-approved statement, in the blue citation-block format.
export function OfficialStatementLine({
  text,
  who,
}: {
  text: string;
  who: string;
}) {
  return (
    <div className="border-l-[3px] border-[#3b82f6] pl-[14px]">
      <p className="font-['Nunito'] font-bold text-[13px] tracking-[0.06em] uppercase text-[#606060] mb-[4px]">
        Official Statement
      </p>
      <p className="font-['Nunito'] italic text-[14px] text-black leading-[1.55]">
        “{text}”
      </p>
      <p className="font-['Nunito'] text-[12px] text-[#606060] mt-[3px]">
        — {who}
      </p>
    </div>
  );
}

export function VoteCard({
  d,
  onOpenFinance,
  onViewTestimony,
}: {
  d: VoteSide;
  onOpenFinance?: () => void;
  onViewTestimony?: () => void;
}) {
  const isYes = d.vote === "yes";
  // Roughly the panel's height; only used to decide which side to open on.
  const FUNDING_PANEL_H = 180;
  const fundingRef = useRef<HTMLDivElement>(null);
  // Opens upward by default, dropping below only when there is no room above.
  const [fundingUp, setFundingUp] = useState(true);
  const organizers = d.organizerIds
    .map((id) => POSITION_USERS.find((u) => u.id === id))
    .filter((u): u is PositionUser => Boolean(u));
  // The organizer already has its own row above, so it is dropped from the
  // testifying list rather than appearing twice on the same card.
  const sideOrgs = useMemo(
    () =>
      shuffled(orgTestifiers(isYes ? "endorse" : "oppose")).filter(
        (u) => !d.organizerIds.includes(u.id),
      ),
    [isYes, d.organizerIds],
  );
  const shownOrgs =
    sideOrgs.length > ROW_FITS ? sideOrgs.slice(0, WITH_OVERFLOW) : sideOrgs;
  const overflowOrgs = sideOrgs.slice(shownOrgs.length);
  return (
    <div className="bg-white rounded-[8px] p-[24px] flex-1 flex flex-col gap-[20px]">
      <div className="flex items-center gap-[10px]">
        {isYes ? (
          <Check className="w-[24px] h-[24px] text-black shrink-0" />
        ) : (
          <X className="w-[24px] h-[24px] text-black shrink-0" />
        )}
        <p className="font-['Nunito'] font-normal text-[18px] text-black">
          Voting {isYes ? "Yes" : "No"}
        </p>
      </div>

      {/* Tagged so the pair can be measured together: the taller summary sets
          the height of both, keeping the rows beneath them aligned. */}
      <p
        data-vote-summary
        className="font-['Nunito'] text-[14px] text-[#334156] leading-[1.5]"
      >
        {d.summary}
        {d.ids && <Cite ids={d.ids} />}
      </p>

      <div className="grid grid-cols-2 gap-[8px]">
        <div>
          <p className="font-['Nunito'] font-bold text-[13px] text-[#606060] uppercase tracking-[0.06em] mb-[6px]">
            Campaign Organizer
          </p>
          <div className="flex gap-[6px]">
            {organizers.map((u) => (
              <AvatarWithTooltip key={u.id} user={u} size={48} />
            ))}
          </div>
        </div>
        <div>
          <p className="font-['Nunito'] font-bold text-[13px] text-[#606060] uppercase tracking-[0.06em] mb-[4px]">
            Funding Raised
          </p>
          {/* One figure to scan. The cash / in-kind split is the second
              question, so it waits for a hover. */}
          <div
            ref={fundingRef}
            onMouseEnter={() => {
              const el = fundingRef.current;
              if (!el) return;
              const r = el.getBoundingClientRect();
              // The sticky hero covers the top of the viewport, so the usable
              // ceiling is its underside, not 0.
              const heroH =
                parseFloat(getComputedStyle(el).getPropertyValue("--hero-h")) ||
                0;
              const above = r.top - heroH;
              const below = window.innerHeight - r.bottom;
              setFundingUp(above >= FUNDING_PANEL_H || above >= below);
            }}
            className="relative group inline-block"
          >
            <button
              onClick={onOpenFinance}
              aria-label="View the Campaign Finance tab"
              className="group inline-flex items-center gap-[5px] text-left whitespace-nowrap font-['Nunito'] font-bold text-[20px] text-[#12266f] hover:text-[#0d1c52] hover:font-extrabold cursor-pointer"
            >
              {d.funding}
              {/* CSS stroke-width overrides the attribute lucide renders, so
                  the arrow thickens with the rest of the hover state. */}
              <ArrowRight className="w-[13px] h-[13px] shrink-0 group-hover:[stroke-width:2.75]" />
            </button>
            {d.fundingCash && d.fundingInKind && (
              <div
                className={`absolute left-0 ${
                  fundingUp ? "bottom-full mb-[6px]" : "top-full mt-[6px]"
                } hidden group-hover:block w-[260px] bg-white border border-[#d1d1d1] rounded-[8px] shadow-[0_10px_28px_rgba(0,0,0,0.14)] p-[12px] z-30 text-left font-['Nunito'] text-[12px] text-[#334156] leading-[1.5] pointer-events-none`}
              >
                <span className="block">
                  <span className="font-bold">{d.fundingCash}</span> cash
                </span>
                <span className="block text-[#606060]">
                  Money given to the campaign as cash donations.
                </span>
                <span className="block mt-[8px]">
                  <span className="font-bold">{d.fundingInKind}</span> in-kind
                </span>
                <span className="block text-[#606060]">
                  Goods and services provided directly, such as staff time or
                  advertising.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <p className="flex items-center gap-[6px] font-['Nunito'] font-bold text-[13px] text-[#606060] uppercase tracking-[0.06em] mb-[6px]">
          <MessagesSquare className="w-[15px] h-[15px] shrink-0" />
          {d.sideLabel}
        </p>
        <div className="flex items-center flex-wrap gap-[6px]">
          {shownOrgs.map((u) => (
            <AvatarWithTooltip key={u.id} user={u} size={48} />
          ))}
          {overflowOrgs.length > 0 && (
            <div
              title={overflowOrgs.map((u) => u.name).join(", ")}
              className="w-[48px] h-[48px] rounded-full bg-[rgba(232,239,255,0.68)] border border-[#c9d8ff] flex items-center justify-center shrink-0"
            >
              <span className="font-['Nunito'] font-bold text-[12px] text-[#1e3f8a]">
                +{overflowOrgs.length}
              </span>
            </div>
          )}
          <button
            onClick={onViewTestimony}
            className="group font-['Nunito'] font-bold text-[13px] text-[#12266f] hover:text-[#0d1c52] hover:font-extrabold cursor-pointer inline-flex items-center gap-[4px] ml-[0]"
          >
            View Testimony
            <ArrowRight className="w-[14px] h-[14px] group-hover:[stroke-width:2.75]" />
          </button>
        </div>
      </div>

      {/* Extra room above it: it closes the card, and the avatar rows directly
          above can wrap to different depths on the two sides. */}
      <div className="mt-auto pt-[16px]">
        <OfficialStatementLine text={d.official.text} who={d.official.who} />
      </div>
    </div>
  );
}
