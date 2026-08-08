// Tab identity + order for the 62F reform page.

export type TabId =
  | "overview"
  | "for-against"
  | "updates"
  | "perspectives"
  | "finance"
  | "bibliography";

export const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "for-against", label: "Context & Arguments" },
  { id: "perspectives", label: "Public Perspectives" },
  { id: "updates", label: "Ballot Coverage" },
  { id: "finance", label: "Campaign Finance" },
  { id: "bibliography", label: "Bibliography" },
];
