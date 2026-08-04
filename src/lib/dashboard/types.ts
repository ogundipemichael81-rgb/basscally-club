export type DashboardContentItem = {
  id: string;
  title: string;
  type: string;
  typeLabel: string;
  description: string | null;
  difficulty: string | null;
  coverUrl: string | null;
  publishedAt: string | null;
  isFreePreview?: boolean;
};

export type UpcomingDrop = {
  id: string;
  title: string;
  type: string;
  typeLabel: string;
  scheduledFor: string;
};

export type DashboardData = {
  published: DashboardContentItem[];
  upcoming: UpcomingDrop[];
  downloadedIds: string[];
  source: "database" | "demo";
};
