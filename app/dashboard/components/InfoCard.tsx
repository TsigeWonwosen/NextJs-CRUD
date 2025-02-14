import { prisma } from "@/app/libs/prisma";
import Image from "next/image";
import React from "react";

async function InfoCard({
  name,
}: {
  name: "admin" | "student" | "parent" | "teacher";
}) {
  const compoundCount: Record<typeof name, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    parent: prisma.parent,
    student: prisma.student,
  };

  const Count: any = await compoundCount[name].count();

  return (
    <div className="min-w-[180px]   w-full max-w-[300px] shadow-md shadow-slate-100/10 h-[120px] flex justify-between flex-col odd:bg-wondebgHardColo even:bg-wondeblackColor/20 rounded-xl gap-2 px-5 py-3 flex-1">
      <div className="flex justify-between items-center w-full">
        <h1 className=" text-[10px] text-left  bg-slate-700 text-cyan-600 px-[4px] py-[1px] rounded-full">
          <p>{new Date().getFullYear()}</p>
        </h1>
        <button>
          <Image
            src={`/more.png`}
            alt="More"
            width={20}
            height={20}
            className="rounded-md"
          />
        </button>
      </div>
      <div className="flex justify-start">
        <span className="text-left text-2xl font-bold from-neutral-100">
          {Count}
        </span>
      </div>
      <div className="flex justify-start text-left">
        <span className="capitalize font-medium text-sm w-full text-gray-500">
          {name}s
        </span>
      </div>
    </div>
  );
}

export default InfoCard;
