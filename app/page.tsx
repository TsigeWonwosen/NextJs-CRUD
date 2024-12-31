import { getServerSession } from "next-auth";
import { Options } from "./libs/auth";




export default function Home() {
 const session =  getServerSession(Options)
  return  <div>Welcome, {session?.user?.name || "Guest"}</div>;
}
