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
