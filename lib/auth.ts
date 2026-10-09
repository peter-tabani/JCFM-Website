import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

const DUMMY_PIN_HASH = "$2b$12$.YKX2VFPAZDw6TxT0Vj0yefnrWRpAbKrqQ3vBUu7BZWoSURYWa73e";

// Single source of truth for NextAuth. Imported by the route handler and by
// getServerSession() in server routes / server components.
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        phone: { label: "Phone number", type: "tel" },
        pin: { label: "PIN", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.phone && credentials?.pin) {
          const { normalizeLoginPhone } = await import("@/lib/phone-login");
          const phone = normalizeLoginPhone(String(credentials.phone));
          if (!phone || !/^\d{8}$/.test(String(credentials.pin))) return null;

          const user = await prisma.user.findUnique({ where: { loginPhone: phone } });
          const now = new Date();
          if (!user || user.role !== "staff" || user.disabledAt || !user.pinHash ||
              (user.pinLockedUntil && user.pinLockedUntil > now)) {
            await bcrypt.compare(String(credentials.pin), DUMMY_PIN_HASH);
            return null;
          }

          const valid = await bcrypt.compare(String(credentials.pin), user.pinHash);
          if (!valid) {
            const updated = await prisma.user.update({
              where: { id: user.id },
              data: { pinFailedAttempts: { increment: 1 } },
            });
            if (updated.pinFailedAttempts >= 5) {
              await prisma.user.update({
                where: { id: user.id },
                data: { pinLockedUntil: new Date(Date.now() + 15 * 60 * 1000) },
              });
            }
            return null;
          }

          await prisma.user.update({
            where: { id: user.id },
            data: { pinFailedAttempts: 0, pinLockedUntil: null },
          });
          return {
            id: user.id,
            name: user.name ?? "Staff",
            email: user.email,
            role: user.role,
            mustChangePin: user.mustChangePin,
          };
        }

        if (!credentials?.email || !credentials?.password) return null;

        const email = String(credentials.email).toLowerCase().trim();
        const user = await prisma.user.findUnique({ where: { email } });

        // No account, or an OAuth-only account with no password set.
        if (!user?.passwordHash) return null;

        const valid = await bcrypt.compare(
          String(credentials.password),
          user.passwordHash
        );
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name ?? undefined,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    // Persist OAuth (Google) users into our own users table so accounts are
    // unified regardless of sign-in method.
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const email = user.email.toLowerCase();
        await prisma.user.upsert({
          where: { email },
          update: {
            name: user.name ?? undefined,
            image: user.image ?? undefined,
          },
          create: {
            email,
            name: user.name ?? null,
            image: user.image ?? null,
            role: isAdminEmail(email) ? "admin" : "user",
          },
        });
      }
      return true;
    },

    // Runs with `user` only at sign-in; we read id + role from the DB once and
    // cache them on the token (no per-request DB hit thereafter).
    async jwt({ token, user, trigger }) {
      const userId = user?.id ?? token.id;
      const email = user?.email ?? token.email;
      if ((user || trigger === "update") && (userId || email)) {
        const dbUser = userId
          ? await prisma.user.findUnique({ where: { id: userId } })
          : email
            ? await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
            : null;
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.mustChangePin = dbUser.mustChangePin;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.mustChangePin = token.mustChangePin;
        session.user.name = token.name ?? session.user.name;
        session.user.email = token.email ?? session.user.email;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};
