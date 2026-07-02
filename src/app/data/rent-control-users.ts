// User accounts for organizations and officials that have taken a public
// position on the 2026 Massachusetts rent-control initiative, per Ballotpedia
// (see Rentcontrol-ballotpedia.pdf). Rendered in the Public Perspectives tab
// as if each had registered a MAPLE account with an uploaded avatar.
//
// Avatars: for people ("Office of …" accounts and legislators) the image is
// always a portrait of the actual person (Wikipedia page images, visually
// verified) — never a city seal. Organizations use their own site logo. Where
// no portrait or usable logo exists anywhere on file (Wikipedia, Ballotpedia,
// and the city/org site were all checked), the account falls back to initials:
// AIM, Homes for All Massachusetts, New England Community Project, and the
// offices of Mayors Beauregard, Johnson, Keefe, Mazzarella, and Nicholson.

import avatarMlri from "../../assets/avatars/mlri.png";
import avatarWu from "../../assets/avatars/wu.jpg";
import avatarGbreb from "../../assets/avatars/gbreb.png";
import avatarMassRealtors from "../../assets/avatars/mass-realtors.png";
import avatarMassBio from "../../assets/avatars/massbio.png";
import avatarMassBusinessRoundtable from "../../assets/avatars/mass-business-roundtable.png";
import avatarMassFiscal from "../../assets/avatars/mass-fiscal.png";
import avatarNaiop from "../../assets/avatars/naiop-ma.jpg";
import avatarSpoa from "../../assets/avatars/spoa.jpg";
import avatarHealey from "../../assets/avatars/healey.jpg";
import avatarDePena from "../../assets/avatars/depena.png";
import avatarGarcia from "../../assets/avatars/garcia.jpg";
import avatarKoch from "../../assets/avatars/koch.jpg";
import avatarMitchell from "../../assets/avatars/mitchell.jpg";
import avatarPetty from "../../assets/avatars/petty.jpg";
import avatarMariano from "../../assets/avatars/mariano.jpg";
import avatarHousingForMA from "../../assets/avatars/housing-for-ma.jpg";
import avatarMassHousingCoalition from "../../assets/avatars/mass-housing-coalition.jpg";
import avatarSeiu509 from "../../assets/avatars/seiu-509.png";
import avatarHomesForAll from "../../assets/avatars/homes-for-all-ma.png";
import avatarKeepMAHome from "../../assets/avatars/keep-ma-home.png";

// "organization" — advocacy groups and trade associations (icon: bullhorn).
// "legislator" — individual members of the General Court (icon: scales).
// "government" — executive-office accounts ("Office of …" for governors and
//   mayors; icon: lectern). Formerly organization accounts with a
//   governmentOfficial flag; now their own user type.
export type PositionUserType = "organization" | "legislator" | "government";
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
  // ── Supporting ─────────────────────────────────────────────────────────────
  {
    id: "homes-for-all-ma",
    name: "Homes for All Massachusetts",
    userType: "organization",
    descriptor: "Housing-justice coalition — led the YES campaign",
    stance: "supports",
    avatar: avatarHomesForAll,
  },
  {
    id: "necp",
    name: "New England Community Project",
    userType: "organization",
    descriptor: "Community-organizing nonprofit",
    stance: "supports",
    initials: "NE",
  },
  {
    id: "mlri",
    name: "Massachusetts Law Reform Institute",
    userType: "organization",
    descriptor: "Nonprofit legal-aid & policy center",
    stance: "supports",
    avatar: avatarMlri,
  },
  {
    id: "keep-ma-home",
    name: "Keep Massachusetts Home",
    userType: "organization",
    descriptor: "Committee leading the YES campaign",
    stance: "supports",
    avatar: avatarKeepMAHome,
  },
  {
    id: "springfield-no-one-leaves",
    name: "Springfield No One Leaves",
    userType: "organization",
    descriptor: "Tenant-organizing nonprofit",
    stance: "supports",
    initials: "SNL",
  },
  {
    id: "seiu-509",
    name: "SEIU Local 509",
    userType: "organization",
    descriptor: "Human-service workers & educators union",
    stance: "supports",
    avatar: avatarSeiu509,
    followedByViewer: true,
  },
  {
    id: "office-wu",
    name: "Office of Boston Mayor Michelle Wu",
    userType: "government",
    descriptor: "Mayor of the City of Boston (Nonpartisan)",
    stance: "supports",
    avatar: avatarWu,
    followedByViewer: true,
  },

  // ── Opposing — organizations ───────────────────────────────────────────────
  {
    id: "aim",
    name: "Associated Industries of Massachusetts (AIM)",
    userType: "organization",
    descriptor: "Statewide employer association",
    stance: "opposes",
    initials: "AIM",
  },
  {
    id: "gbreb",
    name: "Greater Boston Real Estate Board",
    userType: "organization",
    descriptor: "Real-estate trade association",
    stance: "opposes",
    avatar: avatarGbreb,
    followedByViewer: true,
  },
  {
    id: "mass-realtors",
    name: "Massachusetts Association of REALTORS",
    userType: "organization",
    descriptor: "Statewide REALTOR trade association",
    stance: "opposes",
    avatar: avatarMassRealtors,
  },
  {
    id: "massbio",
    name: "Massachusetts Biotechnology Council",
    userType: "organization",
    descriptor: "Life-sciences industry council",
    stance: "opposes",
    avatar: avatarMassBio,
  },
  {
    id: "mass-business-roundtable",
    name: "Massachusetts Business Roundtable",
    userType: "organization",
    descriptor: "Employer public-policy association",
    stance: "opposes",
    avatar: avatarMassBusinessRoundtable,
  },
  {
    id: "mass-fiscal",
    name: "Massachusetts Fiscal Alliance",
    userType: "organization",
    descriptor: "Fiscal-policy advocacy nonprofit",
    stance: "opposes",
    avatar: avatarMassFiscal,
  },
  {
    id: "naiop-ma",
    name: "NAIOP Massachusetts",
    userType: "organization",
    descriptor: "Commercial real-estate development association",
    stance: "opposes",
    avatar: avatarNaiop,
  },
  {
    id: "spoa",
    name: "Small Property Owners Association",
    userType: "organization",
    descriptor: "Small-landlord association",
    stance: "opposes",
    avatar: avatarSpoa,
  },

  {
    id: "housing-for-ma",
    name: "Housing for Massachusetts",
    userType: "organization",
    descriptor: "Committee leading the NO campaign",
    stance: "opposes",
    avatar: avatarHousingForMA,
  },
  {
    id: "mass-housing-coalition",
    name: "Massachusetts Housing Coalition",
    userType: "organization",
    descriptor: "Housing-industry coalition",
    stance: "opposes",
    avatar: avatarMassHousingCoalition,
  },

  // ── Opposing — executive offices ───────────────────────────────────────────
  {
    id: "office-healey",
    name: "Office of Gov. Maura Healey",
    userType: "government",
    descriptor: "Governor for the State of Massachusetts (D)",
    stance: "opposes",
    avatar: avatarHealey,
    followedByViewer: true,
  },
  {
    id: "office-beauregard",
    name: "Office of Methuen Mayor David Beauregard Jr.",
    userType: "government",
    descriptor: "City of Methuen",
    stance: "opposes",
    initials: "DB",
  },
  {
    id: "office-depena",
    name: "Office of Lawrence Mayor Brian DePeña",
    userType: "government",
    descriptor: "City of Lawrence",
    stance: "opposes",
    avatar: avatarDePena,
  },
  {
    id: "office-garcia",
    name: "Office of Holyoke Mayor Joshua Garcia",
    userType: "government",
    descriptor: "City of Holyoke",
    stance: "opposes",
    avatar: avatarGarcia,
  },
  {
    id: "office-johnson",
    name: "Office of Agawam Mayor Christopher Johnson",
    userType: "government",
    descriptor: "City of Agawam",
    stance: "opposes",
    initials: "CJ",
  },
  {
    id: "office-keefe",
    name: "Office of Revere Mayor Patrick Keefe Jr.",
    userType: "government",
    descriptor: "City of Revere",
    stance: "opposes",
    initials: "PK",
  },
  {
    id: "office-koch",
    name: "Office of Quincy Mayor Thomas Koch",
    userType: "government",
    descriptor: "City of Quincy",
    stance: "opposes",
    avatar: avatarKoch,
  },
  {
    id: "office-mazzarella",
    name: "Office of Leominster Mayor Dean Mazzarella",
    userType: "government",
    descriptor: "City of Leominster",
    stance: "opposes",
    initials: "DM",
  },
  {
    id: "office-mitchell",
    name: "Office of New Bedford Mayor Jon Mitchell",
    userType: "government",
    descriptor: "Mayor of the City of New Bedford (D)",
    stance: "opposes",
    avatar: avatarMitchell,
  },
  {
    id: "office-nicholson",
    name: "Office of Gardner Mayor Michael Nicholson",
    userType: "government",
    descriptor: "City of Gardner",
    stance: "opposes",
    initials: "MN",
  },
  {
    id: "office-petty",
    name: "Office of Worcester Mayor Joseph Petty",
    userType: "government",
    descriptor: "City of Worcester",
    stance: "opposes",
    avatar: avatarPetty,
  },

  // ── Opposing — legislator ──────────────────────────────────────────────────
  {
    id: "mariano",
    name: "Rep. Ronald Mariano",
    userType: "legislator",
    descriptor:
      "Speaker of the House · Represents the 3rd Norfolk District — Quincy, Weymouth & Holbrook (D)",
    stance: "opposes",
    avatar: avatarMariano,
  },
];
