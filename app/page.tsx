import { getServerSession } from "next-auth";
import { Options } from "./libs/auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(Options);
  return (
    <div className="flex  flex-col grow md:flex-row justify-between  items-center  px-3 py-5 w-full gap-2 md:gap-4 ">
      <div className="flex flex-col items-center justify-center h-full w-full  text-left md:w-1/2 py-6 px-3 ">
        <section className="w-full mb-10 md:mb-7">
          <h1 className="font-semibold text-2xl md:text-4xl  text-gray-300/90">
            Creative Thoughts Agency.
          </h1>
          <p className="text-left font-semibold text-xs mt-3 text-gray-600">
            Welcome, {session?.user?.username || "Guest"}
          </p>
        </section>
        <section className="flex flex-col justify-center items-center">
          <p className="text-sm font-medium text-slate-200/50">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
            blanditiis adipisci minima reiciendis a autem assumenda dolore.
          </p>
          <div className="flex justify-start items-center  gap-4 w-full mt-5">
            <button className="border border-lime-900 px-2 py-1 rounded-md">
              Learn More
            </button>
            <button className="border border-green-400 px-2 py-1 rounded-md">
              Contact
            </button>
          </div>
        </section>
      </div>
      <div className=" rounded-md w-full md:w-1/2 h-full">
        <Image
          src="/about.svg"
          alt=""
          width={50}
          height={40}
          className=" w-full h-full rounded-md"
        />
      </div>
    </div>
  );
}
