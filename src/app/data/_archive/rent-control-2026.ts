// Content for the 2026 Massachusetts rent-control ballot question.
//
// Extracted verbatim (content only) from the standalone prototype
// `maple-rent-control-2026 june 30 copy.html`. No layout/UX is carried over — this
// is a pure data module. Nothing imports it yet; display wiring is a later task.
//
// Placement of each block into our tab taxonomy (overview / background /
// forAgainst / publicPerspectives / media / finance) is a curation call, not a
// mirror of the source's tabs. The source's Deliberation tab and its app chrome
// (banners, CTAs, forms, modals) are intentionally excluded.
//
// Provenance is preserved via `kind` (official / user / outside / synthesis /
// sample) and `sources` (ids into the `sources` map, r1..r24).

// ─── Types ──────────────────────────────────────────────────────────────────
export type SourceKind =
  | "official"
  | "user"
  | "outside"
  | "synthesis"
  | "sample";
export type Stance = "yes" | "no" | "none";

export interface Source {
  id: string;
  title: string;
  publisher: string; // author / outlet / org
  date: string;
  kind: SourceKind;
  url?: string; // omitted where the source has no link on file
  note: string;
}

export interface Block {
  kind: SourceKind;
  title?: string;
  body: string;
  sources?: string[];
  sample?: boolean;
}

export interface Position {
  label: string;
  stance: Stance;
  sources?: string[];
}

export interface Argument {
  title: string;
  body: string;
  sources?: string[];
}

export interface Claim {
  claim: string;
  verdict: string;
  sources?: string[];
}

export interface Testimony {
  author: string;
  community?: string;
  entity: "resident" | "organization";
  verified: boolean;
  stance: Stance;
  descriptor: string; // e.g. "Renter", "Small property owner", "Owner organization"
  body: string;
  sample?: boolean;
}

export interface ResearchItem {
  group: "peer-reviewed" | "org-report" | "comparison" | "gov-data";
  citation: string;
  finding?: string;
  affiliation?: string;
  url?: string;
}

export interface Article {
  outlet: string;
  title: string;
  url?: string;
  type: string; // "News" | "Gov't" | "Advocacy" | ...
}

export interface MediaPhase {
  phase: string;
  when: string;
  articles: Article[];
}

export interface Poll {
  pollster: string;
  result: string;
  meta: string;
  sources?: string[];
}

export interface Committee {
  name: string;
  stance: Stance;
  description: string;
  sources?: string[];
  funders?: { name: string; locale: string; note: string }[];
}

export interface Statement {
  heading: string;
  blocks: Block[];
}

// ─── Sources (r1..r24) ──────────────────────────────────────────────────────
export const sources: Record<string, Source> = {
  r1: {
    id: "r1",
    title:
      "An Initiative Petition to Protect Tenants by Limiting Rent Increases — certified petition text",
    publisher: "Secretary of the Commonwealth / Office of the Attorney General",
    date: "Certified Sep 3, 2025",
    kind: "official",
    note: "The full legal text of the measure, including coverage, baseline, and exemption provisions.",
  },
  r2: {
    id: "r2",
    title:
      "What to know about the emerging 2026 rent control ballot question fight in Massachusetts",
    publisher: "WBUR (Nik DeCosta-Klipa)",
    date: "Nov 20, 2025",
    kind: "outside",
    url: "https://www.wbur.org/news/2025/11/20/rent-control-ballot-question-massachusetts-2026-michelle-wu",
    note: "Explainer covering the cap mechanics, turnover provision, and early positions.",
  },
  r3: {
    id: "r3",
    title:
      "Rent control proposal has enough signatures for Massachusetts ballot, supporters say",
    publisher: "CBS News Boston",
    date: "Nov 2025",
    kind: "outside",
    url: "https://www.cbsnews.com/boston/news/rent-control-ballot-question-massachusetts",
    note: "Signature filing; exemptions for owner-occupied ≤4 units and 10-year new construction; campaign statements from Carolyn Chou and Rose Webster-Smith.",
  },
  r4: {
    id: "r4",
    title: "Massachusetts Rent Control Initiative (2026)",
    publisher: "Ballotpedia",
    date: "Accessed Jun 2026",
    kind: "outside",
    url: "https://ballotpedia.org/Massachusetts_Rent_Control_Initiative_(2026)",
    note: "Procedural timeline, 1994 ban history, and SJC challenge filing date.",
  },
  r5: {
    id: "r5",
    title:
      "Rent control backers scrambling to find legislative road away from the ballot",
    publisher: "CommonWealth Beacon (Jennifer Smith & Chris Lisinski)",
    date: "Jun 2, 2026",
    kind: "outside",
    url: "https://commonwealthbeacon.org/housing/rent-control-backers-scrambling-to-find-legislative-road-away-from-the-ballot/",
    note: "Compromise negotiations; quotes from both campaigns.",
  },
  r6: {
    id: "r6",
    title:
      "To avoid a costly ballot question fight, rent control supporters are floating a compromise",
    publisher: "WBUR",
    date: "Jun 3, 2026",
    kind: "outside",
    url: "https://www.wbur.org/news/2026/06/03/rent-control-ballot-question-compromise-bill",
    note: "Local-option compromise terms.",
  },
  r7: {
    id: "r7",
    title: "Campaign proposes legislation as alternative to MA rent control",
    publisher: "NBC Boston / State House News Service",
    date: "Jun 2026",
    kind: "outside",
    url: "https://www.nbcboston.com/news/politics/campaign-proposes-legislation-as-alternative-to-mass-rent-control/3959782/",
    note: "Reports opposition committee funders: MA Association of Realtors, National Association of Realtors, Equity Residential, AvalonBay Communities.",
  },
  r8: {
    id: "r8",
    title:
      "Rent control proponents offer compromise with local option instead of statewide cap",
    publisher: "Boston.com",
    date: "Jun 3, 2026",
    kind: "outside",
    url: "https://www.boston.com/news/local-news/2026/06/03/rent-control-proponents-offer-compromise-with-local-option-instead-of-statewide-cap/",
    note: "July 1 second-round signature deadline; compromise terms.",
  },
  r9: {
    id: "r9",
    title:
      "Real estate group warns rent control ballot proposal could lower property taxes for cities and towns",
    publisher: "WBUR",
    date: "Mar 12, 2026",
    kind: "outside",
    url: "https://www.wbur.org/news/2026/03/12/rent-control-ballot-initiative-affordability-housing",
    note: "GBREB / Tufts cSPA report projecting a 6–9% residential tax-base reduction; methodology (Cambridge 2014, St. Paul 2022); responses from both campaigns.",
  },
  r10: {
    id: "r10",
    title: "Poll shows more support for rent control, tax cut",
    publisher: "WWLP / Nexstar",
    date: "Feb 2026",
    kind: "outside",
    url: "https://www.wwlp.com/news/massachusetts/poll-shows-more-support-for-rent-control-tax-cut/",
    note: "Statewide poll on six potential 2026 questions: 21% opposed rent control, 21% neutral/unsure; cost of living and housing were respondents' top issues.",
  },
  r11: {
    id: "r11",
    title:
      "Council Adopts Resolution Supporting 2026 Rent Stabilization Ballot Question",
    publisher: "City of Boston (Boston.gov)",
    date: "Jan 2026",
    kind: "official",
    url: "https://www.boston.gov/news/council-adopts-resolution-supporting-2026-rent-stabilization-ballot-question",
    note: "Boston City Council resolution, adopted 9–3.",
  },
  r12: {
    id: "r12",
    title:
      "Housing for Massachusetts Coalition Spearheads the 'Vote No on Rent Control' Campaign",
    publisher: "MassLandlords (advocacy; member of the No coalition)",
    date: "Apr 2026",
    kind: "outside",
    url: "https://masslandlords.net/housing-for-massachusetts-coalition-spearheads-the-vote-no-on-rent-control-campaign/",
    note: "Opposition coalition launch, December 2025; Holyoke Mayor Joshua Garcia's stated opposition.",
  },
  r13: {
    id: "r13",
    title: "2026 Ballot Initiative Explained — Rent Control",
    publisher: "MassLandlords (trade association; member of the No coalition)",
    date: "Dec 2025, updated Jan 2026",
    kind: "outside",
    url: "https://masslandlords.net/policy/rent-control/2026-ballot-initiative-explained/",
    note: "White paper arguing for compensated rent stabilization as an alternative.",
  },
  r14: {
    id: "r14",
    title: "Out of Reach 2025 — Massachusetts (cited in coverage)",
    publisher: "National Low Income Housing Coalition (advocacy organization)",
    date: "Jul 2025",
    kind: "outside",
    note: "Finds a Massachusetts renter needs an average of $45.90/hour to afford a two-bedroom at fair market rent.",
  },
  r15: {
    id: "r15",
    title:
      "The Effects of Rent Control Expansion on Tenants, Landlords, and Inequality: Evidence from San Francisco",
    publisher: "Diamond, McQuade & Qian — American Economic Review 109(9)",
    date: "2019",
    kind: "outside",
    note: "Peer-reviewed. Covered tenants 10–20% more likely to stay; covered landlords reduced rental supply ~15%, raising citywide rents.",
  },
  r16: {
    id: "r16",
    title:
      "Housing Market Spillovers: Evidence from the End of Rent Control in Cambridge, Massachusetts",
    publisher: "Autor, Palmer & Pathak — Journal of Political Economy 122(3)",
    date: "2014",
    kind: "outside",
    note: "Peer-reviewed. Property values rose substantially after decontrol, including spillovers to never-controlled buildings.",
  },
  r17: {
    id: "r17",
    title:
      "Out of Control: What Can We Learn from the End of Massachusetts Rent Control?",
    publisher: "Sims — Journal of Urban Economics 61(1)",
    date: "2007",
    kind: "outside",
    note: "Peer-reviewed. Decontrol had small effects on new construction; larger effects on maintenance and conversion.",
  },
  r18: {
    id: "r18",
    title:
      "Gov. Healey on the rent control ballot question (Boston Public Radio remarks)",
    publisher: "Reported by WBSM / WWLP",
    date: "Dec 2025",
    kind: "outside",
    url: "https://wbsm.com/massachusetts-rent-control-poll-2026/",
    note: '"I\'m a no, because if you look at the studies, you effectively halt production."',
  },
  r19: {
    id: "r19",
    title: "UNH Survey Center poll on the rent control question",
    publisher: "University of New Hampshire Survey Center, reported by WBSM",
    date: "Early 2026",
    kind: "outside",
    url: "https://wbsm.com/massachusetts-rent-control-poll-2026/",
    note: "56% of Massachusetts voters support the measure. Full crosstabs and wording not yet on file.",
  },
  r20: {
    id: "r20",
    title: "Keep Massachusetts Home — campaign statements",
    publisher: "Keep Massachusetts Home (registered Yes committee)",
    date: "2025–26",
    kind: "official",
    note: "Campaign position statements as reported in WBUR and CommonWealth Beacon coverage.",
  },
  r21: {
    id: "r21",
    title:
      "Housing for Massachusetts — campaign statements (Conor Yunits, spokesperson)",
    publisher: "Housing for Massachusetts (registered No committee)",
    date: "2025–26",
    kind: "official",
    url: "https://www.wwlp.com/news/massachusetts/local-option-under-discussion-as-possible-rent-control-compromise/",
    note: "Campaign position statements as reported by WWLP and CommonWealth Beacon.",
  },
  r22: {
    id: "r22",
    title: "OCPF committee registrations and filings",
    publisher: "Massachusetts Office of Campaign and Political Finance",
    date: "Ongoing",
    kind: "official",
    note: "Authoritative source for committee totals, donors, and expenditures.",
  },
  r23: {
    id: "r23",
    title: "Massachusetts Constitution, Article 48 (The Initiative)",
    publisher: "Commonwealth of Massachusetts",
    date: "—",
    kind: "official",
    note: "Governs the initiative process, including legislative amendment of voter-approved statutes.",
  },
  r24: {
    id: "r24",
    title: "Massachusetts Rent Control Ballot 2026: Property Owner Guide",
    publisher:
      "Small Property Owners Association (property-owner association; opposes the measure)",
    date: "May 2026",
    kind: "outside",
    url: "https://spoa.com/learn/massachusetts-rent-control-ballot-measure-2026-guide",
    note: "Owner-side legal analysis raising takings/fair-return and Ch. 93A interaction arguments.",
  },
};

// ─── Full YES / NO statements (source STMTS) ────────────────────────────────
const statements: { yes: Statement; no: Statement } = {
  yes: {
    heading: "A YES vote — full statements",
    blocks: [
      {
        kind: "sample",
        sample: true,
        title: "What a yes vote would do",
        body: "Limit rent increases on certain residential rental units to the increase in the consumer price index or 5%, whichever is lower, including between tenancies, with exceptions including owner-occupied buildings of four or fewer units and new construction during its first ten years.",
      },
      {
        kind: "official",
        title: "Keep Massachusetts Home — campaign statement as reported",
        body: '"This modern rent-stabilization ballot initiative will protect tenants from big corporate investors who unreasonably increase rents."',
        sources: ["r20"],
      },
    ],
  },
  no: {
    heading: "A NO vote — full statements",
    blocks: [
      {
        kind: "sample",
        sample: true,
        title: "What a no vote would do",
        body: "Make no change in the law regarding rents for residential rental units.",
      },
      {
        kind: "official",
        title: "Housing for Massachusetts — campaign statement as reported",
        body: '"Our campaign is focused on policies that protect property owners, renters, housing production, and community budgets."',
        sources: ["r21"],
      },
    ],
  },
};

// ─── Question meta ──────────────────────────────────────────────────────────
const meta = {
  title:
    "An Initiative Petition to Protect Tenants by Limiting Rent Increases",
  plainSummary:
    "A proposed law limiting annual rent increases on covered residential units.",
  questionNumberNote: "Question number assigned when ballots are finalized",
  currentLaw: {
    kind: "outside" as SourceKind,
    body: "Rent control has been prohibited statewide under a voter-approved 1994 law. Before then, only Boston, Brookline, and Cambridge had rent control programs.",
    sources: ["r4"],
  },
};

// ─── Overview ───────────────────────────────────────────────────────────────
const overview = {
  plainLanguage: {
    kind: "synthesis" as SourceKind,
    title: "Plain-language translation",
    body: "A yes vote would end that ban and set one statewide rule: rents on covered apartments could rise no faster than inflation, and never more than 5% a year — including when a new tenant moves in. Owner-occupied buildings of four or fewer units are exempt, and new buildings are exempt for their first ten years. A no vote keeps current law, where rent amounts are not capped.",
    sources: ["r1", "r2", "r3"],
  } as Block,
  officialDocs: {
    kind: "official" as SourceKind,
    body: "Full summary · Complete legal text · Fiscal impact statement — published unedited from the Secretary of the Commonwealth.",
  } as Block,
  yesVoteWould: {
    kind: "official" as SourceKind,
    title: "A YES vote would:",
    body: "Limit rent increases on certain residential rental units to the increase in the consumer price index or 5%, whichever is lower, including between tenancies, with exceptions including owner-occupied buildings of four or fewer units and new construction during its first ten years.",
  } as Block,
  noVoteWould: {
    kind: "official" as SourceKind,
    title: "A NO vote would:",
    body: "Make no change in the law regarding rents for residential rental units.",
  } as Block,
  whyYes: {
    kind: "synthesis" as SourceKind,
    title: "Why vote YES",
    body: "Rents that rise faster than incomes are displacing workers, seniors, and families. A cap tied to inflation gives renters predictability, and peer-reviewed research finds covered tenants are more likely to stay in their homes. Small owners (owner-occupied buildings of four or fewer units) and new construction (first ten years) are exempt, and applying the cap at turnover removes a landlord's incentive to push tenants out.",
  } as Block,
  whyNo: {
    kind: "synthesis" as SourceKind,
    title: "Why vote NO",
    body: 'Caps can deter the construction and maintenance the state needs — Gov. Healey argues they "effectively halt production," and no state has tried a statewide cap that binds at turnover. Critics, including a Greater Boston Real Estate Board report, warn of pressure on municipal tax bases, and point to compensated or local-option alternatives discussed in the Legislature as better tools.',
  } as Block,
  onRecordYes: [
    { label: "Boston Mayor Michelle Wu", stance: "yes", sources: ["r2"] },
    {
      label: "Boston City Council, 9–3 resolution",
      stance: "yes",
      sources: ["r11"],
    },
    {
      label:
        "Tenant & housing coalitions (Homes for All MA, Springfield No One Leaves)",
      stance: "yes",
      sources: ["r3"],
    },
  ] as Position[],
  onRecordNo: [
    { label: "Gov. Maura Healey", stance: "no", sources: ["r18"] },
    { label: "Holyoke Mayor Joshua Garcia", stance: "no", sources: ["r12"] },
    {
      label: "Real-estate & owner groups (GBREB, MassLandlords)",
      stance: "no",
      sources: ["r9", "r13"],
    },
  ] as Position[],
  pollTopline: {
    kind: "outside" as SourceKind,
    body: "Latest public poll: 56% of Massachusetts voters support the measure. Polls and their wording are under Media Coverage.",
    sources: ["r19"],
  } as Block,
  financeSnapshot: {
    kind: "official" as SourceKind,
    title: "Who's paying for the campaigns",
    body: "Keep Massachusetts Home (Yes · tenant, labor & community coalition). Housing for Massachusetts (No · realtor & multifamily-owner coalition). Committees have registered with the state; dollar totals are filed with OCPF closer to the election. Full donor breakdowns — including in-state vs. out-of-state money — appear under Campaign Finance.",
    sources: ["r7"],
  } as Block,
  whatHappensIfPasses: {
    kind: "official" as SourceKind,
    title: "What happens if it passes",
    body: "The cap would take effect using rents in place as of January 31, 2026 as the baseline, with the exemptions above. The Legislature and agencies would then set enforcement and guidance, and owner groups have signaled likely court challenges. The official fiscal statement says any effect on state and municipal finances cannot be determined with certainty.",
  } as Block,
  committeeHearing: {
    kind: "official" as SourceKind,
    title: "Committee hearing — March 31, 2026",
    body: "Legislators reviewed this petition and heard public testimony before it advanced to the ballot.",
  } as Block,
};

// ─── Background (incl. implementation & legal) ──────────────────────────────
const background = {
  officialBallotInfo: [
    {
      kind: "official",
      title: "What a YES vote does (verbatim)",
      body: "Limit rent increases on certain residential rental units to the increase in the consumer price index or 5%, whichever is lower, including between tenancies, with exceptions including owner-occupied buildings of four or fewer units and new construction during its first ten years.",
    },
    {
      kind: "official",
      title: "What a NO vote does (verbatim)",
      body: "Make no change in the law regarding rents for residential rental units.",
    },
    {
      kind: "sample",
      sample: true,
      title: "Official statement of fiscal consequences",
      body: "The proposed law may have fiscal consequences for state and municipal government finances; the amount cannot be determined with certainty.",
    },
  ] as Block[],
  whatTheLawSets: {
    kind: "official" as SourceKind,
    title: "What the law itself sets",
    body: "The cap applies to covered units using rents in place as of January 31, 2026 as the baseline. Annual increases are limited to the lower of inflation (CPI) or 5%, including at turnover. Exempt: owner-occupied buildings of four or fewer units, and new construction for its first ten years. The effective date and enforcement provisions appear from the certified text once published.",
    sources: ["r1", "r3"],
  } as Block,
  fiscalClaimsBeyondOfficial: [
    {
      claim:
        '"The measure would shrink the residential tax base 6–9% and pressure municipal budgets"',
      verdict:
        "Made by the Greater Boston Real Estate Board, citing its report with Tufts cSPA — a projection the official statement does not make; extrapolated from Cambridge and St. Paul studies; disputed by the supporting campaign",
      sources: ["r9"],
    },
    {
      claim:
        '"Predictable rents reduce displacement costs borne by communities"',
      verdict:
        "Made by supporting organizations — a benefit claim the official statement does not address",
      sources: ["r3", "r20"],
    },
  ] as Claim[],
  legalQuestions: [
    {
      claim: "Takings and fair rate of return",
      verdict:
        "Raised by property-owner organizations as likely post-passage litigation — the argument that a cap binding at turnover denies owners a fair return; untested for this design",
      sources: ["r24"],
    },
    {
      claim: "Interaction with existing tenant-landlord law",
      verdict:
        "Identified in coverage and owner-association analyses as an open drafting question: how the cap interfaces with Ch. 93A and existing eviction protections",
      sources: ["r24"],
    },
    {
      claim: "Amendment by the Legislature",
      verdict:
        "Under the state constitution, voter-approved statutes can be amended or repealed by the Legislature after passage",
      sources: ["r23"],
    },
  ] as Claim[],
  stillUndecided: {
    kind: "synthesis" as SourceKind,
    title: "What would still be undecided",
    body: "Enforcement capacity and funding — what municipalities would need, and whether any of it is funded. How a CPI-linked cap interacts with insurance and utility costs that have risen faster than inflation. What happens to rents already raised above the January 31, 2026 baseline. Guidance for owners and tenants on coverage, exemptions, and turnover.",
  } as Block,
  relatedContext: {
    kind: "outside" as SourceKind,
    title: "How comparable measures work elsewhere",
    body: "California (statewide cap, 2019) and Oregon (statewide cap, 2019) limit annual increases but allow rents to reset between tenants. St. Paul, MN voters approved a 3% cap in 2021, later amended to exempt new construction. No state has adopted a statewide cap that binds at turnover.",
  } as Block,
};

// ─── For & Against (incl. research & studies) ───────────────────────────────
const forAgainst = {
  yesCampaign: {
    kind: "official" as SourceKind,
    title: "Keep Massachusetts Home",
    body: '"This modern rent-stabilization ballot initiative will protect tenants from big corporate investors who unreasonably increase rents." Registered ballot committee · On record for yes: Boston Mayor Michelle Wu, Boston City Council (9–3 resolution).',
    sources: ["r9", "r2", "r11"],
  } as Block,
  noCampaign: {
    kind: "official" as SourceKind,
    title: "Housing for Massachusetts",
    body: '"Our campaign is focused on policies that protect property owners, renters, housing production, and community budgets." Describes the measure as the most restrictive rent control program in the country. Registered ballot committee · On record for no: Gov. Maura Healey, Holyoke Mayor Joshua Garcia.',
    sources: ["r21", "r18", "r12"],
  } as Block,
  yesArguments: [
    {
      title: "Affordability & displacement",
      body: "A Massachusetts renter needs an average of $45.90/hour to afford a two-bedroom apartment. Supporters argue uncapped increases are displacing workers, seniors, and young families, and that a predictable ceiling tied to inflation addresses the most acute harm directly.",
      sources: ["r14", "r20"],
    },
    {
      title: "Tenant stability is a documented effect",
      body: "Peer-reviewed research on San Francisco found covered tenants were significantly more likely to remain in their homes, especially older and longer-tenured renters — the effect supporters say Massachusetts renters need most.",
      sources: ["r15"],
    },
    {
      title: "The design exempts small owners and new construction",
      body: "Owner-occupied buildings of four or fewer units are exempt, and new construction is exempt for ten years. Supporters argue this targets large portfolio owners while shielding the small landlords and new supply that critics worry about.",
      sources: ["r1", "r3"],
    },
    {
      title: "Covering turnover closes the eviction incentive",
      body: "Where caps reset at vacancy, owners gain an incentive to push tenants out. Supporters argue applying the cap at turnover removes that incentive — the lesson they draw from other states' programs.",
      sources: ["r2", "r1"],
    },
  ] as Argument[],
  noArguments: [
    {
      title: "Production & supply risk",
      body: 'Gov. Healey and opponents argue caps deter investment: "you effectively halt production." The San Francisco study found covered landlords reduced rental supply about 15%, which raised citywide rents and offset part of the affordability benefit.',
      sources: ["r18", "r15"],
    },
    {
      title: "No state has tried this design",
      body: "California's and Oregon's statewide caps allow rents to reset between tenants; this measure's would not. Opponents argue an untested design is the wrong instrument for a supply-driven housing crisis.",
      sources: ["r2", "r17"],
    },
    {
      title: "Municipal fiscal exposure",
      body: "A report by the Greater Boston Real Estate Board with the Tufts Center for State Policy Analysis projects a 6–9% reduction in the residential tax base, pressuring city and town budgets. (Supporters dispute the projection; see claim mapping below.)",
      sources: ["r9"],
    },
    {
      title: "Alternatives exist",
      body: "Opponents point to compensated stabilization (MassLandlords' proposal) and local-option approaches discussed in the Legislature as ways to address rent burden without a statewide mandate.",
      sources: ["r13", "r5"],
    },
  ] as Argument[],
  analysis: {
    consensus: [
      "Massachusetts has a housing affordability crisis; rent burden is among the highest in the country",
      "The state needs substantially more housing production regardless of this measure's fate",
      "Both campaigns accept that displacement pressure on tenants is real — they disagree on the remedy",
      "The measure's exemptions (owner-occupied ≤4 units; new construction for 10 years) are not in dispute, only their sufficiency",
    ],
    consensusSources: ["r2", "r3", "r9", "r13", "r14", "r20", "r21"],
    disagreement: [
      "Whether a cap that floats with inflation deters construction and maintenance given the 10-year exemption",
      "Whether covering turnover closes an eviction loophole or removes owners' main path to recover renovation costs",
      "Whether the 6–9% tax-base projection's methodology applies to this measure's design",
      "Whether one statewide rule or municipal opt-in is the right scale for rent policy",
    ],
    disagreementSources: ["r2", "r9", "r13", "r18", "r20", "r21"],
    openQuestions: [
      "No U.S. state has run a statewide cap that binds at turnover — direct evidence on this design at this scale does not exist",
      "How would a CPI-linked cap interact with insurance and utility costs that have risen faster than inflation?",
      "What enforcement capacity would municipalities need, and how would it be funded?",
    ],
    openQuestionsSources: ["r2", "r15", "r17"],
    claimMapping: [
      {
        claim: '"Rent control reduces new housing construction"',
        verdict:
          "Findings differ across studies — a San Francisco study found supply reductions among covered owners; a Massachusetts study found small construction effects, with larger effects on maintenance and conversion; this measure's 10-year exemption has no studied equivalent",
        sources: ["r15", "r17"],
      },
      {
        claim: '"The measure would shrink the residential tax base 6–9%"',
        verdict:
          "Single-source projection extrapolated from Cambridge and St. Paul studies; disputed by the supporting campaign; no independent replication to date",
        sources: ["r9"],
      },
      {
        claim: '"Rent stabilization keeps tenants in their homes"',
        verdict:
          "Supported by peer-reviewed evidence; the same study finds an offsetting citywide supply effect",
        sources: ["r15"],
      },
      {
        claim:
          '"This would be the most restrictive rent control program in the country"',
        verdict:
          'No other state\'s cap applies at turnover statewide; "restrictive" as a characterization comes from the campaigns',
        sources: ["r2", "r21"],
      },
    ] as Claim[],
  },
  research: [
    {
      group: "peer-reviewed",
      citation:
        'Diamond, R., McQuade, T. & Qian, F. (2019). "The Effects of Rent Control Expansion on Tenants, Landlords, and Inequality: Evidence from San Francisco." American Economic Review, 109(9).',
      finding:
        "Covered tenants 10–20% more likely to stay; covered landlords reduced rental supply ~15%, raising citywide rents.",
    },
    {
      group: "peer-reviewed",
      citation:
        'Autor, D., Palmer, C. & Pathak, P. (2014). "Housing Market Spillovers: Evidence from the End of Rent Control in Cambridge, Massachusetts." Journal of Political Economy, 122(3).',
      finding:
        "After decontrol, property values rose substantially — including at never-controlled buildings nearby.",
    },
    {
      group: "peer-reviewed",
      citation:
        'Sims, D. (2007). "Out of Control: What Can We Learn from the End of Massachusetts Rent Control?" Journal of Urban Economics, 61(1).',
      finding:
        "Decontrol had small effects on new construction; larger effects ran through maintenance and conversion of existing stock.",
    },
    {
      group: "org-report",
      citation:
        'Greater Boston Real Estate Board with Tufts Center for State Policy Analysis: "Projected fiscal effects of the 2026 rent control initiative" (2026).',
      affiliation: "industry-commissioned; sponsor opposes the measure",
      finding:
        "Projects a 6–9% reduction in the residential tax base, extrapolating from Cambridge (2014) and St. Paul (2022).",
      url: "https://www.wbur.org/news/2026/03/12/rent-control-ballot-initiative-affordability-housing",
    },
    {
      group: "org-report",
      citation:
        'MassLandlords: "Compensated rent stabilization" white paper (2025–26).',
      affiliation: "property-owner trade association; member of the No coalition",
      finding:
        "Argues the ballot language removes owners' right to compensation; proposes an alternative framework.",
      url: "https://masslandlords.net/policy/rent-control/2026-ballot-initiative-explained/",
    },
    {
      group: "org-report",
      citation: "National Low Income Housing Coalition: Out of Reach (2025).",
      affiliation: "affordable-housing advocacy organization",
      finding:
        "A Massachusetts renter needs an average of $45.90/hour to afford a two-bedroom at fair market rent.",
    },
    {
      group: "comparison",
      citation:
        "California (statewide cap, 2019) and Oregon (statewide cap, 2019) limit annual increases but allow rents to reset between tenants. St. Paul, MN voters approved a 3% cap in 2021, later amended to exempt new construction. No state has adopted a statewide cap that binds at turnover.",
    },
    {
      group: "gov-data",
      citation:
        "None listed yet for this question. OCPF filings appear under Campaign Finance; Department of Revenue and Census housing data will be added as they are cited in the debate.",
    },
  ] as ResearchItem[],
};

// ─── Public Perspectives ────────────────────────────────────────────────────
// All entries are illustrative mock submissions — the question has not launched,
// so no real testimony exists yet.
const publicPerspectives = {
  counts: {
    residents: 3,
    organizations: 2,
    support: 3,
    oppose: 2,
    sample: true,
  },
  testimonies: [
    {
      author: "J. M., Lowell",
      community: "Lowell",
      entity: "resident",
      verified: true,
      stance: "yes",
      descriptor: "Renter",
      body: '"My landlord raised our rent $400 in one year and there was nothing we could do. We\'ve lived in this neighborhood for nine years and my kids are in school here. A cap tied to inflation wouldn\'t freeze anyone\'s rent — it would just let families plan."',
      sample: true,
    },
    {
      author: "R. T., Worcester",
      community: "Worcester",
      entity: "resident",
      verified: true,
      stance: "no",
      descriptor: "Small property owner",
      body: '"I own a three-decker and live on the first floor. The exemption is supposed to cover me, but I rent the other two units and the rules around turnover are confusing. I\'d rather see help with property taxes and insurance, which are what actually drive my rent increases."',
      sample: true,
    },
    {
      author: "D. A., Springfield",
      community: "Springfield",
      entity: "resident",
      verified: true,
      stance: "yes",
      descriptor: "Renter",
      body: '"I\'m a home health aide. Every raise I get goes straight to rent and then some. I\'m not asking for free housing — I\'m asking to not get priced out of the city I take care of people in."',
      sample: true,
    },
    {
      author: "Tenant association (mock)",
      entity: "organization",
      verified: true,
      stance: "yes",
      descriptor: "Resident organization",
      body: '"Our members have watched longtime neighbors leave one by one as rents climbed. We support a predictable, inflation-linked cap with the small-owner and new-construction exemptions intact."',
      sample: true,
    },
    {
      author: "Property owners' group (mock)",
      entity: "organization",
      verified: true,
      stance: "no",
      descriptor: "Owner organization",
      body: '"We represent small and mid-size landlords who maintain older housing stock. We\'re concerned a turnover cap removes the ability to recover the cost of major repairs, and we\'d prefer a compensated approach."',
      sample: true,
    },
  ] as Testimony[],
};

// ─── Media Coverage ─────────────────────────────────────────────────────────
const media = {
  synthesis: {
    kind: "synthesis" as SourceKind,
    title: "AI synthesis of coverage",
    body: "Coverage has moved through four phases: the signature drive, the opposition launch, the dispute over the GBREB/Tufts fiscal report, and legislative negotiations over an alternative. The 6–9% tax-base figure is widely repeated in coverage and traces to a single industry-commissioned report.",
    sources: ["r2", "r3", "r5", "r6", "r7", "r8", "r9", "r10", "r11"],
  } as Block,
  timeline: [
    {
      phase: "Legislative alternative",
      when: "June 2026",
      articles: [
        {
          outlet: "CommonWealth Beacon",
          title:
            "Rent control backers scrambling to find legislative road away from the ballot",
          url: "https://commonwealthbeacon.org/housing/rent-control-backers-scrambling-to-find-legislative-road-away-from-the-ballot/",
          type: "News",
        },
        {
          outlet: "WBUR",
          title: "To avoid a costly ballot fight, supporters float a compromise",
          url: "https://www.wbur.org/news/2026/06/03/rent-control-ballot-question-compromise-bill",
          type: "News",
        },
        {
          outlet: "NBC Boston",
          title: "Campaign proposes legislation as alternative to rent control",
          url: "https://www.nbcboston.com/news/politics/campaign-proposes-legislation-as-alternative-to-mass-rent-control/3959782/",
          type: "News",
        },
      ],
    },
    {
      phase: "The evidence dispute",
      when: "February – March 2026",
      articles: [
        {
          outlet: "WBUR",
          title:
            "Real estate group warns proposal could lower property taxes for cities and towns",
          url: "https://www.wbur.org/news/2026/03/12/rent-control-ballot-initiative-affordability-housing",
          type: "News",
        },
        {
          outlet: "WWLP",
          title: "Poll shows more support for rent control, tax cut",
          url: "https://www.wwlp.com/news/massachusetts/poll-shows-more-support-for-rent-control-tax-cut/",
          type: "News",
        },
      ],
    },
    {
      phase: "Opposition launch & legal challenge",
      when: "December 2025 – February 2026",
      articles: [
        {
          outlet: "Boston.gov",
          title:
            "Council adopts resolution supporting rent stabilization question (9–3)",
          url: "https://www.boston.gov/news/council-adopts-resolution-supporting-2026-rent-stabilization-ballot-question",
          type: "Gov't",
        },
        {
          outlet: "MassLandlords",
          title: 'Housing for Massachusetts coalition launches "Vote No" campaign',
          url: "https://masslandlords.net/housing-for-massachusetts-coalition-spearheads-the-vote-no-on-rent-control-campaign/",
          type: "Advocacy",
        },
      ],
    },
    {
      phase: "Signature drive",
      when: "November 2025",
      articles: [
        {
          outlet: "WBUR",
          title: "What to know about the emerging rent control ballot fight",
          url: "https://www.wbur.org/news/2025/11/20/rent-control-ballot-question-massachusetts-2026-michelle-wu",
          type: "News",
        },
        {
          outlet: "CBS Boston",
          title: "Supporters say they have enough signatures for ballot question",
          url: "https://www.cbsnews.com/boston/news/rent-control-ballot-question-massachusetts",
          type: "News",
        },
      ],
    },
  ] as MediaPhase[],
  editorial: {
    kind: "outside" as SourceKind,
    title: "No editorial board positions on file yet",
    body: "When Massachusetts editorial boards endorse Yes or No, they appear here with outlet, date, and link.",
  } as Block,
  polls: [
    {
      pollster: "UNH Survey Center",
      result: "56% support",
      meta: "Reported early 2026 · MA registered voters · sample size, margin of error, oppose/unsure breakdown, and exact wording not yet on file",
      sources: ["r19"],
    },
    {
      pollster: "Statewide ballot-questions poll",
      result: "Majority support reported; 21% opposed, 21% neutral or unsure.",
      meta: "Feb 2026 · exact support figure, sample, margin of error, and wording not yet on file",
      sources: ["r10"],
    },
  ] as Poll[],
};

// ─── Campaign Finance ───────────────────────────────────────────────────────
const finance = {
  committees: [
    {
      name: "Keep Massachusetts Home",
      stance: "yes",
      description:
        "Coalition of tenant advocates, labor unions, and community organizations. Awaiting OCPF filings for totals, in-state vs. out-of-state split, top donors, and spending by category.",
      sources: ["r22"],
    },
    {
      name: "Housing for Massachusetts",
      stance: "no",
      description:
        "Realtor associations and multifamily property owners. Awaiting OCPF filings for totals; funders below are as reported in news coverage, with amounts pending itemized filings.",
      sources: ["r7", "r22"],
      funders: [
        {
          name: "Massachusetts Association of Realtors",
          locale: "in-state",
          note: "amount from filings",
        },
        {
          name: "National Association of Realtors",
          locale: "out-of-state",
          note: "amount from filings",
        },
        {
          name: "Equity Residential",
          locale: "out-of-state",
          note: "amount from filings",
        },
        {
          name: "AvalonBay Communities",
          locale: "out-of-state",
          note: "amount from filings",
        },
      ],
    },
  ] as Committee[],
  notes: {
    kind: "official" as SourceKind,
    body: "Funder names are as reported in news coverage; dollar amounts and each donor's city and state appear only from OCPF itemized filings. MAPLE does not estimate amounts. Whether a contribution counts as in-state or out-of-state is based on the donor's address as filed with OCPF.",
    sources: ["r7", "r22"],
  } as Block,
};

// ─── Export ─────────────────────────────────────────────────────────────────
export const rentControl2026 = {
  meta,
  sources,
  statements,
  overview,
  background,
  forAgainst,
  publicPerspectives,
  media,
  finance,
};

export default rentControl2026;
