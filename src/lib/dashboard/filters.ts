export type DashboardFilter = "all" | "bassless" | "grooves" | "fills" | "challenges" | "downloaded";

export const DASHBOARD_FILTER_TABS: { id: Exclude<DashboardFilter, "downloaded">; label: string }[] = [
  { id: "all", label: "All Drops" },
  { id: "bassless", label: "Bass-less" },
  { id: "grooves", label: "Grooves" },
  { id: "fills", label: "Fills" },
  { id: "challenges", label: "Challenges" },
];

const TYPE_BY_FILTER: Partial<Record<DashboardFilter, string>> = { bassless: "bassless_track", grooves: "groove", fills: "fill", challenges: "challenge" };

type LibraryContext = { eyebrow: string; title: string; description: string; emptyTitle: string; emptyDescription: string };
const LIBRARY_CONTEXT: Record<Exclude<DashboardFilter, "downloaded">, LibraryContext> = {
  all: { eyebrow: "All drops", title: "All Drops", description: "Every published practice drop in your Basscally Hub library.", emptyTitle: "No published drops yet", emptyDescription: "New practice drops will appear here as soon as they are released." },
  bassless: { eyebrow: "Bass-less practice", title: "Bass-less Practice", description: "Practice without the original bass line. Build your own pocket, tone and interpretation.", emptyTitle: "No Bass-less Practice drops yet", emptyDescription: "The next bass-less practice drop will appear here when it is published." },
  grooves: { eyebrow: "Grooves", title: "Grooves", description: "Lock into feel, timing and pocket with focused bass grooves.", emptyTitle: "No groove drops yet", emptyDescription: "New focused groove practice will appear here when it is published." },
  fills: { eyebrow: "Fills", title: "Fills", description: "Practice short musical fills and learn when to use them.", emptyTitle: "No fill drops yet", emptyDescription: "New fill practice will appear here when it is published." },
  challenges: { eyebrow: "Challenges", title: "Challenges", description: "Put your technique and musical decisions to work in focused practice challenges.", emptyTitle: "No challenges yet", emptyDescription: "Your next focused practice challenge will appear here when it is published." },
};

export function parseDashboardFilter(value: string | undefined): DashboardFilter { const allowed: DashboardFilter[] = ["all", "bassless", "grooves", "fills", "challenges", "downloaded"]; return value && allowed.includes(value as DashboardFilter) ? value as DashboardFilter : "all"; }
export function getDashboardLibraryContext(filter: DashboardFilter): LibraryContext { return filter === "downloaded" ? { eyebrow: "Downloads", title: "Downloaded drops", description: "Practice files you have downloaded for offline work.", emptyTitle: "No downloads yet", emptyDescription: "Download a published drop to keep it available for offline practice." } : LIBRARY_CONTEXT[filter]; }
export function filterDashboardItems<T extends { id: string; type: string }>(items: T[], filter: DashboardFilter, downloadedIds: string[]): T[] { if (filter === "downloaded") { const ids = new Set(downloadedIds); return items.filter((item) => ids.has(item.id)); } const type = TYPE_BY_FILTER[filter]; return type ? items.filter((item) => item.type === type) : items; }
export function dashboardFilterHref(filter: DashboardFilter): string { return filter === "all" ? "/dashboard?filter=all" : `/dashboard?filter=${filter}`; }