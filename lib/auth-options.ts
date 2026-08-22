import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { isAdminEmail, verifyAdminPassword } from "@/lib/admin";

const isProd = process.env.NODE_ENV === "production";

// Fail fast in production if a real secret hasn't been configured, instead
// of silently signing sessions with a well-known, publicly-visible default.
if (isProd && !process.env.NEXTAUTH_SECRET) {
  throw new Error(
    "NEXTAUTH_SECRET is not set. Refusing to start in production with the insecure default secret."
  );
}

// Google sign-in was removed for the admin console: it let anyone signed
// into a matching Gmail address in, with no password the ministry controls,
// for a login that reaches sensitive donor/member data. Admin accounts now
// require a real password, checked against a salted hash (see lib/admin.ts
// and scripts/hash-password.mjs) — enabled in every environment, not just
// dev, since it's the only way into /admin now.
//
// Non-admin sign-ins (the donor portal) keep their existing behaviour: the
// donor portal already checks the donor's password client-side against its
// own (localStorage-backed) account store before calling signIn(), so this
// provider just establishes the session afterward.
// TODO: donor accounts are still a client-only demo store, not a real
// database — revisit before relying on it for real donor data.
const providers = [
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;

      const email = String(credentials.email).toLowerCase();

      if (isAdminEmail(email)) {
        if (!verifyAdminPassword(email, credentials.password)) return null;
        return { id: email, name: email.split("@")[0], email, role: "admin" as const };
      }

      // Donor portal path — password already verified client-side.
      return { id: email, name: email.split("@")[0], email, role: "user" as const };
    },
  }),
];

// Shared config — imported by the [...nextauth] route handler AND by any
// server-side code (API routes, server components) that needs to check
// who's signed in via getServerSession(authOptions).
export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? "jcfm-dev-secret-change-me",
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  providers,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.role = user.role ?? (isAdminEmail(user.email) ? "admin" : "user");
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};
