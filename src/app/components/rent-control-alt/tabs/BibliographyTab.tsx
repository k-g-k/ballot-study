import {
  Card,
  RefGroup,
  ResearchGroup,
  SourceNote,
  SynthSourcesNote,
  CitationBlock,
} from "../../ballot";
import { RC } from "../../../data/rent-control";

export function BibliographyTab() {
  const peerReviewed = RC.studies.filter(
    (s) => s.affiliation === "peer-reviewed",
  );
  const commissioned = RC.studies.filter(
    (s) => s.affiliation !== "peer-reviewed",
  );
  return (
    <div className="flex flex-col gap-[16px]">
      <Card
        title="Official Documentation"
        subtitle="The measure's certified documents and election records, published unedited."
      >
        <div className="space-y-[20px]">
          <CitationBlock
            kind="official"
            title="Official summary of the ballot question"
          >
            <p className="font-['Nunito'] text-[14px] text-black leading-[1.6] mt-[4px]">
              This proposed law would limit the annual rent increase for
              residential units in Massachusetts to the annual increase in the
              Consumer Price Index for a 12-month period, or 5%, whichever is
              lower. The law would not apply to units in owner-occupied buildings
              with four or fewer units; units that are subject to regulation by a
              public authority; units rented to transient guests for periods of
              less than 14 days; units operated for educational, religious, or
              non-profit purposes; and units that received their residential
              certificate of occupancy within the last 10 years. The rent in
              place for a unit as of January 31, 2026, would serve as the base
              rent for the annual rent increase limit. A violation of this law
              would be a violation of the state consumer protection law.
            </p>
            <SourceNote ids={["agSummary"]} />
          </CitationBlock>
          <RefGroup ids={["petition", "agSummary", "h5008", "q9"]} />
        </div>
      </Card>

      <Card
        title="Research & Evidence"
        subtitle="Confirmed studies relevant to the debate. Affiliation is named; MAPLE does not rank research by conclusion."
      >
        <div className="space-y-[20px]">
          <CitationBlock kind="ai">
            <p className="font-['Nunito'] text-[14px] text-black leading-[1.6]">
              The peer-reviewed literature is consistent on the trade-off: rent
              control keeps covered tenants in place, but reduces rental supply
              over time. Cambridge's 1994 decontrol raised property values even
              at never-controlled buildings nearby; in San Francisco, covered
              landlords cut rental supply about 15%, raising citywide rents; and
              the end of Massachusetts rent control had small effects on new
              construction, with larger effects on maintenance and conversion.
              The widely cited 6–9% tax-base projection does not come from this
              literature — it traces to a single industry-commissioned analysis
              extrapolating from Cambridge and St. Paul.
            </p>
            <SynthSourcesNote
              ids={["academicResearch", "tuftsGlobe"]}
              prompt="Summarize what the peer-reviewed research finds about rent control's effects on tenants, rental supply, and property values, and note where the widely cited fiscal projection diverges from that literature. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
            />
          </CitationBlock>
          <ResearchGroup title="Peer-Reviewed Research" studies={peerReviewed} />
          <ResearchGroup
            title="Industry-Commissioned Research"
            studies={commissioned}
          />
        </div>
      </Card>

      <Card
        title="Media"
        subtitle="Confirmed articles cited on this page, grouped by coverage focus."
      >
        <div className="space-y-[20px]">
          <CitationBlock kind="ai">
            <p className="font-['Nunito'] text-[14px] text-black leading-[1.6]">
              Coverage has tracked the measure's path to the ballot: the November
              2025 signature filing and Gov. Healey's December statement of
              opposition, a March 2026 dispute over an industry-commissioned
              study projecting property-value and tax-base losses, and June 2026
              reporting on compromise talks that could still keep the question
              off the ballot. Polling coverage has found majority support in
              every published survey, and campaign-finance reporting describes
              in-kind organizing support behind the YES committee against
              real-estate industry cash on the NO side.
            </p>
            <SynthSourcesNote
              ids={[
                "cbsSigs",
                "healeyGlobe",
                "tuftsGlobe",
                "tuftsWBUR",
                "cwbCompromise",
                "suffolkGlobe",
                "unhFeb",
                "wwlpPoll",
                "ocpfSHNS",
              ]}
              prompt="Summarize how confirmed media coverage of the rent-control ballot question developed across the campaign — the signature drive, official opposition, the study dispute, compromise talks, polling, and campaign finance. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
            />
          </CitationBlock>
          <RefGroup
            title="Campaign & Ballot Path"
            ids={["cbsSigs", "healeyGlobe", "cwbCompromise"]}
          />
          <RefGroup title="The Evidence Dispute" ids={["tuftsGlobe", "tuftsWBUR"]} />
          <RefGroup title="Polling" ids={["suffolkGlobe", "unhFeb", "wwlpPoll"]} />
          <RefGroup title="Campaign Finance" ids={["ocpfSHNS"]} />
        </div>
      </Card>

      <Card title="Other References">
        <div className="space-y-[20px]">
          <RefGroup
            title="Campaign Committees"
            ids={["keepMAHome", "housingForMA"]}
          />
          <RefGroup title="Encyclopedia" ids={["ballotpedia"]} />
        </div>
        <p className="font-['Nunito'] text-[12px] text-[#808080] mt-[18px] leading-[1.5]">
          Inline citations throughout the page link to the matching entry here.
        </p>
      </Card>
    </div>
  );
}
