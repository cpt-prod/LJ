import type { Video } from "./types";

// Seed data. Replace these entries with real video IDs / file paths.
// Adding a video = adding one entry to this array.
export const videos: Video[] = [
  {
    id: "yt-1",
    kind: "youtube",
    youtubeId: "dQw4w9WgXcQ", // placeholder; replace with a real YouTube video ID
    title: "Headline set at The Loft",
    category: "dj",
    description: "90-minute house set recorded live in San Francisco.",
    date: "2026-05-18",
  },
  {
    id: "mp4-1",
    kind: "mp4",
    src: "/videos/sample.mp4", // drop a file at public/videos/sample.mp4 to play
    poster: "/videos/sample.jpg",
    title: "Community garden build day",
    category: "community",
    description: "Highlights from the May 2026 garden build at Mission Rec.",
    date: "2026-05-04",
  },
  {
    id: "yt-2",
    kind: "youtube",
    youtubeId: "9bZkp7q19f0", // placeholder
    title: "Original mix — \"Crescent\"",
    category: "music",
    description: "First release on SoundCloud. Drops and ambient breakdowns.",
    date: "2026-03-22",
  },
  {
    id: "vimeo-1",
    kind: "vimeo",
    vimeoId: "76979871", // placeholder
    title: "Volunteer drive — Oakland",
    category: "community",
    description: "Behind the scenes at a food drive for the Alameda Food Bank.",
    date: "2026-02-09",
  },
  {
    id: "yt-3",
    kind: "youtube",
    youtubeId: "kJQP7kiw5Fk", // placeholder
    title: "Sunset rooftop session",
    category: "dj",
    description: "A short DJ set from a sunset rooftop in Oakland.",
    date: "2025-09-14",
  },
  {
    id: "other-1",
    kind: "youtube",
    youtubeId: "OPf0YbXqDm0", // placeholder
    title: "Studio tour",
    category: "other",
    description: "A walkthrough of the home studio setup.",
    date: "2025-12-01",
  },
];
