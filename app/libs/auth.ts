import type { NextAuthOptions, Profile } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProviders from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "../utils/mongoose";
import { Staff } from "../models/userModel";

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
          placeholder: "Enter your username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Enter your password",
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

            if (!user) {
              return null;
            }
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

  // Optional: Include custom logic on sign in
  callbacks: {
    async signIn({ user, account, profile }) {
      if (
        (account?.provider === "google" || account?.provider === "github") &&
        !user.role
      ) {
        user.role = "admin"; // Default role for Google users
      }
      return true;
    },

    async redirect({ url, baseUrl }) {
      // if (url.startsWith("/")) return `${baseUrl}/dashboard`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.name = user.username || user.name;
        token.email = user.email;
        token.role = user.role;
        token.picture = user.image || user.img || "";
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        username: token.name as string,
        email: token.email as string,
        role: token.role as string,
        image: token.picture as string,
      };
      return session;
    },
  },
  // Custom session behavior
  session: {
    strategy: "jwt",
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
  pages: {
    signIn: "/login", // Custom sign-in page
  },
};
