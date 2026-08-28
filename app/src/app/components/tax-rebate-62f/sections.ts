// The page's chapters, in reading order: the further down, the more specialised
// the reader. The rail is driven from this list, and so are the anchors.

export type SectionId =
  | "the-question"
  | "what-it-does"
  | "arguments"
  | "testimony"
  | "the-record";

export const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "the-question", label: "The question" },
  { id: "what-it-does", label: "What it does" },
  { id: "arguments", label: "What people argue" },
  { id: "testimony", label: "Testimony" },
  { id: "the-record", label: "The record" },
];
