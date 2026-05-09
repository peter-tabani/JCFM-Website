// Ministry admin allowlist.
// Until a real user database is wired in, these emails unlock /admin.
// Add/remove emails here to grant or revoke dashboard access.
export const ADMIN_EMAILS = [
  "admin@jcfm.org",
  "bishop@jcfm.org",
  "coordinator@jcfm.org",
] as const;

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase() as (typeof ADMIN_EMAILS)[number]);
}

// Demo credentials shown on the login page while there is no DB.
// Any non-empty password is accepted for these emails.
export const DEMO_ADMIN = {
  email: "admin@jcfm.org",
  name: "Bishop Nelson Barasa",
  role: "admin" as const,
};
