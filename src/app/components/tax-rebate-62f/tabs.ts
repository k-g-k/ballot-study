// Tab identity + order for the 62F reform page. The page ships in two layout
// variants that share all content: "grace" (the version linked from the
// ballot-questions index) and "matt" (URL-only A/B alternative).

export type PageVariant = "matt" | "grace";

export type TabId =
  | "overview"
  | "background"
  | "for-against"
  | "perspectives"
  | "deliberations"
  | "media"
  | "finance"
  | "bibliography";

// Matt — URL-only A/B alternative; full tab set including Background.
export const TABS_MATT: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "for-against", label: "For & Against" },
  { id: "perspectives", label: "Public Perspectives" },
  { id: "deliberations", label: "Citizen Discussions" },
  { id: "media", label: "Media Coverage" },
  { id: "finance", label: "Campaign Finance" },
  { id: "background", label: "Background" },
  { id: "bibliography", label: "Bibliography" },
];

// Grace — Background tab hidden; Ballot Coverage moved to right after For & Against.
export const TABS_GRACE: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  // { id: "background", label: "Background" }, // hidden on the Grace variant
  { id: "for-against", label: "For & Against" },
  { id: "media", label: "Ballot Coverage" },
  { id: "perspectives", label: "Public Perspectives" },
  { id: "deliberations", label: "Citizen Discussions" },
  { id: "finance", label: "Campaign Finance" },
  { id: "bibliography", label: "Bibliography" },
];
