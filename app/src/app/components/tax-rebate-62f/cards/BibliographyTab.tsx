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
      <div ref={cardRef} className="bg-surface rounded-control p-[24px]">
        <h3
          ref={titleRef}
          style={{ top: "var(--pinned-h, 0px)" }}
          className="sticky z-[6] -mx-[24px] -mt-[24px] rounded-t-control bg-surface px-[24px] pt-[24px] pb-[4px] font-body font-normal text-xl text-ink"
        >
          Bibliography
        </h3>
        <p className="font-body text-sm text-ink-muted mb-[14px]">
          Every source used to create the contents of this ballot initiative,
          with the exception of user-submitted testimony, is cited below.
        </p>
        <div>
          {BIBLIOGRAPHY.map((sec) => (
            <div key={sec.section}>
              <p
                style={{
                  top: "calc(var(--pinned-h, 0px) + var(--bib-title-h, 0px))",
                }}
                className="sticky z-[5] -mx-[24px] mb-[10px] bg-surface px-[24px] py-[8px] font-body font-semibold text-lg text-ink"
              >
                {sec.section}
              </p>
              <ul className="list-disc list-outside pl-[20px] space-y-[8px] pb-[24px] marker:text-ink-faint">
                {sec.entries.map((e) => (
                  <li
                    key={e.title}
                    className="font-body text-sm leading-[1.6] text-ink"
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
                          className="inline-flex items-baseline gap-[3px] text-brand underline underline-offset-[3px] hover:text-alert transition-colors"
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
      <div className="bg-sunken border border-line rounded-control p-[24px]">
        <h3 className="font-body font-semibold text-lg text-ink">
          Still deciding? Ask our AI agent, Maple, about this measure
        </h3>
        <p className="font-body text-sm text-ink-muted leading-[1.5] mt-[2px]">
          Ask a plain question here on the page or through your own AI
          assistant. Answers draw only from the sources on this page and cite
          them.
        </p>
        <div className="flex items-center gap-[20px] mt-[16px] flex-wrap">
          <button
            onClick={onAskMaple}
            className="bg-surface border-[1.5px] border-brand text-brand font-body font-semibold text-sm px-[20px] py-[8px] rounded-pill cursor-pointer hover:bg-brand-soft/60"
          >
            Ask Maple
          </button>
          <button className="font-body font-semibold text-sm text-brand hover:text-alert underline underline-offset-[4px] cursor-pointer">
            Connect your assistant (MCP) →
          </button>
        </div>
      </div>
    </div>
  );
}
