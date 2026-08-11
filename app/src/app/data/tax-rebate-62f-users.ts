// User accounts for organizations and officials that have taken a public
// position on the 2026 Massachusetts Chapter 62F reform ballot question, per
// Ballotpedia (see the "Change State Tax Revenue Limit Initiative" page).
// Rendered in the Public Perspectives tab as if each had registered a MAPLE
// account with an uploaded avatar. Parallels src/app/data/rent-control-users.ts.
//
// Avatars are official images, or initials if no image is available.

import avatarPMF from "../../assets/avatars/protect-ma-future.png";
import avatarTAM from "../../assets/avatars/taxpayers-affordable-ma.png";
import avatarSpilka from "../../assets/avatars/spilka.jpg";
import avatarMassFiscal from "../../assets/avatars/mass-fiscal.png";
import avatarSeiu509 from "../../assets/avatars/seiu-509.png";
import avatarPioneer from "../../assets/avatars/pioneer-institute.png";
import avatarMHTC from "../../assets/avatars/mass-high-tech-council.png";
import avatarMassBudget from "../../assets/avatars/massbudget.png";
import avatarMTA from "../../assets/avatars/mta.png";
import avatarMOA from "../../assets/avatars/mass-opportunity-alliance.png";
import avatarMTF from "../../assets/avatars/mtf.png";

// "organization" — advocacy groups, unions, and trade associations.
// "legislator" — individual members of the General Court.
// "government" — executive-office accounts ("Office of …").
export type PositionUserType =
  | "organization"
  | "legislator"
  | "government"
  | "individual";
export type PositionStance = "supports" | "opposes";

export interface PositionUser {
  id: string;
  name: string;
  userType: PositionUserType;
  /** Short account descriptor shown under the name. */
  descriptor: string;
  stance: PositionStance;
  /** Uploaded avatar; when absent the UI renders an initials avatar. */
  avatar?: string;
  /** Initials for the fallback avatar (required when `avatar` is absent). */
  initials?: string;
  /** Sample viewer data: whether the prototype's current user follows this account. */
  followedByViewer?: boolean;
}

export const POSITION_USERS: PositionUser[] = [
  // ── Supporting (endorse) ─────────────────────────────────────────────────────
  {
    id: "mass-fiscal",
    name: "Massachusetts Fiscal Alliance",
    userType: "organization",
    descriptor: "Fiscal-policy advocacy nonprofit",
    stance: "supports",
    avatar: avatarMassFiscal,
    followedByViewer: true,
  },
  {
    id: "mass-opportunity-alliance",
    name: "Massachusetts Opportunity Alliance",
    userType: "organization",
    descriptor: "Free-market policy coalition",
    stance: "supports",
    avatar: avatarMOA,
  },
  {
    id: "pioneer-institute",
    name: "Pioneer Institute",
    userType: "organization",
    descriptor: "Free-market public-policy think tank",
    stance: "supports",
    avatar: avatarPioneer,
  },
  {
    id: "mass-high-tech-council",
    name: "Massachusetts High Technology Council",
    userType: "organization",
    descriptor: "Technology-industry association",
    stance: "supports",
    avatar: avatarMHTC,
  },
  {
    id: "taxpayers-affordable-ma",
    name: "Taxpayers for an Affordable Massachusetts",
    userType: "organization",
    descriptor: "Ballot committee registered in support of the measure",
    stance: "supports",
    initials: "TAM",
    avatar: avatarTAM,
  },

  // ── Opposing ─────────────────────────────────────────────────────────────────
  {
    id: "protect-ma-future",
    name: "Protect Massachusetts' Future",
    userType: "organization",
    descriptor: "Coalition opposing the tax ballot questions",
    stance: "opposes",
    initials: "PMF",
    avatar: avatarPMF,
  },
  {
    id: "massbudget",
    name: "Massachusetts Budget & Policy Center",
    userType: "organization",
    descriptor: "Nonpartisan budget & tax-policy research nonprofit",
    stance: "opposes",
    avatar: avatarMassBudget,
  },
  {
    id: "seiu-509",
    name: "SEIU Local 509",
    userType: "organization",
    descriptor: "Human-service workers & educators union",
    stance: "opposes",
    avatar: avatarSeiu509,
    followedByViewer: true,
  },
  {
    id: "mtf",
    name: "Massachusetts Taxpayers Foundation",
    userType: "organization",
    descriptor: "Nonpartisan fiscal-research nonprofit",
    stance: "opposes",
    avatar: avatarMTF,
  },
  {
    id: "mta",
    name: "Massachusetts Teachers Association",
    userType: "organization",
    descriptor: "Statewide educators union",
    stance: "opposes",
    avatar: avatarMTA,
  },
  {
    id: "spilka",
    name: "Sen. Karen Spilka",
    userType: "legislator",
    descriptor:
      "President of the Senate · Represents the Middlesex and Norfolk District · Framingham, Ashland, Holliston, Hopkinton, Natick & Medway (D)",
    stance: "opposes",
    avatar: avatarSpilka,
  },
];
