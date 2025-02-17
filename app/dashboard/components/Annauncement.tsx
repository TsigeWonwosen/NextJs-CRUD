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
    {}
  );
  return (
    <div className="p-4 rounded-md w-full h-auto text-left bg-[#0C162E]">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-lamaSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{Announcements[0].title}</h2>
            <span className="text-xs text-gray-400 bg-slate-100/10 rounded-md px-1 py-1">
              {new Intl.DateTimeFormat("en-US").format(Announcements[0].date)}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            {Announcements[0].description}
          </p>
        </div>
        <div className="bg-lamaPurpleLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{Announcements[1].title}</h2>
            <span className="text-xs text-gray-400 bg-slate-100/10 rounded-md px-1 py-1">
              {new Intl.DateTimeFormat("en-US").format(Announcements[1].date)}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            {Announcements[1].description}
          </p>
        </div>
        <div className="bg-lamaYellowLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{Announcements[2].title}</h2>
            <span className="text-xs text-gray-400 bg-slate-100/10 rounded-md px-1 py-1">
              {new Intl.DateTimeFormat("en-US").format(Announcements[2].date)}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            {Announcements[2].description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Annauncement;
