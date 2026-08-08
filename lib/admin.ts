// Ministry admin allowlist (role bootstrap).
//
// Accounts now live in the database (see prisma/schema.prisma). This list
// decides which emails are granted the `admin` role when they first sign up
// or sign in with Google. Existing users' roles are not changed here, edit
// the database (or re-run the seed) to change an established account's role.
export const ADMIN_EMAILS = [
  "admin@jcfm.org",
  "bishop@jcfm.org",
  "coordinator@jcfm.org",
] as const;

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase() as (typeof ADMIN_EMAILS)[number]);
}
