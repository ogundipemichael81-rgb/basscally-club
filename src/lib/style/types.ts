export type StylePageTrack = {
  id: string;
  title: string;
  type: string;
  typeLabel: string;
  difficulty: string | null;
  description: string | null;
  coverUrl: string | null;
};

export type StylePageData = {
  slug: string;
  title: string;
  headline: string;
  description: string | null;
  defaultDifficulty: string | null;
  heroImageUrl: string | null;
  artist: {
    slug: string;
    name: string;
    bio: string | null;
    heroImageUrl: string | null;
  };
  tracks: StylePageTrack[];
  learnPoints: string[];
};
