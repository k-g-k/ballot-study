// Testimony submitted to MAPLE on the 2026 rent-control ballot question.
//
// Submission flow: an account first selects a stance — endorse / oppose /
// no position — and then writes its perspective. Body text is shown in the
// account's own words and never edited.
//
// Every testimony has a stable `id` slug because each one will eventually get
// its own URL (e.g. /testimony/<id>) and be embedded elsewhere on the site —
// keep ids unique and permanent once assigned.
//
// Quotes below are the public statements reported by Ballotpedia
// (Rentcontrol-ballotpedia.pdf), recast as MAPLE submissions; submission dates
// are prototype placeholders.

export type TestimonyStance = "endorse" | "oppose" | "no-position";

export interface TestimonyItem {
  /** Stable slug — future per-testimony URL, never reuse or rename. */
  id: string;
  /** Submitting account — `PositionUser.id` in rent-control-users.ts. */
  userId: string;
  /** Person speaking for the account, when the statement names one. */
  speaker?: string;
  stance: TestimonyStance;
  /** Display date of submission. */
  date: string;
  body: string;
}

export const TESTIMONY: TestimonyItem[] = [
  // ── Oppose ──────────────────────────────────────────────────────────────────
  {
    id: "spoa-shahsavari",
    userId: "spoa",
    speaker: "Amir Shahsavari, President",
    stance: "oppose",
    date: "June 11, 2026",
    body: "When you have a policy where rents would be capped at 5% or CPI, whichever is lower — and CPI is typically somewhere in the 2-2.5% range — that's not enough for us to keep up with expenses, and therefore housing falls into disrepair and problems ensue for both tenants, owners and other stakeholders.",
  },
  {
    id: "housing-for-ma-impact",
    userId: "housing-for-ma",
    stance: "oppose",
    date: "June 2, 2026",
    body: "Rent control will impact everyone – not just rent controlled units. A recent study from the Center for State Policy Analysis at Tufts University found that rent control would almost immediately shrink the residential property tax base by 6–9% across Massachusetts municipalities. Over a decade, property values could fall by nearly 14%, costing homeowners roughly $300 billion. Cities and towns would be forced to choose between deep cuts to services or tax hikes of at least 10% to compensate. Urban areas and college towns would be hit especially hard, with projected declines of 15–20%. Even homeowners with no rental units would feel the impact through higher taxes, reduced services, and a long-term loss of investment in their communities.",
  },
  {
    id: "mitchell-production",
    userId: "office-mitchell",
    speaker: "Mayor Jon Mitchell (D)",
    stance: "oppose",
    date: "May 21, 2026",
    body: "What is especially ominous about the proposed ballot question is that it applies not just to the red-hot Boston housing market, but everywhere else in the Commonwealth. In Greater New Bedford and other regions where housing developers at times struggle to make their numbers work, it would effectively shut down housing production.",
  },
  {
    id: "naiop-small",
    userId: "naiop-ma",
    speaker: "Tamara Small, CEO",
    stance: "oppose",
    date: "May 8, 2026",
    body: "If rent control is in place in the market, investors do not go to that market. They go elsewhere. Without those investment dollars, projects are not built.",
  },
  {
    id: "mhc-board-1994",
    userId: "mass-housing-coalition",
    speaker: "Steve Callahan Jr., Neily Soto & Peggy Pratt, board members",
    stance: "oppose",
    date: "April 30, 2026",
    body: "Massachusetts voters overwhelmingly banned rent control statewide in 1994 after experiencing its negative effects in communities like Boston, Cambridge, and Brookline. Rental properties under rate caps experienced deferred maintenance, reduced quality, while communities saw a noticeable drop in new rental development. When controls were lifted, housing production rebounded, and the market began adding units again. It's not by accident, either: When property owners and developers have confidence in the state's commitment to housing production across all income levels, they historically make continued investment in local communities.",
  },
  {
    id: "gbreb-joint-statement",
    userId: "gbreb",
    speaker:
      "Greg Vasil, CEO — joint statement with Theresa Hatton, CEO of the Massachusetts Association of REALTORS, and Tamara Small, CEO of NAIOP Massachusetts",
    stance: "oppose",
    date: "April 14, 2026",
    body: "The risks of this ballot question for our economy cannot be overstated. It is not an opt-in: this question creates the most restrictive rent control program in the entire United States and forces it on every city and town across the Commonwealth. It will unquestionably make our housing crisis worse and significantly reduce the supply of quality homes on the rental market.",
  },
  {
    id: "mass-fiscal-craney",
    userId: "mass-fiscal",
    speaker: "Paul Diego Craney, Executive Director",
    stance: "oppose",
    date: "March 19, 2026",
    body: "Whenever government imposes price controls, the costs always get shifted elsewhere, in this case, onto homeowners, it's a tax hike disguised as housing relief that will ultimately lead to increased costs for everyone.",
  },
  {
    id: "healey-production",
    userId: "office-healey",
    speaker: "Gov. Maura Healey (D)",
    stance: "oppose",
    date: "March 6, 2026",
    body: "Investors in housing have already pulled out of Massachusetts because they're concerned about rent control. I don't want to see housing production stopped.",
  },
  {
    id: "spoa-lopes",
    userId: "spoa",
    speaker: "Tony Lopes",
    stance: "oppose",
    date: "February 27, 2026",
    body: "[The initiative] penalizes the small property owners who make up 60% or more of [the] commonwealth's rental market, including the immigrant and minority property owners who are seeking just to get ahead. We need to consider real solutions, zoning reform, more state-level housing production, and accountability for the rising cost of insurance.",
  },

  // ── Endorse ─────────────────────────────────────────────────────────────────
  {
    id: "mlri-martinez",
    userId: "mlri",
    speaker: "Mark Martinez, Staff Housing Attorney",
    stance: "endorse",
    date: "June 4, 2026",
    body: "This isn't a development policy. This is a stabilization policy. Judging a stabilization policy based off of whether or not it's going to spur development doesn't make a whole lot of sense.",
  },
  {
    id: "seiu509-foley",
    userId: "seiu-509",
    speaker: "David Foley, President",
    stance: "endorse",
    date: "May 14, 2026",
    body: "We represent a lot of workers who make $20 or $21 an hour, and everyone feels the same crunch if they rent right now. Whatever wages the union is able to win at the bargaining table, those raises are almost always eaten up by huge rent increases.",
  },
  {
    id: "snol-webster-smith",
    userId: "springfield-no-one-leaves",
    speaker: "Rose Webster-Smith, Director",
    stance: "endorse",
    date: "April 8, 2026",
    body: "Working class and middle class people who do the jobs that keep our state going should be able to afford a roof over our heads. But right now, out-of-control housing costs are making it impossible for hundreds of thousands of families in Massachusetts to make ends meet. We need rent stabilization to keep rent costs reasonable and predictable, so that renters can save and have a fair shot at the dream of owning a home.",
  },
  {
    id: "necp-ramos",
    userId: "necp",
    speaker: "Noemi Ramos, Executive Director",
    stance: "endorse",
    date: "March 12, 2026",
    body: "We know that corporate real estate lobbyists will say anything to protect their ability to double rents overnight, and we've already had tens of thousands of conversations with voters across the state to get ahead of their misinformation, and talk about how rent stabilization will stabilize our communities, protect our essential workers, and keep rent costs reasonable and predictable so that renters can save and have a fair shot at the dream of owning a home.",
  },
  {
    id: "hfam-policy-design",
    userId: "homes-for-all-ma",
    stance: "endorse",
    date: "February 18, 2026",
    body: "Designed with input from residents and experts across Massachusetts, this modern rent stabilization policy will protect tenants from big corporate investors who unreasonably increase rents, while allowing local landlords to earn a reasonable profit and enabling new construction to address housing shortages.",
  },

  // ── No position ─────────────────────────────────────────────────────────────
  {
    id: "wu-no-position",
    userId: "office-wu",
    stance: "no-position",
    date: "June 9, 2026",
    body: "I think on the rent control ballot question, we may very well be headed to the ballot and I do believe that there is widespread support because I mean the polling has certainly shown that people are frustrated and recognize that housing costs are way too way too high and want something done about it. I again I wish it were a more nuanced solution here but my hope is that this will open the door to being able to reach that nuanced solution after the ballot initiative.",
  },
  {
    id: "mariano-no-position",
    userId: "mariano",
    stance: "no-position",
    date: "June 24, 2026",
    body: "I am not going to take a position on this ballot question but I do not believe the rent control question that is on the ballot is going to improve the ability for housing investors to get into the marketplace, I think the barriers are very high, the amount of money that it's going to cost, it's almost going to keep people from even entering into it, I think that the question that's on the ballot really defeats the whole purpose of adding more housing to start, so we need to come up with ways, some new and inventive ways, because these old ways are not working...",
  },
];
