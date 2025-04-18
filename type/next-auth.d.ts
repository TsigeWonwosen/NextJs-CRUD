import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    username: string;
    role: string;
    image?: string;
    img?: string;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      role: string;
      image: string | undefined;
    };
  }

  interface JWT {
    id: string;
    username: string;
    email: string;
    role: string;
    img: string | undefined;
  }
}
