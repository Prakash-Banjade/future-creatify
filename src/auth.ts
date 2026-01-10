import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Nodemailer from "next-auth/providers/nodemailer";
import { db } from "./db";
import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from "./db/schema/auth";
import { sendVerificationRequest } from "./lib/authSendRequest";

export const { handlers, auth, signIn, signOut } = NextAuth({
  theme: {
    logo: "/logo.png",
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticators,
  }),
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/signin/verify-request",
    newUser: "/auth/new-user",
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role;
      session.user.profileCompleted = user.profileCompleted;

      return session;
    },
  },
  providers: [
    Nodemailer({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        secure: process.env.SMTP_PORT === "465", // true if using port 465 with SSL
      },
      from: process.env.SMTP_FROM || "no-reply@futurecreatify.com",
      sendVerificationRequest: ({
        identifier,
        url,
        provider,
      }) => {
        sendVerificationRequest({
          identifier,
          provider: {
            server: provider.server,
            from: provider.from || "no-reply@futurecreatify.com",
          },
          url,
        });
      },
    }),
  ],
});
