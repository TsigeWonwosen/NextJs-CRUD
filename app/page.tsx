import { getServerSession } from "next-auth";
import { Options } from "./libs/auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(Options);
  return (
    <div className="flex w-full grow flex-col items-center justify-between gap-2 px-3 py-5 md:flex-row md:gap-4">
      <div className="flex h-full w-full flex-col items-center justify-center px-3 py-6 text-left md:w-1/2">
        <section className="mb-10 w-full md:mb-7">
          <h1 className="text-2xl font-semibold text-gray-300/90 md:text-4xl">
            Creative Thoughts Agency.
          </h1>
          <p className="mt-3 text-left text-xs font-semibold text-gray-600">
            Welcome, {session?.user?.username || "Guest"}
          </p>
        </section>
        <section className="flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-slate-200/50">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
            blanditiis adipisci minima reiciendis a autem assumenda dolore.
          </p>
          <div className="mt-5 flex w-full items-center justify-start gap-4">
            <button className="rounded-md border border-lime-900 px-2 py-1">
              Learn More
            </button>
            <button className="rounded-md border border-green-400 px-2 py-1">
              Contact
            </button>
          </div>
        </section>
      </div>
      <div className="h-full w-full rounded-md md:w-1/2">
        <Image
          src="/about.svg"
          alt=""
          width={50}
          height={40}
          className="h-full w-full rounded-md"
        />
      </div>
    </div>
  );
}
