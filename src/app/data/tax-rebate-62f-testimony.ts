// Quotes below are public statements reported by Ballotpedia and Massachusetts
// news outlets, recast as MAPLE submissions; submission dates are prototype
// placeholders. Some statements cover this measure and the companion
// income-tax-rate question together; those are included because they were made
// about this measure as part of that pair.

export type TestimonyStance = "endorse" | "oppose" | "no-position";

export interface TestimonyItem {
  /** Stable slug — future per-testimony URL, never reuse or rename. */
  id: string;
  /** Submitting account — `PositionUser.id` in tax-rebate-62f-users.ts. */
  userId: string;
  /** Person speaking for the account, when the statement names one. */
  speaker?: string;
  stance: TestimonyStance;
  date: string;
  body: string;
}

export const TESTIMONY: TestimonyItem[] = [
  // ── Endorse ─────────────────────────────────────────────────────────────────
  {
    id: "massfiscal-craney-loophole",
    userId: "mass-fiscal",
    stance: "endorse",
    date: "June 9, 2026",
    body: "Fixing the 62F Tax Cap Loophole is a no-brainer. Voters wanted guardrails on runaway spending, with automatic rebates to taxpayers triggered when the state collects too much, and that's exactly what makes the 62F law so popular. Due to loopholes and exclusions, especially the carveout for new surtax revenues, the law has only been triggered twice in 40 years. Beacon Hill always finds ways around the law as it's currently written. This fix closes the loopholes and restores the taxpayer protections voters overwhelmingly approved.",
  },
  {
    id: "moa-brief-spending",
    userId: "mass-opportunity-alliance",
    stance: "endorse",
    date: "June 2, 2026",
    body: "The current revenue cap has not constrained budget growth; instead budget spending levels have grown at nearly double the rate of Massachusetts average wages and local inflation. Under the revised revenue limit rooted in actual tax collections, Massachusetts taxpayers would have received a refund 24 times in the last four decades. This amounts to nearly $19 billion in taxes that should have been given back to taxpayers.",
  },
  {
    id: "pioneer-stergios-competitiveness",
    userId: "pioneer-institute",
    stance: "endorse",
    date: "May 20, 2026",
    body: "Massachusetts needs to abandon the tax-and-spend mentality that's making it harder for people and businesses to thrive. If we don't do something to control state spending and bring relief to residents, data and experience show we will continue to bleed talent and tax revenue. We look forward to educating the public on these policies that encourage fiscal responsibility and ease the burden on taxpayers as the cost-of-living continues to rise.",
  },
  {
    id: "htc-original-intent",
    userId: "mass-high-tech-council",
    stance: "endorse",
    date: "May 12, 2026",
    body: "Our organization helped write the 1986 law that gave Massachusetts taxpayers a guarantee: when the state collects far more than it needs, the excess comes back to the people who paid it. That guarantee has been hollowed out. Restoring a cap tied to what the state actually collects — and counting all of the revenue it collects — simply returns the law to what voters were promised.",
  },

  // ── Oppose ───────────────────────────────────────────────────────────────────
  {
    id: "pmf-statement-cuts",
    userId: "protect-ma-future",
    stance: "oppose",
    date: "June 5, 2026",
    body: "Massachusetts succeeds because we invest in each other — in strong public schools, reliable healthcare, safe communities, and modern infrastructure. But this measure threatens that progress by imposing an arbitrary revenue cap that could force billions of dollars in cuts. Wealthy investors and CEOs are backing it because they stand to benefit the most, while working families would pay the price through reduced public services. Together with the income-tax question, these initiatives would strip billions from classrooms, hospitals, and research that Massachusetts communities depend on.",
  },
  {
    id: "massbudget-baxandall-ratchet",
    userId: "massbudget",
    stance: "oppose",
    date: "March 30, 2026",
    body: "The ballot initiative would make the already flawed mechanism of the 62F law far more constraining over time. By ratcheting down the growth of Computed Maximum State Tax Revenues every time actual revenue growth is slow or is reduced the next year by a 62F refund, the policy would tend to continually reduce the cap on state revenues available for budgetary purposes. The result will be often unpredictable budget cuts and the abandonment of planned public investments. On top of that, because the triggered diversions of revenue into 62F payments will tend to follow a recession, the new rules will impair the state's ability to make investments at just the time when they are most needed to jumpstart the economy.",
  },
  {
    id: "seiu509-foley-chaos",
    userId: "seiu-509",
    stance: "oppose",
    date: "March 30, 2026",
    body: "Corporations in the state, they want a stable workforce, and they want a stable state, and this would completely destabilize the workforce and destabilize the working infrastructure in Massachusetts. Seven billion dollars out of a $61 billion budget is devastating. It would completely upend the Massachusetts State House and what they do, and create chaos, and chaos isn't good for business.",
  },
  {
    id: "mtf-position-counterproductive",
    userId: "mtf",
    stance: "oppose",
    date: "May 4, 2026",
    body: "These questions are intended to address real issues — affordability, competitiveness, and fiscal sustainability. But the impacts of limiting the state's annual cap on allowable tax collections would be counterproductive, putting the fiscal and economic health of the Commonwealth and its residents in a worse position. We oppose this ballot question and instead propose an alternative policy agenda to meaningfully address those same concerns.",
  },
  {
    id: "mta-classroom-cuts",
    userId: "mta",
    stance: "oppose",
    date: "April 22, 2026",
    body: "Educators across the Commonwealth have seen what happens when budgets are squeezed: larger classes, fewer counselors, and programs cut mid-year. Locking in a cap that falls a little further every lean year is a recipe for exactly that. And counting the revenue voters dedicated to schools and transportation in 2022 toward a refund cap works directly against the choice those same voters just made.",
  },

  // ── No position ──────────────────────────────────────────────────────────────
  {
    id: "spilka-distribution",
    userId: "spilka",
    stance: "oppose",
    date: "February 18, 2026",
    body: "I do want to mention that lowering the income tax from 5% to 4% is sponsored by millionaires. Millionaires will get $10,000 back from that ballot initiative; folks making minimum wage will get $300. When you change the revenue cap the same way, the money the state gives back flows on the same terms — the more you paid, the more you get. Voters should understand who these questions are really written for.",
  },
];
