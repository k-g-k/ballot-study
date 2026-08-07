import { Card } from "../../ballot";
import { BIBLIOGRAPHY } from "../../../data/rent-control";

// One bibliography card, grouped by source type (official documentation,
// educational/nonpartisan, news, advocacy). Entries are listed newest-first and
// rendered APA-style as bullets; the whole citation links out to its source.
export function BibliographyTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <Card
        title="Bibliography"
        subtitle="Every source cited on this page, grouped by type and listed newest first, in APA format."
      >
        <div className="space-y-[24px]">
          {BIBLIOGRAPHY.map((sec) => (
            <div key={sec.section}>
              <p className="font-['Nunito'] font-bold text-[15px] text-black mb-[10px]">
                {sec.section}
              </p>
              <ul className="list-disc list-outside pl-[20px] space-y-[8px] marker:text-[#c9c9c9]">
                {sec.entries.map((e) => {
                  const citation = (
                    <>
                      {e.author} ({e.date}).{" "}
                      {sec.italicTitle ? <em>{e.title}</em> : e.title}.
                    </>
                  );
                  return (
                    <li
                      key={e.title}
                      className="font-['Nunito'] text-[13px] leading-[1.6]"
                    >
                      {e.url ? (
                        <a
                          href={e.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#12266f] underline underline-offset-[3px] hover:text-[#c71e32] transition-colors"
                        >
                          {citation}
                        </a>
                      ) : (
                        <span className="text-black">{citation}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <p className="font-['Nunito'] text-[12px] text-[#808080] mt-[20px] leading-[1.5]">
          Inline citations throughout the page link to the matching entry here.
        </p>
      </Card>
    </div>
  );
}
