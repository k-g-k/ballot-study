// User accounts for organizations and officials that have taken a public
// position on the 2026 Massachusetts rent-control initiative, per Ballotpedia
// (see Rentcontrol-ballotpedia.pdf). Rendered in the Public Perspectives tab
// as if each had registered a MAPLE account with an uploaded avatar.
//
// Avatars: Wikipedia page images where the entity has one (all portraits);
// otherwise the organization's or city's own site icon. Four accounts have no
// usable image on file (AIM's favicon is 16px; Homes for All Massachusetts and
// the City of Agawam expose no icon; New England Community Project's site
// couldn't be confirmed) — those fall back to initials in the UI.

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
import avatarBeauregard from "../../assets/avatars/beauregard.png";
import avatarDePena from "../../assets/avatars/depena.png";
import avatarGarcia from "../../assets/avatars/garcia.jpg";
import avatarKeefe from "../../assets/avatars/keefe.png";
import avatarKoch from "../../assets/avatars/koch.jpg";
import avatarMazzarella from "../../assets/avatars/mazzarella.jpg";
import avatarMitchell from "../../assets/avatars/mitchell.jpg";
import avatarNicholson from "../../assets/avatars/nicholson.png";
import avatarPetty from "../../assets/avatars/petty.jpg";
import avatarMariano from "../../assets/avatars/mariano.jpg";

// "organization" covers advocacy groups, trade associations, AND government
// offices for now; government offices carry `governmentOfficial: true` so they
// can be split into their own user type later. "legislator" is already its own
// type (individual members of the General Court).
export type PositionUserType = "organization" | "legislator";
export type PositionStance = "supports" | "opposes";

export interface PositionUser {
  id: string;
  name: string;
  userType: PositionUserType;
  /** Organization accounts that are government offices — future distinct user type. */
  governmentOfficial?: boolean;
  /** Short account descriptor shown under the name. */
  descriptor: string;
  stance: PositionStance;
  /** Uploaded avatar; when absent the UI renders an initials avatar. */
  avatar?: string;
  /** Initials for the fallback avatar (required when `avatar` is absent). */
  initials?: string;
}

export const POSITION_USERS: PositionUser[] = [
  // ── Supporting ─────────────────────────────────────────────────────────────
  {
    id: "homes-for-all-ma",
    name: "Homes for All Massachusetts",
    userType: "organization",
    descriptor: "Housing-justice coalition — led the YES campaign",
    stance: "supports",
    initials: "HFA",
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
    id: "office-wu",
    name: "Office of Boston Mayor Michelle Wu",
    userType: "organization",
    governmentOfficial: true,
    descriptor: "City of Boston",
    stance: "supports",
    avatar: avatarWu,
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

  // ── Opposing — government offices (organization accounts, flagged) ────────
  {
    id: "office-healey",
    name: "Office of Gov. Maura Healey",
    userType: "organization",
    governmentOfficial: true,
    descriptor: "Commonwealth of Massachusetts",
    stance: "opposes",
    avatar: avatarHealey,
  },
  {
    id: "office-beauregard",
    name: "Office of Methuen Mayor David Beauregard Jr.",
    userType: "organization",
    governmentOfficial: true,
    descriptor: "City of Methuen",
    stance: "opposes",
    avatar: avatarBeauregard,
  },
  {
    id: "office-depena",
    name: "Office of Lawrence Mayor Brian DePeña",
    userType: "organization",
    governmentOfficial: true,
    descriptor: "City of Lawrence",
    stance: "opposes",
    avatar: avatarDePena,
  },
  {
    id: "office-garcia",
    name: "Office of Holyoke Mayor Joshua Garcia",
    userType: "organization",
    governmentOfficial: true,
    descriptor: "City of Holyoke",
    stance: "opposes",
    avatar: avatarGarcia,
  },
  {
    id: "office-johnson",
    name: "Office of Agawam Mayor Christopher Johnson",
    userType: "organization",
    governmentOfficial: true,
    descriptor: "City of Agawam",
    stance: "opposes",
    initials: "CJ",
  },
  {
    id: "office-keefe",
    name: "Office of Revere Mayor Patrick Keefe Jr.",
    userType: "organization",
    governmentOfficial: true,
    descriptor: "City of Revere",
    stance: "opposes",
    avatar: avatarKeefe,
  },
  {
    id: "office-koch",
    name: "Office of Quincy Mayor Thomas Koch",
    userType: "organization",
    governmentOfficial: true,
    descriptor: "City of Quincy",
    stance: "opposes",
    avatar: avatarKoch,
  },
  {
    id: "office-mazzarella",
    name: "Office of Leominster Mayor Dean Mazzarella",
    userType: "organization",
    governmentOfficial: true,
    descriptor: "City of Leominster",
    stance: "opposes",
    avatar: avatarMazzarella,
  },
  {
    id: "office-mitchell",
    name: "Office of New Bedford Mayor Jon Mitchell",
    userType: "organization",
    governmentOfficial: true,
    descriptor: "City of New Bedford",
    stance: "opposes",
    avatar: avatarMitchell,
  },
  {
    id: "office-nicholson",
    name: "Office of Gardner Mayor Michael Nicholson",
    userType: "organization",
    governmentOfficial: true,
    descriptor: "City of Gardner",
    stance: "opposes",
    avatar: avatarNicholson,
  },
  {
    id: "office-petty",
    name: "Office of Worcester Mayor Joseph Petty",
    userType: "organization",
    governmentOfficial: true,
    descriptor: "City of Worcester",
    stance: "opposes",
    avatar: avatarPetty,
  },

  // ── Opposing — legislator ──────────────────────────────────────────────────
  {
    id: "mariano",
    name: "Ronald Mariano",
    userType: "legislator",
    descriptor: "Speaker of the Massachusetts House of Representatives (D–Quincy)",
    stance: "opposes",
    avatar: avatarMariano,
  },
];
