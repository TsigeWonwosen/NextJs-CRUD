import { getServerSession } from "next-auth";
import { Options } from "./libs/auth";




export default async function Home() {
 const session =  await getServerSession(Options)
  return  <div>Welcome, {session?.user?.name || "Guest"}</div>;
}
