import { SynthSummaryCard, Card, FinanceLedger } from "../../ballot";
import { RC } from "../../../data/tax-rebate-62f";

export function CampaignFinanceTab() {
  return (
    <div className="flex flex-col gap-[16px]">
      <SynthSummaryCard
        title="Funding Pattern"
        ids={["ocpf", "ballotpedia"]}
        prompt="Summarize the OCPF campaign-finance filings for the committees supporting and opposing the 62F reform question: totals raised, cash versus in-kind contributions, notable donors, and the fact that the support committee also backs the companion income-tax question. Use only the sources listed below and cite nothing else. (Filler prompt for prototype purposes.)"
      >
        <p>
          Through the January 20, 2026 filing window, the support side had
          reported roughly $1.7 million, almost entirely in-kind — dominated by a
          single $1.6 million in-kind contribution from the Massachusetts
          Opportunity Alliance, with smaller amounts from the Massachusetts High
          Technology Council and the Pioneer Institute. The same committee,
          Taxpayers for an Affordable Massachusetts, also supports the companion
          income-tax-cut question. The opposition committee, Protect
          Massachusetts Future, had registered but reported no contributions or
          spending in this window. Dollar amounts are drawn from itemized OCPF
          filings; MAPLE does not estimate figures, and the next scheduled
          reports were due in September 2026.
        </p>
      </SynthSummaryCard>

      <Card
        title="Who is funding each side"
        subtitle="From Massachusetts OCPF filings covering through January 20, 2026 — an early snapshot; the next scheduled reports were due September 2026."
      >
        <FinanceLedger committees={RC.committees} ids={["ocpf", "ballotpedia"]} />
      </Card>
    </div>
  );
}
