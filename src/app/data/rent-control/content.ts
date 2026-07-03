// Content for the 2026 Massachusetts rent-control ballot question.
//
// All rent-control-specific data and prose that drives the page lives here (and
// in ./sources). The section components in components/ballot render from these
// shapes, so a new ballot question is authored by supplying a parallel module —
// not by editing layout. Facts reference sources by id (see ./sources).

import type {
  Stakeholder,
  VoteSide,
  Arg,
  ArgSet,
  ArgSourceTag,
  ArgFilter,
  TL,
  ClaimRow,
  PollRow,
  Committee,
  Study,
} from "../../components/ballot/types";
import { SOURCES } from "./sources";

export const RC = {
  title: "Protect Tenants by Limiting Rent Increases",
  plain:
    "Establish rent control, limiting annual rent increases for residential units to the Consumer Price Index (CPI) or 5%, whichever is lower",
  tags: ["Housing Policy", "Tenant Rights", "Rental Market"],

  overviewSummary:
    "This plan would limit how much landlords can increase rent for most apartments to either the rate of inflation or 5%, whichever is lower, including between tenants — reversing the statewide ban on rent control that voters in Massachusetts approved back in 1994.",

  yes: "The rent cap takes effect statewide for covered residential units. Annual increases may not exceed CPI or 5% (whichever is lower), measured from each unit's January 31, 2026 base rent, and the cap applies even when a new tenant moves in.",
  no: "No change in the law. The statewide ban on rent control — in effect since voters approved Question 9 in 1994 — remains, and landlords of non-exempt units keep full discretion over rent pricing.",

  covered: [
    "Most multi-unit rental buildings where the landlord does not live on-site",
    "Larger rental complexes and apartment buildings",
    "Units rented by tenants holding a mobile housing voucher",
    "Rental housing first occupied more than 10 years ago",
  ],
  exempt: [
    "Owner-occupied buildings with fewer than 5 units",
    "New construction — first occupied less than 10 years ago",
    "Units already regulated by another public authority (except mobile-voucher holders)",
    "Short-term rentals to transient guests (fewer than 14 consecutive days)",
    "Facilities operated solely for educational, religious, or non-profit purposes",
  ],

  stakeholders: [
    {
      group: "Tenants in covered units",
      impact: "benefits",
      body: "Rent increases capped at CPI or 5% annually from Jan 31, 2026 base. Protection follows the unit — applies to new tenants too.",
      basis: "Petition text",
    },
    {
      group: "Small landlords (owner-occ, <5 units)",
      impact: "neutral",
      body: "Fully exempt from the cap. Owner-occupants of buildings with 4 or fewer units are not covered by any provision of the initiative.",
      basis: "Petition text",
    },
    {
      group: "Larger / corporate landlords",
      impact: "cost",
      body: "Annual rent increases limited. Revenue growth constrained at inflation or 5%, regardless of market conditions or vacancies.",
      basis: "Petition text",
    },
    {
      group: "Developers (new construction)",
      impact: "neutral",
      body: "Buildings less than 10 years old are exempt, preserving incentives for new development in the near term.",
      basis: "Petition text",
    },
    {
      group: "Homeowners (non-landlords)",
      impact: "cost",
      disputed: true,
      body: "Per Tufts CSPA study (cited by opposition): property values could fall up to 14% over a decade, shifting ~$300B in value and potentially raising property tax burdens.",
      basis: "Tufts CSPA study — independent peer review not confirmed",
    },
    {
      group: "Cities & towns",
      impact: "cost",
      disputed: true,
      body: "Per same Tufts study: residential property tax base could shrink 6–9% immediately, forcing service cuts or tax increases of at least 10% to compensate.",
      basis: "Tufts CSPA study — independent peer review not confirmed",
    },
  ] as Stakeholder[],

  overviewFraming:
    "Supporters argue a predictable, inflation-linked cap protects tenants from displacement and is aimed at large corporate owners, while small owner-occupied buildings and new construction are exempt. Opponents argue a statewide cap binding at turnover would deter housing creation and shift costs onto homeowners and tax-payer dollars. Both sides have mounted organized, well-funded campaigns.",

  overviewVotes: {
    yes: {
      vote: "yes",
      summary:
        "Establishes the statewide cap.",
      organizerIds: ["keep-ma-home", "homes-for-all-ma"],
      funding: "$748K",
      sideLabel: "Endorsing Orgs",
      official: {
        text: "This is the official statement submitted by the endorsing parties and approved by the AG's office. This statement will cover all of the reasons voters should vote yes for this measure on Election Day and likely why voting no is a very unadvised idea for Massachusetts. This will be likely shorter than the official statement because we are using filler language instead of actual official language.",
        who: "Rep for Homes for All Massachusetts",
      },
    },
    no: {
      vote: "no",
      summary:
        "Makes no change in the law.",
      organizerIds: ["housing-for-ma"],
      funding: "$458K",
      sideLabel: "Opposing Orgs",
      official: {
        text: "This is the official statement submitted by the opposing parties and approved by the AG's office. This statement will cover all of the reasons voters should vote no for this measure on Election Day and likely why voting yes is a very unadvised idea for Massachusetts. This will be likely shorter than the official statement because we are using filler language instead of actual official language.",
        who: "Rep for Housing for Massachusetts",
      },
    },
  } as { yes: VoteSide; no: VoteSide },

  timeline: [
    {
      when: "Aug 7, 2025",
      label: "Petition filed",
      body: "The Attorney General announced the initiative had been filed (No. 25-21).",
      ids: ["ballotpedia", "petition"],
    },
    {
      when: "Sep 3, 2025",
      label: "Cleared for signatures",
      body: "The AG certified the petition; signature gathering began.",
      ids: ["ballotpedia"],
    },
    {
      when: "Nov 19, 2025",
      label: "Signatures submitted",
      body: "Homes for All Massachusetts reported submitting more than 124,000 signatures.",
      ids: ["cbsSigs"],
    },
    {
      when: "Dec 18, 2025",
      label: "Signatures certified",
      body: "The Elections Division certified 88,132 valid signatures (74,574 required), sending it to the Legislature.",
      ids: ["ballotpedia"],
    },
    {
      when: "Feb 5, 2026",
      label: "Introduced as H.5008",
      body: "The initiative entered the Legislature as House Bill 5008.",
      ids: ["h5008"],
    },
    {
      when: "May 5, 2026",
      label: "Legislature does not act",
      body: "With no legislative approval by the deadline, second-round signature collection began.",
      ids: ["ballotpedia"],
    },
    {
      when: "Jun 2, 2026",
      label: "Compromise floated",
      body: "Homes for All Massachusetts drafted a legislative compromise, offering to drop the ballot effort if it passed by July 1.",
      ids: ["cwbCompromise"],
    },
    {
      when: "Jun 16, 2026",
      label: "Healey & NAIOP open to compromise",
      body: "Both said they would support a legislative compromise on rent control.",
      ids: ["ballotpedia"],
    },
  ] as TL[],

  processFacts: [
    {
      k: "Measure type",
      v: "Indirect initiated state statute — goes to the Legislature first, then to voters if it does not act.",
      ids: ["ballotpedia"],
    },
    {
      k: "First-round signatures",
      v: "74,574 required (3% of the last gubernatorial vote); 124,000+ submitted; 88,132 certified.",
      ids: ["ballotpedia", "cbsSigs"],
    },
    {
      k: "Second-round signatures",
      v: "12,429 required (0.5%); deadline July 1, 2026.",
      ids: ["ballotpedia"],
    },
    {
      k: "Distribution rule",
      v: "No more than 25% of certified signatures may come from a single county.",
      ids: ["ballotpedia"],
    },
    {
      k: "Legislative window",
      v: "The Legislature had until the first Wednesday of May 2026 to enact the measure; it did not, triggering the second signature round.",
      ids: ["ballotpedia"],
    },
  ],

  relatedContext: [
    {
      k: "Current law",
      v: "Rent control has been banned statewide since 1994, when Question 9 passed with 51.3% and repealed programs in Boston, Cambridge, and Brookline.",
      ids: ["q9"],
    },
    {
      k: "Related legislation",
      v: "S.1299 (2023) and S.1447 / H.2328 (2025) would have let cities adopt local rent control; none passed. H.5008 (2026) was this initiative's legislative form.",
      ids: ["ballotpedia", "h5008"],
    },
    {
      k: "Other states",
      v: "California is the only other state to decide rent control by statewide ballot — five measures (Props 199, 98, 10, 21, 33) from 1996–2024, all defeated; Prop 10 (2018) had the highest support at 40.6%.",
      ids: ["ballotpedia"],
    },
  ],

  // "All" — the best and most common arguments rolled up across the source
  // categories (academic research, organization / elected-official / citizen
  // testimony), with design points derived from the official documents.
  yesArgs: [
    {
      title: "Housing Costs are Unsustainable",
      body: "Across organization and official testimony the same picture recurs: housing costs are outrunning wages and renters are stretched thin. A predictable cap on increases is the relief people are asking for now.",
    },
    {
      title: "It Keeps Families in Their Homes",
      body: "Peer-reviewed research finds covered tenants are far less likely to be displaced, and the cap takes effect right away — giving renters protection before rising costs force them out, not years down the line.",
    },
    {
      title: "Protecting Tenants Doesn't Stop Building",
      body: "Supporters argue tenant protection and new housing production are two different problems with two different tools: a cap shields current renters from displacement while the state keeps working to build more — one doesn't have to come at the expense of the other.",
    },
  ] as Arg[],
  noArgs: [
    {
      title: "Housing Creation Would Grind to a Halt",
      body: "Officials, the real-estate industry, and the peer-reviewed research all warn a statewide cap deters investment and shrinks rental supply — in the studies, owners pulled units off the market and citywide rents rose.",
    },
    {
      title: "The Costs Get Shifted, Not Solved",
      body: "A cap doesn't erase costs, it moves them — onto small landlords facing rising insurance and upkeep, onto renters in uncontrolled units, and onto homeowners and towns through falling property values and a shrinking tax base.",
    },
    {
      title: "Smaller Cities Would be Hit Hardest",
      body: "One CPI-or-5% formula binds Boston's overheated market and slow regional cities alike, with no local option — and where development already barely pencils out, a one-size-fits-all cap could stop new housing cold.",
    },
  ] as Arg[],

  // Per-source argument sets for the glance filters — three In Favor and three
  // Against per source type where the sources support it. Statements from
  // no-position accounts (Wu, Mariano) are sorted by the direction of the
  // point itself.
  argsBySource: {
    official: {
      yes: [
        {
          title: "Protection Starts Immediately",
          body: "The text sets each unit's base rent at January 31, 2026 and caps increases from there — relief for covered tenants begins at once, without waiting for new housing supply to materialize.",
        },
        {
          title: "It Removes the Incentive to Push Tenants Out",
          body: "Because the cap holds even when tenancy changes, a landlord gains nothing by displacing a tenant to reset the rent — the design closes the turnover loophole that undermined earlier rent control.",
        },
        {
          title: "The Text Already Answers the Supply Objection",
          body: "The petition exempts new buildings for ten years and small owner-occupied properties entirely — engineering the cap so it cannot touch the construction and small-landlord activity opponents say it threatens.",
        },
      ],
      no: [
        {
          title: "One Formula Can't Fit Every Market",
          body: "The text applies the identical CPI-or-5% cap to every municipality — from Boston's overheated market to regions where rents are flat — with no provision for local conditions or local choice.",
        },
        {
          title: "There's No Way to Fix It if It Breaks",
          body: "The certified text contains no hardship waiver, cost pass-through, or review mechanism; if the cap proves too tight against real operating costs, only another statewide statute or ballot vote can adjust it.",
        },
        {
          title: "Voters Already Decided This Question",
          body: "The official record shows Massachusetts weighed statewide rent control in 1994 and rejected it — and the Legislature has since declined every local-option alternative. The petition reverses that verdict wholesale.",
        },
      ],
    },
    academic: {
      yes: [
        {
          title: "Rent Control Keeps People in Their Homes",
          body: "Across the studies, rent control achieves its core aim: covered tenants stay in their homes longer and are measurably less likely to be displaced, with the largest gains for long-tenured households.",
        },
        {
          title: "The Known Downsides are Largely Exempted Here",
          body: "The supply and value losses in the literature came largely through new construction and small-building conversion — activity this petition exempts for ten years or excludes for small owner-occupants.",
        },
        {
          title: "Construction Impacts are Smaller Than Claimed",
          body: "Where researchers measured construction directly, effects were modest; the literature locates rent control's costs mainly in upkeep and conversion, not in a halt to building.",
        },
      ],
      no: [
        {
          title: "Rental Supply Shrinks Under Rent Caps",
          body: "Across the cities studied, owners respond to caps by pulling units from the rental market — conversions, owner move-ins, redevelopment — shrinking supply and raising rents on uncontrolled units.",
        },
        {
          title: "The Costs Reach Beyond Controlled Units",
          body: "The research repeatedly finds effects past the regulated stock: higher citywide rents, depressed property values while caps bind, and value rebounds only after decontrol.",
        },
        {
          title: "Housing Quality Declines Over Time",
          body: "Studies of Massachusetts' own experience find binding caps surface as deferred maintenance and unit conversion, degrading the existing stock even where construction continues.",
        },
      ],
    },
    organization: {
      yes: [
        {
          title: "Housing Costs are an Emergency",
          body: "Tenant, labor, and community groups converge on the same picture: housing costs are outrunning wages statewide, and renters need predictable costs now — not after new supply eventually arrives.",
        },
        {
          title: "This Targets Corporate Landlords, Not Small Owners",
          body: "Endorsing organizations consistently name big corporate investors who unreasonably raise rents as the target, insisting the policy still lets local landlords earn a reasonable profit.",
        },
        {
          title: "Protecting Tenants Doesn't Stop Building",
          body: "Across the endorsing testimony, groups reject judging the measure as development policy: it is a tenant-protection tool meant to work alongside building more housing, not instead of it.",
        },
      ],
      no: [
        {
          title: "It Would be the Nation's Most Restrictive Rent Control",
          body: "The common thread in business and real-estate testimony is scope: a mandatory cap on every city and town with no local opt-in, which opponents describe as the most restrictive program in the country.",
        },
        {
          title: "The Costs Get Shifted, Not Solved",
          body: "Opposing groups repeatedly argue the cap relocates costs — onto small landlords facing rising insurance and maintenance, and onto homeowners and municipal budgets through a shrinking tax base.",
        },
        {
          title: "We've Been Here Before — It Didn't Work",
          body: "Several opponents invoke the pre-1994 experience — deferred maintenance, reduced quality, stalled development — and note production rebounded after voters ended rent control statewide.",
        },
      ],
    },
    elected: {
      yes: [
        {
          title: "Housing Costs are Unsustainable",
          body: "Officials taking no position still describe the same squeeze in their testimony: polling shows people are frustrated, housing costs are far too high, and voters want something done.",
        },
        {
          title: "This Could Force a Better Solution",
          body: "Sympathetic officials frame the question as an opening — even without endorsing it, they hope broad support pushes the state toward a more nuanced stabilization solution after the vote.",
        },
        {
          title: "The Status Quo is Failing Us",
          body: "Even officials withholding a position testify that the old approaches to housing are not working and new, inventive ones are needed — the same frustration supporters channel into this question.",
        },
      ],
      no: [
        {
          title: "Housing Production Would Grind to a Halt",
          body: "The governor, gateway-city mayors, and the Speaker converge on one warning: the cap would deter investment and halt housing production — in Boston, and especially in regional markets with thin margins.",
        },
        {
          title: "It Defeats Its Own Purpose",
          body: "Officials across positions argue the question works against its stated aim of housing abundance by raising barriers and costs for anyone entering the rental market.",
        },
        {
          title: "Smaller Cities Would be Hit Hardest",
          body: "Officials stress the cap applies not just to the red-hot Boston market but everywhere in the Commonwealth — and that regions where development already struggles to pencil out would be hit hardest.",
        },
      ],
    },
    citizen: { yes: [], no: [] },
  } as Record<ArgSourceTag, ArgSet>,

  consensus: [
    "Massachusetts is experiencing a severe housing affordability crisis driving tenant displacement.",
    "Both sides agree the state needs substantially more housing production regardless of this measure.",
    "Owner-occupied buildings under 5 units and new construction (first 10 years) are exempt — that scope is not in dispute.",
  ],
  disagreement: [
    "Whether a statewide mandate or a local option is the right scale for rent policy.",
    "Whether rent caps reduce new housing construction — the central empirical dispute.",
    "Whether exemptions are sufficient to protect small landlords from operating at a loss.",
    "The severity and probability of fiscal impacts on the residential property tax base.",
    "Whether a cap that binds at turnover deters construction and maintenance.",
  ],
  openQuestions: [
    "No U.S. state runs a statewide cap that binds at turnover, so direct evidence on this exact design does not exist.",
    "How a CPI-linked cap would interact with insurance and utility costs that have risen faster than inflation.",
    "How the 10-year new-construction exemption interacts with longer-term housing production cycles.",
    "Would local governments retain any ability to set tighter or looser caps under this statewide framework?",
    "Enforcement capacity and funding — what municipalities would need, and whether any of it is funded.",
    "What happens to rents already raised above the January 31, 2026 baseline.",
    "Guidance for owners and tenants on coverage, exemptions, and turnover.",
  ],

  // Checkable claims pulled from the arguments for and against, then vetted.
  // Verified first, then attributed (Tufts study, then testimony).
  claims: [
    {
      // From the YES argument "It Keeps Families in Their Homes."
      claim:
        "A rent cap makes covered tenants far less likely to be displaced.",
      mark: "verified",
      source: "outside",
      note: "Supported by peer-reviewed research (Diamond, McQuade & Qian 2019) on San Francisco — the tenant-stability effect is well established, though measured in a different city.",
      ids: ["academicResearch"],
    },
    {
      // From the NO argument "Housing Creation Would Grind to a Halt."
      claim:
        "Rent caps shrink rental supply and push up rents on uncontrolled units.",
      mark: "verified",
      source: "outside",
      note: "Supported by peer-reviewed research (Diamond, McQuade & Qian 2019), where covered landlords cut supply ~15% and citywide rents rose — the Massachusetts effect of this specific design is not directly measured.",
      ids: ["academicResearch"],
    },
    {
      // From the NO argument "The Costs Get Shifted, Not Solved."
      claim:
        "“Rent control would shrink the property tax base by 6–9% immediately”",
      mark: "attributed",
      source: "outside",
      note: "From a Tufts CSPA study cited and publicized by the opposition — independent peer review status not confirmed in available reporting",
      ids: ["tuftsGlobe", "tuftsWBUR"],
    },
    {
      // From the NO organization argument "It Would be the Nation's Most Restrictive…"
      claim:
        "“Creates the most restrictive rent control program in the entire United States”",
      mark: "attributed",
      source: "testimony",
      note: "Asserted jointly by Greater Boston Real Estate Board, MA Association of REALTORS, and NAIOP Massachusetts — no independent comparative citation provided",
      ids: ["mapleTestimony", "ballotpedia"],
    },
    {
      // From the NO elected argument "Housing Creation Would Grind to a Halt" (Healey).
      claim: "“Investors have already pulled out of Massachusetts”",
      mark: "attributed",
      source: "testimony",
      note: "Asserted by Gov. Healey — no data source cited; the initiative had not become law at the time the statement was made",
      ids: ["mapleTestimony", "healeyGlobe"],
    },
  ] as ClaimRow[],

  studies: [
    {
      citation: "Center for State Policy Analysis, Tufts University (2026)",
      affiliation:
        "commissioned by the Greater Boston Real Estate Board, which opposes the measure",
      finding:
        "Projects the residential property tax base would shrink 6–9%, with property values down ~14% over a decade (~$300B), extrapolating from Cambridge and St. Paul.",
      url: SOURCES.tuftsGlobe.url,
    },
    {
      citation: "Autor, Palmer & Pathak, Journal of Political Economy (2014)",
      affiliation: "peer-reviewed",
      finding:
        "After Cambridge, MA ended rent control, property values rose substantially, including at never-controlled buildings nearby.",
    },
    {
      citation: "Diamond, McQuade & Qian, American Economic Review (2019)",
      affiliation: "peer-reviewed",
      finding:
        "In San Francisco, covered tenants were more likely to stay, but covered landlords reduced rental supply ~15%, raising citywide rents.",
    },
    {
      citation: "Sims, Journal of Urban Economics (2007)",
      affiliation: "peer-reviewed",
      finding:
        "The end of Massachusetts rent control had small effects on new construction; larger effects ran through maintenance and conversion.",
    },
  ] as Study[],

  mediaPhases: [
    {
      phase: "Compromise talks",
      when: "June 2026",
      articles: [
        {
          outlet: "CommonWealth Beacon",
          title:
            "Rent control backers scrambling to find a legislative road away from the ballot",
          url: SOURCES.cwbCompromise.url,
          type: "News",
        },
      ],
    },
    {
      phase: "The evidence dispute",
      when: "March 2026",
      articles: [
        {
          outlet: "Boston Globe",
          title:
            "Real estate-backed study warns rent control could tank Massachusetts property values",
          url: SOURCES.tuftsGlobe.url,
          type: "News",
        },
        {
          outlet: "WBUR",
          title:
            "Real estate group warns proposal could lower property taxes for cities and towns",
          url: SOURCES.tuftsWBUR.url,
          type: "News",
        },
      ],
    },
    {
      phase: "Opposition & signature drive",
      when: "November – December 2025",
      articles: [
        {
          outlet: "Boston Globe",
          title:
            "Rent control would 'effectively halt' housing production, Healey says",
          url: SOURCES.healeyGlobe.url,
          type: "News",
        },
        {
          outlet: "CBS News Boston",
          title:
            "Supporters say they have enough signatures for ballot question",
          url: SOURCES.cbsSigs.url,
          type: "News",
        },
      ],
    },
  ],

  polls: [
    {
      pollster: "Suffolk University / The Boston Globe",
      dates: "Nov 19–23, 2025",
      sample: "500 registered voters",
      moe: "±4.4%",
      support: 62.6,
      oppose: 30.6,
      undecided: 6.8,
      ids: ["suffolkGlobe"],
    },
    {
      pollster: "UNH Survey Center",
      dates: "Feb 12–16, 2026",
      sample: "669 residents",
      moe: "±3.8%",
      support: 56,
      oppose: 26,
      undecided: 17,
      ids: ["unhFeb", "wwlpPoll"],
    },
  ] as PollRow[],

  committees: [
    {
      name: "Keep Massachusetts Home",
      stance: "yes",
      total: "$747,702",
      cash: "$57,722",
      inKind: "$689,981",
      spent: "$707,765",
      note: "Support is overwhelmingly in-kind — organizing staff time and services from tenant, labor, and community nonprofits.",
      donors: [
        { name: "Urban Revival Inc.", amount: "$203,341", kind: "in-kind" },
        {
          name: "Right to the City Alliance Inc.",
          amount: "$136,581",
          kind: "in-kind",
        },
        {
          name: "New England Community Project",
          amount: "$54,987",
          kind: "in-kind",
        },
        { name: "Tides Advocacy", amount: "$34,416", kind: "in-kind" },
        { name: "La Colaborativa", amount: "$33,444", kind: "in-kind" },
      ],
    },
    {
      name: "Housing for Massachusetts",
      stance: "no",
      total: "$458,234",
      cash: "$431,600",
      inKind: "$26,634",
      spent: "$26,634",
      note: "Opposition funding is overwhelmingly cash from real-estate industry organizations.",
      donors: [
        { name: "NAIOP Massachusetts", amount: "$226,600", kind: "cash" },
        {
          name: "Greater Boston Real Estate Board",
          amount: "$100,000",
          kind: "cash",
        },
        {
          name: "Massachusetts Association of Realtors",
          amount: "$55,000",
          kind: "cash",
        },
        { name: "Nordblom Management Co.", amount: "$50,000", kind: "cash" },
        { name: "MassLandlords, Inc.", amount: "$26,634", kind: "in-kind" },
      ],
    },
  ] as Committee[],
};

// ── Citizen Deliberations content ──────────────────────────────────────────
export const DELIB_THEMES: {
  title: string;
  agreed: string;
  split: string;
  tradeoff: string;
}[] = [
  {
    title: "The housing crisis was widely agreed upon",
    agreed:
      "Displacement is real and accelerating; “do nothing” was almost nobody's first choice, including most landlord participants.",
    split:
      "Whether a statewide cap or a local option is the right scale — Western MA participants were warier of one statewide rule than Boston-area participants.",
    tradeoff:
      "Protection for current tenants now vs. risk to future renters if construction or maintenance slows.",
  },
  {
    title: "The turnover cap was the single most contested design detail",
    agreed:
      "Caps that reset at vacancy create an incentive to push tenants out — most participants found vacancy coverage coherent once explained.",
    split:
      "Whether that justifies a stricter cap than any other state's, or argues instead for stronger anti-harassment enforcement.",
    tradeoff:
      "Closing the eviction incentive vs. removing owners' main path to recover renovation costs.",
  },
  {
    title: "Trust in the evidence itself became a topic",
    agreed:
      "Participants wanted to know who funded each study before weighing it; affiliation labels changed how findings landed.",
    split:
      "Whether the tax-base projection should be discounted as advocacy or engaged as the best available estimate.",
    tradeoff:
      "Acting on imperfect projections vs. waiting for evidence that may only exist after a policy is tried.",
  },
];

export const DELIB_TRANSCRIPTS = [
  {
    title: "Worcester in-person cohort, session 2",
    meta: "Oct 2026 · 14 participants · 2h 10m · facilitated by GenUnity",
  },
  {
    title: "Springfield Democracy Hub session",
    meta: "Oct 2026 · 12 participants · 1h 45m · with Mass Voter Table",
  },
  {
    title: "Statewide online session 1",
    meta: "Nov 2026 · 22 participants · 1h 30m",
  },
];

// ── Argument-filter config (For & Against) ─────────────────────────────────
export const ARG_FILTERS: { id: ArgFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "organization", label: "Organizations" },
  { id: "elected", label: "Elected Officials" },
  { id: "citizen", label: "Citizen" },
];

export const ARG_FILTER_IDS: Record<ArgFilter, string[]> = {
  all: ["petition", "agSummary", "academicResearch", "mapleTestimony"],
  official: ["petition", "agSummary", "q9"],
  academic: ["tuftsGlobe", "tuftsWBUR", "ballotpedia"],
  organization: ["mapleTestimony"],
  elected: ["mapleTestimony"],
  citizen: ["mapleTestimony"],
};
