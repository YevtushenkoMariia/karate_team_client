export type GroupTab = "plans" | "members" | "info";

const TABS: { id: GroupTab; label: string }[] = [
    { id: "info", label: "Інформація" },
    { id: "plans", label: "Плани" },
    { id: "members", label: "Учасники" },
  ];

  export default TABS;