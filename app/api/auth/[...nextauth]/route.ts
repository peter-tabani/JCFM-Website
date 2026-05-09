import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { isAdminEmail } from "@/lib/admin";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET ?? "jcfm-dev-secret-change-me",
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
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // TODO: replace with real DB lookup.
        const email = String(credentials.email).toLowerCase();
        const role: "admin" | "user" = isAdminEmail(email) ? "admin" : "user";

        return {
          id: email,
          name: email.split("@")[0],
          email,
          role,
        };
      },
    }),
  ],

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
});

export { handler as GET, handler as POST };
