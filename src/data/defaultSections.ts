import { SectionConfig, SectionType } from "@/types";

export const defaultSectionOrder: SectionConfig[] = [
  { id: "hero", type: "hero", enabled: true, order: 1 },
  { id: "couple_intro", type: "couple_intro", enabled: true, order: 2 },
  { id: "countdown", type: "countdown", enabled: true, order: 3 },
  { id: "story", type: "story", enabled: false, order: 4 },
  { id: "events", type: "events", enabled: true, order: 5 },
  { id: "family", type: "family", enabled: true, order: 6 },
  { id: "venue", type: "venue", enabled: true, order: 7 },
  { id: "gallery", type: "gallery", enabled: true, order: 8 },
  { id: "video", type: "video", enabled: false, order: 9 },
  { id: "rsvp", type: "rsvp", enabled: true, order: 10 },
  { id: "dress_code", type: "dress_code", enabled: false, order: 11 },
  { id: "hashtag", type: "hashtag", enabled: false, order: 12 },
  { id: "music", type: "music", enabled: false, order: 13 },
  { id: "footer", type: "footer", enabled: true, order: 14 },
];

export const sectionLabels: Record<SectionType, string> = {
  hero: "Hero Banner",
  couple_intro: "Couple Introduction",
  countdown: "Countdown Timer",
  story: "Love Story",
  events: "Event Timeline",
  family: "Family Details",
  venue: "Venue",
  gallery: "Photo Gallery",
  video: "Video Embed",
  rsvp: "RSVP",
  dress_code: "Dress Code",
  hashtag: "Wedding Hashtag",
  music: "Music Player",
  footer: "Footer",
};

export const sectionDescriptions: Record<SectionType, string> = {
  hero: "Full-screen opening with couple names and date",
  couple_intro: "Beautiful introduction of bride & groom",
  countdown: "Live countdown to the wedding day",
  story: "Your love story in words and photos",
  events: "Timeline of all wedding events",
  family: "Introduce the families",
  venue: "Wedding venue details and directions",
  gallery: "Curated photo gallery",
  video: "Embed a pre-wedding or highlight video",
  rsvp: "Guest RSVP form",
  dress_code: "Dress code guidance for guests",
  hashtag: "Your wedding hashtag",
  music: "Background music player",
  footer: "Closing note and branding",
};
