// Vote-side comparison card (Voting Yes / Voting No): summary, organizer
// avatars, funding, the side's official statement, and testifying-org avatars.

import { useMemo } from "react";
import { Check, X, ArrowRight, MessagesSquare } from "lucide-react";
import { Cite, shuffled, type VoteSide } from "../ballot";
import { AvatarWithTooltip } from "./accounts";
import {
  POSITION_USERS,
  orgTestifiers,
  type PositionUser,
} from "../../data/tax-rebate-62f";

// Show at most 6 circles: with 7+ orgs, 5 avatars plus a "+N" overflow circle.
const MAX_SIDE_AVATARS = 6;

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
      <p className="font-['Nunito'] font-bold text-[11px] tracking-[0.06em] uppercase text-[#606060] mb-[4px]">
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
  const organizers = d.organizerIds
    .map((id) => POSITION_USERS.find((u) => u.id === id))
    .filter((u): u is PositionUser => Boolean(u));
  const sideOrgs = useMemo(
    () => shuffled(orgTestifiers(isYes ? "endorse" : "oppose")),
    [isYes],
  );
  const shownOrgs =
    sideOrgs.length > MAX_SIDE_AVATARS
      ? sideOrgs.slice(0, MAX_SIDE_AVATARS - 1)
      : sideOrgs;
  const overflowOrgs = sideOrgs.slice(shownOrgs.length);
  return (
    <div className="bg-white rounded-[8px] p-[24px] flex-1 flex flex-col">
      <div className="flex items-center gap-[10px] mb-[10px]">
        {isYes ? (
          <Check className="w-[24px] h-[24px] text-black shrink-0" />
        ) : (
          <X className="w-[24px] h-[24px] text-black shrink-0" />
        )}
        <p className="font-['Nunito'] font-normal text-[18px] text-black">
          Voting {isYes ? "Yes" : "No"}
        </p>
      </div>

      <p className="font-['Nunito'] text-[15px] text-[#334156] leading-[1.5] mb-[16px]">
        {d.summary}
        {d.ids && <Cite ids={d.ids} />}
      </p>

      <div className="grid grid-cols-2 gap-[8px] mb-[20px]">
        <div>
          <p className="font-['Nunito'] font-bold text-[13px] text-[#606060] uppercase tracking-[0.06em] mb-[6px]">
            Campaign Organizer
          </p>
          <div className="flex gap-[6px]">
            {organizers.map((u) => (
              <AvatarWithTooltip key={u.id} user={u} />
            ))}
          </div>
        </div>
        <div>
          <p className="font-['Nunito'] font-bold text-[13px] text-[#606060] uppercase tracking-[0.06em] mb-[4px]">
            Funding Raised
          </p>
          <button
            onClick={onOpenFinance}
            title="View the Campaign Finance tab"
            className="font-['Nunito'] font-bold text-[22px] text-[#12266f] hover:text-[#c71e32] cursor-pointer"
          >
            {d.funding}
          </button>
        </div>
      </div>

      <div className="mb-[20px]">
        <OfficialStatementLine text={d.official.text} who={d.official.who} />
      </div>

      <div className="mt-auto">
        <p className="flex items-center gap-[6px] font-['Nunito'] font-bold text-[13px] text-[#606060] uppercase tracking-[0.06em] mb-[6px]">
          <MessagesSquare className="w-[15px] h-[15px] shrink-0" />
          {d.sideLabel}
        </p>
        <div className="flex items-center flex-wrap gap-[6px]">
          {shownOrgs.map((u) => (
            <AvatarWithTooltip key={u.id} user={u} />
          ))}
          {overflowOrgs.length > 0 && (
            <div
              title={overflowOrgs.map((u) => u.name).join(", ")}
              className="w-[40px] h-[40px] rounded-full bg-[rgba(232,239,255,0.68)] border border-[#c9d8ff] flex items-center justify-center shrink-0"
            >
              <span className="font-['Nunito'] font-bold text-[12px] text-[#1e3f8a]">
                +{overflowOrgs.length}
              </span>
            </div>
          )}
          <button
            onClick={onViewTestimony}
            className="font-['Nunito'] font-bold text-[13px] text-[#12266f] hover:text-[#c71e32] cursor-pointer inline-flex items-center gap-[4px] ml-[0]"
          >
            View Testimony
            <ArrowRight className="w-[14px] h-[14px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
