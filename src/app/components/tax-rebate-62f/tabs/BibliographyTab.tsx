import { ArrowUpRight } from "lucide-react";
import { Card } from "../../ballot";
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
export function BibliographyTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <Card
        title="Bibliography"
        subtitle="Every source used to create the contents of this ballot initiative, with the exception of user-submitted testimony, is cited below."
      >
        <div className="space-y-[24px]">
          {BIBLIOGRAPHY.map((sec) => (
            <div key={sec.section}>
              <p className="font-['Nunito'] font-bold text-[15px] text-black mb-[10px]">
                {sec.section}
              </p>
              <ul className="list-disc list-outside pl-[20px] space-y-[8px] marker:text-[#c9c9c9]">
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
      </Card>
    </div>
  );
}
