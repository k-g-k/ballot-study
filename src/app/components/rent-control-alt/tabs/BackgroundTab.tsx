import { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  SynthSummaryCard,
  Card,
  Timeline,
  AnalysisSection,
  SynthSourcesNote,
  CitationBlock,
  Facts,
  StakeholderGrid,
} from "../../ballot";
import { RC } from "../../../data/rent-control";

export function BackgroundTab() {
  // Path to the Ballot starts collapsed at a bit more than the height of the
  // Context and History card above it (measured the same way the shell mirrors
  // the hero), with an Expand button that opens it to full size.
  const ctxCardRef = useRef<HTMLDivElement>(null);
  const [ctxCardH, setCtxCardH] = useState<number | null>(null);
  const [pathExpanded, setPathExpanded] = useState(false);
  useEffect(() => {
    const el = ctxCardRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setCtxCardH(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="flex flex-col gap-[16px]">
      <div ref={ctxCardRef}>
        <SynthSummaryCard
          title="Context and History"
          ids={["petition", "h5008", "q9", "ballotpedia"]}
          prompt="Summarize how Petition No. 25-21 reached the November 2026 ballot — filing, certification, signature rounds, and legislative review — plus the history of rent control at the Massachusetts ballot. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
        >
          <p>
            Petition No. 25-21 was filed in August 2025 and certified by the
            Attorney General that September. Supporters submitted more than
            124,000 first-round signatures in November, of which 88,132 were
            certified — well above the 74,574 required — sending the measure to
            the Legislature as House Bill 5008. Lawmakers did not act by the May
            2026 deadline, so a second round of signature collection began to
            place the question on the November 2026 ballot.
          </p>
          <p>
            Rent control has been banned statewide since 1994, when voters
            approved Question 9 and repealed the programs in Boston, Cambridge,
            and Brookline. Recent bills to allow local rent control have not
            passed, and in June 2026 both the YES campaign and leading opponents
            signaled openness to a legislative compromise that could still take
            the question off the ballot.
          </p>
        </SynthSummaryCard>
      </div>

      {/* Same card chrome as Card. Collapsed, it clips the timeline behind a
          fade; Expand opens the card to its natural height. */}
      <div
        style={
          !pathExpanded && ctxCardH ? { height: ctxCardH + 96 } : undefined
        }
        className="bg-white rounded-[8px] p-[24px] flex flex-col min-h-0"
      >
        <h3 className="font-['Nunito'] font-normal text-[18px] text-black mb-[4px]">
          Path to the Ballot
        </h3>
        <div className="mb-[12px]" />
        <div
          className={`flex-1 min-h-0 relative ${
            pathExpanded ? "" : "overflow-hidden"
          }`}
        >
          <Timeline items={[...RC.timeline].reverse()} />
          {!pathExpanded && (
            <div className="absolute inset-x-0 bottom-0 h-[56px] bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>
        <div className="flex justify-center pt-[10px]">
          <button
            onClick={() => setPathExpanded((e) => !e)}
            aria-expanded={pathExpanded}
            className="inline-flex items-center gap-[5px] bg-white border border-[#d1d1d1] text-[#606060] hover:border-[#a0a0a0] font-['Nunito'] font-semibold text-[12px] px-[14px] py-[5px] rounded-[100px] cursor-pointer"
          >
            {pathExpanded ? "Collapse" : "Expand"}
            {pathExpanded ? (
              <ChevronUp className="w-[13px] h-[13px]" />
            ) : (
              <ChevronDown className="w-[13px] h-[13px]" />
            )}
          </button>
        </div>
      </div>

      <Card
        title="Implementation"
        subtitle="What passage would set in motion — next steps, fiscal consequences, and legal questions."
      >
        <div className="space-y-[24px]">
          {/* What happens if it passes — AI-synthesis pattern. */}
          <AnalysisSection
            title="What happens if it passes"
            ids={["petition", "spoaGuide"]}
            prompt="Summarize what would happen if the measure passes — effective date and baseline, exemptions, the enforcement and guidance work left to the Legislature and agencies, expected litigation, and what the official fiscal statement says. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
          >
            <p className="font-['Nunito'] text-[14px] text-black leading-[1.55] mb-[6px]">
              The cap would take effect using rents in place as of January 31,
              2026 as the baseline — or the most recent rent if a unit was then
              vacant — with the exemptions set out in the official summary under
              Bibliography; units rented with a mobile housing voucher stay
              covered even though other publicly regulated units are exempt. The
              Legislature and agencies would then set enforcement and guidance,
              and owner groups have signaled likely court challenges. The
              official fiscal statement says any effect on state and municipal
              finances cannot be determined with certainty.
            </p>
          </AnalysisSection>

          {/* What it would cost — the official statement anchors; campaign
              claims are shown against it, each attributed. */}
          <div>
            <p className="font-['Nunito'] font-semibold text-[14px] text-black">
              What it would cost
            </p>
            <p className="font-['Nunito'] text-[13px] text-[#808080] mb-[12px] leading-[1.5]">
              The official fiscal statement is the anchor; campaign claims about
              money are shown against it, each attributed.
            </p>
            <div className="space-y-[16px]">
              <CitationBlock
                kind="official"
                title="Official statement of fiscal consequences"
              >
                <p className="font-['Nunito'] italic text-[12px] text-[#808080] mt-[2px]">
                  Sample — replaced by the official statement when the
                  Information for Voters is published.
                </p>
                <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[6px] leading-[1.5]">
                  “The proposed law may have fiscal consequences for state and
                  municipal government finances; the amount cannot be determined
                  with certainty.”
                </p>
                <p className="font-['Nunito'] text-[12px] text-[#808080] mt-[6px] leading-[1.5]">
                  As required by law, statements of fiscal consequences are
                  written by the Executive Office for Administration and Finance
                  and published in the Information for Voters. The 2024
                  statements were one sentence each; this sample follows that
                  form.
                </p>
              </CitationBlock>

              {/* Attributed campaign claims — outside info, green citation
                  blocks, one per quote. */}
              <div>
                <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[8px]">
                  Fiscal claims that go beyond the official statement
                </p>
                <div className="space-y-[12px]">
                  <CitationBlock
                    kind="outside"
                    title="“The measure would shrink the residential tax base 6–9% and pressure municipal budgets”"
                  >
                    <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[2px] leading-[1.5]">
                      Made by the Greater Boston Real Estate Board, citing its
                      report with Tufts CSPA — a projection the official
                      statement does not make; extrapolated from Cambridge and
                      St. Paul studies; disputed by the supporting campaign.
                    </p>
                    <div className="mt-[6px]">
                      <SynthSourcesNote
                        ids={["tuftsWBUR", "tuftsGlobe"]}
                        variant="plain"
                        linkClass="text-[#166534] hover:text-[#0f4a26]"
                      />
                    </div>
                  </CitationBlock>
                  <CitationBlock
                    kind="outside"
                    title="“Predictable rents reduce displacement costs borne by communities”"
                  >
                    <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[2px] leading-[1.5]">
                      Made by supporting organizations — a benefit claim the
                      official statement does not address.
                    </p>
                    <div className="mt-[6px]">
                      <SynthSourcesNote
                        ids={["cbsSigs", "keepMAHome"]}
                        variant="plain"
                        linkClass="text-[#166534] hover:text-[#0f4a26]"
                      />
                    </div>
                  </CitationBlock>
                </div>
              </div>
            </div>
          </div>

          {/* Legal questions raised — citation blocks colored by source kind. */}
          <div>
            <p className="font-['Nunito'] font-semibold text-[14px] text-black">
              Legal questions raised
            </p>
            <p className="font-['Nunito'] text-[13px] text-[#808080] mb-[12px] leading-[1.5]">
              Arguments about how the law would hold up, each shown with who
              raises it. MAPLE does not predict rulings or offer legal advice.
            </p>
            <div className="space-y-[12px]">
              <CitationBlock kind="outside" title="Takings and fair rate of return">
                <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[2px] leading-[1.5]">
                  Raised by property-owner organizations as likely post-passage
                  litigation — the argument that a cap binding at turnover denies
                  owners a fair return; untested for this design.
                </p>
                <div className="mt-[6px]">
                  <SynthSourcesNote
                    ids={["spoaGuide"]}
                    variant="plain"
                    linkClass="text-[#166534] hover:text-[#0f4a26]"
                  />
                </div>
              </CitationBlock>
              <CitationBlock
                kind="outside"
                title="Interaction with existing tenant-landlord law"
              >
                <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[2px] leading-[1.5]">
                  Identified in coverage and owner-association analyses as an
                  open drafting question: how the cap interfaces with Ch. 93A and
                  existing eviction protections.
                </p>
                <div className="mt-[6px]">
                  <SynthSourcesNote
                    ids={["spoaGuide"]}
                    variant="plain"
                    linkClass="text-[#166534] hover:text-[#0f4a26]"
                  />
                </div>
              </CitationBlock>
              <CitationBlock kind="official" title="Amendment by the Legislature">
                <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[2px] leading-[1.5]">
                  Under the state constitution, voter-approved statutes can be
                  amended or repealed by the Legislature after passage.
                </p>
                <div className="mt-[6px]">
                  <SynthSourcesNote ids={["article48"]} variant="plain" />
                </div>
              </CitationBlock>
            </div>
          </div>
        </div>
      </Card>

      {/* Scope — per-group impact tiles */}
      <Card
        title="Stakeholder Impact"
        subtitle="How different groups would be affected if the measure passes. Claims marked ⚠ are projected or disputed."
      >
        <StakeholderGrid rows={RC.stakeholders} />
      </Card>

      <Card title="Related Context">
        <Facts items={RC.relatedContext} />
      </Card>

      <Card title="Signature & Process Facts">
        <Facts items={RC.processFacts} />
      </Card>
    </div>
  );
}
