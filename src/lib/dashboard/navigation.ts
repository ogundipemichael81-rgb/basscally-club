export type MemberPrimaryNav = "dashboard" | "all" | "bassless" | "grooves" | "fills" | "challenges";

export function isMemberPrimaryNavActive(filter: string | null, item: MemberPrimaryNav): boolean {
  if (item === "dashboard") return !filter;
  return filter === item;
}