import { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  SynthSummaryCard,
  Card,
  Timeline,
  SynthSourcesNote,
  CitationBlock,
  Facts,
  StakeholderGrid,
} from "../../ballot";
import { RC } from "../../../data/tax-rebate-62f";

// The "Path to the Ballot" timeline card, with expand/collapse. Exported so the
// Grace variant's Ballot Coverage tab can render it too. `collapsedHeight` lets
// the Background tab match it to the adjacent Context card; standalone it falls
// back to a sensible default.
export function PathToBallotCard({
  collapsedHeight,
}: {
  collapsedHeight?: number;
}) {
  const [pathExpanded, setPathExpanded] = useState(false);
  const height = pathExpanded ? undefined : (collapsedHeight ?? 420);
  return (
    <div
      style={height ? { height } : undefined}
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
  );
}

// The "Context and History" AI-synthesis card. Exported so the Grace variant's
// Ballot Coverage tab can render it at the top too.
export function ContextHistoryCard() {
  return (
    <SynthSummaryCard
      title="Context and History"
      ids={[
        "petition",
        "h5006",
        "question3_1986",
        "question1_2022",
        "ballotpedia",
      ]}
      prompt="Summarize how Petition No. 25-17 reached the November 2026 ballot — filing, certification, signature rounds, and legislative review — plus the history of the 62F cap (Question 3, 1986) and the 2022 surtax (Question 1) it would fold in. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
    >
      <p>
        Petition No. 25-17 was filed in August 2025 and certified by the
        Attorney General that September. Supporters submitted roughly 86,000
        first-round signatures in November, of which 85,588 were certified —
        above the 74,574 required — sending the measure to the Legislature as
        House Bill 5006. Lawmakers did not act by the May 2026 deadline, so a
        second round of signature collection began to place the question on the
        November 2026 ballot.
      </p>
      <p>
        Chapter 62F dates to 1986, when voters approved Question 3 and created a
        cap on allowable state tax revenue, refunding any excess to taxpayers.
        The cap has been exceeded only twice in nearly forty years — most
        recently in 2022, when it returned about $3 billion. In 2022 voters also
        approved Question 1, a 4% surtax on income above $1 million dedicated to
        education and transportation; that revenue is not currently counted
        toward the 62F cap. This measure would change both pieces of the
        formula.
      </p>
    </SynthSummaryCard>
  );
}

// "What happens if it passes" — AI-synthesis card. Exported so the Grace
// variant's Overview can render it too.
export function WhatHappensCard() {
  return (
    <SynthSummaryCard
      title="What happens if it passes"
      ids={["petition", "chapter62F", "section2BBBBBB"]}
      prompt="Summarize what would happen if the measure passes — how the recalculated cap is computed, when surtax revenue starts counting, what remains for the Legislature and agencies to implement, and what the official fiscal statement says. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
    >
      <p>
        Beginning with the first applicable tax year, the 62F revenue limit
        would be recomputed from the net revenue the state actually collected
        the prior year, plus three-year wage growth — and revenue from the 2022
        income surtax would be counted toward the total. Because the base would
        track real collections rather than the higher allowable maximum, the cap
        would generally sit lower and be exceeded more often, triggering
        automatic refunds in more years. The Department of Revenue and the
        Auditor would apply the revised formula; how the change interacts with
        the surtax's dedicated education-and-transportation purpose is an open
        legal question. The official statement of fiscal consequences would say
        what effect this has on state finances once the Information for Voters
        is published.
      </p>
    </SynthSummaryCard>
  );
}

// "What it would cost" — the fiscal card: the official statement anchors and
// campaign money-claims are shown against it. Exported for the Grace Overview.
export function FiscalCard() {
  return (
    <Card
      title="What it would cost"
      subtitle="The official fiscal statement is the anchor; campaign claims about money are shown against it, each attributed."
    >
      <div className="space-y-[16px]">
        <CitationBlock
          kind="official"
          title="Official statement of fiscal consequences"
        >
          <p className="font-['Nunito'] italic text-[12px] text-[#808080] mt-[2px]">
            Sample — replaced by the official statement when the Information for
            Voters is published.
          </p>
          <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[6px] leading-[1.5]">
            “The proposed law would change the calculation of the state tax
            revenue limit and may have fiscal consequences for state government
            finances; the amount cannot be determined with certainty.”
          </p>
          <p className="font-['Nunito'] text-[12px] text-[#808080] mt-[6px] leading-[1.5]">
            As required by law, statements of fiscal consequences are written by
            the Executive Office for Administration and Finance and published in
            the Information for Voters. The 2024 statements were one sentence
            each; this sample follows that form.
          </p>
        </CitationBlock>

        {/* Attributed campaign claims — outside info, green citation blocks. */}
        <div>
          <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[8px]">
            Fiscal claims that go beyond the official statement
          </p>
          <div className="space-y-[12px]">
            <CitationBlock
              kind="outside"
              title="“A revised cap would have returned ~$19 billion to taxpayers over four decades”"
            >
              <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[2px] leading-[1.5]">
                Made by the Massachusetts Opportunity Alliance in its policy
                brief — a projection from the campaign's own recalculation, not
                an independent estimate; disputed by the opposing campaign.
              </p>
              <div className="mt-[6px]">
                <SynthSourcesNote
                  ids={["maoBrief"]}
                  variant="plain"
                  linkClass="text-[#166534] hover:text-[#0f4a26]"
                />
              </div>
            </CitationBlock>
            <CitationBlock
              kind="outside"
              title="“The measures would strip billions from schools, hospitals, and services”"
            >
              <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[2px] leading-[1.5]">
                Made by the opposing campaign about the two tax questions
                combined — a projected impact the official statement does not
                make; the size depends on future revenue and is contested.
              </p>
              <div className="mt-[6px]">
                <SynthSourcesNote
                  ids={["protectMAFuture", "massBudget"]}
                  variant="plain"
                  linkClass="text-[#166534] hover:text-[#0f4a26]"
                />
              </div>
            </CitationBlock>
          </div>
        </div>
      </div>
    </Card>
  );
}

// "Who is impacted?" — per-group impact tiles. Exported for the Grace Overview.
export function WhoIsImpactedCard() {
  return (
    <Card
      title="Who is impacted"
      stickyTop="var(--hero-h, 0px)"
      subtitle="How different groups would be affected if the measure passes. Claims marked ⚠ are projected or disputed."
    >
      <StakeholderGrid rows={RC.stakeholders} />
    </Card>
  );
}

export function BackgroundTab() {
  const ctxCardRef = useRef<HTMLDivElement>(null);
  const [ctxCardH, setCtxCardH] = useState<number | null>(null);
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
        <ContextHistoryCard />
      </div>

      <PathToBallotCard
        collapsedHeight={ctxCardH ? ctxCardH + 96 : undefined}
      />

      <WhatHappensCard />
      <FiscalCard />
      <WhoIsImpactedCard />

      {/* Legal & structural questions raised — citation blocks colored by source kind. */}
      <Card
        title="Legal & structural questions raised"
        subtitle="Arguments about how the change would operate and hold up, each shown with who raises it. MAPLE does not predict rulings or offer legal advice."
      >
        <div className="space-y-[12px]">
          <CitationBlock
            kind="outside"
            title="Conflict with the surtax earmark"
          >
            <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[2px] leading-[1.5]">
              Raised by opponents: whether counting surtax revenue toward a
              refund cap can be squared with the constitutional dedication of
              that revenue to education and transportation. Untested for this
              design.
            </p>
            <div className="mt-[6px]">
              <SynthSourcesNote
                ids={["massBudget", "fairShare"]}
                variant="plain"
                linkClass="text-[#166534] hover:text-[#0f4a26]"
              />
            </div>
          </CitationBlock>
          <CitationBlock kind="outside" title="The downward-drift mechanism">
            <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[2px] leading-[1.5]">
              Identified in fiscal analysis as a structural feature: basing each
              year's cap on the prior year's actual collections means the
              ceiling falls after weak years and refunds, with no floor or
              recovery provision in the text.
            </p>
            <div className="mt-[6px]">
              <SynthSourcesNote
                ids={["massBudget"]}
                variant="plain"
                linkClass="text-[#166534] hover:text-[#0f4a26]"
              />
            </div>
          </CitationBlock>
          <CitationBlock kind="official" title="Amendment by the Legislature">
            <p className="font-['Nunito'] text-[13px] text-[#334156] mt-[2px] leading-[1.5]">
              Under the state constitution, voter-approved statutes such as this
              one can be amended or repealed by the Legislature after passage.
            </p>
            <div className="mt-[6px]">
              <SynthSourcesNote ids={["ballotpedia"]} variant="plain" />
            </div>
          </CitationBlock>
        </div>
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
