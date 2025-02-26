import { prisma } from "@/app/libs/prisma";
import { AnnouncementList } from "@/app/libs/types";
import React from "react";

async function Annauncement({
  searchParams,
}: {
  searchParams: string | undefined;
}) {
  const date = searchParams ? new Date(searchParams) : new Date();

  const Announcements: AnnouncementList[] = await prisma.announcement.findMany(
    {},
  );
  return (
    <div className="h-auto w-full rounded-md bg-[#0C162E] p-4 text-left">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <div className="bg-lamaSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{Announcements[0].title}</h2>
            <span className="rounded-md bg-slate-100/10 px-1 py-1 text-xs text-gray-400">
              {new Intl.DateTimeFormat("en-US").format(Announcements[0].date)}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-400">
            {Announcements[0].description}
          </p>
        </div>
        <div className="bg-lamaPurpleLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{Announcements[1].title}</h2>
            <span className="rounded-md bg-slate-100/10 px-1 py-1 text-xs text-gray-400">
              {new Intl.DateTimeFormat("en-US").format(Announcements[1].date)}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-400">
            {Announcements[1].description}
          </p>
        </div>
        <div className="bg-lamaYellowLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{Announcements[2].title}</h2>
            <span className="rounded-md bg-slate-100/10 px-1 py-1 text-xs text-gray-400">
              {new Intl.DateTimeFormat("en-US").format(Announcements[2].date)}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-400">
            {Announcements[2].description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Annauncement;
