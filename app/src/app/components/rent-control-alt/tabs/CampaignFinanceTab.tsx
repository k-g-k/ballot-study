import { SynthSummaryCard, Card, FinanceLedger } from "../../ballot";
import { RC } from "../../../data/rent-control";

export function CampaignFinanceTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <SynthSummaryCard
        title="Funding Pattern"
        ids={["ocpfSHNS", "ballotpedia"]}
        prompt="Summarize the OCPF campaign-finance filings for the committees supporting and opposing the rent-control question: totals raised, cash versus in-kind contributions, and notable donors. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
      >
        <p>
          The two sides raised money in very different forms. The YES committee's
          total is dominated by in-kind contributions — staff time and services
          from tenant, labor, and community organizations — while the NO
          committee's total is almost entirely cash from real-estate industry
          groups (NAIOP, the Greater Boston Real Estate Board, the Massachusetts
          Association of Realtors). Dollar amounts and each donor's location are
          drawn from itemized OCPF filings; MAPLE does not estimate figures.
        </p>
      </SynthSummaryCard>

      <Card
        title="Who is funding each side"
        subtitle="From Massachusetts OCPF filings covering through January 20, 2026 — an early snapshot; the next scheduled reports were due September 2026."
      >
        <FinanceLedger committees={RC.committees} ids={["ocpfSHNS", "ballotpedia"]} />
      </Card>
    </div>
  );
}
