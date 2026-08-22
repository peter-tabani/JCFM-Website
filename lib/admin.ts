import { scryptSync, timingSafeEqual } from "crypto";

// Ministry admin allowlist.
// Until a real user database is wired in, these emails unlock /admin.
// Add/remove emails here to grant or revoke dashboard access.
export const ADMIN_EMAILS = [
  "admin@jcfm.online",
  "bishop@jcfm.online",
  "coordinator@jcfm.online",
] as const;

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase() as (typeof ADMIN_EMAILS)[number]);
}

// Each admin's password lives ONLY as a salted hash in a server env var —
// never in code, never in plaintext. Generate a value for these with:
//   node scripts/hash-password.mjs "the real password"
// then paste the printed "salt:hash" string into the server's .env.
const ADMIN_PASSWORD_ENV_KEY: Record<string, string> = {
  "admin@jcfm.online": "ADMIN_PASSWORD_HASH_ADMIN",
  "bishop@jcfm.online": "ADMIN_PASSWORD_HASH_BISHOP",
  "coordinator@jcfm.online": "ADMIN_PASSWORD_HASH_COORDINATOR",
};

// Verifies a plaintext password against the admin's hashed env var using
// scrypt (Node's built-in crypto — no extra dependency to install) and a
// constant-time comparison to avoid timing attacks.
export function verifyAdminPassword(email: string, password: string): boolean {
  const key = ADMIN_PASSWORD_ENV_KEY[email.toLowerCase()];
  if (!key) return false;

  const stored = process.env[key];
  if (!stored) return false; // no password configured yet for this admin

  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex || !password) return false;

  try {
    const salt = Buffer.from(saltHex, "hex");
    const expected = Buffer.from(hashHex, "hex");
    const actual = scryptSync(password, salt, expected.length);
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}
