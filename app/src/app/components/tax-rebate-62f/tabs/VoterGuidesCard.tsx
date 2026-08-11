import { ArrowUpRight } from "lucide-react";
import { Card, CitationBlock } from "../../ballot";
import { VOTER_GUIDES } from "../../../data/tax-rebate-62f";

// Prototype: every guide is clickable but no URLs are wired yet, so each title
// is a button rather than a link.
function GuideLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-baseline gap-[4px] text-left font-['Nunito'] font-bold text-[14px] text-[#12266f] leading-[1.4] hover:underline underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12266f] rounded-[2px]"
    >
      {label}
      <ArrowUpRight className="w-[14px] h-[14px] shrink-0 self-center" />
    </button>
  );
}

export function VoterGuidesCard() {
  const official = VOTER_GUIDES.filter((g) => g.kind === "official");
  const independent = VOTER_GUIDES.filter((g) => g.kind !== "official");
  return (
    <Card title="Voter Guides">
      <div className="space-y-[14px]">
        {official.map((g) => (
          <CitationBlock key={g.name} kind="official">
            <GuideLink label={g.name} />
            <p className="font-['Nunito'] text-[13px] text-[#808080] leading-[1.5] pb-[10px]">
              {g.note}
            </p>
          </CitationBlock>
        ))}

        <div>
          <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[6px]">
            Independent Guides
          </p>
          <ul className="list-disc list-outside pl-[18px] space-y-[6px] marker:text-[#c9c9c9]">
            {independent.map((g) => (
              <li key={g.name}>
                <GuideLink label={`${g.publisher} — ${g.name}`} />
                <p className="font-['Nunito'] text-[13px] text-[#808080] leading-[1.5]">
                  {g.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
