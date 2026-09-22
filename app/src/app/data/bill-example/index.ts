// One bill, shaped the way MAPLE actually holds bills.
//
// The field names follow `functions/src/bills/types.ts` in the MAPLE repo, so
// this page can be pointed at a real document later without renaming anything:
//
//   id, court, content{Title, Pinslip, PrimarySponsor, DocumentText, Cosponsors}
//   cosponsorCount, testimonyCount, endorseCount, neutralCount, opposeCount
//   history[{Date, Branch, Action}], currentCommittee, topics[{category, topic}]
//   summary, similar[]
//
// Two things on the page are not in that record and are modelled here as what
// they would be: the hearing's video and transcript, which live on the event
// document (`videoURL`, `transcriptionIds`), and the lineage, which today has
// to be read out of history actions and `similar`. Lineage is given a shape of
// its own below, because reading "Accompanied a new draft, see S2911" out of a
// sentence is not something a page should be doing.
//
// The bill is real: S.531 of the 194th General Court. The testimony counts and
// the AI summary are its own; the transcript excerpt and the lineage dates are
// written for the prototype.

export interface BillSponsor {
  id: string;
  name: string;
  /** Chamber and district, as the member's profile gives it. */
  role: string;
  lead?: boolean;
}

export interface BillTopic {
  category: string;
  topic: string;
}

export interface BillHistoryAction {
  date: string;
  branch: "House" | "Senate" | "Joint";
  action: string;
}

/**
 * A bill's life across numbers.
 *
 * The same proposal is refiled each session and redrafted within one, and each
 * time it becomes a different bill number. Following it is the reader's problem
 * today: the trail is spread across history actions on several documents. This
 * is that trail as one list, oldest first.
 */
export interface BillLineageStep {
  /** The number it carried. */
  number: string;
  /** Which two-year General Court. */
  court: number;
  when: string;
  /** What happened to it under that number. */
  outcome: string;
  /** The one the reader is looking at. */
  current?: boolean;
}

export interface Bill {
  id: string;
  court: number;
  content: {
    Title: string;
    /** The legislature's own one-line description, when it has one. */
    Pinslip: string | null;
    PrimarySponsor: { Name: string } | null;
    DocumentText: string;
    Cosponsors: { Name: string }[];
  };
  cosponsorCount: number;
  testimonyCount: number;
  endorseCount: number;
  neutralCount: number;
  opposeCount: number;
  history: BillHistoryAction[];
  currentCommittee: { id: string; name: string };
  topics: BillTopic[];
  /** Written by MAPLE's model from the bill text. Never the legislature's. */
  summary: string;
  similar: string[];
}

export const BILL: Bill = {
  id: "S531",
  court: 194,
  content: {
    Title:
      "An Act providing a local option for ranked choice voting in municipal elections",
    Pinslip: null,
    PrimarySponsor: { Name: "Rebecca L. Rausch" },
    DocumentText: "",
    Cosponsors: [],
  },
  cosponsorCount: 26,
  testimonyCount: 109,
  endorseCount: 108,
  neutralCount: 1,
  opposeCount: 0,
  currentCommittee: { id: "J10", name: "Joint Committee on Election Laws" },
  topics: [
    { category: "Government Operations", topic: "Voting and elections" },
    {
      category: "Government Operations",
      topic: "Municipality oversight and home rule petitions",
    },
    {
      category: "Government Operations",
      topic: "Government studies and investigations",
    },
    {
      category: "Government Operations",
      topic: "Lobbying and campaign finance",
    },
  ],
  summary:
    "The bill allows cities and towns to adopt ranked choice voting for local elections, where voters can rank candidates in order of preference. This method aims to ensure that votes are counted in rounds, allowing for a more representative outcome, especially in elections with multiple winners. Municipalities that choose to implement this system must create specific rules for how votes are tallied and how to handle ties or eliminated candidates. Additionally, a voter education campaign would be required to help residents understand the new voting process.",
  history: [
    {
      date: "February 27, 2025",
      branch: "Senate",
      action: "Referred to the Joint Committee on Election Laws",
    },
    {
      date: "March 4, 2025",
      branch: "House",
      action: "House concurred",
    },
    {
      date: "September 16, 2025",
      branch: "Joint",
      action: "Hearing scheduled for 11/20/2025 from 10:00 AM to 01:00 PM",
    },
    {
      date: "November 20, 2025",
      branch: "Joint",
      action: "Heard before the Joint Committee on Election Laws",
    },
  ],
  similar: ["S2911"],
};

export const SPONSORS: BillSponsor[] = [
  {
    id: "rausch",
    name: "Rebecca L. Rausch",
    role: "Senator · Norfolk, Worcester and Middlesex",
    lead: true,
  },
  { id: "barrett", name: "Michael J. Barrett", role: "Senator · Third Middlesex" },
  {
    id: "comerford",
    name: "Joanne M. Comerford",
    role: "Senator · Hampshire, Franklin and Worcester",
  },
];

/**
 * The hearing, from the event document rather than the bill.
 *
 * A bill points at hearings by id; the video and the transcript hang off the
 * event. The page shows them together because a reader does not care which
 * document they came from.
 */
export const HEARING = {
  id: "5631",
  committee: "Joint Committee on Election Laws",
  when: "November 20, 2025",
  duration: "3h 04m",
  videoURL: "https://malegislature.gov/Events/Hearings/Detail/5631",
  /** Machine-generated, like MAPLE's own, so it is labelled as such. */
  transcriptExcerpt:
    "Chair Keenan: The committee will come to order. We have a long list this morning, so I would ask that testimony be kept to three minutes. First on ranked choice voting in municipal elections, Senate 531.",
  transcriptHref: "https://www.mapletestimony.org/hearing/5631",
};

/**
 * The same proposal, session by session.
 *
 * Refiled twice and redrafted once, which is four numbers for one idea. The
 * page carries all of them because a reader who followed it last session needs
 * to be told where it went, and because "no action" repeated across sessions is
 * itself the story.
 */
export const LINEAGE: BillLineageStep[] = [
  {
    number: "S.414",
    court: 192,
    when: "2021–2022",
    outcome: "Reported favourably, then sent to study. No further action.",
  },
  {
    number: "S.474",
    court: 193,
    when: "2023–2024",
    outcome: "Heard in Election Laws. Sent to study at the end of the session.",
  },
  {
    number: "S.531",
    court: 194,
    when: "2025–2026",
    outcome: "Heard November 20, 2025. Before the committee now.",
    current: true,
  },
  {
    number: "S.2911",
    court: 194,
    when: "2026",
    outcome:
      "The committee's redraft of S.531, reported out and now carrying the proposal.",
  },
];
