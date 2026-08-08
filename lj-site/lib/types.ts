export type VideoCategory = "dj" | "music" | "community" | "other";

export type Video = {
  id: string;
  title: string;
  category: VideoCategory;
  description?: string;
  date?: string;
} & (
  | { kind: "youtube"; youtubeId: string }
  | { kind: "mp4"; src: string; poster?: string }
  | { kind: "vimeo"; vimeoId: string }
);

export const CATEGORY_LABEL: Record<VideoCategory, string> = {
  dj: "DJ Performances",
  music: "Music & Creative",
  community: "Community Service",
  other: "Other",
};
