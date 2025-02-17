import { Options } from "@/app/libs/auth";
import NextAuth from "next-auth";

const handler = NextAuth(Options);

export { handler as GET, handler as POST };
