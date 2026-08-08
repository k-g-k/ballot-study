// Source registry for the 2026 Massachusetts rent-control ballot question.
// Every citable fact on the page references one of these by key. Supplied to
// the page via <SourcesProvider value={SOURCES}>.

import type { Sources } from "../../components/ballot/types";

export const SOURCES: Sources = {
  petition: {
    label: "Petition No. 25-21 (Mass.gov)",
    kind: "official",
    url: "https://www.mass.gov/doc/25-21-an-initiative-petition-to-protect-tenants-by-limiting-rent-increases/download",
    title:
      "An Initiative Petition to Protect Tenants by Limiting Rent Increases — certified petition text",
    meta: "Secretary of the Commonwealth / Office of the Attorney General · Certified Sep 3, 2025",
    note: "The full legal text of the measure, including coverage, baseline, and exemption provisions.",
  },
  agSummary: {
    label: "AG Summary of No. 25-21 (Mass.gov)",
    kind: "official",
    url: "https://www.mass.gov/doc/final-summary-for-25-21-an-initiative-petition-to-protect-tenants-by-limiting-rent-increases/download",
    title: "Attorney General's final summary of Petition No. 25-21",
    meta: "Office of the Attorney General · Sep 2025",
    note: "The AG's plain-language summary of the measure, prepared for voters and signature sheets.",
  },
  h5008: {
    label: "House Bill 5008, MA Legislature",
    kind: "official",
    url: "https://malegislature.gov/Bills/194/H5008.pdf",
    title: "House Bill 5008 — the initiative's legislative form",
    meta: "Massachusetts General Court · Feb 2026",
    note: "The bill the Legislature took up during its review window; lawmakers did not act by the May 2026 deadline.",
  },
  ballotpedia: {
    label: "Massachusetts Rent Control Initiative 2026 (Ballotpedia)",
    kind: "outside",
    url: "https://ballotpedia.org/Massachusetts_Rent_Control_Initiative_(2026)",
    title: "Massachusetts Rent Control Initiative (2026)",
    meta: "Ballotpedia",
    note: "Encyclopedia entry covering the measure text, support and opposition, campaign finance, and polling.",
  },
  tuftsGlobe: {
    label:
      "Boston Globe — Real estate-backed study warns rent control could tank property values",
    kind: "outside",
    url: "https://www.bostonglobe.com/2026/03/12/business/rent-control-property-values-massachusetts/",
    date: "Mar 12, 2026",
    title:
      "Real estate-backed study warns rent control could tank property values",
    meta: "Boston Globe",
    note: "Coverage of the GBREB-commissioned Tufts CSPA study projecting property-value and tax-base impacts.",
  },
  tuftsWBUR: {
    label: "WBUR — Real estate group warns proposal could lower property taxes",
    kind: "outside",
    url: "https://www.wbur.org/news/2026/03/12/rent-control-ballot-initiative-affordability-housing",
    date: "Mar 12, 2026",
    title:
      "Real estate group warns proposal could lower property taxes for cities and towns",
    meta: "WBUR",
    note: "Coverage of the Tufts CSPA projections and the campaigns' responses to them.",
  },
  healeyGlobe: {
    label:
      "Boston Globe — Rent control would 'effectively halt' housing production, Healey says",
    kind: "outside",
    url: "https://www.bostonglobe.com/2025/12/23/metro/maura-healey-rent-control-ballot-question-oppose/",
    date: "Dec 23, 2025",
    title:
      "Rent control would 'effectively halt' housing production, Healey says",
    meta: "Boston Globe",
    note: "Gov. Healey's first public statement of opposition to the ballot question.",
  },
  suffolkGlobe: {
    label: "Boston Globe — Suffolk/Globe poll on ballot questions",
    kind: "outside",
    url: "https://www.bostonglobe.com/2025/11/25/metro/suffolk-globe-poll-ballot-questions-rent-contol/",
    date: "Nov 25, 2025",
  },
  unhFeb: {
    label: "UNH Survey Center — Bay State Poll",
    kind: "outside",
    url: "https://scholars.unh.edu/survey_center_polls/931/",
    date: "Feb 2026",
  },
  wwlpPoll: {
    label: "WWLP — Poll shows more support for rent control",
    kind: "outside",
    url: "https://www.wwlp.com/news/massachusetts/poll-shows-more-support-for-rent-control-tax-cut/",
    date: "Feb 2026",
  },
  cbsSigs: {
    label: "CBS News Boston — Supporters say they have enough signatures",
    kind: "outside",
    url: "https://www.cbsnews.com/boston/news/rent-control-ballot-question-massachusetts",
    date: "Nov 19, 2025",
    title:
      "Rent control proposal has enough signatures for Massachusetts ballot, supporters say",
    meta: "CBS News Boston",
    note: "Signature filing; exemptions for owner-occupied ≤4 units and 10-year new construction; campaign statements from Carolyn Chou and Rose Webster-Smith.",
  },
  cwbCompromise: {
    label:
      "CommonWealth Beacon — Rent control backers seek legislative road away from ballot",
    kind: "outside",
    url: "https://commonwealthbeacon.org/housing/rent-control-backers-scrambling-to-find-legislative-road-away-from-the-ballot/",
    date: "Jun 2, 2026",
    title:
      "Rent control backers scrambling to find legislative road away from the ballot",
    meta: "CommonWealth Beacon",
    note: "Reports the June 2026 compromise talks between the YES campaign and legislative leaders.",
  },
  ocpfSHNS: {
    label:
      "State House News — Supportive groups helped finance signature gathering (OCPF)",
    kind: "outside",
    url: "https://www.statehousenews.com/news/politics/campaignfinance/supportive-groups-helped-finance-rent-control-signature-gathering/article_1cf44c97-5266-446e-9d15-d50d12d629b1.html",
    date: "2026",
    title: "Supportive groups helped finance rent control signature gathering",
    meta: "State House News Service",
    note: "Analysis of OCPF filings: totals raised, in-kind support behind the YES committee, and real-estate industry donors on the NO side.",
  },
  keepMAHome: {
    label: "Keep Massachusetts Home (Yes committee)",
    kind: "official",
    url: "https://www.homesforallmass.org/",
  },
  housingForMA: {
    label: "Housing for Massachusetts (No committee)",
    kind: "official",
    url: "https://housingformass.com/",
  },
  article48: {
    label: "Massachusetts Constitution, Article 48 (The Initiative)",
    kind: "official",
    url: "https://malegislature.gov/Laws/Constitution",
    title: "Massachusetts Constitution, Article 48 — the Initiative",
    meta: "Commonwealth of Massachusetts",
    note: "Governs the initiative-petition process, including legislative amendment or repeal of voter-approved statutes after passage.",
  },
  spoaGuide: {
    label:
      "SPOA — Massachusetts Rent Control Ballot 2026: Property Owner Guide",
    kind: "outside",
    url: "https://spoa.com/learn/massachusetts-rent-control-ballot-measure-2026-guide",
    date: "May 2026",
    title: "Massachusetts Rent Control Ballot 2026: Property Owner Guide",
    meta: "Small Property Owners Association (property-owner association; opposes the measure)",
    note: "Owner-side legal analysis raising takings/fair-return and Ch. 93A interaction arguments.",
  },
  academicResearch: {
    label: "Peer-reviewed rent-control research (see Research & Evidence)",
    kind: "outside",
    url: "",
    title: "Peer-reviewed rent-control research",
    meta: "Autor, Palmer & Pathak 2014 · Sims 2007 · Diamond, McQuade & Qian 2019",
    note: "The studies summarized under Research & Evidence on the Bibliography tab.",
  },
  mapleTestimony: {
    label: "Testimony submitted to MAPLE (this question)",
    kind: "user",
    url: "",
    title: "Verified account testimony on this question",
    meta: "MAPLE · Public Perspectives tab",
    note: "Statements submitted by organization, executive-office, and legislator accounts, shown in their own words on the Public Perspectives tab.",
  },
  q9: {
    label: "Massachusetts 1994 Election Results (Question 9)",
    kind: "official",
    url: "https://ballotpedia.org/Massachusetts_Rent_Control_Initiative_(2026)",
    title: "Question 9: Prohibition of Rent Control (1994)",
    meta: "Massachusetts election results · Nov 1994",
    note: "The voter-approved statewide ban on rent control that this initiative would end; it passed 51.3%–48.7% and repealed programs in Boston, Cambridge, and Brookline.",
  },
};
