import { ExternalLink } from "lucide-react";
import type { Study } from "../types";

// A titled, bulleted list of studies (citation — affiliation — finding — link).
export function ResearchGroup({
  title,
  studies,
}: {
  title: string;
  studies: Study[];
}) {
  if (!studies.length) return null;
  return (
    <div>
      <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[8px]">
        {title}
      </p>
      <ul className="list-disc list-outside pl-[18px] space-y-[8px]">
        {studies.map((s) => (
          <li
            key={s.citation}
            className="font-['Nunito'] text-[13px] text-[#334156] leading-[1.5]"
          >
            <span className="font-semibold text-black">{s.citation}</span>
            {s.affiliation && s.affiliation !== "peer-reviewed" && (
              <span className="italic text-[#606060]"> — {s.affiliation}</span>
            )}
            {" — "}
            {s.finding}
            {s.url && (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Nunito'] text-[12px] font-bold text-[#12266f] hover:text-[#c71e32] inline-flex items-center gap-[3px] ml-[4px] align-baseline"
              >
                Source <ExternalLink className="w-[11px] h-[11px]" />
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
