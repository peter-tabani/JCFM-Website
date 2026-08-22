// Shared between the client-side donate button and the server-side webhook
// handler — do NOT import Node-only modules here (no "crypto" package
// import), since this file ends up in the browser bundle too. `crypto`
// itself is fine to use unqualified: it's the global Web Crypto API,
// available both in browsers and in the Node runtime Next.js server code
// runs on (Node 19+), so randomUUID() works identically on both sides
// without any import.

// IntaSend's api_ref field only allows [a-zA-Z0-9-_: ] (max 140 chars).
// The webhook (app/api/intasend/webhook/route.ts) parses this same format
// back apart to recover which fund a completed donation should be
// allocated to, since IntaSend's webhook payload has no "purpose" field of
// its own.
export function buildApiRef(purpose: string): string {
  const slug = purpose.replace(/[^a-zA-Z0-9-_ ]/g, "").slice(0, 60).trim() || "General Fund";
  return `JCFM:${slug}:${crypto.randomUUID()}`;
}

export function parsePurposeFromApiRef(apiRef: string | undefined | null): string {
  if (!apiRef) return "General Fund";
  const parts = apiRef.split(":");
  if (parts.length >= 3 && parts[0] === "JCFM") {
    return parts.slice(1, -1).join(":").trim() || "General Fund";
  }
  return "General Fund";
}
