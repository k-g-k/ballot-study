// Tab identity + order for the rent-control page. To add, remove, or reorder a
// tab, edit this list (and add the matching `activeTab === …` branch in
// index.tsx). "media" stays defined but commented out.

export type TabId =
  | "overview"
  | "background"
  | "for-against"
  | "perspectives"
  | "deliberations"
  | "media"
  | "finance"
  | "bibliography";

export const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "for-against", label: "For & Against" },
  { id: "perspectives", label: "Public Perspectives" },
  { id: "deliberations", label: "Citizen Deliberations" },
  // { id: "media", label: "Media Coverage" },
  { id: "finance", label: "Campaign Finance" },
  { id: "background", label: "Background" },
  { id: "bibliography", label: "Bibliography" },
];
