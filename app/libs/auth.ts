import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProviders from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "../utils/mongoose";
import { Staff } from "../models/userModel";
import { use } from "react";

export const Options: NextAuthOptions = {
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        try {
          if (credentials) {
            const { username, password } = credentials;

            connectToDatabase();

            const user = await Staff.findOne({
              username: username,
              password: password,
            });

            if (user) {
              return user;
            } else {
              return null;
            }
          }
        } catch (error) {
          console.log(error);
          throw new Error("Error in credentials");
        }
      },
    }),
  ],

  // Custom session behavior
  session: {
    strategy: "jwt", // Ensure you're using the 'jwt' strategy if required
  },

  // Optional: Include custom logic on sign in
  callbacks: {
    async signIn({ user, account, profile }) {
      // This callback is optional for custom logic during sign-in
      return true; // Allow sign-in
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user?.username;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
      };

      // console.log("Session :", session);
      return session;
    },
  },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
