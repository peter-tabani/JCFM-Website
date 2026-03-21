import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    // Session only — expires when browser closes
    maxAge: 24 * 60 * 60, // 24 hours max
  },
  providers: [
    // ── Google OAuth ──
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // ── Email / Password ──
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // ── Simple in-memory check ──
        // Replace with real DB lookup (Supabase, MongoDB etc.) later
        // For now donors registered via the form are stored in localStorage
        // on the client — here we just validate format and pass through
        // In production: query your database here
        return {
          id: credentials.email,
          name: credentials.email.split("@")[0],
          email: credentials.email,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // Fire welcome email for Google sign-ins on first login
      if (account?.provider === "google" && user?.email) {
        try {
          await fetch(`${process.env.NEXTAUTH_URL}/api/donor-welcome`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name || "Donor",
              email: user.email,
              isGoogle: true,
            }),
          });
        } catch {
          // Don't block sign-in if email fails
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
  },

  pages: {
    signIn: "/donors/portal",
    error: "/donors/portal",
  },
});

export { handler as GET, handler as POST };