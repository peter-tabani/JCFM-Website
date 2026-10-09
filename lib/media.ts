// Helpers for the "Life at JCFM" media gallery.

// Pull a YouTube video id from the common URL shapes.
export function youTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

// A playable embed URL for a video link (falls back to the original URL).
export function toEmbedUrl(url: string): string {
  const id = youTubeId(url);
  if (id) return `https://www.youtube.com/embed/${id}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return url;
}

// A direct video file (uploaded to /public), as opposed to a YouTube/Vimeo link.
export function isDirectVideo(url: string): boolean {
  return /\.(mp4|webm|mov|m4v|ogg|ogv)(\?.*)?$/i.test(url);
}

// A thumbnail for a video item: an explicit thumbnail, else a YouTube still.
export function videoThumb(url: string, thumbnail?: string | null): string | null {
  if (thumbnail) return thumbnail;
  const id = youTubeId(url);
  if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  return null;
}

export const MEDIA_CATEGORIES = [
  "Worship",
  "Prayer",
  "Sermon",
  "Children",
  "Youth",
  "Outreach",
  "Fellowship",
  "School",
] as const;

// Where an uploaded item appears on the public site. `section` is stored on
// MediaItem as a plain string, so adding a section needs no DB migration.
export const MEDIA_SECTIONS = [
  { key: "hero", label: "Homepage hero slideshow", page: "/", hint: "Large rotating photos at the top of the homepage. Landscape photos work best." },
  { key: "church", label: "Life at JCFM gallery", page: "/#gallery", hint: "The church photo gallery on the homepage." },
  { key: "school", label: "Fountain of Hope gallery", page: "/school#gallery", hint: "The gallery on the school page." },
  { key: "missions", label: "Mission Trips gallery", page: "/mission-trips", hint: "The “Moments from the field” slideshow on the mission trips page." },
] as const;

export type MediaSection = (typeof MEDIA_SECTIONS)[number]["key"];

export const MEDIA_SECTION_KEYS = MEDIA_SECTIONS.map((s) => s.key) as readonly string[];

export function isMediaSection(v: unknown): v is MediaSection {
  return typeof v === "string" && MEDIA_SECTION_KEYS.includes(v);
}

export function sectionLabel(key: string): string {
  return MEDIA_SECTIONS.find((s) => s.key === key)?.label ?? key;
}
