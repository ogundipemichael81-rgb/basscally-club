export type DashboardFilter =
  | "all"
  | "bassless"
  | "grooves"
  | "fills"
  | "challenges"
  | "downloaded";

export const DASHBOARD_FILTER_TABS: { id: DashboardFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "bassless", label: "Bass-less" },
  { id: "grooves", label: "Grooves" },
  { id: "fills", label: "Fills" },
  { id: "challenges", label: "Challenges" },
];

const TYPE_BY_FILTER: Partial<Record<DashboardFilter, string>> = {
  bassless: "bassless_track",
  grooves: "groove",
  fills: "fill",
  challenges: "challenge",
};

export function parseDashboardFilter(value: string | undefined): DashboardFilter {
  const allowed: DashboardFilter[] = [
    "all",
    "bassless",
    "grooves",
    "fills",
    "challenges",
    "downloaded",
  ];
  if (value && allowed.includes(value as DashboardFilter)) {
    return value as DashboardFilter;
  }
  return "all";
}

export function filterDashboardItems<T extends { id: string; type: string }>(
  items: T[],
  filter: DashboardFilter,
  downloadedIds: string[],
): T[] {
  if (filter === "downloaded") {
    const ids = new Set(downloadedIds);
    return items.filter((item) => ids.has(item.id));
  }

  const type = TYPE_BY_FILTER[filter];
  if (!type) {
    return items;
  }

  return items.filter((item) => item.type === type);
}

export function dashboardFilterHref(filter: DashboardFilter): string {
  if (filter === "all") {
    return "/dashboard";
  }
  return `/dashboard?filter=${filter}`;
}
