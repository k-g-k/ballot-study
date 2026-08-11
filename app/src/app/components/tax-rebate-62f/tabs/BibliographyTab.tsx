import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { BIBLIOGRAPHY } from "../../../data/tax-rebate-62f";

// Dates are authored APA-style ("2026, March 30"); IEEE puts the month first
// and abbreviates it ("Mar. 30, 2026"). Anything that doesn't match, such as
// "n.d." or a bare year, is passed through unchanged.
const IEEE_MONTHS: Record<string, string> = {
  January: "Jan.",
  February: "Feb.",
  March: "Mar.",
  April: "Apr.",
  May: "May",
  June: "Jun.",
  July: "Jul.",
  August: "Aug.",
  September: "Sep.",
  October: "Oct.",
  November: "Nov.",
  December: "Dec.",
};

function ieeeDate(date: string) {
  const m = date.match(/^(\d{4}),\s*([A-Za-z]+)(?:\s+(\d{1,2}))?$/);
  if (!m) return date;
  const [, year, month, day] = m;
  const abbr = IEEE_MONTHS[month] ?? month;
  return day ? `${abbr} ${day}, ${year}` : `${abbr} ${year}`;
}

// Display form of a source URL: the host, without the scheme or a leading
// "www.". The link itself still points at the full URL.
function hostLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "");
  }
}

// One bibliography card, grouped by source type (official documentation,
// encyclopedia, expert opinion, news, advocacy). Entries are listed newest-first
// and rendered APA-style as bullets; the whole citation links out to its source.
export function BibliographyTab({ onAskMaple }: { onAskMaple?: () => void }) {
  // Two sticky tiers: the card title pins under the hero, and each section
  // heading pins under the title. The title's height is measured rather than
  // assumed so the second tier follows it if the type ever changes.
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const card = cardRef.current;
    const title = titleRef.current;
    if (!card || !title) return;
    const observer = new ResizeObserver(() => {
      card.style.setProperty("--bib-title-h", `${title.offsetHeight}px`);
    });
    observer.observe(title);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="flex flex-col gap-[16px]">
      <div ref={cardRef} className="bg-white rounded-[8px] p-[24px]">
        <h3
          ref={titleRef}
          style={{ top: "var(--hero-h, 0px)" }}
          className="sticky z-[6] -mx-[24px] -mt-[24px] rounded-t-[8px] bg-white px-[24px] pt-[24px] pb-[4px] font-['Nunito'] font-normal text-[18px] text-black"
        >
          Bibliography
        </h3>
        <p className="font-['Nunito'] text-[13px] text-[#808080] mb-[14px]">
          Every source used to create the contents of this ballot initiative,
          with the exception of user-submitted testimony, is cited below.
        </p>
        <div>
          {BIBLIOGRAPHY.map((sec) => (
            <div key={sec.section}>
              <p
                style={{
                  top: "calc(var(--hero-h, 0px) + var(--bib-title-h, 0px))",
                }}
                className="sticky z-[5] -mx-[24px] mb-[10px] bg-white px-[24px] py-[8px] font-['Nunito'] font-bold text-[15px] text-black"
              >
                {sec.section}
              </p>
              <ul className="list-disc list-outside pl-[20px] space-y-[8px] pb-[24px] marker:text-[#c9c9c9]">
                {sec.entries.map((e) => (
                  <li
                    key={e.title}
                    className="font-['Nunito'] text-[13px] leading-[1.6] text-black"
                  >
                    {e.person && <>{e.person}, </>}
                    &ldquo;{e.title},&rdquo; <em>{e.author}</em>,{" "}
                    {ieeeDate(e.date)}.
                    {e.url && (
                      <>
                        {" "}
                        [Online]. Available:{" "}
                        <a
                          href={e.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-baseline gap-[3px] text-[#12266f] underline underline-offset-[3px] hover:text-[#c71e32] transition-colors"
                        >
                          {hostLabel(e.url)}
                          <ArrowUpRight className="w-[12px] h-[12px] shrink-0 self-center no-underline" />
                        </a>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Tinted and bordered like the NextStepCard that closes every other tab,
          so the last thing on the page reads as a way out rather than more
          content. */}
      <div className="bg-[#f9fafc] border border-[#dee2e6] rounded-[8px] p-[24px]">
        <h3 className="font-['Nunito'] font-bold text-[16px] text-black">
          Still deciding? Ask our AI agent, Maple, about this measure
        </h3>
        <p className="font-['Nunito'] text-[13px] text-[#606060] leading-[1.5] mt-[2px]">
          Ask a plain question here on the page or through your own AI
          assistant. Answers draw only from the sources on this page and cite
          them.
        </p>
        <div className="flex items-center gap-[20px] mt-[16px] flex-wrap">
          <button
            onClick={onAskMaple}
            className="bg-white border-[1.5px] border-[#12266f] text-[#12266f] font-['Nunito'] font-bold text-[13px] px-[20px] py-[8px] rounded-[100px] cursor-pointer hover:bg-[rgba(232,239,255,0.4)]"
          >
            Ask Maple
          </button>
          <button className="font-['Nunito'] font-bold text-[13px] text-[#12266f] hover:text-[#c71e32] underline underline-offset-[4px] cursor-pointer">
            Connect your assistant (MCP) →
          </button>
        </div>
      </div>
    </div>
  );
}
